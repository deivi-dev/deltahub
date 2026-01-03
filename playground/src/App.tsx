import { useState } from "react";
import { ENV } from "./config";
import logo from "./assets/logo.png";
import { Menu, X, Compass, BookOpen, Info } from "lucide-react";


type MobileSideBarProps = {
  onClose: () => void;
};

const navItems = [
  {
    label: "explore",
    href: "/explore",
    icon: Compass,
  },
  {
    label: "documentation",
    href: "/documentation",
    icon: BookOpen,
  },
  {
    label: "about",
    href: "/about",
    icon: Info,
  },
];

const renderNavItems = (iconSize: number) =>
  navItems.map((item) => {
    const Icon = item.icon;

    return (
      <li key={item.href}>
        <a href={item.href}>
          <Icon size={iconSize} />
          <span>{item.label}</span>
        </a>
      </li>
    );
  });

const MobileSideBar = ({ onClose }: MobileSideBarProps) => {
  return (
    <div className="mobileSidebar">
      <button className="closeBtn" onClick={onClose}>
        <X size={24} />
      </button>

      <nav className="mobileNav">{renderNavItems(16)}</nav>
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
          <button
            type="button"
            className="mobileMenuBtn"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

        <a href="https://deltahub.dev" className="menuLogo no-decoration">
          <img src={logo} alt="Deltahub logo" />
          <span className="logoTitle">Deltahub</span>
        </a>

        <div className="itemsNavbar">
          <ul>
            {renderNavItems(16)}
          </ul>

          <button type="button" className="navBtn loginBtn">
            Login
          </button>
          <button type="button" className="navBtn registerBtn">
            Register
          </button>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div className="sidebarOverlay" onClick={() => setMenuOpen(false)} />
          <MobileSideBar onClose={() => setMenuOpen(false)} />
        </>
      )}
    </>
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
