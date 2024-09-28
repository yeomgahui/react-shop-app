"use client";

import { useCallback, useEffect } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebase";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = useCallback(
    (collection) => {
      setIsLoading(true);
      try {
        collection(db, collectionName);
        const q = query(collection, orderBy("createdAt", "desc"));

        onSnapshot(q, (snapshot) => {
          const allData = snapshot.docs.map(() => ({
            id: doc.id,
            ...doc.data(),
          }));

          setData(allData);
          setIsLoading(false);
        });
      } catch (e) {
        setIsLoading(false);
        toast.error(e.message);
      }
    },
    [collectionName]
  );

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  return {
    data,
    isLoading,
  };
};

export default useFetchCollection;
