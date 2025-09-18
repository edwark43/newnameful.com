function createCard(page, index, style) {
  let card = document.createElement("div");
  let cardTitle = document.createElement("div");
  let cardLine = document.createElement("hr");
  let cardContent = document.createElement("div")

  card.className = "card";
  card.id = page + "-" + index;
  card.style = style
  cardTitle.id = page + "Title-" + index;
  cardContent.id = page + "Content-" + index;

  document.getElementById(page.replace("-", "")).append(card);
  document.getElementById(card.id).append(cardTitle, cardLine, cardContent);
}

async function leadershipLoad() {
  const response = await fetch("https://newnameful.com/api/data");  
  const jsonData = await response.json();

  let leadership = jsonData.leadership

  for (let govPosition = 0; govPosition < leadership.leaders.length; govPosition++) {
    window["position-" + govPosition] = document.createElement("p")
    window["username-" + govPosition] = document.createElement("p")
    window["avatar-" + govPosition] = document.createElement("img")
    
    window["position-" + govPosition].innerText = leadership.leaders[govPosition].title
    window["username-" + govPosition].innerText = leadership.leaders[govPosition].username
    window["avatar-" + govPosition].src = "https://newnameful.com/api/skin/armor/body/" + leadership.leaders[govPosition].username

    createCard("leadership", govPosition, "height: 340px;width: 370px;")

    document.getElementById("leadershipTitle-" + govPosition).append(window["position-" + govPosition]);
    document.getElementById("leadershipContent-" + govPosition).append(window["username-" + govPosition], window["avatar-" + govPosition]);
  }


}

