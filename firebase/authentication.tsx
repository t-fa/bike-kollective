import {
    auth, provider,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
    signInWithRedirect, getRedirectResult, collection, db, addDoc,
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

export const googleSignIn = async () => {


    // Start a signin process for an unauthenticated user.
    await signInWithRedirect(auth, provider);
    alert("before get redirect");
    const result = await getRedirectResult(auth);
    alert(result?.user.email);
    if (result) {

        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        const user = result?.user;
        await createUserDocument(user?.email);


        // As this API can be used for sign-in, linking and reauthentication,
        // check the operationType to determine what triggered this redirect
        // operation.
        //const operationType = result.operationType;
    }

    /*getRedirectResult(auth)
        .then((result) => {


            // do something if result is null
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore

        }).catch((error) => {
        console.log("ERROR??");
        const errorCode = error.code;
        const errorMessage = error.message;

        // The email of the user's account used.
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        // do stuff?
    });*/
}


export const createUserDocument = async (email: string | null | undefined) => {
    try {
        const coll = collection(db, '/users');
        const docRef = await addDoc(coll, {
            first: email
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}