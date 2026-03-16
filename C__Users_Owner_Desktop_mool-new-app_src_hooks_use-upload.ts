
'use client';

import { useFirestore, useStorage } from '@/firebase';
import { doc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { useUpload as useUploadContext } from '@/context/UploadProvider';

export function useUpload() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const storage = useStorage();
  const { addUpload, updateUploadProgress, finishUpload } = useUploadContext();

  const uploadFile = async <T extends Record<string, any>>(
    collectionName: string,
    data: T,
    file: File | null,
    fileMetadata: { fieldName: string; path: string } | null,
    docIdToUpdate?: string
  ) => {
    if (!firestore || !storage) {
      toast({ variant: 'destructive', title: 'Firebase not initialized.' });
      return;
    }
    
    const docRef = docIdToUpdate 
        ? doc(firestore, collectionName, docIdToUpdate)
        : doc(collection(firestore, collectionName));
    
    if (!file || !fileMetadata) {
        const dataToSet = docIdToUpdate ? data : { ...data, id: docRef.id };
        setDoc(docRef, dataToSet, { merge: true }).then(() => {
             toast({ title: 'Success', description: docIdToUpdate ? 'Record updated.' : 'Record created.' });
        }).catch((error) => {
            console.error("Error writing document without file:", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not save database entry.' });
        });
        return;
    }
    
    const uploadId = docRef.id;
    addUpload(uploadId, file.name);

    const storageRef = ref(storage, `${fileMetadata.path}/${docRef.id}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        updateUploadProgress(uploadId, progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        finishUpload(uploadId, 'error');
        toast({ variant: 'destructive', title: 'Upload Failed', description: error.message });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          const finalData: Record<string, any> = {
            ...data,
            [fileMetadata.fieldName]: downloadURL,
            storagePath: uploadTask.snapshot.ref.fullPath,
          };
          
          const dataToSet = docIdToUpdate ? finalData : { ...finalData, id: docRef.id };

          setDoc(docRef, dataToSet, { merge: true }).then(() => {
            finishUpload(uploadId, 'completed');
            toast({ title: 'Upload Complete!', description: `"${file.name}" has been successfully saved.` });
          }).catch(async (finalError) => {
             console.error("Failed to save document after upload:", finalError);
             toast({ variant: 'destructive', title: 'Processing Failed', description: 'File uploaded, but failed to save the record.' });
             finishUpload(uploadId, 'error');
             try {
                await deleteObject(storageRef);
             } catch (deleteErr) {
                console.error("Failed to clean up orphaned file:", deleteErr)
             }
          });
        }).catch(error => {
            console.error("Failed to get download URL:", error);
            finishUpload(uploadId, 'error');
        });
      }
    );
  };

  return { uploadFile };
}
