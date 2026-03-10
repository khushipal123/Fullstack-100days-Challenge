
function updateDateTime() {
  const now = new Date();
  const options = { 
    weekday: 'long', year: 'numeric', month: 'long', 
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZone: 'Asia/Kolkata'
  };
  document.getElementById("dateTime").innerText = 
    new Intl.DateTimeFormat('en-IN', options).format(now);
}
setInterval(updateDateTime, 1000);


async function getWeather() {
  const city = document.getElementById("city").value.trim(); 
  const apiKey = "122f29a62d168a8c869cd14130f57d1e"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "City not found ❌");
    }
    const data = await response.json();

    document.getElementById("weather").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
      <p>☁ Condition: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    document.getElementById("weather").innerHTML = 
      `<p style="color:red;">${error.message}</p>`;
  }
}