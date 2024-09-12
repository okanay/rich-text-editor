import { Mark, mergeAttributes } from "@tiptap/core";
import { letterSpacingOptions } from "../menu/letter-spacing";

export const LetterSpacingMark = Mark.create({
  name: "letterSpacing",
  priority: 1006,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      spacing: {
        default: "tracking-normal",
        renderHTML: (attributes) => {
          return {
            spacing: attributes.spacing,
          };
        },
      },
      index: {
        default: "0",
        renderHTML: (attributes) => {
          return {
            index: attributes.index,
            class: letterSpacingOptions[attributes.index].className,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[spacing]",
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
