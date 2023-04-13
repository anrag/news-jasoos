// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

const   handler =  async (req, res) => {
  const getData = await axios.get("https://www.googleapis.com/blogger/v3/blogs/865689889082710590/posts?key=AIzaSyD7yScjzgXGJqc9ThMILfJggEi1Ty-layg&fetchImages=true&maxResults=50");
  res.status(200).json({ data: getData.data.items })
}

export default handler