import { useState } from "react";
import { ENV } from "./config";
import logo from "./assets/logo.png";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="mobileMenu">
        <button
          type="button"
          className="mobileMenuBtn"
          aria-label="Open menu"
          onClick={console.log}
        >
          <Menu size={24} />
        </button>
      </div>

      <a href="https://deltahub.dev" className="menuLogo no-decoration">
        <img src={logo} alt="Deltahub logo" />
        <span className="logoTitle">Deltahub</span>
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

        <button type="button" className="navBtn loginBtn">
          Login
        </button>
        <button type="button" className="navBtn registerBtn">
          Register
        </button>
      </div>
    </nav>
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
