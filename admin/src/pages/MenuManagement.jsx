import React, { useState } from "react";

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Premium Beast Burger",
      category: "burgers",
      price: 12.99,
      description: "100% premium beef, fresh vegetables, and our secret sauce",
      ingredients: ["Premium Beef", "Fresh Lettuce", "Tomato", "Secret Sauce"],
      available: true,
      image: null,
      imagePreview: null,
    },
    {
      id: 2,
      name: "Double Beast Delight",
      category: "burgers",
      price: 15.99,
      description: "Double patties, double cheese, double the flavor",
      ingredients: ["Double Beef Patties", "Double Cheese", "Bacon", "Special Sauce"],
      available: true,
      image: null,
      imagePreview: null,
    },
    {
      id: 3,
      name: "Classic Hotdog",
      category: "hotdogs",
      price: 8.99,
      description: "Premium quality sausage with your choice of toppings",
      ingredients: ["Premium Sausage", "Mustard", "Ketchup", "Relish"],
      available: true,
      image: null,
      imagePreview: null,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "burgers",
    price: "",
    description: "",
    ingredients: "",
    available: true,
    image: null,
    imagePreview: null,
  });

  const categories = ["burgers", "hotdogs", "combos"];

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        ...item,
        ingredients: item.ingredients.join(", "),
        imagePreview: item.imagePreview || null,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        category: "burgers",
        price: "",
        description: "",
        ingredients: "",
        available: true,
        image: null,
        imagePreview: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result,
        });
      };
      
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: editingItem ? editingItem.id : Date.now(),
      price: parseFloat(formData.price),
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      // Keep image preview for display
      imagePreview: formData.imagePreview,
    };

    if (editingItem) {
      setMenuItems(menuItems.map((item) => (item.id === editingItem.id ? newItem : item)));
    } else {
      setMenuItems([...menuItems, newItem]);
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
    }
  };

  const handleToggleAvailability = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          + Add New Item
        </button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Preview */}
            {item.imagePreview && (
              <div className="w-full h-48 overflow-hidden bg-gray-200">
                <img
                  src={item.imagePreview}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-orange-100 text-orange-800">
                    {item.category}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    item.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Ingredients:</p>
                <p className="text-xs text-gray-600">{item.ingredients.join(", ")}</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-orange-600">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleToggleAvailability(item.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded ${
                    item.available
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  {item.available ? "Mark Unavailable" : "Mark Available"}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Item Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Price ($) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Item Image</label>
                  <div className="space-y-4">
                    {formData.imagePreview && (
                      <div className="relative">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              image: null,
                              imagePreview: null,
                            });
                          }}
                          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Ingredients (comma-separated) *
                  </label>
                  <input
                    type="text"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                    placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <label className="ml-2 text-gray-700 font-semibold">Available</label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300"
                  >
                    {editingItem ? "Update Item" : "Add Item"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuManagement;

