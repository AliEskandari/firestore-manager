export type OmitID<T> = Omit<T, "id">;
export type Tail<T extends any[]> = T extends [infer A, ...infer R] ? R : never;
export type Primitive = Data | null | undefined;
export type Data = string | number | bigint | boolean;
export type DotNotation<T, Parent extends string = "", Depth extends unknown[] = []> = {
    [K in keyof Required<T> & (string | number)]: Depth["length"] extends 5 ? never : Required<T>[K] extends Array<any> ? `${Parent}${K & string}` : Required<T>[K] extends Function ? never : Required<T>[K] extends object ? DotNotation<Required<T>[K], `${Parent}${K & string}.`, [
        unknown,
        ...Depth
    ]> : `${Parent}${K & string}`;
}[keyof Required<T> & (string | number)];
export type UniqueTo<S, T> = Omit<S, keyof T>;
export type OverriddenProperties<S, T> = Pick<S, {
    [P in keyof S & keyof T]: [T[P]] extends [S[P]] ? [S[P]] extends [T[P]] ? never : P : P;
}[keyof S & keyof T]>;
export type NonNullify<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};
