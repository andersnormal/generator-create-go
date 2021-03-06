import Generator from 'yeoman-generator'
import Templates from './templates'
import { resolve } from 'path'
import Choices from './ci'

// generator
class GolangCiGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(resolve(__filename, '../../../templates/ci'))
  }

  // prompting the user for inputs
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'checkbox',
        name: 'ci',
        message: `Project CI`,
        default: false,
        choices: Choices
      }
    ])

    // extract anwsers
    const { ci } = answers

    // map
    this.ci = ci
  }

  async writing() {
    this.ci.forEach(ci => {
      Templates[ci].forEach(tpl => {
        this.fs.copyTpl(
          this.templatePath(tpl.from),
          this.destinationPath(tpl.to),
          this
        )
      })
    })
  }

  end() {
    return
  }
}

// exporting generator as CommonJS module
module.exports = GolangCiGenerator
