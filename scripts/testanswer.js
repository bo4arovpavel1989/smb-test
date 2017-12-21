(function(){
	
	function AnswerSubmit(){
		this.selector;
		this.remains;
	}
	
	AnswerSubmit.prototype.setSelector = function(selector){
		this.selector=selector;
	}
	
	AnswerSubmit.prototype.setRemains = function(arr){
		this.remains=arr.length;
	}
	
	AnswerSubmit.prototype.showRight = function(form){
		var inputsChkBox = form.find('input[type=checkbox][value=1]');
		inputsChkBox.parent().addClass('rightAnswer');
		var inputsRadio = form.find('input[type=radio][value=1]');
		inputsRadio.parent().addClass('rightAnswer');
		var inputsChkBoxChecked = form.find('input[type=checkbox][value=1]:checked').length;
		var inputsRadioChecked = form.find('input[type=radio][value=1]:checked').length;
		if (inputsRadio.length > 0 && inputsRadioChecked >0) {
			form.find('.showTotal').addClass('right').html('Правильный ответ!');
		} else if (inputsRadio.length > 0 && inputsRadioChecked >=0) {
			form.find('.showTotal').addClass('wrong').html('Неправильный ответ!');
		} else if (inputsChkBox.length >0 && inputsChkBoxChecked > 0 && inputsChkBoxChecked == inputsChkBox.length) {
			form.find('.showTotal').addClass('right').html('Отмечено верно ' + inputsChkBoxChecked + ' из ' + inputsChkBox.length+'!');
		}else if (inputsChkBox.length >0 && inputsChkBoxChecked > 0 && inputsChkBoxChecked != inputsChkBox.length) {
			form.find('.showTotal').addClass('partial').html('Отмечено верно ' + inputsChkBoxChecked + ' из ' + inputsChkBox.length+'!');
		} else if (inputsChkBox.length >0 && inputsChkBoxChecked == 0) {
			form.find('.showTotal').addClass('wrong').html('Не отмечен ни один правильный вариант!');
		}	
	}
	
	AnswerSubmit.prototype.submitHandler = function(userData, fn){
		var self=this;
		$('.'+this.selector).on('submit', function(e){
			e.preventDefault();
			$(this).find("button").prop('disabled',true);
			setTimeout(function(){$(this).parent().hide(200)}.bind(this),2000);
			self.showRight($(this));
			self.remains = self.remains - 1;
			self.checkAnswer (userData, $(this).serializeArray(), $(this).data('type'), $(this).data('answer'));
			if(self.remains==0) setTimeout(function(){$('#finishTest').trigger('click')},2000);
		});
	}
	
	AnswerSubmit.prototype.checkAnswer=function(userData, serializeData, type, rightAnswer){
		if(type === 'simplesum') {
			serializeData.forEach(function(item){
				userData.increaseSum(Number(item.value));
			})
		} else if (type==='sequence') {
			var textAnswer='';
			serializeData.forEach(function(item){
				textAnswer += item.value;
			});
			if(Number(textAnswer)===rightAnswer) userData.increaseSum(1);
		}
	};
	
	window.AnswerSubmit=AnswerSubmit;
})();