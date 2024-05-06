import { Data, DotNotation } from "@/types/Utilities";
import { Firestore } from "firebase/firestore";
export type FindAllFunctionGenerator = <T>(db: Firestore, collectionId: string) => FindAllFunction<T>;
export type ClauseValue = Data | Data[];
export type Clauses<T> = Partial<Record<DotNotation<T>, ClauseValue>>;
export type Options<T> = {
    /**
     * The field to sort by. Can be a path (e.g. 'auction.duration') or a simple property (e.g. 'title')
     */
    sortBy?: string;
    sortDirection?: "asc" | "desc";
    limit?: number;
    startAfter?: T[keyof T];
};
export type FindAllFunction<T> = <S extends T = T>(clauses?: Clauses<S>, options?: Options<S>) => Promise<S[]>;
export declare const findAll: FindAllFunctionGenerator;
export declare const findAllWithCollectionId: <S>(db: Firestore, collectionId: string, clauses?: Clauses<S>, options?: Options<S>) => Promise<S[]>;
