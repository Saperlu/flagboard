import React, {useState} from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Hello } from "./Hello.jsx";
import { Task } from "./Task.jsx";
import { TaskForm } from './TaskForm';
import { TasksCollection } from "../api/TasksCollection.js";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  
  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const deleteTask = ({ _id }) => TasksCollection.remove(_id);

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  };

  return (
    <div className="main">
      <TaskForm />
      <div className="filter">
      <button onClick={() => setHideCompleted(!hideCompleted)}>
        {hideCompleted ? 'Show All' : 'Hide Completed'}
      </button>
      </div>
      <ul>
        {tasks.map((t) => (
          <Task key={t._id} task={t} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask}></Task>
        ))}
      </ul>
    </div>
  );
};
