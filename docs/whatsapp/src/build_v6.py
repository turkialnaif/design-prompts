import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from topics import TOPICS
D='٠١٢٣٤٥٦٧٨٩'
def ar(n): return ''.join(D[int(c)] for c in str(n))
os.makedirs('v6c',exist_ok=True)
THEMES=['navy','teal','graph','burg','forest','navy','teal','graph','burg','forest','navy']
COVER=[ # variant, motif html
 ('v1','<div class="glyph" style="font-family:Zain;font-weight:800;font-size:760px;left:-40px;top:170px;direction:ltr">30</div>'),
 ('v2','<div class="glyph" style="font-size:640px;left:0;right:0;text-align:center;top:60px">أو</div>'),
 ('v3','<div class="door" style="width:280px;height:400px;left:240px;top:520px"></div><div class="door in" style="width:210px;height:320px;left:330px;top:600px"></div><div class="door" style="width:280px;height:400px;left:560px;top:520px;opacity:.6"></div>'),
 ('v1','<div class="glyph" style="font-size:920px;left:-30px;top:60px">؟</div>'),
 ('v2','<div class="glyph" style="font-family:Zain;font-weight:800;font-size:560px;left:0;right:0;text-align:center;top:150px;direction:ltr">5%</div>'),
 ('v1','<div class="glyph" style="font-family:Zain;font-weight:800;font-size:760px;left:-40px;top:170px;direction:ltr">12</div>'),
 ('v3','<div class="venn" style="width:360px;height:360px;left:270px;top:530px"></div><div class="venn" style="width:360px;height:360px;left:450px;top:530px"></div>'),
 ('v2','<div class="glyph" style="font-family:Zain;font-weight:800;font-size:520px;left:0;right:0;text-align:center;top:190px;direction:ltr">3/4</div>'),
 ('v3','<div class="form" style="width:560px;height:320px;left:260px;top:540px"><i style="top:80px"></i><i style="top:150px"></i><i style="top:220px;right:240px"></i><i style="top:285px;left:380px"></i></div>'),
 ('v1','<div class="stamp" style="width:400px;height:400px;left:30px;top:120px;font-size:96px">وكالة</div>'),
 ('v2','<div class="glyph" style="font-size:700px;left:0;right:0;text-align:center;top:70px">٦١</div>'),
]
SEQ=[['A','B','C'],['B','C','D'],['C','D','A'],['D','A','B']]
FIT='''<script>document.fonts.ready.then(()=>{document.querySelectorAll('.fit').forEach(e=>{let f=+e.dataset.max;e.style.fontSize=f+'px';while(e.scrollWidth>(+e.dataset.w||936)&&f>36){f-=2;e.style.fontSize=f+'px'}});const c=document.querySelector('.c'),b=document.querySelector('.body');if(b){let k=1;while(b.scrollHeight>b.clientHeight+2&&k>.6){k-=.03;c.style.setProperty('--k',k)}}})</script>'''
def page(theme,body,cls=''):
    return f'<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><link rel="stylesheet" href="bold6.css"></head><body><div class="c {theme} {cls}">{body}</div>{FIT}</body></html>'
def hd(k,total,full=False):
    logo='<img class="f" src="../logo-lockup.png">' if full else '<img class="s" src="../logo-taap.png">'
    return f'<div class="hd">{logo}<div class="n">0{k} / 0{total}</div></div>'
def dots(k,total): return '<div class="dots">'+''.join(f'<b class="{"on" if i==k else ""}"></b>' for i in range(1,total+1))+'</div>'
def ft(k,total,ref=''):
    return f'<div class="ft">{dots(k,total)}<span>{ref}</span><span class="u">taap.sa</span></div>'
def parts(r):
    if r.startswith('م '): return 'المادة', r[2:], False
    return '', r, True
def card(r,t,hi=False,big=True):
    chip,b,w=parts(r)
    ch=f'<span class="chip">{chip}</span>' if chip else ''
    bg=f'<div class="big{" w" if w else ""}">{b}</div>' if big else ''
    return f'<div class="card{" hi" if hi else ""}">{ch}{bg}<div class="txt">{t}</div></div>'
def lab(r):
    chip,b,w=parts(r); return f'{chip} {b}'.strip()
