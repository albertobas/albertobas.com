import { ItemExtended } from 'src/utils/interfaces/architecture';
import { TooltipSource, TooltipTarget } from '../utils/Tooltip';
import { useSingleton } from '@tippyjs/react/headless';
import Tag from './Tag';
import HashTag from './HashTag';

const Tags = ({ tags, hash }: { tags: ItemExtended[] | undefined; hash?: boolean }) => {
  const [source, target] = useSingleton();
  return (
    <ul>
      <TooltipSource singleton={source} delay={1000} placement="bottom" />
      {tags?.map((tag) => {
        return (
          <li key={tag.value}>
            <TooltipTarget singleton={target} content={tag.description ? tag.description : undefined}>
              <div>{hash ? <HashTag tag={tag} /> : <Tag tag={tag} />}</div>
            </TooltipTarget>
          </li>
        );
      })}
    </ul>
  );
};

export default Tags;
