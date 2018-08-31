import Choices from './licenses'
import Generator from 'yeoman-generator'
import { resolve } from 'path'
import Templates from './templates'

// generator
class CoreGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(resolve(__filename, '../../../templates/license'))
  }

  // prompting the user for inputs
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'list',
        name: 'license',
        message: `Project License`,
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
