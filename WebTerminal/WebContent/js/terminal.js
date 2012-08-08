/**
 * a simple web terminal
 */

(function($){
	
	var cmdhistory = new Array();
	var cmdhistoryIndex=-1;

	function createMsg(msg){
		return '<p>'+msg+'</p>';
	}
	
	$.fn.extend({
		
		jterminal: function(options){
			
			var defaults = {
				callback:function(msg){return 'invalid command: '+msg;},
				symbol:'>'
			}
			
			var options = $.extend(defaults, options);
			
			return this.each(function(){
				var o = options;
				var obj = $(this);
				
				//initiate UI
				obj.append('<p class="response">Web Terminal 0.1</p>');
				obj.append('<div class="line"><span class="prompt">＞</span><input class="readLine active" type="text"></div>');
				
				//welcome message
				$('.line').before(createMsg('welcome to web terminal !'));
				$('.active').focus();
				
				obj.click(function(){
					$('.active').focus();
				});
				$('.active').keydown(function(e){
					var code = (e.keyCode ? e.keyCode : e.which);
					
					//Enter keycode
					if(code == 13) { 
						e.preventDefault();
						
						var msg = $('.active').val();
						
						//keep input command on console line
						$('.line').before(createMsg(o.symbol + msg));
						//output result by callback method
						$('.line').before(createMsg(o.callback.call(this, msg)));
						
						$('.active').val('');
						$('.active').focus();
						
						var terminalDiv = obj;
						terminalDiv.animate({ scrollTop: terminalDiv.prop("scrollHeight") - terminalDiv.height() });
						
						if(msg!=''){
							cmdhistory.push(msg);
							cmdhistoryIndex = cmdhistory.length;
						}
					}
					
					// Up(38) / down(40) keys cycle through past history or move up/down
					if ( (code == 38 || code == 40) ) {
						e.preventDefault();
						
						var direction = code - 39;
						
						if(direction >0){
							if(cmdhistoryIndex+1<=cmdhistory.length) 
								cmdhistoryIndex++;
							
							if(cmdhistoryIndex == cmdhistory.length)
								$('.active').val('');
							else
								$('.active').val(cmdhistory[cmdhistoryIndex]);

						}else{
							if(cmdhistoryIndex>0)
								cmdhistoryIndex--;
							
							$('.active').val( cmdhistory[cmdhistoryIndex] );
						}
					}
				});
				
			});
		}
		
	});
	
})(jQuery);

