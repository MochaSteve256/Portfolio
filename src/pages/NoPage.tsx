
function NoPage() {

  document.title = "Error 404 | MochaSteve";

  return (
    <div style={{ background: "#102040", display: "flex", justifyContent: "center", height: "100vh" }}>
      <h1 style={{ color: "white", fontSize: "clamp(40px, 10vw, 72px)" }}>404</h1>
    </div>
  )
}

export default NoPage