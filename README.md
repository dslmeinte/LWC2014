Language Workbench Challenge 2014
=================================

This repository holds the _reference implementation_ for the semantics of the QL and QLS languages,
as defined in the [assignment](http://www.languageworkbenches.net/wp-content/uploads/2013/11/Call-for-Participation.pdf).
Specifically, it implements the example questionnaire shown in the assignment.

**Status of implementation**: under construction


## Repository organization

The repository contains (currently) one folder holding an Eclipse JavaScript project ```reference-implementation``` with the implementation.
It's not necessary to use Eclipse: you can view the project folder as the root for development.
Inside the Eclipse project, the folder ```web``` contains everything that's relevant: the rest is purely for setup or Eclipse configuration.

### Setup

Run ```scripts/prepare.sh``` to download the correct versions of jQuery and Underscore.js.


### Executing the example

Open ```web/QL_example.html``` in a browser.


## Architecture of implementation

(Or "architecture", really...)

Characteristics:
* Technology: HTML5, i.e. HTML+JavaScript+CSS
* Widget-based: the input elements render into the DOM and encapsulate required logic - see ```web/js/...-widgets.js```
* Reactive: input elements signal when their input has changed, so changes can be propagated
* Storage: ```localstorage``` is used to store the questionnaire input (as JSON)

The implementation of the example questionnaire is geared towards code generation in the sense that it builds up the necessary code corresponding to the example model directly in JavaScript, instead of interpreting a data structure.
However, the interpretative style should be equally simple to realize, depending on the concrete JavaScript syntax of the model.


