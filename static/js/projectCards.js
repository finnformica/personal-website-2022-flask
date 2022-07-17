document.addEventListener('DOMContentLoaded', () => {

  const projectCards = document.getElementsByClassName("project-card");

  const colours = ["#E13E18", "#D8E118", "#2CE118", "#1865E1", "#E1189E", "#7718E1", "#18E1B1"];
  const lighterColours = ["#E76446", "#E0E746", "#56E746", "#4685E7", "#E746B2", "#9246E7", "#46E7C0"]

  for (let i = 0; i < projectCards.length; i++) {

    projectCards[i].style.backgroundColor = lighterColours[i % 7]

    projectCards[i].addEventListener("click", () => {
      // do something when project card is clicked
    })
  }
})
