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
		this.formFields = {};
		this.data={};
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
	
	StatData.prototype.setStatData = function(obj){
		this.formFields[obj.name] = obj.value;
	}
	
	StatData.prototype.sendRequest = function(){
		socket.emit('get_data',this.formFields)
	}
	
	StatData.prototype.submitStatform = function(){
		var self=this;
		return new Promise(function(resolve, reject) {
			$('#showStatData').on('submit',function(e){
				e.preventDefault();
				$('.loader').addClass('loading');
				try{
					var data = $(this).serializeArray();
					data.forEach(function(item){
						self.setStatData(item);
					});	
					self.sendRequest();
					resolve();
				}catch(e){
					reject(e);
				}
			});
		});
	}
	
	StatData.prototype.renderResult = function(data){
		statRenderFunctions[Number(this.formFields.vizualizetype)](data.results, this.formFields);
		if(this.formFields.question.length>0){
			questionRenderFunctions(data.questions, this.formFields.question, this.formFields.answer);
		}	
	};
	
	StatData.prototype.getData = function(){
		var self = this;
		socket.on('take_data',function(data){
			self.data = data;
			$('.loader').removeClass('loading');
			self.renderResult(data);
		})
	}
	
	window.StatData=StatData;
})();