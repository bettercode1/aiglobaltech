import { createContext, ReactNode, useState, useContext, useEffect } from "react";

type Country = 'US' | 'CA' | 'IN' | null;

type LocationContextType = {
  country: Country;
  setCountry: (country: Country) => void;
  isLoading: boolean;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Try to detect user's country based on browser locale
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // In a production app, you'd want to use a geolocation service API
        // This is a simplified version that tries to guess from browser settings
        const locale = navigator.language;
        let detectedCountry: Country = null;
        
        if (locale.includes('en-US')) {
          detectedCountry = 'US';
        } else if (locale.includes('en-CA') || locale.includes('fr-CA')) {
          detectedCountry = 'CA';
        } else if (locale.includes('en-IN') || locale.includes('hi-IN')) {
          detectedCountry = 'IN';
        } else {
          // Default to USD for unrecognized locales
          detectedCountry = 'US';
        }
        
        setCountry(detectedCountry);
      } catch (error) {
        console.error("Error detecting country:", error);
        setCountry('US'); // Default fallback
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        country,
        setCountry,
        isLoading
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return [context.country, context.setCountry, context.isLoading] as const;
}