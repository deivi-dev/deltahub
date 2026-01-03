import { X } from "lucide-react";
import { renderNavItems } from "./navItems.tsx"

type MobileSideBarProps = {
  onClose: () => void;
};

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

export { MobileSideBar }