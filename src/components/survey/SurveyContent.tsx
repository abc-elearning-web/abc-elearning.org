"use client";
import MyContainer from "@/components/container";
import { IAppInfo } from "@/model/AppInfo";
import { sendSurvey } from "@/services";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import RadioGroup from "@mui/material/RadioGroup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef, useState } from "react";
import LogoApp from "./LogoApp";
import "./SurveyContent.scss";
import SurveyType, { SurveyData, SurveyQuestionType } from "./SurveyType";
const FILL_SURVEY = 0;
const SUBMITED = 1;

const SurveyContent = ({
  appInfo,
  deviceId,
  type,
}: {
  appInfo: IAppInfo;
  deviceId: string;
  type: SurveyType;
}) => {
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const ref = useRef<HTMLDivElement>();
  const [tab, setTab] = useState(FILL_SURVEY);
  const listSurvey = getSurveyQuestion(appInfo, type);
  const [surveys, setSurveys] = useState(listSurvey);

  const onSubmit = () => {
    let alertQuestionRequired = [];
    let alertQuestionOtherRequired = [];
    for (let i = 0; i < surveys.length; i++) {
      if (surveys[i].require) {
        if (surveys[i].type === SurveyQuestionType.fill) {
          // với câu hỏi điền thôgn tin thì nội dung điền đc lưu trong trường content của option[0]
          if (surveys[i].options[0].content.trim().length === 0) {
            alertQuestionRequired.push(i);
          }
        } else {
          if (surveys[i].options.filter((_) => _.selected).length === 0) {
            alertQuestionRequired.push(i);
          } else {
            // trường hợp chọn Other thì phải check điền thêm thông tin
            let otherOption = surveys[i].options.find(
              (_) => _.content.startsWith("Other#") && _.selected
            );
            if (!!otherOption) {
              let otherContent = !!otherOption?.specify?.trim();
              if (!otherContent) {
                alertQuestionOtherRequired.push(i);
              }
            }
          }
        }
      }
    }

    if (alertQuestionRequired.length > 0) {
      document
        .getElementById("survey-item-" + alertQuestionRequired[0])
        .scrollIntoView({ behavior: "smooth" });
      for (let i = 0; i < surveys.length; i++) {
        let item = document.getElementById("survey-item-" + i);
        item.className = item.className
          .replaceAll("alert-required-other-content", "")
          .trim();
        item.className = item.className.replaceAll("alert-required", "").trim();
        if (alertQuestionRequired.includes(i)) {
          item.className += " alert-required";
        }
      }
    } else if (alertQuestionOtherRequired.length > 0) {
      document
        .getElementById("survey-item-" + alertQuestionOtherRequired[0])
        .scrollIntoView({ behavior: "smooth" });
      for (let i = 0; i < surveys.length; i++) {
        let item = document.getElementById("survey-item-" + i);
        item.className = item.className
          .replaceAll("alert-required-other-content", "")
          .trim();
        item.className = item.className.replaceAll("alert-required", "").trim();
        if (alertQuestionOtherRequired.includes(i)) {
          item.className += " alert-required-other-content";
        }
      }
    } else {
      let result = surveys.map((item) => {
        let options = item.options.filter((_) => {
          if (item.type !== SurveyQuestionType.fill && !_.selected) {
            return false;
          }
          return true;
        });

        return { ...item, options };
      });
      sendSurvey({ type, survey: result, deviceId, appId: appInfo.appId });
      setTab(SUBMITED);
    }
  };

  return (
    <div style={{ background: "#F5F4EE", minHeight: "100vh" }}>
      <MyContainer
        className={
          type === SurveyType.sorry
            ? "were-sorry-to-hear-that-you-didnt-pass-the-exam-container"
            : type === SurveyType.congratulation
            ? "congratulations-on-passing-your-test-container"
            : ""
        }
      >
        <header>
          <div
            style={{
              justifyContent: tab === FILL_SURVEY ? "end" : "center",
            }}
          >
            <LogoApp
              appInfo={appInfo}
              theme={"dark"}
              size={tab == SUBMITED ? "l" : isDesktop ? "m" : "s"}
            />
            {tab === FILL_SURVEY ? (
              type === SurveyType.sorry ? (
                <>
                  <h1>
                    We're sorry to hear that <br /> you didn't pass the exam.
                  </h1>
                  <p>
                    Failure is an opportunity to learn. Keep moving forward.
                    Please take a few minutes to participate in our survey. Your
                    feedback is valuable for improving our products. Thank you!
                  </p>
                </>
              ) : type === SurveyType.congratulation ? (
                <>
                  <h1>
                    Congratulations <br /> on passing your test!
                  </h1>
                  <p>
                    Your hard work has paid off, and we are proud of you. Please
                    take a few minutes to complete our survey. Your feedback is
                    valuable for our improvement efforts. Thank you!
                  </p>
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
        </header>

        <MyContainer
          className="custom-container"
          style={{ paddingBottom: "32px" }}
        >
          {tab === FILL_SURVEY ? (
            <div className="tab-fill-survey" ref={ref}>
              <div className="tab-label" style={{ position: "relative" }}>
                <img
                  style={{ position: "absolute", left: 0, bottom: "8px" }}
                  className="img1"
                  src="/images/asvab/survey/img3.png"
                  alt=""
                />
                <p>Satisfaction Survey</p>
                <img
                  style={{ position: "absolute", right: 0, top: "-6px" }}
                  className="img1"
                  src="/images/asvab/survey/img1.png"
                  alt=""
                />
              </div>
              {surveys.map((survey, index) => {
                return (
                  <div
                    key={index}
                    className="passed-survey-item"
                    id={"survey-item-" + index}
                  >
                    <p>
                      {index + 1}. {survey.content}{" "}
                      {survey.require ? (
                        <i style={{ color: "#FF2424" }}>*</i>
                      ) : (
                        <i>(Optional)</i>
                      )}
                    </p>

                    {survey.type === SurveyQuestionType.fill ? (
                      <>
                        <input
                          className="text-field"
                          type="text"
                          placeholder="Enter your answer"
                          id={`get-data ${index}`}
                          value={survey.options[0].content}
                          onChange={(e) => {
                            let _ = [...surveys];
                            _[index].options[0].content = e.currentTarget.value;
                            setSurveys(_);
                          }}
                        />
                      </>
                    ) : survey.type === SurveyQuestionType.rate ? (
                      <>
                        <div className="rate-field">
                          <span>Not close at all</span>
                          <RadioGroup
                            className="radio-buttons-group"
                            aria-labelledby="radio-buttons-group"
                            name="radio-buttons-group"
                          >
                            {survey.options.map((option, i) => {
                              return (
                                <div className="option-item" key={i}>
                                  <FormControlLabel
                                    value={option}
                                    control={
                                      <input
                                        type="radio"
                                        id={`get-data ${index}-${i}`}
                                        name={"rate-" + index}
                                        value={option.content}
                                        checked={option.selected}
                                        onChange={(e) => {
                                          let _ = [...surveys];
                                          _[index].options[i].selected =
                                            e.currentTarget.checked;
                                          setSurveys(_);
                                        }}
                                      />
                                    }
                                    label={option.content.replace("#", "")}
                                  />
                                </div>
                              );
                            })}
                          </RadioGroup>

                          <span>Extremely close</span>
                        </div>
                      </>
                    ) : survey.type === SurveyQuestionType.multiChoices ? (
                      <>
                        <FormGroup
                          className="check-field"
                          sx={{ marginTop: "16px" }}
                        >
                          {/* <FormControlLabel
                                                        control={<input type="checkbox" id="select-all" value={"Select all"} />}
                                                        label="Select all"
                                                        onChange={(e) => {
                                                            let listOption =
                                                                e.currentTarget.parentElement.parentElement.getElementsByTagName(
                                                                    "input"
                                                                ); // check box and text
                                                            if (listOption) {
                                                                let selectAll = false;
                                                                for (let option of listOption) {
                                                                    if (
                                                                        option.type === "checkbox" &&
                                                                        option.id === "select-all"
                                                                    ) {
                                                                        selectAll = option.checked;
                                                                    }
                                                                }

                                                                let _ = [...surveys];
                                                                _[index].options.forEach((__) => {
                                                                    __.selected = selectAll;
                                                                });
                                                                setSurveys(_);
                                                            }
                                                        }}
                                                    /> */}
                          <div
                            style={{
                              color: "#0085FF",
                              fontSize: "18px",
                              lineHeight: "27px",
                              marginLeft: "16px",
                              marginBottom: "8px",
                              cursor: "pointer",
                            }}
                            id={"select-all-" + index}
                            onClick={(e) => {
                              let listOption =
                                e.currentTarget.parentElement.parentElement.getElementsByTagName(
                                  "input"
                                ); // check box and text
                              if (listOption) {
                                let selectAll = false;
                                if (
                                  e.currentTarget.innerHTML === "Select all"
                                ) {
                                  selectAll = true;
                                  e.currentTarget.innerHTML = "Clear all";
                                } else if (
                                  e.currentTarget.innerHTML === "Clear all"
                                ) {
                                  selectAll = false;
                                  e.currentTarget.innerHTML = "Select all";
                                }

                                let _ = [...surveys];
                                _[index].options.forEach((__) => {
                                  if (!__.content.startsWith("Other#"))
                                    __.selected = selectAll;
                                  if (
                                    __.content.startsWith("Other#") &&
                                    selectAll === false
                                  )
                                    __.selected = selectAll;
                                });
                                setSurveys(_);
                              }
                            }}
                          >
                            Select all
                          </div>
                          {survey.options.map((option, i) => {
                            return (
                              <div className="option-item" key={i}>
                                <FormControlLabel
                                  control={
                                    <input
                                      type="checkbox"
                                      id={`get-data ${index}-${i}`}
                                      value={option.content}
                                    />
                                  }
                                  label={option.content.replace("#", "")}
                                  sx={{ marginLeft: "8px" }}
                                  checked={option.selected}
                                  onChange={(e) => {
                                    let checked = (
                                      e.currentTarget as HTMLInputElement
                                    ).checked;
                                    let _ = [...surveys];
                                    _[index].options[i].selected = checked;

                                    let btnSelectAll = document.getElementById(
                                      "select-all-" + index
                                    );
                                    if (checked) {
                                      if (!!btnSelectAll)
                                        btnSelectAll.innerHTML = "Clear all";
                                    } else {
                                      if (
                                        !_[index].options.find(
                                          (__) => __.selected
                                        )
                                      ) {
                                        // nếu không còn lựa chọn nào thì chuyển thành select all
                                        if (!!btnSelectAll)
                                          btnSelectAll.innerHTML = "Select all";
                                      }
                                    }

                                    setSurveys(_);
                                  }}
                                />
                                {option.content.endsWith("#") && (
                                  <>
                                    <i className="adding-info">
                                      (Please specify:
                                    </i>
                                    <input
                                      className="text-field adding-info"
                                      type="text"
                                      id={`get-data ${index}-${i}-1`}
                                      value={option.specify}
                                      onChange={(e) => {
                                        let _ = [...surveys];
                                        _[index].options[i].specify =
                                          e.currentTarget.value;
                                        setSurveys(_);
                                      }}
                                    />
                                    <i className="adding-info">)</i>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </FormGroup>
                      </>
                    ) : survey.type === SurveyQuestionType.singleChoice ? (
                      <>
                        <div className="radio-field">
                          <RadioGroup
                            className="radio-buttons-group-check-field"
                            aria-labelledby="radio-buttons-group-check-field"
                            name="radio-buttons-group-check-field"
                          >
                            {survey.options.map((option, i) => {
                              return (
                                <div className="option-item" key={i}>
                                  <FormControlLabel
                                    value={option}
                                    control={
                                      <input
                                        type="radio"
                                        id={`get-data ${index}-${i}`}
                                        name={"radio-" + index}
                                        value={option.content}
                                        checked={option.selected}
                                        onChange={(e) => {
                                          let _ = [...surveys];
                                          _[index].options.forEach((__) => {
                                            __.selected = false;
                                          });
                                          _[index].options[i].selected =
                                            e.currentTarget.checked;
                                          setSurveys(_);
                                        }}
                                      />
                                    }
                                    label={option.content.replace("#", "")}
                                  />
                                  {option.content.endsWith("#") && (
                                    <>
                                      <i className="adding-info">
                                        (Please specify:
                                      </i>
                                      <input
                                        className="text-field adding-info"
                                        type="text"
                                        id={`get-data ${index}-${i}-1`}
                                        value={option.specify}
                                        onChange={(e) => {
                                          let _ = [...surveys];
                                          _[index].options[i].specify =
                                            e.currentTarget.value;
                                          setSurveys(_);
                                        }}
                                      />
                                      <i className="adding-info">)</i>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="alert">
                      <ErrorOutlineRoundedIcon htmlColor="#FF2424" />
                      <span
                        style={{
                          color: "#FF2424",
                          fontSize: "14px",
                          marginLeft: "16px",
                        }}
                      >
                        This is a required question!
                      </span>
                    </div>
                    <div className="alert-other-content">
                      <ErrorOutlineRoundedIcon htmlColor="#FF2424" />
                      <span
                        style={{
                          color: "#FF2424",
                          fontSize: "14px",
                          marginLeft: "16px",
                        }}
                      >
                        Please specify!
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="submit-survey" onClick={onSubmit}>
                Submit
              </div>
            </div>
          ) : (
            <div className="tab-submited">
              <p>Satisfaction survey</p>
              <span>
                Thank you for your feedback! Your input is valuable for
                improving our products.
              </span>
              <div
                onClick={() => {
                  setTab(FILL_SURVEY);
                }}
              >
                Edit your answer
              </div>
            </div>
          )}
        </MyContainer>
      </MyContainer>
    </div>
  );
};

const getSurveyQuestion = (appInfo: IAppInfo, type: SurveyType) => {
  let listSurvey: SurveyData[] = [];
  const isAppASVAB = appInfo.appShortName === "asvab";
  if (isAppASVAB) {
    if (type === SurveyType.sorry) {
      listSurvey = [
        {
          content: "What score did you get?",
          type: SurveyQuestionType.fill,
          options: [{ content: "", selected: false }],
          require: true,
        },
        {
          content:
            "What do you believe was the reason(s) for your exam failure? (Please select all that apply)",
          type: SurveyQuestionType.multiChoices,
          options: [
            {
              content:
                "Insufficient time dedicated to learning and preparation",
              selected: false,
            },
            {
              content:
                "Practice questions in the app did not accurately reflect the real exam",
              selected: false,
            },
            {
              content:
                "Features in the app were not helpful for exam preparation",
              selected: false,
            },
            { content: "Other#", selected: false, specify: "" },
          ],
          require: true,
        },
        {
          content: "How frequently did you use our app to study for the exam?",
          type: SurveyQuestionType.singleChoice,
          options: [
            { content: "Daily", selected: false },
            { content: "Several times a week", selected: false },
            { content: "Once a week", selected: false },
            { content: "Rarely", selected: false },
          ],
          require: true,
        },
        {
          content:
            "Did you encounter any specific topics on the exam that you felt unprepared for based on the app's practice content?",
          type: SurveyQuestionType.multiChoices,
          options: [
            { content: "General science", selected: false },
            { content: "Arithmetic reasoning", selected: false },
            { content: "Word knowledge", selected: false },
            { content: "Paragraph comprehension", selected: false },
            { content: "Mathematics knowledge", selected: false },
            { content: "Electronics information", selected: false },
            { content: "Auto and shop information", selected: false },
            { content: "Mechanical comprehension", selected: false },
            { content: "Assembling objects", selected: false },
          ],
          require: true,
        },
        {
          content:
            "What features do you think the app could improve on to better help users pass their exams?",
          type: SurveyQuestionType.multiChoices,
          options: [
            { content: "Diagnostic test", selected: false },
            { content: "Practice questions", selected: false },
            { content: "Explanations for answers", selected: false },
            { content: "Passing possibility", selected: false },
            { content: "Study plan", selected: false },
            { content: "Exam simulator", selected: false },
            { content: "Final test", selected: false },
            { content: "Other#", selected: false, specify: "" }, // **dấu # sẽ tương ứng với việc điền thêm thông tin vào lựa chọn
          ],
          require: true,
        },
        {
          content:
            "Would you be willing to try the app again if we implemented improvements based on user feedback?",
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
    } else if (type === SurveyType.congratulation) {
      listSurvey = [
        {
          content: "What score did you get?",
          type: SurveyQuestionType.fill,
          options: [{ content: "", selected: false }],
          require: true,
        },
        {
          content: "How frequently did you use our app to study for the exam?",
          type: SurveyQuestionType.singleChoice,
          options: [
            { content: "Daily", selected: false },
            { content: "Weekly", selected: false },
            { content: "Few times a week", selected: false },
            { content: "Less than once a week", selected: false },
          ],
          require: true,
        },
        {
          content:
            "On a scale of 1-5, please rate the closeness of the practice questions in our app compared to the real exam.",
          type: SurveyQuestionType.rate,
          options: [
            { content: "1", selected: false },
            { content: "2", selected: false },
            { content: "3", selected: false },
            { content: "4", selected: false },
            { content: "5", selected: false },
          ],
          require: true,
        },
        {
          content:
            "Which specific features of our app did you find most beneficial in your exam preparation? (Check all that apply)",
          type: SurveyQuestionType.multiChoices,
          options: [
            { content: "Diagnostic test", selected: false },
            { content: "Practice questions", selected: false },
            { content: "Explanations for answers", selected: false },
            { content: "Passing possibility", selected: false },
            { content: "Study plan", selected: false },
            { content: "Exam simulator", selected: false },
            { content: "Final test", selected: false },
            { content: "Other#", selected: false, specify: "" }, // **dấu # sẽ tương ứng với việc điền thêm thông tin vào lựa chọn
          ],
          require: true,
        },
        {
          content: "How did you hear about our app?",
          type: SurveyQuestionType.singleChoice,
          options: [
            { content: "Online search", selected: false },
            { content: "Social media", selected: false },
            { content: "Word of mouth", selected: false },
            { content: "Other#", selected: false, specify: "" },
          ],
          require: false,
        },
        {
          content:
            "Would you recommend our app to others preparing for the same exam?",
          type: SurveyQuestionType.singleChoice,
          options: [
            { content: "Yes", selected: false },
            { content: "No", selected: false },
          ],
          require: false,
        },
        {
          content:
            "Could you please rate us with a 5-star rating on the Store? It is the best encouragement for our team.",
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
    }
  }

  return listSurvey;
};

export default SurveyContent;
