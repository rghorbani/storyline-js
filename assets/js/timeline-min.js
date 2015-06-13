/*
	TimelineJS - ver. 2.35.5 - 2015-02-26
	Copyright (c) 2012-2013 Northwestern University
	a project of the Northwestern University Knight Lab, originally created by Zach Wise
	https://github.com/NUKnightLab/TimelineJS
	This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
	If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
(function() {
	var initializing = false,
		fnTest = /xyz/.test(function() {
			xyz
		}) ? /\b_super\b/ : /.*/;
	this.Class = function() {};
	Class.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this;
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? function(name, fn) {
				return function() {
					var tmp = this._super;
					this._super = _super[name];
					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret
				}
			}(name, prop[name]) : prop[name]
		}

		function Class() {
			if (!initializing && this.init) this.init.apply(this, arguments)
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class
	}
})();
var global = function() {
	return this || (1, eval)("this")
}();
if (typeof VMM == "undefined") {
	var VMM = Class.extend({});
	VMM.debug = true;
	VMM.master_config = {
		init: function() {
			return this
		},
		sizes: {
			api: {
				width: 0,
				height: 0
			}
		},
		vp: "Pellentesque nibh felis, eleifend id, commodo in, interdum vitae, leo",
		api_keys_master: {
			flickr: "RAIvxHY4hE/Elm5cieh4X5ptMyDpj7MYIxziGxi0WGCcy1s+yr7rKQ==",
			google: "uQKadH1VMlCsp560gN2aOiMz4evWkl1s34yryl3F/9FJOsn+/948CbBUvKLN46U=",
			twitter: ""
		},
		timers: {
			api: 7e3
		},
		api: {
			pushques: []
		},
		twitter: {
			active: false,
			array: [],
			api_loaded: false,
			que: []
		},
		flickr: {
			active: false,
			array: [],
			api_loaded: false,
			que: []
		},
		youtube: {
			active: false,
			array: [],
			api_loaded: false,
			que: []
		},
		vimeo: {
			active: false,
			array: [],
			api_loaded: false,
			que: []
		},
		vine: {
			active: false,
			array: [],
			api_loaded: false,
			que: []
		},
		webthumb: {
			active: false,
			array: [],
			api_loaded: false,
			que: []
		},
		googlemaps: {
			active: false,
			map_active: false,
			places_active: false,
			array: [],
			api_loaded: false,
			que: []
		},
		googledocs: {
			active: false,
			array: [],
			api_loaded: false,
			que: []
		},
		googleplus: {
			active: false,
			array: [],
			api_loaded: false,
			que: []
		},
		wikipedia: {
			active: false,
			array: [],
			api_loaded: false,
			que: [],
			tries: 0
		},
		soundcloud: {
			active: false,
			array: [],
			api_loaded: false,
			que: []
		}
	}.init();
	VMM.createElement = function(tag, value, cName, attrs, styles) {
		var ce = "";
		if (tag != null && tag != "") {
			ce += "<" + tag;
			if (cName != null && cName != "") {
				ce += " class='" + cName + "'"
			}
			if (attrs != null && attrs != "") {
				ce += " " + attrs
			}
			if (styles != null && styles != "") {
				ce += " style='" + styles + "'"
			}
			ce += ">";
			if (value != null && value != "") {
				ce += value
			}
			ce = ce + "</" + tag + ">"
		}
		return ce
	};
	VMM.createMediaElement = function(media, caption, credit) {
		var ce = "";
		var _valid = false;
		ce += "<div class='media'>";
		if (media != null && media != "") {
			valid = true;
			ce += "<img src='" + media + "'>";
			if (credit != null && credit != "") {
				ce += VMM.createElement("div", credit, "credit")
			}
			if (caption != null && caption != "") {
				ce += VMM.createElement("div", caption, "caption")
			}
		}
		ce += "</div>";
		return ce
	};
	VMM.hideUrlBar = function() {
		var win = window,
			doc = win.document;
		if (!location.hash || !win.addEventListener) {
			window.scrollTo(0, 1);
			var scrollTop = 1,
				bodycheck = setInterval(function() {
					if (doc.body) {
						clearInterval(bodycheck);
						scrollTop = "scrollTop" in doc.body ? doc.body.scrollTop : 1;
						win.scrollTo(0, scrollTop === 1 ? 0 : 1)
					}
				}, 15);
			win.addEventListener("load", function() {
				setTimeout(function() {
					win.scrollTo(0, scrollTop === 1 ? 0 : 1)
				}, 0)
			}, false)
		}
	}
}

