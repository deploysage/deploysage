# <img src="https://cdn.rawgit.com/deploysage/deploysage/master/deploysage.svg" height="100"> Deploy Sage

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

And in modern software development, with
[Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery),
[Platform as a Service](https://en.wikipedia.org/wiki/Platform_as_a_service),
[Blue-green Deployment](http://martinfowler.com/bliki/BlueGreenDeployment.html),
and [Feature toggles](https://en.wikipedia.org/wiki/Feature_toggle),
this question is becoming harder and harder to answer efficiently
and accurately.

Whatever you call it, and whoever you are - developer, tester,
product owner, program manager, operations -
Deploy Sage helps answer your questions.

Accurately.

Reliably.

Automatically.

*In real time.*

Specifically, it is a single page, live-updating, realtime app (and API) which mashes up: 

1. the **Github repo/commits API**,
2. information on **deployed, released, or published versions of your code repos**, and
3. **integrated external items** (e.g. Zendesk, Pivotal Tracker, Github Issues, etc)

...to *instantly and automatically provide answers* that are otherwise difficult
or time-consuming to obtain.

And "information on deployed, released, or published versions"
doesn't just mean web or mobile apps - it can mean **any packaging
of a product, even a packaged release published for
download on a web page**, and even if it consists of code from
multiple git repos.

All data will also be exposed via API, so it can be integrated into
external systems, and allow them to incorporate the same relevant real-time info.

For example, Deploy Sage might be used by these following roles (and of course
the same person often wears several of these hats):
* An **automated system** can integrate with the API, and automatically
  change the status and tags/labels of bugs/features based on the state
  of the git repo, and whether or not all commits for a given bug/feature
  are on a given branch/tag.  *This includes automatically rejecting
  delivered features if additional new commits are made on a feature branch*
* A **developer** can see a list of links to all commits on all branches/Pull Requests
  which are related to an in-progress bug or feature, in order to have context on what
  progress has been made so far, or to find out if it potentially conflicts
  with a new feature she may be starting.
* A **tester** can see a list of all completed and test-able features,
  all the environments to which they are deployed and testable,
  and to drill down to commit messages and links to code in order to get
  an idea of what parts of the code were touched.
* A **product owner** can see what bugs/features in the next release are
  completed, and which ones are incomplete, and drill down to see all
  information on the status and reasons for the incomplete ones.
* A **program manager** can see rollups of release status
  across multiple products and repositories, based on *real-time data
  at the git commit level*
* An **operations engineer or manager** can see what versions of the
  product are currently deployed/released/running in "production" or
  other environments, and also see whether or not specific commits
  (e.g. CVE security fixes) are included in those environments.

And, finally, this very cool feature: Deploy Sage has support for handling
rebased branches, and tracking a single unchanged commit across rebases, *even though
the SHA of the commit has changed due to being rebased*.  See the Architecture section for
more details on how this is done.

More details and documentation to come.  For now, the remainder of this
README only covers high-level architecture, technical setup and hacking details.

## Architecture

### Mechanisms
* **Associating commits**:
  * The association between commits and external systems' bugs/features
    is normally done by putting a "tag" in the commit message, e.g.
    `[#123] Fix bug with id 123`.
  * In order to support integration with multiple external systems, each
    with their own unique ID space and format, you can specify custom
    regular expressions which are used to extract the IDs from commit messages,
    and use them to associate the commit with the proper bug/feature ID
    in the proper external system.
* **Detecting deployed/released/published versions**
  * The general mechanism for determining "what version" of the code is
    deployed where is to provide a single Git SHA.  This is all that is
    needed to completely determine the history of every previous commit,
    all the way back to the first commit in the repo (e.g. that's exactly
    how `git log works`
  * So, all that is needed is a way to associate a deploy/release/published version
    with a single git commit on a repo (or a commit-per-repo, if it incorporates
    code from multiple repos).  Then, all historical commits, and all their
    associated external items, can be determined and queried - as well as
    querying if there are any commits for a given external item that **are not**
    included in that history (e.g. something that is still on an unmerged branch).
  * Depending on how your code is deployed/released/published, they can be
    associated with a git SHA(s) multiple ways:
    1. **Web App**: Display the currently-deployed git SHA on a
       status page (possibly a dedicated "hidden" unlinked one).  Then, provide
       Deploy Sage with the URL to that page, and a regex with which to extract
       the SHA.
    2. **Mobile App**: Include the git SHA in the release notes on the app store
       or beta-version deployment info page, and use the same URL+regex mechanism
       as for Web App above to extract the SHA.
    3. **Apps packaged for download**: Like web and mobile apps, simply include the
       git SHA(s) from which the package was built, and provide a URL
       and regex which allows the SHA to be extracted from the download page.
    4. **Via API**: If none of the above mechanisms work, then an API endpoint
       is provided to create a new association between a deployed version of code
       and a git commit SHA.
    5. **Cloud Environments**: Using the API, operators running a PaaS
       could hook into the infrastructure at a desired point, to associate
       git SHA associations automatically when an app instance is
       provisioned/spun up, even if the app version is not yet publicly accessible.

### Wiring

* Getting access to historical git(hub) commit message data, in real time,
  has by far been the most architecturally challenging aspect.  Deploy Sage
  is actually the result of learning from multiple failed prior spikes.
  The reasons it is hard are:
  1. Github's API **does not** allow searching by commit message.  They
     used to, but no longer do.
  2. You cannot rely on `git log`, because
     a. That requires cloning the entire repo to the local server, which
        has performance/scalability concerns
     b. It raises security concerns by having users' entire codebase and
        intellectual property copied to servers.  I know other products
        do this, but not this one.
  3. Even if you did clone the entire git repo locally to servers, this
     presents challenges to running the app in a PaaS environment, because
     you cannot rely on persistent, constantly available, performant filesystems.
     It is possible, e.g. with Amazon Elastic Block Storage, but
     given the current state of PaaS/Cloud deployment, it is much simpler
     to manage an app that relies on only a database for persistence, not
     a filesystem.
  4. Git is a complex graph database, especially when you consider traversing
     commit history which can include branches, merges, rebases, etc.
     a. Representing the entire commit history
        of a git repo in a relational database in a way that is
        queryable and traversable is impossible to do in any simple way.
     b. Yes, there are graph databases that could be used, but they are esoteric
        and don't have nearly the level of tool and library support as
        relational databases (e.g. ActiveRecord's sophisticated callback
        support, which is heavily leveraged for the client/server communication
        protocol).

* So, the workaround for this is to *duplicate* the commit history for each
  branch/ref. **But** - in an optimized way that only duplicates the
  difficult graph-database parent-commit info needed to traverse
  branches, merges, rebases, etc.  Which, is very lightweight - nothing
  but join relationships between parent commits.
  All other commit metadata (message, author, commiter, etc) is not
  duplicated, but only stored once.  And this works great, because git commits
  have a natural unique key (the SHA), and are immutable.

* **Handling rebases**: Another architecturally challenging problem is how
  to track commits on rebased branches, especially when branches
  may be deployed, then subsequently rebased.
  * For example, say you make a commit
    on a branch and associate it with a bug or feature.  Then, you rebase
    your branch onto the upstream branch, with no conflicts or changes
    needed to the commit.  Now, the commit has a new SHA, *even though
    it still contains the identical code and commit metadata*.
  * Using commonly-known git tools, there's no way to know that this
    is actually the *same commit*.  You could rely on `git diff`, but that
    would require access to a local copy of the repo, which we don't have.
  * The solution is to use [git-patch-id](https://www.kernel.org/pub/software/scm/git/docs/git-patch-id.html),
    which was designed for this purpose.  If the database stores the patch ID
    associated with every commit, then it's simple to use SQL to find
    duplicate or "orphaned" commits, and "roll them up" into a single "logical"
    commit.
  * This association allows drilling down from a previously-deployed
    commit and finding the "current" version of it (and all branches on which
    it occurs), even if that commit's SHA no longer exists in a reachable state on any branch.
  * It also allows the potential to amend commit messages to include new/additional
    external item IDs, yet still maintain associations to the previous
    versions which contain the same code.

* **A note on "git-notes"**: At first glance, this seems like a great
  way to associate external item IDs with git commits, without having to
  rely on putting the IDs in the (immutable) commit message.  However,
  in practice, "git-notes" are difficult to understand and use, and
  don't seem to be very well thought-out or documented.  Primarily
  because they are not preserved across cherry-picks/rebases, etc,
  without lots of careful effort and knowledge.

