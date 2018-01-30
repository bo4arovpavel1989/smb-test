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
	
	function UserData(){
		this.personalData={};
		this.sum=0;;
		this.max;
		this.relation=0;
	}
	
	UserData.prototype.getResults = function(){
		return Object.assign({},{relation:this.relation},this.personalData);
	}
	
	UserData.prototype.chooseDept = function(){
		$('#deptChoose').on('change',function(){
			$('#shiftChoose').empty();
			var dept = Number($(this).val());
			for (var i=1; i<=dept*2; i++){
				var $a=$('<option></option>',{'value':i});
				$a.append(i)
				$('#shiftChoose').append($a);
				if(i==4)break;
			}
		});
	}
	
	UserData.prototype.setUserData = function(obj){
		this.personalData[obj.name] = obj.value;
	}
	
	UserData.prototype.submitUserData = function(){
		var self=this;
		return new Promise(function(resolve, reject) {
			$('.user_data_form').on('submit',function(e){
				e.preventDefault();
				try{
					var data = $(this).serializeArray();
					data.forEach(function(item){
						self.setUserData(item);
					});	
					$('#user_data_form').hide(200,function(){
						$('#user_data_form_background').remove();
						resolve();
					});
				}catch(e){
					reject(e);
				}
			});
		});
	}
	
	UserData.prototype.setMax = function(questions){
		this.max=questions.length;
	}
	
	UserData.prototype.increaseSum = function(val){
		this.sum += parseFloat(val.toPrecision(2),2);
		console.log(parseFloat(val.toPrecision(2),2));
		console.log(this.sum + ' / ' + this.max);
	}
	
	UserData.prototype.setTimer=function(){
			$("#m_timer").countdowntimer({
				minutes : 15,
				size : "lg",
				borderColor : 'white',
				backgroundColor : 'grey',
                fontColor : "black"
			});
	}
	
	UserData.prototype.finishTest=function(answerSubmit){
		var self=this;
		$('#finishTest').on('click',function(e){
			e.preventDefault();
			$(this).remove();
			self.getRelation();
			self.getTextMark();
			self.renderResult(answerSubmit);
		});
		setTimeout(function(){
			$('#finishTest').trigger('click');
		},15*60*1000+1000);
	}
	
	UserData.prototype.getRelation = function(){
		this.relation=Math.round(((this.sum)/(this.max)*100));
	}
	
	UserData.prototype.getTextMark = function(){
		console.log(this.relation);
		console.log(this.max);
		if(this.relation>=90) this.textMark='Поздравляем! Ваша оценка: Отлично!';
		else if(this.relation<90 && this.relation>=70) this.textMark='Поздравляем! Ваша оценка: хорошо.';
		else if(this.relation<70 && this.relation>=60) this.textMark='Ваша оценка: удовлетворительно.';
		else if(this.relation<60 && this.relation>=50) this.textMark='Ваша оценка: удовлетворительно. Вам необходимо дополнительная подготовка по изучению документов, регламентирующих  деятельность СМБ.';
		else this.textMark='Ваши знания неудовлетворительны для исполнения обязанностей сотрудника службы безопасности!';		
	}
	
	UserData.prototype.packResult = function(arr){
		arr[0].details = arr[1];
		arr[1].forEach(function(question){
			question.name = arr[0].name.toLowerCase();
			question.surname = arr[0].surname.toLowerCase();
			question.parentname = arr[0].parentname.toLowerCase();
		});
		return {
			user:arr[0],
			questions:arr[1]
		};
	};
	
	
	UserData.prototype.sendResult = function(obj){
		console.log(obj);
		try{
			socket.emit('new_result', obj)
		}catch(e){
			console.log('socket error');
		}
	}
	
	
	UserData.prototype.renderResult=function(answerSubmit){
		$('#formload').empty();
		$('#countdowntimer').empty();
		var source   = $("#result").html();
		var template = Handlebars.compile(source);
		var context = this;
		var html    = template(context);
		$('#formload').append(html);
		this.sendResult(this.packResult([this.getResults(),answerSubmit.statistics]));
		this.showDetails(answerSubmit);
		console.log(answerSubmit.statistics);
	}
	
	UserData.prototype.showDetails=function(answerSubmit){
		var self=this;
		$('.show_more').on('click',function(e){
			e.preventDefault();
			self.renderDetails(answerSubmit);
		});
	}
	
	UserData.prototype.renderDetails=function(answerSubmit){
		$('#more_here').empty();
		var source   = $("#detail_result").html();
		var template = Handlebars.compile(source);
		var context = answerSubmit.statistics;
		var html    = template(context);
		$('#more_here').append(html);
	}
	
	window.UserData=UserData;
})();