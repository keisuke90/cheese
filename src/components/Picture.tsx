"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import InputImage from "./InputImage";
import { useGetImageUrl } from "@/hooks/useGetImageUrl";

const IMAGE_ID = "imageId";

const Picture = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile = e.currentTarget.files[0];
      setImageFile(targetFile);
    }
  };

  const { imageUrl } = useGetImageUrl({ file: imageFile });

  return (
    <>
      <label
        htmlFor={IMAGE_ID}
        className="border-2 border-black border-dotted w-[210px] h-[210px] flex items-center justify-center rounded-lg overflow-hidden cursor-pointer"
      >
        {imageUrl && imageFile ? (
          <Image
            src={imageUrl}
            alt="アップロード画像"
            width={210}
            height={210}
            className="w-full h-full object-cover"
          />
        ) : (
          "+ 画像をアップロード"
        )}
        <InputImage
          ref={fileInputRef}
          id={IMAGE_ID}
          onChange={handleFileChange}
        />
      </label>
    </>
  );
};

export default Picture;
