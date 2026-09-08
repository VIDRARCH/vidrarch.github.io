#!/usr/bin/env python3
"""Static validation for the VIDRARCH portfolio."""

from __future__ import annotations
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    'index.html', 'recruiter.html', 'styles.css', 'app.js', 'site.config.js',
    'assets/vidrarch-logo-lockup.png', 'assets/vidrarch-emblem.png',
    'assets/vidrarch-favicon.png', 'assets/vidrarch-og.png',
    'assets/vidrarch-linkedin-banner.png',
    '.github/workflows/pages.yml', '.github/workflows/validate.yml',
    '.github/dependabot.yml', 'robots.txt', 'sitemap.xml',
    'TRADEMARKS.md', 'BRAND-PROTECTION.md', 'PUBLIC-SAFETY-CHECKLIST.md'
]

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs: list[str] = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        for key in ('href','src'):
            if key in a:
                self.refs.append(a[key])


def is_local(ref: str) -> bool:
    return not (
        ref.startswith(('http://','https://','mailto:','tel:','data:','#','javascript:'))
        or ref == ''
    )


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    for rel in REQUIRED:
        if not (ROOT / rel).exists():
            errors.append(f'missing required file: {rel}')

    for html in [ROOT/'index.html', ROOT/'recruiter.html', ROOT/'404.html']:
        if not html.exists():
            continue
        parser = LinkParser()
        parser.feed(html.read_text(encoding='utf-8'))
        for ref in parser.refs:
            if not is_local(ref):
                continue
            clean = ref.split('?',1)[0].split('#',1)[0]
            target = (html.parent / clean).resolve()
            try:
                target.relative_to(ROOT)
            except ValueError:
                errors.append(f'{html.name}: local reference escapes project: {ref}')
                continue
            if clean and not target.exists():
                errors.append(f'{html.name}: missing local reference: {ref}')

    # Basic accidental-secret patterns. Heuristic only; manual review is still required.
    text_exts = {'.html','.js','.css','.md','.txt','.xml','.yml','.yaml','.json','.webmanifest','.spl','.kql'}
    combined = ''
    for p in ROOT.rglob('*'):
        if p.is_file() and (p.suffix.lower() in text_exts or p.name in {'CNAME','LICENSE'}):
            try:
                combined += '\n' + p.read_text(encoding='utf-8', errors='ignore')
            except Exception:
                pass

    suspicious = {
        'AWS access key shape': r'AKIA[0-9A-Z]{16}',
        'GitHub personal token shape': r'gh[pousr]_[A-Za-z0-9]{30,}',
        'PEM private key': r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
        'Bearer token literal': r'(?i)authorization\s*:\s*bearer\s+[A-Za-z0-9._~-]{20,}',
    }
    for label, pattern in suspicious.items():
        if re.search(pattern, combined):
            errors.append(f'possible secret detected: {label}')

    # Private IPv4 literals are usually inappropriate in this public repo. Ignore documentation placeholders.
    private_ip = re.compile(r'(?<![\d.])(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})(?![\d.])')
    if private_ip.search(combined):
        warnings.append('private IPv4 literal found; verify it is only an example and not production data')

    cfg = (ROOT/'site.config.js').read_text(encoding='utf-8') if (ROOT/'site.config.js').exists() else ''
    if 'siteUrl: ""' in cfg:
        warnings.append('siteUrl is blank; run tools/configure_portfolio.py before public launch')
    if re.search(r'github:\s*"https://github\.com/vidrarch"', cfg):
        warnings.append('GitHub link points to @vidrarch; confirm you have claimed the handle before launch')

    if errors:
        print('VALIDATION FAILED')
        for e in errors: print('  ERROR:', e)
    else:
        print('VALIDATION PASSED')
    for w in warnings: print('  WARN :', w)
    print(f'Checked project: {ROOT}')
    return 1 if errors else 0

if __name__ == '__main__':
    raise SystemExit(main())
