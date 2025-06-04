// const socket=io();

// if(navigator.geolocation){
//     navigator.geolocation.watchPosition(
//         (position)=>{
//             const{latitude,longitude}=position.coords;
//             socket.emit("send-location",{   latitude,   longitude   });

//         },
//         (error)=>{
//             console.error(error);
//         },
//         {
//             enableHighAccuracy:true,
//             maximumAge:0,
//             timeout:2500
//         }
//     );
// }


// const map = L.map("map").setView([0, 0], 10);



const socket = io();

const map = L.map("map").setView([0, 0], 15);

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Marker variable to update position
let marker;

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Emit location to server
      socket.emit("send-location", { latitude, longitude });

      // Set or move marker
      if (!marker) {
        marker = L.marker([latitude, longitude]).addTo(map);
      } else {
        marker.setLatLng([latitude, longitude]);
      }

      // Center map
      map.setView([latitude, longitude], 15);
    },
    (error) => {
      console.error("Geolocation error:", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 2500,
    }
  );
} else {
  alert("Geolocation not supported by your browser");
}
