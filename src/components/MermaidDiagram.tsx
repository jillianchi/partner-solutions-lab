import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    primaryColor: '#EEF2FF',
    primaryTextColor: '#0A2540',
    primaryBorderColor: '#635BFF',
    lineColor: '#635BFF',
    secondaryColor: '#F6F9FC',
    tertiaryColor: '#F6F9FC',
    clusterBkg: '#F6F9FC',
    clusterBorder: '#E6EBF1',
    edgeLabelBackground: '#ffffff',
    nodeTextColor: '#0A2540',
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
    nodeSpacing: 50,
    rankSpacing: 60,
  },
});

let idCounter = 0;

interface Props {
  chart: string;
  label?: string;
  caption?: string;
}

export default function MermaidDiagram({ chart, label, caption }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState('');
  const [id] = useState(() => `mermaid-${++idCounter}`);

  useEffect(() => {
    mermaid.render(id, chart).then(({ svg }) => setSvg(svg)).catch(() => {});
  }, [chart, id]);

  return (
    <div className="my-6 rounded-xl border bg-white p-5" style={{ borderColor: '#E6EBF1' }}>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#425466' }}>
          {label}
        </p>
      )}
      {caption && (
        <p className="text-xs mb-4" style={{ color: '#425466' }}>{caption}</p>
      )}
      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: svg }}
        className="overflow-x-auto"
        style={{ minHeight: 40 }}
      />
    </div>
  );
}
