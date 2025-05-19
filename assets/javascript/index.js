const nnRuler = "cool_tellow";
const nnCoRuler = "ColoradoCrusade";
const electionDate = "2025-6-30";

function calculateCountdown(endingDate) {
  let current = new Date();
  let end = new Date(endingDate);
  let timeDifference = end - current;
  let daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference;
}

function onPageLoad() {
  console.log(nnRuler);
  document.getElementById("ruler").innerText = nnRuler;
  document.getElementById("rulerImage").src = "https://minotar.net/armor/body/" + nnRuler + "/100.png";

  console.log(nnCoRuler);
  document.getElementById("coRuler").innerText = nnCoRuler;
  document.getElementById("coRulerImage").src = "https://minotar.net/armor/body/" + nnCoRuler + "/100.png";

  console.log(calculateCountdown(electionDate));


  if (Math.ceil(calculateCountdown(electionDate)) <= 0) {
    document.getElementById("electionCountdown").innerText = "The next election is RIGHT NOW!!!";
  } else {
    document.getElementById("electionCountdown").innerText = "The next election is in " + Math.ceil(calculateCountdown(electionDate)) + " days!";
  }
}
