import { GetServerSideProps } from "next";
import SurveyContent from "../../../components/survey/SurveyContent";
import SurveyType from "../../../components/survey/SurveyType";
import SeoHeader from "../../components/SeoHeader";
import { IAppInfo } from "../../models/AppInfo";
import { convertToJSONObject } from "../../utils";
import { getAppInfo } from "../../utils/FileUtils";

const WereSorryToHearThatYouDidntPassTheExam = ({
  appInfo,
  deviceId,
}: {
  appInfo: IAppInfo;
  deviceId: string;
}) => {
  return (
    <>
      <SeoHeader title={appInfo.title} keyword="" description="" />
      <SurveyContent
        appInfo={appInfo}
        deviceId={deviceId}
        type={SurveyType.sorry}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { deviceId } = context.query;
  let appInfo = getAppInfo();
  if (!deviceId) deviceId = Date.now() + "";
  return convertToJSONObject({ props: { appInfo, deviceId } });
};

export default WereSorryToHearThatYouDidntPassTheExam;
