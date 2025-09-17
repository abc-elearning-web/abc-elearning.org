const IOS_REDIRECT_TIMEOUT = 2500;
const ANDROID_REDIRECT_TIMEOUT = 25;
export class DeeplinkHandler {
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
        }, this.browserInfo.isIOS ? IOS_REDIRECT_TIMEOUT : ANDROID_REDIRECT_TIMEOUT); // Sử dụng timeout phù hợp với loại thiết bị
    }
}