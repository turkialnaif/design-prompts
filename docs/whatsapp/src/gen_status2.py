import re,html
SVG_PHONE='<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>'
SVG_GLOBE='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>'
for n in range(1,9):
    s=open(f'st-0{n}.html',encoding='utf-8').read()
    l1,l2=re.search(r'<h1>(.*?)<br>(.*?)</h1>',s).groups()
    lab=re.search(r'class="lab">(.*?)<',s).group(1)
    num=re.search(r'class="num">(.*?)<',s).group(1)
    dis=re.search(r'class="d">(.*?)<',s).group(1)
    pts=re.findall(r'<div class="ref">(.*?)</div><div class="tx">(.*?)</div>',s)
    assert len(pts)==3,(n,len(pts))
    full = n in (1,8)
    badge = '<div class="badge full"><img src="logo-lockup.png"></div>' if full else '<div class="badge sm"><img src="logo-taap.png"></div>'
    cards=''.join(f'<div class="card"><div class="ref">{r}</div><div class="tx">{t}</div></div>' for r,t in pts)
    sx=250; ex=(968-470-14) if full else (968-150-14)
    out=f'''<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><link rel="stylesheet" href="status2.css"></head><body><div class="c">
<div class="bg"></div><div class="tint"></div>
<div class="bar"><div class="it"><div class="ic">{SVG_GLOBE}</div><span>taap.sa</span></div><div class="cta">احجز استشارة</div><div class="it"><div class="ic">{SVG_PHONE}</div><span>+966 56 677 0888</span></div></div>
<div class="zone">
<svg class="path" viewBox="0 0 968 170"><path d="M{sx} 118 C {sx+90} 30, {ex-110} 170, {ex} 84" fill="none" stroke="#e6c98f" stroke-width="4" stroke-dasharray="4 18" stroke-linecap="round"/><circle cx="{sx}" cy="118" r="8" fill="#e6c98f"/><circle cx="{ex}" cy="84" r="8" fill="#e6c98f"/></svg>
<div class="ser"><div class="t">{lab}</div><div class="n">{num}</div></div>{badge}</div>
<div class="band b1">{l1}</div><div class="band b2" style="top:{468+114}px">{l2}</div>
<div class="cards">{cards}</div>
<div class="dis">{dis}</div>
<div class="ph p1"><img src="ph-left.jpg"></div><div class="ph p2"><img src="ph-mid.jpg"></div><div class="ph p3"><img src="ph-right.jpg"></div>
</div></body></html>'''
    open(f'st2-0{n}.html','w',encoding='utf-8').write(out)
