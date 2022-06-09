let deckId = "";
let score1 = 0;
let score2 = 0;
//get Deck ID
fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector("button").addEventListener("click", drawTwo);

function drawTwo() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
  //hide card image
  document.querySelector("#homePhoto").style.display = "none";
  document.querySelector("#player12").src = "";
  document.querySelector("#player13").src = "";
  document.querySelector("#player22").src = "";
  document.querySelector("#player23").src = "";

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);

      //check if you're at the end of the deck//
      if (data.remaining == 0) {
        document.querySelector("h3").innerText = "GAME OVER";
      }
      document.querySelector("#player1").src = data.cards[0].image;
      document.querySelector("#player2").src = data.cards[1].image;
      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);
      //check winner and score
      // document.querySelector('h3').innerText = '';
      if (player1Val > player2Val) {
        setTimeout(function () {
          document.querySelector("h3").innerText = "You Win!";
          score1 += 1;
          document.querySelector("#player1Score").innerText = `${score1}`;
          document.querySelector("#player2Score").innerText = `${score2}`;
        }, 500);
      } else if (player1Val < player2Val) {
        setTimeout(function () {
          document.querySelector("h3").innerText = "Computer Wins!";
          score2 += 1;
          document.querySelector("#player1Score").innerText = `${score1}`;
          document.querySelector("#player2Score").innerText = `${score2}`;
        }, 500);
      } else {
        document.querySelector("h3").innerText = "War!";
        setTimeout(function () {
          war(score1, score2);
        }, 2500);
      }
      return score1, score2;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function convertToNum(val) {
  if (val === "ACE") {
    return 14;
  } else if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else {
    return Number(val);
  }
}

function war(score1, score2) {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`;
  document.querySelector("h3").innerText = "";
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      document.querySelector("#player1").src = data.cards[0].image;
      document.querySelector("#player12").src = data.cards[1].image;
      document.querySelector("#player13").src = data.cards[2].image;
      document.querySelector("#player2").src = data.cards[3].image;
      document.querySelector("#player22").src = data.cards[4].image;
      document.querySelector("#player23").src = data.cards[5].image;
      let player1Val =
        Number(convertToNum(data.cards[0].value)) +
        Number(convertToNum(data.cards[1].value)) +
        Number(convertToNum(data.cards[2].value));
      let player2Val =
        Number(convertToNum(data.cards[3].value)) +
        Number(convertToNum(data.cards[4].value)) +
        Number(convertToNum(data.cards[5].value));
      console.log(player1Val, player2Val);
      if (player1Val > player2Val) {
        document.querySelector("h3").innerText = "You Win!";
        score1 += 3;
        document.querySelector("#player1Score").innerText = `${score1}`;
        document.querySelector("#player2Score").innerText = `${score2}`;
        setTimeout(function () {
          drawTwo(score1, score2);
        }, 1000);
      } else if (player1Val < player2Val) {
        document.querySelector("h3").innerText = "Computer Wins!";
        score2 += 3;
        document.querySelector("#player1Score").innerText = `${score1}`;
        document.querySelector("#player2Score").innerText = `${score2}`;
        setTimeout(function () {
          drawTwo(score1, score2);
        }, 1000);
      } else {
        document.querySelector("h3").innerText = "War!";
        setTimeout(function () {
          war(score1, score2);
        }, 2500);
      }
      // return score1, score2
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  return score1, score2;
}
