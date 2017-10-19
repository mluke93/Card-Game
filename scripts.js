setup();

// - - - Variables - - -

var deckDivs = [];
var initialDraw = 5;
var handSize = 0;
var maxHandSize = 10;

// - - - Functions - - -

function setup () {
    $.getJSON('deck.json', function(data) {
        printDeck(data.cards, data.deckType);
        drawInitial();
    });
}

function printDeck (deck, deckType) {
    deck = shuffle(deck);
    for (var i = 0; i < deck.length; i++){
        var card = "";
        switch (deckType) {
            case "bicycle":
                card += "<div class='card " + deck[i].rank + " " + deck[i].suit + "' onclick='playCard(this)'>" +
                    "<p class='top'>" + deck[i].rank + "</p>" +
                    "<p class='top'>" + deck[i].image +"</p>" +
                    "</div>";
                break;
            case "hearthstone":
                card += "<div class='card' onclick='playCard(this)'>" +
                    "<p>" + deck[i].mana + "</p>" +
                    "<img src='" + deck[i].image + "' style='height:100px;'>" +
                    "<p style='font-size:12px; text-align:center;'>" + deck[i].name +"</p>" +
                    "<div>" +
                    "<p style='float:left;'>" + deck[i].attack + "</p>" +
                    "<p style='float:right;'>" + deck[i].health + "</p>" +
                    "</div>" +
                    "<p style='text-align:center;'>" + deck[i].tribe + "</p>" +
                    "</div>";
        }

        deckDivs.push(card);
    }
}

function drawInitial () {
    for (var i = 0; i < initialDraw; i++) {
        $("#hand").append(deckDivs.pop());
        handSize++;
    }
}

function shuffle (deck) {
    var j = 0, temp = null;

    for (var i = deck.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}

function draw () {
    if (handSize < maxHandSize) {
        $("#hand").append(deckDivs.pop());
        handSize++;
    }
    if (deckDivs.length == 0) {
        $("#deck").remove();
    }
}

function playCard (card) {
    $(card).remove();
    handSize--;
    $("#playerBoard").append(card);
    $(card).prop('onclick', null).off('click');
    $(card).addClass('played');
}

function removeCard (card) {
    $(card).remove();
}