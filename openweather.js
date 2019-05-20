const axios = require('axios');

const APPID = '1cb6fa29536159862818c9668f8177f5';

function weatherUrl(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    city,
  )}&units=imperial&APPID=${APPID}`;
}

const url = weatherUrl('Paris');

const request = { url };

const promise = axios(request);

promise.then(success, error);

function success(response) {
  console.log(JSON.stringify(response.data, null, 2));
}

function error(err) {
  console.log(JSON.stringify(err.response.data, null, 2));
}