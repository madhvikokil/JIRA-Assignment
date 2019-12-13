
export default {

    callApi: (url) => {
    let a = localStorage.getItem('token')
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append('Authorization', `Basic ${a}`);
     return fetch(url, { method: 'GET', headers: headers })
    .then(res => res.json())

}

}