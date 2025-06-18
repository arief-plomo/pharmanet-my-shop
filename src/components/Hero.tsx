
import { Button } from '@/components/ui/button';
import { Shield, Truck, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-pharma-beige to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Malaysia's
                <span className="text-pharma-blue"> Trusted</span>
                <br />
                Digital Health Platform
              </h1>
              <p className="text-lg md:text-xl text-pharma-gray leading-relaxed max-w-2xl">
                Connect with licensed local pharmacies for OTC medicines, vitamins, and wellness products. 
                Private, accessible, and secure shopping experience delivered to your door.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-pharma-blue hover:bg-blue-700 text-white px-8 py-3">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white px-8 py-3">
                Join as Pharmacy Partner
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-pharma-green" />
                <span className="text-sm text-pharma-gray">Licensed Pharmacies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-pharma-green" />
                <span className="text-sm text-pharma-gray">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-pharma-green" />
                <span className="text-sm text-pharma-gray">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right content - Hero image placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-pharma-blue to-pharma-green rounded-3xl p-8 md:p-12 text-white">
              <div className="space-y-6">
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-2">Connect with 500+ Licensed Pharmacies</h3>
                  <p className="text-white/90">Verified by Ministry of Health Malaysia</p>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-2">Same Day Delivery</h3>
                  <p className="text-white/90">In Klang Valley, Penang & JB</p>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-2">MAL Verified Products</h3>
                  <p className="text-white/90">Only authentic medicines & supplements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
