const play = document.getElementById('start__reset');
const scoreValue = document.getElementById('score__value');
const timeRemainingValue = document.getElementById('timeremainingvalue');
const startReset = document.getElementById('start__reset');
const gameOver = document.getElementById('game__over');
const question = document.getElementById('question');
const audio = document.getElementById("myAudio");  

console.log(audio);
//понаделать переменных



let playing = false; // изначально игра не стартуеться потому что False
let score;

let timeremaining; //таймер обратного отсчёта
let correctAnswer;

//Описываем кнопку
play.onclick = function(){
    //Плэй/Ресет
    
    //Проверяем играем мы или нет
    //Играем
    if(playing == true){              
        
        //Ребут Страницы
        location.reload();      
    }
    else{                  
        //Не играем
        playing = true;
        //очки на ноль!
        score = 0;             
        scoreValue.innerHTML = score;
        hide("game__over");
        show("timeremaining");
        //делаем обратный отсчёт
        timeremaining = 5; // Время игры
        timeRemainingValue.innerHTML = timeremaining;
        startCountdown();
        startReset.classList.toggle('btn-outline-danger');
        startReset.classList.remove('btn-outline-success');
        startReset.innerHTML= "Новая Игра"    
        generateQA();  
    }
}
function startCountdown(){
    let action = setInterval(function(){
        timeremaining -= 1;      //уменьшение таймера 
        
        timeRemainingValue.innerHTML = timeremaining;
        //Если 0 то проигрыш
        if(timeremaining == 0){  
            //очищаем обратный отсчёт               
            clearInterval(action);              
            
            //Экран окончания игры
            gameOver.innerHTML ="<p>Игра завершена! </p><p>Вы заработали:<br> " + score +  "  " + 'очков' +".</p>"; 
            
            show("game__over");
            hide("timeremaining");  
            startReset.innerHTML="Начать игру"       
            //Меняем имя кнопки   
            
            playing = false;
        }
    },1000);
}

//Работаем с боксами с цифрами
for(i=1;i<5;i++){
    document.getElementById("box" + i).onclick =function(){
    
    if (playing=true){
        
        if(this.innerHTML == correctAnswer){
            //Проверяем овтет на верность
            score++;                       
            scoreValue.innerHTML = score;
            
            hide("wrong");          //Неправильно прячем
            show("correct");        // Правильно показываем
            setTimeout(function(){          //Выводим Див Верно
                hide("correct");
            },1000);
            
            
            //функция генерации чисел и ответов 
            generateQA();
        }else{
            //Проверяем на неверность 
            hide("correct");        //прячем верно
            show("wrong");     
            audio.play();     // показываем не верное
            setTimeout(function(){
                hide("wrong");
            },1000);
            }
        }
    }
}


// функция генерации чисел и ответов
function generateQA(){
    let x = 1 + Math.round(9 * Math.random());
    let y = 1 + Math.round(9 * Math.random());
    correctAnswer = x + y;
    question.innerHTML = x +"+"+ y;//Показываем вопрос на экране
    
    let correctPosition = 1 + (Math.round(3 * Math.random()));  //Генерируем правильные овтеты
    
    //Помещаем правльный ответ в один из 4ыёх боксов
    document.getElementById("box"+correctPosition).innerHTML= correctAnswer;  
    //один из боксов правильый осальное рандом
    

    //Засовывоем правльные ответы в масив
    let answers = [correctAnswer];
    
    for(i=1; i<5; i++){
            //Проверка для трёх боксов которые не верны
        if(i != correctPosition){                     
            
            let wrongAnswer;    //неверный ответ                  
            
            do{
                
                wrongAnswer =(1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));                
                
            }while(answers.indexOf(wrongAnswer) > -1)
            
            // пушим не верные ответы в масив
            answers.push(wrongAnswer);                  
            document.getElementById("box"+i).innerHTML =wrongAnswer;
        }   
    }
}
// скрываем  блоки которые не нужны 
function show(Id){
    document.getElementById(Id).style.display ="block";
}

// показываем блоки которые нужны
function hide(Id){
    document.getElementById(Id).style.display ="none";
}