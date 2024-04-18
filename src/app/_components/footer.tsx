import React from "react";

export function Footer() {
  const date = new Date();
  return (
    <footer className="mt-auto">
      <div className="bg-black">
        <div className="bg-black max-w-6xl container mx-auto px-6 py-4">
          © MSpudicDesign {date.getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
