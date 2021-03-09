import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    title: string
}

function AddItemForm(props: AddItemFormPropsType) {
    console.log("AddItemForm clicked")
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        if (title.trim() !==""){
            props.addItem(title);
            setTitle("");
        } else {
            setError("title is required")
        }

    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter")
            addItem();
    }
    return (
        <div>
            <TextField
                variant="outlined"
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}

                helperText={error ? "Title is required!" : ""}
                label={props.title}
                error={!!error}
            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm;