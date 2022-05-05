import { dictTopics } from 'src/utils/dict';
import { Item, ItemExtended } from 'src/utils/interfaces/architecture';
import { DictTopics } from 'src/utils/interfaces/dict';
import { Language } from 'src/utils/interfaces/languages';
import { FilterTag } from 'src/utils/interfaces/post';
import { sortItemArray } from 'src/utils/helpers/post';

export const getItemsFromTags = (data: ItemExtended[], key: keyof ItemExtended, locale: Language) => {
  const keySet = [];
  keySet.push(
    ...new Set(
      data
        .map(function (item) {
          if (typeof item[key] != 'undefined') {
            if (key === 'topic') {
              return item[key];
            } else return null;
          } else return null;
        })
        .flat()
    )
  );
  const typeItemsArray: Item[] = [];
  if (key === 'topic') {
    keySet.forEach(function (item) {
      if (item && Object.keys(dictTopics).includes(item)) {
        typeItemsArray.push({ label: dictTopics[item as DictTopics].label[locale], value: item });
      }
    });
  } else return null;
  return typeItemsArray.sort(sortItemArray);
};
export const sortTags = (data: ItemExtended[], sortValue: string | undefined, reverse: boolean) => {
  if (reverse) {
    if (sortValue === 'title') {
      return data.sort((a, b) => (a.value > b.value ? -1 : a.value < b.value ? 1 : 0));
    } else if (sortValue === 'topic') {
      return data.sort((a, b) => (a.topic > b.topic ? -1 : a.topic < b.topic ? 1 : 0));
    } else return data;
  } else {
    if (sortValue === 'title') {
      return data.sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0));
    } else if (sortValue === 'topic') {
      return data.sort((a, b) => (a.topic < b.topic ? -1 : a.topic > b.topic ? 1 : 0));
    } else return data;
  }
};

export function tagsSearch(tags: ItemExtended[], query: string | null) {
  if (query) {
    return tags.filter(
      (tag) =>
        (tag.label && tag.label.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (tag.label && toDashCase(tag.label).indexOf(query.toLowerCase()) > -1) ||
        (Object.keys(tag).includes('description') && tag.description.toLowerCase().indexOf(query.toLowerCase()) > -1)
    );
  } else return tags;
}
export function tagsFilter(tags: ItemExtended[], filters: FilterTag[]) {
  function booleanFilter(value: string, filter: Item) {
    const itemsArray: boolean[] = [];
    value && filter && itemsArray.push(value === filter.value);

    return itemsArray;
  }
  function tagFilter(tag: ItemExtended) {
    return filters.map((filter) => {
      return (
        (filter.filter &&
          filter.key &&
          filter.key === 'topic' &&
          booleanFilter(tag[filter.key], filter.filter).reduce((a, b) => {
            return a && b;
          })) ||
        !filter.filter
      );
    });
  }
  return tags.filter((tag) =>
    tagFilter(tag).reduce((a, b) => {
      return a && b;
    })
  );
}
export function toDashCase(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

export function toHashTag(value: string) {
  return (
    '#' +
    value
      .split(' ')
      .map((l) => l.charAt(0).toUpperCase() + l.substring(1))
      .join('')
  );
}
