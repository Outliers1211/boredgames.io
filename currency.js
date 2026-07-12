// Load currency
let gems = Number(localStorage.getItem("gems")) || 0;

// Save
function saveGems(){
    localStorage.setItem("gems", gems);
}

// Add
function addGems(amount){
    gems += amount;
    saveGems();
    updateGemDisplay();
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

    if(display)
        display.textContent = gems;

}

window.addEventListener("load", updateGemDisplay);
