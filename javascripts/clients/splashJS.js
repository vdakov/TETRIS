
const userForm= document.getElementById("userForm");


function tryToPlayGame() {
    console.log("I got here");
    if(userForm.elements['userField'].value == null || userForm.elements['userField'].value == ""){
        alert("No username entered!");
        return;
    }

    console.log(userForm.elements['userField'].value);
    window.location="http://localhost:8080/game/enterNewGame/" +userForm.elements['userField'].value;
    console.log("http://localhost:8080/game");

}