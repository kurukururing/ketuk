#!/usr/bin/env python3
"""usage: dlx.py name url [name url ...]
Downloads Figma assets into public/a/<name>.<ext>. If an identical file already exists,
nothing new is written and the existing name is reported instead. PNGs are converted to
JPG (opaque) or kept PNG (transparent), max 800px, to keep the bundle small."""
import sys, os, hashlib, subprocess, io
from PIL import Image
D = os.path.join(os.path.dirname(__file__), '..', 'public', 'a')
idx = {}
for f in os.listdir(D):
    p = os.path.join(D, f)
    if os.path.isfile(p): idx.setdefault(hashlib.md5(open(p, 'rb').read()).hexdigest(), f)
args = sys.argv[1:]
for name, url in zip(args[::2], args[1::2]):
    ext = url.rsplit('.', 1)[-1]
    data = subprocess.run(['curl', '-sfL', url], capture_output=True).stdout
    if not data: print(f'{name}: FAIL'); continue
    if ext == 'png':
        im = Image.open(io.BytesIO(data))
        opaque = im.mode in ('RGB', 'P', 'L') or (im.mode == 'RGBA' and im.getextrema()[3][0] == 255)
        im.thumbnail((800, 800))
        buf = io.BytesIO()
        if opaque: im.convert('RGB').save(buf, 'JPEG', quality=84); ext = 'jpg'
        else: im.save(buf, 'PNG', optimize=True)
        data = buf.getvalue()
    h = hashlib.md5(data).hexdigest()
    if h in idx: print(f'{name}: = {idx[h]}'); continue
    fn = f'{name}.{ext}'
    open(os.path.join(D, fn), 'wb').write(data); idx[h] = fn
    print(f'{name}: + {fn}')
