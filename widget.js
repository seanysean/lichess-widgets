var widget = document.getElementById("lichess_widget");
widget.innerHTML = "<span id='circle' datatitle='online' class='fa fa-circle'></span> \
                    <a id='link' target='_blank' href='https://lichess.org/@/seanysean'> \
                    <span id='title'>GM </span> \
                    <span id='username'>seanysean</span>\
                    </a>\
                    <a href='https://lichess.org' target='_blank' class='lichess'>Lichess.org</a>\
                    <p id='name'>Sean B</p>\
                    <div id='bio'>Am I a hacker? No. Mod? No.</div>\
                    <div class='icons'>\
                    <a id='tv' href='' target='_blank' datatitle='View game in progress' class='fa fa-tv'></a>\
                    <a id='msg' href='' target='_blank' datatitle='Message' class='fa fa-envelope'></a>\
                    <a id='profile' href='' target='_blank' datatitle='View profile' class='fa fa-user'></a>\
                    <a id='tourny' href='' target='_blank' datatitle='Tournaments' class='fa fa-trophy'></a>\
                    <a id='study' href='' target='_blank' datatitle='View studies' class='fa fa-globe'></a>\
                    </div>\
                    <a href='' target='_blank' id='rating' datatitle='View stats'>\
                    <span id='ratingNum'>Classical: 2400</span>\
                    <span id='numgames'>1042 Games</span>\
                    </a>";
function lichess_widget(size,user) {
  var lichess = `https://lichess.org/api/user/${user}`;
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

    var tv = document.getElementById("tv"),
        msg = document.getElementById("msg"),
        profile = document.getElementById("profile"),
        tourny = document.getElementById("tourny"),
        study = document.getElementById("study");

    if (lichessAPI["online"]) {
      online.classList.add("online");
      online.setAttribute("datatitle", "online");
    }
    else {
      online.classList.remove("online");
      online.setAttribute("datatitle", "offline");
    }
    if (lichessAPI["patron"] === true) {
      online.classList.add("fa-diamond");
      online.classList.remove("fa-circle");
    }
    else {
      online.classList.remove("fa-diamond");
      online.classList.add("fa-circle");
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
    tourny.href = `https://lichess.org/@/${usernameInput}/tournaments/recent`;
    study.href = `https://lichess.org/study/by/${user}`;
    ratingLink.href = `https://lichess.org/@/${user}/perf/classical`;
    rating.innerHTML = "Classical: " + lichessAPI["perfs"]["classical"]["rating"];
    gameNum.innerHTML = lichessAPI["perfs"]["classical"]["games"] + " Games";
  }
}
