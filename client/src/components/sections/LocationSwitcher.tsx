import { useState } from 'react';
import { useLocation } from "@/hooks/use-location";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LocationSwitcher() {
  const [country, setCountry] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleCountrySelect = (selectedCountry: 'US' | 'CA' | 'IN') => {
    setCountry(selectedCountry);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <Button 
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-md border border-gray-200 flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          <span>Location: {country === 'US' ? 'United States' : country === 'CA' ? 'Canada' : country === 'IN' ? 'India' : 'Select'}</span>
        </Button>
        
        {isOpen && (
          <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-48">
            <div className="flex flex-col gap-1">
              <Button 
                variant={country === 'US' ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCountrySelect('US')}
                className="justify-start"
              >
                🇺🇸 United States
              </Button>
              <Button 
                variant={country === 'CA' ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCountrySelect('CA')}
                className="justify-start"
              >
                🇨🇦 Canada
              </Button>
              <Button 
                variant={country === 'IN' ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCountrySelect('IN')}
                className="justify-start"
              >
                🇮🇳 India
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}