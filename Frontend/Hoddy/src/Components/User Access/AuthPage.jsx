import { useState, useEffect, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [welcomeAnimation, setWelcomeAnimation] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const fullWelcomeText = "Welcome to HODDY";
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      
      // The signed-in user info
      const user = result.user;
      
      console.log('Google authentication successful:', user);
      // Here you would typically send the user data to your backend
      // and handle the user session in your application
      
      // For demo purposes, we'll just show an alert
      alert(`Welcome ${user.displayName}! Authentication successful.`);
      
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      
      console.error('Google authentication error:', errorCode, errorMessage);
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Particle animation for the welcome section background
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Draw connections between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    // Initial setup
    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fade-in and slide-up animation for welcome text
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeAnimation(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login data:', { 
        username: formData.username, 
        password: formData.password 
      });
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      console.log('Signup data:', {
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      });
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${forgotPasswordEmail}`);
    setShowForgotPassword(false);
    setForgotPasswordEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      {/* Main Card */}
      <div className="w-full max-w-md md:max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Welcome Section with animated background */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-black p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            {/* Canvas for particle animation */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full opacity-20"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/70 z-0" />
            
            <div className="text-center relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-5 tracking-wide font-montserrat">
                <span className={`block transition-all duration-1000 ease-out ${welcomeAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {fullWelcomeText}
                </span>
              </h1>
              <p className={`text-base md:text-lg text-gray-300 mt-5 mb-5 md:mb-7 transition-all duration-1000 ease-out delay-300 ${welcomeAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Premium Sri Lankan apparel for the global fashion connoisseur
              </p>
              <div className={`flex justify-center transition-all duration-1000 ease-out delay-500 ${welcomeAnimation ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-32 h-0.5 bg-white mb-5 md:mb-7"></div>
              </div>
              <p className={`text-sm md:text-base text-gray-400 transition-all duration-1000 ease-out delay-700 ${welcomeAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Join our community of fashion enthusiasts worldwide
              </p>
            </div>
          </div>

          {/* Auth Form Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8">
            {/* Forgot Password Modal */}
            {showForgotPassword && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <h2 className="text-xl md:text-2xl font-bold text-black mb-4">Forgot Password</h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  <form onSubmit={handleForgotPasswordSubmit}>
                    <div className="mb-4">
                      <label htmlFor="forgotEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="forgotEmail"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(false)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800"
                      >
                        Send Reset Link
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex justify-center mb-2">
              <h1 className="text-xl md:text-2xl font-bold text-black">HODDY</h1>
            </div>
            <p className="text-center text-sm text-gray-600 mb-6">Sign in to your account</p>
            
            {authError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {authError}
              </div>
            )}
            
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 text-sm md:text-base font-medium ${isLogin ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-3 text-sm md:text-base font-medium ${!isLogin ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>
              
              <div className="pt-4">
                <form onSubmit={handleSubmit}>
                  {isLogin ? (
                    <>
                      <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FiEyeOff className="text-gray-500 text-sm" />
                            ) : (
                              <FiEye className="text-gray-500 text-sm" />
                            )}
                          </button>
                        </div>
                        <div className="text-right mt-1">
                          <button 
                            type="button" 
                            onClick={() => setShowForgotPassword(true)}
                            className="text-xs text-gray-600 hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200 mb-4 text-sm md:text-base font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Login'}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FiEyeOff className="text-gray-500 text-sm" />
                            ) : (
                              <FiEye className="text-gray-500 text-sm" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <FiEyeOff className="text-gray-500 text-sm" />
                            ) : (
                              <FiEye className="text-gray-500 text-sm" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200 mb-4 text-sm md:text-base font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Sign Up'}
                      </button>
                    </>
                  )}
                  
                  <div className="flex items-center mb-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="mx-3 text-gray-500 text-xs md:text-sm">OR CONTINUE WITH</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 mb-4 text-sm md:text-base"
                    disabled={isLoading}
                  >
                    <FcGoogle className="text-lg" />
                    <span className="font-medium">Google</span>
                  </button>
                </form>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-xs md:text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-black font-medium hover:underline ml-1"
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;