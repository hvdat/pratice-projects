import { useState } from "react";
import "./App.css";

function App() {
  const storageJobs = JSON.parse(localStorage.getItem("jobs"));
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(storageJobs ?? []);

  const handleAdd = () => {
    if (job !== "")
      setJobs((prev) => {
        const newJobs = [...prev, job];

        const jsonJobs = JSON.stringify(newJobs);
        localStorage.setItem("jobs", jsonJobs);

        return newJobs;
      });
    setJob("");
  };
  const handleRemove = (idx) => {
    setJobs((prev) => {
      return prev.filter((item) => prev.indexOf(item) !== idx);
    });
  };
  return (
    <div className="App">
      <input value={job} onChange={(e) => setJob(e.target.value)} />
      <button onClick={() => handleAdd()} className="btn btn-add">
        Add
      </button>
      <ul>
        {jobs.map((job, idx) => (
          <div key={idx} className="list-item">
            <li>{job}</li>
            <button
              onClick={() => handleRemove(idx)}
              className="btn btn-delete"
            >
              x
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
