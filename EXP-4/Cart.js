import { useState } from "react";

export default function Cart({ cart, setCart }) {
  const [showCalculator, setShowCalculator] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [taxRate, setTaxRate] = useState(5);
  const [tipAmount, setTipAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(10);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = (subtotal * taxRate) / 100;
  const tip = tipAmount || (subtotal * tipPercentage) / 100;
  const total = subtotal + tax + deliveryFee + tip;

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handleTipChange = (value) => {
    setTipAmount(value);
    setTipPercentage(0);
  };

  const handleTipPercentage = (percentage) => {
    setTipPercentage(percentage);
    setTipAmount(0);
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Your Cart</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <p className="text-gray-400 text-sm mt-2">Add some delicious food to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Items</h3>
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Bill Calculator</h3>
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {showCalculator ? 'Hide' : 'Show'} Calculator
              </button>
            </div>

            {/* Bill Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax ({taxRate}%):</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee:</span>
                <span className="font-medium">{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tip:</span>
                <span className="font-medium">{formatCurrency(tip)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold text-blue-600">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Calculator Controls */}
            {showCalculator && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Fee</label>
                  <input
                    type="number"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="20"
                    step="0.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tip</label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {[0, 5, 10, 15, 20].map((percentage) => (
                      <button
                        key={percentage}
                        onClick={() => handleTipPercentage(percentage)}
                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                          tipPercentage === percentage && tipAmount === 0
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {percentage}%
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={tipAmount}
                    onChange={(e) => handleTipChange(Number(e.target.value))}
                    placeholder="Custom tip amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="10"
                  />
                </div>
              </div>
            )}

            {/* Checkout Button */}
            <div className="mt-6">
              <button 
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                onClick={() => {
                  alert(`Thank you for your order! Total: ${formatCurrency(total)}\nYour food will be delivered soon.`);
                  setCart([]);
                }}
              >
                Checkout - {formatCurrency(total)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
