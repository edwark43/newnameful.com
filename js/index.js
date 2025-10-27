const pages = ["info", "leadership", "elections", "constitution", "memberlist", "newsnotice"];
var loaded = [];
const cardIncrease = 10;
var cardLimit;
var currentIndex = 0;
var endIndex;

$(function() {
  if (pages.includes(window.location.pathname.substr(1).replace("-", ""))) {
    query_ele("#" + window.location.pathname.substr(1).replace("-", "") + "-button").click();
  } else if (get_cookie("page") === "") {
    query_ele("#" + query_ele(".page").id + "-button").click();
  } else {
    query_ele("#" + get_cookie("page") + "-button").click();
  }
});


function switch_page(button, load) {
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
      load();
    }
  }
}

window.addEventListener("popstate", function (event) {
  if (pages.includes(window.location.pathname.substr(1).replace("-", ""))) {
    switch_page(window.location.pathname.substr(1).replace("-", ""), query_ele("#" + window.location.pathname.substr(1).replace("-", "") + "-button"), false);
  }
});

async function info_load() {
  const response = await fetch("/api/splash");  
  const jsonData = await response.json();

  append_before(query_ele("#info"),
    query_ele("#info-introduction"),
    append(ele("div", {className: "tilt"}),
      ele("div", {id: "splash", className: "pop", innerHTML: jsonData.splash})
    )
  );
}

async function leadership_load() {
  const response = await fetch("/api/leadership");  
  const responseNicked = await fetch("/api/leadership/nicked");  
  const leaders = await response.json();
  const leadersNicked = await responseNicked.json();

  for (let i = 0; i < leaders.length; i++) {
    if (leaders[i].username == "N/A") {
      continue
    } else {
      let leader = await parse_member(leadersNicked[i].username)
      append_before(query_ele("#leadership"),
        query_all(".loader")[pages.indexOf("leadership") - 1],
        append(ele("div", {className: "card leader"}),
          ele("p", {innerText: leaders[i].title}),
          ele("hr", {}),
          ele("div", {className: "leader-name"}),
          ele("img", {className: "leader-render", src: "/api/render/armored/bust/" + leaders[i].username})
        )
      )
      for (let j = 0; j < leader["sections"].length; j++) {
        append(query_all(".leader-name")[i],
          ele("p", {innerText: leader["sections"][j], className: "leader-section " + "and" + leader["codes"][j].charAt(1)}),
        )
      }
    }
  }
  query_all(".loader")[pages.indexOf("leadership") - 1].style.display = "none";
}

async function elections_load() {
  let response = await fetch("/api/elections");
  let jsonData = await response.json();

  let pastElections = jsonData.past_elections
  let countdown = Math.ceil(calculate_countdown(jsonData.election_date))

  append_before(query_ele("#elections"),
    query_all(".loader")[pages.indexOf("elections") - 1],
    ele("p", {innerText: ((countdown - 7 <= 0) ? "The election will end in " + countdown + " days!" : "The next election starts in " + (countdown - 7) + " days!")}),
    ele("h4", {innerText: "Past Elections"})
  );

  pastElections.reverse()

  for (let i = 0; i < pastElections.length; i++) {
    append_before(query_ele("#elections"),
      query_all(".loader")[pages.indexOf("elections") - 1],
      append(ele("div", {className: "card"}),
        ele("p", {innerText: pastElections[i].question + " (" + pastElections[i].date + ")"}),
        ele("hr", {}),
        ele("div", {className: "candidates"}),
        ele("p", {innerText: "Winner:"}),
        append(ele("div", {className: "candidate", style: "background: linear-gradient(to right, #6a6a6a 0%, #6a6a6a " + Math.round(pastElections[i].winner.percentage) + "%, #3c3c3c " + Math.round(pastElections[i].winner.percentage) + "%, #3c3c3c 100%);"}),
          ele("img", {src: pastElections[i].winner.avatar, className: "candidate-avatar"}),
          ele("p", {innerText: pastElections[i].winner.candidate, className: "candidate-title"}),
          ele("p", {innerText: pastElections[i].winner.voters + (pastElections[i].winner.voters == "1" ? ' vote ' :' votes ') + Math.round(pastElections[i].winner.percentage) + "%", className: "candidate-voters"})
        )
      )
    )
    for (let j = 0; j < pastElections[i].candidates.length; j++) {
      append(query_all(".candidates")[i],
        append(ele("div", {className: "candidate", style: "background: linear-gradient(to right, #6a6a6a 0%, #6a6a6a " + Math.round(pastElections[i].candidates[j].percentage) + "%, #3c3c3c " + Math.round(pastElections[i].candidates[j].percentage) + "%, #3c3c3c 100%);"}),
          ele("img", {src: pastElections[i].candidates[j].avatar, className: "candidate-avatar"}),
          ele("p", {innerText: pastElections[i].candidates[j].candidate, className: "candidate-title"}),
          ele("p", {innerText: pastElections[i].candidates[j].voters + (pastElections[i].candidates[j].voters == "1" ? ' vote ' :' votes ') + Math.round(pastElections[i].candidates[j].percentage) + "%", className: "candidate-voters"})
        )
      )
    }
  }

  response = await fetch("/api/propaganda");
  jsonData = await response.json();

  append_before(query_ele("#elections"),
    query_all(".loader")[pages.indexOf("elections") - 1],
    ele("h4", {innerText: "Propaganda Gallery"}),
    ele("div", {id: "propaganda-grid"})
  );


  for (let i = 0; i < jsonData.length; i++) {
    append_before(query_ele("#elections"),
      query_all(".loader")[pages.indexOf("elections") - 1],
      append(query_ele("#propaganda-grid"),
        append(ele("div", {}),
          append(ele("a", {className: "propaganda", href: "/img/propaganda/" + jsonData[i]}),
            ele("img", {className: "thumb", src: "/img/propaganda/" + jsonData[i]})
          )
        ),
      )
    );
  }
  $('.propaganda').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });
  query_all(".loader")[pages.indexOf("elections") - 1].style.display = "none";
}

