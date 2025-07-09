# 🍽️ TapifyOrder - Digital Restaurant Platform

**Transform your restaurant into a digital experience**

TapifyOrder is a complete digital restaurant management system that allows customers to scan QR codes, browse menus, place orders, and make payments directly from their mobile devices. Restaurant owners can manage their menu, track orders, and view analytics through a comprehensive admin panel.

## ✨ Features

### 🛍️ Customer Experience
- **QR Code Menu Access** - Scan table QR codes to access the digital menu
- **Multi-language Support** - Available in multiple languages
- **Interactive Menu** - Browse categories, view item details, and customize orders
- **Real-time Cart Management** - Add, remove, and modify items with live updates
- **Order Tracking** - Track order status in real-time
- **Digital Payment** - Secure payment processing
- **Call Waiter** - Request assistance with one tap

### 👨‍💼 Admin Dashboard
- **Menu Management** - Full CRUD operations for menu items and categories
- **Order Management** - View, update, and track all orders
- **Real-time Analytics** - Sales reports, popular items, and performance metrics
- **Table Management** - Monitor table status and occupancy
- **Revenue Tracking** - Daily, weekly, and monthly revenue reports

### 🔧 Technical Features
- **Responsive Design** - Works perfectly on all devices
- **Real-time Updates** - Live order status and notifications
- **Offline Support** - Basic functionality works without internet
- **MongoDB Integration** - Persistent data storage
- **RESTful API** - Complete backend API
- **TypeScript** - Type-safe development


## 📱 Usage

### For Restaurant Owners

1. **Access Admin Panel**
   - Go to \`/admin\` or click "Admin Area" on homepage
   - Start by creating your first menu category
   - Add menu items with descriptions, prices, and images

2. **Manage Orders**
   - View incoming orders in real-time
   - Update order status (preparing, ready, delivered)
   - Track table occupancy and customer requests

3. **View Analytics**
   - Monitor daily sales and popular items
   - Track revenue trends and performance metrics
   - Export reports for business analysis

### For Customers

1. **Scan QR Code**
   - Each table has a unique QR code
   - Scan to access the digital menu for that table

2. **Browse and Order**
   - Browse menu categories and items
   - Customize items and add to cart
   - Review order and proceed to payment

3. **Track Order**
   - Receive real-time updates on order status
   - Call waiter if assistance is needed
   - Rate your experience after the meal


## 🔌 API Endpoints

### Menu Management
- \`GET /api/menu\` - Get all menu items
- \`POST /api/menu\` - Create new menu item
- \`PUT /api/menu/[id]\` - Update menu item
- \`DELETE /api/menu/[id]\` - Delete menu item

### Order Management
- \`GET /api/orders\` - Get all orders
- \`POST /api/orders\` - Create new order
- \`PUT /api/orders/[id]\` - Update order status
- \`DELETE /api/orders/[id]\` - Cancel order

### Categories
- \`GET /api/categories\` - Get all categories
- \`POST /api/categories\` - Create new category

### Analytics
- \`GET /api/analytics/dashboard\` - Get dashboard metrics

### Tables
- \`GET /api/tables/[number]\` - Get table information
- \`POST /api/waiter/call\` - Call waiter to table

## 🛠️ Technologies Used

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Backend:** Next.js
- **Database:** MongoDB with Mongoose
- **State Management:** React Context + localStorage
- **Icons:** Lucide React

--------------------


**Made with ❤️ for the restaurant industry**

*Transform your restaurant experience today with TapifyOrder!*