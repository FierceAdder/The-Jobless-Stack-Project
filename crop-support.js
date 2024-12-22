const WEATHER_API_KEY = 'e5b5c7fd87f2aca291b8afa5f8a8a73d';

        const cropDatabase = {
            wheat: {
                type: 'crop',
                tempRange: { min: 15, max: 25 },
                rainfall: { min: 500, max: 1000 },
                season: ['winter', 'spring']
            },
            rice: {
                type: 'crop',
                tempRange: { min: 20, max: 35 },
                rainfall: { min: 1000, max: 2000 },
                season: ['summer', 'monsoon']
            },
            tomato: {
                type: 'vegetable',
                tempRange: { min: 20, max: 30 },
                rainfall: { min: 400, max: 600 },
                season: ['spring', 'summer']
            },
            mango: {
                type: 'fruit',
                tempRange: { min: 24, max: 35 },
                rainfall: { min: 750, max: 2500 },
                season: ['spring', 'summer']
            },
            potato: {
                type: 'vegetable',
                tempRange: { min: 15, max: 25 },
                rainfall: { min: 500, max: 1000 },
                season: ['winter']
            }
        };

        async function getWeatherData(location) {
            try {
                // Get coordinates first
                const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${WEATHER_API_KEY}`;
                const geoResponse = await fetch(geoUrl);
                const geoData = await geoResponse.json();

                if (!geoData.length) {
                    throw new Error('Location not found');
                }

                const { lat, lon } = geoData[0];

                // Get weather data
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();

                // Determine season based on month
                const month = new Date().getMonth();
                let season;
                if (month >= 2 && month <= 4) season = 'spring';
                else if (month >= 5 && month <= 7) season = 'summer';
                else if (month >= 8 && month <= 10) season = 'monsoon';
                else season = 'winter';

                return {
                    temperature: Math.round(weatherData.main.temp),
                    rainfall: Math.round(weatherData.main.humidity * 10), // Approximating rainfall from humidity
                    season: season
                };
            } catch (error) {
                throw new Error('Error fetching weather data: ' + error.message);
            }
        }

        async function analyzeCropConditions() {
            const cropType = document.getElementById('cropType').value;
            const cropName = document.getElementById('cropName').value.toLowerCase();
            const location = document.getElementById('location').value;

            if (!cropType || !cropName || !location) {
                alert('Please fill in all fields');
                return;
            }

            document.getElementById('loading').style.display = 'block';
            document.getElementById('resultContainer').style.display = 'none';

            try {
                const weatherData = await getWeatherData(location);
                const cropData = cropDatabase[cropName];
                
                if (!cropData) {
                    throw new Error('Crop data not found in our database');
                }

                const analysis = analyzeSuitability(weatherData, cropData);
                displayResults(weatherData, cropData, analysis);
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                document.getElementById('loading').style.display = 'none';
            }
        }
        function analyzeSuitability(weather, cropData) {
            const tempSuitable = weather.temperature >= cropData.tempRange.min && 
                               weather.temperature <= cropData.tempRange.max;
            
            const rainfallSuitable = weather.rainfall >= cropData.rainfall.min && 
                                   weather.rainfall <= cropData.rainfall.max;
            
            const seasonSuitable = cropData.season.includes(weather.season);

            return {
                suitable: tempSuitable && rainfallSuitable && seasonSuitable,
                reasons: {
                    temperature: tempSuitable,
                    rainfall: rainfallSuitable,
                    season: seasonSuitable
                }
            };
        }

        function displayResults(weather, cropData, analysis) {
            const resultContainer = document.getElementById('resultContainer');
            const weatherDetails = document.getElementById('weatherDetails');
            const cropRequirements = document.getElementById('cropRequirements');
            const recommendation = document.getElementById('recommendation');
            const recommendationText = document.getElementById('recommendationText');

            weatherDetails.innerHTML = `
                <p>Current Temperature: ${weather.temperature}°C</p>
                <p>Estimated Rainfall: ${weather.rainfall}mm</p>
                <p>Current Season: ${weather.season}</p>
            `;

            cropRequirements.innerHTML = `
                <p>Ideal Temperature: ${cropData.tempRange.min}°C - ${cropData.tempRange.max}°C</p>
                <p>Required Rainfall: ${cropData.rainfall.min}mm - ${cropData.rainfall.max}mm</p>
                <p>Suitable Seasons: ${cropData.season.join(', ')}</p>
            `;

            recommendation.className = 'recommendation ' + (analysis.suitable ? 'suitable' : 'unsuitable');
            recommendationText.innerHTML = analysis.suitable
                ? `<span style="color: #4CAF50">✓ Current conditions are suitable for growing this crop!</span>`
                : `<span style="color: #f44336">✗ Conditions are not ideal. Consider:</span><br>` +
                  (!analysis.reasons.temperature ? '- Growing in different temperature conditions<br>' : '') +
                  (!analysis.reasons.rainfall ? '- Areas with different rainfall patterns<br>' : '') +
                  (!analysis.reasons.season ? '- Different growing season' : '');

            resultContainer.style.display = 'block';
        }