import React, { useState } from "react";
import HoddyNaveBar from "../Hoddy Nave Bar/HoddyNaveBar";
import { FiSearch, FiX, FiChevronDown, FiChevronUp, FiPlus, FiMinus, FiChevronLeft, FiChevronRight, FiShoppingCart, FiStar, FiMessageSquare } from "react-icons/fi";

// Dummy product data with ratings and reviews for bags
const products = [
  {
    id: 1,
    name: "Premium Leather Backpack - Black",
    price: 12500,
    images: [
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
    ],
    sizes: ["Small", "Medium", "Large"],
    colors: ["Black", "Brown", "Tan"],
    material: "Genuine Leather",
    description: "A premium leather backpack with multiple compartments, perfect for work and travel.",
    rating: 4.7,
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        comment: "Excellent quality! The leather feels amazing and it's very spacious.",
        date: "2023-05-15"
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 4,
        comment: "Great backpack, but the straps could be more padded.",
        date: "2023-04-22"
      }
    ]
  },
  {
    id: 2,
    name: "Minimalist Canvas Tote Bag",
    price: 4500,
    images: [
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
    ],
    sizes: ["One Size"],
    colors: ["Beige", "Black", "Navy"],
    material: "Heavyweight Canvas",
    description: "Simple and stylish tote bag for everyday use with reinforced handles.",
    rating: 4.3,
    reviews: [
      {
        id: 1,
        user: "Emma S.",
        rating: 4,
        comment: "Love the minimalist design. Perfect for grocery shopping.",
        date: "2023-06-10"
      }
    ]
  },
  {
    id: 3,
    name: "Travel Duffel Bag - Large",
    price: 9800,
    images: [
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
    ],
    sizes: ["Medium", "Large", "X-Large"],
    colors: ["Gray", "Black", "Olive"],
    material: "Waterproof Nylon",
    description: "Spacious duffel bag with shoe compartment and multiple pockets for organized travel.",
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: "David L.",
        rating: 5,
        comment: "Perfect for weekend trips. Fits all my gym gear too!",
        date: "2023-05-30"
      },
      {
        id: 2,
        user: "Robert P.",
        rating: 5,
        comment: "The waterproof material saved my clothes during a rainstorm.",
        date: "2023-04-15"
      }
    ]
  },
  {
    id: 4,
    name: "Laptop Messenger Bag",
    price: 7500,
    images: [
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
    ],
    sizes: ["13-inch", "15-inch", "17-inch"],
    colors: ["Black", "Brown", "Blue"],
    material: "Synthetic Leather",
    description: "Professional messenger bag with padded laptop compartment and organizer pockets.",
    rating: 4.1,
    reviews: []
  },
  {
    id: 5,
    name: "Crossbody Sling Bag",
    price: 3800,
    images: [
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
    ],
    sizes: ["Small", "Medium"],
    colors: ["Black", "Khaki", "Burgundy"],
    material: "Polyester with PU Coating",
    description: "Compact sling bag with RFID pocket, perfect for essentials when you're on the go.",
    rating: 4.4,
    reviews: [
      {
        id: 1,
        user: "Lisa K.",
        rating: 4,
        comment: "Fits my phone, wallet and keys perfectly. Very convenient.",
        date: "2023-06-05"
      }
    ]
  },
  {
    id: 6,
    name: "Eco-Friendly Jute Shopping Bag",
    price: 2500,
    images: [
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
      "/src/assets/images/Collection/Cart.jpg",
    ],
    sizes: ["One Size"],
    colors: ["Natural", "Green", "Beige"],
    material: "100% Jute",
    description: "Sustainable shopping bag with reinforced handles and spacious interior.",
    rating: 4.0,
    reviews: [
      {
        id: 1,
        user: "Sophia N.",
        rating: 4,
        comment: "Great alternative to plastic bags. Very sturdy.",
        date: "2023-05-20"
      }
    ]
  },
];

const allSizes = ["Small", "Medium", "Large", "X-Large", "One Size", "13-inch", "15-inch", "17-inch"];

