import React, { createContext, useContext, useEffect, useState } from 'react';
import { defaultContent } from './profile';

// Shares the portfolio content with every section.
// Shows the built-in defaults instantly, then swaps in what was saved from the admin page.
const ContentContext = createContext({ content: defaultContent, setContent: () => {} });

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data?.profile && setContent(data))
      .catch(() => {}); // offline or API missing → keep defaults
  }, []);

  return <ContentContext.Provider value={{ content, setContent }}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext).content;
export const useSetContent = () => useContext(ContentContext).setContent;
