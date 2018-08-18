import yosay from 'yosay'
import proc from 'process'
import path from 'path'
import chalk from 'chalk'
import Generator from 'yeoman-generator'
import { run } from '../helpers'
import Templates from './templates'

// generator
class GolangGenerator extends Generator {
  constructor(args, options) {
    super(args, options)
  }

  // this is the first priority
  get initializing() {
    // if `task` is not available
    const installTask = this.spawnCommandSync('task', ['--help'], {
      stdio: false
    }).status

    this.installTask = !installTask
  }

  // set necessary paths
  paths() {
    // set new source path
    this.sourceRoot(path.resolve(__filename, '../../../templates/task'))
  }

  // just in case
  async configuring() {
    const cmd = run.bind(this)

    // run `go get``
    if (this.installTask) {
      await cmd(
        'go',
        `Installing ${chalk.yellow('task')}`,
        ['get', '-u', '-v', 'github.com/go-task/task/cmd/task'],
        [`Could not install ${chalk.red('task')}`]
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
        this.options
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
