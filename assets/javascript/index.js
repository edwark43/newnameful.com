const url = new URL(window.location.toLocaleString());
const pageList = document.getElementsByClassName("page");
const loaded = []

const nnRuler = "cool_tellow";
const nnCoRuler = "ColoradoCrusade";
const electionDate = "June 30 2025";

const constitutionSections = ["MAIN", "DISTRICTS", "DISCORD"];
const constitutionPreambles = ["To be followed by every leader of New Nameful. Breaking of this constitution can and will result in expulsion of ownership. In such an event, ownership will be given to a co-owner. If no line of command exists, elections will once more be held. The constitution may be amended and changed if each amendment / change gets a 70% “yae” approval on a poll conducted in the Nameful Discord. Any poll conducted by the ruler is not to be answered by the Ruler aside from an Electoral poll."];
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

const memberList = ["<span class='&b'>Om<span class='&5'>te<span class='&7'>gu</span></span></span>", "pupik923", "<span class='&6'>Tellow</span>", "JoeTheDauntless", "black_frieza", "Jinx64_", "<span class='&9'>el<span class='&e'>diego</span></span>", "Gero06", "Spencer1019", "mrcreeperg4", "<span class='&6'>Tired<span class='&5'>Toonz</span></span>", "idan1503", "<span class='&d'>Wormzy<span class='&5'>333</span></span>", "<span class='&1'>Colorado<span class='&4'>Crusade</span></span>", "spenten", "Geogaddiiii", "Austcd30", "MyNameIsRasheed", "MrSteam84", "TwoGoodFiveme", "ara2009", "Ransterr", "ItzFriez6312", "ArzoAblaze", "jssjsjjssj", "toiletteeth", "B8arn", "FredDerp", "Georgequank", "hunterg2i", "<span class='&1'>Karma<span class='&9'>Is<span class='&3'>D<span class='&8'>epressed</span></span></span></span>", "Mini", "ChilliChillt", "ServerLite", "proper_cat", "Master__Kief", "ItzBiblcle", "MrAss_asd", "Burningskull562", "se2p", "mindlord", "ItIsYeFish", "pivozavr2004", "latcyy", "LuckKir", "oggghrkwneh", "MiHoub", "David", "<span class='&b'>lkarch</span>", "MegaByteX", "ScaryCowCow4", "Glanthrial", "Deskfan45", "nielubiecie321", "BoomFox_Official", "DrDews", "DrNubXP", "hagluciak19", "<span class='&8'>SavageUser</span>", "Fireballiceball", "JakeRedstone", "kaiookk1", "My_ChairSlipped", "j63k", "<span class='color:&f'>jurc<span class='&e'>kurc</span></span>", "workingontrying", "KevinDurantgoat", "Creeperpaste", "Islando_Commando", "Migzotic", "Teasoup", "F8fnir", "JorgenMister", "isnikoda", "TrustedHawk1855", "<span class='&4'>Re<span class='&6'>viv<span class='&4'>ey</span></span></span>", "BleonIlazi", "AgentTammy", "Losangelesquest", "jeorm", "CrafterSteve98", "ilikemacandcheez", "NotRawZach", "herrydicc", "Hendway", "Pugino", "TeeDoesStuff", "TomAndBon", "SJET_Inc", "Urogalo", "arrochista", "JakePaulcraft", "WetBed43", "grammarissue", "pappoy76", "BurgerMan_27", "ilhanerdem2015", "BashurverseMC", "Batteryacids", "freddyw", "Acid0verl0ad", "CerealBoiz", "Q_QIndustries", "minerkat2011", "Capital3", "Assult_penguin", "NexSol", "DrWild", "nnnnn", "Jerry_juju", "hanxing", "Juasonxd", "Mikey_herobrine", "FluffyFoxFae", "Karmatical0", "ItsMxt", "Yen45", "Olat", "FredMCGamer", "capitanatomico", "DanielRobert15", "Hefeng_Song", "Leozero_", "MyGmail", "SkyNotBlue", "<span class='&9'>el<span class='&e'>diegoat</span></span>", "huntermkk", "<span class='&b'>Its<span class='&a'>Vollx</span></span>", "sonictank1", "Miyazaki", "Beanzo0", "VolxyzMC", "tvoreal", "sushi_king86", "KAMILE33", "pascal_machet", "barton1357TF2", "Yungyoungin1", "kleeorg", "SnailRibs", "<span class='&4'>yours<span class='&5'>truly<span class='&6'>71</span></span></span>", "Csorroflegma", "ahhhhhhhh1587", "Lofeee", "mmakart", "adebuilder", "Jetteriter", "mud4dum", "Jesper2011", "GREENAPPLE", "<span class='&4'>guinea_<span class='&1'>rat</span></span>", "CreeperX200", "<span class='&6'>audemusjura</span>", "cutekttn", "bartur4", "Feruxia", "Kurzov", "MONKEYMAN346776", "breadcool", "Zaku1626", "<span class='&3'>keyboardan</span>", "tetunnel", "ItTommy22Toad", "<span class='&a'>Fulgencio</span>", "inoxisane", "q0iat", "<span class='&2'>Levinder</span>", "aidenjamesmcl", "BastianSeb", "Nathan20093420", "Cowcreeper", "Gow_", "charlie_keogh", "non_oggi", "Bartur4", "CookiezWithCream"];

