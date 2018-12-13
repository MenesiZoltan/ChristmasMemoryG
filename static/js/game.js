$(document).ready(function() {
	$('form').on('submit', function(event) {
		$.ajax({
			data : {
				nick_name : $('#nick_name').val(),
				difficulty : $('#difficulty').val()
			},
			type : 'POST',
			url : 'http://127.0.0.1:5000/game'
		})
		.done(function(data) {
                console.log(data.cards);
				form_fade_out();
				build_game(data.cards);
				cards_fade_in();
				main();
		});
		event.preventDefault();
	});
});


function form_fade_out(){
    let form = document.querySelector("#login_form");
    form.classList.add("form_fade_out");
    setTimeout(function(){form.remove()},1400);
}


function build_game (cards) {
	let body = document.querySelector("body");
	let board = document.createElement("section");
	board.classList.add("board");
	board.dataset.card_number = cards.length/2;
	board.dataset.locked = "false";

	for (let card of cards) {

		let new_card = document.createElement("div");
		new_card.classList.add("card");
		new_card.dataset.id = card.id;

		let card_back = document.createElement("img");
		card_back.classList.add("card_back");
		card_back.setAttribute("src", "../static/pics/back.png");
		new_card.appendChild(card_back);

		let card_front = document.createElement("img");
		card_front.classList.add("card_front");
		card_front.setAttribute("src", "../static/pics/" + card.filename);
		new_card.appendChild(card_front);

		board.appendChild(new_card);
	}

	body.appendChild(board);
}


function cards_fade_in(){
    setTimeout(function(){
        let dom_element = document.querySelectorAll(".card");
        for (let element of dom_element) {
        element.classList.add("card_fade_in");
    }
    },1300);
}


function click_handler () {
	let board = document.querySelector(".board");
	if (board.dataset.locked === "true") return;
	this.classList.add("flip");
	let flipped = document.querySelectorAll(".flip");
	if (flipped.length < 2) {
 		return;
 	} else {
		board.dataset.locked = "true";
		if (flipped[0].dataset.id === flipped[1].dataset.id) {
 			for (let card of flipped) {
 				card.classList.remove("flip");
 				card.classList.add("paired");
 			}
 			board.dataset.card_number -= 1;
		} else {
			setTimeout(function(){
		 	for (let card of flipped) {
				console.log("asd");
				card.classList.remove("flip");
				}
 		 	},2000);
		}
		setTimeout(function(){
		 	let board = document.querySelector(".board");
		 	board.dataset.locked = "false";
 		 	},2000);
    }
}


function main () {
	let cards = document.querySelectorAll(".card");
	for (let card of cards) {
		card.addEventListener("click", click_handler);
	}
}
