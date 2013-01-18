// Widget Explorer ViewModel and initialization
function explorerVM() {
	var self = this;
	self.theme = ko.observable("http://cdn.wijmo.com/themes/rocket/jquery-wijmo.css");
	self.title = ko.observable("Welcome");
	self.info = ko.observable("");
	self.mode = ko.observable("home"); //modes are home, widgets, sample
	self.setMode = function (newMode) {
		if (newMode === 'home') {
			History.pushState({ showall: false }, 'Welcome', "?showall=false");
		}
		else if (newMode === 'widgets') {
			History.pushState({ showall: true }, 'Widgets', "?showall=true");
		}
	};

	self.widgetListObject = ControlList;
	//build array based on ControlList data
	self.widgetList = function () {
		var widgets = [];
		for (var propertyName in self.widgetListObject) {
			self.widgetListObject[propertyName].name = propertyName;
			self.widgetListObject[propertyName].imageUrl = 'explore/images/icons/widget/' + propertyName + '.png';
			widgets.push(self.widgetListObject[propertyName]);
		}
		return widgets;
	}
	//filter widgetList array based isFavorite boolean
	self.widgetFavorites = function () {
		var favs = [];
		$.each(self.widgetList(), function (i, item) {
			if (item.isFavorite === true) {
				favs.push(item);
			}
		});
		return favs;
	};

	self.findWidgetByName = function (name) {
		var widget;
		$.each(self.widgetList(), function (i, item) {
			if (item.name === name) {
				widget = item;
			}
		});
		return widget;
	};
	self.urlWidgetName = ko.observable("");
	self.currentWidget = ko.computed(function () {
		if (self.urlWidgetName() === "") {
			return;
		}
		else {
			return self.findWidgetByName(self.urlWidgetName());
		}
	});

	//widget selected from list
	self.selectWidget = function (widget) {
		var widgetName = widget.name,
			sampleName = widget.actions[0].name;

		History.pushState({ widgetName: widgetName, sampleName: sampleName, needAnimation: false }, widgetName + " " + sampleName, "?widget=" + widgetName + "&sample=" + sampleName);
	};

	self.urlSampleName = ko.observable("");
	self.findSampleByName = function (name) {
		var sample;
		$.each(self.currentWidget().actions, function (i, item) {
			if (item.name === name) {
				sample = item;
			}
		});
		return sample;
	};
	self.currentSample = ko.computed(function () {
		if (self.urlSampleName() === "") {
			return;
		}
		else {
			return self.findSampleByName(self.urlSampleName());
		}
	});
	self.currentPage = ko.observable("");
	self.sample = ko.observable();
	self.sampleTitle = ko.observable("Overview");
	self.source = ko.observable("");
	//sample selected from list
	self.selectSample = function (sample) {
		var widgetName = self.currentWidget().name,
			sampleName = sample.name;
		History.pushState({ widgetName: widgetName, sampleName: sampleName, needAnimation: true }, widgetName + " " + sampleName, "?widget=" + widgetName + "&sample=" + sampleName);
	};

	//load sample using ajax
	self.loadSample = function (needAnimation) {
		var folder, url, path, pathArray, realPath,
			mainContent = $(".sectionsample .main-content"),
			sampleList = $("#sampleList");
		path = self.currentSample().page;
		//		if (self.currentWidget().branch == "complete") {
		//			folder = "Wijmo-Complete";
		//		}
		//		else {
		//			folder = "Wijmo-Open";
		//		}
		pathArray = window.location.href.substring(0, window.location.href.indexOf("explore.html"));
		//url = pathArray + folder + "/development-bundle/samples/" + path;
		url = pathArray + path;

		$.ajax({
			url: url,
			dataType: "html",
			success: function (data) {
				data = data.replace(/<script.*>.*<\/script>/ig, ""); // Remove script tags
				data = data.replace(/<link.*>.*<\/link>/ig, ""); // Remove script tags
				data = data.replace(/<\/?link.*>/ig, ""); //Remove link tags
				data = data.replace(/<\/?html.*>/ig, ""); //Remove html tag
				data = data.replace(/<\/?body.*>/ig, ""); //Remove body tag
				data = data.replace(/<\/?head.*>/ig, ""); //Remove head tag
				data = data.replace(/<\/?!doctype.*>/ig, ""); //Remove doctype
				data = data.replace(/<title.*>.*<\/title>/ig, ""); // Remove title tags
				data = data.replace(/<\/?meta.*>/ig, ""); //Remove link tags

				var callback = function () {
					self.sample("");
					self.sampleTitle("");
					if ($('#demo-source').length) {
						$('#demo-source').empty();
					}

					mainContent.show();
					self.currentPage(path);
					self.sample(data);
					self.sampleTitle(self.currentSample().name);
					var source = $.trim(data);
					var cleanedSource = source
						.replace('themes/Wijmo/jquery.ui.all.css', 'theme/jquery.ui.all.css')
						.replace(/\s*\x3Clink.*demos\x2Ecss.*\x3E\s*/, '\r\n\t')
						.replace(/\x2E\x2E\x2F\x2E\x2E\x2F/g, '');

					self.source(cleanedSource);


					self.info($("#SampleContainer .demo-description").html());
					$("#SampleContainer .container .header").remove();
					$("#SampleContainer .branding").remove();
					$("#SampleContainer .footer").remove();
					$("#SampleContainer link").remove();

					mainContent.hide().stop().show("fade", 600);
				}
				if (needAnimation) {
					mainContent.stop().hide("fade", 400, callback);
				}
				else {
					callback();
				}

			},
			error: function (err) {
				//console.log(err);
			}
		});
	};
}

