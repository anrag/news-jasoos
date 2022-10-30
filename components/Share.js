export const share = (title, url, text, imgUrl) => {
  if (navigator.share) {
    navigator.share({
      title: `${title}`,
      //   files: [imgUrl],
      url: url,
      text: `${text.substring(0, 400)} \n\n
      \n
        पूरी कहानी पढ़ने के लिए 👇 क्लिक करें \n ${url} \n\n
         हमें इंस्टाग्राम पर फॉलो करें 🎉 - https://www.instagram.com/newsjasoos/ \n
        \n हमें ट्विटर पर फॉलो करें ❤️ - https://twitter.com/chaudhryAvneesh?lang=en `,
    });
  }
};
