/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var initialDate = document.getElementById('initialEvaluationDate');
var finalDate = document.getElementById('finalEvaluationDate');
var evaluate = document.getElementById('evaluate');

initialDate.valueAsDate = new Date();
finalDate.valueAsDate = new Date();

var authenticationSuccess = function() {
	t.lists('id')
	.then(function(lists){
		var listId = lists[lists.length-1].id;

		var success = function(listCards) {
			evaluate.addEventListener('click', function(){
				var dateStart = initialDate.value;
				var dateEnd = finalDate.value;

				return t.boardBar({
					url: './board-bar.html',
					height: 370,
					args: { dateStart: dateStart , dateEnd: dateEnd  , cards: listCards }
				})
				.then(function(){
					return t.closePopup();
				});
			});
		};

		Trello.get(
			'/lists/' + listId + '/cards',
			success,
			function(){
				console.log("Failed to load list cards");
			}
		);
	});	
};

var authenticationFailure = function() { console.log('Failed authentication'); };

Trello.authorize({
	type: 'popup',
	name: 'MaSA Productivity',
	scope: {
		read: 'true',
		write: 'false'
	},
	expiration: 'never',
	success: authenticationSuccess,
	error: authenticationFailure
});
