import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'kn' | 'hi';

interface Translations {
  // Navbar
  home: string;
  products: string;
  admin: string;
  smartBazaar: string;
  
  // Home Page
  theFutureOfGroceryShopping: string;
  welcomeTo: string;
  assistant: string;
  heroSubheadline: string;
  startShopping: string;
  voiceSearch: string;
  imageSearch: string;
  whyChooseSmartBazaar: string;
  revolutionizingExperience: string;
  noQueues: string;
  noQueuesDesc: string;
  fasterCheckout: string;
  fasterCheckoutDesc: string;
  smartCart: string;
  smartCartDesc: string;
  productsCount: string;
  avgCheckout: string;
  satisfaction: string;
  support: string;
  copyright: string;
  
  // Products Page
  browseProducts: string;
  productsAvailable: string;
  searchForProducts: string;
  noProductsFound: string;
  tryAdjusting: string;
  all: string;
  bakery: string;
  dairy: string;
  fruits: string;
  vegetables: string;
  spreads: string;
  beverages: string;
  grains: string;
  snacks: string;
  cooking: string;
  
  // Product Card
  addToCart: string;
  onlyLeft: string;
  expiresIn: string;
  days: string;
  aisle: string;
  
  // Checkout Page
  yourCart: string;
  continueShopping: string;
  cartIsEmpty: string;
  startAddingItems: string;
  browseProductsBtn: string;
  frequentlyBoughtTogether: string;
  orderSummary: string;
  verified: string;
  subtotal: string;
  items: string;
  gst: string;
  total: string;
  payNow: string;
  scanningItems: string;
  paymentSuccessful: string;
  thankYouShopping: string;
  billSentTo: string;
  downloadBill: string;
  shareViaWhatsApp: string;
  
  // Admin Page
  adminLogin: string;
  email: string;
  password: string;
  signIn: string;
  invalidCredentials: string;
  adminDashboard: string;
  manageInventory: string;
  addProduct: string;
  totalProducts: string;
  lowStock: string;
  nearExpiry: string;
  customersToday: string;
  lowStockAlert: string;
  allProductsWellStocked: string;
  left: string;
  nearExpiryItems: string;
  noProductsNearExpiry: string;
  expires: string;
  customerInsights: string;
  today: string;
  phoneNumber: string;
  time: string;
  totalSpend: string;
  productManagement: string;
  inStock: string;
  signOut: string;
  
  // Product Form Modal
  editProduct: string;
  addNewProduct: string;
  productName: string;
  brand: string;
  price: string;
  originalPrice: string;
  stockQuantity: string;
  offerTag: string;
  category: string;
  expiryDate: string;
  productImage: string;
  updateProduct: string;
  
  // Aisle Map
  storeMap: string;
  finding: string;
  entrance: string;
  checkout: string;
  yourItem: string;
  otherAisles: string;
  
  // OTP Modal
  verifyToContinue: string;
  enterEmailToReceiveOTP: string;
  emailAddress: string;
  enterYourEmail: string;
  sendOTP: string;
  enterOTPSentTo: string;
  enterOTP: string;
  enterSixDigitOTP: string;
  checkEmailForOTP: string;
  verifyAndContinue: string;
  changeEmail: string;
  verifying: string;
  sendingOTP: string;
  termsOfService: string;
  
  // Delete Dialog
  deleteProduct: string;
  deleteConfirmation: string;
  cancel: string;
  delete: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navbar
    home: 'Home',
    products: 'Products',
    admin: 'Admin',
    smartBazaar: 'Smart Bazaar',
    
    // Home Page
    theFutureOfGroceryShopping: 'The Future of Grocery Shopping',
    welcomeTo: 'Welcome to',
    assistant: 'Assistant',
    heroSubheadline: 'Experience seamless grocery shopping with AI-powered search, smart recommendations, and lightning-fast checkout.',
    startShopping: 'Start Shopping',
    voiceSearch: 'Voice Search',
    imageSearch: 'Image Search',
    whyChooseSmartBazaar: 'Why Choose Smart Bazaar?',
    revolutionizingExperience: 'Revolutionizing your grocery experience with cutting-edge technology',
    noQueues: 'No Queues',
    noQueuesDesc: 'Skip the long checkout lines with our smart self-checkout system.',
    fasterCheckout: 'Faster Checkout',
    fasterCheckoutDesc: 'Scan, pay, and go in under 60 seconds with mobile payments.',
    smartCart: 'Smart Cart',
    smartCartDesc: 'Real-time price tracking and smart recommendations as you shop.',
    productsCount: 'Products',
    avgCheckout: 'Avg Checkout',
    satisfaction: 'Satisfaction',
    support: 'Support',
    copyright: '© 2026 Smart Bazaar Assistant.',
    
