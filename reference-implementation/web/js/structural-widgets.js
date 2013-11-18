/**
 * Convenience function wrapping $('<... class="...">).
 */
QLrt.mk = function (tagName, className) {
	var elt = $('<' + tagName + '></' + tagName + '>');
	if (className !== undefined) {
		elt.addClass(className);
	}
	return elt;
};


QLrt.FormWidget = function (settings) {

	var outerContainer = QLrt.mk('div').hide().append(QLrt.mk('h2').text('Form: ' + settings.name));
	var innerContainer = QLrt.mk('div', 'form').appendTo(outerContainer);
	var submitButton = QLrt.mk('button').prop('disabled', true).appendTo(outerContainer).click(settings.onsubmit);

	this.domElement = function () {
		return outerContainer;
	};

	var children = [];

	this.append = function (widget) {
		children.push(widget);
		innerContainer.append(widget.domElement());
	};

	this.rootWidget = function () {
		return this;
	};

	this.activate = function () {
		settings.render();	// initial rendering
		outerContainer.show();
	};

	this.submittable = function (val) {
		submitButton.prop('disabled', !val);
	};
	// TODO  make this auto-setting through this.complete() -- requires "bubbling up"

	this.complete = function () {
		return _.all(children, function (subWidget) { return subWidget.complete(); });
	};

};


QLrt.GroupWidget = function (settings) {

	var container = QLrt.mk('div', 'group');

	this.domElement = function () {
		return container;
	};

	var children = [];

	this.append = function (widget) {
		children.push(widget);
		container.append(widget.domElement());
	};

	this.appendTo = function (parent) {
		parent.append(this);
		return this;	// for chaining
	};

	var visible_ = true;

	this.visible = function (val) {
		visible_ = val;
		container.toggle(val);
	};

	this.complete = function () {
		return visible_ && _.all(children, function (subWidget) { return subWidget.complete(); });
	};

};


QLrt.SimpleFormWidget = function (settings) {

	var outerContainer = QLrt.mk('div', 'simpleFormElement');
	QLrt.mk('label').appendTo(outerContainer).append(settings.label).append(settings.input.domElement());

	this.domElement = function () {
		return outerContainer;
	};

	this.appendTo = function (parent) {
		parent.append(this);
		return this;	// for chaining
	};

	this.value = function () {
		return settings.input.value();
	};

	this.complete = function () {
		return settings.input.complete();
	};

};

