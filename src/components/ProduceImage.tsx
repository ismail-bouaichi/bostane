"use client";

import Image from "next/image";
import { useState } from "react";
import { pexels } from "@/lib/catalog";

export function ProduceImage({ id, alt, sizes, priority, className }: { id: number; alt: string; sizes: string; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className={`img-fallback ${className ?? ""}`} role="img" aria-label={alt}><span>{alt}</span></div>;
  }
  return (
    <Image
      src={pexels(id)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: "cover" }}
      onError={() => setFailed(true)}
    />
  );
}
