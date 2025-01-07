import { PostsModel } from 'src/posts/entities/posts.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { BaseModel } from 'src/common/entity/base.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class UsersModel extends BaseModel {
  @Column({
    length: 20,
    unique: true,
  })
  @IsString()
  @Length(1, 20)
  @Expose()
  nickname: string;

  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  @Expose()
  email: string;

  @Column()
  @IsString()
  @Length(3, 8)
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];
}
