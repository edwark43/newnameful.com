const cardIncrease = 10;

var newsnoticeCardLimit;
var newsnoticeCurrentIndex = 0;

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
  let messageAuthorContainer = document.createElement("div");
  let messageAuthorAvatar = document.createElement("img");
  let messageTitle = document.createElement("p");
  let messageDate = new Date(json.newsNotice.messages[index].timestamp);
  let messageLine = document.createElement("hr");

  messageContainer.className = "card";
  messageContainer.id = jsonName + "-" + index;
  messageAuthorContainer.id = jsonName + "-" + index + "-author";
  messageAuthorContainer.className = "message-author";
  messageAuthorAvatar.className = "message-author-avatar";
  messageAuthorAvatar.src = json.newsNotice.messages[index].author.avatarUrl;
  messageTitle.className = "message-title"
  messageTitle.innerHTML = json.newsNotice.messages[index].author.nickname + " (" + messageDate.toLocaleDateString() + ")";

  document.getElementById(jsonName).append(messageContainer);
  document.getElementById(messageContainer.id).append(messageAuthorContainer, messageLine);
  document.getElementById(messageAuthorContainer.id).append(messageAuthorAvatar, messageTitle)

  if (addMessageContent == true) {
    let messageContent = document.createElement("p");

    messageContent.innerText = json.newsNotice.messages[index].content;

    document.getElementById(messageContainer.id).append(messageContent);
  }

  if (addAttachments == true) {
    let messageAttachment;
    for (let attachment = 0; attachment < json.newsNotice.messages[index].attachments.length; attachment++) {
      if (attachmentLinkOrEmbed === "link") {
        messageAttachment = document.createElement("a");
            
        messageAttachment.href = json.newsNotice.messages[index].attachments[attachment].url;
        messageAttachment.innerText = json.newsNotice.messages[index].attachments[attachment].fileName;
      } else if (attachmentLinkOrEmbed === "embed") {
        messageAttachment = document.createElement("img");

        messageAttachment.src = json.newsNotice.messages[index].attachments[attachment].url;

        document.getElementById(messageContainer.id).append(messageAttachment);
      }
      messageAttachment.className = "message-attachment";

      document.getElementById(messageContainer.id).append(messageAttachment);
    }
  }
}

async function addDiscordCards(cardIndex, jsonName, addMessageContent, addAttachments, attachmentLinkOrEmbed) {
  const response = await fetch("https://newnameful.com/api/data");  
  const jsonData = await response.json();
  jsonData.newsNotice.messages.reverse();

  window[currentPage + "CardLimit"] = jsonData.newsNotice.messages.length;
  window[currentPage + "CurrentIndex"]  =  cardIndex
  window[currentPage + "EndIndex"] = window[currentPage + "CurrentIndex"] == window[currentPage + "CardLimit"] ? window[currentPage + "CardLimit"] : window[currentPage + "CurrentIndex"] + cardIncrease;


  for (let i = window[currentPage + "CurrentIndex"]; i < window[currentPage + "EndIndex"]; i++) {
    createCardFromDiscordMessage(i, jsonData, jsonName, addMessageContent, addAttachments, attachmentLinkOrEmbed);
  }
};

function handleInfiniteScroll() {
  throttle(() => {
    const endOfPage = Math.ceil(window.innerHeight + window.pageYOffset + 10) >= document.body.offsetHeight;
    if (endOfPage && currentPage === "newsnotice") {
      addDiscordCards(window[currentPage + "CurrentIndex"] + cardIncrease, "newsnotice", false, true, "embed")
    }
    if (window[currentPage + "CurrentIndex"] + cardIncrease === window[currentPage + "CardLimit"]) {
      removeInfiniteScroll(handleInfiniteScroll);
    }
  }, 1500);
}

function removeInfiniteScroll(name) {
  window.removeEventListener("scroll", name);
}
