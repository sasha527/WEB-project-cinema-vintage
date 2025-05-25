// src/services/BookingService.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  arrayUnion
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcxd_B-j-I8d_fc50UZDN_xMYV8d_UKbK",
  authDomain: "cinema-vintage.firebaseapp.com",
  projectId: "cinema-vintage",
  storageBucket: "cinema-vintage.appspot.com",
  messagingSenderId: "481367907839",
  appId: "1:481367907839:web:edcdc631513f8316b39bca",
  measurementId: "G-30EWBF9Q46"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function bookingDocRef(movieId) {
  return doc(db, "bookings", String(movieId));
}

export const BookingService = {
  // Отримати масив вже заброньованих місць
  async getBookedSeats(movieId) {
    const ref = bookingDocRef(movieId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      // якщо доку немає — створюємо порожній
      await setDoc(ref, { seats: [] });
      return [];
    }
    return snap.data().seats || [];
  },

  // Додати нові місця (merge=true, щоб не перезаписати вже існуючі)
  async saveBooking(movieId, seats, userData = {}) {
    const ref = bookingDocRef(movieId);
    await setDoc(
      ref,
      {
        seats: arrayUnion(...seats.map(s => ({ row: s.row, num: s.num })))
      },
      { merge: true }
    );
  }
};
