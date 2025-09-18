const url = new URL(window.location.toLocaleString());
const pages = ["info", "leadership", "elections", "constitution", "memberlist", "newsnotice"]

const pageList = document.getElementsByClassName("page");
const loaded = [];
var currentPage;

let splashes = ["Totally not rigged!!!", "New Lameful", "What's Uptown?", "♫I've been workin' on the railroad♫", "Also visit CalvinTown", "Also visit IkeaLand", "Also visit Matsunoki", "Also visit MillField", "Also visit Jurcgrad", "Also visit Spawn 2025", "Brought to you by the NNNNNNNNNN", "<b><i>Dig the Cube</i></b>", "Urban Sprawl!", "Invest in WormzyCoin!", "New and Improved!", "Omtegu!", "do /pay new_nameful 20 for good luck", "my asshole hurts", "The most extravagant group project", "That damn cube…", "what the nameful", "Vote Karma!", "Cobble ceiling has been removed.", "railroad fetish", "ColoradoCrusade!", "MississipiMuslim!!", "PennsylvaniaPacifist!", "Haiiiii Lkarchhhh :3", "23% approved!", "67% approved!", "71% approved!", "Now updated to 1.21.5", "hardly know her", "Praise be thine", "Beware the NBP", "/lmk NewNameful", "Coded by Lkarch", "Just one more rail line…", "I think I get why they call it Minecraft", "Why isn't there a New Nameful 2?", "The townsfolk get a little quirky at night.", "/pay keyboardan 100", "Cube 3 coming soon!", "\"Mildly funny splash text here\"", "Also try Old Nameful"];

function getCookie(cookieName) {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let splitCookies = decodedCookie.split(";");
  for(let i = 0; i < splitCookies.length; i++) {
    let cookie = splitCookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

function calculateCountdown(endingDate) {
  let current = new Date();
  let end = new Date(endingDate);
  let timeDifference = end - current;
  let daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference;
}


function keyboardanTroll(force) {
  if (force == true | Math.floor(Math.random() * 1000) == 1) {
    return randomizeUser;
  }
  else {
    return randomizeUser();
  }
}

function randomizeUser() {
  let randomUser = memberList[Math.floor(Math.random() * memberList.length)];
  return randomUser;
}


function switchPage(pageName, button, pushState) {
  currentPage = pageName;

  for (let page = 0; page < pageList.length; page++) {
    pageList[page].style.display = "none";
  }

  let navButtons = document.getElementsByClassName("nav-button");
  for (let navButton = 0; navButton < navButtons.length; navButton++) {
    navButtons[navButton].style.backgroundColor = "black";
    navButtons[navButton].style.color = "white";
  }

  if (pushState == true) {
    history.pushState(null, "", "/" + currentPage)
  }
  
  document.title = "NN " + button.innerText;
  document.cookie = "page=" + pageName;

  document.getElementById(pageName).style.display = "block";

  button.style.backgroundColor = "white";
  button.style.color = "black";

  for (let page = 0; page <= loaded.length; page++) {
    if (! loaded.includes(pageName)) {
      loaded.push(pageName);
      window[pageName.replace("-", "") + "Load"]();
    }
  }
}

function infoLoad() {
  randomizeSplash();
}

function randomizeSplash() {
  let randomSplash = splashes[Math.floor(Math.random() * splashes.length)];
  console.log("Splash randomized to \"" + randomSplash +"\"");

  document.getElementById("splash").innerHTML = randomSplash;
}

function newsnoticeLoad() {
  addDiscordCards(window[currentPage + "CurrentIndex"], "newsnotice", false, true, "embed");
  window.addEventListener("scroll", handleInfiniteScroll);
}

function onPageLoad() {
  if (pages.includes(window.location.href.split("/")[3].replace("-", ""))) {
    document.getElementById(window.location.href.split("/")[3].replace("-", "") + "-button").click();
  } else if (getCookie("page") === "") {
    document.getElementById(pageList[0].id + "-button").click();
  } else {
    document.getElementById(getCookie("page") + "-button").click();
  }
  // if (window.navigator["userAgentData"]["platform"] == "Android" || window.navigator["userAgentData"]["platform"] == "iOS") {
  //   document.getElementById("navbar").style.display = "none"
  //   document.getElementById("leadership").style.padding = "10px 20px 20px"
  //   document.getElementById("leadership-button").click();
  // }
}

window.addEventListener("popstate", function (event){
  if (pages.includes(window.location.href.split("/")[3].replace("-", ""))) {
    switchPage(window.location.href.split("/")[3].replace("-", ""), document.getElementById(window.location.href.split("/")[3].replace("-", "") + "-button"), false)
  }
});
