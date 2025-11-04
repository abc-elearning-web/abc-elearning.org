import fs from "fs";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { DeeplinkHandler } from "../../utils/deeplinkHandler";

// Constants
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const SERVER_URL = IS_DEVELOPMENT
  ? "http://192.168.88.64:3002"
  : "https://api-cms-v2-dot-micro-enigma-235001.appspot.com";
const SERVER_HANDLE_DEEPLINK_URL = "/api/app/deeplink";
const FINGERPRINT_URL = "/api/get-fingerprint";

interface QueryParams {
  type: string;
  customParams?: Record<string, string>;
  [key: string]: any;
}

interface BrowserInfo {
  isIOS: boolean;
  // Add other properties as needed
}

interface ShareProps {
  appConfig: any;
  query: string;
  fullUrl: string;
}

const Share = ({ appConfig, query, fullUrl }: ShareProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<BrowserInfo | null>(null);

  console.log("query:", query);

  // Use ref to track if initialization has already occurred
  const initializeRef = useRef(false);

  // Parse query to get the main path and parameters
  const queryParams = new URLSearchParams(query);
  const mainPath = queryParams.get("type") || "";
  const otherParams = new URLSearchParams();

  // Add all parameters except 'type' to otherParams
  Array.from(queryParams.keys()).forEach((key) => {
    if (key !== "type") {
      const value = queryParams.get(key);
      if (value !== null) {
        otherParams.set(key, value);
      }
    }
  });

  // Build deeplink with main path and parameters
  const deeplinkPath = otherParams.toString()
    ? `${mainPath}?${otherParams.toString()}`
    : mainPath;
  console.log("🚀 ~ Share ~ deeplinkPath:", deeplinkPath);

  // Memoize static values
  const appData = {
    iosLink: appConfig.webConfig.linkIos,
    androidPackageName: appConfig.android.packageName,
    bucket: appConfig.bucket,
    appName: appConfig.android.name || "Application",
    playStoreLink: `https://market.android.com/details?id=${appConfig.android.packageName}`,
    deeplink: `${appConfig.bucket}://abc-app/${deeplinkPath}`,
    androidIntent: `intent://${deeplinkPath}#Intent;scheme=${appConfig.bucket};package=${appConfig.android.packageName};end;`,
    apiDeeplink: `${SERVER_URL}${SERVER_HANDLE_DEEPLINK_URL}`,
    appLogo: appConfig.android?.assets?.appImages?.logo || appConfig.appIcon,
    primaryColor: appConfig.ios?.colors?.primary || "#E3A651",
  };

  const parseQueryParams = useCallback((): QueryParams => {
    try {
      // Parse the query string that now contains all parameters
      const searchParams = new URLSearchParams(query);
      const result: QueryParams = { type: "" };
      const customParams: Record<string, string> = {};

      // Extract type parameter (the main path)
      const typeParam = searchParams.get("type");
      if (typeParam) {
        result.type = typeParam;
      }

      // Extract all other parameters as custom params
      Array.from(searchParams.keys()).forEach((key) => {
        if (key !== "type") {
          const value = searchParams.get(key);
          if (value !== null) {
            customParams[key] = value;
          }
        }
      });

      result.customParams = customParams;

      // Also add them directly to result for backward compatibility
      Object.entries(customParams).forEach(([key, value]) => {
        result[key] = value;
      });

      return result;
    } catch (error) {
      console.error("Error parsing query:", error);
      return { type: query };
    }
  }, [query]);

  const getTimezoneOffset = useCallback(() => {
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetHours = -offsetMinutes / 60;
    const sign = offsetHours >= 0 ? "+" : "-";
    const hours = Math.abs(offsetHours).toString().padStart(2, "0");
    return `${sign}${hours}`;
  }, []);

  const getScreen = useCallback(() => {
    if (typeof window === "undefined") return "";
    const width = Math.round(window.screen.width);
    const height = Math.round(window.screen.height);
    const dpr = window.devicePixelRatio.toFixed(2);
    return `${width}x${height}@${dpr}`;
  }, []);

  function getPlatform() {
    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes("android")) {
      return "android";
    }
    if (/iphone|ipad|ipod|macintosh|macintel/.test(ua)) {
      return "ios";
    }
    return ua;
  }

  const getFingerprint = useCallback(async () => {
    try {
      const getLang = (navigator.language || "en-US").toLowerCase();
      const obj = {
        lang: getLang,
        tz: getTimezoneOffset(),
        platform: getPlatform(),
      };

      const resp = await fetch(FINGERPRINT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });

      if (!resp.ok) {
        throw new Error(`Fingerprint API failed with status: ${resp.status}`);
      }

      const data = await resp.json();
      return data.fingerprint;
    } catch (error) {
      console.error("Error getting fingerprint:", error);
      throw error;
    }
  }, [getTimezoneOffset, getScreen]);

  const callApiServer = useCallback(
    async (fingerprint: string) => {
      try {
        setIsLoading(true);
        const queryParams = parseQueryParams();

        if (!queryParams.customParams) {
          queryParams.customParams = {};
        }
        queryParams.customParams["fingerprint"] = fingerprint;

        const payload = {
          appId: queryParams["appId"] ?? `${appConfig.appId}`,
          bucket: appConfig.bucket,
          type: queryParams.type,
          customParams: queryParams.customParams || {},
        };

        console.log("payload:", payload);

        const response = await fetch(appData.apiDeeplink, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        await response.json();
      } catch (error) {
        console.error("API Server call error:", error);
        setError("Failed to initialize application");
      } finally {
        setIsLoading(false);
      }
    },
    [parseQueryParams, appConfig.appId, appConfig.bucket, appData.apiDeeplink]
  );

  const launchApp = useCallback(() => {
    let appOpened = false;
    let redirectTimeout: NodeJS.Timeout;

    const onAppOpened = () => {
      appOpened = true;
      setIsLoading(false);
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };

    const onError = (error: Error) => {
      console.error("Launch error:", error);
      if (!appOpened) {
        setError("Failed to open application. Please try again.");
        setIsLoading(false);
      }
    };

    try {
      const beforeRedirect = Date.now();
      window.location.href = appData.deeplink;

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          const returnTime = Date.now();
          if (returnTime - beforeRedirect > 2000) {
            onAppOpened();
            return;
          }
        }
      };

      window.addEventListener("visibilitychange", handleVisibilityChange);

      // For iOS devices, only redirect to store if app didn't open after visibility check
      redirectTimeout = setTimeout(() => {
        window.removeEventListener("visibilitychange", handleVisibilityChange);
        if (!appOpened) {
          // Detect iOS directly here instead of relying on deviceInfo state
          const isIOS = /iPhone|iPad|iPod|Macintosh|MacIntel/i.test(
            navigator.userAgent
          );

          if (isIOS) {
            window.location.href = appData.iosLink;
          } else {
            window.location.href = appData.playStoreLink;
          }
          onAppOpened();
        }
      }, 3000); // Increased timeout to give more time for app to open

      // Cleanup function
      return () => {
        clearTimeout(redirectTimeout);
        window.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    } catch (error) {
      onError(error instanceof Error ? error : new Error("Unknown error"));
    }
  }, [appData]);

  const handleStoreRedirect = useCallback(() => {
    const isIOS = /iPhone|iPad|iPod|Macintosh|MacIntel/i.test(
      navigator.userAgent
    );
    if (isIOS) {
      window.location.href = appData.iosLink;
    } else {
      window.location.href = appData.playStoreLink;
    }
  }, [appData.iosLink, appData.playStoreLink]);
  console.log("beforeRedirect:", appData.deeplink);

  // Main initialization effect - runs only once
  useEffect(() => {
    if (typeof window === "undefined" || initializeRef.current) {
      return;
    }

    initializeRef.current = true;

    const initializeApp = async () => {
      try {
        const fingerprint = await getFingerprint();

        const deeplinkHandler = new DeeplinkHandler();
        const browserInfo = deeplinkHandler.getBrowserInfo();
        setDeviceInfo(browserInfo);

        await callApiServer(fingerprint);
        launchApp();
      } catch (error) {
        console.error("Initialization error:", error);
        setError("Failed to initialize application");
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);
  const appName = appConfig.android.name || "Application";
  const appLogo =
    appConfig.android?.assets?.appImages?.logo || appConfig.appIcon;
  const primaryColor = appConfig.ios?.colors?.primary || "#E3A651";
  return (
    <>
      <Head>
        <title>Opening {appName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={`Open ${appName} or download from app store`}
        />
      </Head>
      <div className="flex flex-col justify-center items-center p-4 min-h-screen bg-linear-to-b from-primary-50 to-primary-100">
        <div className="overflow-hidden w-full max-w-md bg-white rounded-xl shadow-lg">
          <div className="p-6 text-center">
            {appLogo && (
              <div className="flex justify-center mb-4">
                <div className="overflow-hidden relative w-20 h-20 rounded-xl">
                  <img
                    src={appLogo}
                    alt={`${appName} icon`}
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <h2 className="mb-2 text-xl font-bold text-gray-800">
              {isLoading ? `Opening App ${appName}...` : `Open ${appName}`}
            </h2>

            {isLoading ? (
              <div className="flex justify-center my-6">
                <div
                  className="w-12 h-12 rounded-full border-t-2 border-b-2 animate-spin"
                  style={{ borderColor: primaryColor }}
                ></div>
              </div>
            ) : error ? (
              <div className="mb-6 text-red-500">{error}</div>
            ) : (
              <p className="mb-6 text-gray-600">
                If the app didn't open automatically, please click the button
                below.
              </p>
            )}

            <div className="space-y-4">
              {!isLoading && (
                <>
                  <button
                    onClick={() => launchApp()}
                    className="flex justify-center items-center px-4 py-3 w-full font-medium text-white rounded-lg transition duration-200"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Open App
                  </button>

                  <div className="flex relative justify-center items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <button
                    onClick={handleStoreRedirect}
                    className="flex justify-center items-center px-4 py-3 w-full font-medium text-gray-800 bg-gray-100 rounded-lg transition duration-200 hover:bg-gray-200"
                  >
                    Download App
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-3 text-sm">
          <a href="mailto:support@abc-elearning.org">
            support@abc-elearning.org
          </a>
        </div>
      </div>
    </>
  );
};

export default Share;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { bucket } = context.params as { bucket: string };
    const { query: queryParam } = context.query as { query: string };
    console.log("Original query param:", queryParam);

    const fullUrl = context.resolvedUrl;
    console.log("Full URL:", fullUrl);

    const urlObj = new URL(fullUrl, "https://example.com");
    const allParams = Object.fromEntries(urlObj.searchParams.entries());
    console.log("All URL params:", allParams);

    // Build the complete query string from all parameters except 'query' itself
    const queryParams = new URLSearchParams();

    // Add the main query parameter if it exists
    if (queryParam) {
      queryParams.set("type", queryParam);
    }

    // Add all other parameters
    Object.entries(allParams).forEach(([key, value]) => {
      if (key !== "query" && value) {
        queryParams.set(key, value);
      }
    });

    const enhancedQuery = queryParams.toString();
    console.log("Enhanced query:", enhancedQuery);

    if (!bucket) {
      return { notFound: true };
    }

    const data = fs.readFileSync("public/json/app_config.json").toString();
    const appConfigData = JSON.parse(data);
    const appConfig = appConfigData[bucket];

    if (!appConfig) {
      return { notFound: true };
    }

    return {
      props: {
        query: enhancedQuery,
        appConfig,
        fullUrl: context.resolvedUrl,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { notFound: true };
  }
};
