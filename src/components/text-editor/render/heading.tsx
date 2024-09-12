import { NodeHandler, TipTapNode } from "@troop.com/tiptap-react-render";
import { TextMark } from "./marks";
import { headingOptions } from "../menu/heading";

const HeadingNode: React.FC<{ node: TipTapNode }> = ({ node }) => {
  if (!node.attrs) return null;

  const renderChildNodeTextMark = node.content?.map((childNode, index) => {
    if (childNode.type === "text") {
      return <TextMark key={index} node={childNode} />;
    }
    return null;
  });

  const level = node.attrs.level - 1;
  const className = headingOptions[level].className;

  const style = {
    textAlign: node.attrs.textAlign || "left",
  };

  const HeadingTag = `h${node.attrs.level || 1}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingTag className={className} style={style}>
      {renderChildNodeTextMark}
    </HeadingTag>
  );
};

export const heading: NodeHandler = (props) => (
  <HeadingNode node={props.node} />
);
