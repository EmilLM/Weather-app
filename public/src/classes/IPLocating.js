import $ from "jquery";

class IPLocating {
    static getByIP() {

        let response = $.ajax({
            url:'http://ip-api.com/json/',
            async: false,
            method:'GET'
        });

        return JSON.parse(response.responseText);
    }

}

export default IPLocating;
