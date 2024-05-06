import { Firestore } from "firebase/firestore";
import { Clauses, Options } from "./find";
import { Identifiable } from "@/types/Utility/Identifiable";
export type DeleteManyFunctionGenerator = <T extends Identifiable>(db: Firestore, collectionPath: string | ((id: string) => string)) => DeleteManyFunctionWithArg<T> | DeleteManyFunction<T>;
export type DeleteManyFunction<T> = (clauses?: Clauses<T>, options?: Options<T>) => Promise<void>;
export type DeleteManyFunctionWithArg<T> = (parentId: string, clauses?: Clauses<T>, options?: Options<T>) => Promise<void>;
export declare const deleteMany: DeleteManyFunctionGenerator;
