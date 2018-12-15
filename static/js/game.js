var music = new Audio("static/audio/music.mp3");
function play_music() {
    music.play();
}
play_music();


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
				put_eventlistener_on_cards();
		});
		event.preventDefault();
	});
});



function form_fade_out(){
	let sligh = new Audio('static/audio/sligh.mp3');
	sligh.play();
    let form = document.querySelector("#login_form");
    form.classList.add("form_fade_out");
    let santa_hat = document.querySelector("#santa_hat");
    santa_hat.style.transition = "1s";
    santa_hat.style.opacity = "0";
    setTimeout(function(){
    	let form = document.querySelector("#login_form");
    	form.remove();
    	santa_hat.remove();
	},1200);
}



function build_game (cards) {
	let card_list = cards;
	setTimeout(function(card_list) {
		let body = document.querySelector("body");
		let board = document.createElement("section");
		board.classList.add("board");
		board.dataset.card_number = cards.length / 2;
		board.dataset.locked = "false";
		board.dataset.cnt = 0;
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
	},1400);
}



function cards_fade_in(){
    setTimeout(function(){
        let dom_element = document.querySelectorAll(".card");
        for (let element of dom_element) {
        	element.classList.add("card_fade_in");
    	}
    },1600);
}



function put_eventlistener_on_cards () {
	setTimeout(function() {
		let cards = document.querySelectorAll(".card");
		for (let card of cards) {
			card.addEventListener("click", click_handler);
		}
	},1800);
}



function click_handler () {
	let board = document.querySelector(".board");
	if (board.dataset.locked === "true") return;
	let woosh = new Audio("static/audio/woosh.mp3");
	woosh.play();
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
 				let hoho = new Audio("static/audio/hoho.mp3");
 				hoho.play();
 			}
 			board.dataset.card_number -= 1;
		} else {
			setTimeout(function(){
		 	for (let card of flipped) {
		 		woosh.play();
				card.classList.remove("flip");
				}
 		 	},2000);
		}
		setTimeout(function(){
		 	let board = document.querySelector(".board");
		 	board.dataset.locked = "false";
 		 	},2000);
    }
    if (board.dataset.card_number === "0"){
				let win_event  = new Event("win");
				board.addEventListener("win",win_handler);
				board.dispatchEvent(win_event);
			}
}



function win_handler(){
    $.ajax(
        {   data : {win: true},
			type : 'POST',
			url : 'http://127.0.0.1:5000/highscore' })
		.done(function(data) {
				console.log(data.highscores);
				board_fade_out();
				highscore_table(data.highscores);
				merry_christmas();
		});
		event.preventDefault();
}



function board_fade_out(){
    setTimeout(function(){
        let dom_element = document.querySelectorAll(".card");
        for (let element of dom_element) {
            element.classList.remove("paired");
            element.classList.remove("flip");
    }},1000);
    setTimeout(function(){
        let dom_element = document.querySelectorAll(".card");
        for (let element of dom_element) {
            element.classList.remove("fade_in");
            element.classList.add("card_fade_out");
    }},2000);
    let board = document.querySelector(".board")
    setTimeout(function(){board.remove()},3000);
}



function highscore_table(highscores){
	setTimeout(function() {
		let highscore_container = document.createElement("div")
		highscore_container.classList.add("highscore_container");
		highscore_container.innerHTML += `<h2>Highscores</h2>`;
		for (let i=0;i<highscores.length;++i) {
			let p = document.createElement("p");
			p.textContent = `#${i+1} ${highscores[i].nickname}:	${highscores[i].score}`;
			highscore_container.appendChild(p);
		}
		document.querySelector("body").appendChild(highscore_container);
	},3100);
	setTimeout(function(){
		let sligh = new Audio('static/audio/sligh.mp3');
		sligh.play();
		let highscore = document.querySelector(".highscore_container");
		highscore.style.transition = '1s';
		highscore.style.opacity = 1;
	},3200);
	setTimeout(function () {
		let highscore = document.querySelector(".highscore_container");
		highscore.style.opacity = 0;
	},6200);
	setTimeout(function () {
		let highscore = document.querySelector(".highscore_container");
		highscore.remove();
	},7500);
}



function merry_christmas(){
	setTimeout(function(){
		let santa = document.createElement("div");
		santa.classList.add("santa");
		let gif = document.createElement("img");
		gif.setAttribute("src","../static/pics/santa.gif");
		santa.appendChild(gif);
		santa.style.transition = "2s";
		santa.style.opacity = 0;
		document.querySelector("body").appendChild(santa);
	},8500);
	setTimeout(function(){
		let santa = document.querySelector(".santa");
		santa.style.opacity = 1;
	},8600);
	setTimeout(function() {
		let merry = new Audio('static/audio/merry.mp3');
		merry.play();
	},9000);
}