import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log(isLogin ? 'Logging in' : 'Signing up', formData);
    // Add your authentication logic here
    navigate('/dashboard'); // Redirect after successful auth
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Google login success:', decoded);
    
    // Auto-fill form with Google data
    setFormData({
      ...formData,
      email: decoded.email,
      username: decoded.name.split(' ')[0] || '',
    });

    // Simulate login success
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleError = () => {
    console.log('Google login failed');
    alert('Google login failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-full shadow-md">
            <button
              onClick={() => {
                setIsLogin(true);
                setShowForgotPassword(false);
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                isLogin && !showForgotPassword 
                  ? 'bg-black text-white' 
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setShowForgotPassword(false);
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                !isLogin && !showForgotPassword 
                  ? 'bg-black text-white' 
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {showForgotPassword ? (
              <>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Reset Password</h2>
                <p className="text-center text-gray-700 mb-8">Enter your email to receive a reset link</p>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all shadow-md"
                  >
                    Send Reset Link
                  </button>
                  
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="text-black hover:text-gray-700 text-sm font-medium"
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-center text-gray-700 mb-8">
                  {isLogin ? 'Login to access your account' : 'Join us today!'}
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Google Login Button inside the form */}
                  <div className="mb-6">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap
                      theme="outline"
                      size="large"
                      text={isLogin ? "continue_with" : "signup_with"}
                      shape="rectangular"
                      width="100%"
                      logo_alignment="left"
                      locale="en_US"
                      auto_select={false}
                      cancel_on_tap_outside={true}
                      context={isLogin ? "signin" : "signup"}
                    />
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {!isLogin && (
                    <>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-900 mb-2">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                          required
                        />
                      </div>
                    </>
                  )}

                  {isLogin && (
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                        required
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="mt-2 text-right mb-6">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-black hover:text-gray-700 font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all shadow-md mb-4"
                  >
                    {isLogin ? 'Login' : 'Sign Up'}
                  </button>
                </form>
              </>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-100 px-8 py-6 text-center">
            {isLogin ? (
              <p className="text-gray-700">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-black hover:text-gray-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-gray-700">
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-black hover:text-gray-700 font-medium"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap the AuthForm with GoogleOAuthProvider
export default function AuthPage() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"}>
      <AuthForm />
    </GoogleOAuthProvider>
  );
}