var expVM = new explorerVM(),
isFirstLoad = true;

//add custom binding for animation.
if (ko) {
	var prevVal = "";
	ko.bindingHandlers.hisShow = {
		init: function (element, valueAccessor) {
			var va = ko.toJS(ko.utils.unwrapObservable(valueAccessor())),
				selector = va.selector || "",
				val = va.value || "",
				eles;

			if (selector.length) {
				eles = $(element).find(selector);
				eles.hide();
				if (val.length) {
					prevVal = val;
					$(".section" + val).show();
				}
			}

		},
		update: function (element, valueAccessor) {
			var va = ko.toJS(ko.utils.unwrapObservable(valueAccessor())),
				val = va.value || "",
				prevEle, ele;
			if (val.length) {
				if (prevVal === val) {
					return;
				}
				prevEle = $(".section" + prevVal);
				ele = $(".section" + val);
				prevVal = val;
				if (isFirstLoad) {
					prevEle.hide();
					ele.show();
					return;
				}
				ele.css({ position: "absolute", left: -1000, top: -1000 })
					.show();
				if (prevEle.index() < ele.index()) {
					prevEle.hide('slide', { direction: 'left' }, 400, function () {
						ele.css({ position: "", left: "", top: "" })
							.hide();
						ele.show('slide', { direction: 'right' }, 400);
					});
				} else {
					prevEle.hide('slide', { direction: 'right' }, 400, function () {
						ele.css({ position: "", left: "", top: "" })
							.hide();
						ele.show('slide', { direction: 'left' }, 400);
					});
				}
			}
		}
	};
}

