import {TaskStateType} from "../App";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string

}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-STATUS-TASK"
    taskId: string
    isDone: boolean
    todolistId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId]
            // eslint-disable-next-line eqeqeq
            copyState[action.todolistId] = todolistTasks.filter(t => t.id != action.taskId);
            return copyState
        }
        case "ADD-TASK": {
            let copyState = {...state}
            let task = {id: v1(), title: action.title, isDone: false}
            let todolistTasks = copyState[action.todolistId];
            copyState[action.todolistId] = [task, ...todolistTasks];
            return copyState
        }
        case "CHANGE-STATUS-TASK": {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone
            }
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-STATUS-TASK", taskId, isDone, todolistId}
}


