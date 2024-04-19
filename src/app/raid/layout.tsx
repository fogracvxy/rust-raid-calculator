import React, { ReactNode } from "react";

interface RaidCalculatorLayoutProps {
  children: ReactNode;
}

const RaidCalculatorLayout: React.FC<RaidCalculatorLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default RaidCalculatorLayout;
