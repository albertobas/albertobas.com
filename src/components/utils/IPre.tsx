import { useInView } from 'react-intersection-observer';
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';

const IPre: FC<DetailedHTMLProps<AnchorHTMLAttributes<HTMLPreElement>, HTMLPreElement>> = (props) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '150px 0px 20px' });
  return (
    <pre ref={ref} {...props}>
      {inView ? props.children : null}
    </pre>
  );
};
export default IPre;
