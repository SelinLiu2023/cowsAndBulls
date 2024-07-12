const checkboxesArr = document.querySelectorAll('#numberForm input[type="checkbox"]');
const solutionDiv = document.getElementById("numberContainer");
// solutionDiv.innerHTML = solution.join("");
const showUserChosedNumEle = document.getElementById("inputNumbers");
let userChosedNumbers = [];
let cowsCount = 0;
let bullsCount = 0;
const submitButton = document.getElementById("submitNumbers");
const warningP = document.getElementById("warning");
const recordsP = document.getElementById("records");
const MAXDIGITAL = 4;

function getRandomItem(arr){
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
function getNDigitNumber(n){
    let count = n;
    let arr = [0,1,2,3,4,5,6,7,8,9];
    const resultArr = new Array(count);
    while(count > 0){
        resultArr[count - 1] = getRandomItem(arr);
        arr = arr.filter(a => a !== resultArr[count - 1]);
        count --;
    }
    return resultArr;
}
let solution = getNDigitNumber(4);

function startNewGame(){
    solution = getNDigitNumber(4);
    bullsCount = 0;
    cowsCount = 0;
    userChosedNumbers = [];
    showUserChosedNumEle.innerHTML = null;
    checkboxesArr.forEach((checkbox) => {
        checkbox.checked = false;
    });
    solutionDiv.innerHTML = null;
    recordsP.innerHTML = null;
    document.getElementById("sucess").innerHTML = null;
}
function showSolution(){
    solutionDiv.innerHTML = solution.join("");
}
checkboxesArr.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {    
        const number = Number(event.target.value);
        if(!event.target.checked){
            const index = userChosedNumbers.indexOf(number);
            if(index !== -1)
                userChosedNumbers.splice(index,1);
        }else{
            // console.log(MAXDIGITAL);
            // console.log("userChosedNumbers.length",userChosedNumbers.length);
            if(userChosedNumbers.length < MAXDIGITAL)
                userChosedNumbers.push(number);
            else 
                checkbox.checked = false;            
        }
        showUserChosedNumEle.innerHTML = userChosedNumbers.join("");
    });
});
submitButton.addEventListener("click", () =>{    
    const userInputNums = showUserChosedNumEle.innerHTML.split("").map(Number);
    console.log(userInputNums);
    if(userInputNums.length !== 4){
        warningP.innerHTML = " You should put 4 digit number.";
        return;
    }
    warningP.innerHTML = null;
    for(let i = 0; i < userInputNums.length; i ++){
        const chosedNum = userInputNums[i];
        const indexInSolution = solution.indexOf(chosedNum);
        if(indexInSolution === i){
            bullsCount ++;
        }else if(indexInSolution !== -1){
            cowsCount ++;
        }
    }
    recordsP.innerHTML += `You input :<strong style = "color:blue"> ${userInputNums.join("")}</strong>. You got <strong style = "color:brown"> ${cowsCount}</strong> cows and <strong style = "color:brown">${bullsCount}</strong> bulls.<br>`;
    if(bullsCount === 4)
        document.getElementById("sucess").innerHTML = "You made it !!!"
    bullsCount = 0;
    cowsCount = 0;
    userChosedNumbers = [];
    showUserChosedNumEle.innerHTML = "";
    checkboxesArr.forEach((checkbox) => {
        checkbox.checked = false;
    });
});