export type Item = {
  value: string;
  label: string;
};

export type ItemNum = {
  value: number;
  label: string;
};

export type ItemExtended = Item & {
  topic: string;
  description: string;
};

export type Breadcrumbs = {
  label: string;
  href: string;
};

export type BreadcrumbsJsonLd = {
  position: number;
  name: string;
  item: string;
};
