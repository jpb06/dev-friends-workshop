# ⚡ Making sure we are understood

<p align="center">
  <img src="./assets/bp.jpg" width="450" alt="bp" />
</p>

## 🔶 Maximize signal to noise ratio

A developer spends 80% of his time reading code and only 20% writing code: you have to understand the code-base to know where to insert that code you need for this evolution asked by the product team. So if a code is complex, it will take much longer to integrate any change.

We also touch here the concept of noise. Noise is everything that is not related to the purpose of the module, be it a comment, convoluted code, or improper naming. You want every single line of code to have a clear meaning and to be absolutely necessary. Because remember, the code you write will be read perhaps a thousand times after you wrote it. It's critical you do our best to save both your time and the time of your team mates.

Examples of noise:

- **Unnecessary comments** (see Self documenting code principle). When you write a comment, it should be absolutely necessary to understand what's going on.
- **Dead code**, which is code that’s remained in the system even though it’s no longer really used. We should keep only what we really need in our codebase so that we have less code to read, to maintain and to test.
- **Zombie code**, that is, code that was never alive, and so couldn’t really become dead. It’s the undead code – code that died right when it was committed. Code that never ran or never worked. This kind of code should be removed asap.
- **Obfuscated code**: code just too complex or convoluted in regard with what it's trying to solve. Nobody is certain to understand it, and naturally nobody wants to really touch it. This creates black-holes in the code base that are "just there", and will be less prone to be refactored because of the perceived risk to replace them (how can I refactor something I don't really understand?).

## 🔶 Convey intent

What did Jacques really want to do when he wrote that function? Did you ever ask yourself something like this when you read some code? As stated, a developer spends 80% of his time reading code. If the code you read is not clear in what it's meant to do or solve, you will have much harder time to modify or fix that code.

Unclear intent is dangerous for the product as well. Bugs are often caused by unclear intent or code just too complex to understand.

Code should convey the intent of its author, because three months later even you will have forgotten about this module you wrote and you will be grateful to have written something easy to understand and doing what it actually states.

There is several ways to convey intent when you write come code:

- Stay simple. The simpler the code, the easier it is to understand.
- Be explicit about what you are doing, using a semantic that will help the reader to understand what you do and where you are going. Naming variables and functions is critical in that regard.
- Hide complexity away by extracting code, and name units of code properly to make them work like a table of contents in a book. This will also help you to limit responsibilities in each unit of code and help readers to focus on the steps needed to perform the task, rather than their implementation details that they probably do not care about.
- Be modular. Think about a car. You don't really need to know how engines, doors or seat-belts internally work to drive your car. This is the concept of black-boxing. The reader does not care about each single details of implementation.

## 🔶 Naming is key

Imagine reading a book that uses some weird conventions. The verb "to be" is replaced by "pimprenelles" and the verb "to have" by "Yolo". That book would be harder to read, right? Of course, you have a good memory and you will be able to remember, but hey! How about replacing more verbs? When will you begin to struggle?

It's pretty much the same with our code. Improperly naming a function not only fails at conveying the intent of its author, but can also mislead readers. Imagine a function named `registerUser` that also sends a mail to the new user. The intent is not fully conveyed.

Improper naming also creates a precedent and tends to attract lazy developers. Let's imagine we have a `util.ts` file. It may contain 500 lines, perhaps 1000... Who cares if I add another function in it? After all, somebody did exactly this before I, so I'm not responsible for this mess! Right...?

## 🔶 Self documenting code

Prefer code over comments. The code should be self documenting, meaning reading it alone should be enough to understand its purpose. If you feel comments are needed for understanding, it generally means your code is too complex and should be refactored.

Modules/variables naming and code architecture are very important and should be carefully chosen to help readers move fluently in the code-base.

Of course it doesn't mean comments cannot be useful. When we are forced to do something weird to go around a problem, or when the code is really too complex, a commont can be really useful to help the reader understand what's up.
