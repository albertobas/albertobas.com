import ILink from 'src/components/utils/ILink';
import ProjectsIntro from 'src/components/utils/ProjecstIntro';
import { ILi, IOl, IUl } from 'src/components/utils/MDXLists';
import IImage from 'src/components/utils/IImage';
import IPre from 'src/components/utils/IPre';
import CellOut from 'src/components/utils/CellOut';
import DataFrame from 'src/components/utils/DataFrame';

export const componentsProjects = {
  a: ILink,
  ProjectsIntro,
  IUl,
  ol: IOl,
  ILi,
  Image: IImage,
};

export const componentsBlogLong = {
  a: ILink,
  Image: IImage,
  pre: IPre,
  DataFrame,
};

export const componentsBlog = {
  a: ILink,
  Image: IImage,
  DataFrame,
};

export const componentsBlogDSLong = {
  a: ILink,
  Image: IImage,
  pre: IPre,
  DataFrame,
  CellOut,
};

export const componentsBlogDS = {
  a: ILink,
  Image: IImage,
  DataFrame,
  CellOut,
};
