
// Asynchronously load Google Maps script by returning a promise and resolve a google map object
export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = 'AIzaSyDpmQ2Rk0WtJGooA1M3a-TAGRHs2umLank';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

// get JSON request of foursquare data
export function load_places() {
  let city = 'São Paulo, SP';
  let query = 'school';
  var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=KJKIUYCOYE1XSRIR0EEI0M0INJZSQJYYMNBT524NQ1QEYXYM&client_secret=RBM00RI0C0C1YHBKJLHZXMLZVD1YWMM3GPDGQ2V4Y4U0MNYC&v=20180611%20&limit=50&near=' + city + '&query=' + query + '';
  return fetch(apiURL).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else { 
      throw Error(`Request rejected with status ${resp.status}`);
    }
  })
  .catch(() => {
     alert("Foursquare error. Please restart the page or try again later.");
  })
}  

