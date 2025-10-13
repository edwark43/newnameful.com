const cardIncrease = 10;

var cardLimit;
var currentIndex = 0;
var endIndex;

async function add_news_cards(cardIndex) {
  try {
    const response = await fetch("https://newnameful.com/api/data");  
    const jsonData = await response.json();
    let messages = jsonData.newsNotice.messages;

    jsonData.newsNotice.messages.reverse()

    cardLimit = jsonData.newsNotice.messages.length;
    currentIndex  =  cardIndex
    endIndex = currentIndex == cardLimit ? cardLimit : currentIndex + cardIncrease;


    for (let i = currentIndex; i < endIndex; i++) {
      let messageDate = new Date(messages[i].timestamp);

      append_before(query_ele("#newsnotice"),
        document.getElementsByClassName("loader")[pages.indexOf("newsnotice") - 1],
        append(ele("div", {className: "card issue"}),
          append(ele("div", {}),
            ele("img", {src: messages[i].author.avatarUrl, className: "message-author-avatar"}),
            ele("p", {innerText: messages[i].author.nickname + " (" + messageDate.toLocaleDateString() + ")", className: "message-title"}),
          ),
          ele("hr", {}),
        )
      )
      for (let j = 0; j < messages[i].attachments.length; j++) {
        append(document.getElementsByClassName("issue")[i],
          ele("img", {src: messages[i].attachments[j].url, className: "message-attachment"}),
        )
      }
    }
  } catch (error) {
    removeInfiniteScroll();
    document.getElementsByClassName("loader")[pages.indexOf("newsnotice") - 1].style.display = "none";
  }
};

function handle_infinite_scroll() {
  throttle(() => {
    const endOfPage = Math.ceil(window.innerHeight + window.pageYOffset + 10) >= document.body.offsetHeight;
    if (endOfPage && get_page() === "newsnotice") {
      add_news_cards(currentIndex + cardIncrease, "newsnotice")
    }
    if (currentIndex + cardIncrease === cardLimit) {
      removeInfiniteScroll();
      document.getElementsByClassName("loader")[pages.indexOf("newsnotice") - 1].style.display = "none";
    }
  }, 1500);
}

function newsnotice_load() {
  add_news_cards(currentIndex);
  window.addEventListener("scroll", handle_infinite_scroll);
}

function removeInfiniteScroll() {
  window.removeEventListener("scroll", handle_infinite_scroll);
}
