import { Mark, mergeAttributes } from "@tiptap/core";
import {
  textDecorationColorOptions,
  textDecorationOptions,
  textDecorationStyleOptions,
} from "../menu/text-decoration";

export const TextDecorationMark = Mark.create({
  name: "textDecoration",
  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      decorationStyleIndex: {
        default: "0",
        renderHTML: (attributes) => {
          return {
            decorationStyleIndex: attributes.decorationStyleIndex,
          };
        },
      },
      decorationColorIndex: {
        default: "0",
        renderHTML: (attributes) => {
          return {
            decorationColorIndex: attributes.decorationColorIndex,
          };
        },
      },
      decorationTypeIndex: {
        default: "0",
        renderHTML: (attributes) => {
          return {
            decorationTypeIndex: attributes.decorationTypeIndex,
            class:
              textDecorationOptions[attributes.decorationTypeIndex].className +
              " " +
              textDecorationStyleOptions[attributes.decorationStyleIndex]
                .className +
              " " +
              textDecorationColorOptions[attributes.decorationColorIndex]
                .className,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[decorationTypeIndex]",
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
