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
		return (this.defined() ? this.valueInternal() : undefined);
	};

	this.defined = function () {
		return this.computed || this.definedInternal();
	};

	this.update = function () {
		if (this.computed) {
			this.setValue(lazyValue.evaluate());
		}
	};

	this.setValue = function (val) {
		throw 'setValue not implemented';
	};

	this.valueInternal = function () {
		throw 'valueInternal not implemented';
	};

	this.definedInternal = function () {
		throw 'definedInternal not implemented';
	};

};
QLrt.BaseValueWidget.prototype = Object.create(QLrt.Child.prototype);


QLrt.BooleanValueWidget = function (lazyValue) {

	QLrt.BaseValueWidget.call(this, lazyValue);

	this.createElement = function () {
		return QLrt.mk('input').attr('type', 'checkbox');
	};

	this.setValue = function (val) {
		this.domElement().prop('checked', val);
	};

	this.valueInternal = function () {
		return this.domElement().prop('checked');
	};

	this.definedInternal = function () {
		return true;
	};

};
QLrt.BooleanValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


QLrt.MoneyValueWidget = function (lazyValue) {

	QLrt.BaseValueWidget.call(this, lazyValue);

	this.createElement = function () {
		return QLrt.mk('input').attr('type', 'text').autoNumeric('init');
	};

	this.setValue = function (val) {
		this.domElement().autoNumeric('set', ( val === undefined ? '' : val ));
	};

	this.valueInternal = function (val) {
		return this.domElement().autoNumeric('get');
	};

	this.definedInternal = function () {
		return (this.valueInternal() !== '');
	};

};
QLrt.MoneyValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


QLrt.StringValueWidget = function (lazyValue) {

	QLrt.BaseValueWidget.call(this, lazyValue);

	this.createElement = function () {
		return QLrt.mk('input').attr('type', 'text');
	};

	this.setValue = function (val) {
		this.domElement().val(val);
	};

	this.valueInternal = function () {
		return this.domElement().val();
	};

	this.definedInternal = function () {
		return (this.valueInternal() !== '');
	};

};
QLrt.StringValueWidget.prototype = Object.create(QLrt.BaseValueWidget.prototype);


