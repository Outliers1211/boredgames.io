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

    gemPopup(-amount);

    return true;

}

// Display
function updateGemDisplay(){

    const display = document.getElementById("gemCount");

    if(!display) return;

    display.textContent = formatGems(gems);

    display.animate([
        {transform:"scale(1.15)"},
        {transform:"scale(1)"}
    ],{
        duration:180
    });

}

function formatGems(num){

    const units = [
        "",
        "K",
        "M",
        "B",
        "T",
        "Qa",
        "Qi",
        "Sx",
        "Sp",
        "Oc",
        "No",
        "Dc"
    ];

    let unit = 0;

    while(num >= 1000 && unit < units.length-1){

        num /= 1000;
        unit++;

    }

    if(unit === 0)
        return Math.floor(num).toLocaleString();

    if(num >= 100)
        return num.toFixed(0) + units[unit];

    if(num >= 10)
        return num.toFixed(1) + units[unit];

    return num.toFixed(2) + units[unit];

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

    popup.textContent = (amount > 0 ? "+" : "") + amount + " 💎";

    popup.style.position = "fixed";
    popup.style.right = "35px";
    popup.style.top = "70px";
    popup.style.fontWeight = "bold";
    popup.style.fontSize = "22px";
    popup.style.pointerEvents = "none";
    popup.style.zIndex = "10000";

    // Green for gains, red for spending
    popup.style.color = amount >= 0 ? "#4cc9ff" : "#ff5555";

    document.body.appendChild(popup);

    popup.animate([
        { transform:"translateY(0)", opacity:1 },
        { transform:"translateY(-40px)", opacity:0 }
    ],{
        duration:1000,
        easing:"ease-out"
    });

    setTimeout(()=>popup.remove(),1000);

}
