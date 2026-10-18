import re
for n in range(1,9):
    s=open(f'st-0{n}.html',encoding='utf-8').read()
    l1,l2=re.search(r'<h1>(.*?)<br>(.*?)</h1>',s).groups()
    lab=re.search(r'class="lab">(.*?)<',s).group(1)
    dis=re.search(r'class="d">(.*?)<',s).group(1)
    pts=re.findall(r'<div class="ref">(.*?)</div><div class="tx">(.*?)</div>',s)
    system=dis.split(' · ')[0]
    full=n in (1,8)
    head='<img class="f" src="logo-lockup.png">' if full else '<img class="s" src="logo-taap.png">'
    def ref(r):
        if r.startswith('م '): return f'<div class="ref"><div class="k">المادة</div><div class="v">{r[2:]}</div></div>'
        return f'<div class="ref"><div class="v w">{r}</div></div>'
    rows=''.join(f'<div class="row">{ref(r)}<div class="vl"></div><div class="tx">{t}</div></div>' for r,t in pts)
    for kind,cls,w in (('st','st',912),('po','po',936)):
        out=f'''<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><link rel="stylesheet" href="design4.css"></head><body><div class="c {cls}">
<div class="glow"></div><div class="flutes"></div><img class="ghost" src="logo-mark.png">
<div class="hd">{head}<div class="ser"><div class="chip">{lab}</div><div class="n">0{n} / 08</div></div></div>
<div class="hero"><div class="l1 fit" data-max="{128 if kind=='st' else 116}">{l1}</div><div class="l2 fit" data-max="{84 if kind=='st' else 76}">{l2}</div></div>
<div class="step"><i></i><i></i></div>
<div class="rows">{rows}</div>
<div class="info"><div class="cell"><div class="k">النظام</div><div class="v">{system}</div></div><div class="cell"><div class="k">تنبيه</div><div class="v">للتوعية العامة</div><div class="s">ولا يغني عن استشارة متخصصة</div></div></div>
<div class="cta"><div class="b">احجز استشارة</div><div class="u">taap.sa</div></div>
<script>document.body.className='{cls}';document.fonts.ready.then(()=>{{document.querySelectorAll('.fit').forEach(e=>{{let f=+e.dataset.max;e.style.fontSize=f+'px';while(e.scrollWidth>{w}&&f>40){{f-=2;e.style.fontSize=f+'px'}}}})}})</script>
</div></body></html>'''
        open(f'{kind}4-0{n}.html','w',encoding='utf-8').write(out)
