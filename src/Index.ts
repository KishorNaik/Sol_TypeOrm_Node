
import "reflect-metadata";
import { Connection } from 'typeorm';
import { DbConnection } from './Repository/DbConnection';
import { BookRepository, IBookRepository } from './Repository/BookRepository';
import { BookEntity } from './Entities/BookEntity';
import { mainModule } from "process";

console.log("Program Running");

async function main():Promise<void>{
    let connection:Connection=await DbConnection();
    
    let bookRepository:IBookRepository=new BookRepository(connection);

        //await bookRepository.AddBooks({ BookName:"Blazor", Auther:"Scott Hunter",Quantity:1,Price:150.00, PublishDate:new Date(2021,1,1)} as BookEntity);

        //await bookRepository.UpdateBooks({BookId:1,BookName:"Asp.net Core"});

        let bookList:BookEntity[]=await bookRepository.GetBooks();
        console.log(bookList);

        let book:BookEntity=await bookRepository.FindBook("Asp.net Core");
        console.log(book);

        await bookRepository.RemoveBook(1);

}

main().then((resolve)=> console.log("Resolve Complete")).catch((error)=> console.log(error));