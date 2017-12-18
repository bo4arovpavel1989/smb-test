(function(){
	
	function UserData(){
		this.name;
		this.sum;
		this.max;
	}
	
	UserData.prototype.setName = function(name){
		this.name=name;
		this.sum=0;
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
	
	UserData.prototype.finishTest=function(){
		var self=this;
		$('#finishTest').on('click',function(e){
			e.preventDefault();
			$(this).hide();
			self.renderResult();
		});
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