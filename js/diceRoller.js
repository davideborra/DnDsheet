var rollResult = "";
var rollString = "";

function setRollString(newString) {
    rollString = newString;
    document.getElementById("rollString").value = newString;
}
function getRollString() {
    rollString = document.getElementById("rollString").value;
}
function setRollResult(newString){
    rollResult = newString;
    document.getElementById("rollResult").innerHTML = newString;
}
function roll(){
    getRollString();
    if(rollString == "") return;
    setRollResult(parseDiceNotation(rollString));
}
function resetRolls(){
    setRollString("");
    setRollResult("");
}

function parseDiceNotation(inputString){
    var string =inputString.toLowerCase();
    resultsArray = "";
    string = string.replaceAll("-", "+-");
    string = string.replaceAll(" ","");
    var cut = string.split("+");
    var modifiers = []
    var dice = []
    for(item of cut){
        if(item.includes("d")){
            dice.push(item);
        }else{
            modifiers.push(item);
        }
    }
    var result = 0;
    for (number of modifiers){
        result += parseInt(number);
    }
    if(dice.length==1){
        const split = dice[0].split("d");
        const numberOfDice = parseInt(split[0]);
        const typeOfDice = split[1]=="%"?100:parseInt(split[1]);
        if(typeOfDice == 20 && numberOfDice==1){
            var diceResult = Math.floor(Math.random() * typeOfDice) + 1;
            if(diceResult == 1){
                result = "Nat 1";
            }else if(diceResult == 20){
                result = "Nat 20";
            }else{
                result += diceResult;
            }
            return result;
        }
    }
    for (die of dice){
        const split = die.split("d");
        const numberOfDice = parseInt(split[0]);
        const typeOfDice = split[1]=="%"?100:parseInt(split[1]);
        var i = 0;
        for (i = 0; i<numberOfDice; i++){
            result += Math.floor(Math.random() * typeOfDice) + 1;
        }
    }
    console.log()
    return result;
}