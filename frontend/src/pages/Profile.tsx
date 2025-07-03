import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  CreditCard, 
  MapPin, 
  Lock, 
  Shield, 
  Bell, 
  Package, 
  Gift, 
  Coins,
  Search,
  Plus,
  Eye,
  EyeOff,
  Edit,
  Trash2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const location = useLocation();

  // Check for tab parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'purchase') {
      setActiveSection('purchase');
    }
  }, [location]);

  const [activePurchaseStatus, setActivePurchaseStatus] = useState('all');
  const purchaseStatuses = [
    { id: 'all', name: 'All', count: 5 },
    { id: 'to-pay', name: 'To Pay', count: 2 },
    { id: 'to-ship', name: 'To Ship', count: 1 },
    { id: 'completed', name: 'Completed', count: 2 },
  ];

  const sampleOrders = [
    {
      id: 1,
      date: '2024-04-28',
      product: 'Organic Tomatoes',
      seller: 'Sarah\'s Garden',
      quantity: 2,
      total: '₱17.98',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center'
    },
    {
      id: 2,
      date: '2024-04-27',
      product: 'Fresh Herbs Bundle',
      seller: 'Green Thumb Co.',
      quantity: 1,
      total: '₱15.99',
      status: 'To Ship',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center'
    },
    {
      id: 3,
      date: '2024-04-26',
      product: 'Mixed Vegetables',
      seller: 'Urban Harvest',
      quantity: 1,
      total: '₱22.50',
      status: 'To Pay',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop&crop=center'
    },
    {
      id: 4,
      date: '2024-04-25',
      product: 'Leafy Greens Pack',
      seller: 'Backyard Bounty',
      quantity: 1,
      total: '₱12.99',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop&crop=center'
    },
    {
      id: 5,
      date: '2024-04-24',
      product: 'Seasonal Fruit Box',
      seller: 'Orchard Dreams',
      quantity: 1,
      total: '₱34.99',
      status: 'To Pay',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop&crop=center'
    }
  ];

  const [showPassword, setShowPassword] = useState(false);

  const menuItems = [
    {
      category: "My Account",
      items: [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'banks-cards', label: 'Banks & Cards', icon: CreditCard },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'change-password', label: 'Change Password', icon: Lock },
        { id: 'privacy-settings', label: 'Privacy Settings', icon: Shield },
        { id: 'notification-settings', label: 'Notification Settings', icon: Bell },
      ]
    },
    {
      category: "My Purchase",
      items: [
        { id: 'purchase', label: 'My Purchase', icon: Package },
      ]
    },
    {
      category: "Others",
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'vouchers', label: 'My Vouchers', icon: Gift },
        { id: 'coins', label: 'HarvestConnect Coins', icon: Coins },
      ]
    }
  ];

  const renderProfileSection = () => (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Profile Information</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <Input type="text" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <Input type="email" placeholder="john.doe@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <Input type="tel" placeholder="+1 555-555-5555" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <Input type="date" />
        </div>
      </div>
      <div className="mt-6">
        <Button className="bg-farm-red-600 hover:bg-farm-red-700 text-white">Update Profile</Button>
      </div>
    </div>
  );

  const renderBanksCardsSection = () => (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Banks & Cards</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">**** **** **** 1234</h4>
                <p className="text-sm text-gray-600">Visa ending in 1234</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button variant="outline" className="w-full justify-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>
      </div>
    </div>
  );

  const renderAddressesSection = () => (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Addresses</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-800">Home Address</h4>
            <p className="text-sm text-gray-600">123 Main St, Anytown, CA 12345</p>
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
        <Button variant="outline" className="w-full justify-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>
    </div>
  );

  const renderChangePasswordSection = () => (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Change Password</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <Input type="password" placeholder="Enter your new password" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <Input type="password" placeholder="Confirm your new password" />
        </div>
        <Button className="bg-farm-red-600 hover:bg-farm-red-700 text-white">Change Password</Button>
      </div>
    </div>
  );

  const renderPrivacySettingsSection = () => (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Privacy Settings</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">Show Profile to Public</h4>
            <p className="text-sm text-gray-600">Allow anyone to view your profile.</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">Share Activity</h4>
            <p className="text-sm text-gray-600">Share your activity with your followers.</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettingsSection = () => (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Notification Settings</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">Email Notifications</h4>
            <p className="text-sm text-gray-600">Receive important updates via email.</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">Push Notifications</h4>
            <p className="text-sm text-gray-600">Receive real-time updates on your device.</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          <p>This is the notifications section.</p>
        </div>
      </CardContent>
    </div>
  );

  const renderVouchersSection = () => (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Vouchers</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Vouchers</h2>
          <p>This is the vouchers section.</p>
        </div>
      </CardContent>
    </div>
  );

  const renderCoinsSection = () => (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">HarvestConnect Coins</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">HarvestConnect Coins</h2>
          <p>This is the HarvestConnect Coins section.</p>
        </div>
      </CardContent>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24">
              <CardContent className="p-0">
                <div className="p-4 border-b bg-farm-red-50">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-farm-red-600 text-white">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-800">John Doe</h3>
                      <p className="text-sm text-gray-600">john.doe@email.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  {menuItems.map((category) => (
                    <div key={category.category} className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                        {category.category}
                      </h4>
                      <div className="space-y-1">
                        {category.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => setActiveSection(item.id)}
                              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                activeSection === item.id
                                  ? 'bg-farm-red-600 text-white'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-sm">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <Card>
              <CardContent className="p-6">
                {/* Profile Section */}
                {activeSection === 'profile' && renderProfileSection()}
                
                {/* Banks & Cards Section */}
                {activeSection === 'banks-cards' && renderBanksCardsSection()}
                
                {/* Addresses Section */}
                {activeSection === 'addresses' && renderAddressesSection()}
                
                {/* Change Password Section */}
                {activeSection === 'change-password' && renderChangePasswordSection()}
                
                {/* Privacy Settings Section */}
                {activeSection === 'privacy-settings' && renderPrivacySettingsSection()}
                
                {/* Notification Settings Section */}
                {activeSection === 'notification-settings' && renderNotificationSettingsSection()}
                
                {/* Purchase Section */}
                {activeSection === 'purchase' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">My Purchase</h2>
                      <div className="relative">
                        <Input
                          placeholder="Search orders..."
                          className="w-64 pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Purchase Status Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                      <div className="flex space-x-8 overflow-x-auto">
                        {purchaseStatuses.map((status) => (
                          <button
                            key={status.id}
                            onClick={() => setActivePurchaseStatus(status.id)}
                            className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                              activePurchaseStatus === status.id
                                ? 'border-farm-red-600 text-farm-red-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {status.name}
                            {status.count > 0 && (
                              <Badge className="ml-2 bg-farm-red-100 text-farm-red-800 text-xs">
                                {status.count}
                              </Badge>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Purchase Orders */}
                    <div className="space-y-4">
                      {sampleOrders
                        .filter(order => 
                          activePurchaseStatus === 'all' || 
                          order.status.toLowerCase().replace(' ', '-') === activePurchaseStatus
                        )
                        .map((order) => (
                          <Card key={order.id} className="border border-gray-200">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                  <span className="text-sm text-gray-600">Order #{order.id}</span>
                                  <Badge className={`${
                                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'To Ship' ? 'bg-blue-100 text-blue-800' :
                                    order.status === 'To Pay' ? 'bg-farm-red-100 text-farm-red-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {order.status}
                                  </Badge>
                                </div>
                                <span className="text-sm text-gray-600">{order.date}</span>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <img 
                                  src={order.image} 
                                  alt={order.product}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-800">{order.product}</h4>
                                  <p className="text-sm text-gray-600">from {order.seller}</p>
                                  <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-gray-800">{order.total}</p>
                                  <div className="flex space-x-2 mt-2">
                                    {order.status === 'Completed' && (
                                      <Button size="sm" variant="outline" className="text-xs">
                                        Rate & Review
                                      </Button>
                                    )}
                                    {order.status === 'To Pay' && (
                                      <Button size="sm" className="bg-farm-red-600 hover:bg-farm-red-700 text-white text-xs">
                                        Pay Now
                                      </Button>
                                    )}
                                    <Button size="sm" variant="outline" className="text-xs">
                                      View Details
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                    
                    {sampleOrders.filter(order => 
                      activePurchaseStatus === 'all' || 
                      order.status.toLowerCase().replace(' ', '-') === activePurchaseStatus
                    ).length === 0 && (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-500 mb-2">No orders found</h3>
                        <p className="text-gray-400">You haven't made any orders in this category yet.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Notifications Section */}
                {activeSection === 'notifications' && renderNotificationsSection()}
                
                {/* Vouchers Section */}
                {activeSection === 'vouchers' && renderVouchersSection()}
                
                {/* Coins Section */}
                {activeSection === 'coins' && renderCoinsSection()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
