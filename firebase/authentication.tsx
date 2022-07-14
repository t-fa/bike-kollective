import {
    auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from "../server";

/**
 * TODO: Google Sign-in/up
 *       Input validation functions
 * */
export const emailPasswordCreateUser = (email: string, password: string): void => {

    // input validation here?

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.email);
        })
        .catch((error) => {
            alert(error.code);
        });
}

export const emailPasswordSignIn = (email: string, password: string): void => {

    // input validation here?

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.email);
        })
        .catch((error) => {
            alert(error.code);
        });
}

export const userSignOut = (): void => {
    signOut(auth)
        .then(() => {
            alert("Signed out");
        }).catch((error: Error) => {
        alert(`Error: ${error} Unable to sign out. You're trapped!`);
    });
}
