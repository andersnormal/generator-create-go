import Generator from 'yeoman-generator'
import Templates from './templates'
import path from 'path'
import Choices from './ci'

// generator
class GolangCiGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(path.resolve(__filename, '../../../templates/ci'))
  }

  // prompting the user for inputs
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'list',
        name: 'ci',
        message: `Project CI`,
        default: false,
        choices: Choices
      }
    ])

    const { ci } = answers

    this.ci = ci
  }

  writing() {
    Templates[this.ci].forEach(tpl => {
      this.fs.copyTpl(
        this.templatePath(tpl.from),
        this.destinationPath(tpl.to),
        this
      )
    })
  }

  end() {
    return
  }
}

// exporting generator as CommonJS module
module.exports = GolangCiGenerator