function Bags() {
  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAddToCartNotification, setShowAddToCartNotification] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });
  const [activeTab, setActiveTab] = useState("description");

  // Format price to LKR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price).replace('LKR', 'Rs.');
  };

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchSearch = 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    
    // Size filter - fixed logic
    const matchSize = 
      selectedSizes.length === 0 || 
      selectedSizes.some(size => product.sizes.includes(size));
    
    // Price filter
    const matchPrice = 
      product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchSearch && matchSize && matchPrice;
  });

  // Toggle size selection
  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setSelectedSizes([]);
    setPriceRange([0, 15000]);
  };

  // Add to cart with selected options
  const addToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size");
      return;
    }

    const newItem = {
      ...selectedProduct,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      totalPrice: selectedProduct.price * quantity,
      image: selectedProduct.images[0],
    };

    setCartItems([...cartItems, newItem]);
    setCartOpen(true);
    setShowAddToCartNotification(true);
    setTimeout(() => setShowAddToCartNotification(false), 3000);
  };

  // Quick add to cart (direct from product card)
  const quickAddToCart = (product) => {
    const newItem = {
      ...product,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
      totalPrice: product.price,
      image: product.images[0],
    };

    setCartItems([...cartItems, newItem]);
    setCartOpen(true);
    setShowAddToCartNotification(true);
    setTimeout(() => setShowAddToCartNotification(false), 3000);
  };

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Change product image
  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  // Submit a new review
  const submitReview = () => {
    if (!newReview.comment.trim()) {
      alert("Please enter your review comment");
      return;
    }

    const reviewToAdd = {
      id: Date.now(),
      user: "You",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    // Update the selected product's reviews
    const updatedProduct = {
      ...selectedProduct,
      reviews: [...selectedProduct.reviews, reviewToAdd],
      rating: calculateNewAverageRating(selectedProduct, reviewToAdd.rating)
    };

    // Update the products array
    const productIndex = products.findIndex(p => p.id === selectedProduct.id);
    products[productIndex] = updatedProduct;

    // Update the selected product in state
    setSelectedProduct(updatedProduct);
    
    // Reset the review form
    setNewReview({
      rating: 5,
      comment: ""
    });
  };

  // Calculate new average rating after adding a review
  const calculateNewAverageRating = (product, newRating) => {
    const totalReviews = product.reviews.length + 1;
    const sumRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0) + newRating;
    return Math.round((sumRatings / totalReviews) * 10) / 10;
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FiStar key={i} className="text-yellow-400 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FiStar key={i} className="text-yellow-400 fill-current opacity-50" />);
      } else {
        stars.push(<FiStar key={i} className="text-gray-300" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <HoddyNaveBar
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        scrollToHome={() => {}}
        scrollToShop={() => {}}
        scrollToAboutUs={() => {}}
        scrollToContactUs={() => {}}
      />

      {/* Add to Cart Notification */}
      {showAddToCartNotification && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <FiShoppingCart />
          <span>Item added to cart!</span>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button 
                  onClick={() => {
                    setSelectedProduct(null);
                    setSelectedColor("");
                    setSelectedSize("");
                    setQuantity(1);
                    setCurrentImageIndex(0);
                    setActiveTab("description");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                    <img 
                      src={selectedProduct.images[currentImageIndex]} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain p-4"
                    />
                    
                    {/* Navigation arrows */}
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                        >
                          <FiChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                        >
                          <FiChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnail gallery */}
                  {selectedProduct.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto py-2">
                      {selectedProduct.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-black' : 'border-transparent'}`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div>
                  {/* Rating display */}
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(selectedProduct.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {selectedProduct.rating} ({selectedProduct.reviews.length} reviews)
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Material:</span> {selectedProduct.material}</p>
                  
                  <div className="mb-4">
                    <p className="text-lg font-bold mb-2">{formatPrice(selectedProduct.price)}</p>
                  </div>
                  
                  {/* Color Selection */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Color</h3>
                    <div className="flex gap-2">
                      {selectedProduct.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 border rounded-full text-sm ${selectedColor === color ? 'border-black bg-black text-white' : 'border-gray-300'}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Size Selection */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 border rounded-full text-sm ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Quantity</h3>
                    <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                      <button 
                        onClick={decreaseQuantity}
                        className="px-3 py-1 text-lg hover:bg-gray-100"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                      <button 
                        onClick={increaseQuantity}
                        className="px-3 py-1 text-lg hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={addToCart}
                    disabled={!selectedColor || !selectedSize}
                    className={`w-full py-3 rounded-lg font-medium mb-6 ${!selectedColor || !selectedSize ? 'bg-gray-300 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                  >
                    Add to Cart - {formatPrice(selectedProduct.price * quantity)}
                  </button>
                  
                  {/* Tabs for Description and Reviews */}
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      <button
                        onClick={() => setActiveTab("description")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "description" ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      >
                        Description
                      </button>
                      <button
                        onClick={() => setActiveTab("reviews")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "reviews" ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      >
                        Reviews ({selectedProduct.reviews.length})
                      </button>
                    </nav>
                  </div>
                  
                  {/* Tab content */}
                  <div className="py-4">
                    {activeTab === "description" ? (
                      <p className="text-gray-700">{selectedProduct.description}</p>
                    ) : (
                      <div>
                        {/* Reviews list */}
                        {selectedProduct.reviews.length > 0 ? (
                          <div className="space-y-4">
                            {selectedProduct.reviews.map(review => (
                              <div key={review.id} className="border-b border-gray-100 pb-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{review.user}</p>
                                    <div className="flex items-center mt-1">
                                      <div className="flex mr-2">
                                        {renderStars(review.rating)}
                                      </div>
                                      <span className="text-xs text-gray-500">{review.date}</span>
                                    </div>
                                  </div>
                                </div>
                                <p className="mt-2 text-gray-700">{review.comment}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No reviews yet.</p>
                        )}
                        
                        {/* Add review form */}
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-3">Add a review</h3>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your rating</label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  onClick={() => setNewReview({...newReview, rating: star})}
                                  className="text-2xl focus:outline-none"
                                >
                                  <FiStar 
                                    className={star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-1">Your review</label>
                            <textarea
                              id="review-comment"
                              rows="3"
                              value={newReview.comment}
                              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                              placeholder="Share your thoughts about this product..."
                            ></textarea>
                          </div>
                          <button
                            onClick={submitReview}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="w-full h-64 md:h-96 relative overflow-hidden mb-12">
        <img
          src="/src/assets/images/Collection/Banner Image.jpg"
          alt="Bags Collection Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end pb-12 md:pb-20 justify-center">
          <div className="text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-2">
              Bags Collection
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Discover high-quality bags for every occasion, from work to travel
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search and Filter Bar */}
        <div className="mb-10">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
            >
              {showFilters ? (
                <>
                  <span>Hide Filters</span>
                  <FiChevronUp />
                </>
              ) : (
                <>
                  <span>Show Filters</span>
                  <FiChevronDown />
                </>
              )}
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FiX className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Size Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {allSizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <input
                          id={`size-${size}`}
                          name="size"
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() => toggleSize(size)}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label
                          htmlFor={`size-${size}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Price Range: Rs. {priceRange[0].toLocaleString()} - Rs. {priceRange[1].toLocaleString()}
                  </h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="15000"
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full mb-2"
                    />
                    <input
                      type="range"
                      min="0"
                      max="15000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedSizes.length > 0 || search || priceRange[0] > 0 || priceRange[1] < 15000) && (
                <div className="mt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">Active filters:</span>
                    {selectedSizes.map(size => (
                      <span 
                        key={size} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {size}
                        <button 
                          onClick={() => toggleSize(size)}
                          className="ml-1.5 inline-flex text-gray-400 hover:text-gray-500"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {search && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Search: "{search}"
                        <button 
                          onClick={() => setSearch("")}
                          className="ml-1.5 inline-flex text-gray-400 hover:text-gray-500"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {(priceRange[0] > 0 || priceRange[1] < 15000) && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Price: Rs. {priceRange[0].toLocaleString()} - Rs. {priceRange[1].toLocaleString()}
                        <button 
                          onClick={() => setPriceRange([0, 15000])}
                          className="ml-1.5 inline-flex text-gray-400 hover:text-gray-500"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    <button
                      onClick={resetFilters}
                      className="ml-2 text-sm font-medium text-black hover:text-gray-600"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredProducts.length}</span> products
            </p>
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FiChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* Quick Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      quickAddToCart(product);
                    }}
                    className="absolute top-2 right-2 z-10 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-800"
                    title="Quick Add to Cart"
                  >
                    <FiShoppingCart size={16} />
                  </button>
                  
                  {/* Clickable product card */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedColor(product.colors[0]);
                      setSelectedSize(product.sizes[0]);
                      setCurrentImageIndex(0);
                      setActiveTab("description");
                    }}
                  >
                    <div className="aspect-w-3 aspect-h-4 bg-gray-100 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain object-center group-hover:opacity-90 transition-opacity p-4"
                      />
                    </div>
                    <div className="p-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-1">
                          <div className="flex mr-1">
                            {renderStars(product.rating)}
                          </div>
                          <span className="text-xs text-gray-500">({product.reviews.length})</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{product.material}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-base font-semibold text-gray-900">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS to hide scrollbar in modal */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Bags;