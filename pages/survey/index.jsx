import ExamPass from "@/components/survey/content";
import {
  listSurveyExamFail,
  listSurveyExamPass,
} from "@/components/survey/data";
import SurveyType from "@/components/survey/type";
import WhenIsYourExamDate from "@/components/survey/when-is-your-exam-date";
import WhenWillYouGetYourResult from "@/components/survey/when-will-you-get-your-result";
import fs from "fs";

export default function Survey({ bucket, email, type, appConfig }) {
  return (
    <div>
      {type === "mail-exam-pass" && (
        <ExamPass
          bucket={bucket}
          listSurvey={listSurveyExamPass}
          type={type}
          email={email}
          surveyType={SurveyType.congratulation}
          appConfig={appConfig}
        />
      )}
      {type === "mail-exam-fail" && (
        <ExamPass
          bucket={bucket}
          listSurvey={listSurveyExamFail}
          type={type}
          email={email}
          surveyType={SurveyType.sorry}
          appConfig={appConfig}
        />
      )}
      {type === "mail-exam-no-date" && (
        <WhenIsYourExamDate
          bucket={bucket}
          email={email}
          type={type}
          appConfig={appConfig}
        />
      )}
      {type === "mail-exam-no-result" && (
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
