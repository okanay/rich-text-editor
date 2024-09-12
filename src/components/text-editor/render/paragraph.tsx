import { NodeHandler } from "@troop.com/tiptap-react-render";

export const paragraph: NodeHandler = ({ node, children }) => {
  if (!node.content) {
    return <br />;
  }

  const style = {
    textAlign: node?.attrs?.textAlign || "left",
  };

  return (
    <p className={""} style={style}>
      {children}
    </p>
  );
};
