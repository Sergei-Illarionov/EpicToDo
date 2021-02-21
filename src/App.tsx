import React from "react";
import "./App.css";
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const tasksOne: Array<TaskType> = [
        {id: 1, title: "JS", isDone: false},
        {id: 2, title: "HTML", isDone: true},
        {id: 3, title: "CSS", isDone: false},
    ]
    const tasksTwo: Array<TaskType> = [
        {id: 1, title: "Milk", isDone: false},
        {id: 2, title: "Bread", isDone: false},
        {id: 3, title: "Water", isDone: true},
    ]
    return (
        <div className="App">
            <TodoList title="What to learn" tasks={tasksOne}/>
            <TodoList title="What to buy" tasks={tasksTwo}/>
        </div>
    );
}

export default App;

