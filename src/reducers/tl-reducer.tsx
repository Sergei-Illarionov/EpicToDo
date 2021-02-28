import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
}

type ChangeTodoListFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValuesType
    id: string
}

type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: FilterValuesType
    id: string
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListFilterActionType | ChangeTodoListTitleActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all"
            }
            return [newTodoList, ...state]

        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "CHANGE-FILTER": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        }
        case "CHANGE-TITLE": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        }
        default:
            return state
    }
}


