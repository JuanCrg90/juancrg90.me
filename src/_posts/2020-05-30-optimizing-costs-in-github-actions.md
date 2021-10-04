---
layout: post
title: "Optimizing costs in GitHub Actions"
date: 2020-05-30 00:00:00 -0500
categories: Ruby, Rails, GitHub, Testing
permalink: /posts/optimizing-costs-in-github-actions
---

Recently in [EasyBroker](https://www.easybroker.com/) we decided to migrate our continuous integration system to GitHub Actions.

Our first setup was a workflow with 12 containers considering a good idea to quickly identify errors in our tests.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_e9sjqq.png)

The average time per container was about 6 minutes, while only 2 containers in specific (models and a group of controllers) took about 12 minutes.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%201.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892643/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_1_rbxmvb.png)

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%202.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892643/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_2_oornut.png)

After a week working with this new implementation, we received a message from GitHub warning us about we were near to consume all the minutes of the free tier that they provides  💸💸💸, so we decided to investigate.

First of all, we noticed the 10 containers that took 6 minutes to complete the task, 4 minutes were for setup.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%203.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892643/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_3_ryutfn.png)

Later we found despite we had the cache "configured", our container was downloading the gems over and over again.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%204.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_4_mkohr1.png)

And finally, the tests were taken only between 20 and 50 seconds of the process.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%205.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_5_dhlisu.png)

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%206.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892643/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_6_u1saes.png)

## Saving some minutes

The first change that we did was going from 12 containers to 2. Considering the agent controller tests takes most of the time, we decided to merge the models container with the other 10 containers that were taken between 20 and 50 seconds to complete the tests, ending with a configuration like the following.

Before

```yaml
strategy:
      fail-fast: false
      matrix:
        test_folder: [models, helpers, jobs, lib, mailers, presenters, services, controllers/*.rb, controllers/admin, controllers/agent, controllers/webhooks, controllers/api]
```

Now

```yaml
strategy:
      fail-fast: false
      matrix:
        test_folder: [models helpers test/jobs test/lib test/mailers test/presenters test/services test/controllers/*.rb test/controllers/admin test/controllers/webhooks testcontrollers/api, controllers/agent]

```

The next change was updating the cache setup to make it work, our configuration was using the version 1 of `actions/cache` and we were including the `restore-keys` option, the documentation mentions that this input is [optional](https://github.com/actions/cache#inputs).

```yaml
- name: Gem cache
        uses: actions/cache@v1
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-gems-
```

So I updated to version 2 of the action and I removed the `restore-keys` input considering is not necessary at this moment.

```yaml
- name: Gem cache
        uses: actions/cache@v2
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gem-use-ruby-${{ hashFiles('**/Gemfile.lock') }}
```

In addition to that, reviewing the step where the dependencies are installed, I found that we had it merged with the step to create the database and it showed us a deprecation warning when executing bundle install with the flag to indicate the installation path of the gems.

```yaml
- name: Bundle Install and Create DB
        env:
          RAILS_ENV: test
          DB_PASSWORD: root
          DB_PORT: ${{ job.services.mysql.ports[3306] }}
        run: |
          sudo /etc/init.d/mysql start
          cp config/database.ci.yml config/database.yml
          gem install bundler --version 2.0.2 --no-ri --no-rdoc
          bundle install --jobs 4 --retry 3 --path vendor/bundle
          bin/rails db:setup
```

```bash
[DEPRECATED] The `--path` flag is deprecated because it relies on being remembered across bundler invocations, which bundler will no longer do in future versions. Instead please use `bundle config set path 'vendor/bundle'`, and stop using this flag
```

So I opted to separate it into 2 separate steps and update the way the bundler detects the location of the gems.

```yaml
- name: Bundle install
        run: |
          gem install bundler --version 2.0.2 --no-ri --no-rdoc
          bundle config path vendor/bundle
          bundle install --jobs 4 --retry 3
```

```yaml
- name: Create DB
        env:
          RAILS_ENV: test
          DB_PASSWORD: root
          DB_PORT: ${{ job.services.mysql.ports[3306] }}
        run: |
          sudo /etc/init.d/mysql start
          cp config/database.ci.yml config/database.yml
          bin/rails db:setup
```

With these little tweaks we were able to pass from 4 minutes installing the gems in just 4 seconds.

Before

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%207.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_7_tawvjy.png)

Now

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%208.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_8_dyhwlj.png)

As a final step for this first stage of optimization, I took a look at the steps where we did the installation of some dependencies using `apt-get` and I found that some calls were unnecessary. For example, when we verified the MySQL connection, we were trying to install the client that is already installed in the container and this took about 20 seconds (between verify the installation and perform the connection test). Removing this unnecessary `apt-get` call we were able to down the time to 6 seconds.

Before

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%209.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892645/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_9_odbx1j.png)

Now

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%2010.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_10_s1uik1.png)

## Takeaways

This was the first stage of our update to have a healthy and efficient CI system, after apply these changes we were able to reduce from about 1 hour and 30 minutes per execution.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%2011.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_11_tt7ewa.png)

To only about 20 minutes.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%2012.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_12_kifcvl.png)

The experience of this is, in services where the billing depends on the execution time, saving seconds is crucial, and it is important to pay attention to the little details. Like the `apt-get` dependency installation scenario where the dependencies are already installed in the container. Maybe 13 seconds sounds as nothing relevant, but if you consider the number of builds that you have in your company every day probably you can save 1 or two hours per day and this will be reflected in your billing.

The next step is to try to move the dependencies that require to be installed manually into a Docker container (I still need to investigate if this is possible) and use a tool like [TestProf](https://evilmartians.com/chronicles/testprof-a-good-doctor-for-slow-ruby-tests) to identify the slowest tests and try to optimize them.
