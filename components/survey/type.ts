export enum SurveyQuestionType {
  fill = 1,
  singleChoice = 2,
  multiChoices = 3,
  rate = 4,
}

export type SurveyData = {
  content: string;
  type: SurveyQuestionType;
  options: {
    content: string;
    selected: boolean;
    specify?: { content: string; render: boolean };
  }[];
  require: boolean;
};

export type SurveyResponse = {
  index: number;
  type: number;
  values: string[];
};

enum SurveyType {
  congratulation = "congratulation",
  sorry = "sorry",
  examDate = "exam-date",
  waitResult = "wait-result",
}
export default SurveyType;

export interface SurveyForm {}
