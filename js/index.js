let points = [];

function toRad(x) {
  return (x * Math.PI) / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // meters
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function markPoint() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      points.push({ lat: latitude, lon: longitude });
      document.getElementById("result").innerHTML = `📍 Point ${points.length} marked at (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;

      if (points.length === 3) {
        document.getElementById("result").innerHTML += "<br>✅ All 3 points marked. You can now calculate the area.";
      }
    },
    (err) => {
      alert("Error: " + err.message);
    },
    {
      enableHighAccuracy: true,
    }
  );
}

function calculateArea() {
  if (points.length !== 3) {
    alert("Please mark 3 points first.");
    return;
  }

  const [A, B, C] = points;
  const length = calculateDistance(A.lat, A.lon, B.lat, B.lon);
  const breadth = calculateDistance(B.lat, B.lon, C.lat, C.lon);
  const area = length * breadth;

  document.getElementById("result").innerHTML = `
        📌 <strong>Length:</strong> ${length.toFixed(2)} m<br>
        📌 <strong>Breadth:</strong> ${breadth.toFixed(2)} m<br>
        🧮 <strong>Estimated Area:</strong> ${area.toFixed(2)} m²<br><br>


  📏 <strong>Standard Plot (464.5 m²):</strong> ${(area / 464.5).toFixed(2)} plots<br>
  📏 <strong>Larger Plot (674 m²):</strong> ${(area / 674).toFixed(2)} plots<br>
  🌾 <strong>Acres:</strong> ${(area / 4046.86).toFixed(2)} acres<br>
  🌍 <strong>Hectares:</strong> ${(area / 10000).toFixed(4)} hectares
      `;

  // Reset points for next use
  points = [];
}
