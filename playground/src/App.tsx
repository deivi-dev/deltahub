import { useState } from "react";
import { ENV } from "./config";
import logo from "./assets/logo.png";

const Header = () => {
  return (
    <header>
      <nav className="navbar" role="navigation">
        <a href="https://deltahub.dev" className="menuLogo no-decoration">
          <img src={logo} alt="Deltahub logo" />
          <p className="logoTitle">Deltahub</p>
        </a>

        <div className="itemsNavbar">
          <ul>
            <li>
              <a href="/explore">Explore</a>
            </li>
            <li>
              <a href="/explore">Documentation</a>
            </li>
            <li>
              <a href="/explore">About</a>
            </li>
          </ul>

          <button type="button" className="loginBtn">
            Login
          </button>
          <button type="button" className="registerBtn">
            Register
          </button>
        </div>
      </nav>
    </header>
  );
};

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

      if ("response" in data) setResponse(data["response"]);
      else if ("error" in data) setResponse(data["error"]);
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

export { Header, App };
