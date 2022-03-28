# ⚡ Code guidelines

<p align="center">
  <img src="./assets/bp.jpg" width="450" alt="bp" />
</p>

## 🔶 The rule of seven

When we read code, our brain works as the compiler. Unlike a compiler, our memory is limited. The rule of seven states we cannot juggle with seven values at the same time.

So if you have a function that is 200 lines long and contains 20 variables, your job will be much harder than having to understand an aggregate function calling 6 functions of 40 lines each containing one or two variables.
If these functions are properly named, the intent will be conveyed as well, allowing the reader to get a global understanding of what the main function is meant to do.

Keeping too many variables in scope is also a bad practice. This will make your code harder to understand for your team mates. Take a look at this example:

```typescript
const myFunction = (groups: UserGroup[], logs: Log[], ) => {
  const blackListedUserIds = [25, 35, 654, 9345]
  const minAge = 21
  const groupHashConstant = 'Yolo'
  const isAgeCheckRequired = false
  const maxAge = 25

  // Very
  // long
  // and
  // frankly
  // unecessary
  // code

  const groupsToCheck = groups.filter(el => {
    const events = ['hasJoined', 'hasSignedIn', 'hasModifiedProfile', 'hasBeenPinged']
    const isCritical = logs.some(log => log.type === 'GROUP' && events.includes(log.event)

    return isCritical
  }

  // ...
  // And
  // even
  // more
  // code
  // that
  // is
  // probably
  // important
  // for
  // what
  // you
  // need
  // to
  // do
  // right
  // now

  groupsToCheck.forEach(group => {
     const groupHash = `${group.id}-${group.dpt}-${groupHashConstant}`
     const allowedUsers = group.users.filter(user => {
        if(isAgeCheckRequired) {
           return user.age >= minAge && user.age <= maxAge)
        }

        // What is the second value in blackListedUserIds again?
        if(blackListedUserIds.includes(user.id) {
           return false
        }

        return true
     })
     sendNotifications(allowedUsers, groupHash)
  })
}
```

## 🔶 Do one thing, do it well

Functions should only do one thing and do it well. This helps us keep our code simple and easily understandable. This also makes unit testing much easier.

You will also be able to convey intent easily if your code has only one responsibility: describing it will be straightforward:

```typescript
// What is this function really doing...? I will have to read everything to know
const doStuff = async () => {
  const repository = createResository('Admins');
  const admins = await repository.get(
    (el) => el.createdAt.before(`2021-01-01`) && el.activated === true
  );

  const template = getEmailTemplate('BumpAdmin');
  admins.map(async (el) => {
    await sendEmail(template, el);
  });

  await respository.update(admins, (el) => (el.bumped = true));
  await respository.update(admins, (el) => (el.updatedAt = new Date()));
};
```

Let's refactor a bit to convey intent better, following the single responsibility principle:

```typescript
const getLastYearAdmins = async (currentYear: number) => {
  const repository = createResository('Admins');
  const admins = await repository.get(
    (el) => el.createdAt.before(`${currentYear}-01-01`) && el.activated === true
  );

  return admins;
};

const sendBumpEmails = (admins: Admin[]) => {
  const template = getEmailTemplate('BumpAdmin');
  admins.map(async (el) => {
    await sendEmail(template, el);
  });
};

const updateAdminsAsBumped = async (admins: Admin[]) => {
  await respository.update(admins, (el) => (el.bumped = true));
  await respository.update(admins, (el) => (el.updatedAt = new Date()));
};

// our original function, terrible name by the way
// What does it do? Each line is pretty explicit about what it does, right?
const doStuff = async () => {
  const admins = getLastYearAdmins(2022);
  sendBumpEmails(admins);
  await updateAdminsAsBumped(admins);
};
```

## 🔶 Functions: O2

Remember the rule of seven? This applies to function parameters. We can even go further here, since we want functions doing only one thing and doing it well.
Functions should have no more than two parameters. Too many parameters probably means the function has too many responsibilities.

By the way... Did you notice how baroque this title was and that it didn't really convey the intent behind this rule?

## 🔶 Make it fit on the screen

Remember that when we do read code, our brain is the compiler. And that brain has limited capabilities, even if you are a genius.
Understanding small units of code is easier: there is less information to absorb at one time and making it fit on screen forces you to segregate responsibilities.

Please. Help yourself and keep units of code small. Here's why:

- **Small units of code have fewer responsibilities (ideally only one).**
- **Small units of code are easier to understand when taken alone. The developers who will have to read this code will understand what it does faster. If they understand it well, there is less risks for bugs.**
- **Giving a name to a unit of code gives you an opportunity to convey intent.**
- **Smaller functions are easier to test.**

## 🔶 Limit indentation

Too much indentation means higher cyclomatic complexity. Prefer simple code, your team mates will thank you.

Do not go over 2 levels of indentation in a function. That is a if inside a if, for example.
If possible always prefer one level of indentation maximum.

