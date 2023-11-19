import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "./config";
import Form from "react-bootstrap/Form";

const EditTask = () => {
  // eslint-disable-next-line no-unused-vars
  const [task, setTask] = useState({});
  const [editedTitle, setEditedTitle] = useState("");
  const [editedTask, setEditedTask] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${backendUrl}/auth/tasks/${id}`);
        const data = await response.json();
        setTask(data);
        setEditedTitle(data.Title);
        setEditedTask(data.Task);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTaskChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${backendUrl}/auth/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Title: editedTitle, Task: editedTask }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error saving changes:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${backendUrl}/auth/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error deleting task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div style={{ margin: 50 }}>
      <h2>Edit Task</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Task</Form.Label>
          <Form.Control
            as="textarea"
            value={editedTask}
            onChange={handleTaskChange}
          />
        </Form.Group>

        <button
          style={{
            border: "none",
            color: "white",
            padding: "15px 32px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: 16,
            margin: "4px 2px",
            cursor: "pointer",
            backgroundColor: "#04AA6D",
            borderRadius:25

          }}
          type="button"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>

        <button
          style={{
            border: "none",
            color: "white",
            padding: "15px 32px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: 16,
            margin: "4px 2px",
            cursor: "pointer",
            backgroundColor: "red",
            borderRadius:25
          }}
          type="button"
          onClick={handleDelete}
        >
          Delete Task
        </button>
      </Form>
    </div>
  );
};

export default EditTask;
