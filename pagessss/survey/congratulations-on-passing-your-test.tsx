import { GetServerSideProps } from "next";
import { IAppInfo } from "../../models/AppInfo";
import MyHead from "../../src/components/head";
import Layout from "../../src/components/layout";
import SurveyContent from "../../src/components/survey/SurveyContent";
import SurveyType from "../../src/components/survey/SurveyType";
import { convertToJSONObject } from "../../utils";
import { getAppInfo } from "../../utils/FileUtils";

const CongratulationsOnPassingYourTest = ({
  appInfo,
  deviceId,
}: {
  appInfo: IAppInfo;
  deviceId: string;
}) => {
  return (
    <>
      <MyHead
        title="ABC Elearning | Simplify your learning"
        description=""
        image=""
      />
      <Layout>
        <SurveyContent
          appInfo={appInfo}
          deviceId={deviceId}
          type={SurveyType.congratulation}
        />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { deviceId } = context.query;
  let appInfo = getAppInfo();
  return convertToJSONObject({ props: { appInfo, deviceId } });
};

export default CongratulationsOnPassingYourTest;
