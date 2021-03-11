import React, {useCallback} from "react";
import "./App.css";
import TodoList from "./TodoList";

import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./state/tl-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC,} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";

function AppWithRedux() {


    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();


    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = RemoveTodoListAC(todoListID)
        dispatch(action)

    }, [dispatch])

    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, newFilterValue))
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(title, todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)

    }, [dispatch])

    const listTodos = todoLists.map(tl => {

        let taskForTodoList = tasks[tl.id]

        return (
            <Grid item key={tl.id}>
                <Paper elevation={10} style={{padding: "20px"}}>
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (

        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>

                <Grid container style={{padding: "20px 0"}}><AddItemForm addItem={addTodoList} title="TodoList title"/>
                </Grid>
                <Grid container spacing={4}>
                    {listTodos}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;

