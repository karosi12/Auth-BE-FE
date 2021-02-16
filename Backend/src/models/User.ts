import {Model, Column, Table, CreatedAt, UpdatedAt, Unique, BeforeFind} from "sequelize-typescript";

@Table
export class User extends Model<User> {

  @Column
  fullName!: string;

  @Column
  password!: string;
  
  @Unique
  @Column
  email!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BeforeFind
  static removePasswordField(instance: User) {
    delete instance.password;
  }

}
