import DeepPartial from "@/types/DeepPartial";
import { Identifiable } from "@/types/Identifiable";
import { OverriddenProperties, UniqueTo } from "@/types/Utilities";
import { Firestore } from "firebase/firestore";
export type CreateFunctionGenerator = <T extends Identifiable>(db: Firestore, collectionPath: string | ((id: string) => string), _default?: T, options?: {
    debug: boolean;
}) => CreateFunctionWithArg<T> | CreateFunction<T>;
export type CreateFunction<T> = <S extends T = T>(values: DeepPartial<T> & UniqueTo<S, T> & OverriddenProperties<S, T>) => Promise<S>;
export type CreateFunctionWithArg<T> = <S extends T = T>(parentId: string, values: Omit<T, keyof Identifiable> & Partial<Identifiable> & UniqueTo<S, T> & OverriddenProperties<S, T>) => Promise<S>;
export declare const create: CreateFunctionGenerator;
/**
 * Creates a document in the given collection. If the values contain an id, it will be used. Otherwise, a new id
 * will be generated. If the values contain a createdAt or updatedAt field, it will be overwritten. Otherwise,
 * the current time will be used. Values are merged with the default values.
 *
 * @param db The Firestore instance
 * @param collectionPath The path to the collection
 * @param values The values to create the document with
 * @param _default The default values to use if the values don't contain an id
 * @param options Options
 * @returns The created document
 */
export declare const createWithCollectionPath: <S extends T, T extends Identifiable>(db: Firestore, collectionPath: string, values: DeepPartial<T> & UniqueTo<S, T> & OverriddenProperties<S, T>, _default?: T, options?: {
    debug: boolean;
}) => Promise<S>;
