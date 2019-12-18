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

### The Parser
Parsing is the process of analyzing the source code, checking it for errors, and breaking it up into parts. 

### The AST
The parser produces a data structure called the **Abstract Syntax Tree** or **AST**. AST is a tree graph of the source code that does not show every detail of the original syntax, but contains structural or content-related details. Certain things are implicit in the tree and do not need to be shown, hence the title abstract. 

> ## Nifty Snippet 
> 2008 was a pivitol moment for JavaScript when Google created the Chrome V8 Engine. The V8 engine is an open source high-performance JavaScript engine, written in C++ and used in the Chrome browser and powers Node JS. The performance outmatched any engine that came before it mainly because it combines 2 parts of the engine, the interpreter and the compiler. Today, all major engines use this same technique.

### The Interpreter

 An interpreter directly executes each line of code line by line, without requiring them to be compiled into a machine language program. Interpreters can use different strategies to increase performance. They can parse the source code and execute it immediately, translate it into more efficient machine code, execute precompiled code made by a compiler, or some combination of these. In the V8 engine, the interpreter outputs bytecode.

> ## Nifty Snippet
> The first JavaScript engine was written by Brendan Eich, the creator of JavaScript, in 1995 for the Netscape navigator web browser. Originally, the JavaScript engine only consisted of an interpreter. This later evolved into the SpiderMonkey engine, still used by the Firefox browser.

### The Compiler

The compiler works ahead of time to convert instructions into a machine-code or lower-level form so that they can be read and executed by a computer.  It runs all of the code and tries to figure out what the code does and then compiles it down into another language that is easier for the computer to read. 

> ## Nifty Snippet
> Have you heard of Babel or TypeScript? They are heavily used in the Javascript ecosystem and you should now have a good idea of what they are:<br/><br/>
Babel is a Javascript compiler that takes your modern JS code and returns  browser compatible JS (older JS code).
Typescript is a superset of Javascript that compiles down to Javascript.<br/><br/>
Both of these do exactly what compilers do: Take one language and convert into a different one!

### The Combo
In modern engines, the interpreter starts reading the code line by line while the **profiler** watches for frequently used code and flags then passes is to the compiler to be optimized. In the end, the JavaScript engine takes the bytecode the interpreter outputs and mixes in the optimized code the compiler outputs and then gives that to the computer. This is called "Just in Time" or **JIT** Compiler. 

