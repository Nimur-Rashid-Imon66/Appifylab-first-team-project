import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public userid: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column()
  public password: string;
}
