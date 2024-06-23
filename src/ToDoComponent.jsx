import { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import db from "./db.js";

const ToDoComponent = ({ id, todo, setError }) => {
    const [updatedTodo, setUpdatedTodo] = useState(todo);
    const [editing, setEditing] = useState(false);
    const todoRef = useRef(null);
    const errorText = "There was an error. Please try again.";

    useEffect(() => {
        if (editing) todoRef.current.focus();
    }, [editing]);

    const update = async (id) => {
        try {
            await db.toDos.update(id, { todo: updatedTodo });
        } catch {
            setError(errorText);
            setUpdatedTodo(todo);
        } finally {
            setEditing(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await db.toDos.delete(id);
        } catch {
            setError(errorText);
        }
    };

    return (
        <li
            key={id}
            className="flex items-center flex-wrap gap-1 justify-between px-5 py-3 bg-white rounded-lg"
        >
            {editing ? (
                <>
                    <input
                        type="text"
                        value={updatedTodo}
                        onChange={(e) => setUpdatedTodo(e.target.value)}
                        ref={todoRef}
                        className="p-3 rounded-lg bg-gray-200"
                    />
                    <button
                        className="px-5 py-3 font-semibold rounded-lg bg-green-500 hover:bg-green-400"
                        onClick={() => update(id)}
                    >
                        Update
                    </button>
                </>
            ) : (
                <>
                    <p>{todo}</p>
                    <span className="flex items-center gap-2">
                        <FaEdit
                            className="text-blue-600"
                            onClick={() => setEditing(true)}
                        />
                        <MdDelete
                            className="text-red-600"
                            onClick={() => handleDelete(id)}
                        />
                    </span>
                </>
            )}
        </li>
    );
};
export default ToDoComponent;
