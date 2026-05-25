const body = document.querySelector("body");

const footer = document.createElement("footer");
footer.innerHTML = `<p>Copyright &copy; 2026 Gabriel Cuadra. All rights reserved.</p>`;
body.appendChild(footer);

let skills = ["JavaScript", "HTML", "CSS", "Python", "SQL", "Machine Learning", "Data Visualization"];

let skillsSection = document.getElementById("skills");
let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    let skillItem = document.createElement("li");
    skillItem.innerText = skills[i];
    skillsList.appendChild(skillItem);
}