import ExamPass from "@/components/survey/content";
import {
  listSurveyExamFail,
  listSurveyExamPass,
} from "@/components/survey/data";
import SurveyType from "@/components/survey/type";
import WhenIsYourExamDate from "@/components/survey/when-is-your-exam-date";
import WhenWillYouGetYourResult from "@/components/survey/when-will-you-get-your-result";
import fs from "fs";
import { notFound } from "next/navigation";

async function getSurveyData(bucket: string, email: string, type: string) {
  if (!bucket || !email || !type) {
    return null;
  }
  const data = fs.readFileSync("public/json/app_config.json", "utf-8");
  const appConfigData = JSON.parse(data);
  const raw = appConfigData[bucket];

  if (!raw) {
    return null;
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
  return { bucket, email, type, appConfig };
}

export default async function Survey({
  searchParams,
}: {
  searchParams: Promise<{ bucket?: string; email?: string; type?: string }>;
}) {
  const { bucket, email, type } = await searchParams;

  if (!bucket || !email || !type) {
    notFound();
  }

  const data = await getSurveyData(bucket, email, type);

  if (!data) {
    notFound();
  }

  const { appConfig } = data;

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
