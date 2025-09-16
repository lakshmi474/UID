import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authenticateUser, addActivity } from "../data/users";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // <-- Fix import


export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Authenticate user using the new system
    const user = authenticateUser(formData.email, formData.password);
    
    if (user) {
      // Log the login activity
      addActivity(user.id, "login");
      
      // Login the user
      onLogin({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      });
      
      navigate("/");
    } else {
      setError("Invalid email or password. Please check your credentials.");
    }
  };
  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // <-- Fix usage
      onLogin({
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        role: "user"
      });
      navigate("/");
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  
  // Handle Google login error
  const handleGoogleLoginError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Foodie
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Order your favorite food online
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>

          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              width="100%"
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Demo users (or create your own account):
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• user@example.com / password (User)</p>
              <p>• admin@foodie.com / admin123 (Admin)</p>
              <p>• illakshmi2705@gmail.com / user123 (User)</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}