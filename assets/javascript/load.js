const pages = ["info", "leadership", "elections", "constitution", "memberlist", "newsnotice"];
var loaded = [];
const cardIncrease = 10;
var cardLimit;
var currentIndex = 0;
var endIndex;

async function info_load() {
  const response = await fetch("/api/splash");  
  const jsonData = await response.json();

  append_before(query_ele("#info"),
    query_ele("#info-introduction"),
    append(ele("div", {className: "tilt"}),
      ele("div", {id: "splash", className: "pop", innerHTML: jsonData})
    )
  );
}

async function leadership_load() {
  const response = await fetch("/api/data/leadership");  
  const jsonData = await response.json();

  let leaders = jsonData.leaders

  for (let i = 0; i < leaders.length; i++) {
    if (leaders[i].username == "N/A") {
      continue
    } else {
      let leader = await fetch_member(leaders[i].username)
      append_before(query_ele("#leadership"),
        query_all(".loader")[pages.indexOf("leadership") - 1],
        append(ele("div", {className: "card leader"}),
          ele("p", {innerText: leaders[i].title}),
          ele("hr", {}),
          ele("div", {className: "leader-name"}),
          ele("img", {className: "leader-render", src: "/api/skin/armor/bust/" + leaders[i].username})
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
  const response = await fetch("/api/data/election");
  const jsonData = await response.json();

  let pastElections = jsonData.past_elections
  let countdown = Math.ceil(calculate_countdown(jsonData.election_date))

  append_before(query_ele("#elections"),
    query_all(".loader")[pages.indexOf("elections") - 1],
    ele("p", {innerText: ((countdown <= 0) ? "The election will end in " + countdown + " days!" : "The next election starts in " + (countdown - 7) + " days!")}),
    ele("h4", {innerText: "Past Elections"})
  );

  pastElections.reverse()

  for (let i = 0; i < pastElections.length; i++) {
    append(query_ele("#elections"),
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
        append(ele("div", {className: "candidate", style: "background: linear-gradient(to right, #6a6a6a 0%, #6a6a6a " + Math.round(pastElections[i].candidates[j].percentage) + "%, #3c3c3c " + Math.round(pastElections[i].candidates[j].percentage) + "%, #3c3c3c 100%);", }),
          ele("img", {src: pastElections[i].candidates[j].avatar, className: "candidate-avatar"}),
          ele("p", {innerText: pastElections[i].candidates[j].candidate, className: "candidate-title"}),
          ele("p", {innerText: pastElections[i].candidates[j].voters + (pastElections[i].candidates[j].voters == "1" ? ' vote ' :' votes ') + Math.round(pastElections[i].candidates[j].percentage) + "%", className: "candidate-voters"})
        )
      )
    }
  }
  query_all(".loader")[pages.indexOf("elections") - 1].style.display = "none";
}

async function constitution_load() {
  const response = await fetch("/api/data/constitution");
  const jsonData = await response.json();

  let sections = jsonData.sections

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

async function memberlist_load() {
  const response = await fetch("/api/data/member_list");
  const responseNicked = await fetch("/api/data/member_list/nicked");
  const jsonData = await response.json();
  const jsonDataNicked = await responseNicked.json();

  let members = jsonData.members
  let membersNicked = jsonDataNicked.members
  let online = await get_online()

  append_before(query_ele("#memberlist"),
    query_all(".loader")[pages.indexOf("memberlist") - 1],
    append(ele("div", {className: "card member-list"}),
      ele("p", {innerText: "Member Count: " + members.length}),
      ele("hr", {}),
      ele("div", {id: "members"}),
    )
  )

  for (let i = 0; i < membersNicked.length; i++) {
    let member = parse_member(membersNicked[i].nickname)

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

function newsnotice_load() {
  add_news_cards(currentIndex);
  window.addEventListener("scroll", handle_infinite_scroll);
}

async function add_news_cards(cardIndex) {
  try {
    const response = await fetch("/api/data/news_notice");
    const jsonData = await response.json();
    let messages = jsonData.messages;

    jsonData.messages.reverse()

    cardLimit = messages.length;
    currentIndex  =  cardIndex
    endIndex = currentIndex == cardLimit ? cardLimit : currentIndex + cardIncrease;


    for (let i = currentIndex; i < endIndex; i++) {
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
          ele("img", {src: messages[i].attachments[j].url, className: "message-attachment"}),
        )
      }
    }
  } catch (error) {
    removeInfiniteScroll();
    query_all(".loader")[pages.indexOf("newsnotice") - 1].style.display = "none";
  }
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
