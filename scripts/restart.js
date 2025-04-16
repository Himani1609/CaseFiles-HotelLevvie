window.onload =()=>{
    const restart_game = document.getElementById("restart_game");
    const restart = document.getElementById("restart");

    const correct = JSON.parse(localStorage.getItem('Correct_Chapter_1'));
    const correct2 = JSON.parse(localStorage.getItem('Correct_Chapter_2'));
    const correct3 = JSON.parse(localStorage.getItem('Correct_Chapter_3'));

    if(correct || correct2 || correct3){
        restart_game.style.display = "block";
    }else{
        restart_game.style.display = "none";
    }

    restart.onclick = () => {
        localStorage.removeItem("Correct_Chapter_1");
        localStorage.removeItem("Correct_Chapter_2");
        localStorage.removeItem("Correct_Chapter_3");
    }
    
}