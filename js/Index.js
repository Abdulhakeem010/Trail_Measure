const button = document.querySelector("button");
button.addEventListener("click", () =>{
  if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  else{
    button.innerText = "your browser does not support "
  }
})

function onSuccess (position) {
console.log(position)
}

function onError (error) {
  if (error.code == 1 ){
   button.innerText = "You denied access to your location"
  }
  else if (error.code == 2 ){
    button.innerText = "Location not Available"
  }
   else {
   button.innerText = "Something went wrong"
  }
button.setAttribute("disabled", "true");
  }