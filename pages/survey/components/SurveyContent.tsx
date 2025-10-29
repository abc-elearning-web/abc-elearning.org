import React from "react";
import { useRef, useState, useEffect } from "react";
import LogoApp from "./LogoApp";
import SurveyType, { SurveyData, SurveyQuestionType } from "./SurveyType";
import { sendSurvey } from "../services/home.service";
const FILL_SURVEY = 0;
const SUBMITED = 1;

const SurveyContent = ({
  bucket,
  email,
  type,
  appConfig,
  surveyType,
}: {
  bucket: string;
  email: string;
  type: string;
  appConfig: any;
  surveyType: SurveyType;
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(FILL_SURVEY);
  const listSurvey = getSurveyQuestion(appConfig, surveyType);
  const [surveys, setSurveys] = useState(listSurvey);

  const onSubmit = () => {
    let alertQuestionRequired = [];
    let alertQuestionOtherRequired = [];
    for (let i = 0; i < surveys.length; i++) {
      if (surveys[i].require) {
        if (surveys[i].type === SurveyQuestionType.fill) {
          // với câu hỏi điền thông tin thì nội dung điền đc lưu trong trường content của option[0]
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
      sendSurvey({
        type: surveyType,
        survey: result,
        email: email,
        bucket: bucket,
        appId: appConfig.appId,
      });
      setTab(SUBMITED);
    }
  };

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <div
        style={{ padding: "0 24px" }}
        className={
          surveyType === SurveyType.sorry
            ? "were-sorry-to-hear-that-you-didnt-pass-the-exam-container"
            : surveyType === SurveyType.congratulation
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
            <div
              className={`${
                surveyType === SurveyType.sorry
                  ? "bg-[#F0ECEC]"
                  : surveyType === SurveyType.congratulation
                  ? "bg-[#DAF8EF]"
                  : ""
              }`}
            >
              <div className="flex justify-center">
                <div className="w-full max-w-[1368px] max-h[474px] flex flex-col items-center mt-2  gap-2">
                  <LogoApp
                    appInfo={appConfig}
                    theme={"dark"}
                    size={tab == SUBMITED ? "l" : isDesktop ? "m" : "s"}
                  />
                  {tab === FILL_SURVEY ? (
                    surveyType === SurveyType.sorry ? (
                      <>
                        <div className="relative flex justify-center pt-2 pb-24 md:pb-20 ">
                          <div className="relative z-10 text-center max-w-[1006px] mx-auto">
                            <h1 className="text-center m-0 text-2xl md:text-5xl font-semibold text-red-500 max-w-[1006px] mx-auto">
                              We're sorry to hear that <br /> you didn't pass
                              the exam.
                            </h1>
                            <p className="m-0 mt-3 font-poppins text-[24px] leading-[36px] font-normal text-[#212121]/50">
                              Failure is an opportunity to learn. Keep moving
                              forward. Please take a few minutes to participate
                              in our survey. Your feedback is valuable for
                              improving our products. Thank you!
                            </p>

                            <div className="absolute inset-x-0 bottom-0 flex justify-center">
                              <img
                                src="/images/fail.png"
                                className="pointer-events-none max-w-[1373px] object-contain translate-y-[80px]"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : surveyType === SurveyType.congratulation ? (
                      <>
                        <div className="relative flex justify-center pt-2 pb-24 md:pb-40">
                          <div className="relative z-10 text-center max-w-[1006px] mx-auto">
                            <h1 className="m-0 text-2xl md:text-5xl font-semibold text-emerald-600 max-w-[1006px] mx-auto">
                              Congratulations on passing your test!
                            </h1>
                            <p className="m-0 mt-3 font-poppins text-[24px] leading-[36px] font-normal text-[#212121]/50">
                              Your hard work has paid off, and we are proud of
                              you. Please take a few minutes to complete our
                              survey. Your feedback is valuable for our
                              improvement efforts.
                              <br />
                              Thank you!
                            </p>
                          </div>

                          <div className="absolute inset-x-0 bottom-0 flex justify-center">
                            <img
                              src="/images/cons.png"
                              className="pointer-events-none max-w-[1373px] object-contain"
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="pb-8 max-w-[1228px] max-h[2178px] mx-auto">
          {tab === FILL_SURVEY ? (
            <div ref={ref}>
              <div className="mt-6 relative">
                <p className="m-0 text-xl md:text-5xl leading-[30px] md:leading-[78px] text-gray-800 font-semibold block text-center">
                  Satisfaction Survey
                </p>
              </div>
              {surveys.map((survey, index) => {
                return (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-[#2121210A] mt-4 shadow-sm"
                    id={"survey-item-" + index}
                  >
                    <p className="m-0 font-medium block text-[24px] leading-none mb-2">
                      {index + 1}. {survey.content}{" "}
                      {survey.require ? (
                        <i className="text-red-500">*</i>
                      ) : (
                        <i>(Optional)</i>
                      )}
                    </p>

                    {survey.type === SurveyQuestionType.fill ? (
                      <>
                        <input
                          className="
                                                 w-full mt-3 h-11
                                                 bg-[#F6F6F6]            
                                                 px-4  text-gray-800
                                                 placeholder:text-gray-400
                                                 border-b border-gray-800
                                                 focus:outline-none"
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
                        <div className="flex items-end mt-4 justify-center">
                          <span className="text-xs leading-10 font-medium">
                            Not close at all
                          </span>
                          <div className="flex flex-row flex-nowrap mx-3 gap-4">
                            {survey.options.map((option, i) => {
                              return (
                                <div
                                  className="flex items-center mb-2 w-6 md:w-8 justify-center"
                                  key={i}
                                >
                                  <label className="flex flex-col-reverse m-0 gap-2 cursor-pointer">
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
                                      className="appearance-none w-6 h-6
                                                 border-2 border-[#3B6AD0]
                                                 rounded-full bg-white        
                                                 checked:before:block                
                                                 checked:before:content-[''] checked:before:w-2.5 checked:before:h-2.5 checked:before:bg-[#3B6AD0]                           
                                                 transition-colors cursor-pointer"
                                    />
                                    <span className="text-base leading-5 font-medium text-center">
                                      {option.content.replace("#", "")}
                                    </span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>

                          <span className="text-xs leading-10 font-medium">
                            Extremely close
                          </span>
                        </div>
                      </>
                    ) : survey.type === SurveyQuestionType.multiChoices ? (
                      <>
                        <div className="mt-4">
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
                              <div className="flex items-center mb-2" key={i}>
                                <label className="flex items-center m-0 gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="appearance-none w-6 h-6 border border-[#3B6AD0] rounded-md bg-white
                                    checked:bg-[#3B6AD0] 
                                    checked:after:content-[''] 
                                    checked:after:block 
                                    checked:after:absolute
                                    checked:after:left-[9px]
                                    checked:after:top-[5px]
                                    checked:after:w-[6px]
                                    checked:after:h-[10px]
                                    checked:after:border-white
                                    checked:after:border-r-2
                                    checked:after:border-b-2
                                    checked:after:rotate-45
                                    relative
                                    focus:outline-none"
                                    id={`get-data ${index}-${i}`}
                                    value={option.content}
                                    checked={option.selected}
                                    onChange={(e) => {
                                      let checked = (
                                        e.currentTarget as HTMLInputElement
                                      ).checked;
                                      let _ = [...surveys];
                                      _[index].options[i].selected = checked;

                                      let btnSelectAll =
                                        document.getElementById(
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
                                            btnSelectAll.innerHTML =
                                              "Select all";
                                        }
                                      }

                                      setSurveys(_);
                                    }}
                                  />
                                  <span className="text-base leading-5 font-medium">
                                    {option.content.replace("#", "")}
                                  </span>
                                </label>
                                {option.content.endsWith("#") && (
                                  <>
                                    <i className="text-sm flex-none">
                                      (Please specify:
                                    </i>
                                    <input
                                      className="w-full ml-1 mb-3 block border-0 border-b border-gray-800 focus:border-gray-800 focus:outline-none placeholder:text-gray-300  max-w-[280px] bg-[#F6F6F6]"
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
                                    <i className="text-sm flex-none">)</i>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : survey.type === SurveyQuestionType.singleChoice ? (
                      <>
                        <div className="">
                          <div
                            className=""
                            aria-labelledby="radio-buttons-group-check-field"
                            role="radiogroup"
                          >
                            {survey.options.map((option, i) => {
                              return (
                                <div className="flex items-center mb-2" key={i}>
                                  <label className="flex items-center m-0 gap-1 cursor-pointer">
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
                                      className="appearance-none w-[24px] h-[24px]
                                                   border-2 border-[#3B6AD0]
                                                    rounded-full bg-white                        
                                                     checked:before:content-[''] checked:before:w-2.5 checked:before:h-2.5 checked:before:bg-[#3B6AD0]                        
                                                    transition-colors cursor-pointer"
                                    />
                                    <span className="text-base leading-5 font-medium">
                                      {option.content.replace("#", "")}
                                    </span>
                                  </label>
                                  {option.content.endsWith("#") && (
                                    <>
                                      <i className="text-sm flex-none">
                                        (Please specify:
                                      </i>
                                      <input
                                        className=" ml-1 mb-3 block border-0 border-b border-gray-800 focus:border-gray-800 focus:outline-none placeholder:text-gray-300  max-w-[280px] bg-[#F6F6F6]"
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
                                      <i className="text-sm flex-none">)</i>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="hidden">
                      <img src="/images/asvab/survey/img4.png" alt="" />
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
                    <div className="hidden">
                      <img src="/images/asvab/survey/img4.png" alt="" />
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
              <div
                className="bg-[#3B6AD0] leading-9 text-sm rounded-lg text-white w-[116px] text-center mt-4 font-medium cursor-pointer"
                onClick={onSubmit}
              >
                Submit
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl mt-4 bg-white">
              <p className="m-0 text-xl leading-[30px] text-gray-800 font-semibold">
                Satisfaction survey
              </p>
              <span className="m-0 text-sm leading-[21px] text-gray-800 block mt-2">
                Thank you for your feedback! Your input is valuable for
                improving our products.
              </span>
              <div
                className="text-sm leading-[21px] mt-2 text-blue-500 underline cursor-pointer"
                onClick={() => {
                  setTab(FILL_SURVEY);
                }}
              >
                Edit your answer
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getSurveyQuestion = (appConfig: any, type: SurveyType) => {
  let listSurvey: SurveyData[] = [];
  if (appConfig && appConfig.bucket) {
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