async function electionsLoad() {
  const response = await fetch("https://newnameful.com/api/data");  
  const jsonData = await response.json();

  let election = jsonData.election;

  let countdown = document.createElement("p")
  // let activeElection = document.createElement("h4")
  let pastElections = document.createElement("h4")
  // window["candidates-0"] = document.createElement("div")

  if (Math.ceil(calculateCountdown(election.electionDate)) <= 0) {
    countdown.innerText = "The election will end in " + Math.ceil(calculateCountdown(election.electionDate)) + " days!";
  } else {
    countdown.innerText = "The next election starts in " + Math.ceil(calculateCountdown(election.electionDate)-7) + " days!";
  }

  pastElections.innerText = "Past Elections"

  // if (election.activeElection != "N/A") {
  //   let activeElectionTitle = document.createElement("p")
  //
  //   activeElection.innerText = "Active Election"
  //   activeElectionTitle.innerText = election.activeElection.question + " | " + election.activeElection.date
  //   window["candidates-0"].id = "candidates-0"
  //
  //   document.getElementById("elections").append(activeElection);
  //   createCard("elections", 0, "")
  //   document.getElementById("electionTitle-0").append(activeElectionTitle);
  //   document.getElementById("electionContent-0").append(window["candidates-0"]);
  //
  //   for (let candidate = 0; candidate < election.activeElection.candidates.length; candidate++) {
  //     window["candidates-0-" + candidate] = document.createElement("div")
  //     window["candidates-0-" + candidate + "-avatar"] = document.createElement("img")
  //     window["candidates-0-" + candidate + "-title"] = document.createElement("p")
  //     window["candidates-0-" + candidate + "-voters"] = document.createElement("p")
  //
  //     window["candidates-0-" + candidate].className = "candidate"
  //     window["candidates-0-" + candidate].id = "candidate-0-" + candidate
  //     window["candidates-0-" + candidate].style = "background: linear-gradient(to right, #6a6a6a 0%, #6a6a6a " + Math.round(election.activeElection.candidates[candidate].percentage) + "%, #3c3c3c " + Math.round(election.activeElection.candidates[candidate].percentage) + "%, #3c3c3c 100%);"
  //     window["candidates-0-" + candidate + "-avatar"].src = election.activeElection.candidates[candidate].avatar
  //     window["candidates-0-" + candidate + "-avatar"].className = "candidate-avatar"
  //     window["candidates-0-" + candidate + "-title"].innerText = election.activeElection.candidates[candidate].candidate
  //     window["candidates-0-" + candidate + "-title"].className = "candidate-title"
  //     window["candidates-0-" + candidate + "-voters"].innerText = election.activeElection.candidates[candidate].voters + (election.activeElection.candidates[candidate].voters == "1" ? ' vote ' :' votes ') + Math.round(election.activeElection.candidates[candidate].percentage) + "%"
  //     window["candidates-0-" + candidate + "-voters"].className = "candidate-voters"
  //
  //     document.getElementById(window["candidates-0"].id).append(window["candidates-0-" + candidate]);
  //     document.getElementById(window["candidates-0-" + candidate].id).append(window["candidates-0-" + candidate + "-avatar"], window["candidates-0-" + candidate + "-title"], window["candidates-0-" + candidate + "-voters"]);
  //   }
  // } else {
  //   activeElection.innerText = "No Currently Active Election"
  //   document.getElementById("elections").append(activeElection);
  // }

  document.getElementById("elections").append(countdown);
  document.getElementById("elections").append(pastElections);
  
  election.pastElections.reverse();

  for (let pastElection = 0; pastElection < election.pastElections.length; pastElection++) {
    window["pastElectionTitle-" + pastElection] = document.createElement("p")
    window["candidates-" + String(pastElection + 1)] = document.createElement("div")
    window["winnerLabel-" + pastElection] = document.createElement("p")

    window["pastElectionTitle-" + pastElection].innerText = election.pastElections[pastElection].question + " | " + election.pastElections[pastElection].date
    window["candidates-" + String(pastElection + 1)].id = "candidates-" + String(pastElection + 1)
    window["winnerLabel-" + pastElection].innerText = "Winner:"

    createCard("elections", pastElection+1, "")

    document.getElementById("electionsTitle-" + String(pastElection + 1)).append(window["pastElectionTitle-" + pastElection]);
    document.getElementById("electionsContent-" + String(pastElection + 1)).append(window["candidates-" + String(pastElection + 1)], window["winnerLabel-" + pastElection]);

    for (let candidate = 0; candidate < election.pastElections[pastElection].candidates.length; candidate++) {
      window["candidates-" + String(pastElection + 1) + "-" + candidate] = document.createElement("div")
      window["candidates-" + String(pastElection + 1) + "-" + candidate + "-avatar"] = document.createElement("img")
      window["candidates-" + String(pastElection + 1) + "-" + candidate + "-title"] = document.createElement("p")
      window["candidates-" + String(pastElection + 1) + "-" + candidate + "-voters"] = document.createElement("p")

      window["candidates-" + String(pastElection + 1) + "-" + candidate].className = "candidate"
      window["candidates-" + String(pastElection + 1) + "-" + candidate].id = "candidate-" + String(pastElection + 1) + "-" + candidate
      window["candidates-" + String(pastElection + 1) + "-" + candidate].style = "background: linear-gradient(to right, #6a6a6a 0%, #6a6a6a " + Math.round(election.pastElections[pastElection].candidates[candidate].percentage) + "%, #3c3c3c " + Math.round(election.pastElections[pastElection].candidates[candidate].percentage) + "%, #3c3c3c 100%);"
      window["candidates-" + String(pastElection + 1) + "-" + candidate + "-avatar"].src = election.pastElections[pastElection].candidates[candidate].avatar
      window["candidates-" + String(pastElection + 1) + "-" + candidate + "-avatar"].className = "candidate-avatar"
      window["candidates-" + String(pastElection + 1) + "-" + candidate + "-title"].innerText = election.pastElections[pastElection].candidates[candidate].candidate
      window["candidates-" + String(pastElection + 1) + "-" + candidate + "-title"].className = "candidate-title"
      window["candidates-" + String(pastElection + 1) + "-" + candidate + "-voters"].innerText = election.pastElections[pastElection].candidates[candidate].voters + (election.pastElections[pastElection].candidates[candidate].voters == "1" ? ' vote ' :' votes ') + Math.round(election.pastElections[pastElection].candidates[candidate].percentage) + "%"
      window["candidates-" + String(pastElection + 1) + "-" + candidate + "-voters"].className = "candidate-voters"

      document.getElementById(window["candidates-" + String(pastElection + 1)].id).append(window["candidates-" + String(pastElection + 1) + "-" + candidate]);
      document.getElementById(window["candidates-" + String(pastElection + 1) + "-" + candidate].id).append(window["candidates-" + String(pastElection + 1) + "-" + candidate + "-avatar"], window["candidates-" + String(pastElection + 1) + "-" + candidate + "-title"], window["candidates-" + String(pastElection + 1) + "-" + candidate + "-voters"]);
    }
    window["winnerCandidate-" + pastElection] = document.createElement("div")
    window["winnerCandidate-" + pastElection + "-avatar"] = document.createElement("img")
    window["winnerCandidate-" + pastElection + "-title"] = document.createElement("p")
    window["winnerCandidate-" + pastElection + "-voters"] = document.createElement("p")

    window["winnerCandidate-" + pastElection].className = "candidate"
    window["winnerCandidate-" + pastElection].id = "winnerCandidate- " + pastElection
    window["winnerCandidate-" + pastElection].style = "background: linear-gradient(to right, #6a6a6a 0%, #6a6a6a " + Math.round(election.pastElections[pastElection].winner.percentage) + "%, #3c3c3c " + Math.round(election.pastElections[pastElection].winner.percentage) + "%, #3c3c3c 100%);"
    window["winnerCandidate-" + pastElection + "-avatar"].src = election.pastElections[pastElection].winner.avatar
    window["winnerCandidate-" + pastElection + "-avatar"].className = "candidate-avatar"
    window["winnerCandidate-" + pastElection + "-title"].innerText = election.pastElections[pastElection].winner.candidate
    window["winnerCandidate-" + pastElection + "-title"].className = "candidate-title"
    window["winnerCandidate-" + pastElection + "-voters"].innerText = election.pastElections[pastElection].winner.voters + (election.pastElections[pastElection].winner.voters == "1" ? ' vote ' :' votes ') + Math.round(election.pastElections[pastElection].winner.percentage) + "%"
    window["winnerCandidate-" + pastElection + "-voters"].className = "candidate-voters"

    document.getElementById("electionsContent-" + String(pastElection + 1)).append(window["winnerCandidate-" + pastElection]);
    document.getElementById(window["winnerCandidate-" + pastElection].id).append(window["winnerCandidate-" + pastElection + "-avatar"], window["winnerCandidate-" + pastElection + "-title"], window["winnerCandidate-" + pastElection + "-voters"]);
  }
}

