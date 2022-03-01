import { ImageProps } from 'next/image';
import { FC } from 'react';
import ZoomImage from 'src/components/utils/ZoomImage';
import Tooltip from 'src/components/utils/Tooltip';

const IImage: FC<ImageProps> = (props) => {
  return (
    <Tooltip content={props.alt} placement="bottom">
      <div className="customImage">
        <ZoomImage layout="intrinsic" {...props} />
      </div>
    </Tooltip>
  );
};

export default IImage;
