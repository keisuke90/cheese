import { useEffect, useState } from "react";

type Args = {
  file: File | null;
};

export const useGetImageUrl = ({ file }: Args) => {
  const [imageUrl, setImageURL] = useState("");

  useEffect(() => {
    if (!file) return;

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      const base64 = reader && reader.result;
      if (base64 && typeof base64 === "string") {
        setImageURL(base64);
      }
    };
    reader.readAsDataURL(file);

    return () => {
      reader = null;
    };
  }, [file]);

  return {
    imageUrl,
  };
};