//page initialization
$(function () {
	ko.applyBindings(expVM);

	//fixed list partially cut by superpanel
	$(".sampleList:wijmo-wijsuperpanel").wijsuperpanel("refresh");

	expVM.theme.subscribe(function () {
		$(".wijmo-stylesheet-wijmo-theme").attr("href", expVM.theme());
	});
	expVM.currentWidget.subscribe(function () {
		setTimeout(function () {
			$(".samples:wijmo-wijsuperpanel").wijsuperpanel("refresh");
		}, 100);
	});
	expVM.source.subscribe(function () {
		if ($('#demo-source').length == 0) {
			$('<div id="demo-source"></div>').appendTo('#SourceContainer');
		}

		if ($("#btnFullSize").length == 0) {
			$('<button id="btnFullSize" style="position:absolute"><span class="ui-icon ui-icon-arrow-4-diag"></span></button>')
			.appendTo("#SourceContainer").click(function () {
				$('#demo-source').clone().wijdialog({
					title: "Source Code",
					width: 900,
					height: 440,
					modal: true,
					captionButtons: {
						pin: { visible: false },
						refresh: { visible: false },
						toggle: { visible: false },
						minimize: { visible: false },
						maximize: { visible: false }
					},
					close: function () {
						$(this).remove();
					}
				}).wijdialog("maximize");
			});
		}
		$('<div class="source-block">' +
			'<pre class="brush:js;gutter: false;toolbar:false;html-script:true">' +
			'</pre></div>').appendTo($('#demo-source'));
		$("#SourceContainer").css({ 'padding': '0', 'height': '440px', 'overflow': 'auto', 'position': "relative" });

		var source = expVM.source().replace(/\/\*[\s\S]*\*\//ig, "")
						.replace(/\/\/[^\n]*/ig, ""); //remove comment
		$('#demo-source>div>pre').text(source);
		SyntaxHighlighter.highlight();

		$('#SourceContainer').scroll(function (event) {
			var scrollTop = $(this).scrollTop();
			$("#btnFullSize").css("top", scrollTop);
		}).bind("mouseleave", function () {
			$("#btnFullSize").fadeOut();
		}).bind("mouseenter", function () {
			$("#btnFullSize").fadeIn();
		});

		$("#btnFullSize").css({
			top: 0,
			left: 0
		}).hide();
	});

	expVM.sample.subscribe(function () {
		//$(":wijmo-wijdialog").wijdialog("destroy");
	});

	var History = window.History;
	if (!History.enabled) {
		return true;
	}
	// Bind to StateChange Event
	History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
		//History.log(State.data, State.title, State.url);
		$(":wijmo-wijdialog").wijdialog("destroy");
		if (State.data.widgetName != null) {
			expVM.urlWidgetName(State.data.widgetName);
			expVM.title(expVM.currentWidget().name);
		}
		if (State.data.widgetName != null && State.data.sampleName != null) {
			expVM.urlSampleName(State.data.sampleName);
			expVM.title(expVM.currentWidget().name);
			expVM.loadSample(State.data.needAnimation);
			expVM.mode('sample');
			if (!State.data.needAnimation) {
				$(".sectionsample .main-content").hide();
			}
		}
		if (State.data.showall != null && State.data.showall == true) {
			expVM.title('Widgets');
			expVM.mode('widgets');
		}
		else if (State.data == null ||
		$.isEmptyObject(State.data) ||
		State.data.showall == false) {
			expVM.title('Welcome');
			expVM.mode('home');
		}
	});

	//Check URL params on initial load to jump into widget samples
	//var vars = {};
	//var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
	//    vars[key] = value;
	//});

	if (QueryString['widget'] != null) {
		expVM.urlWidgetName(decodeURIComponent(QueryString['widget']));
		if (QueryString['sample'] != null) {
			expVM.urlSampleName(decodeURIComponent(QueryString['sample']));
		}
		else {
			expVM.urlSampleName(expVM.currentWidget().actions[0].name);
		}
		expVM.title(expVM.currentWidget().name);
		expVM.loadSample(false);
		expVM.mode('sample');
	}
	else if (QueryString['showall'] != null && QueryString['showall'] == "true") {
		expVM.title('Widgets');
		expVM.mode('widgets');
	}
	else {
		expVM.title('Welcome');
		expVM.mode('home');
	}

	isFirstLoad = false;
});

var QueryString = function () {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [query_string[pair[0]], pair[1]];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
} ();