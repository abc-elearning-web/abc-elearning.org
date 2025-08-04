import fs from 'fs';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// Define types
interface AppConfig {
    webConfig: {
        linkIos: string;
    };
    android: {
        name: string;
        packageName: string;
        assets?: {
            appImages?: {
                logo?: string;
            };
        };
    };
    ios: {
        name: string;
        packageName: string;
        assets?: {
            appImages?: {
                logo?: string;
            };
        };
        colors: {
            primary: string,
            secondary: string
        }
    };
    bucket: string;
    appName?: string;
    appIcon?: string;
}

interface ShareProps {
    appConfig: AppConfig;
    query: string;
    fullUrl: string;
}

interface BrowserInfo {
    isIOS: boolean;
    isAndroid: boolean;
    isChrome: boolean;
    isFirefox: boolean;
    isSafari: boolean;
    isCriOS: boolean;
    isIOSVersion: boolean;
}

// Constants
const IOS_REDIRECT_TIMEOUT = 250;
const ANDROID_REDIRECT_TIMEOUT = 25;

class DeeplinkHandler {
    private userAgent: string;
    private browserInfo: BrowserInfo;

    constructor() {
        if (typeof window !== 'undefined') {
            this.userAgent = navigator.userAgent;
            this.browserInfo = this.detectBrowser();
        } else {
            this.userAgent = '';
            this.browserInfo = {
                isIOS: false,
                isAndroid: false,
                isChrome: false,
                isFirefox: false,
                isSafari: false,
                isCriOS: false,
                isIOSVersion: false
            };
        }
    }

    private detectBrowser(): BrowserInfo {
        return {
            isIOS: /iPhone|iPad|iPod/i.test(this.userAgent),
            isAndroid: /Android/i.test(this.userAgent),
            isChrome: /Chrome/i.test(this.userAgent),
            isFirefox: /Firefox/i.test(this.userAgent),
            isSafari: /Safari/i.test(this.userAgent),
            isCriOS: /CriOS/i.test(this.userAgent),
            isIOSVersion: /Version\/(9|10|11|12)/i.test(this.userAgent)
        };
    }

    public getBrowserInfo(): BrowserInfo {
        return this.browserInfo;
    }

    public launchApp(
        deeplink: string,
        iosLink: string,
        playStoreLink: string,
        androidIntent: string,
        onComplete: () => void,
        onError: (error: Error) => void
    ): void {
        try {
            if (this.browserInfo.isIOS) {
                this.iosLaunch(deeplink, iosLink, onComplete);
            } else if (this.browserInfo.isAndroid) {
                this.androidLaunch(deeplink, playStoreLink, androidIntent, onComplete);
            } else {
                window.location.href = iosLink;
                onComplete();
            }
        } catch (error) {
            console.error('Redirect error:', error);
            onError(error instanceof Error ? error : new Error('Unknown error'));
        }
    }

    private iosLaunch(deepLink: string, iosStoreLink: string, onComplete: () => void): void {
        if (this.browserInfo.isCriOS || (this.browserInfo.isSafari && this.browserInfo.isIOSVersion)) {
            console.log('launchWekitApproach');
            this.launchWekitApproach(deepLink, iosStoreLink, onComplete);
        } else {
            console.log('launchIframeApproach');
            this.launchIframeApproach(deepLink, iosStoreLink, onComplete);
        }
    }

    private androidLaunch(deepLink: string, playStoreLink: string, androidIntent: string, onComplete: () => void): void {
        if (this.browserInfo.isChrome) {
            console.log('launchChromeApproach');
            window.location.href = androidIntent;
            setTimeout(onComplete, ANDROID_REDIRECT_TIMEOUT);
        } else if (this.browserInfo.isFirefox) {
            console.log('launchWekitApproach');
            this.launchWekitApproach(deepLink, playStoreLink, onComplete);
        } else {
            console.log('launchIframeApproach');
            this.launchIframeApproach(deepLink, playStoreLink, onComplete);
        }
    }

    private launchWekitApproach(url: string, fallback: string, onComplete: () => void): void {
        window.location.href = url;
        setTimeout(() => {
            window.location.href = fallback;
            onComplete();
        }, IOS_REDIRECT_TIMEOUT);
    }

    private launchIframeApproach(url: string, fallback: string, onComplete: () => void): void {
        const iframe = document.createElement('iframe');
        iframe.style.border = 'none';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = () => {
            window.location.href = url;
        };
        iframe.src = url;

        document.body.appendChild(iframe);

        setTimeout(() => {
            window.location.href = fallback;
            onComplete();
        }, ANDROID_REDIRECT_TIMEOUT);
    }
}

