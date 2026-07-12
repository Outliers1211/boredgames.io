function messageBox(title, text){

    const box = document.createElement("div");

    box.innerHTML = `
        <div style="
            position:fixed;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
            background:#1f2937;
            border:3px solid #4cc9ff;
            border-radius:18px;
            padding:25px;
            width:350px;
            text-align:center;
            color:white;
            z-index:100000;
            box-shadow:0 0 30px #4cc9ff;
        ">
            <h2>${title}</h2>
            <p style="margin:15px 0">${text}</p>
            <button onclick="this.parentElement.remove()"
                style="
                    padding:10px 20px;
                    border:none;
                    border-radius:8px;
                    background:#4cc9ff;
                    cursor:pointer;
                ">
                Awesome!
            </button>
        </div>
    `;

    document.body.appendChild(box);

}


// Load currency
// First-time player bonus
if(localStorage.getItem("gems") === null){

    localStorage.setItem("gems", 5000);
    localStorage.setItem("starterBonus", "true");

}

let gems = Number(localStorage.getItem("gems"));

// Save
function saveGems(){
    localStorage.setItem("gems", gems);
}

// Add
function addGems(amount){

    gems += amount;

    saveGems();

    updateGemDisplay();

    gemPopup(amount);

}

// Spend
function spendGems(amount){

    if(gems < amount)
        return false;

    gems -= amount;
    saveGems();
    updateGemDisplay();

    return true;
}

// Display
function updateGemDisplay(){

    const display = document.getElementById("gemCount");

    if(!display) return;

    display.textContent = gems.toLocaleString();

    display.animate([
        {transform:"scale(1.35)"},
        {transform:"scale(1)"}
    ],{
        duration:200
    });

}
window.addEventListener("load", updateGemDisplay);

window.addEventListener("load", () => {

    updateGemDisplay();

    // Show the starter reward popup only once
    if(localStorage.getItem("starterBonus") === "true"){

        gemPopup(5000);

        messageBox(
            "🎉 Welcome!",
            "You received <b>5,000 💎 Starter Gems!</b><br>Have fun exploring the arcade!"
        );

        localStorage.removeItem("starterBonus");

    }

});

function gemPopup(amount){

    const popup = document.createElement("div");

    popup.textContent = "+" + amount + " 💎";

    popup.style.position = "fixed";
    popup.style.right = "35px";
    popup.style.top = "70px";
    popup.style.color = "#4cc9ff";
    popup.style.fontWeight = "bold";
    popup.style.fontSize = "22px";
    popup.style.pointerEvents = "none";
    popup.style.zIndex = "10000";

    document.body.appendChild(popup);

    popup.animate([
        {transform:"translateY(0)",opacity:1},
        {transform:"translateY(-40px)",opacity:0}
    ],{
        duration:1000,
        easing:"ease-out"
    });

    setTimeout(()=>popup.remove(),1000);

}
