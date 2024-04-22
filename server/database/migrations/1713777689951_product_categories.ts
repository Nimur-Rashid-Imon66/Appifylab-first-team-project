//import BaseSchema from "@ioc:Adonis/Lucid/BaseSchema";
import  BaseSchema  from '@ioc:Adonis/Lucid/Schema';

export default class ProductCategories extends BaseSchema {
  protected tableName = "product_categories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("categoryid").primary();
      table
        .integer("userid")
        .unsigned()
        .references("userid")
        .inTable("users")
        .onUpdate("CASCADE");
      table.string("categoryname").notNullable().unique();
      table.string("categorydescription");
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