const Share = ({ appConfig, query, fullUrl }: ShareProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deviceInfo, setDeviceInfo] = useState<BrowserInfo | null>(null);

    const iosLink = appConfig.webConfig.linkIos;
    const androidPackageName = appConfig.android.packageName;
    const bucket = appConfig.bucket;
    const appName = appConfig.android.name || 'Application';
    const playStoreLink = `https://market.android.com/details?id=${androidPackageName}`;

    const deeplink = bucket + '://abc-app/' + query;
    const androidIntent = `intent://${query}#Intent;scheme=${bucket};package=${androidPackageName};end;`;
    const apiDeeplink = "http://192.168.88.92:3003/api/app/deeplink";
    interface QueryParams {
        type: string;
        customParams?: Record<string, string>;
        [key: string]: any;
    }

    const parseQueryParams = (): QueryParams => {
        try {
            let path, queryString;

            if (query.includes('?')) {
                [path, queryString] = query.split('?');
            } else {
                path = query;
                queryString = '';
            }

            const result: QueryParams = { type: path };

            const urlParams = new Map<string, string>();

            if (queryString) {
                const searchParams = new URLSearchParams(queryString);
                Array.from(searchParams.keys()).forEach(key => {
                    const value = searchParams.get(key);
                    if (value !== null) {
                        urlParams.set(key, value);
                    }
                });
            }

            if (fullUrl) {
                try {
                    const fullUrlObj = new URL(fullUrl, 'https://example.com');

                    Array.from(fullUrlObj.searchParams.keys()).forEach(key => {
                        if (key !== 'query') {
                            const value = fullUrlObj.searchParams.get(key);
                            if (value !== null) {
                                urlParams.set(key, value);
                            }
                        }
                    });
                } catch (e) {
                    console.error('Error parsing fullUrl:', e);
                }
            }

            const params: Record<string, string> = {};
            urlParams.forEach((value, key) => {
                params[key] = value;
            });

            console.log('All parsed params:', params);
            console.log('Original query:', query);
            console.log('Full URL:', fullUrl);

            result.customParams = params;

            Object.entries(params).forEach(([key, value]) => {
                result[key] = value;
            });

            return result;
        } catch (error) {
            console.error('Error parsing query:', error);
            return { type: query };
        }
    };

    const callApiServer = async () => {
        try {
            setIsLoading(true);
            const queryParams = parseQueryParams();
            const payload = {
                appId: queryParams["appId"] ?? -1,
                bucket: appConfig.bucket,
                type: queryParams.type,
                customParams: queryParams.customParams || {}
            };


            // Gọi API
            const response = await fetch(apiDeeplink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            await response.json();
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const launchApp = () => {
        let appOpened = false;

        const onAppOpened = () => {
            console.log('App opened successfully');
            appOpened = true;
            setIsLoading(false);
        };

        const onError = (error: Error) => {
            console.error('Launch error:', error);
            if (!appOpened) {
                setError('Failed to open application. Please try again.');
                setIsLoading(false);
            }
        };

        try {
            window.location.href = deeplink;
            setTimeout(() => {
                if (!appOpened) {
                    const deeplinkHandler = new DeeplinkHandler();
                    deeplinkHandler.launchApp(
                        deeplink,
                        iosLink,
                        playStoreLink,
                        androidIntent,
                        onAppOpened,
                        onError
                    );
                }
            }, 1500);
        } catch (error) {
            onError(error instanceof Error ? error : new Error('Unknown error'));
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const deeplinkHandler = new DeeplinkHandler();
        const browserInfo = deeplinkHandler.getBrowserInfo();

        setDeviceInfo(browserInfo);
        callApiServer();
        launchApp();
    }, []);

    const handleStoreRedirect = () => {
        if (deviceInfo?.isIOS) {
            window.location.href = iosLink;
        } else {
            window.location.href = playStoreLink;
        }
    };

    const appLogo = appConfig.android?.assets?.appImages?.logo || appConfig.appIcon;

    const primaryColor = appConfig.ios?.colors?.primary || '#E3A651';

    return (
        <>
            <Head>
                <title>Opening {appName}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={`Open ${appName} or download from app store`} />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">

                <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 text-center">
                        {appLogo && (
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 relative rounded-xl overflow-hidden">
                                    <img
                                        src={appLogo}
                                        alt={`${appName} icon`}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            {appName}
                        </h1>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            {isLoading ? 'Opening App...' : `Open ${appName}`}
                        </h2>
                        {isLoading ? (
                            <div className="flex justify-center my-6">
                                <div
                                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                                    style={{ borderColor: primaryColor }}
                                ></div>
                            </div>
                        ) : error ? (
                            <div className="text-red-500 mb-6">{error}</div>
                        ) : (
                            <p className="text-gray-600 mb-6">
                                If the app didn't open automatically, please click the button below.
                            </p>
                        )}

                        <div className="space-y-4">
                            {!isLoading && (
                                <>
                                    <button
                                        onClick={() => launchApp()}
                                        className="w-full py-3 px-4 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        Open App
                                    </button>

                                    <div className="relative flex items-center justify-center">
                                        <div className="flex-grow border-t border-gray-300"></div>
                                        <span className="flex-shrink mx-4 text-gray-500">or</span>
                                        <div className="flex-grow border-t border-gray-300"></div>
                                    </div>

                                    <button
                                        onClick={handleStoreRedirect}
                                        className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition duration-200 flex items-center justify-center"
                                    >
                                        Download App
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <span>Email:</span>
                    <a href="mailto:support@abc-elearning.org">support@abc-elearning.org</a>
                </div>
            </div>
        </>
    );
};

export default Share;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        const { bucket } = context.params as { bucket: string };
        const { query } = context.query as { query: string };
        console.log("Original query:", query);

        const fullUrl = context.resolvedUrl;
        console.log("Full URL:", fullUrl);
        const urlObj = new URL(fullUrl, 'https://example.com');
        const allParams = Object.fromEntries(urlObj.searchParams.entries());
        console.log("All URL params:", allParams);

        let enhancedQuery = query;
        if (allParams.appId && !query.includes('appId=')) {
            enhancedQuery = query.includes('?')
                ? `${query}&appId=${allParams.appId}`
                : `${query}?appId=${allParams.appId}`;
        }
        console.log("Enhanced query:", enhancedQuery);

        if (!bucket || !query) {
            return { notFound: true };
        }

        const data = fs.readFileSync('public/json/app_config.json').toString();
        const appConfigData = JSON.parse(data);
        const appConfig = appConfigData[bucket];

        if (!appConfig) {
            return { notFound: true };
        }

        return {
            props: {
                query: enhancedQuery,
                appConfig,
                fullUrl: context.resolvedUrl
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return { notFound: true };
    }
};