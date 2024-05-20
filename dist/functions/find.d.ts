import { Data, DotNotation, NonNullify } from "../types/Utilities";
import { Firestore } from "firebase/firestore";
export type FindFunctionGenerator = <T>(db: Firestore, collectionPath: string | ((id: string) => string)) => FindFunction<T> | FindFunctionWithArg<T>;
export type ClauseValue = Data | Data[];
export type Clauses<T> = Partial<Record<DotNotation<NonNullify<T>>, ClauseValue>>;
export type Options<T> = {
    /**
     * The field to sort by. Can be a path (e.g. 'auction.duration') or a simple property (e.g. 'title')
     */
    sortBy?: string;
    sortDirection?: "asc" | "desc";
    limit?: number;
    startAfter?: T[keyof T];
};
export type FindFunction<T> = <S extends T = T>(clauses?: Clauses<S>, options?: Options<S>) => Promise<S[]>;
export type FindFunctionWithArg<T> = <S extends T = T>(parentId: string, clauses?: Clauses<S>, options?: Options<S>) => Promise<S[]>;
export declare const find: FindFunctionGenerator;
export declare const findWithCollectionPath: <S>(db: Firestore, collectionPath: string, clauses?: Clauses<S>, options?: Options<S>) => Promise<S[]>;
