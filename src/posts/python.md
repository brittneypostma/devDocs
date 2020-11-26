---
title: Python
image: ./logos/python.svg
---

<div class="post">
<div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Syntax](#syntax)
- [Variables](#variables)
- [Operators](#operators)
	- [Math Operators](#math-operators)
	- [Relational Operators](#relational-operators)
	- [Logical Operators](#logical-operators)
- [Types](#types)
- [Keywords](#keywords)

 </div>

<div id="main">

<p align="center">
<img src="python.png" alt="python logo"/>
</p>

<p style="text-align: center;"><strong>
These are my notes while taking the <a href="https://academy.zerotomastery.io/p/complete-python-developer-zero-to-mastery?affcode=441520_gjue7n-1">Complete Python Developer</a> course by Andrei Neagoie on ZTM Academy.</strong>
</p><br/>
<br/>

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

Python does not have a mandatory character (like semicolon ;) to close off a statement, the end of a statement is marked by a newline character. To continue a statement to multiple lines, use the line continuation character (\\). Blocks are specified by four spaces or a tab indentation, not including the indentation will result in a syntax error. Statements that need an indentation after end in a colon (:). Failing to indent a block of code will result in a syntax error. Comments start with the pound or hashtag (#) symbol for a single line and 3 string characters (''') to start and end the block for multi-line comments. Assignment is done with the equals (=) sign, and testing equality is done with a double equals (==). You can also shortcut increment/decrement characters with (+=/-=).

```python
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
# as long as the string comment
# isn't set to a variable,
# python will ignore it
```

---

## Variables

Rules for naming Python variables:

- &#x25FE; Must start with a letter or underscore (\_) character.
- &#x25FE; Cannot start with a number.
- &#x25FE; Can only contain alpha-numeric characters and underscores.
- &#x25FE; Names are case-sensitive.

Multiple values can also be assigned in one line.

```python
x, y, z = 'one', 'two', 'three'
print(x)
print(y)
print(z)

# one
# two
# three
```

Constants can be declared in Python using all caps and underscores (\_). Constants are typically declared in a separate file and then imported back into the main file.

```python
# constant.py
PI = 3.14
GRAVITY = 9.8

# main.py
import constant
print(constant.PI) # 3.14
print(constant.GRAVITY) # 9.8
```

## Operators

### Math Operators

- &#x25FE; **+** Addition, adds two numbers.

- &#x25FE; **-** Subtraction, subtracts two numbers.

- &#x25FE; **\*** Multiplication, multiplies two numbers.

- &#x25FE; **/** Division (float), divides first number by the second number with remainders as floating point number.

- &#x25FE; **//** Division (floor), divides first number by the second number rounded to the nearest number.

- &#x25FE; **%** Modulus, returns the remainder of the first number divided by the second number.

```python
# Examples of Arithmetic Operator
a = 9
b = 4

add = a + b
sub = a, b
mul = a * b
div1 = a / b
div2 = a // b
mod = a % b

print(add) # 13
print(sub) # 5
print(mul) # 36
print(div1) # 2.25
print(div2) # 2
print(mod) # 1
```

### Relational Operators

- &#x25FE; **>** Greater than, returns true if left is greater than the right, else false.

- &#x25FE; **<** Less than = return true if left is less than the right, else false.

- &#x25FE; **==** Equal to, true if both sides are equal and of the same type.

- &#x25FE; **!=** Not equal to, true if sides are not equal, else false.

- &#x25FE; **>=** Greater than or equal to, true if the left is greater or equal to the right.

- &#x25FE; **<=** Less than or equal to, true if the left is less than or equal to the right.

```python
# Examples of Relational Operators
a = 13
b = 33

print(a > b) # False
print(a < b) # True
print(a == b) # False
print(a != b) # True
print(a >= b) # False
print(a <= b) # True
```

### Logical Operators

- &#x25FE; **and** AND, true if both or all conditions are true, else false.

- &#x25FE; **or** OR, true if any condition is true, else false.

- &#x25FE; **not** NOT, true if the condition is false, else true.

```python
# Examples of Logical Operator
a = True
b = False

print(a and b) # False
print(a or b) # True
print(not a) # False
```

Python also has **global** or **local** variables. Any variable created outside of a function will be global and accessible anywhere. A variable created inside of a function will be local and will only be accessible within that function. The keyword **global** can be used on a variable inside of a function to make it accessible from the outside or to allow changes in a function to a variable declared on the global scope.

## Types

Python has many different types that are able to do different things based on their type. To get the type of a variable, you can run _type(var)_.

<br/>

<table>
  <tr>
    <td style="width:160px;">Text</td>
    <td><code>str</code></td>
  </tr>
  <tr>
    <td>Numeric:</td>
    <td><code>int</code>, <code>float</code>,
    <code>complex</code></td>
  </tr>
  <tr>
    <td>Sequence:</td>
    <td><code>list</code>, <code>tuple</code>, 
    <code>range</code></td>
  </tr>
  <tr>
    <td>Mapping</td>
    <td><code>dict</code></td>
  </tr>
  <tr>
    <td>Set:</td>
    <td><code>set</code>, <code>frozenset</code></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td><code>bool</code></td>
  </tr>
  <tr>
    <td>Binary:</td>
    <td><code>bytes</code>, <code>bytearray</code>, 
    <code>memoryview</code></td>
  </tr>
</table>

<br/>

<table>
<tr>
<th style="min-width:350px">Example</th>
<th>Data Type</th>
</tr>
<tr>
<td>x = &quot;Hello World&quot;</td>
<td>str</td>
</tr>
<tr>
<td>x = 20</td>
<td>int</td>
</tr>
<tr>
<td>x = 20.5</td>
<td>float</td>
</tr>
<tr>
<td>x = 1j</td>
<td>complex</td>
</tr>
<tr>
<td>x = [&quot;apple&quot;, &quot;banana&quot;, &quot;cherry&quot;]</td>
<td>list</td>
</tr>
  <tr>
<td>x = (&quot;apple&quot;, &quot;banana&quot;, &quot;cherry&quot;)</td>
<td>tuple</td>
  </tr>
  <tr>
<td>x = range(6)</td>
<td>range</td>
  </tr>
  <tr>
<td>x = {&quot;name&quot; : &quot;John&quot;, &quot;age&quot; : 36}</td>
<td>dict</td>
  </tr>
  <tr>
<td>x = {&quot;apple&quot;, &quot;banana&quot;, &quot;cherry&quot;}</td>
<td>set</td>
  </tr>
  <tr>
<td>x = frozenset({&quot;apple&quot;, &quot;banana&quot;, &quot;cherry&quot;})</td>
<td>frozenset</td>
  </tr>
  <tr>
<td>x = True</td>
<td>bool</td>
  </tr>
  <tr>
<td>x = b&quot;Hello&quot;</td>
<td>bytes</td>
  </tr>
  <tr>
<td>x = bytearray(5)</td>
<td>bytearray</td>
  </tr>
<tr>
<td>x = memoryview(bytes(5))</td>
<td>memoryview</td>
</tr>
</table>

---

## Keywords

<table>
	<caption>Keywords in Python</caption>
	<tbody>
		<tr>
			<td><code>False</code></td>
			<td><code>class</code></td>
			<td><code>finally</code></td>
			<td><code>is</code></td>
			<td><code>return</code></td>
		</tr>
		<tr>
			<td><code>None</code></td>
			<td><code>continue</code></td>
			<td><code>for</code></td>
			<td><code>lambda</code></td>
			<td><code>try</code></td>
		</tr>
		<tr>
			<td><code>True</code></td>
			<td><code>def</code></td>
			<td><code>from</code></td>
			<td><code>nonlocal</code></td>
			<td><code>while</code></td>
		</tr>
		<tr>
			<td><code>and</code></td>
			<td><code>del</code></td>
			<td><code>global</code></td>
			<td><code>not</code></td>
			<td><code>with</code></td>
		</tr>
		<tr>
			<td><code>as</code></td>
			<td><code>elif</code></td>
			<td><code>if</code></td>
			<td><code>or</code></td>
			<td><code>yield</code></td>
		</tr>
		<tr>
			<td><code>assert</code></td>
			<td><code>else</code></td>
			<td><code>import</code></td>
			<td><code>pass</code></td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td><code>break</code></td>
			<td><code>except</code></td>
			<td><code>in</code></td>
			<td><code>raise</code></td>
			<td>&nbsp;</td>
		</tr>
	</tbody>
</table>

</div>