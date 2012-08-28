$(document).ready(function () {

	//$('#themeswitcher').wijdropdown();
	$('#themes').bind("change", function () {
		$(".wijmo-stylesheet-wijmo_theme").attr("href", $(this).val());
		//executeCallback("theme=" + $(this).val());
	}).wijdropdown();

	$("div.wijmo-wijdropdown").width("136px");

	var wijwidth = $('article .ui-widget').width();
	var wijheight = $('article .ui-widget').height();

	$('.widget-wrapper').css({
		'width': wijwidth
	});


	$('#widget-tabs').wijtabs({ hideOption: { blind: false, fade: true, duration: 222 }, showOption: { blind: false, fade: true, duration: 222} });

	$('#info-tabs').wijtabs({ hideOption: { blind: false, fade: true, duration: 222 }, showOption: { blind: false, fade: true, duration: 222} });

	// Setup the ajax indicator
	if ($('#ajaxBusy').length === 0) {
		$('body').append('<div id="ajaxBusy"><p><img src="explore/images/ajax-loader.gif"></p></div>');
		var leftSideWidth = $("#location-widgetContent aside").width();
		$('#ajaxBusy').css({
			display: "none",
			margin: "0px",
			paddingLeft: "0px",
			paddingRight: "0px",
			paddingTop: "0px",
			paddingBottom: "0px",
			position: "absolute",
			left: $(".body").width() / 2 + $(".body").offset().left + leftSideWidth / 2,
			//top: $(".body").height() / 2 + $(".body").offset().left,
			top: $(".body").height() / 2 + $(".body").offset().top,
			width: "auto"
		});
	}

	// Ajax activity indicator bound to ajax start/stop document events
	$(document).ajaxStart(function () {
		$('#ajaxBusy').show();
	}).ajaxStop(function () {
		$('#ajaxBusy').hide();
	});

	var paneHistory;
});

function loadDemo(path, container, callback, isAnimate) {
	//var directory = path.match(/([^\/]+)\/[^\/\.]+\.html$/)[1];
	//$(":wijmo-wijdialog").not("#view-code").wijdialog("destroy").remove();
	var pathArray = window.location.href.split(/Index/i),
		realPath = pathArray[0] + path,
		height;

	//$("#SampleContainer", container).empty();
	$.get(realPath, function (data) {

		var source = data, $content, sampleTitle,
			sampleList = $("#sampleList");
		data = data.replace(/<script.*>.*<\/script>/ig, ""); // Remove script tags
		data = data.replace(/<link.*>.*<\/link>/ig, ""); // Remove script tags
		data = data.replace(/<\/?link.*>/ig, ""); //Remove link tags
		data = data.replace(/<\/?html.*>/ig, ""); //Remove html tag
		data = data.replace(/<\/?body.*>/ig, ""); //Remove body tag
		data = data.replace(/<\/?head.*>/ig, ""); //Remove head tag
		data = data.replace(/<\/?!doctype.*>/ig, ""); //Remove doctype
		data = data.replace(/<title.*>.*<\/title>/ig, ""); // Remove title tags
		data = data.replace(/<\/?meta.*>/ig, ""); //Remove link tags
		// for form event in controls.
		//data = data.replace(/<\/?form.*>/ig, ""); //Remove body tag
		if (callback) {
			data += "<script>$(document).ready(function(){loadWidgetCompleteCallBack();})</script>";
		}
		if (isAnimate) {
			//$(".single-widget .main-content").show();
			$(".single-widget .main-content").stop().hide("slide", { direction: "down" }, 400, function () {
				$('.single-widget .main-content .SampleContainer').empty();
				//.html(' <img src="explore/images/ajax-loader.gif" style="margin-left: 48%; margin-top: 28%;" />');
				$('#ajaxBusy').show();
				$('#sampleTitle').css('opacity', '0');
				$(".single-widget .main-content").css("visibility", "visible").show("slide", { direction: "up" }, 500, function () {
					fillToContent(data, container, path, sampleList);

					$('#ajaxBusy').hide();
					$("#sampleTitle").css('opacity', '1').html(sampleTitle);

				});

			});
		}
		else {
			fillToContent(data, container, path, sampleList);

			$("#sampleTitle").html(sampleTitle);
		}

	}, "html");
};

