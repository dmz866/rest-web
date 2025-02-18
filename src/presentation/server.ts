import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}


export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor({ port, routes, public_path = 'public' }: Options) {
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        //* Middlewares
        this.app.use(express.json()); //Serialize requests to json (RAW)
        this.app.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded
        //Routes
        this.app.use(this.routes);

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}