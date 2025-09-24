function ele(tag, props = {}) {
  return Object.assign(document.createElement(tag), props);
}

function append(par, ...sibs) {
  return sibs.reduce((p, sib) => (p.appendChild(sib), p), par);
}

function queryEle(query) {
  return document.querySelector(query);
}

async function leadershipLoad() {
  const response = await fetch("https://newnameful.com/api/data");  
  const jsonData = await response.json();

  let leaders = jsonData.leadership.leaders

  for (let i = 0; i < leaders.length; i++) {
      append(queryEle("#leadership"),
        append(ele("div", {className: "card leader"}),
          ele("p", {innerText: leaders[i].title}),
          ele("hr", {}),
          ele("p", {innerText: leaders[i].username}),
          ele("img", {src: "https://newnameful.com/api/skin/armor/body/" + leaders[i].username})
        )
      )
  }
}

async function electionsLoad() {
  const response = await fetch("https://newnameful.com/api/data");
  const jsonData = await response.json();

  let pastElections = jsonData.election.pastElections
  let countdown = Math.ceil(calculateCountdown(jsonData.election.electionDate))

  append(queryEle("#elections"),
    ele("p", {innerText: ((countdown <= 0) ? "The election will end in " + countdown + " days!" : "The next election starts in " + (countdown - 7) + " days!")}),
    ele("h4", {innerText: "Past Elections"})
  );

  pastElections.reverse()

  for (let i = 0; i < pastElections.length; i++) {
    append(queryEle("#elections"),
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
}

async function constitutionLoad() {
  const response = await fetch("https://newnameful.com/api/data");
  const jsonData = await response.json();

  let sections = jsonData.constitution.sections

  for (let i = 0; i < sections.length; i++) {
    append(queryEle("#constitution"),
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
}

async function memberlistLoad() {
  const response = await fetch("https://newnameful.com/api/data");
  const jsonData = await response.json();

  let members = jsonData.memberList.members

  append(queryEle("#memberlist"),
    append(ele("div", {className: "card member-list"}),
      ele("p", {innerText: "Member Count: " + members.length}),
      ele("hr", {}),
      ele("div", {id: "members"}),
    )
  )

  for (let i = 0; i < members.length; i++) {
    append(queryEle("#members"),
      ele("div", {className: "member"}),
    )
    for (let j = 0; j < members[i].username.length; j++) {
      append(document.getElementsByClassName("member")[i],
        ele("p", {innerText: members[i].username[j], className: "member-section " + "and" + members[i].colorCodes[j].charAt(1)}),
      )
    }
  }
}
