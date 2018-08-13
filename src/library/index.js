import yosay from 'yosay'
import proc from 'process'
import path from 'path'
import chalk from 'chalk'
import Generator from 'yeoman-generator'
import { run } from '../helpers'

// load configs
// import { init, defaults } from './templates'

// generator
class GolangGenerator extends Generator {
  constructor(args, options) {
    super(args, options)

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
  prompting() {
    const cb = this.async()

    const prompts = [
      {
        type: 'input',
        name: 'app',
        message: `What is the name of your new app?`,
        default: this.appName,
        store: true
      },
      {
        type: 'confirm',
        name: 'vendor',
        message: `Would you like to commit ${chalk.yellow('vendor')}?`,
        default: true,
        store: true
      }
    ]

    // if `task` is not available
    if (
      !this.spawnCommandSync('task', ['--help'], {
        stdio: false
      }).status
    ) {
      // test `dep` is installed
      prompts.push({
        type: 'confirm',
        name: 'task',
        message: `Install ${chalk.yellow(`task`)} command (required)?`,
        default: true,
        store: true
      })
    }

    // if `dep` is available
    if (
      !!this.spawnCommandSync('dep', ['--help'], {
        stdio: false
      }).status
    ) {
      // test `dep` is installed
      prompts.push({
        type: 'confirm',
        name: 'dep',
        message: `Would you like to run ${chalk.yellow(`dep init`)}?`,
        default: true,
        store: true
      })
    }

    // if `cobra` is available
    if (
      this.spawnCommandSync('cobra', ['--help'], {
        stdio: false
      }).output !== null
    ) {
      // test `dep` is installed
      prompts.push({
        type: 'confirm',
        name: 'cobra',
        message: `Would you like to run ${chalk.yellow(`cobra init`)}?`,
        default: false,
        store: true
      })
    }

    return this.prompt(prompts).then(({ app, dep, task, vendor, cobra }) => {
      this.appName = app
      this.dep = dep
      this.task = task
      this.vendor = vendor
      this.cobra = cobra
      cb()
    })
  }

  // just in case
  async configuring() {
    const cmd = run.bind(this)

    // run `go get``
    if (this.task) {
      await cmd(
        'go',
        `Installing ${chalk.yellow('task')}`,
        ['get', '-u', '-v', 'github.com/go-task/task/cmd/task'],
        [`Could not install ${chalk.red('task')}`]
      )
    }

    // run `cobra init`
    if (this.cobra) {
      await cmd(
        'cobra',
        `Configuring ${chalk.yellow('cobra')}`,
        ['init', '-l', 'MIT'],
        [`Could not initialize ${chalk.red('cobra')}`]
      )
    }

    // run `dep init`
    if (this.dep) {
      await cmd(
        'dep',
        `Configuring ${chalk.yellow('dep')}`,
        ['init'],
        [`Could not initialize ${chalk.red('dep')}`]
      )
    }
  }

  // writing our files
  async writing() {
    // templates
    const templates = init

    if (this.cobra === false) {
      templates.push(...defaults)
    }

    // parse templates
    templates.forEach(template => {
      this.fs.copyTpl(
        this.templatePath(template.from),
        this.destinationPath(template.to),
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
module.exports = GolangGenerator
