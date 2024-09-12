import { Mark, mergeAttributes } from "@tiptap/core";
import { fontFamilyOptions } from "../menu/font-family";

export const FontFamilyMark = Mark.create({
  name: "fontFamily",
  priority: 1002,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      family: {
        default: "Monospace",
        renderHTML: (attributes) => {
          return {
            family: attributes.family,
          };
        },
      },
      index: {
        default: "0",
        renderHTML: (attributes) => {
          return {
            index: attributes.index,
            class: fontFamilyOptions[attributes.index].className,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[family]",
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
