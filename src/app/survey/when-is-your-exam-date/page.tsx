import useMediaQuery from "@mui/material/useMediaQuery";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import LogoApp from "../../../components/survey/LogoApp";
import SurveyType from "../../../components/survey/SurveyType";
import SeoHeader from "../../components/SeoHeader";
import MyContainer from "../../components/v4-material/MyContainer";
import { IAppInfo } from "../../models/AppInfo";
import { sendSurvey } from "../../services/home.service";
import { convertToJSONObject } from "../../utils";
import { getAppInfo } from "../../utils/FileUtils";
import "./when-is-your-exam-date.scss";
const ChooseExamDate = dynamic(
  () => import("../../../components/survey/ChooseExamDate"),
  {
    ssr: false,
    loading: () => <div style={{ height: "388px" }} />,
  }
);

const SELECT_EXAM_DATE_TAB = 0;
const SUBMITED = 1;
const WhenIsYourExamDate = ({
  appInfo,
  deviceId,
}: {
  appInfo: IAppInfo;
  deviceId: string;
}) => {
  const [tab, setTab] = useState(SELECT_EXAM_DATE_TAB);
  const isDesktop = useMediaQuery("(min-width: 769px)");
  return (
    <>
      <SeoHeader title={appInfo.title} keyword="" description="" />
      <div className="date-survey-0">
        {!isDesktop && <div className="date-survey-bgr-img-0"></div>}
        <MyContainer className="date-survey-container">
          {isDesktop && <div className="date-survey-bgr-img-0"></div>}
          <div className="date-survey-content">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "40px",
                position: "relative",
              }}
            >
              <LogoApp appInfo={appInfo} />
              <img
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  width: "48px",
                }}
                className="img1"
                src="/images/asvab/survey/img1.png"
                alt=""
              />
            </div>
            {tab === SELECT_EXAM_DATE_TAB ? (
              <>
                <h1>When is your exam date?</h1>
                <span>Pick a Date From Calendar</span>
                <div className="choose-exam-date-wrapper">
                  <ChooseExamDate
                    sx={{ marginTop: "16px" }}
                    onDontKnowYet={() => {
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
                        deviceId,
                        appId: appInfo.appId,
                      });
                      setTab(SUBMITED);
                    }}
                    onSubmit={(d) => {
                      let examDate = d.format("DD/MM/YYYY");
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
                        deviceId,
                        appId: appInfo.appId,
                      });
                      setTab(SUBMITED);
                    }}
                  />
                </div>
              </>
            ) : tab === SUBMITED ? (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "16px",
                  margin: isDesktop ? "24px 24px 0" : "24px 0 0",
                  marginTop: "24px",
                }}
              >
                <h1 style={{ fontSize: "20px", lineHeight: "30px", margin: 0 }}>
                  When is your exam date?
                </h1>
                <span
                  style={{
                    marginTop: "8px",
                    display: "block",
                    fontSize: "14px",
                    lineHeight: "21px",
                  }}
                >
                  Thank you for your time! We wish you all the best on your
                  upcoming exam!
                </span>
                <div
                  style={{
                    textDecoration: "underline",
                    color: "#0085FF",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                  onClick={() => {
                    setTab(SELECT_EXAM_DATE_TAB);
                  }}
                >
                  Edit your answer
                </div>
              </div>
            ) : (
              <></>
            )}
            {isDesktop && <div className="date-survey-bgr-img-1"></div>}
          </div>
        </MyContainer>
        {!isDesktop && <div className="date-survey-bgr-img-1"></div>}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { deviceId } = context.query;
  let appInfo = getAppInfo();
  return convertToJSONObject({ props: { appInfo, deviceId } });
};
export default WhenIsYourExamDate;
