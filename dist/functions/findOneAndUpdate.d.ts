import { Identifiable } from "@/types/Identifiable";
import { Firestore, UpdateData } from "firebase/firestore";
import { Clauses, Options } from "./find";
export type FindOneAndUpdateFunctionGenerator = <T extends Identifiable>(db: Firestore, collectionPath: string | ((id: string) => string), options?: {
    debug: boolean;
}) => FindOneAndUpdateFunction<T> | FindOneAndUpdateFunctionWithArg<T>;
export type FindOneAndUpdateFunction<T> = <S extends T = T>(clauses: Clauses<S>, data: UpdateData<S>, findOptions?: Options<S>) => Promise<S | null>;
export type FindOneAndUpdateFunctionWithArg<T> = <S extends T = T>(parentId: string, clauses: Clauses<S>, data: UpdateData<S>, findOptions?: Options<S>) => Promise<S | null>;
export declare const findOneAndUpdate: FindOneAndUpdateFunctionGenerator;
