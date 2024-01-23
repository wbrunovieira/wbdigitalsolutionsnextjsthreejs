// types/messages.ts

export interface CardData {
  name: string;
  subtitle: string;
  image: string;
  link: string;
}

export type MessageFormat = {
  [key: string]: string | CardData[];
};

export type MessagesType = {
  [key: string]: MessageFormat;
};
