export function Footer() {
  const date = new Date();
  return (
    <footer>
      <div
        style={{ position: "absolute", bottom: 0, width: "100%" }}
        className="bg-black"
      >
        <div className="bg-black max-w-6xl container mx-auto px-6 pt-10 pb-6">
          © MSpudicDesign {date.getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
