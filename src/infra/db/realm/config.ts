import Realm from 'realm'

const MarcaSchema = {
  name: 'marca',
  properties: {
    id: 'int',
    industria: 'int',
    nome: 'string',
    indexed_id: 'int'
  },
  primaryKey: 'indexed_id'
}

export class RealmDB {
  private static realm: Realm

  static async getInstance(dbName: string): Promise<Realm> {
    if (!this.realm) {
      await Realm.open({
        path: dbName,
        schema: [MarcaSchema]
      })
    }
    return this.realm
  }
}
