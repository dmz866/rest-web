import { Server } from "./presentation/server";
import { envs } from './config/envs';
import { AppRoutes } from "./presentation/app-routes";

const main = () => {
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
        public_path: envs.PUBLIC_PATH,
    });
    server.start();
};

main();