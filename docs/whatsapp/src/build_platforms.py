import os,re,subprocess,json
SRC=os.path.dirname(os.path.abspath(__file__))
OUT=os.path.join(SRC,'..','platforms'); os.makedirs(OUT,exist_ok=True)
JOBS=[('02-shares-or-assets','shares-or-assets','linkedin','document'),
      ('03-partner-exit','partner-exit','instagram','story'),
      ('04-agreed-compensation','agreed-compensation','facebook','story'),
      ('05-minority-partner','minority-partner','tiktok','photo')]
# 1) platform QR codes (tracked per platform)
js="const QR=require('qrcode'),fs=require('fs');(async()=>{"+''.join(
 f"fs.writeFileSync('{SRC}/v6c/qr-{p}-{s}.svg',(await QR.toString('https://taap.sa/?utm_source={p}&utm_medium={m}&utm_campaign={s}',{{type:'svg',margin:0,errorCorrectionLevel:'M'}})).replace('#ffffff','#f2e9d0').replace('#000000','#0a1522'));"
 for d,s,p,m in JOBS)+"})()"
subprocess.run(['node','-e',js],cwd='/Users/airm1/tnz-law-website',check=True)
# 2) last-page variants
css_extra='''
.noqr .qr{display:none}.noqr .cpb{min-height:250px}.noqr .tiles{grid-auto-rows:1fr}.noqr .tl{padding:18px 20px}
'''
c=open(f'{SRC}/v6c/bold6.css',encoding='utf-8').read()
if '.noqr' not in c: open(f'{SRC}/v6c/bold6.css','a',encoding='utf-8').write(css_extra)
for d,s,p,m in JOBS:
    h=open(f'{SRC}/v6c/{d}-p5.html',encoding='utf-8').read()
    if m=='document':
        h=h.replace(f'qr-{s}.svg',f'qr-{p}-{s}.svg')
    else:
        h=h.replace('<div class="cp">','<div class="cp noqr">')
    open(f'{SRC}/v6c/{d}-p5-{p}.html','w',encoding='utf-8').write(h)
    subprocess.run(['node',f'{SRC}/shot.mjs',f'{SRC}/v6c/{d}-p5-{p}.html',f'/tmp/{d}-p5-{p}.png','1080','1350'],check=True)
print('variants ok')
