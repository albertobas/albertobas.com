import { default as tippyCore, Instance, Props, Placement } from 'tippy.js';

type SingletonHookArgs = {
  instance: Instance;
  content: React.ReactNode;
  props: Props;
};

export type SingletonObject = {
  data?: any;
  hook(args: SingletonHookArgs): void;
};
