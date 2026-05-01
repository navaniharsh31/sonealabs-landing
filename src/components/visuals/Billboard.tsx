import type { Product } from "@/components/data/products";

export default function Billboard({ product }: { product: Product }) {
  const { billboard } = product;
  return (
    <div className="rs-panel" data-product={product.slug}>
      <div className="billboard-frame">
        <div className="billboard">
          <div className="billboard-meta">
            <span>{billboard.meta.left}</span>
            <span>{billboard.meta.right}</span>
          </div>
          <div className="billboard-mark">{billboard.mark}</div>
          <div className="billboard-foot">
            <span style={{ whiteSpace: "pre-line" }}>{billboard.foot.left}</span>
            <span className="right" style={{ whiteSpace: "pre-line" }}>
              {billboard.foot.right}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