const colorCodes = ["&0", "&1", "&2", "&3", "&4", "&5", "&6", "&7", "&8", "&9", "&a", "&b", "&c", "&d", "&e", "&f"]
const colorCodeColors = ["#000000", "#0000AA", "#00AA00", "#00AAAA", "#AA0000", "#AA00AA", "#FFAA00", "#AAAAAA", "#555555", "#5555FF", "#55FF55", "#55FFFF", "#FF5555", "#FF55FF", "#FFFF55", "#FFFFFF"]

let splashes = ["Totally not rigged!!!", "New Lameful", "What's Uptown?", nnRuler + " approves!", "♫I've been workin' on the railroad♫", "Also visit CalvinTown", "Also visit IkeaLand", "Also visit Matsunoki", "Also visit MillField", "Also visit Jurcgrad", "Also visit Spawn 2025", "Brought to you by the NNNNNNNNNN", "<b><i>Dig the Cube</i></b>", "Featured Players: " + keyboardanTroll() + " and " + keyboardanTroll(), "Urban Sprawl!", "Invest in WormzyCoin!", "New and Improved!", "Omtegu!", "do /pay new_nameful 20 for good luck", "my asshole hurts", "The most extravagant group project", "That damn cube…", "what the nameful", "Vote Karma!", "Cobble ceiling has been removed.", "railroad fetish", "ColoradoCrusade!", "MississipiMuslim!!", "PennsylvaniaPacifist!", "Haiiiii Lkarchhhh :3", "23% approved!", "67% approved!", "71% approved!", "Now updated to 1.21.5", "hardly know her", "Praise be thine", "Beware the NBP", "/lmk NewNameful", "Coded by Lkarch", "Just one more rail line…", "I think I get why they call it Minecraft", "Why isn’t there a New Nameful 2?", "The townsfolk get a little quirky at night.", "/pay keyboardan 100", "Cube 3 coming soon!", "\"Mildly funny splash text here\"", "Also try Old Nameful"];

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
  return daysDifference;
}


function keyboardanTroll(force) {
  if (force == true | Math.floor(Math.random() * 1000) == 1) {
    return randomizeUser;
  }
  else {
    return randomizeUser();
  }
}

function randomizeUser() {
  let randomUser = memberList[Math.floor(Math.random() * memberList.length)];
  return randomUser;
}

