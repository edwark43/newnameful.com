function switch_page(button) {
  let pageName = button.id.split("-")[0]
  
  for (let page = 0; page < query_all(".page").length; page++) {
    query_all(".page")[page].style.display = "none";
  }

  let navButtons = query_all(".nav-button");
  for (let navButton = 0; navButton < navButtons.length; navButton++) {
    navButtons[navButton].style.backgroundColor = "black";
    navButtons[navButton].style.color = "white";
  }

  history.pushState(null, "", "/" + pageName);
  
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
  if (pages.includes(window.location.pathname.substr(1).replace("-", ""))) {
    query_ele("#" + window.location.pathname.substr(1).replace("-", "") + "-button").click();
  } else if (get_cookie("page") === "") {
    query_ele("#" + query_ele(".page").id + "-button").click();
  } else {
    query_ele("#" + get_cookie("page") + "-button").click();
  }
}

window.addEventListener("popstate", function (event) {
  if (pages.includes(window.location.pathname.substr(1).replace("-", ""))) {
    switch_page(window.location.pathname.substr(1).replace("-", ""), query_ele("#" + window.location.pathname.substr(1).replace("-", "") + "-button"), false);
  }
});
