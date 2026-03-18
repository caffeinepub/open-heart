import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Win {
    id: bigint;
    text: string;
    response: string;
    timestamp: Time;
    category?: Category;
}
export enum Category {
    social = "social",
    justToday = "justToday",
    school = "school",
    personal = "personal",
    health = "health"
}
export interface backendInterface {
    addWin(text: string, category: Category | null): Promise<bigint>;
    deleteWin(id: bigint): Promise<void>;
    getRecentWins(): Promise<Array<Win>>;
    getWinCount(): Promise<bigint>;
    getWinsByCategory(category: Category): Promise<Array<Win>>;
}
