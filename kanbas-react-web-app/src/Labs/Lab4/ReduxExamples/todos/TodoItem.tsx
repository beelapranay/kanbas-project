import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
    todo: { id: string; title: string };
  }) {
    const dispatch = useDispatch();
    return (
      <li key={todo.id} className="list-group-item">
        <button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"> Delete </button>
        <button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"> Edit </button>
        <button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"> Enroll </button>
        {todo.title}    </li>);}