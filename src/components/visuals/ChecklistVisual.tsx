export default function ChecklistVisual() {
  const items = [
    { label: "scope locked", checked: true },
    { label: "tech stack chosen", checked: true },
    { label: "timeline agreed", checked: true },
    { label: "price fixed", checked: true },
    { label: "kickoff scheduled", checked: false },
  ];

  return (
    <div className="vis-checklist">
      <div className="vis-cl-head">
        <span>discovery / 60 min</span>
        <span>cal.com</span>
      </div>
      {items.map((item) => (
        <div className="vis-cl-item" key={item.label}>
          <span className={`vis-cl-box${item.checked ? " checked" : ""}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
