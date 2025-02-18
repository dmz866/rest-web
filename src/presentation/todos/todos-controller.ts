import { Request, Response } from "express";

let todos = [
    {
        id: 1, text: 'Shi',
    },
    {
        id: 2, text: 'Nio',
    }];

export class TodosController {

    getTodos(req: Request, res: Response) {
        res.json(todos);
    }

    getTodoById(req: Request, res: Response) {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: `Invalid id ${req.params.id}` });
            return;
        }

        const todo = todos.filter(t => t.id == id)[0];

        if (todo) {
            res.json(todo);
        }
        else {
            res.status(404).json({ error: `Todo ${id} not found` });
        }
    }

    createTodo(req: Request, res: Response) {
        const { text } = req.body;

        if (!text) {
            res.status(404).json({ error: 'Text field is required' });
            return;
        }

        todos.push({ id: todos.length + 1, text });

        res.json('Todo created!');
    }

    updateTodo(req: Request, res: Response) {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: `Invalid id ${req.params.id}` });
            return;
        }

        const todo = todos.find(t => t.id == id);

        if (!todo) {
            res.status(404).json({ error: `Todo ${id} not found` });
            return;
        }

        const { text } = req.body;
        todo.text = text || todo.text;

        if (!text) {
            res.status(404).json({ error: 'Text field is required' });
            return;
        }

        todos.forEach((t, ind) => {
            if (t.id == id) {
                todos[ind] = todo;
                return;
            }
        });

        res.json('Todo updated!');
    }

    deleteTodo(req: Request, res: Response) {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: `Invalid id ${req.params.id}` });
            return;
        }

        const todo = todos.find(t => t.id == id);

        if (!todo) {
            res.status(404).json({ error: `Todo ${id} not found` });
            return;
        }

        //todos.splice(todos.indexOf(todo), 1);
        todos = todos.filter(t => t.id != id);

        res.json('Todo deleted!');
    }
}