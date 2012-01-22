/*globals jQuery,$*/
/*jslint white: false */
/*
 *
 * Wijmo Library 1.5.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 ** Wijmo Accordion Widget.
*
* Depends:
*  jquery.ui.core.js
*  jquery.ui.widget.js
*  jquery.wijmo.wijutil.js
*  jquery.wijmo.wijaccordion.js
*
*/

(function ($) {
	"use strict";
	$.widget("wijmo.wijaccordion", {
		// widget options
		options: {
			/// <summary>
			/// Sets the animation easing effect. Set this option to false in order to 
			///	disable animation. Easing effects require UI Effects Core.
			/// Options available for the animation function include:
			///  down – If true, indicates that the index of the pane should be expanded 
			///			higher than the index of the pane that must be collapsed.
			///  horizontal – If true, indicates that the accordion have a horizontal 
			///			orientation (when the expandDirection is left or right).
			///  rightToLeft – If true, indicates that the content element is located 
			///			before the header element (top and left expand direction).
			///  toShow – jQuery object that contains the content element(s) should be 
			///			shown.
			///  toHide –jQuery object that contains the content element(s) should be 
			///			hidden.
			/// Type: String
			/// Default: "slide"
			/// Code example:
			/// Create your own animation:
			/// jQuery.wijmo.wijaccordion.animations.custom1 = function (options) {
			///     this.slide(options, {
			///     easing: options.down ? "easeOutBounce" : "swing",
			///     duration: options.down ? 1000 : 200
			///   });
			/// }
			///  $("#accordion3").wijaccordion({
			///      expandDirection: "right",
			///      animated: "custom1"
			///  });
			/// </summary>
			animated: 'slide',

			/// <summary>
			/// The animation duration in milliseconds. By default animation duration 
			///	value depends on an animation effect specified by the animation option.
			/// Type: Number
			/// Default: null
			/// Code example:
			///  $("#accordion3").wijaccordion({
			///      duration: 1000
			///  });
			/// </summary>
			duration: null,

			/// <summary>
			/// Determines the event that triggers the accordion.
			/// Type: String
			/// Default: "click"       
			/// Code example:
			///  $("#accordion3").wijaccordion({
			///      event: "mouseover"
			///  });
			/// </summary>
			event: "click",
			/// <summary>
			/// Determines whether the widget behavior is disabled.
			/// Type: Boolean
			/// Default: false
			/// Code example:
			///   $(".selector").wijaccordion({ disabled: true });
			/// </summary>
			disabled: false,
			/// <summary>
			/// Determines the direction in which the content area expands. Available 
			///	values include: top, right, bottom, and left. 
			/// Type: String
			/// Default: "bottom"
			/// Code example: 
			///    $("#element").wijaccordion({ expandDirection: "right" });
			/// </summary>
			expandDirection: "bottom",
			/// <summary>
			/// Selector for the header element. By using this option you can put 
			///	header/content elements inside LI tags or into any other more complex 
			///	html markup.
			/// Type: String
			/// Default: "> li > :first-child,> :not(li):even"
			/// Code example: $("#element").wijaccordion({ header: "h3" });
			/// </summary>
			header: "> li > :first-child,> :not(li):even",
			/// <summary>
			/// Determines whether clicking the header will close the currently opened 
			///	pane (leaving all the accordion's panes closed).
			/// Type: Boolean
			/// Default: true
			/// Code example:
			///    $("#element").wijaccordion({ requireOpenedPane: false });
			/// </summary>
			requireOpenedPane: true,
			/// <summary>
			/// Gets or sets the index of the currently expanded accordion pane.
			/// Type: Number
			/// Default: 0
			/// Code example:
			///   $("#element").wijaccordion({ selectedIndex: 5 });
			/// </summary>
			selectedIndex: 0
		},

		/*
		Available Events:
		/// <summary>
		/// Occurs before an active accordion pane change.
		/// Return false or call event.preventDefault() in order to cancel event and
		///	prevent the selectedIndex change.
		/// Type: Function
		/// Event type: wijaccordionbeforeselectedindexchanged
		/// Code example:
		/// Supply a callback function to handle the beforeSelectedIndexChanged 
		///	event as an option.
		/// $("#accordion").wijaccordion({
		///		beforeSelectedIndexChanged: function (e, args) {
		///			alert(args.prevIndex + "->" + args.newIndex);
		///         ...
		/// }});
		/// Bind to the event by type: wijaccordionbeforeselectedindexchanged.
		/// $( "#accordion" ).bind( "wijaccordionbeforeselectedindexchanged", function(e, args) {
		///			alert(args.prevIndex + "->" + args.newIndex);
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		/// <param name="args" type="Object">
		/// Event arguments:
		///	args.newIndex - Index of a pane that will be expanded.
		///	args.prevIndex - Index of a pane that will be collapsed.
		///	</param>
		beforeSelectedIndexChanged(e, args)

		/// <summary>
		/// Occurs when an active accordion pane changed.
		/// Type: Function
		/// Event type: wijaccordionselectedindexchanged
		/// Code example:
		/// Supply a callback function to handle the selectedIndexChanged 
		///	event as an option.
		/// $("#accordion").wijaccordion({
		///		selectedIndexChanged: function (e, args) {
		///			alert(args.prevIndex + "->" + args.newIndex);
		///         ...
		/// }});
		/// Bind to the event by type: wijaccordionselectedindexchanged.
		/// $( "#accordion" ).bind( "wijaccordionselectedindexchanged", function(e, args) {
		///			alert(args.prevIndex + "->" + args.newIndex);
		///		...		
		/// });
		/// </summary>
		/// <param name="e" type="Object">jQuery.Event object.</param>
		/// <param name="args" type="Object">
		/// Event arguments:
		///	args.newIndex - Index of the activated pane.
		/// args.prevIndex - Index of the collapsed pane.
		///	</param>
		selectedIndexChanged(e, args)

		*/

		// handle option changes:
		_setOption: function (key, value) {
			var o = this.options;
			if (o[key] !== value) {
				switch (key) {
					case "selectedIndex":
						this.activate(value);
						break;
					case "disabled":
						if (value) {
							this.element.addClass("ui-state-disabled");
						} else {
							this.element.removeClass("ui-state-disabled");
						}
						break;
					case "event":
						this._unbindLiveEvents();
						this.options.event = value;
						this._bindLiveEvents();
						break;
					case "header":
						this._handleHeaderChange(value, o.header);
						break;
					case "animated":
						break;
					case "expandDirection":
						this._onDirectionChange(value, true, o.expandDirection);
						break;
					default:
						break;
				}
			}
			$.Widget.prototype._setOption.apply(this, arguments);
		},

		_handleHeaderChange: function (newHeaderSelector, prevHeaderSelector) {
			var prevHeaders = this.element.find(prevHeaderSelector);
			prevHeaders
				.removeClass("ui-accordion-header ui-helper-reset ui-state-active " +
							this._triangleIconOpened).siblings(".ui-accordion-content")
				.removeClass(
"ui-accordion-content ui-helper-reset ui-widget-content ui-accordion-content-active");
			this._initHeaders(newHeaderSelector);
		},
		_initHeaders: function (selector) {
			var o = this.options;
			selector = selector ? selector : o.header;
			this.headers = this.element.find(selector);
			this.headers.each($.proxy(this._initHeader, this));
		},
		_initHeader: function (index, elem) {
			var o = this.options, rightToLeft = this.element.data("rightToLeft"),
					header = $(elem),
					content = $(header.next()[0]);
			if (rightToLeft) {
				header.remove();
				header.insertAfter(content);
			}
			header.addClass("ui-accordion-header ui-helper-reset")
			  .attr("role", "tab");
			content.attr("role", "tabpanel");
			if (header.find("> a").length === 0) {
				header.wrapInner('<a href="#"></a>');
			}
			if (header.find("> .ui-icon").length === 0) {
				$('<span class="ui-icon"></span>').insertBefore($("> a", header)[0]);
			}
			if (index === o.selectedIndex) {
				header.addClass("ui-state-active").addClass(this._headerCornerOpened)
				.attr({
					"aria-expanded": "true",
					tabIndex: 0
				})
				.find("> .ui-icon").addClass(this._triangleIconOpened);
				content.addClass("ui-accordion-content-active")
					.addClass(this._contentCornerOpened);
			} else {
				header.addClass("ui-state-default ui-corner-all")
				.attr({
					"aria-expanded": "false",
					tabIndex: -1
				})
				.find("> .ui-icon").addClass(this._triangleIconClosed);
				content.hide();
			}
			content.addClass("ui-accordion-content ui-helper-reset ui-widget-content");

		},
		_create: function () {
			this.element.addClass(
			"wijmo-wijaccordion ui-accordion ui-widget ui-accordion-icons " +
			"ui-helper-reset ui-helper-clearfix");
			var o = this.options;
			if (o.disabled) {
				this.element.addClass("ui-state-disabled");
			}
			this._onDirectionChange(o.expandDirection, false);
			this._initHeaders();
			this.element.attr("role", "tablist");
		},
		_init: function () {
			this._bindLiveEvents();
		},

		destroy: function () {
			this._unbindLiveEvents();
			this.element.removeClass(
			"wijmo-wijaccordion ui-accordion ui-widget ui-helper-reset ui-accordion-icons")
			.removeAttr("role");
			$.Widget.prototype.destroy.apply(this, arguments);

		},

		/// <summary>
		/// Activates the accordion content pane by its index.
		/// </summary>
		/// <param name="index" type="Number">
		///	Index of the accordion pane to be activated.
		///	</param>
		activate: function (index) {
			var nextHeader, o = this.options,
				headers = this.element.children(".ui-accordion-header"),
				prevHeader = this.element.find(".ui-accordion-header.ui-state-active"),
				rightToLeft = this.element.data("rightToLeft"),
				newIndex, prevIndex, nextContent, prevContent, ev,
				animOptions, proxied, proxiedDuration, animations, duration, easing;
			if (typeof index === "number") {
				nextHeader = $(headers[index]);
			} else if (typeof index === "string") {
				index = parseInt(index, 0);
				nextHeader = $(headers[index]);
			} else {
				nextHeader = $(index);
				index = headers.index(index);
			}
			if (nextHeader.hasClass("ui-state-active")) {
				if (o.requireOpenedPane) {
					return false;
				}
				prevHeader = nextHeader;
				nextHeader = $(null);
			}
			else if (!o.requireOpenedPane) {
				prevHeader = $(null);
			}
			newIndex = $(".ui-accordion-header", this.element).index(nextHeader);
			prevIndex = $(".ui-accordion-header", this.element).index(prevHeader);

			nextContent = rightToLeft ?
							nextHeader.prev(".ui-accordion-content") :
							nextHeader.next(".ui-accordion-content");
			prevContent = rightToLeft ?
							prevHeader.prev(".ui-accordion-content") :
							prevHeader.next(".ui-accordion-content");
			if (prevHeader.length === 0 && nextHeader.length === 0) {
				return false;
			}
			if (!this._trigger("beforeSelectedIndexChanged", null, { newIndex: newIndex, prevIndex: prevIndex })) {
				return false;
			}

			prevHeader.removeClass("ui-state-active")
			.removeClass(this._headerCornerOpened)
			.addClass("ui-state-default ui-corner-all")
			.attr({
				"aria-expanded": "false",
				tabIndex: -1
			})
			.find("> .ui-icon").removeClass(this._triangleIconOpened)
			.addClass(this._triangleIconClosed);
			nextHeader.removeClass("ui-state-default ui-corner-all")
			.addClass("ui-state-active")
			.addClass(this._headerCornerOpened)
			.attr({
				"aria-expanded": "true",
				tabIndex: 0
			})
			.find("> .ui-icon").removeClass(this._triangleIconClosed)
			.addClass(this._triangleIconOpened);

			if (o.animated) {
				animOptions = {
					toShow: nextContent,
					toHide: prevContent,
					complete: $.proxy(function () {
						prevContent.removeClass("ui-accordion-content-active");
						nextContent.addClass("ui-accordion-content-active");
						prevContent.css('display', '');
						nextContent.css('display', '');
						if ($.fn.wijlinechart) {
							prevContent.find(".wijmo-wijlinechart").wijlinechart("redraw"); //?
							nextContent.find(".wijmo-wijlinechart").wijlinechart("redraw"); //?
						}
						//prevContent.wijTriggerVisibility();
						//nextContent.wijTriggerVisibility();
						this._trigger("selectedIndexChanged", null, { newIndex: newIndex, prevIndex: prevIndex });
					}, this),
					horizontal: this.element.hasClass("ui-helper-horizontal"),
					rightToLeft: this.element.data("rightToLeft"),
					down: (newIndex > prevIndex),
					autoHeight: o.autoHeight || o.fillSpace
				};
				proxied = o.animated;
				proxiedDuration = o.duration;
				if ($.isFunction(proxied)) {
					o.animated = proxied(animOptions);
				}
				if ($.isFunction(proxiedDuration)) {
					o.duration = proxiedDuration(animOptions);
				}

				animations = $.wijmo.wijaccordion.animations;
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
				if (prevHeader.length > 0) {
					prevContent.hide().removeClass("ui-accordion-content-active");
				}
				if (nextHeader.length > 0) {
					nextContent.show().addClass("ui-accordion-content-active")
									.addClass(this._contentCornerOpened);
				}
				if ($.fn.wijlinechart) {
					prevContent.find(".wijmo-wijlinechart").wijlinechart("redraw"); //?
					nextContent.find(".wijmo-wijlinechart").wijlinechart("redraw"); //?
				}
				//prevContent.wijTriggerVisibility();
				//nextContent.wijTriggerVisibility();
				this._trigger("selectedIndexChanged", null, { newIndex: newIndex, prevIndex: prevIndex });
			}
			this.options.selectedIndex = newIndex;
		},

		/** Private methods */
		_bindLiveEvents: function () {
			this.element.find('.ui-accordion-header')
			.live(this.options.event + ".wijaccordion",
									$.proxy(this._onHeaderClick, this))
			.live("keydown.wijaccordion",
									$.proxy(this._onHeaderKeyDown, this))
			.live("mouseenter.wijaccordion",
							function () { $(this).addClass('ui-state-hover'); })
			.live("mouseleave.wijaccordion",
							function () { $(this).removeClass('ui-state-hover'); })
			.live("focus.wijaccordion",
							function () { $(this).addClass('ui-state-focus'); })
			.live("blur.wijaccordion",
							function () { $(this).removeClass('ui-state-focus'); });
		},
		_unbindLiveEvents: function () {
			this.element.find('.ui-accordion-header').die("wijaccordion");
		},
		_onHeaderClick: function (e) {
			if (!this.options.disabled) {
				this.activate(e.currentTarget);
			}
			return false;
		},
		_onHeaderKeyDown: function (e) {
			if (this.options.disabled || e.altKey || e.ctrlKey) {
				return;
			}
			var keyCode = $.ui.keyCode, o = this.options,
				focusedHeader = this.element.find(".ui-accordion-header.ui-state-focus"),
				focusedInd, headers = this.element.find(".ui-accordion-header");
			if (focusedHeader.length > 0) {

				focusedInd = $(".ui-accordion-header",
									this.element).index(focusedHeader);

				switch (e.keyCode) {
					case keyCode.RIGHT:
					case keyCode.DOWN:
						if (headers[focusedInd + 1]) {
							headers[focusedInd + 1].focus();
							return false;
						}
						break;
					case keyCode.LEFT:
					case keyCode.UP:
						if (headers[focusedInd - 1]) {
							headers[focusedInd - 1].focus();
							return false;
						}
						break;
					case keyCode.SPACE:
					case keyCode.ENTER:
						this.activate(e.currentTarget);
						e.preventDefault();
				}

			}
			return true;
		},
		_onDirectionChange: function (newDirection, allowDOMChange, prevDirection) {
			var rightToLeft, openedHeaders, openedContents, openedTriangles,
			closedTriangles, prevIsRightToLeft;
			if (allowDOMChange) {
				openedHeaders = this.element.find(".ui-accordion-header." +
													this._headerCornerOpened);
				openedHeaders.removeClass(this._headerCornerOpened);
				openedContents = this.element.find(".ui-accordion-content." +
													this._contentCornerOpened);
				openedContents.removeClass(this._contentCornerOpened);
				openedTriangles = this.element.find("." + this._triangleIconOpened);
				closedTriangles = this.element.find("." + this._triangleIconClosed);
				openedTriangles.removeClass(this._triangleIconOpened);
				closedTriangles.removeClass(this._triangleIconClosed);
			}
			if (prevDirection !== null) {
				this.element.removeClass("ui-accordion-" + prevDirection);
			}
			switch (newDirection) {
				case "top":
					this._headerCornerOpened = "ui-corner-bottom";
					this._contentCornerOpened = "ui-corner-top";
					this._triangleIconOpened = "ui-icon-triangle-1-n";
					this._triangleIconClosed = "ui-icon-triangle-1-e";
					rightToLeft = true;
					this.element.removeClass("ui-helper-horizontal");
					this.element.addClass("ui-accordion-top");
					break;
				case "right":
					this._headerCornerOpened = "ui-corner-left";
					this._contentCornerOpened = "ui-corner-right";
					this._triangleIconOpened = "ui-icon-triangle-1-e";
					this._triangleIconClosed = "ui-icon-triangle-1-s";
					rightToLeft = false;
					this.element.addClass("ui-helper-horizontal");
					this.element.addClass("ui-accordion-right");
					break;
				case "left":
					this._headerCornerOpened = "ui-corner-right";
					this._contentCornerOpened = "ui-corner-left";
					this._triangleIconOpened = "ui-icon-triangle-1-w";
					this._triangleIconClosed = "ui-icon-triangle-1-s";
					rightToLeft = true;
					this.element.addClass("ui-helper-horizontal");
					this.element.addClass("ui-accordion-left");
					break;
				default: //bottom
					this._headerCornerOpened = "ui-corner-top";
					this._contentCornerOpened = "ui-corner-bottom";
					this._triangleIconOpened = "ui-icon-triangle-1-s";
					this._triangleIconClosed = "ui-icon-triangle-1-e";
					rightToLeft = false;
					this.element.removeClass("ui-helper-horizontal");
					this.element.addClass("ui-accordion-bottom");
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
				this.element.children(".ui-accordion-header").each(function () {
					var header = $(this), content;
					if (rightToLeft) {
						content = header.next(".ui-accordion-content");
						header.remove();
						header.insertAfter(content);
					} else {
						content = header.prev(".ui-accordion-content");
						header.remove();
						header.insertBefore(content);
					}
				});
			}

		}
	});


	$.extend($.wijmo.wijaccordion, {
		animations: {
			slide: function (options, additions) {
				options = $.extend({
					easing: "swing",
					duration: 300
				}, options, additions);
				if (!options.toHide.size()) {
					options.toShow.stop(true, true).animate(options.horizontal ?
									{ width: "show"} : { height: "show" }, options);
					return;
				}
				if (!options.toShow.size()) {
					options.toHide.stop(true, true).animate(options.horizontal ?
									{ width: "hide"} : { height: "hide" }, options);
					return;
				}
				var overflow = options.toShow.css('overflow'),
				percentDone = 0,
				showProps = {},
				hideProps = {},
				fxAttrs = options.horizontal ?
							["width", "paddingLeft", "paddingRight"] :
							["height", "paddingTop", "paddingBottom"],
				originalWidth, s = options.toShow;
				// fix width/height before calculating height/width of hidden element
				if (options.horizontal) {
					originalWidth = s[0].style.height;
					s.height(parseInt(s.parent().height(), 10) -
							parseInt(s.css("paddingTop"), 10) -
							parseInt(s.css("paddingBottom"), 10) -
							(parseInt(s.css("borderTopWidth"), 10) || 0) -
							(parseInt(s.css("borderBottomWidth"), 10) || 0));
				} else {
					originalWidth = s[0].style.width;
					s.width(parseInt(s.parent().width(), 10) -
							parseInt(s.css("paddingLeft"), 10) -
							parseInt(s.css("paddingRight"), 10) -
							(parseInt(s.css("borderLeftWidth"), 10) || 0) -
							(parseInt(s.css("borderRightWidth"), 10) || 0));
				}

				$.each(fxAttrs, function (i, prop) {
					hideProps[prop] = "hide";

					var parts = ('' + $.css(options.toShow[0], prop))
													.match(/^([\d+-.]+)(.*)$/);
					showProps[prop] = {
						value: parts ? parts[1] : 0,
						unit: parts ? (parts[2] || "px") : "px"
					};
				});
				options.toShow.css(options.horizontal ?
							{ width: 0, overflow: "hidden"} :
							{ height: 0, overflow: "hidden" }).stop(true, true).show();
				options.toHide.filter(":hidden").each(options.complete).end()
					.filter(":visible").stop(true, true).animate(hideProps, {
						step: function (now, settings) {
							if (settings.prop === options.horizontal ?
													"width" : "height") {
								percentDone = (settings.end - settings.start === 0) ? 0 :
							(settings.now - settings.start) /
							(settings.end - settings.start);
							}

							options.toShow[0].style[settings.prop] =
							(percentDone * showProps[settings.prop].value) +
							showProps[settings.prop].unit;
						},
						duration: options.duration,
						easing: options.easing,
						complete: function () {
							if (!options.autoHeight) {
								options.toShow.css(options.horizontal ?
															"width" : "height", "");
							}
							options.toShow.css(options.horizontal ?
											"height" : "width", originalWidth);
							options.toShow.css({ overflow: overflow });
							options.complete();
						}
					});
			},
			bounceslide: function (options) {
				this.slide(options, {
					easing: options.down ? "easeOutBounce" : "swing",
					duration: options.down ? 1000 : 200
				});
			}
		}
	});
} (jQuery));