import { resolve } from 'path'
import Generator from 'yeoman-generator'
import Templates from './templates'

// generator
class GolangLibraryGenerator extends Generator {
  constructor(args, options) {
    super(args, options)

    this.appName = this.options.appname
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(resolve(__filename, '../../../templates/library'))
  }

  // writing our files
  async writing() {
    // parse templates
    Templates.forEach(tpl => {
      this.fs.copyTpl(
        this.templatePath(tpl.from),
        this.destinationPath(tpl.to),
        this
      )
    })

    return
  }

  end() {
    return
  }
}

// exporting generator as CommonJS module
module.exports = GolangLibraryGenerator
