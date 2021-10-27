'use strict'
import { DbHelper } from "./utilites/db-helper"

class MongoDbStore {
  async load (fn: any) {
    let data = null
    try {
      var dbHelper = new DbHelper();
      var db = await dbHelper.getDB();
      data = await db.collection('db_migrations').find().toArray()
      if (data.length !== 1) {
        console.log('Cannot read migrations from database. If this is the first time you run migrations, then this is normal.')
        return fn(null, {})
      }
    } catch (err) {
      throw err
    }
    return fn(null, data[0])
  };

  async save (set: any, fn: any) {
    let result = null
    try {
      var dbHelper = new DbHelper();
      var db = await dbHelper.getDB();
      result = await db.collection('db_migrations')
      .updateOne({}, {
          $set: {
            lastRun: set.lastRun
          },
          $push: {
            migrations: { $each: set.migrations }
          }
        }, { upsert: true })
    } catch (err) {
      throw err
    }

    return fn(null, result)
  }
}


export = MongoDbStore 