import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRAZA",
  description: "Demo of ChatKit with hosted workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="beforeInteractive"
        />
        <Script
          id="hide-thinking-messages"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function hideThinkingMessages() {
                const hideElements = (container) => {
                  const allElements = container.querySelectorAll('*');
                  allElements.forEach((element) => {
                    const textContent = element.textContent || '';
                    if (textContent.includes('Thought for') || 
                        textContent.includes('{"intencion":') ||
                        textContent.includes('{"intention":') ||
                        textContent.includes('intencion') ||
                        textContent.includes('intention')) {
                      element.style.display = 'none';
                      element.style.visibility = 'hidden';
                      element.style.height = '0';
                      element.style.overflow = 'hidden';
                    }
                  });
                };

                const chatkitElement = document.querySelector('openai-chatkit');
                if (chatkitElement) {
                  hideElements(chatkitElement);
                  
                  const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                      mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                          hideElements(node);
                          const textContent = node.textContent || '';
                          if (textContent.includes('Thought for') || 
                              textContent.includes('{"intencion":') ||
                              textContent.includes('{"intention":')) {
                            node.style.display = 'none';
                            node.style.visibility = 'hidden';
                            node.style.height = '0';
                            node.style.overflow = 'hidden';
                          }
                        }
                      });
                    });
                  });
                  
                  observer.observe(chatkitElement, {
                    childList: true,
                    subtree: true
                  });
                }
              }

              // Run immediately
              hideThinkingMessages();
              
              // Run when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', hideThinkingMessages);
              }
              
              // Run periodically to catch any missed messages
              setInterval(hideThinkingMessages, 1000);
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
