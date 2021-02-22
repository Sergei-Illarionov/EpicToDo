import React, {useState} from "react";
import "./App.css";
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "JS", isDone: false},
        {id: 2, title: "HTML", isDone: true},
        {id: 3, title: "CSS", isDone: false},
    ])

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function changeTodoListFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
    }

    let tasksForTodoList = tasks;

    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }
    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;

