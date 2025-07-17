import MyHead from "@/components/head";
import Layout from "@/components/layout";
import SurveyContent from "@/components/survey/SurveyContent";
import SurveyType from "@/components/survey/SurveyType";

const CongratulationsOnPassingYourTest = () => {
  const appInfo = {
    id: 1,
    appId: 1,
    appName: "ABC Elearning",
    appNameId: "abc-elearning",
    categoryId: 1,
    appShortName: "ABC Elearning",
    linkAndroid:
      "https://play.google.com/store/apps/details?id=com.abc.elearning",
    linkIos: "https://apps.apple.com/us/app/abc-elearning/id1544444444",
    pageLinkDownload: "https://abc.com/download",
    bucket: "abc-elearning",
    descriptionSEO: "ABC Elearning",
    keywordSEO: "ABC Elearning",
    title: "ABC Elearning",
    description: "ABC Elearning",
    hasState: false,
    totalQuestion: 10,
    usingFeaturePro: false,
    usingMathJax: false,
    parentId: 1,
  };
  const deviceId = "1234567890";
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

export default CongratulationsOnPassingYourTest;
