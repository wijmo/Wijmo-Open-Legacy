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
 * * Wijmo TextBoxDecorator widget.
 * 
 * Depends:
 *  jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */
(function ($) {
    $.widget("ui.wijtextboxdecorator", {
        options: {
    },
    _create: function () {
        //if(!((this.element.attr("tagName").toLowerCase()==="input" && this.element.attr("type").toLowerCase()==="text")||this.element.attr("tagName").toLowerCase()==="textarea"))
        //	return;

        if (!(this.element.attr("tagName").toLowerCase() === "input" || this.element.attr("tagName").toLowerCase() === "textarea")) {
            return;
        }
        if (!(this.element.attr("type").toLowerCase() === "text" || this.element.attr("type").toLowerCase() === "password")) {
            if (this.element.attr("tagName").toLowerCase() === "input") {
                return;
            }
        }
        var e = this.element;
        this.element.addClass("ui-wijtextbox ui-widget ui-state-default ui-corner-all");
        this.element.mouseover(function () {
            e.addClass("ui-state-hover");
        }).mouseout(function () {
            e.removeClass("ui-state-hover");
        }).mousedown(function () {
            e.addClass("ui-state-active");
        }).mouseup(function () {
            e.removeClass("ui-state-active");
        }).focus(function () {
            e.addClass("ui-state-focus");
        }).blur(function () {
            e.removeClass("ui-state-focus");
        });
    },
    destroy: function () {
        this.element.removeClass("ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active");
        $.Widget.prototype.destroy.apply(this);
    }
})


})(jQuery);