    // Products Page
    browseProducts: 'Browse Products',
    productsAvailable: 'products available',
    searchForProducts: 'Search for products...',
    noProductsFound: 'No products found',
    tryAdjusting: 'Try adjusting your search or filter criteria',
    all: 'All',
    bakery: 'Bakery',
    dairy: 'Dairy',
    fruits: 'Fruits',
    vegetables: 'Vegetables',
    spreads: 'Spreads',
    beverages: 'Beverages',
    grains: 'Grains',
    snacks: 'Snacks',
    cooking: 'Cooking',
    
    // Product Card
    addToCart: 'Add to Cart',
    onlyLeft: 'Only',
    expiresIn: 'Expires in',
    days: 'days',
    aisle: 'Aisle',
    
    // Checkout Page
    yourCart: 'Your Cart',
    continueShopping: 'Continue Shopping',
    cartIsEmpty: 'Your cart is empty',
    startAddingItems: 'Start adding some delicious items!',
    browseProductsBtn: 'Browse Products',
    frequentlyBoughtTogether: 'Frequently Bought Together',
    orderSummary: 'Order Summary',
    verified: 'Verified',
    subtotal: 'Subtotal',
    items: 'items',
    gst: 'GST (5%)',
    total: 'Total',
    payNow: 'Pay Now',
    scanningItems: 'Scanning items...',
    paymentSuccessful: 'Payment Successful!',
    thankYouShopping: 'Thank you for shopping with Smart Bazaar',
    billSentTo: 'Bill sent to:',
    downloadBill: 'Download Bill (PDF)',
    shareViaWhatsApp: 'Share Bill via WhatsApp',
    
    // Admin Page
    adminLogin: 'Admin Login',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    invalidCredentials: 'Invalid credentials. Please try again.',
    adminDashboard: 'Admin Dashboard',
    manageInventory: 'Manage your Smart Bazaar inventory and customers',
    addProduct: 'Add Product',
    totalProducts: 'Total Products',
    lowStock: 'Low Stock',
    nearExpiry: 'Near Expiry',
    customersToday: 'Customers Today',
    lowStockAlert: 'Low Stock Alert',
    allProductsWellStocked: 'All products are well stocked!',
    left: 'left',
    nearExpiryItems: 'Near Expiry Items',
    noProductsNearExpiry: 'No products near expiry!',
    expires: 'Expires:',
    customerInsights: 'Customer Insights',
    today: 'Today',
    phoneNumber: 'Phone Number',
    time: 'Time',
    totalSpend: 'Total Spend',
    productManagement: 'Product Management',
    inStock: 'in stock',
    signOut: 'Sign Out',
    
    // Product Form Modal
    editProduct: 'Edit Product',
    addNewProduct: 'Add New Product',
    productName: 'Product Name',
    brand: 'Brand',
    price: 'Price (Rs.)',
    originalPrice: 'Original Price',
    stockQuantity: 'Stock Quantity',
    offerTag: 'Offer Tag',
    category: 'Category',
    expiryDate: 'Expiry Date',
    productImage: 'Product Image',
    updateProduct: 'Update Product',
    
    // Aisle Map
    storeMap: 'Store Map',
    finding: 'Finding:',
    entrance: 'Entrance',
    checkout: 'Checkout',
    yourItem: 'Your Item',
    otherAisles: 'Other Aisles',
    
