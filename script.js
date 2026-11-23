// Get button
const addButton = document.querySelector("button");

// Add click event
addButton.addEventListener("click", function () {

    // Get input values
    const skillName = document.getElementById("skill").value.trim();
    const progress = parseInt(document.getElementById("progress").value);

    // Check if fields are empty
    if (skillName === "" || isNaN(progress)) {
        alert("Please fill all fields!");
        return;
    }

    // Find all existing skill cards
    const cards = document.querySelectorAll(".skill-card");

    let skillFound = false;

    cards.forEach(function(card) {

        const title = card.querySelector("h3").textContent.trim().toLowerCase();

        // If skill already exists
        if(title === skillName.toLowerCase()){

            skillFound = true;

            // Get current progress
            const progressText = card.querySelector("p").textContent;
            let currentProgress = parseInt(progressText.match(/\d+/)[0]);

            // Add new progress
            let totalProgress = currentProgress + progress;

            // Maximum progress = 100
            if(totalProgress > 100){
                totalProgress = 100;
            }

            // Decide level
            let level;

            if(totalProgress >= 80){
                level = "Advanced";
            }
            else if(totalProgress >= 50){
                level = "Intermediate";
            }
            else{
                level = "Beginner";
            }

            // Update card
            card.querySelector(".progress").style.width = totalProgress + "%";
            card.querySelector("p").textContent = "Progress: " + totalProgress + "%";
            card.querySelector(".level").textContent = level;
        }

    });

    // If skill doesn't exist, create new card
    if(!skillFound){

        let level;

        if(progress >= 80){
            level = "Advanced";
        }
        else if(progress >= 50){
            level = "Intermediate";
        }
        else{
            level = "Beginner";
        }

        const card = document.createElement("div");

        card.className = "skill-card";

        card.innerHTML = `
            <h3>${skillName}</h3>

            <div class="progress-bar">
                <div class="progress" style="width:${progress}%"></div>
            </div>

            <p>Progress: ${progress}%</p>

            <span class="level">${level}</span>
        `;

        document.querySelector(".skills-list").appendChild(card);
    }

    // Clear inputs
    document.getElementById("skill").value = "";
    document.getElementById("progress").value = "";

});