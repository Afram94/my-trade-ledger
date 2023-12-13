export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Trade {
    id: number;
    /* trade_type_id: number; */
    /* trade_type: TradeType[]; */
    calculatedProfitLoss: number;
    initial_capital: number;
    calculationResult: any;
    stock_name: string;
    buy_price: number;
    sell_price: number;
    status: boolean;
    percentage: number;
}

export interface TradeType {
    id: number;
    name: string;
    calculationResult: any
    initial_capital: number;
    uses_compounding_interest: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        trade: Trade[];
        trade_type: TradeType[];
        totalProfitLoss?: number;
    };
};
