import { useInView } from 'react-intersection-observer';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

const IPre: FC<DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>> = (props) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '150px 0px 20px' });
  return (
    <pre ref={ref} {...props}>
      {inView ? props.children : null}
    </pre>
  );
};
export default IPre;
