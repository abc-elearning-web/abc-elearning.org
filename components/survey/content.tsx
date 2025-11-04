import { useRef, useState } from "react";
import { sendSurvey } from "../../services/home.service";
import { FILL_SURVEY, SUBMITTED_SURVEY } from "./data";
import HeaderSurvey from "./header";
import {
  SurveyContext,
  SurveyContextValue,
  useSurveyContext,
} from "./provider";
import { Thank } from "./thank";
import SurveyType, { SurveyData, SurveyQuestionType } from "./type";
export default function ExamPass({
  bucket,
  email,
  type,
  surveyType,
  appConfig,
  listSurvey,
}: {
  surveyType: SurveyType;
  appConfig: any;
  bucket: string;
  email: string;
  type: string;
  listSurvey: SurveyData[];
}) {
  const [tab, setTab] = useState(FILL_SURVEY);
  const [surveys, setSurveys] = useState<SurveyData[]>(() =>
    JSON.parse(JSON.stringify(listSurvey))
  );

  const onSubmit = async () => {
    const requiredErrors: number[] = [];
    for (let i = 0; i < surveys.length; i++) {
      const s = surveys[i];
      if (!s.require) continue;
      if (s.type === SurveyQuestionType.fill) {
        if ((s.options[0]?.content || "").trim().length === 0) {
          requiredErrors.push(i);
        }
      } else if (
        s.type === SurveyQuestionType.singleChoice ||
        s.type === SurveyQuestionType.rate
      ) {
        if (!s.options.some((o) => o.selected)) {
          requiredErrors.push(i);
        }
      } else if (s.type === SurveyQuestionType.multiChoices) {
        if (!s.options.some((o) => o.selected)) {
          requiredErrors.push(i);
        }
      }
    }

    if (requiredErrors.length > 0) {
      const el = document.querySelectorAll("[data-survey-item]")[
        requiredErrors[0]
      ] as HTMLElement | undefined;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const result = surveys.map((s) => ({
      ...s,
      options: s.options.map((o) => ({
        content: o.content,
        selected: !!o.selected,
        specify: o.specify,
      })),
    }));

    sendSurvey({
      type: surveyType,
      survey: result,
      email: email,
      bucket: bucket,
      appId: appConfig.appId,
    });

    setTab(SUBMITTED_SURVEY);
  };

  const updateFill = (qIndex: number, value: string) => {
    const next = [...surveys];
    next[qIndex].options[0].content = value;
    next[qIndex].options[0].selected = true;
    setSurveys(next);
  };

  const updateSingle = (qIndex: number, optIndex: number) => {
    const next = [...surveys];
    next[qIndex].options.forEach((o, i) => (o.selected = i === optIndex));
    setSurveys(next);
  };

  const updateRate = (qIndex: number, optIndex: number) => {
    const next = [...surveys];
    next[qIndex].options.forEach((o, i) => (o.selected = i === optIndex));
    setSurveys(next);
  };

  const toggleMulti = (qIndex: number, optIndex: number, checked: boolean) => {
    const next = [...surveys];
    next[qIndex].options[optIndex].selected = checked;
    setSurveys(next);
  };

  const updateSpecify = (qIndex: number, optIndex: number, value: string) => {
    const next = [...surveys];
    if (
      !next[qIndex] ||
      !next[qIndex].options ||
      !next[qIndex].options[optIndex]
    ) {
      return;
    }
    next[qIndex].options[optIndex].specify = {
      content: value,
      render: true,
    } as any;
    setSurveys(next);
  };

  const toggleSelectAll = (qIndex: number) => {
    const next = [...surveys];
    if (!next[qIndex] || !next[qIndex].options) {
      return;
    }
    const allSelected = next[qIndex].options.every((o) => o.selected);
    next[qIndex].options.forEach((option) => {
      option.selected = !allSelected;
    });
    setSurveys(next);
  };

  const surveyContextValue: SurveyContextValue = {
    surveys,
    setSurveys,
    updateFill,
    updateSingle,
    updateRate,
    toggleMulti,
    updateSpecify,
    toggleSelectAll,
  };

  return (
    <SurveyContext.Provider value={surveyContextValue}>
      <div className="bg-[#FFFFFF] min-h-screen pb-8">
        <HeaderSurvey surveyType={surveyType} appConfig={appConfig} tab={tab} />
        <div className="pb-8 px-4 sm:px-6 max-w-[1228px]  mx-auto">
          {tab === FILL_SURVEY ? (
            <div>
              <div className="relative mt-6">
                <p className="m-0 text-xl md:text-5xl leading-[30px] md:leading-[78px] text-gray-800 font-semibold block text-center">
                  Satisfaction Survey
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-4 sm:mt-6 sm:gap-6">
                {surveys.map((_, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-6 rounded-xl bg-[#2121210A] shadow-sm"
                    data-survey-item
                  >
                    <QuestionBlock index={index} />
                  </div>
                ))}
              </div>
              <div
                className="bg-[#3B6AD0] leading-9 text-sm rounded-lg text-white w-[116px] text-center mt-4 font-medium cursor-pointer"
                onClick={onSubmit}
              >
                Submit
              </div>
            </div>
          ) : (
            <Thank setTab={setTab} />
          )}
        </div>
      </div>
    </SurveyContext.Provider>
  );
}

const QuestionBlock = ({ index }: { index: number }) => {
  const { surveys } = useSurveyContext();
  const survey = surveys[index];
  return (
    <>
      <p className="font-medium block text-[14px] sm:text-2xl mb-4">
        {index + 1}. {survey.content}
        {survey.require ? <i className="text-red-500">*</i> : <i>(Optional)</i>}
      </p>
      <RenderContent index={index} />
    </>
  );
};

const RenderContent = ({ index }: { index: number }) => {
  const { surveys } = useSurveyContext();
  const survey = surveys[index];
  if (survey.type === SurveyQuestionType.singleChoice) {
    return <SurveyItemSingleChoice qIndex={index} />;
  }
  if (survey.type === SurveyQuestionType.fill) {
    return <SurveyItemFill qIndex={index} />;
  }
  if (survey.type === SurveyQuestionType.rate) {
    return <SurveyItemRate qIndex={index} />;
  }
  if (survey.type === SurveyQuestionType.multiChoices) {
    return <SurveyItemMultiChoices qIndex={index} />;
  }
  return null;
};

const SurveyItemFill = ({ qIndex }: { qIndex: number }) => {
  const { surveys, updateFill } = useSurveyContext();
  const value = surveys[qIndex]?.options?.[0]?.content || "";
  return (
    <input
      className="-w-full h-9 bg-[#F6F6F6] text-xs border-[#212121] font-medium sm:text-base  w-full sm:max-w-[380px] text-[#212121] placeholder:text-gray-400 border-b focus:outline-none"
      type="text"
      placeholder="Enter your answer"
      value={value}
      onChange={(e) => updateFill(qIndex, e.currentTarget.value)}
    />
  );
};

const SurveyItemSingleChoice = ({ qIndex }: { qIndex: number }) => {
  const { surveys, updateSingle, updateSpecify } = useSurveyContext();
  const options = surveys[qIndex]?.options || [];

  const selected = Math.max(
    0,
    options.findIndex((o) => o.selected)
  );
  const radioRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {options.map((option, index) => (
        <div
          key={index}
          className="flex gap-3 items-center cursor-pointer"
          onClick={(e) => {
            updateSingle(qIndex, index);
          }}
        >
          <input
            type="radio"
            width={24}
            height={24}
            checked={selected === index}
            onChange={() => updateSingle(qIndex, index)}
            className="w-4 sm:w-6 h-4 sm:h-6 border border-[#3B6AD0] rounded-full bg-white transition-colors cursor-pointer focus:outline-none focus:border-[#3B6AD0]"
          />

          <div className="flex flex-1 gap-2 items-center">
            <label
              className="cursor-pointer text-[#212121] text-xs sm:text-base font-medium "
              htmlFor={radioRef.current?.id}
            >
              {option.content}
            </label>
            {option?.specify?.render && (
              <SurveyItemSpecify
                value={option.specify?.content || ""}
                onChange={(v) => updateSpecify(qIndex, index, v)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const SurveyItemRate = ({ qIndex }: { qIndex: number }) => {
  const { surveys, updateRate } = useSurveyContext();
  const options = surveys[qIndex]?.options || [];
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.selected)
  );
  return (
    <div className="flex gap-3 justify-center items-end sm:items-center">
      <span className="text-xs font-medium whitespace-nowrap sm:text-base">
        Not Close At All
      </span>
      <div className="flex flex-row flex-nowrap gap-2 sm:gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex flex-col-reverse gap-1 items-center sm:flex-row sm:gap-3"
          >
            <input
              type="radio"
              name={`survey-${index}`}
              value={option.content}
              checked={selectedIndex === index}
              onChange={() => updateRate(qIndex, index)}
              className="w-4 sm:w-6 h-4 sm:h-6 border border-[#3B6AD0] rounded-full bg-white transition-colors cursor-pointer focus:outline-none focus:border-[#3B6AD0]"
            />
            <label
              htmlFor={`survey-${index}`}
              className="text-[#212121] cursor-pointer text-xs sm:text-base font-medium "
            >
              {option.content}
            </label>
          </div>
        ))}
      </div>

      <span className="text-xs font-medium whitespace-nowrap sm:text-base">
        Extremely Close
      </span>
    </div>
  );
};

const SurveyItemMultiChoices = ({ qIndex }: { qIndex: number }) => {
  const { surveys, toggleMulti, updateSpecify, toggleSelectAll } =
    useSurveyContext();
  const options = surveys[qIndex]?.options || [];
  const allSelected = options.length > 0 && options.every((o) => o.selected);

  return (
    <div className="flex flex-col gap-3 gap-y-4 sm:gap-4">
      <div
        className="text-[#0085FF] text-sm sm:text-lg cursor-pointer"
        onClick={() => toggleSelectAll(qIndex)}
      >
        {allSelected ? <p>Clear all</p> : <p>Select all</p>}
      </div>

      {options.map((option, index) => (
        <div
          key={index}
          className="flex gap-3 items-start cursor-pointer"
          onClick={(e) => {
            toggleMulti(qIndex, index, true);
          }}
        >
          <div className="inline-block relative z-10 w-4 h-4 sm:w-6 sm:h-6">
            <input
              type="checkbox"
              name={`survey-${index}`}
              value={option.content}
              checked={!!option.selected}
              onChange={(e) =>
                toggleMulti(qIndex, index, e.currentTarget.checked)
              }
              className="appearance-none absolute z-10 w-4 sm:w-6 h-4 sm:h-6 border border-[#3B6AD0] rounded-md bg-white transition-colors cursor-pointer checked:bg-transparent checked:border-[#3B6AD0] focus:outline-none focus:border-[#3B6AD0]"
            />
            {option.selected && (
              <div className="flex absolute top-0 bg-[#3B6AD0] rounded-md left-0 z-0 justify-center items-center w-4 h-4 transform sm:w-6 sm:h-6">
                <svg
                  className="w-3 h-3 text-white sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-1 gap-2 items-center">
            <label
              htmlFor={`survey-${index}`}
              className="text-[#212121] cursor-pointer text-xs sm:text-base font-medium "
            >
              {option.content}
            </label>
            {option?.specify?.render && (
              <SurveyItemSpecify
                value={option.specify?.content || ""}
                onChange={(v) => updateSpecify(qIndex, index, v)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const SurveyItemSpecify = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <>
      <i className="flex-none text-xs font-medium sm:text-base">
        (Please Specify:
      </i>
      <input
        className=" flex-1 min-w-0 border-0  text-xs font-medium sm:text-base border-b border-gray-800 focus:border-gray-800 focus:outline-none placeholder:text-gray-300 bg-[#F6F6F6]  max-w-[280px]"
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <i className="flex-none text-xs font-medium sm:text-base">)</i>
    </>
  );
};
