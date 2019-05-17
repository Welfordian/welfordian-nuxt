'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnalyticsSchema extends Schema {
  up () {
    this.create('post_analytics', (table) => {
      table.increments()
      table.integer('post_id')
      table.integer('reads')
      table.timestamps()
    })
  }

  down () {
    this.drop('post_analytics')
  }
}

module.exports = AnalyticsSchema
