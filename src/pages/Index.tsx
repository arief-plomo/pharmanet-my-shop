
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedProducts />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
