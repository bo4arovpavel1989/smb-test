(function(){
	
	function UserData(){
		this.personalData={};
		this.sum=0;;
		this.max;
	}
	
	UserData.prototype.chooseDept = function(){
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
	
	UserData.prototype.setUserData = function(obj){
		this.personalData[obj.name] = obj.value;
	}
	
	UserData.prototype.submitUserData = function(){
		var self=this;
		return new Promise(function(resolve, reject) {
			$('.user_data_form').on('submit',function(e){
				e.preventDefault();
				var data = $(this).serializeArray();
				data.forEach(function(item){
					self.setUserData(item);
				});	
				$('#user_data_form').hide(200,function(){
					$('#user_data_form_background').remove();
					resolve();
				});
			});
		});
	}
	
	UserData.prototype.setMax = function(questions){
		var max=0;
		questions.forEach(function(question){
			if(question.type=='radio'||question.type=='check'){
				question.vars.forEach(function(variable){
					if(variable.val>0)max += variable.val;
				});
			} else {
				max = max + 1;
			}
		});
		this.max=max;
	}
	
	UserData.prototype.increaseSum = function(val){
		this.sum += val;
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
	
	UserData.prototype.finishTest=function(){
		var self=this;
		$('#finishTest').on('click',function(e){
			e.preventDefault();
			$(this).remove();
			self.getRelation();
			self.getTextMark();
			self.renderResult();
		});
		setTimeout(function(){
			$('#finishTest').trigger('click');
		},15*60*1000+1000);
	}
	
	UserData.prototype.getRelation = function(){
		this.relation=((this.sum)/(this.max)*100).toFixed();
	}
	
	UserData.prototype.getTextMark = function(){
		if(this.relation>=90) this.textMark='Поздравляем! Ваша оценка: Отлично!';
		else if(this.relation<90 && this.relation>=80) this.textMark='Поздравляем! Ваша оценка: хорошо.';
		else if(this.relation<80 && this.relation>=50) this.textMark='Вам необходимо дополнительная подготовка по изучению документов, регламентирующих  деятельность СМБ.';
		else this.textMark='Ваши знания неудовлетворительны для исполнения обязанностей сотрудника службы безопасности!'		
	}
	
	UserData.prototype.renderResult=function(){
		$('#formload').empty();
		$('#countdowntimer').empty();
		var source   = $("#result").html();
		var template = Handlebars.compile(source);
		var context = this;
		var html    = template(context);
		$('#formload').append(html);
		console.log(this.sum);
		console.log(this.max);
	}
	
	window.UserData=UserData;
})();