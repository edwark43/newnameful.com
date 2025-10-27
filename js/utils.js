var throttleTimer;

function ele(tag, props = {}) {
  return Object.assign(document.createElement(tag), props);
}

function append(par, ...sibs) {
  return sibs.reduce((p, sib) => (p.appendChild(sib), p), par);
}

function append_before(par, adj, ...sibs) {
  return sibs.reduce((p, sib) => (p.insertBefore(sib, adj), p), par);
}

function query_ele(query) {
  return document.querySelector(query);
}

function query_all(query) {
  return document.querySelectorAll(query);
}

function get_page() {
  return window.location.pathname.substr(1)
}

function get_cookie(cookieName) {
  let name = cookieName + "=";
  let cookies = decodeURIComponent(document.cookie).split(";");
  for(let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

function calculate_countdown(endingDate) {
  let current = new Date();
  let end = new Date(endingDate);
  let timeDifference = end - current;
  let daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference;
}

function parse_member(nickname) {
  var splitName = nickname.split("&").filter((text) => (text !== ""))
  var codes = []
  var sections = []

  for (let i = 0; i < splitName.length; i++) {
    if (nickname.indexOf("&") == -1) {
      codes[0] = "&f"
      sections[0] = splitName[0];
    } else if (nickname[0] !== "&" && nickname.indexOf("&") !== -1){
      if (i == 0) {
        codes[0] = "&f"
        sections[0] = splitName[0];
      } else {
        codes[i] = "&" + splitName[i][0]
        sections[i] = splitName[i].substring(1);
      }
    } else {
      codes[i] = "&" + splitName[i][0]
      sections[i] = splitName[i].substring(1);
    }
  }

  return {"codes":codes,"sections":sections}
}

async function fetch_member(member) {
  const response = await fetch("/api/nickname/" + member);  
  const jsonData = await response.json();

  return parse_member(jsonData)
}


async function get_online() {
  try {
    const response = await fetch("/api/online");  
    const jsonData = await response.json();
    var online = [];

    for (let i = 0; i < jsonData.length; i++) {
      online.push(jsonData[i].username.toLowerCase());
    }

    return online
  } catch (error) {
    console.error(error)
  }
}

const throttle = (callback, time) => {
  if (throttleTimer) return;
  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};
