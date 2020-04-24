---
title: React Native
---

<p align="center">
  <img src="react/react-native.png" alt="React Native" width="50%">
</p>

## [ReactNative.dev](https://reactnative.dev/)

---

## What is React Native?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React Native allows you to build native mobile apps without using native code. How is this possible? React Native can do this because it compiles the code to the native language of both Android and IOS devices, Java/C++ for Android and Swift for IOS. This means React Native is cross-platform, write your code once and run on any IOS or Android device. You write your app in JavaScript and React code that is very similar to the React code you would write for a web application. The big differences come inside the components, we use native components instead of web components in React Native. Also, you do not render HTML and CSS does not exist in app development. 

### Components in React Native

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Since there is no such thing as HTML in the native world, our JSX needs to render something that the device can recognize. We use Native Components to do this. A "view" is the basic UI building block, similar to a div in HTML. React native invokes these native views using the React Native Components. Here is the full list of Core Components, from the [React Native Docs](https://reactnative.dev/docs/intro-react-native-components).

<table>
<thead>
<tr><th>React Native UI Component</th><th>Android View</th><th>iOS View</th><th>Web Analog</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code>&lt;View&gt;</code></td><td><code>&lt;ViewGroup&gt;</code></td><td><code>&lt;UIView&gt;</code></td><td>A non-scrolling <code>&lt;div&gt;</code></td><td>A container that supports layout with flexbox, style, some touch handling, and accessibility controls</td></tr>
<tr><td><code>&lt;Text&gt;</code></td><td><code>&lt;TextView&gt;</code></td><td><code>&lt;UITextView&gt;</code></td><td><code>&lt;p&gt;</code></td><td>Displays, styles, and nests strings of text and even handles touch events</td></tr>
<tr><td><code>&lt;Image&gt;</code></td><td><code>&lt;ImageView&gt;</code></td><td><code>&lt;UIImageView&gt;</code></td><td><code>&lt;img&gt;</code></td><td>Displays different types of images</td></tr>
<tr><td><code>&lt;ScrollView&gt;</code></td><td><code>&lt;ScrollView&gt;</code></td><td><code>&lt;UIScrollView&gt;</code></td><td><code>&lt;div&gt;</code></td><td>A generic scrolling container that can contain multiple components and views</td></tr>
<tr><td><code>&lt;TextInput&gt;</code></td><td><code>&lt;EditText&gt;</code></td><td><code>&lt;UITextField&gt;</code></td><td><code>&lt;input type=&quot;text&quot;&gt;</code></td><td>Allows the user to enter text</td></tr>
</tbody>
</table>

### CSS in React Native

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React Native provides a StyleSheet JavaScript object to emulate CSS to native code. 