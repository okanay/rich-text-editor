import { Heading } from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/react";
import { headingOptions } from "../menu/heading";

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      className: {
        renderHTML: (attributes) => {
          const level = attributes.level - 1
          return { class: headingOptions[level].className };
        },
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    const mergedAttributes = mergeAttributes(
      this.options.HTMLAttributes,
      HTMLAttributes,
    );

    return [`h${level}`, mergedAttributes, 0];
  },
});
