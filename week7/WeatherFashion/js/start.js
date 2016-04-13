/*global  $, Skycons*/

(function () {
    'use strict';
    
    //HET WEER
    var App = {
        APIKEY: "355c3e27b861e13825ea906b7273b78e",
        lat: "",
        lng: "",
    
        init: function () {
            App.getLocation();
        },
        getLocation: function () {
            navigator.geolocation.getCurrentPosition(App.userPosition);
        },
        userPosition: function (pos) {
            // found the current user position
            App.lat = pos.coords.latitude;
            App.lng =  pos.coords.longitude;
            App.getWeather();
        },
        getWeather: function () {
            var url = "https://api.forecast.io/forecast/" + App.APIKEY + "/" + App.lat + "," + App.lng;
            
            // JSONP
            window.jQuery.ajax({
                url: url,
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                    $("#summary").text(data.currently.summary);
                    App.getPlaceName();
                   
                    var temp = (data.currently.temperature - 32)*5/9;
                    $("#temp").text(Math.round(temp) + " °C");
                    App.getPlaceName();
                    
                    var tempMax = (data.daily.data[0].temperatureMax - 32)*5/9;
                    $("#max").text("Max " + Math.round(tempMax) + " °C");
                    App.getPlaceName();
                    
                    var tempMin = (data.daily.data[0].temperatureMin - 32)*5/9;
                    $("#min").text("Min " + Math.round(tempMin) + " °C");
                    App.getPlaceName();
                    
                    switch (data.currently.icon) {
                        case "cloudy":
                            $(".icon").attr("src", "images/14.svg");
                            $(".imgClothes").attr("src", "images/otherone.png");
                            break;
                        case "clear-day":
                            $(".icon").attr("src", "images/2.svg");
                            $(".imgClothes").attr("src", "images/splash-drinks-bottle1.png");
                            break;
                        case "clear-night":
                            $(".icon").attr("src", "images/3.svg");
                            $(".imgClothes").attr("src", "images/other.png");
                            break;
                        case "rain":
                            $(".icon").attr("src", "images/18.svg");
                            $(".imgClothes").attr("src", "images/rain.png");
                            break;
                        case "snow":
                            $(".icon").attr("src", "images/23.svg");
                            $(".imgClothes").attr("src", "images/rain.png");
                            break;
                        case "sleet":
                            $(".icon").attr("src", "images/3.svg");
                            $(".imgClothes").attr("src", "images/other.png");
                            break;
                        case "wind":
                            $(".icon").attr("src", "images/6.svg");
                             $(".imgClothes").attr("src", "images/otherone.png");
                            break;
                        case "fog":
                            $(".icon").attr("src", "images/13.svg");
                             $(".imgClothes").attr("src", "images/otherone.png");
                            break;
                        case "partly-cloudy-day":
                            $(".icon").attr("src", "images/8.svg");
                            $(".imgClothes").attr("src", "images/other.png");
                            break;
                        case "partly-cloudy-night":
                            $(".icon").attr("src", "images/9.svg");
                             $(".imgClothes").attr("src", "images/otherone.png");
                            break;
                    }
                }
            });
        },
        getPlaceName: function () {
            var link = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + App.lat + ","+ App.lng + "&key=AIzaSyBVTDzjj88Vq6Zy1yP-MtFRi6_jfT6j630";
            
            window.jQuery.ajax({
                url: link,
                dataType: "json",
                success: function (data) {
                    $(".place").text(data.results[0].address_components[2].short_name);
                }
            });
        }
    };
    
    App.init();
    
}());