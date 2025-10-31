import SurveyType, { SurveyData } from "../components/survey/type";

const base = "https://api-cms-v2-dot-micro-enigma-235001.appspot.com"; //"http://localhost:3001"; //

const POST = async ({ url, params }: { url: string; params: any }) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

export const sendSurvey = async (survey: {
  type: SurveyType;
  survey: SurveyData[];
  email: string;
  bucket: string;
  appId: number;
}) => {
  const typeMapping = {
    [SurveyType.congratulation]: "mail-exam-pass",
    [SurveyType.sorry]: "mail-exam-fail",
    [SurveyType.examDate]: "mail-exam-no-date",
    [SurveyType.waitResult]: "mail-exam-no-result",
  };

  const action = typeMapping[survey.type] || "mail-exam-pass";
  let url = `${base}/api/survey/send-survey?bucket=${survey.bucket}&email=${survey.email}&query=${action}&type=${survey.type}`;

  let response = await POST({
    url,
    params: {
      survey: survey.survey,
      appId: survey.appId,
    },
  });
  return response;
};
