import { ReactNode } from 'react';

type Props = {
  heading: string;
  paragraph?: string | ReactNode;
};

const Intro = ({ heading, paragraph }: Props) => {
  return (
    <>
      <h1>{heading}</h1>
      {paragraph && <p>{paragraph}</p>}
    </>
  );
};

export default Intro;
