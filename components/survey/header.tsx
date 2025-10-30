import LogoApp from "./LogoApp";
import SurveyType from "./SurveyType";
const FILL_SURVEY = 0;
const SUBMITED = 1;

export default function HeaderSurvey({
  surveyType,
  appConfig,
  tab,
  isDesktop,
}: {
  surveyType: SurveyType;
  appConfig: any;
  tab: number;
  isDesktop: boolean;
}) {
  return (
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
            <div className="w-full max-h[474px] flex flex-col items-center mt-2  gap-2">
              <LogoApp
                appInfo={appConfig}
                theme={"dark"}
                size={tab == SUBMITED ? "l" : isDesktop ? "m" : "s"}
              />
              {tab === FILL_SURVEY ? (
                surveyType === SurveyType.sorry ? (
                  <>
                    <div className="flex relative justify-center pt-2 pb-28 md:pb-20">
                      <div className="relative z-10 text-center max-w-[343px] md:max-w-[1006px] mx-auto px-4">
                        <h1 className="text-center m-0 text-2xl md:text-5xl font-semibold text-red-500 max-w-[343px] md:max-w-[1006px] mx-auto">
                          We're sorry to hear that <br /> you didn't pass the
                          exam.
                        </h1>
                        <p className="m-0 mt-3 font-poppins text-[12px] leading-[18px] md:text-[24px] md:leading-[36px] font-normal text-[#212121]/50">
                          Failure is an opportunity to learn. Keep moving
                          forward. Please take a few minutes to participate in
                          our survey. Your feedback is valuable for improving
                          our products. Thank you!
                        </p>

                        <div className="flex absolute inset-x-0 bottom-0 justify-center">
                          <img
                            src={
                              isDesktop
                                ? "/images/fail.png"
                                : "/images/fail_mobile.png"
                            }
                            className={`pointer-events-none object-contain ${
                              isDesktop
                                ? "max-w-[1373px] translate-y-[80px]"
                                : "max-w-[480px] translate-y-[56px]"
                            }`}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : surveyType === SurveyType.congratulation ? (
                  <>
                    <div className="flex relative justify-center pt-2 pb-28 md:pb-40">
                      <div className="relative z-10 text-center max-w-[343px] md:max-w-[1006px] mx-auto px-4">
                        <h1 className="m-0 text-2xl md:text-5xl font-semibold text-emerald-600 max-w-[343px] md:max-w-[1006px] mx-auto">
                          Congratulations on passing your test!
                        </h1>
                        <p className="m-0 mt-3 font-poppins text-[12px] leading-[18px] md:text-[24px] md:leading-[36px] font-normal text-[#212121]/50">
                          Your hard work has paid off, and we are proud of you.
                          Please take a few minutes to complete our survey. Your
                          feedback is valuable for our improvement efforts.
                          <br />
                          Thank you!
                        </p>
                      </div>

                      <div className="flex absolute inset-x-0 bottom-0 justify-center">
                        <img
                          src={
                            isDesktop
                              ? "/images/cons.png"
                              : "/images/cons_mobile.png"
                          }
                          className={`pointer-events-none object-contain ${
                            isDesktop
                              ? "max-w-[1373px]"
                              : "max-w-[480px] translate-y-[-20px]"
                          }`}
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
  );
}
