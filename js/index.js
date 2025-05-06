// const button = document.querySelector("button");
// button.addEventListener("click", () => {
//   if (!navigator.geolocation || window.location.protocol !== "https:") {
//     console.warn(
//       "Insecure context or geolocation not supported — falling back to IP"
//     );
//     return fallbackToIP();
//   }

//   navigator.geolocation.getCurrentPosition(onSuccess, (error) => {
//     console.warn("Geolocation failed:", error);

//     fallbackToIP();
//   });
// });

// function onSuccess(position) {
//   button.innerText = "Detecting your location...";
//   let { latitude, longitude } = position.coords;
//   fetch(
//     `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       let allDetails = result.results[0].components;
//       let { county, postcode, country } = allDetails;
//       button.innerText = "${county} ${postcode}, ${country}";
//       console.log(allDetails);
//     })
//     .catch(() => {
//       button.innerText = "Something went wrong";
//     });
// }

// function onError(error) {
//   if (error.code === 2) {
//     fallbackToIP();

//     return;
//   }

//   if (error.code === 1) {
//     button.innerText = "You denied access to your location";
//   } else {
//     button.innerText = "Something went wrong";
//   }

//   button.setAttribute("disabled", "true");
// }

// function fallbackToIP() {
//   fetch("https://ipapi.co/json/")
//     .then((res) => res.json())
//     .then((data) => {
//       const { city, country_name, latitude, longitude, region } = data;
//       button.innerText = `${city}, ${region}, ${latitude}, ${longitude}, ${country_name}`;
//       console.log(data);
//     })
//     .catch((error) => {
//       button.innerText = "IP-based location failed";
//     });
// }







// let watchId;
// let coords = [];
// let totalDistance = 0;

// function toRad(x) {
//   return x * Math.PI / 180;
// }

// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371e3; // Earth's radius in meters
//   const φ1 = toRad(lat1);
//   const φ2 = toRad(lat2);
//   const Δφ = toRad(lat2 - lat1);
//   const Δλ = toRad(lon2 - lon1);

//   const a = Math.sin(Δφ / 2) ** 2 +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// function startTracking() {
//   if (!navigator.geolocation) {
//     alert("Geolocation not supported");
//     return;
//   }

//   coords = [];
//   totalDistance = 0;
//   document.getElementById('distance').textContent = "Distance: 0 m";

//   watchId = navigator.geolocation.watchPosition(position => {
//     const { latitude, longitude } = position.coords;

//     if (coords.length > 0) {
//       const last = coords[coords.length - 1];
//       const dist = calculateDistance(last.lat, last.lon, latitude, longitude);
//       totalDistance += dist;
//       document.getElementById('distance').textContent = `Distance: ${totalDistance.toFixed(2)} m`;
//     }

//     coords.push({ lat: latitude, lon: longitude });
//   }, err => {
//     alert("Tracking error: " + err.message);
//   }, {
//     enableHighAccuracy: true,
//     maximumAge: 1000,
//     timeout: 5000
//   });
// }

// function stopTracking() {
//   if (watchId) {
//     navigator.geolocation.clearWatch(watchId);
//     watchId = null;
//   }
// }


let watchId;
let coords = [];
let totalDistance = 0;
const minMovement = 5; // meters

function toRad(x) {
  return x * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function startTracking() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  // Reset values every time Start is clicked
  coords = [];
  totalDistance = 0;
  document.getElementById('distance').textContent = "Distance: 0 m";

  watchId = navigator.geolocation.watchPosition(position => {
    const { latitude, longitude } = position.coords;

    if (coords.length > 0) {
      const last = coords[coords.length - 1];
      const dist = calculateDistance(last.lat, last.lon, latitude, longitude);

      if (dist > minMovement) {
        totalDistance += dist;
        document.getElementById('distance').textContent =
          `Distance: ${totalDistance.toFixed(2)} m`;
        coords.push({ lat: latitude, lon: longitude });
      }
    } else {
      coords.push({ lat: latitude, lon: longitude });
    }
  }, err => {
    alert("Tracking error: " + err.message);
  }, {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 5000
  });
}

function stopTracking() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}
 