> ## Nifty Snippet
> Back in 1995 we had no standard between the browsers for compiling JavaScript.  Compiling code on the browser or even ahead of time was not feasible because all the browsers were competing against each other and could not agree on an executible format.  Even now, different browsers have different approaches on doing things.  Enter **WebAssembly** a standard for binary instruction (executible) format. Keep your eye on WebAssembly to help standardize browsers abilities to exectute JavaScript in the future! [WebAssemby](https://webassembly.org/)

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

~~~javascript
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
~~~
As you can see, if this code gets optimized to return only 1 name, it could become problamatic down the road.

### 2. Hidden Classes

~~~javascript
function Animal(x, y) {
  this.x = x
  this.y = y
}

const obj1 = new Animal(1,2)
const obj2 = new Animal(3,4)

obj1.a = 30
obj1.b = 100
obj2.b = 30
obj2.a = 100

delete obj1.x = 30
~~~
By setting these values in a different order than they were instatiated, we are making the compiler slower because of **hidden classes**.  Hidden classes are what the compiler uses under the hood to say that these 2 objects have the same properties.  If values are introduced in a different order than it was set up in, the compiler can get confused and think they don't have a shared hidden class, they are 2 different things, and will slow down the computation.  Also, the reason the delete keyword shouldn't be used is because it would change the hidden class.

~~~javascript
// This is the more optimized version of the code.

function Animal(x,y) {
  // instantiating a and b in the constructor
  this.a = x 
  this.b = y
}

const obj1 = new Animal(1,2)
const obj2 = new Animal(3,4)

// and setting the values in order
obj1.a = 30
obj1.b = 100
obj2.a = 30
obj2.b = 100
~~~

### 3. Managing Arguments

There are many ways using **arguments** that can cause a function to be unoptimizable.  Be very careful when using arguments and remember:

- #### Safe Ways to Use **arguments**
- &#x25FE; arguments.length
- &#x25FE; arguments[i] when i is a valid interger
- &#x25FE; NEVER use arguments directly without .length or [i]
- &#x25FE; STRICTLY fn.apply(y, arguments) is ok

---

## Call Stack and Memory Heap

The JavaScript engine does a lot of work for us, but 2 of the biggest jobs are reading and executing it.  We need a place to store and write our data and a place to keep track line by line of what's executing.  That's where the **call stack** and the **memory heap** come in.

### Memory Heap

The memory heap is a place to store and write information so that we can use our memory appropriately. It is a place to allocate, use, and remove memory as needed.  Think of it as a stoarage room of boxes that are unordered.

~~~javascript
// tell the memory heap to allocate memory for a number
const number = 11 
// allocate memory for a string
const string = 'some text'
// allocate memory for an object and it's values
const person = {
  first: 'Brittney',
  last: 'Postma'
}
~~~

### Call Stack

The call stack keeps track of where we are in the code, so we can run the program in order.

~~~javascript
function subtractTwo(num) {
    return num - 2
}

function calculate() {
    const sumTotal = 4 + 5
    return subtractTwo(sumTotal)
}
debugger;
calculate()


~~~
Things are placed into the call stack on top and removed as they are finished. It runs in a first in last out mode. Each call stack can point to a location inside the memory heap. In the above snippet the call stack looks like this.
~~~javascript
(anonymous) // file is being ran
// CALL STACK

// hits debugger and stops the file
// step through each line

calculate // steps through calculate() sumTotal = 9
(anonymous)
// CALL STACK

// steps into subtractTwo(sumTotal) num = 9

subtractTwo // returns 9 - 2 
calculate
(anonymous)
// CALL STACK

// subtractTwo() has finished and has been removed

calculate // returns 7
(anonymous)
// CALL STACK

// calculate() has finished and has been removed

(anonymous)
// CALL STACK

// and finally the file is finished and is removed

// CALL STACK
~~~

---

## Stack Overflow

So what happens if you keep calling functions that are nested inside each other?  When this happens its called a **stack overflow**.

~~~javascript
// When a function calls itself,
// it is called RECURSION
function inception() {
  inception()
}

inception()
// returns Uncaught RangeError:
// Maximum call stack size exceeded
~~~

### Garbage Collection

JavaScript is a garbage collected language.  If you allocate memory inside of a function, JavaScript will automatically remove it from the memory heap when the function is done being called.  However, that does not mean you can forget about **memory leaks**. No system is perfect, so it is important to always remember memory management. JavaScript completes garbage collection with a **mark and sweep** method.

![Mark and Sweep Method](mark_and_sweep.gif)

~~~javascript
var person = {
  first: 'Brittney',
  last: 'Postma'
}

person = 'Brittney Postma'
~~~

In the example above a **memory leak** is created.  By changing the variable person from an object to a string, it leaves the values of first and last in the memory heap and does not remove it.  This can be avoided by trying to keep variables out of the global namespace, only instantiate variable inside of functions when possible. JavaScript is a **single threaded** language, meaning only one thing can be executed at a time. It only has one call stack and therefore it is a **synchronous** language.


### Synchronous

So, what is the issue with being a single threaded language? Lets's start from the beginning. When you visit a web page, you run a browser to do so (Chrome, Firefox, Safari, Edge). Each browser has its own version of **JavaScript Runtime** with a set of **Web API's**, methods that developers can access from the window object. In a synchronous language, only one thing can be done at a time. Imagine an alert on the page, blocking the user from accessing any part of the page until the OK button is clicked. If everything in JavaScript that took a significant amount of time, blocked the browser, then we would have a pretty bad user experience. This is where **concurrency** and the **event loop** come in.

### Event Loop and Callback Queue

When you run some JavaScript code in a browser, the engine starts to parse the code.  Each line is executed and popped on and off the call stack.  But, what about Web API's?  Web API's are not something JavaScript recognizes, so the parser knows to pass it off to the browser for it to handle. When the browser has finished running its method, it puts what is needed to be ran by JavaScript into the **callback queue**.  The callback queue cannot be ran until the call stack is completely empty.  So, the **event loop** is constantly checking the call stack to see if it is empty so that it can add anything in the callback queue back into the call stack. And finally, once it is back in the call stack, it is ran and then popped off the stack.

~~~javascript
  console.log('1') 
  // goes on call stack and runs 1
  setTimeout(() => {console.log('2'), 1000}) 
  // gets sent to web api
  // web api waits 1 sec, runs and sends to callback queue
  // the javascript engine keeps going
  console.log('3')
  // goes on call stack and runs 3
  // event loop keeps checking and see call stack is empty
  // event loop sends calback queue into call stack
  // 2 is now ran

  // 1
  // 3
  // 2

  // Example with 0 second timeout

  console.log('1')
  setTimeout(() => {console.log('2'), 0})
  console.log('3')

  // 1
  // 3
  // 2

  // Still has the same output
~~~

In the last example, we get the same output.  How does this work if it waits 0 seconds?  The JavaScript engine will still send off the setTimeout() to the Web API to be ran and it will then go into the callback queue and wait until the call stack is empty to be ran. So, we end up with the exact same end point.

[JS Runtime Playground](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gcHJpbnRIZWxsbygpIHsNCiAgICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBiYXonKTsNCn0NCg0KZnVuY3Rpb24gYmF6KCkgew0KICAgIHNldFRpbWVvdXQocHJpbnRIZWxsbywgMzAwMCk7DQp9DQoNCmZ1bmN0aW9uIGJhcigpIHsNCiAgICBiYXooKTsNCn0NCg0KZnVuY3Rpb24gZm9vKCkgew0KICAgIGJhcigpOw0KfQ0KDQpmb28oKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

<p align='center'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

> ## Nifty Snippet
> Until 2009, JavaScript was only ran inside of the browser. That is when Ryan Dahl decided it would be great if we could use JavaScript to build things outside the browser.  He used C and C++ to build an executible (exe) program called Node JS. Node JS is a JavaScript runtime environment built on Chrome's V8 engine that uses C++ to provide the event loop and callback queue needed to run asyncronous operations. 
> <p align='center'><img src="node_js.png" alt="node js runtime" width="100%"></p>

</div>