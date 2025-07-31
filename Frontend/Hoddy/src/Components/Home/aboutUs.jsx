import React from 'react';
import HoddyNaveBar from "../Hoddy Nave Bar/HoddyNaveBar";
import CraftsmanshipImage from '/src/assets/images/Home_Section/Home 1.jpg';
import MaterialsImage from '/src/assets/images/Home_Section/Home 1.jpg';
import Founder1Image from '/src/assets/images/Home_Section/Home 1.jpg';
import Founder2Image from '/src/assets/images/Home_Section/Home 1.jpg';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      {/* Navigation */}
      <HoddyNaveBar />
      
      {/* Hero Section - Made smaller */}
      <div className="relative py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">OUR STORY</h1>
          <div className="w-16 h-0.5 bg-white mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Crafting premium apparel with timeless elegance from the heart of Sri Lanka to the world.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider relative pb-3">
              ABOUT HODDY
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-black"></span>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded in 2015, Hoddy emerged from a passion for blending traditional Sri Lankan craftsmanship with contemporary fashion. What began as a small boutique in Colombo has grown into an internationally recognized brand known for its quality and distinctive style.
              </p>
              <p>
                Our name "Hoddy" reflects our commitment to hoodies as our signature product, while our collections have expanded to include a full range of premium apparel for the modern global citizen.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-lg overflow-hidden">
            <img 
              src={CraftsmanshipImage} 
              alt="Hoddy craftsmanship" 
              className="w-full h-full max-h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Mission Section - Dark Background */}
        <div className="bg-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={MaterialsImage} 
                  alt="Hoddy quality materials" 
                  className="w-full h-full max-h-[400px] object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider relative pb-3 text-white">
                  OUR MISSION
                  <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-white"></span>
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    At Hoddy, we're committed to creating fashion that lasts - both in quality and style. We believe in slow fashion principles, creating pieces designed to be worn and loved for years.
                  </p>
                  <p>
                    Our mission extends beyond clothing. We aim to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Promote sustainable and ethical manufacturing practices</li>
                    <li>Support Sri Lankan textile artisans</li>
                    <li>Offer timeless designs that reduce fashion waste</li>
                    <li>Provide exceptional quality at fair prices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold uppercase tracking-wider relative inline-block pb-2">
                OUR CORE VALUES
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-black"></span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "✧",
                  title: "CRAFTSMANSHIP",
                  description: "Every stitch matters. We use premium fabrics and traditional techniques to create garments that stand the test of time."
                },
                {
                  icon: "♻",
                  title: "SUSTAINABILITY",
                  description: "From eco-friendly dyes to minimal waste patterns, we prioritize the planet in every step of our process."
                },
                {
                  icon: "✌",
                  title: "ETHICS",
                  description: "Fair wages, safe working conditions, and respect for all artisans are non-negotiable in our supply chain."
                }
              ].map((value, index) => (
                <div key={index} className="p-6 rounded-lg hover:shadow-lg transition duration-300 group border border-gray-100">
                  <div className="text-4xl mb-4 group-hover:text-black text-gray-400 transition duration-300">{value.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 uppercase tracking-wider">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section - Dark Background */}
        <div className="bg-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold uppercase tracking-wider relative inline-block pb-2">
                MEET OUR FOUNDERS
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white"></span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {[
                {
                  image: Founder1Image,
                  name: "NIMALI FERNANDO",
                  role: "Creative Director",
                  bio: "With a background in textile design, Nimali brings traditional Sri Lankan patterns into contemporary silhouettes."
                },
                {
                  image: Founder2Image,
                  name: "RAJIV PERERA",
                  role: "Operations Director",
                  bio: "Rajiv ensures our ethical production standards while managing our growing international distribution network."
                }
              ].map((founder, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-6 border-2 border-white">
                    <img 
                      src={founder.image} 
                      alt={founder.name} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold uppercase tracking-wider mb-1">{founder.name}</h3>
                  <p className="text-gray-400 mb-4 text-xs uppercase tracking-wider">{founder.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">EXPERIENCE THE HODDY DIFFERENCE</h2>
            <div className="w-16 h-0.5 bg-black mx-auto mb-6"></div>
            <p className="text-gray-600 mb-8 mx-auto text-sm leading-relaxed max-w-lg">
              Join our global community of customers who appreciate quality, sustainability, and timeless style.
            </p>
            <button className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition duration-300 uppercase tracking-wider text-xs">
              Shop Our Collections
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-black text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold tracking-wider">HODDY</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Premium fashion and lifestyle brand offering high-quality products with timeless designs.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'twitter'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <span className="sr-only">{social}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {social === 'facebook' && (
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      )}
                      {social === 'instagram' && (
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.058 1.023-.057 1.351-.057 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      )}
                      {social === 'twitter' && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'New Collection', 'Shop', 'About Us'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-xs transition duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300">Customer Service</h3>
              <ul className="space-y-2">
                {['Contact Us', 'FAQs', 'Shipping Policy', 'Returns & Exchanges', 'Size Guide'].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-gray-400 hover:text-white text-xs transition duration-300">{service}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300">Newsletter</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-3 py-2 bg-gray-900 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-white text-xs"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full px-3 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition duration-300 text-xs uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              &copy; {new Date().getFullYear()} HODDY. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-white text-xs transition duration-300">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;