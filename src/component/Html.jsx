import React from "react";
import Form from "antd/es/form";
import Select from "antd/es/select";
import Input from "antd/es/input";
import ReactQuill from "react-quill";

import sanitizeHTML from "sanitize-html";

import "react-quill/dist/quill.snow.css";

const { Option } = Select;
const { TextArea } = Input;

const initialValueFR =
  '<h2><strong>Bienvenue sur notre site!</strong></h2><p><strong>Ajoutez ici le texte d\'introduction</strong> de votre organisation et de votre site. Présentez-vous et énoncez vos objectifs à travers votre plateforme de sociofinancement.</p><p>Vous pouvez <a href="https://www.youtube.com/" target="_blank" style="color: var(--link-color);">ajouter des liens</a>.</p><p><em>Et même des listes!</em></p><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul><p><span style="color: rgb(0, 71, 178);">Merci de soutenir ARMU et L\'Achoppe!</span></p>';
const initialValueEN =
  '<h2><strong>Welcome to ARMU\'s site!</strong></h2><p><strong>Use this space to introduce your organization</strong> &nbsp;and your site. What are your goals through this crowdfunding platform?</p><p>You can format text and add <a href="https://www.youtube.com" rel="noopener noreferrer" target="_blank">redirection links</a>.</p><p><em>You can even list stuff!</em></p><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul><p><span style="color: rgb(0, 102, 204);">Thank you for supporting ARMU and l\'Achoppe!</span></p>';

