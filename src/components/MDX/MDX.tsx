import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

type Props = {
  code: string;
  components?: any;
};

const MDX = ({ code, components }: Props) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
};

export default MDX;