async function constitutionLoad() {
  const response = await fetch("https://newnameful.com/api/data");  
  const jsonData = await response.json();

  let constitution = jsonData.constitution

  for (let constitutionSection = 0; constitutionSection < constitution.sections.length; constitutionSection++) {
    window["title-" + constitutionSection] = document.createElement("p")
    window["preamble-" + constitutionSection] = document.createElement("p")
    window["amendments-" + constitutionSection] = document.createElement("div")
    
    window["title-" + constitutionSection].innerText = constitution.sections[constitutionSection].title
    window["preamble-" + constitutionSection].innerText = constitution.sections[constitutionSection].preamble
    window["amendments-" + constitutionSection].id = "amendments-" + constitutionSection
    window["amendments-" + constitutionSection].style = "text-align: left;"

    createCard("constitution", constitutionSection, "")

    document.getElementById("constitutionTitle-" + constitutionSection).append(window["title-" + constitutionSection]);
    document.getElementById("constitutionContent-" + constitutionSection).append(window["preamble-" + constitutionSection], window["amendments-" + constitutionSection]);

    for (let amendment = 0; amendment < constitution.sections[constitutionSection].amendments.length; amendment++) {
      window["amendment-" + constitutionSection + "-" + amendment] = document.createElement("p")

      window["amendment-" + constitutionSection + "-" + amendment].innerText = amendment + 1 + ") " + constitution.sections[constitutionSection].amendments[amendment].amendment

      document.getElementById("amendments-" + constitutionSection).append(window["amendment-" + constitutionSection + "-" + amendment]);
    }
  }
}

async function memberlistLoad() {
  const response = await fetch("https://newnameful.com/api/data");  
  const jsonData = await response.json();

  let memberList = jsonData.memberList
  let memberCount = document.createElement("p")

  memberCount.innerText = "Member Count: " + memberList.members.length

  createCard("memberlist", 0, "width: 370px;")

  document.getElementById("memberlistTitle-0").append(memberCount)

  for (let member = 0; member < memberList.members.length; member++) {
    window["member-" + member] = document.createElement("div")
    
    window["member-" + member].id = "member-" + member
    window["member-" + member].style = "width: fit-content; margin: auto;"

    document.getElementById("memberlistContent-0").append(window["member-" + member])

    for (let memberSection = 0; memberSection < memberList.members[member].username.length; memberSection++) {
      window["memberSection-" + member + "-" + "memberSection"] = document.createElement("p")

      window["memberSection-" + member + "-" + "memberSection"].style = "float: left;"
      window["memberSection-" + member + "-" + "memberSection"].className = "and" + memberList.members[member].colorCodes[memberSection].charAt(1)
      window["memberSection-" + member + "-" + "memberSection"].innerText = memberList.members[member].username[memberSection]

      document.getElementById("member-" + member).append(window["memberSection-" + member + "-" + "memberSection"])
    }
  }
}
