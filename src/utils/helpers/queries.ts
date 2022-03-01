import { Dispatch, SetStateAction } from 'react';
import { dictTopics } from 'src/utils/dict';
import { Item } from 'src/utils/interfaces/architecture';
import { DictTopics } from 'src/utils/interfaces/dict';
import { Language } from 'src/utils/interfaces/languages';

export const setFromQuery = (
  value: string | string[],
  setter: Dispatch<SetStateAction<Item[] | null>>,
  locale: Language
) => {
  typeof value === 'string'
    ? setter([{ value: value, label: dictTopics[value as DictTopics].label[locale] }])
    : setter(
        value.map((item) => {
          return { value: item, label: dictTopics[item as DictTopics].label[locale] };
        })
      );
};
