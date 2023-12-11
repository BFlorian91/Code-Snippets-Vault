import { describe, it, expect, vi, beforeAll } from "vitest";
import { useRegister } from "../useRegister";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { createPinia } from "pinia";
import { setActivePinia } from "pinia";

beforeAll(() => {
  setActivePinia(createPinia());
});
// Mocking Firebase Auth functions
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(),
  updateProfile: vi.fn(),

  // Ajoutez d'autres fonctions Firebase mockées ici si nécessaire
}));

// Mocking Pinia store
vi.mock("../store/authStore", () => ({
  useAuthStore: () => ({
    login: vi.fn(),
    // Ajoutez d'autres méthodes ou propriétés mockées si nécessaire
  }),
}));

describe("useRegister", () => {
  it("registers a user with email and password successfully", async () => {
    // Configurer le mock pour simuler une réponse réussie
    const mockUserCredential = {
      user: {
        email: "test@example.com",
        displayName: "testuser",
        password: "password",
      },
    }; // Adaptez ceci selon vos besoins
    vi.mocked(createUserWithEmailAndPassword).mockResolvedValue(
      mockUserCredential as unknown as UserCredential,
    );

    const { registerWithEmailAndPassword } = useRegister();
    const result = await registerWithEmailAndPassword({
      email: "test@example.com",
      username: "testuser",
      password: "password",
    });
    console.log("the result " + result?.user?.displayName);
    expect(result).toEqual(mockUserCredential);
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it("handles errors when registering a user with email and password", async () => {
    // Configurer le mock pour simuler une erreur
    const mockError = new Error("Error in createUserWithEmailAndPassword");
    vi.mocked(createUserWithEmailAndPassword).mockRejectedValue(mockError);

    const { registerWithEmailAndPassword, error } = useRegister();
    const result = await registerWithEmailAndPassword({
      email: "test@example.com",
      username: "testuser",
      password: "password",
    });

    expect(result).toBeNull();
    expect(error.value).toBe(mockError.message);
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  // Ajoutez plus de tests pour `loginWithGitHub` et autres cas si nécessaire
});
