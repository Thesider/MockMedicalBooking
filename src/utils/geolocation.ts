// Geolocation utilities for location-based check-in
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationResult {
  success: boolean;
  coordinates?: LocationCoordinates;
  error?: string;
}

// Medical facility coordinates (example - replace with actual coordinates)
export const MEDICAL_FACILITY_LOCATION: LocationCoordinates = {
  latitude: 40.7128, // New York City example
  longitude: -74.0060
};

// Maximum distance allowed for check-in (in meters)
export const MAX_CHECKIN_DISTANCE = 100; // 100 meters

/**
 * Get user's current location using Geolocation API
 */
export const getCurrentLocation = (): Promise<LocationResult> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        success: false,
        error: 'Geolocation is not supported by this browser'
      });
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // Cache for 1 minute
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          success: true,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please try again.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        }

        resolve({
          success: false,
          error: errorMessage
        });
      },
      options
    );
  });
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in meters
 */
export const calculateDistance = (
  coord1: LocationCoordinates,
  coord2: LocationCoordinates
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

/**
 * Check if user is within allowed distance of medical facility
 */
export const isWithinCheckInRange = (userLocation: LocationCoordinates): boolean => {
  const distance = calculateDistance(userLocation, MEDICAL_FACILITY_LOCATION);
  return distance <= MAX_CHECKIN_DISTANCE;
};

/**
 * Verify location for check-in process
 */
export const verifyLocationForCheckIn = async (): Promise<{
  success: boolean;
  message: string;
  distance?: number;
}> => {
  try {
    const locationResult = await getCurrentLocation();
    
    if (!locationResult.success) {
      return {
        success: false,
        message: locationResult.error || 'Unable to verify your location'
      };
    }

    const userLocation = locationResult.coordinates!;
    const distance = calculateDistance(userLocation, MEDICAL_FACILITY_LOCATION);
    const isInRange = distance <= MAX_CHECKIN_DISTANCE;

    if (isInRange) {
      return {
        success: true,
        message: 'Location verified successfully. You can proceed with check-in.',
        distance: Math.round(distance)
      };
    } else {
      return {
        success: false,
        message: `You must be within ${MAX_CHECKIN_DISTANCE}m of the medical facility to check in. You are currently ${Math.round(distance)}m away.`,
        distance: Math.round(distance)
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while verifying your location. Please try again.'
    };
  }
};

/**
 * Format distance for display
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  } else {
    return `${(distance / 1000).toFixed(1)}km`;
  }
};