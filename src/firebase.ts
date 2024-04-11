import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCx0H7cT4hjPFW-1Xvdqcxu3T-5p8OUf5U",
  authDomain: "perfectdayschedule.firebaseapp.com",
  projectId: "perfectdayschedule",
  storageBucket: "perfectdayschedule.appspot.com",
  messagingSenderId: "805552895634",
  appId: "1:805552895634:web:07f8756bb5366f6672d84b",
  measurementId: "G-GC3JQG90CP",
  databaseURL: 'https://perfectdayschedule-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth(app);

interface Options {
  checkbox: string[]
  select: {
      [key: string]: string[]
  }
}

interface FormState {
  [key: string]: string | boolean
}

export function writeUserData(userId: string, name: string, email: string, options: Options) {
  const reference = ref(db, 'users/' + userId);
  
  set(reference, {
    username: name,
    email: email,
    user_schedule: options
  });

}

export function writeScheduleData(userId: string, date: string, schedule: FormState) {
  const reference = ref(db, 'users_tasks/' + `${userId}/` + date);
  
  set(reference, {
    user_day_schedule: schedule,
  });

}

export function writeScheduleColorData(userId: string, date: string, color: string) {
  const reference = ref(db, 'users_colors/' + `${userId}/` + date);
  
  set(reference, {
    color: color,
  });

}



