import DeepPartial from "../types/DeepPartial";
import { Identifiable } from "../types/Identifiable";
import { OverriddenProperties, UniqueTo } from "../types/Utilities";
import { Firestore } from "firebase/firestore";
import { Clauses, Options } from "./find";
export type FindOneOrCreateFunctionGenerator = <T extends Identifiable>(db: Firestore, collectionPath: string | ((id: string) => string), _default?: T, options?: {
    debug: boolean;
}) => FindOneOrCreateFunction<T> | FindOneOrCreateFunctionWithArg<T>;
export type FindOneOrCreateFunction<T> = <S extends T = T>(clauses: Clauses<S>, data: DeepPartial<T> & UniqueTo<S, T> & OverriddenProperties<S, T>, options?: Options<S>) => Promise<S>;
export type FindOneOrCreateFunctionWithArg<T> = <S extends T = T>(parentId: string, clauses: Clauses<S>, data: DeepPartial<T> & UniqueTo<S, T> & OverriddenProperties<S, T>, options?: Options<S>) => Promise<S>;
export declare const findOneOrCreate: FindOneOrCreateFunctionGenerator;
