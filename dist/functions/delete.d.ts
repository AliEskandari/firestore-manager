import { Firestore } from "firebase/firestore";
export type DeleteFunctionGenerator = <T extends {
    id: string;
}>(db: Firestore, collectionPath: string | ((id: string) => string)) => DeleteFunctionWithArg<T> | DeleteFunction<T>;
export type DeleteFunction<T> = (id: string) => Promise<void>;
export type DeleteFunctionWithArg<T> = (parentId: string, id: string) => Promise<void>;
export declare const _delete: DeleteFunctionGenerator;
