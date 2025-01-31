import { fireApp } from "./app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

// Initialize database
const database = getFirestore(fireApp);

/**
 * create new Data
 *
 */

export const CreateDoc = async (col, data) => {
  await addDoc(collection(database, col), data);
};
/**
 * get All Data
 */
export const getAllDoc = async (col) => {
  // get data
  const data = await getDocs(collection(database, col));
  // store data
  let dataArry = [];

  data.forEach((item) => {
    dataArry.push({ ...item.data(), id: item.id });
  });
  // retrune
  return dataArry;
};
/**
 * Real Time Database Update
 */
export const RealTime = async (col, setData) => {
  onSnapshot(query(collection(database, col)), (snapShot) => {
    // console.log(snapShot.docs[0].data());
    let arryData = [];
    snapShot.docs.forEach((item) => {
      arryData.push({ ...item.data(), id: item.id });
    });
    setData(arryData);
  });
};

/**
 * dleteData
 */
export const delteData = async (col, id) => {
   await deleteDoc(doc(database, col, id));
};
/**
 * update data
 */
export const updateData = async (col, id , data) => {
   await updateDoc(doc(database, col, id), data);
};
