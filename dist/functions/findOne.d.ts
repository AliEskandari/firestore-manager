import { Firestore } from "firebase/firestore";
import { Clauses, Options } from "./find";
export type FindOneFunctionGenerator = <T>(db: Firestore, collectionPath: string | ((id: string) => string)) => FindOneFunction<T> | FindOneFunctionWithArg<T>;
export type FindOneFunction<T> = <S extends T = T>(clauses?: Clauses<S>, options?: Options<S>) => Promise<S | null>;
export type FindOneFunctionWithArg<T> = <S extends T = T>(parentId: string, clauses?: Clauses<S>, options?: Options<S>) => Promise<S | null>;
export declare const findOne: FindOneFunctionGenerator;
