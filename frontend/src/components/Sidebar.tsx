import { useState } from "react";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { HiMiniRectangleGroup, HiBuildingOffice, HiDocument  } from "react-icons/hi2";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

import "./Sidebar.css";

interface SidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

const Sidebar = ({ selectedSection, setSelectedSection }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = [
    { icon: <HiMiniRectangleGroup className="sidebar-icon" />, label: "Dashboard"},
    { icon: <FaBriefcase className="sidebar-icon" />, label: "Applications"},
    { icon: <FaCalendarAlt className="sidebar-icon" />, label: "Interviews"},
    { icon: <HiBuildingOffice className="sidebar-icon" />, label: "Companies"},
    { icon: <HiDocument className="sidebar-icon" />, label: "Documents"},
  ];

  return (
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className={`sidebar-header ${collapsed ? "collapsed" : ""}`}>
          {!collapsed && <h2 className="sidebar-title"><span className="title-job">[13]</span><span className="title-tracker">Job Tracker</span></h2>}

          <button className={`toggle-btn ${collapsed ? "collapsed" : ""}`} onClick={() => {
            console.log("clicked", collapsed);
            setCollapsed(!collapsed);
          }}>
            {collapsed ? <TbLayoutSidebarLeftExpand className="toggle-icon" /> : <TbLayoutSidebarLeftCollapse className="toggle-icon" />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
          {menuItems.map((item) => (
            <button key={item.label} className={`nav-item ${selectedSection === item.label ? "selected" : ""}`} onClick={() => {
              //console.log("clicked", item.label);
              setSelectedSection(item.label);
            }}>
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
          </div>
          <div className="nav-section">
            <h3>{!collapsed && "Account"}</h3>
            <hr className="nav-divider" />
            <button className={`nav-item ${selectedSection === "Settings" ? "selected" : ""}`} onClick={() => {
              setSelectedSection("Settings");
            }}>
              <FaGear className="sidebar-icon" />
              {!collapsed && <span>Settings</span>}
            </button>
          </div>
        </nav>
      </aside>
  );
};

export default Sidebar;
