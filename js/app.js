//The following code is broken into 6 TO DO's in order to seperate the items and make it more reader-friendly. I found help to structure it this way on the forum.




// 1. TO DO: Declare all the variables that will be used in the code

    // CARDS - First all the card-classes will be drawn into this array. Using the rest parameter this array will represent the cards
    let card = document.getElementsByClassName("card");
    let cards = [...card];

    // DECK - This refers to the <ul> that holds all the <li>s with the class card
    const deck = document.getElementById("card-deck");

    // MOVES - A variable for the moves a player makes
    let moves = 0;
    let counter = document.querySelector(".moves");

    // STAR RATING - A variable for the stars in the star rating, and a list of stars in the <ul>
    const stars = document.querySelectorAll(".fa-star");
    let starsList = document.querySelectorAll(".stars li");

    // MATCHED CARDS - declaring a variable for the cards that have the class name match
    let matchedCard = document.getElementsByClassName("match");

    // CONGRATULATIONS MODAL - The modal itself and the close icon
    let modal = document.getElementById("popupmodal");
    let closeicon = document.querySelector(".close");

     // OPENED CARDS - An array to store the opened cards in
    var openedCards = [];


// 2. TO DO: Shuffle the cards and start the game

    // The provided shuffle function from http://stackoverflow.com/a/2450976 
    function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
    
    // Run this when the page is loaded
    document.body.onload = startGame();

    // The function that should be ran: Shuffles the cards via the provided function
    function startGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

    // Toggles open and show class to display cards
    var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};



// 3. TO DO: Open the cards when clicked and check if they match

    // Add opened cards to the OpenedCards list and check if they match - (see A or B under here)
    function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

    // A: When the cards match: 
    function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

    // B: When the cards do not match
    function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}



//4. TO DO: Disable the matched cards and keep the unmatched cards enabled for clicking

    // Step 1: Disable cards temporarily
    function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

    // Step 2: Enable all cards but disable matched cards
    function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
       
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}



//5. TO DO: Keep track of the players moves, time and star rating

    //  MOVES COUNTER
    function moveCounter(){
        moves++;
        counter.innerHTML = moves;
    
        //Start the timer when the players clicks the first time
        if(moves == 1){
            second = 0;
            minute = 0; 
            hour = 0;
            startTimer();
        }
    
        // STAR RATING - Star rating will be based on number of moves
        if (moves > 6 && moves < 13){
            for( i= 0; i < 3; i++){
                if(i > 1){
                    stars[i].style.visibility = "collapse";
                }
            }
        }
        else if (moves > 13){
            for( i= 0; i < 3; i++){
                if(i > 0){
                    stars[i].style.visibility = "collapse";
                }
            }
        }
    }

    // TIMER - Keeps track of total time the player uses
    var second = 0, 
        minute = 0,
        hour = 0;
    var timer = document.querySelector(".timer");
    var interval;

    function startTimer(){
        interval = setInterval(function(){
            timer.innerHTML = minute+"mins "+second+"secs";
            second++;
            if(second == 60){
                minute++;
                second=0;
            }
            if(minute == 60){
                hour++;
                minute = 0;
            }
        },1000);
    }



//6. TO DO - Show a congratulations modal when the player finished the game - show the players time, moves and star rating

    // The modal: 
    function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}

    // Icon to close the modal
    function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

    // Playagain function to the button 
    function playAgain(){
    modal.classList.remove("show");
    startGame();
}



    // A for loop to add event listeners to each card
    for (var i = 0; i < cards.length; i++){
        card = cards[i];
        card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
        card.addEventListener("click",congratulations);
    };
