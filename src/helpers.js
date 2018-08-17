import spawnAsync from '@expo/spawn-async'
import ora from 'ora'

// spinner
const spinner = task => ora(`${task} (this may can take several minutes) ...`)

export async function run(cmd, task, args = [], err = []) {
  // start spinner
  const s = spinner(task).start()

  let result
  try {
    result = await spawnAsync(cmd, args)
  } catch (e) {
    console.log(e, result)
    s.fail(err)
    this.env.error(e)
  }

  s.succeed(`${task}`)

  return result
}
