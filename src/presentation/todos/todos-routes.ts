import { Router } from "express";
import { TodosController } from "./todos-controller";

export class TodosRoutes {

    static get routes() {
        const router = Router();
        const todosController = new TodosController();

        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);

        return router;
    }
}