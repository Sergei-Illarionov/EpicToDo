import React from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
}

function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => {
                    props.removeTask(task.id)
                }}>x
                </button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button onClick={() => {
                        props.changeTodoListFilter("all")
                    }}>All
                    </button>
                    <button onClick={() => {
                        props.changeTodoListFilter("active")
                    }}>Active
                    </button>
                    <button onClick={() => {
                        props.changeTodoListFilter("completed")
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoList;