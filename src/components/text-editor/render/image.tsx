import BlurImage from "@/components/utils/blur-image";

export const ImageNodeEditorRender = (props: { node: any }) => {
  const src = props.node.attrs.src || "https://via.placeholder.com/150";
  const alt = props.node.attrs.alt || "image-description";

  return <BlurImage src={src} alt={alt} />;
};
