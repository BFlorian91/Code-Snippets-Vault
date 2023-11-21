import { ref } from "vue";
import { auth } from "../services/firebase/firebase.config";
import { useAuthStore } from "../store/authStore";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

interface EmailAndPasswordUser {
  email: string;
  password: string;
}

export function useRegister() {
  const authStore = useAuthStore();
  const error = ref<string | null>(null);

  const registerWithEmailAndPassword = async (
    user: EmailAndPasswordUser,
  ): Promise<UserCredential | null> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );
      error.value = null;

      const idToken = await userCredential.user.getIdToken();
      authStore.login(idToken); // ou une autre action appropriée pour un nouvel utilisateur
      return userCredential;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Oops ! something went wrong";
      console.warn("Subscribe Error : ", err);
      return null;
    }
  };

  const loginWithGitHub = async (): Promise<UserCredential | null> => {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      error.value = null;

      const idToken = await userCredential.user.getIdToken();
      authStore.login(idToken);
      return userCredential;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Oops ! something went wrong";
      return null;
    }
  };

  return {
    error,
    loginWithGitHub,
    registerWithEmailAndPassword,
  };
}
