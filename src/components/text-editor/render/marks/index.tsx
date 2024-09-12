import React, { Fragment } from "react";
import { TipTapNode } from "@troop.com/tiptap-react-render";
import { twMerge } from "tailwind-merge";
import { fontFamilyOptions } from "../../menu/font-family";
import { fontSizeOptions } from "../../menu/font-size";
import { fontWeightOptions } from "../../menu/font-weight";
import { leadingOptions } from "../../menu/leading";
import { letterSpacingOptions } from "../../menu/letter-spacing";
import { linkOptions } from "../../menu/link";
import {
  textDecorationColorOptions,
  textDecorationOptions,
  textDecorationStyleOptions,
} from "../../menu/text-decoration";

export const TextMark: React.FC<{ node: TipTapNode }> = ({ node }) => {
  const { text, marks } = node;

  // If there are no marks, return the text as is
  if (!marks || marks.length === 0) {
    return <Fragment>{text}</Fragment>;
  }

  // Sort marks by type
  const orderedMarks = getOrderedMarks(marks);

  // Get the class name and styles for the marks
  const className = twMerge(...orderedMarks.map(getClasses));

  switch (orderedMarks[0]?.type) {
    case "link":
      return (
        <a
          href={orderedMarks[0].attrs.href}
          target={orderedMarks[0].attrs.target || "_self"}
          className={className}
        >
          {text}
        </a>
      );
    default:
      return <span className={className}>{text}</span>;
  }
};

const getClasses = (mark: any): string => {
  const { attrs = {} } = mark;
  switch (mark.type) {
    case "italic":
      return "italic";
    case "link":
      return linkOptions[attrs.index].className;
    case "fontWeight":
      return fontWeightOptions[attrs.index].className;
    case "fontSize":
      return fontSizeOptions[attrs.index].className;
    case "letterSpacing":
      return letterSpacingOptions[attrs.index].className;
    case "fontFamily":
      return fontFamilyOptions[attrs.index].className;
    case "leading":
      return leadingOptions[attrs.index].className;
    case "textDecoration":
      return (
        textDecorationOptions[attrs.decorationTypeIndex].className +
        " " +
        textDecorationStyleOptions[attrs.decorationStyleIndex].className +
        " " +
        textDecorationColorOptions[attrs.decorationColorIndex].className
      );
    default:
      return "";
  }
};

export enum MarkTypeOrder {
  link = 1,
  italic = 2,
  fontWeight = 3,
  fontSize = 4,
  letterSpacing = 5,
  fontFamily = 6,
  leading = 7,
  fontColor = 8,
  backgroundColor = 9,
  textDecoration = 10,
}

const getOrderedMarks = (marks: any[]) =>
  [...marks].sort(
    (a, b) =>
      (MarkTypeOrder[a.type as keyof typeof MarkTypeOrder] || Infinity) -
      (MarkTypeOrder[b.type as keyof typeof MarkTypeOrder] || Infinity),
  );

// import { useGetTheme } from "@/hooks/useGetTheme";

// const combinedStyles = orderedMarks.reduce(
//   (styles, mark) => ({ ...styles, ...getStyles(mark, mode) }),
//   {},
// );

// const getStyles = (mark: any, mode: string): React.CSSProperties => {
//   const { attrs = {} } = mark;
//   switch (mark.type) {
//     case "fontColor":
//       let color = attrs.fontLight;

//       if (mode === "dark") {
//         color = attrs.fontDark;
//       }

//       return { color: color };
//     case "backgroundColor":
//       let backgroundColor = attrs.bgLightColor;

//       if (mode === "dark") {
//         backgroundColor = attrs.bgDarkColor;
//       }

//       return {
//         backgroundColor: backgroundColor,
//         padding: "0.25rem 0.5rem",
//         borderRadius: "0.25rem",
//         border: `1px solid #d1d5db`,
//       };
//     default:
//       return {};
//   }
// };
