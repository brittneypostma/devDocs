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

#### The Parser
Parsing is the process of analyzing the source code, checking it for errors, and breaking it up into parts. 

#### The AST
The parser produces a data structure called the **Abstract Syntax Tree** or **AST**. AST is a tree graph of the source code that does not show every detail of the original syntax, but contains structural or content-related details. Certain things are implicit in the tree and do not need to be shown, hence the title abstract. 

> ## Nifty Snippet 
> 2008 was a pivitol moment for JavaScript when Google created the Chrome V8 Engine. The V8 engine is an open source high-performance JavaScript engine, written in C++ and used in the Chrome browser and powers Node JS. The performance outmatched any engine that came before it mainly because it combines 2 parts of the engine, the interpreter and the compiler. Today, all major engines use this same technique.

#### The Interpreter

 An interpreter directly executes each line of code line by line, without requiring them to be compiled into a machine language program. Interpreters can use different strategies to increase performance. They can parse the source code and execute it immediately, translate it into more efficient machine code, execute precompiled code made by a compiler, or some combination of these. In the V8 engine, the interpreter outputs bytecode.

> ## Nifty Snippet
> The first JavaScript engine was written by Brendan Eich, the creator of JavaScript, in 1995 for the Netscape navigator web browser. Originally, the JavaScript engine only consisted of an interpreter. This later evolved into the SpiderMonkey engine, still used by the Firefox browser.

#### The Compiler

The compiler works ahead of time to convert instructions into a machine-code or lower-level form so that they can be read and executed by a computer.  It runs all of the code and tries to figure out what the code does and then compiles it down into another language that is easier for the computer to read. 

> ## Nifty Snippet
> Have you heard of Babel or TypeScript? They are heavily used in the Javascript ecosystem and you should now have a good idea of what they are:<br/><br/>
Babel is a Javascript compiler that takes your modern JS code and returns  browser compatible JS (older JS code).
Typescript is a superset of Javascript that compiles down to Javascript.<br/><br/>
Both of these do exactly what compilers do: Take one language and convert into a different one!

#### The Combo
In modern engines, the interpreter starts reading the code line by line while the **profiler** watches for frequently used code and flags then passes is to the compiler to be optimized. In the end, the JavaScript engine takes the bytecode the interpreter outputs and mixes in the optimized code the compiler outputs and then gives that to the computer. This is called "Just in Time" or **JIT** Compiler. 

---

</div>