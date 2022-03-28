# ⚡ General guidelines

<p align="center">
  <img src="./assets/bp.jpg" width="450" alt="bp" />
</p>

## 🔶 KISS - Keep it simple, stupid

Always choose the easiest solution. Always prefer the simplest code.
Your team mates will thank you later, because remember: you will be the ones having to maintain it.

This extends to code readability. Some developers do argue about the efficiency of an algorithm and will always prefer the most efficient solution, and it would most likely matter if we were writing code that is meant to be used in stressing environments, like for a space program.

Having a code that is easily understandable and maintainable will always beat pure efficiency, however. If I had to give an extreme example, I could argue that our backend should be written in ASM. But who does understand that?

## 🔶 DRY - Don't repeat yourself

Something we all heard a thousand times, as developers, but we sometimes neglect to do so because we think we won't have time to do something clean.

We will always pay this decision later, though:
Technical debt and code entropy slowly creeps in. Every new evolution takes longer to be integrated. The codebase becomes harder and harder to understand, meaning more bugs, longer development times, increased stress for the teams. Nobody wants that.

### ⚠️ 🚨 🚨 Like everything on this world, exercise good judgement. Following guidelines blindly will only get us this far

DRY can be counter productive. Let's take an example:

I have two features on my application, one used by 80% of my users on a daily basis and one used by 20% of them once a year. If I decide to factorize code, I take the risk to break my critical feature if I have to alter the marginally used one.

What are the impacts? Are we talking about the same thing, functionally speaking? Who is responsible for maintaining it? What's the tradeof? What is the maintenance cost of keeping it duplicated? Are impacted features easy to test?

All these questions can help us finding out whether factorizing this code is a good move in the first place!

## 🔶 YAGNI - You ain't gonna need it

Integrate only what is absolutely necessary. Nothing more, nothing less.

Remember every single line of code we write needs to be tested and adding modules we perceive as being necessary in the future (when?) only adds more burden on our shoulders.
Again, we want our life to be easy, we want our day to be pleasant. Why adding unnecessary code if you don't need it now?

## 🔶 SSOT - Single source of truth

SSOT is originally a strategy linked to database design, but can be applied to software development as well.

The goal is to organize the code base so that the 'data' part of the code is centralized in a single place.
It is a bit related to DRY because usually duplication means SSOT is not well done.
It is also closely linked to SRP (Single responsibility principle) because in order to achieve clearly defined sources of truth you need to define their responsibilities.
