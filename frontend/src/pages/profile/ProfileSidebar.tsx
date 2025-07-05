import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  CreditCard, 
  MapPin, 
  Lock, 
  Shield, 
  Bell, 
  Package, 
  Gift, 
  Coins 
} from "lucide-react";

interface ProfileSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const ProfileSidebar = ({ activeSection, setActiveSection }: ProfileSidebarProps) => {
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

  return (
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
  );
};

export default ProfileSidebar;
