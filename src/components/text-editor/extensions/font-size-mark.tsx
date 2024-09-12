import { Mark, mergeAttributes } from "@tiptap/core";
import { fontSizeOptions } from "../menu/font-size";

export const FontSizeMark = Mark.create({
  name: "fontSize",
  priority: 1003,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      size: {
        default: "base",
        renderHTML: (attributes) => {
          return {
            size: attributes.size,
          };
        },
      },
      index: {
        default: "0",
        renderHTML: (attributes) => {
          return {
            index: attributes.index,
            class: fontSizeOptions[attributes.index].className,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[size]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {}),
      0,
    ];
  },
});
