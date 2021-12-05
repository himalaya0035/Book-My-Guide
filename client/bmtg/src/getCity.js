import axios from "axios";
function success(pos) {
    let crd = pos.coords;
    let lat = crd.latitude.toString();
    let lng = crd.longitude.toString();
    let coordinates = [lat, lng];
    getCity(coordinates);

  }

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  }

  export function getCoordintes() {
    let options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }

  async function getCity(coordinates) {
    let lati = parseFloat(coordinates[0]);
    let long = parseFloat(coordinates[1]);
    const response = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=pk.e7f75f5f140eca4511945e5400ce4b98&lat=${lati}&lon=${long}&format=json`);
    let CITY = response.data.address.city || response.data.address.state_district;
    manageCity(CITY);
    return CITY;
  }
  function manageCity(city){
    if (city === undefined){
      localStorage.setItem('currentCity','New Delhi')
    }else{
      localStorage.setItem('currentCity',city)
    }
  }