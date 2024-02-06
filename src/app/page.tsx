"use client";

import Picture from "@/components/Picture";
import html2canvas from "html2canvas";

export default function Home() {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const canvas = await html2canvas(
        document.querySelector("#capture") as HTMLElement
      );
      const img = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = img;
      a.download = "image.png";
      a.click();
    } catch (error) {
      console.error("画像のキャプチャに失敗しました", error);
    }
  };

  return (
    <main className="flex justify-center flex-col ">
      <div className="my-10">
        <div id="capture">
          <Picture />
        </div>
      </div>
      <button onClick={handleClick}>output</button>
    </main>
  );
}
