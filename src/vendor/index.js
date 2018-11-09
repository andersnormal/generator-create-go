import { resolve } from 'path'
import chalk from 'chalk'
import Generator from 'yeoman-generator'
import { run, fileExists } from '../helpers'
import Templates from './templates'
import { GO_DEP_MANIFEST } from '../const'

// generator
class GolangVendorGenerator extends Generator {
  constructor(args, options) {
    super(args, options)

    this.appName = this.options.appname
    this.go11modules = this.options.go11modules
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

    return {}
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(resolve(__filename, '../../../templates/vendor'))
  }

  // prompting the user for inputs
  async prompting() {
    if (this.go11modules) {
      // we use the cool new stuff
      return (this.vendor = !!this.go11modules)
    }

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
    const shouldInit = !fileExists(
      resolve(this.destinationRoot(), GO_DEP_MANIFEST)
    )

    // run `go get``
    if (!this.go11modules && this.installDep) {
      await cmd(
        'go',
        `Installing ${chalk.yellow('dep')}`,
        ['get', '-u', '-v', 'github.com/golang/dep/cmd/dep'],
        [`Could not install ${chalk.red('dep')}`]
      )
    }

    // init go `dep`
    if (!this.go11modules && shouldInit) {
      // run `dep init`
      await cmd(
        'dep',
        `Initializing ${chalk.yellow('dep')}`,
        ['init'],
        [`Could not initialize ${chalk.red('dep')}`]
      )
    }

    // it should init go modules
    if (this.options.go11modules) {
      await cmd('go', 'mod', 'init')
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
