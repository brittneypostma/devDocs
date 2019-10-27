---
title: JavaScript
date: 10/01/2019
---

<iframe
		height="525"
		style="width: 100%; resize: both;"
		scrolling="no"
		title="Javascript"
		src="https://codepen.io/sballgirl11/embed/rNBoKrd?height=265&theme-id=dark&default-tab=result"
	>
		See the Pen <a href="https://codepen.io/sballgirl11/pen/GRKYPpw/">Javascript</a> by Brittney (<a
			href="https://codepen.io/sballgirl11"
			>@sballgirl11</a
		>) on <a href="https://codepen.io">CodePen</a>. </iframe
	><br />

    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" rel="noopener noreferrer" target="_blank">
    	MDN JavaScript
    </a>

    <p>JavaScript is the verb of the internet, it powers anything that is an action.</p>
    <p>
    	The easiest way to start using JavaScript is to open the console in your browser, in most browsers Ctrl+Shift+I will
    	open it up and you can navigate to the console tab.
    </p>

    <p>In JavaScript, the \\ (backslash) character is reserved as an escape character.  If you use the backslash key, the key typed after that will be ignored.  This is useful when typing strings with multiple ' or ".</p>

    <p>JavaScript can either be put inside of a tag in the HTML file or can be linked to an external file where the src is the location of the file relative to the HTML file you are in.</p>
    <div style=" display: flex;">
    	<div style="margin-right: 0.5em;"><pre><code>&lt;script&gt; *<em>JavaScript goes here</em>* &lt;/script&gt;</code></pre></div><div><pre><code>&lt;script&gt; type="text/javascript" src="script.js" &lt;/script&gt;</code></pre></div>
    </div>

    <p>Because HTML is read synchronously, from top to bottom, it is best practice to put your script tags at the bottom of the HTML file just before the closing body (&lt;/body&gt;) tag.

    <hr />

    <div style="display: grid; grid-template-columns: repeat (auto-fit, minmax(400px, 1fr));">
    	<div style="display: grid;">
    		<div>
    			<h2>Types</h2>
    			<h3>Primitive Data Types</h3>
    			<div style="display: grid; margin-left: 2em;">
    			<ul>
    				<li style="list-style-type: decimal;">
    				<strong>Boolean</strong> - true or false<br/>
    				<pre><code>const bool1 = true;<br/>const bool2 = false;</code></pre>
    				</li>
    				<li style="list-style-type: decimal;">
    				<strong>Null</strong> - explicitly nothing<br/>
    				<pre><code>const nothing = null;</code></pre>
    				</li>
    				<li style="list-style-type: decimal;">
    				<strong>Undefined</strong> - a variable that has no value or has yet to be assigned.<br/>
    				<pre><code>const undVar;<br/>console.log(undVar);<br/>//<em>undefined</em></code></pre>
    				</li>
    				<li style="list-style-type: decimal;">
    				<strong>Number</strong> - numbers in JavaScript can be written with of without a decimal point and can also be Infinity or NaN (not a number).<br/>
    				<pre><code>const num1 = 11;<br/>const num2 = 0.42;</code></pre>
    				</li>
    				<li style="list-style-type: decimal;">
    				<strong>String</strong> - stores text inside double or single quotes or in template literals (\`).<br/>
    				<pre><code>const str1 = 'I am string 1.';<br/>const str2 = "I am string 2."<br/>const str3 = \`I am string 3.\`;</code></pre>
    				</li>
    				<li style="list-style-type: decimal;">
    				<strong>Symbol</strong> - an immutable primitive value that is unique, created by invoking the function Symbol. Symbols are guaranteed to be unique.
    				Even if we create many symbols with the same description, they are different values.<br/>
    				<pre><code>// here are two symbols with the same description,<br/>let Sym1 = Symbol("Sym");<br/>let Sym2 = Symbol("Sym");<br/>console.log(Sym1 == Sym2); // <em>returns "false"</em></code></pre>
    				</li>
    				<li style="list-style-type: decimal;">
    				<strong>BigInt</strong> - a numeric data type that can represent integers in the arbitrary precision format.<br/>
    				<pre><code>const x = 2n ** 53n;<br/>//<em>9007199254740992n</em></code></pre>
    				</li>
    			</ul>
    		</div>
    		<h3>Object Data Type</h3>
    		<p>In JavaScript, almost "everything" can be an object.</p>
    			<div style="margin-left: 2em;">
    				<ul>
    					<li style="list-style-type: square;">
    						Booleans defined with the new keyword.
    					</li>
    					<li style="list-style-type: square;">
    						Numbers defined with the new keyword.
    					</li>
    					<li style="list-style-type: square;">
    						Strings defined with the new keyword.
    					</li>
    					<li style="list-style-type: square;">
    						Dates are always objects.
    					</li>
    					<li style="list-style-type: square;">
    						Math is always an object.
    					</li>
    					<li style="list-style-type: square;">
    						Regular expressions are always objects.
    					</li>
    					<li style="list-style-type: square;">
    						Arrays are always objects.
    					</li>
    					<li style="list-style-type: square;">
    						Functions are always objects.
    					</li>
    					<li style="list-style-type: square;">
    						Objects are always objects.
    					</li>
    				</ul>
    			</div>

    			<hr />
    		</div>


    <div style="display: grid;">
    	<div style="display: grid;">
    		<div>
    			<h2>Keywords</h2>
    			<h3 style="text-align: center;">JavaScript Reserved Words</h3>
    			<div style="display: grid; margin-left: 2em;">
    			<table>
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
    			</table>
    			</div>
    		</div>
    	</div>
    </div>
    			<hr />

    		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
    		<div>
    			<h2>Comparisons</h2>
    			<p>
    				In JavaScript a single = sign is for assigning values, so there are other ways to check for
    				equality.
    			</p>
    			<div style="display: grid; margin-left: 2em;">
    				<ul>
    					<li style="list-style-type: square;">
    						<pre><code>&gt;=</code></pre>
    						<dfn> - is true if the left side is greater than or equal to the value or the right side.</dfn>
    					</li>
    					<li style="list-style-type: square;">
    						<pre><code>&lt;=</code></pre>
    						<dfn> - is true if the left side is less than or equal to the value or the right side. </dfn>
    					</li>
    					<li style="list-style-type: square;">
    						<pre><code>&gt;</code></pre>
    						<dfn> - is true if the left side is greater than the value or the right side.</dfn>
    					</li>
    					<li style="list-style-type: square;">
    						<pre><code>&lt;</code></pre>
    						<dfn> - is true if the left side is less than the value or the right side.</dfn>
    					</li>
    					<li style="list-style-type: square;">
    						<pre><code>== or !=</code></pre>
    						<dfn>
    							- The equality and inequality operators convert the operands if they are not of the same
    							type, then applies a strict comparison. Using these should be avoided, because JavaScript "guesses" what you want and changes the type of the input.
    						</dfn>
    					</li>
    					<li style="list-style-type: square;">
    						<pre><code>//=== or !==<br/>3 === '3'; //;<em>false</em><br/>3 === 3; //;<em>true</em><br/>3 !== 4; //;<em>true</em><br/>3 !== 3; //;<em>false</em></code></pre>
    						<dfn>
    							- The strict equality and inequality operators with no type conversion by JavaScript.  This is the correct way to compare values.
    						</dfn>
    					</li>
    				</ul>
    			</div>
    		</div>
    	</div>
    	<hr/>

    	<div style="display: grid;">
    		<div>
    			<h2>Variables</h2>
    			<p>
    				In JavaScript variables can be assigned with 3 different types: var, let, and const, var and let values can be changed, but const values are constant and unchangeable. They can all be assigned to any of the JavaScript types.
    			</p>
    				<div style="display: grid; margin-left: 2em;">
    				<ul>
    					<li style="list-style-type: decimal;">
    					<strong>var</strong> - declares a variable, optionally initializing it to a value and is function or local scoped (more on this later).<br/>
    					<pre><code>var x;<br/>x = 11;<br/>var y = "this is a string named y"</code></pre>
    					</li>
    					<li style="list-style-type: decimal;">
    					<strong>let</strong> - similar to var, except that it is scoped to the block ( { } ) that it is declared inside of, or block scoped.<br/>
    					<pre><code>const nothing = null;</code></pre>
    					</li>
    					<li style="list-style-type: decimal;">
    					<strong>const</strong> - declares a variable that cannot be changed and must be initialed to a value, it is also block scoped.<br/>
    					<pre><code>const z = 'always the same';<br/>const a; //<em>Syntax error: missing initializer</em><br/>const name = 'Brittney';<br/>name = 'Mary' //<em>Uncaught TypeError: Assignment to constant variable.</em></code></pre>
    					</li>
    				</ul>
    			</div>
    			<h3>Naming Variables</h3>
    			<p>All JavaScript variables must be identified with unique names. These unique names are called <strong>identifiers</strong>. Variables can be named anything, with a few constraints, but it is best practice to name the variables as descriptive to what they are as possible. Using something called camelCase is also best practice. The first word is lowercase and any word after the first letter would be uppercase (myName or numberOfTimes).</p>
    			<p>The general rules for constructing names for variables (unique identifiers) are:</p>
    			<div style="margin-left: 2em;">
    				<ul>
    					<li style="list-style-type: square;">
    						Names must begin with a letter, an underscore (_) or a dollar sign ($).
    					</li>
    					<li style="list-style-type: square;">
    						Names can only contain letters, numbers, underscores, or dollar signs.
    					</li>
    					<li style="list-style-type: square;">
    						Names cannot contain spaces.
    					</li>
    					<li style="list-style-type: square;">
    						Names are case sensitive ( y is not Y).
    					</li>
    				</ul>
    			</div>
    		</div>
    	</div>
    	<hr/>

    	<div style="display: grid;">
    		<div>
    			<h2>Conditionals</h2>
    			<p>
    				Conditional statements are used when you want to perform different actions depending on different conditions.
    			</p>
    				<div style="display: grid; margin-left: 2em;">
    				<ul>
    					<li style="list-style-type: decimal;">
    					<strong>if</strong> - used when you want to check if a condition is true before executing code.<br/>
    					<pre><code>var name = "Brittney";<br/>if (name === "Brittney) {<br/>  alert("Hi Brittney!);<br/>}</code></pre>
    					</li>
    					<li style="list-style-type: decimal;">
    					<strong>else</strong> - used to specify a block of code to be executed when the <em>if</em> block is false.<br/>
    					<pre><code>if (name === "Brittney) {<br/>  alert("Hi Brittney!);<br/>}  else {<br/>  alert("Hi!");<br/>}</code></pre>
    					</li>
    					<li style="list-style-type: decimal;">
    					<strong>else if</strong> - used to specify another condition when the <em>if</em> statement is false and before the else block.<br/>
    					<pre><code>if (name === "Brittney) {<br/>  alert("Hi Brittney!);<br/>}  else if (name === "Joe") {<br/>  alert("Hi Joe!");<br/>}  else {<br/>  alert("Hi!");<br/>}</code></pre>
    					</li>
    					<li style="list-style-type: decimal;">
    					<strong>ternary operator</strong> - is frequently used as a shortcut for the if statement. Multiple conditions can be wrapped in () to separate them.<br/>
    					<pre><code>//Syntax for ternary:<br/><em>(condition) ? executeIfTrue : executeIfFalse<br/>(condition) ? executeIfTrue : (secondCondition) ? executeIfSecondIsTrue : executeIfAllAreFalse</em><br/>var age = 37;<br/>var beverage = (age &gt;= 21) ? "Here's a beer!" : "Have some juice!";<br/>console.log(beverage); //<em>"Here's a beer!"</em><br/>var num = 0;<br/>(num &gt; 0) ? "positive" : (num &lt; 0) ? "negative" : "zero"; //<em>"zero"</em></code></pre>
    					</li>
    					<li style="list-style-type: decimal;">
    					<strong>switch</strong> - used to specify multiple "cases" to be used if they are true. The switch expression is evaluated once and compared with the values of each case, if there is a match, that block of code is executed.<br/>
    					<pre><code>switch (new Date().getDay()) {<br/>  case 6:<br/>    day = "Today is Saturday!";<br/>    break;<br/>  case 0:<br/>    day = "Today is Sunday!";<br/>    break;<br/>  default:<br/>    day = "Ready for the weekend!";<br/>}</code></pre>
    					</li>
    				</ul>
    			</div>
    			<h3>Logical Operators</h3>
    			<ul>
    				<li style="list-style-type: square;">
    				<strong>||</strong> - the OR operator checks until it finds a "truthy" value.<br/>
    				<pre><code>if (age &lt; 16 || age &gt; 100) {<br/>  alert("You should not drive a car.");<br/>}</code></pre>
    				</li>
    				<li style="list-style-type: square;">
    				<strong>&&</strong> - the AND operator checks both sides to be a "truthy" value before executing.<br/>
    				<pre><code>if (firstName === "Brittney" && lastName === "Postma") {<br/>  alert("Your name is Brittney Postma.");<br/>}</code></pre>
    				</li>
    				<li style="list-style-type: square;">
    				<strong>!</strong> - the NOT or BANG operator means the opposite of when used alone and means not when used with other operators.<br/>
    				<pre><code>!true //<em>false</em><br/>!false //<em>true</em><br/>var guess = prompt("Guess my number");<br/>var myNum = 11;<br/>if (guess !== myNum) {<br/>  alert("Sorry, you're wrong");<br/>}</code></pre>
    				</li>
    			</ul>
    			<hr/>

    			<div style="display: grid;">
    				<div>
    					<h2>The Console</h2>
    					<p>
    						The console object provides access to the browser's debugging console. There are different ways to use the console (Ctrl + Shift + I) in JavaScript and it is a great way to debug your code.
    					</p>
    					<h3>A few of the most used console objects:</h3>
    					<ul>
    						<li style="list-style-type: square;">
    							<strong>console.log</strong> - outputs whatever you specify to the console.<br />
    							<pre><code>console.log("Hi Brittney!!") //<em>Hi Brittney!!</em><br/>var num = 11;<br/>console.log(num) //<em>11</em></code></pre>
    						</li>
    						<li style="list-style-type: square;">
    							<strong>console.error</strong> - usually has a red color and outputs an error message to the console.<br />
    							<pre><code>console.error(err) //<em style="color: red;">this might be found in a promise catch statement (more on this later).</em></code></pre>
    						</li>
    						<li style="list-style-type: square;">
    							<strong>console.clear</strong> - clears everything inside the console window and leaves a fresh window.
    							used with other operators.<br />
    							<pre><code>console.clear();</code></pre>
    						</li>
    						<li style="list-style-type: square;">
    							<strong>console.count</strong> - Log the number of times this line has been called with the given label.<br />
    							<pre><code>console.count( [label] )</code></pre>
    						</li>
    						<li style="list-style-type: square;">
    							<strong>console.group, console.groupCollapsed, console.groupEnd</strong> - Console.group() creates a new inline group, indenting all following output by another level. To move back out a level, call groupEnd(). To have a group be collapsed instead of expanded by default call console.groupCollapsed().
    							used with other operators.<br />
    							<pre><code>console.log("Hello world!");<br/>console.group();<br/>console.log("Hello from inside the group!");<br/>console.groupEnd();<br/>console.log("and outside again!");<br/>//<em>Hello world!</em><br/>//<em>&#9660; console.group</em><br/>//  <em>Hello from inside the group!</em><br/>//<em>and outside again!</em></code></pre>
    						</li>
    						<li style="list-style-type: square;">
    							<strong>console.table</strong> - displays data in a table format.<br />
    							<pre><code>console.table(["apples", "oranges", "bananas"]); //<table><tr><th>(index)</th><th>Values</th></tr><tr><td>0</td><td>"apples"</td></tr><tr><td>1</td><td>"oranges"</td></tr><tr><td>2</td><td>"bananas"</td></tr></table></code></pre>
    						</li>
    						<li style="list-style-type: square;">
    							<strong>console.time</strong> - Starts a timer with a name specified as an input parameter. Up to 10,000 simultaneous timers can run on a given page.<br />
    							<pre><code>console.time();</code></pre>
    						</li>
    					</ul>
    				</div>
    			</div>
    			<hr/>


    			<div style="display: grid;">
    				<div>
    					<h2>Functions</h2>
    					<p>
    						Functions in JavaScript are reusable blocks of code that perform a task to can be executed later.  Functions perform the actions inside of them when they are <strong><em>invoked</em></strong> or <strong><em>called</em></strong>. To access a value inside of a function a <strong><em>return statement</em></strong>  must be added, this also immediately exits the function.
    					</p>
    					<p>
    						Functions can be declared a few different ways and are either anonymous (no name), or given a name just like a variable. Function <strong><em>parameters</em></strong>, placed inside the parentheses (), are the names given when defining the function Function <strong><em>arguments</em></strong> are the actual values that are passed to and received by the function.
    					</p>
    					<p>
    						You can write functions in the function syntax or by using an <strong><em>arrow function</em></strong>.  Arrow functions usually have a shorter syntax than typical functions and there is no binding of <strong><em>this</em></strong> (more on "this" later).
    					</p>
    					<ul>
    						<li style="list-style-type: square;">
    							<h4><strong>Anonymous function</strong></h4>
    							<pre><code>function(<em>parameters</em>) {*<em>statements to be executed when called</em>*}<br/>() => {*<em>statements</em>*}<br/><em>parameter</em> => {*<em>statements</em>*}</code></pre>
    						</li>
    						<li style="list-style-type: square;">
    							<h4><strong>Named function</strong></h4>
    							<pre><code>function fnName (<em>parameters</em>) {*<em>statements to be executed when called</em>*}<br/>const fnName = (<em>parameters</em>) => {*<em>statements</em>*}<br/>//same as<br/>const variableName = fnName(<em>parameters</em>) {*<em>statements</em>*}</code></pre>
    						</li>
    					</ul>
    					<h3>Function examples</h3>
    					<ul>
    						<li style="list-style-type: square;">
    							<h4><strong>Add 2 numbers</strong></h4>
    							<div style="style="display: grid;>
    							<pre style="margin-right: 0.5em;"><code>//ES6 arrow function, to invoke it use <em>add()</em><br/>const add =  () => {<br/>var firstNum = parseInt(window.prompt("What is the first number?"), 10);<br/>var secondNum = parseInt(window.prompt("What is the second number?"), 10);<br/>var sum = firstNum + secondNum;<br/>alert("The sum is " + sum)<br/>}</code></pre>
    							<pre><code>//regular named function<br/>function add () {<br/>var firstNum = parseInt(window.prompt("What is the first number?"), 10);<br/>var secondNum = parseInt(window.prompt("What is the second number?"), 10);<br/>var sum = firstNum + secondNum;<br/>alert("The sum is " + sum)<br/>}</code></pre>
    							</div>
    						</li>
    						<li style="list-style-type: square;">
    							<h4><strong>Multiply 2 numbers with parameters</strong></h4>
    							<div style="style="display: grid;>
    							<pre style="margin-right: 0.5em;"><code>//ES6 arrow function<br/>//to invoke it use <em>multiply(argument, argument)</em> or <em>multiply(5, 10)</em><br/>const multiply =  (a, b) => a * b
    							</code></pre>
    							<pre><code>//regular named function<br/>function multiply (a, b) {<br/>  return a * b<br/>}</code></pre>
    							</div>
    						</li>
    				</ul>
    				</div>
    			</div>
    			<hr/>

    <div style="display: grid;">
    		<div>
    			<h2>Arrays</h2>
    			<a href="https://www.w3schools.com/jsref/jsref_obj_array.asp" rel="noopener noreferrer" target="_blank">w3schools JavaScript Array Reference Sheet</a>
    			<p>
    				The Array object is used to store multiple values in a single variable with the [] (bracket) syntax. Arrays use numbers to access the elements inside of them. The indexes are zero-based, so <code>arrayName[0]</code> returns the first item, then <code>[1]</code> returns the second, then <code>[2]</code> returns the third, and so on.
    			</p>
    			<h3>Array Properties and Methods</h3>
    			<ul>
    				<li style="list-style-type: square;">
    					<strong>length</strong> - sets or returns the number of elements in an array.<br/>
    					<pre><code>var numbers = [1, 2, 3, 4, 5];<br/>console.log(numbers.length) //<em>5</em><br/>numbers.length = 3<br/>console.log(numbers.length) //<em>3 - numbers is now [1, 2, 3]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>concat()</strong> - joins 2 or more arrays together and returns a copy of the arrays.  Does not change the original array.<br/>
    					<pre><code>var numArr1 = [1, 2, 3];<br/>var numArr2 = [4, 5, 6]<br/>var allTheNumbers = numArr1.concat(numArr2)<br/>console.log(allTheNumbers, numArr1, numArr2)<br/>//<em>[1, 2, 3, 4, 5, 6], [1, 2, 3], [4, 5, 6]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>copyWithin()</strong> - *(index position to copy to, optional starting index, optional ending index)* - copies array values to another position in the array, overwriting the original value. Modifies the original array.<br/>
    					<pre><code>var fruits = ["peach", "orange", "apple", "banana"]<br/>fruits.copyWithin(2, 0)<br/>console.log(fruits) //<em>["peach", "orange", "peach", "orange"]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>entries()</strong> - returns an Array Iterator object (gives access to the .next() and .value method) with key/value pairs.  For each item in the original array, the new object will contain an array with the index as the key and the item as the value<br/>
    					<pre><code>var array1 = ['a', 'b', 'c'];<br/>var iterator1 = array1.entries();<br/>console.log(iterator1.next().value);<br/>//<em>expected output: Array [0, "a"]</em><br/>console.log(iterator1.next().value);<br/>//<em>expected output: Array [1, "b"]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>filter()</strong> - creates a new array with only the elements from the original array that pass a test. The syntax is <code>let newArr = ogArr.filter(callbackFunction)</code> The callback function is used to test each element in the ogArr and returns those elements to newArr.<br/>
    					<pre><code>var ogArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];<br/>var newArr = ogArr.filter(even => (even % 2 === 0)<br/>console.log(newArr, ogArr)<br/>//<em>[2, 4, 6, 8, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>find() findIndex()</strong> - returns the first value that passes the test. The syntax is <code>let found = ogArr.find(callbackFunction)</code> The callback function is used to test each element in the ogArr until a truthy value is found and returns a single value. findIndex() returns the index of the value.<br/>
    					<pre><code>var ogArr = [10, 20, 30, 40];<br/>var found = ogArr.find(element =&gt; (element > 10))<br/>console.log(found)<br/>//<em>20</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>forEach()</strong> - is similar to a for loop and runs the callback function over every element in an array. he syntax is <code>ogArr.forEach((element, index, array) => callback function)</code> Modifies the original array.<br/>
    					<pre><code>var ogArr = [5, 10, 15, 20]<br/>ogArr.forEach((element, index, arr) =&gt; (arr[index] = element * 10))<br/>console.log(ogArr)<br/>//<em>[50, 100, 150, 200]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>from()</strong> - returns a new array from anything with a length property or iterable object (basically other arrays).<br/>
    					<pre><code>var myArr = Array.from("ABCDEFG")<br/>console.log(myArr)<br/>//&#9658;<em>(7) ["A", "B", "C", "D", "E", "F", "G"]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>from()</strong> - returns a new array from anything with a length property or iterable object (basically other arrays).<br/>
    					<pre><code>var myArr = Array.from("ABCDEFG")<br/>console.log(myArr)<br/>//&#9658;<em>(7) ["A", "B", "C", "D", "E", "F", "G"]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>includes()</strong> - checks if an array includes an element, the fromIndex is an optional argument.<br/>
    					<pre><code>var arr = ['a', 'b', 'c']<br/>arr.includes('c')<br/>//<em>true</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>indexOf() lastIndexOf()</strong> - checks if an array includes an element and returns the first position/index where it can be found. The fromIndex is an optional argument. lastIndexOf() starts at the end and returns the first index where it is found.<br/>
    					<pre><code>var shopList = ['milk', 'bread', 'eggs']<br/>const addToList = (shopList, item) =&gt; shopList.indexOf(item) === -1 ? shopList.push(item) : null<br/>addToList(shopList, 'cheese')<br/>console.log(shopList, shopList.indexOf('cheese')<br/>//&#9658;<em>['milk', 'bread', 'eggs', 'cheese'], 4</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>join()</strong> - joins all elements of an array together in a string. A seperator can optionally be called as well, if no seperator is specified, a comma is used.<br/>
    					<pre><code>var names = ["Brittney", "Joe"]<br/>console.log(names.join(), names.join(" and "))<br/>//<em>(Brittney, Joe), (Brittney and Joe)</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>map()</strong> - creates a new array with the results of a callback function on every element in the original array.<br/>
    					<pre><code>var ogArr = [1, 4, 9, 16]<br/>const doubleArr = ogArr.map(x =&gt; x * 2)<br/>console.log(ogArr, doubleArr)<br/>//&#9658;<em>[1, 4, 9, 16], [2, 8, 18, 32]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>pop()</strong> - modifies an array by taking off the last element, returns the element it removed.<br/>
    					<pre><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>var popped = myFish.pop()<br/>console.log(myFish, popped)<br/>//&#9658;<em>['angel', 'clown', 'mandarin'], 'sturgeon'</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>push()</strong> - modifies an array by adding an element specified to the end of the original array and returns the new length.<br/>
    					<pre><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>myFish.push('sword')<br/>console.log(myFish)<br/>//&#9658;<em>['angel', 'clown', 'mandarin', 'sturgeon', 'sword']</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>shift()</strong> - modifies an array by taking off the first element, returns the element it removed.<br/>
    					<pre><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>var shifted = myFish.shift()<br/>console.log(myFish, shifted)<br/>//&#9658;<em>['clown', 'mandarin', 'sturgeon'], 'angel'</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>unshift()</strong> - modifies an array by adding an element specified to the beginning of the original array and returns the new length.<br/>
    					<pre><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>myFish.unshift('sword')<br/>console.log(myFish)<br/>//&#9658;<em>['sword', 'angel', 'clown', 'mandarin', 'sturgeon']</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>reduce() reduceRight()</strong> - executes a reducer function on an array left to right, reduceRight() goes right to left. The syntax is <code>reduce((accumulator, currentValue) => accumulator + currentValue)</code><br/>
    					<pre><code>const array1 = [1, 2, 3, 4]<br/>const reducedArr = array1.reduce((acc, val) =&gt; acc + val))<br/>console.log(reducedArr)<br/>//&#9658;<em>10 (1 + 2 + 3 + 4)</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>reverse()</strong> - reverses the order of the elements in an array.<br/>
    					<pre><code>const array1 = [1, 2, 3, 4]<br/>const revArr = array1.reverse()<br/>console.log(revArr)<br/>//&#9658;<em>[4, 3, 2, 1]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>slice()</strong> - returns a copy of an array from the specified positions to a new array. The syntax is <code>arr.slice(beginIndex, endIndex),</code><br/>
    					<pre><code>const array1 = [1, 2, 3, 4]<br/>const sliced = array1.slice(2, 4)<br/>console.log(sliced)<br/>//&#9658;<em>(2) [3, 4]</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>splice()</strong> - modifies an existing array by removing/replacing existing elements or adding new ones. The syntax is <code>arr.splice(startIndex, deleteCount(optional), 'item'(optional)),</code><br/>
    					<pre><code>var months = ['Jan', 'March', 'April', 'June']<br/>months.splice(1, 0, 'Feb') //<em>inserts at index 1</em><br/>console.log(months)<br/>//&#9658;<em>['Jan', 'Feb', 'March', 'April', 'June']</em></code></pre>
    					<pre><code>var months = ['Jan', 'March', 'April', 'June']<br/>months.splice(4, 1, 'May') //<em>replaces 1 element at index 4</em><br/>console.log(months)<br/>//&#9658;<em>['Jan', 'Feb', 'March', 'April', 'May']</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>some()</strong> - checks if any elements in an array pass the test by the callback function.<br/>
    					<pre><code>const array1 = [1, 2, 3, 4]<br/>var even = element =&gt; element % 2 === 0<br/>console.log(array1.some(even))<br/>//<em>true</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>toString()</strong> - returns a string of the specified arrays elements.<br/>
    					<pre><code>const array1 = [1, 2, 3, 4]<br/>console.log(array1.toString())<br/>//<em>1,2,3,4</em></code></pre>
    				</li>
    			</ul>
    			<hr/>
    		</div>
    	</div>
    	<div style="display: grid;">
    		<div>
    			<h2>Objects</h2>
    			<a href="https://www.w3schools.com/js/js_objects.asp" rel="noopener noreferrer" target="_blank">w3schools JavaScript Objects Reference Sheet</a>
    			<p>
    				Objects, collections of properties, are used to store values in property:value pairs with the { } (curly-brace) syntax.  Properties can be accessed or changed by using <code>objName.propName</code> and methods (functions inside of an object) can be called with <code>objName.propName()</code><br/>
    			</p>
    			<pre><code>var objName = {<br/>color: "blue",<br/>shape: "circle",<br/>price: 5,<br/>otherColors: ["yellow", "red", "green"]<br/>logShape: function() {<br/>	console.log('I am a' + objName.color + objName.shape + '!')<br/>	}<br/>}<br/>objName.logShape() // <em>I am a blue circle!</em></code></pre>
    			<h3>Dynamic Properties</h3>
    		</div>
    	</div>


    	<h2 style="text-align: center;">Friendbook Example with Array of Objects</h2>

    	<iframe
    	height="525"
    	style="width: 100%; resize: both;"
    	scrolling="no"
    	title="Javascript"
    	src="https://codepen.io/sballgirl11/embed/gOOLGdW?height=265&theme-id=0&default-tab=css,result"
    >
    	See the Pen <a href="https://codepen.io/sballgirl11/pen/GRKYPpw/">Javascript</a> by Brittney (<a
    		href="https://codepen.io/sballgirl11"
    		>@sballgirl11</a
    	>) on <a href="https://codepen.io">CodePen</a>. </iframe
    ><br />

    <hr/>

    	<div style="display: grid;">
    		<div>
    			<h2>Loops</h2>
    			<p>
    			Loops offer a quick and easy way to do something repeatedly.<br/>
    			</p>
    			<h3>Types of Loops</h3>
    			<ul>
    				<li style="list-style-type: square;">
    					<strong>for</strong> - loops through a block of code a number of times.<br/><code>for (statement 1; statement 2; statement 3) { // code block to be executed }</code>
    					<ul>
    						<li style="list-style-type: square; margin-left: 1em;"><strong>Statement 1</strong> is executed (one time) before the execution of the code block.</li>
    						<li style="list-style-type: square; margin-left: 1em;"><strong>Statement 2</strong> defines the condition for executing the code block.</li>
    						<li style="list-style-type: square; margin-left: 1em;"><strong>Statement 3</strong> is executed (every time) after the code block has been executed.</li>
    					</ul>
    					<pre><code>for (i = 0; i &lt; 5; i++) {<br/>  text += "The number is " + i + "!" + &lt;br/&gt;<br/>}<br/>// <em>The number is 0!<br/>The number is 1!<br/>The number is 2!<br/>The number is 3!<br/>The number is 4!</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>for/in</strong> - loops through the properties of an object.<code>for (variable in object) { // code block to be executed }</code><br/>
    					<pre><code>let arr = [3, 5, 7]<br/>for (let i in arr) {<br/>  console.log(i)<br/>}<br/>// <em>0, 1, 2</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>for/of</strong> - loops through the values of an iterable object.<code>for (variable of object) { // code block to be executed }</code><br/>
    					<pre><code>let arr = [3, 5, 7]<br/>for (let i in arr) {<br/>  console.log(i)<br/>}<br/>// <em>3, 5, 7</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>while</strong> - loops through a block of code while a specified condition is true.<code>while (condition) { // code block to be executed }</code><br/>
    					<pre><code>let i = 0<br/>while (i &lt; 5) {<br/>  i++<br/>  console.log(i)<br/>}<br/>// <em>0, 1, 2, 3, 4</em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>do/while</strong> - also loops through a block of code while a specified condition is true.<code>do { //statement } while (condition)</code><br/>
    					<pre><code>let i = 0<br/>do {<br/>  i++<br/>  console.log(i)<br/>}<br/>while (i &lt; 5)<br/>// <em>0, 1, 2, 3, 4</em></code></pre>
    				</li>
    			</ul>
    		</div>
    	</div>

    	<hr/>

    	<div style="display: grid;">
    		<div>
    			<h2>Scope</h2>
    			<p>
    			Scope determines the accessibility (visibility) of variables. JavaScript has 3 types of scope; Global Scope, Function or Local Scope, and Block Scope introduced in 2015 as ES2015 (formally called ES6).<br/>
    			</p>

    			<ul>

    				<li style="list-style-type: square;">
    					<strong>Global Scope</strong> - Variables declared outside a function are global scoped and can be accessed anywhere. This is the root scope and lives on the window object.<br/>
    					<pre><code>let name = "Brittney"<br/>// code here CAN use variable name<br/>function myFunction() {<br/>  name = "Joe"<br/>  // code here CAN use variable name</code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>Local Scope</strong> - Variables declared inside a function become locally scoped and are not accessible outside the funtion.<br/>

    					<pre><code>// code here can NOT use variable name<br/>function myFunction() {<br/>  var name = "Brittney"<br/>  // code here CAN use variable name<br/>}</code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>Block Scope</strong> - Variables declared with var can NOT have block scope, only let and const variables have access to block scope.<br/>

    					<pre><code>// Root Scope (window)<br/>let letVar = "letVar, ";<br/>const constVar = "constVar, "<br/>let newLetVar = "newLetVar, "<br/> const newConstVar = "newConstVar, "<br/><br/>function scopeFunction() {<br/>  // block scope<br/>  let letVar = "block scope letVar, "<br/>  const constVar = "block scope constVar, "<br/>  newLetVar = "changed global newLetVar, "<br/>  console.log("BLOCK SCOPE: ", letVar, constVar, newLetVar, newConstVar)<br/>}<br/>console.log("BEFORE: ", letVar, constVar, newLetVar, newConstVar)<br/>scopeFunction()<br/>console.log("AFTER: ", letVar, constVar, newLetVar, newConstVar)<br/>// <em>BEFORE: letVar, constVar, newLetVar, newConstVar, <br/>   BLOCK SCOPE: block scope letVar, block scope constVar, changed global newLetVar, newConstVar, <br/>   AFTER: letVar, constVar, changed global newLetVar, newConstVar, </em></code></pre>
    				</li>
    				<li style="list-style-type: square;">
    					<strong>All Example</strong><br/>

    					<pre><code>// Root Scope (window)<br/>var varVar = "varVar, "<br/>let letVar = "letVar, ";<br/>const constVar = "constVar, "<br/>let newLetVar = "newLetVar, "<br/><br/>function scopeFunction() {<br/>  // block scope<br/>  var varVar = "local scope varVar, "<br/>  let letVar = "block scope letVar, "<br/>  const constVar = "block scope constVar, "<br/>  newLetVar = "changed global newLetVar, "<br/>  varVar = "only changes local scope varVar, "<br/>  console.log("BLOCK SCOPE: ", varVar, letVar, constVar, newLetVar)<br/>}<br/>console.log("BEFORE: ", varVar, letVar, constVar, newLetVar)<br/>scopeFunction()<br/>console.log("AFTER: ", varVar, letVar, constVar, newLetVar)<br/>// <em>BEFORE: varVar, letVar, constVar, newLetVar, <br/>   BLOCK SCOPE: only changes local scope varVar, block scope letVar, block scope constVar, changed global newLetVar, <br/>   AFTER: varVar, letVar, constVar, changed global newLetVar, </em></code></pre>
    				</li>

    			</ul>


    		</div>
    	</div>
    	<hr/>
