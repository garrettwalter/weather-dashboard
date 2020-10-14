$(document).ready(function(){

console.log("Works");

var userText = $("#userText");
var searchBtn = $("#searchBtn");
var savedCities = $("#savedCities");
var cityBtn = $("#cityBtn");
var weatherBlock = $("#weatherBlock");
var cityDisplay = $("#cityDisplay");
var forecastDisplay = $("#forecastDisplay");

var savedCity = [];
var addedCity = localStorage.getItem("savedCities");
var cities = [];
var cities = JSON.parse(addedCity);
console.log(cities);

function renderSearchedCity() {
    
    var city = $("<button>");
    city.attr("type","button");
    city.addClass("cityBtn");
    city.attr("id","cityBtn");
    city.text(savedCity[savedCity.length-1]);
    city.attr("data-name", savedCity[savedCity.length-1]);
    savedCities.prepend(city);
}

function renderSavedCities() {
    for(i=0;i<savedCity.length;i++){
    var city = $("<button>");
    city.attr("type","button");
    city.addClass("cityBtn");
    city.attr("id","cityBtn");
    city.attr("data-name", savedCity[i]);
    city.text(savedCity[i]);
    savedCities.prepend(city);
    }
}

searchBtn.on("click", function(){
    event.preventDefault();
    var userSearch = userText.val();
    console.log(userSearch);
    savedCity.push(userSearch);
    var newCity = JSON.stringify(savedCity);
    localStorage.setItem("savedCities", newCity);
    renderSearchedCity();
    console.log(addedCity);
})

savedCities.on("click","#cityBtn",renderResponse);

for(i=0;i<cities.length;i++){
    console.log(cities[i]);
    savedCity.push(cities[i]);
} renderSavedCities();
     
// api
function renderResponse(){
    var selected = $(this).attr("data-name");
    console.log(selected);

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+selected+"&appid=741a06d50883b230f6d00bc0982c4bd8&units=imperial";
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#cityInfo").text(selected);
        $("#cityTemp").text("Current Temp: "+response.main.temp);
        $("#cityHum").text("Humidity: "+response.main.humidity+"%");
        $("#cityWind").text("Wind Speed: "+response.wind.speed+" mph");
        $("#cityUV").text("UV Index: ");
        $("#cityDisplay").addClass("cityDisplay");
    })
 
}

})