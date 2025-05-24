const url = new URL(window.location.toLocaleString());
const sectionList = document.getElementsByClassName("section");

const nnRuler = "cool_tellow";
const nnCoRuler = "ColoradoCrusade";
const electionDate = "June 30 2025";

const splashes = ["Totally not rigged!!!", "New Lameful", "What's Uptown?", nnRuler + " approves!", "♫I've been workin' on the railroad♫", "Also visit CalvinTown", "Also visit IkeaLand", "Also visit Matsunoki", "Also visit MillField", "Also visit Jurcgrad", "Also visit Spawn 2025", "Brought to you by the NNNNNNNNNN", "<b><i>Dig the Cube</i></b>"];

const memberList = ["<span style='color:#55FFFF'>Om<span style='color:#AA00AA'>te<span style='color:#AAAAAA'>gu</span></span></span>", "pupik923", "<span style='color:#FFAA00'>Tellow</span>", "JoeTheDauntless", "black_frieza", "Jinx64_", "<span style='color:#5555FF'>el<span style='color:#FFFF55'>diego</span></span>", "Gero06", "Spencer1019", "mrcreeperg4", "<span style='color:#FFAA00'>Tired<span style='color:#AA00AA'>Toonz</span></span>", "idan1503", "<span style='color:#FF55FF'>Wormzy<span style='color:#AA00AA'>333</span></span>", "<span style='color:#0000AA'>Colorado<span style='color:#AA0000'>Crusade</span></span>", "spenten", "Geogaddiiii", "Austcd30", "MyNameIsRasheed", "MrSteam84", "TwoGoodFiveme", "ara2009", "Ransterr", "ItzFriez6312", "ArzoAblaze", "jssjsjjssj", "toiletteeth", "B8arn", "FredDerp", "Georgequank", "hunterg2i", "<span style='color:#0000AA'>Karma<span style='color:#5555FF'>Is<span style='color:#00AAAA'>D<span style='color:#555555'>epressed</span></span></span></span>", "Mini", "ChilliChillt", "ServerLite", "proper_cat", "Master__Kief", "ItzBiblcle", "MrAss_asd", "Burningskull562", "se2p", "mindlord", "ItIsYeFish", "pivozavr2004", "latcyy", "LuckKir", "oggghrkwneh", "MiHoub", "David", "<span style='color:#55FFFF'>lkarch</span>", "MegaByteX", "ScaryCowCow4", "Glanthrial", "Deskfan45", "nielubiecie321", "BoomFox_Official", "DrDews", "DrNubXP", "hagluciak19", "<span style='color:#555555'>SavageUser</span>", "Fireballiceball", "JakeRedstone", "kaiookk1", "My_ChairSlipped", "j63k", "<span style='color:#FFFFFF'>jurc<span style='color:#FFFF55'>kurc</span></span>", "workingontrying", "KevinDurantgoat", "Creeperpaste", "Islando_Commando", "Migzotic", "Teasoup", "F8fnir", "JorgenMister", "isnikoda", "TrustedHawk1855", "<span style='color:#AA0000'>Re<span style='color:#FFAA00'>viv<span style='color:#AA0000'>ey</span></span></span>", "BleonIlazi", "AgentTammy", "Losangelesquest", "jeorm", "CrafterSteve98", "ilikemacandcheez", "NotRawZach", "herrydicc", "Hendway", "Pugino", "TeeDoesStuff", "TomAndBon", "SJET_Inc", "Urogalo", "arrochista", "JakePaulcraft", "WetBed43", "grammarissue", "pappoy76", "BurgerMan_27", "ilhanerdem2015", "BashurverseMC", "Batteryacids", "freddyw", "Acid0verl0ad", "CerealBoiz", "Q_QIndustries", "minerkat2011", "Capital3", "Assult_penguin", "NexSol", "DrWild", "nnnnn", "Jerry_juju", "hanxing", "Juasonxd", "Mikey_herobrine", "FluffyFoxFae", "Karmatical0", "ItsMxt", "Yen45", "Olat", "FredMCGamer", "capitanatomico", "DanielRobert15", "Hefeng_Song", "Leozero_", "MyGmail", "SkyNotBlue", "<span style='color:#5555FF'>el<span style='color:#FFFF55'>diegoat</span></span>", "huntermkk", "<span style='color:#55FFFF'>Its<span style='color:#55FF55'>Vollx</span></span>", "sonictank1", "Miyazaki", "Beanzo0", "VolxyzMC", "tvoreal", "sushi_king86", "KAMILE33", "pascal_machet", "barton1357TF2", "Yungyoungin1", "kleeorg", "SnailRibs", "<span style='color:#AA0000'>yours<span style='color:#AA00AA'>truly<span style='color:#FFAA00'>71</span></span></span>", "Csorroflegma", "ahhhhhhhh1587", "Lofeee", "mmakart", "adebuilder", "Jetteriter", "mud4dum", "Jesper2011", "GREENAPPLE", "<span style='color:#AA0000'>guinea_<span style='color:#0000AA'>rat</span></span>", "CreeperX200", "<span style='color:#FFAA00'>audemusjura</span>", "cutekttn", "bartur4", "Feruxia", "Kurzov", "MONKEYMAN346776", "breadcool", "Zaku1626", "<span style='color:#00AAAA'>keyboardan</span>", "tetunnel", "ItTommy22Toad", "<span style='color:#55FF55'>Fulgencio</span>", "inoxisane", "q0iat", "<span style='color:#00AA00'>Levinder</span>", "aidenjamesmcl", "BastianSeb", "Nathan20093420", "Cowcreeper", "Gow_", "charlie_keogh", "non_oggi", "Bartur4", "CookiezWithCream"];

