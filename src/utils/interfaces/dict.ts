import { dictCB, dictDS, dictTopics, dictKeys } from 'src/utils/dict';

export type DictKeys = keyof typeof dictKeys;
export type DictDS = keyof typeof dictDS;
export type DictCB = keyof typeof dictCB;
export type DictTopics = keyof typeof dictTopics;
export type Section = 'blog' | 'projects';
export type Topic = 'crypto-blockchain' | 'data-science' | 'programming-languages' | 'frameworks-libraries';
