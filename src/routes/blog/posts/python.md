---
title: Python
date: 01/17/2019
---
<p align="center">
<img src="python.png" alt="python logo"/>
</p>


Right away, I am impressed with the Python site by giving you up front details and tutorials on how to learn the language.

[Python.org](https://www.python.org/)

[Getting started with Python](https://www.python.org/)

[Python for Programmers Tutorials](https://wiki.python.org/moin/BeginnersGuide/Programmers)<br/><br/>

Disclaimer: I came from a JavaScript background and this will be starting from a more advanced level than someone who is new to programming. The links above do go through some more of the basics. Also, fair warning for when I start comparing things to JavaScript 😏

---

Python is:

- **strongly typed** - types are enforced 
- **dynamic** - checked during execution, not before
- **implicit** - variables do not need to be declared
- **object-oriented** - everything is an object

## Syntax

Python does not have a mandatory character (like semicolon ;) to close off a statment and blocks are specified by indentation. Statements that need an indentation after end in a colon  (:). Failing to indent a block of code will result in a syntax error. Comments start with the pound or hastag (#) symbol for a single line and 3 string characters (''') to start and end the block for multi-line comments. Assignment is done with the equals (=) sign, and testing equality is done with a double equals (==). You can also shortcut increment/decrement characters with (+=/-=).

```py
a = 5 #no semicolon here
b = 2
if a > b:
    print(a 'is greater than' b) 
elif a == b:
    print(a 'is equal to' b)
else:
    print(a 'is less than' b))
'''
not indenting the print line
will give a syntax error
'''
```
