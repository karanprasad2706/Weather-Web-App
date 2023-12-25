var input = '';
var newHtml, element, el;
var data;

var call = () => {
    input = document.querySelector('.enter').value;
    data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=956671e779059e46f6f2f174493e5383`)
        .then(response => {
            return response.json();
        })
        .then(response => {

            var arr = response.weather[0].description.split(" ");
            var imageUrl = `https://source.unsplash.com/1600x900/?${arr[arr.length - 1]}`;

            fetch(imageUrl)
                .then(res => res.blob())
                .then(image => {
                    var localUrl = URL.createObjectURL(image);
                    document.body.style.backgroundImage = `linear-gradient(90deg, rgba(0, 0, 0, 0.7),rgba(0, 0, 0, .2), rgba(0, 0, 0, 0.7)),url(${localUrl})`;
                    return localUrl;
                });

				newHtml = `
				<div class='header'>
					<h2>${response.name}-Country: ${response.sys.country}</h2>
					<h3>${response.weather[0].description.toUpperCase()}</h3>
					<div class="content">
						<div class="info-item large temperature">
							<i class="fas fa-thermometer-half"></i>
							<span>${Math.round(response.main.temp - 273.15)}°C </span>
						</div>
						<div class="info-item large cloudiness">
							<i class="fas fa-cloud"></i>
							<span>Cloudiness:</span>
							<span>${response.clouds.all}%</span>
						</div>
						<div class="info-item large humidity">
							<i class="fas fa-tint"></i>
							<span>Humidity: </span>
							<span>${response.main.humidity}%</span>
						</div>
						<div class="info-item large pressure">
							<i class="fas fa-chart-line"></i>
							<span>Pressure:</span>
							<span>${response.main.pressure} hPa</span>
						</div>
						<div class="info-item large sea-level">
							<i class="fas fa-water"></i>
							<span>Sea Level:</span>
							<span>${response.main.sea_level || 'N/A'}</span>
						</div>
						<div class="info-item large wind-speed">
							<i class="fas fa-wind"></i>
							<span>Wind Speed:</span>
							<span>${response.wind.speed} m/s</span>
						</div>
						<div class="info-item large wind-deg">
							<i class="fas fa-compass"></i>
							<span>Wind Deg:</span>
							<span>${response.wind.deg}°</span>
						</div>
					</div>
				</div>`;
			
			

            el = document.querySelector('.header')
            el.parentNode.removeChild(el);

            element = document.querySelector('.info');
            element.insertAdjacentHTML('beforeend', newHtml);
        })
        .catch(err => {
            newHtml = `<div class="header">
            <h2>
                Please check the city name! <br>
            </h2>
        </div>`;

            el = document.querySelector('.header')
            el.parentNode.removeChild(el);

            element = document.querySelector('.info');
            element.insertAdjacentHTML('beforeend', newHtml);

        });

    setTimeout(function () { document.querySelector('.info').scrollIntoView({ behavior: "smooth" }, true); }, 1000);
}

document.querySelector('.enter').addEventListener('keypress', function (event) {
    input = document.querySelector('.enter').value;
    if (event.keyCode === 13 || event.which === 13) {
        call();
    }
});
