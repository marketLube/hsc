"use client";

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
    initGooglePlaces?: () => void;
  }
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlaceResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

interface ParsedAddress {
  fullAddress: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export const useGooglePlaces = (apiKey?: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load Google Places API
  useEffect(() => {
    if (window.google?.maps?.places) {
      setIsLoaded(true);
      return;
    }

    // Use a default API key for demo purposes (in production, use environment variable)
    const key = apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'demo';
    
    if (key === 'demo') {
      console.warn('Google Places API key not found. Using demo mode.');
      setError('Google Places API key not configured');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;

    window.initGooglePlaces = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setError('Failed to load Google Places API');
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      delete window.initGooglePlaces;
    };
  }, [apiKey]);

  // Initialize autocomplete when loaded
  const initializeAutocomplete = (
    input: HTMLInputElement,
    onPlaceSelect: (address: ParsedAddress) => void,
    options?: any
  ) => {
    if (!isLoaded || !window.google?.maps?.places || !input) return;

    const defaultOptions = {
      types: ['address'],
      componentRestrictions: { country: 'IN' }, // Restrict to India
      fields: ['address_components', 'formatted_address', 'geometry'],
      ...options,
    };

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      input,
      defaultOptions
    );

    autocompleteRef.current.addListener('place_changed', () => {
      const place: PlaceResult = autocompleteRef.current.getPlace();
      
      if (!place.address_components) {
        setError('No address details found');
        return;
      }

      const parsedAddress = parseGoogleAddress(place);
      onPlaceSelect(parsedAddress);
    });

    return autocompleteRef.current;
  };

  // Parse Google Places address components
  const parseGoogleAddress = (place: PlaceResult): ParsedAddress => {
    const components = place.address_components;
    const parsed: ParsedAddress = {
      fullAddress: place.formatted_address || '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    };

    let streetNumber = '';
    let route = '';
    let subpremise = '';
    let premise = '';

    components.forEach((component) => {
      const types = component.types;
      const longName = component.long_name;
      const shortName = component.short_name;

      if (types.includes('street_number')) {
        streetNumber = longName;
      } else if (types.includes('route')) {
        route = longName;
      } else if (types.includes('subpremise')) {
        subpremise = longName;
      } else if (types.includes('premise')) {
        premise = longName;
      } else if (types.includes('sublocality_level_1') || types.includes('sublocality')) {
        parsed.addressLine2 = longName;
      } else if (types.includes('locality')) {
        parsed.city = longName;
      } else if (types.includes('administrative_area_level_1')) {
        parsed.state = longName;
      } else if (types.includes('postal_code')) {
        parsed.pincode = longName;
      } else if (types.includes('country')) {
        parsed.country = longName;
      }
    });

    // Construct address line 1
    const addressParts = [];
    if (subpremise) addressParts.push(subpremise);
    if (premise) addressParts.push(premise);
    if (streetNumber) addressParts.push(streetNumber);
    if (route) addressParts.push(route);
    
    parsed.addressLine1 = addressParts.join(', ');

    return parsed;
  };

  // Cleanup autocomplete
  const cleanup = () => {
    if (autocompleteRef.current) {
      window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      autocompleteRef.current = null;
    }
  };

  return {
    isLoaded,
    error,
    initializeAutocomplete,
    cleanup,
    inputRef,
  };
};
