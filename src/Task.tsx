import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";


export type TaskPropsType = {

    todolistId: string
    task: TaskType
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
}

const Task = React.memo(function (props: TaskPropsType) {


    const removeTask = () => props.removeTask(props.task.id, props.todolistId)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)

    const changeTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }
    return (
        <li className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color="secondary"
                checked={props.task.isDone} onChange={changeTaskStatus}
            />

            <EditableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>

        </li>
    )
})

export default Task;