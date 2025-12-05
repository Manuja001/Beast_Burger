import React, { useEffect, useRef, useState } from "react";
import burger1 from "../assets/burger_1.jpg";
import burger2 from "../assets/burger_2.png";
import Logo from "../assets/Logo.png";

function About() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

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
        const observer = new IntersectionObserver(observerCallback, observerOptions);
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

  const values = [
    {
      icon: "🍔",
      title: "Quality First",
      description: "We use only the finest ingredients, sourced fresh daily to ensure every bite is perfect.",
    },
    {
      icon: "🔥",
      title: "Flame-Grilled",
      description: "Our signature flame-grilling technique brings out the best flavors in every burger.",
    },
    {
      icon: "❤️",
      title: "Made with Love",
      description: "Every burger is crafted with passion and attention to detail by our expert chefs.",
    },
    {
      icon: "⭐",
      title: "Customer Satisfaction",
      description: "Your happiness is our priority. We go above and beyond to exceed expectations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-900/20 via-black to-gray-900">
        <div className="max-w-7xl mx-auto text-center animate-fadeIn">
          <div className="mb-8 flex justify-center">
            <img
              src={Logo}
              alt="Beast Burger Logo"
              className="h-32 w-auto animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            About <span className="text-orange-600">Beast Burger</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            Serving premium burgers and hotdogs since 2020. We're passionate about creating the ultimate burger experience.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        id="story"
        ref={setRef("story")}
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible.story ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="text-orange-600">Story</span>
              </h2>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                Beast Burger was born from a simple dream: to create the most incredible burger experience possible. 
                Founded in 2020, we started as a small food truck with big ambitions.
              </p>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                What began as a passion project quickly grew into a beloved local favorite. Our secret? 
                We never compromise on quality. Every burger is made to order using premium ingredients, 
                flame-grilled to perfection, and served with a side of genuine hospitality.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Today, Beast Burger continues to push the boundaries of flavor, constantly innovating while 
                staying true to our roots. We're not just serving burgers—we're crafting experiences that 
                bring people together.
              </p>
            </div>
            <div className="relative group">
              <img
                src={burger1}
                alt="Our Story"
                className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section
        id="mission"
        ref={setRef("mission")}
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black transition-all duration-1000 ${
          isVisible.mission ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative group">
              <img
                src={burger2}
                alt="Our Mission"
                className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="text-orange-600">Mission</span>
              </h2>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                At Beast Burger, our mission is simple: to deliver exceptional food experiences that 
                create lasting memories. We believe that great food brings people together and creates 
                moments worth savoring.
              </p>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                We're committed to:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Using only premium, locally-sourced ingredients</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Maintaining the highest standards of food safety and quality</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Providing exceptional customer service</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Supporting our local community</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section
        id="values"
        ref={setRef("values")}
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-orange-600">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 text-center">{value.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the Beast?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Visit us today and taste the difference that passion and quality make!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform">
              View Menu
            </button>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
