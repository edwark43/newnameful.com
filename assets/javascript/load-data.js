const pages = ["info", "leadership", "elections", "constitution", "memberlist", "newsnotice"];
var loaded = [];

async function info_load() {
  const response = await fetch("https://newnameful.com/api/splash");  
  const jsonData = await response.json();

  document.getElementById("splash").innerHTML = jsonData;
}

async function leadership_load() {
  const response = await fetch("https://newnameful.com/api/data");  
  const jsonData = await response.json();

  let leaders = jsonData.leadership.leaders

  for (let i = 0; i < leaders.length; i++) {
    let leader = await fetch_member(leaders[i].username)
    append_before(query_ele("#leadership"),
      document.getElementsByClassName("loader")[pages.indexOf("leadership") - 1],
      append(ele("div", {className: "card leader"}),
        ele("p", {innerText: leaders[i].title}),
        ele("hr", {}),
        ele("div", {className: "leader-name"}),
        ele("img", {className: "leader-render", src: "https://newnameful.com/api/skin/armor/body/" + leaders[i].username})
      )
    )
    for (let j = 0; j < leader["sections"].length; j++) {
      append(document.getElementsByClassName("leader-name")[i],
        ele("p", {innerText: leader["sections"][j], className: "leader-section " + "and" + leader["codes"][j].charAt(1)}),
      )
    }
  }
  document.getElementsByClassName("loader")[pages.indexOf("leadership") - 1].style.display = "none";
}

async function elections_load() {
  const response = await fetch("https://newnameful.com/api/data");
  const jsonData = await response.json();

  let pastElections = jsonData.election.pastElections
  let countdown = Math.ceil(calculate_countdown(jsonData.election.electionDate))

  append_before(query_ele("#elections"),
    document.getElementsByClassName("loader")[pages.indexOf("elections") - 1],
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
      append(document.getElementsByClassName("candidates")[i],
        append(ele("div", {className: "candidate", style: "background: linear-gradient(to right, #6a6a6a 0%, #6a6a6a " + Math.round(pastElections[i].candidates[j].percentage) + "%, #3c3c3c " + Math.round(pastElections[i].candidates[j].percentage) + "%, #3c3c3c 100%);", }),
          ele("img", {src: pastElections[i].candidates[j].avatar, className: "candidate-avatar"}),
          ele("p", {innerText: pastElections[i].candidates[j].candidate, className: "candidate-title"}),
          ele("p", {innerText: pastElections[i].candidates[j].voters + (pastElections[i].candidates[j].voters == "1" ? ' vote ' :' votes ') + Math.round(pastElections[i].candidates[j].percentage) + "%", className: "candidate-voters"})
        )
      )
    }
  }
  document.getElementsByClassName("loader")[pages.indexOf("elections") - 1].style.display = "none";
}

async function constitution_load() {
  const response = await fetch("https://newnameful.com/api/data");
  const jsonData = await response.json();

  let sections = jsonData.constitution.sections

  for (let i = 0; i < sections.length; i++) {
    append_before(query_ele("#constitution"),
      document.getElementsByClassName("loader")[pages.indexOf("constitution") - 1],
      append(ele("div", {className: "card"}),
        ele("p", {innerText: sections[i].title}),
        ele("hr", {}),
        ele("p", {innerText: sections[i].preamble}),
        ele("div", {className: "amendments"}),
      )
    )
    for (let j = 0; j < sections[i].amendments.length; j++) {
      append(document.getElementsByClassName("amendments")[i],
        ele("p", {innerText: j + 1 + ") " + sections[i].amendments[j].amendment}),
      )
    }
  }
  document.getElementsByClassName("loader")[pages.indexOf("constitution") - 1].style.display = "none";
}

async function memberlist_load() {
  const response = await fetch("https://newnameful.com/api/data/member-list");
  const responseNicked = await fetch("https://newnameful.com/api/data/member-list/nicked");
  const jsonData = await response.json();
  const jsonDataNicked = await responseNicked.json();

  let members = jsonData.members
  let membersNicked = jsonDataNicked.members
  let online = await get_online()

  append_before(query_ele("#memberlist"),
    document.getElementsByClassName("loader")[pages.indexOf("memberlist") - 1],
    append(ele("div", {className: "card member-list"}),
      ele("p", {innerText: "Member Count: " + members.length}),
      ele("hr", {}),
      ele("div", {id: "members"}),
    )
  )

  for (let i = 0; i < members.length; i++) {
    let member = parse_member(membersNicked[i].nickname)

    append(query_ele("#members"),
      ele("div", {className: "member"}),
    )
    if (online.indexOf(members[i].username.toLowerCase()) !== -1) {
      append(document.getElementsByClassName("member")[i],
        ele("span", {className: "online-icon"}),
      )
    }
    for (let j = 0; j < member["sections"].length; j++) {
      append(document.getElementsByClassName("member")[i],
        ele("p", {innerText: member["sections"][j], className: "member-section " + "and" + member["codes"][j].charAt(1)}),
      )
    }
  }
  document.getElementsByClassName("loader")[pages.indexOf("memberlist") - 1].style.display = "none";
}
