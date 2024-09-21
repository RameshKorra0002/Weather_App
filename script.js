async function getWeather() {
    const city = document.getElementById('city').value;

    // Construct the API URL based on user input (city name)
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(city)}`;

    try {
        // Make the request to the WeatherAPI.com
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
                'x-rapidapi-key': '13db356c75mshd418edfcbbb9e9dp196518jsnb2db12e4fb12'  // Replace with your actual API key
            }
        });

        // Check if the response is OK
        if (!response.ok) {
            console.log('Response status:', response.status);  // e.g., 401, 404, etc.
            console.log('Response statusText:', response.statusText);  // e.g., Unauthorized, Not Found
            const errorMessage = await response.text();
            console.log('Response body:', errorMessage);  // Log full error details
            document.getElementById('weatherResult').innerHTML = `<p>Error: ${response.statusText}</p>`;
            return;
        }

        // Parse the JSON response
        const weatherData = await response.json();
        console.log('API Response (JSON):', weatherData);  // Log JSON response for debugging

        // Display the weather information on the page
        const weatherInfo = `
            <h2>Weather in ${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}</h2>
            <p>Temperature: ${weatherData.current.temp_c}°C</p>
            <p>Condition: ${weatherData.current.condition.text}</p>
            <p>Feels Like: ${weatherData.current.feelslike_c}°C</p>
            <p>Humidity: ${weatherData.current.humidity}%</p>
            <p>Wind Speed: ${weatherData.current.wind_kph} kph</p>
        `;
        document.getElementById('weatherResult').innerHTML = weatherInfo;

    } catch (error) {
        console.error('Fetch error:', error.message);  // Log full error message
        document.getElementById('weatherResult').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
}
