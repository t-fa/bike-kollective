import {
    auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from "../server";

/**
 * TODO: Google Sign-in/up
 * */
class Account {

    static emailPasswordCreateUser(email: string, password: string): void {

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

    static emailPasswordSignIn(email: string, password: string): void {

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

    static signOut(): void {
        signOut(auth)
            .then(() => {
                alert("Signed out");
            }).catch((error: Error) => {
                alert(`Error: ${error} Unable to sign out. You're trapped!`);
        });
    }
}

export default Account;