Language Workbench Challenge 2014
=================================

This repository holds the _reference implementation_ for the semantics of the QL and QLS languages,
as defined in the [assignment](http://www.languageworkbenches.net/wp-content/uploads/2013/11/Call-for-Participation.pdf).
Specifically, it implements the example questionnaire shown in the assignment.

## Status

**Status of implementation**: under construction, work-in-progress, not complete!

Particular **TODO**s:

* Storing of completed form as JSON in the HTML5 LocalStorage.
* Styling of widgets, through ```web/css/QL.css```.
* More documentation of the framework (as JSdoc).


## Disclaimer

The reference implementation is provided _as-is_.
The LWC 2013 programming committee retains the right to change and expand the code throughout the following months.
However, the committee will try to keep the API stable.


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

All framework objects (functions) are properties of the global ```QLrt``` (QL run time) object.
In the rest of the text, the ```QLrt.``` prefix is assumed to be implicit.

### Structural widgets

There are 3 widgets which are structural in the sense that they define the form and its structure,
but don't say anything about the values in it.

* ```FormWidget```: The base widget for one whole form, acting as a controller for it. It has ```ConditionalGroupWidget```s and ```SimpleFormElementWidget```s as children.
* ```ConditionalGroupWidget```: Corresponds to a grouping of other widgets, where the visibility and applicability of the whole group is governed by an expression. It can have other ```ConditionalGroupWidget```s and ```SimpleFormElementWidget```s as children.
* ```SimpleFormElementWidget```: Corresponds to a label and a value (passed as an appropriate value widget) in the UI. It only composes value widgets, not other widgets.

Both ```ConditionalGroupWidget``` and ```SimpleFormElementWidget``` are instances (sub types) of ```Child```.

#### API

**TODO**  document API and subclassing from ```BaseValueWidget```

### Value widgets

Value widgets deal with showing values and either inputting or computing those.
These objects are both widgets and value wrappers: they are rendered as well as provide an interface to get and set their value, and inspect whether they have been set.

#### API

**TODO**  document API and subclassing from ```BaseValueWidget```

#### Roling your own

**TODO**  document subclassing from ```BaseValueWidget```

### Lazy values

To make implementing the reactive behavior of the form and dealing with the semantics of undefined values as simple as possible,
we provide a ```LazyValue``` class, instances of which can be asked to be evaluated against the current state of the form.

LazyValue is a contructor that takes a _dependent values_ function, an _expression_ function and an optional _funky_ boolean.
The _dependent values_ function must return an array of value widget objects - remember that these also serve as value wrappers.
The _expression_ function takes arguments corresponding to the array returned by the _dependent values_ function and returns a value or ```undefined``` in case a dependent value is currently undefined.
The _funky_ boolean indicates whether a dependent value being undefined _does not_ mean that the expression's value will be undefined.

As an example, consider the computation of sellingPrice - privateDebt. In our example's code, this becomes:

```
1.	var sellingPrice = (new QLrt.SimpleFormElementWidget({ … })).appendTo(group1);
2.	var privateDebt = (new QLrt.SimpleFormElementWidget({ … })).appendTo(group1);
3.	(new QLrt.SimpleFormElementWidget({ label: "Value residue:", valueWidget: new QLrt.MoneyValueWidget(new QLrt.LazyValue(
4.			function () { return [ sellingPrice, privateDebt ]; },
5.			function (sellingPrice, privateDebt) { return sellingPrice - privateDebt; }
6.		)) })).appendTo(group1);
```

Line 4 is the _dependent values_ function which returns the value widget objects for sellingPrice and privateDebt.
Line 5 is the _expression_ function.

Note that sellingPrice and/or privateDebt might be ```undefined```.
However, since this lazy value is "non-funky" (3rd parameter not present, thus not set to true), first all dependent (wrapped) values are checked for definedness.
If they're not all defined, the expression evaluates to ```undefined```.
One only has to use "funky" when e.g. using shortcutting boolean operators, or in pathological cases such as multiplying with 0.

