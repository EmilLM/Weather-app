import $ from "jquery";
import Weather from "./classes/Weather";
import GeoLocating from "./classes/GeoLocating";
import IPLocating from "./classes/IPLocating";

// SCSS
import "./styles/main.scss";

$(function () {
    const moduleWeather = $('.module__weather');
    const moduleForm = $('.module__form');
    let ipResponse = IPLocating.getByIP();
    let darkSkyResponse = Weather.getWeather(ipResponse.lat,ipResponse.lon);

    console.log(ipResponse);

    darkSkyResponse.done(response => {
        console.log(response);
        let weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        let {city} = ipResponse;
        $('.city__name').text(city);
        let currently = response.currently;
        let {temperature, humidity, pressure, windSpeed, icon} = currently;

        $('.weather__info').find('.temperature__value').text(temperature.toFixed(1));
        $('.humidity__value').text(humidity);
        $('.pressure__value').text(parseInt(pressure) + ' hPa');
        $('.wind-speed__value').text(windSpeed.toFixed(1) + ' m/s');
        $('.weather__icon img').attr('src','./images/icons/' + icon + '.svg')
        response.daily.data.forEach((el,index)=>{
            if(index > 0 && index < 6) {
                let item = $('.weather__forecast').find('li:nth-of-type(' + index + ')');
                item.find('img').attr('src','./images/icons/' + el.icon + ".svg");
                item.find('.day').text(weekDays[(new Date(el.time*1000)).getDay()]);
                item.find('.temperature__value').text(((el.temperatureHigh + el.temperatureLow)/2).toFixed(1));
            }
        });
    });

    moduleWeather.show();
    moduleForm.find('.btn--close').css('outline','none');
    $('#add-city').css('outline','none');
    $('#add-city').on('click', () => {
       moduleForm.fadeIn();
    });
    moduleForm.find('.btn--close').on('click', () => {
        moduleForm.fadeOut()
    });
    moduleWeather.find('.btn--close').on('click', () => {
        moduleWeather.css('display', 'none');

    });

    $('.find-city').on('submit',(ev) => {
        ev.preventDefault();
        let geoResponse= GeoLocating.getLocation();
        let cloneWeather = moduleWeather.clone(true); //cloned div
        cloneWeather.find('.btn--close').on('click', () => {
            cloneWeather.css('display', 'none');
        });

        $('.find-city').find('#search').val('');
        geoResponse.done(response=>{
            console.log(response);
            let cityCoord = response.hits[0].point;
            let cityName = response.hits[0].name;
            let {lat, lng} = cityCoord;

            let geoLocatingWeather = Weather.getWeather(lat, lng);
            geoLocatingWeather.done( response => {
                console.log(response);
                //Input city trebuie modul nou de vreme!!!
                let weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                $('.city__name').text(cityName);
                let currently = response.currently;
                let {temperature, humidity, pressure, windSpeed, icon} = currently;

                $('.weather__info').find('.temperature__value').text(temperature.toFixed(1));
                $('.humidity__value').text(humidity);
                $('.pressure__value').text(parseInt(pressure) + ' hPa');
                $('.wind-speed__value').text(windSpeed.toFixed(1) + ' m/s');
                $('.weather__icon img').attr('src','./images/icons/' + icon + '.svg')
                response.daily.data.forEach((el,index)=>{
                    if(index > 0 && index < 6) {
                        let item = $('.weather__forecast').find('li:nth-of-type(' + index + ')');
                        item.find('img').attr('src','./images/icons/' + el.icon + ".svg");
                        item.find('.day').text(weekDays[(new Date(el.time*1000)).getDay()]);
                        item.find('.temperature__value').text(((el.temperatureHigh + el.temperatureLow)/2).toFixed(1));
                    }
                });
                $('#app').append(cloneWeather);
            });
        });
    });
});




