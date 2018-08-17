import path from 'path'
import chalk from 'chalk'
import Generator from 'yeoman-generator'
import { run } from '../helpers'
import Templates from './templates'
import { App } from '../sub'

// generator
class GolangVendorGenerator extends Generator {
  constructor(args, options) {
    super(args, options)

    this.appName = this.options.appname
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(path.resolve(__filename, '../../../templates/vendor'))
  }

  // prompting the user for inputs
  async prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'vendor',
        message: `Commit ${chalk.yellow('vendor')}?`,
        default: false,
        store: true
      }
    ]

    // if not `dep` is not available
    const installDep = !!this.spawnCommandSync('dep', ['--help'], {
      stdio: false
    }).status

    // install `task`
    if (installDep) {
      // test `dep` is installed
      prompts.push({
        type: 'confirm',
        name: 'dep',
        message: `Install ${chalk.yellow(`task`)}?`,
        default: true,
        store: true
      })
    }

    // if not `cobra` is not available
    const installCobra =
      this.spawnCommandSync('cobra', ['--help'], {
        stdio: false
      }).output !== null && this.options.type === App.value

    // install `task`
    if (installCobra) {
      // test `dep` is installed
      prompts.push({
        type: 'confirm',
        name: 'dep',
        message: `Install ${chalk.yellow(`cobra`)}?`,
        default: true,
        store: true
      })
    }

    const answers = await this.prompt(prompts)
    const { dep, vendor, cobra } = answers

    this.dep = dep
    this.cobra = cobra
    this.vendor = vendor
  }

  // just in case
  async configuring() {
    const cmd = run.bind(this)

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
module.exports = GolangVendorGenerator
