function get_cookie(cookieName) {
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

function switch_page(pageName, button, pushState) {
  for (let page = 0; page < document.getElementsByClassName("page").length; page++) {
    document.getElementsByClassName("page")[page].style.display = "none";
  }

  let navButtons = document.getElementsByClassName("nav-button");
  for (let navButton = 0; navButton < navButtons.length; navButton++) {
    navButtons[navButton].style.backgroundColor = "black";
    navButtons[navButton].style.color = "white";
  }

  if (pushState == true) {
    history.pushState(null, "", "/" + pageName);
  }
  
  document.title = "NN " + button.innerText;
  document.cookie = "page=" + pageName;

  query_ele("#" + pageName).style.display = "block";

  button.style.backgroundColor = "white";
  button.style.color = "black";

  for (let page = 0; page <= loaded.length; page++) {
    if (! loaded.includes(pageName)) {
      loaded.push(pageName);
      window[pageName.replace("-", "") + "_load"]();
    }
  }
}

function init() {
  if (pages.includes(window.location.href.split("/")[3].replace("-", ""))) {
    query_ele("#" + window.location.href.split("/")[3].replace("-", "") + "-button").click();
  } else if (get_cookie("page") === "") {
    query_ele("#" + query_ele(".page").id + "-button").click();
  } else {
    query_ele("#" + get_cookie("page") + "-button").click();
  }
}

window.addEventListener("popstate", function (event){
  if (pages.includes(window.location.href.split("/")[3].replace("-", ""))) {
    switch_page(window.location.href.split("/")[3].replace("-", ""), query_ele("#" + window.location.href.split("/")[3].replace("-", "") + "-button"), false);
  }
});
