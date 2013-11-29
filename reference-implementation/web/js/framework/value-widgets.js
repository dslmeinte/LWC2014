/*
 * Implementations of ValueWidgets, i.e. widgets which holds and visualize a value.
 */

QLrt.BaseValueWidget = function (lazyValue) {

	QLrt.Child.call(this);

	this.createElement = function () {
		throw 'createElement not implemented';
	};

	this.computed = (lazyValue !== undefined);

	var elt = null;

	this.domElement = function () {
		if (elt === null) {
			elt = this.createElement().prop('disabled', this.computed).change(this.signalChange);
		}
		return elt;
	};

	this.value = function () {
		throw 'value not implemented';
	};

	this.setValue = function (val) {
		throw 'setValue not implemented';
	};

	this.defined = function () {
		throw 'defined not implemented';
	};

	this.update = function () {
		if (this.computed) {
			this.setValue(lazyValue.evaluate());
		}
	};

};
QLrt.BaseValueWidget.prototype = Object.create(QLrt.Child.prototype);


QLrt.BooleanValueWidget = function () {

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

	this.defined = function () {
		return true;
	};

};
QLrt.BooleanValueWidget.prototype = Object.create(QLrt.Child.prototype);


QLrt.MoneyValueWidget = function (lazyValue) {

	QLrt.BaseValueWidget.call(this, lazyValue);

	this.createElement = function () {
		return QLrt.mk('input').attr('type', 'text').autoNumeric('init');
	};

	this.value = function (val) {
		return this.domElement().autoNumeric('get');
	};

	this.setValue = function (val) {
		this.domElement().autoNumeric('set', ( val === undefined ? '' : val ));
	};

	this.defined = function () {
		return this.computed || (this.value() !== '');
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