You have several tricks you can use to limit identation:

- return early / fail fast
- do one thing, do it well: make sure a single unit of code has few responsibilities
- extract complex sub cases to their own function/module. This will also give you an opportunity to convey intent by naming that function or module.
- use ternary expressions (but do not chain them!)

```typescript
// we have 3 levels of indentation in this function.
// Notice how hard to understand this code becomes, even with this trivial example.
export const isUserValid = (user?: User): boolean => {
  if (user) {
    if (user.id < 1000) {
      const { isAdminActivated, isAdminAuthorized } = verifyAdmin(user);
      return isAdminActivated && isAdminAuthorized;
    } else {
      const isSignatureValid = verifyUserSignature(user);
      if (isSignatureValid) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};
```

```typescript
// Let's refactor a bit
export const isUserValid = (user?: User): boolean => {
  // returning early
  if (!user) {
    return false;
  }

  // conveying intent by using a function here: avoiding magic numbers
  const isAdmin = isUserAnAdmin(user);

  // using ternary to avoid indentation
  // extracting logic in another function to clarify intent
  return isAdmin ? isAdminValid(user) : verifyUserSignature(user);
};

const isUserAnAdmin = (user: User): boolean => user.id < 1000;

const isAdminValid = (user: User): boolean => {
  const { isAdminActivated, isAdminAuthorized } = verifyAdmin(user);

  return isAdminActivated && isAdminAuthorized;
};
```

## 🔶 Return early

Always return early in a function. There is no need to wait for the end of the function to return if conditions are met. This will limit indentation and simplify your code.

```typescript
// Let's write a function
const logUser = (user?: User): boolean => {
  if (user) {
    const isEmailVerified = verifyEmail(user.email);
    if (isEmailVerified) {
      // do something
      // cool
      // and
      // pretty
      // long
      // and
      // complicated

      return true;
    }
  }

  return false;
};
```

```typescript
// now we can simplify this by returning early
const logUser = (user?: User): boolean => {
  if (!user) {
    return false;
  }

  const isEmailVerified = verifyEmail(user.email);
  if (!isEmailVerified) {
    return false;
  }

  // we are now at indentation level zero for the rest of the function

  // do something
  // cool
  // and
  // pretty
  // long

  return true;
};
```

## 🔶 Fail fast

Similarly, always fail fast and loud. If a condition is unmet, throw as soon as possible. Jim Shore pinpoints the issue here:

> Some people recommend making your software robust by working around problems automatically. This results in the software “failing slowly.” The program continues working right after an error but fails in strange ways later on.
>
> A system that fails fast does exactly the opposite: when a problem occurs, it fails immediately and visibly. Failing fast is a non intuitive technique: “failing immediately and visibly” sounds like it would make your software more fragile, but it actually makes it more robust. Bugs are easier to find and fix, so fewer go into production.

## 🔶 Conditions: be positive

Our mind works better with positive conditions than negative ones. Let's take an example:

```typescript
if(isLoggedIn) {
   // Do something if the user is logged in... Simple to get, right?
}

// What about this?
if(isNotLoggedIn === false)
// or this?
if(!isNotLoggedIn)
```

## 🔶 Avoid complex conditionals

Similarly, If you have a if whose condition takes 3 lines, I have a bad news for you. Your code is hard to read for your fellow co-workers.

If you have a condition that becomes too complex (more than one operation), extract it in a variable so that intent is clearly conveyed.

```typescript
const doingStuff = (user: User, mission: Mission) => {
  // When do we enter in this if...? I will have to read every single condition and evaluate it against the others conditions... Hard
  if (
    user.type === 'employee' &&
    user.availability === true &&
    mission.slots > 0 &&
    user.jobs.includes(mission.job) &&
    mission.dateStart.isBefore(new Date().addDays(7))
  ) {
    // Let's do stuff!
  }
};
```

That was a bit hard to read, right...? How about this:

```typescript
const doingStuff = (user: User, mission: Mission) => {
  const isUserElligible = user.type === 'employee' && user.availability === true && user.jobs.includes(mission.job)
  const isMissionAvailable = mission.slots > 0 && mission.dateStart.isBefore(new Date().addDays(7)

  // The intent behind the condition is much clearer
  if(isUserElligible && isMissionAvailable) {
    // Let's do stuff!
  }
}
```

## 🔶 Avoid magic numbers

Magic numbers are values that appear in conditions, for example. It's better to extract them in variables or constants, so that the intent behind this value is not lost.

```typescript
const warnUserIfUnderage = (user: User) => {
  // magic number here. Why 21?
  if (user.age < 21) {
    warn(user);
  }
};
```

```typescript
const majorityAge = 21;

// let's refactor to convey intent
const warnUserIfUnderage = (user: User) => {
  const isUserUnderage = user.age < majorityAge;
  if (isUserUnderage) {
    warn(user);
  }
};
```
