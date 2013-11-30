# Scalability suggestions #

# Introduction #
In the focus assignment for LWC2014, we specifically referred to 

* People working concurrently on a single model and/or language definition
* The size of models, in terms of elements (i.e. large questionnaires, or complex layouts in 
QLS)

In this document, we provide some hints as to what could be useful ways of demonstrating how a language workbench supports this.

# Teamwork example case: the ministry of funny taxes #
Envision a situation where a team of 4-5 people are working on creation of an on-line tax reporting application, in which QL is used to define the question forms involved.
In these questionnaires, it is obvious that

* the amount of questions is large
* many questions are conditioned by answers to other questions

At the IT department of the *Ministry of funny taxes* we may have a team of 4-5 people working on development of the questionnaire for year 2014 tax reports, using QL and QLS in your language workbench.
Since the questionnaire should cover income taxes, housing taxes, savings information, tax reductions etc., the questionnaire logically falls apart into different sections, which are nevertheless still related to each other and may contain logic that enables or disables questions based on the outcome of other questions.

Because it is not practical to have 5 people working on the same questions, the questionnaire gets divided amongst the team members section by section. 
As a result of that, the conditions that answers to one question impose on other questions are now part of the work of different people. This means that they have to keep their work synchronised in one way or another. Assuming that they are not working from the same desk all the time (different offices, telecommuting, part-time contracts etc.) some form of support by the language workbench they use should be available.

What that support is, depends of course on how the language workbench deals with storage of models, as well as versioning, merging, testing etc.
At the same time, the way the models are stored also affects how easy or hard it is for the LWB to deal with large models.

Scenario's you might think of in this set up, related to working in teams:

* A question in the questionnaire section developed by Meinte depends on the outcome of a question in Angelo's section. Angelo changes that question. What can the LWB do to support Meinte in fixing the broken logic?
* What tool support can you offer if in this case Meinte has to make a small change to Angelo's question, which in turn (seen or unseen) breaks a similar dependency in Steven's part of the questionnaire?
* What happens if Markus needs to add a question, or set of questions that depend partly on the outcome of questions that have yet to be implemented by Tijs in his part of the questionnaire? 
* What if Sebastian joins the team, because a new section is added to the tax questionnaire, and he starts introducing, by accident, cyclic dependencies across the different questionnaire models?

Some of these, and other scenarios you can think of, can be solved by agreeing on certain working procedures, of course. However, in the LWC we'd like to see how you solve them using your LWB of choice, and how much can be solved without setting up these working procedures.

Of course, tax forms are different per country, and not completely trivial to reimplement as part of a workshop assignment that you will only have a limited amount of time to work on. However, with the suggestions above, we think you can find a way to show how your LWB supports working in (large) teams and the practical aspects of that.

# Model size #
In terms of scale and size, we'd like to see some input on questions like:

* How long does it take to combine the parts of the questionnaire and build a working solution out of it?
* What is the impact of increasing model size on compilation or interpretation times (linear, exponential, ...)
* Does the size of the model influence (perceived) response times for e.g. type checking or syntax colouring in the LWB?
* In case of modularized models, what is the impact of the number and size of submodels on the aspects mentioned above?
* What kind of support is in your LWB to minimize the actual impact of these effects?

Using an existing tax form for this would be a good way, but very hard to compare across solutions from different countries.
Therefore, we expect you to use a predefined model for this, based on a very simple case: a binary search tree questionnaire.

*Binary search tree*
Create a questionnaire that has to guess a number between a given input and output value, say 1..1023.
The first question would then be 'is the answer between 1 and 511'?
Depending on the outcome, the next question would be 'is the answer between 1 and 255', or 'is it between 512 and 1023'? - and so on.

By having all questions be conditional and part of the QL model, this leads to large QL models that you can use to answer any scalability and performance questions in your LWB.
To take it one step further, if your LWB supports model modularization (and most do, we think), also consider generating this as a model that consists of a main model, containing 32 questions, each related to 32 subquestions in a separate questionnaire models.

**NOTE:** keep in mind that modularizing the QL model for a questionnaire does not require you to generate a modular implementation of the resulting questionnaire. We know that anyone can do that with a little effort, focus should be on LWB aspects of scalability here.

