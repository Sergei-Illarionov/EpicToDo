import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void

}

function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("")

    const addTask = () => {
        props.addTask(title);
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const setAllFilter = () => props.changeTodoListFilter("all")
    const setActiveFilter = () => props.changeTodoListFilter("active")
    const setCompletedFilter = () => props.changeTodoListFilter("completed")


    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x
                </button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={changeTitle}
                       onKeyPress={onKeyPressAddTask}/>
                <button onClick={addTask}>+</button>
            </div>
            <div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button onClick={setAllFilter}>All</button>
                    <button onClick={setActiveFilter}>Active</button>
                    <button onClick={setCompletedFilter}>Completed</button>
                </div>
            </div>
        </div>
    )
}

export default TodoList;