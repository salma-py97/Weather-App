const degreeSection = document.querySelector('.degree');
const temperatureDegree = document.querySelector('.temperature-degree');
const temperatureSpan = document.querySelector('span');
const temperatureDescription = document.querySelector('.temperature-description');
const locationTimezone = document.querySelector(".location-timezone");
const locationIcon = document.querySelector('.weather-icon');


// 1- get longitude and latitude of current location
window.addEventListener('load', () => {
    let long;
    let lat;
    let api;
    let unit = 'imperial';

    // const APIkey = "2f9a271266356fe030c55f0825efb34a";

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=2f9a271266356fe030c55f0825efb34a`;
            console.log(api);
            
            
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    const temp = data.main.temp;
                    const weather = data.weather[0];
                    const description = weather.main + ', ' + weather.description;
                    const icon = data.weather[0].icon;


                    temperatureDegree.innerHTML = temp;
                    temperatureDescription.innerHTML = description
                    locationTimezone.innerHTML = data.name +', '+ data.sys.country;
                    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

                    
                    degreeSection.addEventListener('click', () =>{
                        if (temperatureSpan.innerText === '°F'){
                            temperatureSpan.innerText = '°C';
                            temperatureDegree.innerHTML = Math.floor((temp - 32) * (5 / 9));

                        } else {
                            temperatureSpan.innerText = '°F';
                            temperatureDegree.innerHTML = temp;
                        }
                        })
                })
        });
    } else {
        alert("Please enable Geolocation");
    }
})
