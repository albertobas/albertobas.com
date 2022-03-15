import { join } from 'path';
import { toHashTag } from 'src/utils/helpers/tags';
import { ItemExtended } from 'src/utils/interfaces/architecture';
import ILink from 'src/components/utils/ILink';
import { memo } from 'react';

export default memo(function HashTag({ tag }: { tag: ItemExtended }) {
  return <ILink href={join('/tags', tag.value)}>{toHashTag(tag.label)}</ILink>;
});
