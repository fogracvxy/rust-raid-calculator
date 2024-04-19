import React, { useState, ReactNode } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-section">
      <div className="section-header" onClick={toggleSection}>
        <h3>{title}</h3>
        <span className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
      </div>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};
