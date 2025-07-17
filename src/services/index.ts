const base = "https://api-cms-v2-dot-micro-enigma-235001.appspot.com"; //"http://localhost:3001"; //

enum SurveyType {
  congratulation = "congratulation",
  sorry = "sorry",
  examDate = "exam-date",
  waitResult = "wait-result",
}
export type SurveyData = {
  content: string;
  type: SurveyQuestionType;
  options: { content: string; selected: boolean; specify?: string }[];
  require: boolean;
};
export enum SurveyQuestionType {
  fill = 1,
  singleChoice = 2,
  multiChoices = 3,
  rate = 4,
}

export const sendSurvey = async (survey: {
  type: SurveyType;
  survey: SurveyData[];
  deviceId: string;
  appId: number;
}) => {
  let url = base + `/api/survey/send-survey`;
  if (!survey.deviceId) {
    survey.deviceId = Date.now() + "";
  }

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(survey),
  });

  return response.json();
};
