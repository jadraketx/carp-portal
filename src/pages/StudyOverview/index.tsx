import StudyPageLayout from "@Components/Layout/StudyPageLayout";
import StudyHeader from "@Components/StudyHeader";
import Overview from "./Overview";

const StudyOverview = () => {
  return (
    <StudyPageLayout>
      <StudyHeader
        path={["Study Overview"]}
        description="See an overview of the Study."
      />
      <Overview />
    </StudyPageLayout>
  );
};

export default StudyOverview;
