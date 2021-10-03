import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class BookEntity {

    @PrimaryGeneratedColumn()
    BookId?:number;

    @Column("varchar")
    BookName?:string;

    @Column("varchar")
    Auther?:string;

    @Column("int")
    Quantity?:number;

    @Column("float")
    Price?:number;

    @Column("datetime")
    PublishDate?:Date
}