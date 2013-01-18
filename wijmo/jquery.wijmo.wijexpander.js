/*globals jQuery,$*/
/*jslint white: false */
/*
*
* Wijmo Library 2.3.4
* http://wijmo.com/
*
* Copyright(c) GrapeCity, Inc.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo Expander widget.
* 
* Depends:
*  jquery.ui.core.js
*  jquery.ui.widget.js
*  jquery.wijmo.wijutil.js
*  jquery.wijmo.wijexpander.js
*  Non-default animations requires UI Effects Core
*
*/
(function ($) {
	"use strict";


	$.widget("wijmo.wijexpander", {
		// widget options
		options: {
			/// <summary>
			/// Determines if the widget can expand. Set this option to false if
			/// you want to disable collapse/expand ability.
			/// Default: true
			/// Type: Boolean.
			/// Code example: $("#element").wijexpander({ allowExpand: false });
			/// </summary>
			allowExpand: true,
			/// <summary>
			/// Determines the animation easing effect; set this option to false in 
			/// order to disable animation.
			/// Custom easing effects require the UI Effects Core. Additional options 
			/// that are available for the animation function include:
			/// expand - value of true indicates that content element must be expanded.
			/// horizontal - value of true indicates that expander is horizontally 
			///	orientated (when expandDirection is left or right).
			/// content - jQuery object that contains content element to be expanded or 
			///				collapsed.
			/// Default: "slide"
			/// Type: string.
			/// Code example: 
			///        $("#expander2").wijexpander({
			///            animated: "custom1"
			///        });
			///        jQuery.wijmo.wijexpander.animations.custom1 = function (options) {
			///            this.slide(options, {
			///                easing: "easeInBounce",
			///                duration: 900
			///            });
			///        }
			/// </summary>
			animated: 'slide',
			/// <summary>
			/// Determines the URL to the external content. For example, 
			/// http://componentone.com/ for the ComponentOne Web site.
			/// Default: ""
			/// Type: string.
			/// Code example:
			///	$("#element").wijexpander({ contentUrl: "http://componentone.com/" });
			/// </summary>
			contentUrl: "",
			/// <summary>
			/// Determines the visibility state of the content panel. If true, the 
			///	content element is visible.
			/// Default: true
			/// Type: Boolean
			/// Code example: $("#element").wijexpander({ expanded: false });
			/// </summary>
			expanded: true,
			/// <summary>
			/// Determines the content expand direction. Available values are top, right,
			///	bottom, and left. 
			/// Default: "bottom"
			/// Type: string
			/// Code example: $("#element").wijexpander({ expandDirection: "right" });
			/// </summary>
			expandDirection: "bottom"
		},

		/*Available Events:
		/// <summary>
		/// Occurs before the content area collapses. 
		/// Return false or call event.preventDefault() in order to cancel event and 
		/// prevent the content area from collapsing.
		/// Type: Function
		/// Event type: wijexpanderbeforecollapse
		/// Code example:
		/// Supply a callback function to handle the beforeCollapse event as an option.
		/// $("#expander").wijexpander({ beforeCollapse: function (e) {
		///		...
		///    }
		///	});
		/// Bind to the event by type: wijexpanderbeforecollapse.
		/// $( "#expander" ).bind( "wijexpanderbeforecollapse", function(e) {
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>			
		beforeCollapse(e)

		/// <summary>
		/// Occurs before the content area expands. 
		/// Return false or call event.preventDefault() in order to cancel event and 
		/// prevent the content area from expanding.
		/// Type: Function
		/// Event type: wijexpanderbeforeexpand
		/// Code example:
		/// Supply a callback function to handle the beforeExpand event as an option.
		/// $("#expander").wijexpander({ beforeExpand: function (e) {
		///		...
		///    }
		///	});
		/// Bind to the event by type: wijexpanderbeforeexpand.
		/// $( "#expander" ).bind( "wijexpanderbeforeexpand", function(e) {
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		beforeExpand(e)

		/// <summary>
		/// Occurs after the content area collapses.
		/// Event type: wijexpanderaftercollapse
		/// Code example:
		/// Supply a callback function to handle the afterCollapse event as an option.
		/// $("#expander").wijexpander({ afterCollapse: function (e) {
		///		...
		///    }
		///	});
		/// Bind to the event by type: wijexpanderaftercollapse.
		/// $( "#expander" ).bind( "wijexpanderaftercollapse", function(e) {
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		afterCollapse(e)

		/// <summary>
		/// Occurs after the content area expands.
		/// Event type: wijexpanderafterexpand
		/// Code example:
		/// Supply a callback function to handle the afterExpand event as an option.
		/// $("#expander").wijexpander({ afterExpand: function (e) {
		///		...
		///    }
		///	});
		/// Bind to the event by type: wijexpanderafterexpand.
		/// $( "#expander" ).bind( "wijexpanderafterexpand", function(e) {
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		afterExpand(e)
		*/


		// handle option changes:
		_setOption: function (key, value) {
			switch (key) {
				case "contentUrl":
					if (value) {
						this.element.find("> .ui-widget-content").wijContent(value);
					} else {
						this.element.find("> .ui-widget-content").html("");
					}
					break;
				case "disabled":
					if (value) {
						this.element.addClass("ui-state-disabled")
					.find("> .ui-expander-header").addClass("ui-state-disabled");
						this.element.find("> .ui-widget-content").addClass("ui-state-disabled");
					} else {
						this.element.removeClass("ui-state-disabled")
					.find("> .ui-expander-header").removeClass("ui-state-disabled");
						this.element.find("> .ui-widget-content").removeClass("ui-state-disabled");
					}
					break;
				case "expandDirection":
					this._onDirectionChange(value, true, this.options.expandDirection);
					break;
				case "expanded":
					if (value) {
						this.expand();
					} else {
						this.collapse();
					}
					// option value already stored inside expand/collapse method 
					// if action is not cancelled, so we need return here.
					return;
				default:
					break;
			}
			$.Widget.prototype._setOption.apply(this, arguments);

		},
		// widget creation:    
		_create: function () {
			var elems = this.element.children(), header, content;

			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}

			// do not call base c1headercontentcontrol _create method here since we don't 
			// want to place c1headercontentcontrol classes on the widget element
			this.element.addClass(
		"wijmo-wijexpander ui-expander ui-widget ui-helper-reset ui-expander-icons");
			header = $(elems[0]);
			content = $(elems[1]);
			if (this.options.expandDirection === "left" ||
			this.options.expandDirection === "top") {
				header.remove();
				header.insertAfter(content);
			}
			header.addClass("ui-expander-header ui-helper-reset");
			// ARIA
			header.attr("role", "tab");
			content.attr("role", "tabpanel");

			if (header.find("> a").length === 0) {
				// fix for 32089:
				header.wrapInner('<a href="javascript:void(null)"></a>');
				//header.wrapInner('<a href="#"></a>');
			}
			if (header.find("> .ui-icon").length === 0) {
				$('<span class="ui-icon"></span>').insertBefore($("> a", header)[0]);
			}
			content.addClass("ui-expander-content ui-helper-reset ui-widget-content");
		},
		// widget initialization:
		_init: function () {

			var o = this.options;
			this._onDirectionChange(o.expandDirection, false);
			if (o.contentUrl) {
				$(".ui-widget-content", this.element).wijContent(this.options.contentUrl);
			}
			if (!o.expanded) {
				this.element.find("> .ui-widget-content").hide();
				this.element.find("> .ui-expander-header")
				.addClass("ui-state-default ui-corner-all")
				.attr({
					"aria-expanded": "false",
					tabIndex: -1
				})
				.find("> .ui-icon").addClass(this._triangleIconClosed);
			} else {
				this.element.find("> .ui-expander-header")
				.addClass("ui-state-active")
				.attr({
					"aria-expanded": "true",
					tabIndex: 0
				})
				.addClass(this._headerCornerOpened)
				.find("> .ui-icon")
				.addClass(this._triangleIconOpened);
				this.element.find("> .ui-widget-content")
				.addClass("ui-expander-content-active")
				.addClass(this._contentCornerOpened)
				.wijTriggerVisibility();
			}
			if (o.disabled) {
				this.element.addClass("ui-state-disabled")
					.find("> .ui-expander-header").addClass("ui-state-disabled");
				this.element.find("> .ui-widget-content").addClass("ui-state-disabled");
			}
			this._bindLiveEvents();
		},

		destroy: function () {
			this._unbindLiveEvents();
			this.element.removeClass(
		"wijmo-wijexpander ui-expander ui-widget ui-helper-reset ui-expander-icons");
			//.removeData('wijexpander');
			$.Widget.prototype.destroy.apply(this, arguments);

		},

		_bindLiveEvents: function () {
			$(".ui-expander-header", this.element[0]).live("click.wijexpander",
												jQuery.proxy(this._onHeaderClick, this))
		.live("mouseenter.wijexpander", function () {
			$(this).addClass('ui-state-hover');
		})
		.live("mouseleave.wijexpander", function () {
			$(this).removeClass('ui-state-hover');
		})
		.live("focus.wijexpander", function () {
			$(this).addClass('ui-state-focus');
		})
		.live("blur.wijexpander", function () {
			$(this).removeClass('ui-state-focus');
		});
		},
		_unbindLiveEvents: function () {
			$('.ui-expander-header', this.element[0]).die(".wijexpander");
		},

		_onDirectionChange: function (newDirection, allowDOMChange, prevDirection) {
			var rightToLeft, openedHeaders, openedContents, openedTriangles,
			closedTriangles, prevIsRightToLeft, content, header;
			if (prevDirection && prevDirection !== newDirection) {
				this.element.removeClass("ui-expander-" + prevDirection);
			}
			if (allowDOMChange) {
				openedHeaders = this.element.find(".ui-expander-header." +
												this._headerCornerOpened);
				openedHeaders.removeClass(this._headerCornerOpened);
				openedContents = this.element.find(".ui-widget-content." +
												this._contentCornerOpened);
				openedContents.removeClass(this._contentCornerOpened);
				openedTriangles = this.element.find("." + this._triangleIconOpened);
				closedTriangles = this.element.find("." + this._triangleIconClosed);
				openedTriangles.removeClass(this._triangleIconOpened);
				closedTriangles.removeClass(this._triangleIconClosed);
			}
			switch (newDirection) {
				case "top":
					this._headerCornerOpened = "ui-corner-bottom";
					this._contentCornerOpened = "ui-corner-top";
					this._triangleIconOpened = "ui-icon-triangle-1-n";
					this._triangleIconClosed = "ui-icon-triangle-1-e";
					rightToLeft = true;
					this.element.removeClass("ui-helper-horizontal");
					this.element.addClass("ui-expander-top");
					break;
				case "right":
					this._headerCornerOpened = "ui-corner-left";
					this._contentCornerOpened = "ui-corner-right";
					this._triangleIconOpened = "ui-icon-triangle-1-e";
					this._triangleIconClosed = "ui-icon-triangle-1-s";
					rightToLeft = false;
					this.element.addClass("ui-helper-horizontal");
					this.element.addClass("ui-expander-right");
					break;
				case "left":
					this._headerCornerOpened = "ui-corner-right";
					this._contentCornerOpened = "ui-corner-left";
					this._triangleIconOpened = "ui-icon-triangle-1-w";
					this._triangleIconClosed = "ui-icon-triangle-1-s";
					rightToLeft = true;
					this.element.addClass("ui-helper-horizontal");
					this.element.addClass("ui-expander-left");
					break;
				default: //case "bottom":
					this._headerCornerOpened = "ui-corner-top";
					this._contentCornerOpened = "ui-corner-bottom";
					this._triangleIconOpened = "ui-icon-triangle-1-s";
					this._triangleIconClosed = "ui-icon-triangle-1-e";
					rightToLeft = false;
					this.element.removeClass("ui-helper-horizontal");
					this.element.addClass("ui-expander-bottom");
					break;
			}
			prevIsRightToLeft = this.element.data("rightToLeft");
			this.element.data("rightToLeft", rightToLeft);

			if (allowDOMChange) {
				openedTriangles.addClass(this._triangleIconOpened);
				closedTriangles.addClass(this._triangleIconClosed);
				openedHeaders.addClass(this._headerCornerOpened);
				openedContents.addClass(this._contentCornerOpened);
			}

			if (allowDOMChange && rightToLeft !== prevIsRightToLeft) {
				this.element.children(".ui-expander-header").each(function () {
					header = $(this);
					if (rightToLeft) {
						content = header.next(".ui-expander-content");
						header.remove();
						header.insertAfter(content);
					} else {
						content = header.prev(".ui-expander-content");
						header.remove();
						header.insertBefore(content);
					}
				});
			}

		},

		/** public methods */

		/// <summary>
		/// Collapse content panel.
		/// Code Example: $("#element").wijexpander("collapse");
		///</summary>
		collapse: function () {
			var o = this.options, animOptions, animations, duration, easing;
			if (!o.allowExpand) {
				return;
			}
			if (this.element.hasClass("ui-state-disabled")) {
				return false;
			}

			if (!this._trigger("beforeCollapse")) {
				return false;
			}
			/*
			newEv = jQuery.Event("beforecollapse");
			this.element.trigger(newEv);
			if (newEv.isDefaultPrevented()) {
			return false;
			}*/
			if (o.animated) {
				animOptions = {
					expand: false,
					content: this.element.find("> .ui-widget-content"),
					complete: jQuery.proxy(function () {
						this.element.find("> .ui-widget-content")
						.removeClass("ui-expander-content-active");
						this._trigger("afterCollapse");
						this.element.find("> .ui-widget-content").css('display', '');

					}, this),
					horizontal: this.element.hasClass("ui-helper-horizontal")
				};

				animations = $.wijmo.wijexpander.animations;
				duration = o.duration;
				easing = o.animated;
				if (easing && !animations[easing] && !$.easing[easing]) {
					easing = 'slide';
				}
				if (!animations[easing]) {
					animations[easing] = function (options) {
						this.slide(options, {
							easing: easing,
							duration: duration || 700
						});
					};
				}
				animations[easing](animOptions);
			} else {
				this.element.find("> .ui-widget-content").hide();
				this._trigger("afterCollapse");
			}
			this.element.find("> .ui-expander-header")
			.removeClass("ui-state-active")
			.removeClass(this._headerCornerOpened)
			.attr({
				"aria-expanded": "false",
				tabIndex: -1
			})
			.addClass("ui-state-default ui-corner-all")
			.find("> .ui-icon").removeClass(this._triangleIconOpened)
			.addClass(this._triangleIconClosed);
			this.options.expanded = false;
			return true;
		},
		/// <summary>
		/// Expand content panel.
		/// Code Example: $("#element").wijexpander("expand");
		///</summary>
		expand: function () {
			var o = this.options, animOptions, animations, duration, easing;
			if (!o.allowExpand) {
				return;
			}
			if (this.element.hasClass("ui-state-disabled")) {
				return false;
			}
			if (!this._trigger("beforeExpand")) {
				return false;
			}

			//this.element.addClass("ui-state-expanded");
			if (o.animated) {

				animOptions = {
					expand: true,
					content: this.element.find("> .ui-widget-content"),
					complete: jQuery.proxy(function () {
						this.element.find("> .ui-widget-content")
						.addClass("ui-expander-content-active")
						.addClass(this._contentCornerOpened)
						.wijTriggerVisibility();
						this._trigger("afterExpand")
						this.element.find("> .ui-widget-content").css('display', '');
					}, this),
					horizontal: this.element.hasClass("ui-helper-horizontal")
				};
				animations = $.wijmo.wijexpander.animations;
				duration = o.duration;
				easing = o.animated;
				if (easing && !animations[easing] && !$.easing[easing]) {
					easing = 'slide';
				}
				if (!animations[easing]) {
					animations[easing] = function (options) {
						this.slide(options, {
							easing: easing,
							duration: duration || 700
						});
					};
				}
				animations[easing](animOptions);
			} else {
				this.element.find("> .ui-widget-content").show();
				this._trigger("afterExpand");
			}
			this.element.find("> .ui-expander-header")
			.removeClass("ui-state-default ui-corner-all")
			.addClass("ui-state-active").addClass(this._headerCornerOpened)
			.attr({
				"aria-expanded": "true",
				tabIndex: 0
			})
			.find("> .ui-icon").removeClass(this._triangleIconClosed)
			.addClass(this._triangleIconOpened);
			this.options.expanded = true;
			return true;

		},

		/** Private methods */
		_onHeaderClick: function (e) {
			this.option("expanded", !this.options.expanded);
			// commented in order to fix issue 32089:
			//return false;	// fix for 32089
		}

	});


	$.extend($.wijmo.wijexpander, {
		animations: {
			slide: function (options, additions) {
				options = $.extend({
					easing: "swing",
					duration: 300
				}, options, additions);
				if (options.expand) {
					options.content.stop(true, true).animate(options.horizontal ?
						{ width: 'show', opacity: 'show'} :
						{ height: 'show', opacity: 'show' }, options);
				} else {
					options.content.stop(true, true).animate(options.horizontal ?
						{ width: 'hide', opacity: 'hide'} :
						{ height: 'hide', opacity: 'hide' }, options);
				}
			}
		}
	});
} (jQuery));
