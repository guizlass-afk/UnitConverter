/* Conversion factors: NIST SP 811; SI prefixes: BIPM. See SOURCES.md. */
'use strict';
const Catalog = (() => {
 const inch=.0254,foot=.3048,pound=.45359237,g=9.80665,lbf=pound*g,gal=231*inch**3,imp= .00454609,btu=1055.05585262;
 const categories=[];
 function add(id,pt,en,rows){const c={id,pt,en,units:rows.map(([symbol,factor,offset=0])=>({symbol,factor,offset}))};categories.push(c);return c;}
 add('length','Comprimento','Length', [['m',1],['mm',.001],['cm',.01],['km',1000],['µm',1e-6],['nm',1e-9],['in',inch],['ft',foot],['yd',3*foot],['mi',5280*foot],['nmi',1852],['mil (0.001 in)',inch/1000],['Å',1e-10],['ft (US survey, historic)',1200/3937]]);
 add('area','Área','Area',[['m²',1],['mm²',1e-6],['cm²',1e-4],['km²',1e6],['ha',1e4],['a',100],['in²',inch**2],['ft²',foot**2],['yd²',(3*foot)**2],['acre (international)',43560*foot**2],['mi²',(5280*foot)**2],['barn',1e-28]]);
 add('volume','Volume','Volume',[['m³',1],['L',.001],['mL',1e-6],['cm³',1e-6],['mm³',1e-9],['in³',inch**3],['ft³',foot**3],['yd³',(3*foot)**3],['gal (US liquid)',gal],['gal (Imperial)',imp],['qt (US liquid)',gal/4],['qt (Imperial)',imp/4],['pt (US liquid)',gal/8],['pt (Imperial)',imp/8],['fl oz (US)',gal/128],['fl oz (Imperial)',imp/160],['cup (US customary)',gal/16],['cup (metric 250 mL)',.00025],['tbsp (US)',gal/256],['tsp (US)',gal/768],['bbl (petroleum)',gal*42],['bushel (US dry)',.03523907016688]]);
 add('mass','Massa','Mass',[['kg',1],['g',.001],['mg',1e-6],['µg',1e-9],['t',1000],['lb',pound],['oz',pound/16],['stone',pound*14],['ton (US short)',pound*2000],['ton (UK long)',pound*2240],['grain',pound/7000],['oz t (troy)',pound*480/7000],['carat',.0002],['slug',lbf/foot]]);
 add('temperature','Temperatura','Temperature',[['°C',1,273.15],['°F',5/9,459.67*5/9],['K',1],['°R',5/9],['°Ré',1.25,273.15]]);
 add('temperatureDelta','Intervalo de temperatura','Temperature difference',[['Δ°C',1],['Δ°F',5/9],['ΔK',1],['Δ°R',5/9]]);
 add('force','Força','Force',[['N',1],['kN',1000],['MN',1e6],['kgf',g],['gf',g/1000],['tf',g*1000],['lbf',lbf],['ozf',lbf/16],['kip',lbf*1000],['dyn',1e-5],['pdl',pound*foot]]);
 add('pressure','Pressão / tensão','Pressure / stress',[['Pa',1],['kPa',1e3],['MPa',1e6],['GPa',1e9],['bar',1e5],['mbar',100],['psi',lbf/inch**2],['ksi',1000*lbf/inch**2],['psf',lbf/foot**2],['atm',101325],['Torr',101325/760],['mmHg (conventional)',133.3224],['inHg (conventional)',3386.389],['mmH₂O (conventional)',g],['inH₂O (conventional)',249.0889],['kgf/cm²',g*1e4],['kgf/mm²',g*1e6],['N/mm²',1e6],['Ba',.1]]);
 add('energy','Energia / trabalho','Energy / work',[['J',1],['kJ',1e3],['MJ',1e6],['Wh',3600],['kWh',3.6e6],['MWh',3.6e9],['cal (thermochemical)',4.184],['kcal (thermochemical)',4184],['cal (IT)',4.1868],['Btu (IT)',btu],['Btu (thermochemical)',1054.3502644888889],['ft·lbf',foot*lbf],['erg',1e-7],['eV',1.602176634e-19],['therm (US)',1.054804e8]]);
 add('power','Potência','Power',[['W',1],['kW',1e3],['MW',1e6],['hp (mechanical)',550*foot*lbf],['cv / PS (metric)',75*g],['hp (electric)',746],['Btu (IT)/h',btu/3600],['kcal (th)/h',4184/3600],['TR (refrigeration)',12000*btu/3600],['ft·lbf/s',foot*lbf]]);
 add('torque','Torque','Torque',[['N·m',1],['N·mm',.001],['kN·m',1000],['kgf·m',g],['kgf·cm',g/100],['lbf·ft',lbf*foot],['lbf·in',lbf*inch],['ozf·in',lbf*inch/16],['dyn·cm',1e-7]]);
 add('speed','Velocidade','Speed',[['m/s',1],['km/h',1/3.6],['cm/s',.01],['mm/s',.001],['ft/s',foot],['ft/min',foot/60],['in/s',inch],['mph',5280*foot/3600],['kn',1852/3600]]);
 add('acceleration','Aceleração','Acceleration',[['m/s²',1],['ft/s²',foot],['in/s²',inch],['g₀',g],['Gal',.01]]);
 add('time','Tempo','Time',[['s',1],['ms',.001],['µs',1e-6],['ns',1e-9],['min',60],['h',3600],['d',86400],['week (7 d)',604800],['year (Julian 365.25 d)',31557600]]);
 add('frequency','Frequência','Frequency',[['Hz',1],['kHz',1e3],['MHz',1e6],['GHz',1e9],['THz',1e12],['cycle/min',1/60]]);
 add('angle','Ângulo','Angle',[['rad',1],['°',Math.PI/180],['gon',Math.PI/200],['turn',2*Math.PI],['arcmin',Math.PI/10800],['arcsec',Math.PI/648000]]);
 add('angularSpeed','Velocidade angular','Angular speed',[['rad/s',1],['°/s',Math.PI/180],['rpm',Math.PI/30],['rev/s',2*Math.PI]]);
 add('flow','Vazão volumétrica','Volume flow',[['m³/s',1],['m³/h',1/3600],['L/s',.001],['L/min',.001/60],['L/h',.001/3600],['mL/min',1e-6/60],['ft³/s',foot**3],['cfm',foot**3/60],['gpm (US)',gal/60],['gpm (Imperial)',imp/60],['bbl/d (petroleum)',gal*42/86400]]);
 add('massFlow','Vazão mássica','Mass flow',[['kg/s',1],['kg/h',1/3600],['g/s',.001],['t/h',1000/3600],['lb/s',pound],['lb/h',pound/3600]]);
 add('density','Densidade','Density',[['kg/m³',1],['g/cm³',1000],['kg/L',1000],['g/L',1],['lb/ft³',pound/foot**3],['lb/in³',pound/inch**3],['lb/gal (US)',pound/gal],['lb/gal (Imperial)',pound/imp],['oz/in³',pound/16/inch**3]]);
 add('dynamicViscosity','Viscosidade dinâmica','Dynamic viscosity',[['Pa·s',1],['mPa·s',.001],['P',.1],['cP',.001],['lb/(ft·s)',pound/foot],['lbf·s/ft²',lbf/foot**2]]);
 add('kinematicViscosity','Viscosidade cinemática','Kinematic viscosity',[['m²/s',1],['mm²/s',1e-6],['St',1e-4],['cSt',1e-6],['ft²/s',foot**2],['in²/s',inch**2]]);
 add('surfaceTension','Tensão superficial','Surface tension',[['N/m',1],['mN/m',.001],['dyn/cm',.001],['lbf/in',lbf/inch],['lbf/ft',lbf/foot]]);
 add('conductivity','Condutividade térmica','Thermal conductivity',[['W/(m·K)',1],['W/(cm·K)',100],['Btu (IT)·ft/(h·ft²·°F)',btu/3600/foot*1.8],['Btu (IT)·in/(h·ft²·°F)',btu*inch/3600/foot**2*1.8]]);
 add('specificHeat','Calor específico','Specific heat capacity',[['J/(kg·K)',1],['kJ/(kg·K)',1000],['cal (th)/(g·K)',4184],['Btu (IT)/(lb·°F)',btu/pound*1.8]]);
 add('heatTransfer','Coeficiente de transferência térmica','Heat transfer coefficient',[['W/(m²·K)',1],['Btu (IT)/(h·ft²·°F)',btu/3600/foot**2*1.8]]);
 add('heatFlux','Fluxo de calor por área','Heat flux density',[['W/m²',1],['kW/m²',1000],['W/cm²',1e4],['Btu (IT)/(h·ft²)',btu/3600/foot**2]]);
 add('current','Corrente elétrica','Electric current',[['A',1],['mA',.001],['µA',1e-6],['kA',1000],['abA',10]]);
 add('voltage','Tensão elétrica','Voltage',[['V',1],['mV',.001],['µV',1e-6],['kV',1000],['MV',1e6],['abV',1e-8]]);
 add('resistance','Resistência elétrica','Electrical resistance',[['Ω',1],['mΩ',.001],['kΩ',1000],['MΩ',1e6],['abΩ',1e-9]]);
 add('conductance','Condutância elétrica','Electrical conductance',[['S',1],['mS',.001],['µS',1e-6],['nS',1e-9],['mho',1]]);
 add('charge','Carga elétrica','Electric charge',[['C',1],['mC',.001],['µC',1e-6],['Ah',3600],['mAh',3.6],['abC',10]]);
 add('capacitance','Capacitância','Capacitance',[['F',1],['mF',.001],['µF',1e-6],['nF',1e-9],['pF',1e-12],['abF',1e9]]);
 add('inductance','Indutância','Inductance',[['H',1],['mH',.001],['µH',1e-6],['nH',1e-9],['abH',1e-9]]);
 add('flux','Fluxo magnético','Magnetic flux',[['Wb',1],['mWb',.001],['µWb',1e-6],['Mx',1e-8]]);
 add('fluxDensity','Densidade de fluxo magnético','Magnetic flux density',[['T',1],['mT',.001],['µT',1e-6],['G',1e-4]]);
 add('illuminance','Iluminância','Illuminance',[['lx',1],['klx',1000],['fc',1/foot**2],['phot',1e4]]);
 add('luminance','Luminância','Luminance',[['cd/m²',1],['cd/ft²',1/foot**2],['stilb',1e4],['lambert',1e4/Math.PI],['foot-lambert',1/Math.PI/foot**2]]);
 add('intensity','Intensidade luminosa','Luminous intensity',[['cd',1],['mcd',.001],['kcd',1000]]);
 add('luminousFlux','Fluxo luminoso','Luminous flux',[['lm',1],['mlm',.001],['klm',1000]]);
 add('solidAngle','Ângulo sólido','Solid angle',[['sr',1],['msr',.001],['deg²',(Math.PI/180)**2],['sphere (4π sr)',4*Math.PI]]);
 add('activity','Atividade radioativa','Radioactivity',[['Bq',1],['kBq',1000],['MBq',1e6],['GBq',1e9],['Ci',3.7e10],['mCi',3.7e7],['µCi',3.7e4],['dpm',1/60]]);
 add('absorbedDose','Dose absorvida','Absorbed dose',[['Gy',1],['mGy',.001],['µGy',1e-6],['rad',.01]]);
 add('equivalentDose','Dose equivalente','Equivalent dose',[['Sv',1],['mSv',.001],['µSv',1e-6],['rem',.01],['mrem',1e-5]]);
 add('amount','Quantidade de substância','Amount of substance',[['mol',1],['mmol',.001],['µmol',1e-6],['kmol',1000],['lb-mol',453.59237]]);
 add('catalytic','Atividade catalítica','Catalytic activity',[['kat',1],['mkat',.001],['µkat',1e-6],['U (µmol/min)',1e-6/60]]);
 add('concentration','Concentração molar','Molar concentration',[['mol/m³',1],['mol/L',1000],['mmol/L',1],['µmol/L',.001]]);
 add('inertia','Momento de inércia de massa','Mass moment of inertia',[['kg·m²',1],['kg·cm²',1e-4],['g·cm²',1e-7],['lb·ft²',pound*foot**2],['lb·in²',pound*inch**2]]);
 add('secondMoment','Segundo momento de área','Second moment of area',[['m⁴',1],['cm⁴',1e-8],['mm⁴',1e-12],['in⁴',inch**4],['ft⁴',foot**4]]);
 add('data','Dados digitais','Digital data',[['bit',1],['B (byte)',8],['kbit',1e3],['Mbit',1e6],['Gbit',1e9],['kB',8e3],['MB',8e6],['GB',8e9],['TB',8e12],['KiB',8*1024],['MiB',8*1024**2],['GiB',8*1024**3],['TiB',8*1024**4]]);
 add('dataRate','Taxa de dados','Data rate',[['bit/s',1],['kbit/s',1e3],['Mbit/s',1e6],['Gbit/s',1e9],['B/s',8],['MB/s',8e6],['MiB/s',8*1024**2]]);
 add('ratio','Proporção','Ratio',[['1',1],['%',.01],['‰',.001],['ppm',1e-6],['ppb (10⁻⁹)',1e-9],['ppt (10⁻¹²)',1e-12]]);
 // Prefix expansion applies only to named SI units, never to offset temperatures.
 const prefixes=[['q',-30],['r',-27],['y',-24],['z',-21],['a',-18],['f',-15],['p',-12],['n',-9],['µ',-6],['m',-3],['c',-2],['d',-1],['da',1],['h',2],['k',3],['M',6],['G',9],['T',12],['P',15],['E',18],['Z',21],['Y',24],['R',27],['Q',30]];
 const bases={length:'m',mass:'g',force:'N',pressure:'Pa',energy:'J',power:'W',time:'s',frequency:'Hz',current:'A',voltage:'V',resistance:'Ω',conductance:'S',charge:'C',capacitance:'F',inductance:'H',flux:'Wb',fluxDensity:'T',illuminance:'lx',intensity:'cd',luminousFlux:'lm',solidAngle:'sr',activity:'Bq',absorbedDose:'Gy',equivalentDose:'Sv',amount:'mol',catalytic:'kat'};
 for(const c of categories){const base=c.units.find(u=>u.symbol===bases[c.id]);if(base)for(const [p,e] of prefixes){const symbol=p+base.symbol;if(!c.units.some(u=>u.symbol===symbol))c.units.push({symbol,factor:base.factor*10**e,offset:0,extended:true});}}
 function convert(id,value,from,to){const c=categories.find(c=>c.id===id),a=c?.units.find(u=>u.symbol===from),b=c?.units.find(u=>u.symbol===to);if(!a||!b||!Number.isFinite(value))throw Error('invalid');let base=value*a.factor+a.offset;if(id==='temperature'&&base< -1e-10)throw Error('absoluteZero');if(id==='temperature'&&base<0)base=0;const result=(base-b.offset)/b.factor;if(!Number.isFinite(result)||(value!==0&&base===0&&a.offset===0)||(base!==b.offset&&result===0))throw Error('range');return Object.is(result,-0)?0:result;}
 function parse(text){const s=String(text).trim();if(!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?$/i.test(s))throw Error('invalid');const v=Number(s.replace(',','.'));if(!Number.isFinite(v)||(v===0&&/[1-9]/.test(s.split(/e/i)[0])))throw Error('range');return v;}
 return {categories,prefixes,convert,parse};
})();
