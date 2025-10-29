import { GetServerSideProps } from "next";
import fs from "fs";
import SurveyContent from "./components/SurveyContent";
import SurveyType from "./components/SurveyType";
import WhenIsYourExamDate from "./when-is-your-exam-date";
import WhenWillYouGetYourResult from "./when-will-you-get-your-result";
export default function Survey({ bucket, email, type, appConfig }) {
  return (
    <div>
      {(type === "exam_pass" || type === "exam_fail") && (
        <SurveyContent
          bucket={bucket}
          email={email}
          type={type}
          appConfig={appConfig}
          surveyType={
            type === "exam_pass" ? SurveyType.congratulation : SurveyType.sorry
          }
        />
      )}
      {type === "exam_date" && (
        <WhenIsYourExamDate
          bucket={bucket}
          email={email}
          type={type}
          appConfig={appConfig}
        />
      )}
      {type === "wait_result" && (
        <WhenWillYouGetYourResult
          bucket={bucket}
          email={email}
          type={type}
          appConfig={appConfig}
        />
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let { bucket, email, type } = context.query;
  if (!bucket || !email || !type) {
    return { notFound: true };
  }
  const data = fs.readFileSync("public/json/app_config.json").toString();
  const appConfigData = JSON.parse(data);
  const raw = appConfigData[bucket];
  if (!raw) {
    return { notFound: true };
  }

  const appConfig = {
    ...raw,
    appId: raw.appId ?? raw.Id,
    title:
      raw.android?.name ??
      raw.ios?.name ??
      raw.webConfig?.title ??
      "Practice Test",
    appShortName:
      raw.appShortName ?? raw.android?.shortName ?? raw.ios?.shortName ?? null,
    logoUrl:
      raw.webConfig?.assets?.appImages?.logo ??
      raw.android?.assets?.appImages?.logo ??
      raw.ios?.assets?.appImages?.logo ??
      raw.appIcon ??
      "/images/logo.png",
  };
  return { props: { bucket, email, type, appConfig } };
};
