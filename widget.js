
function lichess_widget(size,user,theme) {
var widget = document.createElement("DIV");
widget.id = "lichess_widget";
widget.innerHTML = `<span id='circle' datatitle='offline' class='fa fa-circle'></span> 
                    <a id='link' target='_blank' href=''> 
                    <span id='title'>.. </span> 
                    <span id='username'>Loading...</span>
                    </a>
                    <a href='https://lichess.org' target='_blank' class='lichess'>Lichess.org</a>
                    <p id='name'>Loading...</p>
                    <div id='bio'>Loading...</div>
                    <div class='icons'>
                    <a id='tv' href='' target='_blank' datatitle='View game in progress' class='fa fa-tv'></a>
                    <a id='msg' href='' target='_blank' datatitle='Message' class='fa fa-envelope'></a>
                    <a id='profile' href='' target='_blank' datatitle='View profile' class='fa fa-user'></a>
                    <a id='tourny' href='' target='_blank' datatitle='Tournaments' class='fa fa-trophy'></a>
                    <a id='study' href='' target='_blank' datatitle='View studies' class='fa fa-globe'></a>
                    </div>
                    <a href='' target='_blank' id='rating' datatitle='View stats'>
                    <span id='ratingNum'>Classical: Loading...</span>
                    <span id='numgames'>Loading Games</span>
                    </a>`;
document.body.appendChild(widget);    
  var lichess = `https://lichess.org/api/user/${user}`;
  var request = new XMLHttpRequest();
  request.open('GET', lichess);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var lichessAPI = request.response;
    var link = document.getElementById("link");
    var username = document.getElementById("username");
    var circle = document.getElementById("circle");
    var title = document.getElementById("title");
    var name = document.getElementById("name");
    var bio = document.getElementById("bio");
    var ratingLink = document.getElementById("rating");
    var rating = document.getElementById("ratingNum");
    var gameNum = document.getElementById("numgames");
    var tv = document.getElementById("tv"),
        msg = document.getElementById("msg"),
        profile = document.getElementById("profile"),
        tourny = document.getElementById("tourny"),
        study = document.getElementById("study");
    if (theme === "light") {
      widget.classList.add("light");
    }
    else {
      widget.classList.add("dark");
    }
    if (lichessAPI["online"]) {
      circle.classList.add("online");
      circle.setAttribute("datatitle", "online");
    }
    else {
      circle.classList.remove("online");
      circle.setAttribute("datatitle", "offline");
    }
    if (lichessAPI["patron"] === true) {
      circle.classList.add("fa-diamond");
      circle.classList.remove("fa-circle");
    }
    else {
      circle.classList.remove("fa-diamond");
      circle.classList.add("fa-circle");
    }
    link.href = lichessAPI["url"];
    if (lichessAPI["title"]) {
      title.innerHTML = lichessAPI["title"];
    }
    else {
      title.style.display = "none";
    }
    username.innerHTML = user;
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
    if (lichessAPI["playing"]) {
      tv.href = lichessAPI["playing"];
    }
    else {
      tv.style.display = "none";
    }
    msg.href = `https://lichess.org/inbox/new?user=${user}`;
    profile.href = lichessAPI["url"];
    tourny.href = `https://lichess.org/@/${user}/tournaments/recent`;
    study.href = `https://lichess.org/study/by/${user}`;
    ratingLink.href = `https://lichess.org/@/${user}/perf/classical`;
    rating.innerHTML = "Classical: " + lichessAPI["perfs"]["classical"]["rating"];
    gameNum.innerHTML = lichessAPI["perfs"]["classical"]["games"] + " Games";
    document.body.appendChild(widget);  
  }
}
