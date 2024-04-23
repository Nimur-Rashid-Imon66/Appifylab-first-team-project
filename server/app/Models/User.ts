import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Product from "./Product";
import ProductCategory from "./ProductCategory";
// import ProductCategories from "Database/migrations/1713777689951_product_categories";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public userid: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @hasMany(() => Product, {
    foreignKey: "userid",
  })
  public product_u: HasMany<typeof Product>;

  @hasMany(() => ProductCategory, {
    foreignKey: "userid",
  })
  public category: HasMany<typeof ProductCategory>;

}
