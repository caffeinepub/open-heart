import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Entry {
    id: bigint;
    nickname?: string;
    mood: Mood;
    text: string;
    response: string;
    timestamp: Time;
}
export type Time = bigint;
export enum Mood {
    sad = "sad",
    anxious = "anxious",
    happy = "happy",
    okay = "okay",
    overwhelmed = "overwhelmed"
}
export interface backendInterface {
    addEntry(nickname: string | null, mood: Mood, text: string): Promise<bigint>;
    deleteEntry(id: bigint): Promise<void>;
    getEntriesByNickname(nickname: string): Promise<Array<Entry>>;
    getEntryCount(): Promise<bigint>;
    getRecentEntries(): Promise<Array<Entry>>;
}
