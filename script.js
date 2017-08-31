var usernameInput = prompt("Enter a lichess.org username");
var lichess = `https://lichess.org/api/user/${usernameInput}`;
var request = new XMLHttpRequest();
request.open('GET', lichess);
request.responseType = 'json';
request.send();
request.onload = function() {
  var lichessAPI = request.response;
  var link = document.getElementById("link");
  var username = document.getElementById("username");
  var online = document.getElementById("circle");
  var name = document.getElementById("name");
  var bio = document.getElementById("bio");
  if (lichessAPI["online"]) {
    online.classList.add("online");
    online["datatitle"] = "online";
  }
  else {
    online.classList.remove("online");
    online["datatitle"] = "offline";
  }
  link.href = lichessAPI["url"];
  username.innerHTML = usernameInput;
  name.innerHTML = `${lichessAPI["profile"]["firstName"]} ${lichessAPI["profile"]["lastName"]}`;
  bio.innerHTML = lichessAPI["profile"]["bio"];
  console.log(lichessAPI);
}
