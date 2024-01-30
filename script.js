const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const weatherDiv = document.getElementById("weather");

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = input.value.trim();

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6660a4c9e2afb29baa67ea47862612a9&units=metric`)
  .then(response => response.json())
  .then(data => {
    const weather = {
      city: data.name,
      description: data.weather[0].description,
      temperature: data.main.temp,
      precipitation: data.clouds.all,
      humidity: data.main.humidity,
      icon: data.weather[0].icon
    };
    displayWeather(weather);
  })
  .catch(error => console.error(error));

})

function displayWeather(weather){

  weatherDiv.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('weather-card');

  const title = document.createElement('h2');
  title.textContent = weather.city;
  card.appendChild(title);

  const icon = document.createElement('img');
  icon.src = `http://openweathermap.org/img/wn/${weather.icon}.png`;
  card.appendChild(icon);

  const description = document.createElement('p');
  description.textContent = weather.description;
  card.appendChild(description);

  const temperature = document.createElement('p');
  temperature.textContent = `Temperature: ${weather.temperature} °C`;
  card.appendChild(temperature);

  const precipitation = document.createElement('p');
  precipitation.textContent = `Precipitation: ${weather.precipitation}%`;
  card.appendChild(precipitation);

  const humidity = document.createElement('p');
  humidity.textContent = `Humidite: ${weather.humidity}%`;
  card.appendChild(humidity);

  weatherDiv.appendChild(card);
  weatherDiv.style.display = 'block';

}
