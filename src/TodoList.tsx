import React, { useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";


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
console.log("TodoList clicked")

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])

    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.id),[props])

    const setAllFilter = useCallback(() => props.changeTodoListFilter("all", props.id), [props])
    const setActiveFilter = useCallback(() => props.changeTodoListFilter("active", props.id), [props])
    const setCompletedFilter = useCallback(() => props.changeTodoListFilter("completed", props.id), [props])
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
                {taskForTodoList.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        todolistId={props.id}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                    />
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