'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Photo extends Model {
  
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
  
}

module.exports = Photo
