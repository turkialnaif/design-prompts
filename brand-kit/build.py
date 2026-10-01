import os, subprocess, textwrap, json

ROOT = "/Users/airm1/tnz-law-website"
B = f"file://{ROOT}/public/brand"
SRC = f"{ROOT}/brand-kit/src"
OUT = f"{ROOT}/brand-kit/out"

# ---- editable details -------------------------------------------------------
F = dict(
    name_ar="تركي النايف", role_ar="محامٍ | مؤسس ومدير المكتب",
    name_en="Turki AlNaif", role_en="Lawyer | Founder & Managing Partner",
    firm_ar="تركي النايف وشركاؤه للمحاماة والاستشارات القانونية", firm_en="Turki AlNaif & Partners",
    phone="+966 56 677 0888", email="turki@taap.sa", web="taap.sa",
    addr_ar="حي الياسمين، الرياض 13326", addr_en="Al Yasmin District, Riyadh 13326",
    lic="4477", uni="7030708403",
    tagline_ar="شريك قانوني يربط الحُكم المهني بسياق الأعمال",
    tagline_en="A legal partner connecting professional judgment with business context.",
    wa="https://wa.me/966566770888",
)

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&display=swap');
:root{--ink:#0b1626;--ink2:#14263d;--gold:#d0a751;--gs:#e6c988;--gd:#a9843c;--cream:#faf6ec;--soft:#2a3849}
*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{background:#fff}
body{font-family:'Alexandria',Tahoma,sans-serif;color:var(--ink)}
.pg{position:relative;overflow:hidden;break-after:page}
.pg:last-child{break-after:auto}
.abs{position:absolute}
img{display:block}
.ltr{direction:ltr;unicode-bidi:isolate}
"""

def page(css_extra, body, size_css):
    return f"""<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<style>@page{{{size_css};margin:0}}{CSS}{css_extra}</style></head><body>{body}</body></html>"""

def icon(kind, color="#a9843c", size=9):
    paths = {
      "phone":'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
      "mail":'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
      "globe":'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
      "pin":'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    }[kind]
    return f'<svg viewBox="0 0 24 24" width="{size}" height="{size}" fill="none" stroke="{color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex:none">{paths}</svg>'

def qr_svg(data):
    js = "const Q=require('qrcode');Q.toString(process.argv[1],{type:'svg',margin:0,color:{dark:'#0b1626',light:'#0000'}}).then(s=>process.stdout.write(s))"
    return subprocess.check_output(["node","-e",js,data],cwd=ROOT,text=True)

def write(name, html):
    open(f"{SRC}/{name}.html","w").write(html)

# ============================ BUSINESS CARD ==================================
# page = trim 90x50 + 3mm bleed each side
card_css = f"""
.pg{{width:96mm;height:56mm}}
.bg{{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}}
.veil{{position:absolute;inset:0;background:rgba(8,18,32,.74)}}
.frame{{position:absolute;inset:7mm;border:.2mm solid rgba(240,216,148,.55);border-radius:2mm}}
.front .center{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}}
.rule{{display:block;width:14mm;height:.25mm;background:var(--gs);margin:3.2mm 0 2.6mm}}
.tag{{font-size:5.6pt;font-weight:300;color:rgba(255,255,255,.82);letter-spacing:.02em}}
.back{{background:var(--cream)}}
.b-in{{position:absolute;left:7mm;right:7mm;top:7mm;bottom:7mm;display:flex;flex-direction:column;justify-content:space-between}}
.cols{{display:flex;justify-content:space-between;align-items:flex-start}}
.col{{width:38mm}}
.nm{{font-weight:700;font-size:10.5pt;line-height:1.35;color:var(--ink)}}
.rl{{font-weight:500;font-size:5.6pt;line-height:1.7;color:var(--gd);margin-top:.6mm}}
.div{{width:.2mm;align-self:stretch;background:rgba(169,132,60,.45);margin:0 1mm}}
.hr{{height:.2mm;background:rgba(169,132,60,.45);margin:0 0 3mm}}
.foot{{display:flex;justify-content:space-between;align-items:center;gap:3mm}}
.lines{{display:flex;flex-direction:column;gap:1.25mm;font-size:6pt;font-weight:500;color:var(--soft)}}
.lines div{{display:flex;align-items:center;gap:1.6mm}}
.qr{{width:14.5mm;height:14.5mm;flex:none}}
.qr svg{{width:100%;height:100%}}
.mk{{width:6mm;opacity:1}}
"""
card_body = f"""
<section class="pg front">
  <img class="bg" src="{B}/riyadh-kafd.jpg" style="object-position:50% 42%">
  <div class="veil"></div><div class="frame"></div>
  <div class="center">
    <img src="{B}/logo-lockup.png" style="width:52mm">
    <span class="rule"></span>
    <p class="tag">{F['tagline_ar']}</p>
  </div>
</section>
<section class="pg back">
  <div class="b-in">
    <div class="cols">
      <div class="col" style="text-align:right">
        <div class="nm">{F['name_ar']}</div>
        <div class="rl">{F['role_ar']}</div>
      </div>
      <div class="div"></div>
      <div class="col ltr" style="text-align:left">
        <div class="nm">{F['name_en']}</div>
        <div class="rl">{F['role_en']}</div>
      </div>
    </div>
    <div><div class="hr"></div>
    <div class="foot">
      <div class="qr">{qr_svg(F['wa'])}</div>
      <div class="lines ltr">
        <div>{icon('phone')}<span>{F['phone']}</span></div>
        <div>{icon('mail')}<span>{F['email']}</span></div>
        <div>{icon('globe')}<span>{F['web']}</span></div>
        <div>{icon('pin')}<span style="font-weight:400">{F['addr_en']}</span></div>
        <div style="direction:rtl">{icon('pin')}<span style="font-weight:400">{F['addr_ar']}</span></div>
      </div>
    </div></div>
  </div>
</section>"""
write("business-card", page(card_css, card_body, "size:96mm 56mm"))

# ============================ LETTERHEAD =====================================
def letterhead(lang):
    ar = lang == "ar"
    d = "rtl" if ar else "ltr"
    css = f"""
    .pg{{width:210mm;height:297mm;background:#fff}}
    .topbar{{position:absolute;left:0;right:0;top:0;height:7mm;background:var(--ink)}}
    .topbar i{{position:absolute;left:0;right:0;bottom:0;height:.9mm;background:var(--gold)}}
    .head{{position:absolute;top:17mm;left:20mm;right:20mm;display:flex;justify-content:{'flex-start' if ar else 'flex-start'};align-items:center}}
    .head img{{width:64mm}}
    .rule{{position:absolute;top:46mm;left:20mm;right:20mm;height:.3mm;background:linear-gradient(90deg,var(--gold),rgba(208,167,81,.25))}}
    .meta{{position:absolute;top:53mm;{'left' if ar else 'right'}:20mm;font-size:8.5pt;color:var(--soft);line-height:2.3}}
    .meta div{{display:flex;gap:2.5mm;align-items:baseline}}
    .meta b{{font-weight:600;color:var(--gd)}}
    .meta span{{display:inline-block;width:34mm;border-bottom:.2mm dotted rgba(42,56,73,.5)}}
    .fbar{{position:absolute;left:0;right:0;bottom:0;height:23mm;background:var(--ink);color:#fff}}
    .fbar i{{position:absolute;left:0;right:0;top:0;height:.9mm;background:var(--gold)}}
    .fin{{position:absolute;left:20mm;right:20mm;top:5.4mm;display:flex;flex-direction:column;align-items:center;gap:1.7mm;font-size:8pt}}
    .row1{{display:flex;gap:6mm;align-items:center;font-weight:400;color:rgba(255,255,255,.92)}}
    .row1>div{{display:flex;gap:1.6mm;align-items:center}}
    .row2{{font-size:7pt;letter-spacing:.06em;color:var(--gs);font-weight:500}}
    """
    contacts = f"""
      <div>{icon('pin','#e6c988',9)}<span>{F['addr_ar'] if ar else F['addr_en']}</span></div>
      <div class="ltr">{icon('phone','#e6c988',9)}<span>{F['phone']}</span></div>
      <div class="ltr">{icon('mail','#e6c988',9)}<span>{F['email']}</span></div>
      <div class="ltr">{icon('globe','#e6c988',9)}<span>{F['web']}</span></div>"""
    lic = (f"رخصة مزاولة المحاماة رقم {F['lic']} · السجل الموحد {F['uni']}" if ar
           else f"Law Practice Licence No. {F['lic']} · Unified No. {F['uni']}")
    meta = ("<div><b>الرقم:</b><span></span></div><div><b>التاريخ:</b><span></span></div><div><b>المرفقات:</b><span></span></div>" if ar
            else "<div><b>Ref:</b><span></span></div><div><b>Date:</b><span></span></div><div><b>Encl.:</b><span></span></div>")
    body = f"""<section class="pg" dir="{d}">
      <div class="topbar"><i></i></div>
      <div class="head"><img src="{B}/logo-lockup.png"></div>
      <div class="rule"></div>
      <div class="meta">{meta}</div>
      <div class="fbar"><i></i><div class="fin"><div class="row1">{contacts}</div><div class="row2">{lic}</div></div></div>
    </section>"""
    return page(css, body, "size:210mm 297mm")
write("letterhead-ar", letterhead("ar")); write("letterhead-en", letterhead("en"))

# ============================ ENVELOPE (DL 220x110) ==========================
env_css = f"""
.pg{{width:220mm;height:110mm}}
.f{{background:#fff}}
.f .logo{{position:absolute;top:11mm;left:14mm;width:50mm}}
.f .ret{{position:absolute;top:36mm;left:14mm;font-size:6.6pt;line-height:1.9;color:var(--soft)}}
.f .ret b{{color:var(--ink);font-weight:600}}
.f .ln{{position:absolute;left:0;right:0;bottom:0;height:5mm;background:var(--ink)}}
.f .ln i{{position:absolute;left:0;right:0;top:0;height:.7mm;background:var(--gold)}}
.k{{background:var(--ink)}}
.k .bg{{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 45%}}
.k .veil{{position:absolute;inset:0;background:rgba(8,18,32,.78)}}
.k .c{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5mm}}
.k .c small{{font-size:7.5pt;letter-spacing:.32em;color:var(--gs);font-weight:500}}
"""
env_body = f"""
<section class="pg f">
  <img class="logo" src="{B}/logo-lockup.png">
  <div class="ret ltr"><b>{F['firm_en']}</b><br>{F['addr_en']} · Saudi Arabia<br>{F['phone']} · {F['web']}</div>
  <div class="ln"><i></i></div>
</section>
<section class="pg k">
  <img class="bg" src="{B}/riyadh-skyline.jpg"><div class="veil"></div>
  <div class="c"><img src="{B}/logo-mark.png" style="width:15mm"><small class="ltr">{F['web'].upper()}</small></div>
</section>"""
write("envelope-dl", page(env_css, env_body, "size:220mm 110mm"))

# ============================ COMPLIMENTS SLIP (DL 210x99) ===================
cs_css = f"""
.pg{{width:210mm;height:99mm;background:#fff}}
.logo{{position:absolute;top:12mm;right:18mm;width:56mm}}
.msg{{position:absolute;top:44mm;right:18mm;left:18mm;text-align:right}}
.msg h2{{font-size:15pt;font-weight:600;color:var(--ink)}}
.msg p{{font-size:8.5pt;color:var(--gd);margin-top:1.5mm;letter-spacing:.06em;font-weight:500}}
.msg .g{{display:block;width:16mm;height:.4mm;background:var(--gold);margin-top:4mm}}
.fbar{{position:absolute;left:0;right:0;bottom:0;height:14mm;background:var(--ink);color:#fff}}
.fbar i{{position:absolute;left:0;right:0;top:0;height:.7mm;background:var(--gold)}}
.fin{{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:6mm;font-size:7.6pt}}
.fin>div{{display:flex;gap:1.6mm;align-items:center}}
"""
cs_body = f"""
<section class="pg">
  <img class="logo" src="{B}/logo-lockup.png">
  <div class="msg"><h2>مع تحيات مكتب {F['firm_ar'].split(' للمحاماة')[0]}</h2><p class="ltr" style="text-align:right">WITH COMPLIMENTS</p><span class="g" style="margin-inline-start:0;margin-left:auto"></span></div>
  <div class="fbar"><i></i><div class="fin">
    <div>{icon('pin','#e6c988',9)}<span>{F['addr_ar']}</span></div>
    <div class="ltr">{icon('phone','#e6c988',9)}<span>{F['phone']}</span></div>
    <div class="ltr">{icon('mail','#e6c988',9)}<span>{F['email']}</span></div>
    <div class="ltr">{icon('globe','#e6c988',9)}<span>{F['web']}</span></div>
  </div></div>
</section>"""
write("compliments-slip", page(cs_css, cs_body, "size:210mm 99mm"))

# ============================ EMAIL SIGNATURE ================================
sig = f"""<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>Email signature</title></head><body style="margin:24px;background:#fff">
<table cellpadding="0" cellspacing="0" style="font-family:Tahoma,Arial,sans-serif;font-size:13px;color:#2a3849;border-collapse:collapse;direction:rtl">
 <tr>
  <td style="padding-left:18px;border-left:2px solid #d0a751;vertical-align:top">
    <img src="https://tnz-law-website.vercel.app/brand/logo-lockup.png" width="190" alt="{F['firm_en']}" style="display:block">
  </td>
  <td style="padding-right:18px;vertical-align:top;line-height:1.7">
    <div style="font-size:16px;font-weight:bold;color:#0b1626">{F['name_ar']}</div>
    <div style="color:#a9843c;font-size:12px">{F['role_ar']}</div>
    <div style="margin-top:8px;direction:ltr;text-align:right">{F['phone']}</div>
    <div style="direction:ltr;text-align:right"><a href="mailto:{F['email']}" style="color:#2a3849;text-decoration:none">{F['email']}</a></div>
    <div style="direction:ltr;text-align:right"><a href="https://{F['web']}" style="color:#a9843c;text-decoration:none">{F['web']}</a></div>
    <div style="margin-top:6px;font-size:11px;color:#6b7a8d">{F['addr_ar']}</div>
  </td>
 </tr>
</table></body></html>"""
open(f"{SRC}/email-signature.html","w").write(sig)
print("html written")
