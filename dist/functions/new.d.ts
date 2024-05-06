import { Identifiable } from "@/types/Utility/Identifiable";
import { OverriddenProperties, UniqueTo } from "@/types/utilities";
import { Firestore } from "firebase/firestore";
export type NewFunctionGenerator = <T extends Identifiable>(db: Firestore, collectionPath: string | ((id: string) => string), _default?: T, options?: {
    debug: boolean;
}) => NewFunction<T> | NewFunctionWithArg<T>;
export type NewFunction<T> = {
    (data?: Partial<T>): T;
    <S extends T>(data: Partial<S> & UniqueTo<S, T> & OverriddenProperties<S, T>): S;
};
export type NewFunctionWithArg<T> = {
    (parentId: string, data?: Partial<T>): T;
    <S extends T>(parentId: string, data: Partial<S> & UniqueTo<S, T> & OverriddenProperties<S, T>): S;
};
export declare const _new: NewFunctionGenerator;
/**
 *
 * @param db The Firestore instance
 * @param collectionPath The path to the collection
 * @param data The data to use for the new document (optional)
 * @param _default The default values to use for the new document (optional)
 * @param options Options for the function (optional)
 * @returns
 */
export declare const newWithCollectionPath: <S extends T, T extends Identifiable>(db: Firestore, collectionPath: string, data: Partial<T> | undefined | (Partial<S> & UniqueTo<S, T> & OverriddenProperties<S, T>), _default?: T, options?: {
    debug: boolean;
}) => (T & undefined) | (T & Partial<T>) | (T & Partial<S> & UniqueTo<S, T> & OverriddenProperties<S, T>);
