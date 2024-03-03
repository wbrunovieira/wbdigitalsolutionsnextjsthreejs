// types/messages.ts

import React from 'react';

export interface CardData {
  name: string;
  subtitle: string;
  image: string;
  link: string;
}
type StringMap = { [key: string]: string };
export type MessageFormat = {
  [key: string]:
    | string
    | CardData[]
    | string[]
    | undefined
    | React.ReactNode
    | StringMap
    | null
    | '';
};

export type MessagesType = {
  [key: string]: MessageFormat;
};
