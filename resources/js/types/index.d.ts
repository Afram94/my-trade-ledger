export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Trade {
    id: number;
    stock_name: string;
    buy_price: number;
    sell_price: number;
    status: boolean;
    percentage: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        trade: Trade[]
    };
};
