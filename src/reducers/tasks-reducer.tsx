import {TaskStateType} from "../App";
import {v1} from "uuid";


type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string

}


type ActionType = RemoveTaskActionType | AddTaskActionType

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


