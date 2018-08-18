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

  // first priority
  get initializing() {
    // if not `dep` is not available
    const installDep = this.spawnCommandSync('dep', ['--help'], {
      stdio: false
    }).status

    const installCobra =
      !!this.spawnCommandSync('cobra', ['--help'], {
        stdio: false
      }).output !== null

    this.installDep = !installDep
    this.installCobra = installCobra
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

    const answers = await this.prompt(prompts)
    const { vendor } = answers

    this.vendor = vendor
  }

  // just in case
  async configuring() {
    const cmd = run.bind(this)

    // run `go get``
    if (this.installDep) {
      await cmd(
        'go',
        `Installing ${chalk.yellow('dep')}`,
        ['get', '-u', '-v', 'github.com/golang/dep/cmd/dep'],
        [`Could not install ${chalk.red('dep')}`]
      )
    }

    // run `dep init`
    await cmd(
      'dep',
      `Configuring ${chalk.yellow('dep')}`,
      ['init'],
      [`Could not initialize ${chalk.red('dep')}`]
    )
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
