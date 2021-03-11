import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    const setAllFilter = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.id)
    const removeTodoList = () => props.removeTodoList(props.id)


    let taskForTodoList = props.tasks

    if (props.filter === "active") {
        taskForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        taskForTodoList = props.tasks.filter(t => t.isDone)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} changeItem={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} title="Task title"/>
            <ul className="ul">
                {taskForTodoList.map(task => {
                    const removeTask = () => props.removeTask(task.id, props.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)

                    const changeTitle = (title: string) => {
                        props.changeTaskTitle(task.id, title, props.id)
                    }
                    return (
                        <li className={task.isDone ? "is-done" : ""} key={task.id}>
                            <Checkbox
                                color="secondary"
                                checked={task.isDone} onChange={changeTaskStatus}
                            />

                            <EditableSpan title={task.title} changeItem={changeTitle}/>
                            <IconButton onClick={removeTask}>
                                <Delete/>
                            </IconButton>

                        </li>
                    )
                })}
            </ul>
            <div>
                <Button
                    size="small"
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={setAllFilter}>All
                </Button>
                <Button
                    size="small"
                    color={props.filter === "active" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    size="small"
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
})

export default TodoList;