    // OTP Modal
    verifyToContinue: 'Verify to Continue',
    enterEmailToReceiveOTP: 'Enter your email address to receive a one-time password',
    emailAddress: 'Email Address',
    enterYourEmail: 'Enter your email',
    sendOTP: 'Send OTP',
    enterOTPSentTo: 'Enter the 6-digit OTP sent to',
    enterOTP: 'Enter OTP',
    enterSixDigitOTP: 'Enter 6-digit OTP',
    checkEmailForOTP: 'Check your email inbox for the OTP code',
    verifyAndContinue: 'Verify & Continue',
    changeEmail: 'Change Email',
    verifying: 'Verifying...',
    sendingOTP: 'Sending OTP...',
    termsOfService: 'By continuing, you agree to our Terms of Service',
    
    // Delete Dialog
    deleteProduct: 'Delete Product',
    deleteConfirmation: 'Are you sure you want to delete this product? This action cannot be undone.',
    cancel: 'Cancel',
    delete: 'Delete',
  },
  kn: {
    // Navbar
    home: 'ಮುಖಪುಟ',
    products: 'ಉತ್ಪನ್ನಗಳು',
    admin: 'ನಿರ್ವಾಹಕ',
    smartBazaar: 'ಸ್ಮಾರ್ಟ್ ಬಜಾರ್',
    
    // Home Page
    theFutureOfGroceryShopping: 'ದಿನಸಿ ಶಾಪಿಂಗ್‌ನ ಭವಿಷ್ಯ',
    welcomeTo: 'ಸುಸ್ವಾಗತ',
    assistant: 'ಸಹಾಯಕ',
    heroSubheadline: 'AI-ಆಧಾರಿತ ಹುಡುಕಾಟ, ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸುಗಳು ಮತ್ತು ತ್ವರಿತ ಚೆಕ್‌ಔಟ್‌ನೊಂದಿಗೆ ಸುಲಭ ದಿನಸಿ ಶಾಪಿಂಗ್ ಅನುಭವಿಸಿ.',
    startShopping: 'ಶಾಪಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    voiceSearch: 'ಧ್ವನಿ ಹುಡುಕಾಟ',
    imageSearch: 'ಚಿತ್ರ ಹುಡುಕಾಟ',
    whyChooseSmartBazaar: 'ಸ್ಮಾರ್ಟ್ ಬಜಾರ್ ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?',
    revolutionizingExperience: 'ಅತ್ಯಾಧುನಿಕ ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ನಿಮ್ಮ ದಿನಸಿ ಅನುಭವವನ್ನು ಕ್ರಾಂತಿಕಾರಿಗೊಳಿಸುತ್ತಿದೆ',
    noQueues: 'ಸರತಿ ಇಲ್ಲ',
    noQueuesDesc: 'ನಮ್ಮ ಸ್ಮಾರ್ಟ್ ಸ್ವಯಂ-ಚೆಕ್‌ಔಟ್ ಸಿಸ್ಟಮ್‌ನೊಂದಿಗೆ ಉದ್ದ ಸರತಿಗಳನ್ನು ಬಿಟ್ಟುಬಿಡಿ.',
    fasterCheckout: 'ವೇಗದ ಚೆಕ್‌ಔಟ್',
    fasterCheckoutDesc: 'ಮೊಬೈಲ್ ಪಾವತಿಗಳೊಂದಿಗೆ 60 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಸ್ಕ್ಯಾನ್, ಪಾವತಿ ಮತ್ತು ಹೋಗಿ.',
    smartCart: 'ಸ್ಮಾರ್ಟ್ ಕಾರ್ಟ್',
    smartCartDesc: 'ನೀವು ಶಾಪಿಂಗ್ ಮಾಡುವಾಗ ನೈಜ-ಸಮಯದ ಬೆಲೆ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸುಗಳು.',
    productsCount: 'ಉತ್ಪನ್ನಗಳು',
    avgCheckout: 'ಸರಾಸರಿ ಚೆಕ್‌ಔಟ್',
    satisfaction: 'ತೃಪ್ತಿ',
    support: 'ಬೆಂಬಲ',
    copyright: '© 2026 ಸ್ಮಾರ್ಟ್ ಬಜಾರ್ ಸಹಾಯಕ.',
    
    // Products Page
    browseProducts: 'ಉತ್ಪನ್ನಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
    productsAvailable: 'ಉತ್ಪನ್ನಗಳು ಲಭ್ಯವಿದೆ',
    searchForProducts: 'ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ...',
    noProductsFound: 'ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಸಿಗಲಿಲ್ಲ',
    tryAdjusting: 'ನಿಮ್ಮ ಹುಡುಕಾಟ ಅಥವಾ ಫಿಲ್ಟರ್ ಮಾನದಂಡವನ್ನು ಸರಿಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ',
    all: 'ಎಲ್ಲಾ',
    bakery: 'ಬೇಕರಿ',
    dairy: 'ಡೈರಿ',
    fruits: 'ಹಣ್ಣುಗಳು',
    vegetables: 'ತರಕಾರಿಗಳು',
    spreads: 'ಸ್ಪ್ರೆಡ್‌ಗಳು',
    beverages: 'ಪಾನೀಯಗಳು',
    grains: 'ಧಾನ್ಯಗಳು',
    snacks: 'ತಿಂಡಿಗಳು',
    cooking: 'ಅಡುಗೆ',
    
    // Product Card
    addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    onlyLeft: 'ಕೇವಲ',
    expiresIn: 'ಅವಧಿ ಮುಗಿಯುತ್ತದೆ',
    days: 'ದಿನಗಳು',
    aisle: 'ಸಾಲು',
    
    // Checkout Page
    yourCart: 'ನಿಮ್ಮ ಕಾರ್ಟ್',
    continueShopping: 'ಶಾಪಿಂಗ್ ಮುಂದುವರಿಸಿ',
    cartIsEmpty: 'ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ',
    startAddingItems: 'ರುಚಿಕರ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಲು ಪ್ರಾರಂಭಿಸಿ!',
    browseProductsBtn: 'ಉತ್ಪನ್ನಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
    frequentlyBoughtTogether: 'ಆಗಾಗ್ಗೆ ಒಟ್ಟಿಗೆ ಖರೀದಿಸಲಾಗುತ್ತದೆ',
    orderSummary: 'ಆರ್ಡರ್ ಸಾರಾಂಶ',
    verified: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    subtotal: 'ಉಪಮೊತ್ತ',
    items: 'ವಸ್ತುಗಳು',
    gst: 'ಜಿಎಸ್‌ಟಿ (5%)',
    total: 'ಒಟ್ಟು',
    payNow: 'ಈಗ ಪಾವತಿಸಿ',
    scanningItems: 'ವಸ್ತುಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    paymentSuccessful: 'ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ!',
    thankYouShopping: 'ಸ್ಮಾರ್ಟ್ ಬಜಾರ್‌ನೊಂದಿಗೆ ಶಾಪಿಂಗ್ ಮಾಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು',
    billSentTo: 'ಬಿಲ್ ಕಳುಹಿಸಲಾಗಿದೆ:',
    downloadBill: 'ಬಿಲ್ ಡೌನ್‌ಲೋಡ್ (PDF)',
    shareViaWhatsApp: 'ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಮೂಲಕ ಹಂಚಿಕೊಳ್ಳಿ',
    
    // Admin Page
    adminLogin: 'ನಿರ್ವಾಹಕ ಲಾಗಿನ್',
    email: 'ಇಮೇಲ್',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    signIn: 'ಸೈನ್ ಇನ್',
    invalidCredentials: 'ಅಮಾನ್ಯ ರುಜುವಾತುಗಳು. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    adminDashboard: 'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    manageInventory: 'ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಬಜಾರ್ ಸಂಗ್ರಹ ಮತ್ತು ಗ್ರಾಹಕರನ್ನು ನಿರ್ವಹಿಸಿ',
    addProduct: 'ಉತ್ಪನ್ನ ಸೇರಿಸಿ',
    totalProducts: 'ಒಟ್ಟು ಉತ್ಪನ್ನಗಳು',
    lowStock: 'ಕಡಿಮೆ ಸ್ಟಾಕ್',
    nearExpiry: 'ಅವಧಿ ಮುಗಿಯುತ್ತಿದೆ',
    customersToday: 'ಇಂದಿನ ಗ್ರಾಹಕರು',
    lowStockAlert: 'ಕಡಿಮೆ ಸ್ಟಾಕ್ ಎಚ್ಚರಿಕೆ',
    allProductsWellStocked: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು ಚೆನ್ನಾಗಿ ಸಂಗ್ರಹವಾಗಿವೆ!',
    left: 'ಉಳಿದಿದೆ',
    nearExpiryItems: 'ಅವಧಿ ಮುಗಿಯುತ್ತಿರುವ ವಸ್ತುಗಳು',
    noProductsNearExpiry: 'ಅವಧಿ ಮುಗಿಯುತ್ತಿರುವ ಉತ್ಪನ್ನಗಳಿಲ್ಲ!',
    expires: 'ಅವಧಿ:',
    customerInsights: 'ಗ್ರಾಹಕ ಒಳನೋಟಗಳು',
    today: 'ಇಂದು',
    phoneNumber: 'ಫೋನ್ ಸಂಖ್ಯೆ',
    time: 'ಸಮಯ',
    totalSpend: 'ಒಟ್ಟು ಖರ್ಚು',
    productManagement: 'ಉತ್ಪನ್ನ ನಿರ್ವಹಣೆ',
    inStock: 'ಸ್ಟಾಕ್‌ನಲ್ಲಿ',
    signOut: 'ಸೈನ್ ಔಟ್',
    
    // Product Form Modal
    editProduct: 'ಉತ್ಪನ್ನ ಸಂಪಾದಿಸಿ',
    addNewProduct: 'ಹೊಸ ಉತ್ಪನ್ನ ಸೇರಿಸಿ',
    productName: 'ಉತ್ಪನ್ನದ ಹೆಸರು',
    brand: 'ಬ್ರಾಂಡ್',
    price: 'ಬೆಲೆ (ರೂ.)',
    originalPrice: 'ಮೂಲ ಬೆಲೆ',
    stockQuantity: 'ಸ್ಟಾಕ್ ಪ್ರಮಾಣ',
    offerTag: 'ಆಫರ್ ಟ್ಯಾಗ್',
    category: 'ವರ್ಗ',
    expiryDate: 'ಅವಧಿ ಮುಗಿಯುವ ದಿನಾಂಕ',
    productImage: 'ಉತ್ಪನ್ನ ಚಿತ್ರ',
    updateProduct: 'ಉತ್ಪನ್ನ ನವೀಕರಿಸಿ',
    
    // Aisle Map
    storeMap: 'ಅಂಗಡಿ ನಕ್ಷೆ',
    finding: 'ಹುಡುಕುತ್ತಿದೆ:',
    entrance: 'ಪ್ರವೇಶ',
    checkout: 'ಚೆಕ್‌ಔಟ್',
    yourItem: 'ನಿಮ್ಮ ವಸ್ತು',
    otherAisles: 'ಇತರ ಸಾಲುಗಳು',
    
    // OTP Modal
    verifyToContinue: 'ಮುಂದುವರಿಸಲು ಪರಿಶೀಲಿಸಿ',
    enterEmailToReceiveOTP: 'ಒಂದು-ಬಾರಿ ಪಾಸ್‌ವರ್ಡ್ ಪಡೆಯಲು ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ',
    emailAddress: 'ಇಮೇಲ್ ವಿಳಾಸ',
    enterYourEmail: 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ',
    sendOTP: 'OTP ಕಳುಹಿಸಿ',
    enterOTPSentTo: 'ಕಳುಹಿಸಲಾದ 6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ',
    enterOTP: 'OTP ನಮೂದಿಸಿ',
    enterSixDigitOTP: '6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ',
    checkEmailForOTP: 'OTP ಕೋಡ್‌ಗಾಗಿ ನಿಮ್ಮ ಇಮೇಲ್ ಇನ್‌ಬಾಕ್ಸ್ ಪರಿಶೀಲಿಸಿ',
    verifyAndContinue: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ',
    changeEmail: 'ಇಮೇಲ್ ಬದಲಾಯಿಸಿ',
    verifying: 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    sendingOTP: 'OTP ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
    termsOfService: 'ಮುಂದುವರಿಸುವ ಮೂಲಕ, ನೀವು ನಮ್ಮ ಸೇವಾ ನಿಯಮಗಳನ್ನು ಒಪ್ಪುತ್ತೀರಿ',
    
    // Delete Dialog
    deleteProduct: 'ಉತ್ಪನ್ನ ಅಳಿಸಿ',
    deleteConfirmation: 'ಈ ಉತ್ಪನ್ನವನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ಈ ಕ್ರಿಯೆಯನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ.',
    cancel: 'ರದ್ದುಮಾಡಿ',
    delete: 'ಅಳಿಸಿ',
  },
  hi: {
    // Navbar
    home: 'होम',
    products: 'उत्पाद',
    admin: 'एडमिन',
    smartBazaar: 'स्मार्ट बाज़ार',
    
    // Home Page
    theFutureOfGroceryShopping: 'किराने की खरीदारी का भविष्य',
    welcomeTo: 'स्वागत है',
    assistant: 'सहायक',
    heroSubheadline: 'AI-संचालित खोज, स्मार्ट अनुशंसाओं और तेज़ चेकआउट के साथ सहज किराने की खरीदारी का अनुभव करें।',
    startShopping: 'खरीदारी शुरू करें',
    voiceSearch: 'वॉइस सर्च',
    imageSearch: 'इमेज सर्च',
    whyChooseSmartBazaar: 'स्मार्ट बाज़ार क्यों चुनें?',
    revolutionizingExperience: 'अत्याधुनिक तकनीक के साथ आपके किराने के अनुभव में क्रांति ला रहे हैं',
    noQueues: 'कोई कतार नहीं',
    noQueuesDesc: 'हमारे स्मार्ट सेल्फ-चेकआउट सिस्टम के साथ लंबी कतारों को छोड़ें।',
    fasterCheckout: 'तेज़ चेकआउट',
    fasterCheckoutDesc: 'मोबाइल भुगतान के साथ 60 सेकंड में स्कैन, भुगतान और जाएं।',
    smartCart: 'स्मार्ट कार्ट',
    smartCartDesc: 'जब आप खरीदारी करते हैं तो रीयल-टाइम मूल्य ट्रैकिंग और स्मार्ट अनुशंसाएं।',
    productsCount: 'उत्पाद',
    avgCheckout: 'औसत चेकआउट',
    satisfaction: 'संतुष्टि',
    support: 'सहायता',
    copyright: '© 2026 स्मार्ट बाज़ार सहायक।',
    
    // Products Page
    browseProducts: 'उत्पाद ब्राउज़ करें',
    productsAvailable: 'उत्पाद उपलब्ध हैं',
    searchForProducts: 'उत्पाद खोजें...',
    noProductsFound: 'कोई उत्पाद नहीं मिला',
    tryAdjusting: 'अपनी खोज या फ़िल्टर मानदंड समायोजित करने का प्रयास करें',
    all: 'सभी',
    bakery: 'बेकरी',
    dairy: 'डेयरी',
    fruits: 'फल',
    vegetables: 'सब्जियां',
    spreads: 'स्प्रेड',
    beverages: 'पेय पदार्थ',
    grains: 'अनाज',
    snacks: 'स्नैक्स',
    cooking: 'खाना पकाना',
    
    // Product Card
    addToCart: 'कार्ट में डालें',
    onlyLeft: 'केवल',
    expiresIn: 'समाप्त होता है',
    days: 'दिनों में',
    aisle: 'गलियारा',
    
    // Checkout Page
    yourCart: 'आपका कार्ट',
    continueShopping: 'खरीदारी जारी रखें',
    cartIsEmpty: 'आपका कार्ट खाली है',
    startAddingItems: 'स्वादिष्ट आइटम जोड़ना शुरू करें!',
    browseProductsBtn: 'उत्पाद ब्राउज़ करें',
    frequentlyBoughtTogether: 'अक्सर एक साथ खरीदे गए',
    orderSummary: 'ऑर्डर सारांश',
    verified: 'सत्यापित',
    subtotal: 'उप-कुल',
    items: 'आइटम',
    gst: 'जीएसटी (5%)',
    total: 'कुल',
    payNow: 'अभी भुगतान करें',
    scanningItems: 'आइटम स्कैन हो रहे हैं...',
    paymentSuccessful: 'भुगतान सफल!',
    thankYouShopping: 'स्मार्ट बाज़ार के साथ खरीदारी करने के लिए धन्यवाद',
    billSentTo: 'बिल भेजा गया:',
    downloadBill: 'बिल डाउनलोड करें (PDF)',
    shareViaWhatsApp: 'व्हाट्सएप पर शेयर करें',
    
    // Admin Page
    adminLogin: 'एडमिन लॉगिन',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    invalidCredentials: 'अमान्य क्रेडेंशियल। कृपया पुनः प्रयास करें।',
    adminDashboard: 'एडमिन डैशबोर्ड',
    manageInventory: 'अपनी स्मार्ट बाज़ार इन्वेंटरी और ग्राहकों को प्रबंधित करें',
    addProduct: 'उत्पाद जोड़ें',
    totalProducts: 'कुल उत्पाद',
    lowStock: 'कम स्टॉक',
    nearExpiry: 'समाप्ति के निकट',
    customersToday: 'आज के ग्राहक',
    lowStockAlert: 'कम स्टॉक अलर्ट',
    allProductsWellStocked: 'सभी उत्पाद अच्छी तरह से स्टॉक में हैं!',
    left: 'बाकी',
    nearExpiryItems: 'समाप्ति के निकट आइटम',
    noProductsNearExpiry: 'समाप्ति के निकट कोई उत्पाद नहीं!',
    expires: 'समाप्ति:',
    customerInsights: 'ग्राहक इनसाइट्स',
    today: 'आज',
    phoneNumber: 'फोन नंबर',
    time: 'समय',
    totalSpend: 'कुल खर्च',
    productManagement: 'उत्पाद प्रबंधन',
    inStock: 'स्टॉक में',
    signOut: 'साइन आउट',
    
    // Product Form Modal
    editProduct: 'उत्पाद संपादित करें',
    addNewProduct: 'नया उत्पाद जोड़ें',
    productName: 'उत्पाद का नाम',
    brand: 'ब्रांड',
    price: 'कीमत (रु.)',
    originalPrice: 'मूल कीमत',
    stockQuantity: 'स्टॉक मात्रा',
    offerTag: 'ऑफर टैग',
    category: 'श्रेणी',
    expiryDate: 'समाप्ति तिथि',
    productImage: 'उत्पाद छवि',
    updateProduct: 'उत्पाद अपडेट करें',
    
    // Aisle Map
    storeMap: 'स्टोर मैप',
    finding: 'खोज रहे हैं:',
    entrance: 'प्रवेश',
    checkout: 'चेकआउट',
    yourItem: 'आपका आइटम',
    otherAisles: 'अन्य गलियारे',
    
    // OTP Modal
    verifyToContinue: 'जारी रखने के लिए सत्यापित करें',
    enterEmailToReceiveOTP: 'वन-टाइम पासवर्ड प्राप्त करने के लिए अपना ईमेल पता दर्ज करें',
    emailAddress: 'ईमेल पता',
    enterYourEmail: 'अपना ईमेल दर्ज करें',
    sendOTP: 'OTP भेजें',
    enterOTPSentTo: 'भेजे गए 6-अंकीय OTP दर्ज करें',
    enterOTP: 'OTP दर्ज करें',
    enterSixDigitOTP: '6-अंकीय OTP दर्ज करें',
    checkEmailForOTP: 'OTP कोड के लिए अपना ईमेल इनबॉक्स जांचें',
    verifyAndContinue: 'सत्यापित करें और जारी रखें',
    changeEmail: 'ईमेल बदलें',
    verifying: 'सत्यापित हो रहा है...',
    sendingOTP: 'OTP भेजा जा रहा है...',
    termsOfService: 'जारी रखकर, आप हमारी सेवा की शर्तों से सहमत होते हैं',
    
    // Delete Dialog
    deleteProduct: 'उत्पाद हटाएं',
    deleteConfirmation: 'क्या आप वाकई इस उत्पाद को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('smartbazaar-language');
    return (stored as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('smartbazaar-language', lang);
  };

  useEffect(() => {
    const stored = localStorage.getItem('smartbazaar-language');
    if (stored && (stored === 'en' || stored === 'kn' || stored === 'hi')) {
      setLanguageState(stored);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  kn: 'ಕನ್ನಡ',
  hi: 'हिंदी',
};
