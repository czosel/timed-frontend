/**
 * @module timed
 * @submodule timed-routes
 * @public
 */
import Route   from 'ember-route'
import service from 'ember-service/inject'

/**
 * The me route
 *
 * @class MeRoute
 * @extends Ember.Route
 * @public
 */
export default Route.extend({
  /**
   * The session service
   *
   * @property {EmberSimpleAuth.SessionService} session
   * @public
   */
  session: service('session'),

  /**
   * Model hook, fetch the current user, his employments and his absence credits
   *
   * @method model
   * @return {RSVP.Promise} A promise which resolves into if all data is fetched
   * @public
   */
  model() {
    let id = this.get('session.data.authenticated.user_id')

    return this.store.findRecord('user', id, {
      include: 'employments,absence_credits,absence_credits.absence_type'
    })
  }
})
