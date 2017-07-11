/* global TrelloPowerUp */

TrelloPowerUp.initialize({
	'board-buttons': function(t, options){
		return [{
			icon: './images/icon-white.svg',
			text: 'MaSA Productivity',
			callback: function(t){
				return t.popup({
					title: 'Elige el rango de fechas a evaluar:',
					url: './dates.html',
					height: 180
				});
			}
		}];
	}
});