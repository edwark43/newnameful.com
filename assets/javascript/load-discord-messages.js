const cardIncrease = 10;

var announcementsCardLimit;
var announcementsCurrentIndex = 0;

var newnamefulnewsnoticeCardLimit;
var newnamefulnewsnoticeCurrentIndex = 0;

var throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;
  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

function createCardFromDiscordMessage(index, json, jsonName, addMessageContent, addAttachments, attachmentLinkOrEmbed) {
  let messageContainer = document.createElement("div");
  let messageAuthorAvatar = document.createElement("img");
  let messageTitle = document.createElement("p");
  let messageDate = new Date(json.messages[index].timestamp);
  let messageLine = document.createElement("hr");

  messageContainer.className = "card";
  messageContainer.id = jsonName + "-" + index;
  messageAuthorAvatar.className = "message-author-avatar";
  messageAuthorAvatar.src = "/assets/json/" + jsonName + "/" + json.messages[index].author.avatarUrl;
  messageTitle.style = "margin-top: 5px;"
  messageTitle.innerHTML = "<span style='color: " + json.messages[index].author.color + ";'>" + json.messages[index].author.nickname + "</span>" + " | " + messageDate.toLocaleDateString();

  document.getElementById(jsonName).append(messageContainer);
  document.getElementById(messageContainer.id).append(messageAuthorAvatar, messageTitle, messageLine);

  if (addMessageContent == true) {
    let messageContent = document.createElement("p");

    messageContent.innerText = json.messages[index].content;

    document.getElementById(messageContainer.id).append(messageContent);
  }

  if (addAttachments == true) {
    let messageAttachment;
    for (let attachment = 0; attachment < json.messages[index].attachments.length; attachment++) {
      if (attachmentLinkOrEmbed === "link") {
        messageAttachment = document.createElement("a");
            
        messageAttachment.href = "/assets/json/" + jsonName + json.messages[index].attachments[attachment].url;
        messageAttachment.innerText = json.messages[index].attachments[attachment].fileName;
      } else if (attachmentLinkOrEmbed === "embed") {
        messageAttachment = document.createElement("img");

        messageAttachment.src = "/assets/json/" + jsonName + "/" + json.messages[index].attachments[attachment].url;

        document.getElementById(messageContainer.id).append(messageAttachment);
      }
      messageAttachment.className = "message-attachment";

      document.getElementById(messageContainer.id).append(messageAttachment);
    }
  }
}

async function addDiscordCards(cardIndex, jsonName, addMessageContent, addAttachments, attachmentLinkOrEmbed) {
  const response = await fetch("/assets/json/" + jsonName + "/" + jsonName + ".json");  
  const jsonData = await response.json();
  jsonData.messages.reverse();

  window[currentPage + "CardLimit"] = jsonData.messages.length;
  window[currentPage + "CurrentIndex"]  =  cardIndex
  window[currentPage + "EndIndex"] = window[currentPage + "CurrentIndex"] == window[currentPage + "CardLimit"] ? window[currentPage + "CardLimit"] : window[currentPage + "CurrentIndex"] + cardIncrease;


  for (let i = window[currentPage + "CurrentIndex"]; i < window[currentPage + "EndIndex"]; i++) {
    createCardFromDiscordMessage(i, jsonData, jsonName, addMessageContent, addAttachments, attachmentLinkOrEmbed);
    console.log("Added card " + i)
  }
  console.log(window[currentPage + "CurrentIndex"] + " " + window[currentPage + "CardLimit"]);
};

function handleInfiniteScroll() {
  throttle(() => {
    const endOfPage = Math.ceil(window.innerHeight + window.pageYOffset + 10) >= document.body.offsetHeight;
    console.log(endOfPage)
    if (endOfPage && currentPage === "newnamefulnewsnotice") {
      console.log("Adding cards")
      addDiscordCards(window[currentPage + "CurrentIndex"] + cardIncrease, "newnamefulnewsnotice", false, true, "embed")
    }
    if (window[currentPage + "CurrentIndex"] + cardIncrease === window[currentPage + "CardLimit"]) {
      console.log("Removing Handler")
      removeInfiniteScroll(handleInfiniteScroll);
    }
  }, 1500);
}

function removeInfiniteScroll(name) {
  window.removeEventListener("scroll", name);
  console.log("removed " + name)
}
