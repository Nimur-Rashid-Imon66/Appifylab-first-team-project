import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Product extends BaseModel {
@column({ isPrimary: true })
public prouductid: number

@column()
public userid : number 

@column()
public productname : string 

@column()
public productdescription : string 

@column()
public productprice : number 

@column()
public productcategory : string 

@column()
public productstatus : string 

@column.dateTime({ autoCreate: true })
public createdAt: DateTime

@column.dateTime({ autoCreate: true, autoUpdate: true })
public updatedAt: DateTime
  
  
@belongsTo(() => User,
    {
      foreignKey: 'userid'
  })
public user: BelongsTo<typeof User>
  
  
}
