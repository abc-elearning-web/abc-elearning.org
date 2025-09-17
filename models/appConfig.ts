interface AppConfig {
    appId: number;
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
