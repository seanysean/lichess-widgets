var usernameInput = prompt("Enter a lichess.org username");
var lichess = `https://lichess.org/api/user/${usernameInput}`;
var request = new XMLHttpRequest();
request.open('GET', lichess);
request.responseType = 'json';
request.send();
request.onload = function() {
  var lichessAPI = request.response;
  var link = document.getElementById("link");
  var online = document.getElementById("circle");
  var name = document.getElementById("name");
  if (lichessAPI["online"]) {
    online.classList.add("online");
    online.datatitle = "online";
  }
  else {
    online.classList.remove("online");
    online.datatitle = "offline";
  }
  console.log(lichessAPI);
}
