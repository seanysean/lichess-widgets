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
  var title = document.getElementById("title");
  var name = document.getElementById("name");
  var bio = document.getElementById("bio");
  var ratingLink = document.getElementById("rating");
  var rating = document.getElementById("ratingNum");
  var gameNum = document.getElementById("numgames");
  if (lichessAPI["online"]) {
    online.classList.add("online");
    online.setAttribute(datatitle, "online")
  }
  else {
    online.classList.remove("online");
    online.setAttribute(datatitle, "offline")
  }
  link.href = lichessAPI["url"];
  if (lichessAPI["title"]) {
    title.innerHTML = lichessAPI["title"];
  }
  else {
    title.style.display = "none";
  }
  username.innerHTML = usernameInput;
  if (lichessAPI["profile"]["firstName"] && lichessAPI["profile"]["lastName"]) {
    name.innerHTML = `${lichessAPI["profile"]["firstName"]} ${lichessAPI["profile"]["lastName"]}`;
  }
  else if (lichessAPI["profile"]["firstName"]) {
    name.innerHTML = lichessAPI["profile"]["firstName"];
  }
  else {
    name.style.display = "none";
  } 
  if (lichessAPI["profile"]["bio"]) {
    bio.innerHTML = lichessAPI["profile"]["bio"];
  }
  else {
    bio.style.display = "none";
  }
  ratingLink.href = `https://lichess.org/@/${usernameInput}/perf/classical`
  rating.innerHTML = "Classical: " + lichessAPI["perfs"]["classical"]["rating"];
  gameNum.innerHTML = lichessAPI["perfs"]["classical"]["games"] + " Games";
  console.log(lichessAPI);
}
