import { Link } from "@tiptap/extension-link";
import { mergeAttributes } from "@tiptap/react";
import { linkOptions } from "../menu/link";


export const CustomLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        renderHTML: (attributes) => {
          const index = attributes.index || 0;
          return {
            class: linkOptions[index].className,
          };
        }
      },
      index: {
        default: "0",
        renderHTML: (attributes) => {
          return {
            index: attributes.index,
            class: linkOptions[attributes.index].className,
          };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {}),
      0,
    ];
  },
});
