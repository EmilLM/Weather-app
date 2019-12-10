import $ from "jquery";

class IPLocating {
    static getByIP() {

        let response = $.ajax({
            url:'https://ipapi.co/json/',
            async: false,
            method:'GET'
        });

        return JSON.parse(response.responseText);
    }

}

export default IPLocating;
