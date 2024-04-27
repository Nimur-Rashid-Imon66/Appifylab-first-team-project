import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'loginusers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('userid')
      table.string('email')
     
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
