import axios from "axios";
import { useState } from "react";
import HTMLEditor from "../components/Html";
import { gql, useMutation } from "@apollo/client";

const Admin = () => {
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
  const [shortDesc, setShortDesc] = useState(null);
  const [longDesc, setLongDesc] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const changeContent = (e) => {
    setLongDesc(e);
  };

  const onSubmit = () => {
    console.log({
      title,
      shortDesc,
      longDesc,
      featuredImage,
    });
    mutateFunction({
      variables: {
        title: title,
        longArticle: longDesc,
        featureImage: featuredImage,
        secondaryImage: featuredImage,
        shortArticle: shortDesc,
        featureVideo: featuredImage,
        published: true,
      },
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
      console.log(res.data.Location);
      setFeaturedImage(res.data.Location);
    });
  };

  return (
    <>
      <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div>
            <img
              class="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Write News
            </h2>
          </div>
          <form class="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
              <div>
                <textarea
                  id="email-address"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="title"
                />
              </div>
            </div>

            <div>
              <textarea
                required
                onChange={(e) => setShortDesc(e.target.value)}
                class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter Short detail"
              />
            </div>

            <div>
              <HTMLEditor changeContent={changeContent} />
            </div>

            <div>
              <input type="file" accept="image/*" onChange={onImageChange} />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <label
                  for="remember-me"
                  class="ml-2 block text-sm text-gray-900"
                >
                  {featuredImage ? `Image URL- ` + featuredImage : ""}
                </label>
              </div>
            </div>

            <div>
              <button
                onClick={onSubmit}
                type="submit"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin;
