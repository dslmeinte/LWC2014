Language Workbench Challenge 2014
=================================

This repository holds the _reference implementation_ for the semantics of the QL and QLS languages,
as defined in the [assignment](http://www.languageworkbenches.net/wp-content/uploads/2013/11/Call-for-Participation.pdf).
Specifically, it implements the example questionnaire shown in the assignment.

**Status of implementation**: under construction, work-in-progress, not complete!

Particular **TODO**s:

* Storing of completed form as JSON in the HTML5 LocalStorage.
* Implementation of using lazily-evaluated expressions/functions for the conditional expression for a grouping and computed values.
* Styling of widgets, through ```web/css/QL.css```.
* More documentation of the framework (as JSdoc).


## Repository organization

The repository contains (currently) one folder holding an Eclipse JavaScript project ```reference-implementation``` with the implementation.
It's not necessary to use Eclipse: you can view the project folder as the root for development.
Inside the Eclipse project, the folder ```web``` contains everything that's relevant: the rest is purely for setup or Eclipse configuration.

### Setup

Run ```scripts/prepare.sh``` to download the correct versions of jQuery, Underscore.js and the ```autoNumeric``` jQuery plugin
that takes care of formatting text inputs as monetary amounts.

### Contributing

Participants of the Challenge are invited to contribute to this reference implementation, by the usual means:

* forking this repository and creating pull requests
* filing issues

It's especially appreciated if participants come up with implementations of value widgets for QLS.


## The example

The example in the QL challenge text is implemented in ```web/js/examples/exampleForm-impl.js```.
It is executed by running ```web/QL_example.html``` in any modern browser.
The example uses the "QL(S) run time(s)", i.e. the framework JS files located in ```web/js/framework/```.


## Generation vs. interpretation

The implementation of the example questionnaire fits the code generation paradigm in a natural in the sense that it builds up the necessary code corresponding to the example model directly in JavaScript, instead of interpreting a data structure.
However, the interpretative style should be equally simple to realize, depending on the concrete JavaScript syntax of the model.


## The framework

Characteristics:

* Technology: HTML5, i.e. HTML+JavaScript+CSS
* Widget-based: the input elements render into the DOM and encapsulate required logic
* Reactive: input elements signal when their input has changed, so changes can be propagated
* Storage: ```localstorage``` is used to store the questionnaire input (as JSON) - *not yet implemented*

### Structural widgets

There are 3 widgets which are structural in the sense that they define the form and its structure,
but don't say anything about the values in it.

* ```FormWidget```: The base widget for one whole form, acting as a controller for it. It has ```GroupWidget```s and ```SimpleFormElementWidget```s as children.
* ```GroupWidget```: Corresponds to a grouping of other widgets, where the visibility and applicability of the whole group is governed by an expression. It can have other ```GroupWidget```s and ```SimpleFormElementWidget```s as children.
* ```SimpleFormElementWidget```: Corresponds to a label and a value (passed as an appropriate value widget) in the UI. It only composes value widgets, not other widgets.

### Value widgets

Value widgets deal with showing values and either inputting or computing those.
These objects are both widgets and value wrappers: they are rendered as well as provide an interface to get and set their value, and inspect whether they have been set.

### Lazy values

To make implementing the reactive behavior of the form as simple as possible, we provided a ```LazyValue``` class, instances of which can be asked to be ```evaluate```d against the current state of .

