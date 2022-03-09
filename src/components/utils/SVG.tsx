import {
  SiGithub,
  SiGooglecolab,
  SiJavascript,
  SiJupyter,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSolidity,
  SiTypescript,
} from 'react-icons/si';
import {
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaExchangeAlt,
  FaLinkedin,
  FaLongArrowAltRight,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { FiSliders } from 'react-icons/fi';
import {
  BiWindow,
  BiWindows,
  BiChevronRight,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronsLeft,
  BiLink,
} from 'react-icons/bi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GoSearch } from 'react-icons/go';
import {
  BsPencilFill,
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortDown,
  BsSortNumericDown,
  BsSortNumericUp,
  BsSortUp,
} from 'react-icons/bs';
import { memo } from 'react';

type Props = {
  icon: IconList;
  isTitle?: boolean;
  dim?: {
    height: number;
    width: number;
  };
  rotate?: number;
};

export default memo(function SVG({ icon, dim, rotate }: Props) {
  const iconObject = dictIcons[icon];
  return (
    <>
      {Object.keys(dictIcons).includes(icon) && (
        <iconObject.icon
          style={{
            height: `${dim ? dim.height : '1'}em`,
            width: `${dim ? dim.width : '1'}em`,
            transform: `rotate(${rotate ? rotate : 0}deg)`,
            fill: 'currentcolor',
          }}
        />
      )}
    </>
  );
});
export type IconList = keyof typeof dictIcons;
export const dictIcons = {
  arrowRight: { icon: FaArrowRight, name: '' },
  chevronDown: { icon: FaChevronDown, name: '' },
  chevronLeft: { icon: BiChevronLeft, name: '' },
  chevronRight: { icon: BiChevronRight, name: '' },
  chevronLeftDouble: { icon: BiChevronsLeft, name: '' },
  chevronRightDouble: { icon: BiChevronsRight, name: '' },
  chevronUp: { icon: FaChevronUp, name: '' },
  clock: { icon: AiOutlineClockCircle, name: '' },
  colab: { icon: SiGooglecolab, name: 'Google Colab' },
  email: { icon: HiMail, name: '' },
  exchange: { icon: FaExchangeAlt, name: '' },
  github: { icon: SiGithub, name: 'GitHub' },
  javascript: { icon: SiJavascript, name: 'Javascript' },
  jupyter: {
    icon: SiJupyter,
    name: 'Jupyter',
  },
  link: { icon: BiLink, name: '' },
  linkedin: { icon: FaLinkedin, name: '' },
  longArrowAltRight: { icon: FaLongArrowAltRight, name: '' },
  moon: { icon: FaMoon, name: '' },
  pen: { icon: BsPencilFill, name: '' },
  python: {
    icon: SiPython,
    name: 'Python',
  },
  react: {
    icon: SiReact,
    name: 'React',
  },
  search: { icon: GoSearch, name: '' },
  'scikit-learn': {
    icon: SiScikitlearn,
    name: 'Scikit-learn',
  },
  slider: { icon: FiSliders, name: '' },
  solidity: { icon: SiSolidity, name: 'Solidity' },
  sortAlphaDown: { icon: BsSortAlphaDown, name: '' },
  sortAlphaUp: { icon: BsSortAlphaUp, name: '' },
  sortNumDown: { icon: BsSortNumericDown, name: '' },
  sortNumUp: { icon: BsSortNumericUp, name: '' },
  sortDown: { icon: BsSortDown, name: '' },
  sortUp: { icon: BsSortUp, name: '' },
  sun: { icon: FaSun, name: '' },
  typescript: { icon: SiTypescript, name: 'Typescript' },
  windowMaximize: { icon: BiWindow, name: '' },
  windowRestore: { icon: BiWindows, name: '' },
};
