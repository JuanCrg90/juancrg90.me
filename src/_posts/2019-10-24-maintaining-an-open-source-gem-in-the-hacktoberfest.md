---
layout: post
title: "Maintaining an open source gem in the Hacktoberfest"
date: 2019-10-24 00:00:00 -0500
categories: Ruby, community, hacktoberfest, opensource
permalink: /essays/maintaining-an-open-source-gem-in-the-hacktoberfest
---


Originally Published in [dev.to](https://dev.to/juancrg90/maintaining-an-open-source-gem-in-the-hacktoberfest-5hh)


Some months ago I created a little gem to quickly access to different GitHub sections from the command line. The name of my gem is [vpr](https://github.com/JuanCrg90/vpr) (view pull request).

The idea of this gem is simple, you call the `vpr` command + some instruction + a commit SHA and you can access to a Github section of your interest. For example, `vpr visit 123abc` sends you to the commit page of the selected commit.

![vpr visit command](https://res.cloudinary.com/juancrg90/image/upload/v1562970485/vpr/vpr_visit.gif)

In this Hacktoberfests I decided to open some issues to add the support for bitbucket pages. It was incredible the speed that the users started to contribute and recommend things for the project, like @andrewmcodes who added a GitHub action to run [standardRB](https://github.com/testdouble/standardrb) in the pull requests.  [github](https://github.com/JuanCrg90/vpr/issues/12)


 Even if this is a simple side project, I'm happy to have had the opportunity to be a maintainer this year. I hope the next year have the opportunity to host a contribution fest in my city.

All these contributions will be released to [RubyGems](https://rubygems.org) in November, thanks to all the participants for your support. If you are interested in know more about vpr, please visit the Github repository.  [github](https://github.com/JuanCrg90/vpr)
