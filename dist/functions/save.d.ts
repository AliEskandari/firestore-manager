import { Identifiable } from "@/types/Identifiable";
import { DocumentData, Firestore } from "firebase/firestore";
export type SaveFunctionGenerator = <T extends DocumentData & Identifiable>(db: Firestore, collectionPath: string | ((id: string) => string)) => SaveFunction<T> | SaveFunctionWithArg<T>;
export type SaveFunction<T> = <S extends T = T>(data: S) => Promise<DocumentData>;
export type SaveFunctionWithArg<T> = <S extends T = T>(parentId: string, data: S) => Promise<DocumentData>;
export declare const save: SaveFunctionGenerator;
export declare const saveWithCollectionPath: <T extends DocumentData & Identifiable>(db: Firestore, collectionPath: string, data: T) => Promise<T & {
    updatedAt: string;
}>;
