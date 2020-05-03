---
title: VSCode Setup
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visual Studio Code (aka VS Code) is a code editor for all platforms that is free and open source. There are several decent code editors out there, such as Atom, Sublime, and Notepad++, but VS Code has quickly become the standard for software development. With its cross-platform support, built-in Git source control, integrated terminal, an extensive library of extensions and plugins for nearly every programming language, and so much more, it has pretty much all you need to start writing programs. So, lets get started installing this magical program.<br/><br/>

---

## Installing VS Code

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Head here to [download VS Code](https://code.visualstudio.com/download) and choose your operating system link to get started. Along with VS Code, we are going to need other tools that go with our programming language of choice. I develop mainly in JavaScript and Python, so I will go through the steps of getting those set up. First, we need to make sure we have a stable version of **[Node.JS](https://nodejs.org/en/)**, head to the link and download the LTS version. LTS stands for Long Term Support and is the most stable version, it will also not cause as many conflicts with code bases. If you have previously installed Node, you can run **`node -v`** to check what version you are running. Also, we need to verify that we have **npm** with **`npm -v`**. Because npm updates more frequently than Node, it is good practice to update npm with **`npm install npm@latest -g`** even if you just downloaded Node. Another package that can help with controlling your Node version is **nvm** or Node Version Manager.
On Mac and Linux the install is pretty straightforward with **`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`** for Mac or **`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`**. You can then download and change your node version using **`nvm install xx.xx.xx`** and **`nvm use xx.xx.xx`** where the x's are the node version you wish to download or use. Unfortunately, if you are running Windows the install is a bit more complicated. There is an nvm for Windows, but you must uninstall the current node and npm you are running and then run the installer. Alternatively, you can activate **[WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)**, Windows Subsystem for Linux, and download a Linux Distribution like Ubuntu or others. With WSL, you could then use the **`wget`** command for Linux installation.

---

## ESLint

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you are working with JavaScript, then you are going to want a linter to improve your code. ESLint is one of the best linting utilities and paired with the [Airbnb style guide](https://medium.com/medvine/install-eslint-global-with-airbnb-style-guide-and-use-it-in-vscode-d752dfa40b21). You can install ESLint with the Airbnb config with a single npm command **`npm i eslint eslint-config-airbnb-base eslint-plugin-import -g`**. This installs the package globally. Next, we need to navigate to our user directory to setup the config file. It should be **`/Users/<UserName>`**. Once at the right path, we can **`touch .eslintrc`** to create the file and then type **`code .eslintrc`** to open in VS Code. After opening the file, paste in the following code and save the file:

```javascript
{
  "extends": ["airbnb-base"],
  "env": {
    "node": true,
    "es6": true,
    "browser": true
  },
  "rules": {
    "no-console": "off"
  }
}
```

---

## Extensions

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
