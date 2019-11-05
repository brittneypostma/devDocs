---
title: JavaScript
---
<iframe
		height="525"
		style="width: 100%; resize: both;"
		scrolling="no"
		title="Javascript"
		src="https://codepen.io/sballgirl11/embed/rNBoKrd?height=265&theme-id=dark&default-tab=result">
		See the Pen <a href="https://codepen.io/sballgirl11/pen/GRKYPpw/">Javascript</a> by Brittney (<a
			href="https://codepen.io/sballgirl11"
			>@sballgirl11</a
		>) on <a href="https://codepen.io">CodePen</a>. 
</iframe><br />

[MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

JavaScript is the verb of the internet, it powers anything that is an action.

The easiest way to start using JavaScript is to open the console in your browser, in most browsers Ctrl+Shift+I will open it up and you can navigate to the console tab.

In JavaScript, the \\ (backslash) character is reserved as an escape character. If you use the backslash key, the key typed after that will be ignored. This is useful when typing strings with multiple ' or ".

JavaScript can either be put inside of a tag in the HTML file or can be linked to an external file where the src is the location of the file relative to the HTML file you are in.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); grid-gap: 1em;justify-content: center;">

~~~html
<script> *JavaScript goes here* </script>
~~~

~~~html
<script> type="text/javascript" src="script.js" </script>
~~~

</div>

Because HTML is read synchronously, from top to bottom, it is best practice to put your script tags at the bottom of the HTML file just before the closing body (</body>) tag.

---

## Types

### Primitive Data Types

**Boolean** - true or false

~~~javascript
const bool1 = true; 
const bool2 = false;
~~~


**Null** - explicitly nothing

~~~javascript
const nothing = null;
~~~

**Undefined** - a variable that has no value or has yet to be assigned.

~~~javascript
const undVar;
console.log(undVar);
//undefined
~~~

**Number** - numbers in JavaScript can be written with of without a decimal point and can also be Infinity or NaN (not a number).

~~~javascript
const num1 = 11;
const num2 = 0.42;
~~~

