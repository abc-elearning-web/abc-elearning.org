import { GetServerSideProps } from "next";
import { IAppInfo } from "../../models/AppInfo";
import SeoHeader from "../../src/components/SeoHeader";
import SurveyContent from "../../src/components/survey/SurveyContent";
import SurveyType from "../../src/components/survey/SurveyType";
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
