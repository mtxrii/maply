let style = styleArrays.REGULAR;

let modal = document.getElementById("save-src");

let latitude = -25.344;
let longitude = 131.036;

let found = true;

function locateJSON(address) {
    const serialized = address.replace(" ", "+");

    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+serialized+'&key=AIzaSyBrTUWfnhd2LXtH2OyV1C0g3uwAFa9DceQ')
    .then(response => {
        return response.json()
    })
    .then(data => {
        if (data.status == "ZERO_RESULTS") {
            alert("Nothing found from the address '" + address + "'");
            found = false;
        }

        else {
            latitude = data.results[0].geometry.location.lat;
            longitude = data.results[0].geometry.location.lng;
            found = true;
        }

        initMap();
    })
    .catch(err => {
        // Do something for an error here
    })
}

function getInputValue(){
    let inputVal = document.getElementById("address").value;
    locateJSON(inputVal);

}


function setStyle(str) {
    if (str === 'regular') {
        style = styleArrays.REGULAR;
    }
    
    if (str === 'dark') {
        style = styleArrays.DARK;
    }
    
    if (str === 'mango') {
        style = styleArrays.MANGO;
    }
    
    if (str === 'eggplant') {
        style = styleArrays.EGGPLANT;
    }
    
    if (str === 'whiteout') {
        style = styleArrays.WHITEOUT;
    }
    
    if (str === 'blackout') {
        style = styleArrays.BLACKOUT;
    }
    
    if (str === 'champagne') {
        style = styleArrays.CHAMPAGNE;
    }

    
    initMap();
}

function saveMap() {
    let w;
    if (screen.width <= 1280) w = 0.383 * screen.width;
    if (screen.width >= 1360) w = 0.359 * screen.width;
    if (screen.width >= 1920) w = 0.255 * screen.width;
    
    html2canvas(document.body, {useCORS : true,
                                allowTaint: true,
                                width: 300,
                                x: w,
                                height: 300,
                                y: 230}).then(function(canvas) {

        let mod = canvas.toDataURL("image/png");
        let img = document.createElement("img");
        img.src = mod;
        img.id = "mappit";
        modal.appendChild(img);
    });
}

function removeMap() {
    const img = document.getElementById("mappit");
    modal.removeChild(img);
}

function downloadMap() {
    let link = document.createElement('a');
    link.href = 'image.png';
    link.download = 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize and add the map
function initMap() {
  // The location of Uluru
  var coord = {
      lat: latitude,
      lng: longitude
    };
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 18, center: coord, styles: style});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: coord, map: map});
}