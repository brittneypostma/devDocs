---
title: Jr to Sr Developer
---

<p align="center">
  <img src="./jr2sr/roadmap.png" alt="Jr to Sr Course map" width="100%">
</p>

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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The speed at which a website loads can cost companies billions of dollars if it is too slow to load. We need to be able to make sure our sites preform at the most optimum speed. When you type in a web address in your browser, a **GET** request is made to the server. You would expect that page to load in 2 seconds. If it takes more than 3 seconds, would you leave? The server needs to process that GET request, retrieve the data, and then send it back to the client. You can use the developer console in browsers to see how your page would load at different connection speeds. We can improve upon these things to increase the speed of our page loading.

- 1\. **Frontend client**
- 2\. **Transfer of data**
- 3\. **Backend processing**

<p align="center">
  <img src="./jr2sr/performance.png" alt="performance" width="100%">
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
  <img src="./jr2sr/images.png" alt="which to use images" width="100%">
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
  <img src="./jr2sr/crp.png" alt="critical render path" width="100%">
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
