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
 * * Wijmo RadioButtonDecorator widget.
 * 
 * Depends:
 *   jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */
(function ($) {
    var radiobuttonId = 0;
    $.widget("ui.wijradiobuttondecorator", {
        _create: function () {
            var that = this;
            var e = this.element;
            if (e.is(":radio")) {
                if (!this.element.attr("id")) {
                    this.element.attr("id", "ui-radio-" + radiobuttonId);
                    radiobuttonId += 1;
                }
                var radiobuttonElement;
                if (this.element.parent().is("label")) {
                    radiobuttonElement = this.element.parent().wrap("<div class='ui-wijradiobutton-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass("ui-wijradiobutton ui-widget");
                    var label = this.element.parent();
                    label.attr("for", this.element.attr("id"));
                    radiobuttonElement.find(".ui-wijradiobutton-inputwrapper").append(this.element);
                    radiobuttonElement.append(label);

                }
                else {
                    radiobuttonElement = this.element.wrap("<div class='ui-wijradiobutton-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass("ui-wijradiobutton ui-widget");
                }
                var targetLabel = $("label[for='" + this.element.attr("id") + "']");
                if (targetLabel.length === 0) {
                }
                else {
                    radiobuttonElement.append(targetLabel);
                    targetLabel.attr("labelsign", "wij");
                    //targetLabel.attr("tabindex", 0);
                }
                if (targetLabel.length > 0) {
                    //this._addAttrs(e, targetLabel);
                }
                var boxElement = $("<div class='ui-wijradiobutton-box ui-widget ui-state-default ui-corner-all'><span class='ui-wijradiobutton-icon'></span></div>");
                var iconElement = boxElement.children(".ui-wijradiobutton-icon");
                radiobuttonElement.append(boxElement);
                iconElement.addClass("ui-icon ui-icon-radio-off");
                this.element.data("iconElement", iconElement);
                this.element.data("boxElement", boxElement);
                if (this.element.is(":disabled")) {
                    this._setOption("disabled", true);
                }

                boxElement.removeClass("ui-wijradiobutton-relative");
                if (targetLabel.length == 0 || targetLabel.html() === "") {
                    boxElement.addClass("ui-wijradiobutton-relative");
                }
                this._refresh();
                //			boxElement.css("margin-top","9px");

                this.element.bind("click.checkbox", function () {
                    that._refresh();
                }).bind("focus.checkbox", function () {
                    if (that.options.disabled) {
                        return;
                    }
                    boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
                }).bind("blur.checkbox", function () {
                    if (that.options.disabled) {
                        return;
                    }
                    boxElement.removeClass("ui-state-focus").not(".ui-state-hover").addClass("ui-state-default");
                });

                radiobuttonElement.click(function () {
                    if (targetLabel.length == 0 || targetLabel.html() === "") {
                        that.element.attr("checked", true);
                        that._refresh();
                    }

                })

                radiobuttonElement.bind("mouseover.checkbox", function () {
                    if (that.options.disabled) {
                        return;
                    }
                    boxElement.removeClass("ui-state-default").addClass("ui-state-hover");
                }).bind("mouseout.checkbox", function () {
                    if (that.options.disabled) {
                        return;
                    }
                    boxElement.removeClass("ui-state-hover").not(".ui-state-focus").addClass("ui-state-default");
                });

            }
        },

        _refresh: function () {
            var name = this.element.attr("name");
            var self = this;
            $("[name=" + name + "]").each(function (i, n) {
                $(n).parents(".ui-wijradiobutton").find(".ui-wijradiobutton-box").children().removeClass("ui-icon-radio-on ui-icon-radio-off").addClass("ui-icon-radio-on");
                $(n).parents(".ui-wijradiobutton").find(".ui-wijradiobutton-box").removeClass("ui-state-active").addClass("ui-state-default");
            })
            if (self.element.is(":checked")) {
                self.element.data("iconElement").removeClass("ui-icon-radio-on").addClass("ui-icon-radio-off");
                self.element.data("boxElement").removeClass("ui-state-default").addClass("ui-state-active");
            }
            //this.iconElement.toggleClass("ui-icon ui-icon-radio-on", this.element.is(":checked"));
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
            var boxelement = this.element.parent().parent();
            boxelement.children("div.ui-wijradiobutton-box").remove();
            this.element.unwrap();
            this.element.unwrap();
            $.Widget.prototype.destroy.apply(this);
        }
    });
})(jQuery);
