import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, parseInt(newQuantity) || 1);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Your <span className="text-orange-600">Cart</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Review your order and proceed to checkout
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="mb-8">
              <svg
                className="w-32 h-32 mx-auto text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/menu"
              className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-orange-600/20 transition-all duration-300"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                          aria-label="Remove item"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-400 mb-4 text-sm">{item.description}</p>

                      {/* Quantity and Price */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <label className="text-white font-semibold">Quantity:</label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 bg-gray-700 hover:bg-orange-600 text-white rounded-lg font-bold transition-all duration-300 flex items-center justify-center"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, e.target.value)
                              }
                              className="w-16 px-2 py-1 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-center focus:outline-none focus:border-orange-600"
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 bg-gray-700 hover:bg-orange-600 text-white rounded-lg font-bold transition-all duration-300 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-400">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                {/* Subtotal */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (10%)</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span>$2.99</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-orange-600">
                        ${(totalPrice * 1.1 + 2.99).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-600/50 transform hover:scale-105 active:scale-95"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/menu"
                    className="block w-full text-center text-orange-600 py-3 rounded-lg font-semibold hover:text-orange-700 transition-colors duration-300 border border-orange-600 hover:border-orange-700"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

