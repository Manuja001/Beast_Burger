import React, { useState } from "react";

function OrdersManagement() {
  const [orders, setOrders] = useState([
    {
      id: "#1234",
      customer: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      items: [
        { name: "Premium Beast Burger", quantity: 2, price: 12.99 },
        { name: "Classic Hotdog", quantity: 1, price: 8.99 },
      ],
      subtotal: 34.97,
      tax: 3.50,
      deliveryFee: 2.99,
      total: 41.46,
      status: "Pending",
      paymentMethod: "Card",
      address: "123 Main St, New York, NY 10001",
      createdAt: "2024-01-15 10:30 AM",
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      items: [
        { name: "Double Beast Delight", quantity: 1, price: 15.99 },
        { name: "BBQ Beast Burger", quantity: 1, price: 13.99 },
      ],
      subtotal: 29.98,
      tax: 3.00,
      deliveryFee: 2.99,
      total: 35.97,
      status: "Preparing",
      paymentMethod: "Cash",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      createdAt: "2024-01-15 11:15 AM",
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 345-6789",
      items: [
        { name: "Family Combo", quantity: 1, price: 35.99 },
      ],
      subtotal: 35.99,
      tax: 3.60,
      deliveryFee: 2.99,
      total: 42.58,
      status: "Ready",
      paymentMethod: "Card",
      address: "789 Pine Rd, Chicago, IL 60601",
      createdAt: "2024-01-15 09:45 AM",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const statuses = ["all", "Pending", "Preparing", "Ready", "Delivered", "Cancelled"];

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Preparing":
        return "bg-blue-100 text-blue-800";
      case "Ready":
        return "bg-green-100 text-green-800";
      case "Delivered":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
        <div className="flex gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                filterStatus === status
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items.length} item(s)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(
                        order.status
                      )} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Order Details - {selectedOrder.id}</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
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

              <div className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Customer Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p><span className="font-semibold">Name:</span> {selectedOrder.customer}</p>
                    <p><span className="font-semibold">Email:</span> {selectedOrder.email}</p>
                    <p><span className="font-semibold">Phone:</span> {selectedOrder.phone}</p>
                    <p><span className="font-semibold">Address:</span> {selectedOrder.address}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Order Summary</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${selectedOrder.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>${selectedOrder.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-300 font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-orange-600">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Payment Method</h4>
                    <p className="text-gray-600">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Status</h4>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersManagement;

