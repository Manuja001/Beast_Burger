import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import burger1 from "../assets/burger_1.jpg";
import burger2 from "../assets/burger_2.png";
import hotdog from "../assets/hotdog.png";
import heroVideo from "../assets/hero.mp4";

function Home() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const observers = [];

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    };

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        const observer = new IntersectionObserver(
          observerCallback,
          observerOptions
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const setRef = (id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fadeIn">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            <span
              className="block animate-slideDown"
              style={{ animationDelay: "0.2s" }}
            >
              BEAST
            </span>
            <span
              className="block text-orange-600 animate-slideUp"
              style={{ animationDelay: "0.4s" }}
            >
              BURGER
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg animate-fadeIn"
            style={{ animationDelay: "0.6s" }}
          >
            Experience the Ultimate Burger Adventure
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn"
            style={{ animationDelay: "0.8s" }}
          >
            <button
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Order Now
            </button>
            <button
              className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              onClick={() => {
                navigate("/menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              View Menu
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center text-white">
            <span className="text-sm mb-2">Scroll Down</span>
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Burger Section 1 */}
      <section
        id="burger1"
        ref={setRef("burger1")}
        className={`min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-black transition-all duration-1000 ${
          isVisible.burger1
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20"
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 delay-300 ${
              isVisible.burger1
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Premium <span className="text-orange-600">Beast Burger</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Our signature Beast Burger is crafted with 100% premium beef,
              fresh vegetables, and our secret sauce. Every bite is a journey of
              flavors that will leave you craving for more.
            </p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                100% Premium Beef
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Fresh Ingredients
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Secret Sauce
              </li>
            </ul>
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform" onClick={() =>{navigate("/menu");}}>
              Try It Now
            </button>
          </div>
          <div
            className={`order-1 lg:order-2 transition-all duration-1000 delay-500 ${
              isVisible.burger1
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-20 scale-95"
            }`}
          >
            <div className="relative group">
              <img
                src={burger1}
                alt="Premium Beast Burger"
                className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotdog Section */}
      <section
        id="hotdog"
        ref={setRef("hotdog")}
        className={`min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-900 via-black to-gray-900 transition-all duration-1000 ${
          isVisible.hotdog
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20"
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`order-1 transition-all duration-1000 delay-300 ${
              isVisible.hotdog
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-20 scale-95"
            }`}
          >
            <div className="relative group">
              <img
                src={hotdog}
                alt="Premium Hotdog"
                className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          <div
            className={`order-2 transition-all duration-1000 delay-500 ${
              isVisible.hotdog
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Classic <span className="text-orange-600">Hotdog</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Our classic hotdog is a timeless favorite, made with premium
              quality sausages and served with your choice of toppings. A
              perfect blend of tradition and taste.
            </p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Premium Sausages
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Custom Toppings
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Fresh Buns
              </li>
            </ul>
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform" onClick = {() =>{navigate("/menu");}}>
              Order Hotdog
            </button>
          </div>
        </div>
      </section>

      {/* Burger Section 2 */}
      <section
        id="burger2"
        ref={setRef("burger2")}
        className={`min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-orange-900 transition-all duration-1000 ${
          isVisible.burger2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20"
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 delay-300 ${
              isVisible.burger2
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Double <span className="text-orange-600">Beast</span> Delight
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Double the patties, double the flavor! Our Double Beast Burger
              features two premium beef patties, double cheese, and all the
              fixings. For those who dare to go big.
            </p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Double Beef Patties
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Extra Cheese
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Premium Toppings
              </li>
            </ul>
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform" onClick = {() =>{navigate("/menu");}}>
              Get Double Beast
            </button>
          </div>
          <div
            className={`order-1 lg:order-2 transition-all duration-1000 delay-500 ${
              isVisible.burger2
                ? "opacity-100 translate-x-0 scale-100 rotate-0"
                : "opacity-0 translate-x-20 scale-95 rotate-3"
            }`}
          >
            <div className="relative group">
              <img
                src={burger2}
                alt="Double Beast Burger"
                className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Experience the Beast?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Order now and get your favorite burgers and hotdogs delivered fresh
            to your door!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform" onClick = {() => {navigate("/checkout")}}>
              Order Online
            </button>
            <button
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Visit Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
