const button = document.querySelector("button");
button.addEventListener("click", () => {
  if (!navigator.geolocation || window.location.protocol !== "https:") {
    console.warn(
      "Insecure context or geolocation not supported — falling back to IP"
    );
    return fallbackToIP();
  }

  navigator.geolocation.getCurrentPosition(onSuccess, (error) => {
    console.warn("Geolocation failed:", error);

    fallbackToIP();
  });
});

function onSuccess(position) {
  button.innerText = "Detecting your location...";
  let { latitude, longitude } = position.coords;
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((result) => {
      let allDetails = result.results[0].components;
      let { county, postcode, country } = allDetails;
      button.innerText = "${county} ${postcode}, ${country}";
      console.log(allDetails);
    })
    .catch(() => {
      button.innerText = "Something went wrong";
    });
}

function onError(error) {
  if (error.code === 2) {
    fallbackToIP();

    return;
  }

  if (error.code === 1) {
    button.innerText = "You denied access to your location";
  } else {
    button.innerText = "Something went wrong";
  }

  button.setAttribute("disabled", "true");
}

function fallbackToIP() {
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((data) => {
      const { city, country_name, latitude, longitude, region } = data;
      button.innerText = `${city}, ${region}, ${latitude}, ${longitude}, ${country_name}`;
      console.log(data);
    })
    .catch((error) => {
      button.innerText = "IP-based location failed";
    });
}
