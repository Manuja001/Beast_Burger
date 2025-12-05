import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const deliveryFee = 2.99;
  const finalTotal = subtotal + tax + deliveryFee;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart();
      
      // Redirect to home after 5 seconds
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Please add items to your cart before checkout.</p>
          <Link
            to="/menu"
            className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 shadow-2xl">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Order <span className="text-green-600">Placed!</span>
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Thank you for your order, {formData.firstName}!
            </p>
            <p className="text-gray-400">
              Your order has been confirmed and will be prepared shortly.
            </p>
            <p className="text-gray-400 mt-4">
              Order Number: <span className="text-orange-600 font-bold">#{Math.floor(Math.random() * 1000000)}</span>
            </p>
            <p className="text-gray-400 mt-8 text-sm">
              You will be redirected to the home page in a few seconds...
            </p>
          </div>
          <Link
            to="/"
            className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Checkout
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Complete your order by providing your information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Customer <span className="text-orange-600">Information</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-white font-semibold mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-white font-semibold mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white font-semibold mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-white font-semibold mb-2">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-white font-semibold mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-white font-semibold mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-white font-semibold mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                      placeholder="10001"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="pt-6 border-t border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer hover:border-orange-600 transition-colors duration-300">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleChange}
                        className="w-5 h-5 text-orange-600 focus:ring-orange-600"
                      />
                      <span className="ml-3 text-white font-semibold">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center p-4 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer hover:border-orange-600 transition-colors duration-300">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleChange}
                        className="w-5 h-5 text-orange-600 focus:ring-orange-600"
                      />
                      <span className="ml-3 text-white font-semibold">Cash on Delivery</span>
                    </label>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="space-y-4 mt-6">
                      <div>
                        <label htmlFor="cardNumber" className="block text-white font-semibold mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required={formData.paymentMethod === "card"}
                          maxLength="19"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-white font-semibold mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required={formData.paymentMethod === "card"}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-white font-semibold mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            required={formData.paymentMethod === "card"}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCVV" className="block text-white font-semibold mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cardCVV"
                            name="cardCVV"
                            value={formData.cardCVV}
                            onChange={handleChange}
                            required={formData.paymentMethod === "card"}
                            placeholder="123"
                            maxLength="4"
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-600/50 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8"
                >
                  {isSubmitting ? "Processing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-700 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm truncate">{item.name}</h4>
                      <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      <p className="text-orange-600 font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pt-4 border-t border-gray-700">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-orange-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/cart"
                className="block w-full text-center text-orange-600 py-3 rounded-lg font-semibold hover:text-orange-700 transition-colors duration-300 border border-orange-600 hover:border-orange-700"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

