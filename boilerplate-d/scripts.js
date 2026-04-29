const apiKey = "a84c47631c79ab853c98082bb760dd87";

function getWeather() {
const city = document.getElementById("city").value;

getCurrent(city);
getForecast(city);

}

function getCurrent(city) {
const xhr = new XMLHttpRequest();
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

xhr.open("GET", url);

xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);
    console.log(data)

    const icon = data.weather[0].icon;

    document.getElementById("current").innerHTML = `
        <h3>Pogoda teraz:</h3>

        <div class="card">
            <div class="date">${data.name}</div>

            <div class="temp">Temperatura: ${Math.round(data.main.temp)} °C</div>
            <div>Odczuwalna: ${Math.round(data.main.feels_like)} °C</div>
            <div>${data.weather[0].description}</div>
        </div>
    `;
};

xhr.send();
}

function getForecast(city) {
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

fetch(url)
    .then(r => r.json())
    .then(data => {
        console.log(data)
        let text = "<h3>Prognoza:</h3>";

        for (let i = 0; i < data.list.length; i++) {
            const item = data.list[i];

            text += `
                <div class="card">
                    <div class="date">${item.dt_txt}</div>
                    <div class="temp">Temperatura: ${Math.round(item.main.temp)} °C</div>
                    <div>Odczuwalna: ${Math.round(item.main.feels_like)} °C</div>
                    <div>${item.weather[0].description}</div>
                </div>
            `;
        }

        document.getElementById("forecast").innerHTML = text;
    });


}

