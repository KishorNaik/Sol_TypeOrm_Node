import { Connection, createConnection } from "typeorm";


export const DbConnection= ():Promise<Connection>=>{
    try
    {
        // return createConnection({
        //     type:"mssql",
        //     host:"DESKTOP-JM6N8TL",
        //     database:'Book',
        //     entities:[
        //         "../../src/Entities/**/*.ts"
        //     ],
        //     synchronize:true,
        //     extra:{
        //         driver:sqlDriver,
        //         options:{
        //             trustedConnection: true
        //         }
        //     }
        // });

        return createConnection();
    }
    catch(ex)
    {
        throw ex;
    }
}