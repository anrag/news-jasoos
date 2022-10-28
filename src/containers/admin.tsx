import { Button, Form, Layout } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useState } from "react";

const AdminPanel = () => {
  const [headingCharLength, setHeadingCharLength] = useState(0);
  const [headingWordLength, setheadingWordLength] = useState(0);

  const [shortCharLength, setShortCharLength] = useState(0);
  const [shortCharWordLength, setshortCharWordLength] = useState(0);

  const [detailCharLength, setdetailCharLength] = useState(0);
  const [detailWordLength, setdetailWordLength] = useState(0);

  const headingLength = (e: any) => {
    setHeadingCharLength(e?.target?.value.length);
    setheadingWordLength(WordCount(e?.target?.value));
  };
  const shortLength = (e: any) => {
    setShortCharLength(e?.target?.value.length);
    setshortCharWordLength(WordCount(e?.target?.value));
  };
  const detailLength = (e: any) => {
    setdetailCharLength(e?.target?.value.length);
    setdetailWordLength(WordCount(e?.target?.value));
  };
  const saveNews = async (e: any) => {
    // console.log(e);
    await axios({
      method: "post",
      url: "https://dailycrimenews.in/addArticle",
      data: e,
    })
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
  };
  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
      }}
    >
      <h1>Add News</h1>
      <Form style={{ width: "80%" }} onFinish={saveNews}>
        <Form.Item name="Heading" label="Heading" rules={[{ required: true }]}>
          <TextArea
            rows={1}
            onChange={headingLength}
            placeholder="Add Heading"
          />
        </Form.Item>
        <p>
          Character count : {headingCharLength} | Character count :{" "}
          {headingWordLength}
        </p>
        <Form.Item
          name="imageurl"
          label="Image Url"
          rules={[{ required: true }]}
        >
          <TextArea rows={1} placeholder="Add Image Url" />
        </Form.Item>
        <Form.Item
          name={"short-detail"}
          label="60 Words"
          rules={[{ required: true, message: "des required" }]}
        >
          <TextArea
            onChange={shortLength}
            rows={2}
            placeholder="Add 60 Words Description..."
          />
        </Form.Item>
        <p>
          Character count : {shortCharLength} | Word count :{" "}
          {shortCharWordLength}
        </p>
        <Form.Item
          name={"detail"}
          label="detail desc"
          rules={[{ required: true, message: "details des required" }]}
        >
          <TextArea
            onChange={detailLength}
            rows={10}
            placeholder="Add Description..."
          />
        </Form.Item>
        <p>
          Character count : {detailCharLength} | Word count : {detailWordLength}
        </p>
        <Button htmlType="submit" type="dashed">
          Submit
        </Button>
      </Form>
    </Layout>
  );
};

export default AdminPanel;

function WordCount(str: any) {
  return str.split(" ").length;
}
