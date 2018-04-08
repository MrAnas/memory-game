/*
 * Create a list that holds all of your cards
 */

var icons = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'
];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var shuffled = icons;
var opened = []

$(document).ready(function () {
    var shuffled = shuffle(icons);
    show(shuffled);
    $(".card").click(function () {
        checkOpened(this)
    })


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function show(array){
    array.forEach(function(item){
    $('.deck').append('<li class="card"><i class="fa '+item+'"></i></li>');
})
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




function checkOpened(element) {
    if(opened.length < 2){
        opened.push(element)
    $(element).toggleClass("open show");
    checkMatched(opened);
    }
    else { 
    $('.card.open.show').removeClass('open show');
    opened = []
    }
}


function checkMatched(opened) {
    if($(opened[0]).children('i').attr('class') === $(opened[1]).children('i').attr('class')){
        $(opened[0]).toggleClass('match')
        $(opened[1]).toggleClass('match')
        opened = []
    }
}

});