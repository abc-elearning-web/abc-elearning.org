import { useSelector } from "react-redux";
import { SurveyWeb } from "survey-common";
import Config from "../../config";
import { AppState } from "../../redux/reducers/appState";

const SurveyCommon = ({ onClose }: { onClose: () => void }) => {
    const userInfo = useSelector(
        (state: AppState) => state.userReducer.userInfo
    );
    const appInfo = useSelector(
        (state: AppState) => state.appInfoReducer.appInfo
    );
    let SURVEY_CONFIG = {
        type: "web",
        slug: appInfo.appShortName,
        survey: [
            {
                step: 1,
                question:
                    "How satisfied are you with " +
                    appInfo.appName +
                    " Test Prep today?",
                caption: "This will help us improve your experience.",
            },
            {
                step: 2,
                question:
                    "What problem do you feel uncomfortable using this tool?",
                caption: "This will help us improve your experience.",
                listComments: [
                    {
                        id: 1,
                        text: "Don't know how to use, sketchy instructions",
                    },
                    {
                        id: 2,
                        text: "Too complicated to use",
                    },
                    {
                        id: 3,
                        text: "Interface is not friendly",
                    },

                    {
                        id: 4,
                        text: "Slow, page load/upload speed is too slow",
                    },
                    {
                        id: 5,
                        text: "An error occurred during using",
                    },
                    {
                        id: 6,
                        text: "Other reasons",
                    },
                ],
                otherComments: {
                    question: "Please specify the reason here",
                    caption: "This will help us improve your experience.",
                },
            },
            {
                step: 3,
                question: "How likely are you to recommend us to a friend?",
                caption: "This will help us improve your experience.",
            },
            {
                step: 4,
            },
        ],
    };
    const userId = useSelector((state: AppState) => state.userReducer.userId);
    const handleSuccess = () => {
        localStorage.setItem(Config.LOCAL_STORAGE_SURVEY, "true");
    };
    return (
        <SurveyWeb
            userInfo={{ ...userInfo, _id: userInfo?.id ?? userId }}
            closeSurveyFc={() => {
                sessionStorage.setItem("responseSurvey", "true");
                onClose();
            }}
            dataSurveyWorksheetJson={SURVEY_CONFIG}
            onSuccess={() => handleSuccess()}
        ></SurveyWeb>
    );
};
export default SurveyCommon;