function trace(msg) {
	if (VMM.debug) {
		if (window.console) {
			console.log(msg)
		} else if (typeof jsTrace != "undefined") {
			jsTrace.send(msg)
		} else {}
	}
}
Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(), 0, 1);
	return Math.ceil(((this - onejan) / 864e5 + onejan.getDay() + 1) / 7)
};
Date.prototype.getDayOfYear = function() {
	var onejan = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((this - onejan) / 864e5)
};
var is = {
	Null: function(a) {
		return a === null
	},
	Undefined: function(a) {
		return a === undefined
	},
	nt: function(a) {
		return a === null || a === undefined
	},
	Function: function(a) {
		return typeof a === "function" ? a.constructor.toString().match(/Function/) !== null : false
	},
	String: function(a) {
		return typeof a === "string" ? true : typeof a === "object" ? a.constructor.toString().match(/string/i) !== null : false
	},
	Array: function(a) {
		return typeof a === "object" ? a.constructor.toString().match(/array/i) !== null || a.length !== undefined : false
	},
	Boolean: function(a) {
		return typeof a === "boolean" ? true : typeof a === "object" ? a.constructor.toString().match(/boolean/i) !== null : false
	},
	Date: function(a) {
		return typeof a === "date" ? true : typeof a === "object" ? a.constructor.toString().match(/date/i) !== null : false
	},
	HTML: function(a) {
		return typeof a === "object" ? a.constructor.toString().match(/html/i) !== null : false
	},
	Number: function(a) {
		return typeof a === "number" ? true : typeof a === "object" ? a.constructor.toString().match(/Number/) !== null : false
	},
	Object: function(a) {
		return typeof a === "object" ? a.constructor.toString().match(/object/i) !== null : false
	},
	RegExp: function(a) {
		return typeof a === "function" ? a.constructor.toString().match(/regexp/i) !== null : false
	}
};
var type = {
	of: function(a) {
		for (var i in is) {
			if (is[i](a)) {
				return i.toLowerCase()
			}
		}
	}
};
if (typeof VMM != "undefined") {
	VMM.smoothScrollTo = function(elem, duration, ease) {
		if (typeof jQuery != "undefined") {
			var _ease = "easein",
				_duration = 1e3;
			if (duration != null) {
				if (duration < 1) {
					_duration = 1
				} else {
					_duration = Math.round(duration)
				}
			}
			if (ease != null && ease != "") {
				_ease = ease
			}
			if (jQuery(window).scrollTop() != VMM.Lib.offset(elem).top) {
				VMM.Lib.animate("html,body", _duration, _ease, {
					scrollTop: VMM.Lib.offset(elem).top
				})
			}
		}
	};
	VMM.attachElement = function(element, content) {
		if (typeof jQuery != "undefined") {
			jQuery(element).html(content)
		}
	};
	VMM.appendElement = function(element, content) {
		if (typeof jQuery != "undefined") {
			jQuery(element).append(content)
		}
	};
	VMM.getHTML = function(element) {
		var e;
		if (typeof jQuery != "undefined") {
			e = jQuery(element).html();
			return e
		}
	};
	VMM.getElement = function(element, p) {
		var e;
		if (typeof jQuery != "undefined") {
			if (p) {
				e = jQuery(element).parent().get(0)
			} else {
				e = jQuery(element).get(0)
			}
			return e
		}
	};
	VMM.bindEvent = function(element, the_handler, the_event_type, event_data) {
		var e;
		var _event_type = "click";
		var _event_data = {};
		if (the_event_type != null && the_event_type != "") {
			_event_type = the_event_type
		}
		if (_event_data != null && _event_data != "") {
			_event_data = event_data
		}
		if (typeof jQuery != "undefined") {
			jQuery(element).bind(_event_type, _event_data, the_handler)
		}
	};
	VMM.unbindEvent = function(element, the_handler, the_event_type) {
		var e;
		var _event_type = "click";
		var _event_data = {};
		if (the_event_type != null && the_event_type != "") {
			_event_type = the_event_type
		}
		if (typeof jQuery != "undefined") {
			jQuery(element).unbind(_event_type, the_handler)
		}
	};
	VMM.fireEvent = function(element, the_event_type, the_data) {
		var e;
		var _event_type = "click";
		var _data = [];
		if (the_event_type != null && the_event_type != "") {
			_event_type = the_event_type
		}
		if (the_data != null && the_data != "") {
			_data = the_data
		}
		if (typeof jQuery != "undefined") {
			jQuery(element).trigger(_event_type, _data)
		}
	};
	VMM.getJSON = function(url, data, callback) {
		if (typeof jQuery != "undefined") {
			jQuery.ajaxSetup({
				timeout: 3e3
			});
			if (VMM.Browser.browser == "Explorer" && parseInt(VMM.Browser.version, 10) >= 7 && window.XDomainRequest && url.match("^https?://")) {
				trace("old IE JSON doesn't like retrieving from different protocol");
				var colon = url.indexOf(":");
				url = url.substr(colon + 1)
			}
			return jQuery.getJSON(url, data, callback)
		}
	};
	VMM.parseJSON = function(the_json) {
		if (typeof jQuery != "undefined") {
			return jQuery.parseJSON(the_json)
		}
	};
	VMM.appendAndGetElement = function(append_to_element, tag, cName, content) {
		var e, _tag = "<div>",
			_class = "",
			_content = "",
			_id = "";
		if (tag != null && tag != "") {
			_tag = tag
		}
		if (cName != null && cName != "") {
			_class = cName
		}
		if (content != null && content != "") {
			_content = content
		}
		if (typeof jQuery != "undefined") {
			e = jQuery(tag);
			e.addClass(_class);
			e.html(_content);
			jQuery(append_to_element).append(e)
		}
		return e
	};
	VMM.addParentNumber = function(append_parent_to_element, parent_number) {
		var _parent_number = "0";
		if (parent_number != null && parent_number != "") {
			_parent_number = parent_number;
		}
		if (typeof jQuery != "undefined") {
			jQuery(append_parent_to_element).attr("parent", parent_number);
		}
		return _parent_number;
	};
	VMM.Lib = {
		init: function() {
			return this
		},
		hide: function(element, duration) {
			if (duration != null && duration != "") {
				if (typeof jQuery != "undefined") {
					jQuery(element).hide(duration)
				}
			} else {
				if (typeof jQuery != "undefined") {
					jQuery(element).hide()
				}
			}
		},
		remove: function(element) {
			if (typeof jQuery != "undefined") {
				jQuery(element).remove()
			}
		},
		detach: function(element) {
			if (typeof jQuery != "undefined") {
				jQuery(element).detach()
			}
		},
		append: function(element, value) {
			if (typeof jQuery != "undefined") {
				jQuery(element).append(value)
			}
		},
		prepend: function(element, value) {
			if (typeof jQuery != "undefined") {
				jQuery(element).prepend(value)
			}
		},
		show: function(element, duration) {
			if (duration != null && duration != "") {
				if (typeof jQuery != "undefined") {
					jQuery(element).show(duration)
				}
			} else {
				if (typeof jQuery != "undefined") {
					jQuery(element).show()
				}
			}
		},
		load: function(element, callback_function, event_data) {
			var _event_data = {
				elem: element
			};
			if (_event_data != null && _event_data != "") {
				_event_data = event_data
			}
			if (typeof jQuery != "undefined") {
				jQuery(element).load(_event_data, callback_function)
			}
		},
		addClass: function(element, cName) {
			if (typeof jQuery != "undefined") {
				jQuery(element).addClass(cName)
			}
		},
		removeClass: function(element, cName) {
			if (typeof jQuery != "undefined") {
				jQuery(element).removeClass(cName)
			}
		},
		attr: function(element, aName, value) {
			if (value != null && value != "") {
				if (typeof jQuery != "undefined") {
					jQuery(element).attr(aName, value)
				}
			} else {
				if (typeof jQuery != "undefined") {
					return jQuery(element).attr(aName)
				}
			}
		},
		prop: function(element, aName, value) {
			if (typeof jQuery == "undefined" || !("prop" in jQuery.fn)) {
				return VMM.Lib.attribute(element, aName, value)
			} else if (typeof value != "undefined") {
				return jQuery(element).prop(aName, value)
			} else {
				return jQuery(element).prop(aName)
			}
		},
		attribute: function(element, aName, value) {
			if (typeof jQuery != "undefined") {
				if (typeof value != "undefined" && value != null && value != "") {
					return jQuery(element).attr(aName, value)
				} else {
					return jQuery(element).attr(aName)
				}
			}
		},
		visible: function(element, show) {
			if (show != null) {
				if (typeof jQuery != "undefined") {
					if (show) {
						jQuery(element).show(0)
					} else {
						jQuery(element).hide(0)
					}
				}
			} else {
				if (typeof jQuery != "undefined") {
					if (jQuery(element).is(":visible")) {
						return true
					} else {
						return false
					}
				}
			}
		},
		css: function(element, prop, value) {
			if (value != null && value != "") {
				if (typeof jQuery != "undefined") {
					jQuery(element).css(prop, value)
				}
			} else {
				if (typeof jQuery != "undefined") {
					return jQuery(element).css(prop)
				}
			}
		},
		cssmultiple: function(element, propval) {
			if (typeof jQuery != "undefined") {
				return jQuery(element).css(propval)
			}
		},
		offset: function(element) {
			var p;
			if (typeof jQuery != "undefined") {
				p = jQuery(element).offset()
			}
			return p
		},
		position: function(element) {
			var p;
			if (typeof jQuery != "undefined") {
				p = jQuery(element).position()
			}
			return p
		},
		width: function(element, s) {
			if (s != null && s != "") {
				if (typeof jQuery != "undefined") {
					jQuery(element).width(s)
				}
			} else {
				if (typeof jQuery != "undefined") {
					return jQuery(element).width()
				}
			}
		},
		height: function(element, s) {
			if (s != null && s != "") {
				if (typeof jQuery != "undefined") {
					jQuery(element).height(s)
				}
			} else {
				if (typeof jQuery != "undefined") {
					return jQuery(element).height()
				}
			}
		},
		toggleClass: function(element, cName) {
			if (typeof jQuery != "undefined") {
				jQuery(element).toggleClass(cName)
			}
		},
		each: function(element, return_function) {
			if (typeof jQuery != "undefined") {
				jQuery(element).each(return_function)
			}
		},
		html: function(element, str) {
			var e;
			if (typeof jQuery != "undefined") {
				e = jQuery(element).html();
				return e
			}
			if (str != null && str != "") {
				if (typeof jQuery != "undefined") {
					jQuery(element).html(str)
				}
			} else {
				var e;
				if (typeof jQuery != "undefined") {
					e = jQuery(element).html();
					return e
				}
			}
		},
		find: function(element, selec) {
			if (typeof jQuery != "undefined") {
				return jQuery(element).find(selec)
			}
		},
		stop: function(element) {
			if (typeof jQuery != "undefined") {
				jQuery(element).stop()
			}
		},
		delay_animate: function(delay, element, duration, ease, att, callback_function) {
			if (VMM.Browser.features.css.transitions && !("scrollTop" in _att)) {
				var _tdd = Math.round(duration / 1500 * 10) / 10,
					__duration = _tdd + "s";
				VMM.Lib.css(element, "-webkit-transition", "all " + __duration + " ease");
				VMM.Lib.css(element, "-moz-transition", "all " + __duration + " ease");
				VMM.Lib.css(element, "-o-transition", "all " + __duration + " ease");
				VMM.Lib.css(element, "-ms-transition", "all " + __duration + " ease");
				VMM.Lib.css(element, "transition", "all " + __duration + " ease");
				VMM.Lib.cssmultiple(element, _att)
			} else {
				if (typeof jQuery != "undefined") {
					jQuery(element).delay(delay).animate(att, {
						duration: duration,
						easing: ease
					})
				}
			}
		},
		animate: function(element, duration, ease, att, que, callback_function) {
			var _ease = "easein",
				_que = false,
				_duration = 1e3,
				_att;
			if (duration != null) {
				if (duration < 1) {
					_duration = 1
				} else {
					_duration = Math.round(duration)
				}
			}
			if (ease != null && ease != "") {
				_ease = ease
			}
			if (que != null && que != "") {
				_que = que
			}
			if (att != null) {
				_att = att
			} else {
				_att = {
					opacity: 0
				}
			}
			if (VMM.Browser.features.css.transitions && !("scrollTop" in _att)) {
				var _tdd = Math.round(_duration / 1500 * 10) / 10,
					__duration = _tdd + "s";
				_ease = " cubic-bezier(0.33, 0.66, 0.66, 1)";
				for (var x in _att) {
					if (Object.prototype.hasOwnProperty.call(_att, x)) {
						trace(x + " to " + _att[x]);
						VMM.Lib.css(element, "-webkit-transition", x + " " + __duration + _ease);
						VMM.Lib.css(element, "-moz-transition", x + " " + __duration + _ease);
						VMM.Lib.css(element, "-o-transition", x + " " + __duration + _ease);
						VMM.Lib.css(element, "-ms-transition", x + " " + __duration + _ease);
						VMM.Lib.css(element, "transition", x + " " + __duration + _ease)
					}
				}
				VMM.Lib.cssmultiple(element, _att)
			} else {
				if (typeof jQuery != "undefined") {
					if (callback_function != null && callback_function != "") {
						jQuery(element).animate(_att, {
							queue: _que,
							duration: _duration,
							easing: _ease,
							complete: callback_function
						})
					} else {
						jQuery(element).animate(_att, {
							queue: _que,
							duration: _duration,
							easing: _ease
						})
					}
				}
			}
		}
	}
}
if (typeof jQuery != "undefined") {
	(function(jQuery) {
		if (window.XDomainRequest) {
			jQuery.ajaxTransport(function(s) {
				if (s.crossDomain && s.async) {
					if (s.timeout) {
						s.xdrTimeout = s.timeout;
						delete s.timeout
					}
					var xdr;
					return {
						send: function(_, complete) {
							function callback(status, statusText, responses, responseHeaders) {
								xdr.onload = xdr.onerror = xdr.ontimeout = jQuery.noop;
								xdr = undefined;
								complete(status, statusText, responses, responseHeaders)
							}
							xdr = new XDomainRequest;
							xdr.open(s.type, s.url);
							xdr.onload = function() {
								callback(200, "OK", {
									text: xdr.responseText
								}, "Content-Type: " + xdr.contentType)
							};
							xdr.onerror = function() {
								callback(404, "Not Found")
							};
							if (s.xdrTimeout) {
								xdr.ontimeout = function() {
									callback(0, "timeout")
								};
								xdr.timeout = s.xdrTimeout
							}
							xdr.send(s.hasContent && s.data || null)
						},
						abort: function() {
							if (xdr) {
								xdr.onerror = jQuery.noop();
								xdr.abort()
							}
						}
					}
				}
			})
		}
	})(jQuery);
	jQuery.easing["jswing"] = jQuery.easing["swing"];
	jQuery.extend(jQuery.easing, {
		def: "easeOutQuad",
		swing: function(x, t, b, c, d) {
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
		},
		easeInExpo: function(x, t, b, c, d) {
			return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
		},
		easeOutExpo: function(x, t, b, c, d) {
			return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
		},
		easeInOutExpo: function(x, t, b, c, d) {
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
		},
		easeInQuad: function(x, t, b, c, d) {
			return c * (t /= d) * t + b
		},
		easeOutQuad: function(x, t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b
		},
		easeInOutQuad: function(x, t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * (--t * (t - 2) - 1) + b
		}
	})
}
if (typeof VMM != "undefined" && typeof VMM.Browser == "undefined") {
	VMM.Browser = {
		init: function() {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
			this.tridentVersion = this.searchTridentVersion(navigator.userAgent);
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
			this.device = this.searchDevice(navigator.userAgent);
			this.orientation = this.searchOrientation(window.orientation);
			this.features = {
				css: {
					transitions: this.cssTransitionSupport()
				}
			}
		},
		searchOrientation: function(orientation) {
			var orient = "";
			if (orientation == 0 || orientation == 180) {
				orient = "portrait"
			} else if (orientation == 90 || orientation == -90) {
				orient = "landscape"
			} else {
				orient = "normal"
			}
			return orient
		},
		searchDevice: function(d) {
			var device = "";
			if (d.match(/Android/i) || d.match(/iPhone|iPod/i)) {
				device = "mobile"
			} else if (d.match(/iPad/i)) {
				device = "tablet"
			} else if (d.match(/BlackBerry/i) || d.match(/IEMobile/i)) {
				device = "other mobile"
			} else {
				device = "desktop"
			}
			return device
		},
		searchString: function(data) {
			for (var i = 0; i < data.length; i++) {
				var dataString = data[i].string,
					dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1) {
						return data[i].identity
					}
				} else if (dataProp) {
					return data[i].identity
				}
			}
		},
		searchVersion: function(dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1))
		},
		searchTridentVersion: function(dataString) {
			var index = dataString.indexOf("Trident/");
			if (index == -1) return 0;
			return parseFloat(dataString.substring(index + 8))
		},
		dataBrowser: [{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		}, {
			string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		}, {
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		}, {
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		}, {
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		}, {
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		}, {
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		}, {
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		}, {
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		}, {
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		}, {
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		}, {
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}],
		dataOS: [{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		}, {
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		}, {
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
		}, {
			string: navigator.userAgent,
			subString: "iPad",
			identity: "iPad"
		}, {
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}],
		cssTransitionSupport: function() {
			var b = document.body || document.documentElement,
				s = b.style,
				p = "transition";
			if (typeof s[p] == "string") {
				return true
			}
			var v = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
			p = p.charAt(0).toUpperCase() + p.substr(1);
			for (var i = 0; i < v.length; i++) {
				if (typeof s[v[i] + p] == "string") {
					return true
				}
			}
			return false
		}
	};
	VMM.Browser.init()
}
if (typeof VMM != "undefined" && typeof VMM.FileExtention == "undefined") {
	VMM.FileExtention = {
		googleDocType: function(url) {
			var fileName = url.replace(/\s\s*$/, ""),
				fileExtension = "",
				validFileExtensions = ["DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "PDF", "PAGES", "AI", "PSD", "TIFF", "DXF", "SVG", "EPS", "PS", "TTF", "XPS", "ZIP", "RAR"],
				flag = false;
			fileExtension = fileName.substr(fileName.length - 5, 5);
			for (var i = 0; i < validFileExtensions.length; i++) {
				if (fileExtension.toLowerCase().match(validFileExtensions[i].toString().toLowerCase()) || fileName.match("docs.google.com")) {
					flag = true
				}
			}
			return flag
		}
	}
}
if (typeof VMM != "undefined" && typeof VMM.Date == "undefined") {
	VMM.Date = {
		init: function() {
			return this
		},
		dateformats: {
			year: "yyyy",
			month_short: "mmm",
			month: "mmmm yyyy",
			full_short: "mmm d",
			full: "mmmm d',' yyyy",
			time_short: "h:MM:ss TT",
			time_no_seconds_short: "h:MM TT",
			time_no_seconds_small_date: "h:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",
			full_long: "mmm d',' yyyy 'at' hh:MM TT",
			full_long_small_date: "hh:MM TT'<br/><small>mmm d',' yyyy'</small>'"
		},
		month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		month_abbr: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
		day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		day_abbr: ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."],
		hour: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		hour_suffix: ["am"],
		bc_format: {
			year: "yyyy",
			month_short: "mmm",
			month: "mmmm yyyy",
			full_short: "mmm d",
			full: "mmmm d',' yyyy",
			time_no_seconds_short: "h:MM TT",
			time_no_seconds_small_date: "dddd', 'h:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",
			full_long: "dddd',' mmm d',' yyyy 'at' hh:MM TT",
			full_long_small_date: "hh:MM TT'<br/><small>'dddd',' mmm d',' yyyy'</small>'"
		},
		setLanguage: function(lang) {
			trace("SET DATE LANGUAGE");
			VMM.Date.dateformats = lang.dateformats;
			VMM.Date.month = lang.date.month;
			VMM.Date.month_abbr = lang.date.month_abbr;
			VMM.Date.day = lang.date.day;
			VMM.Date.day_abbr = lang.date.day_abbr;
			dateFormat.i18n.dayNames = lang.date.day_abbr.concat(lang.date.day);
			dateFormat.i18n.monthNames = lang.date.month_abbr.concat(lang.date.month)
		},
		parse: function(d, precision) {
			"use strict";
			var date, date_array, time_array, time_parse, p = {
				year: false,
				month: false,
				day: false,
				hour: false,
				minute: false,
				second: false,
				millisecond: false
			};
			if (type.of(d) == "date") {
				trace("DEBUG THIS, ITs A DATE");
				date = d
			} else {
				date = new Date(0);
				date.setMonth(0);
				date.setDate(1);
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				date.setMilliseconds(0);
				if (d.match(/,/gi)) {
					date_array = d.split(",");
					for (var i = 0; i < date_array.length; i++) {
						date_array[i] = parseInt(date_array[i], 10)
					}
					if (date_array[0]) {
						date.setFullYear(date_array[0]);
						p.year = true
					}
					if (date_array[1]) {
						date.setMonth(date_array[1] - 1);
						p.month = true
					}
					if (date_array[2]) {
						date.setDate(date_array[2]);
						p.day = true
					}
					if (date_array[3]) {
						date.setHours(date_array[3]);
						p.hour = true
					}
					if (date_array[4]) {
						date.setMinutes(date_array[4]);
						p.minute = true
					}
					if (date_array[5]) {
						date.setSeconds(date_array[5]);
						if (date_array[5] >= 1) {
							p.second = true
						}
					}
					if (date_array[6]) {
						date.setMilliseconds(date_array[6]);
						if (date_array[6] >= 1) {
							p.millisecond = true
						}
					}
				} else if (d.match("/")) {
					if (d.match(" ")) {
						time_parse = d.split(" ");
						if (d.match(":")) {
							time_array = time_parse[1].split(":");
							if (time_array[0] >= 0) {
								date.setHours(time_array[0]);
								p.hour = true
							}
							if (time_array[1] >= 0) {
								date.setMinutes(time_array[1]);
								p.minute = true
							}
							if (time_array[2] >= 0) {
								date.setSeconds(time_array[2]);
								p.second = true
							}
							if (time_array[3] >= 0) {
								date.setMilliseconds(time_array[3]);
								p.millisecond = true
							}
						}
						date_array = time_parse[0].split("/")
					} else {
						date_array = d.split("/")
					}
					if (date_array[2]) {
						date.setFullYear(date_array[2]);
						p.year = true
					}
					if (date_array[0] >= 0) {
						var month = date_array[0] - 1;
						date.setMonth(month);
						p.month = true
					}
					if (date_array[1] >= 0) {
						if (date_array[1].length > 2) {
							date.setFullYear(date_array[1]);
							p.year = true
						} else {
							date.setDate(date_array[1]);
							p.day = true
						}
					}
				} else if (d.match("now")) {
					var now = new Date;
					date.setFullYear(now.getFullYear());
					p.year = true;
					date.setMonth(now.getMonth());
					p.month = true;
					date.setDate(now.getDate());
					p.day = true;
					if (d.match("hours")) {
						date.setHours(now.getHours());
						p.hour = true
					}
					if (d.match("minutes")) {
						date.setHours(now.getHours());
						date.setMinutes(now.getMinutes());
						p.hour = true;
						p.minute = true
					}
					if (d.match("seconds")) {
						date.setHours(now.getHours());
						date.setMinutes(now.getMinutes());
						date.setSeconds(now.getSeconds());
						p.hour = true;
						p.minute = true;
						p.second = true
					}
					if (d.match("milliseconds")) {
						date.setHours(now.getHours());
						date.setMinutes(now.getMinutes());
						date.setSeconds(now.getSeconds());
						date.setMilliseconds(now.getMilliseconds());
						p.hour = true;
						p.minute = true;
						p.second = true;
						p.millisecond = true
					}
				} else if (d.length <= 8) {
					p.year = true;
					date.setFullYear(parseInt(d, 10));
					date.setMonth(0);
					date.setDate(1);
					date.setHours(0);
					date.setMinutes(0);
					date.setSeconds(0);
					date.setMilliseconds(0)
				} else if (d.match("T")) {
					if (navigator.userAgent.match(/MSIE\s(?!9.0)/)) {
						time_parse = d.split("T");
						if (d.match(":")) {
							time_array = time_parse[1].split(":");
							if (time_array[0] >= 1) {
								date.setHours(time_array[0]);
								p.hour = true
							}
							if (time_array[1] >= 1) {
								date.setMinutes(time_array[1]);
								p.minute = true
							}
							if (time_array[2] >= 1) {
								date.setSeconds(time_array[2]);
								if (time_array[2] >= 1) {
									p.second = true
								}
							}
							if (time_array[3] >= 1) {
								date.setMilliseconds(time_array[3]);
								if (time_array[3] >= 1) {
									p.millisecond = true
								}
							}
						}
						date_array = time_parse[0].split("-");
						if (date_array[0]) {
							date.setFullYear(date_array[0]);
							p.year = true
						}
						if (date_array[1] >= 0) {
							date.setMonth(date_array[1] - 1);
							p.month = true
						}
						if (date_array[2] >= 0) {
							date.setDate(date_array[2]);
							p.day = true
						}
					} else {
						date = new Date(Date.parse(d));
						p.year = true;
						p.month = true;
						p.day = true;
						p.hour = true;
						p.minute = true;
						if (date.getSeconds() >= 1) {
							p.second = true
						}
						if (date.getMilliseconds() >= 1) {
							p.millisecond = true
						}
					}
				} else {
					date = new Date(parseInt(d.slice(0, 4), 10), parseInt(d.slice(4, 6), 10) - 1, parseInt(d.slice(6, 8), 10), parseInt(d.slice(8, 10), 10), parseInt(d.slice(10, 12), 10));
					p.year = true;
					p.month = true;
					p.day = true;
					p.hour = true;
					p.minute = true;
					if (date.getSeconds() >= 1) {
						p.second = true
					}
					if (date.getMilliseconds() >= 1) {
						p.millisecond = true
					}
				}
			}
			if (precision != null && precision != "") {
				return {
					date: date,
					precision: p
				}
			} else {
				return date
			}
		},
		prettyDate: function(d, is_abbr, p, d2) {
			var _date, _date2, format, bc_check, is_pair = false,
				bc_original, bc_number, bc_string;
			if (d2 != null && d2 != "" && typeof d2 != "undefined") {
				is_pair = true;
				trace("D2 " + d2)
			}
			if (type.of(d) == "date") {
				if (type.of(p) == "object") {
					if (p.millisecond || p.second && d.getSeconds() >= 1) {
						if (is_abbr) {
							format = VMM.Date.dateformats.time_short
						} else {
							format = VMM.Date.dateformats.time_short
						}
					} else if (p.minute) {
						if (is_abbr) {
							format = VMM.Date.dateformats.time_no_seconds_short
						} else {
							format = VMM.Date.dateformats.time_no_seconds_small_date
						}
					} else if (p.hour) {
						if (is_abbr) {
							format = VMM.Date.dateformats.time_no_seconds_short
						} else {
							format = VMM.Date.dateformats.time_no_seconds_small_date
						}
					} else if (p.day) {
						if (is_abbr) {
							format = VMM.Date.dateformats.full_short
						} else {
							format = VMM.Date.dateformats.full
						}
					} else if (p.month) {
						if (is_abbr) {
							format = VMM.Date.dateformats.month_short
						} else {
							format = VMM.Date.dateformats.month
						}
					} else if (p.year) {
						format = VMM.Date.dateformats.year
					} else {
						format = VMM.Date.dateformats.year
					}
				} else {
					if (d.getMonth() === 0 && d.getDate() == 1 && d.getHours() === 0 && d.getMinutes() === 0) {
						format = VMM.Date.dateformats.year
					} else if (d.getDate() <= 1 && d.getHours() === 0 && d.getMinutes() === 0) {
						if (is_abbr) {
							format = VMM.Date.dateformats.month_short
						} else {
							format = VMM.Date.dateformats.month
						}
					} else if (d.getHours() === 0 && d.getMinutes() === 0) {
						if (is_abbr) {
							format = VMM.Date.dateformats.full_short
						} else {
							format = VMM.Date.dateformats.full
						}
					} else if (d.getMinutes() === 0) {
						if (is_abbr) {
							format = VMM.Date.dateformats.time_no_seconds_short
						} else {
							format = VMM.Date.dateformats.time_no_seconds_small_date
						}
					} else {
						if (is_abbr) {
							format = VMM.Date.dateformats.time_no_seconds_short
						} else {
							format = VMM.Date.dateformats.full_long
						}
					}
				}
				_date = dateFormat(d, format, false);
				bc_check = _date.split(" ");
				for (var i = 0; i < bc_check.length; i++) {
					if (parseInt(bc_check[i], 10) < 0) {
						trace("YEAR IS BC");
						bc_original = bc_check[i];
						bc_number = Math.abs(parseInt(bc_check[i], 10));
						bc_string = bc_number.toString() + " B.C.";
						_date = _date.replace(bc_original, bc_string)
					}
				}
				if (is_pair) {
					_date2 = dateFormat(d2, format, false);
					bc_check = _date2.split(" ");
					for (var j = 0; j < bc_check.length; j++) {
						if (parseInt(bc_check[j], 10) < 0) {
							trace("YEAR IS BC");
							bc_original = bc_check[j];
							bc_number = Math.abs(parseInt(bc_check[j], 10));
							bc_string = bc_number.toString() + " B.C.";
							_date2 = _date2.replace(bc_original, bc_string)
						}
					}
				}
			} else {
				trace("NOT A VALID DATE?");
				trace(d)
			}
			if (is_pair) {
				return _date + " &mdash; " + _date2
			} else {
				return _date
			}
		}
	}.init();
	var dateFormat = function() {
		var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[WLloSZ]|"[^"]*"|'[^']*'/g,
			timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
			timezoneClip = /[^-+\dA-Z]/g,
			pad = function(val, len) {
				val = String(val);
				len = len || 2;
				while (val.length < len) val = "0" + val;
				return val
			};
		return function(date, mask, utc) {
			var dF = dateFormat;
			if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
				mask = date;
				date = undefined
			}
			if (isNaN(date)) {
				trace("invalid date " + date)
			}
			mask = String(dF.masks[mask] || mask || dF.masks["default"]);
			if (mask.slice(0, 4) == "UTC:") {
				mask = mask.slice(4);
				utc = true
			}
			var _ = utc ? "getUTC" : "get",
				d = date[_ + "Date"](),
				D = date[_ + "Day"](),
				m = date[_ + "Month"](),
				y = date[_ + "FullYear"](),
				H = date[_ + "Hours"](),
				M = date[_ + "Minutes"](),
				s = date[_ + "Seconds"](),
				L = date[_ + "Milliseconds"](),
				W = date.getWeek(),
				o = utc ? 0 : date.getTimezoneOffset(),
				flags = {
					d: d,
					dd: pad(d),
					ddd: dF.i18n.dayNames[D],
					dddd: dF.i18n.dayNames[D + 7],
					m: m + 1,
					mm: pad(m + 1),
					mmm: dF.i18n.monthNames[m],
					mmmm: dF.i18n.monthNames[m + 12],
					yy: String(y).slice(2),
					yyyy: y,
					h: H % 12 || 12,
					hh: pad(H % 12 || 12),
					H: H,
					HH: pad(H),
					M: M,
					MM: pad(M),
					s: s,
					ss: pad(s),
					l: pad(L, 3),
					L: pad(L > 99 ? Math.round(L / 10) : L),
					t: H < 12 ? "a" : "p",
					tt: H < 12 ? "am" : "pm",
					T: H < 12 ? "A" : "P",
					TT: H < 12 ? "AM" : "PM",
					Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
					o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
					S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
					W: W
				};
			return mask.replace(token, function($0) {
				return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1)
			})
		}
	}();
	dateFormat.masks = {
		"default": "ddd mmm dd yyyy HH:MM:ss",
		shortDate: "m/d/yy",
		mediumDate: "mmm d, yyyy",
		longDate: "mmmm d, yyyy",
		fullDate: "dddd, mmmm d, yyyy",
		shortTime: "h:MM TT",
		mediumTime: "h:MM:ss TT",
		longTime: "h:MM:ss TT Z",
		isoDate: "yyyy-mm-dd",
		isoTime: "HH:MM:ss",
		isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
	};
	dateFormat.i18n = {
		dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	};
	Date.prototype.format = function(mask, utc) {
		return dateFormat(this, mask, utc)
	}
}
if (typeof VMM != "undefined" && typeof VMM.Util == "undefined") {
	VMM.Util = {
		init: function() {
			return this
		},
		removeRange: function(array, from, to) {
			var rest = array.slice((to || from) + 1 || array.length);
			array.length = from < 0 ? array.length + from : from;
			return array.push.apply(array, rest)
		},
		correctProtocol: function(url) {
			var loc = window.parent.location.protocol.toString(),
				prefix = "",
				the_url = url.split("://", 2);
			if (loc.match("http")) {
				prefix = loc
			} else {
				prefix = "https"
			}
			return prefix + "://" + the_url[1]
		},
		mergeConfig: function(config_main, config_to_merge) {
			var x;
			for (x in config_to_merge) {
				if (Object.prototype.hasOwnProperty.call(config_to_merge, x)) {
					config_main[x] = config_to_merge[x]
				}
			}
			return config_main
		},
		getObjectAttributeByIndex: function(obj, index) {
			if (typeof obj != "undefined") {
				var i = 0;
				for (var attr in obj) {
					if (index === i) {
						return obj[attr]
					}
					i++
				}
				return ""
			} else {
				return ""
			}
		},
		ordinal: function(n) {
			return ["th", "st", "nd", "rd"][!(n % 10 > 3 || Math.floor(n % 100 / 10) == 1) * (n % 10)]
		},
		randomBetween: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min)
		},
		average: function(a) {
			var r = {
					mean: 0,
					variance: 0,
					deviation: 0
				},
				t = a.length;
			for (var m, s = 0, l = t; l--; s += a[l]);
			for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
			return r.deviation = Math.sqrt(r.variance = s / t), r
		},
		customSort: function(a, b) {
			var a1 = a,
				b1 = b;
			if (a1 == b1) return 0;
			return a1 > b1 ? 1 : -1
		},
		deDupeArray: function(arr) {
			var i, len = arr.length,
				out = [],
				obj = {};
			for (i = 0; i < len; i++) {
				obj[arr[i]] = 0
			}
			for (i in obj) {
				out.push(i)
			}
			return out
		},
		wordCount: function(s) {
			var fullStr = s + " ";
			var initial_whitespace_rExp = /^[^A-Za-z0-9\'\-]+/gi;
			var left_trimmedStr = fullStr.replace(initial_whitespace_rExp, "");
			var non_alphanumerics_rExp = /[^A-Za-z0-9\'\-]+/gi;
			var cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, " ");
			var splitString = cleanedStr.split(" ");
			var word_count = splitString.length - 1;
			if (fullStr.length < 2) {
				word_count = 0
			}
			return word_count
		},
		ratio: {
			fit: function(w, h, ratio_w, ratio_h) {
				var _fit = {
					width: 0,
					height: 0
				};
				_fit.width = w;
				_fit.height = Math.round(w / ratio_w * ratio_h);
				if (_fit.height > h) {
					_fit.height = h;
					_fit.width = Math.round(h / ratio_h * ratio_w);
					if (_fit.width > w) {
						trace("FIT: DIDN'T FIT!!! ")
					}
				}
				return _fit
			},
			r16_9: function(w, h) {
				if (w !== null && w !== "") {
					return Math.round(h / 16 * 9)
				} else if (h !== null && h !== "") {
					return Math.round(w / 9 * 16)
				}
			},
			r4_3: function(w, h) {
				if (w !== null && w !== "") {
					return Math.round(h / 4 * 3)
				} else if (h !== null && h !== "") {
					return Math.round(w / 3 * 4)
				}
			}
		},
		doubledigit: function(n) {
			return (n < 10 ? "0" : "") + n
		},
		truncateWords: function(s, min, max) {
			if (!min) min = 30;
			if (!max) max = min;
			var initial_whitespace_rExp = /^[^A-Za-z0-9\'\-]+/gi;
			var left_trimmedStr = s.replace(initial_whitespace_rExp, "");
			var words = left_trimmedStr.split(" ");
			var result = [];
			min = Math.min(words.length, min);
			max = Math.min(words.length, max);
			for (var i = 0; i < min; i++) {
				result.push(words[i])
			}
			for (var j = min; i < max; i++) {
				var word = words[i];
				result.push(word);
				if (word.charAt(word.length - 1) == ".") {
					break
				}
			}
			return result.join(" ")
		},
		linkify: function(text, targets, is_touch) {
			var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
			var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
			var emailAddressPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
			return text.replace(urlPattern, "<a target='_blank' href='$&' onclick='void(0)'>$&</a>").replace(pseudoUrlPattern, "$1<a target='_blank' onclick='void(0)' href='http://$2'>$2</a>").replace(emailAddressPattern, "<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>")
		},
		linkify_with_twitter: function(text, targets, is_touch) {
			var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
			var url_pattern = /(\()((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\))|(\[)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\])|(\{)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\})|(<|&(?:lt|#60|#x3c);)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(>|&(?:gt|#62|#x3e);)|((?:^|[^=\s'"\]])\s*['"]?|[^=\s]\s+)(\b(?:ht|f)tps?:\/\/[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]+(?:(?!&(?:gt|#0*62|#x0*3e);|&(?:amp|apos|quot|#0*3[49]|#x0*2[27]);[.!&',:?;]?(?:[^a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]|$))&[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]*)*[a-z0-9\-_~$()*+=\/#[\]@%])/gim;
			var url_replace = '$1$4$7$10$13<a href="$2$5$8$11$14" target="_blank" class="hyphenate">$2$5$8$11$14</a>$3$6$9$12';
			var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

			function replaceURLWithHTMLLinks(text) {
				var exp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/gi;
				return text.replace(exp, "<a href='$1' target='_blank'>$3</a>")
			}
			var emailAddressPattern = /([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/gim;
			var twitterHandlePattern = /\B@([\w-]+)/gm;
			var twitterSearchPattern = /(#([\w]+))/g;
			return text.replace(url_pattern, url_replace).replace(pseudoUrlPattern, "$1<a target='_blank' class='hyphenate' onclick='void(0)' href='http://$2'>$2</a>").replace(emailAddressPattern, "<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>").replace(twitterHandlePattern, "<a href='http://twitter.com/$1' target='_blank' onclick='void(0)'>@$1</a>")
		},
		linkify_wikipedia: function(text) {
			var urlPattern = /<i[^>]*>(.*?)<\/i>/gim;
			return text.replace(urlPattern, "<a target='_blank' href='http://en.wikipedia.org/wiki/$&' onclick='void(0)'>$&</a>").replace(/<i\b[^>]*>/gim, "").replace(/<\/i>/gim, "").replace(/<b\b[^>]*>/gim, "").replace(/<\/b>/gim, "")
		},
		unlinkify: function(text) {
			if (!text) return text;
			text = text.replace(/<a\b[^>]*>/i, "");
			text = text.replace(/<\/a>/i, "");
			return text
		},
		untagify: function(text) {
			if (!text) {
				return text
			}
			text = text.replace(/<\/?\s*\w.*?>/g, "");
			return text
		},
		nl2br: function(text) {
			return text.replace(/(\r\n|[\r\n]|\\n|\\r)/g, "<br/>")
		},
		unique_ID: function(size) {
			var getRandomNumber = function(range) {
				return Math.floor(Math.random() * range)
			};
			var getRandomChar = function() {
				var chars = "abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
				return chars.substr(getRandomNumber(62), 1)
			};
			var randomID = function(size) {
				var str = "";
				for (var i = 0; i < size; i++) {
					str += getRandomChar()
				}
				return str
			};
			return randomID(size)
		},
		isEven: function(n) {
			return n % 2 === 0 ? true : false
		},
		getUrlVars: function(string) {
			var str = string.toString();
			if (str.match("&#038;")) {
				str = str.replace("&#038;", "&")
			} else if (str.match("&#38;")) {
				str = str.replace("&#38;", "&")
			} else if (str.match("&amp;")) {
				str = str.replace("&amp;", "&")
			}
			var vars = [],
				hash;
			var hashes = str.slice(str.indexOf("?") + 1).split("&");
			for (var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split("=");
				vars.push(hash[0]);
				vars[hash[0]] = hash[1]
			}
			return vars
		},
		toHTML: function(text) {
			text = this.nl2br(text);
			text = this.linkify(text);
			return text.replace(/\s\s/g, "&nbsp;&nbsp;")
		},
		toCamelCase: function(s, forceLowerCase) {
			if (forceLowerCase !== false) forceLowerCase = true;
			var sps = (forceLowerCase ? s.toLowerCase() : s).split(" ");
			for (var i = 0; i < sps.length; i++) {
				sps[i] = sps[i].substr(0, 1).toUpperCase() + sps[i].substr(1)
			}
			return sps.join(" ")
		},
		properQuotes: function(str) {
			return str.replace(/\"([^\"]*)\"/gi, "&#8220;$1&#8221;")
		},
		niceNumber: function(nStr) {
			nStr += "";
			x = nStr.split(".");
			x1 = x[0];
			x2 = x.length > 1 ? "." + x[1] : "";
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, "$1" + "," + "$2")
			}
			return x1 + x2
		},
		toTitleCase: function(t) {
			if (VMM.Browser.browser == "Explorer" && parseInt(VMM.Browser.version, 10) >= 7) {
				return t.replace("_", "%20")
			} else {
				var __TitleCase = {
					__smallWords: ["a", "an", "and", "as", "at", "but", "by", "en", "for", "if", "in", "of", "on", "or", "the", "to", "v[.]?", "via", "vs[.]?"],
					init: function() {
						this.__smallRE = this.__smallWords.join("|");
						this.__lowerCaseWordsRE = new RegExp("\\b(" + this.__smallRE + ")\\b", "gi");
						this.__firstWordRE = new RegExp("^([^a-zA-Z0-9 \\r\\n\\t]*)(" + this.__smallRE + ")\\b", "gi");
						this.__lastWordRE = new RegExp("\\b(" + this.__smallRE + ")([^a-zA-Z0-9 \\r\\n\\t]*)$", "gi")
					},
					toTitleCase: function(string) {
						var line = "";
						var split = string.split(/([:.;?!][ ]|(?:[ ]|^)["â€œ])/);
						for (var i = 0; i < split.length; ++i) {
							var s = split[i];
							s = s.replace(/\b([a-zA-Z][a-z.'â€™]*)\b/g, this.__titleCaseDottedWordReplacer);
							s = s.replace(this.__lowerCaseWordsRE, this.__lowerReplacer);
							s = s.replace(this.__firstWordRE, this.__firstToUpperCase);
							s = s.replace(this.__lastWordRE, this.__firstToUpperCase);
							line += s
						}
						line = line.replace(/ V(s?)\. /g, " v$1. ");
						line = line.replace(/(['â€™])S\b/g, "$1s");
						line = line.replace(/\b(AT&T|Q&A)\b/gi, this.__upperReplacer);
						return line
					},
					__titleCaseDottedWordReplacer: function(w) {
						return w.match(/[a-zA-Z][.][a-zA-Z]/) ? w : __TitleCase.__firstToUpperCase(w)
					},
					__lowerReplacer: function(w) {
						return w.toLowerCase()
					},
					__upperReplacer: function(w) {
						return w.toUpperCase()
					},
					__firstToUpperCase: function(w) {
						var split = w.split(/(^[^a-zA-Z0-9]*[a-zA-Z0-9])(.*)$/);
						if (split[1]) {
							split[1] = split[1].toUpperCase()
						}
						return split.join("")
					}
				};
				__TitleCase.init();
				t = t.replace(/_/g, " ");
				t = __TitleCase.toTitleCase(t);
				return t
			}
		}
	}.init()
}
LazyLoad = function(doc) {
	var env, head, pending = {},
		pollCount = 0,
		queue = {
			css: [],
			js: []
		},
		styleSheets = doc.styleSheets;

	function createNode(name, attrs) {
		var node = doc.createElement(name),
			attr;
		for (attr in attrs) {
			if (attrs.hasOwnProperty(attr)) {
				node.setAttribute(attr, attrs[attr])
			}
		}
		return node
	}

	function finish(type) {
		var p = pending[type],
			callback, urls;
		if (p) {
			callback = p.callback;
			urls = p.urls;
			urls.shift();
			pollCount = 0;
			if (!urls.length) {
				callback && callback.call(p.context, p.obj);
				pending[type] = null;
				queue[type].length && load(type)
			}
		}
	}

	function getEnv() {
		var ua = navigator.userAgent;
		env = {
			async: doc.createElement("script").async === true
		};
		(env.webkit = /AppleWebKit\//.test(ua)) || (env.ie = /MSIE/.test(ua)) || (env.opera = /Opera/.test(ua)) || (env.gecko = /Gecko\//.test(ua)) || (env.unknown = true)
	}

	function load(type, urls, callback, obj, context) {
		var _finish = function() {
				finish(type)
			},
			isCSS = type === "css",
			nodes = [],
			i, len, node, p, pendingUrls, url;
		env || getEnv();
		if (urls) {
			urls = typeof urls === "string" ? [urls] : urls.concat();
			if (isCSS || env.async || env.gecko || env.opera) {
				queue[type].push({
					urls: urls,
					callback: callback,
					obj: obj,
					context: context
				})
			} else {
				for (i = 0, len = urls.length; i < len; ++i) {
					queue[type].push({
						urls: [urls[i]],
						callback: i === len - 1 ? callback : null,
						obj: obj,
						context: context
					})
				}
			}
		}
		if (pending[type] || !(p = pending[type] = queue[type].shift())) {
			return
		}
		head || (head = doc.head || doc.getElementsByTagName("head")[0]);
		pendingUrls = p.urls;
		for (i = 0, len = pendingUrls.length; i < len; ++i) {
			url = pendingUrls[i];
			if (isCSS) {
				node = env.gecko ? createNode("style") : createNode("link", {
					href: url,
					rel: "stylesheet"
				})
			} else {
				node = createNode("script", {
					src: url
				});
				node.async = false
			}
			node.className = "lazyload";
			node.setAttribute("charset", "utf-8");
			if (env.ie && !isCSS) {
				node.onreadystatechange = function() {
					if (/loaded|complete/.test(node.readyState)) {
						node.onreadystatechange = null;
						_finish()
					}
				}
			} else if (isCSS && (env.gecko || env.webkit)) {
				if (env.webkit) {
					p.urls[i] = node.href;
					pollWebKit()
				} else {
					node.innerHTML = '@import "' + url + '";';
					pollGecko(node)
				}
			} else {
				node.onload = node.onerror = _finish
			}
			nodes.push(node)
		}
		for (i = 0, len = nodes.length; i < len; ++i) {
			head.appendChild(nodes[i])
		}
	}

	function pollGecko(node) {
		var hasRules;
		try {
			hasRules = !!node.sheet.cssRules
		} catch (ex) {
			pollCount += 1;
			if (pollCount < 200) {
				setTimeout(function() {
					pollGecko(node)
				}, 50)
			} else {
				hasRules && finish("css")
			}
			return
		}
		finish("css")
	}

	function pollWebKit() {
		var css = pending.css,
			i;
		if (css) {
			i = styleSheets.length;
			while (--i >= 0) {
				if (styleSheets[i].href === css.urls[0]) {
					finish("css");
					break
				}
			}
			pollCount += 1;
			if (css) {
				if (pollCount < 200) {
					setTimeout(pollWebKit, 50)
				} else {
					finish("css")
				}
			}
		}
	}
	return {
		css: function(urls, callback, obj, context) {
			load("css", urls, callback, obj, context)
		},
		js: function(urls, callback, obj, context) {
			load("js", urls, callback, obj, context)
		}
	}
}(this.document);
LoadLib = function(doc) {
	var loaded = [];

	function isLoaded(url) {
		var i = 0,
			has_loaded = false;
		for (i = 0; i < loaded.length; i++) {
			if (loaded[i] == url) {
				has_loaded = true
			}
		}
		if (has_loaded) {
			return true
		} else {
			loaded.push(url);
			return false
		}
	}
	return {
		css: function(urls, callback, obj, context) {
			if (!isLoaded(urls)) {
				LazyLoad.css(urls, callback, obj, context)
			}
		},
		js: function(urls, callback, obj, context) {
			if (!isLoaded(urls)) {
				LazyLoad.js(urls, callback, obj, context)
			}
		}
	}
}(this.document);
if (typeof VMM != "undefined" && typeof VMM.Language == "undefined") {
	VMM.Language = {
		lang: "en",
		api: {
			wikipedia: "en"
		},
		date: {
			month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			month_abbr: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
			day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			day_abbr: ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."]
		},
		dateformats: {
			year: "yyyy",
			month_short: "mmm",
			month: "mmmm yyyy",
			full_short: "mmm d",
			full: "mmmm d',' yyyy",
			time_short: "h:MM:ss TT",
			time_no_seconds_short: "h:MM TT",
			time_no_seconds_small_date: "h:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",
			full_long: "mmm d',' yyyy 'at' h:MM TT",
			full_long_small_date: "h:MM TT'<br/><small>mmm d',' yyyy'</small>'"
		},
		messages: {
			loading_timeline: "Loading Timeline... ",
			return_to_title: "Return to Title",
			expand_timeline: "Expand Timeline",
			contract_timeline: "Contract Timeline",
			wikipedia: "From Wikipedia, the free encyclopedia",
			loading_content: "Loading Content",
			loading: "Loading",
			swipe_nav: "Swipe to Navigate"
		}
	}
}
if (typeof VMM != "undefined" && typeof VMM.ExternalAPI == "undefined") {
	VMM.ExternalAPI = {
		keys: {
			google: "",
			flickr: "",
			twitter: ""
		},
		keys_master: {
			vp: "Pellentesque nibh felis, eleifend id, commodo in, interdum vitae, leo",
			flickr: "RAIvxHY4hE/Elm5cieh4X5ptMyDpj7MYIxziGxi0WGCcy1s+yr7rKQ==",
			google: "jwNGnYw4hE9lmAez4ll0QD+jo6SKBJFknkopLS4FrSAuGfIwyj57AusuR0s8dAo=",
			twitter: ""
		},
		init: function() {
			return this
		},
		setKeys: function(d) {
			VMM.ExternalAPI.keys = d
		},
		pushQues: function() {
			if (VMM.master_config.googlemaps.active) {
				VMM.ExternalAPI.googlemaps.pushQue()
			}
			if (VMM.master_config.youtube.active) {
				VMM.ExternalAPI.youtube.pushQue()
			}
			if (VMM.master_config.soundcloud.active) {
				VMM.ExternalAPI.soundcloud.pushQue()
			}
			if (VMM.master_config.googledocs.active) {
				VMM.ExternalAPI.googledocs.pushQue()
			}
			if (VMM.master_config.googleplus.active) {
				VMM.ExternalAPI.googleplus.pushQue()
			}
			if (VMM.master_config.wikipedia.active) {
				VMM.ExternalAPI.wikipedia.pushQue()
			}
			if (VMM.master_config.vimeo.active) {
				VMM.ExternalAPI.vimeo.pushQue()
			}
			if (VMM.master_config.vine.active) {
				VMM.ExternalAPI.vine.pushQue()
			}
			if (VMM.master_config.twitter.active) {
				VMM.ExternalAPI.twitter.pushQue()
			}
			if (VMM.master_config.flickr.active) {
				VMM.ExternalAPI.flickr.pushQue()
			}
			if (VMM.master_config.webthumb.active) {
				VMM.ExternalAPI.webthumb.pushQue()
			}
		},
		twitter: {
			tweetArray: [],
			get: function(m) {
				var tweet = {
					mid: m.id,
					id: m.uid
				};
				VMM.master_config.twitter.que.push(tweet);
				VMM.master_config.twitter.active = true
			},
			create: function(tweet, callback) {
				var id = tweet.mid.toString(),
					error_obj = {
						twitterid: tweet.mid
					},
					the_url = "//api.twitter.com/1/statuses/show.json?id=" + tweet.mid + "&include_entities=true&callback=?";
				VMM.ExternalAPI.twitter.getOEmbed(tweet, callback)
			},
			errorTimeOut: function(tweet) {
				trace("TWITTER JSON ERROR TIMEOUT " + tweet.mid);
				VMM.attachElement("#" + tweet.id.toString(), VMM.MediaElement.loadingmessage("Still waiting on Twitter: " + tweet.mid));
				VMM.getJSON("//api.twitter.com/1/account/rate_limit_status.json", function(d) {
					trace("REMAINING TWITTER API CALLS " + d.remaining_hits);
					trace("TWITTER RATE LIMIT WILL RESET AT " + d.reset_time);
					var mes = "";
					if (d.remaining_hits == 0) {
						mes = "<p>You've reached the maximum number of tweets you can load in an hour.</p>";
						mes += "<p>You can view tweets again starting at: <br/>" + d.reset_time + "</p>"
					} else {
						mes = "<p>Still waiting on Twitter. " + tweet.mid + "</p>"
					}
					VMM.attachElement("#" + tweet.id.toString(), VMM.MediaElement.loadingmessage(mes))
				})
			},
			errorTimeOutOembed: function(tweet) {
				trace("TWITTER JSON ERROR TIMEOUT " + tweet.mid);
				VMM.attachElement("#" + tweet.id.toString(), VMM.MediaElement.loadingmessage("Still waiting on Twitter: " + tweet.mid))
			},
			pushQue: function() {
				if (VMM.master_config.twitter.que.length > 0) {
					VMM.ExternalAPI.twitter.create(VMM.master_config.twitter.que[0], VMM.ExternalAPI.twitter.pushQue);
					VMM.Util.removeRange(VMM.master_config.twitter.que, 0)
				}
			},
			getOEmbed: function(tweet, callback) {
				var the_url = "//api.twitter.com/1/statuses/oembed.json?id=" + tweet.mid + "&omit_script=true&include_entities=true&callback=?",
					twitter_timeout = setTimeout(VMM.ExternalAPI.twitter.errorTimeOutOembed, VMM.master_config.timers.api, tweet);
				VMM.getJSON(the_url, function(d) {
					var twit = "",
						tuser = "";
					twit += d.html.split("</p>&mdash;")[0] + "</p></blockquote>";
					tuser = d.author_url.split("twitter.com/")[1];
					twit += "<div class='vcard author'>";
					twit += "<a class='screen-name url' href='" + d.author_url + "' target='_blank'>";
					twit += "<span class='avatar'></span>";
					twit += "<span class='fn'>" + d.author_name + "</span>";
					twit += "<span class='nickname'>@" + tuser + "<span class='thumbnail-inline'></span></span>";
					twit += "</a>";
					twit += "</div>";
					VMM.attachElement("#" + tweet.id.toString(), twit);
					VMM.attachElement("#text_thumb_" + tweet.id.toString(), d.html);
					VMM.attachElement("#marker_content_" + tweet.id.toString(), d.html)
				}).error(function(jqXHR, textStatus, errorThrown) {
					trace("TWITTER error");
					trace("TWITTER ERROR: " + textStatus + " " + jqXHR.responseText);
					clearTimeout(twitter_timeout);
					VMM.attachElement("#" + tweet.id, VMM.MediaElement.loadingmessage("ERROR LOADING TWEET " + tweet.mid))
				}).success(function(d) {
					clearTimeout(twitter_timeout);
					callback()
				})
			},
			getHTML: function(id) {
				var the_url = "//api.twitter.com/1/statuses/oembed.json?id=" + id + "&omit_script=true&include_entities=true&callback=?";
				VMM.getJSON(the_url, VMM.ExternalAPI.twitter.onJSONLoaded)
			},
			onJSONLoaded: function(d) {
				trace("TWITTER JSON LOADED");
				var id = d.id;
				VMM.attachElement("#" + id, VMM.Util.linkify_with_twitter(d.html))
			},
			parseTwitterDate: function(d) {
				var date = new Date(Date.parse(d));
				return date
			},
			prettyParseTwitterDate: function(d) {
				var date = new Date(Date.parse(d));
				return VMM.Date.prettyDate(date, true)
			},
			getTweets: function(tweets) {
				var tweetArray = [];
				var number_of_tweets = tweets.length;
				for (var i = 0; i < tweets.length; i++) {
					var twitter_id = "";
					if (tweets[i].tweet.match("status/")) {
						twitter_id = tweets[i].tweet.split("status/")[1]
					} else if (tweets[i].tweet.match("statuses/")) {
						twitter_id = tweets[i].tweet.split("statuses/")[1]
					} else {
						twitter_id = ""
					}
					var the_url = "//api.twitter.com/1/statuses/show.json?id=" + twitter_id + "&include_entities=true&callback=?";
					VMM.getJSON(the_url, function(d) {
						var tweet = {};
						var twit = "<div class='twitter'><blockquote><p>";
						var td = VMM.Util.linkify_with_twitter(d.text, "_blank");
						twit += td;
						twit += "</p>";
						twit += "â€” " + d.user.name + " (<a href='https://twitter.com/" + d.user.screen_name + "'>@" + d.user.screen_name + "</a>) <a href='https://twitter.com/" + d.user.screen_name + "/status/" + d.id + "'>" + VMM.ExternalAPI.twitter.prettyParseTwitterDate(d.created_at) + " </a></blockquote></div>";
						tweet.content = twit;
						tweet.raw = d;
						tweetArray.push(tweet);
						if (tweetArray.length == number_of_tweets) {
							var the_tweets = {
								tweetdata: tweetArray
							};
							VMM.fireEvent(global, "TWEETSLOADED", the_tweets)
						}
					}).success(function() {
						trace("second success")
					}).error(function() {
						trace("error")
					}).complete(function() {
						trace("complete")
					})
				}
			},
			getTweetSearch: function(tweets, number_of_tweets) {
				var _number_of_tweets = 40;
				if (number_of_tweets != null && number_of_tweets != "") {
					_number_of_tweets = number_of_tweets
				}
				var the_url = "//search.twitter.com/search.json?q=" + tweets + "&rpp=" + _number_of_tweets + "&include_entities=true&result_type=mixed";
				var tweetArray = [];
				VMM.getJSON(the_url, function(d) {
					for (var i = 0; i < d.results.length; i++) {
						var tweet = {};
						var twit = "<div class='twitter'><blockquote><p>";
						var td = VMM.Util.linkify_with_twitter(d.results[i].text, "_blank");
						twit += td;
						twit += "</p>";
						twit += "â€” " + d.results[i].from_user_name + " (<a href='https://twitter.com/" + d.results[i].from_user + "'>@" + d.results[i].from_user + "</a>) <a href='https://twitter.com/" + d.results[i].from_user + "/status/" + d.id + "'>" + VMM.ExternalAPI.twitter.prettyParseTwitterDate(d.results[i].created_at) + " </a></blockquote></div>";
						tweet.content = twit;
						tweet.raw = d.results[i];
						tweetArray.push(tweet)
					}
					var the_tweets = {
						tweetdata: tweetArray
					};
					VMM.fireEvent(global, "TWEETSLOADED", the_tweets)
				})
			},
			prettyHTML: function(id, secondary) {
				var id = id.toString();
				var error_obj = {
					twitterid: id
				};
				var the_url = "//api.twitter.com/1/statuses/show.json?id=" + id + "&include_entities=true&callback=?";
				var twitter_timeout = setTimeout(VMM.ExternalAPI.twitter.errorTimeOut, VMM.master_config.timers.api, id);
				VMM.getJSON(the_url, VMM.ExternalAPI.twitter.formatJSON).error(function(jqXHR, textStatus, errorThrown) {
					trace("TWITTER error");
					trace("TWITTER ERROR: " + textStatus + " " + jqXHR.responseText);
					VMM.attachElement("#twitter_" + id, "<p>ERROR LOADING TWEET " + id + "</p>")
				}).success(function(d) {
					clearTimeout(twitter_timeout);
					if (secondary) {
						VMM.ExternalAPI.twitter.secondaryMedia(d)
					}
				})
			},
			formatJSON: function(d) {
				var id = d.id_str;
				var twit = "<blockquote><p>";
				var td = VMM.Util.linkify_with_twitter(d.text, "_blank");
				twit += td;
				twit += "</p></blockquote>";
				twit += "<div class='vcard author'>";
				twit += "<a class='screen-name url' href='https://twitter.com/" + d.user.screen_name + "' data-screen-name='" + d.user.screen_name + "' target='_blank'>";
				twit += "<span class='avatar'><img src=' " + d.user.profile_image_url + "'  alt=''></span>";
				twit += "<span class='fn'>" + d.user.name + "</span>";
				twit += "<span class='nickname'>@" + d.user.screen_name + "<span class='thumbnail-inline'></span></span>";
				twit += "</a>";
				twit += "</div>";
				if (typeof d.entities.media != "undefined") {
					if (d.entities.media[0].type == "photo") {
						twit += "<img src=' " + d.entities.media[0].media_url + "'  alt=''>"
					}
				}
				VMM.attachElement("#twitter_" + id.toString(), twit);
				VMM.attachElement("#text_thumb_" + id.toString(), d.text)
			}
		},
		googlemaps: {
			maptype: "TERRAIN",
			setMapType: function(d) {
				if (d != "") {
					VMM.ExternalAPI.googlemaps.maptype = d
				}
			},
			get: function(m) {
				var timer, api_key, map_url;
				m.vars = VMM.Util.getUrlVars(m.id);
				if (VMM.ExternalAPI.keys.google != "") {
					api_key = VMM.ExternalAPI.keys.google
				} else {
					api_key = Aes.Ctr.decrypt(VMM.ExternalAPI.keys_master.google, VMM.ExternalAPI.keys_master.vp, 256)
				}
				map_url = "//maps.googleapis.com/maps/api/js?key=" + api_key + "&v=3.9&libraries=places&sensor=false&callback=VMM.ExternalAPI.googlemaps.onMapAPIReady";
				if (VMM.master_config.googlemaps.active) {
					VMM.master_config.googlemaps.que.push(m)
				} else {
					VMM.master_config.googlemaps.que.push(m);
					if (VMM.master_config.googlemaps.api_loaded) {} else {
						LoadLib.js(map_url, function() {
							trace("Google Maps API Library Loaded")
						})
					}
				}
			},
			create: function(m) {
				VMM.ExternalAPI.googlemaps.createAPIMap(m)
			},
			createiFrameMap: function(m) {
				var embed_url = m.id + "&output=embed",
					mc = "",
					unique_map_id = m.uid.toString() + "_gmap";
				mc += "<div class='google-map' id='" + unique_map_id + "' style='width=100%;height=100%;'>";
				mc += "<iframe width='100%' height='100%' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" + embed_url + "'></iframe>";
				mc += "</div>";
				VMM.attachElement("#" + m.uid, mc)
			},
			createAPIMap: function(m) {
				var map_attribution = "",
					layer, map, map_options, unique_map_id = m.uid.toString() + "_gmap",
					map_attribution_html = "",
					location = new google.maps.LatLng(41.875696, -87.624207),
					latlong, zoom = 11,
					has_location = false,
					has_zoom = false,
					api_limit = false,
					map_bounds;

				function mapProvider(name) {
					if (name in VMM.ExternalAPI.googlemaps.map_providers) {
						map_attribution = VMM.ExternalAPI.googlemaps.map_attribution[VMM.ExternalAPI.googlemaps.map_providers[name].attribution];
						return VMM.ExternalAPI.googlemaps.map_providers[name]
					} else {
						if (VMM.ExternalAPI.googlemaps.defaultType(name)) {
							trace("GOOGLE MAP DEFAULT TYPE");
							return google.maps.MapTypeId[name.toUpperCase()]
						} else {
							trace("Not a maptype: " + name)
						}
					}
				}
				google.maps.VeriteMapType = function(name) {
					if (VMM.ExternalAPI.googlemaps.defaultType(name)) {
						return google.maps.MapTypeId[name.toUpperCase()]
					} else {
						var provider = mapProvider(name);
						return google.maps.ImageMapType.call(this, {
							getTileUrl: function(coord, zoom) {
								var index = (zoom + coord.x + coord.y) % VMM.ExternalAPI.googlemaps.map_subdomains.length;
								var retURL = provider.url.replace("{S}", VMM.ExternalAPI.googlemaps.map_subdomains[index]).replace("{Z}", zoom).replace("{X}", coord.x).replace("{Y}", coord.y).replace("{z}", zoom).replace("{x}", coord.x).replace("{y}", coord.y);
								return retURL
							},
							tileSize: new google.maps.Size(256, 256),
							name: name,
							minZoom: provider.minZoom,
							maxZoom: provider.maxZoom
						})
					}
				};
				google.maps.VeriteMapType.prototype = new google.maps.ImageMapType("_");
				if (VMM.ExternalAPI.googlemaps.maptype != "") {
					if (VMM.ExternalAPI.googlemaps.defaultType(VMM.ExternalAPI.googlemaps.maptype)) {
						layer = google.maps.MapTypeId[VMM.ExternalAPI.googlemaps.maptype.toUpperCase()]
					} else {
						layer = VMM.ExternalAPI.googlemaps.maptype
					}
				} else {
					layer = google.maps.MapTypeId["TERRAIN"]
				}
				var new_google_url_regex = new RegExp(/@([0-9\.\-]+),([0-9\.\-]+),(\d+)z/);
				if (m.id.match(new_google_url_regex)) {
					var match = m.id.match(new_google_url_regex);
					lat = parseFloat(match[1]);
					lng = parseFloat(match[2]);
					location = new google.maps.LatLng(lat, lng);
					zoom = parseFloat(match[3]);
					has_location = has_zoom = true
				} else {
					if (type.of(VMM.Util.getUrlVars(m.id)["ll"]) == "string") {
						has_location = true;
						latlong = VMM.Util.getUrlVars(m.id)["ll"].split(",");
						location = new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1]))
					} else if (type.of(VMM.Util.getUrlVars(m.id)["sll"]) == "string") {
						latlong = VMM.Util.getUrlVars(m.id)["sll"].split(",");
						location = new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1]))
					}
					if (type.of(VMM.Util.getUrlVars(m.id)["z"]) == "string") {
						has_zoom = true;
						zoom = parseFloat(VMM.Util.getUrlVars(m.id)["z"])
					}
				}
				map_options = {
					zoom: zoom,
					draggable: false,
					disableDefaultUI: true,
					mapTypeControl: false,
					zoomControl: true,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle.SMALL,
						position: google.maps.ControlPosition.TOP_RIGHT
					},
					center: location,
					mapTypeId: layer,
					mapTypeControlOptions: {
						mapTypeIds: [layer]
					}
				};
				VMM.attachElement("#" + m.uid, "<div class='google-map' id='" + unique_map_id + "' style='width=100%;height=100%;'></div>");
				map = new google.maps.Map(document.getElementById(unique_map_id), map_options);
				if (VMM.ExternalAPI.googlemaps.defaultType(VMM.ExternalAPI.googlemaps.maptype)) {} else {
					map.mapTypes.set(layer, new google.maps.VeriteMapType(layer));
					map_attribution_html = "<div class='map-attribution'><div class='attribution-text'>" + map_attribution + "</div></div>";
					VMM.appendElement("#" + unique_map_id, map_attribution_html)
				}
				if (type.of(VMM.Util.getUrlVars(m.id)["msid"]) == "string") {
					loadKML()
				} else {
					if (type.of(VMM.Util.getUrlVars(m.id)["q"]) == "string") {
						geocodePlace()
					}
				}

				function geocodePlace() {
					var geocoder = new google.maps.Geocoder,
						address = VMM.Util.getUrlVars(m.id)["q"],
						marker;
					if (address.match("loc:")) {
						var address_latlon = address.split(":")[1].split("+");
						location = new google.maps.LatLng(parseFloat(address_latlon[0]), parseFloat(address_latlon[1]));
						has_location = true
					}
					geocoder.geocode({
						address: address
					}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							marker = new google.maps.Marker({
								map: map,
								position: results[0].geometry.location
							});
							if (typeof results[0].geometry.viewport != "undefined") {
								map.fitBounds(results[0].geometry.viewport)
							} else if (typeof results[0].geometry.bounds != "undefined") {
								map.fitBounds(results[0].geometry.bounds)
							} else {
								map.setCenter(results[0].geometry.location)
							}
							if (has_location) {
								map.panTo(location)
							}
							if (has_zoom) {
								map.setZoom(zoom)
							}
						} else {
							trace("Geocode for " + address + " was not successful for the following reason: " + status);
							trace("TRYING PLACES SEARCH");
							if (has_location) {
								map.panTo(location)
							}
							if (has_zoom) {
								map.setZoom(zoom)
							}
							loadPlaces()
						}
					})
				}

				function loadPlaces() {
					var place, search_request, infowindow, search_bounds, bounds_sw, bounds_ne;
					place_search = new google.maps.places.PlacesService(map);
					infowindow = new google.maps.InfoWindow;
					search_request = {
						query: "",
						types: ["country", "neighborhood", "political", "locality", "geocode"]
					};
					if (type.of(VMM.Util.getUrlVars(m.id)["q"]) == "string") {
						search_request.query = VMM.Util.getUrlVars(m.id)["q"]
					}
					if (has_location) {
						search_request.location = location;
						search_request.radius = "15000"
					} else {
						bounds_sw = new google.maps.LatLng(-89.999999, -179.999999);
						bounds_ne = new google.maps.LatLng(89.999999, 179.999999);
						search_bounds = new google.maps.LatLngBounds(bounds_sw, bounds_ne)
					}
					place_search.textSearch(search_request, placeResults);

					function placeResults(results, status) {
						if (status == google.maps.places.PlacesServiceStatus.OK) {
							for (var i = 0; i < results.length; i++) {}
							if (has_location) {
								map.panTo(location)
							} else {
								if (results.length >= 1) {
									map.panTo(results[0].geometry.location);
									if (has_zoom) {
										map.setZoom(zoom)
									}
								}
							}
						} else {
							trace("Place search for " + search_request.query + " was not successful for the following reason: " + status);
							trace("YOU MAY NEED A GOOGLE MAPS API KEY IN ORDER TO USE THIS FEATURE OF TIMELINEJS");
							trace("FIND OUT HOW TO GET YOUR KEY HERE: https://developers.google.com/places/documentation/#Authentication");
							if (has_location) {
								map.panTo(location);
								if (has_zoom) {
									map.setZoom(zoom)
								}
							} else {
								trace("USING SIMPLE IFRAME MAP EMBED");
								if (m.id[0].match("https")) {
									m.id = m.url[0].replace("https", "http")
								}
								VMM.ExternalAPI.googlemaps.createiFrameMap(m)
							}
						}
					}

					function createMarker(place) {
						var marker, placeLoc;
						placeLoc = place.geometry.location;
						marker = new google.maps.Marker({
							map: map,
							position: place.geometry.location
						});
						google.maps.event.addListener(marker, "click", function() {
							infowindow.setContent(place.name);
							infowindow.open(map, this)
						})
					}
				}

				function loadPlacesAlt() {
					var api_key, places_url, has_key = false;
					trace("LOADING PLACES API FOR GOOGLE MAPS");
					if (VMM.ExternalAPI.keys.google != "") {
						api_key = VMM.ExternalAPI.keys.google;
						has_key = true
					} else {
						trace("YOU NEED A GOOGLE MAPS API KEY IN ORDER TO USE THIS FEATURE OF TIMELINEJS");
						trace("FIND OUT HOW TO GET YOUR KEY HERE: https://developers.google.com/places/documentation/#Authentication")
					}
					places_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key=" + api_key + "&sensor=false&language=" + m.lang + "&";
					if (type.of(VMM.Util.getUrlVars(m.id)["q"]) == "string") {
						places_url += "query=" + VMM.Util.getUrlVars(m.id)["q"]
					}
					if (has_location) {
						places_url += "&location=" + location
					}
					if (has_key) {
						VMM.getJSON(places_url, function(d) {
							trace("PLACES JSON");
							var places_location = "",
								places_bounds = "",
								places_bounds_ne = "",
								places_bounds_sw = "";
							trace(d);
							if (d.status == "OVER_QUERY_LIMIT") {
								trace("OVER_QUERY_LIMIT");
								if (has_location) {
									map.panTo(location);
									if (has_zoom) {
										map.setZoom(zoom)
									}
								} else {
									trace("DOING TRADITIONAL MAP IFRAME EMBED UNTIL QUERY LIMIT RESTORED");
									api_limit = true;
									VMM.ExternalAPI.googlemaps.createiFrameMap(m)
								}
							} else {
								if (d.results.length >= 1) {
									places_bounds_ne = new google.maps.LatLng(parseFloat(d.results[0].geometry.viewport.northeast.lat), parseFloat(d.results[0].geometry.viewport.northeast.lng));
									places_bounds_sw = new google.maps.LatLng(parseFloat(d.results[0].geometry.viewport.southwest.lat), parseFloat(d.results[0].geometry.viewport.southwest.lng));
									places_bounds = new google.maps.LatLngBounds(places_bounds_sw, places_bounds_ne);
									map.fitBounds(places_bounds)
								} else {
									trace("NO RESULTS")
								}
								if (has_location) {
									map.panTo(location)
								}
								if (has_zoom) {
									map.setZoom(zoom)
								}
							}
						}).error(function(jqXHR, textStatus, errorThrown) {
							trace("PLACES JSON ERROR");
							trace("PLACES JSON ERROR: " + textStatus + " " + jqXHR.responseText)
						}).success(function(d) {
							trace("PLACES JSON SUCCESS")
						})
					} else {
						if (has_location) {
							map.panTo(location);
							if (has_zoom) {
								map.setZoom(zoom)
							}
						} else {
							trace("DOING TRADITIONAL MAP IFRAME EMBED BECAUSE NO GOOGLE MAP API KEY WAS PROVIDED");
							VMM.ExternalAPI.googlemaps.createiFrameMap(m)
						}
					}
				}

				function loadKML() {
					var kml_url, kml_layer, infowindow, text;
					kml_url = m.id + "&output=kml";
					kml_url = kml_url.replace("&output=embed", "");
					kml_layer = new google.maps.KmlLayer(kml_url, {
						preserveViewport: true
					});
					infowindow = new google.maps.InfoWindow;
					kml_layer.setMap(map);
					google.maps.event.addListenerOnce(kml_layer, "defaultviewport_changed", function() {
						if (has_location) {
							map.panTo(location)
						} else {
							map.fitBounds(kml_layer.getDefaultViewport())
						}
						if (has_zoom) {
							map.setZoom(zoom)
						}
					});
					google.maps.event.addListener(kml_layer, "click", function(kmlEvent) {
						text = kmlEvent.featureData.description;
						showInfoWindow(text);

						function showInfoWindow(c) {
							infowindow.setContent(c);
							infowindow.open(map)
						}
					})
				}
			},
			pushQue: function() {
				for (var i = 0; i < VMM.master_config.googlemaps.que.length; i++) {
					VMM.ExternalAPI.googlemaps.create(VMM.master_config.googlemaps.que[i])
				}
				VMM.master_config.googlemaps.que = []
			},
			onMapAPIReady: function() {
				VMM.master_config.googlemaps.map_active = true;
				VMM.master_config.googlemaps.places_active = true;
				VMM.ExternalAPI.googlemaps.onAPIReady()
			},
			onPlacesAPIReady: function() {
				VMM.master_config.googlemaps.places_active = true;
				VMM.ExternalAPI.googlemaps.onAPIReady()
			},
			onAPIReady: function() {
				if (!VMM.master_config.googlemaps.active) {
					if (VMM.master_config.googlemaps.map_active && VMM.master_config.googlemaps.places_active) {
						VMM.master_config.googlemaps.active = true;
						VMM.ExternalAPI.googlemaps.pushQue()
					}
				}
			},
			defaultType: function(name) {
				if (name.toLowerCase() == "satellite" || name.toLowerCase() == "hybrid" || name.toLowerCase() == "terrain" || name.toLowerCase() == "roadmap") {
					return true
				} else {
					return false
				}
			},
			map_subdomains: ["a", "b", "c", "d"],
			map_attribution: {
				stamen: "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>.",
				apple: "Map data &copy; 2012  Apple, Imagery &copy; 2012 Apple",
				osm: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
			},
			map_providers: {
				toner: {
					url: "https://stamen-tiles-{S}.a.ssl.fastly.net/toner/{Z}/{X}/{Y}.png",
					minZoom: 0,
					maxZoom: 20,
					attribution: "stamen"
				},
				"toner-lines": {
					url: "https://stamen-tiles-{S}.a.ssl.fastly.net/toner-lines/{Z}/{X}/{Y}.png",
					minZoom: 0,
					maxZoom: 20,
					attribution: "stamen"
				},
				"toner-labels": {
					url: "https://stamen-tiles-{S}.a.ssl.fastly.net/toner-labels/{Z}/{X}/{Y}.png",
					minZoom: 0,
					maxZoom: 20,
					attribution: "stamen"
				},
				sterrain: {
					url: "https://stamen-tiles-{S}.a.ssl.fastly.net/terrain/{Z}/{X}/{Y}.jpg",
					minZoom: 4,
					maxZoom: 20,
					attribution: "stamen"
				},
				apple: {
					url: "//gsp2.apple.com/tile?api=1&style=slideshow&layers=default&lang=en_US&z={z}&x={x}&y={y}&v=9",
					minZoom: 4,
					maxZoom: 14,
					attribution: "apple"
				},
				watercolor: {
					url: "https://stamen-tiles-{S}.a.ssl.fastly.net/watercolor/{Z}/{X}/{Y}.jpg",
					minZoom: 3,
					maxZoom: 16,
					attribution: "stamen"
				},
				osm: {
					url: "//tile.openstreetmap.org/{z}/{x}/{y}.png",
					minZoom: 3,
					maxZoom: 18,
					attribution: "osm"
				}
			}
		},
		googleplus: {
			get: function(m) {
				var api_key;
				var gplus = {
					user: m.user,
					activity: m.id,
					id: m.uid
				};
				VMM.master_config.googleplus.que.push(gplus);
				VMM.master_config.googleplus.active = true
			},
			create: function(gplus, callback) {
				var mediaElem = "",
					api_key = "",
					g_activity = "",
					g_content = "",
					g_attachments = "",
					gperson_api_url, gactivity_api_url;
				googleplus_timeout = setTimeout(VMM.ExternalAPI.googleplus.errorTimeOut, VMM.master_config.timers.api, gplus), callback_timeout = setTimeout(callback, VMM.master_config.timers.api, gplus);
				if (VMM.master_config.Timeline.api_keys.google != "") {
					api_key = VMM.master_config.Timeline.api_keys.google
				} else {
					api_key = Aes.Ctr.decrypt(VMM.master_config.api_keys_master.google, VMM.master_config.vp, 256)
				}
				gperson_api_url = "https://www.googleapis.com/plus/v1/people/" + gplus.user + "/activities/public?alt=json&maxResults=100&fields=items(id,url)&key=" + api_key;
				mediaElem = "GOOGLE PLUS API CALL";
				VMM.getJSON(gperson_api_url, function(p_data) {
					for (var i = 0; i < p_data.items.length; i++) {
						trace("loop");
						if (p_data.items[i].url.split("posts/")[1] == gplus.activity) {
							trace("FOUND IT!!");
							g_activity = p_data.items[i].id;
							gactivity_api_url = "https://www.googleapis.com/plus/v1/activities/" + g_activity + "?alt=json&key=" + api_key;
							VMM.getJSON(gactivity_api_url, function(a_data) {
								trace(a_data);
								if (typeof a_data.annotation != "undefined") {
									g_content += "<div class='googleplus-annotation'>'" + a_data.annotation + "</div>";
									g_content += a_data.object.content
								} else {
									g_content += a_data.object.content
								}
								if (typeof a_data.object.attachments != "undefined") {
									for (var k = 0; k < a_data.object.attachments.length; k++) {
										if (a_data.object.attachments[k].objectType == "photo") {
											g_attachments = "<a href='" + a_data.object.url + "' target='_blank'>" + "<img src='" + a_data.object.attachments[k].image.url + "' class='article-thumb'></a>" + g_attachments
										} else if (a_data.object.attachments[k].objectType == "video") {
											g_attachments = "<img src='" + a_data.object.attachments[k].image.url + "' class='article-thumb'>" + g_attachments;
											g_attachments += "<div>";
											g_attachments += "<a href='" + a_data.object.attachments[k].url + "' target='_blank'>";
											g_attachments += "<h5>" + a_data.object.attachments[k].displayName + "</h5>";
											g_attachments += "</a>";
											g_attachments += "</div>"
										} else if (a_data.object.attachments[k].objectType == "article") {
											g_attachments += "<div>";
											g_attachments += "<a href='" + a_data.object.attachments[k].url + "' target='_blank'>";
											g_attachments += "<h5>" + a_data.object.attachments[k].displayName + "</h5>";
											g_attachments += "<p>" + a_data.object.attachments[k].content + "</p>";
											g_attachments += "</a>";
											g_attachments += "</div>"
										}
										trace(a_data.object.attachments[k])
									}
									g_attachments = "<div class='googleplus-attachments'>" + g_attachments + "</div>"
								}
								mediaElem = "<div class='googleplus-content'>" + g_content + g_attachments + "</div>";
								mediaElem += "<div class='vcard author'><a class='screen-name url' href='" + a_data.url + "' target='_blank'>";
								mediaElem += "<span class='avatar'><img src='" + a_data.actor.image.url + "' style='max-width: 32px; max-height: 32px;'></span>";
								mediaElem += "<span class='fn'>" + a_data.actor.displayName + "</span>";
								mediaElem += "<span class='nickname'><span class='thumbnail-inline'></span></span>";
								mediaElem += "</a></div>";
								VMM.attachElement("#googleplus_" + gplus.activity, mediaElem)
							});
							break
						}
					}
				}).error(function(jqXHR, textStatus, errorThrown) {
					var error_obj = VMM.parseJSON(jqXHR.responseText);
					trace(error_obj.error.message);
					VMM.attachElement("#googleplus_" + gplus.activity, VMM.MediaElement.loadingmessage("<p>ERROR LOADING GOOGLE+ </p><p>" + error_obj.error.message + "</p>"))
				}).success(function(d) {
					clearTimeout(googleplus_timeout);
					clearTimeout(callback_timeout);
					callback()
				})
			},
			pushQue: function() {
				if (VMM.master_config.googleplus.que.length > 0) {
					VMM.ExternalAPI.googleplus.create(VMM.master_config.googleplus.que[0], VMM.ExternalAPI.googleplus.pushQue);
					VMM.Util.removeRange(VMM.master_config.googleplus.que, 0)
				}
			},
			errorTimeOut: function(gplus) {
				trace("GOOGLE+ JSON ERROR TIMEOUT " + gplus.activity);
				VMM.attachElement("#googleplus_" + gplus.activity, VMM.MediaElement.loadingmessage("<p>Still waiting on GOOGLE+ </p><p>" + gplus.activity + "</p>"))
			}
		},
		googledocs: {
			get: function(m) {
				VMM.master_config.googledocs.que.push(m);
				VMM.master_config.googledocs.active = true
			},
			create: function(m) {
				var mediaElem = "";
				if (m.id.match(/docs.google.com/i)) {
					mediaElem = "<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + m.id + "&amp;embedded=true'></iframe>"
				} else {
					mediaElem = "<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + "//docs.google.com/viewer?url=" + m.id + "&amp;embedded=true'></iframe>"
				}
				VMM.attachElement("#" + m.uid, mediaElem)
			},
			pushQue: function() {
				for (var i = 0; i < VMM.master_config.googledocs.que.length; i++) {
					VMM.ExternalAPI.googledocs.create(VMM.master_config.googledocs.que[i])
				}
				VMM.master_config.googledocs.que = []
			}
		},
		flickr: {
			get: function(m) {
				VMM.master_config.flickr.que.push(m);
				VMM.master_config.flickr.active = true
			},
			create: function(m, callback) {
				var api_key, callback_timeout = setTimeout(callback, VMM.master_config.timers.api, m);
				if (typeof VMM.master_config.Timeline != "undefined" && VMM.master_config.Timeline.api_keys.flickr != "") {
					api_key = VMM.master_config.Timeline.api_keys.flickr
				} else {
					api_key = Aes.Ctr.decrypt(VMM.master_config.api_keys_master.flickr, VMM.master_config.vp, 256)
				}
				var the_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + api_key + "&photo_id=" + m.id + "&format=json&jsoncallback=?";
				VMM.getJSON(the_url, function(d) {
					var flickr_id = VMM.ExternalAPI.flickr.getFlickrIdFromUrl(d.sizes.size[0].url);
					var flickr_large_id = "#" + m.uid,
						flickr_thumb_id = "#" + m.uid + "_thumb";
					var flickr_img_size, flickr_img_thumb, flickr_size_found = false,
						flickr_best_size = "Large";
					flickr_best_size = VMM.ExternalAPI.flickr.sizes(VMM.master_config.sizes.api.height);
					for (var i = 0; i < d.sizes.size.length; i++) {
						if (d.sizes.size[i].label == flickr_best_size) {
							flickr_size_found = true;
							flickr_img_size = d.sizes.size[i].source
						}
					}
					if (!flickr_size_found) {
						flickr_img_size = d.sizes.size[d.sizes.size.length - 2].source
					}
					flickr_img_thumb = d.sizes.size[0].source;
					VMM.Lib.attr(flickr_large_id, "src", flickr_img_size);
					VMM.attachElement(flickr_thumb_id, "<img src='" + flickr_img_thumb + "'>")
				}).error(function(jqXHR, textStatus, errorThrown) {
					trace("FLICKR error");
					trace("FLICKR ERROR: " + textStatus + " " + jqXHR.responseText)
				}).success(function(d) {
					clearTimeout(callback_timeout);
					callback()
				})
			},
			pushQue: function() {
				if (VMM.master_config.flickr.que.length > 0) {
					VMM.ExternalAPI.flickr.create(VMM.master_config.flickr.que[0], VMM.ExternalAPI.flickr.pushQue);
					VMM.Util.removeRange(VMM.master_config.flickr.que, 0)
				}
			},
			sizes: function(s) {
				var _size = "";
				if (s <= 75) {
					_size = "Thumbnail"
				} else if (s <= 180) {
					_size = "Small"
				} else if (s <= 240) {
					_size = "Small 320"
				} else if (s <= 375) {
					_size = "Medium"
				} else if (s <= 480) {
					_size = "Medium 640"
				} else if (s <= 600) {
					_size = "Large"
				} else {
					_size = "Large"
				}
				return _size
			},
			getFlickrIdFromUrl: function(url) {
				var idx = url.indexOf("flickr.com/photos/");
				if (idx == -1) return null;
				var pos = idx + "flickr.com/photos/".length;
				var photo_info = url.substr(pos);
				if (photo_info.indexOf("/") == -1) return null;
				if (photo_info.indexOf("/") == 0) photo_info = photo_info.substr(1);
				return photo_info.split("/")[1]
			}
		},
		instagram: {
			get: function(m, thumb) {
				if (thumb) {
					return "//instagr.am/p/" + m.id + "/media/?size=t"
				} else {
					return "//instagr.am/p/" + m.id + "/media/?size=" + VMM.ExternalAPI.instagram.sizes(VMM.master_config.sizes.api.height)
				}
			},
			sizes: function(s) {
				var _size = "";
				if (s <= 150) {
					_size = "t"
				} else if (s <= 306) {
					_size = "m"
				} else {
					_size = "l"
				}
				return _size
			},
			isInstagramUrl: function(url) {
				return url.match("instagr.am/p/") || url.match("instagram.com/p/")
			},
			getInstagramIdFromUrl: function(url) {
				try {
					return url.split("/p/")[1].split("/")[0]
				} catch (e) {
					trace("Invalid Instagram url: " + url);
					return null
				}
			}
		},
		soundcloud: {
			get: function(m) {
				VMM.master_config.soundcloud.que.push(m);
				VMM.master_config.soundcloud.active = true
			},
			create: function(m, callback) {
				var the_url = "//soundcloud.com/oembed?url=" + m.id + "&maxheight=168&format=js&callback=?";
				VMM.getJSON(the_url, function(d) {
					VMM.attachElement("#" + m.uid, d.html);
					callback()
				})
			},
			pushQue: function() {
				if (VMM.master_config.soundcloud.que.length > 0) {
					VMM.ExternalAPI.soundcloud.create(VMM.master_config.soundcloud.que[0], VMM.ExternalAPI.soundcloud.pushQue);
					VMM.Util.removeRange(VMM.master_config.soundcloud.que, 0)
				}
			}
		},
		wikipedia: {
			get: function(m) {
				VMM.master_config.wikipedia.que.push(m);
				VMM.master_config.wikipedia.active = true
			},
			create: function(m, callback) {
				var the_url = "//" + m.lang + ".wikipedia.org/w/api.php?action=query&prop=extracts&redirects=&titles=" + m.id + "&exintro=1&format=json&callback=?";
				callback_timeout = setTimeout(callback, VMM.master_config.timers.api, m);
				if (VMM.Browser.browser == "Explorer" && parseInt(VMM.Browser.version, 10) >= 7 && window.XDomainRequest) {
					var temp_text = "<h4><a href='http://" + VMM.master_config.language.api.wikipedia + ".wikipedia.org/wiki/" + m.id + "' target='_blank'>" + m.url + "</a></h4>";
					temp_text += "<span class='wiki-source'>" + VMM.master_config.language.messages.wikipedia + "</span>";
					temp_text += "<p>Wikipedia entry unable to load using Internet Explorer 8 or below.</p>";
					VMM.attachElement("#" + m.uid, temp_text)
				}
				VMM.getJSON(the_url, function(d) {
					if (d.query) {
						var wiki_extract, wiki_title, _wiki = "",
							wiki_text = "",
							wiki_number_of_paragraphs = 1,
							wiki_text_array = [];
						wiki_extract = VMM.Util.getObjectAttributeByIndex(d.query.pages, 0).extract;
						wiki_title = VMM.Util.getObjectAttributeByIndex(d.query.pages, 0).title;
						if (wiki_extract.match("<p>")) {
							wiki_text_array = wiki_extract.split("<p>")
						} else {
							wiki_text_array.push(wiki_extract)
						}
						for (var i = 0; i < wiki_text_array.length; i++) {
							if (i + 1 <= wiki_number_of_paragraphs && i + 1 < wiki_text_array.length) {
								wiki_text += "<p>" + wiki_text_array[i + 1]
							}
						}
						_wiki = "<h4><a href='http://" + VMM.master_config.language.api.wikipedia + ".wikipedia.org/wiki/" + wiki_title + "' target='_blank'>" + wiki_title + "</a></h4>";
						_wiki += "<span class='wiki-source'>" + VMM.master_config.language.messages.wikipedia + "</span>";
						_wiki += VMM.Util.linkify_wikipedia(wiki_text);
						if (wiki_extract.match("REDIRECT")) {} else {
							VMM.attachElement("#" + m.uid, _wiki)
						}
					}
				}).error(function(jqXHR, textStatus, errorThrown) {
					trace("WIKIPEDIA error");
					trace("WIKIPEDIA ERROR: " + textStatus + " " + jqXHR.responseText);
					trace(errorThrown);
					VMM.attachElement("#" + m.uid, VMM.MediaElement.loadingmessage("<p>Wikipedia is not responding</p>"));
					clearTimeout(callback_timeout);
					if (VMM.master_config.wikipedia.tries < 4) {
						trace("WIKIPEDIA ATTEMPT " + VMM.master_config.wikipedia.tries);
						trace(m);
						VMM.master_config.wikipedia.tries++;
						VMM.ExternalAPI.wikipedia.create(m, callback)
					} else {
						callback()
					}
				}).success(function(d) {
					VMM.master_config.wikipedia.tries = 0;
					clearTimeout(callback_timeout);
					callback()
				})
			},
			pushQue: function() {
				if (VMM.master_config.wikipedia.que.length > 0) {
					trace("WIKIPEDIA PUSH QUE " + VMM.master_config.wikipedia.que.length);
					VMM.ExternalAPI.wikipedia.create(VMM.master_config.wikipedia.que[0], VMM.ExternalAPI.wikipedia.pushQue);
					VMM.Util.removeRange(VMM.master_config.wikipedia.que, 0)
				}
			}
		},
		youtube: {
			get: function(m) {
				var the_url = "//gdata.youtube.com/feeds/api/videos/" + m.id + "?v=2&alt=jsonc&callback=?";
				VMM.master_config.youtube.que.push(m);
				if (!VMM.master_config.youtube.active) {
					if (!VMM.master_config.youtube.api_loaded) {
						LoadLib.js("//www.youtube.com/player_api", function() {
							trace("YouTube API Library Loaded")
						})
					}
				}
				VMM.getJSON(the_url, function(d) {
					VMM.ExternalAPI.youtube.createThumb(d, m)
				})
			},
			create: function(m) {
				if (typeof m.start != "undefined") {
					var vidstart = m.start.toString(),
						vid_start_minutes = 0,
						vid_start_seconds = 0;
					if (vidstart.match("m")) {
						vid_start_minutes = parseInt(vidstart.split("m")[0], 10);
						vid_start_seconds = parseInt(vidstart.split("m")[1].split("s")[0], 10);
						m.start = vid_start_minutes * 60 + vid_start_seconds
					} else {
						m.start = 0
					}
				} else {
					m.start = 0
				}
				var p = {
					active: false,
					player: {},
					name: m.uid,
					playing: false,
					hd: false
				};
				if (typeof m.hd != "undefined") {
					p.hd = true
				}
				p.player[m.id] = new YT.Player(m.uid, {
					height: "390",
					width: "640",
					playerVars: {
						enablejsapi: 1,
						color: "dark" == VMM.master_config.Timeline.youtubeTheme ? "red" : "white",
						showinfo: 0,
						theme: "undefined" !== VMM.master_config.Timeline.youtubeTheme ? VMM.master_config.Timeline.youtubeTheme : "light",
						start: m.start,
						rel: 0
					},
					videoId: m.id,
					events: {
						onReady: VMM.ExternalAPI.youtube.onPlayerReady,
						onStateChange: VMM.ExternalAPI.youtube.onStateChange
					}
				});
				VMM.master_config.youtube.array.push(p)
			},
			createThumb: function(d, m) {
				trace("CREATE THUMB");
				trace(d);
				trace(m);
				if (typeof d.data != "undefined") {
					var thumb_id = "#" + m.uid + "_thumb";
					VMM.attachElement(thumb_id, "<img src='" + d.data.thumbnail.sqDefault + "'>")
				}
			},
			pushQue: function() {
				for (var i = 0; i < VMM.master_config.youtube.que.length; i++) {
					VMM.ExternalAPI.youtube.create(VMM.master_config.youtube.que[i])
				}
				VMM.master_config.youtube.que = []
			},
			onAPIReady: function() {
				VMM.master_config.youtube.active = true;
				VMM.ExternalAPI.youtube.pushQue()
			},
			stopPlayers: function() {
				for (var i = 0; i < VMM.master_config.youtube.array.length; i++) {
					if (VMM.master_config.youtube.array[i].playing) {
						if (typeof VMM.master_config.youtube.array[i].player.the_name !== "undefined") {
							VMM.master_config.youtube.array[i].player.the_name.stopVideo()
						}
					}
				}
			},
			onStateChange: function(e) {
				for (var i = 0; i < VMM.master_config.youtube.array.length; i++) {
					for (var z in VMM.master_config.youtube.array[i].player) {
						if (VMM.master_config.youtube.array[i].player[z] == e.target) {
							VMM.master_config.youtube.array[i].player.the_name = VMM.master_config.youtube.array[i].player[z]
						}
					}
					if (VMM.master_config.youtube.array[i].player.the_name == e.target) {
						if (e.data == YT.PlayerState.PLAYING) {
							VMM.master_config.youtube.array[i].playing = true;
							if (VMM.master_config.youtube.array[i].hd === false) {
								VMM.master_config.youtube.array[i].hd = true;
								VMM.master_config.youtube.array[i].player.the_name.setPlaybackQuality("hd720")
							}
						}
					}
				}
			},
			onPlayerReady: function(e) {}
		},
		vimeo: {
			get: function(m) {
				VMM.master_config.vimeo.que.push(m);
				VMM.master_config.vimeo.active = true
			},
			create: function(m, callback) {
				trace("VIMEO CREATE");
				var thumb_url = "//vimeo.com/api/v2/video/" + m.id + ".json",
					video_url = "//player.vimeo.com/video/" + m.id + "?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff";
				VMM.getJSON(thumb_url, function(d) {
					VMM.ExternalAPI.vimeo.createThumb(d, m);
					callback()
				});
				VMM.attachElement("#" + m.uid, "<iframe autostart='false' frameborder='0' width='100%' height='100%' src='" + video_url + "'></iframe>")
			},
			createThumb: function(d, m) {
				trace("VIMEO CREATE THUMB");
				var thumb_id = "#" + m.uid + "_thumb";
				VMM.attachElement(thumb_id, "<img src='" + d[0].thumbnail_small + "'>")
			},
			pushQue: function() {
				if (VMM.master_config.vimeo.que.length > 0) {
					VMM.ExternalAPI.vimeo.create(VMM.master_config.vimeo.que[0], VMM.ExternalAPI.vimeo.pushQue);
					VMM.Util.removeRange(VMM.master_config.vimeo.que, 0)
				}
			}
		},
		vine: {
			get: function(m) {
				VMM.master_config.vine.que.push(m);
				VMM.master_config.vine.active = true
			},
			create: function(m, callback) {
				trace("VINE CREATE");
				var video_url = "https://vine.co/v/" + m.id + "/embed/simple";
				VMM.attachElement("#" + m.uid, "<iframe frameborder='0' width='100%' height='100%' src='" + video_url + "'></iframe><script async src='http://platform.vine.co/static/scripts/embed.js' charset='utf-8'></script>")
			},
			pushQue: function() {
				if (VMM.master_config.vine.que.length > 0) {
					VMM.ExternalAPI.vine.create(VMM.master_config.vine.que[0], VMM.ExternalAPI.vine.pushQue);
					VMM.Util.removeRange(VMM.master_config.vine.que, 0)
				}
			}
		},
		webthumb: {
			get: function(m, thumb) {
				VMM.master_config.webthumb.que.push(m);
				VMM.master_config.webthumb.active = true
			},
			sizes: function(s) {
				var _size = "";
				if (s <= 150) {
					_size = "t"
				} else if (s <= 306) {
					_size = "m"
				} else {
					_size = "l"
				}
				return _size
			},
			create: function(m) {
				trace("WEB THUMB CREATE");
				var thumb_url = "//api.pagepeeker.com/v2/thumbs.php?";
				url = m.id.replace("http://", "");
				VMM.attachElement("#" + m.uid, "<a href='" + m.id + "' target='_blank'><img src='" + thumb_url + "size=x&url=" + url + "'></a>");
				VMM.attachElement("#" + m.uid + "_thumb", "<img src='" + thumb_url + "size=t&url=" + url + "'>")
			},
			pushQue: function() {
				for (var i = 0; i < VMM.master_config.webthumb.que.length; i++) {
					VMM.ExternalAPI.webthumb.create(VMM.master_config.webthumb.que[i])
				}
				VMM.master_config.webthumb.que = []
			}
		}
	}.init()
}

function onYouTubePlayerAPIReady() {
	trace("GLOBAL YOUTUBE API CALLED");
	VMM.ExternalAPI.youtube.onAPIReady()
}
if (typeof VMM != "undefined" && typeof VMM.MediaElement == "undefined") {
	VMM.MediaElement = {
		init: function() {
			return this
		},
		loadingmessage: function(m) {
			return "<div class='vco-loading'><div class='vco-loading-container'><div class='vco-loading-icon'></div>" + "<div class='vco-message'><p>" + m + "</p></div></div></div>"
		},
		thumbnail: function(data, w, h, uid) {
			var _w = 16,
				_h = 24,
				_uid = "";
			if (w != null && w != "") {
				_w = w
			}
			if (h != null && h != "") {
				_h = h
			}
			if (uid != null && uid != "") {
				_uid = uid
			}
			if (data.thumbnail != null && data.thumbnail != "") {
				trace("CUSTOM THUMB");
				mediaElem = "<div class='thumbnail thumb-custom' id='" + uid + "_custom_thumb'><img src='" + data.thumbnail + "'></div>";
				return mediaElem
			} else if (data.media != null && data.media != "") {
				var _valid = true,
					mediaElem = "",
					m = VMM.MediaType(data.media);
				if (m.type == "image") {
					mediaElem = "<div class='thumbnail thumb-photo'></div>";
					return mediaElem
				} else if (m.type == "flickr") {
					mediaElem = "<div class='thumbnail thumb-photo' id='" + uid + "_thumb'></div>";
					return mediaElem
				} else if (m.type == "instagram") {
					mediaElem = "<div class='thumbnail thumb-instagram' id='" + uid + "_thumb'><img src='" + VMM.ExternalAPI.instagram.get(m, true) + "'></div>";
					return mediaElem
				} else if (m.type == "youtube") {
					mediaElem = "<div class='thumbnail thumb-youtube' id='" + uid + "_thumb'></div>";
					return mediaElem
				} else if (m.type == "googledoc") {
					mediaElem = "<div class='thumbnail thumb-document'></div>";
					return mediaElem
				} else if (m.type == "vimeo") {
					mediaElem = "<div class='thumbnail thumb-vimeo' id='" + uid + "_thumb'></div>";
					return mediaElem
				} else if (m.type == "vine") {
					mediaElem = "<div class='thumbnail thumb-vine'></div>";
					return mediaElem
				} else if (m.type == "dailymotion") {
					mediaElem = "<div class='thumbnail thumb-video'></div>";
					return mediaElem
				} else if (m.type == "twitter") {
					mediaElem = "<div class='thumbnail thumb-twitter'></div>";
					return mediaElem
				} else if (m.type == "twitter-ready") {
					mediaElem = "<div class='thumbnail thumb-twitter'></div>";
					return mediaElem
				} else if (m.type == "soundcloud") {
					mediaElem = "<div class='thumbnail thumb-audio'></div>";
					return mediaElem
				} else if (m.type == "google-map") {
					mediaElem = "<div class='thumbnail thumb-map'></div>";
					return mediaElem
				} else if (m.type == "googleplus") {
					mediaElem = "<div class='thumbnail thumb-googleplus'></div>";
					return mediaElem
				} else if (m.type == "wikipedia") {
					mediaElem = "<div class='thumbnail thumb-wikipedia'></div>";
					return mediaElem
				} else if (m.type == "storify") {
					mediaElem = "<div class='thumbnail thumb-storify'></div>";
					return mediaElem
				} else if (m.type == "quote") {
					mediaElem = "<div class='thumbnail thumb-quote'></div>";
					return mediaElem
				} else if (m.type == "iframe") {
					mediaElem = "<div class='thumbnail thumb-video'></div>";
					return mediaElem
				} else if (m.type == "unknown") {
					if (m.id.match("blockquote")) {
						mediaElem = "<div class='thumbnail thumb-quote'></div>"
					} else {
						mediaElem = "<div class='thumbnail thumb-plaintext'></div>"
					}
					return mediaElem
				} else if (m.type == "website") {
					mediaElem = "<div class='thumbnail thumb-website' id='" + uid + "_thumb'></div>";
					return mediaElem
				} else {
					mediaElem = "<div class='thumbnail thumb-plaintext'></div>";
					return mediaElem
				}
			}
		},
		create: function(data, uid) {
			var _valid = false,
				loading_messege = VMM.MediaElement.loadingmessage(VMM.master_config.language.messages.loading + "...");
			if (data.media != null && data.media != "") {
				var mediaElem = "",
					captionElem = "",
					creditElem = "",
					_id = "",
					isTextMedia = false,
					m;
				m = VMM.MediaType(data.media);
				m.uid = uid;
				_valid = true;
				if (data.credit != null && data.credit != "") {
					creditElem = "<div class='credit'>" + VMM.Util.linkify_with_twitter(data.credit, "_blank") + "</div>"
				}
				if (data.caption != null && data.caption != "") {
					captionElem = "<div class='caption'>" + VMM.Util.linkify_with_twitter(data.caption, "_blank") + "</div>"
				}
				if (m.type == "image") {
					mediaElem = "<div class='media-image media-shadow'><img src='" + m.id + "' class='media-image'></div>"
				} else if (m.type == "flickr") {
					mediaElem = "<div class='media-image media-shadow'><a href='" + m.link + "' target='_blank'><img id='" + uid + "'></a></div>";
					VMM.ExternalAPI.flickr.get(m)
				} else if (m.type == "instagram") {
					mediaElem = "<div class='media-image media-shadow'><a href='" + m.link + "' target='_blank'><img src='" + VMM.ExternalAPI.instagram.get(m) + "'></a></div>"
				} else if (m.type == "googledoc") {
					mediaElem = "<div class='media-frame media-shadow doc' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.googledocs.get(m)
				} else if (m.type == "youtube") {
					mediaElem = "<div class='media-shadow'><div class='media-frame video youtube' id='" + m.uid + "'>" + loading_messege + "</div></div>";
					VMM.ExternalAPI.youtube.get(m)
				} else if (m.type == "vimeo") {
					mediaElem = "<div class='media-shadow media-frame video vimeo' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.vimeo.get(m)
				} else if (m.type == "dailymotion") {
					mediaElem = "<div class='media-shadow'><iframe class='media-frame video dailymotion' autostart='false' frameborder='0' width='100%' height='100%' src='http://www.dailymotion.com/embed/video/" + m.id + "'></iframe></div>"
				} else if (m.type == "vine") {
					mediaElem = "<div class='media-shadow media-frame video vine' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.vine.get(m)
				} else if (m.type == "twitter") {
					mediaElem = "<div class='twitter' id='" + m.uid + "'>" + loading_messege + "</div>";
					isTextMedia = true;
					VMM.ExternalAPI.twitter.get(m)
				} else if (m.type == "twitter-ready") {
					isTextMedia = true;
					mediaElem = m.id
				} else if (m.type == "soundcloud") {
					mediaElem = "<div class='media-frame media-shadow soundcloud' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.soundcloud.get(m)
				} else if (m.type == "google-map") {
					mediaElem = "<div class='media-frame media-shadow map' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.googlemaps.get(m)
				} else if (m.type == "googleplus") {
					_id = "googleplus_" + m.id;
					mediaElem = "<div class='googleplus' id='" + _id + "'>" + loading_messege + "</div>";
					isTextMedia = true;
					VMM.ExternalAPI.googleplus.get(m)
				} else if (m.type == "wikipedia") {
					mediaElem = "<div class='wikipedia' id='" + m.uid + "'>" + loading_messege + "</div>";
					isTextMedia = true;
					VMM.ExternalAPI.wikipedia.get(m)
				} else if (m.type == "storify") {
					isTextMedia = true;
					mediaElem = "<div class='plain-text-quote'>" + m.id + "</div>"
				} else if (m.type == "iframe") {
					isTextMedia = true;
					mediaElem = "<div class='media-shadow'><iframe class='media-frame video' autostart='false' frameborder='0' width='100%' height='100%' src='" + m.id + "'></iframe></div>"
				} else if (m.type == "quote") {
					isTextMedia = true;
					mediaElem = "<div class='plain-text-quote'>" + m.id + "</div>"
				} else if (m.type == "unknown") {
					trace("NO KNOWN MEDIA TYPE FOUND TRYING TO JUST PLACE THE HTML");
					isTextMedia = true;
					mediaElem = "<div class='plain-text'><div class='container'>" + VMM.Util.properQuotes(m.id) + "</div></div>"
				} else if (m.type == "website") {
					mediaElem = "<div class='media-shadow website' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.webthumb.get(m)
				} else {
					trace("NO KNOWN MEDIA TYPE FOUND");
					trace(m.type)
				}
				mediaElem = "<div class='media-container' >" + mediaElem + creditElem + captionElem + "</div>";
				if (isTextMedia) {
					return "<div class='text-media'><div class='media-wrapper'>" + mediaElem + "</div></div>"
				} else {
					return "<div class='media-wrapper'>" + mediaElem + "</div>"
				}
			}
		}
	}.init()
}
if (typeof VMM != "undefined" && typeof VMM.MediaType == "undefined") {
	VMM.MediaType = function(_d) {
		var d = _d.replace(/^\s\s*/, "").replace(/\s\s*$/, ""),
			success = false,
			media = {
				type: "unknown",
				id: "",
				start: 0,
				hd: false,
				link: "",
				lang: VMM.Language.lang,
				uniqueid: VMM.Util.unique_ID(6)
			};
		if (d.match("div class='twitter'")) {
			media.type = "twitter-ready";
			media.id = d;
			success = true
		} else if (d.match("<blockquote")) {
			media.type = "quote";
			media.id = d;
			success = true
		} else if (d.match("<iframe")) {
			media.type = "iframe";
			trace("IFRAME");
			regex = /src=['"](\S+?)['"]/;
			group = d.match(regex);
			if (group) {
				media.id = group[1]
			}
			trace("iframe url: " + media.id);
			success = Boolean(media.id)
		} else if (d.match("(www.)?youtube|youtu.be")) {
			if (d.match("v=")) {
				media.id = VMM.Util.getUrlVars(d)["v"]
			} else if (d.match("/embed/")) {
				media.id = d.split("embed/")[1].split(/[?&]/)[0]
			} else if (d.match(/v\/|v=|youtu\.be\//)) {
				media.id = d.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]
			} else {
				trace("YOUTUBE IN URL BUT NOT A VALID VIDEO")
			}
			media.start = VMM.Util.getUrlVars(d)["t"];
			media.hd = VMM.Util.getUrlVars(d)["hd"];
			media.type = "youtube";
			success = true
		} else if (d.match("(player.)?vimeo.com")) {
			media.type = "vimeo";
			media.id = d.split(/video\/|\/\/vimeo\.com\//)[1].split(/[?&]/)[0];
			success = true
		} else if (d.match("(www.)?dailymotion.com")) {
			media.id = d.split(/video\/|\/\/dailymotion\.com\//)[1];
			media.type = "dailymotion";
			success = true
		} else if (d.match("(www.)?vine.co")) {
			trace("VINE");
			if (d.match("vine.co/v/")) {
				media.id = d.split("vine.co/v/")[1];
				trace(media.id)
			}
			trace(d);
			media.type = "vine";
			success = true
		} else if (d.match("(player.)?soundcloud.com")) {
			media.type = "soundcloud";
			media.id = d;
			success = true
		} else if (d.match("(www.)?twitter.com") && d.match("status")) {
			if (d.match("status/")) {
				media.id = d.split("status/")[1]
			} else if (d.match("statuses/")) {
				media.id = d.split("statuses/")[1]
			} else {
				media.id = ""
			}
			media.type = "twitter";
			success = true
		} else if (d.match("maps.google") && !d.match("staticmap") && !d.match("streetview")) {
			media.type = "google-map";
			media.id = d;
			success = true
		} else if (d.match(/www.google.\w+\/maps/)) {
			media.type = "google-map";
			media.id = d;
			success = true
		} else if (d.match("plus.google")) {
			media.type = "googleplus";
			media.id = d.split("/posts/")[1];
			if (d.split("/posts/")[0].match("u/0/")) {
				media.user = d.split("u/0/")[1].split("/posts")[0]
			} else {
				media.user = d.split("google.com/")[1].split("/posts/")[0]
			}
			success = true
		} else if (d.match("flickr.com/photos/")) {
			media.type = "flickr";
			media.id = VMM.ExternalAPI.flickr.getFlickrIdFromUrl(d);
			media.link = d;
			success = Boolean(media.id)
		} else if (VMM.ExternalAPI.instagram.isInstagramUrl(d)) {
			media.type = "instagram";
			media.link = d;
			media.id = VMM.ExternalAPI.instagram.getInstagramIdFromUrl(d);
			success = Boolean(media.id)
		} else if (d.match(/jpg|jpeg|png|gif|svg|bmp/i) || d.match("staticmap") || d.match("yfrog.com") || d.match("twitpic.com") || d.match("maps.googleapis.com/maps/api/streetview")) {
			media.type = "image";
			media.id = d;
			success = true
		} else if (VMM.FileExtention.googleDocType(d)) {
			media.type = "googledoc";
			media.id = d;
			success = true
		} else if (d.match("(www.)?wikipedia.org")) {
			media.type = "wikipedia";
			var wiki_id = d.split("wiki/")[1].split("#")[0].replace("_", " ");
			media.id = wiki_id.replace(" ", "%20");
			media.lang = d.split("//")[1].split(".wikipedia")[0];
			success = true
		} else if (d.indexOf("http://") == 0) {
			media.type = "website";
			media.id = d;
			success = true
		} else if (d.match("storify")) {
			media.type = "storify";
			media.id = d;
			success = true
		} else {
			trace("unknown media");
			media.type = "unknown";
			media.id = d;
			success = true
		}
		if (success) {
			return media
		} else {
			trace("No valid media id detected");
			trace(d)
		}
		return false
	}
}
if (typeof VMM != "undefined" && typeof VMM.TextElement == "undefined") {
	VMM.TextElement = {
		init: function() {
			return this
		},
		create: function(data) {
			return data
		}
	}.init()
}
if (typeof VMM != "undefined" && typeof VMM.DragSlider == "undefined") {
	VMM.DragSlider = function() {
		var drag = {
				element: "",
				element_move: "",
				constraint: "",
				sliding: false,
				pagex: {
					start: 0,
					end: 0
				},
				pagey: {
					start: 0,
					end: 0
				},
				left: {
					start: 0,
					end: 0
				},
				time: {
					start: 0,
					end: 0
				},
				touch: false,
				ease: "easeOutExpo"
			},
			dragevent = {
				down: "mousedown",
				up: "mouseup",
				leave: "mouseleave",
				move: "mousemove"
			},
			mousedrag = {
				down: "mousedown",
				up: "mouseup",
				leave: "mouseleave",
				move: "mousemove"
			},
			touchdrag = {
				down: "touchstart",
				up: "touchend",
				leave: "mouseleave",
				move: "touchmove"
			},
			dragslider = this,
			is_sticky = false;
		this.createPanel = function(drag_object, move_object, constraint, touch, sticky) {
			drag.element = drag_object;
			drag.element_move = move_object;
			if (sticky != null && sticky != "") {
				is_sticky = sticky
			}
			if (constraint != null && constraint != "") {
				drag.constraint = constraint
			} else {
				drag.constraint = false
			}
			if (touch) {
				drag.touch = touch
			} else {
				drag.touch = false
			}
			trace("TOUCH" + drag.touch);
			if (drag.touch) {
				dragevent = touchdrag
			} else {
				dragevent = mousedrag
			}
			makeDraggable(drag.element, drag.element_move)
		};
		this.updateConstraint = function(constraint) {
			trace("updateConstraint");
			drag.constraint = constraint
		};
		this.cancelSlide = function(e) {
			VMM.unbindEvent(drag.element, onDragMove, dragevent.move);
			return true
		};

		function makeDraggable(drag_object, move_object) {
			VMM.bindEvent(drag_object, onDragStart, dragevent.down, {
				element: move_object,
				delement: drag_object
			});
			VMM.bindEvent(drag_object, onDragEnd, dragevent.up, {
				element: move_object,
				delement: drag_object
			});
			VMM.bindEvent(drag_object, onDragLeave, dragevent.leave, {
				element: move_object,
				delement: drag_object
			})
		}

		function onDragLeave(e) {
			VMM.unbindEvent(e.data.delement, onDragMove, dragevent.move);
			if (!drag.touch) {
				e.preventDefault()
			}
			e.stopPropagation();
			if (drag.sliding) {
				drag.sliding = false;
				dragEnd(e.data.element, e.data.delement, e);
				return false
			} else {
				return true
			}
		}

		function onDragStart(e) {
			dragStart(e.data.element, e.data.delement, e);
			if (!drag.touch) {
				e.preventDefault()
			}
			return true
		}

		function onDragEnd(e) {
			if (!drag.touch) {
				e.preventDefault()
			}
			if (drag.sliding) {
				drag.sliding = false;
				dragEnd(e.data.element, e.data.delement, e);
				return false
			} else {
				return true
			}
		}

		function onDragMove(e) {
			dragMove(e.data.element, e)
		}

		function dragStart(elem, delem, e) {
			if (drag.touch) {
				trace("IS TOUCH");
				VMM.Lib.css(elem, "-webkit-transition-duration", "0");
				drag.pagex.start = e.originalEvent.touches[0].screenX;
				drag.pagey.start = e.originalEvent.touches[0].screenY
			} else {
				drag.pagex.start = e.pageX;
				drag.pagey.start = e.pageY
			}
			drag.left.start = getLeft(elem);
			drag.time.start = (new Date).getTime();
			VMM.Lib.stop(elem);
			VMM.bindEvent(delem, onDragMove, dragevent.move, {
				element: elem
			})
		}

		function dragEnd(elem, delem, e) {
			VMM.unbindEvent(delem, onDragMove, dragevent.move);
			dragMomentum(elem, e)
		}

		function dragMove(elem, e) {
			var drag_to, drag_to_y;
			drag.sliding = true;
			if (drag.touch) {
				drag.pagex.end = e.originalEvent.touches[0].screenX;
				drag.pagey.end = e.originalEvent.touches[0].screenY
			} else {
				drag.pagex.end = e.pageX;
				drag.pagey.end = e.pageY
			}
			drag.left.end = getLeft(elem);
			drag_to = -(drag.pagex.start - drag.pagex.end - drag.left.start);
			if (Math.abs(drag.pagey.start) - Math.abs(drag.pagey.end) > 10) {
				trace("SCROLLING Y");
				trace(Math.abs(drag.pagey.start) - Math.abs(drag.pagey.end))
			}
			if (Math.abs(drag_to - drag.left.start) > 10) {
				VMM.Lib.css(elem, "left", drag_to);
				e.preventDefault();
				e.stopPropagation()
			}
		}

		function dragMomentum(elem, e) {
			var drag_info = {
					left: drag.left.end,
					left_adjust: 0,
					change: {
						x: 0
					},
					time: ((new Date).getTime() - drag.time.start) * 10,
					time_adjust: ((new Date).getTime() - drag.time.start) * 10
				},
				multiplier = 3e3;
			if (drag.touch) {
				multiplier = 6e3
			}
			drag_info.change.x = multiplier * (Math.abs(drag.pagex.end) - Math.abs(drag.pagex.start));
			drag_info.left_adjust = Math.round(drag_info.change.x / drag_info.time);
			drag_info.left = Math.min(drag_info.left + drag_info.left_adjust);
			if (drag.constraint) {
				if (drag_info.left > drag.constraint.left) {
					drag_info.left = drag.constraint.left;
					if (drag_info.time > 5e3) {
						drag_info.time = 5e3
					}
				} else if (drag_info.left < drag.constraint.right) {
					drag_info.left = drag.constraint.right;
					if (drag_info.time > 5e3) {
						drag_info.time = 5e3
					}
				}
			}
			VMM.fireEvent(dragslider, "DRAGUPDATE", [drag_info]);
			if (!is_sticky) {
				if (drag_info.time > 0) {
					if (drag.touch) {
						VMM.Lib.animate(elem, drag_info.time, "easeOutCirc", {
							left: drag_info.left
						})
					} else {
						VMM.Lib.animate(elem, drag_info.time, drag.ease, {
							left: drag_info.left
						})
					}
				}
			}
		}

		function getLeft(elem) {
			return parseInt(VMM.Lib.css(elem, "left").substring(0, VMM.Lib.css(elem, "left").length - 2), 10)
		}
	}
}
if (typeof VMM != "undefined" && typeof VMM.Slider == "undefined") {
	VMM.Slider = function(parent, parent_config) {
		var config, timer, $slider, $slider_mask, $slider_container, $slides_items, $dragslide, $explainer, events = {},
			data = [],
			slides = [],
			slide_positions = [],
			slides_content = "",
			current_slide = 0,
			current_width = 960,
			touch = {
				move: false,
				x: 10,
				y: 0,
				off: 0,
				dampen: 48
			},
			content = "",
			_active = false,
			layout = parent,
			navigation = {
				nextBtn: "",
				prevBtn: "",
				nextDate: "",
				prevDate: "",
				nextTitle: "",
				prevTitle: ""
			};
		if (typeof parent_config != "undefined") {
			config = parent_config
		} else {
			config = {
				preload: 4,
				current_slide: 0,
				interval: 10,
				something: 0,
				width: 720,
				height: 400,
				ease: "easeInOutExpo",
				duration: 1e3,
				timeline: false,
				spacing: 15,
				slider: {
					width: 720,
					height: 400,
					content: {
						width: 720,
						height: 400,
						padding: 120,
						padding_default: 120
					},
					nav: {
						width: 100,
						height: 200
					}
				}
			}
		}
		this.ver = "0.6";
		config.slider.width = config.width;
		config.slider.height = config.height;
		this.init = function(d) {
			slides = [];
			slide_positions = [];
			if (typeof d != "undefined") {
				this.setData(d)
			} else {
				trace("WAITING ON DATA")
			}
		};
		this.width = function(w) {
			if (w != null && w != "") {
				config.slider.width = w;
				reSize()
			} else {
				return config.slider.width
			}
		};
		this.height = function(h) {
			if (h != null && h != "") {
				config.slider.height = h;
				reSize()
			} else {
				return config.slider.height
			}
		};
		this.setData = function(d) {
			if (typeof d != "undefined") {
				data = d;
				build()
			} else {
				trace("NO DATA")
			}
		};
		this.getData = function() {
			return data
		};
		this.setConfig = function(d) {
			if (typeof d != "undefined") {
				config = d
			} else {
				trace("NO CONFIG DATA")
			}
		};
		this.getConfig = function() {
			return config
		};
		this.setSize = function(w, h) {
			if (w != null) {
				config.slider.width = w
			}
			if (h != null) {
				config.slider.height = h
			}
			if (_active) {
				reSize()
			}
		};
		this.active = function() {
			return _active
		};
		this.getCurrentNumber = function() {
			return current_slide
		};
		this.setSlide = function(n) {
			goToSlide(n)
		};

		function onConfigSet() {
			trace("onConfigSet")
		}

		function reSize(go_to_slide, from_start) {
			var _go_to_slide = true,
				_from_start = false;
			if (go_to_slide != null) {
				_go_to_slide = go_to_slide
			}
			if (from_start != null) {
				_from_start = from_start
			}
			current_width = config.slider.width;
			config.slider.nav.height = VMM.Lib.height(navigation.prevBtnContainer);
			if (VMM.Browser.device == "mobile" || current_width <= 640) {
				config.slider.content.padding = 10
			} else {
				config.slider.content.padding = config.slider.content.padding_default
			}
			config.slider.content.width = current_width - config.slider.content.padding * 2;
			VMM.Lib.width($slides_items, slides.length * config.slider.content.width);
			if (_from_start) {
				VMM.Lib.css($slider_container, "left", slides[current_slide].leftpos())
			}
			sizeSlides();
			positionSlides();
			VMM.Lib.css(navigation.nextBtn, "left", current_width - config.slider.nav.width);
			VMM.Lib.height(navigation.prevBtn, config.slider.height);
			VMM.Lib.height(navigation.nextBtn, config.slider.height);
			VMM.Lib.css(navigation.nextBtnContainer, "top", config.slider.height / 2 - config.slider.nav.height / 2 + 10);
			VMM.Lib.css(navigation.prevBtnContainer, "top", config.slider.height / 2 - config.slider.nav.height / 2 + 10);
			VMM.Lib.height($slider_mask, config.slider.height);
			VMM.Lib.width($slider_mask, current_width);
			if (_go_to_slide) {
				goToSlide(current_slide, "linear", 1)
			}
			if (current_slide == 0) {
				VMM.Lib.visible(navigation.prevBtn, false)
			}
		}

		function onDragFinish(e, d) {
			trace("DRAG FINISH");
			trace(d.left_adjust);
			trace(config.slider.width / 2);
			if (d.left_adjust < 0) {
				if (Math.abs(d.left_adjust) > config.slider.width / 2) {
					if (current_slide == slides.length - 1) {
						backToCurrentSlide()
					} else {
						goToSlide(current_slide + 1, "easeOutExpo");
						upDate()
					}
				} else {
					backToCurrentSlide()
				}
			} else if (Math.abs(d.left_adjust) > config.slider.width / 2) {
				if (current_slide == 0) {
					backToCurrentSlide()
				} else {
					goToSlide(current_slide - 1, "easeOutExpo");
					upDate()
				}
			} else {
				backToCurrentSlide()
			}
		}

		function onNextClick(e) {
			if (current_slide == slides.length - 1) {
				backToCurrentSlide()
			} else {
				goToSlide(current_slide + 1);
				upDate()
			}
		}

		function onPrevClick(e) {
			if (current_slide == 0) {
				backToCurrentSlide()
			} else {
				goToSlide(current_slide - 1);
				upDate()
			}
		}

		function onKeypressNav(e) {
			switch (e.keyCode) {
				case 39:
					onNextClick(e);
					break;
				case 37:
					onPrevClick(e);
					break
			}
		}

		function onTouchUpdate(e, b) {
			if (slide_positions.length == 0) {
				for (var i = 0; i < slides.length; i++) {
					slide_positions.push(slides[i].leftpos())
				}
			}
			if (typeof b.left == "number") {
				var _pos = b.left;
				var _slide_pos = -slides[current_slide].leftpos();
				if (_pos < _slide_pos - config.slider_width / 3) {
					onNextClick()
				} else if (_pos > _slide_pos + config.slider_width / 3) {
					onPrevClick()
				} else {
					VMM.Lib.animate($slider_container, config.duration, config.ease, {
						left: _slide_pos
					})
				}
			} else {
				VMM.Lib.animate($slider_container, config.duration, config.ease, {
					left: _slide_pos
				})
			}
			if (typeof b.top == "number") {
				VMM.Lib.animate($slider_container, config.duration, config.ease, {
					top: -b.top
				})
			} else {}
		}

		function onExplainerClick(e) {
			detachMessege()
		}

		function upDate() {
			config.current_slide = current_slide;
			VMM.fireEvent(layout, "UPDATE")
		}

		function getData(d) {
			data = d
		}

		function buildSlides(d) {
			var i = 0;
			VMM.attachElement($slides_items, "");
			slides = [];
			for (i = 0; i < d.length; i++) {
				var _slide = new VMM.Slider.Slide(d[i], $slides_items);
				slides.push(_slide)
			}
		}

		function preloadSlides(skip) {
			var i = 0;
			if (skip) {
				preloadTimeOutSlides()
			} else {
				for (i = 0; i < slides.length; i++) {
					slides[i].clearTimers()
				}
				timer = setTimeout(preloadTimeOutSlides, config.duration)
			}
		}

		function preloadTimeOutSlides() {
			var i = 0;
			for (i = 0; i < slides.length; i++) {
				slides[i].enqueue = true
			}
			for (i = 0; i < config.preload; i++) {
				if (!(current_slide + i > slides.length - 1)) {
					slides[current_slide + i].show();
					slides[current_slide + i].enqueue = false
				}
				if (!(current_slide - i < 0)) {
					slides[current_slide - i].show();
					slides[current_slide - i].enqueue = false
				}
			}
			if (slides.length > 50) {
				for (i = 0; i < slides.length; i++) {
					if (slides[i].enqueue) {
						slides[i].hide()
					}
				}
			}
			sizeSlides()
		}

		function sizeSlide(slide_id) {}

		function sizeSlides() {
			var i = 0,
				layout_text_media = ".slider-item .layout-text-media .media .media-container ",
				layout_media = ".slider-item .layout-media .media .media-container ",
				layout_both = ".slider-item .media .media-container",
				layout_caption = ".slider-item .media .media-container .media-shadow .caption",
				is_skinny = false,
				mediasize = {
					text_media: {
						width: config.slider.content.width / 100 * 60,
						height: config.slider.height - 60,
						video: {
							width: 0,
							height: 0
						},
						text: {
							width: config.slider.content.width / 100 * 40 - 30,
							height: config.slider.height
						}
					},
					media: {
						width: config.slider.content.width,
						height: config.slider.height - 110,
						video: {
							width: 0,
							height: 0
						}
					}
				};
			if (VMM.Browser.device == "mobile" || current_width < 641) {
				is_skinny = true
			}
			VMM.master_config.sizes.api.width = mediasize.media.width;
			VMM.master_config.sizes.api.height = mediasize.media.height;
			mediasize.text_media.video = VMM.Util.ratio.fit(mediasize.text_media.width, mediasize.text_media.height, 16, 9);
			mediasize.media.video = VMM.Util.ratio.fit(mediasize.media.width, mediasize.media.height, 16, 9);
			VMM.Lib.css(".slider-item", "width", config.slider.content.width);
			VMM.Lib.height(".slider-item", config.slider.height);
			if (is_skinny) {
				mediasize.text_media.width = config.slider.content.width - config.slider.content.padding * 2;
				mediasize.media.width = config.slider.content.width - config.slider.content.padding * 2;
				mediasize.text_media.height = config.slider.height / 100 * 50 - 50;
				mediasize.media.height = config.slider.height / 100 * 70 - 40;
				mediasize.text_media.video = VMM.Util.ratio.fit(mediasize.text_media.width, mediasize.text_media.height, 16, 9);
				mediasize.media.video = VMM.Util.ratio.fit(mediasize.media.width, mediasize.media.height, 16, 9);
				VMM.Lib.css(".slider-item .layout-text-media .text", "width", "100%");
				VMM.Lib.css(".slider-item .layout-text-media .text", "display", "block");
				VMM.Lib.css(".slider-item .layout-text-media .text .container", "display", "block");
				VMM.Lib.css(".slider-item .layout-text-media .text .container", "width", mediasize.media.width);
				VMM.Lib.css(".slider-item .layout-text-media .text .container .start", "width", "auto");
				VMM.Lib.css(".slider-item .layout-text-media .media", "float", "none");
				VMM.Lib.addClass(".slider-item .content-container", "pad-top");
				VMM.Lib.css(".slider-item .media blockquote p", "line-height", "18px");
				VMM.Lib.css(".slider-item .media blockquote p", "font-size", "16px");
				VMM.Lib.css(".slider-item", "overflow-y", "auto")
			} else {
				VMM.Lib.css(".slider-item .layout-text-media .text", "width", "40%");
				VMM.Lib.css(".slider-item .layout-text-media .text", "display", "table-cell");
				VMM.Lib.css(".slider-item .layout-text-media .text .container", "display", "table-cell");
				VMM.Lib.css(".slider-item .layout-text-media .text .container", "width", "auto");
				VMM.Lib.css(".slider-item .layout-text-media .text .container .start", "width", mediasize.text_media.text.width);
				VMM.Lib.removeClass(".slider-item .content-container", "pad-top");
				VMM.Lib.css(".slider-item .layout-text-media .media", "float", "left");
				VMM.Lib.css(".slider-item .layout-text-media", "display", "table");
				VMM.Lib.css(".slider-item .media blockquote p", "line-height", "36px");
				VMM.Lib.css(".slider-item .media blockquote p", "font-size", "28px");
				VMM.Lib.css(".slider-item", "display", "table");
				VMM.Lib.css(".slider-item", "overflow-y", "auto")
			}
			VMM.Lib.css(layout_text_media + ".media-frame", "max-width", mediasize.text_media.width);
			VMM.Lib.height(layout_text_media + ".media-frame", mediasize.text_media.height);
			VMM.Lib.width(layout_text_media + ".media-frame", mediasize.text_media.width);
			VMM.Lib.css(layout_text_media + "img", "max-height", mediasize.text_media.height);
			VMM.Lib.css(layout_media + "img", "max-height", mediasize.media.height);
			VMM.Lib.css(layout_text_media + "img", "max-width", mediasize.text_media.width);
			VMM.Lib.css(layout_text_media + ".avatar img", "max-width", 32);
			VMM.Lib.css(layout_text_media + ".avatar img", "max-height", 32);
			VMM.Lib.css(layout_media + ".avatar img", "max-width", 32);
			VMM.Lib.css(layout_media + ".avatar img", "max-height", 32);
			VMM.Lib.css(layout_text_media + ".article-thumb", "max-width", "50%");
			VMM.Lib.css(layout_media + ".article-thumb", "max-width", 200);
			VMM.Lib.width(layout_text_media + ".media-frame", mediasize.text_media.video.width);
			VMM.Lib.height(layout_text_media + ".media-frame", mediasize.text_media.video.height);
			VMM.Lib.width(layout_media + ".media-frame", mediasize.media.video.width);
			VMM.Lib.height(layout_media + ".media-frame", mediasize.media.video.height);
			VMM.Lib.css(layout_media + ".media-frame", "max-height", mediasize.media.video.height);
			VMM.Lib.css(layout_media + ".media-frame", "max-width", mediasize.media.video.width);
			VMM.Lib.height(layout_media + ".soundcloud", 168);
			VMM.Lib.height(layout_text_media + ".soundcloud", 168);
			VMM.Lib.width(layout_media + ".soundcloud", mediasize.media.width);
			VMM.Lib.width(layout_text_media + ".soundcloud", mediasize.text_media.width);
			VMM.Lib.css(layout_both + ".soundcloud", "max-height", 168);
			VMM.Lib.height(layout_text_media + ".map", mediasize.text_media.height);
			VMM.Lib.width(layout_text_media + ".map", mediasize.text_media.width);
			VMM.Lib.css(layout_media + ".map", "max-height", mediasize.media.height);
			VMM.Lib.width(layout_media + ".map", mediasize.media.width);
			VMM.Lib.height(layout_text_media + ".doc", mediasize.text_media.height);
			VMM.Lib.width(layout_text_media + ".doc", mediasize.text_media.width);
			VMM.Lib.height(layout_media + ".doc", mediasize.media.height);
			VMM.Lib.width(layout_media + ".doc", mediasize.media.width);
			VMM.Lib.width(layout_media + ".wikipedia", mediasize.media.width);
			VMM.Lib.width(layout_media + ".twitter", mediasize.media.width);
			VMM.Lib.width(layout_media + ".plain-text-quote", mediasize.media.width);
			VMM.Lib.width(layout_media + ".plain-text", mediasize.media.width);
			VMM.Lib.css(layout_both, "max-width", mediasize.media.width);
			VMM.Lib.css(layout_text_media + ".caption", "max-width", mediasize.text_media.video.width);
			VMM.Lib.css(layout_media + ".caption", "max-width", mediasize.media.video.width);
			for (i = 0; i < slides.length; i++) {
				slides[i].layout(is_skinny);
				if (slides[i].content_height() > config.slider.height + 20) {
					slides[i].css("display", "block")
				} else {
					slides[i].css("display", "table")
				}
			}
		}

		function positionSlides() {
			var pos = 0,
				i = 0;
			for (i = 0; i < slides.length; i++) {
				pos = i * (config.slider.width + config.spacing);
				slides[i].leftpos(pos)
			}
		}

		function opacitySlides(n) {
			var _ease = "linear",
				i = 0;
			for (i = 0; i < slides.length; i++) {
				if (i == current_slide) {
					slides[i].animate(config.duration, _ease, {
						opacity: 1
					})
				} else if (i == current_slide - 1 || i == current_slide + 1) {
					slides[i].animate(config.duration, _ease, {
						opacity: .1
					})
				} else {
					slides[i].opacity(n)
				}
			}
		}

		function goToSlide(n, ease, duration, fast, firstrun) {
			var _ease = config.ease,
				_duration = config.duration,
				is_last = false,
				is_first = false,
				_title = "",
				_pos;
			VMM.ExternalAPI.youtube.stopPlayers();
			current_slide = n;
			_pos = slides[current_slide].leftpos();
			if (current_slide == 0) {
				is_first = true
			}
			if (current_slide + 1 >= slides.length) {
				is_last = true
			}
			if (ease != null && ease != "") {
				_ease = ease
			}
			if (duration != null && duration != "") {
				_duration = duration
			}
			if (VMM.Browser.device == "mobile") {
				VMM.Lib.visible(navigation.prevBtn, false);
				VMM.Lib.visible(navigation.nextBtn, false)
			} else {
				if (is_first) {
					VMM.Lib.visible(navigation.prevBtn, false)
				} else {
					VMM.Lib.visible(navigation.prevBtn, true);
					_title = VMM.Util.unlinkify(data[current_slide - 1].title);
					if (config.type == "timeline") {
						if (typeof data[current_slide - 1].date === "undefined") {
							VMM.attachElement(navigation.prevDate, _title);
							VMM.attachElement(navigation.prevTitle, "")
						} else {
							VMM.attachElement(navigation.prevDate, VMM.Date.prettyDate(data[current_slide - 1].startdate, false, data[current_slide - 1].precisiondate));
							VMM.attachElement(navigation.prevTitle, _title)
						}
					} else {
						VMM.attachElement(navigation.prevTitle, _title)
					}
				}
				if (is_last) {
					VMM.Lib.visible(navigation.nextBtn, false)
				} else {
					VMM.Lib.visible(navigation.nextBtn, true);
					_title = VMM.Util.unlinkify(data[current_slide + 1].title);
					if (config.type == "timeline") {
						if (typeof data[current_slide + 1].date === "undefined") {
							VMM.attachElement(navigation.nextDate, _title);
							VMM.attachElement(navigation.nextTitle, "")
						} else {
							VMM.attachElement(navigation.nextDate, VMM.Date.prettyDate(data[current_slide + 1].startdate, false, data[current_slide + 1].precisiondate));
							VMM.attachElement(navigation.nextTitle, _title)
						}
					} else {
						VMM.attachElement(navigation.nextTitle, _title)
					}
				}
			}
			if (fast) {
				VMM.Lib.css($slider_container, "left", -(_pos - config.slider.content.padding))
			} else {
				VMM.Lib.stop($slider_container);
				VMM.Lib.animate($slider_container, _duration, _ease, {
					left: -(_pos - config.slider.content.padding)
				})
			}
			if (firstrun) {
				VMM.fireEvent(layout, "LOADED")
			}
			if (slides[current_slide].height() > config.slider_height) {
				VMM.Lib.css(".slider", "overflow-y", "scroll")
			} else {
				VMM.Lib.css(layout, "overflow-y", "hidden");
				var scroll_height = 0;
				try {
					scroll_height = VMM.Lib.prop(layout, "scrollHeight");
					VMM.Lib.animate(layout, _duration, _ease, {
						scrollTop: scroll_height - VMM.Lib.height(layout)
					})
				} catch (err) {
					scroll_height = VMM.Lib.height(layout)
				}
			}
			preloadSlides();
			VMM.fireEvent($slider, "MESSAGE", "TEST")
		}

		function backToCurrentSlide() {
			VMM.Lib.stop($slider_container);
			VMM.Lib.animate($slider_container, config.duration, "easeOutExpo", {
				left: -slides[current_slide].leftpos() + config.slider.content.padding
			})
		}

		function showMessege(e, msg, other) {
			trace("showMessege " + msg);
			VMM.attachElement($explainer, "<div class='vco-explainer'><div class='vco-explainer-container'><div class='vco-bezel'><div class='vco-gesture-icon'></div>" + "<div class='vco-message'><p>" + msg + "</p></div></div></div></div>")
		}

		function hideMessege() {
			VMM.Lib.animate($explainer, config.duration, config.ease, {
				opacity: 0
			}, detachMessege)
		}

		function detachMessege() {
			VMM.Lib.detach($explainer)
		}

		function buildNavigation() {
			var temp_icon = "<div class='icon'>&nbsp;</div>";
			navigation.nextBtn = VMM.appendAndGetElement($slider, "<div>", "nav-next");
			navigation.prevBtn = VMM.appendAndGetElement($slider, "<div>", "nav-previous");
			navigation.nextBtnContainer = VMM.appendAndGetElement(navigation.nextBtn, "<div>", "nav-container", temp_icon);
			navigation.prevBtnContainer = VMM.appendAndGetElement(navigation.prevBtn, "<div>", "nav-container", temp_icon);
			if (config.type == "timeline") {
				navigation.nextDate = VMM.appendAndGetElement(navigation.nextBtnContainer, "<div>", "date", "");
				navigation.prevDate = VMM.appendAndGetElement(navigation.prevBtnContainer, "<div>", "date", "")
			}
			navigation.nextTitle = VMM.appendAndGetElement(navigation.nextBtnContainer, "<div>", "title", "");
			navigation.prevTitle = VMM.appendAndGetElement(navigation.prevBtnContainer, "<div>", "title", "");
			VMM.bindEvent(".nav-next", onNextClick);
			VMM.bindEvent(".nav-previous", onPrevClick);
			VMM.bindEvent(window, onKeypressNav, "keydown")
		}

		function build() {
			var __duration = 3e3;
			VMM.attachElement(layout, "");
			$slider = VMM.getElement(layout);
			$slider_mask = VMM.appendAndGetElement($slider, "<div>", "slider-container-mask");
			$slider_container = VMM.appendAndGetElement($slider_mask, "<div>", "slider-container");
			$slides_items = VMM.appendAndGetElement($slider_container, "<div>", "slider-item-container");
			buildNavigation();
			buildSlides(data);
			if (VMM.Browser.device == "tablet" || VMM.Browser.device == "mobile") {
				config.duration = 500;
				__duration = 1e3;
				$dragslide = new VMM.DragSlider;
				$dragslide.createPanel($slider, $slider_container, "", config.touch, true);
				VMM.bindEvent($dragslide, onDragFinish, "DRAGUPDATE");
				$explainer = VMM.appendAndGetElement($slider_mask, "<div>", "vco-feedback", "");
				showMessege(null, VMM.master_config.language.messages.swipe_nav);
				VMM.Lib.height($explainer, config.slider.height);
				VMM.bindEvent($explainer, onExplainerClick);
				VMM.bindEvent($explainer, onExplainerClick, "touchend")
			}
			reSize(false, true);
			VMM.Lib.visible(navigation.prevBtn, false);
			goToSlide(config.current_slide, "easeOutExpo", __duration, true, true);
			_active = true
		}
	}
}
if (typeof VMM.Slider != "undefined") {
	VMM.Slider.goToSlide = function(n, ease, duration, fast, firstrun) {
		var _ease = config.ease,
			_duration = config.duration,
			is_last = false,
			is_first = false,
			_title = "",
			_pos;
		VMM.ExternalAPI.youtube.stopPlayers();
		current_slide = n;
		_pos = slides[current_slide].leftpos();
		if (current_slide == 0) {
			is_first = true
		}
		if (current_slide + 1 >= slides.length) {
			is_last = true
		}
		if (ease != null && ease != "") {
			_ease = ease
		}
		if (duration != null && duration != "") {
			_duration = duration
		}
		if (VMM.Browser.device == "mobile") {
			VMM.Lib.visible(navigation.prevBtn, false);
			VMM.Lib.visible(navigation.nextBtn, false)
		} else {
			if (is_first) {
				VMM.Lib.visible(navigation.prevBtn, false)
			} else {
				VMM.Lib.visible(navigation.prevBtn, true);
				_title = VMM.Util.unlinkify(data[current_slide - 1].title);
				if (config.type == "timeline") {
					if (typeof data[current_slide - 1].date === "undefined") {
						VMM.attachElement(navigation.prevDate, _title);
						VMM.attachElement(navigation.prevTitle, "")
					} else {
						VMM.attachElement(navigation.prevDate, VMM.Date.prettyDate(data[current_slide - 1].startdate, false, data[current_slide - 1].precisiondate));
						VMM.attachElement(navigation.prevTitle, _title)
					}
				} else {
					VMM.attachElement(navigation.prevTitle, _title)
				}
			}
			if (is_last) {
				VMM.Lib.visible(navigation.nextBtn, false)
			} else {
				VMM.Lib.visible(navigation.nextBtn, true);
				_title = VMM.Util.unlinkify(data[current_slide + 1].title);
				if (config.type == "timeline") {
					if (typeof data[current_slide + 1].date === "undefined") {
						VMM.attachElement(navigation.nextDate, _title);
						VMM.attachElement(navigation.nextTitle, "")
					} else {
						VMM.attachElement(navigation.nextDate, VMM.Date.prettyDate(data[current_slide + 1].startdate, false, data[current_slide + 1].precisiondate));
						VMM.attachElement(navigation.nextTitle, _title)
					}
				} else {
					VMM.attachElement(navigation.nextTitle, _title)
				}
			}
		}
		if (fast) {
			VMM.Lib.css($slider_container, "left", -(_pos - config.slider.content.padding))
		} else {
			VMM.Lib.stop($slider_container);
			VMM.Lib.animate($slider_container, _duration, _ease, {
				left: -(_pos - config.slider.content.padding)
			})
		}
		if (firstrun) {
			VMM.fireEvent(layout, "LOADED")
		}
		if (slides[current_slide].height() > config.slider_height) {
			VMM.Lib.css(".slider", "overflow-y", "scroll")
		} else {
			VMM.Lib.css(layout, "overflow-y", "hidden");
			var scroll_height = 0;
			try {
				scroll_height = VMM.Lib.prop(layout, "scrollHeight");
				VMM.Lib.animate(layout, _duration, _ease, {
					scrollTop: scroll_height - VMM.Lib.height(layout)
				})
			} catch (err) {
				scroll_height = VMM.Lib.height(layout)
			}
		}
		preloadSlides();
		VMM.fireEvent($slider, "MESSAGE", "TEST")
	}
	VMM.Slider.Slide = function(d, _parent) {
		var $media, $text, $slide, $wrap, element, c, data = d,
			slide = {},
			element = "",
			media = "",
			loaded = false,
			preloaded = false,
			is_skinny = false,
			_enqueue = true,
			_removeque = false,
			_id = "slide_",
			_class = 0,
			timer = {
				pushque: "",
				render: "",
				relayout: "",
				remove: "",
				skinny: false
			},
			times = {
				pushque: 500,
				render: 100,
				relayout: 100,
				remove: 3e4
			};
		_id = _id + data.uniqueid;
		this.enqueue = _enqueue;
		this.id = _id;
		element = VMM.appendAndGetElement(_parent, "<div>", "slider-item");
		if (typeof data.classname != "undefined") {
			trace("HAS CLASSNAME");
			VMM.Lib.addClass(element, data.classname)
		} else {
			trace("NO CLASSNAME");
			trace(data)
		}
		c = {
			slide: "",
			text: "",
			media: "",
			media_element: "",
			layout: "content-container layout",
			has: {
				headline: false,
				text: false,
				media: false
			}
		};
		this.show = function(skinny) {
			_enqueue = false;
			timer.skinny = skinny;
			_removeque = false;
			clearTimeout(timer.remove);
			if (!loaded) {
				if (preloaded) {
					clearTimeout(timer.relayout);
					timer.relayout = setTimeout(reloadLayout, times.relayout)
				} else {
					render(skinny)
				}
			}
		};
		this.hide = function() {
			if (loaded && !_removeque) {
				_removeque = true;
				clearTimeout(timer.remove);
				timer.remove = setTimeout(removeSlide, times.remove)
			}
		};
		this.clearTimers = function() {
			clearTimeout(timer.relayout);
			clearTimeout(timer.pushque);
			clearTimeout(timer.render)
		};
		this.layout = function(skinny) {
			if (loaded && preloaded) {
				reLayout(skinny)
			}
		};
		this.elem = function() {
			return element
		};
		this.position = function() {
			return VMM.Lib.position(element)
		};
		this.leftpos = function(p) {
			if (typeof p != "undefined") {
				VMM.Lib.css(element, "left", p)
			} else {
				return VMM.Lib.position(element).left
			}
		};
		this.animate = function(d, e, p) {
			VMM.Lib.animate(element, d, e, p)
		};
		this.css = function(p, v) {
			VMM.Lib.css(element, p, v)
		};
		this.opacity = function(p) {
			VMM.Lib.css(element, "opacity", p)
		};
		this.width = function() {
			return VMM.Lib.width(element)
		};
		this.height = function() {
			return VMM.Lib.height(element)
		};
		this.content_height = function() {
			var ch = VMM.Lib.find(element, ".content")[0];
			if (ch != "undefined" && ch != null) {
				return VMM.Lib.height(ch)
			} else {
				return 0
			}
		};
		var render = function(skinny) {
			trace("RENDER " + _id);
			loaded = true;
			preloaded = true;
			timer.skinny = skinny;
			buildSlide();
			clearTimeout(timer.pushque);
			clearTimeout(timer.render);
			timer.pushque = setTimeout(VMM.ExternalAPI.pushQues, times.pushque)
		};
		var removeSlide = function() {
			trace("REMOVE SLIDE TIMER FINISHED");
			loaded = false;
			VMM.Lib.detach($text);
			VMM.Lib.detach($media)
		};
		var reloadLayout = function() {
			loaded = true;
			reLayout(timer.skinny, true)
		};
		var reLayout = function(skinny, reload) {
			if (c.has.text) {
				if (skinny) {
					if (!is_skinny || reload) {
						VMM.Lib.removeClass($slide, "pad-left");
						VMM.Lib.detach($text);
						VMM.Lib.detach($media);
						VMM.Lib.append($slide, $text);
						VMM.Lib.append($slide, $media);
						is_skinny = true
					}
				} else {
					if (is_skinny || reload) {
						VMM.Lib.addClass($slide, "pad-left");
						VMM.Lib.detach($text);
						VMM.Lib.detach($media);
						VMM.Lib.append($slide, $media);
						VMM.Lib.append($slide, $text);
						is_skinny = false
					}
				}
			} else if (reload) {
				if (c.has.headline) {
					VMM.Lib.detach($text);
					VMM.Lib.append($slide, $text)
				}
				VMM.Lib.detach($media);
				VMM.Lib.append($slide, $media)
			}
		};
		var buildSlide = function() {
			trace("BUILDSLIDE");
			$wrap = VMM.appendAndGetElement(element, "<div>", "content");
			$slide = VMM.appendAndGetElement($wrap, "<div>");
			if (data.startdate != null && data.startdate != "") {
				if (type.of(data.startdate) == "date") {
					if (data.type != "start") {
						var st = VMM.Date.prettyDate(data.startdate, false, data.precisiondate);
						var en = VMM.Date.prettyDate(data.enddate, false, data.precisiondate);
						var tag = "";
						if (data.tag != null && data.tag != "") {
							tag = VMM.createElement("span", data.tag, "slide-tag")
						}
						if (st != en) {
							c.text += VMM.createElement("h2", st + " &mdash; " + en + tag, "date")
						} else {
							c.text += VMM.createElement("h2", st + tag, "date")
						}
					}
				}
			}
			if (data.headline != null && data.headline != "") {
				c.has.headline = true;
				if (data.type == "start") {
					c.text += VMM.createElement("h2", VMM.Util.linkify_with_twitter(data.headline, "_blank"), "start")
				} else {
					c.text += VMM.createElement("h3", VMM.Util.linkify_with_twitter(data.headline, "_blank"))
				}
			}
			if (data.text != null && data.text != "") {
				c.has.text = true;
				c.text += VMM.createElement("p", VMM.Util.linkify_with_twitter(data.text, "_blank"))
			}
			if (c.has.text || c.has.headline) {
				c.text = VMM.createElement("div", c.text, "container");
				$text = VMM.appendAndGetElement($slide, "<div>", "text", VMM.TextElement.create(c.text))
			}
			if (data.needs_slug) {}
			// finding a tag in text
			if(data.asset.primary != "true") {
				var dd = data.text;
				regex = /href=['"](\S+?)['"]/;
				group = dd.match(regex);
				if (group) {
					console.log(group);
					data.asset.media = "<iframe src='" + group[1] + "'></iframe>";
				} else {
					data.asset.media = "";
				}
			}
			//
			if (data.asset != null && data.asset != "") {
				if (data.asset.media != null && data.asset.media != "") {
					c.has.media = true;
					$media = VMM.appendAndGetElement($slide, "<div>", "media", VMM.MediaElement.create(data.asset, data.uniqueid))
				}
			}
			if (c.has.text) {
				c.layout += "-text"
			}
			if (c.has.media) {
				c.layout += "-media"
			}
			if (c.has.text) {
				if (timer.skinny) {
					VMM.Lib.addClass($slide, c.layout);
					is_skinny = true
				} else {
					VMM.Lib.addClass($slide, c.layout);
					VMM.Lib.addClass($slide, "pad-left");
					VMM.Lib.detach($text);
					VMM.Lib.append($slide, $text)
				}
			} else {
				VMM.Lib.addClass($slide, c.layout)
			}
		}
	}
}
var Aes = {};
Aes.cipher = function(input, w) {
	var Nb = 4;
	var Nr = w.length / Nb - 1;
	var state = [
		[],
		[],
		[],
		[]
	];
	for (var i = 0; i < 4 * Nb; i++) state[i % 4][Math.floor(i / 4)] = input[i];
	state = Aes.addRoundKey(state, w, 0, Nb);
	for (var round = 1; round < Nr; round++) {
		state = Aes.subBytes(state, Nb);
		state = Aes.shiftRows(state, Nb);
		state = Aes.mixColumns(state, Nb);
		state = Aes.addRoundKey(state, w, round, Nb)
	}
	state = Aes.subBytes(state, Nb);
	state = Aes.shiftRows(state, Nb);
	state = Aes.addRoundKey(state, w, Nr, Nb);
	var output = new Array(4 * Nb);
	for (var i = 0; i < 4 * Nb; i++) output[i] = state[i % 4][Math.floor(i / 4)];
	return output
};
Aes.keyExpansion = function(key) {
	var Nb = 4;
	var Nk = key.length / 4;
	var Nr = Nk + 6;
	var w = new Array(Nb * (Nr + 1));
	var temp = new Array(4);
	for (var i = 0; i < Nk; i++) {
		var r = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
		w[i] = r
	}
	for (var i = Nk; i < Nb * (Nr + 1); i++) {
		w[i] = new Array(4);
		for (var t = 0; t < 4; t++) temp[t] = w[i - 1][t];
		if (i % Nk == 0) {
			temp = Aes.subWord(Aes.rotWord(temp));
			for (var t = 0; t < 4; t++) temp[t] ^= Aes.rCon[i / Nk][t]
		} else if (Nk > 6 && i % Nk == 4) {
			temp = Aes.subWord(temp)
		}
		for (var t = 0; t < 4; t++) w[i][t] = w[i - Nk][t] ^ temp[t]
	}
	return w
};
Aes.subBytes = function(s, Nb) {
	for (var r = 0; r < 4; r++) {
		for (var c = 0; c < Nb; c++) s[r][c] = Aes.sBox[s[r][c]]
	}
	return s
};
Aes.shiftRows = function(s, Nb) {
	var t = new Array(4);
	for (var r = 1; r < 4; r++) {
		for (var c = 0; c < 4; c++) t[c] = s[r][(c + r) % Nb];
		for (var c = 0; c < 4; c++) s[r][c] = t[c]
	}
	return s
};
Aes.mixColumns = function(s, Nb) {
	for (var c = 0; c < 4; c++) {
		var a = new Array(4);
		var b = new Array(4);
		for (var i = 0; i < 4; i++) {
			a[i] = s[i][c];
			b[i] = s[i][c] & 128 ? s[i][c] << 1 ^ 283 : s[i][c] << 1
		}
		s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3];
		s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3];
		s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3];
		s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]
	}
	return s
};
Aes.addRoundKey = function(state, w, rnd, Nb) {
	for (var r = 0; r < 4; r++) {
		for (var c = 0; c < Nb; c++) state[r][c] ^= w[rnd * 4 + c][r]
	}
	return state
};
Aes.subWord = function(w) {
	for (var i = 0; i < 4; i++) w[i] = Aes.sBox[w[i]];
	return w
};
Aes.rotWord = function(w) {
	var tmp = w[0];
	for (var i = 0; i < 3; i++) w[i] = w[i + 1];
	w[3] = tmp;
	return w
};
Aes.sBox = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
Aes.rCon = [
	[0, 0, 0, 0],
	[1, 0, 0, 0],
	[2, 0, 0, 0],
	[4, 0, 0, 0],
	[8, 0, 0, 0],
	[16, 0, 0, 0],
	[32, 0, 0, 0],
	[64, 0, 0, 0],
	[128, 0, 0, 0],
	[27, 0, 0, 0],
	[54, 0, 0, 0]
];
Aes.Ctr = {};
Aes.Ctr.encrypt = function(plaintext, password, nBits) {
	var blockSize = 16;
	if (!(nBits == 128 || nBits == 192 || nBits == 256)) return "";
	plaintext = Utf8.encode(plaintext);
	password = Utf8.encode(password);
	var nBytes = nBits / 8;
	var pwBytes = new Array(nBytes);
	for (var i = 0; i < nBytes; i++) {
		pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i)
	}
	var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));
	key = key.concat(key.slice(0, nBytes - 16));
	var counterBlock = new Array(blockSize);
	var nonce = (new Date).getTime();
	var nonceMs = nonce % 1e3;
	var nonceSec = Math.floor(nonce / 1e3);
	var nonceRnd = Math.floor(Math.random() * 65535);
	for (var i = 0; i < 2; i++) counterBlock[i] = nonceMs >>> i * 8 & 255;
	for (var i = 0; i < 2; i++) counterBlock[i + 2] = nonceRnd >>> i * 8 & 255;
	for (var i = 0; i < 4; i++) counterBlock[i + 4] = nonceSec >>> i * 8 & 255;
	var ctrTxt = "";
	for (var i = 0; i < 8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);
	var keySchedule = Aes.keyExpansion(key);
	var blockCount = Math.ceil(plaintext.length / blockSize);
	var ciphertxt = new Array(blockCount);
	for (var b = 0; b < blockCount; b++) {
		for (var c = 0; c < 4; c++) counterBlock[15 - c] = b >>> c * 8 & 255;
		for (var c = 0; c < 4; c++) counterBlock[15 - c - 4] = b / 4294967296 >>> c * 8;
		var cipherCntr = Aes.cipher(counterBlock, keySchedule);
		var blockLength = b < blockCount - 1 ? blockSize : (plaintext.length - 1) % blockSize + 1;
		var cipherChar = new Array(blockLength);
		for (var i = 0; i < blockLength; i++) {
			cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b * blockSize + i);
			cipherChar[i] = String.fromCharCode(cipherChar[i])
		}
		ciphertxt[b] = cipherChar.join("")
	}
	var ciphertext = ctrTxt + ciphertxt.join("");
	ciphertext = Base64.encode(ciphertext);
	return ciphertext
};
Aes.Ctr.decrypt = function(ciphertext, password, nBits) {
	var blockSize = 16;
	if (!(nBits == 128 || nBits == 192 || nBits == 256)) return "";
	ciphertext = Base64.decode(ciphertext);
	password = Utf8.encode(password);
	var nBytes = nBits / 8;
	var pwBytes = new Array(nBytes);
	for (var i = 0; i < nBytes; i++) {
		pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i)
	}
	var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));
	key = key.concat(key.slice(0, nBytes - 16));
	var counterBlock = new Array(8);
	ctrTxt = ciphertext.slice(0, 8);
	for (var i = 0; i < 8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);
	var keySchedule = Aes.keyExpansion(key);
	var nBlocks = Math.ceil((ciphertext.length - 8) / blockSize);
	var ct = new Array(nBlocks);
	for (var b = 0; b < nBlocks; b++) ct[b] = ciphertext.slice(8 + b * blockSize, 8 + b * blockSize + blockSize);
	ciphertext = ct;
	var plaintxt = new Array(ciphertext.length);
	for (var b = 0; b < nBlocks; b++) {
		for (var c = 0; c < 4; c++) counterBlock[15 - c] = b >>> c * 8 & 255;
		for (var c = 0; c < 4; c++) counterBlock[15 - c - 4] = (b + 1) / 4294967296 - 1 >>> c * 8 & 255;
		var cipherCntr = Aes.cipher(counterBlock, keySchedule);
		var plaintxtByte = new Array(ciphertext[b].length);
		for (var i = 0; i < ciphertext[b].length; i++) {
			plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
			plaintxtByte[i] = String.fromCharCode(plaintxtByte[i])
		}
		plaintxt[b] = plaintxtByte.join("")
	}
	var plaintext = plaintxt.join("");
	plaintext = Utf8.decode(plaintext);
	return plaintext
};
var Base64 = {};
Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
Base64.encode = function(str, utf8encode) {
	utf8encode = typeof utf8encode == "undefined" ? false : utf8encode;
	var o1, o2, o3, bits, h1, h2, h3, h4, e = [],
		pad = "",
		c, plain, coded;
	var b64 = Base64.code;
	plain = utf8encode ? str.encodeUTF8() : str;
	c = plain.length % 3;
	if (c > 0) {
		while (c++ < 3) {
			pad += "=";
			plain += "\x00"
		}
	}
	for (c = 0; c < plain.length; c += 3) {
		o1 = plain.charCodeAt(c);
		o2 = plain.charCodeAt(c + 1);
		o3 = plain.charCodeAt(c + 2);
		bits = o1 << 16 | o2 << 8 | o3;
		h1 = bits >> 18 & 63;
		h2 = bits >> 12 & 63;
		h3 = bits >> 6 & 63;
		h4 = bits & 63;
		e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
	}
	coded = e.join("");
	coded = coded.slice(0, coded.length - pad.length) + pad;
	return coded
};
Base64.decode = function(str, utf8decode) {
	utf8decode = typeof utf8decode == "undefined" ? false : utf8decode;
	var o1, o2, o3, h1, h2, h3, h4, bits, d = [],
		plain, coded;
	var b64 = Base64.code;
	coded = utf8decode ? str.decodeUTF8() : str;
	for (var c = 0; c < coded.length; c += 4) {
		h1 = b64.indexOf(coded.charAt(c));
		h2 = b64.indexOf(coded.charAt(c + 1));
		h3 = b64.indexOf(coded.charAt(c + 2));
		h4 = b64.indexOf(coded.charAt(c + 3));
		bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
		o1 = bits >>> 16 & 255;
		o2 = bits >>> 8 & 255;
		o3 = bits & 255;
		d[c / 4] = String.fromCharCode(o1, o2, o3);
		if (h4 == 64) d[c / 4] = String.fromCharCode(o1, o2);
		if (h3 == 64) d[c / 4] = String.fromCharCode(o1)
	}
	plain = d.join("");
	return utf8decode ? plain.decodeUTF8() : plain
};
var Utf8 = {};
Utf8.encode = function(strUni) {
	var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function(c) {
		var cc = c.charCodeAt(0);
		return String.fromCharCode(192 | cc >> 6, 128 | cc & 63)
	});
	strUtf = strUtf.replace(/[\u0800-\uffff]/g, function(c) {
		var cc = c.charCodeAt(0);
		return String.fromCharCode(224 | cc >> 12, 128 | cc >> 6 & 63, 128 | cc & 63)
	});
	return strUtf
};
Utf8.decode = function(strUtf) {
	var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(c) {
		var cc = (c.charCodeAt(0) & 15) << 12 | (c.charCodeAt(1) & 63) << 6 | c.charCodeAt(2) & 63;
		return String.fromCharCode(cc)
	});
	strUni = strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(c) {
		var cc = (c.charCodeAt(0) & 31) << 6 | c.charCodeAt(1) & 63;
		return String.fromCharCode(cc)
	});
	return strUni
};
! function($) {
	"use strict";
	var Tooltip = function(element, options) {
		this.init("tooltip", element, options)
	};
	Tooltip.prototype = {
		constructor: Tooltip,
		init: function(type, element, options) {
			var eventIn, eventOut;
			this.type = type;
			this.$element = $(element);
			this.options = this.getOptions(options);
			this.enabled = true;
			if (this.options.trigger != "manual") {
				eventIn = this.options.trigger == "hover" ? "mouseenter" : "focus";
				eventOut = this.options.trigger == "hover" ? "mouseleave" : "blur";
				this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this));
				this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
			}
			this.options.selector ? this._options = $.extend({}, this.options, {
				trigger: "manual",
				selector: ""
			}) : this.fixTitle()
		},
		getOptions: function(options) {
			options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data());
			if (options.delay && typeof options.delay == "number") {
				options.delay = {
					show: options.delay,
					hide: options.delay
				}
			}
			return options
		},
		enter: function(e) {
			var self = $(e.currentTarget)[this.type](this._options).data(this.type);
			if (!self.options.delay || !self.options.delay.show) {
				self.show()
			} else {
				self.hoverState = "in";
				setTimeout(function() {
					if (self.hoverState == "in") {
						self.show()
					}
				}, self.options.delay.show)
			}
		},
		leave: function(e) {
			var self = $(e.currentTarget)[this.type](this._options).data(this.type);
			if (!self.options.delay || !self.options.delay.hide) {
				self.hide()
			} else {
				self.hoverState = "out";
				setTimeout(function() {
					if (self.hoverState == "out") {
						self.hide()
					}
				}, self.options.delay.hide)
			}
		},
		show: function() {
			var $tip, inside, pos, actualWidth, actualHeight, placement, tp;
			if (this.hasContent() && this.enabled) {
				$tip = this.tip();
				this.setContent();
				if (this.options.animation) {
					$tip.addClass("fade")
				}
				placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
				inside = /in/.test(placement);
				$tip.remove().css({
					top: 0,
					left: 0,
					display: "block"
				}).appendTo(inside ? this.$element : document.body);
				pos = this.getPosition(inside);
				actualWidth = $tip[0].offsetWidth;
				actualHeight = $tip[0].offsetHeight;
				switch (inside ? placement.split(" ")[1] : placement) {
					case "bottom":
						tp = {
							top: pos.top + pos.height,
							left: pos.left + pos.width / 2 - actualWidth / 2
						};
						break;
					case "top":
						tp = {
							top: pos.top - actualHeight,
							left: pos.left + pos.width / 2 - actualWidth / 2
						};
						break;
					case "left":
						tp = {
							top: pos.top + pos.height / 2 - actualHeight / 2,
							left: pos.left - actualWidth
						};
						break;
					case "right":
						tp = {
							top: pos.top + pos.height / 2 - actualHeight / 2,
							left: pos.left + pos.width
						};
						break
				}
				$tip.css(tp).addClass(placement).addClass("in")
			}
		},
		setContent: function() {
			var $tip = this.tip();
			$tip.find(".timeline-tooltip-inner").html(this.getTitle());
			$tip.removeClass("fade in top bottom left right")
		},
		hide: function() {
			var that = this,
				$tip = this.tip();
			$tip.removeClass("in");

			function removeWithAnimation() {
				var timeout = setTimeout(function() {
					$tip.off($.support.transition.end).remove()
				}, 500);
				$tip.one($.support.transition.end, function() {
					clearTimeout(timeout);
					$tip.remove()
				})
			}
			$.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() : $tip.remove()
		},
		fixTitle: function() {
			var $e = this.$element;
			if ($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
				$e.attr("data-original-title", $e.attr("title") || "").removeAttr("title")
			}
		},
		hasContent: function() {
			return this.getTitle()
		},
		getPosition: function(inside) {
			return $.extend({}, inside ? {
				top: 0,
				left: 0
			} : this.$element.offset(), {
				width: this.$element[0].offsetWidth,
				height: this.$element[0].offsetHeight
			})
		},
		getTitle: function() {
			var title, $e = this.$element,
				o = this.options;
			title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
			title = title.toString().replace(/(^\s*|\s*$)/, "");
			return title
		},
		tip: function() {
			return this.$tip = this.$tip || $(this.options.template)
		},
		validate: function() {
			if (!this.$element[0].parentNode) {
				this.hide();
				this.$element = null;
				this.options = null
			}
		},
		enable: function() {
			this.enabled = true
		},
		disable: function() {
			this.enabled = false
		},
		toggleEnabled: function() {
			this.enabled = !this.enabled
		},
		toggle: function() {
			this[this.tip().hasClass("in") ? "hide" : "show"]()
		}
	};
	$.fn.tooltip = function(option) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data("tooltip"),
				options = typeof option == "object" && option;
			if (!data) $this.data("tooltip", data = new Tooltip(this, options));
			if (typeof option == "string") data[option]()
		})
	};
	$.fn.tooltip.Constructor = Tooltip;
	$.fn.tooltip.defaults = {
		animation: true,
		delay: 0,
		selector: false,
		placement: "top",
		trigger: "hover",
		title: "",
		template: '<div class="timeline-tooltip"><div class="timeline-tooltip-arrow"></div><div class="timeline-tooltip-inner"></div></div>'
	}
}(window.jQuery);
if (typeof VMM != "undefined" && typeof VMM.StoryJS == "undefined") {
	VMM.StoryJS = function() {
		this.init = function(d) {}
	}
}
if (typeof VMM != "undefined" && typeof VMM.Timeline == "undefined") {
	VMM.Timeline = function(_timeline_id, w, h) {
		var $timeline, $container, $feature, $feedback, $slider, $navigation, slider, timenav, version = "2.x",
			timeline_id = "#timelinejs",
			events = {},
			data = {},
			tree_data = {},
			_dates = [],
			config = {},
			has_width = false,
			has_height = false,
			ie7 = false,
			is_moving = false;
		if (type.of(_timeline_id) == "string") {
			if (_timeline_id.match("#")) {
				timeline_id = _timeline_id
			} else {
				timeline_id = "#" + _timeline_id
			}
		} else {
			timeline_id = "#timelinejs"
		}
		config = {
			embed: false,
			events: {
				data_ready: "DATAREADY",
				messege: "MESSEGE",
				headline: "HEADLINE",
				slide_change: "SLIDE_CHANGE",
				resize: "resize"
			},
			id: timeline_id,
			source: "nothing",
			type: "timeline",
			touch: false,
			orientation: "normal",
			maptype: "",
			version: "2.x",
			preload: 4,
			current_slide: 0,
			hash_bookmark: false,
			start_at_end: false,
			start_at_slide: 0,
			start_zoom_adjust: 0,
			start_page: false,
			api_keys: {
				google: "",
				flickr: "",
				twitter: ""
			},
			interval: 10,
			something: 0,
			width: 960,
			height: 540,
			spacing: 15,
			loaded: {
				slider: false,
				timenav: false,
				percentloaded: 0
			},
			nav: {
				start_page: false,
				interval_width: 200,
				density: 4,
				minor_width: 0,
				minor_left: 0,
				constraint: {
					left: 0,
					right: 0,
					right_min: 0,
					right_max: 0
				},
				zoom: {
					adjust: 0
				},
				multiplier: {
					current: 6,
					min: .1,
					max: 50
				},
				rows: [1, 1, 1],
				width: 960,
				height: 200,
				marker: {
					width: 150,
					height: 50
				}
			},
			feature: {
				width: 960,
				height: 540
			},
			slider: {
				width: 720,
				height: 400,
				content: {
					width: 720,
					height: 400,
					padding: 130,
					padding_default: 130
				},
				nav: {
					width: 100,
					height: 200
				}
			},
			ease: "easeInOutExpo",
			duration: 1e3,
			gmap_key: "",
			language: VMM.Language,
			tagSortFunction: function(arr) {
				arr.sort(function(a, b) {
					return a.localeCompare(b)
				})
			}
		};
		if (w != null && w != "") {
			config.width = w;
			has_width = true
		}
		if (h != null && h != "") {
			config.height = h;
			has_height = true
		}
		if (window.location.hash) {
			var hash = window.location.hash.substring(1);
			if (!isNaN(hash)) {
				config.current_slide = parseInt(hash)
			}
		}
		window.onhashchange = function() {
			var hash = window.location.hash.substring(1);
			if (config.hash_bookmark) {
				if (is_moving) {
					goToEvent(parseInt(hash))
				} else {
					is_moving = false
				}
			} else {
				goToEvent(parseInt(hash))
			}
		};

		function createConfig(conf) {
			if (typeof embed_config == "object") {
				timeline_config = embed_config
			}
			if (typeof timeline_config == "object") {
				trace("HAS TIMELINE CONFIG");
				config = VMM.Util.mergeConfig(config, timeline_config)
			} else if (typeof conf == "object") {
				config = VMM.Util.mergeConfig(config, conf)
			}
			if (VMM.Browser.device == "mobile" || VMM.Browser.device == "tablet") {
				config.touch = true
			}
			config.nav.width = config.width;
			config.nav.height = 200;
			config.feature.width = config.width;
			config.feature.height = config.height - config.nav.height;
			config.nav.zoom.adjust = parseInt(config.start_zoom_adjust, 10);
			VMM.Timeline.Config = config;
			VMM.master_config.Timeline = VMM.Timeline.Config;
			this.events = config.events;
			if (config.gmap_key != "") {
				config.api_keys.google = config.gmap_key
			}
			trace("VERSION " + config.version);
			version = config.version
		}

		function createStructure() {
			$timeline = VMM.getElement(timeline_id);
			VMM.Lib.addClass($timeline, "vco-timeline");
			VMM.Lib.addClass($timeline, "vco-storyjs");
			$container = VMM.appendAndGetElement($timeline, "<div>", "vco-container vco-main");
			$feature = VMM.appendAndGetElement($container, "<div>", "vco-feature");
			$slider = VMM.appendAndGetElement($feature, "<div>", "vco-slider");
			$navigation = VMM.appendAndGetElement($container, "<div>", "vco-navigation");
			$feedback = VMM.appendAndGetElement($timeline, "<div>", "vco-feedback", "");
			if (typeof config.language.right_to_left != "undefined") {
				VMM.Lib.addClass($timeline, "vco-right-to-left")
			}
			slider = new VMM.Slider($slider, config);
			timenav = new VMM.Timeline.TimeNav($navigation);
			if (!has_width) {
				config.width = VMM.Lib.width($timeline)
			} else {
				VMM.Lib.width($timeline, config.width)
			}
			if (!has_height) {
				config.height = VMM.Lib.height($timeline)
			} else {
				VMM.Lib.height($timeline, config.height)
			}
			if (config.touch) {
				VMM.Lib.addClass($timeline, "vco-touch")
			} else {
				VMM.Lib.addClass($timeline, "vco-notouch")
			}
		}

		function onDataReady(e, d) {
			trace("onDataReady");
			tree_data = d.tree;
			data = d.timeline;
			if (type.of(data.era) != "array") {
				data.era = []
			}
			buildDates()
		}

		function onDatesProcessed() {
			build()
		}

		function reSize() {
			updateSize();
			slider.setSize(config.feature.width, config.feature.height);
			timenav.setSize(config.width, config.height);
			if (orientationChange()) {
				setViewport()
			}
		}

		function onSliderLoaded(e) {
			config.loaded.slider = true;
			onComponentLoaded()
		}

		function onComponentLoaded(e) {
			config.loaded.percentloaded = config.loaded.percentloaded + 25;
			if (config.loaded.slider && config.loaded.timenav) {
				hideMessege()
			}
		}

		function onTimeNavLoaded(e) {
			config.loaded.timenav = true;
			onComponentLoaded()
		}

		function onSlideUpdate(e) {
			is_moving = true;
			config.current_slide = slider.getCurrentNumber();
			setHash(config.current_slide);
			timenav.setMarker(config.current_slide, config.ease, config.duration)
		}

		function onMarkerUpdate(e) {
			is_moving = true;
			config.current_slide = timenav.getCurrentNumber();
			setHash(config.current_slide);
			slider.setSlide(config.current_slide)
		}

		function goToEvent(n) {
			if (n <= _dates.length - 1 && n >= 0) {
				config.current_slide = n;
				slider.setSlide(config.current_slide);
				timenav.setMarker(config.current_slide, config.ease, config.duration)
			}
		}

		function setHash(n) {
			if (config.hash_bookmark) {
				window.location.hash = "#" + n.toString()
			}
		}

		function getViewport() {}

		function setViewport() {
			var viewport_content = "",
				viewport_orientation = searchOrientation(window.orientation);
			if (VMM.Browser.device == "mobile") {
				if (viewport_orientation == "portrait") {
					viewport_content = "width=device-width; initial-scale=0.5, maximum-scale=0.5"
				} else if (viewport_orientation == "landscape") {
					viewport_content = "width=device-width; initial-scale=0.5, maximum-scale=0.5"
				} else {
					viewport_content = "width=device-width, initial-scale=1, maximum-scale=1.0"
				}
			} else if (VMM.Browser.device == "tablet") {}
			if (document.getElementById("viewport")) {} else {}
		}

		function searchOrientation(orientation) {
			var orient = "";
			if (orientation == 0 || orientation == 180) {
				orient = "portrait"
			} else if (orientation == 90 || orientation == -90) {
				orient = "landscape"
			} else {
				orient = "normal"
			}
			return orient
		}

		function orientationChange() {
			var orientation = searchOrientation(window.orientation);
			if (orientation == config.orientation) {
				return false
			} else {
				config.orientation = orientation;
				return true
			}
		}
		this.init = function(c, _data) {
			trace("INIT");
			setViewport();
			createConfig(c);
			createStructure();
			if (type.of(_data) == "string") {
				config.source = _data
			}
			VMM.Date.setLanguage(config.language);
			VMM.master_config.language = config.language;
			VMM.ExternalAPI.setKeys(config.api_keys);
			VMM.ExternalAPI.googlemaps.setMapType(config.maptype);
			VMM.bindEvent(global, onDataReady, config.events.data_ready);
			VMM.bindEvent(global, showMessege, config.events.messege);
			VMM.fireEvent(global, config.events.messege, config.language.messages.loading_timeline);
			if (VMM.Browser.browser == "Explorer" || VMM.Browser.browser == "MSIE") {
				if (parseInt(VMM.Browser.version, 10) <= 7 && (VMM.Browser.tridentVersion == null || VMM.Browser.tridentVersion < 4)) {
					ie7 = true
				}
			}
			if (type.of(config.source) == "string" || type.of(config.source) == "object") {
				VMM.Timeline.DataObj.getData(config.source)
			} else {
				VMM.fireEvent(global, config.events.messege, "No data source provided")
			}
		};
		this.iframeLoaded = function() {
			trace("iframeLoaded")
		};
		this.reload = function(_d) {
			trace("Load new timeline data" + _d);
			VMM.fireEvent(global, config.events.messege, config.language.messages.loading_timeline);
			data = {};
			VMM.Timeline.DataObj.getData(_d);
			config.current_slide = 0;
			slider.setSlide(0);
			timenav.setMarker(0, config.ease, config.duration)
		};

		function getData(url) {
			VMM.getJSON(url, function(d) {
				data = VMM.Timeline.DataObj.getData(d);
				VMM.fireEvent(global, config.events.data_ready)
			})
		}

		function showMessege(e, msg, other) {
			trace("showMessege " + msg);
			if (other) {
				VMM.attachElement($feedback, msg)
			} else {
				VMM.attachElement($feedback, VMM.MediaElement.loadingmessage(msg))
			}
		}

		function hideMessege() {
			VMM.Lib.animate($feedback, config.duration, config.ease * 4, {
				opacity: 0
			}, detachMessege)
		}

		function detachMessege() {
			VMM.Lib.detach($feedback)
		}

		function build() {
			if (parseInt(config.start_at_slide) > 0 && config.current_slide == 0) {
				config.current_slide = parseInt(config.start_at_slide)
			}
			if (config.start_at_end && config.current_slide == 0) {
				config.current_slide = _dates.length - 1
			}
			if (ie7) {
				ie7 = true;
				VMM.fireEvent(global, config.events.messege, "Internet Explorer " + VMM.Browser.version + " is not supported by TimelineJS. Please update your browser to version 8 or higher. If you are using a recent version of Internet Explorer you may need to disable compatibility mode in your browser.")
			} else {
				detachMessege();
				reSize();
				VMM.bindEvent($slider, onSliderLoaded, "LOADED");
				VMM.bindEvent($navigation, onTimeNavLoaded, "LOADED");
				VMM.bindEvent($slider, onSlideUpdate, "UPDATE");
				VMM.bindEvent($navigation, onMarkerUpdate, "UPDATE");
				slider.init(_dates);
				timenav.init(_dates, data.era, tree_data);
				VMM.bindEvent(global, reSize, config.events.resize)
			}
		}

		function updateSize() {
			trace("UPDATE SIZE");
			config.width = VMM.Lib.width($timeline);
			config.height = VMM.Lib.height($timeline);
			config.nav.width = config.width;
			config.feature.width = config.width;
			config.feature.height = config.height - config.nav.height - 3;
			if (VMM.Browser.device == "mobile") {}
			if (config.width < 641) {
				VMM.Lib.addClass($timeline, "vco-skinny")
			} else {
				VMM.Lib.removeClass($timeline, "vco-skinny")
			}
		}

		function buildDates() {
			_dates = [];
			VMM.fireEvent(global, config.events.messege, "Building Dates");
			updateSize();
			for (var i = 0; i < data.date.length; i++) {
				if (data.date[i].startDate != null && data.date[i].startDate != "") {
					var _date = {},
						do_start = VMM.Date.parse(data.date[i].startDate, true),
						do_end;
					_date.startdate = do_start.date;
					_date.precisiondate = do_start.precision;
					if (!isNaN(_date.startdate)) {
						if (data.date[i].endDate != null && data.date[i].endDate != "") {
							_date.enddate = VMM.Date.parse(data.date[i].endDate)
						} else {
							_date.enddate = _date.startdate
						}
						_date.needs_slug = false;
						if (data.date[i].headline == "") {
							if (data.date[i].slug != null && data.date[i].slug != "") {
								_date.needs_slug = true
							}
						}
						_date.title = data.date[i].headline;
						_date.headline = data.date[i].headline;
						_date.type = data.date[i].type;
						_date.priority = data.date[i].priority;
						_date.self_id = data.date[i].self_id;
						_date.parent_id = data.date[i].parent_id;
						_date.date = VMM.Date.prettyDate(_date.startdate, false, _date.precisiondate);
						_date.asset = data.date[i].asset;
						_date.fulldate = _date.startdate.getTime();
						_date.text = data.date[i].text;
						_date.content = "";
						_date.tag = data.date[i].tag;
						_date.slug = data.date[i].slug;
						_date.uniqueid = VMM.Util.unique_ID(7);
						_date.classname = data.date[i].classname;
						_dates.push(_date)
					}
				}
			}
			if (data.type != "storify") {
				_dates.sort(function(a, b) {
					return a.fulldate - b.fulldate
				})
			}
			if (data.headline != null && data.headline != "" && data.text != null && data.text != "") {
				var startpage_date, do_start, _date = {},
					td_num = 0,
					td;
				if (typeof data.startDate != "undefined") {
					do_start = VMM.Date.parse(data.startDate, true);
					startpage_date = do_start.date
				} else {
					startpage_date = false
				}
				trace("HAS STARTPAGE");
				trace(startpage_date);
				if (startpage_date && startpage_date < _dates[0].startdate) {
					_date.startdate = new Date(startpage_date)
				} else {
					td = _dates[0].startdate;
					_date.startdate = new Date(_dates[0].startdate);
					if (td.getMonth() === 0 && td.getDate() == 1 && td.getHours() === 0 && td.getMinutes() === 0) {
						_date.startdate.setFullYear(td.getFullYear() - 1)
					} else if (td.getDate() <= 1 && td.getHours() === 0 && td.getMinutes() === 0) {
						_date.startdate.setMonth(td.getMonth() - 1)
					} else if (td.getHours() === 0 && td.getMinutes() === 0) {
						_date.startdate.setDate(td.getDate() - 1)
					} else if (td.getMinutes() === 0) {
						_date.startdate.setHours(td.getHours() - 1)
					} else {
						_date.startdate.setMinutes(td.getMinutes() - 1)
					}
				}
				_date.uniqueid = VMM.Util.unique_ID(7);
				_date.enddate = _date.startdate;
				_date.precisiondate = do_start.precision;
				_date.title = data.headline;
				_date.headline = data.headline;
				_date.text = data.text;
				_date.type = "start";
				_date.date = VMM.Date.prettyDate(data.startDate, false, _date.precisiondate);
				_date.asset = data.asset;
				_date.slug = false;
				_date.needs_slug = false;
				_date.fulldate = _date.startdate.getTime();
				if (config.embed) {
					VMM.fireEvent(global, config.events.headline, _date.headline)
				}
				_dates.unshift(_date)
			}
			if (data.type != "storify") {
				_dates.sort(function(a, b) {
					return a.fulldate - b.fulldate
				})
			}
			onDatesProcessed()
		}
	};
	VMM.Timeline.Config = {}
}
if (typeof VMM.Timeline != "undefined" && typeof VMM.Timeline.TimeNav == "undefined") {
	VMM.Timeline.TimeNav = function(parent, content_width, content_height) {
		trace("VMM.Timeline.TimeNav");
		var $timenav, $content, $time, $timeintervalminor, $timeinterval, $timeintervalmajor, $timebackground, $timeintervalbackground, $timenavline, $timenavindicator, $timeintervalminor_minor, $toolbar, $zoomin, $zoomout, $dragslide, config = VMM.Timeline.Config,
			row_height, events = {},
			timespan = {},
			layout = parent,
			data = [],
			tree_data = {},
			era_markers = [],
			markers = [],
			interval_array = [],
			interval_major_array = [],
			tags = [],
			current_marker = 0,
			_active = false,
			eras, content, timeouts = {
				interval_position: ""
			},
			timenav_pos = {
				left: "",
				visible: {
					left: "",
					right: ""
				}
			},
			timelookup = {
				day: 24,
				month: 12,
				year: 10,
				hour: 60,
				minute: 60,
				second: 1e3,
				decade: 10,
				century: 100,
				millenium: 1e3,
				age: 1e6,
				epoch: 1e7,
				era: 1e8,
				eon: 5e8,
				week: 4.34812141,
				days_in_month: 30.4368499,
				days_in_week: 7,
				weeks_in_month: 4.34812141,
				weeks_in_year: 52.177457,
				days_in_year: 365.242199,
				hours_in_day: 24
			},
			dateFractionBrowser = {
				day: 864e5,
				week: 7,
				month: 30.4166666667,
				year: 12,
				hour: 24,
				minute: 1440,
				second: 86400,
				decade: 10,
				century: 100,
				millenium: 1e3,
				age: 1e6,
				epoch: 1e7,
				era: 1e8,
				eon: 5e8
			},
			interval = {
				type: "year",
				number: 10,
				first: 1970,
				last: 2011,
				multiplier: 100,
				classname: "_idd",
				interval_type: "interval"
			},
			interval_major = {
				type: "year",
				number: 10,
				first: 1970,
				last: 2011,
				multiplier: 100,
				classname: "major",
				interval_type: "interval major"
			},
			interval_macro = {
				type: "year",
				number: 10,
				first: 1970,
				last: 2011,
				multiplier: 100,
				classname: "_dd_minor",
				interval_type: "interval minor"
			},
			interval_calc = {
				day: {},
				month: {},
				year: {},
				hour: {},
				minute: {},
				second: {},
				decade: {},
				century: {},
				millenium: {},
				week: {},
				age: {},
				epoch: {},
				era: {},
				eon: {}
			};
		row_height = config.nav.marker.height / 2;
		config.nav.rows = {
			full: [1, row_height * 2, row_height * 4],
			half: [1, row_height, row_height * 2, row_height * 3, row_height * 4, row_height * 5],
			current: []
		};
		if (content_width != null && content_width != "") {
			config.nav.width = content_width
		}
		if (content_height != null && content_height != "") {
			config.nav.height = content_height
		}
		this.init = function(d, e, t) {
			trace("VMM.Timeline.TimeNav init");
			if (typeof d != "undefined") {
				this.setData(d, e, t)
			} else {
				trace("WAITING ON DATA")
			}
		};
		this.setData = function(d, e, t) {
			if (typeof d != "undefined") {
				data = {};
				data = d;
				eras = e;
				tree_data = t;
				build()
			} else {
				trace("NO DATA")
			}
		};
		this.setSize = function(w, h) {
			if (w != null) {
				config.width = w
			}
			if (h != null) {
				config.height = h
			}
			if (_active) {
				reSize()
			}
		};
		this.setMarker = function(n, ease, duration, fast) {
			goToMarker(n, ease, duration)
		};
		this.getCurrentNumber = function() {
			return current_marker
		};

		function onConfigSet() {
			trace("onConfigSet")
		}

		function reSize(firstrun) {
			config.nav.constraint.left = config.width / 2;
			config.nav.constraint.right = config.nav.constraint.right_min - config.width / 2;
			$dragslide.updateConstraint(config.nav.constraint);
			VMM.Lib.css($timenavline, "left", Math.round(config.width / 2) + 2);
			VMM.Lib.css($timenavindicator, "left", Math.round(config.width / 2) - 8);
			goToMarker(config.current_slide, config.ease, config.duration, true, firstrun)
		}

		function upDate() {
			VMM.fireEvent(layout, "UPDATE")
		}

		function onZoomIn() {
			console.log("in zoom in");
			$dragslide.cancelSlide();
			if (config.nav.multiplier.current > config.nav.multiplier.min) {
				if (config.nav.multiplier.current <= 1) {
					config.nav.multiplier.current = config.nav.multiplier.current - .25
				} else {
					if (config.nav.multiplier.current > 5) {
						if (config.nav.multiplier.current > 16) {
							config.nav.multiplier.current = Math.round(config.nav.multiplier.current - 10)
						} else {
							config.nav.multiplier.current = Math.round(config.nav.multiplier.current - 4)
						}
					} else {
						config.nav.multiplier.current = Math.round(config.nav.multiplier.current - 1)
					}
				}
				if (config.nav.multiplier.current <= 0) {
					config.nav.multiplier.current = config.nav.multiplier.min
				}
				refreshTimeline()
			}
		}

		function onZoomOut() {
			$dragslide.cancelSlide();
			if (config.nav.multiplier.current < config.nav.multiplier.max) {
				if (config.nav.multiplier.current > 4) {
					if (config.nav.multiplier.current > 16) {
						config.nav.multiplier.current = Math.round(config.nav.multiplier.current + 10)
					} else {
						config.nav.multiplier.current = Math.round(config.nav.multiplier.current + 4)
					}
				} else {
					config.nav.multiplier.current = Math.round(config.nav.multiplier.current + 1)
				}
				if (config.nav.multiplier.current >= config.nav.multiplier.max) {
					config.nav.multiplier.current = config.nav.multiplier.max
				}
				refreshTimeline()
			}
		}

		function onBackHome(e) {
			$dragslide.cancelSlide();
			goToMarker(0);
			upDate()
		}

		function onMouseScroll(e) {
			var delta = 0,
				scroll_to = 0;
			if (!e) {
				e = window.event
			}
			if (e.originalEvent) {
				e = e.originalEvent
			}
			if (typeof e.wheelDeltaX != "undefined") {
				delta = e.wheelDeltaY / 6;
				if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) {
					delta = e.wheelDeltaX / 6
				} else {
					delta = 0
				}
			}
			if (delta) {
				if (e.preventDefault) {
					e.preventDefault()
				}
				e.returnValue = false
			}
			scroll_to = VMM.Lib.position($timenav).left + delta;
			if (scroll_to > config.nav.constraint.left) {
				scroll_to = config.width / 2
			} else if (scroll_to < config.nav.constraint.right) {
				scroll_to = config.nav.constraint.right
			}
			VMM.Lib.css($timenav, "left", scroll_to)
		}

		function refreshTimeline() {
			trace("config.nav.multiplier " + config.nav.multiplier.current);
			positionMarkers(true);
			positionEras(true);
			positionInterval($timeinterval, interval_array, true, true);
			positionInterval($timeintervalmajor, interval_major_array, true);
			config.nav.constraint.left = config.width / 2;
			config.nav.constraint.right = config.nav.constraint.right_min - config.width / 2;
			$dragslide.updateConstraint(config.nav.constraint)
		}

		function onMarkerClick(e) {
			$dragslide.cancelSlide();
			goToMarker(e.data.number);
			upDate()
		}

		function onMarkerHover(e) {
			VMM.Lib.toggleClass(e.data.elem, "zFront")
		}

		function goToMarker(n, ease, duration, fast, firstrun) {
			trace("GO TO MARKER");
			var _ease = config.ease,
				_duration = config.duration,
				is_last = false,
				is_first = false;
			current_marker = n;
			timenav_pos.left = config.width / 2 - markers[current_marker].pos_left;
			timenav_pos.visible.left = Math.abs(timenav_pos.left) - 100;
			timenav_pos.visible.right = Math.abs(timenav_pos.left) + config.width + 100;
			if (current_marker == 0) {
				is_first = true
			}
			if (current_marker + 1 == markers.length) {
				is_last = true
			}
			if (ease != null && ease != "") {
				_ease = ease
			}
			if (duration != null && duration != "") {
				_duration = duration
			}
			for (var i = 0; i < markers.length; i++) {
				VMM.Lib.removeClass(markers[i].marker, "active");
				VMM.Lib.removeClass(markers[i].marker, "active-story");
			}
			if (config.start_page && markers[0].type == "start") {
				VMM.Lib.visible(markers[0].marker, false);
				VMM.Lib.addClass(markers[0].marker, "start")
			}
			VMM.Lib.addClass(markers[current_marker].marker, "active");
			markParents(current_marker);
			VMM.Lib.stop($timenav);
			VMM.Lib.animate($timenav, _duration, _ease, {
				left: timenav_pos.left
			})
		}

		function markParent(par) {
			for(var i = 0; i < markers.length; i++) {
				if (parseInt(markers[i].self_id) == par) {
					VMM.Lib.addClass(markers[i].marker, "active-story");
					if(parseInt(markers[i].parent_id) != 0) {
						markParent(parseInt(markers[i].parent_id));
					}
					break;
				}
			}
		}

		function markParents(n) {
			current_marker = n;
			var par = markers[current_marker].parent_id;
			// console.log("First parent is: " + par);
			markParent(par);
			// for(var i = 0; i < markers.length; i++) {
			// 	if (markers[i].parent_id.indexOf(markers[current_marker].parent_id) != -1) {
			// 		VMM.Lib.addClass(markers[i].marker, "active-story");
			// 	}
			// }
		}

		function findChildren(sid) {
			var children = [];
			for (var i = 1; i < markers.length; i++) {
				if(markers[i].parent_id == sid) {
					var dd = {};
					dd.name = markers[i].self_id;
					dd.children = arguments.callee(markers[i].self_id);
					children.push(dd);
				}
			}
			return children;
		}

		function hideSecondaryStories() {
			var stages_tmp = new Set();
			for(var i = 0; i < markers.length; i++) {
				stages_tmp.add(markers[i].priority);
			}
			var iter = stages_tmp.values();
			var stages = [];
			for(var i = 0; i < stages_tmp.size; i++) {
				stages.push(iter.next().value);
			}
			stages.sort();
			for(var i = 0; i < markers.length; i++) {
				if(i != 0 && markers[i].priority != stages[0]) {
					markers[i].show = false;
					console.log("hide");
					VMM.Lib.addClass(markers[i].marker, "hide-story");
				}
			}
		}

		function onTouchUpdate(e, b) {
			VMM.Lib.animate($timenav, b.time / 2, config.ease, {
				left: b.left
			})
		}

		function averageMarkerPositionDistance() {
			var last_pos = 0,
				pos = 0,
				pos_dif = 0,
				mp_diff = [],
				i = 0;
			for (i = 0; i < markers.length; i++) {
				if (data[i].type == "start") {} else {
					var _pos = positionOnTimeline(interval, markers[i].relative_pos),
						last_pos = pos;
					pos = _pos.begin;
					pos_dif = pos - last_pos;
					mp_diff.push(pos_dif)
				}
			}
			return VMM.Util.average(mp_diff).mean
		}

		function averageDateDistance() {
			var last_dd = 0,
				dd = 0,
				_dd = "",
				date_dif = 0,
				date_diffs = [],
				is_first_date = true,
				i = 0;
			for (i = 0; i < data.length; i++) {
				if (data[i].type == "start") {
					trace("DATA DATE IS START")
				} else {
					_dd = data[i].startdate;
					last_dd = dd;
					dd = _dd;
					date_dif = dd - last_dd;
					date_diffs.push(date_dif)
				}
			}
			return VMM.Util.average(date_diffs)
		}

		function calculateMultiplier() {
			var temp_multiplier = config.nav.multiplier.current,
				i = 0;
			for (i = 0; i < temp_multiplier; i++) {
				if (averageMarkerPositionDistance() < 75) {
					if (config.nav.multiplier.current > 1) {
						config.nav.multiplier.current = config.nav.multiplier.current - 1
					}
				}
			}
		}

		function calculateInterval() {
			var _first = getDateFractions(data[0].startdate),
				_last = getDateFractions(data[data.length - 1].enddate);
			interval_calc.eon.type = "eon";
			interval_calc.eon.first = _first.eons;
			interval_calc.eon.base = Math.floor(_first.eons);
			interval_calc.eon.last = _last.eons;
			interval_calc.eon.number = timespan.eons;
			interval_calc.eon.multiplier = timelookup.eons;
			interval_calc.eon.minor = timelookup.eons;
			interval_calc.era.type = "era";
			interval_calc.era.first = _first.eras;
			interval_calc.era.base = Math.floor(_first.eras);
			interval_calc.era.last = _last.eras;
			interval_calc.era.number = timespan.eras;
			interval_calc.era.multiplier = timelookup.eras;
			interval_calc.era.minor = timelookup.eras;
			interval_calc.epoch.type = "epoch";
			interval_calc.epoch.first = _first.epochs;
			interval_calc.epoch.base = Math.floor(_first.epochs);
			interval_calc.epoch.last = _last.epochs;
			interval_calc.epoch.number = timespan.epochs;
			interval_calc.epoch.multiplier = timelookup.epochs;
			interval_calc.epoch.minor = timelookup.epochs;
			interval_calc.age.type = "age";
			interval_calc.age.first = _first.ages;
			interval_calc.age.base = Math.floor(_first.ages);
			interval_calc.age.last = _last.ages;
			interval_calc.age.number = timespan.ages;
			interval_calc.age.multiplier = timelookup.ages;
			interval_calc.age.minor = timelookup.ages;
			interval_calc.millenium.type = "millenium";
			interval_calc.millenium.first = _first.milleniums;
			interval_calc.millenium.base = Math.floor(_first.milleniums);
			interval_calc.millenium.last = _last.milleniums;
			interval_calc.millenium.number = timespan.milleniums;
			interval_calc.millenium.multiplier = timelookup.millenium;
			interval_calc.millenium.minor = timelookup.millenium;
			interval_calc.century.type = "century";
			interval_calc.century.first = _first.centuries;
			interval_calc.century.base = Math.floor(_first.centuries);
			interval_calc.century.last = _last.centuries;
			interval_calc.century.number = timespan.centuries;
			interval_calc.century.multiplier = timelookup.century;
			interval_calc.century.minor = timelookup.century;
			interval_calc.decade.type = "decade";
			interval_calc.decade.first = _first.decades;
			interval_calc.decade.base = Math.floor(_first.decades);
			interval_calc.decade.last = _last.decades;
			interval_calc.decade.number = timespan.decades;
			interval_calc.decade.multiplier = timelookup.decade;
			interval_calc.decade.minor = timelookup.decade;
			interval_calc.year.type = "year";
			interval_calc.year.first = _first.years;
			interval_calc.year.base = Math.floor(_first.years);
			interval_calc.year.last = _last.years;
			interval_calc.year.number = timespan.years;
			interval_calc.year.multiplier = 1;
			interval_calc.year.minor = timelookup.month;
			interval_calc.month.type = "month";
			interval_calc.month.first = _first.months;
			interval_calc.month.base = Math.floor(_first.months);
			interval_calc.month.last = _last.months;
			interval_calc.month.number = timespan.months;
			interval_calc.month.multiplier = 1;
			interval_calc.month.minor = Math.round(timelookup.week);
			interval_calc.week.type = "week";
			interval_calc.week.first = _first.weeks;
			interval_calc.week.base = Math.floor(_first.weeks);
			interval_calc.week.last = _last.weeks;
			interval_calc.week.number = timespan.weeks;
			interval_calc.week.multiplier = 1;
			interval_calc.week.minor = 7;
			interval_calc.day.type = "day";
			interval_calc.day.first = _first.days;
			interval_calc.day.base = Math.floor(_first.days);
			interval_calc.day.last = _last.days;
			interval_calc.day.number = timespan.days;
			interval_calc.day.multiplier = 1;
			interval_calc.day.minor = 24;
			interval_calc.hour.type = "hour";
			interval_calc.hour.first = _first.hours;
			interval_calc.hour.base = Math.floor(_first.hours);
			interval_calc.hour.last = _last.hours;
			interval_calc.hour.number = timespan.hours;
			interval_calc.hour.multiplier = 1;
			interval_calc.hour.minor = 60;
			interval_calc.minute.type = "minute";
			interval_calc.minute.first = _first.minutes;
			interval_calc.minute.base = Math.floor(_first.minutes);
			interval_calc.minute.last = _last.minutes;
			interval_calc.minute.number = timespan.minutes;
			interval_calc.minute.multiplier = 1;
			interval_calc.minute.minor = 60;
			interval_calc.second.type = "decade";
			interval_calc.second.first = _first.seconds;
			interval_calc.second.base = Math.floor(_first.seconds);
			interval_calc.second.last = _last.seconds;
			interval_calc.second.number = timespan.seconds;
			interval_calc.second.multiplier = 1;
			interval_calc.second.minor = 10
		}

		function getDateFractions(the_date, is_utc) {
			var _time = {};
			_time.days = the_date / dateFractionBrowser.day;
			_time.weeks = _time.days / dateFractionBrowser.week;
			_time.months = _time.days / dateFractionBrowser.month;
			_time.years = _time.months / dateFractionBrowser.year;
			_time.hours = _time.days * dateFractionBrowser.hour;
			_time.minutes = _time.days * dateFractionBrowser.minute;
			_time.seconds = _time.days * dateFractionBrowser.second;
			_time.decades = _time.years / dateFractionBrowser.decade;
			_time.centuries = _time.years / dateFractionBrowser.century;
			_time.milleniums = _time.years / dateFractionBrowser.millenium;
			_time.ages = _time.years / dateFractionBrowser.age;
			_time.epochs = _time.years / dateFractionBrowser.epoch;
			_time.eras = _time.years / dateFractionBrowser.era;
			_time.eons = _time.years / dateFractionBrowser.eon;
			return _time
		}

		function positionRelative(_interval, first, last) {
			var _first, _last, _type = _interval.type,
				timerelative = {
					start: "",
					end: "",
					type: _type
				};
			_first = getDateFractions(first);
			timerelative.start = first.months;
			if (_type == "eon") {
				timerelative.start = _first.eons
			} else if (_type == "era") {
				timerelative.start = _first.eras
			} else if (_type == "epoch") {
				timerelative.start = _first.epochs
			} else if (_type == "age") {
				timerelative.start = _first.ages
			} else if (_type == "millenium") {
				timerelative.start = first.milleniums
			} else if (_type == "century") {
				timerelative.start = _first.centuries
			} else if (_type == "decade") {
				timerelative.start = _first.decades
			} else if (_type == "year") {
				timerelative.start = _first.years
			} else if (_type == "month") {
				timerelative.start = _first.months
			} else if (_type == "week") {
				timerelative.start = _first.weeks
			} else if (_type == "day") {
				timerelative.start = _first.days
			} else if (_type == "hour") {
				timerelative.start = _first.hours
			} else if (_type == "minute") {
				timerelative.start = _first.minutes
			}
			if (type.of(last) == "date") {
				_last = getDateFractions(last);
				timerelative.end = last.months;
				if (_type == "eon") {
					timerelative.end = _last.eons
				} else if (_type == "era") {
					timerelative.end = _last.eras
				} else if (_type == "epoch") {
					timerelative.end = _last.epochs
				} else if (_type == "age") {
					timerelative.end = _last.ages
				} else if (_type == "millenium") {
					timerelative.end = last.milleniums
				} else if (_type == "century") {
					timerelative.end = _last.centuries
				} else if (_type == "decade") {
					timerelative.end = _last.decades
				} else if (_type == "year") {
					timerelative.end = _last.years
				} else if (_type == "month") {
					timerelative.end = _last.months
				} else if (_type == "week") {
					timerelative.end = _last.weeks
				} else if (_type == "day") {
					timerelative.end = _last.days
				} else if (_type == "hour") {
					timerelative.end = _last.hours
				} else if (_type == "minute") {
					timerelative.end = _last.minutes
				}
			} else {
				timerelative.end = timerelative.start
			}
			return timerelative
		}

		function positionOnTimeline(the_interval, timerelative) {
			return {
				begin: (timerelative.start - interval.base) * (config.nav.interval_width / config.nav.multiplier.current),
				end: (timerelative.end - interval.base) * (config.nav.interval_width / config.nav.multiplier.current)
			}
		}

		function positionMarkers(is_animated) {
			var row = 2,
				previous_pos = 0,
				pos_offset = -2,
				row_depth = 0,
				row_depth_sub = 0,
				line_last_height_pos = 150,
				line_height = 6,
				cur_mark = 0,
				in_view_margin = config.width,
				pos_cache_array = [],
				pos_cache_max = 6,
				in_view = {
					left: timenav_pos.visible.left - in_view_margin,
					right: timenav_pos.visible.right + in_view_margin
				},
				i = 0,
				k = 0;
			config.nav.minor_width = config.width;
			VMM.Lib.removeClass(".flag", "row1");
			VMM.Lib.removeClass(".flag", "row2");
			VMM.Lib.removeClass(".flag", "row3");
			for (i = 0; i < markers.length; i++) {
				var line, marker = markers[i],
					pos = positionOnTimeline(interval, markers[i].relative_pos),
					row_pos = 0,
					is_in_view = false,
					pos_cache_obj = {
						id: i,
						pos: 0,
						row: 0
					},
					pos_cache_close = 0;
				pos.begin = Math.round(pos.begin + pos_offset);
				pos.end = Math.round(pos.end + pos_offset);
				line = Math.round(pos.end - pos.begin);
				marker.pos_left = pos.begin;
				if (current_marker == i) {
					timenav_pos.left = config.width / 2 - pos;
					timenav_pos.visible.left = Math.abs(timenav_pos.left);
					timenav_pos.visible.right = Math.abs(timenav_pos.left) + config.width;
					in_view.left = timenav_pos.visible.left - in_view_margin;
					in_view.right = timenav_pos.visible.right + in_view_margin
				}
				if (Math.abs(pos.begin) >= in_view.left && Math.abs(pos.begin) <= in_view.right) {
					is_in_view = true
				}
				if (is_animated) {
					VMM.Lib.stop(marker.marker);
					VMM.Lib.animate(marker.marker, config.duration / 2, config.ease, {
						left: pos.begin
					})
				} else {
					VMM.Lib.stop(marker.marker);
					VMM.Lib.css(marker.marker, "left", pos.begin)
				}
				if (i == current_marker) {
					cur_mark = pos.begin
				}
				if (line > 5) {
					VMM.Lib.css(marker.lineevent, "height", line_height);
					VMM.Lib.css(marker.lineevent, "top", line_last_height_pos);
					if (is_animated) {
						VMM.Lib.animate(marker.lineevent, config.duration / 2, config.ease, {
							width: line
						})
					} else {
						VMM.Lib.css(marker.lineevent, "width", line)
					}
				}
				if (tags.length > 0) {
					for (k = 0; k < tags.length; k++) {
						if (k < config.nav.rows.current.length) {
							if (marker.tag == tags[k]) {
								row = k;
								if (k == config.nav.rows.current.length - 1) {
									trace("ON LAST ROW");
									VMM.Lib.addClass(marker.flag, "flag-small-last")
								}
							}
						}
					}
					row_pos = config.nav.rows.current[row]
				} else {
					if (pos.begin - previous_pos.begin < config.nav.marker.width + config.spacing) {
						if (row < config.nav.rows.current.length - 1) {
							row++
						} else {
							row = 0;
							row_depth++
						}
					} else {
						row_depth = 1;
						row = 1
					}
					row_pos = config.nav.rows.current[row]
				}
				previous_pos = pos;
				pos_cache_obj.pos = pos;
				pos_cache_obj.row = row;
				pos_cache_array.push(pos_cache_obj);
				if (pos_cache_array.length > pos_cache_max) {
					VMM.Util.removeRange(pos_cache_array, 0)
				}
				if (is_animated) {
					VMM.Lib.stop(marker.flag);
					VMM.Lib.animate(marker.flag, config.duration, config.ease, {
						top: row_pos
					})
				} else {
					VMM.Lib.stop(marker.flag);
					VMM.Lib.css(marker.flag, "top", row_pos)
				}
				if (config.start_page && markers[i].type == "start") {
					VMM.Lib.visible(marker.marker, false)
				}
				if (pos > config.nav.minor_width) {
					config.nav.minor_width = pos
				}
				if (pos < config.nav.minor_left) {
					config.nav.minor_left = pos
				}
			}
			if (is_animated) {
				VMM.Lib.stop($timenav);
				VMM.Lib.animate($timenav, config.duration / 2, config.ease, {
					left: config.width / 2 - cur_mark
				})
			} else {}
		}

		function positionEras(is_animated) {
			var i = 0,
				p = 0;
			for (i = 0; i < era_markers.length; i++) {
				var era = era_markers[i],
					pos = positionOnTimeline(interval, era.relative_pos),
					row_pos = 0,
					row = 0,
					era_height = config.nav.marker.height * config.nav.rows.full.length,
					era_length = pos.end - pos.begin;
				if (era.tag != "") {
					era_height = config.nav.marker.height * config.nav.rows.full.length / config.nav.rows.current.length;
					for (p = 0; p < tags.length; p++) {
						if (p < config.nav.rows.current.length) {
							if (era.tag == tags[p]) {
								row = p
							}
						}
					}
					row_pos = config.nav.rows.current[row]
				} else {
					row_pos = -1
				}
				if (is_animated) {
					VMM.Lib.stop(era.content);
					VMM.Lib.stop(era.text_content);
					VMM.Lib.animate(era.content, config.duration / 2, config.ease, {
						top: row_pos,
						left: pos.begin,
						width: era_length,
						height: era_height
					});
					VMM.Lib.animate(era.text_content, config.duration / 2, config.ease, {
						left: pos.begin
					})
				} else {
					VMM.Lib.stop(era.content);
					VMM.Lib.stop(era.text_content);
					VMM.Lib.css(era.content, "left", pos.begin);
					VMM.Lib.css(era.content, "width", era_length);
					VMM.Lib.css(era.content, "height", era_height);
					VMM.Lib.css(era.content, "top", row_pos);
					VMM.Lib.css(era.text_content, "left", pos.begin)
				}
			}
		}

		function positionInterval(the_main_element, the_intervals, is_animated, is_minor) {
			var last_position = 0,
				last_position_major = 0,
				in_view_margin = config.width,
				in_view = {
					left: timenav_pos.visible.left - in_view_margin,
					right: timenav_pos.visible.right + in_view_margin
				};
			not_too_many = true, i = 0;
			config.nav.minor_left = 0;
			if (the_intervals.length > 100) {
				not_too_many = false;
				trace("TOO MANY " + the_intervals.length)
			}
			for (i = 0; i < the_intervals.length; i++) {
				var _interval = the_intervals[i].element,
					_interval_date = the_intervals[i].date,
					_interval_visible = the_intervals[i].visible,
					_pos = positionOnTimeline(interval, the_intervals[i].relative_pos),
					pos = _pos.begin,
					_animation = the_intervals[i].animation,
					is_visible = true,
					is_in_view = false,
					pos_offset = 50;
				_animation.pos = pos;
				_animation.animate = false;
				if (Math.abs(pos) >= in_view.left && Math.abs(pos) <= in_view.right) {
					is_in_view = true
				}
				if (true) {
					if (config.nav.multiplier.current > 16 && is_minor) {
						is_visible = false
					} else {
						if (pos - last_position < 65) {
							if (pos - last_position < 35) {
								if (i % 4 == 0) {
									if (pos == 0) {
										is_visible = false
									}
								} else {
									is_visible = false
								}
							} else {
								if (!VMM.Util.isEven(i)) {
									is_visible = false
								}
							}
						}
					}
					if (is_visible) {
						if (the_intervals[i].is_detached) {
							VMM.Lib.append(the_main_element, _interval);
							the_intervals[i].is_detached = false
						}
					} else {
						the_intervals[i].is_detached = true;
						VMM.Lib.detach(_interval)
					}
					if (_interval_visible) {
						if (!is_visible) {
							_animation.opacity = "0";
							if (is_animated && not_too_many) {
								_animation.animate = true
							}
							the_intervals[i].interval_visible = false
						} else {
							_animation.opacity = "100";
							if (is_animated && is_in_view) {
								_animation.animate = true
							}
						}
					} else {
						_animation.opacity = "100";
						if (is_visible) {
							if (is_animated && not_too_many) {
								_animation.animate = true
							} else {
								if (is_animated && is_in_view) {
									_animation.animate = true
								}
							}
							the_intervals[i].interval_visible = true
						} else {
							if (is_animated && not_too_many) {
								_animation.animate = true
							}
						}
					}
					last_position = pos;
					if (pos > config.nav.minor_width) {
						config.nav.minor_width = pos
					}
					if (pos < config.nav.minor_left) {
						config.nav.minor_left = pos
					}
				}
				if (_animation.animate) {
					VMM.Lib.animate(_interval, config.duration / 2, config.ease, {
						opacity: _animation.opacity,
						left: _animation.pos
					})
				} else {
					VMM.Lib.css(_interval, "opacity", _animation.opacity);
					VMM.Lib.css(_interval, "left", pos)
				}
			}
			config.nav.constraint.right_min = -config.nav.minor_width + config.width;
			config.nav.constraint.right = config.nav.constraint.right_min + config.width / 2;
			VMM.Lib.css($timeintervalminor_minor, "left", config.nav.minor_left - config.width / 2);
			VMM.Lib.width($timeintervalminor_minor, config.nav.minor_width + config.width + Math.abs(config.nav.minor_left))
		}

		function createIntervalElements(_interval, _array, _element_parent) {
			var inc_time = 0,
				_first_run = true,
				_last_pos = 0,
				_largest_pos = 0,
				_timezone_offset, _first_date, _last_date, int_number = Math.ceil(_interval.number) + 2,
				firefox = {
					flag: false,
					offset: 0
				},
				i = 0;
			VMM.attachElement(_element_parent, "");
			_interval.date = new Date(data[0].startdate.getFullYear(), 0, 1, 0, 0, 0);
			_timezone_offset = _interval.date.getTimezoneOffset();
			for (i = 0; i < int_number; i++) {
				trace(_interval.type);
				var _is_year = false,
					int_obj = {
						element: VMM.appendAndGetElement(_element_parent, "<div>", _interval.classname),
						date: new Date(data[0].startdate.getFullYear(), 0, 1, 0, 0, 0),
						visible: false,
						date_string: "",
						type: _interval.interval_type,
						relative_pos: 0,
						is_detached: false,
						animation: {
							animate: false,
							pos: "",
							opacity: "100"
						}
					};
				if (_interval.type == "eon") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 5e8) * 5e8
					}
					int_obj.date.setFullYear(_first_date + inc_time * 5e8);
					_is_year = true
				} else if (_interval.type == "era") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 1e8) * 1e8
					}
					int_obj.date.setFullYear(_first_date + inc_time * 1e8);
					_is_year = true
				} else if (_interval.type == "epoch") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 1e7) * 1e7
					}
					int_obj.date.setFullYear(_first_date + inc_time * 1e7);
					_is_year = true
				} else if (_interval.type == "age") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 1e6) * 1e6
					}
					int_obj.date.setFullYear(_first_date + inc_time * 1e6);
					_is_year = true
				} else if (_interval.type == "millenium") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 1e3) * 1e3
					}
					int_obj.date.setFullYear(_first_date + inc_time * 1e3);
					_is_year = true
				} else if (_interval.type == "century") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 100) * 100
					}
					int_obj.date.setFullYear(_first_date + inc_time * 100);
					_is_year = true
				} else if (_interval.type == "decade") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 10) * 10
					}
					int_obj.date.setFullYear(_first_date + inc_time * 10);
					_is_year = true
				} else if (_interval.type == "year") {
					if (_first_run) {
						_first_date = data[0].startdate.getFullYear()
					}
					int_obj.date.setFullYear(_first_date + inc_time);
					_is_year = true
				} else if (_interval.type == "month") {
					if (_first_run) {
						_first_date = data[0].startdate.getMonth()
					}
					int_obj.date.setMonth(_first_date + inc_time)
				} else if (_interval.type == "week") {
					if (_first_run) {
						_first_date = data[0].startdate.getMonth()
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(_first_date + inc_time * 7)
				} else if (_interval.type == "day") {
					if (_first_run) {
						_first_date = data[0].startdate.getDate()
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(_first_date + inc_time)
				} else if (_interval.type == "hour") {
					if (_first_run) {
						_first_date = data[0].startdate.getHours()
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(data[0].startdate.getDate());
					int_obj.date.setHours(_first_date + inc_time)
				} else if (_interval.type == "minute") {
					if (_first_run) {
						_first_date = data[0].startdate.getMinutes()
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(data[0].startdate.getDate());
					int_obj.date.setHours(data[0].startdate.getHours());
					int_obj.date.setMinutes(_first_date + inc_time)
				} else if (_interval.type == "second") {
					if (_first_run) {
						_first_date = data[0].startdate.getSeconds()
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(data[0].startdate.getDate());
					int_obj.date.setHours(data[0].startdate.getHours());
					int_obj.date.setMinutes(data[0].startdate.getMinutes());
					int_obj.date.setSeconds(_first_date + inc_time)
				} else if (_interval.type == "millisecond") {
					if (_first_run) {
						_first_date = data[0].startdate.getMilliseconds()
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(data[0].startdate.getDate());
					int_obj.date.setHours(data[0].startdate.getHours());
					int_obj.date.setMinutes(data[0].startdate.getMinutes());
					int_obj.date.setSeconds(data[0].startdate.getSeconds());
					int_obj.date.setMilliseconds(_first_date + inc_time)
				}
				if (VMM.Browser.browser == "Firefox") {
					if (int_obj.date.getFullYear() == "1970" && int_obj.date.getTimezoneOffset() != _timezone_offset) {
						trace("FIREFOX 1970 TIMEZONE OFFSET " + int_obj.date.getTimezoneOffset() + " SHOULD BE " + _timezone_offset);
						trace(_interval.type + " " + _interval.date);
						firefox.offset = int_obj.date.getTimezoneOffset() / 60;
						firefox.flag = true;
						int_obj.date.setHours(int_obj.date.getHours() + firefox.offset)
					} else if (firefox.flag) {
						firefox.flag = false;
						int_obj.date.setHours(int_obj.date.getHours() + firefox.offset);
						if (_is_year) {
							firefox.flag = true
						}
					}
				}
				if (_is_year) {
					if (int_obj.date.getFullYear() < 0) {
						int_obj.date_string = Math.abs(int_obj.date.getFullYear()).toString() + " B.C."
					} else {
						int_obj.date_string = int_obj.date.getFullYear()
					}
				} else {
					int_obj.date_string = VMM.Date.prettyDate(int_obj.date, true)
				}
				inc_time = inc_time + 1;
				_first_run = false;
				int_obj.relative_pos = positionRelative(interval, int_obj.date);
				_last_pos = int_obj.relative_pos.begin;
				if (int_obj.relative_pos.begin > _largest_pos) {
					_largest_pos = int_obj.relative_pos.begin
				}
				VMM.appendElement(int_obj.element, int_obj.date_string);
				VMM.Lib.css(int_obj.element, "text-indent", -(VMM.Lib.width(int_obj.element) / 2));
				VMM.Lib.css(int_obj.element, "opacity", "0");
				_array.push(int_obj)
			}
			VMM.Lib.width($timeintervalminor_minor, _largest_pos);
			positionInterval(_element_parent, _array)
		}

		function build() {
			var i = 0,
				j = 0;
			VMM.attachElement(layout, "");
			$timenav = VMM.appendAndGetElement(layout, "<div>", "timenav");
			$content = VMM.appendAndGetElement($timenav, "<div>", "content");
			$time = VMM.appendAndGetElement($timenav, "<div>", "time");
			$timeintervalminor = VMM.appendAndGetElement($time, "<div>", "time-interval-minor");
			$timeintervalminor_minor = VMM.appendAndGetElement($timeintervalminor, "<div>", "minor");
			$timeintervalmajor = VMM.appendAndGetElement($time, "<div>", "time-interval-major");
			$timeinterval = VMM.appendAndGetElement($time, "<div>", "time-interval");
			$timebackground = VMM.appendAndGetElement(layout, "<div>", "timenav-background");
			$timenavline = VMM.appendAndGetElement($timebackground, "<div>", "timenav-line");
			$timenavindicator = VMM.appendAndGetElement($timebackground, "<div>", "timenav-indicator");
			$timeintervalbackground = VMM.appendAndGetElement($timebackground, "<div>", "timenav-interval-background", "<div class='top-highlight'></div>");
			$toolbar = VMM.appendAndGetElement(layout, "<div>", "vco-toolbar");
			buildInterval();
			buildMarkers();
			buildEras();
			calculateMultiplier();
			positionMarkers(false);
			positionEras();
			positionInterval($timeinterval, interval_array, false, true);
			positionInterval($timeintervalmajor, interval_major_array);
			if (config.start_page) {
				$backhome = VMM.appendAndGetElement($toolbar, "<div>", "back-home", "<div class='icon'></div>");
				VMM.bindEvent(".back-home", onBackHome, "click");
				VMM.Lib.attribute($backhome, "title", VMM.master_config.language.messages.return_to_title);
				VMM.Lib.attribute($backhome, "rel", "timeline-tooltip")
			}
			$dragslide = new VMM.DragSlider;
			$dragslide.createPanel(layout, $timenav, config.nav.constraint, config.touch);
			if (config.touch && config.start_page) {
				VMM.Lib.addClass($toolbar, "touch");
				VMM.Lib.css($toolbar, "top", 55);
				VMM.Lib.css($toolbar, "left", 10)
			} else {
				if (config.start_page) {
					VMM.Lib.css($toolbar, "top", 27)
				}
				$zoomin = VMM.appendAndGetElement($toolbar, "<div>", "zoom-in", "<div class='icon'></div>");
				$zoomout = VMM.appendAndGetElement($toolbar, "<div>", "zoom-out", "<div class='icon'></div>");
				VMM.bindEvent($zoomin, onZoomIn, "click");
				VMM.bindEvent($zoomout, onZoomOut, "click");
				VMM.Lib.attribute($zoomin, "title", VMM.master_config.language.messages.expand_timeline);
				VMM.Lib.attribute($zoomin, "rel", "timeline-tooltip");
				VMM.Lib.attribute($zoomout, "title", VMM.master_config.language.messages.contract_timeline);
				VMM.Lib.attribute($zoomout, "rel", "timeline-tooltip");
				$toolbar.tooltip({
					selector: "div[rel=timeline-tooltip]",
					placement: "right"
				});
				VMM.bindEvent(layout, onMouseScroll, "DOMMouseScroll");
				VMM.bindEvent(layout, onMouseScroll, "mousewheel")
			}
			if (config.nav.zoom.adjust != 0) {
				if (config.nav.zoom.adjust < 0) {
					for (i = 0; i < Math.abs(config.nav.zoom.adjust); i++) {
						onZoomOut()
					}
				} else {
					for (j = 0; j < config.nav.zoom.adjust; j++) {
						onZoomIn()
					}
				}
			}
			_active = true;
			reSize(true);
			VMM.fireEvent(layout, "LOADED")
		}

		function buildInterval() {
			var i = 0,
				j = 0;
			timespan = getDateFractions(data[data.length - 1].enddate - data[0].startdate, true);
			trace(timespan);
			calculateInterval();
			if (timespan.centuries > data.length / config.nav.density) {
				interval = interval_calc.century;
				interval_major = interval_calc.millenium;
				interval_macro = interval_calc.decade
			} else if (timespan.decades > data.length / config.nav.density) {
				interval = interval_calc.decade;
				interval_major = interval_calc.century;
				interval_macro = interval_calc.year
			} else if (timespan.years > data.length / config.nav.density) {
				interval = interval_calc.year;
				interval_major = interval_calc.decade;
				interval_macro = interval_calc.month
			} else if (timespan.months > data.length / config.nav.density) {
				interval = interval_calc.month;
				interval_major = interval_calc.year;
				interval_macro = interval_calc.day
			} else if (timespan.days > data.length / config.nav.density) {
				interval = interval_calc.day;
				interval_major = interval_calc.month;
				interval_macro = interval_calc.hour
			} else if (timespan.hours > data.length / config.nav.density) {
				interval = interval_calc.hour;
				interval_major = interval_calc.day;
				interval_macro = interval_calc.minute
			} else if (timespan.minutes > data.length / config.nav.density) {
				interval = interval_calc.minute;
				interval_major = interval_calc.hour;
				interval_macro = interval_calc.second
			} else if (timespan.seconds > data.length / config.nav.density) {
				interval = interval_calc.second;
				interval_major = interval_calc.minute;
				interval_macro = interval_calc.second
			} else {
				trace("NO IDEA WHAT THE TYPE SHOULD BE");
				interval = interval_calc.day;
				interval_major = interval_calc.month;
				interval_macro = interval_calc.hour
			}
			trace("INTERVAL TYPE: " + interval.type);
			trace("INTERVAL MAJOR TYPE: " + interval_major.type);
			createIntervalElements(interval, interval_array, $timeinterval);
			createIntervalElements(interval_major, interval_major_array, $timeintervalmajor);
			for (i = 0; i < interval_array.length; i++) {
				for (j = 0; j < interval_major_array.length; j++) {
					if (interval_array[i].date_string == interval_major_array[j].date_string) {
						VMM.attachElement(interval_array[i].element, "")
					}
				}
			}
		}

		function buildMarkers() {
			var row = 2,
				lpos = 0,
				row_depth = 0,
				i = 0,
				k = 0,
				l = 0;
			markers = [];
			era_markers = [];
			for (i = 0; i < data.length; i++) {
				var _marker, _marker_parent, _marker_flag, _marker_content, _marker_dot, _marker_line, _marker_line_event, _marker_obj, _marker_title = "",
					has_title = false;
				_marker = VMM.appendAndGetElement($content, "<div>", "marker");
				_marker_self = data[i].self_id;
				_marker_parent = VMM.addParentNumber(_marker, data[i].parent_id);
				// _marker_parent = _marker_parent.split(',');
				// console.log(_marker_parent);
				_marker_flag = VMM.appendAndGetElement(_marker, "<div>", "flag");
				_marker_content = VMM.appendAndGetElement(_marker_flag, "<div>", "flag-content");
				_marker_dot = VMM.appendAndGetElement(_marker, "<div>", "dot");
				_marker_line = VMM.appendAndGetElement(_marker, "<div>", "line");
				_marker_line_event = VMM.appendAndGetElement(_marker_line, "<div>", "event-line");
				_marker_relative_pos = positionRelative(interval, data[i].startdate, data[i].enddate);
				_marker_thumb = "";
				if (data[i].asset != null && data[i].asset != "") {
					VMM.appendElement(_marker_content, VMM.MediaElement.thumbnail(data[i].asset, 24, 24, data[i].uniqueid))
				} else {
					VMM.appendElement(_marker_content, "<div style='margin-right:7px;height:50px;width:2px;float:left;'></div>")
				}
				if (data[i].title == "" || data[i].title == " ") {
					trace("TITLE NOTHING");
					if (typeof data[i].slug != "undefined" && data[i].slug != "") {
						trace("SLUG");
						_marker_title = VMM.Util.untagify(data[i].slug);
						has_title = true
					} else {
						var m = VMM.MediaType(data[i].asset.media);
						if (m.type == "quote" || m.type == "unknown") {
							_marker_title = VMM.Util.untagify(m.id);
							has_title = true
						} else {
							has_title = false
						}
					}
				} else if (data[i].title != "" || data[i].title != " ") {
					trace(data[i].title);
					_marker_title = VMM.Util.untagify(data[i].title);
					has_title = true
				} else {
					trace("TITLE SLUG NOT FOUND " + data[i].slug)
				}
				if (has_title) {
					VMM.appendElement(_marker_content, "<h3>" + _marker_title + "</h3>")
				} else {
					VMM.appendElement(_marker_content, "<h3>" + _marker_title + "</h3>");
					VMM.appendElement(_marker_content, "<h3 id='marker_content_" + data[i].uniqueid + "'>" + _marker_title + "</h3>")
				}
				VMM.Lib.attr(_marker, "id", ("marker_" + data[i].uniqueid).toString());
				VMM.bindEvent(_marker_flag, onMarkerClick, "", {
					number: i
				});
				VMM.bindEvent(_marker_flag, onMarkerHover, "mouseenter mouseleave", {
					number: i,
					elem: _marker_flag
				});
				_marker_obj = {
					marker: _marker,
					priority: data[i].priority,
					show: true,
					self_id: _marker_self,
					parent_id: _marker_parent,
					flag: _marker_flag,
					lineevent: _marker_line_event,
					type: "marker",
					full: true,
					relative_pos: _marker_relative_pos,
					tag: data[i].tag,
					pos_left: 0
				};
				if (data[i].type == "start") {
					trace("BUILD MARKER HAS START PAGE");
					config.start_page = true;
					_marker_obj.type = "start"
				}
				if (data[i].type == "storify") {
					_marker_obj.type = "storify"
				}
				if (data[i].tag) {
					tags.push(data[i].tag)
				}
				markers.push(_marker_obj)
			}
			// building tree json
			// console.log(markers);
			// var tree_data = {};
			// tree_data.name = 'Root';
			// tree_data.children = findChildren("0");
			main_tree_data = tree_data;
			createChart(main_tree_data);
			// hideSecondaryStories();
			tags = VMM.Util.deDupeArray(tags);
			config.tagSortFunction(tags);
			if (tags.length > 3) {
				config.nav.rows.current = config.nav.rows.half
			} else {
				config.nav.rows.current = config.nav.rows.full
			}
			for (k = 0; k < tags.length; k++) {
				if (k < config.nav.rows.current.length) {
					var tag_element = VMM.appendAndGetElement($timebackground, "<div>", "timenav-tag");
					VMM.Lib.addClass(tag_element, "timenav-tag-row-" + (k + 1));
					if (tags.length > 3) {
						VMM.Lib.addClass(tag_element, "timenav-tag-size-half")
					} else {
						VMM.Lib.addClass(tag_element, "timenav-tag-size-full")
					}
					VMM.appendElement(tag_element, "<div><h3>" + tags[k] + "</h3></div>")
				}
			}
			if (tags.length > 3) {
				for (l = 0; l < markers.length; l++) {
					VMM.Lib.addClass(markers[l].flag, "flag-small");
					markers[l].full = false
				}
			}
		}

		function buildEras() {
			var number_of_colors = 6,
				current_color = 0,
				j = 0;
			for (j = 0; j < eras.length; j++) {
				var era = {
						content: VMM.appendAndGetElement($content, "<div>", "era"),
						text_content: VMM.appendAndGetElement($timeinterval, "<div>", "era"),
						startdate: VMM.Date.parse(eras[j].startDate),
						enddate: VMM.Date.parse(eras[j].endDate),
						title: eras[j].headline,
						uniqueid: VMM.Util.unique_ID(6),
						tag: "",
						relative_pos: ""
					},
					st = VMM.Date.prettyDate(era.startdate),
					en = VMM.Date.prettyDate(era.enddate),
					era_text = "<div>&nbsp;</div>";
				if (typeof eras[j].tag != "undefined") {
					era.tag = eras[j].tag
				}
				era.relative_pos = positionRelative(interval, era.startdate, era.enddate);
				VMM.Lib.attr(era.content, "id", era.uniqueid);
				VMM.Lib.attr(era.text_content, "id", era.uniqueid + "_text");
				VMM.Lib.addClass(era.content, "era" + (current_color + 1));
				VMM.Lib.addClass(era.text_content, "era" + (current_color + 1));
				if (current_color < number_of_colors) {
					current_color++
				} else {
					current_color = 0
				}
				VMM.appendElement(era.content, era_text);
				VMM.appendElement(era.text_content, VMM.Util.unlinkify(era.title));
				era_markers.push(era)
			}
		}
	}
}
if (typeof VMM.Timeline !== "undefined" && typeof VMM.Timeline.DataObj == "undefined") {
	VMM.Timeline.DataObj = {
		data_obj: {},
		model_array: [],
		getData: function(raw_data) {
			VMM.Timeline.DataObj.data_obj = {};
			VMM.fireEvent(global, VMM.Timeline.Config.events.messege, VMM.Timeline.Config.language.messages.loading_timeline);
			if (type.of(raw_data) == "object") {
				trace("DATA SOURCE: JSON OBJECT");
				VMM.Timeline.DataObj.parseJSON(raw_data)
			} else if (type.of(raw_data) == "string") {
				if (raw_data.match("%23")) {
					trace("DATA SOURCE: TWITTER SEARCH");
					VMM.Timeline.DataObj.model.tweets.getData("%23medill")
				} else if (raw_data.match("spreadsheet")) {
					trace("DATA SOURCE: GOOGLE SPREADSHEET");
					VMM.Timeline.DataObj.model.googlespreadsheet.getData(raw_data)
				} else if (raw_data.match("storify.com")) {
					trace("DATA SOURCE: STORIFY");
					VMM.Timeline.DataObj.model.storify.getData(raw_data)
				} else if (raw_data.match(".jsonp")) {
					trace("DATA SOURCE: JSONP");
					LoadLib.js(raw_data, VMM.Timeline.DataObj.onJSONPLoaded)
				} else {
					trace("DATA SOURCE: JSON");
					var req = "";
					if (raw_data.indexOf("?") > -1) {
						req = raw_data + "&callback=onJSONP_Data"
					} else {
						req = raw_data + "?callback=onJSONP_Data"
					}
					VMM.getJSON(req, VMM.Timeline.DataObj.parseJSON)
				}
			} else if (type.of(raw_data) == "html") {
				trace("DATA SOURCE: HTML");
				VMM.Timeline.DataObj.parseHTML(raw_data)
			} else {
				trace("DATA SOURCE: UNKNOWN")
			}
		},
		onJSONPLoaded: function() {
			trace("JSONP IS LOADED");
			VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, storyjs_jsonp_data)
		},
		parseHTML: function(d) {
			trace("parseHTML");
			trace("WARNING: THIS IS STILL ALPHA AND WILL NOT WORK WITH ID's other than #timeline");
			var _data_obj = VMM.Timeline.DataObj.data_template_obj;
			if (VMM.Lib.find("#timeline section", "time")[0]) {
				_data_obj.timeline.startDate = VMM.Lib.html(VMM.Lib.find("#timeline section", "time")[0]);
				_data_obj.timeline.headline = VMM.Lib.html(VMM.Lib.find("#timeline section", "h2"));
				_data_obj.timeline.text = VMM.Lib.html(VMM.Lib.find("#timeline section", "article"));
				var found_main_media = false;
				if (VMM.Lib.find("#timeline section", "figure img").length != 0) {
					found_main_media = true;
					_data_obj.timeline.asset.media = VMM.Lib.attr(VMM.Lib.find("#timeline section", "figure img"), "src")
				} else if (VMM.Lib.find("#timeline section", "figure a").length != 0) {
					found_main_media = true;
					_data_obj.timeline.asset.media = VMM.Lib.attr(VMM.Lib.find("#timeline section", "figure a"), "href")
				} else {}
				if (found_main_media) {
					if (VMM.Lib.find("#timeline section", "cite").length != 0) {
						_data_obj.timeline.asset.credit = VMM.Lib.html(VMM.Lib.find("#timeline section", "cite"))
					}
					if (VMM.Lib.find(this, "figcaption").length != 0) {
						_data_obj.timeline.asset.caption = VMM.Lib.html(VMM.Lib.find("#timeline section", "figcaption"))
					}
				}
			}
			VMM.Lib.each("#timeline li", function(i, elem) {
				var valid_date = false;
				var _date = {
					type: "default",
					startDate: "",
					headline: "",
					text: "",
					asset: {
						media: "",
						credit: "",
						caption: ""
					},
					tags: "Optional"
				};
				if (VMM.Lib.find(this, "time") != 0) {
					valid_date = true;
					_date.startDate = VMM.Lib.html(VMM.Lib.find(this, "time")[0]);
					if (VMM.Lib.find(this, "time")[1]) {
						_date.endDate = VMM.Lib.html(VMM.Lib.find(this, "time")[1])
					}
					_date.headline = VMM.Lib.html(VMM.Lib.find(this, "h3"));
					_date.text = VMM.Lib.html(VMM.Lib.find(this, "article"));
					var found_media = false;
					if (VMM.Lib.find(this, "figure img").length != 0) {
						found_media = true;
						_date.asset.media = VMM.Lib.attr(VMM.Lib.find(this, "figure img"), "src")
					} else if (VMM.Lib.find(this, "figure a").length != 0) {
						found_media = true;
						_date.asset.media = VMM.Lib.attr(VMM.Lib.find(this, "figure a"), "href")
					} else {}
					if (found_media) {
						if (VMM.Lib.find(this, "cite").length != 0) {
							_date.asset.credit = VMM.Lib.html(VMM.Lib.find(this, "cite"))
						}
						if (VMM.Lib.find(this, "figcaption").length != 0) {
							_date.asset.caption = VMM.Lib.html(VMM.Lib.find(this, "figcaption"))
						}
					}
					trace(_date);
					_data_obj.timeline.date.push(_date)
				}
			});
			VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, _data_obj)
		},
		parseJSON: function(d) {
			trace("parseJSON");
			if (d.timeline.type == "default") {
				trace("DATA SOURCE: JSON STANDARD TIMELINE");
				// console.log("parseJSON");
				VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, d)
			} else if (d.timeline.type == "story") {
				trace("DATA SOURCE: JSON Story TIMELINE");
				VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, d)
			} else if (d.timeline.type == "twitter") {
				trace("DATA SOURCE: JSON TWEETS");
				VMM.Timeline.DataObj.model_Tweets.buildData(d)
			} else {
				trace("DATA SOURCE: UNKNOWN JSON");
				trace(type.of(d.timeline))
			}
		},
		model: {
			googlespreadsheet: {
				extractSpreadsheetKey: function(url) {
					var key = VMM.Util.getUrlVars(url)["key"];
					if (!key) {
						if (url.match("docs.google.com/spreadsheets/d/")) {
							var pos = url.indexOf("docs.google.com/spreadsheets/d/") + "docs.google.com/spreadsheets/d/".length;
							var tail = url.substr(pos);
							key = tail.split("/")[0]
						}
					}
					if (!key) {
						key = url
					}
					return key
				},
				getData: function(raw) {
					var getjsondata, key, worksheet, url, timeout, tries = 0;
					key = VMM.Timeline.DataObj.model.googlespreadsheet.extractSpreadsheetKey(raw);
					worksheet = VMM.Util.getUrlVars(raw)["worksheet"];
					if (typeof worksheet == "undefined") worksheet = "1";
					url = "https://spreadsheets.google.com/feeds/list/" + key + "/" + worksheet + "/public/values?alt=json";
					timeout = setTimeout(function() {
						trace("Google Docs timeout " + url);
						trace(url);
						if (tries < 3) {
							VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Still waiting on Google Docs, trying again " + tries);
							tries++;
							getjsondata.abort();
							requestJsonData()
						} else {
							VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Google Docs is not responding")
						}
					}, 16e3);

					function requestJsonData() {
						getjsondata = VMM.getJSON(url, function(d) {
							clearTimeout(timeout);
							VMM.Timeline.DataObj.model.googlespreadsheet.buildData(d)
						}).error(function(jqXHR, textStatus, errorThrown) {
							if (jqXHR.status == 400) {
								VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Error reading Google spreadsheet. Check the URL and make sure it's published to the web.");
								clearTimeout(timeout);
								return
							}
							trace("Google Docs ERROR");
							trace("Google Docs ERROR: " + textStatus + " " + jqXHR.responseText)
						}).success(function(d) {
							clearTimeout(timeout)
						})
					}
					requestJsonData()
				},
				buildData: function(d) {
					var data_obj = VMM.Timeline.DataObj.data_template_obj,
						is_valid = false;
					VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Parsing Google Doc Data");

					function getGVar(v) {
						if (typeof v != "undefined") {
							return v.$t
						} else {
							return ""
						}
					}
					if (typeof d.feed.entry == "undefined") {
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Error parsing spreadsheet. Make sure you have no blank rows and that the headers have not been changed.")
					} else {
						is_valid = true;
						for (var i = 0; i < d.feed.entry.length; i++) {
							var dd = d.feed.entry[i],
								dd_type = "";
							if (typeof dd.gsx$startdate == "undefined") {
								VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Missing start date. Make sure the headers of your Google Spreadsheet have not been changed.");
								return
							}
							if (typeof dd.gsx$type != "undefined") {
								dd_type = dd.gsx$type.$t
							} else if (typeof dd.gsx$titleslide != "undefined") {
								dd_type = dd.gsx$titleslide.$t
							}
							if (dd_type.match("start") || dd_type.match("title")) {
								data_obj.timeline.startDate = getGVar(dd.gsx$startdate);
								data_obj.timeline.headline = getGVar(dd.gsx$headline);
								data_obj.timeline.asset.media = getGVar(dd.gsx$media);
								data_obj.timeline.asset.caption = getGVar(dd.gsx$mediacaption);
								data_obj.timeline.asset.credit = getGVar(dd.gsx$mediacredit);
								data_obj.timeline.text = getGVar(dd.gsx$text);
								data_obj.timeline.type = "google spreadsheet"
							} else if (dd_type.match("era")) {
								var era = {
									startDate: getGVar(dd.gsx$startdate),
									endDate: getGVar(dd.gsx$enddate),
									headline: getGVar(dd.gsx$headline),
									text: getGVar(dd.gsx$text),
									tag: getGVar(dd.gsx$tag)
								};
								data_obj.timeline.era.push(era)
							} else {
								var date = {
									type: "google spreadsheet",
									startDate: getGVar(dd.gsx$startdate),
									endDate: getGVar(dd.gsx$enddate),
									headline: getGVar(dd.gsx$headline),
									text: getGVar(dd.gsx$text),
									tag: getGVar(dd.gsx$tag),
									asset: {
										media: getGVar(dd.gsx$media),
										credit: getGVar(dd.gsx$mediacredit),
										caption: getGVar(dd.gsx$mediacaption),
										thumbnail: getGVar(dd.gsx$mediathumbnail)
									}
								};
								data_obj.timeline.date.push(date)
							}
						}
					}
					if (is_valid) {
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Finished Parsing Data");
						VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, data_obj)
					} else {
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, VMM.Language.messages.loading + " Google Doc Data (cells)");
						trace("There may be too many entries. Still trying to load data. Now trying to load cells to avoid Googles limitation on cells");
						VMM.Timeline.DataObj.model.googlespreadsheet.getDataCells(d.feed.link[0].href)
					}
				},
				getDataCells: function(raw) {
					var getjsondata, key, url, timeout, tries = 0;
					key = VMM.Timeline.DataObj.model.googlespreadsheet.extractSpreadsheetKey(raw);
					url = "https://spreadsheets.google.com/feeds/cells/" + key + "/od6/public/values?alt=json";
					timeout = setTimeout(function() {
						trace("Google Docs timeout " + url);
						trace(url);
						if (tries < 3) {
							VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Still waiting on Google Docs, trying again " + tries);
							tries++;
							getjsondata.abort();
							requestJsonData()
						} else {
							VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Google Docs is not responding")
						}
					}, 16e3);

					function requestJsonData() {
						getjsondata = VMM.getJSON(url, function(d) {
							clearTimeout(timeout);
							VMM.Timeline.DataObj.model.googlespreadsheet.buildDataCells(d)
						}).error(function(jqXHR, textStatus, errorThrown) {
							trace("Google Docs ERROR");
							trace("Google Docs ERROR: " + textStatus + " " + jqXHR.responseText)
						}).success(function(d) {
							clearTimeout(timeout)
						})
					}
					requestJsonData()
				},
				buildDataCells: function(d) {
					var data_obj = VMM.Timeline.DataObj.data_template_obj,
						is_valid = false,
						cellnames = ["timeline"],
						list = [],
						max_row = 0,
						i = 0,
						k = 0;
					VMM.fireEvent(global, VMM.Timeline.Config.events.messege, VMM.Language.messages.loading_timeline + " Parsing Google Doc Data (cells)");

					function getGVar(v) {
						if (typeof v != "undefined") {
							return v.$t
						} else {
							return ""
						}
					}
					if (typeof d.feed.entry != "undefined") {
						is_valid = true;
						for (i = 0; i < d.feed.entry.length; i++) {
							var dd = d.feed.entry[i];
							if (parseInt(dd.gs$cell.row) > max_row) {
								max_row = parseInt(dd.gs$cell.row)
							}
						}
						for (var i = 0; i < max_row + 1; i++) {
							var date = {
								type: "",
								startDate: "",
								endDate: "",
								headline: "",
								text: "",
								tag: "",
								asset: {
									media: "",
									credit: "",
									caption: "",
									thumbnail: ""
								}
							};
							list.push(date)
						}
						for (i = 0; i < d.feed.entry.length; i++) {
							var dd = d.feed.entry[i],
								dd_type = "",
								column_name = "",
								cell = {
									content: getGVar(dd.gs$cell),
									col: dd.gs$cell.col,
									row: dd.gs$cell.row,
									name: ""
								};
							if (cell.row == 1) {
								if (cell.content == "Start Date") {
									column_name = "startDate"
								} else if (cell.content == "End Date") {
									column_name = "endDate"
								} else if (cell.content == "Headline") {
									column_name = "headline"
								} else if (cell.content == "Text") {
									column_name = "text"
								} else if (cell.content == "Media") {
									column_name = "media"
								} else if (cell.content == "Media Credit") {
									column_name = "credit"
								} else if (cell.content == "Media Caption") {
									column_name = "caption"
								} else if (cell.content == "Media Thumbnail") {
									column_name = "thumbnail"
								} else if (cell.content == "Type") {
									column_name = "type"
								} else if (cell.content == "Tag") {
									column_name = "tag"
								}
								cellnames.push(column_name)
							} else {
								cell.name = cellnames[cell.col];
								list[cell.row][cell.name] = cell.content
							}
						}
						for (i = 0; i < list.length; i++) {
							var date = list[i];
							if (date.type.match("start") || date.type.match("title")) {
								data_obj.timeline.startDate = date.startDate;
								data_obj.timeline.headline = date.headline;
								data_obj.timeline.asset.media = date.media;
								data_obj.timeline.asset.caption = date.caption;
								data_obj.timeline.asset.credit = date.credit;
								data_obj.timeline.text = date.text;
								data_obj.timeline.type = "google spreadsheet"
							} else if (date.type.match("era")) {
								var era = {
									startDate: date.startDate,
									endDate: date.endDate,
									headline: date.headline,
									text: date.text,
									tag: date.tag
								};
								data_obj.timeline.era.push(era)
							} else {
								if (date.startDate) {
									var date = {
										type: "google spreadsheet",
										startDate: date.startDate,
										endDate: date.endDate,
										headline: date.headline,
										text: date.text,
										tag: date.tag,
										asset: {
											media: date.media,
											credit: date.credit,
											caption: date.caption,
											thumbnail: date.thumbnail
										}
									};
									data_obj.timeline.date.push(date)
								} else {
									trace("Skipping item " + i + " in list: no start date.")
								}
							}
						}
					}
					is_valid = data_obj.timeline.date.length > 0;
					if (is_valid) {
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Finished Parsing Data");
						VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, data_obj)
					} else {
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Unable to load Google Doc data source. Make sure you have no blank rows and that the headers have not been changed.")
					}
				}
			},
			storify: {
				getData: function(raw) {
					var key, url, storify_timeout;
					VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Loading Storify...");
					key = raw.split("storify.com/")[1];
					url = "//api.storify.com/v1/stories/" + key + "?per_page=300&callback=?";
					storify_timeout = setTimeout(function() {
						trace("STORIFY timeout");
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Storify is not responding")
					}, 6e3);
					VMM.getJSON(url, VMM.Timeline.DataObj.model.storify.buildData).error(function(jqXHR, textStatus, errorThrown) {
						trace("STORIFY error");
						trace("STORIFY ERROR: " + textStatus + " " + jqXHR.responseText)
					}).success(function(d) {
						clearTimeout(storify_timeout)
					})
				},
				buildData: function(d) {
					VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Parsing Data");
					var _data_obj = VMM.Timeline.DataObj.data_template_obj;
					_data_obj.timeline.startDate = new Date(d.content.date.created);
					_data_obj.timeline.headline = d.content.title;
					trace(d);
					var tt = "";
					var t_name = d.content.author.username;
					var t_nickname = "";
					if (typeof d.content.author.name != "undefined") {
						t_name = d.content.author.name;
						t_nickname = d.content.author.username + "&nbsp;"
					}
					if (typeof d.content.description != "undefined" && d.content.description != null) {
						tt += d.content.description
					}
					tt += "<div class='storify'>";
					tt += "<div class='vcard author'><a class='screen-name url' href='" + d.content.author.permalink + "' target='_blank'>";
					tt += "<span class='avatar'><img src='" + d.content.author.avatar + "' style='max-width: 32px; max-height: 32px;'></span>";
					tt += "<span class='fn'>" + t_name + "</span>";
					tt += "<span class='nickname'>" + t_nickname + "<span class='thumbnail-inline'></span></span>";
					tt += "</a>";
					tt += "</div>";
					tt += "</div>";
					_data_obj.timeline.text = tt;
					_data_obj.timeline.asset.media = d.content.thumbnail;
					_data_obj.timeline.type = "storify";
					for (var i = 0; i < d.content.elements.length; i++) {
						var dd = d.content.elements[i];
						var is_text = false;
						var d_date = new Date(dd.posted_at);
						trace(dd.type);
						var _date = {
							type: "storify",
							startDate: dd.posted_at,
							endDate: dd.posted_at,
							headline: " ",
							slug: "",
							text: "",
							asset: {
								media: "",
								credit: "",
								caption: ""
							}
						};
						if (dd.type == "image") {
							if (typeof dd.source.name != "undefined") {
								if (dd.source.name == "flickr") {
									_date.asset.media = "//flickr.com/photos/" + dd.meta.pathalias + "/" + dd.meta.id + "/";
									_date.asset.credit = "<a href='" + _date.asset.media + "'>" + dd.attribution.name + "</a>";
									_date.asset.credit += " on <a href='" + dd.source.href + "'>" + dd.source.name + "</a>"
								} else if (dd.source.name == "instagram") {
									_date.asset.media = dd.permalink;
									_date.asset.credit = "<a href='" + dd.permalink + "'>" + dd.attribution.name + "</a>";
									_date.asset.credit += " on <a href='" + dd.source.href + "'>" + dd.source.name + "</a>"
								} else {
									_date.asset.credit = "<a href='" + dd.permalink + "'>" + dd.attribution.name + "</a>";
									if (typeof dd.source.href != "undefined") {
										_date.asset.credit += " on <a href='" + dd.source.href + "'>" + dd.source.name + "</a>"
									}
									_date.asset.media = dd.data.image.src
								}
							} else {
								_date.asset.credit = "<a href='" + dd.permalink + "'>" + dd.attribution.name + "</a>";
								_date.asset.media = dd.data.image.src
							}
							_date.slug = dd.attribution.name;
							if (typeof dd.data.image.caption != "undefined") {
								if (dd.data.image.caption != "undefined") {
									_date.asset.caption = dd.data.image.caption;
									_date.slug = dd.data.image.caption
								}
							}
						} else if (dd.type == "quote") {
							if (dd.permalink.match("twitter")) {
								_date.asset.media = dd.permalink;
								_date.slug = VMM.Util.untagify(dd.data.quote.text)
							} else if (dd.permalink.match("storify")) {
								is_text = true;
								_date.asset.media = "<blockquote>" + dd.data.quote.text.replace(/<\s*\/?\s*b\s*.*?>/g, "") + "</blockquote>"
							}
						} else if (dd.type == "link") {
							_date.headline = dd.data.link.title;
							_date.text = dd.data.link.description;
							if (dd.data.link.thumbnail != "undefined" && dd.data.link.thumbnail != "") {
								_date.asset.media = dd.data.link.thumbnail
							} else {
								_date.asset.media = dd.permalink
							}
							_date.asset.caption = "<a href='" + dd.permalink + "' target='_blank'>" + dd.data.link.title + "</a>";
							_date.slug = dd.data.link.title
						} else if (dd.type == "text") {
							if (dd.permalink.match("storify")) {
								is_text = true;
								var d_name = d.content.author.username;
								var d_nickname = "";
								if (typeof dd.attribution.name != "undefined") {
									t_name = dd.attribution.name;
									t_nickname = dd.attribution.username + "&nbsp;"
								}
								var asset_text = "<div class='storify'>";
								asset_text += "<blockquote><p>" + dd.data.text.replace(/<\s*\/?\s*b\s*.*?>/g, "") + "</p></blockquote>";
								asset_text += "<div class='vcard author'><a class='screen-name url' href='" + dd.attribution.href + "' target='_blank'>";
								asset_text += "<span class='avatar'><img src='" + dd.attribution.thumbnail + "' style='max-width: 32px; max-height: 32px;'></span>";
								asset_text += "<span class='fn'>" + t_name + "</span>";
								asset_text += "<span class='nickname'>" + t_nickname + "<span class='thumbnail-inline'></span></span>";
								asset_text += "</a></div></div>";
								_date.text = asset_text;
								if (i + 1 >= d.content.elements.length) {
									_date.startDate = d.content.elements[i - 1].posted_at
								} else {
									if (d.content.elements[i + 1].type == "text" && d.content.elements[i + 1].permalink.match("storify")) {
										if (i + 2 >= d.content.elements.length) {
											_date.startDate = d.content.elements[i - 1].posted_at
										} else {
											if (d.content.elements[i + 2].type == "text" && d.content.elements[i + 2].permalink.match("storify")) {
												if (i + 3 >= d.content.elements.length) {
													_date.startDate = d.content.elements[i - 1].posted_at
												} else {
													if (d.content.elements[i + 3].type == "text" && d.content.elements[i + 3].permalink.match("storify")) {
														_date.startDate = d.content.elements[i - 1].posted_at
													} else {
														trace("LEVEL 3");
														_date.startDate = d.content.elements[i + 3].posted_at
													}
												}
											} else {
												trace("LEVEL 2");
												_date.startDate = d.content.elements[i + 2].posted_at
											}
										}
									} else {
										trace("LEVEL 1");
										_date.startDate = d.content.elements[i + 1].posted_at
									}
								}
								_date.endDate = _date.startDate
							}
						} else if (dd.type == "video") {
							_date.headline = dd.data.video.title;
							_date.asset.caption = dd.data.video.description;
							_date.asset.caption = dd.source.username;
							_date.asset.media = dd.data.video.src
						} else {
							trace("NO MATCH ");
							trace(dd)
						}
						if (is_text) {
							_date.slug = VMM.Util.untagify(dd.data.text)
						}
						_data_obj.timeline.date.push(_date)
					}
					VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, _data_obj)
				}
			},
			tweets: {
				type: "twitter",
				buildData: function(raw_data) {
					VMM.bindEvent(global, VMM.Timeline.DataObj.model.tweets.onTwitterDataReady, "TWEETSLOADED");
					VMM.ExternalAPI.twitter.getTweets(raw_data.timeline.tweets)
				},
				getData: function(raw_data) {
					VMM.bindEvent(global, VMM.Timeline.DataObj.model.tweets.onTwitterDataReady, "TWEETSLOADED");
					VMM.ExternalAPI.twitter.getTweetSearch(raw_data)
				},
				onTwitterDataReady: function(e, d) {
					var _data_obj = VMM.Timeline.DataObj.data_template_obj;
					for (var i = 0; i < d.tweetdata.length; i++) {
						var _date = {
							type: "tweets",
							startDate: "",
							headline: "",
							text: "",
							asset: {
								media: "",
								credit: "",
								caption: ""
							},
							tags: "Optional"
						};
						_date.startDate = d.tweetdata[i].raw.created_at;
						if (type.of(d.tweetdata[i].raw.from_user_name)) {
							_date.headline = d.tweetdata[i].raw.from_user_name + " (<a href='https://twitter.com/" + d.tweetdata[i].raw.from_user + "'>" + "@" + d.tweetdata[i].raw.from_user + "</a>)"
						} else {
							_date.headline = d.tweetdata[i].raw.user.name + " (<a href='https://twitter.com/" + d.tweetdata[i].raw.user.screen_name + "'>" + "@" + d.tweetdata[i].raw.user.screen_name + "</a>)"
						}
						_date.asset.media = d.tweetdata[i].content;
						_data_obj.timeline.date.push(_date)
					}
					VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, _data_obj)
				}
			}
		},
		data_template_obj: {
			timeline: {
				headline: "",
				description: "",
				asset: {
					media: "",
					credit: "",
					caption: ""
				},
				date: [],
				era: []
			}
		},
		date_obj: {
			startDate: "2012,2,2,11,30",
			headline: "",
			text: "",
			asset: {
				media: "http://youtu.be/vjVfu8-Wp6s",
				credit: "",
				caption: ""
			},
			tags: "Optional"
		}
	}
}
VMM.debug = false;