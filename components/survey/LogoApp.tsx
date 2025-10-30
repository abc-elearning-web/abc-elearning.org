interface IAppInfo {
  appId: number;
  title: string;
  appShortName?: string;
  logoUrl?: string;
}

const SIZE_CLASSES = {
  s: {
    img: "w-[26px] h-[26px]",
    text: "text-[10px] leading-[13px]",
  },
  m: {
    img: "w-10 h-10", // 40px
    text: "text-base leading-5", // 16px, 20px
  },
  l: {
    img: "w-[58px] h-[58px]",
    text: "text-lg leading-7", // 18px, 28px
  },
};

const THEME_CLASSES = {
  dark: "text-[#212121]",
  light: "text-gray-800", // #212121
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
    <div className="flex">
      <img
        className={`block ${SIZE_CLASSES[size].img}`}
        src={appInfo.logoUrl}
        alt=""
      />
      <div className="ml-1.5">
        <p
          className={`block m-0 uppercase font-semibold ${SIZE_CLASSES[size].text} ${THEME_CLASSES[theme]}`}
        >
          {appInfo.appShortName || appInfo.title}
        </p>
        <span
          className={`block m-0 italic ${SIZE_CLASSES[size].text} ${THEME_CLASSES[theme]}`}
        >
          Practice Test
        </span>
      </div>
    </div>
  );
};

export default LogoApp;
