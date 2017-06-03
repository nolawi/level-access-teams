/*

curd in vanilla js written in babel and transpiled to vanilla 
Nolawi Petros

*/

function Crud(apiEndpoint, apiToken) {
    this.apiEndpoint = apiEndpoint; //chane this to any endpoint
    this.apiToken = apiToken;

    //copied this from stack 
    this.request = function (type, param, data, success, failed) {
        var xhr = new XMLHttpRequest();
        xhr.open(type, this.apiEndpoint + param);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('apiToken', this.apiToken);
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function () {
            var DONE = 4;
            var OK = 200;
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    var json = JSON.parse(xhr.response);
                    success(json);
                } else {
                    failed();
                }
            }
        }
    }

   //created CRUD should pass param
   
    this.create = function (param, data, success, failed) {
        this.request(
            'POST',
            param,
            data,
            success,
            failed
        )
    };

   
}