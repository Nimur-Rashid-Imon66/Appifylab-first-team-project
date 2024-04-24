import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Products extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("prouductid").primary();
      table
        .integer("userid")
        .unsigned()
        .references("userid")
        .inTable("users")
        .notNullable();
      table.string("productname").unique();
      table.string("productdescription");
      table.integer("productprice");
      table.string("productcategory");
      table.string("productstatus");

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
