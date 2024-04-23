import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Todo from "./Todo";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public userid: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @hasMany(() => Todo,{
    foreignKey:'userid'
  })
  public todos: HasMany<typeof Todo>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
}
