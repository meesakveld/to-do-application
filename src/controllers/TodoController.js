import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
    const title = req.body.title;
    const category_id = parseInt(req.body.category_id) || null;
    
    const todo = await Todo.query().insert({
        title,
        category_id,
        is_completed: false
    });
    res.redirect(req.headers.referer);
}


export const updateTodo = async (req, res) => {
    const todo = {
        title: req.body.title,
        category_id: req.body.category_id ? parseInt(req.body.category_id) : null,
        is_completed: req.body.is_completed === "true" ? true : false
    }
    await Todo.query().patchAndFetchById(req.body.id, todo);
    res.redirect(req.headers.referer);
}


export const deleteTodo = async (req, res) => {
    const todo = await Todo.query().findById(req.body.id)
    if (!todo) {
        return res.status(404).json({ message: `Todo with id: ${req.body.id} not found` })
    }
    await Todo.query().deleteById(req.body.id);
    res.redirect(req.headers.referer);
}


export const handleTodo = async (req, res) => {
    const method = req.body.method;

    if (method === "POST") {
        createTodo(req, res);
    }
    if (method === "PATCH") {
        updateTodo(req, res);
    }
    if (method === "DELETE") {
        deleteTodo(req, res);
    }

}