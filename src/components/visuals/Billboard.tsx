import type { Product } from "@/components/data/products";

type Props = { product: Product; isActive?: boolean };

export default function Billboard({ product, isActive }: Props) {
  const { billboard } = product;
  return (
    <div className="billboard-wrap" data-product={product.slug}>
      <div className="billboard-frame">
        <div className="billboard">
          <div className="billboard-meta">
            <span>{billboard.meta.left}</span>
            <span>{billboard.meta.right}</span>
          </div>
          <div className={`billboard-mark${isActive ? " billboard-mark--active" : ""}`}>
            {billboard.mark}
          </div>
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