def layout(L,items,tip,hi):
    tipc=f'<div class="tipc"><div class="k">تنبيه عملي</div><div class="tt">{tip}</div></div>'
    band=f'<div class="band"><span class="k">تنبيه عملي</span><div class="tt">{tip}</div></div>'
    if L=='A':
        cs=''.join(card(r,t,i==hi) for i,(r,t) in enumerate(items))
        return f'<div class="A">{cs}{tipc}</div>'
    if L=='B':
        rs=''.join(f'<div class="row"><div class="no">{i}</div><div class="mid"><span class="chip">{lab(r)}</span><div class="txt">{t}</div></div></div>' for i,(r,t) in enumerate(items,1))
        return f'<div class="B">{rs}</div>'+band
    if L=='C':
        r0,t0=items[0]
        hero=f'<div class="hero"><span class="chip">{lab(r0)}</span><div class="txt">{t0}</div></div>'
        two=''.join(card(r,t,i==hi%2,big=False).replace('<span class="chip">','<span class="chip">',1) for i,(r,t) in enumerate(items[1:]))
        two=''.join(f'<div class="card{" hi" if i==hi%2 else ""}"><span class="chip">{lab(r)}</span><div class="txt">{t}</div></div>' for i,(r,t) in enumerate(items[1:]))
        return f'<div class="C">{hero}<div class="two">{two}</div></div>'+band
    if L=='D':
        top=''.join(card(r,t,i==hi%2) for i,(r,t) in enumerate(items[:2]))
        r2,t2=items[2]; c2,b2,w2=parts(r2)
        wide=f'<div class="card wide"><div class="wl"><span class="chip">{c2}</span><div class="big{" w" if w2 else ""}">{b2}</div></div><div class="txt">{t2}</div></div>'
        return f'<div class="D"><div class="top">{top}</div>{wide}</div>'+band
for i,T in enumerate(TOPICS):
    nn=f'{i+1:02d}'; total=5; theme=THEMES[i]; base=f'v6c/{nn}-{T["slug"]}'
    # cover
    var,motif=COVER[i]
    if var=='v2': lst=''.join(f'<div><i>{ar(k)}</i>{t}</div>' for k,t in enumerate(T['teaser'],1))
    else: lst=''.join(f'<div>{t}</div>' for t in T['teaser'])
    cover=hd(1,total,True)+motif+f'<div class="h1 fit" data-max="{168 if var=="v1" else 150}">{T["l1"]}</div><div class="h2 fit" data-max="{72 if var=="v1" else 68}">{T["l2"]}</div><div class="lst">{lst}</div><div class="cnt">٥ صفحات</div><div class="cta">اسحب للمتابعة&nbsp;←</div>'+f'<div class="ft"><span></span><span class="u">taap.sa</span></div>'
    open(f'{base}-p1.html','w',encoding='utf-8').write(page(theme,cover,f'cv {var}'))
    seq=SEQ[i%4]; lightk=i%3
    for j,P in enumerate(T['pages']):
        k=j+2; light=(j==lightk)
        body=hd(k,total)+f'<div class="kick">المعلومة {ar(j+1)} من {ar(3)}</div><div class="t fit" data-max="112">{P["t"]}</div><div class="body">{layout(seq[j],P["items"],P["tip"],(i+j)%3)}</div>'+ft(k,total,'المرجع: '+T['system'].split(' · ')[0])
        open(f'{base}-p{k}.html','w',encoding='utf-8').write(page(theme if not light else 'light',body))
    # solutions
    if i%2==0:
        sc=''.join(f'<div class="card{" hi" if n==1 else ""}"><div class="no">{ar(n)}</div><div class="txt">{s}</div></div>' for n,s in enumerate(T['steps'],1))
        steps=f'<div class="S1">{sc}</div>'
    else:
        st=''.join(f'<div class="st"><div class="no">{ar(n)}</div><div class="txt">{s}</div></div>' for n,s in enumerate(T['steps'],1))
        steps=f'<div class="S2">{st}</div>'
    ctc='ct fill' if i%3==0 else 'ct'
    sol=hd(5,total)+'<div class="kick">الحل</div><div class="t">خطواتك العملية</div><div class="body">'+steps+f'<div class="nt">{T["note"]}</div><div class="{ctc}"><div><div class="q">تحتاج رأياً في حالتك؟</div><div class="btn" style="display:inline-block">احجز استشارة</div></div><div class="ls"><span>WhatsApp</span> +966 56 677 0888<br><span>Web</span> taap.sa<br><span>Mail</span> info@taap.sa</div></div></div>'+f'<div class="ft">{dots(5,total)}<span>للتوعية العامة، ولا يغني عن استشارة متخصصة</span></div>'
    open(f'{base}-p5.html','w',encoding='utf-8').write(page(theme,sol))
with open('v6c/manifest.txt','w') as f:
    for i,T in enumerate(TOPICS):
        for k in range(1,6): f.write(f'v6c/{i+1:02d}-{T["slug"]}-p{k}.html|{i+1:02d}-{T["slug"]}|{k}\n')
print('built')
