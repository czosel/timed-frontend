import { expect }       from 'chai'
import { describe, it } from 'mocha'
import { setupTest }    from 'ember-mocha'

describe('Unit | Controller | login', function() {
  setupTest('controller:login', {
    // Specify the other units that are required for this test.
    needs: [ 'service:session', 'service:notify' ]
  })

  // Replace this with your real tests.
  it('exists', function() {
    let controller = this.subject()
    expect(controller).to.be.ok
  })
})
