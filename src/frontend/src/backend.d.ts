import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type DisintegrateTokens = bigint;
export type BurnTransaction = [Time, BurnAmount];
export type Time = bigint;
export type BurnAmount = bigint;
export type Balance = [Principal, DisintegrateTokens];
export interface backendInterface {
    claimTokens(caller: Principal, burnAmount: bigint): Promise<void>;
    getAllBalances(): Promise<Array<Balance>>;
    getAllBalancesSorted(): Promise<Array<Balance>>;
    getAllBurnEvents(): Promise<Array<BurnTransaction>>;
    getAllBurnEventsByAmount(): Promise<Array<BurnTransaction>>;
    getBalance(_principal: Principal): Promise<DisintegrateTokens | null>;
    getBurnAmount(time: Time): Promise<BurnAmount>;
    getBurnEventsInRange(startTime: Time, endTime: Time): Promise<Array<BurnTransaction>>;
}