function fillToContent(data, container, path, sampleList) {
	$("#SampleContainer", container).empty().html(data);

	$('#InfoContainer', container).empty().append($('.demo-description'));
	$("#SampleContainer .container .header", container).remove();

	$(".branding", container).remove();
	$("footer", container).remove();
	$("link", container).remove();

	var sampleTitle = $("[href='" + path + "']", sampleList).text();

	$("li", sampleList).removeClass("demo-config-on");
	$("[href='" + path + "']", sampleList).parent().addClass("demo-config-on");
}

function loadSource(path, container, callback, isAnimate) {
	//var directory = path.match(/([^\/]+)\/[^\/\.]+\.html$/)[1];
	//$(":wijmo-wijdialog").not("#view-code").wijdialog("destroy").remove();
	var pathArray = window.location.href.split(/Index/i),
		realPath = pathArray[0] + path,
		height;

	//$("#SampleContainer", container).empty();
	$.get(realPath, function (data) {

		var source = data, $content, sampleTitle;

		//data = data.replace(/<script.*>.*<\/script>/ig, ""); // Remove script tags
		data = data.replace(/<link.*>.*<\/link>/ig, ""); // Remove script tags
		data = data.replace(/<\/?link.*>/ig, ""); //Remove link tags
		data = data.replace(/<\/?html.*>/ig, ""); //Remove html tag
		data = data.replace(/<\/?body.*>/ig, ""); //Remove body tag
		data = data.replace(/<\/?head.*>/ig, ""); //Remove head tag
		data = data.replace(/<\/?!doctype.*>/ig, ""); //Remove doctype
		data = data.replace(/<title.*>.*<\/title>/ig, ""); // Remove title tags
		data = data.replace(/<\/?meta.*>/ig, ""); //Remove link tags
		// for form event in controls.
		//data = data.replace(/<\/?form.*>/ig, ""); //Remove body tag

		if ($('#demo-source').length == 0) {
			$('<div id="demo-source"><div class="source-block">' +
			'<pre class="brush:js;gutter: false;toolbar:false;html-script:true">' +
			'<code></code></pre></div></div>').appendTo('#SourceContainer');

		}
		var source = $.trim(data);
		var cleanedSource = source
				.replace('themes/Wijmo/jquery.ui.all.css', 'theme/jquery.ui.all.css')
				.replace(/\s*\x3Clink.*demos\x2Ecss.*\x3E\s*/, '\r\n\t')
				.replace(/\x2E\x2E\x2F\x2E\x2E\x2F/g, '');
		$("#SourceContainer").css({ 'padding': '0', 'height': '440px', 'overflow': 'auto' });
		$('#demo-source code').empty().text(cleanedSource);

		//$("#SourceContainer", container).empty().html("<pre><code>" + $.trim(data) + "</code></pre>");
		$("#SourceContainer .container .header", container).remove();

		$(".branding", container).remove();
		$("footer", container).remove();
		$("link", container).remove();

		sampleTitle = $("[href='" + path + "']", sampleList).text();

		$("#sampleTitle").html(sampleTitle);

		SyntaxHighlighter.highlight();
	}, "html");
}

function setBodyContainerHeight(content) {
	setTimeout(function () {
		var height = $(".pane.active article").height();
		var height_aside = $(".pane.active aside").height();
		height = height > height_aside ? height : height_aside;
		$(".bodycontainer").height(height);
	}, 200);
}

function loadWidgetCompleteCallBack() {
	$('#ajaxBusy').hide();
	setBodyContainerHeight();
	$(".location-widgets .main-content").hide().fadeIn(2000);
}

function widgetHref(evt) {
	var widgetName = $(evt.currentTarget).attr("href");
	$("#widgetTitle").html(widgetName);

	var widgetSamplePath = widgetName + "/overview.html";  //"C1" + widgetName + "/Overview.aspx",
	tempPath = widgetSamplePath.split("."),
			widgetSamplePathArray = tempPath[0].split("/"),
			newPaneId = "widgetContent-" + widgetSamplePathArray[0] + "-" + widgetSamplePathArray[1];

	$('.sample-list').wijsuperpanel("destroy").wijsuperpanel();
	$("#SampleContainer").empty();
	var currentEntry = new Date().getTime();
	//console.log("widgetHref");
	History.pushState({ path: widgetSamplePath, paneId: ".single-widget", currentEntry: currentEntry },
					null,
					spliceUrl("widgetContent", widgetSamplePathArray[0], widgetSamplePathArray[1]));
	setBodyContainerHeight();
	return false;
}

