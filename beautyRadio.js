//基于jquery,还没完善,测试github
//radio 美化
var beautyRadio = (function() {

	var _radio = function(opts) {
		this.element = opts.element;
		this.radios = opts.radios;
		this.cls = opts.radioStyle;
		this.attr = opts.attr;
		this.def = opts.checked;
		this.r = {};
		this.last = null;
		this.onchecked = opts.onchecked;
		this.init();
	};

	_radio.prototype = {
		init: function() {
			var _this = this;
			this.radios.each(function(i, d) {
				var t = $(d).attr(_this.attr);
				_this.r[t] = {
					d: $(d),
					s: false
				};
			});
			this.checked(this.def);
			this.event();
		},
		checked: function(v) {
			var t = $.type(v);

			if (this.last) {
				this.unchecked(v);
			};

			var arg;

			if (t == 'number') {
				var c = $(this.radios[v]),
					cr = c.attr(this.attr);
				c.addClass(this.cls);
				this.last = c;
				this.r[cr].s = true;
				arg = cr;
			};

			if (t == 'string') {
				if (!this.r[v]) return;
				var c = this.r[v].d;
				c.addClass(this.cls);
				this.last = c;
				this.r[v].s = true;
				arg = v;
			};

			this.onchecked.apply(this, [this.last, arg]);
		},
		unchecked: function(v) {
			if (!this.last) return;
			var cr = this.last.attr(this.attr),
				c = this.r[cr].d;
			this.r[cr].s = false;
			c.removeClass(this.cls);
		},
		event: function() {
			var _this = this;
			this.element.bind('click', function(event) {
				var target = $(event.target);
				if (target.attr(_this.attr)) {
					var v = target.attr(_this.attr);
					_this.checked(v);
				};
			});
		}
	};
	return _radio;
})();