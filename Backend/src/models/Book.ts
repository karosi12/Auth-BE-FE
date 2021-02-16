import {Model, Column, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, AllowNull} from "sequelize-typescript";
import {User} from "./User";

@Table
export class Book extends Model<Book> {

  @Column
  title!: string;

  @Column
  description!: string;

  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @BelongsTo(() => User)
  author!: User;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
