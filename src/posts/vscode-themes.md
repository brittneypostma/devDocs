---
title: VSCode Themes
image: ./logos/vscode.svg
---

<div class="post">
<div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Creating a VSCode Theme Extension](#creating-a-vscode-theme-extension)
- [Create Files](#create-files)
- [Edit Colors](#edit-colors)
- [In Progress](#in-progress)
- [Becoming a Publisher](#becoming-a-publisher)

</div>

<div id="main">

## Creating a VSCode Theme Extension

<p align="center">
  <img src="vscode-theme/header.png" alt="vscode theme header" width="100%">
</p>

Color themes are a great part of what makes [Visual Studio Code](https://code.visualstudio.com/), from here on VSCode, awesome. I love changing my colors ever so often, just to get a new look and feel when I code. Creating your own VSCode theme can be a learning experience, so I wanted to write this post on my journey in creating my first theme. From editing a theme to publishing on the marketplace, I want to take you step by step through the process. Let's get started!

## Create Files

<br/>
To begin, we need to create a directory to hold our theme files.

<br/>

```bash
mkdir theme-name
```

There are only 2 required components of a color theme in VSCode, a `package.json` file and a theme file in `json` format. A `readme` file and a logo is always a nice addition, so we will be creating those as well. Let's create the required files. Either use the terminal or the integrated VSCode options to create the following files and folders, `npm init -y` to create the `package.json`, themes folder, `themes/theme-name`, images folder. Here are the commands in order.

```bash
npm init -y
mkdir themes
touch themes/theme-name
mkdir images
```

<br/>

For our `package.json` file, there are some required fields for the VSCode extension. After running the `npm init -y`, we should have a file that looks similar to the one below.

<p align="center">
  <img src="vscode-theme/json1.png" alt="package.json file starter" width="100%">
</p>

These fields can be modified to fit your theme. Now, we can start working on our theme. VSCode uses a `settings.json` file to edit your workspace. To see the colors as you add them, I edited my  `settings.json` and then added to my `theme/theme-name.json` to ensure they were the correct colors. In VSCode, open `settings.json` by clicking `CTRL+SHIFT+P` in Windows, or `CMD+SHIFT+P` in Mac and then type `settings.json` in the box that pops up. This will open the file.

<br/>

## Edit Colors

You may already have things inside your `settings.json`, but the areas we need to edit are under `"workbench.colorCustomizations"` and `"editor.tokenColorCustomizations": {"textMateRules":[]}`. To ease the confusion of adding these **scopes**, VSCodes term for the rules used, I created a color pallette and then added a "name" field to all of my `"textMateRules"` that says the color or what the rule is setting. Below is a sample of my `settings.json`.

```js
"workbench.colorCustomizations": {
    "activityBar.background": "#08131a",
    "activityBar.border": "#008c9644",
    "activityBar.foreground": "#008c96",
    "activityBarBadge.background": "#08131a",
    "activityBarBadge.foreground": "#008c96"
},
"editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "name": "Italic",
        "scope": [
          "comment",
        ],
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "name": "Gray",
        "scope": ["comment"],
        "settings": {
          "foreground": "#4b6869"
        }
      },
    ]
}
```

I separated the italic and the colors into individual scopes to keep them apart in case I want to change or remove something, I only need to go to that place. After, figuring out a color pallette, you can add a **scope** with a `"name"` field for each color. To add rules to each of these scopes, we need to figure out what VSCode calls what we want to color. I used the built in **Developer: Inspect Editor Tokens and Scopes** to figure out what each individual item was called. You can find it with the Command Pallette again by searching for the **developer inspect editor** and it should come up with a box that looks similar to the ones below.

<p align="center">
  <img src="vscode-theme/search.png" alt="Command pallette in VSCode" width="100%">
</p>
<p align="center">
  <img src="vscode-theme/inspect.png" alt="inspect editor in VSCode" width="100%">
</p>

On the left side of the bottom image, you can see textmate scopes and on the right are the scopes that fit the currently selected item. The image has the **function** in JavaScript selected. You will use those scopes to add to a color inside your `settings.json`. Usually these are very specific to the language, but just using the base should work in most cases. Here is an example:

```js
"editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "name": "Dark Teal",
        "scope": [
          "storage.type"
        ],
        "settings": {
          "foreground": "#01779b"
        }
      }
    ]
}
```

Now you can go through each thing you want to colorize and add a scope for that item to the correct color. Once it is where you like it, we can copy the rules over into our `theme.json` file. Everything inside `"workbench.colorCustomizations": { ...copyEverythingHere }` and inside `"textMateRules": [ ...copyEverythingHere ]` need to be copied over to the `theme.json` file like this:

```js
{
  "name": "Deep Water",
  "type": "dark",
  "colors": {
    ...pasteAll workbench.colorCustomizations here
  },
  "tokenColors": [
      ... pasteAll textMateRules here
  ]
}
```

## In Progress

After this is done, the theme is technically ready to publish. But, if you want it to look nice, you can add an icon and a readme file. Create an icon and place it in an images folder.


<br/>

## Becoming a Publisher

There are additional fields needed for the VSCode extension inside the `package.json` file, these are `publisher`, `engines`, `categories`, and ``contributes`, a `displayName` field is also nice. After editing the initial `package.json`, let's add the required fields in.

```js
{
  "publisher": "bDesigned",
  "engines": {
    "vscode": "^1.0.0"
  },
  "categories": [
    "Themes"
  ],
  "contributes": {
    "themes": [
      {
        "label": "test-theme",
        "uiTheme": "vs-dark",
        "path": "./themes/theme-name.json"
      }
    ]
  },
  "displayName": "Theme Name"
```

The `publisher` field is the username used on the VSCode marketplace. You can create this account by going to [dev.azure.com/vscode](https://dev.azure.com/vscode). Once it is created, we need to get a personal access token. This is a detailed process to get right, so make sure to follow all the directions in the images below. Things to note, in **Organization**, make sure to select **All accessible organizations**. Then, to open the Marketplace option, click on **Custom defined** and **show all scopes**. You can then find the **Marketplace** and click all the check boxes (**read**, **acquire**, **publish**, and **manage**). Once all of this is done, click **Create** and make sure to **save your access token** somewhere as Azure does not save it on their end. Also, copy the access token to the clipboard, because we will use it in the next step.

<p align="center">
  <img src="vscode-theme/token1.png" alt="Azure access token images" width="100%">
</p>
<p align="center">
  <img src="vscode-theme/token2.png" alt="Azure access token images" width="100%">
</p>
<p align="center">Azure 
  <img src="vscode-theme/token3.png" alt="access token images" width="100%">
</p>
<p align="center">
  <img src="vscode-theme/token4.png" alt="Azure access token images" width="100%">
</p>

Now that we have an Azure account set up to publish on the Marketplace, we can install the `vsce` package and login.

</div>