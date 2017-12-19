(function(){
	
	function UserData(){
		this.name;
		this.sum;
		this.max;
	}
	
	UserData.prototype.setName = function(name){
		this.name=name;
		this.sum=0;
		this.relation;
		this.textMark;
	}
	
	UserData.prototype.getMax = function(questions){
		var max=0;
		questions.forEach(function(question){
			if(question.type=='radio'||question.type=='check'){
				question.vars.forEach(function(variable){
					max += variable.val;
				});
			} else {
				max = max + 1;
			}
		});
		this.max=max;
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
			$(this).hide();
			self.getRelation();
			self.getTextMark();
			self.renderResult();
		});
		setTimeout(function(){
			$('#finishTest').trigger('click');
		},15*60*1000);
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
		var source   = $("#result").html();
		var template = Handlebars.compile(source);
		var context = this;
		var html    = template(context);
		$('#formload').append(html);
	}
	
	window.UserData=UserData;
})();