import * as React from "react";
const FALLBACK = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><rect width="100%" height="100%" fill="#f7f6f1"/><text x="50%" y="50%" text-anchor="middle" fill="#756653">Image unavailable</text></svg>');
const Image = React.forwardRef(({ src, fittingType = "fill", originWidth, originHeight, focalPointX, focalPointY, quality: _quality, style, onError, ...props }, ref) => {
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => setFailed(false), [src]);
  return <img ref={ref} src={failed || !src ? FALLBACK : src} loading="lazy" {...props} style={{ objectFit: fittingType === "fit" ? "contain" : "cover", aspectRatio: originWidth && originHeight ? `${originWidth}/${originHeight}` : undefined, objectPosition: typeof focalPointX === "number" && typeof focalPointY === "number" ? `${focalPointX * 100}% ${focalPointY * 100}%` : undefined, ...style }} onError={(event) => { if (!failed) setFailed(true); onError?.(event); }} />;
});
Image.displayName = "Image";
export { Image };
