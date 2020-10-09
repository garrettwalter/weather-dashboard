$(document).ready(function(){

console.log("Works");

var userText = $("#userText");
var searchBtn = $("#searchBtn");
var savedCities = $("#savedCities");
var cityBtn = $(".cityBtn");
var weatherBlock = $("#weatherBlock");
var cityDisplay = $("#cityDisplay");
var forecastDisplay = $("#forecastDisplay");

function renderSearchedCities(search) {
    var city = $("<button>");
    city.addClass("cityBtn");
    city.text(search);
    savedCities.append(city);
}

searchBtn.on("click", function(){
    event.preventDefault();
    var search = userText.val();
    renderSearchedCities(search);
})









})