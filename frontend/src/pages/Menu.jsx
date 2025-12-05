import React, { useState } from "react";
import useCartStore from "../store/cartStore";
import burger1 from "../assets/burger_1.jpg";
import burger2 from "../assets/burger_2.png";
import CheeseBurger from "../assets/CheeseBurger.png";
import BBQ_Burger from "../assets/BBQ_Burger.jpg";
import CrispyChickenBurger from "../assets/CrispyChickenBurger.jpg";
import Egg_Burger from "../assets/Egg_Burger.jpg";
import BlackBurger from "../assets/BlackBurger.png";
import hotdog from "../assets/hotdog.png";
import hotdog1 from "../assets/hotdog_1.png";
import hotdog2 from "../assets/hotdog_2.png";
import hotdog3 from "../assets/hotdog_3.jpg";
import RedBurger from "../assets/Red Burger.png";
import combo1 from "../assets/combo_1.jpg";
import combo2 from "../assets/combo_2.jpg";
import combo3 from "../assets/combo_3.png";
import combo4 from "../assets/combo_4.png";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addedItems, setAddedItems] = useState({});
  const addItem = useCartStore((state) => state.addItem);

  const menuItems = [
    {
      id: 1,
      name: "Premium Beast Burger",
      category: "burgers",
      price: 12.99,
      image: burger1,
      description: "100% premium beef, fresh vegetables, and our secret sauce",
      ingredients: ["Premium Beef", "Fresh Lettuce", "Tomato", "Secret Sauce"],
    },
    {
      id: 2,
      name: "Double Beast Delight",
      category: "burgers",
      price: 15.99,
      image: burger2,
      description: "Double patties, double cheese, double the flavor",
      ingredients: ["Double Beef Patties", "Double Cheese", "Bacon", "Special Sauce"],
    },
    {
      id: 3,
      name: "Classic Cheese Burger",
      category: "burgers",
      price: 11.99,
      image: CheeseBurger,
      description: "Classic cheeseburger with premium cheddar cheese",
      ingredients: ["Premium Beef", "Cheddar Cheese", "Pickles", "Onions"],
    },
    {
      id: 4,
      name: "BBQ Beast Burger",
      category: "burgers",
      price: 13.99,
      image: BBQ_Burger,
      description: "Smoky BBQ sauce with crispy onion rings",
      ingredients: ["Premium Beef", "BBQ Sauce", "Onion Rings", "Bacon"],
    },
    {
      id: 5,
      name: "Crispy Chicken Burger",
      category: "burgers",
      price: 11.99,
      image: CrispyChickenBurger,
      description: "Crispy fried chicken breast with special mayo",
      ingredients: ["Crispy Chicken", "Lettuce", "Tomato", "Special Mayo"],
    },
    {
      id: 6,
      name: "Egg Beast Burger",
      category: "burgers",
      price: 12.99,
      image: Egg_Burger,
      description: "Beef patty topped with a perfectly fried egg",
      ingredients: ["Premium Beef", "Fried Egg", "Cheese", "Bacon"],
    },
    {
      id: 7,
      name: "Black Beast Burger",
      category: "burgers",
      price: 14.99,
      image: BlackBurger,
      description: "Premium black bun with our signature beef patty",
      ingredients: ["Premium Beef", "Black Bun", "Special Sauce", "Arugula"],
    },
    {
      id: 8,
      name: "Red Beast Burger",
      category: "burgers",
      price: 13.99,
      image: RedBurger,
      description: "Spicy red bun burger with jalapeños and chipotle sauce",
      ingredients: ["Premium Beef", "Red Bun", "Jalapeños", "Chipotle Sauce"],
    },
    {
      id: 9,
      name: "Classic Hotdog",
      category: "hotdogs",
      price: 8.99,
      image: hotdog,
      description: "Premium quality sausage with your choice of toppings",
      ingredients: ["Premium Sausage", "Mustard", "Ketchup", "Relish"],
    },
    {
      id: 10,
      name: "Chili Cheese Hotdog",
      category: "hotdogs",
      price: 10.99,
      image: hotdog1,
      description: "Loaded with chili, melted cheese, and onions",
      ingredients: ["Premium Sausage", "Chili", "Melted Cheese", "Onions"],
    },
    {
      id: 11,
      name: "Bacon Wrapped Hotdog",
      category: "hotdogs",
      price: 11.99,
      image: hotdog2,
      description: "Premium sausage wrapped in crispy bacon",
      ingredients: ["Premium Sausage", "Crispy Bacon", "Grilled Onions", "Special Sauce"],
    },
    {
      id: 12,
      name: "Loaded Beast Hotdog",
      category: "hotdogs",
      price: 12.99,
      image: hotdog3,
      description: "Fully loaded hotdog with all the fixings",
      ingredients: ["Premium Sausage", "Bacon", "Cheese", "Grilled Peppers", "Special Sauce"],
    },
    {
      id: 13,
      name: "Beast Combo #1",
      category: "combos",
      price: 18.99,
      image: combo1,
      description: "Premium Beast Burger with fries and drink",
      ingredients: ["Premium Beast Burger", "French Fries", "Soft Drink"],
    },
    {
      id: 14,
      name: "Double Beast Combo",
      category: "combos",
      price: 22.99,
      image: combo2,
      description: "Double Beast Burger with onion rings and drink",
      ingredients: ["Double Beast Burger", "Onion Rings", "Soft Drink"],
    },
    {
      id: 15,
      name: "Family Combo",
      category: "combos",
      price: 35.99,
      image: combo3,
      description: "Perfect for sharing! 2 burgers, 2 hotdogs, fries, and drinks",
      ingredients: ["2 Premium Burgers", "2 Classic Hotdogs", "Large Fries", "2 Drinks"],
    },
    {
      id: 16,
      name: "Ultimate Beast Combo",
      category: "combos",
      price: 24.99,
      image: combo4,
      description: "The ultimate feast! Burger, hotdog, fries, onion rings, and drink",
      ingredients: ["Premium Beast Burger", "Chili Cheese Hotdog", "Fries", "Onion Rings", "Soft Drink"],
    },
  ];

  const categories = [
    { id: "all", name: "All Items" },
    { id: "burgers", name: "Burgers" },
    { id: "hotdogs", name: "Hotdogs" },
    { id: "combos", name: "Combo Meals" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          Our <span className="text-orange-600">Menu</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover our delicious selection of burgers, hotdogs, and combo meals, crafted with premium ingredients
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category.id
                ? "bg-orange-600 text-white shadow-xl shadow-orange-600/50"
                : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-600/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{item.description}</p>

                {/* Ingredients */}
                <div className="mb-4">
                  <p className="text-orange-600 font-semibold mb-2 text-sm">Ingredients:</p>
                  <ul className="space-y-1">
                    {item.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-gray-300 text-xs flex items-center">
                        <svg
                          className="w-3 h-3 text-orange-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => {
                    addItem(item);
                    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
                    setTimeout(() => {
                      setAddedItems((prev) => {
                        const newState = { ...prev };
                        delete newState[item.id];
                        return newState;
                      });
                    }, 2000);
                  }}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                    addedItems[item.id]
                      ? "bg-green-600 text-white"
                      : "bg-orange-600 text-white hover:bg-orange-700 hover:shadow-orange-600/50"
                  }`}
                >
                  {addedItems[item.id] ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
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
                      Added!
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-2xl text-gray-400">No items found in this category.</p>
        </div>
      )}

      {/* Call to Action Section */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can't Decide?
          </h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Try our combo meals or visit us in-store to experience the full Beast Burger menu!
          </p>
          <button className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform">
            Order Combo Meal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;

