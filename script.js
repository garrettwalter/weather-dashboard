$(document).ready(function(){

console.log("Works");

// hides forecast divs until a city is selected
$("#day1").hide();
$("#day2").hide();
$("#day3").hide();
$("#day4").hide();
$("#day5").hide();

// dom vars
var userText = $("#userText");
var searchBtn = $("#searchBtn");
var savedCities = $("#savedCities");

// jquery vars
var savedCity = [];
var addedCity = localStorage.getItem("savedCities");
var cities = [];
var cities = JSON.parse(addedCity);
console.log(cities);

// renders button for searched city
function renderSearchedCity() {
    
    var city = $("<button>");
    city.attr("type","button");
    city.addClass("cityBtn");
    city.attr("id","cityBtn");
    city.text(savedCity[savedCity.length-1]);
    city.attr("data-name", savedCity[savedCity.length-1]);
    savedCities.prepend(city);
}

// renders prev saved cities buttons
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

// creates btn for searched city
searchBtn.on("click", function(){
    event.preventDefault();
    var userSearch = userText.val().toUpperCase();
    console.log(userSearch);
    savedCity.push(userSearch);
    var newCity = JSON.stringify(savedCity);
    localStorage.setItem("savedCities", newCity);
    renderSearchedCity();
    console.log(addedCity);
})

// renders response when city btn is clicked
savedCities.on("click","#cityBtn",renderResponse);

// pushes saved cites to the array that displays them
for(i=0;i<cities.length;i++){
    console.log(cities[i]);
    savedCity.push(cities[i]);
} renderSavedCities();
     
// calls api and displays info
function renderResponse(){
    var selected = $(this).attr("data-name");
    console.log(selected);

    // displays 5 day forecast
    $("#day1").css("display","block");
    $("#day2").css("display","block");
    $("#day3").css("display","block");
    $("#day4").css("display","block");
    $("#day5").css("display","block");

    // displays current weather info
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+selected+"&appid=741a06d50883b230f6d00bc0982c4bd8&units=imperial";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#cityInfo").text(selected + " --- " + moment().format("MMM Do YY"));
        $("#cityWeather").text("Currently: "+response.weather[0].description);
        $("#cityTemp").text("Current Temp: "+response.main.temp + " F");
        $("#cityHum").text("Humidity: "+response.main.humidity+"%");
        $("#cityWind").text("Wind Speed: "+response.wind.speed+" mph");
        $("#cityUV").text("UV Index: ");
        $("#cityDisplay").addClass("cityDisplay"); 
    })

    // displays 5 day forecast
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q="+selected+"&appid=741a06d50883b230f6d00bc0982c4bd8&units=imperial",
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#day1Date").text(moment().add(1, 'days').calendar("L"));
        $("#day1Temp").text(response.list[0].main.temp+" F");
        $("#day1Weather").text(response.list[0].weather[0].description);
        $("#day2Date").text(moment().add(2, 'days').calendar("L"));
        $("#day2Temp").text(response.list[8].main.temp+" F");
        $("#day2Weather").text(response.list[8].weather[0].description);
        $("#day3Date").text(moment().add(3, 'days').calendar("L"));
        $("#day3Temp").text(response.list[16].main.temp+" F");
        $("#day3Weather").text(response.list[16].weather[0].description);
        $("#day4Date").text(moment().add(4, 'days').calendar("L"));
        $("#day4Temp").text(response.list[24].main.temp+" F");
        $("#day4Weather").text(response.list[24].weather[0].description);
        $("#day5Date").text(moment().add(5, 'days').calendar("L"));
        $("#day5Temp").text(response.list[32].main.temp+" F");
        $("#day5Weather").text(response.list[32].weather[0].description);
    })
}
})