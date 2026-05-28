let today = new Date();
let thisYear = today.getFullYear();


let footer = document.createElement("footer");
let body = document.querySelector("body");
body.appendChild(footer);
let footerElement = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = `&copy; ${thisYear} Gabriel Cuadra`;
footerElement.appendChild(copyright);





let skills = ["JavaScript", "HTML", "CSS", "Python", "SQL", "Machine Learning", "Data Visualization"];

let skillsSection = document.getElementById("skills");
let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    let skillItem = document.createElement("li");
    skillItem.innerText = skills[i];
    skillsList.appendChild(skillItem);
}