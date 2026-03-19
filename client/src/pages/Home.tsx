import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/Home/Hero";
import AboutSection from "../components/Home/AboutSection";
import ProductSection from "../components/Home/ProductSection";
import ServicesSection from "../components/Home/ServicesSection";
import GallerySection from "../components/Home/GallerySection";
import TeamSection from "../components/Home/TeamSection";
import CustomOrderSection from "../components/Home/CustomOrderSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <ProductSection />
      <ServicesSection />
      <GallerySection />
      <TeamSection />
      <CustomOrderSection />
      <Footer />
    </>
  );
};

export default Home;