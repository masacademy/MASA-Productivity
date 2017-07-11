/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function(){

	var dateStart = new Date(t.arg('dateStart'));
	var dateEnd = new Date(t.arg('dateEnd'));
	var cards = t.arg('cards');

	var from = dateStart.getTime();
	var to = dateEnd.getTime();

	var smallTasks = 0;
	var mediumTasks = 0;
	var bigTasks = 0;
	var uncategorized = 0;
	
	var smallTasksDone = 0;
	var mediumTasksDone = 0;
	var bigTasksDone = 0;
	var uncategorizedDone = 0;

	var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

	var cardsWithinDates = cards.filter(function(card){
		var dueDate = new Date(card.due);
		var dateTimestamp = dueDate.getTime();
		if (from < dateTimestamp && dateTimestamp < to) {
			return card;
		}
	});

	cardsWithinDates.filter(function(card){
		if (card.labels.length == 0) {
			uncategorized++;
			if (card.dueComplete == true) { uncategorizedDone++; }
		} else if (card.labels[0].color == "green") {
			smallTasks++;
			if (card.dueComplete == true) { smallTasksDone++; }
		} else if (card.labels[0].color == "yellow") {
			mediumTasks++;
			if (card.dueComplete == true) { mediumTasksDone++; }
		} else if (card.labels[0].color == "orange") {
			bigTasks++;
			if (card.dueComplete == true) { bigTasksDone++; }
		} else {
			uncategorized++;
			if (card.dueComplete == true) { uncategorizedDone++; }
		}
	});

	var totalCompletedCards = smallTasksDone + mediumTasksDone + bigTasksDone + uncategorizedDone;

	var totalTasksDonePercent = cardsWithinDates.length > 0 ? Math.round((totalCompletedCards / cardsWithinDates.length) * 100) : 0;
	var smallTasksDonePercent = smallTasks > 0 ? Math.round((smallTasksDone / smallTasks) * 100) : 0;
	var mediumTasksDonePercent = mediumTasks > 0 ? Math.round((mediumTasksDone / mediumTasks) * 100) : 0;
	var bigTasksDonePercent = bigTasks > 0 ?  Math.round((bigTasksDone / bigTasks) * 100) : 0;
	var uncategorizedDonePercent = uncategorized > 0 ? Math.round((uncategorizedDone / uncategorized) * 100) : 0;
	
	document.getElementById("start").innerHTML = t.arg('dateStart');
	document.getElementById("end").innerHTML = t.arg('dateEnd');

	document.getElementById("total").innerHTML = cardsWithinDates.length;
	document.getElementById("small").innerHTML = smallTasks;
	document.getElementById("medium").innerHTML = mediumTasks;
	document.getElementById("big").innerHTML = bigTasks;
	document.getElementById("uncategorized").innerHTML = uncategorized;

	document.getElementById("total-on-time").innerHTML = totalCompletedCards;
	document.getElementById("small-on-time").innerHTML = smallTasksDone;
	document.getElementById("medium-on-time").innerHTML = mediumTasksDone;
	document.getElementById("big-on-time").innerHTML = bigTasksDone;
	document.getElementById("uncategorized-on-time").innerHTML = uncategorizedDone;

	document.getElementById("total-percent").innerHTML = totalTasksDonePercent + "%";
	document.getElementById("small-percent").innerHTML = smallTasksDonePercent + "%";
	document.getElementById("medium-percent").innerHTML = mediumTasksDonePercent + "%";
	document.getElementById("big-percent").innerHTML = bigTasksDonePercent + "%";
	document.getElementById("uncategorized-percent").innerHTML = uncategorizedDonePercent + "%";
});
