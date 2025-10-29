import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import LogoApp from "./components/LogoApp";
import { sendSurvey } from "./services/home.service";
import SurveyType from "./components/SurveyType";
import Calendar from "./components/Calendar";

const SELECT_EXAM_DATE_TAB = 0;
const SUBMITED = 1;
const WhenIsYourExamDate = ({
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
    setIsDesktop(window.innerWidth > 768);
  }, []);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB");
  };

  const handleDontKnowYet = () => {
    let examDate = "Don't know yet";
    sendSurvey({
      type: SurveyType.examDate,
      survey: [
        {
          content: "When is your exam date?",
          options: [{ content: examDate, selected: true }],
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
    let examDate = formatDate(selectedDate);
    sendSurvey({
      type: SurveyType.examDate,
      survey: [
        {
          content: "When is your exam date?",
          options: [{ content: examDate, selected: true }],
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-10xl mx-auto">
          {tab === SELECT_EXAM_DATE_TAB ? (
            <div
              className={`flex ${
                isDesktop
                  ? "flex-row items-start justify-center gap-16"
                  : "flex-col items-center"
              }`}
            >
              {isDesktop && (
                <div className="flex-shrink-0">
                  <img
                    src="/images/date.png"
                    alt="Calendar Illustration"
                    className="object-contain"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="text-center mb-8">
                  <div className="mb-6 justify-center flex">
                    <LogoApp appInfo={appConfig} />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-[#212121] mb-4 leading-tight">
                    When Is Your Exam Date?
                  </h1>
                  <p className="text-[#21212199] text-lg">
                    Pick a Date From Calendar
                  </p>
                </div>

                <div className="mb-8">
                  <Calendar
                    onDateSelect={setSelectedDate}
                    selectedDate={selectedDate}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleDontKnowYet}
                    className="px-6 py-3 text-[#21212185] font-medium transition-colors hover:text-[#212121]"
                  >
                    Don't Know Yet
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-[#3B6AD0] hover:bg-[#2B5BC0] text-white font-medium rounded-lg transition-colors shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Mobile Image */}
              {!isDesktop && (
                <div className="w-full max-w-sm mt-8 flex justify-center">
                  <img
                    src="/images/date_mobile.png"
                    alt="Calendar Illustration"
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ) : tab === SUBMITED ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h1 className="text-2xl font-bold text-[#212121] mb-4">
                  When is your exam date?
                </h1>
                <p className="text-[#21212199] text-base mb-6">
                  Thank you for your time! We wish you all the best on your
                  upcoming exam!
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

export default WhenIsYourExamDate;
