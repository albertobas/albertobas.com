import ILink from 'src/components/utils/ILink';
import ProjectsIntro from 'src/components/utils/ProjecstIntro';
import { ILi, IOl, IUl } from 'src/components/utils/MDXLists';
import IImage from 'src/components/utils/IImage';
import IPre from 'src/components/utils/IPre';
import DataFrame from 'src/components/utils/DataFrame';

export const projectsComponents = {
  a: ILink,
  ProjectsIntro,
  IUl,
  ol: IOl,
  ILi,
  Image: IImage,
};

export const blogComponentsPre = {
  a: ILink,
  Image: IImage,
  pre: IPre,
  DataFrame,
};

export const blogComponents = {
  a: ILink,
  Image: IImage,
  DataFrame,
};
