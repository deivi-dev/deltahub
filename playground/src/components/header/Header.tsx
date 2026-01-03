import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Menu } from "lucide-react";
import { MobileSideBar } from "./MobileSidebar.tsx"
import { renderNavItems } from "./navItems.tsx"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";    
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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

        <a href="https://bronkztech.com.br" className="menuLogo no-decoration">
          <img src={logo} alt="Bronkz logo" />
          <span className="logoTitle">Bronkztech</span>
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

export { Header }