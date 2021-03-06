import { ItemExtended } from 'src/utils/interfaces/architecture';
import Tooltip from '../utils/Tooltip';
import Tag from './Tag';
import HashTag from './HashTag';

const Tags = ({ tags, hash }: { tags: ItemExtended[] | null; hash?: boolean }) => {
  return (
    <ul>
      {tags?.map((tag) => {
        return (
          <li key={tag.value}>
            <Tooltip content={tag.description} delay={500} placement="bottom">
              <div>{hash ? <HashTag tag={tag} /> : <Tag tag={tag} />}</div>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
};

export default Tags;
