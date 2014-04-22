/*!
 * PopConfirm 0.1
 * http://ifnot.github.io/PopConfirm/
 *
 * Use jQuery & Bootstrap
 * http://jquery.com/
 * http://getbootstrap.com/
 *
 * Copyright 2014 Anael Favre and other contributors
 * Released under the MIT license
 * https://raw.github.com/AnaelFavre/PopConfirm/master/LICENCE
 */

(function($){
	$.fn.extend({
		popConfirm: function(options) {
			var defaults = {
				title: 'Confirmation',
				content: 'Are you really sure ?',
				placement: 'right',
				container: 'body',
				yesBtn:   'Yes',
				noBtn:    'No',
                yesCallBack: null,
                noCallBack: null,
			};
			var options =  $.extend(defaults, options);
			var last = null;
			
			return this.each(function() {
				var self = $(this);
				var arrayActions = [];
				

				self.popover({
					trigger: 'manual',
					title: options.title,
					html: true,
					placement: options.placement,
					container: options.container,
					content: options.content + '\
						<p class="button-group" style="margin-top: 10px; text-align: center;">\
							<button type="button" class="btn btn-small btn-danger confirm-dialog-btn-confirm">' + options.yesBtn + '</button>\
							<button type="button" class="btn btn-small confirm-dialog-btn-abort">' + options.noBtn + '</button>\
						</p>'
				}).click(function(e) {
					if(last && last !== self) last.popover('hide');
					last = self;
				});
				
				$(document).on('click', function(){
				    if (last) last.popover('hide');
				});

				self.bind('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					
					self.popover('show');
					
					$('.popover').find('.confirm-dialog-btn-confirm').bind('click', function(e) {
                        if (options.yesCallBack) {
                            options.yesCallBack(self);
                        }
						self.popover('hide');
					});
					$('.popover').find('.confirm-dialog-btn-abort').bind('click', function(e) {
                        if (options.noCallBack) {
                            options.noCallBack(self);
                        }
						self.popover('hide');
					});
				});
			});
		}
	});   
})(jQuery);
