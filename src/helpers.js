import spawnAsync from '@expo/spawn-async'
import ora from 'ora'
import chalk from 'chalk'
import { exit } from 'process'
import { constants, accessSync } from 'fs'

// eslint-disable-next-line no-console
export const log = console.log

// spinner
const spinner = task => ora(`${task} (this may can take several minutes) ...`)

export async function run(cmd, task, args = [], err = []) {
  // start spinner
  const s = spinner(task).start()

  let result
  try {
    result = await spawnAsync(cmd, args)
  } catch (e) {
    s.fail(err)
    this.env.error(e.stderr)
  }

  s.succeed(`${task}`)

  return result
}

export function fileExists(fullPath) {
  try {
    return !accessSync(fullPath, constants.F_OK)
  } catch (e) {
    return false
  }
}

export const error = msg => {
  log(`${chalk.red('ERROR')}: ${msg}`)
  exit(1)
}
