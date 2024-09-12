export const themeInitScript = `
  (function() {
    function getInitialTheme() {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      const userPrefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return userPrefers;
    }
    const initialTheme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);
  })();
`;

const ThemeInit: React.FC = () => (
  <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
);

export default ThemeInit;
