import fs from 'fs';
import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';

const Share = ({ appConfig, query }: { appConfig: any, query: string }) => {
    const iosLink = appConfig.webConfig.linkIos;
    const androidPackageName = appConfig.android.packageName;
    const bucket = appConfig.bucket;
    const playStoreLink = `https://market.android.com/details?id=${androidPackageName}`;

    const deeplink =  bucket + '://' + query;
    const androidIntent = `intent://${query}#Intent;scheme=${bucket};package=${androidPackageName};end;`;
    useEffect(() => {
        if(isIOS()) {
            iosLaunch(deeplink, iosLink);
        } else if(isAndroid()) {
            androidLaunch(deeplink, playStoreLink, androidIntent);
        } else {
            window.location.href = iosLink;
        }
    }, []);
    return (
        <>
            <div>
                Hello world!
            </div>
        </>
    );
};

const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const isAndroid = () => {
    return /Android/i.test(navigator.userAgent);
}

const isChrome = () => {
    return /Chrome/i.test(navigator.userAgent);
}

const isFirefox = () => {
    return /Firefox/i.test(navigator.userAgent);
}

const isSafari = () => {
    return /Safari/i.test(navigator.userAgent);
}

const isCriOS = () => {
    return /CriOS/i.test(navigator.userAgent);
}

const isIOSVersion = () => {
    return /Version\/(9|10|11|12)/i.test(navigator.userAgent);
}

const iosLaunch = (deepLink: string, iosStoreLink: string) => {
    // chrome and safari on ios >= 9 don't allow the iframe approach
    if (isCriOS() || (isSafari() && isIOSVersion())
    ) {
        launchWekitApproach(deepLink, iosStoreLink);
    } else {
        launchIframeApproach(deepLink, iosStoreLink);
    }
}

const androidLaunch = (deepLink: string, playStoreLink: string, androidIntent: string) => {
    if (isChrome()) {
        document.location = androidIntent;
    } else if (isFirefox()) {
        launchWekitApproach(deepLink, playStoreLink);
    } else {
        launchIframeApproach(deepLink, playStoreLink);
    }
}

const launchWekitApproach = (url: string, fallback: string) => {
    document.location = url;
    setTimeout(function () {
        document.location = fallback;
    }, 250);
}

const launchIframeApproach = (url: string, fallback: string) => {
    var iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.onload = function () {
        document.location = url;
    };
    iframe.src = url;

    window.onload = function () {
        document.body.appendChild(iframe);

        setTimeout(function () {
            window.location.href = fallback;
        }, 25);
    };
}

export default Share;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { bucket } = context.params as { bucket: string };
    const { query } = context.query as { query: string };
    const data = await fs.readFileSync('public/json/app_config.json').toString();
    const appConfigData = JSON.parse(data);
    const appConfig = appConfigData[bucket];
    if (!appConfig || !query) {
        return {
            notFound: true
        };
    }
    return {
        props: { query, appConfig }
    };
};