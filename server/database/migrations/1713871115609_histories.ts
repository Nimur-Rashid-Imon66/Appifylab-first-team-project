import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id')
      table.string('description')
      table.string('type')
      table.double('amount')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
