const url = new URL(window.location.toLocaleString());
const sectionList = document.getElementsByClassName("section");

const nnRuler = "cool_tellow";
const nnCoRuler = "ColoradoCrusade";
const electionDate = "2025-6-30";

const memberList = ["Omtegu", "pupik923", "cool_tellow", "JoeTheDauntless", "black_frieza", "Jinx64_", "eldiego", "Gero06", "Spencer1019", "mrcreeperg4", "TiredToonz", "idan1503", "Wormzy333", "ColoradoCrusade", "spenten", "Geogaddiiii", "Austcd30", "MyNameIsRasheed", "MrSteam84", "TwoGoodFiveme", "ara2009", "Ransterr", "ItzFriez6312", "ArzoAblaze", "jssjsjjssj", "toiletteeth", "B8arn", "FredDerp", "Georgequank", "hunterg2i", "KarmaIsDepressed", "Mini", "ChilliChillt", "ServerLite", "proper_cat", "Master__Kief", "ItzBiblcle", "MrAss_asd", "Burningskull562", "se2p", "mindlord", "ItIsYeFish", "pivozavr2004", "latcyy", "LuckKir", "oggghrkwneh", "MiHoub", "David", "lkarch", "MegaByteX", "ScaryCowCow4", "Glanthrial", "Deskfan45", "nielubiecie321", "BoomFox_Official", "DrDews", "DrNubXP", "hagluciak19", "SavageUser", "Fireballiceball", "JakeRedstone", "kaiookk1", "My_ChairSlipped", "j63k", "jurckurc", "workingontrying", "KevinDurantgoat", "Creeperpaste", "Islando_Commando", "Migzotic", "Teasoup", "F8fnir", "JorgenMister", "isnikoda", "TrustedHawk1855", "Revivey", "BleonIlazi", "AgentTammy", "Losangelesquest", "jeorm", "CrafterSteve98", "ilikemacandcheez", "NotRawZach", "herrydicc", "Hendway", "Pugino", "TeeDoesStuff", "TomAndBon", "SJET_Inc", "Urogalo", "arrochista", "JakePaulcraft", "WetBed43", "grammarissue", "pappoy76", "BurgerMan_27", "ilhanerdem2015", "BashurverseMC", "Batteryacids", "freddyw", "Acid0verl0ad", "CerealBoiz", "Q_QIndustries", "minerkat2011", "Capital3", "Assult_penguin", "NexSol", "DrWild", "nnnnn", "Jerry_juju", "hanxing", "Juasonxd", "Mikey_herobrine", "FluffyFoxFae", "Karmatical0", "ItsMxt", "Yen45", "Olat", "FredMCGamer", "capitanatomico", "DanielRobert15", "Hefeng_Song", "Leozero_", "MyGmail", "SkyNotBlue", "eldiegoat", "huntermkk", "ItsVollx", "sonictank1", "Miyazaki", "Beanzo0", "VolxyzMC", "tvoreal", "sushi_king86", "KAMILE33", "pascal_machet", "barton1357TF2", "Yungyoungin1", "kleeorg", "SnailRibs", "yourstruly71", "Csorroflegma", "ahhhhhhhh1587", "Lofeee", "mmakart", "adebuilder", "Jetteriter", "mud4dum", "Jesper2011", "GREENAPPLE", "guinea_pig_doody", "CreeperX200", "AudemusJura", "cutekttn", "bartur4", "Feruxia", "Kurzov", "MONKEYMAN346776", "breadcool", "Zaku1626", "keyboardan", "tetunnel", "ItTommy22Toad", "FulgencioBatista", "inoxisane", "q0iat", "Levinder", "aidenjamesmcl"];

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var splitCookies = decodedCookie.split(';');
  for(var i = 0; i < splitCookies.length; i++) {
    let cookie = splitCookies[i];
    while (cookie.charAt(0) == ' ') {
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

function switchSection(sectionName, button) {
  var i, navButton;
  for (i = 0; i < sectionList.length; i++) {
    sectionList[i].style.display = "none";
  }

  navButton = document.getElementsByClassName("navButton");
  for (i = 0; i < navButton.length; i++) {
    navButton[i].style.backgroundColor = "black";
    navButton[i].style.color = "white";
  }
  
  document.title = button.innerHTML;
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

function loadMemberList() {
  for (let member = 0; member < memberList.length; member++) {
    const memberListItem = document.createElement("p");
    memberListItem.innerHTML = memberList[member];

    document.getElementById("memberCount").innerHTML = "Member List: " + memberList.length
    document.getElementById("memberList").appendChild(memberListItem);
  }
}

function onPageLoad() {
  if (url.searchParams.has("section")) {
    console.log("URL parameter found, forcing section to \"" + url.searchParams.get("section") + "\"");
    document.getElementById(url.searchParams.get("section") + "Button").click();
  } else if (getCookie("section") === "") {
    console.log("A wild user appears! Defaulting to first section, \"" + sectionList[0].id + "\"")
    document.getElementById(sectionList[0].id + "Button").click();
  } else {
    console.log("Section cookie found, restoring section to \"" + getCookie("section") + "\"");
    document.getElementById(getCookie("section") + "Button").click();
  }

  loadRulersAndElectionCountdown()
  loadMemberList()
}
