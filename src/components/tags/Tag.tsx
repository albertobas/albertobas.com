import { join } from 'path';
import styles from 'src/styles/modules/components/tags/tag.module.css';
import { dictTopics } from 'src/utils/dict';
import { toDashCase } from 'src/utils/helpers/tags';
import { ItemExtended } from 'src/utils/interfaces/architecture';
import ILink from 'src/components/utils/ILink';
import Tooltip from 'src/components/utils/Tooltip';
import { memo } from 'react';

const TagLink = ({ tag }: { tag: ItemExtended }) => {
  return (
    <ILink
      href={join('/tags', tag.value)}
      className={Object.keys(dictTopics).includes(tag.value) ? styles.tag : styles.tagUnknown}
    >
      {toDashCase(tag.label)}
    </ILink>
  );
};

export default memo(function Tag({ tag }: { tag: ItemExtended }) {
  if (tag.description) {
    return (
      <Tooltip delay={750} content={tag.description ? tag.description : undefined} placement="bottom">
        <div>
          <TagLink tag={tag} />
        </div>
      </Tooltip>
    );
  } else {
    return <TagLink tag={tag} />;
  }
});
