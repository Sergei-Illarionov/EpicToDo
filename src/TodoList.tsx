import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
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

    const setAllFilter = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.id)


    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)

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
            <h3>{props.title}
                <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>x
                </button>
            </h3>
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