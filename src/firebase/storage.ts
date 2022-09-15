import { FirebaseError } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage';
import app from './config';

const storage = getStorage(app);

export function uploadProfileImage(
  userId: string,
  file: File,
  cb: (snapshot: UploadTaskSnapshot) => void,
) {
  return new Promise((resolve, reject) => {
    const filePath = `/users/${userId}/profile-image`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      cb,
      (error: FirebaseError) => {
        // Handle unsuccessful uploads
        console.error(error);
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        });
      },
    );
  });
}

export async function getProfileImageURL(userId: string) {
  const filePath = `/users/${userId}/profile-image`;
  const storageRef = ref(storage, filePath);
  const url = await getDownloadURL(storageRef);
  return url;
}
