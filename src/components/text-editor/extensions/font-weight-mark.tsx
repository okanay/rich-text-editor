import { Mark, mergeAttributes } from "@tiptap/core";
import { fontWeightOptions } from "../menu/font-weight";

export const FontWeightMark = Mark.create({
  name: "fontWeight",
  priority: 1004,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      weight: {
        default: "normal",
        renderHTML: (attributes) => {
          return {
            weight: attributes.weight,
          };
        },
      },
      index: {
        default: "0",
        renderHTML: (attributes) => {
          return {
            index: attributes.index,
            class: fontWeightOptions[attributes.index].className,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[weight]",
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
