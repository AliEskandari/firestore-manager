import { Firestore, Unsubscribe } from "firebase/firestore";
type FindByIdFunctionOptions<T> = {
    onUpdate: (data: T, unsubscribe: Unsubscribe) => void;
};
export type FindByIdFunctionGenerator = <T>(db: Firestore, collectionPath: string | ((id: string) => string)) => FindByIdFunction<T> | FindByIdFunctionWithArg<T>;
export type FindByIdFunction<T> = {
    <S extends T = T>(id?: string): Promise<S | null>;
    <S extends T = T>(id?: string, options?: FindByIdFunctionOptions<S>): Promise<[
        S | null,
        Unsubscribe | null
    ]>;
};
export type FindByIdFunctionWithArg<T> = {
    <S extends T = T>(parentId: string, id?: string): Promise<S | null>;
    <S extends T = T>(parentId: string, id?: string, options?: FindByIdFunctionOptions<S>): Promise<[S | null, Unsubscribe | null]>;
};
export declare const findById: FindByIdFunctionGenerator;
export type FindByIdWithCollectionPath = {
    <T>(db: Firestore, collectionPath: string, id?: string): Promise<T | null>;
    <T>(db: Firestore, collectionPath: string, id?: string, options?: FindByIdFunctionOptions<T>): Promise<[T | null, Unsubscribe | null]>;
};
export {};
