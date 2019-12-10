import $ from "jquery";


class GeoLocating {

    static getLocation () {
        const locationKey = '70092f83-b887-48aa-b5ba-ed05b276cfd6';
        let citySearch = $('.find-city').find('#search').val();
     let response =  $.ajax ({
            url: 'https://graphhopper.com/api/1/geocode?key=70092f83-b887-48aa-b5ba-ed05b276cfd6&q=' + citySearch,
            method: 'GET',
            async: false,
            dataType: 'json'
        });
         return response;

    }
}

export default GeoLocating;
