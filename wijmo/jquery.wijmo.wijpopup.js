/*
 *
 * Wijmo Library 1.0.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Popup widget.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.position.js
 *  
 */

(function ($) {

	$.fn.extend({
		getBounds: function () {
			return $.extend({}, $(this).offset(), { width: $(this).outerWidth(true), height: $(this).outerHeight(true) });
		},
	
		setBounds: function (bounds) {
			$(this).css({'left': bounds.left, 'top': bounds.top})
				.width(bounds.width)
				.height(bounds.height);
			return this;
		},
		
		getMaxZIndex: function () {
			var max = (($(this).css('z-index') == 'auto') ? 0 : $(this).css('z-index')) * 1;
			$(this).siblings().each(function (i, e) {
				max = Math.max(max, (($(e).css('z-index') == 'auto') ? 0 : $(e).css('z-index')) * 1);
			});
			return max;
		}
	});


	$.widget("wijmo.wijpopup", {
		options: {
			///	<summary>
			///     Determines if the element's parent element is the outermost element. 
			///		If true, the element's parent element will be changed to the body or outermost form element.
			///	</summary>
			ensureOutermost: false,
			///	<summary>
			///     Specifies the effect to be used when the popup is shown.
			///		Possible values: 'blind', 'clip', 'drop', 'fade', 'fold', 'slide', 'pulsate'.
			///	</summary>
			showEffect: 'show',
			///	<summary>
			///     Specified the object/hash including specific options for the show effect.
			///	</summary>
			showOptions: {},
			///	<summary>
			///     Defines how long (in milliseconds) the animation duration for showing the popup will last.
			///	</summary>
			showDuration: 300,
			///	<summary>
			///     Specifies the effect to be used when the popup is hidden.
			///		Possible values: 'blind', 'clip', 'drop', 'fade', 'fold', 'slide', 'pulsate'.
			///	</summary>
			hideEffect: 'hide',
			///	<summary>
			///     Specified the object/hash including specific options for the hide effect.
			///	</summary>
			hideOptions: {},
			///	<summary>
			///     Defines how long (in milliseconds) the animation duration for hiding the popup will last.
			///	</summary>
			hideDuration: 100,
			///	<summary>
			///     Determines whether to automatically hide the popup when clicking outside the element.
			///	</summary>
			autoHide: false,
			///	<summary>
			///     Options for positioning the element, please see jquery.ui.position for possible options.
			///	</summary>
			position:{
				at: 'left bottom',
				my: 'left top'
			}
		},

		_create: function () {
		},

		_init: function () {
			if (!!this.options.ensureOutermost) {
				var root = $('form');
				if (root.length === 0) { root = $(document.body); }
				this.element.appendTo(root);
			}

			this.element.data('visible.wijpopup', false);
			this.element.css('position', "absolute");
			this.element.position({
				of: $(document.body)
			});
			this.element.hide();
		},

		_setOption: function (key, value) {
			$.Widget.prototype._setOption.apply(this, arguments);

			if (key === 'autoHide'){
				var visible = this.isVisible();
				this.hide();
				if (visible) { this.show(); }
			}
		},

		destroy: function () {
			$.Widget.prototype.destroy.apply(this, arguments);
			if (this.isVisible()) { this.hide(); }
			
			if ($.browser.msie && ($.browser.version < 7)) {
				jFrame = this.element.data('backframe.wijpopup');
				if (!jFrame) { jFrame.remove(); }
			}
			
			var self = this;
			this.element.unbind('.wijpopup');
			$.each( [ "visible", "backframe", "animating", "width" ], function( i, prefix ) {
				self.element.removeData( prefix + ".wijpopup" );
			});
		},

		isVisible: function () {
			/// <summary>Determines whether the element is visible.</summary>
			return (!!this.element.data('visible.wijpopup') && this.element.is(':visible'));
		},
		
		isAnimating: function(){
			return !!this.element.data("animating.wijpopup");
		},

		show: function (position) {
			/// <summary>Popups the element.  Position is an optional argument, it is the options object used in jquery.ui.position.</summary>
			this._setPosition(position);
			if (this.isVisible()) { return; }
			
			var data = {cancel: false};
			this._trigger('showing', null, data);
			if (data.cancel) { return; }

			if (this.options.autoHide) {
				$(document.body).bind('mouseup.wijpopup', $.proxy(this._onDocMouseUp, this));
			}

			var effect = this.options.showEffect || "show";
			var duration = this.options.showDuration || 300;
			var ops = this.options.showOptions || {};

			this.element.data("animating.wijpopup", true);

			if ($.effects && $.effects[effect]){
				this.element.show(effect, ops, duration, $.proxy(this._showCompleted, this));
			}else{
				this.element[effect]((effect === 'show' ? null : duration), $.proxy(this._showCompleted, this));
			}

			if (!effect || !duration || effect === 'show' || duration <= 0){
				this._showCompleted();
			}
		},

		_showCompleted: function () {
			this.element.removeData("animating.wijpopup");
			this.element.data('visible.wijpopup', true);
			this._trigger('shown');
		},

		showAt: function (x, y) {
			/// <summary>Popups the element at specified absolute position related to document.</summary>
			this.show({
				my: 'left top',
				at: 'left top',
				of: document.body,
				offset: '' + x + ' ' + y
			});
		},

		hide: function () {
			/// <summary>Hides the element.</summary>
			if (!this.isVisible()) { return; }
			
			var data = {cancel: false};
			this._trigger('hidding', null, data);
			if (data.cancel) { return; }

			$(document.body).unbind('mouseup.wijpopup');
			var effect = this.options.hideEffect || "hide";
			var duration = this.options.hideDuration || 300;
			var ops = this.options.hideOptions || {};

			this.element.data("animating.wijpopup", true);
			if ($.effects && $.effects[effect]){
				this.element.hide(effect, ops, duration, $.proxy(this._hideCompleted, this));
			}else{
				this.element[effect]((effect === 'hide' ? null : duration), $.proxy(this._hideCompleted, this));
			}

			if (!effect || !duration || effect === 'hide' || duration <= 0){
				this._hideCompleted();
			}
		},

		_hideCompleted: function () {
			if (this.element.data('width.wijpopup') !== undefined) {
				this.element.width(this.element.data('width.wijpopup'));
				this.element.removeData('width.wijpopup');
			}

			this.element.unbind('move.wijpopup');
			this.element.removeData("animating.wijpopup");
			
			if ($.browser.msie && ($.browser.version < 7)) {
				var jFrame = this.element.data('backframe.wijpopup');
				if (jFrame) { jFrame.hide(); }
			}
			
			this._trigger('hidden');
		},

		_onDocMouseUp: function (e) {
			var srcElement = e.target ? e.target : e.srcElement;
			if (this.isVisible() && !!this.options.autoHide) {
				if (srcElement != this.element.get(0) && $(srcElement).parents().index(this.element) < 0) { this.hide(); }
			}
		},

		_onMove: function (e) {
			var jFrame = this.element.data('backframe.wijpopup');
			if (jFrame) {
				this.element.before(jFrame);
				jFrame.css({'top': this.element.css('top'),
					'left': this.element.css('left')
				});
			}
		},

		_addBackgroundIFrame: function () {
			if ($.browser.msie && ($.browser.version < 7)) {
				var jFrame = this.element.data('backframe.wijpopup');
				if (!jFrame) {
					jFrame = jQuery('<iframe/>')
						.css({'position': 'absolute', 
							'display': 'none',
							'filter': 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
						}).attr({'src': 'javascript:\'<html></html>\';',
							'scrolling': 'no',
							'frameborder': '0',
							'tabIndex ': -1
						});
					
					this.element.before(jFrame);
					this.element.data('backframe.wijpopup', jFrame);
					this.element.bind('move.wijpopup', $.proxy(this._onMove, this));
				}
				jFrame.setBounds(this.element.getBounds());
				document.title = this.element.css('display');
				jFrame.css({'display': 'block',
					'left': this.element.css('left'),
					'top': this.element.css('top'),
					'z-index': this.element.css('z-index') - 1
				});
			}
		},

		_setZIndex: function (index) {
			this.element.css('z-index', index);
			var jFrame = this.element.data('backframe.wijpopup');
			if (jFrame) {
				jFrame.css('z-index', (this.element.css('z-index')) - 1);
			}
		},
		
		_setPosition: function (position) {
			var visible = this.element.is(':visible');
			this.element.show();
			this.element.position($.extend({}, this.options.position, position ? position : {}));
			if (!visible) { this.element.hide(); }

			this._addBackgroundIFrame();
			var zIndex = 1000;
			if (this.options.position.of) {
				zIndex = Math.max(zIndex, $(this.options.position.of).getMaxZIndex());
			}

			this._setZIndex(zIndex + 10);
			this._trigger('posChanged');
		}
	});
   
})(jQuery);