function processColorCodes() {
  for (let colorCode = 0; colorCode < colorCodes.length; colorCode++) {
    for (let colorCodeClass = 0; colorCodeClass < document.getElementsByClassName(colorCodes[colorCode]).length; colorCodeClass++) {
      document.getElementsByClassName(colorCodes[colorCode])[colorCodeClass].style = "color: " + colorCodeColors[colorCode] + ";"
    }
  }
  console.log("Processed color codes!")
}

function loadDiscordMessagesFromJson(jsonName, addMessageContent, addAttachments, attachmentLinkOrEmbed) {
  fetch("/assets/json/" + jsonName + "/" + jsonName + ".json")
  .then(response => response.json())
  .then(json => {
    json.messages.reverse();
    for (let message = 0; message < json.messages.length; message++) {
      let messageContainer = document.createElement("div");
      let messageAuthorAvatar = document.createElement("img");
      let messageTitle = document.createElement("p");
      let messageDate = new Date(json.messages[message].timestamp);
      let messageLine = document.createElement("hr");

      messageContainer.className = "card";
      messageContainer.id = jsonName + "-" + message;
      messageAuthorAvatar.className = "message-author-avatar";
      messageAuthorAvatar.src = "/assets/json/" + jsonName + "/" + json.messages[message].author.avatarUrl;
      messageTitle.style = "margin-top: 5px;"
      messageTitle.innerHTML = "<span style='color: " + json.messages[message].author.color + ";'>" + json.messages[message].author.nickname + "</span>" + " | " + messageDate.toLocaleDateString();

      document.getElementById(jsonName).append(messageContainer);
      document.getElementById(messageContainer.id).append(messageAuthorAvatar, messageTitle, messageLine);

      if (addMessageContent == true) {
        let messageContent = document.createElement("p");

        messageContent.innerText = json.messages[message].content;

        document.getElementById(messageContainer.id).append(messageContent);
      }

      if (addAttachments == true) {
        let messageAttachment;
        for (let attachment = 0; attachment < json.messages[message].attachments.length; attachment++) {
          if (attachmentLinkOrEmbed === "link") {
            messageAttachment = document.createElement("a");
            
            messageAttachment.href = "/assets/json/" + jsonName + json.messages[message].attachments[attachment].url;
            messageAttachment.innerText = json.messages[message].attachments[attachment].fileName;
            
          } else if (attachmentLinkOrEmbed === "embed") {
            messageAttachment = document.createElement("img");

            messageAttachment.src = "/assets/json/" + jsonName + "/" + json.messages[message].attachments[attachment].url;

            document.getElementById(messageContainer.id).append(messageAttachment);
          }
          messageAttachment.className = "message-attachment";
          document.getElementById(messageContainer.id).append(messageAttachment);
        }
      }
    }
  });
}

function switchPage(pageName, button) {
  for (let page = 0; page < pageList.length; page++) {
    pageList[page].style.display = "none";
  }

  let navButtons = document.getElementsByClassName("nav-button");
  for (let navButton = 0; navButton < navButtons.length; navButton++) {
    navButtons[navButton].style.backgroundColor = "black";
    navButtons[navButton].style.color = "white";
  }
  
  document.title = button.innerText;
  document.cookie = "page=" + pageName;

  document.getElementById(pageName).style.display = "block";

  button.style.backgroundColor = "white";
  button.style.color = "black";

  for (let page = 0; page <= loaded.length; page++) {
    if (! loaded.includes(pageName)) {
      loaded.push(pageName);
      window[pageName + "Load"]();
    }
  }
}

function infoLoad() {
  randomizeSplash();
}

function electionLoad() {
  console.log("Ruler found: \"" + nnRuler + "\"");
  document.getElementById("ruler").innerText = nnRuler;
  document.getElementById("ruler-attachment").src = "https://minotar.net/armor/body/" + nnRuler + "/100.png";

  console.log("Co-ruler found: \"" + nnCoRuler + "\"");
  document.getElementById("co-ruler").innerText = nnCoRuler;
  document.getElementById("co-ruler-attachment").src = "https://minotar.net/armor/body/" + nnCoRuler + "/100.png";

  console.log("Next election occurs in " + calculateCountdown(electionDate) + " days");


  if (Math.ceil(calculateCountdown(electionDate)) <= 0) {
    document.getElementById("election-countdown").innerText = "The next election is RIGHT NOW!!!";
  } else {
    document.getElementById("election-countdown").innerText = "The next election is in " + Math.ceil(calculateCountdown(electionDate)) + " days!";
  }
}

