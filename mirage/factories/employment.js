import { Factory, faker, trait } from 'ember-cli-mirage'
import DjangoDurationTransform   from 'timed/transforms/django-duration'
import moment                    from 'moment'

export default Factory.extend({
  percentage: faker.list.random(50, 60, 80, 100),
  // location: association(),
  // user: association(),

  worktimePerDay() {
    let worktime = moment.duration(moment.duration({ h: 8, m: 30 }) / 100 * this.percentage)

    return DjangoDurationTransform.create().serialize(worktime)
  },

  start: () => faker.date.past(4),
  end: () => faker.date.past(1),

  active: trait({
    start: () => faker.date.recent(),
    end: null
  }),

  afterCreate(employment, server) {
    employment.update({ locationId: server.create('location').id })
  }
})
