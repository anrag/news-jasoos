import axios from "axios";
import { useEffect, useState } from "react";
import HTMLEditor from "../components/Html";
import { gql, useMutation } from "@apollo/client";
import { message, Select } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetchCategory } from "../utils/utils";
const { Option } = Select;
const Admin = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchCategory().then((res) => {
      console.log(res);
      setCategory(res);
    });
  }, []);
  const router = useRouter();
  const ADD_ARTICLE = gql`
    # Increments a back-end counter and gets its resulting value
    mutation addArticle(
      $title: String!
      $longArticle: String!
      $featureImage: String!
      $secondaryImage: String!
      $shortArticle: String!
      $featureVideo: String!
      $published: Boolean!
    ) {
      addArticle(
        input: {
          title: $title
          longArticle: $longArticle
          category: $remoteCategory
          featureImage: $featureImage
          secondaryImage: $secondaryImage
          shortArticle: $shortArticle
          featureVideo: $featureVideo
          published: $published
        }
      ) {
        title
      }
    }
  `;
  const [mutateFunction, { data, loading, error }] = useMutation(ADD_ARTICLE);
  const [title, setTitle] = useState(null);
  const [remoteCategory, setRemoteCategory] = useState(null);
  const [shortDesc, setShortDesc] = useState(null);
  const [longDesc, setLongDesc] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const changeContent = (e) => {
    setLongDesc(e);
  };

  const onSubmit = async () => {
    mutateFunction({
      variables: {
        title: title,
        longArticle: longDesc,
        category: remoteCategory,
        featureImage: featuredImage,
        secondaryImage: featuredImage,
        shortArticle: shortDesc,
        featureVideo: featuredImage,
        published: true,
      },
    }).then((res) => {
      console.log(res);
      message.destroy();
      message.success("Published Successfully");
      router.push("/");
    });
  };
  const onImageChange = (e) => {
    const url = "https://my.usacricket.org/fileupload/uploadImage";
    const formData = new FormData();
    formData.append("productimage", e?.target?.files[0]);
    formData.append("name", new Date().getTime());
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios({
      url,
      method: "post",
      data: formData,
    }).then((res) => {
      setFeaturedImage(res.data.Location);
    });
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Write News
            </h2>
          </div>

          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <textarea
                id="email-address"
                onChange={(e) => setTitle(e.target.value)}
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="title"
              />
            </div>
          </div>

          <div>
            <textarea
              required
              onChange={(e) => setShortDesc(e.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter Short detail"
            />
          </div>

          <div>
            <HTMLEditor changeContent={changeContent} />
          </div>

          <div>
            <input type="file" accept="image/*" onChange={onImageChange} />
          </div>
          <div className="flex p-1 items-center justify-center">
            <h1 style={{ paddingRight: 10 }}>Select Category - </h1>
            <div>
              <Select
                defaultValue="Select Category"
                style={{ width: 220 }}
                onChange={(e) => setRemoteCategory(e)}
              >
                {category.length > 0 &&
                  category.map((e, id) => (
                    <Option key={e.id} value={e.name}>
                      {e.name}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {featuredImage && (
                <Image
                  src={featuredImage}
                  width={190}
                  height={190}
                  alt="upload"
                />
              )}
            </div>
          </div>

          {featuredImage && remoteCategory && (
            <div>
              <button
                onClick={onSubmit}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
