export default function Head({ appName }: { appName: string }) {
  return (
    <>
      <title>Opening {appName}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content={`Open ${appName} or download from app store`}
      />
    </>
  );
}
