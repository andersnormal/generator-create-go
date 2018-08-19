import helpers from 'yeoman-test'
import path from 'path'

beforeEach(() => {
  jest.resetModules()
  // The object returned act like a promise, so return it to wait until the process is done
})

describe('run generator', () => {
  test('generating App', async () => {
    try {
      await helpers
        .run(path.join(__dirname, '../generators/vscode'))
        .withArguments([])
        .withOptions({
          type: 'LIBRARY'
        })
        .withPrompts({})
    } catch (err) {
      const { context } = err
      expect(context.status).toEqual(1)
    }
  })
})
