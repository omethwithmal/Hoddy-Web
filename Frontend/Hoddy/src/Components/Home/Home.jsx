import React, { useEffect, useState } from 'react';
import HoddyNaveBar from '../Hoddy Nave Bar/HoddyNaveBar';

const desktopImages = [
  '/src/assets/images/Home_Section/Home 1.jpg',
  '/src/assets/images/Home_Section/Home 2.jpg',
];
const mobileImages = [
  '/src/assets/images/Home_Section/Home_Mobile-1.jpg',
  '/src/assets/images/Home_Section/Home_Mobile_2.jpg',
];

function Home() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

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

  // Example product data
  const products = [
    {
      image: '/src/assets/images/Home_Section/Home 1.jpg',
      description: 'Premium Cotton Hoodie - Black',
      price: 'Rs. 4,500',
    },
    {
      image: '/src/assets/images/Home_Section/Home 2.jpg',
      description: 'Classic Crewneck - White',
      price: 'Rs. 3,900',
    },
    {
      image: '/src/assets/images/Home_Section/Home_Mobile-1.jpg',
      description: 'Urban Oversized Tee',
      price: 'Rs. 2,800',
    },
    {
      image: '/src/assets/images/Home_Section/Home_Mobile_2.jpg',
      description: 'Minimalist Sweatshirt',
      price: 'Rs. 4,200',
    },
  ];

  return (
    <>
      <HoddyNaveBar />
      <div className="w-full min-h-screen bg-white flex flex-col">
        {/* Mobile Fullscreen Image */}
        <img
          src={images[current]}
          alt={`Home Slide ${current + 1}`}
          className="block sm:hidden w-screen h-screen object-contain object-center rounded-none shadow transition-all duration-700"
        />
        {/* Desktop Image */}
        <img
          src={images[current]}
          alt={`Home Slide ${current + 1}`}
          className="hidden sm:block w-full h-[calc(100vh-5rem)] object-cover object-center rounded-none shadow transition-all duration-700"
        />
      </div>
      {/* New Collection Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center tracking-wide">New Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-4 transition-transform hover:-translate-y-1 hover:shadow-2xl">
              <img src={product.image} alt={product.description} className="w-full h-48 object-cover rounded-xl mb-4" />
              <div className="flex-1 w-full flex flex-col justify-between">
                <p className="text-base font-medium text-gray-800 mb-2 text-center">{product.description}</p>
                <p className="text-lg font-semibold text-black text-center">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
