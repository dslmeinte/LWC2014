/*
 * Widgets that take care of structure (but not of values).
 */

/**
 * A widget
 */
QLrt.FormWidget = function (settings) {

	if (typeof (settings) !== 'object'
			|| settings.name === undefined
//			|| settings.submitCallback === undefined
	) {
		throw 'invalid or incomplete settings';
	}

	var outerContainer = QLrt.mk('div').hide().append(QLrt.mk('h2').text('Form: ' + settings.name));
	var innerContainer = QLrt.mk('div', 'form').appendTo(outerContainer);
	var submitButton = QLrt.mk('button').prop('disabled', true).append('Submit').appendTo(outerContainer).click(settings.onsubmit);

	this.domElement = function () {
		return outerContainer;
	};

	var children = [];

	this.append = function (widget) {
		children.push(widget);
		innerContainer.append(widget.domElement());
	};

	var propagatingUpdateLatch = false;

	this.signalChange = function () {
		if (propagatingUpdateLatch) return;

		submitButton.prop('disabled', !this.complete());
		propagatingUpdateLatch = true;
		_.each(children, function (subWidget) { subWidget.update(); });
		propagatingUpdateLatch = false;
	};

	this.activate = function () {
		this.signalChange();			// initial setting of correct visualization
		outerContainer.show();
	};

	this.complete = function () {
		return _.all(children, function (subWidget) { return subWidget.complete(); });
	};

};


QLrt.GroupWidget = function (lazyValue) {

	QLrt.Child.call(this);

	var container = QLrt.mk('div', 'group');

	this.domElement = function () {
		return container;
	};

	var children = [];

	this.append = function (widget) {
		children.push(widget);
		container.append(widget.domElement());
	};

	var visible_ = true;

	this.visible = function (val) {
		visible_ = val;
		container.toggle(val);
	};

	this.complete = function () {
		return !visible_ || _.all(children, function (subWidget) { return subWidget.complete(); });
	};

	this.update = function () {
		var value = lazyValue.evaluate();
		container.toggle(value);
		if (value) {
			_.each(children, function (subWidget) { subWidget.update(); });
		}
	};

};
QLrt.GroupWidget.prototype = Object.create(QLrt.Child.prototype);


QLrt.SimpleFormElementWidget = function (settings) {

	QLrt.Child.call(this);

	if (typeof (settings) !== 'object'
			|| settings.label === undefined
			|| settings.valueWidget === undefined) {
		throw 'invalid or incomplete settings';
	}

	if (settings.valueWidget instanceof QLrt.Child) {
		settings.valueWidget.appendTo(this);
	}

	var outerContainer = QLrt.mk('div', 'simpleFormElement');
	QLrt.mk('label').appendTo(outerContainer).append(settings.label).append(settings.valueWidget.domElement());

	this.domElement = function () {
		return outerContainer;
	};

	this.value = function () {
		return settings.valueWidget.value();
	};

	this.setValue = function (val) {
		return settings.valueWidget.setValue(val);
	};

	this.complete = function () {
		return settings.valueWidget.complete();
	};

	this.update = function () {
		settings.valueWidget.update();
	};

};
QLrt.SimpleFormElementWidget.prototype = Object.create(QLrt.Child.prototype);

