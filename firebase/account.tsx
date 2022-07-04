import {auth, createUserWithEmailAndPassword} from "./config";


/**
 * TODO: Google Sign-in/up
 * */
class Account {

    static emailPassWordSignUp(email: string, password: string): void {

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
}

export default Account;