// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW5KHTpVoNIU7JSe5tGD62dZNcz9Y0d0M",
  authDomain: "api-instagram-4b9fc.firebaseapp.com",
  databaseURL: "https://api-instagram-4b9fc-default-rtdb.firebaseio.com",
  projectId: "api-instagram-4b9fc",
  storageBucket: "api-instagram-4b9fc.appspot.com",
  messagingSenderId: "421174391866",
  appId: "1:421174391866:web:5a945faf5fb3d94fb3b103",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
// Nhận tham chiếu đến dịch vụ lưu trữ, được sử dụng để tạo tham chiếu trong bộ chứa lưu trữ của bạn
export const storage = getStorage(app);
