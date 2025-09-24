const cardIncrease = 10;

var cardLimit;
var currentIndex = 0;

var throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;
  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

function createNewsCard(index, json) {
  let messageContainer = document.createElement("div");
  let messageAuthorContainer = document.createElement("div");
  let messageAuthorAvatar = document.createElement("img");
  let messageTitle = document.createElement("p");
  let messageDate = new Date(json.newsNotice.messages[index].timestamp);
  let messageLine = document.createElement("hr");


  messageContainer.className = "card";
  messageAuthorContainer.className = "message-author";
  messageAuthorAvatar.className = "message-author-avatar";
  messageAuthorAvatar.src = json.newsNotice.messages[index].author.avatarUrl;
  messageTitle.className = "message-title"
  messageTitle.innerHTML = json.newsNotice.messages[index].author.nickname + " (" + messageDate.toLocaleDateString() + ")";

  messageAuthorContainer.append(messageAuthorAvatar, messageTitle)
  messageContainer.append(messageAuthorContainer, messageLine);

  for (let attachment = 0; attachment < json.newsNotice.messages[index].attachments.length; attachment++) {
    let messageAttachment = document.createElement("img");

    messageAttachment.src = json.newsNotice.messages[index].attachments[attachment].url;
    messageAttachment.className = "message-attachment";

    messageContainer.append(messageAttachment);
  }

  document.getElementById("newsnotice").append(messageContainer);
}

async function addNewsCards(cardIndex) {
  const response = await fetch("https://newnameful.com/api/data");  
  const json = await response.json();
  json.newsNotice.messages.reverse();

  cardLimit = json.newsNotice.messages.length;
  currentIndex  =  cardIndex
  endIndex = currentIndex == cardLimit ? cardLimit : currentIndex + cardIncrease;


  for (let i = currentIndex; i < endIndex; i++) {
    createNewsCard(i, json);
  }
};

function handleInfiniteScroll() {
  throttle(() => {
    const endOfPage = Math.ceil(window.innerHeight + window.pageYOffset + 10) >= document.body.offsetHeight;
    if (endOfPage && currentPage === "newsnotice") {
      addNewsCards(currentIndex + cardIncrease, "newsnotice")
    }
    if (currentIndex + cardIncrease === cardLimit) {
      removeInfiniteScroll(handleInfiniteScroll);
    }
  }, 1500);
}

function removeInfiniteScroll(name) {
  window.removeEventListener("scroll", name);
}
