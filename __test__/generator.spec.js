import helpers from 'yeoman-test'
import path from 'path'

beforeEach(() => {
  jest.resetModules()
  // The object returned act like a promise, so return it to wait until the process is done
})

describe('run generator', () => {
  test('generating', async () => {
    try {
      await helpers
        .run(path.join(__dirname, '../generators/app'))
        .withArguments([])
        .withPrompts({
          appName: 'test',
          name: 'John Doe',
          dep: false,
          task: false,
          yarn: false
        })
    } catch (err) {
      const { context } = err
      expect(context.status).toEqual(1)
    }
  })
})
