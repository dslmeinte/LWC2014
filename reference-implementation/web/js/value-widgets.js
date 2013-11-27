/*
 * Implementations of ValueWidgets, i.e. widgets which holds and visualize a value.
 */


QLrt.BaseValueWidget = function (options) {

	QLrt.Child.call(this);

	this.createElement = function () {
		throw "createElement not implemented";
	};

	var elt = null;

	this.domElement = function () {
		if (elt === null) {
			var self = this;
			var /* val */ derived = options && options.derived;
			elt = this.createElement().prop('disabled', derived).change(self.changed);
		}
		return elt;
	};

	this.value = function () {
		throw "value not implemented";
	};

	this.setValue = function (val) {
		throw "setValue not implemented";
	};

	this.complete = function () {
		throw "complete not implemented";
	};

};
QLrt.BaseValueWidget.prototype = Object.create(QLrt.Child.prototype);


QLrt.BooleanValueWidget = function (options) {

	QLrt.BaseValueWidget.call(this);

	this.createElement = function () {
		return QLrt.mk('input').attr('type', 'checkbox');
	};

	this.value = function () {
		return this.domElement().prop('checked');
	};

	this.setValue = function (val) {
		this.domElement().prop('checked', val);
	};

	this.complete = function () {
		return true;
	};

};
QLrt.BooleanValueWidget.prototype = Object.create(QLrt.Child.prototype);


QLrt.MoneyValueWidget = function (options) {

	QLrt.BaseValueWidget.call(this);

	this.createElement = function () {
		return QLrt.mk('input').attr('type', 'text').autoNumeric('init');
	};

	this.value = function (val) {
		return this.domElement().autoNumeric('get');
	};

	this.setValue = function (val) {
		this.domElement().autoNumeric('set', ( val === null ? "" : val ));
	};

	this.complete = function () {
		return this.value() !== "";
	};

};
QLrt.MoneyValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


QLrt.StringValueWidget = function () {

	QLrt.Child.call(this);

	this.createElement = function () {
		return QLrt.mk('input').attr('type', 'text');
	};

	this.value = function () {
		return this.domElement().val();
	};

	this.setValue = function (val) {
		this.domElement().val(val);
	};

};
QLrt.StringValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


