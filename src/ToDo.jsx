import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "./db.js";
import ToDoComponent from "./ToDoComponent.jsx";

const ToDo = () => {
    const todos = useLiveQuery(() => db.toDos.toArray());
    const errorText = "There was an error. Please try again.";

    const [todo, setTodo] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
    }, [todo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!todo.trim())
                return setError("Please provide a non-empty input.");

            await db.toDos.add({ todo });
            setTodo("");
        } catch {
            setError(errorText);
        }
    };

    const deleteAll = async () => {
        try {
            await db.toDos.clear();
        } catch {
            setError(errorText);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-200 flex flex-col items-center justify-center">
            <h1 className="text-4xl">To Do List</h1>
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 flex-wrap w-[60%] p-5"
            >
                <label htmlFor="todo">Add To Do:</label>
                <input
                    id="todo"
                    type="text"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="add to do"
                    className="rounded-lg p-3"
                />

                <button className="px-5 py-3 font-semibold rounded-lg bg-green-500 hover:bg-green-400">
                    Add
                </button>
                <button
                    type="button"
                    onClick={deleteAll}
                    className="px-5 py-3 font-semibold rounded-lg bg-red-500 hover:bg-red-400"
                >
                    Delete All
                </button>

                {error && <p className="text-red-600">{error}</p>}
            </form>

            <ul className="w-[60%] max-h-[400px] overflow-auto mx-auto flex flex-col gap-2 p-5">
                {todos?.map(({ id, todo }) => (
                    <ToDoComponent
                        key={id}
                        id={id}
                        todo={todo}
                        setError={setError}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ToDo;
