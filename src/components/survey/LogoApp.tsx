import { IAppInfo } from "../../models/AppInfo";
import "./LogoApp.scss";

const IMG_SIZE = {
    s: { width: "26px", height: "26px" },
    m: { width: "40px", height: "40px" },
    l: { width: "58px", height: "58px" },
};

const TEXT_SIZE = {
    s: { fontSize: "10px", lineHeight: "13px" },
    m: { fontSize: "16px", lineHeight: "20px" },
    l: { fontSize: "18px", lineHeight: "28px" },
};

const THEME = {
    dark: { color: "#fff" },
    light: { color: "#212121" },
};
const LogoApp = ({
    appInfo,
    theme = "light",
    size = "m",
}: {
    appInfo: IAppInfo;
    theme?: "dark" | "light";
    size?: "s" | "m" | "l";
}) => {
    return (
        <div className="logo-app-0">
            <img className="logo" src="/info/images/asvab/logo60.png" alt="" style={IMG_SIZE[size]} />
            <div>
                <p style={{ ...TEXT_SIZE[size], ...THEME[theme] }}>{appInfo.appShortName}</p>
                <span style={{ ...TEXT_SIZE[size], ...THEME[theme] }}>Practice Test</span>
            </div>
        </div>
    );
};

export default LogoApp;
