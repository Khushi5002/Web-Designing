const apiKey = "44bcd880332900419842c49ebf35ffd1";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = "⚠️ Please enter a city name";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  result.innerHTML = "⏳ Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); // 👈 check this in console

    if (data.cod == "404") {
      result.innerHTML = "❌ City not found";
      return;
    }

    if (data.cod == 401) {
      result.innerHTML = "🔑 Invalid API key (wait a bit)";
      return;
    }

    result.innerHTML = `
      <div class="card">
        <h2>${data.name}</h2>
        <h3>${data.main.temp}°C</h3>
        <p>${data.weather[0].description}</p>
        <p>💧 ${data.main.humidity}% humidity</p>
        <p>🌬️ ${data.wind.speed} m/s wind</p>
      </div>
    `;

  } catch (error) {
    console.error(error);
    result.innerHTML = "⚠️ Error fetching data";
  }
}