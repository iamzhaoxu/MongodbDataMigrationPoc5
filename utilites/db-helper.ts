import { Db, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

export class DbHelper {

    public dbConnectionString: string;
    public dbName: string;     
    private static Client: MongoClient;

    constructor(){
        dotenv.config();
        this.dbConnectionString = process.env.DB_CONN_STRING as string;
        this.dbName = process.env.DB_NAME as string;   
    }

    public async getClient(): Promise<MongoClient>{
        if(!DbHelper.Client)
        {
            DbHelper.Client = new MongoClient(this.dbConnectionString);
            await DbHelper.Client.connect(); 
        }
        return DbHelper.Client;
    }

    public async getDB(): Promise<Db>{
      return (await this.getClient()).db(this.dbName);
    }
}