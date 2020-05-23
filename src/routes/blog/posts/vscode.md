---
title: VSCode Setup
---

### Table of Contents

- [Visual Studio Code](#visual-studio-code)
- [Installing VS Code](#installing-vs-code)
- [ESLint](#eslint)
- [Prettier](#prettier)
- [Create React App with ESLint](#create-react-app-with-eslint)
- [Extensions](#extensions)
- [Themes](#themes)
- [Fonts](#fonts)
- [The End](#the-end)

---

**This is also available on Dev.to. Please, go give it some :heart: [VSCode Setup with ESLint and Prettier](https://dev.to/bdesigned/vscode-setup-with-eslint-and-prettier-1gek)!**

## Visual Studio Code

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visual Studio Code (aka VS Code) is a code editor for all platforms that is free and open source. There are several decent code editors out there, such as Atom, Sublime, and Notepad++, but VS Code has quickly become the standard for software development. With its cross-platform support, built-in Git source control, integrated terminal, an extensive library of- [Installing VS Code](#installing-vs-code)
extensions, plugins for nearly every programming language, and so much more, it has everything you need to start writing programs.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I was having some issues with my formatting and decided it was a good time to reset VS Code and do an install from scratch. Here's a great SO post on it: [Remove VS Code Settings](https://stackoverflow.com/questions/36108515/how-to-reset-settings-in-visual-studio-code). To reset everything in VS Code go to **`Users/<UserName>/AppData/Roaming/Code`** and delete the whole folder after VS Code is uninstalled.

---

## Installing VS Code

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Head here to [download VS Code](https://code.visualstudio.com/download) and choose your operating system link to get started. Along with VS Code, we are going to need other tools that go with our programming language of choice. I develop mainly in JavaScript and Python, so I will go through the steps of getting those set up. First, we need to make sure we have a stable version of **[Node.JS](https://nodejs.org/en/)**, head to the link and download the LTS version. LTS stands for Long Term Support and is the most stable version, it will also not cause as many conflicts with code bases. If you have previously installed Node, you can run **`node -v`** to check what version you are running. Also, we need to verify that we have **npm** with **`npm -v`**.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Because npm updates more frequently than Node, it is good practice to update npm with **`npm install npm@latest -g`** even if you just downloaded Node. Another package that can help with controlling your Node version is **nvm** or Node Version Manager. On Mac and Linux the install is pretty straightforward with **`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`** for Mac or **`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`**. You can then download and change your node version using **`nvm install xx.xx.xx`** and **`nvm use xx.xx.xx`** where the x's are the node version you wish to download or use. Unfortunately, if you are running Windows the install is a bit more complicated. There is an nvm for Windows, but you must uninstall the current node and npm you are running and then run the installer. Alternatively, you can activate **[WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)**, Windows Subsystem for Linux, and download a Linux Distribution like Ubuntu or others. With WSL, you could then use the **`wget`** command for Linux installation.

---

## ESLint

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you are working with JavaScript, then you are going to want a linter to improve your code. ESLint is one of the best linting utilities and paired with the [Airbnb style guide](https://medium.com/medvine/install-eslint-global-with-airbnb-style-guide-and-use-it-in-vscode-d752dfa40b21). You can install ESLint with the Airbnb config with a single npm command **`npm i eslint eslint-config-airbnb-base eslint-plugin-import -g`**. If you plan on using React, use this command **`npm install -g eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks`**. This installs the package globally. Next, we need to navigate to our user directory to setup the config file. It should be **`/Users/<UserName>`**. Once at the right path, we can **`touch .eslintrc`** to create the file and then type **`code .eslintrc`** to open in VS Code. After opening the file, paste in the following code and save the file:

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

## Prettier

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prettier is a code formatter. It will parse your code and change it to match its own set of rules. You can do this on save with format on save or by using the shortcut **`Shift + Alt + F`** on Windows or **`Shift + Options+ F`** on Mac or **`Ctrl + Shift + I`** on Linux. Get [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) here or search the extension tab for Prettier in VS Code.

---

## Create React App with ESLint

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You may want to add ESLint and Prettier settings on a per project basis. To start a new React project with ESLint, first we need to start up a new project with **`npx create-react-app eslint-app`**. Then, we need to run the **`npx eslint --init`** command to initiate an eslint config file. When running this, you will get a dialog of questions. Here are the answers I used for my React project.

```
How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? React
? Does your project use TypeScript? No
? Where does your code run? Browser
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
? What format do you want your config file to be in? JSON
Checking peerDependencies of eslint-config-airbnb@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.19.0 eslint-config-airbnb@latest eslint@^5.16.0 || ^6.8.0 eslint-plugin-import@^2.20.1 eslint-plugin-jsx-a11y@^6.2.3 eslint-plugin-react-hooks@^2.5.0 || ^1.7.0
? Would you like to install them now with npm? Yes
```

We also need to install **`npm i prettier eslint-config-prettier eslint-plugin-prettier -D`** to our project. This uses the Prettier ESLint configuration.
If you wish to change any of the default Prettier settings, you can create a **`.prettierrc`** file in the app directory.

```javascript
{
  "singleQuote": true,
  "trailingComma": "none"
}
```

When this is finished, we need to override some Airbnb rules by adding to **`.eslintrc.json`** and update the extends to include Prettier.

```javascript
"extends": [ "airbnb", "prettier" ],
"rules": {"react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}
]}
```

---

## Extensions

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;There are many extensions available for VS Code. You will probably want to add ones for frequently used programming languages and the rest are personal preference. I work in JavaScript, React, Svelte, and Python mostly. These are the all of the extensions I use:

```
code --install-extension aaron-bond.better-comments
code --install-extension ardenivanov.svelte-intellisense
code --install-extension bibhasdn.unique-lines
code --install-extension cbrevik.toggle-format-on-save
code --install-extension cmstead.jsrefactor
code --install-extension CoenraadS.bracket-pair-colorizer-2
code --install-extension dbaeumer.vscode-eslint
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension eamodio.gitlens
code --install-extension esbenp.prettier-vscode
code --install-extension fivethree.vscode-svelte-snippets
code --install-extension formulahendry.auto-rename-tag
code --install-extension ghgofort.neon-vommit
code --install-extension JamesBirtles.svelte-vscode
code --install-extension ms-python.python
code --install-extension ms-vscode-remote.remote-wsl
code --install-extension ms-vsliveshare.vsliveshare
code --install-extension pnp.polacode
code --install-extension ritwickdey.LiveServer
code --install-extension roerohan.mongo-snippets-for-node-js
code --install-extension wix.vscode-import-cost
code --install-extension xabikos.JavaScriptSnippets
```

---

## Themes

<<<<<<< HEAD
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Themes are something that every person has a different opinion on, but it is something that can be important to your development experience. Find a theme that suits you. I prefer darker themes with bright text. Above the one I have installed is Neon Vommit, which describes it accurately :joy:. You can download whatever works best for you and then set the theme to the one you want. You can edit any of the theme colors in settings.json with **`workbench.colorCustomizations`** and **`editor.tokenColorCustomizations`**. Here is the [VS Code theme color settings](https://code.visualstudio.com/api/references/theme-color).
=======
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Themes are something that every person has a different opinion on, but it is something that can be important to your development experience. Find a theme that suits you. I prefer darker themes with bright text. Above the one I have installed is Neon Vommit, which describes it accurately :joy:. You can download whatever works best for you and then set the theme to the one you want. You can edit any of the theme colors in settings.json with **`workbench.colorCustomizations`**. Here is the [VS Code theme color settings](https://code.visualstudio.com/api/references/theme-color). If you want to go a step farther and create your own themes, you can use this command in the command pallet to generate a json file that you can edit.

> > > > > > > e949668a5f9c65ee74a1ce09efdb7c2b2b1ae2d5

```
"workbench.colorCustomizations": {
    "activityBar.background": "#14161a",
    "activityBarBadge.foreground": "#000000"
    },
"editor.tokenColorCustomizations": {
    "[Neon Vommit]": {
        "strings": "#ffffff"
    }
```

To see your current theme settings, you can hit **`ctrl+shift+p`** and type **`Developer: Generate Color Theme From Current Settings`**. This will generate a JSON file of the current theme.

---

## Fonts

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Another feature of VS Code is custom fonts. You can download and install any font to your system. Once installed, you can go into **`settings.json`** and add these lines.

```
"editor.fontFamily": "Font Name",
"editor.fontLigatures": true or false
```

Font family will be whatever font you want to use. [Victor Mono](https://rubjo.github.io/victor-mono/) is my favorite! Ligatures in typography is when 2 or 3 characters are joined together to make them look as if they were one.

![Font Ligatures](https://i.ytimg.com/vi/PRMQ7bFK3L4/maxresdefault.jpg)

---

## The End

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You can now develop with consistent, clean code and the linter will tell you when there are any errors you should correct!
