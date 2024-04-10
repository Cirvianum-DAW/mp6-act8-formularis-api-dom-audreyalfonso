document
    .getElementById('peticioForm')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        const city = document.getElementById('city').value;
        const codiPostal = document.getElementById('codiPostal').value;
        const country = document.getElementById('country').value;

        // Tots els camps del formulari són obligatoris
        if (!city || !codiPostal || !country) {
            alert('Cap camp pot estar buit');
            return;
        }

        try {
            // L'API requereix una key
            const apikey = 'aa114ce7fd4543f2999150710241004';
            const currentUrl = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&lang=es`;
            const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&lang=es&days=2`;

            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(currentUrl),
                fetch(forecastUrl),
            ]);

            cont [currentData, forecastData] = await Promise.all([
                currentResponse.json(),
                forecastResponse.json(),
            ])

            console.log(currentData);
            console.log(forecastData);

            // Abans de fer els canvis a través del DOM, ens guardem la 
            // informació necessària que hem recuperat de l'API
            const weatherData = {
                current:{
                    city: currentData.location.name,
                    country: currentData.location.country,
                    region: currentData.location.region,
                    weatherIcon: currentData.current.condition.icon,
                    temperature: `${currentData.current.temp_c}ºC`,
                    weatherDescription: currentData.condition.text,
                },
                forecast:{
                    city: forecastData.location.name,
                    country: forecastData.location.country,
                    region: forecastData.location.region,
                    weatherIcon: forecastData.forecast.forecastday[1].day.condition.icon,
                    temperature: `${forecastData.forecast.forecastday[1].day.avgtemp_c}ºC`,
                    weatherDescription: forecastData.forecast.forecastday[1].day.text,
                }
            }

        } catch (error) {
            console.error(error);
        }
        
    })