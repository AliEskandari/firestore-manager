import { DocumentData, Firestore, UpdateData } from "firebase/firestore";
export type UpdateFunctionGenerator = <T extends DocumentData>(db: Firestore, collectionPath: string | ((id: string) => string)) => UpdateFunction<T> | UpdateFunctionWithArg<T>;
export type UpdateFunction<T> = <S extends T = T>(id: string, data: UpdateData<S>) => Promise<DocumentData>;
export type UpdateFunctionWithArg<T> = <S extends T = T>(parentId: string, id: string, data: UpdateData<S>) => Promise<DocumentData>;
export declare const update: UpdateFunctionGenerator;
/**
 * Update a document in a collection.  This function will throw
 * an error if the document does not exist.
 * @param id The id of the document to update
 * @param data The data to update the document with
 * An object containing the fields and values with which to update the
 * document. Fields can contain dots to reference nested fields within
 * the document.
 * @returns A Promise resolved with the updated doc once the data has been
 * successfully written to the backend (note that it won't resolve
 * while you're offline).
 * @throws If the document does not exist
 */
export declare const updateWithCollectionPath: <T extends DocumentData>(db: Firestore, collectionPath: string, id: string, data: UpdateData<T>) => Promise<UpdateData<T> & {
    updatedAt: string;
}>;
