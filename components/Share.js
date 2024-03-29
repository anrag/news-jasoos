import { message } from "antd";

export const share = async (title, url, text, imgUrl) => {
  message.destroy();
  console.log(`https://newsjasoos.in${url}`);
  message.loading("✋ कृपया प्रतीक्षा करें ✋");
  // Convert dataUrl into blob using browser fetch API
  // const blob = await (await fetch(imgUrl)).blob();

  // Create file form the blob
  // const image = new File([blob], "canvas.png", { type: blob.type });
  if (navigator.share) {
    navigator.share({
      title: `${title}`,
      // files: [image],
      url: `https://newsjasoos.in${url}`,
      text: `${text.substring(0, 400)} \n
        पूरी खबर पढ़ने के लिए 👇 क्लिक करें \n`,
    });
    message.destroy();
  }
};
