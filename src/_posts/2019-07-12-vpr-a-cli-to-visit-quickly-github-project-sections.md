---
layout: post
title: "vpr a CLI to visit quickly GitHub project sections"
date: 2019-07-12 12:00:00 -0500
categories: Ruby, CLI, rubygems, GitHub
permalink: /essays/vpr-a-cli-to-visit-quickly-github-project-sections
---

## Motivation

Most part of my workday I'm in the console, I use vim to edit files and run
different tasks in tmux panes. One of the things that make me left the console
and go to the browser is when I'm getting context on a new task.
To get the context, I usually visit the pull request where the logic related was added
using `git blame` to get the commit of my interest and pasting it in the GitHub repository
to find the pull request(s) where the commit was included. This is a repetitive task that
I perform again and again. Trying to improve my development workflow, I have created
[vpr](https://rubygems.org/gems/vpr), a  cross-platform command-line interface that
allows to visit quickly a specific section of the GitHub project using a short CLI
command.

## Why vpr?

My original idea was to create a CLI that receives the commit of my interest and this
action would redirect me to the GitHub search section to **v**iew the **p**ull **r**equest,
but after some iterations, I decided to map the most common GitHub sections in the CLI.

## How to use vpr

I have implemented the CLI using [Thor](https://github.com/erikhuda/thor) gem that allows
creating Ruby CLIs easily.

You can install the gem running

```
$ gem install vpr
```

This version 1.0.0 contains the following commands aiming to create an intuitive interface

```bash
Commands:
  vpr branch          # visit the current branch in github
  vpr branches        # visit the project branches page in github
  vpr help [COMMAND]  # Describe available commands or one specific command
  vpr home            # visit the project page in github
  vpr issues          # visit the project issues page in github
  vpr pull            # visit the pull request for the current branch (if exist) in github
  vpr pulls           # visit the project pull requests page in github
  vpr search COMMIT   # search the commit in github
  vpr visit COMMIT    # visit the commit in github
```

For example, you can quickly access to the project Homepage using `vpr home`

![vpr home](https://res.cloudinary.com/juancrg90/image/upload/v1562969660/vpr/vpr_home.gif)

If you want to contribute to this project please visit the [Github page](https://github.com/JuanCrg90/vpr)
