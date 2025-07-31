import React, { useEffect, useState, useRef } from 'react';
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Create refs for each section
  const homeRef = useRef(null);
  const newCollectionRef = useRef(null);
  const shopRef = useRef(null);
  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);

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

  // Function to handle smooth scrolling to sections
  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  // Enhanced product data with more details
  const newCollectionProducts = [
    {
      id: 1,
      name: 'Premium Cotton Hoodie',
      mainImage: '/src/assets/images/Collection/Cart.jpg',
      images: [
        '/src/assets/images/Collection/Cart.jpg',
        '/src/assets/images/Collection/Cart_2.jpg',
        '/src/assets/images/Collection/Cart_3.jpg',
        '/src/assets/images/Collection/Cart_4.jpg',
        '/src/assets/images/Collection/Cart_5.jpg'
      ],
      description: 'Our premium cotton hoodie offers unmatched comfort and style. Made with 100% organic cotton, this hoodie features a relaxed fit, adjustable drawstring hood, and kangaroo pocket for ultimate comfort.',
      price: 'Rs. 4,500',
      category: 'Men',
      material: '100% Organic Cotton',
      colors: ['Black', 'White', 'Navy Blue'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: 2,
      name: 'Classic Crewneck',
      mainImage: '/src/assets/images/Collection/Cart.jpg',
      images: [
        '/src/assets/images/Collection/Cart.jpg',
        '/src/assets/images/Collection/Cart_2.jpg',
        '/src/assets/images/Collection/Cart_3.jpg',
        '/src/assets/images/Collection/Cart_4.jpg',
        '/src/assets/images/Collection/Cart_5.jpg'
      ],
      description: 'The essential crewneck sweater made from a premium cotton blend. Features ribbed cuffs and hem for a classic fit that never goes out of style.',
      price: 'Rs. 3,900',
      category: 'Men',
      material: '80% Cotton, 20% Polyester',
      colors: ['White', 'Gray', 'Charcoal'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 3,
      name: 'Urban Oversized Tee',
      mainImage: '/src/assets/images/Collection/Cart.jpg',
      images: [
        '/src/assets/images/Collection/Cart.jpg',
        '/src/assets/images/Collection/Cart_2.jpg',
        '/src/assets/images/Collection/Cart_3.jpg',
        '/src/assets/images/Collection/Cart_4.jpg',
        '/src/assets/images/Collection/Cart_5.jpg'
      ],
      description: 'Oversized fit t-shirt with dropped shoulders for a contemporary urban look. Made from soft, breathable fabric for all-day comfort.',
      price: 'Rs. 2,800',
      category: 'Women',
      material: '100% Combed Cotton',
      colors: ['Black', 'White', 'Olive Green'],
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: 4,
      name: 'Minimalist Sweatshirt',
      mainImage: '/src/assets/images/Collection/Cart.jpg',
      images: [
        '/src/assets/images/Collection/Cart.jpg',
        '/src/assets/images/Collection/Cart_2.jpg',
        '/src/assets/images/Collection/Cart_3.jpg',
        '/src/assets/images/Collection/Cart_4.jpg',
        '/src/assets/images/Collection/Cart_5.jpg'
      ],
      description: 'Clean, minimalist sweatshirt with subtle branding. Features a relaxed fit and premium fleece lining for warmth without bulk.',
      price: 'Rs. 4,200',
      category: 'Women',
      material: '50% Cotton, 50% Polyester',
      colors: ['Beige', 'Gray', 'Black'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 5,
      name: 'Street Style Zip-Up',
      mainImage: '/src/assets/images/Collection/Cart.jpg',
      images: [
        '/src/assets/images/Collection/Cart.jpg',
        '/src/assets/images/Collection/Cart_2.jpg',
        '/src/assets/images/Collection/Cart_3.jpg',
        '/src/assets/images/Collection/Cart_4.jpg',
        '/src/assets/images/Collection/Cart_5.jpg'
      ],
      description: 'Modern zip-up hoodie with streetwear-inspired details. Features a front zip closure, ribbed cuffs, and a comfortable fit for everyday wear.',
      price: 'Rs. 5,100',
      category: 'Men',
      material: '70% Cotton, 30% Polyester',
      colors: ['Black', 'Dark Gray', 'Burgundy'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
  ];

  // Handle category click - navigate to correct page for each category
  const handleCategoryClick = (category) => {
    if (category === "Men") navigate("/men");
    else if (category === "Women") navigate("/women");
    else if (category === "Home Dec") navigate("/homeDec");
    else if (category === "Bags") navigate("/Bags"); // Use "/Bags" if your route is capital B
  };

  // Filter products based on active filter
  const filteredNewCollectionProducts = activeNewCollectionFilter === 'All' 
    ? newCollectionProducts 
    : newCollectionProducts.filter(product => product.category === activeNewCollectionFilter);

  const categories = ['All', 'Men', 'Women', 'Home Dec', 'Bags'];
  const shopCategories = ['Men', 'Women', 'Home Dec', 'Bags'];

  // Open product modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setCurrentImageIndex(0);
    setQuantity(1);
    document.body.style.overflow = 'hidden';
  };

  // Close product modal
  const closeProductModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  // Navigate product images
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  // Cart state for navbar
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Add to cart function (update cartItems state)
  const addToCart = () => {
    // Check if item with same id, color, size exists
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.id === selectedProduct.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );
    let newCart;
    if (existingIndex !== -1) {
      // Update quantity if already exists
      newCart = [...cartItems];
      newCart[existingIndex].quantity += quantity;
    } else {
      // Add new item
      newCart = [
        ...cartItems,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: Number(selectedProduct.price.replace(/[^\d]/g, '')),
          image: selectedProduct.mainImage,
          color: selectedColor,
          size: selectedSize,
          quantity,
        },
      ];
    }
    setCartItems(newCart);
    setCartOpen(true); // Open cart in navbar
    closeProductModal();
  };

  // Handle quantity change
  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          
          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>
      
      <HoddyNaveBar 
        scrollToHome={() => scrollToSection(homeRef)}
        scrollToShop={() => scrollToSection(shopRef)}
        scrollToAboutUs={() => scrollToSection(aboutUsRef)}
        scrollToContactUs={() => scrollToSection(contactUsRef)}
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
      
      {/* Home Section with ref */}
      <div ref={homeRef} className="w-full min-h-screen bg-white flex flex-col">
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

      {/* New Collection Section with ref */}
      <section ref={newCollectionRef} className="w-full px-0 py-12 bg-white">
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
              {filteredNewCollectionProducts.map((product) => (
                <div 
                  key={`new-${product.id}`} 
                  className="bg-white rounded-xl overflow-hidden flex flex-col items-center p-4 w-80 flex-shrink-0 transition-all hover:scale-[1.02] cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  <div className="w-full h-96 mb-4">
                    <img 
                      src={product.mainImage} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-2 border-0" 
                    />
                  </div>
                  <div className="w-full flex flex-col justify-between px-2 pb-2">
                    <p className="text-lg font-medium text-gray-800 mb-2 text-center line-clamp-2">
                      {product.name}
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

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div 
                className="absolute inset-0 bg-black opacity-75"
                onClick={closeProductModal}
              ></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full max-h-[90vh] overflow-y-auto no-scrollbar">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* Product Images */}
                  <div className="w-full sm:w-1/2 flex flex-col">
                    {/* Main Image */}
                    <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={selectedProduct.images[currentImageIndex]}
                        alt={selectedProduct.name}
                        className="w-full h-full object-contain"
                      />
                      {/* Navigation arrows */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Thumbnail images */}
                    <div className="flex mt-4 space-x-2 overflow-x-auto py-2 no-scrollbar">
                      {selectedProduct.images.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === idx ? 'border-black' : 'border-gray-200'}`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="w-full sm:w-1/2 pl-0 sm:pl-8 mt-6 sm:mt-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedProduct.name}</h3>
                        <p className="text-xl font-semibold text-black mb-4">{selectedProduct.price}</p>
                      </div>
                      {/* Close button - moved inside for mobile */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          closeProductModal();
                        }}
                        className="sm:hidden bg-black text-white rounded-full p-1 hover:bg-gray-800 focus:outline-none transition"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600 text-sm">{selectedProduct.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Material</h4>
                      <p className="text-gray-600 text-sm">{selectedProduct.material}</p>
                    </div>
                    
                    {/* Color Selection */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Color</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map(color => (
                          <button
                            key={color}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedColor(color);
                            }}
                            className={`px-3 py-1.5 rounded-full border text-sm ${selectedColor === color ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'}`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Size Selection */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Size</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map(size => (
                          <button
                            key={size}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSize(size);
                            }}
                            className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Quantity</h4>
                      <div className="flex items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(-1);
                          }}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-white hover:bg-gray-50"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                          {quantity}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(1);
                          }}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-white hover:bg-gray-50"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart();
                        }}
                        className="flex-1 bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition text-sm sm:text-base"
                      >
                        Add to Cart
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Close button - desktop */}
              <div className="hidden sm:block absolute top-4 right-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeProductModal();
                  }}
                  className="bg-black text-white rounded-full p-2 hover:bg-gray-800 focus:outline-none transition"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shop Section with ref */}
      <section ref={shopRef} className="w-full px-0 py-12 bg-gray-50">
        <div className="w-full mx-auto">
          {/* Wider Banner Image Section */}
          <div className="w-full mb-12 px-0">
            <img 
              src="/src/assets/images/Collection/Banner Image.jpg" 
              alt="Shop Banner" 
              className="w-full h-auto object-cover"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center tracking-tight">Shop</h2>
          
          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {shopCategories.map((category) => (
              <div 
                key={`category-${category}`}
                className="relative rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                onClick={() => handleCategoryClick(category)} // <-- This will now navigate correctly
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

      {/* About Us Section with ref */}
      <div ref={aboutUsRef}>
        {/* Compact Contact Us Section with ref */}
        <section ref={contactUsRef} className="w-full px-4 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We'd love to hear from you. Reach out to our team for any inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information Card */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <p className="text-gray-600 text-sm">
                      Our team is here to help with any questions about our products or services.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-1.5 bg-black rounded-md">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-xs font-medium text-gray-500">Email</h4>
                        <p className="text-base font-semibold text-gray-900">info@hoddy.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-1.5 bg-black rounded-md">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-xs font-medium text-gray-500">Phone</h4>
                        <p className="text-base font-semibold text-gray-900">+94 76 123 4567</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-1.5 bg-black rounded-md">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-xs font-medium text-gray-500">Address</h4>
                        <p className="text-base font-semibold text-gray-900">123 Fashion Street, Colombo 03</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-xs font-medium text-gray-500 mb-3">Business Hours</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday</span>
                        <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span className="font-medium text-gray-900">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Card with pure black background */}
              <div className="bg-black p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-white mb-5">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-gray-300 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white text-sm"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-gray-300 mb-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white text-sm"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white text-sm"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>


      {/* Professional Footer Section */}
      <footer className="w-full bg-black text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">HODDY</h3>
              <p className="text-gray-400 text-sm">
                Premium fashion and lifestyle brand offering high-quality products with timeless designs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.058 1.023-.057 1.351-.057 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links - Updated with navigation */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => scrollToSection(homeRef)} 
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection(newCollectionRef)} 
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    New Collection
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection(shopRef)} 
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection(aboutUsRef)} 
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => scrollToSection(contactUsRef)} 
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Contact Us
                  </button>
                </li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition">Size Guide</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">Newsletter</h3>
              <p className="text-gray-400 text-sm">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-white text-sm"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition duration-200 text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} HODDY. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;