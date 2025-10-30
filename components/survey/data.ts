import { SurveyQuestionType } from "./SurveyType";

export const listSurveyExamPass = [
  {
    content: "What Score Did You Get?",
    type: SurveyQuestionType.fill,
    options: [{ content: "", selected: false }],
    require: true,
  },
  {
    content: "How Frequently Did You Use Our App To Study For The Exam?",
    type: SurveyQuestionType.singleChoice,
    options: [
      { content: "Daily", selected: true },
      { content: "Weekly", selected: false },
      { content: "Few Times A Week", selected: false },
      { content: "Less Than Once A Week", selected: false },
    ],
    require: true,
  },
  {
    content:
      "How Close Are The Practice Questions In Our App Compared To The Real Exam?",
    type: SurveyQuestionType.rate,
    options: [
      { content: "1", selected: false },
      { content: "2", selected: false },
      { content: "3", selected: false },
      { content: "4", selected: false },
      { content: "5", selected: true },
    ],
    require: true,
  },
  {
    content:
      "Which Specific Features Of Our App Did You Find Most Beneficial In Your Exam Preparation? (Check All That Apply)",
    type: SurveyQuestionType.multiChoices,
    options: [
      { content: "Diagnostic Test", selected: false },
      { content: "Study By Topics", selected: false },
      { content: "Daily Challenge", selected: false },
      { content: "Passing possibility", selected: false },
      { content: "Practice Test", selected: false },
      { content: "Mentora", selected: false },
      { content: "Exam Simulator", selected: false },
      { content: "Final Test", selected: false },
      {
        content: "Other",
        selected: false,
        specify: {
          content: "",
          render: true,
        },
      },
    ],
    require: true,
  },
  {
    content: "How Did You Hear About Our App?",
    type: SurveyQuestionType.singleChoice,
    options: [
      { content: "Online Search", selected: true },
      { content: "Social Media", selected: false },
      { content: "Word Of Mouth", selected: false },
      {
        content: "Other",
        selected: false,
        specify: {
          content: "",
          render: true,
        },
      },
    ],
    require: false,
  },
  {
    content:
      "Would You Recommend Our App To Others Preparing For The Same Exam?",
    type: SurveyQuestionType.singleChoice,
    options: [
      { content: "Yes", selected: true },
      { content: "No", selected: false },
    ],
    require: false,
  },
  {
    content:
      "Could You Please Rate Us With A 5-Star Rating On The Store? It Is The Best Encouragement For Our Team.",
    type: SurveyQuestionType.singleChoice,
    options: [
      { content: "Yes", selected: true },
      { content: "No", selected: false },
    ],
    require: false,
  },
  {
    content:
      "Do You Have Any Additional Feedback Or Suggestions To Help Us Further Improve Our App?",
    type: SurveyQuestionType.fill,
    options: [{ content: "", selected: false }],
    require: false,
  },
];

export const listSurveyExamFail = [
  {
    content: "What Score Did You Get?",
    type: SurveyQuestionType.fill,
    options: [{ content: "", selected: false }],
    require: true,
  },
  {
    content:
      "What Do You Believe Was The Reason(s) For Your Exam Failure? (Please Select All That Apply)",
    type: SurveyQuestionType.multiChoices,
    options: [
      {
        content: "Insufficient Time Dedicated To Learning And Preparation",
        selected: false,
      },
      {
        content:
          "Practice Questions In The App Did Not Accurately Reflect The Real Exam",
        selected: false,
      },
      {
        content: "Features In The App Were Not Helpful For Exam Preparation",
        selected: false,
      },
      {
        content: "Other",
        selected: false,
        specify: { content: "", render: true },
      },
    ],
    require: true,
  },
  {
    content: "How Frequently Did You Use Our App To Study For The Exam?",
    type: SurveyQuestionType.singleChoice,
    options: [
      { content: "Daily", selected: false },
      { content: "Several Times A Week", selected: false },
      { content: "Once A Week", selected: false },
      { content: "Occasionally", selected: false },
      { content: "Rarely", selected: false },
    ],
    require: true,
  },
  {
    content:
      "Did You Encounter Any Specific Topics On The Exam That You Felt Unprepared For Based On The App's Practice Content?",
    type: SurveyQuestionType.multiChoices,
    options: [
      { content: "Arithmetic Reasoning", selected: false },
      { content: "Assembling Objects", selected: false },
      { content: "Auto and Shop Information", selected: false },
      { content: "Electronics Information", selected: false },
      { content: "General Science", selected: false },
      { content: "Mathematics Knowledge", selected: false },
      { content: "Word Knowledge", selected: false },
      {
        content: "Other",
        selected: false,
        specify: { content: "", render: true },
      },
    ],
    require: true,
  },
  {
    content:
      "What Features Do You Think The App Could Improve On To Better Help Users Pass Their Exams?",
    type: SurveyQuestionType.multiChoices,
    options: [
      { content: "Diagnostic test", selected: false },
      { content: "Study By Topics", selected: false },
      { content: "Daily Challenge", selected: false },
      { content: "Passing possibility", selected: false },
      { content: "Practice Test", selected: false },
      { content: "Mentora", selected: false },
      { content: "Exam Simulator", selected: false },
      { content: "Final Test", selected: false },
      {
        content: "Other",
        selected: false,
        specify: { content: "", render: true },
      },
    ],
    require: true,
  },
  {
    content:
      "Would You Be Willing To Try The App Again If We Implemented Improvements Based On User Feedback?",
    type: SurveyQuestionType.singleChoice,
    options: [
      { content: "Yes", selected: false },
      { content: "No", selected: false },
    ],
    require: false,
  },

  {
    content:
      "Do you have any additional feedback or suggestions to help us further improve our app?",
    type: SurveyQuestionType.fill,
    options: [{ content: "", selected: false }],
    require: false,
  },
];
