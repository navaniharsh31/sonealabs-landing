export default function TerminalVisual() {
  return (
    <div className="vis-terminal">
      <div className="vis-term-head">
        <span className="tdot" />
        <span className="tdot" />
        <span className="tdot" />
        <span className="tlabel">~/sonealabs/your-project</span>
      </div>
      <div className="vis-term-line">
        <span className="prompt">$</span>
        <span className="cmd">git push origin main</span>
      </div>
      <div className="vis-term-line out">enumerating objects: 47, done.</div>
      <div className="vis-term-line out">
        writing objects: 100% (47/47), 12.4 KiB
      </div>
      <div className="vis-term-line out">remote: vercel building...</div>
      <div className="vis-term-line out">remote: compiled 84 modules in 1.4s</div>
      <div className="vis-term-line">
        <span className="lime">✓ deployed</span> staging.yourapp.com
      </div>
      <div className="vis-term-line">
        <span className="prompt">$</span>
        <span className="cmd">_</span>
      </div>
    </div>
  );
}
