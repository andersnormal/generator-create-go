import Generator from 'yeoman-generator'
import Templates from './templates'
import path from 'path'
import Choices, { MIT } from './licenses'

// generator
class CoreGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(path.resolve(__filename, '../../../templates/license'))
  }

  // prompting the user for inputs
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'list',
        name: 'license',
        message: `Project License`,
        default: MIT.value,
        choices: Choices
      }
    ])

    const { license } = answers

    this.license = license
  }

  writing() {
    const { from, to } = Templates[this.license]
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this)
  }

  end() {
    return
  }
}

// exporting generator as CommonJS module
module.exports = CoreGenerator
