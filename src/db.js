import Dexie from "dexie";

const db = new Dexie("ToDos");

db.version(1).stores({
    toDos: "++id, toDo",
});

export const addToDo = async (todo) => {
    try {
        await db.toDos.add({ todo });
    } catch {
        throw new Error("There was an error. Please try again.");
    }
};

export const deleteToDo = async (id) => {
    try {
        await db.toDos.delete(id);
    } catch (error) {
        throw new Error("There was an error. Please try again.");
    }
};

export default db;
