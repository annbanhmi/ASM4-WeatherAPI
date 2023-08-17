// Display a welcome message when the page loads
function displayHelloMessage() {
    const helloMessage = "Hi! Welcome to Ann's Weather Display. Please enter any city name and click the 'search' button to check the weather!";
    alert(helloMessage);
}
window.onload = displayHelloMessage;

// API key and URL for OpenWeatherMap API
const apiKey = "7763f23b64a1b57d30614fa92df3c90b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select HTML elements for interaction
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to retrieve and display weather data
async function checkWeather(city) {
    // Retrieve weather data using the OpenWeatherMap API and the provided city name
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Check if the response status indicates a "Not Found" error (HTTP 404)
    if (response.status == 404) {
        // Display the error message and hide the weather details
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parse the response data as JSON
        var data = await response.json();

        // Update the HTML elements with the retrieved weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Determine the weather condition and set the appropriate weather icon
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        // Display the weather details and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Add event listener to search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
