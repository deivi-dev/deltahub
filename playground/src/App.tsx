import { useState } from "react";
import { ENV } from "./config";

const App = () => {
  const [input, setText] = useState("");
  const [response, setResponse] = useState("");
  const handleSend = async () => {
    try {
      const agentResponse = await fetch(`${ENV.API_HOST}/agent-response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input }),
      });

      const data = await agentResponse.json();

      if ("response" in data) 
        setResponse(data["response"]);
      else if ("error" in data) 
        setResponse(data["error"]);
    } catch (e) {
      setResponse("An error has occurred:" + e);
    }
  };

  return (
    <section>
      <div className="title">
        <h1>Playground</h1>
      </div>
      <div>
        <div>{response}</div>
      </div>
      <div>
        <input
          value={input}
          onChange={(e) => setText(e.target.value)}
          placeholder="type something..."
        />
      </div>
      <div>
        <button onClick={handleSend}>send</button>
      </div>
    </section>
  );
};

export default App;
