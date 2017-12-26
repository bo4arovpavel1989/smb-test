(function(){
	try{
		var socket = socketCluster.connect({
			path:'/socketcluster/',
			port:80,
			hostname: '127.0.0.1'
		});
	} catch(e){
		console.log('socket connection unavailable...');
	}	
	
	function StatData(){
	}
	
	StatData.prototype.chooseDept = function(){
		$('#deptChoose').on('change',function(){
			$('#shiftChoose').empty();
			var dept = Number($(this).val());
			for (var i=1; i<=dept*2; i++){
				var $a=$('<option></option>',{'value':i});
				$a.append(i)
				$('#shiftChoose').append($a);
			}
		});
	}
	
	window.StatData=StatData;
})();