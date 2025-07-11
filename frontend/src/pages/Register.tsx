import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Leaf, Mail, Lock, User, MapPin, Phone, Users, Upload, X, Image } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB');
        return;
      }

      setProfilePicture(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(''); // Clear any previous errors
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setProfilePicturePreview('');
    // Reset the file input
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.address || 
        !formData.phone_number || !formData.password || !formData.gender) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }

      // Prepare data for API - use FormData only if there's a file
      const { confirmPassword, ...registerData } = formData;
      const dataWithRole = {
        ...registerData,
        role: 'user'
      };

      let requestData;
      
      if (profilePicture) {
        // Use FormData when there's a file
        console.log('Using FormData because profile picture is selected');
        const formDataToSend = new FormData();
        
        // Append all form fields
        Object.keys(dataWithRole).forEach(key => {
          const value = dataWithRole[key as keyof typeof dataWithRole];
          console.log(`Adding to FormData: ${key} = ${value}`);
          formDataToSend.append(key, value);
        });
        
        // Add profile picture
        console.log('Adding profile picture:', {
          name: profilePicture.name,
          size: profilePicture.size,
          type: profilePicture.type
        });
        formDataToSend.append('profilePicture', profilePicture);
        
        // Debug: Log all FormData entries
        console.log('FormData entries:');
        for (let [key, value] of formDataToSend.entries()) {
          console.log(`${key}:`, value);
        }
        
        requestData = formDataToSend;
      } else {
        // Use regular JSON when no file
        console.log('Using JSON because no profile picture selected');
        requestData = dataWithRole;
      }
      
      // Debug: Check data type
      console.log('Request data type:', requestData instanceof FormData ? 'FormData' : 'Object');
      console.log('Request data constructor:', requestData.constructor.name);

      // Call register API
      const response = await authAPI.register(requestData);
      
      if (response.success) {
        // Use AuthContext login function
        login(response.data.user, response.data.token);
        
        // Show success toast
        toast({
          title: "Registration Successful! 🎉",
          description: `Welcome to HarvestConnect, ${response.data.user.name}! Your account has been created and you're now logged in.`,
          duration: 5000,
        });
        
        // Navigate to dashboard or home
        navigate('/');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error message:', error.message);
      
      let errorMessage = 'An error occurred during registration';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Also log the form data being sent (without sensitive info)
      console.log('Form data being sent:', {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone_number: formData.phone_number,
        gender: formData.gender,
        hasProfilePicture: !!profilePicture,
        profilePictureSize: profilePicture?.size,
        profilePictureType: profilePicture?.type
      });
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-8 h-8 text-red-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">HarvestConnect</h1>
          </div>
          <p className="text-gray-600">Join the farming community today</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              {/* Profile Picture */}
              <div className="space-y-2">
                <Label htmlFor="profilePicture" className="text-sm font-medium text-gray-700">
                  Profile Picture (Optional)
                </Label>
                
                {profilePicturePreview ? (
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
                      <img
                        src={profilePicturePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeProfilePicture}
                      className="absolute top-0 right-1/2 transform translate-x-10 -translate-y-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Click the X to remove image
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="profilePicture"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> profile picture
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, JPEG or WebP (MAX. 5MB)</p>
                        </div>
                      </label>
                    </div>
                    <Input
                      id="profilePicture"
                      name="profilePicture"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                  Gender
                </Label>
                <Select onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 mt-6"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-red-600 hover:text-red-700 font-medium hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 HarvestConnect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
