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

let messageForm = document.getElementById("leave-message");
messageForm.addEventListener("submit", function(event) {
    
    event.preventDefault();

    let Name = event.target.elements.usersName.value;
    let Email = event.target.elements.usersEmail.value;
    let Message = event.target.elements.usersMessage.value;

    console.log("Name:", Name);
    console.log("Email:", Email);
    console.log("Message:", Message);

    let messageSection = document.getElementById("messages");
    let messageList = messageSection.querySelector("ul");
    
    let newMessage = document.createElement("li");

    newMessage.innerHTML = "<a href='mailto:" + Email +"'>" + Name + "</a><span> wrote: " + Message + "</span>";

    
    let removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function() {
        let entry = this.parentNode;
        entry.remove();
    });
    newMessage.appendChild(removeButton);

    messageList.appendChild(newMessage);

    messageForm.reset();
    
});


