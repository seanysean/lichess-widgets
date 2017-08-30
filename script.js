var lichess = "https://lichess.org/api/user/seanysean";
var request = new XMLHttpRequest();
request.open('GET', lichess);
request.responseType = 'json';
request.send();
request.onload = function() {
  console.log(request.response);
}
