const nnRuler = "cool_tellow";
const nnCoRuler = "ColoradoCrusade";
const electionDate = "2025-6-30";

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var splitCookies = decodedCookie.split(';');
  for(var i = 0; i < splitCookies.length; i++) {
    let cookie = splitCookies[i];
    while (cookie.charAt(0) == ' ') {
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

function switchSection(sectionName, button) {
  var i, section, navButton;
  section = document.getElementsByClassName("section");
  for (i = 0; i < section.length; i++) {
    section[i].style.display = "none";
  }

  navButton = document.getElementsByClassName("navButton");
  for (i = 0; i < navButton.length; i++) {
    navButton[i].style.backgroundColor = "black";
    navButton[i].style.color = "white";
  }
  
  document.title = button.innerHTML;
  document.cookie = "section=" + sectionName;

  document.getElementById(sectionName).style.display = "block";

  button.style.backgroundColor = "white";
  button.style.color = "black";
}

function onPageLoad() {
  console.log(nnRuler);
  document.getElementById("ruler").innerText = nnRuler;
  document.getElementById("rulerImage").src = "https://minotar.net/armor/body/" + nnRuler + "/100.png";

  console.log(nnCoRuler);
  document.getElementById("coRuler").innerText = nnCoRuler;
  document.getElementById("coRulerImage").src = "https://minotar.net/armor/body/" + nnCoRuler + "/100.png";

  console.log(calculateCountdown(electionDate));


  if (Math.ceil(calculateCountdown(electionDate)) <= 0) {
    document.getElementById("electionCountdown").innerText = "The next election is RIGHT NOW!!!";
  } else {
    document.getElementById("electionCountdown").innerText = "The next election is in " + Math.ceil(calculateCountdown(electionDate)) + " days!";
  }

  console.log(document.cookie);
  if (getCookie("section") === "") {
    document.getElementById("electionButton").click();
  } else {
    document.getElementById(getCookie("section") + "Button").click();
  }
}
