#!/usr/bin/env python3
"""Configure VIDRARCH public URLs/contact fields in one pass."""

from __future__ import annotations
import argparse
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]


def normalize_url(value: str) -> str:
    value = value.strip().rstrip('/')
    parsed = urlparse(value)
    if parsed.scheme not in {'http', 'https'} or not parsed.netloc:
        raise argparse.ArgumentTypeError('site URL must be an absolute http(s) URL')
    return value


def replace_file(path: Path, replacements: list[tuple[str, str, int]]) -> None:
    text = path.read_text(encoding='utf-8')
    for pattern, replacement, flags in replacements:
        text = re.sub(pattern, replacement, text, flags=flags)
    path.write_text(text, encoding='utf-8')


def main() -> None:
    ap = argparse.ArgumentParser(description='Configure VIDRARCH portfolio URLs and contact settings.')
    ap.add_argument('--github-handle', default='vidrarch')
    ap.add_argument('--site-url', type=normalize_url, required=True)
    ap.add_argument('--linkedin', default='https://www.linkedin.com/in/ricardo-frontera-9a234610')
    ap.add_argument('--email', default='ricardofrontera@gmail.com')
    ap.add_argument('--custom-domain', default='', help='Optional hostname only, e.g. vidrarch.dev')
    args = ap.parse_args()

    if '@' not in args.email:
        ap.error('--email must contain @')
    email_user, email_domain = args.email.split('@', 1)
    github_url = f'https://github.com/{args.github_handle}'

    config = ROOT / 'site.config.js'
    replace_file(config, [
        (r'githubHandle:\s*"[^"]*"', f'githubHandle: "{args.github_handle}"', 0),
        (r'github:\s*"[^"]*"', f'github: "{github_url}"', 0),
        (r'siteUrl:\s*"[^"]*"', f'siteUrl: "{args.site_url}"', 0),
        (r'linkedin:\s*"[^"]*"', f'linkedin: "{args.linkedin}"', 0),
        (r'emailUser:\s*"[^"]*"', f'emailUser: "{email_user}"', 0),
        (r'emailDomain:\s*"[^"]*"', f'emailDomain: "{email_domain}"', 0),
    ])

    for rel in ['recruiter.html', 'github-profile/README.md', 'LAUNCH-PLAYBOOK.md', 'OUTREACH-TEMPLATES.md', 'README.md']:
        path = ROOT / rel
        if not path.exists():
            continue
        text = path.read_text(encoding='utf-8')
        text = re.sub(r'https://github\.com/[A-Za-z0-9_.-]+', github_url, text)
        text = re.sub(r'https://vidrarch\.github\.io(?=/|\b)', args.site_url, text)
        text = text.replace('vidrarch.github.io', urlparse(args.site_url).netloc + urlparse(args.site_url).path.rstrip('/'))
        path.write_text(text, encoding='utf-8')

    (ROOT / 'robots.txt').write_text(
        f'User-agent: *\nAllow: /\n\nSitemap: {args.site_url}/sitemap.xml\n',
        encoding='utf-8'
    )
    (ROOT / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f'  <url><loc>{args.site_url}/</loc><priority>1.0</priority></url>\n'
        f'  <url><loc>{args.site_url}/recruiter.html</loc><priority>0.9</priority></url>\n'
        '</urlset>\n',
        encoding='utf-8'
    )

    if args.custom_domain:
        host = args.custom_domain.strip().lower().replace('https://', '').replace('http://', '').strip('/')
        (ROOT / 'CNAME').write_text(host + '\n', encoding='utf-8')
    elif (ROOT / 'CNAME').exists():
        (ROOT / 'CNAME').unlink()

    print('VIDRARCH configured successfully')
    print(f'  GitHub : {github_url}')
    print(f'  Site   : {args.site_url}')
    print(f'  LinkedIn: {args.linkedin}')
    print('Run: python tools/validate.py')


if __name__ == '__main__':
    main()
