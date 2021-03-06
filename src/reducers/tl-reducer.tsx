import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

 export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}

type ChangeTodoListFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValuesType
    id: string
}

type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: string
    id: string
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListFilterActionType | ChangeTodoListTitleActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodoListID = action.todolistId
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all"
            }
            return [newTodoList, ...state]

        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "CHANGE-FILTER": {
           return state.map(tl => {
                if(tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }else{
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
          return  state.map(tl => {
                if(tl.id === action.id) {
                    return {...tl, title: action.title}
                }else{
                    return tl
                }
            })
        }
        default:
            return state
    }
}

export const RemoveTodoListAC = (id:string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: id}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TITLE",id: id, title: title}
}

export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-FILTER",id: id, filter: filter}
}