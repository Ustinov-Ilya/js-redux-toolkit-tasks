import React from 'react';
import Spinner from './Spinner.jsx';
import TodoForm from './TodoForm.jsx';
// BEGIN (write your solution here)
import {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation} from "../services/tasksApi";
// END

const TodoBox = () => {
  // BEGIN (write your solution here)
  const {data: tasks = [], isLoading, isError} = useGetTasksQuery();
  const [createTask, {isLoading: isCreating}] = useCreateTaskMutation();
  const [deleteTask,  {isLoading: isDeleting}] = useDeleteTaskMutation();
  // END

  const handleDeleteTask = (event, id) => {
    event.preventDefault();
    // BEGIN (write your solution here)
    deleteTask(id);
    // END
  };

  const handleSubmitForm = (event, newTaskText) => {
    event.preventDefault();
    // BEGIN (write your solution here)
    if (newTaskText.trim()) {
      createTask({text: newTaskText.trim()});
    }
    // END
  };

  const renderTodo = () => (
    <TodoForm
      submitHandler={handleSubmitForm}
    />
  );

  // BEGIN (write your solution here)
  if (isLoading) return <Spinner />;
  if (isError) return <div>Something went wrong</div>;
  // END

  return (
    <div>
      <div className="mb-3">
        {renderTodo()}
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="row">
            <div className="col-1">
              {task.id}
            </div>
            <div className="col">
              <a href="" className="todo-task" onClick={(event) => handleDeleteTask(event, task.id)}>{task.text}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoBox;
