import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

const useFetchDocument = (collectionName, documentID) => {
  const [document, setDocument] = useState(null);

  const getDocument = useCallback(async () => {
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      setDocument(obj);
    } else {
      toast.error("Document not found");
    }
  }, [collectionName, documentID]);

  useEffect(() => {
    getDocument();
  }, [getDocument]);

  return { document };
};

export default useFetchDocument;
