---
title: Jr to Sr Dev
---

<p align="center">
  <img src="./jr2sr/roadmap.png" alt="Jr to Sr Course map" width="65%">
</p>

---

### Table of Contents

- [SSH](#ssh)
  - [Install SSH on Windows](#install-ssh-on-windows)
  - [SSH Service](#ssh-service)
  - [SSH Encryption](#ssh-encryption)
  - [SSH Commands](#ssh-commands)
  - [SSH on GitHub](#ssh-on-github)
- [Performance](#performance)
  - [Image Optimization](#image-optimization)
    - [Image Resources](#image-resources)
  - [Content Structurization](#content-structurization)
    - [Critical Render Path](#critical-render-path)
    - [Optimize CRP](#optimize-crp)
- [Frontend Development](#frontend-development)
  - [Module Bundlers](#module-bundlers)
  - [Webpack](#webpack)
  - [Build Webpack with React from Scratch](#build-webpack-with-react-from-scratch)
  - [Part 2 - Build Webpack with React from Scratch](#part-2---build-webpack-with-react-from-scratch)
  - [Part 3 - Build Webpack with React from Scratch](#part-3---build-webpack-with-react-from-scratch)
    - [Connect React](#connect-react)
- [Performance Part II](#performance-part-ii)
  - [Code Splitting](#code-splitting)
  - [Component Updating](#component-updating)
- [Progressive Web Apps - PWAs](#progressive-web-apps---pwas)

---

## SSH

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSH or **Secure Shell** is a type of protocol that allows machines to communicate each other. There are many types of protocols such as http, https, ftp, ip, and others. SSH is just another type that secures the connection between a clint and a server. It was created as a way to encrypt data that is sent over a connection, so that bad actors cannot monitor it. You can access ssh by using this command:

```
ssh {user}@{host}
```

The **user** is the account you want to access and the **host** is the computer you want to access. But first, we need to install SSH if you are using Windows.

### Install SSH on Windows

- Click the start menu and search for Manage Optional Features.
- Click Add a Feature.
- Search for OpenSSH and install it.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSH should not be installed on Windows, but there are a few more things to know. The following commands work inside Powershell when it is ran as an administrator.

```
// Run this command to show the name and state of OpenSSH.

Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'

// It should print out a message like this.

Name : OpenSSH.Client~~~~0.0.1.0
State : Installed

Name : OpenSSH.Server~~~~0.0.1.0
State : Installed

// If the server is NotPresent instead of Installed,
// add it with this command.

Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

### SSH Service

- &#x25A0; To start the service run **`Start-Service sshd`**
- &#x25A0; To get a running service run **`Get-Service sshd`**
- &#x25A0; And to stop the service run **`Stop-Service sshd`**

Alternatively, you can avoid manually starting by having it start on boot. You can run this command to do that.

```
Set-Service -Name sshd -StartupType 'Automatic'
```

The last thing to add are the firewall settings. You can set those with this command.

```
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH SSH Server' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

### SSH Encryption

<p align="center">
  <img src="./jr2sr/ssh.png" alt="SSH" width="75%">
</p>

**[How SSH Encryption Works](https://www.hostinger.com/tutorials/ssh-tutorial-how-does-ssh-work)**

There are 3 types of SSH Encryption.

- &#x25A0; **Symmetrical Encryption** - secret key based encryption. Both the client and the server create a secret key and a public key using an agreed upon method (a key exchange algorithm). The secret key is never transmitted and only exists on each individual machine. Only the public keys are ever shared.

- &#x25A0; **Asymmetrical Encryption** - uses 2 separate keys to encrypt data, public and private. A machines public key can only be decrypted by that same machines private key. It is a one way relationship. SSH uses this type of encryption in the initial exchanging of public keys.

- &#x25A0; **Hashing** - computes a unique value for every input that is given. SSH hashes the final data sent, so that bad actors cannot become middle men and intercept messages.

SSH uses all 3 of these to secure the exchange of data across machines with these steps.

- 1\. Asymmetric encryption is used when a client tries to connect to the server.
- 2\. [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) - symmetric encryption secures the key exchange.
- 3\. Arrive at Symmetric key.
- 4\. Make sure no funny business - hash data.
- 5\. Authenticate User - either with RSA key or password.
- 6\. Create secure tunnel typically on port 22 to pass data.

<p align="center">
  <img src="./jr2sr/encryption.gif" alt="SSH" width="75%" style="border: 1px solid black;">
</p>

### SSH Commands

Full list of [SSH Commands](https://www.ssh.com/ssh/command/).

```
// access server
ssh USER_NAME@HOST_IP

// create key with type (-t) rsa, bit size (-b) and comment (-C)
ssh-keygen -t rsa -b 4096 -C 'email_address@email.com'

// add correct private key
ssh-add /.ssh/your_private_key
```

### SSH on GitHub

[Visual Guide for SSH setup on windows](https://github.com/antonykidis/Setup-ssh-for-github/blob/master/Setup-ssh-on-github.pdf)

- &#x25A0; Navigate to your GitHub settings.
- &#x25A0; Click SSH and GPG keys
- &#x25A0; Click New SSH Key
- &#x25A0; Create a title and paste in the **PUBLIC** key.
- &#x25A0; Click Add SSH key

The next step may vary based on what OS you are running. I am on Windows and followed these steps.

- &#x25A0; Open git bash terminal to directory I want to clone into.
- &#x25A0; Typed **`eval`\`ssh-agent -s`** to start up the ssh agent.
- &#x25A0; Then type **`ssh-add /.ssh/your_github_key`**.
- &#x25A0; Finally, type **`git clone git@github.com:username/repo`**

At last, SSH is setup and working for GitHub. Bruno is happy! 😄

---

## Performance

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The speed at which a website loads can cost companies billions of dollars if it is too slow to load. We need to be able to make sure our sites preform at the most optimum speed. When you type in a web address in your browser, a **GET** request is made to the server. You would expect that page to load in 2 seconds. If it takes more than 3 seconds, would you leave? The server needs to process that GET request, retrieve the data, and then send it back to the client. You can use the developer console in browsers to see how your page would load at different connection speeds. The lighthouse extension is now built into Chrome developer tools or you can get [Lighthouse for firefox](https://addons.mozilla.org/en-US/firefox/addon/lighthouse-report-generator/). Lighthouse will analyze your site and break down each thing that needs improvement and what steps to take. We can improve upon these things to increase the speed of our page loading.

- 1\. **Frontend client**
- 2\. **Transfer of data**
- 3\. **Backend processing**

<p align="center">
  <img src="./jr2sr/performance.png" alt="performance" width="75%">
</p>

### Image Optimization

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The easiest way to increase the speed of your site is to minimize the data. We can use minifiers to take out all the white space from our HTML, CSS, and JS files to save on bytes. We can also convert our images to an optimal format, compress them, and use correct sizing. If we only need an image to be `200px`, there is no need for it to be `800px`. We can use an image editor to crop the image to the correct size we want it displayed at. There are 2 types of image compression: **lossy** and **lossless**. Lossy means that the image quality is degraded in compression. Lossless, on the other hand, does not degrade the visual quality of the image. There are 5 main types of images for websites:

- &#x25A0; **JPG** - a lossy compression for digital images that does not allow for transparency. The newer JPEG-2000 has better compression, but is not well supported.
- &#x25A0; **PNG** - a lossless compression that allows for transparency, but limit the number of colors used. This makes them much smaller in size than JPG.
- &#x25A0; **GIF** - a lossless bitmap image format that limits the number of colors, but allows for transparency and animation.
- &#x25A0; **SVG** - a markup language vector based image format that is lossless and allows for animation and transparency.
- &#x25A0; **WEBP** - a newer image format that compresses lossless or lossy images for the web. It is not fully supported as of writing this, so be sure to check [Can I Use](https://caniuse.com/#feat=webp) before converting.<br/><br/>

#### Image Resources

- &#x25A0; [Image File Types](https://99designs.com/blog/tips/image-file-types/)
- &#x25A0; [imgIX](https://pageweight.imgix.com/)
- &#x25A0; [Which to Use](https://www.sitepoint.com/gif-png-jpg-which-one-to-use/)

<p align="center">
  <img src="./jr2sr/images.png" alt="which to use images" width="75%">
</p>

- &#x25A0; [JPEG Optimizer](http://jpeg-optimizer.com/)
- &#x25A0; [Tiny PNG](https://tinypng.com/)
- &#x25A0; [Verexif](http://www.verexif.com/en/)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Using media queries in your CSS is another way you can change what is displayed to a user to speed up the site. At smaller screen sizes, such as mobile devices, you can lower the size and quality of the images.

- &#x25A0; [Media Queries](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/)
- &#x25A0; [Media Queries Cheat Sheet](https://gist.github.com/bartholomej/8415655)

---

### Content Structurization

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Structuring the content of your site efficiently can significantly reduce the speed in which it loads. Instead of sending every file for the site, we can send only the files needed for the page to load. How do we accomplish this? The first thing is to make good choices with libraries and frameworks. Don't just pile on unnecessary **kbs** to your site, think about the cost versus what you are getting out of it. Next, we need to bundle our files into one so that there are less requests being made. Each browser has a [max number of requests](https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser) it can make at one time. Limiting what and when it is sent is an important step in speeding up your site.<br/><br/>

#### Critical Render Path

<p align="center">
  <img src="./jr2sr/crp.png" alt="critical render path" width="75%">
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a page is loaded it goes through a sequence of steps called the **Critical Render Path** to convert files into what you see on the screen. Optimizing this path will improve the performance. As the browser receives the HTML, it begins to build the **DOM** or **Document Object Model**. This is a tree like structure of the site. As the browser continues to parse the HTML, it may encounter CSS stylesheets that are retrieved and then combined to create the **CSSOM** or **CSS Object Model** on how to style the DOM. CSS is render blocking though, meaning nothing continues loading on the page until it receives and processes all of the CSS. Once the CSSOM is created, the JavaScript is loaded and is then combined with the DOM to create the **Render Tree** of how the page should look. Once the render tree is built, the **Layout** determines where and how elements are positioned on the screen. Finally, once the layout is set, the pixels are put on the screen in the **Paint** step.

#### Optimize CRP

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To optimize the critical render path, we want to get our CSS to the browser as soon as possible and our JavaScript as late as possible. Putting the CSS links in the **head** section and JavaScript just before the closing tag of the **body** will accomplish this.

```html
<!-- HTML
  #1 Load <style> in <head>
  #2 Load <script> right before </body>
-->
<!DOCTYPE html>
<html>
  <head>
    <title>Critical Render Path</title>
    <link rel="stylesheet" href="./style.css" media="all" />
  </head>
  <body>
    <h1>How Fast?</h1>
    <button>Click Me</button>
    <script>
      alert('check')
    </script>
  </body>
</html>
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The next step is to make your CSS as lightweight as possible. Consider what you are loading and using above the fold loading, media attributes, and less specificity all reduce the size of your css. To break these steps down, first we need to make sure we only have what we need in our CSS files and not extra stuff not being used that bloats the file size. Next, use above the fold loading. This means to only load what the user can physically see on their screen without scrolling. Once that is loaded, then the other styles will be download. To accomplish this, you need to use a JavaScript function to load your stylesheet for the content that is below the window.

```javascript
const loadStylesheet = src => {
  if (document.createStylesheet) {
    document.createStylesheet(src)
  } else {
    const stylesheet = document.createElement('link')
    stylesheet.href = src
    stylesheet.type = 'text/css'
    stylesheet.rel = 'stylesheet'
    document.getElementsByTagName('head')[0].appendChild(stylesheet)
  }
}

window.onload = function () {
  loadStylesheet('./style3.css')
}
```

Using media attributes on the link tag will only load that file for devices of the width specified.

```html
<!-- ALL MEDIA TYPES -->
<link rel="stylesheet" href="./style.css" media="all" />
<!-- DEVICES GREATER THAN 600px IN WIDTH -->
<link
  rel="stylesheet"
  href="./style.css"
  media="only screen and (min-width: 600px)"
/>
<!-- DEVICES LESS THAN 600px IN WIDTH -->
<link
  rel="stylesheet"
  href="./style.css"
  media="only screen and (max-width: 600px)"
/>
```

Finally, use less specificity. The browser needs to do more work, the more specific our CSS is.

```css
/* BAD */
.header .nav .item .link a.important {
  color: red;
}

/* GOOD */
a.important {
  color: red;
}
```

As a final option, loading an internal **`<style>`** tag in your HTML files or using **inline** styles will prevent the browser from loading an extra request.

```html
<html>
  <head>
    <style>
      /* INTERNAL STYLES */
      h1 {
        color: blue;
      }
    </style>
  </head>
  <body>
    <h1>How fast?</h1>
    <h2 style="background-color: blue; color: white;">
      Inline style
    </h2>
  </body>
</html>
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JavaScript can be one of the biggest blockers when it comes to rendering a website. Because it can access and change both the DOM and CSS, it can cause elements to be rerendered if it overwrites something already declared. JavaScript is also **parser blocking** because it is a single threaded language, meaning only one line can be executed at a time. To minimize this we can load scripts asynchronously, defer loading of scripts, minimize DOM manipulation, and avoid long running JavaScript files.

```html
<!-- REGULAR SCRIPTS -->
<script></script>
<!-- NO DOM EFFECTS -->
<script async></script>
<!-- WAITS ON HTML TO PARSE -->
<script defer></script>
```

[When to use async and defer?](https://stackoverflow.com/questions/10808109/script-tag-async-defer)

[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) is a site made by Google that will analyze your site and tell you what improvements can be made to increase the speed.

---

## Frontend Development

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The frontend landscape is forever changing and evolving. It sometimes seems as if there is a new library or framework every week. The thing Senior Developers realize is that these are all just tools and each tool is useful depending on the circumstance. It is better to use which one fits the project best than to develop a "this one is better than that one" opinion. At the time of writing, 3 of the major players in this market are **Angular**, **React**, and **Vue**. **Svelte** is a newer framework that is making some headway as well, this site is actually written in Svelte. Angular is a very opinionated framework that is often referred to as the "whole kitchen". It gives you all the tools you need to build a site included and you have to do things the Angular way. React, on the other hand, is unopinionated and is considered more of a tool that you can build on and bring in whatever packages you need to build a site. **Vue** is a mixture of both React and Angular. It is able to be scaled between a library and a full-featured framework and is also user friendly for newer developers. This section focuses on [React](https://console-logs.netlify.app/blog/react) and [Redux](https://console-logs.netlify.app/blog/redux). Here is a [Code Sandbox](https://codesandbox.io/s/robofriends-jmyy7?fontsize=14&hidenavigation=1&theme=dark) of the rewritten RoboFriends app using Redux and Hooks. You can also check out my post on dev.to [Explain Redux like I'm 5!](https://dev.to/bdesigned/explain-redux-like-i-m-5-18kn). You can visit their respective links to learn more on those topics.

### Module Bundlers

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Module bundlers are used to bundle all of your JavaScript files into a single file that can be executed in the browser. Popular bundlers are **Webpack**, **Rollup**, and **Parcel**. Webpack is widely used and is apart of Create React App already. It requires the user to configure and setup the files and allows for customization. Parcel has come out with a zero configuration version that takes care of the setup. Rollup is known for being really good at **tree shaking**, throwing out code that isn't needed. Here is a good resource on [tree shaking](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/).

### Webpack

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Webpack is probably the most widely used module bundler. Webpack requires a lot of setup, but that also comes with a lot of control over what and how you want to use things. There are 4 main concepts in Webpack. **Entry** is a JavaScript file where Webpack will enter your project, typically **`index.js`**. **Output** is where you tell Webpack to output all of the files in bundles together, typically a **`build`** folder. **Loaders** are what you put your code through to compile or transpile your code, a popular tool for this is **Babel**. Lastly, **Plugins** play a vital role in outputting your code. Webpack has a rich plugin interface you can explore here: [Webpack Plugins](https://webpack.js.org/plugins/).

### Build Webpack with React from Scratch

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create React App comes with Webpack already pre-configured for you. This is going to teach you how it is done. Go to the directory of your choice and follow these steps to create a new project and setup Webpack.

- 1\. **`mkdir webpack-project`** and then **`cd webpack-project`**
- 2\. **`npm init`** - this will walk you through the steps of creating a basic package.json file.
- 3\. **`npm i --save-dev webpack webpack-dev-server webpack-cli`** - install webpack.
- 4\. **`mkdir build`** then **`cd build`** then **`touch index.html`** and **`touch bundle.js`**- create our build folder, html entry point, and js bundle file.
- 5\. **`cd ..`** to go back to the root directory of your project.
- 6\. **`touch webpack.config.js`** to create the webpack configuration file we will use next.

- 7\. Open up the project in your favorite editor. Mine is VS Code and I wrote a whole article on getting it setup with a good developer environment here [VS Code Setup](https://dev.to/bdesigned/vscode-setup-with-eslint-and-prettier-1gek). In your package.json file we are going to edit the "scripts" section. Make sure your file looks like this unless you customized the package.json setup. Change the "scripts" section to include **`"start": "webpack-dev-server --config ./webpack.config.js --mode development"`** so we can run our server with Webpack using **`npm start`**.

```javascript
{
  "name": "webpack-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development"
  },
  "author": "",
  "license": "ISC",
    "devDependencies": {
    "webpack": "^4.43.0",
    "webpack-dev-server": "^3.11.0",
    "webpack-cli": "^3.3.11"
  }
}
```

- 8\. **`mkdir src`** - in your **root** directory create a src folder.
- 9\. **`cd src`** then **`touch index.js`** to change into src folder and create our js entry point. Add **`console.log('Webpack wizard!')`** to the index.js file.
- 10\. Next, open up the **`webpack.config.js`** file and add the following code.

```javascript
module.exports = {
  entry: [
    './src/index.js' // The entry point
  ],
  output: {
    path: (__dirname = '/build'), // folder webpack should output files to
    publicPath: '/', // path to build directory
    filename: 'bundle.js' // file to output js to
  },
  devServer: {
    contentBase: './build' // dev server folder to use
  }
}
```

- 11\. Now, open up the index.html file and add the following code. We will inject React into the `div` with `id="app"` and Webpack will bundle our js into the bundle.js file.

```html
<!-- index.html file -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack Wizard</title>
  </head>
  <body>
    <h1>Webpack Wizard</h1>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

- 12\. At this step, we should check to ensure Webpack is configured correctly. Run **`npm start`** from the root directory. This will output some information to the terminal, but if you visit **`http://localhost:8080/`** in your browser, you should see something like this.

<p align="center">
  <img src="./jr2sr/webpack.png" alt="webpack output" width="100%" style="border: 1px solid black">
</p>

### Part 2 - Build Webpack with React from Scratch

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yay! Part 1 is done. Now, we move onto **Babel** to transpile our code back to ES5 so we have full browser support.

- 1\. **`npm i --save-dev babel-core babel-loader babel-preset-env babel-preset-react`** - in your root directory, install babel core, babel loader, and babel preset env.
- 2\. Open package.json and add **`"babel": { "presets": [ "env", "react" ]}`** to it. It should now look like this.

```javascript
{
	"name": "webpack-project",
	"version": "1.0.0",
	"description": "building webpack from scratch",
	"main": "index.js",
	"scripts": {
		"start": "webpack-dev-server --config ./webpack.config.js --mode development"
	},
	"babel": {
		"presets": [
			"env",
			"react"
		]
	},
	"author": "Brittney Postma",
	"license": "ISC",
	"devDependencies": {
		"babel-core": "^6.26.3",
		"babel-loader": "^8.1.0",
		"babel-preset-env": "^1.7.0",
		"babel-preset-react": "^6.24.1",
		"webpack": "^4.43.0",
		"webpack-cli": "^3.3.11",
		"webpack-dev-server": "^3.11.0"
	}
}
```

- 3\. In **`webpack.config.js`** add **`module: { rules: [{ test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] }]}, resolve: { extensions: ['js', 'jsx'] }`**. It now should look like this.

```javascript
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: (__dirname = '/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
  },
  module: {
    rules: [
      {
        // test for all js and jsx files
        test: /\.(js|jsx)$/,
        // exclude node modules folder
        exclude: /node_modules/,
        // run all js and jsx through babel-loader
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    // makes it so you don't have to
    // write .js and .jsx at the end of imports
    extensions: ['js', 'jsx']
  }
}
```

### Part 3 - Build Webpack with React from Scratch

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Finally, Webpack and Babel are setup. The last step is to install React and ESLint.

- 1\. **`npm i react react-dom`** then **`npm i --save-dev eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks @babel/core @babel/preset-env @babel/preset-react babel-eslint babel-loader`** to install React and ESLint from your root directory.
- 2\. Now edit webpack.config.js to include **`{ test: /\.(js|jsx)$/, exclude: /node_modules, use: ['eslint-loader'] }`** in the rules section.

```javascript
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: (__dirname = '/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
```

- 3\. **`touch .eslintrc.json`** to create the ESLint configuration file.
- 4\. Open .eslintrc and input the following code to configure ESLint, and Babel.

```javascript
// .eslintrc
{
	"extends": ["airbnb-base"],
	"env": {
		"node": true,
		"es6": true,
		"browser": true
	},
	"parser": "babel-eslint",
	"rules": {
		"no-console": "off"
	}
}

```

- 5\. Open package.json and add **`"babel": { "presets": ["@babel/preset-env","@babel/preset-react"] },`** to configure babel.
- 6\. Finally, it is time to test our configuration. Run **`npm start`** 🍀 and fingers crossed it is working.

**Warning** - If you run into errors or issues when running **`npm start`**, which you probably will, then first try fully reading the error and then Googling the error. I spent an hour looking for the reason babel-core was missing and nothing worked. I looked down and saw this error and the answer was staring me in the face. I was using a deprecated version of babel and had to redo my entire setup.

<p align="center">
  <img src="./jr2sr/error-webpack.png" alt="error babel" width="100%">
</p>

#### Connect React

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The last thing to do is connect React and insert it into our `div` with the `id="app"` we created earlier. Remove the console log from `src/index.js` and we are going to build our React component.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

const WebpackWizard = () => {
  return (
    <div>
      <h1>Webpack Wizard</h1>
    </div>
  )
}

ReactDOM.render(<WebpackWizard />, document.getElementById('app'))
```

Congratulations! If you are still with me, we now have a working version of basically create-react-app, but we built it from scratch. 🎉

[Create Webpack Config App](https://createapp.dev/).

---

## Performance Part II

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Optimizing your code and testing it for multiple devices will ensure that it runs smoothly across all platforms. You can use the network tab to see when things happen on your page and how long they take. There are also sites out there like [Web Page Test](https://www.webpagetest.org/) that will break down your page load into graphs and allow you to test for different devices. You want to make sure your time to first meaningful paint and time to interactivity are as short as possible. Also, make sure to add [React Dev Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or [React Dev Tools for FireFox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) if you are building a React project.

### Code Splitting

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Splitting your code up into chunks that will only be delivered if they are needed will help to speed up the compilation time of your page. If a contact page never gets visited, we don't need to load its JavaScript into the home page or even think about code splitting components that don't need to be loaded immediately. Create React App has this built in and most libraries include a build tool to give you a **production build** that takes advantage of code splitting. If you run `npm run build` in a react app, it will create minified versions of your files and remove all of the debugging tools. [React Suspense](https://reactjs.org/docs/code-splitting.html#reactlazy) is another great tool to help integrate code splitting for a component in React. Also, check out this [Comparison with React.lazy](https://loadable-components.com/docs/loadable-vs-react-lazy/).

```javascript
import React, { Suspense } from 'react'

const OtherComponent = React.lazy(() => import('./Components/Other'))
const AnotherComponent = React.lazy(() => import('./Components/Another'))

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  )
}
```

### Component Updating

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Making sure your components update only when needed can definitely increase your sites performance. One package can help you figure out if a component should be updated or not, it's called [why did you render](https://github.com/maicki/why-did-you-update). You can install this with `npm i @welldone-software/why-did-you-render --save`. To use it we need to add some code, so that it is only used in development, not production. The best way to do this is to create a file near the entry-point of you application.

```javascript
// wdyr.js
import React from 'react'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  const ReactRedux = require('react-redux')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']]
  })
}

// index.js
import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

---

## Progressive Web Apps - PWAs

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PWAs or progressive web apps are regular websites that deliver app-like experience on a mobile device. [What web can do today](https://whatwebcando.today/) is a site that tells you current information about what PWAs can do versus a native app. Google created PWAs and are the fastest at providing updates to it, Apple is the slowest. If we think about this, it kind of makes sense right? Google is interested in keeping people using the web for things like google.com, ad revenue, and Chrome browser, where Apple is interested in keeping their app store restricted to only apps they approve. You can read more on PWAs in [Submitting PWA to 3 app stores](http://debuggerdotbreak.judahgabriel.com/2018/04/13/i-built-a-pwa-and-published-it-in-3-app-stores-heres-what-i-learned/) or in [PWA Android vs iOS](https://medium.com/@firt/progressive-web-apps-on-ios-are-here-d00430dee3a7). Also, [Appscope](https://appsco.pe/) displays some of the top PWAs.

---
