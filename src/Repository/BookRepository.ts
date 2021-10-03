import { Connection } from 'typeorm';
import { BookEntity } from '../Entities/BookEntity';

export interface IBookRepository{
    AddBooks(bookEntity:BookEntity):Promise<void>
    UpdateBooks(bookEntity:BookEntity):Promise<void>
    GetBooks():Promise<BookEntity[]>;
    FindBook(bookName:string):Promise<BookEntity>;
    RemoveBook(bookId:number):Promise<void>;
}

export class BookRepository implements IBookRepository{
    
    private readonly connection:Connection;

    constructor(connection:Connection){
        this.connection=connection;
    }
    
    
    
    
    public async AddBooks(bookEntity: BookEntity): Promise<void> {
        try
        {
            await this.connection
                        .getRepository(BookEntity)
                        .save(bookEntity);

        }
        catch(ex){
            throw ex;
        }
    }

    public async UpdateBooks(bookEntity: BookEntity): Promise<void> {
        try
        {
            let repository=this.connection.getRepository(BookEntity);

            let bookUpdate= await repository.findOne(bookEntity.BookId);

            if(bookUpdate!==undefined){
                bookUpdate.BookName=bookEntity.BookName;
                bookUpdate.Auther=bookEntity.Auther;
                bookUpdate.Price=bookEntity.Price;
                bookUpdate.Quantity=bookEntity.Quantity;
                bookUpdate.PublishDate=bookEntity.PublishDate;
            }

            await repository.save(bookUpdate!);
                
                    

        }
        catch(ex){
            throw ex;
        }
    }

    public async GetBooks(): Promise<BookEntity[]> {
        try
        {
            let repository=this.connection.getRepository(BookEntity);

            let bookList=await repository
                                .createQueryBuilder("books")
                                .select(['books.BookId','books.BookName', 'books.Auther', 'books.Price'])
                                .getMany();
            return bookList;
        }
        catch(ex)
        {
            throw ex;
        }
    }

    public async FindBook(bookName: string): Promise<BookEntity> {
        try
        {
            let repository=this.connection.getRepository(BookEntity);

            let book=await repository
                                .createQueryBuilder("books")
                                .where("books.BookName=:bookName",{bookName:bookName})
                                .select(['books.BookId','books.BookName', 'books.Auther', 'books.Price'])
                                .getOne();
            return book!;
        }
        catch(ex)
        {
            throw ex;
        }
    }

    public async RemoveBook(bookId: number): Promise<void> {
        try
        {
            let repository=this.connection.getRepository(BookEntity);

            let bookRemove= await repository.findOne(bookId);

            if(bookRemove!==undefined){
                await repository.remove(bookRemove!);
            }
            
                
                    

        }
        catch(ex){
            throw ex;
        }
    }
  


}