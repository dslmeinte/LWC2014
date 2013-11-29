/*
 * Widgets that take care of structure (but not of values).
 */

/**
 * A widget
 */
QLrt.FormWidget = function (settings) {

	if (typeof (settings) !== 'object'
			|| settings.name === undefined
			|| settings.submitCallback === undefined
	) {
		throw 'invalid or incomplete settings';
	}

	var outerContainer = QLrt.mk('div').hide().append(QLrt.mk('h2').text('Form: ' + settings.name));
	var innerContainer = QLrt.mk('div', 'form').appendTo(outerContainer);
	var submitButton = QLrt.mk('button').prop('disabled', true).append('Submit').appendTo(outerContainer).click(function () { settings.submitCallback(asJSON()); });

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

		propagatingUpdateLatch = true;
		_.each(children, function (subWidget) { subWidget.update(); });
		propagatingUpdateLatch = false;

		submitButton.prop('disabled', !complete());
	};

	this.activate = function () {
		this.signalChange();			// initial setting of correct visualization
		outerContainer.show();
	};

	function complete () {
		return _.all(children, function (subWidget) { return subWidget.defined(); });
	}

	function asJSON () {
		var result = {};

		_.each(children, function (subWidget) {
			_.extend(result, subWidget.asJSON());
		});

		return result;
	}

};


QLrt.ConditionalGroupWidget = function (lazyValue) {

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

	this.defined = function () {
		return !lazyValue.evaluate() || _.all(children, function (subWidget) { return subWidget.defined(); });
	};

	this.update = function () {
		var value = lazyValue.evaluate();
		container.toggle(value);
		if (value) {
			_.each(children, function (subWidget) { subWidget.update(); });
		}
	};

	this.asJSON = function () {
		var result = {};

		if (lazyValue.evaluate()) {
			_.each(children, function (subWidget) {
				_.extend(result, subWidget.asJSON());
			});
		}

		return result;
	};

};
QLrt.ConditionalGroupWidget.prototype = Object.create(QLrt.Child.prototype);


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

	this.defined = function () {
		return settings.valueWidget.defined();
	};

	this.update = function () {
		settings.valueWidget.update();
	};

	this.asJSON = function () {
		var result = {};

		if (!settings.valueWidget.computed) {
			result[settings.name] = this.value();
		}

		return result;
	};

};
QLrt.SimpleFormElementWidget.prototype = Object.create(QLrt.Child.prototype);

