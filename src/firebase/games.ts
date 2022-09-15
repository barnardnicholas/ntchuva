import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { GameState } from '../types/board';
import app from './config';

export const firestore = getFirestore(app);

export const createGameDocument = async (id: string, gameState: GameState) => {
  return setDoc(doc(firestore, 'games', id), gameState);
};

export const getGameDocument = async (id: string) => {
  const docRef = doc(firestore, 'games', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  return null;
};

export const writeGameDocument = (id: string, gameState: GameState) => {
  return setDoc(doc(firestore, 'games', id), gameState);
};

/**
 * Fetch a firestore user document once
 * @param user - user object from firebase/auth
 * @return data from firestore, or a blank document if it doesn't exist
 */
// export const fetchUserDocument = async (user: User) => {
//   const { uid } = user;
//   const docRef: DocumentReference = doc(firestore, 'users', uid);
//   const snapshot: DocumentSnapshot = await getDoc(docRef);
//   if (snapshot.exists()) return snapshot.data();
//   return blankUserDocument;
// };

/**
 * Subscribe to a user document
 * @param uid - uid of the user
 * @return userDocument, isFetching, fetchError
 */
// export const useUserDocument = (uid: string | undefined) => {
//   const [userDocument, handleChange, setUserDocument] = useForm<UserDocument>(blankUserDocument);

//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [isFetching, setIsFetching] = useState<boolean>(true);
//   const [fetchError, setFetchError] = useState<FirestoreError | null>(null);

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//     setIsEditing(false);
//     const docRef = doc(firestore, 'users', uid || '');
//     setDoc(docRef, userDocument);
//   };

//   useEffect(() => {
//     setIsFetching(true);
//     setFetchError(null);
//     const docRef = doc(firestore, 'users', uid || '');
//     const unsubscribe = onSnapshot(
//       docRef,
//       snapshot => {
//         if (snapshot.exists()) {
//           setIsFetching(false);
//           setFetchError(null);
//           setUserDocument(snapshot.data() as UserDocument);
//         }
//       },
//       error => {
//         setIsFetching(false);
//         setFetchError(error);
//         console.error(`Failed to fetch snapshot for uid ${uid}`, error);
//       },
//     );
//     return () => unsubscribe();
//     /* eslint-disable */
//   }, [uid]);
//   /* eslint-enable */

//   return {
//     userDocument,
//     isFetching,
//     fetchError,
//     isEditing,
//     setIsEditing,
//     handleChange,
//     handleSubmit,
//   };
// };
