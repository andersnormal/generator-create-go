[![Taylor Swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Volkswagen](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)
[![Build Status](https://travis-ci.org/andersnormal/generator-create-go.svg?branch=master)](https://travis-ci.org/andersnormal/generator-create-go)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# :speak_no_evil: A No Frills Yeoman Generator for Golang Apps and Libraries

> We are very sorry Gophers, but other names for the generator where taken, so we choose `create-go`.

## Featured

- Boilerplate for apps and libraries
- [task](https://github.com/go-task) as task runner
- [dep](https://github.com/golang/dep) as dependency management tool (also [Go 1.11 Modules](https://github.com/golang/go/wiki/Modules) are supported)
- [VS Code](https://code.visualstudio.com/) as editor support
- [EditorConfig](https://editorconfig.org/)
- [Travis](https://travis-ci.org/)
- Boilerplate files (e.g. `README`, `TODO`)
- ... and opinionated

## Getting Started

First, you have to install `yo`, as to use any [Yeoman](http://yeoman.io/) Generator.

```
npm i -g generator-create-go
```

Create your project in the `$GOPATH`.

```
mkdir $GOPATH/src/<username>/your-new_app && cd $_
```

```
yo create-go <your_app>
```

> you can also omit the app name, it then refers to the current directory

Have fun!

## Development

We can highly recommend to consult the Yeoman Guide to [write your own Yeoman Generator](http://yeoman.io/authoring/). Most importantly, to use the generator locally, you have to `npm link` the generator.

See https://github.com/andersnormal/generator-create-go/tree/master/src for all available sub-generators.

## License

[MIT](/LICENSE)
