[![Taylor Swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Volkswagen](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)
[![Build Status](https://travis-ci.org/katallaxie/generator-go-create.svg?branch=master)](https://travis-ci.org/katallaxie/generator-go-create)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# A Yeoman Golang Generator

> We are very sorry Gophers, but other names for the generator where taken, so we choose `go-lang`. But we have `gocreate` as an alias.

## Getting Started

> We highly recommand to use `nvm` ([NVM](https://github.com/creationix/nvm)) to manage your Node versions, and to use the most recent versions

> if you have [dep](https://github.com/golang/dep) for Go package management installed, the generator provides you with an option for that to initialize

First, you have to install `yo`, as to use any [Yeoman](http://yeoman.io/) Generator. 

```
npm i -g generator-go-lang
```

Create your project in the `$GOPATH`.

```
mkdir $GOPATH/src/<username>/your-new_app && cd $_
```

```
gocreate
```

Have fun!

> You could also `npm i -g yo` and use `yo go-lang`

## Development

We can highly recommend to consult the Yeoman Guide to [write your own Yeoman Generator](http://yeoman.io/authoring/). Most importantly, to use the generator locally, you have to `npm link` the generator.

## License
[MIT](/LICENSE)
