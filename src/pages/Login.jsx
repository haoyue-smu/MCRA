import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleGmailLogin = (e) => {
    e.preventDefault();

    // Validate Gmail domain
    if (!email.endsWith('@mail.smu.edu.sg') && !email.endsWith('@smu.edu.sg')) {
      setError('Please use your SMU email address (@mail.smu.edu.sg or @smu.edu.sg)');
      return;
    }

    // Simulate successful login
    const user = {
      email: email,
      name: email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' '),
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
    navigate('/');
  };

  const handleGoogleSignIn = () => {
    // In a real app, this would trigger Google OAuth
    // For now, we'll simulate it
    const mockEmail = 'john.tan.2023@mail.smu.edu.sg';
    const user = {
      email: mockEmail,
      name: 'John Tan',
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-smu-blue to-blue-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white p-4 rounded-full mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Singapore_Management_University_logo.svg/1200px-Singapore_Management_University_logo.svg.png"
              alt="SMU Logo"
              className="w-16 h-16 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={{ display: 'none' }} className="w-16 h-16 bg-smu-blue rounded-full flex items-center justify-center text-2xl font-bold text-white">
              SMU
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SCIS Smart Planner</h1>
          <p className="text-blue-100">Sign in with your SMU account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full mb-4 bg-white border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center font-medium"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleGmailLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMU Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="your.name@mail.smu.edu.sg"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-smu-blue focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-smu-blue text-white px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to SCIS Smart Planner's Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-blue-100">
            For SMU students only. Use your official SMU email address.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
