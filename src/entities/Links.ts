import { ObjectType, Field, Int } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class LinkSchema extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;

  @Field(() => String)
  @Column()
  completeLink!: string;

  @Field(() => String)
  @Column({ unique: true })
  shortLink!: string;

  @Field(() => Int)
  @Column()
  views: number;

  // @Field()
  // @Column({ nullable: true })
  // creatorID!: number;
}
