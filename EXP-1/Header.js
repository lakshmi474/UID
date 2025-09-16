import { Link } from "react-router-dom";

export default function Header({ user, cartCount, onLogout }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">F</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Foodie</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Menu
            </Link>
            <Link 
              to="/calculator" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Calculator
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User actions */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <button 
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 