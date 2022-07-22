import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server';

// https://cloud.google.com/firestore/docs/query-data/get-datad

export const getAllBikes = async () => {
  const docRef = doc(db, 'bikes');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
};
