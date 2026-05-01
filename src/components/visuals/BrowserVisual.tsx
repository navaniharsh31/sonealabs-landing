export default function BrowserVisual() {
  return (
    <div className="vis-browser">
      <div className="vis-br-bar">
        <span className="bdot" />
        <span className="bdot" />
        <span className="bdot" />
        <span className="url">yourapp.com</span>
        <span className="live">
          <span className="dot" />
          live
        </span>
      </div>
      <div className="vis-br-body">
        <div className="vis-br-stat">
          visits today
          <span className="num">1,247</span>
        </div>
        <div className="vis-br-stat">
          first paying customer
          <span className="num">$29.00</span>
        </div>
      </div>
    </div>
  );
}
