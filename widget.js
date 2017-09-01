
function lichess_widget(size,user,theme) {
  var widget = document.createElement("DIV");
  widget.id = "lichess_widget";
  widget.innerHTML = `Loading...`;    
  var lichess = `https://lichess.org/api/user/${user}`;
  var request = new XMLHttpRequest();
  request.open('GET', lichess);
  request.responseType = 'json';
  request.send();
  document.body.appendChild(widget);  
  request.onload = function() { 
    var lichessAPI = request.response;
    var nameJS;
    var patron;
    var titled;
    var playing;
    var hide;
    var sizeCSS;
    var online = "offline";
    if (size === "large") {
      sizeCSS = "";
    }
    else {
      sizeCSS = "display:none";
    }
    if (theme === "light") {
      widget.classList.add("light");
    }
    else {
      widget.classList.add("dark");
    };
    if (lichessAPI["online"]) {
      online = "online";
    }
    else {
      online = "offline";
    };
    if (lichessAPI["patron"] === true) {
      patron = "fa-diamond";
    }
    else {
      patron = "fa-circle";
    };
    if (lichessAPI["title"]) {
      titled = lichessAPI["title"];
    }
    else {
      titled = "";
    };
    if (lichessAPI["profile"]["firstName"] && lichessAPI["profile"]["lastName"]) {
      nameJS = lichessAPI["profile"]["firstName"] + " " + lichessAPI["profile"]["lastName"];
    }
    else if (lichessAPI["profile"]["firstName"]) {
      nameJS = lichessAPI["profile"]["firstName"];
    }
    else {
      nameJS = "";
    };
    if (lichessAPI["playing"]) {
      playing = lichessAPI["playing"];
      hide = "display:inline";
    }
    else {
      hide = "display:none";
    };
    widget.innerHTML = `<span id='circle' datatitle='${online}' class='fa ${patron} ${online}'></span> 
                    <a id='link' target='_blank' href='${lichessAPI["url"]}'> 
                      <span id='title'>${titled}</span> 
                      <span id='username'>${user}</span>
                    </a>
                    <a href='https://lichess.org' target='_blank' class='lichess'>Lichess.org</a>
                    <p style='${sizeCSS}' id='name'>${nameJS}</p>
                    <div style='${sizeCSS}' id='bio'>${lichessAPI["profile"]["bio"]?lichessAPI["profile"]["bio"]:""}</div>
                    <div style='${sizeCSS}' class='icons'>
                      <a href='${playing}' target='_blank' style='${hide}' datatitle='View game in progress' class='fa fa-tv'></a>
                      <a href='https://lichess.org/inbox/new?user=${user}' target='_blank' datatitle='Message' class='fa fa-envelope'></a>
                      <a href='${lichessAPI["url"]}' target='_blank' datatitle='View profile' class='fa fa-user'></a>
                      <a href='https://lichess.org/@/${user}/tournaments/recent' target='_blank' datatitle='Tournaments' class='fa fa-trophy'></a>
                      <a href='https://lichess.org/study/by/${user}' target='_blank' datatitle='View studies' class='fa fa-globe'></a>
                      <a href='https://lichess.org/?user=${user}#friend' target='_blank' datatitle='Challenge' class='fa fa-delicious'></a>
                    </div>
                    <a href='https://lichess.org/@/${user}/perf/classical' target='_blank' id='rating' datatitle='View stats'>
                      <span id='ratingNum'>Classical: ${lichessAPI["perfs"]["classical"]["rating"]}</span>
                      <span id='numgames'>${lichessAPI["perfs"]["classical"]["games"]} Games</span>
                    </a>`;    
  }
}
