import Generator from 'yeoman-generator'
import Templates from './templates'
import { resolve } from 'path'

// generator
class CoreGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(resolve(__filename, '../../../templates/readme'))
  }

  writing() {
    Templates.forEach(tpl => {
      this.fs.copyTpl(
        this.templatePath(tpl.from),
        this.destinationPath(tpl.to),
        this.options
      )
    })
  }

  end() {
    return
  }
}

// exporting generator as CommonJS module
module.exports = CoreGenerator
