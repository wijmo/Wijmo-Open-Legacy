/*
 *
 * Wijmo Library 0.6.1
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Dropdown widget.
 * 
 * Depends:
 *  jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */
(function ($) {
    $.widget("ui.wijdropdowndecorator", {
        options: {
            width: 300,
            height: 250
        },

        _create: function () {
            if (this.element.attr("tagName").toLowerCase() !== "select" && this.element.attr("size") < 2) {//make sure it's not a listbox.
                return;
            }
            this._activeItem = null;
            this._applySelect(this.element);
        },
        _applySelect: function (n) {
            var self = this;
            //var divWidth = $(n).width();
            var height = $(n).outerHeight();
            $(n).wrap("<div></div>");
            $(n).wrap("<div></div>");
            var dropdownbox = $(n).parent();
            dropdownbox.addClass("ui-helper-hidden");
            var container = dropdownbox.parent();
            container.addClass("ui-wijdropdowndecorator ui-widget ui-widget-content ui-state-default ui-corner-all ui-helper-clearfix");


            var label = $('<label class="ui-dropdown-label ui-corner-all"></label>');
            label.attr("id", this.element.attr("id") + "_select");
            label.attr("name", $(n).attr("name"));
            var inputWrap = $('<div class="ui-dropdown-trigger ui-state-default ui-corner-right"></div>');
            var span = $("<span class='ui-icon ui-icon-triangle-1-s'></span>");
            inputWrap.append(span);

            this._value = $(n).val();

            this.$anthorWarp = $('<a href="#"></a>');
            this.$anthorWarp.append(label);

            //$(n).hide();
            this.div = $("<div>");
            container.append(this.$anthorWarp);
            container.append(inputWrap);
            container.append(this.div);
            this.div.addClass("ui-dropdown");
            this.div.width(container.width());
            label.data("dropdown", this.div);
            var maxIndex = this._getMaxZIndex();

            this.$dropdownList = $('<ul></ul>')
            .addClass('ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset')
            .appendTo(this.div);

            self.element.children().each(function () {//this.element
                var $chilren = $(this);
                if ($chilren.is('option')) {
                    var $item = $(this);
                    self.$dropdownList.append(buildItem($item));
                }
                else if ($chilren.is('optgroup')) {
                    var $list = $('<li class="ui-dropdown-optgroup"></li>');
                    var $text = $('<span class="ui-optgroup-header ui-priority-primary">' + $chilren.attr('label') + '</span>');
                    var $items = $('<ul class="ui-helper-reset ui-dropdown-items"></ul>');
                    $list.append($text).append($items);

                    $chilren.children('option').each(function () {
                        var $item = $(this);
                        $items.append(buildItem($item));
                    });
                    self.$dropdownList.append($list);
                }

                function buildItem($item) {
                    var val = $item.val();
                    var text = $item.text();
                    var $li = $('<li class="ui-dropdown-item ui-corner-all"><span>' + text + '</span></li>')
                    //                    .mouseenter(function (event) {
                    //                        self._activate($(this));
                    //                    })
                    .mousemove(function (event) {//mousemove replace mouseenter to resolve the hovered <li> changed issue when scrolling the ddl
                        var current = $(event.target).closest('.ui-dropdown-item');
                        if (current != this.last) {
                            self._activate($(this));
                        }
                        this.last = $(event.target).closest('.ui-dropdown-item');
                    });
                    $li.data('value', val);
                    return $li;
                }
            });

            label.click(function () {
                if (!self.div.is(":visible")) {
                    self.div.show();
                    self._initActiveItem();
                }
                else {
                    self.div.hide();
                }
            }).mouseover(function () {
                label.addClass("ui-state-hover");
                inputWrap.addClass("ui-state-hover");
            }).mouseout(function () {
                label.removeClass("ui-state-hover");
                inputWrap.removeClass("ui-state-hover");
            }).mousedown(function () {
                label.addClass("ui-state-active");
                inputWrap.addClass("ui-state-active");
            }).mouseup(function () {
                label.removeClass("ui-state-active");
                inputWrap.removeClass("ui-state-active");
            });

            inputWrap.click(function () {
                if (!self.div.is(":visible")) {
                    self.div.show();
                    self._initActiveItem();
                }
                else {
                    self.div.hide();
                }
                self.$anthorWarp.focus();
            }).mouseover(function () {
                label.addClass("ui-state-hover");
                inputWrap.addClass("ui-state-hover");
            }).mouseout(function () {
                label.removeClass("ui-state-hover");
                inputWrap.removeClass("ui-state-hover");
            }).mousedown(function () {
                label.addClass("ui-state-active");
                inputWrap.addClass("ui-state-active");
            }).mouseup(function () {
                label.removeClass("ui-state-active");
                inputWrap.removeClass("ui-state-active");
            });

            $(document.body).click(function (e) {
                var offset = self.div.offset();
                if (e.target === label.get(0) || e.target == inputWrap.get(0) || e.target == inputWrap.children().get(0)) {
                    return;
                }
                if (e.pageX < offset.left || e.pageX > offset.left + self.div.width()) {
                    self.div.hide();
                }
                if (e.pageY < offset.top || e.pageY > offset.top + self.div.height()) {
                    self.div.hide();
                }
            });



            self.div.bind('click', function (event) {
                var el = $(event.target);
                if (el.closest("li.ui-dropdown-item", $(this)).length > 0) {
                    self._setValue();
                    $(this).hide();
                }
            });

            height = Math.min(self.options.height, this.$dropdownList.outerHeight());
            self.div.css("z-index", maxIndex).css({
                height: height,
                width: self.options.width
            });
            this.superpanel = this.div.wijsuperpanel().data('wijsuperpanel');
            this.$dropdownList.setOutWidth(this.$dropdownList.parent().parent().innerWidth());
            self.div.hide();

            this.$anthorWarp.keydown(function (e) {//Remove Keyboard Event to div
                var keyCode = $.ui.keyCode;
                switch (e.which) {
                    case keyCode.UP:
                    case keyCode.LEFT:
                        self.previous();
                        self._setValue();
                        e.preventDefault();
                        break;
                    case keyCode.DOWN:
                    case keyCode.RIGHT:
                        self.next();
                        self._setValue();
                        e.preventDefault();
                        break;
                    case keyCode.PAGE_DOWN:
                        self.nextPage(true);
                        self._setValue();
                        e.preventDefault();
                        break;
                    case keyCode.PAGE_UP:
                        self.previousPage(true);
                        self._setValue();
                        e.preventDefault();
                        break;
                    case keyCode.ENTER:
                    case keyCode.NUMPAD_ENTER:
                        self._setValue();
                        self.div.hide();
                        break;
                }
            }).focus(function () {
                label.addClass("ui-state-focus");
                inputWrap.addClass("ui-state-focus");
            }).blur(function () {
                label.removeClass("ui-state-focus");
                inputWrap.removeClass("ui-state-focus");
            });
        },

        _init: function () {
            var self = this;
            self._initActiveItem();
            if (self._activeItem) {
                self.$anthorWarp.children('label').text(self._activeItem.text());
            }
        },

        _setValue: function () {
            var self = this;
            if (self._activeItem) {
                self.$anthorWarp.children('label').text(self._activeItem.text());
                self._value = self._activeItem.data('value');

                if (this.superpanel.vNeedScrollBar) {
                    var div = self.div;
                    var top = self._activeItem.offset().top,
				    height = self._activeItem.outerHeight();
                    if (div.offset().top > top) {
                        div.wijsuperpanel('scrollTo', 0, top - self.$dropdownList.offset().top);
                    }
                    else if (div.offset().top < top + height - div.innerHeight()) {
                        div.wijsuperpanel('scrollTo', 0, top + height - div.height() - self.$dropdownList.offset().top);
                    }
                }
                self.element.val(self._value);
            }
        },

        _initActiveItem: function () {
            var self = this;
            if (self._value) {
                this.$dropdownList.find('li.ui-dropdown-item').each(function () {
                    if ($(this).data('value') == self._value) {
                        self._activate($(this));
                    }
                });
            }
        },

        _activate: function (item) {
            var self = this;
            self._deactivate();
            self._activeItem = item;
            self._activeItem.addClass('ui-state-hover');
        },

        _deactivate: function () {
            var self = this;
            if (self._activeItem) {
                self._activeItem.removeClass('ui-state-hover');
            }
        },

        next: function () {
            this._move('next', 'first');
        },

        previous: function () {
            this._move('prev', 'last');
        },

        _move: function (direction, edge) {
            if (!this._activeItem) {
                this._activate(this.$dropdownList.find('.ui-dropdown-item:' + edge));
                return;
            }

            var $nextLi = this._activeItem[direction]().eq(0), next;
            if ($nextLi.length) {
                next = this._getNextItem($nextLi, direction, edge);
            }
            else if (this._activeItem.closest('.ui-dropdown-optgroup').length) {
                next = this._getNextItem(this._activeItem.closest('.ui-dropdown-optgroup')[direction](), direction, edge);
            }

            if (next && next.length) {
                this._activate(next);
            } else {
                this._activate(this.$dropdownList.find('.ui-dropdown-item:' + edge));
            }
        },

        _getNextItem: function (next, direction, edge) {
            if (next.length) {
                if (next.is('.ui-dropdown-optgroup')) {
                    if (!!next.find('>ul>li.ui-dropdown-item').length) {
                        return next.find('>ul>li.ui-dropdown-item:' + edge).eq(0);
                    }
                    else {
                        this._getNextItem(next[direction]().eq(0));
                    }
                }
                else {
                    return next;
                }
            }
        },

        _isFirst: function () { },

        _isLast: function () { },

        nextPage: function () {
            if (this.superpanel.vNeedScrollBar) {
                if (!this._activeItem || this._isLast()) {
                    this.activate(this.element.children(":first"));
                    return;
                }
                var base = this._activeItem.offset().top,
				height = this.options.height,
				result = this.$dropdownList.find('.ui-dropdown-item').filter(function () {
				    var close = $(this).offset().top - base - height + $(this).height();
				    return close < 10 && close > -10;
				});
                if (!result.length) {
                    result = this.$dropdownList.find('.ui-dropdown-item:last');
                }
                this._activate(result);
            } else {
                this._activate(this.$dropdownList.find(".ui-dropdown-item" + (!this._activeItem || this._isLast() ? ":first" : ":last")));
            }
        },

        previousPage: function () {
            if (this.superpanel.vNeedScrollBar) {
                if (!this._activeItem || this._isLast()) {
                    this._activate(this.element.children(":last"));
                    return;
                }
                var base = this._activeItem.offset().top,
				height = this.options.height,
                result = this.$dropdownList.find('.ui-dropdown-item').filter(function () {
                    var close = $(this).offset().top - base + height - $(this).height();
                    return close < 10 && close > -10;
                });

                if (!result.length) {
                    result = this.$dropdownList.find('.ui-dropdown-item:first');
                }
                this._activate(result);
            } else {
                this._activate(this.$dropdownList.find(".ui-dropdown-item" + (!this._activeItem || this._isFirst() ? ":last" : ":first")));
            }
        },

        _getMaxZIndex: function () {
            var index = 100;
            if (this.element.data("maxZIndex")) {
                return this.element.data("maxZIndex");
            }
            $("*", document).each(function (i, n) {
                if (parseInt($(n).css("z-index")) > index) {
                    index = parseInt($(n).css("z-index"));
                }
            })
            this.element.data("maxZIndex", index);
            return index;
        },
        _addAttrs: function (oldele, newele) {
            if (newele) {
                var attrs = oldele.get(0).attributes;
                $.each(attrs, function (i, n) {
                    var name = n.name.toLowerCase();
                    if (name == 'type' || name == 'id') {
                        return true;
                    }
                    try {
                        newele.attr(n.name, n.nodeValue);
                    }
                    catch (ex)
                    { }
                });
            }
        },
        destroy: function () {
            this.element.closest('.ui-wijdropdowndecorator').find(">div.ui-dropdown-trigger,>div.ui-dropdown,>label.ui-dropdown-label").remove();
            this.element.unwrap().unwrap().removeData('maxZIndex');
            $.Widget.prototype.destroy.apply(this);
        }
    })
})(jQuery);
