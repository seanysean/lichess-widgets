var lichess = "https://lichess.org/api/user/nevergonnaberserk";
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
  }
  else {
    online.classList.remove("online");
  }
  console.log(lichessAPI);
}