/* Black        &0 #000000
	 Dark Blue    &1 #0000AA
	 Dark Green   &2 #00AA00
	 Dark Aqua    &3 #00AAAA
	 Dark Red     &4 #AA0000
	 Dark Purple  &5 #AA00AA
	 Gold         &6 #FFAA00
	 Gray         &7 #AAAAAA
	 Dark Gray    &8 #555555
	 Blue         &9 #5555FF
	 Green        &a #55FF55
	 Aqua         &b #55FFFF
	 Red          &c #FF5555
	 Light Purple &d #FF55FF
	 Yellow       &e #FFFF55
	 White        &f #FFFFFF */

const constitutionSections = ["MAIN", "DISTRICTS", "DISCORD"]
const constitutionPreambles = ["To be followed by every leader of New Nameful. Breaking of this constitution can and will result in expulsion of ownership. In such an event, ownership will be given to a co-owner. If no line of command exists, elections will once more be held. The constitution may be amended and changed if each amendment / change gets a 70% “yae” approval on a poll conducted in the Nameful Discord. Any poll conducted by the ruler is not to be answered by the Ruler aside from an Electoral poll."]
const constitutionAmendments = [
  [
    "A term is 2 months long. Approval ratings run 1 month into a term. A player is good to rule for at most 2 terms in a row before they must take a mandatory offterm. Once an off term is taken, their slate is clean and the player may run again with the same limitation as listed before.",
    "New Nameful is its own identity, and cannot be conglomerated into any other town or nation. Membership status with the United Cities is to be maintained.",
    "History is to be recorded to the best of the Ruler and their cabinets’ abilities. History is to be recorded in the New Nameful Museum, found in the Town Hall.",
    "Departments carry over into the next term, regardless of who the Ruler is. The ruler may create and delete Departments as well as hire and fire heads of departments. No department is to be without a head.",
    "Anyone may run for Ruler, and anyone may win. Unless serious, condemning evidence of fraud or other foul play is found, no one is to be denied their electoral victory and rulership status. Rulers may both vote in and endorse candidates in elections.",
    "The Co-Ruler has the same power of the Ruler, except they must achieve the permission of the Ruler for any major action or legislation.",
    "Legislation passed through a poll that is not an amendment can be decided upon by a majority vote if a leader decides. If said legislation is found to conflict with what is stated in the constitution, then it is put up to 70% yae."
  ],
  [
    "The Ruler must take control of the District Direct and check it appropriately.",
    "Any player may manage up to 4 districts",
    "The government may manage a district if there is no manager for said district.",
    "If a district has rules that differ from rules of greater New Nameful, they must be recorded down in an area that players may easily see.",
    "Districts may break from greater New Nameful. Decisions to break off are to be decided on a poll conducted by the Ruler. The poll must get 80% agreement for the district to break off. A district may not be sold off or bought."
  ],
  ["Every person who possesses moderation powers is only permitted to exercise disciplinary actions if a rule has been broken. Deleting a message, issuing a timeout, kicking, and banning for personal reasons in an attempt to censor someone without justification is unconstitutional and will be punished.", "The Ruler may not add mods to the discord without consulting the current mods and conducting a private poll with a majority vote.", "The Ruler may not remove mods from the discord without evidence of unconstitutional action and consulting the current mods."]
];


