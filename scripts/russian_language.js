(function(){
	changeLanguage=function(){
		$('.russian').on('keyup',function(){
			var initial = this.value;
			var replacer = {
	            "q":"й", "w":"ц", "e":"у", "r":"к", "t":"е", "y":"н", "u":"г",
	            "i":"ш", "o":"щ", "p":"з", "[":"х", "]":"ъ", "a":"ф", "s":"ы",
	            "d":"в", "f":"а", "g":"п", "h":"р", "j":"о", "k":"л", "l":"д",
	            ";":"ж", "'":"э", "z":"я", "x":"ч", "c":"с", "v":"м", "b":"и",
	            "n":"т", "m":"ь", ",":"б", ".":"ю", "/":".",",":"б",".":"ю",
				"<":"Б",">":"Ю","`":"ё","~":"Ё",":":"Ж",'"':"Э","{":"Х","}":"Ъ"
	        };    
	        this.value = initial.replace(/[A-z/<>`~,.;\'\]\[]/g, function ( x ){
	            return x == x.toLowerCase() ? replacer[ x ] : replacer[ x.toLowerCase() ].toUpperCase();
	        });
			this.value = this.value.charAt(0).toUpperCase() +  this.value.slice(1).toLowerCase(); //first letter to upper case
		});
	}
	window.changeLanguage=changeLanguage;
})();