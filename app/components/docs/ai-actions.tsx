'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  FileText,
} from 'lucide-react';

function llmPrompt(url: string) {
  return `Read ${url} so I can ask you questions about this page of the Go Audit documentation.`;
}

export function AIActions({ markdownPath }: { markdownPath: string }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  async function copyMarkdown() {
    try {
      const res = await fetch(markdownPath);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  }

  function absoluteRawUrl() {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return origin + markdownPath;
  }

  function openExternal(base: string) {
    const url = `${base}${encodeURIComponent(llmPrompt(absoluteRawUrl()))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  }

  const itemClass =
    'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-[#334155] transition-colors hover:bg-[#F1F5F9] dark:text-[#CBD5E1] dark:hover:bg-[#1B222C]';

  return (
    <div className="flex items-center gap-2" ref={ref}>
      <button
        type="button"
        onClick={copyMarkdown}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm font-medium text-[#334155] transition-colors hover:bg-[#F8FAFC] dark:border-[#2A323D] dark:bg-[#11161D] dark:text-[#CBD5E1] dark:hover:bg-[#161C25]"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[#28C840]" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        {copied ? 'Copied' : 'Copy as Markdown'}
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm font-medium text-[#334155] transition-colors hover:bg-[#F8FAFC] dark:border-[#2A323D] dark:bg-[#11161D] dark:text-[#CBD5E1] dark:hover:bg-[#161C25]"
        >
          Open in LLM
          <ChevronDown className="h-3.5 w-3.5" />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 z-50 mt-1.5 w-56 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white py-1 shadow-lg dark:border-[#2A323D] dark:bg-[#0E131A]"
          >
            <a
              href={markdownPath}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className={itemClass}
              onClick={() => setOpen(false)}
            >
              <FileText className="h-4 w-4 text-[#64748B]" />
              View raw Markdown
            </a>
            <button
              type="button"
              role="menuitem"
              className={itemClass}
              onClick={() => openExternal('https://chatgpt.com/?hint=search&q=')}
            >
              <ExternalLink className="h-4 w-4 text-[#64748B]" />
              Open in ChatGPT
            </button>
            <button
              type="button"
              role="menuitem"
              className={itemClass}
              onClick={() => openExternal('https://claude.ai/new?q=')}
            >
              <ExternalLink className="h-4 w-4 text-[#64748B]" />
              Open in Claude
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
