import apps from "../data/app_config_new.json";

export default function AppPage() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>Redirecting...</p>
    </div>
  );
}

export const getServerSideProps = async ({
  params,
  req,
}: {
  params: { appId: string };
  req: { headers: { "user-agent"?: string } };
}) => {
  const { appId } = params;
  const app = apps.find((app) => app.bucket === appId);

  if (!app) {
    return { notFound: true };
  }

  const { linkIos, linkAndroid } = app;

  // Detect device từ user-agent
  const userAgent = req.headers["user-agent"] || "";
  const isIOS = /iPhone|iPad|iPod|Macintosh|MacIntel/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  // Xác định store link dựa trên device
  let redirectUrl = "";

  if (isIOS) {
    redirectUrl = linkIos || linkAndroid;
  } else if (isAndroid) {
    redirectUrl = linkAndroid || linkIos;
  } else {
    // Desktop hoặc device khác - ưu tiên iOS link, fallback về Android
    redirectUrl = linkIos || linkAndroid;
  }

  // Nếu không có store link, trả về 404
  if (!redirectUrl) {
    return { notFound: true };
  }

  // Track event (optional - có thể gọi API ở đây nếu cần)
  const TRACK_EVENT_URL =
    "https://api-cms-v2-dot-micro-enigma-235001.appspot.com/api/tiktok/tracking";

  try {
    // Gọi track event không blocking (fire and forget)
    fetch(TRACK_EVENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "app_opened",
        bucket: app.bucket,
      }),
    }).catch(() => {
      // Ignore errors for tracking
    });
  } catch (error) {
    // Ignore tracking errors
  }

  // Redirect đến store tương ứng
  return {
    redirect: {
      destination: redirectUrl,
      permanent: false, // 302 redirect
    },
  };
};
