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

  document.getElementById(page).append(card);
  document.getElementById(card.id).append(cardTitle, cardLine, cardContent);
}

async function electionLoad() {
  const response = await fetch("/assets/json/data/data.json");  
  const jsonData = await response.json();

  let election = jsonData.election

  for (let govPosition = 0; govPosition < election.leaders.length; govPosition++) {
    window["position-" + govPosition] = document.createElement("p")
    window["username-" + govPosition] = document.createElement("p")
    window["avatar-" + govPosition] = document.createElement("img")
    
    window["position-" + govPosition].innerText = election.leaders[govPosition].title
    window["username-" + govPosition].innerText = election.leaders[govPosition].username
    window["avatar-" + govPosition].src = "https://minotar.net/armor/body/" + election.leaders[govPosition].username + "/100.png"

    createCard("election", govPosition, "height: 340px;width: 370px;")

    document.getElementById("electionTitle-" + govPosition).append(window["position-" + govPosition]);
    document.getElementById("electionContent-" + govPosition).append(window["username-" + govPosition], window["avatar-" + govPosition]);
  }

  let countdown = document.createElement("p")
  
  if (Math.ceil(calculateCountdown(electionDate)) <= 0) {
    countdown.innerText = "The next election is RIGHT NOW!!!";
  } else {
    countdown.innerText = "The next election is in " + Math.ceil(calculateCountdown(election.electionDate)) + " days!";
  }

  console.log("Next election occurs in " + calculateCountdown(electionDate) + " days");
  document.getElementById("election").append(countdown);

}

async function constitutionLoad() {
  const response = await fetch("/assets/json/data/data.json");  
  const jsonData = await response.json();

  let constitution = jsonData.constitution

  for (let constitutionSection = 0; constitutionSection < constitution.sections.length; constitutionSection++) {
    window["title-" + constitutionSection] = document.createElement("p")
    window["preamble-" + constitutionSection] = document.createElement("p")
    window["amendments-" + constitutionSection] = document.createElement("div")
    
    window["title-" + constitutionSection].innerText = constitution.sections[constitutionSection].title
    window["preamble-" + constitutionSection].innerText = constitution.sections[constitutionSection].preamble
    window["amendments-" + constitutionSection].id = "amendments-" + constitutionSection

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

async function membersLoad() {
  const response = await fetch("/assets/json/data/data.json");  
  const jsonData = await response.json();

  let memberList = jsonData.memberList
  let memberCount = document.createElement("p")

  memberCount.innerText = memberList.title + memberList.members.length

  createCard("members", "0", "width: 370px;")

  document.getElementById("membersTitle-0").append(memberCount)

  for (let member = 0; member < memberList.members.length; member++) {
    window["member-" + member] = document.createElement("div")

    window["member-" + member].id = "member-" + member
    window["member-" + member].style = "width: fit-content; margin: auto;"

    document.getElementById("membersContent-0").append(window["member-" + member])

    for (let memberSection = 0; memberSection < memberList.members[member].username.length; memberSection++) {
      window["memberSection-" + member + "-" + "memberSection"] = document.createElement("p")

      window["memberSection-" + member + "-" + "memberSection"].style = "float: left;"
      window["memberSection-" + member + "-" + "memberSection"].innerText = memberList.members[member].username[memberSection]

      document.getElementById("member-" + member).append(window["memberSection-" + member + "-" + "memberSection"])
    }
  }
}
