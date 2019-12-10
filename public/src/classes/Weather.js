import $ from "jquery";

class Weather {
    static getWeather(latitude,longitude) {
        const key = '790003aed89611b7f79f3a3939e97bb1';
        let response = $.ajax({
            url:'https://api.darksky.net/forecast/' + key + '/' + latitude + ',' + longitude + '?units=si&lang=pl',
            method:'GET',
            async:false,
            dataType: 'jsonp'
        });

        return response;


    }
}

export default Weather;
