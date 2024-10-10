// types/messages.ts

export type MessagesType = {
    [key: string]: MessageFormat;
};

export interface CardData {
    name: string;
    subtitle: string;
    image: string;
}

export type MessageFormat = {
    technology: string;
    title: string;
    description: string;
    cards: CardData[];
    [key: string]: any;
};

