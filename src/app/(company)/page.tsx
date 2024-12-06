import SectionGridCategoryBox from "@/components/SectionGridCategoryBox";
import SectionHero from "../(client-components)/(Home)/SectionHero";
import Banner from "../(client-components)/(Home)/Banner";
import imagePng from "@/images/home/ayodh-banner.png";
import BlogPosts from "../(client-components)/(Home)/BlogPost";
import SectionStatistic from "../(client-components)/(Home)/SectionStatistic";
import SectionClientSay from "@/components/SectionClientSay";
import CoverageReport from "../(client-components)/(Home)/CoverageReport";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import ServicesSection from "../(client-components)/(Home)/Services";
import VisionMission from "../(client-components)/(Home)/VisionMission";

export default function Home() {
  return (
    <main className="lg:mb-28">
      <SectionHero />
      <SectionGridCategoryBox />
      <Banner imageSrc={imagePng} />
        <ServicesSection />
      <div className="container relative space-y-24 my-14 md:my-24 lg:space-y-28 lg:mb-28">
        <SectionGridFeaturePlaces cardType="card2" gridClass="grid-rows-1" />

        <SectionStatistic />
        <BlogPosts />
        {/* <SectionSubscribe2 /> */}
        <SectionClientSay />
        <CoverageReport />
      </div>
    </main>
  );
}
