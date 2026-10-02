from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
import csv, io, json, math, os
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args): pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(channel='chrome',headless=True)
  page=browser.new_page(viewport={'width':1440,'height':1000},accept_downloads=True)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(f'http://127.0.0.1:{server.server_port}/')
  cases=[('length',1,'in','mm',25.4),('length',1,'mi','km',1.609344),('area',1,'acre (international)','m²',4046.8564224),('volume',1,'gal (US liquid)','L',3.785411784),('volume',1,'gal (Imperial)','L',4.54609),('volume',1,'bushel (US dry)','m³',.03523907016688),('mass',1,'lb','kg',.45359237),('force',1,'kgf','N',9.80665),('force',1,'lbf','N',4.4482216152605),('pressure',1,'psi','Pa',6894.757293168),('pressure',1,'kgf/cm²','Pa',98066.5),('temperature',0,'°C','°F',32),('temperature',100,'°C','°F',212),('temperature',-40,'°F','°C',-40),('temperature',0,'K','°R',0),('temperature',-459.67,'°F','K',0),('temperatureDelta',1,'Δ°C','Δ°F',1.8),('energy',1,'kWh','J',3600000),('power',1,'hp (mechanical)','W',745.69987158227),('power',1,'cv / PS (metric)','W',735.49875),('torque',1,'lbf·ft','N·m',1.3558179483314),('speed',36,'km/h','m/s',10),('flow',1,'gpm (US)','L/min',3.785411784),('dynamicViscosity',1,'cP','mPa·s',1),('angularSpeed',60,'rpm','rad/s',2*math.pi),('data',1,'MiB','B (byte)',1048576),('ratio',1,'%','ppm',10000)]
  for cid,value,a,b,expected in cases:
   actual=page.evaluate('(a)=>Catalog.convert(...a)',[cid,value,a,b]);assert math.isclose(actual,expected,rel_tol=1e-11,abs_tol=1e-10),(cid,actual,expected)
  checked=page.evaluate("""()=>{let n=0;for(const c of Catalog.categories){const symbols=new Set();for(const u of c.units){if(symbols.has(u.symbol)||!(u.factor>0)||!Number.isFinite(u.factor))throw Error(c.id+u.symbol);symbols.add(u.symbol);const v=c.id==='temperature'?300:1.2345;const first=c.units[0].symbol;const result=Catalog.convert(c.id,v,u.symbol,first);const back=Catalog.convert(c.id,result,first,u.symbol);if(Math.abs(back-v)>1e-10*Math.max(1,Math.abs(v)))throw Error('round trip '+c.id+u.symbol);n++;}}return n;}""")
  for args in [('temperature',-274,'°C','K'),('force',1,'kgf','Pa'),('length',1e308,'km','mm'),('length',1e-300,'qm','m')]:
   assert page.evaluate('(a)=>{try{Catalog.convert(...a);return false}catch{return true}}',args),args
  for text in ['','abc','1,234.56','1 000','1e400','1e-400']:
   assert page.evaluate('(s)=>{try{Catalog.parse(s);return false}catch{return true}}',text),text
  assert page.evaluate("Catalog.parse('1,25e3')")==1250
  page.locator('[data-category="force"]').click();page.select_option('#from','kgf');page.select_option('#to','N');page.fill('#value','1');assert page.locator('#result').inner_text()=='9,80665'
  page.locator('#swap').click();assert page.locator('#result').inner_text()=='1'
  page.fill('#value','');assert page.locator('#copy').is_disabled();assert page.locator('#result').inner_text()=='—'
  page.fill('#value','1');page.select_option('#from','kgf');page.select_option('#to','N')
  with page.expect_download() as download:page.locator('#csv').click()
  rows=list(csv.reader(io.StringIO(Path(download.value.path()).read_text(encoding='utf-8-sig'))));assert any(row[-2:] == ['N','9.80665'] for row in rows)
  page.locator('#pressureCalculator summary').click();assert '98066,5' in page.locator('#pressureResult').inner_text()
  page.fill('#areaValue','0');assert page.locator('#pressureResult').inner_text()=='A área deve ser maior que zero.';page.fill('#areaValue','1')
  page.fill('#search','polegada');assert page.locator('[data-category="length"]').is_visible();page.fill('#search','');page.locator('[data-category="temperature"]').click();page.select_option('#from','°C');page.select_option('#to','°F');page.fill('#value','25');assert page.locator('#result').inner_text()=='77'
  page.fill('#value','-274');assert page.locator('#copy').is_disabled();page.fill('#value','25')
  data=json.loads((ROOT/'i18n-source.json').read_text(encoding='utf-8'))
  for lang in data:
   assert set(data[lang])==set(data['en-US']);assert len(data[lang]['categories'])==52
   page.locator('#languageButton').click();page.locator(f'[data-language="{lang}"]').click();assert page.locator('html').get_attribute('lang')==lang
   assert page.locator('h1').inner_text()==data[lang]['title'];assert page.locator('#currentFlag').evaluate('i=>i.complete&&i.naturalWidth>0')
   assert page.evaluate("[...document.querySelectorAll('[data-i18n]')].every(e=>e.textContent.trim())")
   for width in [1440,768,390,320]:
    page.set_viewport_size({'width':width,'height':900});assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(lang,width)
  page.locator('#languageButton').click();page.locator('[data-language="pt-BR"]').click()
  page.locator('#themeToggle').click();theme=page.locator('html').get_attribute('data-theme');page.reload();assert page.locator('html').get_attribute('data-theme')==theme
  assert page.locator('#value').input_value()=='25';assert page.locator('#result').inner_text()=='77'
  page.locator('#languageButton').focus();page.keyboard.press('ArrowDown');page.keyboard.press('End');assert page.locator('[data-language="ja-JP"]').evaluate('e=>e===document.activeElement');page.keyboard.press('Escape');assert page.locator('#languageMenu').is_hidden()
  page.set_viewport_size({'width':1440,'height':1000});page.evaluate("localStorage.setItem('factorytoolbox-theme','light')");page.reload();page.screenshot(path=str(Path(os.environ['TEMP'])/'unit-light.png'),full_page=True)
  page.locator('#themeToggle').click();page.screenshot(path=str(Path(os.environ['TEMP'])/'unit-dark.png'),full_page=True)
  page.set_viewport_size({'width':390,'height':844});page.screenshot(path=str(Path(os.environ['TEMP'])/'unit-mobile.png'),full_page=True)
  assert not errors,errors
  print(f'PASS: {len(cases)} independent reference conversions, {checked} unit round trips, invalid inputs, temperature limits, 12 languages, 4 widths, themes, CSV, pressure helper, keyboard and persistence.')
  browser.close()
finally:server.shutdown()
