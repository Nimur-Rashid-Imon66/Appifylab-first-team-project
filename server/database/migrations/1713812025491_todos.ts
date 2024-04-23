import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('userid').unsigned().references('userid').inTable('users').onDelete('CASCADE');
  
      table.string('title'); 
      table.string('description'); 
      table.string('priority'); 
      table.string('tags'); 
      
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
