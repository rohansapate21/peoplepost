export function getPosition(options = {}) {
  return new Promise(function (resolve, reject) {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    // Enhanced options for better accuracy
    const defaultOptions = {
      enableHighAccuracy: true, // Request high accuracy GPS
      timeout: 15000, // Increased to 15 seconds for better GPS lock
      maximumAge: 0, // Don't use cached position, always get fresh location
      ...options,
    };

    console.log("🌍 Requesting GPS location with options:", defaultOptions);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Log the captured position for debugging
        console.log("✅ GPS Location captured:", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy + " meters",
          timestamp: new Date(position.timestamp).toLocaleString()
        });
        resolve(position);
      },
      (error) => {
        // Provide more helpful error messages
        let errorMessage = "Unable to get location";
        console.error("❌ GPS Error:", error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Please check if location services are enabled on your device.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please ensure you have a clear view of the sky and try again.";
            break;
        }
        reject(new Error(errorMessage));
      },
      defaultOptions
    );
  });
}

export function giveRandom() {
  const random = Math.random();
}
