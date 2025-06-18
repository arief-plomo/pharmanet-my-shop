
import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pharma-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-xl font-bold text-pharma-blue">PharMa Online</h1>
          </div>

          {/* Search bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search medicines, vitamins, health products..."
                className="pl-12 pr-4 py-2 w-full border-gray-200 focus:border-pharma-blue"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-pharma-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>

            {/* User menu */}
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline ml-2">Login</span>
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block pb-4">
          <ul className="flex space-x-8">
            <li><a href="#" className="text-pharma-gray hover:text-pharma-blue transition-colors">Home</a></li>
            <li><a href="#" className="text-pharma-gray hover:text-pharma-blue transition-colors">Medicines</a></li>
            <li><a href="#" className="text-pharma-gray hover:text-pharma-blue transition-colors">Vitamins & Supplements</a></li>
            <li><a href="#" className="text-pharma-gray hover:text-pharma-blue transition-colors">Personal Care</a></li>
            <li><a href="#" className="text-pharma-gray hover:text-pharma-blue transition-colors">Baby & Mother</a></li>
            <li><a href="#" className="text-pharma-gray hover:text-pharma-blue transition-colors">Partner Portal</a></li>
          </ul>
        </nav>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search medicines..."
              className="pl-12 pr-4 py-2 w-full border-gray-200"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
            <ul className="space-y-3">
              <li><a href="#" className="block text-pharma-gray hover:text-pharma-blue transition-colors">Home</a></li>
              <li><a href="#" className="block text-pharma-gray hover:text-pharma-blue transition-colors">Medicines</a></li>
              <li><a href="#" className="block text-pharma-gray hover:text-pharma-blue transition-colors">Vitamins & Supplements</a></li>
              <li><a href="#" className="block text-pharma-gray hover:text-pharma-blue transition-colors">Personal Care</a></li>
              <li><a href="#" className="block text-pharma-gray hover:text-pharma-blue transition-colors">Baby & Mother</a></li>
              <li><a href="#" className="block text-pharma-gray hover:text-pharma-blue transition-colors">Partner Portal</a></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
