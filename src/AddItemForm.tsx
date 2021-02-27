import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    title: string
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")

    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }
    return (
        <div>
            <TextField
                variant="outlined"
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                onBlur={() => {
                    setError(false)
                }}
                helperText={error ? "Title is required!" : ""}
                label={props.title}
                error={error}
            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm;