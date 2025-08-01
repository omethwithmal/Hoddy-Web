import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  // Sample order data
  const allOrders = [
    {
      id: '#ORD-2023-001',
      date: '15 Oct 2023',
      status: 'Delivered',
      items: 3,
      total: 'Rs. 12,450.00',
      shippingAddress: '123 Main St, Colombo 05, Sri Lanka',
      paymentMethod: 'Visa ending in 4242',
      products: [
        {
          id: 1,
          name: 'Floral Print Midi Dress',
          image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
          price: 'Rs. 4,500.00',
          quantity: 1,
          size: 'M'
        },
        {
          id: 2,
          name: 'Denim Jacket',
          image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
          price: 'Rs. 6,500.00',
          quantity: 1,
          size: 'L'
        },
        {
          id: 3,
          name: 'Cotton T-Shirt',
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
          price: 'Rs. 1,450.00',
          quantity: 1,
          size: 'M'
        }
      ]
    },
    {
      id: '#ORD-2023-002',
      date: '05 Sep 2023',
      status: 'Cancelled',
      items: 2,
      total: 'Rs. 8,750.00',
      shippingAddress: '456 Ocean Ave, Galle, Sri Lanka',
      paymentMethod: 'Mastercard ending in 5555',
      products: [
        {
          id: 4,
          name: 'Leather Crossbody Bag',
          image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
          price: 'Rs. 7,500.00',
          quantity: 1,
          size: 'One Size'
        },
        {
          id: 5,
          name: 'Silk Scarf',
          image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
          price: 'Rs. 1,250.00',
          quantity: 1,
          size: 'One Size'
        }
      ]
    },
    {
      id: '#ORD-2023-003',
      date: '22 Aug 2023',
      status: 'Processing',
      items: 1,
      total: 'Rs. 5,990.00',
      shippingAddress: '789 Hill St, Kandy, Sri Lanka',
      paymentMethod: 'PayPal',
      products: [
        {
          id: 6,
          name: 'Wide Leg Trousers',
          image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
          price: 'Rs. 5,990.00',
          quantity: 1,
          size: 'S'
        }
      ]
    },
    {
      id: '#ORD-2023-004',
      date: '10 Nov 2023',
      status: 'Shipped',
      items: 2,
      total: 'Rs. 9,800.00',
      shippingAddress: '321 Beach Rd, Negombo, Sri Lanka',
      paymentMethod: 'Visa ending in 1234',
      products: [
        {
          id: 7,
          name: 'Winter Coat',
          image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
          price: 'Rs. 8,500.00',
          quantity: 1,
          size: 'L'
        },
        {
          id: 8,
          name: 'Wool Scarf',
          image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
          price: 'Rs. 1,300.00',
          quantity: 1,
          size: 'One Size'
        }
      ]
    }
  ];

  const [filter, setFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'Processing':
        return (
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'Cancelled':
        return (
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'Shipped':
        return (
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Filter orders based on selected status
  const filteredOrders = allOrders.filter(order => {
    if (filter === 'all') return true;
    return order.status.toLowerCase() === filter.toLowerCase();
  });

  // Filter by time period
  const timeFilteredOrders = filteredOrders.filter(order => {
    if (timeFilter === 'all') return true;
    
    const days = parseInt(timeFilter);
    const orderDate = new Date(order.date);
    const currentDate = new Date();
    const diffTime = currentDate - orderDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    return diffDays <= days;
  });

  // Filter by search query
  const searchedOrders = timeFilteredOrders.filter(order => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(query) || 
      order.date.toLowerCase().includes(query) || 
      order.status.toLowerCase().includes(query) ||
      order.products.some(product => product.name.toLowerCase().includes(query))
    );
  });

  const toggleOrderExpand = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const openInvoice = (order) => {
    setShowInvoice(order);
  };

  const closeInvoice = () => {
    setShowInvoice(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      {/* Hero Section */}
<div className="relative py-20 bg-black overflow-hidden">
  <div className="absolute inset-0 bg-black opacity-80"></div>
  <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">Your Orders</h1>
    <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
      View your order history and track current orders
    </p>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {searchedOrders.length} order{searchedOrders.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
  <div className="flex-1 grid grid-cols-2 gap-3 sm:flex sm:space-x-3">
    <button
      onClick={() => setFilter('all')}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        filter === 'all' 
          ? 'bg-black text-white' 
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      All Orders
    </button>
    <button
      onClick={() => setFilter('processing')}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        filter === 'processing' 
          ? 'bg-black text-white' 
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      Processing
    </button>
    <button
      onClick={() => setFilter('shipped')}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        filter === 'shipped' 
          ? 'bg-black text-white' 
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      Shipped
    </button>
    <button
      onClick={() => setFilter('delivered')}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        filter === 'delivered' 
          ? 'bg-black text-white' 
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      Delivered
    </button>
    <button
      onClick={() => setFilter('cancelled')}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        filter === 'cancelled' 
          ? 'bg-black text-white' 
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      Cancelled
    </button>
  </div>
  
              <div className="relative min-w-[180px]">
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Time</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 3 Months</option>
                  <option value="365">Last Year</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Orders List */}
          <div className="divide-y divide-gray-200">
            {searchedOrders.length > 0 ? (
              searchedOrders.map((order) => (
                <div key={order.id} className="hover:bg-gray-50 transition-colors">
                  {/* Order Header */}
                  <div 
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between"
                    onClick={() => toggleOrderExpand(order.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${getStatusColor(order.status)} rounded-lg p-3`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Order {order.id}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)} border`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">Placed on {order.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:text-right">
                      <div className="text-sm text-gray-500">{order.items} item{order.items > 1 ? 's' : ''}</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">{order.total}</div>
                      <div className="mt-2 text-sm text-gray-600 font-medium flex items-center justify-end">
                        {expandedOrder === order.id ? 'Hide details' : 'View details'}
                        <svg 
                          className={`ml-1 h-4 w-4 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Items (Collapsible) */}
                  {expandedOrder === order.id && (
                    <div className="px-6 pb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Order Items</h4>
                        <div className="space-y-4">
                          {order.products.map((product) => (
                            <div key={product.id} className="flex items-start">
                              <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex justify-between">
                                  <div>
                                    <h5 className="text-base font-medium text-gray-900">{product.name}</h5>
                                    <div className="mt-1 text-sm text-gray-500">
                                      <span>Size: {product.size}</span>
                                      <span className="mx-2">•</span>
                                      <span>Qty: {product.quantity}</span>
                                    </div>
                                  </div>
                                  <div className="text-base font-medium text-gray-900">{product.price}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Order Summary */}
                      <div className="mt-6 bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Order Summary</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h5>
                            <p className="text-sm text-gray-900">{order.shippingAddress}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h5>
                            <p className="text-sm text-gray-900">{order.paymentMethod}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Actions */}
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => openInvoice(order)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          View Invoice
                        </button>
                        {order.status === 'Delivered' && (
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Buy Again
                          </button>
                        )}
                        {order.status === 'Processing' && (
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel Order
                          </button>
                        )}
                        {order.status === 'Shipped' && (
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Track Order
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 px-6">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {filter === 'all' && !searchQuery
                    ? "You haven't placed any orders yet."
                    : `No orders match your current filters.`}
                </p>
                <div className="mt-6">
                  <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {searchedOrders.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  disabled
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{searchedOrders.length}</span> of{' '}
                    <span className="font-medium">{searchedOrders.length}</span> orders
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      disabled
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      aria-current="page"
                      className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      1
                    </button>
                    <button
                      disabled
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeInvoice}></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Invoice #{showInvoice.id}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Order Date: {showInvoice.date}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={closeInvoice}
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">BILLED TO</h4>
                          <p className="text-sm text-gray-900">John Doe</p>
                          <p className="text-sm text-gray-900">123 Main Street</p>
                          <p className="text-sm text-gray-900">Colombo 05, Sri Lanka</p>
                          <p className="text-sm text-gray-900">john.doe@example.com</p>
                          <p className="text-sm text-gray-900">+94 77 123 4567</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">SHIPPING ADDRESS</h4>
                          <p className="text-sm text-gray-900">{showInvoice.shippingAddress}</p>
                          
                          <h4 className="text-sm font-medium text-gray-500 mt-4 mb-2">PAYMENT METHOD</h4>
                          <p className="text-sm text-gray-900">{showInvoice.paymentMethod}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="text-sm font-medium text-gray-500 mb-4">ORDER SUMMARY</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Qty
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {showInvoice.products.map((product) => (
                              <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img className="h-10 w-10 rounded-md" src={product.image} alt={product.name} />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {product.size}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {product.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                  {product.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                  {product.price}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="4" className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                                Subtotal
                              </td>
                              <td className="px-6 py-4 text-right text-sm text-gray-900">
                                {showInvoice.total}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                                Shipping
                              </td>
                              <td className="px-6 py-4 text-right text-sm text-gray-900">
                                Rs. 0.00
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                                Tax
                              </td>
                              <td className="px-6 py-4 text-right text-sm text-gray-900">
                                Rs. 0.00
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                                Total
                              </td>
                              <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                                {showInvoice.total}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => window.print()}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Invoice
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeInvoice}
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
};

export default OrdersPage;