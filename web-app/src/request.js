export function serverResponse(urlRequest) {
    let request = new XMLHttpRequest();
    request.open('GET', urlRequest, false);
    request.send();
    if (request.status !== 200) {
        console.log(request.status + ': ' + request.statusText);
    } else {
        let response = request.responseText;
        response = JSON.parse(response);
        return response;
    }
}

export function sendOrder(value, name) {
    return "https://playground24.ru/dsxt-api/get_data.php?value=" + value + "&name=" + name;
}
