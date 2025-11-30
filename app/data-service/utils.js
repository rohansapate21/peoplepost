export function getPosition(options = {}) {
  return new Promise(function (resolve, reject) {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    // Default options with timeout
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 0,
      ...options,
    };

    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        // Provide more helpful error messages
        let errorMessage = "Unable to get location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
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
