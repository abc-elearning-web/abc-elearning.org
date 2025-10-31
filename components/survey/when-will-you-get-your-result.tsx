import { useEffect, useState } from "react";
import { sendSurvey } from "../../services/home.service";
import Calendar from "./calendar";
import LogoApp from "./logoAppSurvey";
import SurveyType from "./type";

const SELECT_EXAM_DATE_TAB = 0;
const SUBMITED = 1;
const WhenWillYouGetYourResult = ({
  bucket,
  email,
  type,
  appConfig,
}: {
  bucket: string;
  email: string;
  type: string;
  appConfig: any;
}) => {
  const [tab, setTab] = useState(SELECT_EXAM_DATE_TAB);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB");
  };

  const handleDontKnowYet = () => {
    let resultDate = "Don't know yet";
    sendSurvey({
      type: SurveyType.waitResult,
      survey: [
        {
          content: "When will you get your result?",
          options: [{ content: resultDate, selected: true }],
          require: true,
          type: 1,
        },
      ],
      email: email,
      bucket: bucket,
      appId: appConfig.appId,
    });
    setTab(SUBMITED);
  };

  const handleSubmit = () => {
    let resultDate = formatDate(selectedDate);
    sendSurvey({
      type: SurveyType.waitResult,
      survey: [
        {
          content: "When will you get your result?",
          options: [{ content: resultDate, selected: true }],
          require: true,
          type: 1,
        },
      ],
      email: email,
      bucket: bucket,
      appId: appConfig.appId,
    });
    setTab(SUBMITED);
  };

  return (
    <div className="overflow-x-hidden relative min-h-screen bg-white">
      <div className="container relative z-10 px-4 py-8 mx-auto">
        <div className="mx-auto max-w-7xl">
          {tab === SELECT_EXAM_DATE_TAB ? (
            <div
              className={`flex ${
                isDesktop
                  ? "flex-row gap-16 justify-center items-start"
                  : "flex-col items-center"
              }`}
            >
              {isDesktop && (
                <div className="flex-shrink-0 w-full max-w-md">
                  <img
                    src="/images/date.png"
                    alt="Calendar Illustration"
                    className="object-contain w-full h-auto"
                  />
                </div>
              )}

              <div className="flex-1 max-w-[708px] py-2">
                <div className="mb-8 text-center">
                  <div className="flex justify-center mb-6">
                    <LogoApp appInfo={appConfig} />
                  </div>
                  <h1 className="text-[24px] md:text-[52px] font-bold text-[#212121] mb-4 leading-tight">
                    When Will You Get Your Result?
                  </h1>
                  <p className="text-[#21212199] text-[12px] md:text-[24px]">
                    Pick a Date From Calendar
                  </p>
                </div>

                <div className="mb-8">
                  <Calendar
                    onDateSelect={setSelectedDate}
                    selectedDate={selectedDate}
                    onDontKnowYet={handleDontKnowYet}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>

              {!isDesktop && (
                <div className="flex justify-center mt-8 w-full max-w-sm">
                  <img
                    src="/images/date_mobile.png"
                    alt="Calendar Illustration"
                    className="object-contain w-full h-auto"
                  />
                </div>
              )}
            </div>
          ) : tab === SUBMITED ? (
            <div className="mx-auto max-w-2xl">
              <div className="p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
                <h1 className="text-2xl font-bold text-[#212121] mb-4">
                  When will you get your result?
                </h1>
                <p className="text-[#21212199] text-base mb-6">
                  Thank you for your time! We wish you all the best on your
                  exam!
                </p>
                <button
                  onClick={() => setTab(SELECT_EXAM_DATE_TAB)}
                  className="text-[#3B6AD0] hover:text-[#2B5BC0] underline text-base font-medium"
                >
                  Edit your answer
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WhenWillYouGetYourResult;
