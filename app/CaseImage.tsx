"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

interface CaseImageProps {
  src: string;
  alt: string;
}

export default function CaseImage({ src, alt }: CaseImageProps) {
  const [open, setOpen] = useState(false);

  const images = [{ src, alt }];

  return (
    <>
      <div className="case-image" onClick={() => setOpen(true)}>
        <img src={src} alt={alt} className="case-img" />
      </div>

      <Lightbox
        images={images}
        activeIndex={open ? 0 : null}
        onClose={() => setOpen(false)}
        onChangeIndex={() => {}}
      />
    </>
  );
}