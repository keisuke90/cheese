"use client";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import InputImage from "./InputImage";
import { useGetImageUrl } from "@/hooks/useGetImageUrl";
import { FileWithPath, useDropzone } from "react-dropzone";
import styles from "./Picture.module.scss";

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

  const onDrop = useCallback((files: File[]) => {
    setImageFile(files[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const { imageUrl } = useGetImageUrl({ file: imageFile });

  return (
    <div className="flex justify-center">
      <div {...getRootProps()} className={`${styles.picture} dropzone`}>
        <label htmlFor={IMAGE_ID} className={styles.picture__label}>
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
            {...getInputProps()}
            ref={fileInputRef}
            id={IMAGE_ID}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Picture;
