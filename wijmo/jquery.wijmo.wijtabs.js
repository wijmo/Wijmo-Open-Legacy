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
 * * Wijmo Tabs widget.
 *
 * Depends:
 *	jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.effects.core.js	
 *	jquery.cookie.js
 *  jquery.wijmo.wijsuperpanel.js
 *	jquery.wijmo.wijutil.js
 */
 (function($) {

var tabId = 0,
	listId = 0;

function getNextTabId() {
	return ++tabId;
}

function getNextListId() {
	return ++listId;
}

$.widget("wijmo.wijtabs", {
	options: {
		///	<summary>
		///		Determines the tabs' alignment in respect to the content.
		///     Possible values are: 'top', 'bottom', 'left' and 'right'.
		///	</summary>
		alignment: 'top',
		///	<summary>
		///		Determines whether the tab can be dragged to a new position.
		///	</summary>
		sortable: false,
		///	<summary>
		///		Determines whether to wrap to the next line or scrolling is enabled when the tabs exceed the specified width
		///	</summary>
		scrollable: false,
		///	<summary>
		///		This event is triggered when a tab is added.
		///	</summary>
		add: null,
		///	<summary>
		///		Additional Ajax options to consider when loading tab content (see $.ajax).
		///	</summary>
		ajaxOptions: null,
		///	<summary>
		///		Whether or not to cache remote tabs content, e.g. load only once or with every click. 
		///		Cached content is being lazy loaded, e.g once and only once for the first click. 
		///		Note that to prevent the actual Ajax requests from being cached by the browser you need to provide an extra cache: 
		///		false flag to ajaxOptions.
		///	</summary>
		cache: false,
		///	<summary>
		///		Store the latest selected tab in a cookie. 
		///		The cookie is then used to determine the initially selected tab if the selected option is not defined. 
		///		Requires cookie plugin. The object needs to have key/value pairs of the form the cookie plugin expects as options. 
		///	</summary>
		cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
		///	<summary>
		///		Determines whether a tab can be collapsed by a user. When this is set to true, an already selected tab will be collapsed upon reselection. 
		///	</summary>
		collapsible: false,
		///	<summary>
		///		This is an animation option for hiding the tabs panel content. 
		///	</summary>
		hideOption: null, // e.g. { blind: true, fade: true, duration: 200}
		///	<summary>
		///		This is an animation option for showing the tabs panel content. 
		///	</summary>
		showOption: null, // e.g. { blind: true, fade: true, duration: 200}
		///	<summary>
		///		This event is triggered when a tab is disabled.
		///	</summary>
		disable: null,
		///	<summary>
		///		An array containing the position of the tabs (zero-based index) that should be disabled on initialization.
		///	</summary>
		disabled: [],
		///	<summary>
		///		This event is triggered when a tab is enabled.
		///	</summary>
		enable: null,
		///	<summary>
		///		The type of event to be used for selecting a tab.
		///	</summary>
		event: 'click',
		///	<summary>
		///		If the remote tab, its anchor element that is, has no title attribute to generate an id from, 
		///		an id/fragment identifier is created from this prefix and a unique id returned by $.data(el), for example "ui-tabs-54".
		///	</summary>
		idPrefix: 'ui-tabs-',
		///	<summary>
		///		This event is triggered after the content of a remote tab has been loaded.
		///	</summary>
		load: null,
		///	<summary>
		///		HTML template from which a new tab panel is created in case of adding a tab with the add method or 
		///		when creating a panel for a remote tab on the fly.
		///	</summary>
		panelTemplate: '<div></div>',
		///	<summary>
		///		This event is triggered when a tab is removed.
		///	</summary>
		remove: null,
		///	<summary>
		///		This event is triggered when clicking a tab.
		///	</summary>
		select: null,
		///	<summary>
		///		This event is triggered when a tab is shown.
		///	</summary>
		show: null,
		///	<summary>
		///		The HTML content of this string is shown in a tab title while remote content is loading. 
		///		Pass in empty string to deactivate that behavior. 
		///		An span element must be present in the A tag of the title, for the spinner content to be visible.
		///	</summary>
		spinner: '<em>Loading&#8230;</em>',
		///	<summary>
		///		HTML template from which a new tab is created and added. 
		///		The placeholders #{href} and #{label} are replaced with the url and tab label that are passed as 
		///		arguments to the add method.
		///	</summary>
		tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
	},

	_create: function() {
		this._tabify(true);
	},

	_setOption: function(key, value) {
		$.Widget.prototype._setOption.apply(this, arguments);
		
		switch(key){
			case 'selected':
				if (this.options.collapsible && value == this.options.selected) {
					return;
				}
				this.select(value);
			break;
			
			case 'alignment':
				this.destroy();
				this._tabify(true);
			break;
			
			default:
				this._tabify();
			break;
		}
	},
	
	_initScroller: function(){
		var horz = $.inArray(this._getAlignment(), ['top', 'bottom']) != -1;
		if (!horz) { return; }

		var width = 0;
		this.lis.each(function() {
			width += $(this).outerWidth(true);
		});
		
		if (!!this.options.scrollable && this.element.innerWidth() < width){
			if (this.scrollWrap === undefined){
				this.list.wrap("<div class='scrollWrap'></div>");
				this.scrollWrap = this.list.parent();
				$.effects.save(this.list, ['width', 'height', 'overflow']);
			}

			this.list.width(width + 2);
			this.scrollWrap.height(this.list.outerHeight(true));
			this.scrollWrap.wijsuperpanel({
					allowResize: false,
					hScroller: {
						scrollMode: 'edge'
					},
					vScroller: {
						scrollBarVisibility: 'hidden'
					}
				});
		}else{
			this._removeScroller();
		}
	},
	
	_removeScroller: function(){
		if (this.scrollWrap){
			this.scrollWrap.wijsuperpanel('destroy').replaceWith(this.scrollWrap.contents());
			this.scrollWrap = undefined;
			$.effects.restore(this.list, ['width', 'height', 'overflow']);
		}
	},

	_tabId: function(a) {
		return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '') ||
			this.options.idPrefix + getNextTabId();
	},

	_sanitizeSelector: function(hash) {
		return hash.replace(/:/g, '\\:'); // we need this because an id may contain a ":"
	},

	_cookie: function() {
		var cookie = this.cookie || (this.cookie = this.options.cookie.name || 'ui-tabs-' + getNextListId());
		return $.cookie.apply(null, [cookie].concat($.makeArray(arguments)));
	},

	_ui: function(tab, panel) {
		return {
			tab: tab,
			panel: panel,
			index: this.anchors.index(tab)
		};
	},

	_cleanup: function() {
		// restore all former loading tabs labels
		this.lis.filter('.ui-state-processing').removeClass('ui-state-processing')
				.find('span:data(label.tabs)')
				.each(function() {
					var el = $(this);
					el.html(el.data('label.tabs')).removeData('label.tabs');
				});
	},
	
	_getAlignment : function(tabs){
		tabs = tabs === undefined ? true : tabs;
		var align = this.options.alignment || 'top';
		if (tabs) { return align; }
		
		switch(align){
			case 'top':
			align = 'bottom';
			break;
			
			case 'bottom':
			align = 'top';
			break;
			
			case 'left':
			align = 'right';
			break;
			
			case 'right':
			align = 'left';
			break;
		}
		
		return align;
	},
	
	_saveLayout: function(){
		var props = ['width', 'height', 'overflow'];
		$.effects.save(this.element, props);
		$.effects.save(this.list, props);
		$.effects.save(this.element.find('.wijmo-wijtabs-content'), props);
		this.list.width(this.list.width());
		
		$hide = this.panels.filter(':not(.ui-tabs-hide)');
		this.element.data('panel.width', $hide.width());
		this.element.data('panel.outerWidth', $hide.outerWidth(true));
	},
	
	_restoreLayout: function(){
		var props = ['width', 'height', 'overflow'];
		$.effects.restore(this.element, props);
		$.effects.restore(this.list, props);
		$.effects.restore(this.element.find('.wijmo-wijtabs-content'), props);
	},
	
	_hideContent: function(){
		var content=this.element.find('.wijmo-wijtabs-content');
		if (content.length){
			this._saveLayout();
			content.addClass('ui-tabs-hide').attr('aria-hidden', true);
			this.element.width(this.list.outerWidth(true));
		}
	},
	
	_showContent: function(){
		var content=this.element.find('.wijmo-wijtabs-content');
		if (content.length){
			this._restoreLayout();
			content.removeClass('ui-tabs-hide').attr('aria-hidden', false);
		}
	},
	
	_blindPanel: function(panel, mode){
		var o = this.options;
		var content = panel.parent('.wijmo-wijtabs-content');
		if (!content.length) { return; }

		this.list.width(this.list.width());		
		var props = ['position','top','left', 'width'];
		$.effects.save(panel, props); panel.show(); // Save & Show
		
		if (mode == 'show')	{
			panel.removeClass('ui-tabs-hide').attr('aria-hidden', false); // Show
			panel.width(this.element.data('panel.width'));
		}else{
			panel.width(panel.width());
		}
		
		var blindOption = mode == 'show' ? o.showOption : o.hideOption;
		var wrapper = $.effects.createWrapper(panel).css({overflow:'hidden'}); // Create Wrapper
		if(mode == 'show'){
			wrapper.css($.extend({width: 0}, blindOption.fade ? {opacity: 0} : {})); // Shift
		}

		// Animation
		var a = $.extend({width: mode == 'show' ? this.element.data('panel.outerWidth') : 0}, blindOption.fade ? {opacity: mode == 'show' ? 1 : 0} : {});
		var self = this;
		
		var listWidth = this.list.outerWidth(true);
		// Animate
		wrapper.animate(a, {
			duration: blindOption.duration,
			step: function(){
				var ww = wrapper.outerWidth(true);
				self.element.width(listWidth + ww);
				content.width(Math.max(0, self.element.innerWidth() - listWidth - 6));
			},
			complete: function() {
				if(mode == 'hide') {
					self.lis.removeClass('ui-tabs-selected ui-state-active').attr('aria-selected', false);
					panel.addClass('ui-tabs-hide').attr('aria-hidden', true); // Hide
				}else{
					panel.css('width', '');
				}
				//$.effects.restore(panel, props); 
				$.effects.removeWrapper(panel); // Restore
				
				if (mode == 'show') { self._restoreLayout(); }
				
				self._resetStyle(panel);
				panel.dequeue();
				self.element.dequeue("tabs");
			}
		});
	},
	
	// Reset certain styles left over from animation
	// and prevent IE's ClearType bug...
	_resetStyle: function ($el) {
		$el.css({ display: '' });
		if (!$.support.opacity) {
			$el[0].style.removeAttribute('filter');
		}
	},
	
	_normalizeBlindOption: function(o){
		if (o.blind === undefined) { o.blind = false; }
		if (o.fade === undefined) { o.fade = false; }
		if (o.duration === undefined) { o.duration = 200; }
		if (typeof o.duration == 'string'){
			try{
				o.duration = parseInt(o.duration, 10);
			}
			catch(e){
				o.duration = 200;
			}
		}
	},

	_tabify: function(init) {

		this.list = this.element.find('ol,ul').eq(0);
		this.lis = $('li:has(a[href])', this.list);
		this.anchors = this.lis.map(function() { return $('a', this)[0]; });
		this.panels = $([]);

		var self = this, o = this.options;

		var fragmentId = /^#.+/; // Safari 2 reports '#' for an empty hash
		this.anchors.each(function(i, a) {
			var href = $(a).attr('href');

			// For dynamically created HTML that contains a hash as href IE < 8 expands
			// such href to the full page url with hash and then misinterprets tab as ajax.
			// Same consideration applies for an added tab with a fragment identifier
			// since a[href=#fragment-identifier] does unexpectedly not match.
			// Thus normalize href attribute...
			var hrefBase = href.split('#')[0], baseEl;
			if (hrefBase && (hrefBase === location.toString().split('#')[0] ||
					(baseEl = $('base')[0]) && hrefBase === baseEl.href)) {
				href = a.hash;
				a.href = href;
			}

			// inline tab
			if (fragmentId.test(href)) {
				self.panels = self.panels.add(self._sanitizeSelector(href));
			}

			// remote tab
			else if (href != '#') { // prevent loading the page itself if href is just "#"
				$.data(a, 'href.tabs', href); // required for restore on destroy
				$.data(a, 'load.tabs', href.replace(/#.*$/, '')); // mutable data

				var id = self._tabId(a);
				a.href = '#' + id;
				var $panel = $('#' + id);
				if (!$panel.length) {
					$panel = $(o.panelTemplate).attr('id', id).addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')
						.insertAfter(self.panels[i - 1] || self.list);
					$panel.data('destroy.tabs', true);
				}
				self.panels = self.panels.add($panel);
			}

			// invalid tab href
			else {
				o.disabled.push(i);
			}
		});

		var tabsAlign = this._getAlignment(),
		panelCorner = this._getAlignment(false);
		
		// initialization from scratch
		if (init) {
			// ARIA
			this.list.attr( "role", "tablist" );
			this.lis.attr( "role", "tab" );
			this.panels.attr( "role", "tabpanel" );
		
			this.element.addClass('ui-tabs wijmo-wijtabs' + ' ui-tabs-' + tabsAlign + ' ui-widget ui-widget-content ui-corner-all ui-helper-clearfix');
			this.list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
			this.lis.addClass('ui-state-default' + ' ui-corner-' + tabsAlign);
			this.panels.addClass('ui-tabs-panel ui-widget-content ui-corner-' + panelCorner);
	
			var content;
			// attach necessary classes for styling
			switch(tabsAlign){
				case 'bottom':
					this.list.appendTo(this.element);
				break;
				
				case 'left':
					content = $('<div/>').addClass('wijmo-wijtabs-content').appendTo(this.element);
					this.panels.appendTo(content);
				break;
				
				case 'right':
					content = $('<div/>').addClass('wijmo-wijtabs-content').insertBefore(this.list);
					this.panels.appendTo(content);
				break;
				
				case 'top':
					this.list.prependTo(this.element);
				break;
			}

			// Selected tab
			// use "selected" option or try to retrieve:
			// 1. from fragment identifier in url
			// 2. from cookie
			// 3. from selected class attribute on <li>
			if (o.selected === undefined) {
				if (location.hash) {
					this.anchors.each(function(i, a) {
						if (a.hash == location.hash) {
							o.selected = i;
							return false; // break
						}
					});
				}
				if (typeof o.selected != 'number' && o.cookie) {
					o.selected = parseInt(self._cookie(), 10);
				}
				if (typeof o.selected != 'number' && this.lis.filter('.ui-tabs-selected').length) {
					o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
				}
				o.selected = o.selected || (this.lis.length ? 0 : -1);
			}
			else if (o.selected === null) { // usage of null is deprecated, TODO remove in next release
				o.selected = -1;
			}

			// sanity check - default to first tab...
			o.selected = ((o.selected >= 0 && this.anchors[o.selected]) || o.selected < 0) ? o.selected : 0;

			// Take disabling tabs via class attribute from HTML
			// into account and update option properly.
			// A selected tab cannot become disabled.
			o.disabled = $.unique(o.disabled.concat(
				$.map(this.lis.filter('.ui-state-disabled'),
					function(n, i) { return self.lis.index(n); } )
			)).sort();

			if ($.inArray(o.selected, o.disabled) != -1) {
				o.disabled.splice($.inArray(o.selected, o.disabled), 1);
			}

			// highlight selected tab
			this.panels.addClass('ui-tabs-hide').attr('aria-hidden', true);
			this.lis.removeClass('ui-tabs-selected ui-state-active').attr('aria-selected', false);
			if (o.selected >= 0 && this.anchors.length) { // check for length avoids error when initializing empty list
				this.panels.eq(o.selected).removeClass('ui-tabs-hide').attr('aria-hidden', false);
				this.lis.eq(o.selected).addClass('ui-tabs-selected ui-state-active').attr('aria-selected', true);

				// seems to be expected behavior that the show callback is fired
				self.element.queue("tabs", function() {
					self._trigger('show', null, self._ui(self.anchors[o.selected], self.panels[o.selected]));
				});
				
				this.load(o.selected);
			}

			// clean up to avoid memory leaks in certain versions of IE 6
			$(window).bind('unload', function() {
				if (self.lis){
					self.lis.add(self.anchors).unbind('.tabs');
				}
				self.lis = self.anchors = self.panels = null;
			});
		}else { // update selected after add/remove
			o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
		}

		// update collapsible
		this.element[o.collapsible ? 'addClass' : 'removeClass']('ui-tabs-collapsible');

		// set or update cookie after init and add/remove respectively
		if (o.cookie) {
			this._cookie(o.selected, o.cookie);
		}

		// disable tabs
		for (var i = 0, li; (li = this.lis[i]); i++) {
			$(li)[$.inArray(i, o.disabled) != -1 &&
				!$(li).hasClass('ui-tabs-selected') ? 'addClass' : 'removeClass']('ui-state-disabled');
			if ($(li).hasClass('ui-state-disabled')){
				$(li).attr('aria-disabled', true);
			}
		}

		// reset cache if switching from cached to not cached
		if (o.cache === false) {
			this.anchors.removeData('cache.tabs');
		}

		// remove all handlers before, tabify may run on existing tabs after add or option change
		this.lis.add(this.anchors).unbind('.tabs');

		if (o.event != 'mouseover') {
			var addState = function(state, el) {
				if (el.is(':not(.ui-state-disabled)')) {
					el.addClass('ui-state-' + state);
				}
			};
			var removeState = function(state, el) {
				el.removeClass('ui-state-' + state);
			};
			this.lis.bind('mouseover.tabs', function() {
				addState('hover', $(this));
			});
			this.lis.bind('mouseout.tabs', function() {
				removeState('hover', $(this));
			});
			this.anchors.bind('focus.tabs', function() {
				addState('focus', $(this).closest('li'));
			});
			this.anchors.bind('blur.tabs', function() {
				removeState('focus', $(this).closest('li'));
			});
		}
		
		if (o.showOption === undefined || o.showOption === null) { o.showOption = {}; }
		this._normalizeBlindOption(o.showOption);
		
		if (o.hideOption === undefined || o.hideOption === null) { o.hideOption = {}; }
		this._normalizeBlindOption(o.hideOption);

		// Show a tab...
		var showTab = ((o.showOption.blind || o.showOption.fade) && o.showOption.duration > 0) ?
			function(clicked, $show) {
				$(clicked).closest('li').addClass('ui-tabs-selected ui-state-active').attr('aria-selected', true);
				self._showContent();
				$show.removeClass('ui-tabs-hide').attr('aria-hidden', false);
				
				if (tabsAlign == 'top' || tabsAlign == 'bottom'){
					var props = { duration: o.showOption.duration };
					if (o.showOption.blind) { props.height = 'toggle'; }
					if (o.showOption.fade) { props.opacity = 'toggle'; }
					$show.hide().removeClass('ui-tabs-hide').attr('aria-hidden', false) // avoid flicker that way
					.animate(props, o.showOption.duration || 'normal', function() {
						self._resetStyle($show);
						self._trigger('show', null, self._ui(clicked, $show[0]));
					});
				}else{
					self._showContent();
					self._blindPanel($show, 'show');
				}
			} :
			function(clicked, $show) {
				$(clicked).closest('li').addClass('ui-tabs-selected ui-state-active').attr('aria-selected', true);
				self._showContent();
				$show.removeClass('ui-tabs-hide').attr('aria-hidden', false);
				self._trigger('show', null, self._ui(clicked, $show[0]));
			};
		
		// Hide a tab, $show is optional...
		var hideTab = ((o.hideOption.blind || o.hideOption.fade) && o.hideOption.duration > 0) ?
			function(clicked, $hide) {
				if (tabsAlign == 'top' || tabsAlign == 'bottom'){
					var props = { duration: o.hideOption.duration };
					if (o.hideOption.blind) { props.height = 'toggle'; }
					if (o.hideOption.fade) { props.opacity = 'toggle'; }
					$hide.animate(props, o.hideOption.duration || 'normal', function() {
						self.lis.removeClass('ui-tabs-selected ui-state-active').attr('aria-selected', false);
						$hide.addClass('ui-tabs-hide').attr('aria-hidden', true);
						self._resetStyle($hide);
						self.element.dequeue("tabs");
					});	
				}else{
					self._saveLayout();
					self._blindPanel($hide, 'hide');
				}
			} :
			function(clicked, $hide, $show) {
				self.lis.removeClass('ui-tabs-selected ui-state-active').attr('aria-selected', false);
				self._hideContent();
				$hide.addClass('ui-tabs-hide').attr('aria-hidden', true);
				self.element.dequeue("tabs");
			};
		
		// attach tab event handler, unbind to avoid duplicates from former tabifying...
		this.anchors.bind(o.event + '.tabs', function() {
			var el = this, 
			$li = $(this).closest('li'), 
			$hide = self.panels.filter(':not(.ui-tabs-hide)'),
			$show = $(self._sanitizeSelector(this.hash));

			// If tab is already selected and not collapsible or tab disabled or
			// or is already loading or click callback returns false stop here.
			// Check if click handler returns false last so that it is not executed
			// for a disabled or loading tab!
			if (($li.hasClass('ui-tabs-selected') && !o.collapsible) ||
				$li.hasClass('ui-state-disabled') ||
				$li.hasClass('ui-state-processing') ||
				self._trigger('select', null, self._ui(this, $show[0])) === false) {
				this.blur();
				return false;
			}

			o.selected = self.anchors.index(this);

			self.abort();

			// if tab may be closed
			if (o.collapsible) {
				if ($li.hasClass('ui-tabs-selected')) {
					o.selected = -1;

					if (o.cookie) {
						self._cookie(o.selected, o.cookie);
					}

					self.element.queue("tabs", function() {
						hideTab(el, $hide);
					}).dequeue("tabs");
					
					this.blur();
					return false;
				}
				else if (!$hide.length) {
					if (o.cookie) {
						self._cookie(o.selected, o.cookie);
					}
					
					self.element.queue("tabs", function() {
						showTab(el, $show);
					});

					self.load(self.anchors.index(this)); // TODO make passing in node possible, see also http://dev.jqueryui.com/ticket/3171
					
					this.blur();
					return false;
				}
			}

			if (o.cookie) {
				self._cookie(o.selected, o.cookie);
			}

			// show new tab
			if ($show.length) {
				if ($hide.length) {
					self.element.queue("tabs", function() {
						hideTab(el, $hide);
					});
				}
				self.element.queue("tabs", function() {
					showTab(el, $show);
				});
				
				self.load(self.anchors.index(this));
			}
			else {
				throw 'jQuery UI Tabs: Mismatching fragment identifier.';
			}

			// Prevent IE from keeping other link focussed when using the back button
			// and remove dotted border from clicked link. This is controlled via CSS
			// in modern browsers; blur() removes focus from address bar in Firefox
			// which can become a usability and annoying problem with tabs('rotate').
			if ($.browser.msie) {
				this.blur();
			}
		});
		
		this._initScroller();

		// disable click in any case
		this.anchors.bind('click.tabs', function(){return false;});

	},

	destroy: function() {
		var o = this.options;
		this.abort();
		this._removeScroller();
		this.element.unbind('.tabs')
			.removeClass([
				'wijmo-wijtabs', 
				'ui-tabs-top', 
				'ui-tabs-bottom', 
				'ui-tabs-left', 
				'ui-tabs-right', 
				'ui-tabs', 
				'ui-widget', 
				'ui-widget-content', 
				'ui-corner-all', 
				'ui-tabs-collapsible',
				'ui-helper-clearfix'
				].join(' '))
			.removeData('tabs')
			.removeAttr('role');

		this.list.removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all')
			.removeAttr('role');

		this.anchors.each(function() {
			var href = $.data(this, 'href.tabs');
			if (href) {
				this.href = href;
			}
			var $this = $(this).unbind('.tabs');
			$.each(['href', 'load', 'cache'], function(i, prefix) {
				$this.removeData(prefix + '.tabs');
			});
		});

		this.lis.unbind('.tabs').add(this.panels).each(function() {
			if ($.data(this, 'destroy.tabs')) {
				$(this).remove();
			}else {
				$(this).removeClass([
					'ui-state-default',
					'ui-corner-top',
					'ui-corner-bottom',
					'ui-corner-left',
					'ui-corner-right',
					'ui-tabs-selected',
					'ui-state-active',
					'ui-state-hover',
					'ui-state-focus',
					'ui-state-disabled',
					'ui-tabs-panel',
					'ui-widget-content',
					'ui-tabs-hide'
				].join(' ')).css({position:'', left: '', top: ''})
				.removeAttr('role')
				.removeAttr('aria-hidden')
				.removeAttr('aria-selected')
				.removeAttr('aria-disabled');
			}
		});
		
		var content = $('.wijmo-wijtabs-content');
		if (content.length){
			content.replaceWith(content.contents());
		}

		if (o.cookie) {
			this._cookie(null, o.cookie);
		}

		return this;
	},

	add: function(url, label, index) {
		/// <summary>Add a new tab.</summary>
		/// <param name="url" type="String">A URL consisting of a fragment identifier only to create an in-page tab or a full url (relative or absolute, no cross-domain support) to turn the new tab into an Ajax (remote) tab.</param>
		/// <param name="label" type="String">The tab label.</param>
		/// <param name="index" type="Number">Zero-based position where to insert the new tab.</param>
		if (index === undefined) {
			index = this.anchors.length; // append by default
		}

		var self = this, o = this.options,
			$li = $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label)),
			id = !url.indexOf('#') ? url.replace('#', '') : this._tabId($('a', $li)[0]);

		var tabsAlign = this._getAlignment(),
		panelCorner = this._getAlignment(false);
		$li.addClass('ui-state-default' + ' ui-corner-' + tabsAlign)
			.data('destroy.tabs', true)
			.attr('role', 'tab')
			.attr('aria-selected', false);

		// try to find an existing element before creating a new one
		var $panel = $('#' + id);
		if (!$panel.length) {
			$panel = $(o.panelTemplate).attr('id', id)
					.data('destroy.tabs', true)
					.attr('role', 'tabpanel');
		}
		$panel.addClass('ui-tabs-panel ui-widget-content ui-corner-' + panelCorner + ' ui-tabs-hide').attr('aria-hidden', true);

		if (index >= this.lis.length) {
			$li.appendTo(this.list);
			if (this.panels.length > 0){
				$panel.insertAfter(this.panels[this.panels.length - 1]);
			}else{
				$panel.appendTo(this.list[0].parentNode);
			}
		}
		else {
			$li.insertBefore(this.lis[index]);
			$panel.insertBefore(this.panels[index]);
		}

		o.disabled = $.map(o.disabled,
			function(n, i) { return n >= index ? ++n : n; });

		this._tabify();

		if (this.anchors.length == 1) { // after tabify
			o.selected = 0;
			$li.addClass('ui-tabs-selected ui-state-active').attr('aria-selected', true);
			$panel.removeClass('ui-tabs-hide').attr('aria-hidden', false);
			this.element.queue("tabs", function() {
				self._trigger('show', null, self._ui(self.anchors[0], self.panels[0]));
			});
				
			this.load(0);
		}

		// callback
		this._trigger('add', null, this._ui(this.anchors[index], this.panels[index]));
		return this;
	},

	remove: function(index) {
		/// <summary>Remove a tab.</summary>
		/// <param name="index" type="Number">The zero-based index of the tab to be removed.</param>
		var o = this.options, $li = this.lis.eq(index).remove(),
			$panel = this.panels.eq(index).remove();

		// If selected tab was removed focus tab to the right or
		// in case the last tab was removed the tab to the left.
		if ($li.hasClass('ui-tabs-selected') && this.anchors.length > 1) {
			this.select(index + (index + 1 < this.anchors.length ? 1 : -1));
		}

		o.disabled = $.map($.grep(o.disabled, function(n, i) { return n != index; }),
			function(n, i) { return n >= index ? --n : n; });

		this._tabify();

		// callback
		this._trigger('remove', null, this._ui($li.find('a')[0], $panel[0]));
		return this;
	},

	enable: function(index) {
		/// <summary>Enable a disabled tab.</summary>
		/// <param name="index" type="Number">The zero-based index of the tab to be enabled.</param>
		var o = this.options;
		if ($.inArray(index, o.disabled) == -1) {
			return;
		}

		this.lis.eq(index).removeClass('ui-state-disabled').removeAttr('aria-disabled');
		o.disabled = $.grep(o.disabled, function(n, i) { return n != index; });

		// callback
		this._trigger('enable', null, this._ui(this.anchors[index], this.panels[index]));
		return this;
	},

	disable: function(index) {
		/// <summary>Disabled a tab.</summary>
		/// <param name="index" type="Number">The zero-based index of the tab to be disabled.</param>
		var self = this, o = this.options;
		if (index != o.selected) { // cannot disable already selected tab
			this.lis.eq(index).addClass('ui-state-disabled').attr('aria-disabled', true);

			o.disabled.push(index);
			o.disabled.sort();

			// callback
			this._trigger('disable', null, this._ui(this.anchors[index], this.panels[index]));
		}

		return this;
	},

	select: function(index) {
		/// <summary>Select a tab, as if it were clicked.</summary>
		/// <param name="index" type="Number">The zero-based index of the tab to be selected or the id selector of the panel the tab is associated with.</param>
		if (typeof index == 'string') {
			index = this.anchors.index(this.anchors.filter('[href$=' + index + ']'));
		}
		else if (index === null) { // usage of null is deprecated, TODO remove in next release
			index = -1;
		}
		if (index == -1 && this.options.collapsible) {
			index = this.options.selected;
		}

		this.anchors.eq(index).trigger(this.options.event + '.tabs');
		return this;
	},

	load: function(index) {
		/// <summary>Reload the content of an Ajax tab programmatically.</summary>
		/// <param name="index" type="Number">The zero-based index of the tab to be loaded</param>
		var self = this, o = this.options, a = this.anchors.eq(index)[0], url = $.data(a, 'load.tabs');

		this.abort();

		// not remote or from cache
		if (!url || this.element.queue("tabs").length !== 0 && $.data(a, 'cache.tabs')) {
			this.element.dequeue("tabs");
			return;
		}

		// load remote from here on
		this.lis.eq(index).addClass('ui-state-processing');

		if (o.spinner) {
			var span = $('span', a);
			span.data('label.tabs', span.html()).html(o.spinner);
		}

		this.xhr = $.ajax($.extend({}, o.ajaxOptions, {
			url: url,
			success: function(r, s) {
				$(self._sanitizeSelector(a.hash)).html(r);

				// take care of tab labels
				self._cleanup();

				if (o.cache) {
					$.data(a, 'cache.tabs', true); // if loaded once do not load them again
				}

				// callbacks
				self._trigger('load', null, self._ui(self.anchors[index], self.panels[index]));
				try {
					o.ajaxOptions.success(r, s);
				}
				catch (e1) {}
			},
			error: function(xhr, s, e) {
				// take care of tab labels
				self._cleanup();

				// callbacks
				self._trigger('load', null, self._ui(self.anchors[index], self.panels[index]));
				try {
					// Passing index avoid a race condition when this method is
					// called after the user has selected another tab.
					// Pass the anchor that initiated this request allows
					// loadError to manipulate the tab content panel via $(a.hash)
					o.ajaxOptions.error(xhr, s, index, a);
				}
				catch (e2) {}
			}
		}));

		// last, so that load event is fired before show...
		self.element.dequeue("tabs");

		return this;
	},

	abort: function() {
		/// <summary>Terminate all running tab ajax requests and animations.</summary>	    
		this.element.queue([]);
		this.panels.stop(false, true);

		// "tabs" queue must not contain more than two elements,
		// which are the callbacks for the latest clicked tab...
		this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));

		// terminate pending requests from other tabs
		if (this.xhr) {
			this.xhr.abort();
			delete this.xhr;
		}

		// take care of tab labels
		this._cleanup();
		return this;
	},

	url: function(index, url) {
		/// <summary>Change the url from which an Ajax (remote) tab will be loaded.</summary>
		/// <param name="index" type="Number">The zero-based index of the tab of which its URL is to be updated.</param>
		/// <param name="url" type="String">A URL the content of the tab is loaded from.</param>
		this.anchors.eq(index).removeData('cache.tabs').data('load.tabs', url);
		return this;
	},

	length: function() {
		/// <summary>Retrieve the number of tabs of the first matched tab pane.</summary>
		return this.anchors.length;
	}

});

})(jQuery);
