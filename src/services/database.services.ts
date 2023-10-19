//FTt851LtqwBb5Cuj
import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'
config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kl3idjz.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  register(arg0: { email: any; password: any }) {
    throw new Error('Method not implemented.')
  }
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async conect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_COLECTION_USERS as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
