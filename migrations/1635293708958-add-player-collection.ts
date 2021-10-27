import { DbHelper } from './../utilites/db-helper';
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
var dbHelper = new DbHelper();

export async function up (next: any) {
  console.log("--------Start adding player collection.---------");
  var db = await dbHelper.getDB();
  await db.createCollection("Player");
  console.log("--------Adding player collection done.---------");
  next()
}

export async function down (next: any) {
  console.log("--------Start deleting player collection.---------");
  var db = await dbHelper.getDB();
  await db.dropCollection("Player");
  console.log("--------Deleting player collection done.---------");
  next()
}
