import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const ChangePasswordSection = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
};

export default ChangePasswordSection;