function loadSampleList(widgetName) {
	//var xmlpath = "ControlList.xml";
	var widgetObj;

	if ($.isPlainObject(ControlList) && (widgetObj = ControlList[widgetName])) {
		var sampleList = $("#sampleList");
		sampleList.empty();
		$.each(widgetObj["actions"], function (i, item) {
			if ($.isPlainObject(item)) {
				var li = $("<li><a href='" + item.page + "'>" + item.name + "</a></li>");
				if (i === 0) {
					li.addClass("demo-config-on");
				}
				li.appendTo(sampleList);
			}
		});
		$("a", sampleList).addClass("wijmo-widget-sample")
		.unbind("click")
		.click(function (e) {
			var widgetSamplePath = $(this).attr("href"),
				widgetSamplePathArray = widgetSamplePath.split(".")[0].split("/");
			$("li", sampleList).removeClass("demo-config-on");
			$(e.currentTarget).parent().addClass("demo-config-on");

			var currentEntry = new Date().getTime();
			History.pushState({ path: widgetSamplePath, paneId: ".single-widget", currentEntry: currentEntry },
					null, spliceUrl("widgetContent", widgetSamplePathArray[0], widgetSamplePathArray[1]));
			return false;
		});
	}

}

function loadIndex() {
	paneHistory = new UrlLinkedPaneHistory();

	$("a", "#location-main-content").addClass("wijmo-widget");

	//Note: if use $("a","container"), there is an error in xui
	//	$(".wijmo-widget", "#location-widgetIndex").click(widgetHref);
	//	$("a", "#location-widgets").not(".button").click(widgetHref);

	$("#WidgetsHerf").click(function (evt) {
		//paneHistory.navigate({ location: "widgets"});
		//var currentEntry = new Date().getTime();
		var currentEntry = "?widgets";
		History.pushState({ path: null, paneId: "widgets", currentEntry: currentEntry },
									null,
									spliceUrl("widgets"));
		return false;
	});

	$("#widget-home").unbind("click").click(function () {
		//var currentEntry = new Date().getTime();
		var currentEntry = "?";
		History.pushState({ path: null, paneId: "widgetIndex", currentEntry: currentEntry },
									null,
									spliceUrl());
		//setBodyContainerHeight();
	});

	$("#widget-back").unbind("click").click(function () {
		History.back();
		//setBodyContainerHeight();
	});

	setBodyContainerHeight();
}

function switchIcons(location) {
	var btnAllwidget = $("#WidgetsHerf"),
		backBtn = $("#widget-back"),
		homeBtn = $("#widget-home"),
		themes = $("#themes").closest(".wijmo-wijdropdown");
	if (location === "widgetIndex" || location === "") {
		btnAllwidget.show();
		backBtn.hide();
		homeBtn.hide();
		themes.hide();
	}
	else if (location === "widgets") {
		btnAllwidget.hide();
		backBtn.hide();
		homeBtn.show();
		themes.hide();
	} else {
		btnAllwidget.show();
		backBtn.hide();
		homeBtn.hide();
		themes.show();
	}
}

function spliceUrl(content, widget, feature) {
	//console.log(widget);
	var url = "?";
	if (content) {
		url += "content=" + content;
	}
	if (widget) {
		url += "&widget=" + widget;
	}
	if (feature) {
		url += "&feature=" + feature;
	}
	return url;
}

function parseUrl(urlString) {
	var paneId, widgetName,
		urlArray, urlObj, widgetArray;

	if (urlString)
		urlArray = urlString.split("?");
	if (urlArray.length < 2) {
		return null;
	}

	urlObj = {};
	widgetArray = urlArray[1].split("&");
	urlObj.paneId = "";
	if (widgetArray[0]) {
		urlObj.paneId = widgetArray[0].split("=")[1];
	}
	if (widgetArray[1]) {
		urlObj.widgetName = widgetArray[1].split("=")[1];
		//console.log(urlObj.widgetName);
	}
	if (widgetArray[2]) {
		urlObj.widgetPage = widgetArray[2].split("=")[1];
	}

	return urlObj;
}

