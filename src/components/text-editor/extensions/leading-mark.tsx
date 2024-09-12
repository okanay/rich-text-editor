import { Mark, mergeAttributes } from "@tiptap/core";
import { leadingOptions } from "../menu/leading";

export const LeadingMark = Mark.create({
  name: "leading",
  priority: 1005,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      leading: {
        default: "leading-4",
        renderHTML: (attributes) => {
          return {
            leading: attributes.leading,
          };
        },
      },
      index: {
        default: "0",
        renderHTML: (attributes) => {
          return {
            index: attributes.index,
            class: leadingOptions[attributes.index].className,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[leading]",
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
