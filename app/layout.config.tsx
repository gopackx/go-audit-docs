import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="flex items-center gap-2 font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
        <Image
          src="/go-audit-primary-logo.png"
          alt="go-audit"
          width={24}
          height={24}
          priority
        />
        Go Audit
      </span>
    ),
  },
  links: [
    { text: 'Docs', url: '/docs/getting-started/installation', on: 'nav' },
    { text: 'API', url: '/docs/api-reference', on: 'nav' },
    { text: 'Examples', url: '/docs/examples/basic', on: 'nav' },
    { text: 'Blog', url: '#', on: 'nav' },
    { text: 'Changelog', url: '/docs/changelog', on: 'nav' },
  ],
  githubUrl: 'https://github.com/gopackx/go-audit',
};
