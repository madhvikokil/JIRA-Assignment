
export default {

    callApi: (url) => {
    
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append('Authorization', 'Basic ' + 'dmFpc2huYXZpLmphd2FuamFsQGN1ZWxvZ2ljLmNvbTo3NmNVSXByaXVDaDlpTm1jZHJXZTA3RDQ=');
     return fetch(url, { method: 'GET', headers: headers })
    .then(res => res.json())

}

}