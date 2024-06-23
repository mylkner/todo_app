import Dexie from "dexie";

const db = new Dexie("ToDos");

db.version(1).stores({
    toDos: "++id, todo",
});

export default db;
