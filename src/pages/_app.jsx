import "@/src/styles/index.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { firebase } from "../Firebase/config";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user.uid);
        try {
          const userRef = firebase.firestore().collection("users").doc(user.uid);
          const userDoc = await userRef.get();

          if (userDoc.exists) {
            setStudentData(userDoc.data());
            router.push("/Student");  // Redirect to /Student if student data is found
          } else {
            const teacherRef = firebase.firestore().collection("Teacher").doc(user.uid);
            const teacherDoc = await teacherRef.get();

            if (teacherDoc.exists) {
              setTeacherData(teacherDoc.data());
              router.push("/Teacher");  // Redirect to /Teacher if teacher data is found
            }
          }
        } catch (error) {
          console.error("Error checking user collections:", error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  console.log("user", user, "studentdata", studentData, "teacherdata", teacherData);

  return (
    <Component
      {...pageProps}
      user={user}
      studentData={studentData}
      teacherData={teacherData}
    />
  );
}
