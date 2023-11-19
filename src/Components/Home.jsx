import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { backendUrl } from "./config";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const useremail = JSON.parse(localStorage.getItem("user"));
const email=useremail.email;
    const fetchUser = async () => {
      try {
        const Response = await fetch(`${backendUrl}/auth/task`, {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await Response.json();
        setTasks(data.Tasks);

        // Check if there's a search term, if not, set filteredData to tasks
        if (searchTerm.trim() === "") {
          setFilteredData(data.Tasks);
        } else {
          // If there's a search term, apply the filter
          const filteredResults = data.Tasks.filter(
            (item) =>
              item &&
              item.Title &&
              item.Title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredData(filteredResults);
          localStorage.setItem("filteredData", JSON.stringify(filteredResults));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    try {
      let newFilteredData;

      if (searchTerm.trim() === "") {
        newFilteredData = tasks;
      } else {
        newFilteredData = tasks.filter(
          (item) =>
            item &&
            item.Title &&
            item.Title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredData(newFilteredData);
      localStorage.setItem("filteredData", JSON.stringify(newFilteredData));
    } catch (error) {
      console.error("Error updating filtered data in localStorage:", error);
    }
  };

  // const handleClearSearch = () => {
  //   setSearchTerm('');
  //   setFilteredData(tasks);
  //   localStorage.removeItem('filteredData');
  // };

  const handleItemClick = (item) => {
    // Navigate to the edit page with the item data
    navigate(`/edit/${item._id}`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          
          margin: 25,
        }}
      >
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={handleSearchChange}
          />
          <Button
            className="me-2"
            onClick={handleSearch}
            variant="outline-primary"
          >
            Search
          </Button>
        </Form>
        {/* <Button className="me-5" onClick={handleClearSearch} variant="outline-danger">
          Clear
        </Button> */}
        <Button
          onClick={() => navigate("/CreateTask")}
          variant="outline-success"
        >
          Create
        </Button>
      </div>

      <div
        style={{
          
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: 50,
        }}
      >
        {filteredData.map((item) => (
          <span
            key={item._id}
            style={{
              margin: 20,
              cursor: "pointer",
            }}
            onClick={() => handleItemClick(item)}
          >
            <div
              className="card "
              
              style={{
                width: "18rem"
              }}
            >
              <div
                style={{ fontWeight:"bold", height: 50, overflow: "auto" }}
                className="card-header"
              >
                {item.Title}
              </div>
              <div className="card-body">
                <p
                  style={{ height: 100, overflow: "auto" }}
                  className="card-text"
                >
                  {item.Task}
                </p>
                <h5 className="card-title"> </h5>
              </div>
            </div>
          </span>
        ))}
      </div>
    </>
  );
};

export default Home;
