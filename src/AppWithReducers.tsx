import React, {useReducer} from "react";
import "./App.css";
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./reducers/tl-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";

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

function App() {
    const todoListID1 = v1()
    const todoListID2 = v1()


    const [todoLists, dispatchToTodoLists] = useReducer(todoListReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ]
    })


    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

    function removeTodoList(todoListID: string) {
        const action = RemoveTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatchToTodoLists(ChangeTodoListFilterAC(todoListID, newFilterValue))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodoLists(ChangeTodoListTitleAC(title, todoListID))
    }

    const listTodos = todoLists.map(tl => {
        let taskForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            taskForTodoList = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            taskForTodoList = tasks[tl.id].filter(t => t.isDone)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={10} style={{padding: "20px"}}>
                    <TodoList

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

export default App;

