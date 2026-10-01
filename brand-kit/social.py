import os, subprocess, sys

ROOT = "/Users/airm1/tnz-law-website"
B = f"file://{ROOT}/public/brand"
BL = f"file://{ROOT}/public/blog"
SRC = f"{ROOT}/brand-kit/src/social"
OUT = f"{ROOT}/brand-kit/out/social"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

BASE_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800&family=Aref+Ruqaa:wght@400;700&display=swap');
:root{--ink:#0b1626;--ink2:#14263d;--gold:#d0a751;--gs:#e6c988;--gl:#f6e2b3;--gd:#a9843c;--cream:#faf6ec}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:%W%px;height:%H%px;overflow:hidden;background:#0b1626}
body{font-family:'Alexandria',Tahoma,sans-serif;color:#fff;direction:rtl;position:relative}
img{display:block}
.abs{position:absolute}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.veil{position:absolute;inset:0}
.ltr{direction:ltr;unicode-bidi:isolate}
.glass{position:absolute;background:linear-gradient(135deg,rgba(255,255,255,.22),rgba(255,255,255,.05) 40%,rgba(255,255,255,.12));border:2px solid rgba(255,255,255,.6);backdrop-filter:blur(8px) saturate(140%);box-shadow:inset 0 0 0 3000px rgba(10,22,38,.40),inset 0 2px 0 rgba(255,255,255,.75),0 30px 70px -30px rgba(0,0,0,.6)}
.glass::after{content:"";position:absolute;inset:14px;border:1.5px solid rgba(240,216,148,.4);border-radius:inherit}
.eng{color:#fff;text-shadow:0 2px 0 rgba(255,255,255,.35),0 -2px 0 rgba(0,0,0,.28),0 14px 40px rgba(6,14,26,.55);font-weight:700;letter-spacing:-.01em}
.rq{font-family:'Aref Ruqaa',serif}
.gold{color:var(--gl)}
.rule{background:var(--gs)}
"""

def make(name, w, h, css, body):
    html = f"""<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>{BASE_CSS.replace('%W%',str(w)).replace('%H%',str(h))}{css}</style></head><body>{body}</body></html>"""
    p = f"{SRC}/{name}.html"
    open(p, "w").write(html)
    return p

def shot(name, w, h, sub=""):
    out_dir = f"{OUT}/{sub}" if sub else OUT
    os.makedirs(out_dir, exist_ok=True)
    out = f"{out_dir}/{name}.png"
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                    f"--window-size={w},{h}", "--virtual-time-budget=20000", f"--screenshot={out}",
                    f"file://{SRC}/{name}.html"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return out

def item(name, w, h, css, body, sub=""):
    make(name, w, h, css, body)
    return shot(name, w, h, sub)

MARK = f"{B}/logo-mark.png"
LOCK = f"{B}/logo-lockup.png"
KAFD = f"{B}/riyadh-kafd.jpg"
SKY = f"{B}/riyadh-skyline.jpg"

# ------------------------------------------------------------------ AVATARS
def avatars():
    css_dark = """
    body{background:radial-gradient(ellipse 80% 80% at 50% 35%,#1c3452 0%,#0b1626 72%)}
    .ring{position:absolute;left:50%;top:50%;width:900px;height:900px;margin:-450px 0 0 -450px;border-radius:50%;border:7px solid rgba(208,167,81,.85)}
    .ring2{position:absolute;left:50%;top:50%;width:820px;height:820px;margin:-410px 0 0 -410px;border-radius:50%;border:2px dashed rgba(230,201,136,.45)}
    .mk{position:absolute;left:50%;top:50%;width:540px;margin-left:-270px;margin-top:-227px}
    .sheen{position:absolute;left:50%;top:50%;width:900px;height:900px;margin:-450px 0 0 -450px;border-radius:50%;background:linear-gradient(135deg,rgba(255,255,255,.14),rgba(255,255,255,0) 45%)}
    """
    body = f'<div class="ring"></div><div class="ring2"></div><div class="sheen"></div><img class="mk" src="{MARK}">'
    item("avatar-dark", 1080, 1080, css_dark, body, "00-profile-pictures")
    css_light = """
    body{background:radial-gradient(ellipse 80% 80% at 50% 35%,#fffdf7 0%,#f3ead2 78%)}
    .ring{position:absolute;left:50%;top:50%;width:900px;height:900px;margin:-450px 0 0 -450px;border-radius:50%;border:7px solid rgba(169,132,60,.9)}
    .ring2{position:absolute;left:50%;top:50%;width:820px;height:820px;margin:-410px 0 0 -410px;border-radius:50%;border:2px dashed rgba(169,132,60,.45)}
    .mk{position:absolute;left:50%;top:50%;width:540px;margin-left:-270px;margin-top:-227px;filter:saturate(1.1) brightness(.92)}
    """
    item("avatar-light", 1080, 1080, css_light, body.replace('<div class="sheen"></div>', ''), "00-profile-pictures")

# ------------------------------------------------------------------ COVERS
def covers():
    # LinkedIn 1584x396 — avatar covers the lower-left, so the message sits right/centre
    css = """
    .veil{background:linear-gradient(90deg,rgba(8,18,32,.92) 0%,rgba(8,18,32,.55) 55%,rgba(8,18,32,.78) 100%)}
    .lock{position:absolute;top:44px;right:70px;width:290px}
    .msg{position:absolute;right:70px;top:170px;text-align:right}
    .msg h1{font-size:64px;line-height:1.3}
    .msg p{margin-top:10px;font-size:20px;letter-spacing:.14em;color:var(--gl);font-weight:500}
    .chip{position:absolute;left:230px;bottom:40px;display:flex;gap:14px;font-size:19px;color:rgba(255,255,255,.9)}
    .chip span{padding:8px 20px;border:1.5px solid rgba(240,216,148,.6);border-radius:99px;background:rgba(255,255,255,.08)}
    """
    body = f"""<img class="bg" src="{SKY}" style="object-position:50% 60%"><div class="veil"></div>
    <img class="lock" src="{LOCK}">
    <div class="msg"><h1 class="eng rq">فهمٌ يُسابق الرأْي</h1><p class="ltr">CORPORATE &amp; COMMERCIAL LEGAL COUNSEL · RIYADH</p></div>
    <div class="chip"><span>رخصة المحاماة 4477</span><span>عضو أساسي في الهيئة السعودية للمحامين</span></div>"""
    item("linkedin-cover-1584x396", 1584, 396, css, body, "01-linkedin")

    # X header 1500x500 — avatar covers lower-left; keep a clear centre-right band
    css = """
    .veil{background:linear-gradient(180deg,rgba(8,18,32,.55),rgba(8,18,32,.86))}
    .big{position:absolute;right:90px;top:120px;text-align:right}
    .big h1{font-size:92px;line-height:1.25}
    .big p{margin-top:16px;font-size:26px;font-weight:400;color:rgba(255,255,255,.88)}
    .mk{position:absolute;right:90px;top:52px;width:60px}
    .tag{position:absolute;left:300px;bottom:58px;font-size:22px;letter-spacing:.32em;color:var(--gl);font-weight:500}
    """
    body = f"""<img class="bg" src="{KAFD}" style="object-position:50% 40%"><div class="veil"></div>
    <img class="mk" src="{MARK}">
    <div class="big"><h1 class="eng">قبل التوقيع… اسأل.</h1><p>محاماة واستشارات قانونية في الرياض</p></div>
    <div class="tag ltr">TAAP · LAWYERS &amp; LEGAL CONSULTANTS</div>"""
    item("x-header-1500x500", 1500, 500, css, body, "02-x-twitter")

    # Facebook 1640x624 — mobile shows the centre ~ 640x360; everything lives in the middle
    css = """
    .veil{background:rgba(8,18,32,.5)}
    .g{left:50%;top:50%;width:1000px;height:330px;margin:-165px 0 0 -500px;border-radius:44px}
    .in{position:absolute;left:50%;top:50%;width:1000px;height:330px;margin:-165px 0 0 -500px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px}
    .in img{width:280px}
    .in h1{font-size:60px;line-height:1.3}
    .in p{font-size:22px;color:var(--gl);font-weight:500;letter-spacing:.06em}
    """
    body = f"""<img class="bg" src="{KAFD}" style="object-position:50% 35%"><div class="veil"></div>
    <div class="glass g"></div>
    <div class="in"><img src="{LOCK}"><h1 class="eng">شريكك القانوني في الرياض</h1><p>خدمات مركّزة · رأي دقيق · أثر عملي</p></div>"""
    item("facebook-cover-1640x624", 1640, 624, css, body, "05-facebook")

    # YouTube 2560x1440 — safe area 1546x423 in the centre
    css = """
    .veil{background:rgba(8,18,32,.58)}
    .g{left:50%;top:50%;width:1500px;height:400px;margin:-200px 0 0 -750px;border-radius:56px}
    .in{position:absolute;left:50%;top:50%;width:1500px;height:400px;margin:-200px 0 0 -750px;display:flex;align-items:center;justify-content:center;gap:80px}
    .in img{width:400px}
    .in .t{text-align:right;width:800px}
    .in h1{font-size:80px;line-height:1.3;white-space:nowrap}
    .in p{font-size:30px;color:var(--gl);margin-top:8px;font-weight:500}
    .div{width:3px;height:230px;background:rgba(240,216,148,.6)}
    """
    body = f"""<img class="bg" src="{SKY}" style="object-position:50% 50%"><div class="veil"></div>
    <div class="glass g"></div>
    <div class="in"><div class="t"><h1 class="eng">ثقافة قانونية بلغة واضحة</h1><p>قبل أن تحتاج إليها</p></div><div class="div"></div><img src="{LOCK}"></div>"""
    item("youtube-banner-2560x1440", 2560, 1440, css, body, "07-youtube")

    # Google Business 1080x608
    css = """
    .veil{background:linear-gradient(180deg,rgba(8,18,32,.62) 0%,rgba(8,18,32,.12) 38%,rgba(8,18,32,.92) 100%)}
    .lock{position:absolute;top:40px;right:48px;width:250px}
    .bar{position:absolute;left:48px;right:48px;bottom:40px;text-align:right}
    .bar h1{font-size:54px;line-height:1.3}
    .bar p{margin-top:10px;font-size:22px;color:var(--gl);font-weight:500}
    """
    body = f"""<img class="bg" src="{KAFD}" style="object-position:50% 45%"><div class="veil"></div>
    <img class="lock" src="{LOCK}">
    <div class="bar"><h1 class="eng">مكتب محاماة في الرياض</h1><p>حي الياسمين · رخصة المحاماة 4477</p></div>"""
    item("google-business-cover-1080x608", 1080, 608, css, body, "08-google-business")

# ------------------------------------------------------------------ INSTAGRAM HIGHLIGHTS
ICONS = {
 "scale":'<path d="M12 3v18M5 21h14M4 7h16"/><path d="M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',
 "book":'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5z"/><path d="M8 7h8M8 11h6"/>',
 "bulb":'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.7.6 1 1.4 1 2.1h5c0-.7.3-1.5 1-2.1A6 6 0 0 0 12 3z"/>',
 "building":'<path d="M4 21V5l8-3v19M12 21V9l8 3v9M2 21h20"/><path d="M8 8v.01M8 12v.01M8 16v.01M16 14v.01M16 17v.01"/>',
 "phone":'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
 "bell":'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
}
def highlights():
    css = """
    body{background:radial-gradient(ellipse 90% 60% at 50% 40%,#1c3452 0%,#0b1626 75%)}
    .r{position:absolute;left:50%;top:50%;width:760px;height:760px;margin:-380px 0 0 -380px;border-radius:50%;border:8px solid rgba(208,167,81,.9)}
    .d{position:absolute;left:50%;top:50%;width:640px;height:640px;margin:-320px 0 0 -320px;border-radius:50%;background:linear-gradient(140deg,rgba(255,255,255,.22),rgba(255,255,255,.04) 55%,rgba(255,255,255,.14));border:3px solid rgba(255,255,255,.55);backdrop-filter:blur(6px);box-shadow:inset 0 4px 0 rgba(255,255,255,.55)}
    .i{position:absolute;left:50%;top:50%;width:330px;height:330px;margin:-165px 0 0 -165px}
    """
    for key, icon, label in [("services","scale","الخدمات"),("articles","book","مقالات"),("tips","bulb","قبل التوقيع"),("about","building","عن المكتب"),("contact","phone","تواصل"),("alerts","bell","تنبيهات")]:
        body = f'<div class="r"></div><div class="d"></div><svg class="i" viewBox="0 0 24 24" fill="none" stroke="#f0d894" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">{ICONS[icon]}</svg>'
        item(f"highlight-{key}", 1080, 1920, css, body, "03-instagram/highlights")
        open(f"{OUT}/03-instagram/highlights/{key}.txt","w").write(f"اسم الغلاف في إنستغرام: {label}\n")

# ------------------------------------------------------------------ POSTS / STORIES
def posts():
    # P1 statement 1080x1350
    css = """
    .veil{background:linear-gradient(180deg,rgba(8,18,32,.55),rgba(8,18,32,.35) 45%,rgba(8,18,32,.85))}
    .g{left:70px;right:70px;top:300px;height:640px;border-radius:64px}
    .in{position:absolute;left:70px;right:70px;top:300px;height:640px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
    .in h1{font-size:150px;line-height:1.25}
    .in .r{width:110px;height:3px;margin:26px 0 22px}
    .in p{font-size:34px;color:var(--gl);font-weight:500;letter-spacing:.03em}
    .top{position:absolute;top:70px;left:0;right:0;display:flex;justify-content:center}
    .top img{width:300px}
    .bot{position:absolute;bottom:70px;left:0;right:0;text-align:center;font-size:28px;letter-spacing:.3em;color:rgba(255,255,255,.85)}
    """
    body = f"""<img class="bg" src="{KAFD}" style="object-position:38% 40%"><div class="veil"></div>
    <div class="top"><img src="{LOCK}"></div>
    <div class="glass g"></div>
    <div class="in"><h1 class="eng">فهمٌ يُسابق الرأْي</h1><span class="r rule"></span><p class="ltr">Understanding that runs ahead of opinion</p></div>
    <div class="bot ltr">TAAP.SA</div>"""
    item("post-01-statement-1080x1350", 1080, 1350, css, body, "03-instagram/posts")

    # P2 article card
    css = """
    body{background:#0b1626}
    .bg{filter:blur(6px);transform:scale(1.08)}
    .veil{background:rgba(8,18,32,.84)}
    .disc{position:absolute;right:70px;top:50px;font-size:24px;font-weight:600;color:var(--gl)}
    .card{position:absolute;left:70px;right:70px;top:110px;height:520px;border-radius:52px;overflow:hidden;border:3px solid rgba(240,216,148,.8)}
    .card img{width:100%;height:100%;object-fit:cover;object-position:50% 70%}
    .card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,18,32,0) 55%,rgba(8,18,32,.6))}
    .tags{position:absolute;right:70px;top:680px;display:flex;gap:16px;font-size:26px}
    .tags span{padding:9px 26px;border-radius:99px;border:2px solid rgba(240,216,148,.7);color:var(--gl);font-weight:600}
    h1{position:absolute;right:70px;left:70px;top:770px;font-size:82px;line-height:1.4;font-weight:700;text-align:right}
    .cta{position:absolute;right:70px;bottom:78px;font-size:30px;color:var(--gl);font-weight:600}
    .lock{position:absolute;left:70px;bottom:62px;width:260px}
    """
    body = f"""<img class="bg" src="{KAFD}"><div class="veil"></div>
    <div class="disc">معلومات عامة وليست استشارة قانونية</div>
    <div class="card"><img src="{BL}/a5.jpg"></div>
    <div class="tags"><span>مقال قانوني</span><span>للأفراد</span></div>
    <h1>هل يلزمني عقد وقّعته دون أن أقرأه؟</h1>
    <div class="cta">اقرأ المقال كاملًا على taap.sa ←</div>
    <img class="lock" src="{LOCK}">"""
    item("post-02-article-1080x1350", 1080, 1350, css, body, "03-instagram/posts")

    # P3 checklist
    css = """
    .veil{background:rgba(8,18,32,.86)}
    .disc{position:absolute;right:80px;top:64px;padding:12px 30px;border-radius:99px;border:2px solid rgba(240,216,148,.75);background:rgba(255,255,255,.08);font-size:27px;font-weight:600;color:var(--gl)}
    .head{position:absolute;right:80px;top:150px;text-align:right}
    .head small{display:block;font-size:26px;letter-spacing:.3em;color:var(--gs);font-weight:600}
    .head{left:80px}
    .head h1{font-size:92px;line-height:1.25;margin-top:14px;white-space:nowrap}
    .list{position:absolute;right:80px;left:80px;top:500px;display:flex;flex-direction:column;gap:34px}
    .row{display:flex;align-items:center;gap:34px;padding:34px 40px;border-radius:40px;background:linear-gradient(135deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:2px solid rgba(255,255,255,.35)}
    .n{font-size:110px;font-weight:800;line-height:1;color:transparent;-webkit-text-stroke:2.5px var(--gs);width:130px;text-align:center}
    .row p{font-size:48px;font-weight:600;line-height:1.5}
    .foot{position:absolute;right:80px;left:80px;bottom:74px;display:flex;justify-content:space-between;align-items:center}
    .foot span{font-size:22px;color:rgba(255,255,255,.65);max-width:600px;line-height:1.7}
    .foot img{width:250px}
    """
    body = f"""<img class="bg" src="{SKY}" style="object-position:50% 50%"><div class="veil"></div>
    <div class="disc">معلومات عامة وليست استشارة قانونية</div>
    <div class="head"><small>BEFORE YOU SIGN</small><h1 class="eng">قبل أن توقّع أي عقد</h1></div>
    <div class="list">
      <div class="row"><span class="n">1</span><p>من هم أطراف العقد فعلًا؟</p></div>
      <div class="row"><span class="n">2</span><p>ما التزاماتي، وما مقابلها؟</p></div>
      <div class="row"><span class="n">3</span><p>كيف ينتهي العقد، وما مدته؟</p></div>
    </div>
    <div class="foot"><span>للتواصل: taap.sa</span><img src="{LOCK}"></div>"""
    item("post-03-checklist-1080x1350", 1080, 1350, css, body, "03-instagram/posts")

    # Story / reel cover 1080x1920 ("دقيقة قانونية")
    css = """
    .veil{background:linear-gradient(180deg,rgba(8,18,32,.6),rgba(8,18,32,.25) 40%,rgba(8,18,32,.88))}
    .g{left:70px;right:70px;top:640px;height:560px;border-radius:64px}
    .in{position:absolute;left:70px;right:70px;top:640px;height:560px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
    .in small{font-size:28px;letter-spacing:.4em;color:var(--gl);font-weight:600}
    .in h1{font-size:170px;line-height:1.2;margin-top:6px}
    .in p{font-size:38px;margin-top:10px;color:rgba(255,255,255,.9)}
    .top{position:absolute;top:120px;left:0;right:0;display:flex;justify-content:center}
    .top img{width:320px}
    .bot{position:absolute;bottom:130px;left:0;right:0;text-align:center;font-size:30px;letter-spacing:.3em;color:rgba(255,255,255,.85)}
    """
    body = f"""<img class="bg" src="{KAFD}" style="object-position:35% 50%"><div class="veil"></div>
    <div class="top"><img src="{LOCK}"></div>
    <div class="glass g"></div>
    <div class="in"><small class="ltr">LEGAL MINUTE</small><h1 class="eng rq">دقيقة قانونية</h1><p>الحلقة 01</p></div>
    <div class="bot ltr">TAAP.SA</div>"""
    item("story-template-1080x1920", 1080, 1920, css, body, "03-instagram/stories")
    item("tiktok-video-cover-1080x1920", 1080, 1920, css, body, "06-tiktok")

    # X post 1600x900 — a real line from the firm's service standard
    css = """
    .veil{background:linear-gradient(90deg,rgba(8,18,32,.92),rgba(8,18,32,.6))}
    .q{position:absolute;right:120px;left:120px;top:210px;text-align:right}
    .q small{font-size:26px;letter-spacing:.3em;color:var(--gs);font-weight:600}
    .q h1{font-size:120px;line-height:1.3;margin-top:16px}
    .q p{font-size:40px;color:rgba(255,255,255,.9);margin-top:24px;font-weight:400;line-height:1.6}
    .lock{position:absolute;right:120px;bottom:80px;width:300px}
    .site{position:absolute;left:120px;bottom:96px;font-size:28px;letter-spacing:.3em;color:var(--gl)}
    """
    body = f"""<img class="bg" src="{SKY}" style="object-position:50% 55%"><div class="veil"></div>
    <div class="q"><small class="ltr">SERVICE STANDARD · 02</small><h1 class="eng">اختصار مفيد</h1><p>يكفي الاختصار، ولا اختزال حيث يلزم التفصيل.</p></div>
    <img class="lock" src="{LOCK}"><div class="site ltr">TAAP.SA</div>"""
    item("x-post-quote-1600x900", 1600, 900, css, body, "02-x-twitter")

    # LinkedIn post 1200x627
    css = """
    .veil{background:linear-gradient(90deg,rgba(8,18,32,.94) 10%,rgba(8,18,32,.55))}
    .q{position:absolute;right:90px;left:90px;top:130px;text-align:right}
    .q small{font-size:22px;letter-spacing:.3em;color:var(--gs);font-weight:600}
    .q h1{font-size:88px;line-height:1.3;margin-top:12px}
    .q p{font-size:32px;color:rgba(255,255,255,.9);margin-top:18px;font-weight:400}
    .lock{position:absolute;right:90px;bottom:58px;width:250px}
    .site{position:absolute;left:90px;bottom:70px;font-size:22px;letter-spacing:.3em;color:var(--gl)}
    """
    body = f"""<img class="bg" src="{KAFD}" style="object-position:40% 45%"><div class="veil"></div>
    <div class="q"><small class="ltr">SERVICE STANDARD · 01</small><h1 class="eng">وضوح النطاق</h1><p>اتفاق مبكر على المطلوب والافتراضات.</p></div>
    <img class="lock" src="{LOCK}"><div class="site ltr">TAAP.SA</div>"""
    item("linkedin-post-1200x627", 1200, 627, css, body, "01-linkedin")


ARTICLES = [
 ("arbitration-clause", "بند التحكيم في العقود التجارية: كيف تصوغه بدقة؟", "للشركات", "b3.jpg"),
 ("personal-data", "نظام حماية البيانات الشخصية: ما الذي يلزم منشأتك؟", "للشركات", "b5.jpg"),
 ("conflict-of-interest", "سياسة تعارض المصالح: كيف تصوغها في منشأتك؟", "للشركات", "b4.jpg"),
 ("due-diligence", "العناية الواجبة قبل الصفقة: ما الذي تفحصه قبل أن تدفع؟", "للشركات", "a3.jpg"),
 ("residential-lease", "عقد الإيجار السكني: ما الذي تتحقق منه قبل التوقيع؟", "للأفراد", "b7.jpg"),
 ("power-of-attorney", "الوكالة الشرعية: كيف تمنحها دون أن تعرّض نفسك للخطر؟", "للأفراد", "b1.jpg"),
]
def article_cards():
    css = """
    body{background:#0b1626}
    .bg{filter:blur(6px);transform:scale(1.08)}
    .veil{background:rgba(8,18,32,.84)}
    .disc{position:absolute;right:70px;top:50px;font-size:24px;font-weight:600;color:var(--gl)}
    .card{position:absolute;left:70px;right:70px;top:110px;height:520px;border-radius:52px;overflow:hidden;border:3px solid rgba(240,216,148,.8)}
    .card img{width:100%;height:100%;object-fit:cover;object-position:50% 55%}
    .card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,18,32,0) 55%,rgba(8,18,32,.6))}
    .tags{position:absolute;right:70px;top:680px;display:flex;gap:16px;font-size:26px}
    .tags span{padding:9px 26px;border-radius:99px;border:2px solid rgba(240,216,148,.7);color:var(--gl);font-weight:600}
    h1{position:absolute;right:70px;left:70px;top:770px;font-size:74px;line-height:1.45;font-weight:700;text-align:right}
    .cta{position:absolute;right:70px;bottom:78px;font-size:30px;color:var(--gl);font-weight:600}
    .lock{position:absolute;left:70px;bottom:62px;width:260px}
    """
    for key, title, aud, img in ARTICLES:
        body = f"""<img class="bg" src="{KAFD}"><div class="veil"></div>
        <div class="disc">معلومات عامة وليست استشارة قانونية</div>
        <div class="card"><img src="{BL}/{img}"></div>
        <div class="tags"><span>مقال قانوني</span><span>{aud}</span></div>
        <h1>{title}</h1>
        <div class="cta">اقرأ المقال كاملًا على taap.sa ←</div>
        <img class="lock" src="{LOCK}">"""
        item(f"article-{key}-1080x1350", 1080, 1350, css, body, "03-instagram/posts/articles")

if __name__ == "__main__":
    what = sys.argv[1:] or ["avatars","covers","highlights","posts"]
    for w in what: globals()[w]()
    print("done")