function getSlideOption(currentEntry) {
	if (window.isReload) {
		if (currentEntry === undefined && window.entries.length === 0) {
			// first time load
			window.entries.push("?");
			return { direction: null };
		} else if (currentEntry && window.entries.length === 0) {
			// first time load
			if (currentEntry === "?") {
				window.entries.push(currentEntry);
			}
			return { direction: null };

		}
	} else {
		if (currentEntry === "?" || currentEntry === undefined
             || $.trim(currentEntry).length === 0) {
			currentEntry = "?";
			if (window.entries.length <= 0 || !isArrayContain(window.entries, currentEntry)) {
				//window.entries.pop();
				window.entries.push(currentEntry);
			}
			return { direction: "left" };
		} else if (currentEntry === "?widgets") {
			if (window.entries.length > 0 && isArrayContain(window.entries, "?")) {
				window.entries.pop();
				return { direction: "right" };
			}
			return { direction: "left" };
		} else {
			//forward
			//window.entries.push(currentEntry);
			window.entries.pop();
			return { direction: "right" };
		}

	}
}

function isArrayContain(arr, ch) {
	var returnValue = false;
	if (arr != null && arr.length > 0) {
		for (var kk = 0; kk < arr.length; kk++) {
			if (arr[kk] === ch) {
				returnValue = true;
				break;
			}
		}
	}
	return returnValue;
}


function loadWidgets() {
	//var xmlpath = "ControlList.xml";

	if ($.isPlainObject(ControlList)) {
		var ul_Widgets = $("#ul_Widgets");
		ul_Widgets.empty();
		$.each(ControlList, function (key, value) {

			var li = $("<li><a href='" + key + "'>"
                        + "<img src='explore/images/icons/widget/" + key
                        + ".png" + "' alt='" + key + "' />"
                        + key + "</a></li>");

			li.appendTo(ul_Widgets);

		});
		$("a", ul_Widgets)
			.unbind("click")
			.click(function (e) {
				var widgetSamplePath = $(this).attr("href"),
					widgetSamplePathArray = [widgetSamplePath, "overview"];
				var currentEntry = new Date().getTime();
				History.pushState({ path: widgetSamplePath, paneId: ".single-widget", currentEntry: currentEntry },
						null,
						spliceUrl("widgetContent", widgetSamplePathArray[0], widgetSamplePathArray[1]));
				return false;
			});
	}
}

function loadFavoriteWidgets() {
	//var xmlpath = "ControlList.xml";

	if ($.isPlainObject(ControlList)) {
		var ul_FavoriteWidgets = $("#ul_FavoriteWidgets");
		ul_FavoriteWidgets.empty();
		$.each(ControlList, function (key, value) {
			if (!!value["isFavorite"]) {
				var li = $("<li><a href='" + key + "'>"
                        + "<img src='explore/images/icons/widget/" + key
                        + ".png" + "' alt='" + key + "' />"
                        + key + "</a></li>");

				li.appendTo(ul_FavoriteWidgets);
			}
		});

		$("a", ul_FavoriteWidgets)
		.unbind("click")
		.click(function (e) {
			var widgetSamplePath = $(this).attr("href"),
				widgetSamplePathArray = [widgetSamplePath, "overview"];
			var currentEntry = new Date().getTime();
			History.pushState({ path: widgetSamplePath, paneId: ".single-widget", currentEntry: currentEntry },
					null,
					spliceUrl("widgetContent", widgetSamplePathArray[0], widgetSamplePathArray[1]));
			return false;
		});

		var exploreAllTmp = $("<li class='explore-all'><a >"
                + "<img src='explore/css/images/dots94x94.png'>"
                + "Explore All</a></li>");
		exploreAllTmp.appendTo(ul_FavoriteWidgets);
		$("li.explore-all >a", ul_FavoriteWidgets)
		.unbind("click")
		.click(function (e) {
			var currentEntry = "?widgets";
			History.pushState({ path: null, paneId: "widgets", currentEntry: currentEntry },
					null,
					spliceUrl("widgets"));
			return false;
		});

	}

}

function initTabSelection() {
	$("#ctl00_WidgetTabs").find("li.ui-state-default >a").each(function () {
		var href = $(this).attr("href").replace("#", "");
		if (href == "SampleContainer") {
			$(this).parent().addClass("ui-tabs-selected ui-state-active");
			$("#" + href).removeClass("ui-tabs-hide");
			$("#" + href).html("");
		}
		else {
			$(this).parent().removeClass("ui-tabs-selected ui-state-active");
			$("#" + href).addClass("ui-tabs-hide");
			$("#" + href).html("");
		}
	});

}

function removeDialogueLayer() {
	$("#dialog").remove();
	$("#dialog-confirm").remove();
	$("#dialog-message").remove();
	$("#dialog-modal").remove();
	$("div.ui-dialog").remove();
}