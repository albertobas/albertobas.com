import Lightbox from 'react-image-lightbox';
import Image, { ImageProps } from 'next/image';
import { memo, useState } from 'react';
import 'react-image-lightbox/style.css';

export default memo(function ZoomImage(props: ImageProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Image alt={props.alt} onClick={() => setIsOpen(true)} {...props} />
      {isOpen && <Lightbox mainSrc={props.src.toString()} onCloseRequest={() => setIsOpen(false)} />}
    </>
  );
});
