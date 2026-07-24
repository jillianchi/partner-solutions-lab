import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      // Remove previous highlighting
      codeRef.current.removeAttribute('data-highlighted');
      codeRef.current.innerHTML = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="rounded-lg overflow-hidden my-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2" style={{ backgroundColor: '#242B45' }}>
        <span className="text-xs font-mono" style={{ color: '#8892B0' }}>
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: copied ? '#30B130' : '#8892B0', border: 'none', background: 'none', cursor: 'pointer', padding: '2px 4px' }}
        >
          {copied ? (
            <>
              <Check size={12} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <div className="overflow-x-auto" style={{ backgroundColor: '#1A1F36' }}>
        <pre className="p-4 m-0 text-sm leading-relaxed overflow-x-auto">
          <code
            ref={codeRef}
            className={`language-${language}`}
            style={{ color: '#E8E8FF', fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace" }}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
