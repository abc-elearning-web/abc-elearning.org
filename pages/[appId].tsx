import { useEffect, useRef, useState } from "react";
import apps from "../data/app_config_new.json";
const TRACK_EVENT_URL =
  "https://api-cms-v2-dot-micro-enigma-235001.appspot.com/api/tiktok/tracking";

interface AppPageProps {
  linkIos: string;
  linkAndroid: string;
  iosPackageName: string;
  androidPackageName: string;
  bucket: string;
}

export default function AppPage(props: AppPageProps) {
  const { linkIos, linkAndroid, iosPackageName, androidPackageName, bucket } =
    props;
  const [isLoading, setIsLoading] = useState(true);
  const initializeRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || initializeRef.current) {
      return;
    }

    initializeRef.current = true;
    const handleTrackEvent = async () => {
      try {
        await fetch(TRACK_EVENT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "app_opened",
            bucket: bucket,
          }),
        });
      } catch (error) {
        console.error("Track event error:", error);
      }
    };

    const launchApp = () => {
      let appOpened = false;
      let redirectTimeout: NodeJS.Timeout;

      const onAppOpened = () => {
        appOpened = true;
        setIsLoading(false);
        if (redirectTimeout) {
          clearTimeout(redirectTimeout);
        }
      };

      try {
        const isIOS = /iPhone|iPad|iPod|Macintosh|MacIntel/i.test(
          navigator.userAgent
        );
        const isAndroid = /Android/i.test(navigator.userAgent);

        let deepLink = "";
        let storeLink = "";

        if (isIOS) {
          deepLink = `${bucket}://abc-app/`;
          storeLink = linkIos || linkAndroid;
        } else if (isAndroid) {
          deepLink = `intent://#Intent;scheme=${bucket};package=${androidPackageName};end;`;
          storeLink = linkAndroid || linkIos;
        } else {
          storeLink = linkIos || linkAndroid;
          if (storeLink) {
            window.location.href = storeLink;
          }
          setIsLoading(false);
          return;
        }

        if (!storeLink) {
          setIsLoading(false);
          return;
        }

        const beforeRedirect = Date.now();
        window.location.href = deepLink;

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

        redirectTimeout = setTimeout(() => {
          window.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
          if (!appOpened) {
            window.location.href = storeLink;
            onAppOpened();
          }
        }, 3000);

        handleTrackEvent();

        return () => {
          clearTimeout(redirectTimeout);
          window.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
        };
      } catch (error) {
        console.error("Launch error:", error);
        setIsLoading(false);
        const isIOS = /iPhone|iPad|iPod|Macintosh|MacIntel/i.test(
          navigator.userAgent
        );
        const storeLink = isIOS
          ? linkIos || linkAndroid
          : linkAndroid || linkIos;
        if (storeLink) {
          window.location.href = storeLink;
        }
      }
    };

    launchApp();
  }, [bucket, linkIos, linkAndroid, iosPackageName, androidPackageName]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {isLoading ? (
        <div>
          <p>Opening app...</p>
          <p>
            If the app doesn't open, you will be redirected to the app store.
          </p>
        </div>
      ) : (
        <div>
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = async ({
  params,
}: {
  params: { appId: string };
}) => {
  const { appId } = params;
  const app = apps.find((app) => app.bucket === appId);
  if (!app) {
    return { notFound: true };
  }
  const { linkIos, linkAndroid, iosPackageName, androidPackageName, bucket } =
    app;

  return {
    props: {
      linkIos,
      linkAndroid,
      iosPackageName,
      androidPackageName,
      bucket,
    },
  };
};
