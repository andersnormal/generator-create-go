import yosay from 'yosay'
import proc from 'process'
import path from 'path'
import chalk from 'chalk'
import Generator from 'yeoman-generator'
// import { run } from '../helpers'
import SubGenerator from '../sub'

// load configs
import { init, defaults } from './templates'

// generator
class GolangGenerator extends Generator {
  constructor(args, options) {
    super(args, options)

    // this allows to directly pass in the name of the application
    this.argument('appname', {
      desc: `The name of the application (e.g. 'hello-world')`,
      type: String,
      optional: true,
      default: path.basename(proc.cwd())
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
    this.sourceRoot(path.resolve(__filename, '../../../templates/'))
  }

  // prompting the user for inputs
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'app',
        message: `What is the name of the project?`,
        default: this.appName,
        store: true
      },
      {
        type: 'list',
        name: 'type',
        message: `What is the type of your project?`,
        default: SubGenerator.App,
        choices: [SubGenerator.App, SubGenerator.Library]
      }
    ])

    const { app, type } = answers

    this.appName = app
    this.type = type
  }

  // just in case
  async configuring() {
    // core templates
    this.composeWith(require.resolve('../core/index'))

    // if (this.type === Type.Library) {
    //   this.composeWith(require.resolve('../library/index'))
    // }
  }

  end() {
    return
  }
}

// exporting generator as CommonJS module
module.exports = GolangGenerator
