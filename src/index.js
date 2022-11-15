import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import configureStore from "./store/store";
import {completedTask, getTaskLoadingStatus, getTasks, loadTasks, taskDeleted, titleChanged} from "./store/task";
import {Provider, useDispatch, useSelector} from "react-redux";
import {getErrors} from "./store/errors";


const store = configureStore()

const App = () => {

    const state = useSelector(getTasks())
    const isLoading = useSelector(getTaskLoadingStatus())
    const error = useSelector(getErrors())

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    }, [])

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId))
    }

    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId))
    }

    if (isLoading) {
        return  <h1>Loading...</h1>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <h1>App</h1>
            <ul>{state.map(el => (
                <li
                    key={el.id}
                >
                    <p>{el.title}</p>
                    <p>{`Completed: ${el.completed}`}</p>
                    <button onClick={() => dispatch(completedTask(el.id))}>Complete</button>
                    <button onClick={() => changeTitle(el.id)}>Change Title</button>
                    <button onClick={() => deleteTask(el.id)}>Delete</button>

                    <hr/>
                </li>
            ))}
            </ul>
        </>
    );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <App/>
        </Provider>
);
