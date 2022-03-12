import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useMobileContext } from 'src/utils/context/MobileProvider';
import { Language } from 'src/utils/interfaces/languages';
import { canonical } from 'src/utils/constants';
import { dictTopics, dictKeys } from 'src/utils/dict';
import { Breadcrumbs, Item, BreadcrumbsJsonLd } from 'src/utils/interfaces/architecture';
import { DictTopics, DictKeys } from 'src/utils/interfaces/dict';
import { join } from 'path';

export const useBreadcrumbs = (pageTitle?: string) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs[] | null>(null);
  const [breadcrumbsJsonLd, setBreadcrumbsJsonLd] = useState<BreadcrumbsJsonLd[] | null>(null);
  const getBreadcrumb = useCallback(
    (value: string) => {
      return Object.keys(dictKeys).includes(value)
        ? dictKeys[value as DictKeys][router.locale as Language]
        : pageTitle
        ? pageTitle.replace(/\\n/g, ' ')
        : value.replace(/-|_/g, ' ');
    },
    [pageTitle, router.locale]
  );
  useEffect(() => {
    if (router) {
      const crumbsArr = router.asPath.split('/');
      crumbsArr.shift();
      const breadcrumbsArray: Breadcrumbs[] = [];
      const breadcrumbsJsonLdArray: BreadcrumbsJsonLd[] = [];
      crumbsArr.map((crumb, i) => {
        const label = getBreadcrumb(crumb);
        const href = join('/', ...crumbsArr.slice(0, i + 1));
        breadcrumbsArray.push({ label: label, href: href });
        breadcrumbsJsonLdArray.push({
          position: i + 1,
          name: label,
          item: canonical + '/' + href,
        });
      });
      setBreadcrumbs(breadcrumbsArray);
      setBreadcrumbsJsonLd(breadcrumbsJsonLdArray);
    }
  }, [router, getBreadcrumb]);
  return { breadcrumbs, breadcrumbsJsonLd };
};

export const useCloseMobile = () => {
  const { setMobileMenu } = useMobileContext();
  useEffect(() => {
    setMobileMenu(false);
  }, [setMobileMenu]);
};

export function useFilterArray(isDictKeys?: boolean) {
  const locale = useLocale();
  const [filter, setFilter] = useState<Item[] | null>(null);
  const itemString = filter?.map((item) => item.value).join(',');
  const translate = useCallback(() => {
    if (itemString) {
      const itemsArray = itemString.split(',');
      if (itemsArray.length > 1) {
        const newItems: Item[] = [];
        itemsArray?.forEach((item) => {
          newItems.push({
            value: item,
            label: isDictKeys ? dictKeys[item as DictKeys][locale] : dictTopics[item as DictTopics].label[locale],
          });
        });
        setFilter(newItems);
      } else {
        setFilter([
          {
            value: itemsArray[0],
            label: isDictKeys
              ? dictKeys[itemsArray[0] as DictKeys][locale]
              : dictTopics[itemsArray[0] as DictTopics].label[locale],
          },
        ] as Item[]);
      }
    } else {
      setFilter(null);
    }
  }, [itemString, isDictKeys, locale]);
  useEffect(() => {
    translate();
  }, [translate, locale]);
  return [filter, setFilter] as [Item[] | null, Dispatch<SetStateAction<Item[] | null>>];
}

export function useFilter() {
  const locale = useLocale();
  const [filter, setFilter] = useState<Item | null>(null);
  const itemString = filter?.value;
  const translate = useCallback(() => {
    if (itemString) {
      setFilter({ value: itemString, label: dictTopics[itemString as DictTopics].label[locale] } as Item);
    } else {
      setFilter(null);
    }
  }, [itemString, locale]);
  useEffect(() => {
    translate();
  }, [translate, locale]);
  return [filter, setFilter] as [Item | null, Dispatch<SetStateAction<Item | null>>];
}

export function useFilterSort() {
  const locale = useLocale();
  const [filter, setFilter] = useState<Item | null>(null);
  const itemString = filter?.value;
  const translate = useCallback(() => {
    if (itemString) {
      setFilter({ value: itemString, label: dictKeys[itemString as DictKeys][locale] } as Item);
    } else {
      setFilter(null);
    }
  }, [itemString, locale]);
  useEffect(() => {
    translate();
  }, [translate, locale]);
  return [filter, setFilter] as [Item | null, Dispatch<SetStateAction<Item | null>>];
}

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => setIsMounted(true), []);
  return isMounted;
};

export function useLocale(): Language {
  const { locale } = useRouter();
  return locale as Language;
}

export function useLocales() {
  const { locales } = useRouter();
  return locales as string[];
}

export function useDelayedRender(active: boolean) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  useEffect(() => {
    if (active) {
      const timeout = setTimeout(() => setIsRendered(true), 100);
      setIsMounted(true);
      return () => clearTimeout(timeout);
    } else {
      setIsMounted(false);
      setIsRendered(false);
    }
  }, [active]);
  return { isMounted, isRendered };
}
