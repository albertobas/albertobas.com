import { useIntl } from 'react-intl';
import { Headings } from 'src/utils/interfaces/post';

type Props = {
  headings: Headings[];
  isProjects?: boolean;
  behavior?: 'smooth' | 'auto';
};

const TOC = ({ headings, isProjects, behavior }: Props) => {
  const intl = useIntl();
  const handleClick = (e: React.MouseEvent, id: string | null) => {
    e.preventDefault();
    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: behavior ? behavior : 'auto',
    });
  };
  return (
    <>
      <h2>
        {isProjects
          ? intl.formatMessage({ id: 'tableOfContents', defaultMessage: 'Table of contents' })
          : intl.formatMessage({ id: 'toc', defaultMessage: 'In this article' })}
      </h2>
      <nav>
        <ul>
          {headings.map((h2) => (
            <li key={h2.id}>
              <a
                href={`#${h2.id}`}
                onClick={(e) => {
                  handleClick(e, h2.id);
                }}
              >
                {h2.title}
              </a>
              {h2.children.length > 0 && (
                <ul>
                  {h2.children.map((h3) => (
                    <li key={h3.id}>
                      <a
                        href={`#${h3.id}`}
                        onClick={(e) => {
                          handleClick(e, h3.id);
                        }}
                      >
                        {h3.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default TOC;