function randomizeSplash() {
  let randomSplash = splashes[Math.floor(Math.random() * splashes.length)];
  console.log("Splash randomized to \"" + randomSplash +"\"");

  document.getElementById("splash").innerHTML = randomSplash;
}

function constitutionLoad() {
  for (let constitutionSection = 0; constitutionSection < constitutionSections.length; constitutionSection++) {
    let constitutionSectionName = constitutionSections[constitutionSection].toLowerCase();
    let constitutionSectionContainer = document.createElement("div");
    let constitutionSectionTitle = document.createElement("p");
    let constitutionLine = document.createElement("hr");

    constitutionSectionContainer.className = "card";
    constitutionSectionContainer.id = constitutionSectionName + "-constitution-section";
    constitutionSectionTitle.innerText = constitutionSections[constitutionSection];

    document.getElementById("constitution").append(constitutionSectionContainer);
    document.getElementById(constitutionSectionContainer.id).append(constitutionSectionTitle,constitutionLine);

    if (typeof (constitutionPreambles[constitutionSection]) !== "undefined") {
      let sectionPreamble = document.createElement("div");

      sectionPreamble.id = constitutionSectionName + "-preamble";
      sectionPreamble.innerText = constitutionPreambles[constitutionSection];

      document.getElementById(constitutionSectionContainer.id).append(sectionPreamble);
    }

    for (let amendment = 0; amendment < constitutionAmendments[constitutionSection].length; amendment++) {
      let amendmentContent = document.createElement("p");

      amendmentContent.class = "amendment";
      amendmentContent.id = constitutionSections[constitutionSection].toLowerCase() + "-amendment-" + amendment;
      amendmentContent.innerText = amendment + 1 + ") " + constitutionAmendments[constitutionSection][amendment];


      document.getElementById(constitutionSectionContainer.id).append(amendmentContent);
    }
  }
}

function membersLoad() {
  for (let member = 0; member < memberList.length; member++) {
    let memberListItem = document.createElement("p");
    memberListItem.innerHTML = memberList[member];

    document.getElementById("member-count").innerText = "Member Count: " + memberList.length;
    document.getElementById("member-list").append(memberListItem);
  }
  processColorCodes();
}

function announcementsLoad() {
  loadDiscordMessagesFromJson("announcements", true, true, "embed");
}

function newnamefulnewsnoticeLoad() {
  loadDiscordMessagesFromJson("newnamefulnewsnotice", false, true, "embed");
}

function onPageLoad() {
  if (url.searchParams.has("page")) {
    console.log("URL parameter found, forcing page to \"" + url.searchParams.get("page") + "\"");
    document.getElementById(url.searchParams.get("page") + "-button").click();
  } else if (getCookie("page") === "") {
    console.log("A wild user appears! Defaulting to first page, \"" + pageList[0].id + "\"");
    document.getElementById(pageList[0].id + "-button").click();
  } else {
    console.log("Page cookie found, restoring page to \"" + getCookie("page") + "\"");
    document.getElementById(getCookie("page") + "-button").click();
  }

  // electionLoad();
  // constitutionLoad();
  // membersLoad();
  // announcementsLoad();
  // newnamefulnewsnoticeLoad();
}

function loadArchive() {
  for (let archive = 0; archive < 3; archive++) {
    let archiveAttachment = document.createElement("img");


    archiveAttachment.className = "archive-attachment";
    archiveAttachment.src = "/archive/archive-" + archive;

    document.body.append(archiveAttachment);
  }
}