class WysiwygQuill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValue: initialValueFR,
    };
  }

  componentDidMount() {
    console.log("mounted");
  }

  wrapText = (text) => {
    if (text && typeof text === "string") {
      const badEnding = ["<p></p>", "<p><br></p>", "<p><br/></p>"];

      // Remove trailing carriage return and/or nexline generated by the OS
      text = text.replace(/\n$|\r$|\n\r$|\r\n$/, "");

      if (!text.startsWith("<") && !text.endsWith(">"))
        text = "<p>" + text.trim() + "</p>";

      badEnding.forEach((end) => {
        while (text.endsWith(end)) {
          text = text.substring(0, text.length - end.length);
        }
      });

      const lastSpace = [
        "</p>",
        "</h1>",
        "</h2>",
        "</h3>",
        "</h4>",
        "</h5>",
        "</h6>",
        "</ul>",
        "</ol>",
        "</span>",
      ];

      lastSpace.forEach((tag) => {
        while (text.endsWith(" " + tag)) {
          text = text.substring(0, text.length - (tag.length + 1)) + tag;
        }
      });
    }

    return text || "";
  };

  handleOnChange = (value) => {
    this.setState({
      initialValue: eval(`initialValue${value}`),
    });
    this.props.form.resetFields(["Wysiwyg"]);
  };

  // Return only non-authorized characters in a String.
  getFailedChars = (value) => {
    // Fetch value directly in the form values
    if (!value) value = this.props.form.getFieldValue(this.props.fieldId);
    if (value && typeof value === "string") {
      // Remove tags
      value = value.replace(/(<([^>]+)>)/gi, "");
      // Replace encoded tag character by the character
      value = value.replace(/&lt;/g, "<");
      value = value.replace(/&gt;/g, ">");
      return value.replace(
        /[a-zA-Z\u0020-\u0039\u00C0-\u024F\u2018\u2019\u2013\u00ab\u00bb\u00a9\u00b0\u00b1\u00ae\u2015\u221e\u00a1\u00bf\u2014\u201c\u201d\u00ab\u00bb\u2014\u2122\u00a2~:;_='@?{}\r\n]+/g,
        ""
      );
    }

    return "";
  };

  // Return text length with/without tags
  getTextLength = (text) => {
    if (!text || text === "<p><br></p>") return 0;

    if (!this.props.counterWithTag)
      return text.replace(/(<([^>]+)>)/gi, "").length;

    return text.length;
  };

  // Update length, lengthPercent and radius states from text length
  handleTextLength = (chars) => {
    const { props } = this;
    const { maxlength } = props;

    if (maxlength) {
      const length = chars;
      const lengthPercent =
        length && maxlength ? (length / maxlength) * 100 : 0;

      this.setState({
        length: length,
        lengthPercent: lengthPercent,
        radius:
          lengthPercent >= 100
            ? "radius2"
            : lengthPercent > 0
            ? "radius3"
            : "radius4",
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const Input = (
      <Select onChange={this.handleOnChange}>
        <Option value="FR">FR</Option>
        <Option value="EN">EN</Option>
      </Select>
    );

    const fieldOptions = {
      initialValue: this.wrapText(this.state.initialValue),
      rules: [
        // *** Tag validation***//
        {
          validator: (rule, value, callback) => {
            if (value) {
              let allTags = sanitizeHTML(value, {
                allowedTags: false,
                allowedAttributes: false,
              });
              let wysiwygTags = sanitizeHTML(value, {
                allowedTags: [
                  "h1",
                  "h2",
                  "h3",
                  "em",
                  "p",
                  "strong",
                  "ins",
                  "sup",
                  "sub",
                  "span",
                  "a",
                  "ul",
                  "ol",
                  "li",
                  "br",
                  "u",
                ],
                allowedAttributes: {
                  "*": ["style", "class"],
                  a: ["href", "target", "rel", "style", "class"],
                },
                allowedStyles: {
                  "*": {
                    color: [
                      /^(0x)?[0-9a-f]+$/i,
                      /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(,\s*(1|0|(0?\.\d{1,2})))?\s*\)$/,
                      /^var\(.*\)$/,
                    ],
                    "text-align": [
                      /^left$/,
                      /^right$/,
                      /^center$/,
                      /^justify$/,
                    ],
                  },
                  span: {
                    "font-size": [/^\d+(?:px|em|%)$/],
                  },
                },
              });
              return allTags === wysiwygTags ? callback() : callback(true);
            }
            return callback();
          },
          message: "tags",
        },
        {
          validator: (rule, value, callback) =>
            this.getFailedChars(value).length ? callback(true) : callback(),
          message: "validation",
        },
        {
          validator: (rule, value, callback) => {
            var chars =
              !value || value === "<p><br></p>" ? 0 : this.getTextLength(value);
            this.handleTextLength(chars);
            return chars <= 65535 ? callback() : callback(true);
          },
          message: "maxLength",
        },
        //*** Required validation ***//
        {
          validator: (rule, value, callback) => {
            if (!this.props.required) return callback();
            let chars = 0;
            if (value) {
              chars += value.length;
            }
            return chars > 0 ? callback() : callback(true);
          },
          message: "required",
        },
      ],
    };

    // Are headings allowed in toolbar
    const headings = this.props.allowHeadings
      ? [{ header: 1 }, { header: 2 }, { header: 3 }]
      : null;

    // Are sizes allowed in toolbar
    const sizes = this.props.allowSizes ? [{ size: [] }] : null;

    // Are colors allowed
    const colors = this.props.allowColors
      ? [
          {
            color: [
              "rgb(  0,   0,   0)",
              "rgb(230,   0,   0)",
              "rgb(255, 153,   0)",
              "rgb(255, 255,   0)",
              "rgb(  0, 138,   0)",
              "rgb(  0, 102, 204)",
              "rgb(153,  51, 255)",
              "rgb(255, 255, 255)",
              "rgb(250, 204, 204)",
              "rgb(255, 235, 204)",
              "rgb(255, 255, 204)",
              "rgb(204, 232, 204)",
              "rgb(204, 224, 245)",
              "rgb(235, 214, 255)",
              "rgb(187, 187, 187)",
              "rgb(240, 102, 102)",
              "rgb(255, 194, 102)",
              "rgb(255, 255, 102)",
              "rgb(102, 185, 102)",
              "rgb(102, 163, 224)",
              "rgb(194, 133, 255)",
              "rgb(136, 136, 136)",
              "rgb(161,   0,   0)",
              "rgb(178, 107,   0)",
              "rgb(178, 178,   0)",
              "rgb(  0,  97,   0)",
              "rgb(  0,  71, 178)",
              "rgb(107,  36, 178)",
              "rgb( 68,  68,  68)",
              "rgb( 92,   0,   0)",
              "rgb(102,  61,   0)",
              "rgb(102, 102,   0)",
              "rgb(  0,  55,   0)",
              "rgb(  0,  41, 102)",
              "rgb( 61,  20,  10)",
            ],
          },
        ]
      : null;

    // Are lists allowed in toolbar
    const lists = this.props.allowLists
      ? [{ list: "ordered" }, { list: "bullet" }]
      : null;

    // Is alignment allowed in toolbar
    const alignment = this.props.allowAlignments ? [{ align: [] }] : null;

    // Are links allowed in toolbar
    const links = this.props.allowLinks ? ["link"] : null;

    // Toolbar modules
    const modules = {
      toolbar: [
        headings,
        ["bold", "italic", "underline"],
        [{ script: "sub" }, { script: "super" }],
        sizes,
        colors,
        lists,
        alignment,
        links,
        ["clean"],
      ].filter((obj) => obj), // remove null elements
    };

    // Toolbar formats
    const format = [
      "header",
      "size",
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "indent",
      "link",
      "color",
    ];

    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("LangSwitcher", { initialValue: "FR" })(Input)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator(
            "Wysiwyg",
            fieldOptions
          )(
            <ReactQuill
              modules={modules}
              format={format}
              readOnly={false}
              onChange={this.props.onChange}
              onKeyUp={() => {
                this.props.form.validateFields(
                  ["Wysiwyg"],
                  { force: true },
                  () => {}
                );
              }}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("TextArea", {
            initialValue: this.state.initialValue,
          })(<TextArea />)}
        </Form.Item>
      </Form>
    );
  }
}

WysiwygQuill.defaultProps = {
  initialValue: null,
  contentLang: null,
  className: null,
  required: true,
  requiredMessage: null,
  maxlength: 65535,
  counterWithTag: true,
  maxlengthMessage: null,
  taglessMessage: null,
  allowHeadings: true,
  allowColors: true,
  allowSizes: false,
  allowLists: true,
  allowAlignments: true,
  allowLinks: true,
  disabled: false,
  onChange: () => {},
};

const Wysiwyg = Form.create({ name: "Wysiwyg" })(WysiwygQuill);

export default Wysiwyg;