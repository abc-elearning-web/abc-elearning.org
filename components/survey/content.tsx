import { createContext, useContext, useEffect, useRef, useState } from "react";
import HeaderSurvey from "./header";
import SurveyType, { SurveyData, SurveyQuestionType } from "./SurveyType";
import { Thank } from "./thank";
const FILL_SURVEY = 0;
const SUBMITED = 1;
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [surveys, setSurveys] = useState<SurveyData[]>(() =>
    JSON.parse(JSON.stringify(listSurvey))
  );
  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(
        typeof window !== "undefined" ? window.innerWidth >= 768 : false
      );
    };
    updateIsDesktop();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateIsDesktop);
      return () => window.removeEventListener("resize", updateIsDesktop);
    }
  }, []);

  const onSubmit = () => {
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
      // Scroll tới câu hỏi đầu tiên thiếu
      const el = document.querySelectorAll("[data-survey-item]")[
        requiredErrors[0]
      ] as HTMLElement | undefined;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Submit dữ liệu
    const result = surveys.map((s) => ({
      ...s,
      options: s.options.map((o) => ({
        content: o.content,
        selected: !!o.selected,
        specify: o.specify,
      })),
    }));
    // Tùy tích hợp backend sau, hiện log tạm
    setTab(SUBMITED);
  };

  const updateFill = (qIndex: number, value: string) => {
    const next = [...surveys];
    next[qIndex].options[0].content = value;
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

  const surveyContextValue: SurveyContextValue = {
    surveys,
    setSurveys,
    updateFill,
    updateSingle,
    updateRate,
    toggleMulti,
    updateSpecify,
  };

  return (
    <SurveyContext.Provider value={surveyContextValue}>
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <HeaderSurvey
          surveyType={surveyType}
          appConfig={appConfig}
          tab={tab}
          isDesktop={isDesktop}
        />
        <div className="pb-8 max-w-[1228px] max-h[2178px] mx-auto">
          {tab === FILL_SURVEY ? (
            <div>
              <div className="relative mt-6">
                <p className="m-0 text-xl md:text-5xl leading-[30px] md:leading-[78px] text-gray-800 font-semibold block text-center">
                  Satisfaction Survey
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-6 sm:gap-6">
                {surveys.map((_, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-[#2121210A] mt-4 shadow-sm"
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

type SurveyContextValue = {
  surveys: SurveyData[];
  setSurveys: (s: SurveyData[]) => void;
  updateFill: (qIndex: number, value: string) => void;
  updateSingle: (qIndex: number, optIndex: number) => void;
  updateRate: (qIndex: number, optIndex: number) => void;
  toggleMulti: (qIndex: number, optIndex: number, checked: boolean) => void;
  updateSpecify: (qIndex: number, optIndex: number, value: string) => void;
};

const SurveyContext = createContext<SurveyContextValue | null>(null);

const useSurveyContext = () => {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error("SurveyContext is not available");
  return ctx;
};

const QuestionBlock = ({ index }: { index: number }) => {
  const { surveys } = useSurveyContext();
  const survey = surveys[index];
  return (
    <>
      <p className="m-0 font-medium block text-[14px] md:text-[24px] leading-normal mb-4">
        {index + 1}. {survey.content}{" "}
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
      className="-w-full mt-3 h-11 bg-[#F6F6F6] px-4 w-full sm:max-w-[380px] text-gray-800 placeholder:text-gray-400 border-b border-gray-800 focus:outline-none"
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
            className=" w-[24px] h-[24px] border-2 border-[#3B6AD0] rounded-full bg-white  transition-colors cursor-pointer"
          />
          <label className="cursor-pointer" htmlFor={radioRef.current?.id}>
            {option.content}
          </label>
          {option?.specify?.render && (
            <SurveyItemSpecify
              value={option.specify?.content || ""}
              onChange={(v) => updateSpecify(qIndex, index, v)}
            />
          )}
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
    <div className="flex gap-3 justify-center items-center">
      <span className="text-xs font-medium whitespace-nowrap text-[10.5px] text-left ">
        Not Close At All
      </span>
      <div className="flex flex-row flex-nowrap gap-4 mx-3">
        {options.map((option, index) => (
          <div key={index} className="flex gap-3 items-center">
            <input
              type="radio"
              name={`survey-${index}`}
              value={option.content}
              checked={selectedIndex === index}
              onChange={() => updateRate(qIndex, index)}
              className=" w-4 sm:w-6 h-4 sm:h-6 border-2 border-[#3B6AD0] rounded-full bg-white  transition-colors cursor-pointer"
            />
            <label htmlFor={`survey-${index}`}>{option.content}</label>
          </div>
        ))}
      </div>

      <span className="text-xs font-medium whitespace-nowrap text-[10.5px] text-right ">
        Extremely Close
      </span>
    </div>
  );
};

const SurveyItemMultiChoices = ({ qIndex }: { qIndex: number }) => {
  const { surveys, toggleMulti, updateSpecify } = useSurveyContext();
  const options = surveys[qIndex]?.options || [];
  return (
    <div className="flex flex-col gap-3 gap-y-4 sm:gap-4">
      {options.map((option, index) => (
        <div
          key={index}
          className="flex gap-3 items-center cursor-pointer"
          onClick={(e) => {
            toggleMulti(qIndex, index, true);
          }}
        >
          <input
            type="checkbox"
            name={`survey-${index}`}
            value={option.content}
            checked={!!option.selected}
            onChange={(e) =>
              toggleMulti(qIndex, index, e.currentTarget.checked)
            }
            className=" w-[24px] h-[24px] border-2 border-[#3B6AD0]   rounded-md bg-white  transition-colors cursor-pointer"
            width={24}
            height={24}
          />
          <label htmlFor={`survey-${index}`}>{option.content}</label>
          {option?.specify?.render && (
            <SurveyItemSpecify
              value={option.specify?.content || ""}
              onChange={(v) => updateSpecify(qIndex, index, v)}
            />
          )}
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
    <div>
      <i className="text-[12px] md:text-sm flex-none">(Please Specify:</i>
      <input
        className="ml-2 flex-1 min-w-0 border-0 border-b border-gray-800 focus:border-gray-800 focus:outline-none placeholder:text-gray-300 bg-[#F6F6F6] px-2 py-1 max-w-[280px]"
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <i className="text-[12px] md:text-sm flex-none">)</i>
    </div>
  );
};
