---
title: GIT
date: 12/14/2019
---

<div style="max-width: 86vw">

Git is a version-control system that is used for tracking changes in source code.  It can be used to track changes, coordinate work with others, and test branches before publishing. Git commands are ran from the command line inside of 

<p align="center">
  <img src="git_areas.png" alt="git areas">
</p>

## Getting started with Git

To get started with Git, you first need to download it to your computer from here: <br/>[Git Download Page](https://git-scm.com/)

You will also need to create a free GitHub account here: <br/>
[GitHub](https://github.com/)

And then use these to learn how to use Git:<br/>
[Git Explorer](https://gitexplorer.com/)<br/>
[Learn Git Branching](https://learngitbranching.js.org/)<br/>
[Git Cheat Sheet](https://files.jrebel.com/pdf/zt_git_cheat_sheet.pdf)

<p align="center">
    <img src="gitcheatsheet.png" alt="git cheat sheet" width="100%">
</p>

## Configure Git Information

Configure user information for all local repositories

    $ git config --global user.name "[name]"

&#x2010; Sets the user name you want attached to your commits.
    
    $ git config --global user.email "[email address]"

&#x2010; Sets the email you want attached to your commits.

    $ git config --global color.ui auto

&#x2010; Enables helpful colorization of command line output.

    $ git command --help

&#x2010; Outputs a list of git commands.

<br/>

## Create a Repository

Starting a project only needs to be done once, either locally with git init or by cloning an existing repository.

    $ git init

&#x2010; Starts a git repository in an existing directory.
    
    $ git clone [url]

&#x2010; Downloads/clones a repository from GitHub.

<br/>

## Ignore File

If a specific file or file types should not be added to a git repository, a file named .gitignore tracks files that should be ignored.

    $ touch .gitignore

Some helpful templates and common .gitignore files can be found here: 
[Git Ignore Templates](https://github.com/github/gitignore)

<br/>

## Working with Branches

Branches are a way to separate your main code base from the code you are working on new content in.  You can "check out" a branch to switch over and avoid pushing untested code into publication.  Master is the main branch that is started on.  Use *git status* to see what branch you are currently using.

    $ git status

&#x2010; Check to see which branch you are currently on.

    $ git branch [branch-name]

&#x2010; Creates a new branch.

    $ git checkout [branch-name]

&#x2010; Switches to a different branch.

    $ git checkout -b [branch-name]

&#x2010; Combines *git branch* and *git checkout* into one command. It creates a new branch and switches to it.

    $ git merge [branch-name]

&#x2010; Combines the named branch history into your current working branch.  Usually done in pull requests.

    $ git branch -d [branch-name]

&#x2010; Deletes the named branch.

<br/>

## Make a change

Add and commit any changes you have made to the local repositiory before you push to the remote one.

    $ git add [file]

&#x2010; Stages a single file and is ready to be commited.

    $ git add .

&#x2010; Stages all changed files and is ready to be commited.

    $ git commit -m "commit message"

&#x2010; Commits all staged files with a message about changes made.

    $ git reset [file]

&#x2010; Unstages a single file, but keeps changes made to the file.

    $ git reset --hard

&#x2010; Revert everything to the last commit.

<br/>

## Sync changes

To make sure your local copy is the same as the remote repository, it is important to remember to synchronize your files with these commands.

    $ git fetch

&#x2010; Downloads all of the branch history and updates, but your local copies stay the same. Does not merge like git pull.

    $ git merge

&#x2010; Combines remote tracking branch into current local branch.

    $ git pull

&#x2010; Downloads and updates your local copy with all new commits from the remote branch.  It is a combination of git fetch and git merge.

    $ git push

&#x2010; Uploads all current local changes added and commited to the GitHub repository.

    $ git push origin [branch-name]

&#x2010; The origin represents a remote name where you want to push changes

<br/>



</div>