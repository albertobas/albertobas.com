import { Dispatch, SetStateAction } from 'react';
import { dictCB, dictDS, dictTopics, dictKeys, dictFL, dictWD } from 'src/utils/dict';
import { Item, ItemExtended } from 'src/utils/interfaces/architecture';
import { DictTopics, DictKeys } from 'src/utils/interfaces/dict';
import { Language } from 'src/utils/interfaces/languages';
import { Filter, Headings, MdxMetadataCard, MdxMetadataPost } from 'src/utils/interfaces/post';

export function cardFilter(cards: MdxMetadataCard[], filters: Filter[]) {
  function booleanFilter(value: string | string[] | undefined, filter: Item[]) {
    const itemsArray: boolean[] = [];
    value &&
      filter &&
      filter.map((filterItem) => {
        itemsArray.push(typeof value === 'string' ? value === filterItem.value : value.includes(filterItem.value));
      });
    return itemsArray;
  }
  function cardMap(card: MdxMetadataCard) {
    return filters.map((filter) => {
      const tagExtended =
        card.tags && card.tech ? card.tags + ',' + card.tech : card.tags ? card.tags : card.tech ? card.tech : null;
      return (
        (filter.filter &&
          filter.filter.length > 0 &&
          filter.key &&
          (filter.key === 'field' ||
            filter.key === 'tags' ||
            filter.key === 'tech' ||
            filter.key === 'topic' ||
            filter.key === 'section') &&
          card[filter.key] &&
          booleanFilter(
            filter.key === 'tags'
              ? tagExtended?.split(',')
              : filter.key === 'tech'
              ? card[filter.key]?.split(',')
              : card[filter.key],
            filter.filter
          ).reduce((a, b) => {
            return a && b;
          })) ||
        !filter.filter
      );
    });
  }
  return cards.filter((card) =>
    cardMap(card).reduce((a, b) => {
      return a && b;
    })
  );
}
export function cardSearch(cards: MdxMetadataCard[], query: string | null, locale: Language) {
  if (query) {
    return cards.filter(
      (card) =>
        (card.title && card.title.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (card.description && card.description.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (card.field &&
          dictTopics[card.field as DictTopics]?.label[locale].toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (card.field &&
          dictTopics[card.field as DictTopics]?.description[locale].toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (card.section && dictKeys[card.section as DictKeys][locale]?.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (card.topic &&
          dictTopics[card.topic as DictTopics]?.label[locale].toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (card.topic &&
          dictTopics[card.topic as DictTopics]?.description[locale].toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (card.tags && getTagsString(card.tags, 'tags', locale).toLowerCase().indexOf(query.toLowerCase()) > -1) ||
        (card.tech && getTagsString(card.tech, 'tech', locale).toLowerCase().indexOf(query.toLowerCase()) > -1)
    );
  } else return cards;
}
const getTagsString = (data: MdxMetadataCard[] | string, key: keyof MdxMetadataCard, locale: Language) => {
  const keySet = getKeySet(data, key);
  let tagsString = '';
  keySet?.forEach(function (item) {
    if (item && Object.keys(dictTopics).includes(item)) {
      tagsString += dictTopics[item as DictTopics].description[locale];
      (tagsString += dictTopics[item as DictTopics].label[locale]), (tagsString += item);
    }
  });
  return tagsString;
};
export const getItemsFromCards = (data: MdxMetadataCard[] | string, key: keyof MdxMetadataCard, locale: Language) => {
  const keySet = getKeySet(data, key);
  const typeItemsArray: (Item | ItemExtended)[] = [];
  if (keySet) {
    if (key === 'field' || key === 'tech' || key === 'topic' || key === 'tags') {
      keySet.forEach(function (item) {
        if (item && Object.keys(dictTopics).includes(item)) {
          typeItemsArray.push({
            description: dictTopics[item as DictTopics].description[locale],
            label: dictTopics[item as DictTopics].label[locale],
            value: item,
            topic: Object.keys(dictDS).includes(item)
              ? 'data-science'
              : Object.keys(dictCB).includes(item)
              ? 'crypto-blockchain'
              : Object.keys(dictFL).includes(item)
              ? 'frameworks-libraries'
              : Object.keys(dictWD).includes(item)
              ? 'web-development'
              : 'programming-languages',
          });
        }
      });
    } else if (key === 'section') {
      keySet.forEach(function (item) {
        if (item && Object.keys(dictKeys).includes(item)) {
          typeItemsArray.push({ label: dictKeys[item as DictKeys][locale], value: item });
        }
      });
    } else return null;
  } else return null;
  return typeItemsArray.sort(sortItemArray);
};
export const getKeySet = (data: MdxMetadataCard[] | MdxMetadataPost[] | string, key: keyof MdxMetadataPost) => {
  const keySet = [];
  if (typeof data === 'string') {
    keySet.push(...new Set(data.split(',').flat()));
  } else if (Array.isArray(data)) {
    const source: (string | string[])[] = [];
    data.forEach(function (post) {
      if (key === 'tags' || key === 'tech') {
        source.push(post[key] ? (post[key]?.split(',') as string[]) : []);
      } else if (key === 'topic' || key === 'field' || key === 'section') {
        source.push(post[key] ? (post[key] as string) : '');
      }
    });
    keySet.push(...new Set(source.flat()));
  } else return null;
  return keySet;
};
export const getLabel = (value: string, locale: Language) => {
  if (Object.keys(dictKeys).includes(value)) {
    return dictKeys[value as DictKeys][locale];
  } else return '';
};
export const getNestedHeadings = (headingElements: HTMLHeadingElement[], locale: Language) => {
  const headings: Headings[] = [];
  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;
    if (heading.nodeName === 'H2') {
      headings.push({ id, title, children: [] });
    } else if (heading.nodeName === 'H3' && headings.length > 0) {
      headings[headings.length - 1].children.push({
        id,
        title,
      });
    }
  });
  return headings;
};
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
export const shortenText = (text: string, upperbound?: number) => {
  if (text.length > (upperbound ? upperbound : 80)) {
    return text.split(' ').slice(0, 15).join(' ').replace(/\\n/g, ' ') + '...';
  } else {
    return text;
  }
};
// Shuffle algorithm similar to https://stackoverflow.com/a/2450976
export const shuffle = (array: MdxMetadataCard[]) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  let seed = 1;
  const random = function () {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  while (currentIndex != 0) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
export function sortCardList(data: MdxMetadataCard[]) {
  return data.sort((a, b) =>
    (a.dateModified ? a.dateModified : a.datePublished) > (b.dateModified ? b.dateModified : b.datePublished)
      ? -1
      : (a.dateModified ? a.dateModified : a.datePublished) < (b.dateModified ? b.dateModified : b.datePublished)
      ? 1
      : 0
  );
}
export const sortCards = (data: MdxMetadataCard[], sortValue: string, reverse: boolean, locale: Language) => {
  if (reverse) {
    if (sortValue === 'title') {
      return data.sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0));
    } else if (sortValue === 'topic') {
      return data.sort((a, b) => (a.topic > b.topic ? -1 : a.topic < b.topic ? 1 : 0));
    } else if (sortValue === 'field') {
      return data.sort((a, b) =>
        dictTopics[a.field as DictTopics].label[locale] > dictTopics[b.field as DictTopics].label[locale]
          ? -1
          : dictTopics[a.field as DictTopics].label[locale] < dictTopics[b.field as DictTopics].label[locale]
          ? 1
          : 0
      );
    } else if (sortValue === 'reading-time') {
      return data.sort((a, b) =>
        a.readingTime.time > b.readingTime.time ? -1 : a.readingTime.time < b.readingTime.time ? 1 : 0
      );
    } else if (sortValue === 'date') {
      return data.sort((a, b) =>
        (b.dateModified ? b.dateModified : b.datePublished) > (a.dateModified ? a.dateModified : a.datePublished)
          ? -1
          : (b.dateModified ? b.dateModified : b.datePublished) < (a.dateModified ? a.dateModified : a.datePublished)
          ? 1
          : 0
      );
    } else return data;
  } else {
    if (sortValue === 'title') {
      return data.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));
    } else if (sortValue === 'topic') {
      return data.sort((a, b) => (a.topic < b.topic ? -1 : a.topic > b.topic ? 1 : 0));
    } else if (sortValue === 'field') {
      return data.sort((a, b) =>
        dictTopics[a.field as DictTopics].label[locale] < dictTopics[b.field as DictTopics].label[locale]
          ? -1
          : dictTopics[a.field as DictTopics].label[locale] > dictTopics[b.field as DictTopics].label[locale]
          ? 1
          : 0
      );
    } else if (sortValue === 'reading-time') {
      return data.sort((a, b) =>
        a.readingTime.time < b.readingTime.time ? -1 : a.readingTime.time > b.readingTime.time ? 1 : 0
      );
    } else if (sortValue === 'date') {
      return data.sort((a, b) =>
        (b.dateModified ? b.dateModified : b.datePublished) < (a.dateModified ? a.dateModified : a.datePublished)
          ? -1
          : (b.dateModified ? b.dateModified : b.datePublished) > (a.dateModified ? a.dateModified : a.datePublished)
          ? 1
          : 0
      );
    } else return data;
  }
};
export const sortItemArray = (a: Item | ItemExtended, b: Item | ItemExtended) => {
  const itemA = a.label.toLowerCase();
  const itemB = b.label.toLowerCase();
  if (itemA < itemB) {
    return -1;
  }
  if (itemA > itemB) {
    return 1;
  }
  return 0;
};
export const translateValues = (
  propsMain: {
    items: Item | Item[] | null;
    handle(item: Item | Item[] | null): void;
  }[],
  locale: Language
) => {
  propsMain?.forEach((prop) => {
    if (Array.isArray(prop.items)) {
      const newItems: Item[] = [];
      prop.items?.forEach((item) => {
        newItems.push({ value: item.value, label: dictTopics[item.value as DictTopics].label[locale] });
      });
      prop.handle(newItems as Item[]);
    } else {
      prop.items && prop.handle({ value: prop.items?.value, label: dictKeys[prop.items?.value as DictKeys][locale] });
    }
  });
};