function getCookie(cookieName) {
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

function calculateCountdown(endingDate) {
  let current = new Date();
  let end = new Date(endingDate);
  let timeDifference = end - current;
  let daysDifference = timeDifference / (1000 * 3600 * 24);
  // console.log(current + " " + end + " " + timeDifference + " " + daysDifference);
  return daysDifference;
}

function switchSection(sectionName, button) {
  for (let i = 0; i < sectionList.length; i++) {
    sectionList[i].style.display = "none";
  }

  let navButton = document.getElementsByClassName("navButton");
  for (let i = 0; i < navButton.length; i++) {
    navButton[i].style.backgroundColor = "black";
    navButton[i].style.color = "white";
  }
  
  document.title = button.innerText;
  document.cookie = "section=" + sectionName;

  document.getElementById(sectionName).style.display = "block";

  button.style.backgroundColor = "white";
  button.style.color = "black";
}

function loadRulersAndElectionCountdown() {
  console.log("Ruler found: \"" + nnRuler + "\"");
  document.getElementById("ruler").innerText = nnRuler;
  document.getElementById("rulerImage").src = "https://minotar.net/armor/body/" + nnRuler + "/100.png";

  console.log("Co-ruler found: \"" + nnCoRuler + "\"");
  document.getElementById("coRuler").innerText = nnCoRuler;
  document.getElementById("coRulerImage").src = "https://minotar.net/armor/body/" + nnCoRuler + "/100.png";

  console.log("Next election occurs in " + calculateCountdown(electionDate) + " days");


  if (Math.ceil(calculateCountdown(electionDate)) <= 0) {
    document.getElementById("electionCountdown").innerText = "The next election is RIGHT NOW!!!";
  } else {
    document.getElementById("electionCountdown").innerText = "The next election is in " + Math.ceil(calculateCountdown(electionDate)) + " days!";
  }
}

function randomizeSplash() {
  let randomSplash = splashes[Math.floor(Math.random() * splashes.length)];
  console.log("Splash randomized to \"" + randomSplash +"\"");

  document.getElementById("splash").innerHTML = randomSplash;
}

function loadConstitution() {
  for (let constitutionSection = 0; constitutionSection < constitutionSections.length; constitutionSection++) {
    let constitutionSectionName = constitutionSections[constitutionSection].toLowerCase();
    let constitutionSectionContainer = document.createElement("div");
    let constitutionSectionTitle = document.createElement("p");
    let constitutionLine = document.createElement("hr");

    constitutionSectionContainer.className = "card";
    constitutionSectionContainer.id = constitutionSectionName + "ConstitutionSection";
    constitutionSectionTitle.innerText = constitutionSections[constitutionSection];

    document.getElementById("constitution").append(constitutionSectionContainer);
    document.getElementById(constitutionSectionContainer.id).append(constitutionSectionTitle,constitutionLine);

    if (typeof (constitutionPreambles[constitutionSection]) !== "undefined") {
      console.log((constitutionSections[constitutionSection] + "Amendments").length)
      let sectionPreamble = document.createElement("div");

      sectionPreamble.id = constitutionSectionName + "Preamble";
      sectionPreamble.innerText = constitutionPreambles[constitutionSection];

      document.getElementById(constitutionSectionContainer.id).append(sectionPreamble);
    }

    for (let amendment = 0; amendment < constitutionAmendments[constitutionSection].length; amendment++) {
      let amendmentContent = document.createElement("p");

      amendmentContent.class = "amendment";
      amendmentContent.id = constitutionSections[constitutionSection] + "Amendment" + amendment;
      amendmentContent.innerText = amendment + 1 + ") " + constitutionAmendments[constitutionSection][amendment];


      document.getElementById(constitutionSectionContainer.id).append(amendmentContent);
    }
  }
}

function loadMemberList() {
  for (let member = 0; member < memberList.length; member++) {
    let memberListItem = document.createElement("p");
    memberListItem.innerHTML = memberList[member];

    document.getElementById("memberCount").innerText = "Member Count: " + memberList.length;
    document.getElementById("memberList").append(memberListItem);
  }
}

function loadAnnouncments() {
  fetch("/assets/json/announcements/announcements.json")
  .then(response => response.json())
  .then(json => {
    json.messages.reverse();
    for (let message = 0; message < json.messages.length; message++) {
      let announcementContainer = document.createElement("div");
      let announcementTitle = document.createElement("p");
      let announcementDate = new Date(json.messages[message].timestamp);
      let announcementLine = document.createElement("hr");
      let announcementContent = document.createElement("p");

      announcementContainer.className = "card";
      announcementContainer.id = "announcement" + message;
      announcementTitle.innerText = json.messages[message].author.nickname + " | " + announcementDate.toLocaleDateString();
      announcementContent.innerText = json.messages[message].content;

      document.getElementById("announcements").append(announcementContainer);
      document.getElementById(announcementContainer.id).append(announcementTitle,announcementLine,announcementContent);

      for (let attachment = 0; attachment < json.messages[message].attachments.length; attachment++) {
        let announcementAttachment = document.createElement("a");

        announcementAttachment.className = "announcementImage";
        announcementAttachment.href = "/assets/json/announcements/" + json.messages[message].attachments[attachment].url;
        announcementAttachment.innerText = json.messages[message].attachments[attachment].url.replace("media/", "");

        document.getElementById(announcementContainer.id).append(announcementAttachment);
      }
    }
  });
}

function loadNews() {
  fetch("/assets/json/newnamefulnewsnotice/newnamefulnewsnotice.json")
  .then(response => response.json())
  .then(json => {
    json.messages.reverse();
    for (let message = 0; message < json.messages.length; message++) {
      if (json.messages[message].attachments.length > 0) {
        let newsContainer = document.createElement("div");
        let newsTitle = document.createElement("p");
        let newsDate = new Date(json.messages[message].timestamp);
        let newsLine = document.createElement("hr");

        newsContainer.className = "card";
        newsContainer.id = "post" + message;
        newsTitle.innerText = json.messages[message].author.nickname + " | " + newsDate.toLocaleDateString();

        document.getElementById("news").append(newsContainer);
        document.getElementById(newsContainer.id).append(newsTitle,newsLine);

        for (let attachment = 0; attachment < json.messages[message].attachments.length; attachment++) {
          let newsAttachment = document.createElement("img");

          newsAttachment.className = "newsImage";
          newsAttachment.src = "/assets/json/newnamefulnewsnotice/" + json.messages[message].attachments[attachment].url;

          document.getElementById(newsContainer.id).append(newsAttachment);
        }
      }
    }
  });
}

function onPageLoad() {
  if (url.searchParams.has("section")) {
    console.log("URL parameter found, forcing section to \"" + url.searchParams.get("section") + "\"");
    document.getElementById(url.searchParams.get("section") + "Button").click();
  } else if (getCookie("section") === "") {
    console.log("A wild user appears! Defaulting to first section, \"" + sectionList[0].id + "\"");
    document.getElementById(sectionList[0].id + "Button").click();
  } else {
    console.log("Section cookie found, restoring section to \"" + getCookie("section") + "\"");
    document.getElementById(getCookie("section") + "Button").click();
  }

  loadRulersAndElectionCountdown();
  randomizeSplash();
  loadConstitution();
  loadMemberList();
  loadAnnouncments();
  loadNews();
}
