# Deploy Sage


**CircleCI**:
develop:[![CircleCI develop branch](https://circleci.com/gh/deploysage/deploysage/tree/develop.png?circle-token=a57eb10766c67764175cabc928a7e4dca1b3538c)](https://circleci.com/gh/deploysage/deploysage/tree/develop)
master:[![CircleCI master branch](https://circleci.com/gh/deploysage/deploysage/tree/master.png?circle-token=a57eb10766c67764175cabc928a7e4dca1b3538c)](https://circleci.com/gh/deploysage/deploysage/tree/master)

**Code Climate**: [![Code Climate](https://codeclimate.com/github/deploysage/deploysage/badges/gpa.svg)](https://codeclimate.com/github/deploysage/deploysage)
[![Test Coverage](https://codeclimate.com/github/deploysage/deploysage/badges/coverage.svg)](https://codeclimate.com/github/deploysage/deploysage/coverage)
[![Issue Count](https://codeclimate.com/github/deploysage/deploysage/badges/issue_count.svg)](https://codeclimate.com/github/deploysage/deploysage)

**[Pivotal Tracker Project](https://www.pivotaltracker.com/n/projects/1477064)**

## Goals

**Since the dawn of computing, humans have asked the question**:
*"What version of the code is where?"*

Some call it [Release Management](https://en.wikipedia.org/wiki/Release_management).

Some call it [Software Deployment](https://en.wikipedia.org/wiki/Software_deployment).

Whatever you call it, and whoever you are - developer, tester, or product owner -
Deploy Sage answers your questions.

Accurately.

Reliably.

Automatically.

*In real time.*

Specifically, it is a single page, live-updating, realtime app which mashes up 
**1)** the Github repo/commits API,
**2)** deployed or released versions of your code repos, and
**3)** integrated external items (e.g. Zendesk, Pivotal Tracker, Github Issues, etc)
to *instantly and automatically provide answers* that are otherwise difficult
or time-consuming to obtain.  E.g., Release Notes with links to fixed
(and partially fixed or in-progress!) bugs and features, and all the commits
which represent them.

More details and documentation to come.  For now, this README only covers technical
setup and hacking details.

## Setup

### Installing/fixing postgres on OSX

```
brew update

brew install postgresql
# or
brew upgrade postgresql

brew info postgresql # follow instructions to run on boot

# DANGEROUS!
rm -rf /usr/local/var/postgres

initdb /usr/local/var/postgres -E utf8
```


### Rails Setup

```
bin/setup # automatically runs `bin/start` at the end
```

### Running Linters/Tests

Running all linters/specs:
```
bin/rake ci
```

Running focused Rails/Capybara specs for TDD:
```
bin/start-spec
bin/spring stop
# Run focused specs from Rubymine, so spring has rubymine libs loaded
```

Hack 'autorunner' (would be better to have karma or mocha autorun, but [that's not easy](https://www.pivotaltracker.com/story/show/110931190):
```
export NODE_PATH=./app && watch -n 5 "clear && node_modules/mocha/bin/mocha --compilers js:babel-core/register --require ./app/libs/test/testHelper.js --require ./app/libs/test/testNullCompiler.js 'app/**/*.spec.@(js|jsx)'"
```

### Running App in Dev Env (with hot reloading)

```
bin/start # make sure you run bin/setup first
```

* Express Dev Server Rendering: [localhost:4000](http://localhost:4000)
  (Note that this is client only, login/logout/oauth and any functionality
  which requires the server is not supported)
  * **NOTE: Redux under Express Dev Server is currently broken since
    ActionCable integration.  See
    https://www.pivotaltracker.com/story/show/114935745**
* Rails Server Rendering: [127.0.0.1:3000](http://127.0.0.1:3000)
  (Note this must use 127.0.0.1 and not localhost, for outh callbacks to work)
* Rails API Server: [localhost:3000/api/v1](http://localhost:3000/api/v1)

### Running App in Simulated Production Env

(Note: Foreman defaults to using port 5000)

```
bin/start-local-prod
```

* App Server: [127.0.0.1:5000](http://127.0.0.1:5000)
* API Server: [localhost:5000/api/v1](http://localhost:5000/api/v1)

Flags for debugging local prod env:

```
SKIP_EAGER_LOAD=true SKIP_CACHE_CLASSES=true bin/start-local-prod
```

### CodeClimate

* https://codeclimate.com/github/deploysage/deploysage
* Install CLI via HomeBrew: https://github.com/codeclimate/codeclimate
* Run CLI analysis: `codeclimate analyze`

### IDE Setup

* Folders to exclude from indexing:
  * .bundle
  * .idea
  * app/assets/javascripts/generated
  * client/node_modules (optional)
  * components
  * coverage
  * log
  * node_modules (optional)
  * public/system
  * tmp
  * vendor/bundle

## Technologies

* [Rails](http://rubyonrails.org)
* [React on Rails](https://github.com/shakacode/react_on_rails)
* [React](https://facebook.github.io/react)
* [Redux](http://redux.js.org/)
* [Webpack](https://webpack.github.io)
* [ActionCable WebSockets](https://github.com/rails/rails/tree/master/actioncable)
* [JSON Web Tokens](http://jwt.io)
* [GitHub API](https://developer.github.com)
* [Clockwork Gem](https://github.com/tomykaira/clockwork)
