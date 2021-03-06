/**
 * @module timed
 * @submodule timed-routes
 * @public
 */
import Route   from 'ember-route'
import RSVP    from 'rsvp'
import moment  from 'moment'
import service from 'ember-service/inject'

const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * The index route
 *
 * @class IndexRoute
 * @extends Ember.Route
 * @public
 */
export default Route.extend({
  /**
   * The query params
   *
   * @property {Object} queryParams
   * @property {Object} queryParams.day
   * @public
   */
  queryParams: {
    day: { refreshModel: true }
  },

  /**
   * The session service
   *
   * @property {EmberSimpleAuth.SessionService} session
   * @public
   */
  session: service('session'),

  /**
   * Model hook, return the selected day as moment object
   *
   * @method model
   * @param {Object} params The query params
   * @param {String} params.day The selected day
   * @return {moment} The selected day as moment object
   * @public
   */
  model({ day }) {
    return moment(day, DATE_FORMAT)
  },

  /**
   * After model hook, fetch all activities, attendances and reports of the
   * selected day, toghether with necessary data related to them.
   *
   * @method afterModel
   * @param {moment} model The selected day
   * @return {RSVP.Promise} A promise which resolves after all data is fetched
   * @public
   */
  afterModel(model) {
    let id   = this.get('session.data.authenticated.user_id')
    let day  = model.format(DATE_FORMAT)
    let from = moment(model).subtract(20, 'days').format(DATE_FORMAT)
    let to   = moment(model).add(10, 'days').format(DATE_FORMAT)

    return RSVP.all([
      this.store.query('activity', { include: 'blocks,task,task.project,task.project.customer', day }),
      this.store.query('attendance', { day }),
      this.store.query('report', { include: 'task,task.project,task.project.customer', date: day }),
      this.store.query('report', { 'from_date': from, 'to_date': to }),
      this.store.query('absence', { 'from_date': from, 'to_date': to }),
      this.store.query('user', { id, include: 'employments,employments.location' })
    ])
  }
})
