import { useState } from "react";

function App() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleAdd = () => {
    if (job !== "") setJobs((prev) => [...prev, job]);
    setJob("");
  };
  const handleRemove = () => {
    setJobs((prev) => {
      return prev.filter((item) => prev.indexOf(item) !== prev.length - 1);
    });
  };
  return (
    <div className="App">
      <input value={job} onChange={(e) => setJob(e.target.value)} />
      <button onClick={() => handleAdd()}>Add</button>
      <button onClick={() => handleRemove(1)}>Remove</button>
      <ul>
        {jobs.map((job, idx) => (
          <li key={idx}>{job}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
