
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
const minMovement = 5;

function toRad(x) {
  return x * Math.PI / 180;
}