---
title: Advanced JS
---

<div style="max-width: 86vw">

## Advanced Javascript Concepts

<p align="center">
  <img src="Advanced_Javascript.png" alt="Advanced Javascript Course Map" width="100%">
</p>

[Course Map](https://coggle.it/diagram/XE3ZoVj-rtA5hcxj/t/advanced-javascript)

---

### JavaScript Engine

A JavaScript engine is a computer program that you give JavaScript code to and it tells the computer how to execute it. Basically a translator for the computer between JavaScript and a language that the computer understands. But what happens inside of the engine? Well, that depends on the engine. There are many JavaScript Engines out there and typically they are created by web browser vendors. All engines are standardized by ECMA Script or **ES**.

[List of JavaScript Engines](https://en.wikipedia.org/wiki/List_of_ECMAScript_engines)

<p align="center">
  <img src="javascript_engine.png" alt="javascript engine image" width="100%">
</p>

> **Nifty Snippet**: 2008 was a pivitol moment for JavaScript when Google created the Chrome V8 Engine. The V8 engine is an open source high-performance JavaScript engine, written in C++ and used in the Chrome browser and powers Node JS. The performance outmatched any engine that came before it mainly because it combines 2 parts of the engine, the interpreter and the compiler. Today, all major engines use this same technique.

### The Parser

Parsing is the process of analyzing the source code, checking it for errors, and breaking it up into parts.

### The AST

The parser produces a data structure called the **Abstract Syntax Tree** or **AST**. AST is a tree graph of the source code that does not show every detail of the original syntax, but contains structural or content-related details. Certain things are implicit in the tree and do not need to be shown, hence the title abstract.

### The Interpreter

An interpreter directly executes each line of code line by line, without requiring them to be compiled into a machine language program. Interpreters can use different strategies to increase performance. They can parse the source code and execute it immediately, translate it into more efficient machine code, execute precompiled code made by a compiler, or some combination of these. In the V8 engine, the interpreter outputs bytecode.

> **Nifty Snippet**: The first JavaScript engine was written by Brendan Eich, the creator of JavaScript, in 1995 for the Netscape navigator web browser. Originally, the JavaScript engine only consisted of an interpreter. This later evolved into the SpiderMonkey engine, still used by the Firefox browser.

### The Compiler

The compiler works ahead of time to convert instructions into a machine-code or lower-level form so that they can be read and executed by a computer. It runs all of the code and tries to figure out what the code does and then compiles it down into another language that is easier for the computer to read. Have you heard of Babel or TypeScript? They are heavily used in the Javascript ecosystem and you should now have a good idea of what they are. Babel is a Javascript compiler that takes your modern JS code and returns browser compatible JS (older JS code). Typescript is a superset of Javascript that compiles down to Javascript. Both of these do exactly what compilers do. Take one language and convert into a different one!

### The Combo

In modern engines, the interpreter starts reading the code line by line while the **profiler** watches for frequently used code and flags then passes is to the compiler to be optimized. In the end, the JavaScript engine takes the bytecode the interpreter outputs and mixes in the optimized code the compiler outputs and then gives that to the computer. This is called "Just in Time" or **JIT** Compiler.

> **Nifty Snippet**: Back in 1995 we had no standard between the browsers for compiling JavaScript. Compiling code on the browser or even ahead of time was not feasible because all the browsers were competing against each other and could not agree on an executible format. Even now, different browsers have different approaches on doing things. Enter **WebAssembly** a standard for binary instruction (executible) format. Keep your eye on WebAssembly to help standardize browsers abilities to exectute JavaScript in the future! [WebAssemby](https://webassembly.org/)

---

## Writing Optimized Code

We want to write code that helps the compiler make its optimizations, not work against it making the engine slower. Here are a few things you should avoid when writing your code if possible:

- &#x25FE; eval()
- &#x25FE; arguments
- &#x25FE; for in
- &#x25FE; with
- &#x25FE; delete

There are a few main reasons these should be avoided.

[JavaScript Hidden Classes and Inline Caching in V8](https://richardartoul.github.io/jekyll/update/2015/04/26/hidden-classes.html)
[Managing Arguments](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments)

### 1. Inline Caching

```javascript
function findUser(user) {
  return `found ${user.firstName} ${user.lastName}`
}

const userData = {
  firstName: 'Brittney',
  lastName: 'Postma
}

findUser(userData)

// if this findUser(userData) is called multiple times,
// then it will be optimized (inline cached) to just be 'found Brittney Postma'
```

As you can see, if this code gets optimized to return only 1 name, it could become problamatic down the road.

### 2. Hidden Classes

```javascript
function Animal(x, y) {
  this.x = x;
  this.y = y;
}

const obj1 = new Animal(1, 2);
const obj2 = new Animal(3, 4);

obj1.a = 30;
obj1.b = 100;
obj2.b = 30;
obj2.a = 100;

delete obj1.x = 30;
```

By setting these values in a different order than they were instatiated, we are making the compiler slower because of **hidden classes**. Hidden classes are what the compiler uses under the hood to say that these 2 objects have the same properties. If values are introduced in a different order than it was set up in, the compiler can get confused and think they don't have a shared hidden class, they are 2 different things, and will slow down the computation. Also, the reason the delete keyword shouldn't be used is because it would change the hidden class.

```javascript
// This is the more optimized version of the code.

function Animal(x, y) {
  // instantiating a and b in the constructor
  this.a = x;
  this.b = y;
}

const obj1 = new Animal(1, 2);
const obj2 = new Animal(3, 4);

// and setting the values in order
obj1.a = 30;
obj1.b = 100;
obj2.a = 30;
obj2.b = 100;
```

### 3. Managing Arguments

There are many ways using **arguments** that can cause a function to be unoptimizable. Be very careful when using arguments and remember:

- #### Safe Ways to Use **arguments**
- &#x25FE; arguments.length
- &#x25FE; arguments[i] when i is a valid interger
- &#x25FE; NEVER use arguments directly without .length or [i]
- &#x25FE; STRICTLY fn.apply(y, arguments) is ok

---

## Call Stack and Memory Heap

The JavaScript engine does a lot of work for us, but 2 of the biggest jobs are reading and executing it. We need a place to store and write our data and a place to keep track line by line of what's executing. That's where the **call stack** and the **memory heap** come in.

### Memory Heap

The memory heap is a place to store and write information so that we can use our memory appropriately. It is a place to allocate, use, and remove memory as needed. Think of it as a stoarage room of boxes that are unordered.

```javascript
// tell the memory heap to allocate memory for a number
const number = 11;
// allocate memory for a string
const string = "some text";
// allocate memory for an object and it's values
const person = {
  first: "Brittney",
  last: "Postma"
};
```

### Call Stack

The call stack keeps track of where we are in the code, so we can run the program in order.

```javascript
function subtractTwo(num) {
  return num - 2;
}

function calculate() {
  const sumTotal = 4 + 5;
  return subtractTwo(sumTotal);
}
debugger;
calculate();
```

Things are placed into the call stack on top and removed as they are finished. It runs in a first in last out mode. Each call stack can point to a location inside the memory heap. In the above snippet the call stack looks like this.

```javascript
anonymous; // file is being ran
// CALL STACK

// hits debugger and stops the file
// step through each line

calculate(
  // steps through calculate() sumTotal = 9
  anonymous
);
// CALL STACK

// steps into subtractTwo(sumTotal) num = 9

subtractTwo; // returns 9 - 2
calculate(anonymous);
// CALL STACK

// subtractTwo() has finished and has been removed

calculate(
  // returns 7
  anonymous
)(
  // CALL STACK

  // calculate() has finished and has been removed

  anonymous
);
// CALL STACK

// and finally the file is finished and is removed

// CALL STACK
```

---

## Stack Overflow

So what happens if you keep calling functions that are nested inside each other? When this happens its called a **stack overflow**.

```javascript
// When a function calls itself,
// it is called RECURSION
function inception() {
  inception();
}

inception();
// returns Uncaught RangeError:
// Maximum call stack size exceeded
```

### Garbage Collection

JavaScript is a garbage collected language. If you allocate memory inside of a function, JavaScript will automatically remove it from the memory heap when the function is done being called. However, that does not mean you can forget about **memory leaks**. No system is perfect, so it is important to always remember memory management. JavaScript completes garbage collection with a **mark and sweep** method.

<a href="https://developers.soundcloud.com/blog/garbage-collection-in-redux-applications" rel="noopener noreferrer" target="_blank" style="display: flex; justify-content: center;">Mark and Sweep Method</a>

<p align='center'>
<img src="mark_and_sweep.gif" alt="mark and sweep figure" width="50%"/>
</p>

---

```javascript
var person = {
  first: "Brittney",
  last: "Postma"
};

person = "Brittney Postma";
```

In the example above a **memory leak** is created. By changing the variable person from an object to a string, it leaves the values of first and last in the memory heap and does not remove it. This can be avoided by trying to keep variables out of the global namespace, only instantiate variable inside of functions when possible. JavaScript is a **single threaded** language, meaning only one thing can be executed at a time. It only has one call stack and therefore it is a **synchronous** language.

### Synchronous

So, what is the issue with being a single threaded language? Lets's start from the beginning. When you visit a web page, you run a browser to do so (Chrome, Firefox, Safari, Edge). Each browser has its own version of **JavaScript Runtime** with a set of **Web API's**, methods that developers can access from the window object. In a synchronous language, only one thing can be done at a time. Imagine an alert on the page, blocking the user from accessing any part of the page until the OK button is clicked. If everything in JavaScript that took a significant amount of time, blocked the browser, then we would have a pretty bad user experience. This is where **concurrency** and the **event loop** come in.

### Event Loop and Callback Queue

When you run some JavaScript code in a browser, the engine starts to parse the code. Each line is executed and popped on and off the call stack. But, what about Web API's? Web API's are not something JavaScript recognizes, so the parser knows to pass it off to the browser for it to handle. When the browser has finished running its method, it puts what is needed to be ran by JavaScript into the **callback queue**. The callback queue cannot be ran until the call stack is completely empty. So, the **event loop** is constantly checking the call stack to see if it is empty so that it can add anything in the callback queue back into the call stack. And finally, once it is back in the call stack, it is ran and then popped off the stack.

```javascript
console.log("1");
// goes on call stack and runs 1
setTimeout(() => {
  console.log("2"), 1000;
});
// gets sent to web api
// web api waits 1 sec, runs and sends to callback queue
// the javascript engine keeps going
console.log("3");
// goes on call stack and runs 3
// event loop keeps checking and see call stack is empty
// event loop sends calback queue into call stack
// 2 is now ran

// 1
// 3
// 2

// Example with 0 second timeout

console.log("1");
setTimeout(() => {
  console.log("2"), 0;
});
console.log("3");

// 1
// 3
// 2

// Still has the same output
```

In the last example, we get the same output. How does this work if it waits 0 seconds? The JavaScript engine will still send off the setTimeout() to the Web API to be ran and it will then go into the callback queue and wait until the call stack is empty to be ran. So, we end up with the exact same end point.

<a href="http://latentflip.com/loupe/?code=ZnVuY3Rpb24gcHJpbnRIZWxsbygpIHsNCiAgICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBiYXonKTsNCn0NCg0KZnVuY3Rpb24gYmF6KCkgew0KICAgIHNldFRpbWVvdXQocHJpbnRIZWxsbywgMzAwMCk7DQp9DQoNCmZ1bmN0aW9uIGJhcigpIHsNCiAgICBiYXooKTsNCn0NCg0KZnVuY3Rpb24gZm9vKCkgew0KICAgIGJhcigpOw0KfQ0KDQpmb28oKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D" rel="noopener noreferrer" target="_blank" style="display: flex; justify-content: center;">JS Runtime Playground</a>

<p align='center'>
<iframe width="75%" height="350" src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

> **Nifty Snippet**: Until 2009, JavaScript was only ran inside of the browser. That is when Ryan Dahl decided it would be great if we could use JavaScript to build things outside the browser. He used C and C++ to build an executible (exe) program called Node JS. Node JS is a JavaScript runtime environment built on Chrome's V8 engine that uses C++ to provide the event loop and callback queue needed to run asyncronous operations.
>
> <p align='center'><img src="node_js.png" alt="node js runtime" width="100%"></p>

---

## Execution Context

Code in JavaScript is always ran inside a type of **execution context**. Execution context is simply the environment within which your code is ran. There are 2 types of execution context in JavaScript, global or function. There are 2 stages as well to each context, the creation and executing phase. As the JavaScript engine starts to read your code, it creates something called the **Global Execution Context**.

### Global Execution Context

- #### Creation Phase
- 1\. global object created
- 2\. initializes _this_ keyword to global

- #### Executing Phase
- 3\. Variable Environment created - _memory space for var variables and functions created_
- 4\. initializes all variables to _undefined_ (also known as **hoisting**) and places them with any functions into memory

```javascript
this;
window;
this === window;

// Window {...}
// Window {...}
// true
```

### Function Execution Context

Only when a function is invoked, does a function execution context get created.

- #### Creation Phase
- 1\. argument object created with any arguments
- 2\. initializes _this_ keyword to point called or to the global object if not specified

- #### Executing Phase
- 3\. Variable Environment created - _memory space for variable and functions created_
- 4\. initializes all variables to _undefined_ and places them into memory with any new functions

```javascript
// Function Execution Context creates arguments object and points 'this' to the function
function showArgs(arg1, arg2) {
  console.log("arguments: ", arguments);
  return `argument 1 is: ${arg1} and argument 2 is: ${arg2}`;
}

showArgs("hello", "world");

// arguments: { 0: 'hello', 1: 'world' }
// argument 1 is hello and argument 2 is world

function noArgs() {
  console.log("arguments: ", arguments);
}

noArgs();

// arguments: {}
// even though there are no arguments, the object is still created
```

The keyword arguments can be dangerous to use in your code as is. In ES6, a few methods were introduced that can help better use arguments.

```javascript
function showArgs(arg1, arg2) {
  console.log("arguments: ", arguments);
  console.log(Array.from(arguments));
}

showArgs("hello", "world");

// arguments: { 0: 'hello', 1: 'world' }
// [ 'hello', 'world' ]

function showArgs2(...args) {
  console.log(console.log("arguments: ", args));
  console.log(Array.from(arguments));
  return `${args[0]} ${args[1]}`;
}

showArgs2("hello", "world");

// arguments: [ 'hello', 'world' ]
// [ 'hello', 'world' ]
// hello world
```

> ## Arrow Functions
>
> Some people think of arrow functions as just being syntactic sugar for a reguar function, but arrow functions work a bit differently than a regular function. They are a compact alternative to a regular function, but also without its own bindings to **this**, **arguments**, **super**, or **new.target** keywords. Arrow functions cannot be used as constuctors and are not the best option for methods.
>
> ````javascript
> var obj = {
>   // does not create a new scope
>   i: 10,
>   b: () => console.log(this.i, this),
>   c: function() {
>     console.log(this.i, this);
>   }
> };
>
> obj.b(); // prints undefined, Window {...} (or the global object)
> obj.c(); // prints 10, Object {...}```
> ````

---

## Hoisting

Hoisting is the process of putting all variable and function declarations into memory during the compile phase. In JavaScript, functions are fully hoisted, var variables are hoisted and initialized to undefined, and let and const variables are hoisted but not initialized a value. Var variables are given a memory allocation and initialized a value of undefined until they are set to a value in line. So if a var variable is used in the code before it is initialized, then it will return undefined. However, a function can be called from anywhere in the code base because it is fully hoisted. If let and const are used before they are declared, then they will throw a reference error because they have not yet been initialized.

```javascript
// function expression gets hoisted as undefined
var sing = function() {
  console.log("uhhhh la la la");
};
// function declaration gets fully hoisted
function sing2() {
  console.log("ohhhh la la la");
}
```

<br/>

```javascript
// function declaration gets hoisted
function a() {
  console.log("hi");
}

// function declaration get rewritten in memory
function a() {
  console.log("bye");
}

console.log(a());
// bye
```

<br/>

```javascript
// variable declaration gets hoisted as undefined
var favoriteFood = "grapes";

// function expression gets hoisted as undefined
var foodThoughts = function() {
  // new execution context created favoriteFood = undefined
  console.log(`Original favorite food: ${favoriteFood}`);

  // variable declaration gets hoisted as undefined
  var favoriteFood = "sushi";

  console.log(`New favorite food: ${favoriteFood}`);
};

foodThoughts();
```

> ## Takeaways
>
> Avoid hoisting when possible. It can cause memory leaks and hard to catch bugs in your code. Use _let_ and _const_ as your go to variables.

---

## Lexical Environment

A **lexical environment** is basically the _scope_ or environment the engine is currently reading code in. A new lexical environment is created when curly brackets {} are used, even nested brackets {{...}} create a new lexical environment. The execution context tells the engine which lexical environment it is currently working in and the lexical scope determines the available variables.

```javascript
function one() {
  var isValid = true; // local env
  two(); // new execution context
}

function two() {
  var isValid; // undefined
}

var isValid = false; // global
one();

/* 
   two() isValid = undefined
   one() isValid = true
   global() isValid = false
   ------------------------
   call stack
*/
```

---

## Scope Chain

Each environment context that is created has a link outside of its lexical environment called the scope chain. The scope chain gives us access to variables in the parent environment.

```javascript
var x = "x";

function findName() {
  console.log(x);
  var b = "b";
  return printName();
}

function printName() {
  var c = "c";
  return "Brittney Postma";
}

function sayMyName() {
  var a = "a";
  return findName();
}

sayMyName();

// sayMyName runs a = 'a'
// findName runs
// x
// b = 'b'
// printName runs c = 'c'
// Brittney Postma
```

In this example, all the functions have access to the global variable **x**, but trying to access a variable from another function would return an error. The example below will show how the scope chain links each function.

```javascript
function sayMyName() {
  var a = "a";
  console.log(b, c); // returns error
  return function findName() {
    var b = "b";
    console.log(a); // a
    console.log(c); // returns error
    return function printName() {
      var c = "c";
      console.log(a, b); // a, b
    };
  };
}

sayMyName()()(); //each function is returned and has to be called
```

In this example, you can see that the functions only get access to the variables in their parent container, not a child. The scope chain only links down the call stack, so you almost have to think of it in reverse. It goes up to the parent, but down the call stack.

<p align='center'>
<img src="scope_chain.png" alt="scope chain" width="100%"/>
</p>

### JavaScript is Weird

```javascript
// It asks global scope for height.
// Global scope says: ummm... no but here I just created it for you.
// We call this leakage of global variables.
// Adding 'use strict' to the file prevents this and causes an error.
function weird() {
  height = 50;
}

var heyhey = function doodle() {
  // code here
};

heyhey();
doodle(); // Error! because it is enclosed in its own scope.
```

---

## Function and Block Scope

Most programing languages are block scoped, meaning every time you see a new { } (curly braces) is a new lexical environment. However, JavaScript is function scoped, meaning it only creates a new local environment if it sees the keyword function on the global scope. To give us access to block scope, in ES6 _let_ and _const_ were added to the language. Using these can prevent memory leaks, but there is still an argument to be made for using _var_.

```javascript
//Function Scope
function loop() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log("final", i); // returns final 5
}

//Block Scope
function loop2() {
  for (let i = 0; i < 5; i++) {
    // can access i here
  }
  console.log("final", i); // returns an error here
}

loop();
/*
  1
  2
  3
  4
  final 5
*/
loop2();
// ReferenceError: i is not defined
```

> ## let and const
>
> Variable declarations with _let_ and _const_ work differently from the _var_ variable declaration and I wanted to take a minute to explain. When a lexical scope is entered and the execution context is created, the engine allocates memory for any _var_ variable in that scope and initializes it to undefined. The _let_ and _const_ variables only get initialized on the line they are executed on and only get allocated undefined if there is no assignment to the variable. Trying to access a _let_ or _const_ variable before it is declared or outside of its block without returning it will result in a Reference Error.

---

## IIFE - Immediately Invoked Function Expression

Immediately Invoked Function Expression or more simply **IIFE** is a JavaScript function that runs as soon as it is defined. Can also be refered to as a Self-Executing Anonymous Function.

```javascript
// Grouping Operator () creates a lexical scope
(function() {
  // statements
})();
// Immediately invokes the function with 2nd set of ()
```

> ## Takeaways
>
> <p align='center'>
> Avoid polluting the global namespace or scope when possible.<br/>
>   <img src="pollute.gif" alt="Don't Pollute" width="100%"/>
> </p>

---

## this

<p align='center'>
  <img src="dun.png" alt="dun dun duuun" width="25%"/><br/>
  Here we are...
</p>

The moment has arrived, time to talk about **this**. What is **this**? Why is **this** so confusing? For some, **this** is the scariest part of JavaScript. Well, hopefully we can clear some things up.

> **this** is the **_object_** that the **_function_** is a property of

There that's simple right? Well, maybe not, what does that mean? Back in Execution Context, we talked about how the JavaScript engine creates the global execution context and initializes _this_ to the global window object.

```javascript
this; // Window {...}
window; // Window {...}
this === window; // true

function a() {
  console.log(this);
}

a();

// Window {...}
```

In the example above, it is easy to understand that _this_ is equal to the window object, but what about inside of function a? Well, what object is function a apart of? In the dev tools, if you expand the window object and scroll down the list, you will see a() is a method on the window object. By calling a(), you are essentially saying window.a() to the console.

```javascript
const obj = {
  property: `I'm a property of obj.`,
  method: function() {
    // this refers to the object obj
    console.log(this.property);
  }
};
obj.method();
// I'm a property of obj.
```

> **this** refers to whatever is on the left of the . (dot) when calling a method
>
> ```javascript
> // obj is to the left of the dot
> obj.method();
> ```

Still confused? Try this:

```javascript
function whichName() {
  console.log(this.name);
}

var name = "window";

const obj1 = {
  name: "Obj 1",
  whichName
};
const obj2 = {
  name: "Obj 2",
  whichName
};

whichName(); // window
obj1.whichName(); // Obj 1
obj2.whichName(); // Obj 2
```

Another way to look at **this** is to check which object called it.

```javascript
const a = function() {
  console.log("a", this);
  const b = function() {
    console.log("b", this);
    const c = {
      hi: function() {
        console.log("c", this);
      }
    };
    c.hi(); // new obj c called function
  };
  b(); // ran by a window.a(b())
};
a(); // called by window

// a Window {…}
// b Window {…}
// c {hi: ƒ}
```

### Lexical vs Dynamic Scope

A big gotcha for a lot of people working with \*this is when a function is ran inside of another function. It gets a little confusing, but we can remember who called the function.

```javascript
const obj = {
  name: "Billy",
  sing() {
    console.log("a", this);
    var anotherFunc = function() {
      console.log("b", this);
    };
    anotherFunc();
  }
};
obj.sing();

// a {name: "Billy", sing: ƒ}
// b Window {…}
```

In the example above, the obj called sing() and then anotherFunc() was called within the sing() function. In JavaScript, that function defaults to the Window object. It happens because everything in JavaScript is lexically scoped except for the **this** keyword. It doesn't matter where it is written, it matters how it is called. Changing anotherFunc() instead to an arrow function will fix this problem, as seen below. Arrow functions do not bind or set their own context for **this**. If **this** is used in an arrow function, it is taken from the outside. Arrow functions also have no **arguments** created as functions do.

```javascript
const obj = {
  name: "Billy",
  sing() {
    console.log("a", this);
    var anotherFunc = () => {
      console.log("b", this);
    };
    anotherFunc();
  }
};
obj.sing();

// a {name: "Billy", sing: ƒ}
// b {name: "Billy", sing: ƒ}
```

Okay, last example to really solidify our knowledge of **this**.

```javascript
var b = {
  name: "jay",
  say() {
    console.log(this);
  }
};

var c = {
  name: "jay",
  say() {
    return function() {
      console.log(this);
    };
  }
};

var d = {
  name: "jay",
  say() {
    return () => console.log(this);
  }
};

b.say(); // b {name: 'jay', say()...}
// b called the function
c.say(); // function() {console.log(this)}
// returned a function that gets called later
c.say()(); // Window {...}
// c.say() gets the function and the Window runs it
d.say(); // () => console.log(this)
// returned the arrow function
d.say()(); // d {name: 'jay', say()...}
// arrow function does not rebind this and inherits this from parent
```

After everything is said and done, using **this** can still be a bit confusing. If you aren't sure what it's referencing, just console.log(this) and see where it's pointing.

---

## Call, Apply, Bind

### Call

Call is a method of an object that can substitute a different object than the one it is written on.

```javascript
const wizard = {
  name: "Merlin",
  health: 100,
  heal(num1, num2) {
    return (this.health += num1 + num2);
  }
};

const archer = {
  name: "Robin Hood",
  health: 30
};
console.log(archer); // health: 30

wizard.heal.call(archer, 50, 20);

console.log(archer); // health: 100
```

In this example call is used to _borrow_ the heal method from the wizard and is used on the archer (which is actually pointing _this_ to archer), with the optional arguments added.

### Apply

Apply is almost identical to call, except that instead of a comma separated list of arguments, it takes an array of arguments.

```javascript
// instead of this
// wizard.heal.call(archer, 50, 20)
// apply looks like this
wizard.heal.apply(archer, [50, 20]);
// this has the same result
```

### Bind

Unlike call and apply, bind does not run the method it is used on, but rather returns a new function that can then be called later.

```javascript
console.log(archer); // health: 30
const healArcher = wizard.heal.bind(archer, 50, 20);
healArcher();
console.log(archer); // health: 100
```

### Currying with bind

Currying is breaking down a function with multiple arguments into one or more functions that each accept a single argument.

```javascript
function multiply(a, b) {
  return a * b;
}

let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(4); // 8

let multiplyByTen = multiply.bind(this, 10);
multiplyByTen(6); // 60
```

> **Exercise**: Find the largest number in an array
>
> ```javascript
> const array = [1, 2, 3];
>
> function getMaxNumber(arr) {
>   return Math.max.apply(null, arr);
> }
>
> getMaxNumber(array); // 3
> ```

> **Exercise 2**: How would you fix this?
>
> ```javascript
> const character = {
>   name: "Simon",
>   getCharacter() {
>     return this.name;
>   }
> };
> const giveMeTheCharacterNOW = character.getCharacter;
>
> //How Would you fix this?
> console.log("?", giveMeTheCharacterNOW()); //this should return 'Simon' but doesn't
> // ANSWER
> // change this line
> const giveMeTheCharacterNOW = character.getCharacter.bind(character);
> console.log("?", giveMeTheCharacterNOW()); // ? Simon
> ```

---

## JavaScript Types

I go into all of the types over in the [JavaScript](https://console-logs.netlify.com/blog/javascript) section, but I wanted to take a deeper dive into types in JavaScript.

<table class="standard-table">
	<thead>
		<tr>
			<th>Type</th>
			<th>Result</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Glossary/Undefined" title="Undefined: undefined is a primitive value automatically assigned to variables that have just been declared, or to formal arguments for which there are no actual arguments.">Undefined</a></td>
			<td><code>undefined</code></td>
		</tr>
		<tr>
			<td><a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Glossary/Null" title="Null: In computer science, a null value represents a reference that points, generally intentionally, to a nonexistent or invalid object or address. The meaning of a null reference varies among language implementations.">Null</a></td>
			<td><code>object*</code></td>
		</tr>
		<tr>
			<td><a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Glossary/Boolean" title="Boolean: In computer science, a Boolean is a logical data type that can have only the values true or false.">Boolean</a></td>
			<td><code>boolean</code></td>
		</tr>
		<tr>
			<td><a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Glossary/Number" title="Number: In JavaScript, Number is a numeric data type in the double-precision 64-bit floating point format (IEEE 754). In other programming languages different numeric types can exist, for examples: Integers, Floats, Doubles, or Bignums.">Number</a></td>
			<td><code>number</code></td>
		</tr>
		<tr>
			<td><a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Glossary/BigInt" title="BigInt: In JavaScript, BigInt is a numeric data type that can represent integers in the arbitrary precision format. In other programming languages different numeric types can exist, for examples: Integers, Floats, Doubles, or Bignums.">BigInt</a> (new in ECMAScript 2020)</td>
			<td><code>bigint</code></td>
		</tr>
		<tr>
			<td><a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Glossary/String" title="String: In any computer programming language, a string is a sequence of characters used to represent text.">String</a></td>
			<td><code>string</code></td>
		</tr>
		<tr>
			<td><a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Glossary/Symbol" title="Symbol: In JavaScript, Symbol is a primitive value.">Symbol</a> (new in ECMAScript 2015)</td>
			<td><code>symbol</code></td>
		</tr>
		<tr>
			<td><a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Glossary/Function" title="Function: A function is a code snippet that can be called by other code or by itself, or a variable that refers to the function. When a function is called, arguments are passed to the function as input, and the function can optionally return a value. A function in JavaScript is also an object.">Function</a> object</td>
			<td><code>function</code></td>
		</tr>
		<tr>
			<td>Any other object</td>
			<td><code>object</code></td>
		</tr>
	</tbody>
</table>

> ***Null** - Why does the typeof null return object? When JavaScript was first implemented, values were represented as a type tag and a value.  The objects type tag was 0 and the _NULL_ pointer (0x00 in most platforms) consequently had 0 as a type tag as well. A fix was proposed that would have made _typeof null === 'null'_, but it was rejected due to legacy code that would have broken.

```javascript
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof(42) === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // Despite being "Not-A-Number"
typeof Number('1') === 'number';      // Number tries to parse things into numbers
typeof Number('shoe') === 'number';   // including values that cannot be type coerced to a number

typeof 42n === 'bigint';


// Strings
typeof '' === 'string';
typeof "bla" === 'string';
typeof `template literal` === 'string';
typeof '1' === 'string'; // note that a number within a string is still typeof string
typeof (typeof 1) === 'string'; // typeof always returns a string
typeof String(1) === 'string'; // String converts anything into a string, safer than toString


// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(1) === 'boolean'; // Boolean() will convert values based on if they're truthy or falsy
typeof !!(1) === 'boolean'; // two calls of the ! (logical NOT) operator are equivalent to Boolean()


// Symbols
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'


// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 


// Objects
typeof {a: 1} === 'object';

// use Array.isArray or Object.prototype.toString.call
// to differentiate regular objects from arrays
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';
typeof /regex/ === 'object'; // See Regular expressions section for historical results


// The following are confusing, dangerous, and wasteful. Avoid them.
typeof new Boolean(true) === 'object'; 
typeof new Number(1) === 'object'; 
typeof new String('abc') === 'object';


// Functions
typeof function() {} === 'function';
typeof class C {} === 'function';
typeof Math.sin === 'function';
```
> **Undefined vs Null**: Undefined is the absence of definition, it has yet to be defined, and null is the absence of value, there is no value there.

### Objects in JavaScript

Objects are one of the broadest types in JavaScript, almost "everything" is an object. [MDN Standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

- &#x25FE; Booleans can be objects (if defined with the new keyword)
- &#x25FE; Numbers can be objects (if defined with the new keyword)
- &#x25FE; Strings can be objects (if defined with the new keyword)
- &#x25FE; Dates are always objects
- &#x25FE; Maths are always objects
- &#x25FE; Regular expressions are always objects
- &#x25FE; Arrays are always objects
- &#x25FE; Functions are always objects
- &#x25FE; Objects are always objects

### Primitive vs Non Primitive

**Primitive** - Primitive values are defined by being immutable, they cannot be altered. The variable assigned to a primitive type may be reassigned to a new value, but the original value can not be changed in the same way objects can be modified. Primitives are **passed by value**, meaning their values are copied and then placed somewhere else in the memory. They are also compared by value. There are currently 7 primitive data types in JavaScript.

- &#x25FE; string
- &#x25FE; number
- &#x25FE; bigint
- &#x25FE; boolean
- &#x25FE; null
- &#x25FE; undefined
- &#x25FE; symbol

**Non Primitive** - That only leaves us with _objects_. Objects are able to be mutated and their properties are **passed by reference**, meaning their properties are not stored separately. A new variable pointing to an object will not create a copy, but reference the same object. Changing the 2nd object will also change the first.
</div>
