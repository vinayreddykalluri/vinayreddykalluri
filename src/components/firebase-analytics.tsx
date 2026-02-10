"use client";

import { useEffect } from "react";
import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig: FirebaseOptions & { measurementId?: string } = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyBTZVZg8mgqZMS5Vo6IVMxfN7mhJnSGBzc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "vinayreddykalluri-afca8.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "vinayreddykalluri-afca8",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "vinayreddykalluri-afca8.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "872639556438",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:872639556438:web:cc99c18183d2a9c51344f7",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-S7PTW0PKLL",
};

function getFirebaseApp() {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
}

export function FirebaseAnalytics() {
  useEffect(() => {
    let active = true;

    isSupported()
      .then((supported) => {
        if (!supported || !active) {
          return;
        }

        const app = getFirebaseApp();
        getAnalytics(app);
      })
      .catch(() => {
        // Ignore analytics initialization errors to avoid impacting page render.
      });

    return () => {
      active = false;
    };
  }, []);

  return null;
}
