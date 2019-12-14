---
title: GIT
date: 12/14/2019
---

<div style="max-width: 86vw">

Git is a version-control system that is used for tracking changes in source code.  It can be used to track changes, coordinate work with others, and test branches before publishing. Git commands are ran from the command line inside of 

<p align="center">
  <img src="git_areas.png">
</p>



## Getting started with Git

To get started with Git, you first need to download it to your computer from here: <br/>[Git Download Page](https://git-scm.com/)

You will also need to create a free GitHub account here: <br/>
[GitHub](https://github.com/)

And then use these to learn how to use Git:<br/>
[Git Explorer](https://gitexplorer.com/)<br/>
[Learn Git Branching](https://learngitbranching.js.org/)<br/>
[Git Cheat Sheet](https://files.jrebel.com/pdf/zt_git_cheat_sheet.pdf)

## Configure Git Information

Configure user information for all local repositories

    $ git config --global user.name "[name]"

Sets the user name you want attached to your commits.
    
    $ git config --global user.email "[email address]"

Sets the email you want attached to your commits.

    $ git config --global color.ui auto

Enables helpful colorization of command line output.

<br/>

## Start a project

Starting a project only needs to be done once, either locally with git init or by cloning an existing repository.

<table>
<tbody>
<tr>
<td>

    $ git init

</td>
<td>

Starts a git repository in an existing directory.

</td>
</tr>
<tr>
<td>
    
    $ git clone [url]

</td>
<td>

Downloads/clones a repository from GitHub.

</td>
</tr>
</tbody>
</table>




</div>