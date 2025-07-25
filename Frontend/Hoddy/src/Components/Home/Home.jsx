import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HoddyNaveBar from '../Hoddy Nave Bar/HoddyNaveBar';

const desktopImages = [
  '/src/assets/images/Home_Section/Home 1.jpg',
  '/src/assets/images/Home_Section/Home 2.jpg',
];
const mobileImages = [
  '/src/assets/images/Home_Section/Home_Mobile-1.jpg',
  '/src/assets/images/Home_Section/Home_Mobile_2.jpg',
];

// Category cover images
const categoryCoverImages = {
  'Men': '/src/assets/images/Home_Section/Home 1.jpg',
  'Women': '/src/assets/images/Home_Section/Home 1.jpg',
  'Home Dec': '/src/assets/images/Home_Section/Home 1.jpg',
  'Bags': '/src/assets/images/Home_Section/Home 1.jpg'
};

function Home() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [activeNewCollectionFilter, setActiveNewCollectionFilter] = useState('All');
  const [activeShopCategory, setActiveShopCategory] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images]);

  // Product data for New Collection (using cart images)
  const newCollectionProducts = [
    {
      image: '/src/assets/images/Collection/Cart.jpg',
      description: 'Premium Cotton Hoodie - Black',
      price: 'Rs. 4,500',
      category: 'Men'
    },
    {
      image: '/src/assets/images/Collection/Cart.jpg',
      description: 'Classic Crewneck - White',
      price: 'Rs. 3,900',
      category: 'Men'
    },
    {
      image: '/src/assets/images/Collection/Cart.jpg',
      description: 'Urban Oversized Tee',
      price: 'Rs. 2,800',
      category: 'Women'
    },
    {
      image: '/src/assets/images/Collection/Cart.jpg',
      description: 'Minimalist Sweatshirt',
      price: 'Rs. 4,200',
      category: 'Women'
    },
    {
      image: '/src/assets/images/Collection/Cart.jpg',
      description: 'Street Style Zip-Up',
      price: 'Rs. 5,100',
      category: 'Men'
    }
  ];

  // Handle category click - navigate to Shop page with category
  const handleCategoryClick = (category) => {
    navigate('/shop', { state: { category } });
  };

  // Filter products based on active filter
  const filteredNewCollectionProducts = activeNewCollectionFilter === 'All' 
    ? newCollectionProducts 
    : newCollectionProducts.filter(product => product.category === activeNewCollectionFilter);

  const categories = ['All', 'Men', 'Women', 'Home Dec', 'Bags'];
  const shopCategories = ['Men', 'Women', 'Home Dec', 'Bags'];

  return (
    <>
      <HoddyNaveBar />
      <div className="w-full min-h-screen bg-white flex flex-col">
        {/* Mobile Fullscreen Image */}
        <img
          src={images[current]}
          alt={`Home Slide ${current + 1}`}
          className="block sm:hidden w-screen h-screen object-contain object-center rounded-none transition-all duration-700"
        />
        {/* Desktop Image */}
        <img
          src={images[current]}
          alt={`Home Slide ${current + 1}`}
          className="hidden sm:block w-full h-[calc(100vh-5rem)] object-cover object-center rounded-none transition-all duration-700"
        />
      </div>

      {/* New Collection Section */}
      <section className="w-full px-0 py-12 bg-white">
        <div className="w-full mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center tracking-tight">New Collection</h2>
          
          {/* Filter Buttons - Centered */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
            {categories.map((category) => (
              <button
                key={`new-${category}`}
                onClick={() => setActiveNewCollectionFilter(category)}
                className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-colors ${
                  activeNewCollectionFilter === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid - Full Width Scrolling */}
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="inline-flex space-x-8 px-8">
              {filteredNewCollectionProducts.map((product, idx) => (
                <div 
                  key={`new-${idx}`} 
                  className="bg-white rounded-xl overflow-hidden flex flex-col items-center p-4 w-80 flex-shrink-0 transition-all hover:scale-[1.02]"
                >
                  <div className="w-full h-96 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.description} 
                      className="w-full h-full object-contain p-2 border-0" 
                    />
                  </div>
                  <div className="w-full flex flex-col justify-between px-2 pb-2">
                    <p className="text-lg font-medium text-gray-800 mb-2 text-center line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-xl font-semibold text-black text-center">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty state if no products match filter */}
          {filteredNewCollectionProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Shop Section - Category Cards */}
      <section className="w-full px-0 py-12 bg-gray-50">
        <div className="w-full mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center tracking-tight">Shop</h2>
          
          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {shopCategories.map((category) => (
              <div 
                key={`category-${category}`}
                className="relative rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                {/* Category Cover Image */}
                <div className="w-100 h-100">
                  <img 
                    src={categoryCoverImages[category]} 
                    alt={category} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                {/* Category Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;