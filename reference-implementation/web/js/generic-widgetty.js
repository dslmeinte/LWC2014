/*
 * Some generic code useful for doing "widgetty stuff"...
 */


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


/**
 * Base type.
 */
QLrt.Notifier = function () {

	var listener = null;

	this.setListener = function (listener_) {
		listener = listener_;
	};

	this.changeCallback = function () {
		listener.changed();
	};

};