**String** - stores text inside double or single quotes or in template literals (`).

~~~javascript
const str1 = 'I am string 1.'
const str2 = "I am string 2."
const str3 = `I am string 3.`
~~~

**Symbol** - an immutable primitive value that is unique, created by invoking the function Symbol. Symbols are guaranteed to be unique. Even if we create many symbols with the same description, they are different values.

~~~javascript
// here are two symbols with the same description
let Sym1 = Symbol("Sym");
let Sym2 = Symbol("Sym");
console.log(Sym1 == Sym2); 
// returns "false"
~~~

**BigInt** - a numeric data type that can represent integers in the arbitrary precision format.

~~~javascript
const x = 2n ** 53n;
//9007199254740992n
~~~


### Object Data Type

In JavaScript, almost "everything" can be an object.

- \- Booleans defined with the new keyword.<br/>
- \- Numbers defined with the new keyword.<br/>
- \- Strings defined with the new keyword.<br/>
- \- Dates are always objects.<br/>
- \- Math is always an object.<br/>
- \- Regular expressions are always objects.<br/>
- \- Arrays are always objects.<br/>
- \- Functions are always objects.<br/>
- \- Objects are always objects.<br/>



---

## JavaScript Reserved Keywords

<table>

<tbody>

<tr>

<td>abstract</td>

<td>arguments</td>

<td>await</td>

<td>boolean</td>

</tr>

<tr>

<td>break</td>

<td>byte</td>

<td>case</td>

<td>catch</td>

</tr>

<tr>

<td>char</td>

<td>class</td>

<td>const</td>

<td>continue</td>

</tr>

<tr>

<td>debugger</td>

<td>default</td>

<td>delete</td>

<td>do</td>

</tr>

<tr>

<td>double</td>

<td>else</td>

<td>enum</td>

<td>eval</td>

</tr>

<tr>

<td>export</td>

<td>extends</td>

<td>false</td>

<td>final</td>

</tr>

<tr>

<td>finally</td>

<td>float</td>

<td>for</td>

<td>function</td>

</tr>

<tr>

<td>goto</td>

<td>if</td>

<td>implements</td>

<td>import</td>

</tr>

<tr>

<td>in</td>

<td>instanceof</td>

<td>int</td>

<td>interface</td>

</tr>

<tr>

<td>let</td>

<td>long</td>

<td>native</td>

<td>new</td>

</tr>

<tr>

<td>null</td>

<td>package</td>

<td>private</td>

<td>protected</td>

</tr>

<tr>

<td>public</td>

<td>return</td>

<td>short</td>

<td>static</td>

</tr>

<tr>

<td>super</td>

<td>switch</td>

<td>synchronized</td>

<td>this</td>

</tr>

<tr>

<td>throw</td>

<td>throws</td>

<td>transient</td>

<td>true</td>

</tr>

<tr>

<td>try</td>

<td>typeof</td>

<td>var</td>

<td>void</td>

</tr>

<tr>

<td>volatile</td>

<td>while</td>

<td>with</td>

<td>yield</td>

</tr>

</tbody>

</table>

---

## Comparisons

In JavaScript a single = sign is for assigning values, so there are other ways to check for equality.

<div style="margin-left: 2em;">

<pre class="language-javascript"><code class="language-javascript"><strong>&gt;=</strong></code></pre>

<dfn> - is true if the left side is greater than or equal to the value or the right side.</dfn>

<pre class="language-javascript"><code class="language-javascript"><strong>&lt;=</strong></code></pre>

<dfn>- is true if the left side is less than or equal to the value or the right side.</dfn>

<pre class="language-javascript"><code class="language-javascript"><strong>&gt;</strong></code></pre>

<dfn>- is true if the left side is greater than the value or the right side.</dfn>

<pre class="language-javascript"><code class="language-javascript"><strong>&lt;</strong></code></pre>

<dfn>- is true if the left side is less than the value or the right side.</dfn>

<pre class="language-javascript"><code class="language-javascript"><strong>== or !=</strong></code></pre>

<dfn>- The equality and inequality operators convert the operands if they are not of the same type, then applies a strict comparison. Using these should be avoided, because JavaScript "guesses" what you want and changes the type of the input.</dfn>

<pre class="language-javascript"><code class="language-javascript"><strong>=== or !==</strong></code></pre>

<dfn>- The strict equality and inequality operators with no type conversion by JavaScript. This is the correct way to compare values.</dfn>

</div>

---

## Variables

In JavaScript variables can be assigned with 3 different types: var, let, and const, var and let values can be changed, but const values are constant and unchangeable. They can all be assigned to any of the JavaScript types.

-   &diams; **var** - declares a variable, optionally initializing it to a value and is function or local scoped (more on this later).

- 
~~~javascript
var x;
x = 11;
var y = "this is a string named y"
~~~

-   &diams; **let** - similar to var, except that it is scoped to the block ( { } ) that it is declared inside of, or block scoped.
- 
~~~javascript
const nothing = null;
~~~

-   &diams; **const** - declares a variable that cannot be changed and must be initialed to a value, it is also block scoped.

- 
~~~javascript
const z = 'always the same'
const a; //Syntax error: missing initializer
const name = 'Brittney';
name = 'Mary' //Uncaught TypeError: Assignment to constant variable.
~~~


### Naming Variables

All JavaScript variables must be identified with unique names. These unique names are called **identifiers**. Variables can be named anything, with a few constraints, but it is best practice to name the variables as descriptive to what they are as possible. Using something called camelCase is also best practice. The first word is lowercase and any word after the first letter would be uppercase (myName or numberOfTimes).

The general rules for constructing names for variables (unique identifiers) are:

- 1\. Names must begin with a letter, an underscore (\_) or a dollar sign (\$).<br/>
- 2\. Names can only contain letters, numbers, underscores, or dollar signs.<br/>
- 3\. Names cannot contain spaces.<br/>
- 4\. Names are case sensitive ( y is not Y).<br/>



---

## Assignment Operators


<table class="standard-table">

[MDN Source Reference](view-source:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
	
<thead>
		<tr>
			<th>Name</th>
			<th>Shorthand operator</th>
			<th>Meaning</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Assignment">Assignment</a></td>
			<td><code>x = y</code></td>
			<td><code>x = y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Addition_assignment">Addition assignment</a></td>
			<td><code>x += y</code></td>
			<td><code>x = x + y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Subtraction_assignment">Subtraction assignment</a></td>
			<td><code>x -= y</code></td>
			<td><code>x = x - y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Multiplication_assignment">Multiplication assignment</a></td>
			<td><code>x *= y</code></td>
			<td><code>x = x * y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Division_assignment">Division assignment</a></td>
			<td><code>x /= y</code></td>
			<td><code>x = x / y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Remainder_assignment">Remainder assignment</a></td>
			<td><code>x %= y</code></td>
			<td><code>x = x % y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Exponentiation_assignment">Exponentiation assignment</a><span class="icon-only-inline" title="This is an experimental API that should not be used in production code."><i class="icon-beaker"> </i></span></td>
			<td><code>x **= y</code></td>
			<td><code>x = x ** y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Left_shift_assignment">Left shift assignment</a></td>
			<td><code>x &lt;&lt;= y</code></td>
			<td><code>x = x &lt;&lt; y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Right_shift_assignment">Right shift assignment</a></td>
			<td><code>x &gt;&gt;= y</code></td>
			<td><code>x = x &gt;&gt; y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Unsigned_right_shift_assignment">Unsigned right shift assignment</a></td>
			<td><code>x &gt;&gt;&gt;= y</code></td>
			<td><code>x = x &gt;&gt;&gt; y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Bitwise_AND_assignment">Bitwise AND assignment</a></td>
			<td><code>x &amp;= y</code></td>
			<td><code>x = x &amp; y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Bitwise_XOR_assignment">Bitwise XOR assignment</a></td>
			<td><code>x ^= y</code></td>
			<td><code>x = x ^ y</code></td>
		</tr>
		<tr>
			<td><a href="/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Bitwise_OR_assignment">Bitwise OR assignment</a></td>
			<td><code>x |= y</code></td>
			<td><code>x = x | y</code></td>
		</tr>
	</tbody>
</table>

---

## Conditionals

Conditional statements are used when you want to perform different actions depending on different conditions.

- **if** - used when you want to check if a condition is true before executing code.
~~~javascript
var name = "Brittney";
if (name === "Brittney") {  
	alert("Hi Brittney!");
}
~~~
- **else** - used to specify a block of code to be executed when the _if_ block is false.
~~~javascript
if (name === "Brittney") {  
	alert("Hi Brittney!");
}  else {  
	alert("Hi!");
}
~~~
- **else if** - used to specify another condition when the _if_ statement is false and before the else block.
~~~javascript
if (name === "Brittney") {  
	alert("Hi Brittney!");
}  else if (name === "Joe") {  
	alert("Hi Joe!");
}  else {  
	alert("Hi!");
}
~~~
- **ternary operator** - is frequently used as a shortcut for the if statement. Multiple conditions can be wrapped in () to separate them.
~~~javascript
//Syntax for ternary:
(condition) ? 
executeIfTrue : executeIfFalse(condition) ? 
executeIfTrue : (secondCondition) ? 
executeIfSecondIsTrue : executeIfAllAreFalse
var age = 37;
var beverage = (age >= 21) ? "Here's a beer!" : "Have some juice!";
console.log(beverage); 
//"Here's a beer!"
	
	var num = 0;
	(num > 0) ? "positive" : (num < 0) ? "negative" : "zero";
	//"zero"
~~~
- **switch** - used to specify multiple "cases" to be used if they are true. The switch expression is evaluated once and compared with the values of each case, if there is a match, that block of code is executed.
~~~javascript
switch (new Date().getDay()) {  
	case 6: 
		day = "Today is Saturday!";    
		break;  
	case 0: 
		day = "Today is Sunday!";    
		break;  
	default: 
		day = "Ready for the weekend!";
	}
~~~


---

## Logical Operators


**||** - the OR operator checks until it finds a "truthy" value.

~~~javascript
if (age < 16 || age > 100) {  
	alert("You should not drive a car.");
}
~~~

**&&** - the AND operator checks both sides to be a "truthy" value before executing.

~~~javascript
if (firstName === "Brittney" && lastName === "Postma") {  
	alert("Your name is Brittney Postma.");
}
~~~

**!** - the NOT or BANG operator means the opposite of when used alone and means not when used with other operators.

~~~javascript
!true 
//false!false 
//true
var guess = prompt("Guess my number");
var myNum = 11;
if (guess !== myNum) {  
	alert("Sorry, you're wrong");
}
~~~


---

## The Console

The console object provides access to the browser's debugging console. There are different ways to use the console (Ctrl + Shift + I) in JavaScript and it is a great way to debug your code.

### A few of the most used console objects:

**console.log** - outputs whatever you specify to the console.
~~~javascript
console.log("Hi Brittney!!") 
// Hi Brittney!!
var age = 37;
console.log(num) 
// 37
~~~
**console.error** - usually has a red color and outputs an error message to the console.
~~~javascript
console.error(err) 
// this might be found in a promise catch statement (more on this later).
~~~
**console.clear** - clears everything inside the console window and leaves a fresh window. used with other operators.
~~~javascript
console.clear();
~~~
**console.count** - Log the number of times this line has been called with the given label.
~~~javascript
console.count( [label] )
~~~
**console.group, console.groupCollapsed, console.groupEnd** - Console.group() creates a new inline group, indenting all following output by another level. To move back out a level, call groupEnd(). To have a group be collapsed instead of expanded by default call console.groupCollapsed(). used with other operators.
~~~javascript
console.log("Hello world!");
console.group();
console.log("Hello from inside the group!");
console.groupEnd();console.log("and outside again!");
//Hello world!
//▼ console.group
//  Hello from inside the group!//and outside again!
~~~
**console.table** - displays data in a table format.
~~~javascript
console.table(["apples", "oranges", "bananas"]); 
//(index)Values0"apples"1"oranges"2"bananas"
~~~
**console.time** - Starts a timer with a name specified as an input parameter. Up to 10,000 simultaneous timers can run on a given page.

~~~javascript
console.time();
~~~


---

## Functions

Functions in JavaScript are reusable blocks of code that perform a task to can be executed later. Functions perform the actions inside of them when they are **_invoked_** or **_called_**. To access a value inside of a function a **_return statement_** must be added, this also immediately exits the function.

Functions can be declared a few different ways and are either anonymous (no name), or given a name just like a variable. Function **_parameters_**, placed inside the parentheses (), are the names given when defining the function Function **_arguments_** are the actual values that are passed to and received by the function.

You can write functions in the function syntax or by using an **_arrow function_**. Arrow functions usually have a shorter syntax than typical functions and there is no binding of **_this_** (more on "this" later).

#### Anonymous function

~~~javascript
function(parameters) {*statements to be executed when called*}
() => {*statements*}
parameter => {*statements*}
~~~

#### Named function

~~~javascript
function fnName (parameters) {*statements to be executed when called*}
const fnName = (parameters) => {*statements*}
//same as
const variableName = fnName(parameters) {*statements*}
~~~

### Function examples


#### Add 2 numbers

~~~javascript
//ES6 arrow function, to invoke it use add()
const add =  () => {
	var firstNum = parseInt(window.prompt("What is the first number?"), 10);
	var secondNum = parseInt(window.prompt("What is the second number?"), 10);
	var sum = firstNum + secondNum;
	alert("The sum is " + sum)
}
~~~

~~~javascript
//regular named function
function add() {
	var firstNum = parseInt(window.prompt("What is the first number?"), 10);
	var secondNum = parseInt(window.prompt("What is the second number?"), 10);
	var sum = firstNum + secondNum;
	alert("The sum is " + sum)
}
~~~
 
 #### Multiply 2 numbers with parameters

~~~javascript
//ES6 arrow function
//to invoke it use multiply(argument, argument) or multiply(5, 10)
const multiply =  (a, b) => a * b
~~~

<br/>

~~~javascript
//regular named function
function multiply (a, b) {
	return a * b
}
~~~


---

## Arrays

[w3schools JavaScript Array Reference Sheet](https://www.w3schools.com/jsref/jsref_obj_array.asp)

The Array object is used to store multiple values in a single variable with the [](bracket) syntax. Arrays use numbers to access the elements inside of them. The indexes are zero-based, so `arrayName[0]` returns the first item, then `[1]` returns the second, then `[2]` returns the third, and so on.

### Array Properties and Methods
	
<ul>
	<li style="list-style-type: square;">
			<strong>length</strong> - sets or returns the number of elements in an array.<br/>
			<pre class="language-javascript"><code>var numbers = [1, 2, 3, 4, 5];<br/>console.log(numbers.length) //<em>5</em><br/>numbers.length = 3<br/>console.log(numbers.length) //<em>3 - numbers is now [1, 2, 3]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>concat()</strong> - joins 2 or more arrays together and returns a copy of the arrays.  Does not change the original array.<br/>
			<pre class="language-javascript"><code>var numArr1 = [1, 2, 3];<br/>var numArr2 = [4, 5, 6]<br/>var allTheNumbers = numArr1.concat(numArr2)<br/>console.log(allTheNumbers, numArr1, numArr2)<br/>//<em>[1, 2, 3, 4, 5, 6], [1, 2, 3], [4, 5, 6]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>copyWithin()</strong> - *(index position to copy to, optional starting index, optional ending index)* - copies array values to another position in the array, overwriting the original value. Modifies the original array.<br/>
			<pre class="language-javascript"><code>var fruits = ["peach", "orange", "apple", "banana"]<br/>fruits.copyWithin(2, 0)<br/>console.log(fruits) //<em>["peach", "orange", "peach", "orange"]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>entries()</strong> - returns an Array Iterator object (gives access to the .next() and .value method) with key/value pairs.  For each item in the original array, the new object will contain an array with the index as the key and the item as the value<br/>
			<pre class="language-javascript"><code>var array1 = ['a', 'b', 'c'];<br/>var iterator1 = array1.entries();<br/>console.log(iterator1.next().value);<br/>//<em>expected output: Array [0, "a"]</em><br/>console.log(iterator1.next().value);<br/>//<em>expected output: Array [1, "b"]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>filter()</strong> - creates a new array with only the elements from the original array that pass a test. The syntax is <code>let newArr = ogArr.filter(callbackFunction)</code> The callback function is used to test each element in the ogArr and returns those elements to newArr.<br/>
			<pre class="language-javascript"><code>var ogArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];<br/>var newArr = ogArr.filter(even => (even % 2 === 0)<br/>console.log(newArr, ogArr)<br/>//<em>[2, 4, 6, 8, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>find() findIndex()</strong> - returns the first value that passes the test. The syntax is <code>let found = ogArr.find(callbackFunction)</code> The callback function is used to test each element in the ogArr until a truthy value is found and returns a single value. findIndex() returns the index of the value.<br/>
			<pre class="language-javascript"><code>var ogArr = [10, 20, 30, 40];<br/>var found = ogArr.find(element =&gt; (element > 10))<br/>console.log(found)<br/>//<em>20</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>flat()</strong> - creates a new array from an array and unnests it to the specified level. The syntax is <code>let flat = ogArr.flat(1)</code> The default parameter is 1 and will flatten one nested level, but can be changed to increase the amount you want to flatten until it is a single array returned.<br/>
			<pre class="language-javascript"><code>const ogArray = [1, 2, [3, 4, [5]]]<br/>ogArray.flat() // [1, 2, 3, 4, [5]]<br/>ogArray.flat(2) // [1, 2, 3, 4, 5]</code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>flatMap()</strong> - maps each element using a mapping function, then flattens the result into a new array. The syntax is <code>let flatMap = ogArr.flatMap(callbackFunction)</code> The callback function is used to produce an element of the new array and then flattens the array to a depth of 1.<br/>
			<pre class="language-javascript"><code>const ogArray = [1, 2, 3, 4, 5]<br/>ogArray.flatMap(num => [num, num * 2]) <br/>// [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]</code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>forEach()</strong> - is similar to a for loop and runs the callback function over every element in an array. The syntax is <code>ogArr.forEach((element, index, array) => callback function)</code> Modifies the original array.<br/>
			<pre class="language-javascript"><code>var ogArr = [5, 10, 15, 20]<br/>ogArr.forEach((element, index, arr) =&gt; (arr[index] = element * 10))<br/>console.log(ogArr)<br/>//<em>[50, 100, 150, 200]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>from()</strong> - returns a new array from anything with a length property or iterable object (basically other arrays).<br/>
			<pre class="language-javascript"><code>var myArr = Array.from("ABCDEFG")<br/>console.log(myArr)<br/>//&#9658;<em>(7) ["A", "B", "C", "D", "E", "F", "G"]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>includes()</strong> - checks if an array includes an element, the fromIndex is an optional argument.<br/>
			<pre class="language-javascript"><code>var arr = ['a', 'b', 'c']<br/>arr.includes('c')<br/>//<em>true</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>indexOf() lastIndexOf()</strong> - checks if an array includes an element and returns the first position/index where it can be found. The fromIndex is an optional argument. lastIndexOf() starts at the end and returns the first index where it is found.<br/>
			<pre class="language-javascript"><code>var shopList = ['milk', 'bread', 'eggs']<br/>const addToList = (shopList, item) =&gt; <br/>	shopList.indexOf(item) === -1 ? <br/>		shopList.push(item) : null<br/>addToList(shopList, 'cheese')<br/>console.log(shopList, shopList.indexOf('cheese')<br/>//&#9658;<em>['milk', 'bread', 'eggs', 'cheese'], 4</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>join()</strong> - joins all elements of an array together in a string. A seperator can optionally be called as well, if no seperator is specified, a comma is used.<br/>
			<pre class="language-javascript"><code>var names = ["Brittney", "Joe"]<br/>console.log(names.join(), names.join(" and "))<br/>//<em>(Brittney, Joe), (Brittney and Joe)</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>map()</strong> - creates a new array with the results of a callback function on every element in the original array.<br/>
			<pre class="language-javascript"><code>var ogArr = [1, 4, 9, 16]<br/>const doubleArr = ogArr.map(x =&gt; x * 2)<br/>console.log(ogArr, doubleArr)<br/>//&#9658;<em>[1, 4, 9, 16], [2, 8, 18, 32]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>pop()</strong> - modifies an array by taking off the last element, returns the element it removed.<br/>
			<pre class="language-javascript"><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>var popped = myFish.pop()<br/>console.log(myFish, popped)<br/>//&#9658;<em>['angel', 'clown', 'mandarin'], 'sturgeon'</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>push()</strong> - modifies an array by adding an element specified to the end of the original array and returns the new length.<br/>
			<pre class="language-javascript"><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>myFish.push('sword')<br/>console.log(myFish)<br/>//&#9658;<em>['angel', 'clown', 'mandarin', 'sturgeon', 'sword']</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>shift()</strong> - modifies an array by taking off the first element, returns the element it removed.<br/>
			<pre class="language-javascript"><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>var shifted = myFish.shift()<br/>console.log(myFish, shifted)<br/>//&#9658;<em>['clown', 'mandarin', 'sturgeon'], 'angel'</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>unshift()</strong> - modifies an array by adding an element specified to the beginning of the original array and returns the new length.<br/>
			<pre class="language-javascript"><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>myFish.unshift('sword')<br/>console.log(myFish)<br/>//&#9658;<em>['sword', 'angel', 'clown', 'mandarin', 'sturgeon']</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>reduce() reduceRight()</strong> - executes a reducer function on an array left to right, reduceRight() goes right to left. The syntax is <code>reduce((accumulator, currentValue) => accumulator + currentValue)</code><br/>
			<pre class="language-javascript"><code>const array1 = [1, 2, 3, 4]<br/>const reducedArr = array1.reduce((acc, val) =&gt; acc + val))<br/>console.log(reducedArr)<br/>//&#9658;<em>10 (1 + 2 + 3 + 4)</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>reverse()</strong> - reverses the order of the elements in an array.<br/>
			<pre class="language-javascript"><code>const array1 = [1, 2, 3, 4]<br/>const revArr = array1.reverse()<br/>console.log(revArr)<br/>//&#9658;<em>[4, 3, 2, 1]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>slice()</strong> - returns a copy of an array from the specified positions to a new array. The syntax is <code>arr.slice(beginIndex, endIndex),</code><br/>
			<pre class="language-javascript"><code>const array1 = [1, 2, 3, 4]<br/>const sliced = array1.slice(2, 4)<br/>console.log(sliced)<br/>//&#9658;<em>(2) [3, 4]</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>splice()</strong> - modifies an existing array by removing/replacing existing elements or adding new ones. The syntax is <code>arr.splice(startIndex, deleteCount(optional), 'item'(optional))</code><br/>
			<pre class="language-javascript"><code>var months = ['Jan', 'March', 'April', 'June']<br/>months.splice(1, 0, 'Feb') //<em>inserts at index 1</em><br/>console.log(months)<br/>//&#9658;<em>['Jan', 'Feb', 'March', 'April', 'June']</em></code></pre><br/><br/>
			<pre class="language-javascript"><code>var months = ['Jan', 'March', 'April', 'June']<br/>months.splice(4, 1, 'May') //<em>replaces 1 element at index 4</em><br/>console.log(months)<br/>//&#9658;<em>['Jan', 'Feb', 'March', 'April', 'May']</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>some()</strong> - checks if any elements in an array pass the test by the callback function.<br/>
			<pre class="language-javascript"><code>const array1 = [1, 2, 3, 4]<br/>var even = element =&gt; element % 2 === 0<br/>console.log(array1.some(even))<br/>//<em>true</em></code></pre>
			</li>
			<li style="list-style-type: square;">
			<strong>toString()</strong> - returns a string of the specified arrays elements.<br/>
			<pre class="language-javascript"><code>const array1 = [1, 2, 3, 4]<br/>console.log(array1.toString())<br/>//<em>1,2,3,4</em></code></pre>
	</li>
</ul>

---

## Objects

[w3schools JavaScript Objects Reference Sheet](https://www.w3schools.com/js/js_objects.asp)

Objects, collections of properties, are used to store values in property:value pairs with the { } (curly-brace) syntax. Properties can be accessed or changed by using `objName.propName or obj['propName']` and methods (functions inside of an object) can be called with `objName.propName()`

~~~javascript
var objName = {
	color: "blue",
	shape: "circle",
	price: 5,
	otherColors: [
	"yellow", 
	"red", 
	"green"]
	logShape: function() {	
		console.log('I am a' + objName.color + objName.shape + '!')	
	}
}
objName.logShape() // I am a blue circle!
~~~

##<u>Object Methods</u>**

&diams; <strong>Object.assign()</strong> - used to copy values from one object to another. Takes a target and a source parameter. Copies the source and modifies the target object.

~~~javascript
const target = {
	name: 'Brittney',
	age: '37'
}

const source = {
	location: 'USA',
	company: 'b.Designed'
}

const newObj = Object.assign(target, source)
console.log(newObj)
// { name: "Brittney", age: "37", company: "b.Designed", location: "USA" }
console.log(target)
// { name: "Brittney", age: "37", company: "b.Designed", location: "USA" }
console.log(source)
// { location: 'USA', company: 'b.Designed' }
~~~

&diams; <strong>Object.create()</strong> - used to create a new object and link it to the prototype object and make it extensible.

~~~javascript
const job = {
    position: 'cashier',
    type: 'hourly',
    isAvailable: true,
    showDetails() {
        const accepting = this.isAvailable ? 'is accepting applications' : "is not currently accepting applications";

        console.log(`The ${this.position} position is ${this.type} and ${accepting}.`);
    }
};

// Use Object.create to pass properties
const barista = Object.create(job);

barista.position = "barista";
barista.showDetails();
// The barista position is hourly and is accepting applications.
~~~

&diams; <strong>Object.entries()</strong> - creates a nested array of the key/value pairs of an obj.

~~~javascript
const person = {
	name: 'Brittney',
	age: '37',
	location: 'USA'
}

const entries = Object.entries(person)
console.log(entries)

/* (3) […]
​
0: Array [ "name", "Brittney" ]
​
1: Array [ "age", "37" ]
​
2: Array [ "location", "USA" ]
​
length: 3

*/
~~~

&diams; <strong>Object.freeze()</strong> - prevents properties on an object from being changed, added, or removed.

~~~javascript
const user = {
	username: 'Majestix',
	password: '********'
}

const newUser = Object.freeze(user)

newUser.password = 'password'
newUser.online = true
newUser.username = ''

console.log(newUser)
// { username: 'Majestix', password: '********' }
~~~

&diams; <strong>Object.fromEntries()</strong> - transforms a list of key/value pairs into an object.

~~~javascript
const entries = [
	['name', 'Brittney'], 
	['age', '37']
	]

const obj = Object.fromEntries(entries)

console.log(obj)

// { name: 'Brittney', age: '37' }
~~~

&diams; <strong>Object.keys()</strong> - creates an array containing the keys (the left side properties) of an object.

~~~javascript
const user = {
	name: 'username',
	password: '********',
	online: false
}

const keys = Object.keys(user)
console.log(keys)
// ["name", "password", "online"]
~~~

&diams; <strong>Object.seal()</strong> - prevents new properties from being added to an object, but still allows properties to be changed.

~~~javascript
const user = {
	username: 'Majestix',
	password: '********'
}

const newUser = Object.freeze(user)

newUser.password = 'password'
newUser.online = true
newUser.username = ''

console.log(newUser)
// { username: '', password: 'password' }
~~~

&diams; <strong>Object.values()</strong> - creates an array of the values (the right side properties) of an object.)

~~~javascript
const user = {
	name: 'username',
	password: '********',
	online: false
}

const values = Object.values(user)
console.log(values)
// ["username", "********", "false"]
~~~

**<u>How to use methods to alter data</u>**

~~~javascript
const users = {
	username0: 'Majestix',
	username1: 'AugusLumos',
	username2: 'Inferiumbra'
} 

Object.keys(obj).forEach((key, index) => {
	console.log(key, obj[key])
})
/* 
username0 Majestix
username1 AugusLumos
username2 Inferiumbra
*/

Object.values(obj).forEach(value => {
	console.log(value)
})

/*
Majestix
AugusLumos
Inferiumbra
*/

Object.entries(obj).forEach(value => {
	console.log(value)
})

/*
["username0", "Majestix"]
["username1", "AugusLumos"]
["username2", "Inferiumbra"]
*/

Object.entries(obj).map(value => {
	return value[1] + value[0].replace('username', '')
})

// ["Majestix0", "AugusLumos1", "Inferiumbra2"]
~~~

**<u>Dynamic Property Values</u>** 

~~~javascript
const name = 'Brittney'
const obj = {
	[name]: 'name',
	[1 + 2]: 3
}
console.log(obj) // Brittney: 'name', 3: 3
~~~

## Friendbook Example with Array of Objects

<iframe style="width: 100%; resize: both;" scrolling="no" title="Javascript" src="https://codepen.io/sballgirl11/embed/gOOLGdW?height=265&amp;theme-id=0&amp;default-tab=css,result" height="525">See the Pen <a href="https://codepen.io/sballgirl11/pen/GRKYPpw/">Javascript</a> by Brittney (<a href="https://codepen.io/sballgirl11" >@sballgirl11</a >) on <a href="https://codepen.io">CodePen</a>.</iframe>

---

## Loops

Loops offer a quick and easy way to do something repeatedly.

### Types of Loops

**Statement 1** is executed (one time) before the execution of the code block<br/>
**Statement 2** defines the condition for executing the code block.<br/>
**Statement 3** is executed (every time) after the code block has been executed.

~~~javascript
for (statement 1; statement 2; statement 3) { 
	// code block to be executed 
	}
~~~

&diams; **for** - loops through a block of code a number of times.  

  
~~~javascript
for (i = 0; i < 5; i++) {
	text += `The number is ${i}!`
}
// The number is 0! The number is 1! The number is 2! The number is 3! The number is 4!
~~~

&diams; **for/in** - loops through the properties of an object.`for (variable in object) { // code block to be executed }`

~~~javascript
let arr = [3, 5, 7]
for (let i in arr) {  
	console.log(i)
}
// 0, 1, 2
~~~

&diams; **for/of** - loops through the values of an iterable object.`for (variable of object) { // code block to be executed }`

~~~javascript
let arr = [3, 5, 7]
for (let i in arr) {  
	console.log(i)
}
// 3, 5, 7
~~~

&diams; **while** - loops through a block of code while a specified condition is true.`while (condition) { // code block to be executed }`

~~~javascript
let i = 0
while (i < 5) { 
	i++  console.log(i)
}
// 0, 1, 2, 3, 4
~~~

&diams; **do/while** - also loops through a block of code while a specified condition is true.`do { //statement } while (condition)`

~~~javascript
let i = 0
do {  
	i++  console.log(i)}
while (i < 5)
// 0, 1, 2, 3, 4
~~~

&diams; **for of** - iterate over an array or string.

~~~javascript
const array = [1, 2, 3]
for (item of array) {
	console.log(item)
}
/* 
1
2
3
*/
~~~

&diams; **for in** - enumerate over an objects properties.

~~~javascript
const object = {
	apples: 5,
	oranges: 10,
	grapes: 100
}
for (item in object) {
	console.log(item)
}
/*
apples
oranges
grapes
*/
~~~

---

## Scope

Scope determines the accessibility (visibility) of variables. JavaScript has 3 types of scope; Global Scope, Function or Local Scope, and Block Scope introduced in 2015 as ES2015 (formally called ES6).

-   **Global Scope** - Variables declared outside a function are global scoped and can be accessed anywhere. This is the root scope and lives on the window object.

~~~javascript
let name = "Brittney"
// code here CAN use variable name
function myFunction() {
	name = "Joe"
// code here CAN use variable name
~~~

-   **Local Scope** - Variables declared inside a function become locally scoped and are not accessible outside the funtion.

~~~javascript
// code here can NOT use variable name
function myFunction() {
	var name = "Brittney"
  	// code here CAN use variable name
}
~~~

-   **Block Scope** - Variables declared with var can NOT have block scope, only let and const variables have access to block scope.

~~~javascript
// Root Scope (window)
let letVar = "letVar, ";
const constVar = "constVar, "
let newLetVar = "newLetVar, "
const newConstVar = "newConstVar, "
function scopeFunction() {
	// block scope
	let letVar = "block scope letVar, "
	const constVar = "block scope constVar, "
	newLetVar = "changed global newLetVar, "  

	console.log("BLOCK SCOPE: ", letVar, constVar, newLetVar, newConstVar)
}

console.log("BEFORE: ", letVar, constVar, newLetVar, newConstVar)
scopeFunction()
console.log("AFTER: ", letVar, constVar, newLetVar, newConstVar)

// BEFORE: letVar, constVar, newLetVar, newConstVar, 
//BLOCK SCOPE: block scope letVar, block scope constVar, changed global newLetVar, newConstVar,    
//AFTER: letVar, constVar, changed global newLetVar, newConstVar, 
~~~

-   **All Example**

~~~javascript
// Root Scope (window)
var varVar = "varVar, "
let letVar = "letVar, ";
const constVar = "constVar, "
let newLetVar = "newLetVar, "
	
function scopeFunction() {
	// block scope
	var varVar = "local scope varVar, "
	let letVar = "block scope letVar, "
	const constVar = "block scope constVar, "
	newLetVar = "changed global newLetVar, "
	varVar = "only changes local scope varVar, "
	console.log("BLOCK SCOPE: ", varVar, letVar, constVar, newLetVar)
}

console.log("BEFORE: ", varVar, letVar, constVar, newLetVar)
scopeFunction()
console.log("AFTER: ", varVar, letVar, constVar, newLetVar)
	
// BEFORE: varVar, letVar, constVar, newLetVar, 
//  BLOCK SCOPE: only changes local scope varVar, block scope letVar, block scope constVar, changed global newLetVar, 
// AFTER: varVar, letVar, constVar, changed global newLetVar, 
~~~

---

## Context

Context refers to the value of **this**, the keyword which references the object that the code belongs to.

~~~javascript
const obj = {
	objThis: function() {
		return this;
	}
}

obj.objThis() // obj
// this belongs to the obj

const funcThis = () => this 
// window object
~~~

---

## Destructuring

Destructuring is an expression that allows us to extract values from arrays, objects, maps, or sets into distinct variables.  Destructuring can be used for variable declaration or variable assignment.

**Variable Assignment** - <br/> Assign a variable to values from an object.

~~~javascript
const obj = {
	name: 'Brittney',
	age: 37,
}
const { name, age } = obj
//same as
const name = obj.name
const age = obj.age
~~~

**Rest assignment** -<br/> Assigning variable names to rest of the values with destructuring.

~~~javascript
let [a, b, ...rest] = [10, 20, 30, 40, 50]
console.log(a, b, rest)
// 10, 20, [30, 40, 50]
~~~

**Default Values** -<br/> Assigning a default value in the case the value is undefined.

~~~javascript
function greet(name='person', age=20, pet='cat') {
	return `Hello ${name} you seem to be ${age - 10}. What a lovely ${pet}!`
}
greet() 
//Hello person, you seem to be 20. What a lovely cat!
greet("Brittney", 37, dolphin) 
//Hello Brittney, you seem to be 27.  What a lovely dolphin!
~~~

**Computed Property Name** -<br/> Naming a value to a variable and changing it in the same expression.

~~~javascript
let key = 'value'
let {[key]: val} = { value: 'changedValue' }
console.log(val) // changedValue
~~~

**Swapping variables** -<br/> Two variables values can be swapped in one destructuring expression.

~~~javascript
let a = 1
let b = 3
[a, b] = [b, a]
console.log(a, b)
// 3, 1
~~~

**Rest assignment** -<br/> Assign the remaining part to a variable.

~~~javascript
let [a, ...b] = [1, 2, 3]
console.log(a, b) 
// 1, [2, 3]
~~~

**Destructuring values**-<br/> Unpacking fields from objects and pass them as a parameter.

~~~javascript	
const user = {
	id: 37,
	displayName: 'bpostma',
	fullName: {
		firstName: 'Brittney',
		lastName: 'Postma'
	}
}
const userId = ({ id }) => id
const whoIs = ({ displayName, fullName: { firstName: name } }) => `${displayName} is ${name}`
console.log(userId(user)) // 37
console.log(whoIs(user)) // "bpostma is Brittney"
~~~

---

## Template Literals

Template literals are strings that interpolate variables without concatination. 

~~~javascript
let name = 'Brittney'
let age = 37
const sentence = `My name is ${name} and I am ${age - 10} 😂 years old.`
console.log(sentence)
// "My name is Brittney and I am 27 😂 years old.
~~~

---

## Closures

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). 

A function ran, the function executed and will never run again, **BUT** it's going to remember the variables inside the child scope so the parent has access to them.  Parent does not have access to child scope variables.

In other words, a closure gives you access to an outer function's scope from an inner function.

~~~javascript
const first = () => {
	const greet = 'Hi'
	const second = () => {
		const name = "Brittney"
		console.log(`${greet} ${name}!`)
	}
	return second
}
const newFunc = first()newFunc()
// Hi Brittney!
// first() ran only once, but remembered the name variable so that newFunc/first had access to it.
~~~

---

## Currying

Currying is breaking down a function into a series of functions that each accept a single argument.

~~~javascript
const multiply = (a, b) => a * b
const curriedMult = (a) => (b) => a * b
console.log(multiply(3, 4)) // 12
console.log(curriedMult(3)) // (b) => a * b
console.log(curriedMult(3)(4)) // 12
~~~

---

## Pipe

Combines functions together, like a pipe flowing left to right. The result of a pipe function is a function that is a bundled up version of the sequence of operations.

~~~javascript
const pipe = (...fns) => (x) => fns.reduce((prev, func) => func(prev), x);
const inc = num => num + 1
const dbl = num => num * 2
const dec = num => num - 2
const div = num => num / 2
pipe(
	inc, 
	dbl,
	dec,
	div
	)(5) 
	
// 5
// same as writing div(dec(dbl(inc(5)))) but more readable
~~~

---

## Compose

Function composition is a way of combining multiple simple functions to build a more complicated one.  The result of each function is passed to the next one.

~~~javascript
const compose = (f,g) => (a) => f(g(a));
const sum = (num) => num + 1
compose(sum, sum)(5) // 7
// compose = (sum, sum) => (5) => sum(sum(5)) 7
~~~

---

## Pure Function

A function that accepts an input, has no side effect to anything outside of its scope, and returns a value. Same input results in the same output every single time.

~~~javascript
// pure function example
const pureFunc = (a, b) => a + b;


// impure function example
let x = 2
const impureFunc = (y) => x += y
~~~

---

## Instantiation

A way to create instances or multiple copies of objects using functions. Before ES6, there were other ways to do this, but the class syntax with ES6 is best practice.

~~~javascript
class Player {
	constructor(name, type) {
		this.name = name
		this.type = type
	}
	introduce() {
		console.log(`Hi, I am ${this.name}.  I'm a ${this.type}!`)
	}
}

class Wizard extends Player {
	constructor(name, type) {
		super(name, type) // goes to constructor in Player
	}
	lightning() {
		console.log(`${this.name} strikes with lightning.`)
	}
	heal() {
		console.log(`${this.name} heals.`)
	}
}

const wizard1 = new Wizard('AugusLumos', 'Healer')
const wizard2 = new Wizard('Majestix', 'Dark Mage')

wizard1.introduce()
// Hi, I am AugusLumos. I'm a Healer!
wizard2.introduce()
// Hi, I am Majestix.  I'm a Dark Mage!

wizard2.lightning()
// Majestix strikes with lightning.
wizard1.heal()
// AugusLumos heals.
~~~

---

## Promises

A promise is an object that represents the eventual completion or failure of an asynchronous operation.  It will either resolve a value or a reason (error) that its rejected. 

There are 3 states of a promise.

- \- Fulfilled
- \- Rejected
- \- Pending

~~~javascript
const promise = new Promise((resolve, reject) => {
	let condition = true
	if (condition === true) {
		resolve('It worked')
	} else {
		reject('Error')
	}
})

promise
	.then(result => result + '!')
	.then(result2 => console.log(result2))

// It worked!

promise
	.then(result => {
		throw Error
		console.log(result)
	})
	.catch(() => console.log('Error'))

// Error
~~~


**<u>Example using promises</u>**

~~~javascript
const urls = [
	'https://jsonplaceholder.typicode.com/users',
	'https://jsonplaceholder.typicode.com/posts',
	'https://jsonplaceholder.typicode.com/albums'
]

Promise.all(urls.map(url => {
	return fetch(url).then(res => res.json())
})).then(results => {
	console.log(results.forEach(type => console.log(type)))
}).catch(() => console.log('Error'))

// Promise state pending (First console.log)
// Array of users // Array of posts // Array of albums (console log inside forEach)

.finally(() => console.log('can run something after a promise'))
~~~

---

## Async await

The keyword **async** is used to make a function asynchronous and allows for the use of the **await** keyword, then it returns a promise.

~~~javascript
// syntax
async function myFn() {
	// await something here
}

// example
async function fetchUsers() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users')
	const data = await res.json()
	console.log(data)
	}

// example from promises section
const urls = [
	'https://jsonplaceholder.typicode.com/users',
	'https://jsonplaceholder.typicode.com/posts',
	'https://jsonplaceholder.typicode.com/albums'
]

const getData = async function() {
	try {
	const [ users, posts, albums ] = await Promise.all(urls.map(url => 
		fetch(url).then(res => res.json())
		))
	console.log('users', users)
	console.log('posts', posts)
	console.log('albums', albums)
	} catch {
		console.log('error')
	}
}
// users, [array of users] // posts, [array of posts] // albums, [array of albums]

// for await of example
const getData2 = async function() {
	const arrayOfPromises = urls.map(url => fetch(url))
	for await (let request of arrayOfPromises) {
		const data = await request.json()
		console.log(data)
	}
}
~~~

---

## Debugger

Debugger is a keyword in JavaScript that pauses the program from running and opens a debugging window.  The window allows you to step through the code line by line to see what is happenening.

~~~javascript
const flattened = [[0,1], [2,3], [4,5]].reduce(
	(accumulator, array) => {
		debugger;
		return accumulator.concat(array)
	}, [])
~~~ 