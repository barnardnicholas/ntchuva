import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
// import { createUserDocument } from './users';

interface LoginWithEmailFormData {
  email: string;
  password: string;
}

const auth = getAuth();

export const signInWithEmail = async (formData: LoginWithEmailFormData) => {
  const { email, password } = formData;
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

interface SignUpWithEmailFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const signUpWithEmail = async (formData: SignUpWithEmailFormData) => {
  const { email, password, firstName, lastName } = formData;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: `${firstName} ${lastName}` });
  // await createUserDocument(user);
  return user;
};

export const signOutFromApp = async () => {
  await signOut(auth);
  return null;
};
