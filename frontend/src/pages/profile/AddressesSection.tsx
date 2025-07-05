import { CardHeader, CardTitle, Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

const AddressesSection = () => {
  return (
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
};

export default AddressesSection;
