import path from 'path'
import chalk from 'chalk'
import Generator from 'yeoman-generator'
import Templates from './templates'

// generator
class GolangVSCodeGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(path.resolve(__filename, '../../../templates/vscode'))
  }

  // writing our files
  async writing() {
    // parse templates
    Templates.forEach(tpl => {
      this.fs.copyTpl(
        this.templatePath(tpl.from),
        this.destinationPath(tpl.to),
        this.options
      )
    })

    return
  }

  end() {
    return
  }
}

// exporting generator as CommonJS module
module.exports = GolangVSCodeGenerator
