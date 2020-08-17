const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setWeatherData(data, place.formatted_address);
    });
});

const locationElement = document.querySelector('[data-location]');
const statusElement = document.querySelector('[data-status]');
const temperatureElement = document.querySelector('[data-temperature]');
const sunriseElement = document.querySelector('[data-sunrise]');
const windElement = document.querySelector('[data-wind]');
const iconElement = document.getElementById('data-icon');

function setWeatherData(data, place) {
   locationElement.textContent = place;
   statusElement.textContent = data.weather[0].description;
   temperatureElement.textContent = data.temp;
   sunriseElement.textContent = `${new Date(data.sunrise * 1000).getHours()}:${new Date(data.sunrise * 1000).getMinutes()}`
   windElement.textContent = data.wind_speed;
   const iconData = data.weather[0].icon;
   iconElement.src = "http://openweathermap.org/img/w/"+ iconData +".png";
}

