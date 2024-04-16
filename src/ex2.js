document
    .getElementById('peticioForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault();

        const city = document.getElementById('city').value;
        const codiPostal = document.getElementById('codiPostal').value;
        const country = document.getElementById('country').value;

        // Tots els camps del formulari són obligatoris
        if (!city || !country) {
            alert('Els camps no poden estar buits');
            return;
        }

        try {
            // L'API requereix una key
            const apikey = 'aa114ce7fd4543f2999150710241004';
            const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&lang=es`;
            const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&lang=es&days=2`;

            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(currentUrl),
                fetch(forecastUrl),
            ]);

            const [currentData, forecastData] = await Promise.all([
                currentResponse.json(),
                forecastResponse.json(),
            ]);

            console.log(currentData);
            console.log(forecastData);

            // Abans de fer els canvis a través del DOM, ens guardem la 
            // informació necessària que hem recuperat de l'API
            const weatherData = {
                current: {
                    city: currentData.location.name,
                    country: currentData.location.country,
                    region: currentData.location.region,
                    weatherIcon: currentData.current.condition.icon,
                    temperature: `${currentData.current.temp_c}ºC`,
                    weatherDescription: currentData.current.condition.text,
                },
                forecast: {
                    city: forecastData.location.name,
                    country: forecastData.location.country,
                    region: forecastData.location.region,
                    weatherIcon: forecastData.forecast.forecastday[1].day.condition.icon,
                    temperature: `${forecastData.forecast.forecastday[1].day.avgtemp_c}ºC`,
                    weatherDescription: forecastData.forecast.forecastday[1].day.condition.text,
                }
            }

            // Mostra els resultats a la pàgina
            displayWeatherResults(weatherData);

        } catch (error) {
            console.error(error);
        }
    });

function displayWeatherResults(weatherData) {
    // Mostrar la informació actual
    document.getElementById('location').textContent = `${weatherData.current.city}, ${weatherData.current.country}, ${weatherData.current.region}`;
    document.getElementById('temperature').textContent = `Temperatura actual: ${weatherData.current.temperature}`;
    document.getElementById('weatherDescription').textContent = `Descripció del temps actual: ${weatherData.current.weatherDescription}`;
    document.getElementById('weatherIcon').src = weatherData.current.weatherIcon;
    // Mostrar la informació de la previsió per el dia següent
    document.getElementById('forecastTemperature').textContent = `Temperatura prevista per al dia següent: ${weatherData.forecast.temperature}`;
    document.getElementById('forecastWeatherDescription').textContent = `Descripció del temps previst per al dia següent: ${weatherData.forecast.weatherDescription}`;
    document.getElementById('forecastWeatherIcon').src = weatherData.forecast.weatherIcon;
    // Mostrar els resultats
    document.getElementById('weatherResults').classList.remove('hidden');
}

