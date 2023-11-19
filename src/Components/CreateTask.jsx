import { useState } from "react";
import { addUser } from "../../Usercrud";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const CreateTask = () => {
  const initialState = {
    Title: "",
    Task: "",
  };
  const [formData, setFormData] = useState(initialState);
  const useremail = JSON.parse(localStorage.getItem("user"));
  const email=useremail.email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      email,
    });
  };
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    addUser(formData);
    await setFormData(initialState);
    Navigate("/");
  };

  return (
    <div style={{ margin: 50 }}>
      <h1 style={{ textAlign:"center" ,fontSize:30}}><b>Create Task</b></h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize:20}}>Title</Form.Label>
          <Form.Control
            id="Title "
            name="Title"
            type="text"
            value={formData.Title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize:20}} >Task</Form.Label>
          <Form.Control
            as="textarea"
            id="Task"
            name="Task"
            value={formData.Task}
            onChange={handleChange}
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
          onClick={handleSubmit}
        >
         
          Save Changes
        </button>

        {/* <button variant="success" onClick={handleSubmit}>
          Save Changes
        </button> */}
      </Form>

      {/* <form onSubmit={handleSubmit} >
  <p><label htmlFor="Title">Review of W3Schools:</label></p>
  <textarea id="Title" name="Title" rows="2" cols="100" value={formData.Title} onChange={handleChange}required
></textarea>
  <br/>
    <p><label htmlFor="Task">Review of W3Schools:</label></p>

   <textarea id="Task" name="Task" rows="4" cols="100" value={formData.Task} onChange={handleChange}></textarea>
     <br/>

  <input type="submit" value="Submit"/>
</form> */}
    </div>
  );
};
export default CreateTask;

{
  /* <div>
<h1>The textarea element</h1> */
}