async function constitution_load() {
  const response = await fetch("/api/constitution");
  const sections = await response.json();

  for (let i = 0; i < sections.length; i++) {
    append_before(query_ele("#constitution"),
      query_all(".loader")[pages.indexOf("constitution") - 1],
      append(ele("div", {className: "card"}),
        ele("p", {innerText: sections[i].title}),
        ele("hr", {}),
        ele("p", {innerText: sections[i].preamble}),
        ele("div", {className: "amendments"}),
      )
    )
    for (let j = 0; j < sections[i].amendments.length; j++) {
      append(query_all(".amendments")[i],
        ele("p", {innerText: j + 1 + ") " + sections[i].amendments[j].amendment}),
      )
    }
  }
  query_all(".loader")[pages.indexOf("constitution") - 1].style.display = "none";
}

async function member_list_load() {
  const response = await fetch("/api/member_list");
  const responseNicked = await fetch("/api/member_list/nicked");
  const members = await response.json();
  const membersNicked = await responseNicked.json();
  const online = await get_online()

  append_before(query_ele("#memberlist"),
    query_all(".loader")[pages.indexOf("memberlist") - 1],
    append(ele("div", {className: "card member-list"}),
      ele("p", {innerText: "Member Count: " + membersNicked.length}),
      ele("hr", {}),
      ele("div", {id: "members"}),
    )
  )

  for (let i = 0; i < membersNicked.length; i++) {
    let member = parse_member(membersNicked[i].username)

    append(query_ele("#members"),
      ele("div", {className: "member"}),
    )
    try {
      if (online.indexOf(members[i].username.toLowerCase()) !== -1) {
        append(query_all(".member")[i],
          ele("span", {className: "online-icon"}),
        )
      }
    } catch (error) {}
    for (let j = 0; j < member["sections"].length; j++) {
      append(query_all(".member")[i],
        ele("p", {innerText: member["sections"][j], className: "member-section " + "and" + member["codes"][j].charAt(1)}),
      )
    }
  }
  query_all(".loader")[pages.indexOf("memberlist") - 1].style.display = "none";
}

function news_notice_load() {
  add_news_cards(currentIndex);
  window.addEventListener("scroll", handle_infinite_scroll);
}

async function add_news_cards(cardIndex) {
  const response = await fetch("/api/news_notice");
  const messages = await response.json();

  messages.reverse()

  cardLimit = messages.length;
  currentIndex  =  cardIndex
  endIndex = currentIndex == cardLimit ? cardLimit : currentIndex + cardIncrease;

  for (let i = currentIndex; i < endIndex; i++) {
    if (i < messages.length) {
      let messageDate = new Date(messages[i].timestamp);
      append_before(query_ele("#newsnotice"),
        query_all(".loader")[pages.indexOf("newsnotice") - 1],
        append(ele("div", {className: "card issue"}),
          append(ele("div", {}),
            ele("img", {src: messages[i].author.avatar_url, className: "message-author-avatar"}),
            ele("p", {innerText: messages[i].author.nickname + " (" + messageDate.toLocaleDateString() + ")", className: "message-title"}),
          ),
          ele("hr", {}),
        )
      )
      for (let j = 0; j < messages[i].attachments.length; j++) {
        append(query_all(".issue")[i],
          append(ele("a", {className: "issue-content", href: messages[i].attachments[j].url}),
            ele("img", {src: messages[i].attachments[j].url, className: "attachment"}),
          )
        )
      }
    } else {
      query_all(".loader")[pages.indexOf("newsnotice") - 1].style.display = "none";
    }
  }
  $('.issue-content').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });
};

function handle_infinite_scroll() {
  throttle(() => {
    const endOfPage = Math.ceil(window.innerHeight + window.pageYOffset + 10) >= document.body.offsetHeight;
    if (endOfPage && get_page() === "newsnotice") {
      add_news_cards(currentIndex + cardIncrease, "newsnotice")
    }
    if (currentIndex + cardIncrease === cardLimit) {
      removeInfiniteScroll();
      query_all(".loader")[pages.indexOf("newsnotice") - 1].style.display = "none";
    }
  }, 1500);
}

function removeInfiniteScroll() {
  window.removeEventListener("scroll", handle_infinite_scroll);
}
