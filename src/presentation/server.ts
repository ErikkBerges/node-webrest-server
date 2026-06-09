import express, { Router } from 'express';
import path from 'path';

interface Options{
    routes: Router;
    port:number;
    public_path?:string;
}

export class Server{

private app=express();
private readonly port:number;
private readonly publicPath:string;
private readonly routes: Router;

constructor(options:Options){
    const {port, routes ,public_path='public'}=options;
    this.port=port;
    this.publicPath=public_path
    this.routes=routes;
}

async start(){

    //* Middlewares
    this.app.use(express.json()); //raw
    this.app.use(express.urlencoded({extended:true})); //x-www-form-urlencoded
    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //*Routes
    this.app.use(this.routes);



    //* SPA
    this.app.use((req,res)=>{
        const indexPath=path.resolve(`${this.publicPath}/index.html`);
        console.log(indexPath);
        res.sendFile(indexPath);
    });

    this.app.listen(this.port,()=>{
        console.log(`server running on port ${this.port}`);
    });

    }   
}