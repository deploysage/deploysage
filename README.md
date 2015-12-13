# DeploySage

[![Code Climate](https://codeclimate.com/github/deploysage/deploysage/badges/gpa.svg)](https://codeclimate.com/github/deploysage/deploysage)
[![Test Coverage](https://codeclimate.com/github/deploysage/deploysage/badges/coverage.svg)](https://codeclimate.com/github/deploysage/deploysage/coverage)
[![Issue Count](https://codeclimate.com/github/deploysage/deploysage/badges/issue_count.svg)](https://codeclimate.com/github/deploysage/deploysage)

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
bin/setup
```

### Running Tests

```
bin/spring rake
```

### CodeClimate

* https://codeclimate.com/github/deploysage/deploysage
* Install CLI via HomeBrew: https://github.com/codeclimate/codeclimate
* Run CLI analysis: `codeclimate analyze`
