const fs = require("fs");
const path = require("path");

/**
 * Map lại file app_config.json và trả về các giá trị cần thiết
 * @param {string} appId - ID của app (optional, nếu không có thì trả về tất cả)
 * @returns {Object} Object chứa iosPackageName, androidPackageName, linkAndroid, linkIos
 */
function getAppConfig() {
  const appConfigPath = path.join(__dirname, "public/json/app_config.json");
  const appConfigData = JSON.parse(fs.readFileSync(appConfigPath, "utf8"));

  // appConfigData là object, không phải array, nên cần dùng Object.keys() hoặc Object.entries()
  const newAppConfig = Object.keys(appConfigData).map((appKey) => {
    const app = appConfigData[appKey];
    return {
      appKey: appKey,
      bucket: app.bucket,
      iosPackageName: app.ios?.packageName || null,
      androidPackageName: app.android?.packageName || null,
      linkAndroid: app.webConfig?.linkAndroid || null,
      linkIos: app.webConfig?.linkIos || null,
    };
  });

  console.log(newAppConfig);

  fs.writeFileSync(
    path.join(__dirname, "public/json/app_config_new.json"),
    JSON.stringify(newAppConfig, null, 2)
  );
}

getAppConfig();
