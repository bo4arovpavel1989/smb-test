(function(){
	
	function AnswerSubmit(){
		this.selector;
		this.remains;
		this.statistics=[];
	}
	
	AnswerSubmit.prototype.setSelector = function(selector){
		this.selector=selector;
	}
	
	AnswerSubmit.prototype.setRemains = function(arr){
		this.remains=arr.length;
	}
	
	AnswerSubmit.prototype.showRight = function(form){
		var question = form.find('.question').text();
		var answer=0;
		var inputs = form.find('input[value=1]');
		inputs.parent().addClass('rightAnswer');
		var inputsRightChecked = form.find('input[value=1]:checked').length;
		var inputsWrongChecked = form.find('input[value!=1]:checked').length;
		if (inputsRightChecked > 0 && inputsRightChecked == inputs.length && inputsWrongChecked==0) {
			form.find('.showTotal').addClass('right').html('Отмечено верно ' + inputsRightChecked + ' из ' + inputs.length+'!');
		}else if (inputsRightChecked > 0 && inputsRightChecked == inputs.length && inputsWrongChecked!=0) {
			form.find('.showTotal').addClass('partial').html('Отмечено верно ' + inputsRightChecked + ' из ' + inputs.length+', но допущены ошибки!');
			answer=1;
		}else if (inputsRightChecked > 0 && inputsRightChecked != inputs.length) {
			form.find('.showTotal').addClass('partial').html('Отмечено верно ' + inputsRightChecked + ' из ' + inputs.length+'!');
			answer=1;
		} else if (inputsRightChecked == 0) {
			form.find('.showTotal').addClass('wrong').html('Ответ неверный!');
			answer=2;
		}
		this.statistics.push({question:question,answer:answer});
	}
	
	AnswerSubmit.prototype.showRightForSequence = function(form){
		var question = form.find('.question').text();
		var answer = 0;
		if(this.checkTextAnswer(form)) form.find('.showTotal').addClass('right').html('Правильный ответ!');
		else  {
			form.find('.showTotal').addClass('wrong').html('Неверный ответ!');
			answer = 2;
		}
		this.statistics.push({question:question,answer:answer});
	};
	
	AnswerSubmit.prototype.checkTextAnswer = function(form){
		var inputs = form.serializeArray();
		var textAnswer='';
		inputs.forEach(function(input){
			textAnswer+=input.value;
		});
		return (Number(textAnswer)===form.data('answer'));
	};
	
	AnswerSubmit.prototype.submitHandler = function(userData){
		var self=this;
		$('.'+this.selector).on('submit', function(e){
			e.preventDefault();
			$(this).find("button").prop('disabled',true);
			setTimeout(function(){$(this).parent().hide(200)}.bind(this),2000);
			$(this).data('type') == 'simplesum' ? self.showRight($(this)) : self.showRightForSequence($(this));
			self.checkAnswer (userData, $(this));
			self.checkRemains();
		});
	}
	
	AnswerSubmit.prototype.checkRemains = function(){
			this.remains = this.remains - 1;
			if(this.remains==0) setTimeout(function(){$('#finishTest').trigger('click')},2000);
	}
	
	AnswerSubmit.prototype.checkAnswer=function(userData, form){
		if(form.data('type') === 'simplesum') {
			 form.serializeArray().forEach(function(item){
				userData.increaseSum(Number(item.value));
			})
		} else if (form.data('type')==='sequence') {
			if(this.checkTextAnswer(form)) userData.increaseSum(1);
		}
	};
	
	window.AnswerSubmit=AnswerSubmit;
})();