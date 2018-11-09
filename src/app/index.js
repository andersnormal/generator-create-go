import { resolve, basename } from 'path'
import Choices, { App, Library } from '../sub'
import Generator from 'yeoman-generator'
import proc from 'process'
import SubGeneratorArgs from './args'
import Templates from './templates'
import yosay from 'yosay'
import chalk from 'chalk'

// generator
class GolangGenerator extends Generator {
  constructor(args, options) {
    super(args, options)

    // this allows to directly pass in the name of the application
    this.argument('appname', {
      desc: `The name of the application (e.g. 'hello-world')`,
      type: String,
      optional: true,
      default: basename(proc.cwd())
    })

    this.appName = this.options.appname
  }

  // we use a property, because this is executed first
  get initializing() {
    function hello() {
      // say yo, to any new gopher
      this.log(
        yosay(
          `${chalk.blue(
            'Greetings Gopher!'
          )} Let's get your next project started.`
        )
      )
    }

    return {
      hello
    }
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(resolve(__filename, '../../../templates/app'))
  }

  // prompting the user for inputs
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'app',
        message: `Project Name`,
        default: this.appName,
        store: true
      },
      {
        type: 'list',
        name: 'type',
        message: `Project Type`,
        default: App.value,
        choices: Choices
      },
      {
        type: 'confirm',
        name: 'go11modules',
        message: 'Go11 Modules'
      }
    ])

    const { app, type, go11modules } = answers

    this.appName = app
    this.type = type
    this.go11modules = go11modules
  }

  // just in case
  async configuring() {
    // license
    this.composeWith(require.resolve('../license/index'))

    // basic templates
    this.composeWith(require.resolve('../basic/index'))

    // readme templates
    this.composeWith(
      require.resolve('../readme/index'),
      new SubGeneratorArgs(this)
    )

    // task templates
    this.composeWith(
      require.resolve('../task/index'),
      new SubGeneratorArgs(this)
    )

    // vendor templates
    this.composeWith(
      require.resolve('../vendor/index'),
      new SubGeneratorArgs(this)
    )

    // vscode templates
    this.composeWith(
      require.resolve('../vscode/index'),
      new SubGeneratorArgs(this)
    )

    // ci templates
    this.composeWith(require.resolve('../ci/index'), new SubGeneratorArgs(this))

    // library templates
    if (this.type === Library.value) {
      this.composeWith(
        require.resolve('../library/index'),
        new SubGeneratorArgs(this)
      )
    }
  }

  // writing files
  async writing() {
    // library templates
    if (this.type === App.value) {
      Templates.forEach(tpl => {
        this.fs.copyTpl(
          this.templatePath(tpl.from),
          this.destinationPath(tpl.to),
          this.options
        )
      })
    }
  }

  end() {
    return
  }
}

// exporting generator as CommonJS module
module.exports = GolangGenerator
