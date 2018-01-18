(function(){
	var catalogItemCounter = function (field){
			
		var fieldCount = function(el) {
			var 
					// Мин. значение
				min = el.data('min') || false,

					// Кнопка уменьшения кол-ва
				dec = el.prev('.dec'), 

					// Кнопка увеличения кол-ва
				inc = el.next('.inc');
			
			console.log(dec)
			
			function init(el) {
				if(!el.attr('disabled')){
					dec.on('click', function(){decrement()});
					inc.on('click', function(){increment()});
				}

					// Уменьшим значение
				function decrement() {
					
					var value = parseInt(el[0].value) || 0;
					value--;

					if(!min || value >= min) {
						el[0].value = value;
					}
				};

					// Увеличим значение
				function increment() {
						
					var value = parseInt(el[0].value) || 0;
							
					value++;
						
					el[0].value = value;
				};
					
			}

			el.each(function() {
				init($(this));
			});
		};

		$(field).each(function(){
			fieldCount($(this));
		});
	}
    
	window.catalogItemCounter = catalogItemCounter;
})();