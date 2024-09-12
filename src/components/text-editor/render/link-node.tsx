export const LinkComponentRender = ({
  href,
  target,
  rel,
  children,
}: {
  href: string;
  target: string;
  rel: string;
  children: React.ReactNode;
}) => {
  return (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  );
};
