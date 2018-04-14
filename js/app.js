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
var matched = 0;
var initialNumberOfMoves = 20;
var numberOfMoves = initialNumberOfMoves;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var shuffled = icons;
var opened = [];

$(document).ready(function () {
    var shuffled = shuffle(icons);
    show(shuffled);
    $(".card").click(function () {
        checkOpened(this)
    })

    $('.restart').click(function(){
        resetGame();
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
    var validateClass = 'card open show animated '
    if($(element).attr('class') !== validateClass && opened.length < 2){
        opened.push(element)
    $(element).toggleClass("open show");
    
    }
        
    else { 
        checkMatched(opened);
    $('.card.open.show').removeClass('open show');
    opened = []
    }
}


function checkMatched(opened) {
    if($(opened[0]).children('i').attr('class') === $(opened[1]).children('i').attr('class')){
        $(opened[0]).toggleClass('match animated bounceIn')
        $(opened[1]).toggleClass('match')
        matched++;
        console.log("Matched:" + matched)
        if(matched == 8){
            winGame()
        }
    }
    else{
        $(opened[0]).toggleClass('wrong open animated shake')
        $(opened[1]).toggleClass('wrong open animated shake')
        setTimeout(function(){
            $(opened[0]).toggleClass('wrong show');
            $(opened[1]).toggleClass('wrong show');
        },700);
        reduceNumberOfMoves();
        if(numberOfMoves == 0){
            endGame()
        }
    }
}
function reduceNumberOfMoves(){
    numberOfMoves--;
    console.log(numberOfMoves)
    $('.moves').text(numberOfMoves)
    reduceStar()
}
function endGame(){
    $('.deck').hide();
    $('.container').append('<h1 style="color: red">You Lost 😞</h1>')
}


function winGame(){
    $('.deck').hide();
    $('.container').append('<h1 style="color: green">You Won 🎊</h1>')
}

});


function resetGame(){
    $('.match').removeClass('match')
    $('.container > h1').hide()
    $('.deck').show()
    numberOfMoves = initialNumberOfMoves;
    $('.moves').text(initialNumberOfMoves)
    $('.stars i').removeClass('fa-star-o').addClass('fa-star');
}

function reduceStar(){
    if(numberOfMoves < initialNumberOfMoves / 2 )
    $('.stars li:nth-child(1) > i').removeClass('fa-star').addClass('fa-star-o')
    if(numberOfMoves < initialNumberOfMoves / 3)
    $('.stars li:nth-child(2) > i').removeClass('fa-star').addClass('fa-star-o')
    if (numberOfMoves < 2){
        $('.stars li:nth-child(3) > i').removeClass('fa-star').addClass('fa-star-o')
    }
}