/* eslint-env node */
module.exports = {
  'framework': 'mocha+chai',
  'test_page': 'tests/index.html',
  'disable_watching': true,
  'port': 7000,
  'launch_in_dev': [],
  'launch_in_ci': [
    'SL_Chrome_Current',
    'SL_Firefox_Current'
  ],
  'launchers': {
    'SL_IE_11': {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'internet explorer',
        '-v',
        '11',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },
    'SL_Safari_Current': {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'safari',
        '-v',
        '9',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },
    'SL_Chrome_Current': {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'chrome',
        '-v',
        'latest',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },
    'SL_Firefox_Current': {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'firefox',
        '-v',
        'latest',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    }
  }
}
