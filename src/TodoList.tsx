import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
}

function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")

    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const setAllFilter = () => props.changeTodoListFilter("all")
    const setActiveFilter = () => props.changeTodoListFilter("active")
    const setCompletedFilter = () => props.changeTodoListFilter("completed")


    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked)

        return (
            <li className={task.isDone ? "is-done" : ""} key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}
                />
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
                       onKeyPress={onKeyPressAddTask}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">Title is required!</div>}
            </div>
            <div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button className={props.filter === "all" ? "active" : ""}
                            onClick={setAllFilter}>All
                    </button>
                    <button className={props.filter === "active" ? "active" : ""}
                            onClick={setActiveFilter}>Active
                    </button>
                    <button className={props.filter === "completed" ? "active" : ""}
                            onClick={setCompletedFilter}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoList;