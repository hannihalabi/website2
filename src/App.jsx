import Footer from './components/Footer';
import Hero from './sections/Hero';
import Team from './sections/Team';
import ProcessGallery from './sections/ProcessGallery';
import FeatureGrid from './sections/FeatureGrid';
import Showcase from './sections/Showcase';
import { useContent } from './content';

const App = () => {
  const {
    navItems,
    heroContent,
    processGalleryContent,
    featureBlocks,
    showcaseContent,
    aiContent,
    footerLinks,
    teamMembers,
  } = useContent();

  return (
    <div className="page">
      <div className="ambient ambient-purple" />
      <div className="ambient ambient-blue" />
      <main>
        <Hero content={heroContent} navItems={navItems} />
        <ProcessGallery content={processGalleryContent} />
        <Team members={teamMembers} />
        <FeatureGrid items={featureBlocks} />
        <Showcase content={showcaseContent} background="panel-bg" />
        <Showcase content={aiContent} reversed />
      </main>
      <Footer links={footerLinks} />
    </div>
  );
};

export default App;
