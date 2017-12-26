(function(){
	$(document).ready(function(){
		var statData = new StatData();
		statData.chooseDept();	
		statData.getData();
		statData.submitStatform().then(
			function(){
				
			},
			function(e){
				alert(e);
			}
		);
	});
})();