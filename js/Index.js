function getLocation() {
  const output = document.getElementById('output');

  if (!navigator.geolocation) {
    output.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  output.textContent = "Locating…";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      output.textContent = `Latitude: ${lat}, Longitude: ${lon}`;
      console.log("Position:", lat, lon);
    },
    (error) => {
      output.textContent = `Error: ${error.message}`;
      console.error("Geolocation error:", error);
    }
  );
}
