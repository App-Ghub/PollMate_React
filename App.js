import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetch('/api/poll/today')
      .then(res => res.json())
      .then(setPoll);
  }, []);

  const vote = (index) => {
    fetch('/api/poll/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ option: index })
    }).then(() => {
      setVoted(true);
      fetch('/api/poll/today').then(res => res.json()).then(setPoll);
    });
  };

  if (!poll) return <div>Loading...</div>;

  const totalVotes = poll.votes.reduce((a, b) => a + b, 0);

  return (
    <div className="App">
      <h1>{poll.question}</h1>
      {!voted ? (
        poll.options.map((opt, i) => (
          <button key={i} onClick={() => vote(i)}>{opt}</button>
        ))
      ) : (
        poll.options.map((opt, i) => {
          const percent = ((poll.votes[i] / totalVotes) * 100).toFixed(1);
          return (
            <div key={i}>
              {opt}: {percent}% 
              <div className="bar" style={{ width: percent + '%' }}>{percent}%</div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;