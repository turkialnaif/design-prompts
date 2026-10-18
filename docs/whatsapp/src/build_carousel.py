import os,sys,shutil
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from topics import TOPICS
D=['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']
def ar(n): return ''.join(D[int(c)] for c in str(n))
os.makedirs('car',exist_ok=True)
FIT='''<script>document.fonts.ready.then(()=>{document.querySelectorAll('.fit').forEach(e=>{let f=+e.dataset.max;e.style.fontSize=f+'px';while(e.scrollWidth>(+e.dataset.w||936)&&f>36){f-=2;e.style.fontSize=f+'px'}})})</script>'''
def head(chip,page,total,full=False):
    logo='<img class="f" src="../logo-lockup.png">' if full else '<img class="s" src="../logo-taap.png">'
    return f'<div class="hd">{logo}<div class="ser"><div class="chip">{chip}</div><div class="n">0{page} / 0{total}</div></div></div>'
def dots(page,total): return '<div class="dots">'+''.join(f'<b class="{"on" if i==page else ""}"></b>' for i in range(1,total+1))+'</div>'
def wrap(body,cls=''):
    return f'<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><link rel="stylesheet" href="../carousel.css"></head><body><div class="c {cls}"><div class="glow"></div><div class="flutes"></div><img class="ghost" src="../logo-mark.png">{body}</div>{FIT}</body></html>'
def ref(r):
    if r.startswith('م '): return f'<div class="ref"><div class="k">المادة</div><div class="v">{r[2:]}</div></div>'
    return f'<div class="ref"><div class="v w">{r}</div></div>'
out=[]
for i,T in enumerate(TOPICS,1):
    nn=f'{i:02d}'; total=5
    base=f'car/{nn}-{T["slug"]}'
    # cover
    teaser=''.join(f'<div class="li"><div class="no">{ar(k)}</div><div>{t}</div></div>' for k,t in enumerate(T['teaser'],1))
    cover=head(T['chip'],1,total,True)+f'<div class="h1 fit" data-max="136">{T["l1"]}</div><div class="h2 fit" data-max="86">{T["l2"]}</div><div class="step"><i></i><i></i></div><div class="tz">{teaser}</div><div class="cnt">٥ صفحات</div><div class="swipe">اسحب للمتابعة&nbsp;←</div><div class="ft" style="justify-content:flex-end"><div class="u">taap.sa</div></div>'
    open(f'{base}-p1.html','w',encoding='utf-8').write(wrap(cover,'cover'))
    out.append((f'{base}-p1.html',f'{nn}-{T["slug"]}',1))
    # info pages
    for k,P in enumerate(T['pages'],2):
        rows=''.join(f'<div class="row">{ref(r)}<div class="vl"></div><div class="tx">{t}</div></div>' for r,t in P['items'])
        body=head(T['chip'],k,total)+f'<div class="kick">المعلومة {ar(k-1)} من {ar(3)}</div><div class="title fit" data-max="84">{P["t"]}</div><div class="step"><i></i><i></i></div><div class="rows">{rows}</div><div class="tip" id="tip"><div class="k">تنبيه عملي</div><div class="t">{P["tip"]}</div></div><div class="ft">{dots(k,total)}<div class="ref2">المرجع: {T["system"].split(" · ")[0]}</div><div class="u">taap.sa</div></div>'
        body+='<script>document.fonts.ready.then(()=>{setTimeout(()=>{const r=document.querySelector(".rows");const t=document.getElementById("tip");t.style.top=(r.offsetTop+r.offsetHeight+34)+"px"},50)})</script>'
        open(f'{base}-p{k}.html','w',encoding='utf-8').write(wrap(body))
        out.append((f'{base}-p{k}.html',f'{nn}-{T["slug"]}',k))
    # solutions
    steps=''.join(f'<div class="stp"><div class="no">{ar(j)}</div><div class="tx">{s}</div></div>' for j,s in enumerate(T['steps'],1))
    body=head(T['chip'],5,total)+f'<div class="kick">الحل</div><div class="title">خطواتك العملية</div><div class="step"><i></i><i></i></div><div class="rows" id="rows">{steps}</div><div class="note" id="note">{T["note"]}</div><div class="contact" id="ct"><div class="q">تحتاج رأياً في حالتك؟</div><div class="cl"><div class="btn">احجز استشارة</div><div class="ls"><span>WhatsApp</span> +966 56 677 0888<br><span>Web</span> taap.sa · info@taap.sa</div></div></div><div class="ft">{dots(5,total)}<div class="ref2">للتوعية العامة، ولا يغني عن استشارة متخصصة</div></div>'
    body+='<script>document.fonts.ready.then(()=>{setTimeout(()=>{const r=document.getElementById("rows");const n=document.getElementById("note");const c=document.getElementById("ct");n.style.top=(r.offsetTop+r.offsetHeight+22)+"px";c.style.top=(r.offsetTop+r.offsetHeight+22+n.offsetHeight+22)+"px"},50)})</script>'
    open(f'{base}-p5.html','w',encoding='utf-8').write(wrap(body,'sol'))
    out.append((f'{base}-p5.html',f'{nn}-{T["slug"]}',5))
with open('car/manifest.txt','w') as f:
    for h,d,k in out: f.write(f'{h}|{d}|{k}\n')
print(len(out),'pages')
