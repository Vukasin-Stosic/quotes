let percents = document.querySelectorAll(".votes");

// making author's name uppercase
let authors = document.querySelectorAll(".author");
authors.forEach(function (author) {
  let authorUpper = author.innerText.toUpperCase();
  author.innerText = "- " + authorUpper;
});

// calculating rating percentage
function calcRating(percent) {
  let upVote = percent.querySelector(".up");
  let downVote = percent.querySelector(".down");
  upVote = parseInt(upVote.innerText);
  downVote = parseInt(downVote.innerText);
  let res = (upVote / (upVote + downVote)) * 100;
  res = Math.floor(res);

  percent.querySelector(".percentage").innerText = res;
}
percents.forEach(calcRating);

// coloring

function coloring(percent) {
  let color = percent.querySelector("p");
  let number = percent.querySelector("span");
  number = number.innerText;

  if (number < 25) {
    color.className = "red";
  } else if (number < 50) {
    color.className = "orange";
  } else if (number < 70) {
    color.className = "yellow";
  } else if (number < 90) {
    color.className = "greenyellow";
  } else {
    color.className = "green";
  }
}
percents.forEach(coloring);

// voting
let votes = document.querySelectorAll("button");

function voting(event) {
  const button = event.currentTarget;
  const wrap = button.closest(".votes");
  const up = wrap.querySelector(".up");
  const down = wrap.querySelector(".down");
  const i = button.querySelector(".fa-solid");
  const btn_up = wrap.querySelector("button");
  const btn_down = wrap.querySelector("button:last-of-type");

  if (
    button.classList.contains("clicked") &&
    i.classList.contains("fa-caret-up")
  ) {
    button.classList.remove("clicked");
    up.innerText = parseInt(up.innerText) - 1;
    btn_down.removeAttribute("disabled");
  } else if (
    button.classList.contains("clicked") &&
    i.classList.contains("fa-caret-down")
  ) {
    button.classList.remove("clicked");
    down.innerText = parseInt(down.innerText) - 1;
    btn_up.removeAttribute("disabled");
  } else if (i.classList.contains("fa-caret-up")) {
    button.classList.add("clicked");
    up.innerText = parseInt(up.innerText) + 1;
    btn_down.setAttribute("disabled", "true");
  } else {
    button.classList.add("clicked");
    down.innerText = parseInt(down.innerText) + 1;
    btn_up.setAttribute("disabled", "true");
  }
  //recalulating percentage
  percents.forEach(calcRating);
  //recoloring
  percents.forEach(coloring);
}
votes.forEach(function (vote) {
  vote.addEventListener("click", voting);
});
