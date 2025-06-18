
import { Star, ShoppingCart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const products = [
  {
    id: 1,
    name: "Panadol Extra",
    brand: "GSK",
    price: 12.90,
    originalPrice: 15.50,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg",
    pharmacy: "Klinik Farmasi Bestari",
    malNumber: "MAL19126543",
    discount: 17,
    isVerified: true
  },
  {
    id: 2,
    name: "Blackmores Vitamin C 500mg",
    brand: "Blackmores",
    price: 45.90,
    originalPrice: 52.00,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg",
    pharmacy: "Guardian Pharmacy",
    malNumber: "MAL08052347",
    discount: 12,
    isVerified: true
  },
  {
    id: 3,
    name: "Cetaphil Gentle Skin Cleanser",
    brand: "Cetaphil",
    price: 28.90,
    originalPrice: 32.90,
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg",
    pharmacy: "Alpro Pharmacy",
    malNumber: "MAL15043876",
    discount: 12,
    isVerified: true
  },
  {
    id: 4,
    name: "Scott's Emulsion Original",
    brand: "Scott's",
    price: 24.50,
    originalPrice: 28.90,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg",
    pharmacy: "Caring Pharmacy",
    malNumber: "MAL20117832",
    discount: 15,
    isVerified: true
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-pharma-gray max-w-2xl mx-auto">
            Discover our most popular medicines and health products from verified pharmacies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-gray-100">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 rounded-t-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-pharma-red text-white">
                      -{product.discount}%
                    </Badge>
                  )}
                  {product.isVerified && (
                    <Badge className="absolute top-3 right-3 bg-pharma-green text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-pharma-gray font-medium">{product.brand}</p>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-pharma-blue transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Pharmacy */}
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-pharma-green" />
                    <span className="text-xs text-pharma-gray">{product.pharmacy}</span>
                  </div>

                  {/* MAL Number */}
                  <p className="text-xs text-pharma-gray">MAL: {product.malNumber}</p>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-pharma-gray">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-pharma-blue">
                        RM {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          RM {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <Button className="w-full bg-pharma-blue hover:bg-blue-700 text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
