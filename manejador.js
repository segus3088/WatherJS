//alert("Funciona");
//(funtion ()) Esto es para que se ejecute apenas se cargue este archivo
(function() {

	var API_WATHER_KEY = "80114c7878f599621184a687fc500a12"; //token que me asigna 
	var API_WATHER_URL = "http://api.openweathermap.org/data/2.5/weather?";
	var IMG_WATHER = "http://openweathermap.org/img/w/";

	var today = new Date();
	var timeNow = today.toLocaleTimeString();

	var $body = $("body");
	var $loader = $(".loader");
	var nameNewCity = $("[data-input='cityAdd']");
	var buttonAdd = $("[data-button='add']");

	var cityWather = {};
	cityWather.zone;
	cityWather.icon; //nombre de variables identificables
	cityWather.temp;
	cityWather.temp_max;
	cityWather.temp_min;
	cityWather.main;

	buttonAdd.on("click", addNewCity);
	nameNewCity.on("keypress", function(event) {


	});

	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(getCoords, errorFound);

	}
	else {
		alert("Deja de ser arcaico y actuliza tu navegador ;)");
	}

	function errorFound(error) {
		alert("Un error ha ocurrido: " + error.code);
		//0: Error desconocido
		//1: Permiso denegado
		//2: Posición no disponible
		//3: Tiempo Fuera 
	}

	function getCoords(positionA) {
		//alert("Va bien");
		var lat = positionA.coords.latitude;
		var lon = positionA.coords.longitude;
		console.log(positionA);
		console.log(lat + ", " + lon);
		//alert("Estas en: " + lat + ", " + lon);
		$.getJSON(API_WATHER_URL + "lat=" + lat + "&lon=" + lon, getCurrentWeather);
		
	}

	function getCurrentWeather(data) {
		console.log(data);
		cityWather.zone = data.name;
		cityWather.icon = IMG_WATHER + data.weather[0].icon +".png"; //nombre de variables identificables
		cityWather.temp = data.main.temp - 273,15; // me lo den en grados kelvin
		cityWather.temp_max = data.main.temp_max - 273,15;
		cityWather.temp_min = data.main.temp_min - 273,15;
		cityWather.main = data.weather[0].main;

		//render
		renderTemplate();

	}

	function activateTamplate(id) {
		var odjectHtml = document.querySelector(id);
		return document.importNode(odjectHtml.content, true);

	}

	function renderTemplate(odjectToRender) {
		var clone = activateTamplate("#template--city");
		clone.querySelector("[data-time]").innerHTML = timeNow;
		clone.querySelector("[data-city]").innerHTML = odjectToRender.zone;
		clone.querySelector("[data-icon]").src = odjectToRender.icon;
		console.log(odjectToRender.icon);
		clone.querySelector("[data-temp='max']").innerHTML = odjectToRender.temp_max.toFixed(2);
		clone.querySelector("[data-temp='min'").innerHTML = odjectToRender.temp_min.toFixed(2);
		clone.querySelector("[data-temp='current'").innerHTML = odjectToRender.temp.toFixed(2);

		document.querySelector(".loader").innerHTML = "ok";
		$loader.hide();

		$body.append(clone);
	}

	function addNewCity(event)  {
		event.preventDefault();
		//$.getJSON(API_WATHER_URL + "q=" nameNewCity.val(), getWeatherCity());
	}

	function getWeatherCity(dataC) {
		cityWather = {};
		cityWather.zone = dataC.name;
		cityWather.icon = IMG_WATHER + dataC.weather[0].icon + ".png";
		cityWather.temp = dataC.main.temp - 273.15;
		cityWather.temp_min = dataC.main.temp_min -273.15;
		cityWather.temp_max = dataC.main.temp_min - 273.15;

		renderTemplate(cityWather);

	}
})();
