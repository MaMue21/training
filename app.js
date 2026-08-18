/* ============ DATENMODELL ============ */
const STORAGE_KEY = "trainingsapp_v2";

/* Programme: Gym (Vorbild-Plan) und Home (Körpergewicht/Reise).
   Jede Übung hat einen "tier":
     core      → in Voll und Kurz enthalten (Grundübungen)
     accessory → in Voll und Kurz (unterstützend)
     isolation → nur in Voll (Feinschliff)
   Gleiche IDs verknüpfen dieselbe Übung über Einheiten hinweg (Progression).
   Gym- und Home-IDs sind bewusst getrennt (unterschiedliche Übungen, getrennte Bestwerte). */
const PROGRAMS = {
  gym: { name:'Gym', workouts: {
    A: { name:'Ganzkörper A', exercises: [
      {id:'squat_var',    name:'Kniebeugevariation',            muscle:'Beine',    tier:'core',      sets:3, repMin:6,  repMax:8,  unit:'kg', inc:2.5, type:'weight',
        examples:['Kniebeuge frei/Multipresse','Hack Squat','Pendulum Squat','Split Squat','Bulgarian Split Squat']},
      {id:'hpress',       name:'Horizontale Druckbewegung',     muscle:'Brust',    tier:'core',      sets:3, repMin:6,  repMax:10, unit:'kg', inc:2.5, type:'weight',
        examples:['Bankdrücken LH','Bankdrücken KH','Bankdrücken Multipresse','Brustpresse Maschine','Cable Press']},
      {id:'vpull_wide',   name:'Vertikale Zugbewegung breit',   muscle:'Rücken',   tier:'core',      sets:2, repMin:6,  repMax:10, unit:'kg', inc:2.5, type:'weight',
        examples:['Latziehen breit','Latzugmaschine breit','Klimmzüge breit']},
      {id:'hpull_wide',   name:'Horizontale Zugbewegung breit', muscle:'Rücken',   tier:'accessory', sets:2, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Rudern breit Kabelzug','Rudern breit KH','Rudern breit LH','Rudermaschine breit brustgestützt','T-Bar Rudern']},
      {id:'lateral',      name:'Seithebevariation',             muscle:'Schulter', tier:'accessory', sets:3, repMin:8,  repMax:12, unit:'kg', inc:1,   type:'weight',
        examples:['Seitheben KH','Seitheben Kabelzug','Seitheben Maschine']},
      {id:'legcurl',      name:'Beinbeuger Isolation',          muscle:'Beine',    tier:'isolation', sets:2, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Beinbeuger sitzend','Beinbeuger liegend']},
      {id:'biceps',       name:'Bizeps Isolation',              muscle:'Arme',     tier:'isolation', sets:2, repMin:6,  repMax:10, unit:'kg', inc:1,   type:'weight',
        examples:['Preacher Curls Maschine','Preacher Curls KH','Kurzhantelcurls stehend','Kurzhantelcurls sitzend','Curls am Kabelzug']},
      {id:'carry',        name:'Farmers Carry',                 muscle:'Core',     tier:'isolation', sets:3, repMin:20, repMax:45, unit:'kg', inc:2.5, type:'weight', repUnit:'Sek.',
        examples:['Farmers Carry KH','Farmers Walk Trap Bar','Koffergriff einarmig','Farmers Carry Griffe']}
    ]},
    B: { name:'Ganzkörper B', exercises: [
      {id:'deadlift_var', name:'Kreuzhebevariation',            muscle:'Rücken',   tier:'core',      sets:3, repMin:5,  repMax:8,  unit:'kg', inc:5,   type:'weight',
        examples:['Konventionelles Kreuzheben','Rumänisches Kreuzheben','Rumänisches Kreuzheben KH','Stiff Leg Deadlift']},
      {id:'vpress',       name:'Vertikale Druckbewegung',       muscle:'Schulter', tier:'core',      sets:3, repMin:6,  repMax:8,  unit:'kg', inc:2.5, type:'weight',
        examples:['Schulterdrücken KH','Schulterdrücken LH','Schulterdrücken Maschine']},
      {id:'hpull_close',  name:'Horizontale Zugbewegung eng',   muscle:'Rücken',   tier:'accessory', sets:3, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Rudern eng Kabelzug','Rudern eng KH','Rudern eng LH','Rudermaschine eng brustgestützt']},
      {id:'triceps',      name:'Trizeps Isolation',             muscle:'Arme',     tier:'accessory', sets:3, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Trizepsdrücken Überkopf Kabel','Trizepsdrücken Überkopf KH','Pushdowns am Seil','Katana Extensions','French Press','Skull Crusher']},
      {id:'fly',          name:'Flyvariante',                   muscle:'Brust',    tier:'isolation', sets:2, repMin:8,  repMax:12, unit:'kg', inc:1,   type:'weight',
        examples:['Fly am Kabelzug','Butterflymaschine','Fly mit Kurzhanteln']},
      {id:'reardelt',     name:'Hintere Schulter Isolation',    muscle:'Schulter', tier:'isolation', sets:2, repMin:8,  repMax:12, unit:'kg', inc:1,   type:'weight',
        examples:['Rear Delt Row','Reverse Butterfly am Kabelzug','Reverse Butterfly Maschine']},
      {id:'core_iso',     name:'Core-Stabilisation',            muscle:'Core',     tier:'accessory', sets:3, repMin:30, repMax:60, unit:'Sek.', inc:0, type:'bodyweight', repUnit:'Sek.',
        examples:['Plank','Side Plank','RKC Plank','Hollow Hold','Copenhagen Plank']}
    ]},
    C: { name:'Ganzkörper C', exercises: [
      {id:'incline',      name:'Schrägbankvariante',            muscle:'Brust',    tier:'core',      sets:3, repMin:6,  repMax:8,  unit:'kg', inc:2.5, type:'weight',
        examples:['Schrägbankdrücken LH','Schrägbankdrücken KH','Schrägbankdrücken Maschine']},
      {id:'vpull_close',  name:'Vertikale Zugbewegung eng',     muscle:'Rücken',   tier:'core',      sets:3, repMin:6,  repMax:10, unit:'kg', inc:2.5, type:'weight',
        examples:['Chin Ups','Latziehen eng','Latzugmaschine eng','High Row mit engem Griff']},
      {id:'legpress',     name:'Beinpresse Variation',          muscle:'Beine',    tier:'core',      sets:2, repMin:6,  repMax:10, unit:'kg', inc:5,   type:'weight',
        examples:['Liegende Beinpresse','Sitzende Beinpresse','45°-Beinpresse','Einbeinige Beinpresse']},
      {id:'legext',       name:'Beinstrecker',                  muscle:'Beine',    tier:'core',      sets:2, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Beinstrecker Maschine']},
      {id:'lateral',      name:'Seithebevariation',             muscle:'Schulter', tier:'accessory', sets:3, repMin:10, repMax:12, unit:'kg', inc:1,   type:'weight',
        examples:['Seitheben KH','Seitheben Kabelzug','Seitheben Maschine']},
      {id:'calves',       name:'Waden Isolation',               muscle:'Waden',    tier:'accessory', sets:3, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Wadenheben stehend','Wadenheben sitzend']},
      {id:'biceps',       name:'Bizeps Isolation',              muscle:'Arme',     tier:'isolation', sets:2, repMin:8,  repMax:12, unit:'kg', inc:1,   type:'weight',
        examples:['Preacher Curls Maschine','Preacher Curls KH','Kurzhantelcurls stehend','Kurzhantelcurls sitzend','Curls am Kabelzug']},
      {id:'abs',          name:'Bauch Isolation',               muscle:'Core',     tier:'isolation', sets:3, repMin:6,  repMax:10, unit:'kg', inc:2.5, type:'weight',
        examples:['Cable Crunch','Crunches an der Maschine','Hanging Leg Raise','Ab Wheel']}
    ]}
  }},
  split: { name:'Split', workouts: {
    A: { name:'Oberkörper (+ Core)', exercises: [
      {id:'incline',      name:'Schrägbankvariante',            muscle:'Brust',    tier:'core',      sets:3, repMin:6,  repMax:8,  unit:'kg', inc:2.5, type:'weight',
        examples:['Schrägbankdrücken LH','Schrägbankdrücken KH','Schrägbankdrücken Maschine']},
      {id:'fly',          name:'Flyvariante',                   muscle:'Brust',    tier:'isolation', sets:2, repMin:8,  repMax:12, unit:'kg', inc:1,   type:'weight',
        examples:['Fly am Kabelzug','Butterflymaschine','Fly mit Kurzhanteln']},
      {id:'vpull_wide',   name:'Vertikale Zugbewegung breit',   muscle:'Rücken',   tier:'core',      sets:2, repMin:6,  repMax:10, unit:'kg', inc:2.5, type:'weight',
        examples:['Latziehen breit','Latzugmaschine breit','Klimmzüge breit']},
      {id:'hpull_wide',   name:'Horizontale Zugbewegung breit', muscle:'Rücken',   tier:'accessory', sets:2, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Rudern breit Kabelzug','Rudern breit KH','Rudern breit LH','Rudermaschine breit brustgestützt','T-Bar Rudern']},
      {id:'lateral',      name:'Seithebevariation',             muscle:'Schulter', tier:'accessory', sets:3, repMin:8,  repMax:12, unit:'kg', inc:1,   type:'weight',
        examples:['Seitheben KH','Seitheben Kabelzug','Seitheben Maschine']},
      {id:'reardelt',     name:'Hintere Schulter Isolation',    muscle:'Schulter', tier:'isolation', sets:2, repMin:8,  repMax:12, unit:'kg', inc:1,   type:'weight',
        examples:['Rear Delt Row','Reverse Butterfly am Kabelzug','Reverse Butterfly Maschine']},
      {id:'biceps',       name:'Bizeps Isolation',              muscle:'Arme',     tier:'isolation', sets:4, repMin:6,  repMax:10, unit:'kg', inc:1,   type:'weight',
        examples:['Preacher Curls Maschine','Preacher Curls KH','Kurzhantelcurls stehend','Kurzhantelcurls sitzend','Curls am Kabelzug']},
      {id:'carry',        name:'Farmers Carry',                 muscle:'Core',     tier:'isolation', sets:3, repMin:20, repMax:45, unit:'kg', inc:2.5, type:'weight', repUnit:'Sek.',
        examples:['Farmers Carry KH','Farmers Walk Trap Bar','Koffergriff einarmig','Farmers Carry Griffe']},
      {id:'core_iso',     name:'Core-Stabilisation',            muscle:'Core',     tier:'accessory', sets:3, repMin:30, repMax:60, unit:'Sek.', inc:0, type:'bodyweight', repUnit:'Sek.',
        examples:['Plank','Side Plank','RKC Plank','Hollow Hold','Copenhagen Plank']},
      {id:'abs',          name:'Bauch Isolation',               muscle:'Core',     tier:'isolation', sets:3, repMin:6,  repMax:10, unit:'kg', inc:2.5, type:'weight',
        examples:['Cable Crunch','Crunches an der Maschine','Hanging Leg Raise','Ab Wheel']}
    ]},
    B: { name:'Unterkörper', exercises: [
      {id:'legpress',     name:'Beinpresse Variation',          muscle:'Beine',    tier:'core',      sets:2, repMin:6,  repMax:10, unit:'kg', inc:5,   type:'weight',
        examples:['Liegende Beinpresse','Sitzende Beinpresse','45°-Beinpresse','Einbeinige Beinpresse']},
      {id:'legext',       name:'Beinstrecker',                  muscle:'Beine',    tier:'core',      sets:2, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Beinstrecker Maschine']},
      {id:'legcurl',      name:'Beinbeuger Isolation',          muscle:'Beine',    tier:'isolation', sets:2, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Beinbeuger sitzend','Beinbeuger liegend']},
      {id:'deadlift_var', name:'Kreuzhebevariation',            muscle:'Rücken',   tier:'core',      sets:3, repMin:5,  repMax:8,  unit:'kg', inc:5,   type:'weight',
        examples:['Konventionelles Kreuzheben','Rumänisches Kreuzheben','Rumänisches Kreuzheben KH','Stiff Leg Deadlift']},
      {id:'calves',       name:'Waden Isolation',               muscle:'Waden',    tier:'accessory', sets:3, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Wadenheben stehend','Wadenheben sitzend']},
      {id:'lateral',      name:'Seithebevariation',             muscle:'Schulter', tier:'accessory', sets:3, repMin:8,  repMax:12, unit:'kg', inc:1,   type:'weight',
        examples:['Seitheben KH','Seitheben Kabelzug','Seitheben Maschine']}
    ]},
    C: { name:'Ganzkörper', exercises: [
      {id:'squat_var',    name:'Kniebeugevariation',            muscle:'Beine',    tier:'core',      sets:3, repMin:6,  repMax:8,  unit:'kg', inc:2.5, type:'weight',
        examples:['Kniebeuge frei/Multipresse','Hack Squat','Pendulum Squat','Split Squat','Bulgarian Split Squat']},
      {id:'hpress',       name:'Horizontale Druckbewegung',     muscle:'Brust',    tier:'core',      sets:3, repMin:6,  repMax:10, unit:'kg', inc:2.5, type:'weight',
        examples:['Bankdrücken LH','Bankdrücken KH','Bankdrücken Multipresse','Brustpresse Maschine','Cable Press']},
      {id:'hpull_close',  name:'Horizontale Zugbewegung eng',   muscle:'Rücken',   tier:'accessory', sets:3, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Rudern eng Kabelzug','Rudern eng KH','Rudern eng LH','Rudermaschine eng brustgestützt']},
      {id:'vpull_close',  name:'Vertikale Zugbewegung eng',     muscle:'Rücken',   tier:'core',      sets:3, repMin:6,  repMax:10, unit:'kg', inc:2.5, type:'weight',
        examples:['Chin Ups','Latziehen eng','Latzugmaschine eng','High Row mit engem Griff']},
      {id:'vpress',       name:'Vertikale Druckbewegung',       muscle:'Schulter', tier:'core',      sets:3, repMin:6,  repMax:8,  unit:'kg', inc:2.5, type:'weight',
        examples:['Schulterdrücken KH','Schulterdrücken LH','Schulterdrücken Maschine']},
      {id:'triceps',      name:'Trizeps Isolation',             muscle:'Arme',     tier:'accessory', sets:3, repMin:8,  repMax:12, unit:'kg', inc:2.5, type:'weight',
        examples:['Trizepsdrücken Überkopf Kabel','Trizepsdrücken Überkopf KH','Pushdowns am Seil','Katana Extensions','French Press','Skull Crusher']}
    ]}
  }},
  home: { name:'Home', workouts: {
    A: { name:'Home A · Squat/Push/Pull', exercises: [
      {id:'bw_squat',    name:'Kniebeugevariation',          muscle:'Beine',    tier:'core',      sets:3, repMin:15, repMax:25, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Air Squat','Sumo Squat','Split Squat','Bulgarian Split Squat','Jump Squat']},
      {id:'bw_hpress',   name:'Liegestütz-Variante',         muscle:'Brust',    tier:'core',      sets:3, repMin:8,  repMax:15, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Standard Push-up','Decline Push-up (Füße hoch)','Diamond Push-up','Archer Push-up']},
      {id:'bw_vpull',    name:'Klimmzug',                    muscle:'Rücken',   tier:'core',      sets:2, repMin:5,  repMax:12, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Pull-up breit','Neutral-Grip','Handtuch-Zug an Tür']},
      {id:'bw_hpull',    name:'Inverted Row',                muscle:'Rücken',   tier:'accessory', sets:2, repMin:8,  repMax:15, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Row unter Tisch','Handtuch-Rudern im Türrahmen','Rucksack-Rudern vorgebeugt']},
      {id:'bw_lateral',  name:'Seithebevariation',           muscle:'Schulter', tier:'accessory', sets:3, repMin:12, repMax:20, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Seitheben Wasserflaschen','Seitheben Bücher','Y-Raise am Boden']},
      {id:'bw_bridge',   name:'Hip Thrust / Bridge',         muscle:'Beine',    tier:'isolation', sets:2, repMin:15, repMax:25, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Glute Bridge','Single-Leg Bridge','Hip Thrust auf Sofa/Bett']},
      {id:'bw_biceps',   name:'Bizeps',                      muscle:'Arme',     tier:'isolation', sets:2, repMin:8,  repMax:15, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Handtuch-Curl (isometrisch)','Rucksack-Curl','Chin-up-Halten']}
    ]},
    B: { name:'Home B · Hinge/Press/Row', exercises: [
      {id:'bw_hinge',    name:'Hüftstreck-Variante',         muscle:'Rücken',   tier:'core',      sets:3, repMin:10, repMax:20, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Single-Leg RDL','Good Morning mit Rucksack','Nordic Curl unterstützt']},
      {id:'bw_vpress',   name:'Vertikale Druckbewegung',     muscle:'Schulter', tier:'core',      sets:3, repMin:6,  repMax:12, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Pike Push-up','Handstand-Push-up an Wand','Wall Walk']},
      {id:'bw_lunge',    name:'Lunge-Variante',              muscle:'Beine',    tier:'core',      sets:2, repMin:8,  repMax:15, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Reverse Lunge','Walking Lunge','Bulgarian Split Squat','Step-up auf Stuhl']},
      {id:'bw_hpull_c',  name:'Rudern eng',                  muscle:'Rücken',   tier:'accessory', sets:3, repMin:8,  repMax:15, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Chin-Grip Australian Row','Handtuch Face-Pull','Rucksack-Rudern eng']},
      {id:'bw_triceps',  name:'Trizeps-Dip',                 muscle:'Arme',     tier:'accessory', sets:3, repMin:8,  repMax:15, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Bench Dip auf Sofa/Stuhl','Diamond Push-up','Skull Crusher am Boden']},
      {id:'bw_fly',      name:'Fly-Variante',                muscle:'Brust',    tier:'isolation', sets:2, repMin:10, repMax:20, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Slider Fly (Handtuch am Boden)','Türrahmen-Fly isometrisch']},
      {id:'bw_reardelt', name:'Hintere Schulter',            muscle:'Schulter', tier:'isolation', sets:2, repMin:12, repMax:20, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Bent-over Y-Raise','Prone T-Raise am Boden','Reverse Fly Handtuch']}
    ]},
    C: { name:'Home C · Incline/Chin/Unilateral', exercises: [
      {id:'bw_incline',  name:'Schrägbank-Variante',         muscle:'Brust',    tier:'core',      sets:3, repMin:6,  repMax:12, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Decline Push-up (Füße hoch)','Feet-Elevated Diamond','Ring/Handtuch Fly-Push-up']},
      {id:'bw_chinup',   name:'Vertikale Zug eng',           muscle:'Rücken',   tier:'core',      sets:3, repMin:5,  repMax:10, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Chin-up','Close-Grip Pull-up','Neutral-Grip Klimmzug']},
      {id:'bw_sissy',    name:'Bein-Isolation (Quads)',      muscle:'Beine',    tier:'core',      sets:2, repMin:15, repMax:25, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Sissy Squat','Wall Sit (Sekunden)','Cossack Squat']},
      {id:'bw_lat_c',    name:'Seithebevariation',           muscle:'Schulter', tier:'accessory', sets:3, repMin:12, repMax:20, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Wasserflaschen-Seitheben','Handtuch-Y-Raise']},
      {id:'bw_calves',   name:'Wadenheben',                  muscle:'Waden',    tier:'accessory', sets:3, repMin:15, repMax:25, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Wadenheben stehend','Wadenheben einbeinig','Wadenheben auf Stufe']},
      {id:'bw_biceps_c', name:'Bizeps-Variante',             muscle:'Arme',     tier:'isolation', sets:2, repMin:8,  repMax:15, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Chin-up-Halten','Handtuch-Curl','Rucksack-Curl']},
      {id:'bw_abs',      name:'Bauchmuskeln',                muscle:'Core',     tier:'isolation', sets:3, repMin:12, repMax:20, unit:'Wdh.', inc:0, type:'bodyweight',
        examples:['Hanging Leg Raise','V-Ups','Plank (Sekunden)','Hollow Hold']}
    ]}
  }}
};
const PROGRAM_ORDER = ['split','gym','home'];
const VARIANT_ORDER = ['A','B','C'];
const LENGTHS = {
  voll: { label:'Voll', minutes:'~45 min', filter: (ex) => true },
  kurz: { label:'Kurz', minutes:'~25 min', filter: (ex) => ex.tier !== 'isolation' }
};
const LENGTH_ORDER = ['voll','kurz'];

/* ============ DYNAMISCHE RUHEZEIT ============
   Mindest-Ruhetage nach einer Krafteinheit, abgeleitet aus der Nachwirkung, die
   am Folgetag erfasst wird. Es sind VOLLE Ruhetage: nach einer Einheit am Montag
   mit 'mittel' (2 Ruhetage = Di + Mi) ist Donnerstag wieder dran.
   Diese drei Zeilen sind der einzige Ort, an dem die Schwellen stehen. */
const REST_DAYS = { niedrig: 1, mittel: 2, hoch: 3 };
const REST_DEFAULT = 'mittel';                       // vorläufig, bis die Rückmeldung da ist
const INTENSITY_ORDER = ['niedrig', 'mittel', 'hoch'];

const MUSCLES = ['Beine','Brust','Rücken','Schulter','Arme','Waden','Core'];

function loadData(){
  const def = { sessions: [], cardioSessions: [], mobilitySessions: [], bodyWeights: [], variants: {}, currentProgram: 'gym', currentLength: 'voll', lastExport: null, lockScreenBeep: false, setAdjust: {} };
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const merged = Object.assign(def, JSON.parse(raw));
      if(!LENGTHS[merged.currentLength]) merged.currentLength = 'kurz';
      return merged;
    }
  }catch(e){ console.error("Ladefehler", e); }
  return def;
}
function saveData(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
}
let DATA = loadData();

/* ============ HELFER ============ */
function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function localISO(d){
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,'0') + "-" + String(d.getDate()).padStart(2,'0');
}
function todayISO(){ return localISO(new Date()); }
function addDays(iso, n){
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + n);
  return localISO(d);
}
function dayDiff(aISO, bISO){
  const a = new Date(aISO + "T12:00:00"), b = new Date(bISO + "T12:00:00");
  return Math.round((b - a) / 86400000);
}
function fmtDate(iso){
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString('de-DE', {day:'2-digit', month:'2-digit', year:'2-digit'});
}
function weekdayShort(iso){
  return ['So','Mo','Di','Mi','Do','Fr','Sa'][new Date(iso + "T12:00:00").getDay()];
}

/* ============ SELBST FREIGEGEBENE ZUSATZSÄTZE ============
   Der Schlüssel enthält bewusst auch die Einheit (A/B/C): 'Seithebevariation' und
   'Bizeps Isolation' tragen dieselbe Kennung in A UND C — ohne die Einheit im
   Schlüssel würde aus einem freigegebenen Satz stillschweigend zwei. */
function setAdjustKey(program, workoutVariant, exId){
  return `${program}:${workoutVariant}:${exId}`;
}
function plannedSetsFor(program, workoutVariant, exDef){
  const extra = (DATA.setAdjust || {})[setAdjustKey(program, workoutVariant, exDef.id)] || 0;
  return Math.max(1, exDef.sets + extra);
}
/* Klartext-Bezeichnung für einen gespeicherten Schlüssel. */
function setAdjustLabel(key){
  const parts = String(key).split(':');
  const program = parts[0], v = parts[1], id = parts[2];
  const wk = PROGRAMS[program] && PROGRAMS[program].workouts[v];
  const ex = wk && wk.exercises.find(e => e.id === id);
  return `${ex ? ex.name : id} (${v})`;
}

/* Krafteinheiten chronologisch, älteste zuerst. Die Historie kann durch Bearbeiten
   aus der Reihe geraten, deshalb wird hier immer sortiert. */
function sessionsByDate(){
  return DATA.sessions.slice().sort((a, b) => a.date.localeCompare(b.date));
}
function lastStrengthSession(){
  const list = sessionsByDate();
  return list.length ? list[list.length - 1] : null;
}
/* Index der letzten Einheit im Original-Array — für das Speichern der Intensität. */
function lastStrengthIndex(){
  const last = lastStrengthSession();
  if(!last) return -1;
  return DATA.sessions.indexOf(last);
}
/* Nächste Einheit in der Abfolge A -> B -> C -> A. */
function nextVariant(){
  const last = lastStrengthSession();
  if(!last) return VARIANT_ORDER[0];
  const i = VARIANT_ORDER.indexOf(last.variant);
  return i === -1 ? VARIANT_ORDER[0] : VARIANT_ORDER[(i + 1) % VARIANT_ORDER.length];
}
/* Wann ist die nächste Einheit frühestens dran?
   provisional = true bedeutet: die Nachwirkung wurde noch nicht erfasst, es gilt
   vorläufig REST_DEFAULT. */
function nextSessionInfo(){
  const last = lastStrengthSession();
  const variant = nextVariant();
  if(!last){
    return { variant, lastDate: null, intensity: null, provisional: false,
             restDays: 0, readyDate: todayISO(), daysLeft: 0, due: true };
  }
  const intensity = REST_DAYS[last.intensity] != null ? last.intensity : null;
  const restDays = REST_DAYS[intensity || REST_DEFAULT];
  const readyDate = addDays(last.date, restDays + 1);
  const daysLeft = Math.max(0, dayDiff(todayISO(), readyDate));
  return { variant, lastDate: last.date, intensity, provisional: intensity == null,
           restDays, readyDate, daysLeft, due: daysLeft === 0 };
}
/* Steht die Intensitäts-Rückfrage an? Bewusst erst ab dem Folgetag — Muskelkater
   und Erschöpfung zeigen sich selten am Trainingstag selbst.
   Rückgabe: Index im DATA.sessions-Array, oder -1. */
function pendingIntensityIndex(){
  const idx = lastStrengthIndex();
  if(idx < 0) return -1;
  const s = DATA.sessions[idx];
  if(s.intensity) return -1;
  if(s.date >= todayISO()) return -1;
  return idx;
}
/* Runden statt Kalenderzyklen: eine Runde ist voll, sobald A, B und C je einmal
   absolviert wurden. Danach beginnt die nächste. Funktioniert auch, wenn die
   Reihenfolge einmal abweicht oder eine Einheit doppelt gemacht wird. */
function rounds(){
  const out = [];
  let cur = { sessions: [], seen: {} };
  sessionsByDate().forEach(s => {
    cur.sessions.push(s);
    if(VARIANT_ORDER.indexOf(s.variant) !== -1) cur.seen[s.variant] = true;
    if(Object.keys(cur.seen).length === VARIANT_ORDER.length){
      out.push({ sessions: cur.sessions, start: cur.sessions[0].date, end: s.date, complete: true });
      cur = { sessions: [], seen: {} };
    }
  });
  if(cur.sessions.length){
    out.push({ sessions: cur.sessions, start: cur.sessions[0].date,
               end: cur.sessions[cur.sessions.length - 1].date, complete: false });
  }
  return out;
}
function roundsComplete(){
  return rounds().filter(r => r.complete).length;
}
/* Die laufende, noch nicht abgeschlossene Runde. Nach einer vollen Runde ist sie leer. */
function currentRoundSessions(){
  const rs = rounds();
  if(rs.length === 0) return [];
  const last = rs[rs.length - 1];
  return last.complete ? [] : last.sessions;
}
/* Arbeitssätze je Muskelgruppe in der laufenden Runde. */
function roundVolume(){
  const vol = {}; MUSCLES.forEach(m => vol[m] = 0);
  currentRoundSessions().forEach(s => s.exercises.forEach(ex => {
    const done = ex.sets.filter(st => st.done && !st.warmup).length;
    if(vol[ex.muscle] != null) vol[ex.muscle] += done;
  }));
  return vol;
}

function planTargets(program){
  const t = {}; MUSCLES.forEach(m => t[m] = 0);
  const wk = PROGRAMS[program].workouts;
  VARIANT_ORDER.forEach(v => wk[v].exercises.forEach(ex => { t[ex.muscle] += plannedSetsFor(program, v, ex); }));
  return t;
}
function normVariant(v){
  return (v || '').trim().toLowerCase();
}
/* Sucht die letzte Session mit GENAU dieser Variante (z. B. „Brustpresse Maschine").
   Nur so ist die Progression sauber — Maschine und Freihantel sind nicht dieselbe Kraftkurve. */
function lastSessionFor(exerciseId, variantNorm){
  for(let i = DATA.sessions.length - 1; i >= 0; i--){
    const s = DATA.sessions[i];
    const ex = s.exercises.find(e => e.id === exerciseId && normVariant(e.variant) === variantNorm);
    if(ex && ex.sets.some(st => st.done)) return {session: s, ex};
  }
  return null;
}
function suggestWeight(exDef, variantText){
  const vNorm = normVariant(variantText);
  const same = lastSessionFor(exDef.id, vNorm);
  if(exDef.type === 'weight'){
    if(same){
      const doneSets = same.ex.sets.filter(s => s.done && !s.warmup && s.weight != null && s.reps != null);
      if(doneSets.length){
        const allTop = doneSets.length >= exDef.sets && doneSets.every(s => s.reps >= exDef.repMax);
        const maxWeight = Math.max(...doneSets.map(s => s.weight));
        const unitLbl = isBodyweightMovement(variantText) ? 'kg Zusatz' : (isPerSide(variantText) ? 'kg/H' : 'kg');

        /* Doppelte Progression: Gesteigert wird ausschließlich, wenn ALLE geplanten
           Arbeitssätze die obere Wiederholungsgrenze erreicht haben (allTop).
           RIR wirkt bewusst nur als BREMSE — eine gute RIR-Angabe allein rechtfertigt
           kein höheres Gewicht, eine schlechte kann eine fällige Steigerung aber
           verhindern. Nur auswertbar, wenn jeder Arbeitssatz einen Wert trägt;
           Altdaten ohne RIR verhalten sich wie vorher. */
        const rirComplete = doneSets.length > 0 && doneSets.every(s => s.rir != null);
        const minRir = rirComplete ? Math.min(...doneSets.map(s => s.rir)) : null;

        if(allTop && exDef.inc > 0){
          if(minRir != null && minRir <= 1){
            return {weight: maxWeight, note:`Halten: ${maxWeight} ${unitLbl} — Wdh. erreicht, aber RIR ≤1`};
          }
          const nextW = Math.round((maxWeight + exDef.inc) * 100) / 100;
          return {weight: nextW, note:`Steigern: ${nextW} ${unitLbl}`};
        }
        return {weight: maxWeight, note:`Ziel: ${maxWeight} ${unitLbl} × ${exDef.repMax} ${exDef.repUnit || 'Wdh.'}`};
      }
    }
    /* Klimmzug & Co. ohne Historie: Startpunkt ist schlicht das eigene Körpergewicht,
       also 0 kg Zusatz. Eine aus der Muskelgruppe abgeleitete kg-Zahl wäre hier
       sinnlos — sie würde als Zusatzgewicht gelesen. */
    if(isBodyweightMovement(variantText)){
      return { weight: 0, note: 'Start: nur Körpergewicht — Zusatz später eintragen' };
    }
    // Keine eigene Historie für genau diese Variante -> gestufte Schätzung,
    // siehe estimateStartWeight.
    const est = estimateStartWeight(exDef, variantText);
    if(est) return { weight: est.weight, note: est.source === 'exercise'
      ? `Schätzung: ${est.weight} kg — von derselben Übung an anderem Gerät abgeleitet`
      : `Schätzung: ${est.weight} kg — grober Startwert, vorsichtig testen` };
    return null;
  } else {
    if(same){
      const doneSets = same.ex.sets.filter(s => s.done && !s.warmup && s.reps != null);
      if(doneSets.length){
        const maxVal = Math.max(...doneSets.map(s => s.reps));
        return {weight:null, note:`Ziel: ${maxVal}+ ${exDef.unit}`};
      }
    }
    return null;
  }
}
function epley1RM(weight, reps){
  return Math.round(weight * (1 + reps/30) * 10) / 10;
}

/* Erkennt Kurzhantel-Varianten aus dem freien Text.
   Einarmige Übungen (1-Arm, einarmig) sind ausgenommen — dort bewegt man
   tatsächlich nur eine Hantel und das Eingabegewicht ist bereits die Gesamt-Last. */
function isPerSide(variantText){
  if(!variantText) return false;
  const t = String(variantText).toLowerCase();
  if(/1-arm|einarmig|single-arm|einbeinig/.test(t)) return false;
  return /(^|[\s\-\/(])(kh|kurzhantel[a-zäöüß]*|dumbbell[a-z]*)([\s\-\/)]|$)/i.test(t);
}
/* Klimmzüge, Chin-ups und Dips bewegen den eigenen Körper. Eingetragen wird deshalb
   nur das ZUSÄTZLICHE Gewicht (negativ = Unterstützung durch Band oder Maschine).
   Geführte Geräte sind ausgenommen: bei Latziehen/Latzug/Maschine ist die Zahl das
   Steckgewicht und hat mit dem Körpergewicht nichts zu tun. */
function isBodyweightMovement(variantText){
  if(!variantText) return false;
  const t = String(variantText).toLowerCase();
  if(/latzieh|latzug|maschine/.test(t)) return false;
  return /klimmz|pull[-\s]?ups?|chin[-\s]?ups?|muscle[-\s]?ups?|\bdips?\b/.test(t);
}
/* Körpergewicht zum Zeitpunkt einer Einheit: der letzte Eintrag an oder vor diesem
   Datum, ersatzweise der früheste überhaupt. Ohne jeden Eintrag null. */
function bodyWeightAt(dateISO){
  const bw = DATA.bodyWeights;
  if(!bw || bw.length === 0) return null;
  const sorted = bw.slice().sort((a, b) => a.date.localeCompare(b.date));
  let val = null;
  for(const e of sorted){
    if(e.date <= dateISO) val = e.weight; else break;
  }
  return val != null ? val : sorted[0].weight;
}
/* Gesamtlast eines Satzes in kg — die EINE Stelle für alle Sonderfälle:
     Kurzhantel  -> eingetragen ist pro Hantel, also verdoppeln
     Klimmzug    -> eingetragen ist der Zusatz, also Körpergewicht addieren
   Gibt null zurück, wenn sich keine sinnvolle Last bestimmen lässt. */
function setLoad(variantText, weight, dateISO){
  if(weight == null) return null;
  if(isBodyweightMovement(variantText)){
    const bw = bodyWeightAt(dateISO);
    return bw == null ? null : bw + weight;
  }
  return isPerSide(variantText) ? weight * 2 : weight;
}

/* Plattenrechner: NUR für explizit als Langhantel erkannte Varianten. Bewusst nicht
   für Maschinen/Kabelzug/Beinpresse — deren Hebelverhältnis zum Steckgewicht ist
   unbekannt (siehe Diskussion zur Hebelübersetzung), eine 20-kg-Stangen-Annahme
   wäre dort schlicht falsch. */
const BAR_WEIGHT = 20;
const PLATE_SET = [20, 15, 10, 5, 2.5, 1.25];
function isBarbell(variantText){
  if(!variantText) return false;
  const t = String(variantText).toLowerCase();
  return /(^|[\s\-\/(])(lh|langhantel[a-zäöüß]*)([\s\-\/)]|$)/i.test(t);
}
function plateBreakdown(totalWeight){
  if(totalWeight == null || totalWeight <= BAR_WEIGHT) return null;
  let remaining = Math.round(((totalWeight - BAR_WEIGHT) / 2) * 100) / 100;
  const perSide = remaining;
  const plates = [];
  for(const p of PLATE_SET){
    while(remaining >= p - 0.001){
      plates.push(p);
      remaining = Math.round((remaining - p) * 100) / 100;
    }
  }
  return { plates, perSide, leftover: remaining };
}
function renderPlateHelper(ex, exi){
  if(!isBarbell(ex.variant)) return '';
  const workSets = ex.sets.filter(s => !s.warmup && s.weight != null);
  if(workSets.length === 0) return '';
  const refWeight = Math.max(...workSets.map(s => s.weight));
  const bd = plateBreakdown(refWeight);
  return `
    <div class="platewrap">
      <details>
        <summary class="platelink">Plattenrechner</summary>
        <div class="platebreakdown">${bd
          ? `${refWeight} kg gesamt · 20-kg-Stange angenommen · pro Seite ${bd.perSide} kg:
             <div class="plateside">${bd.plates.length ? bd.plates.map(p => `<span class="platechip">${p}</span>`).join('') : '<span class="platechip">–</span>'}</div>
             ${bd.leftover > 0 ? `<div style="margin-top:4px;">≈ ${bd.leftover} kg mit Standardscheiben nicht exakt darstellbar</div>` : ''}`
          : `${refWeight} kg liegt bei/unter dem angenommenen Stangengewicht (${BAR_WEIGHT} kg).`
        }</div>
      </details>
    </div>
  `;
}

/* Volle Zeitreihe (ein Datenpunkt pro Session, in der die Muskelgruppe getroffen
   wurde) — Basis für den Kraftverlauf-Chart UND für muscleGroupStats() (Trend). */
function muscleGroupSeries(){
  const byMuscle = {}; MUSCLES.forEach(m => { byMuscle[m] = []; });
  DATA.sessions.forEach(s => {
    const sessionMax = {};
    s.exercises.forEach(ex => {
      const isWeight = ex.type ? ex.type === 'weight' : true;
      if(!isWeight || ex.repUnit) return;   // repUnit -> Sekunden, kein sinnvolles e1RM
      ex.sets.forEach(st => {
        if(!st.done || st.warmup || st.weight == null || st.reps == null) return;
        const w = setLoad(ex.variant, st.weight, s.date);
        if(w == null) return;
        const e1rm = epley1RM(w, st.reps);
        if(!sessionMax[ex.muscle] || e1rm > sessionMax[ex.muscle]) sessionMax[ex.muscle] = e1rm;
      });
    });
    Object.keys(sessionMax).forEach(m => { if(byMuscle[m]) byMuscle[m].push({date: s.date, e1rm: sessionMax[m]}); });
  });
  MUSCLES.forEach(m => byMuscle[m].sort((a, b) => a.date.localeCompare(b.date)));
  return byMuscle;
}
/* Fortschritt pro Muskelgruppe statt pro Übung/Gerät: „latest" = aktuelle
   Referenzlast, „first" = erster gemessener Wert -> Trend in %. */
function muscleGroupStats(){
  const series = muscleGroupSeries();
  const stats = {};
  MUSCLES.forEach(m => {
    const list = series[m];
    if(list.length === 0){ stats[m] = null; return; }
    const first = list[0], latest = list[list.length - 1];
    const trendPct = first.e1rm > 0 ? Math.round(((latest.e1rm - first.e1rm) / first.e1rm) * 100) : 0;
    stats[m] = { first, latest, trendPct, sessions: list.length };
  });
  return stats;
}
/* ============ AUSWERTUNG PRO ÜBUNG UND GERÄT ============
   Bewusst inklusive Variante: Latziehen an der Maschine und am Kabelzug haben
   unterschiedliche Hebelverhältnisse und sind nicht dieselbe Kraftkurve. Genau
   diese Vermischung führte vorher zu zu niedrigen Startwerten (Beinpresse aus der
   Kniebeuge abgeleitet) und zu Schein-Bestwerten an leichtgängigen Geräten. */
function variantKey(exId, variantText){
  return exId + '||' + normVariant(variantText);
}
/* Eine Zeitreihe je Übung+Variante: pro Session das beste e1RM dieser Kombination. */
function variantSeries(){
  const out = {};
  DATA.sessions.forEach(s => {
    const perSession = {};
    s.exercises.forEach(ex => {
      const isWeight = ex.type ? ex.type === 'weight' : true;
      if(!isWeight || ex.repUnit) return;   // repUnit -> Sekunden, kein sinnvolles e1RM
      const key = variantKey(ex.id, ex.variant);
      ex.sets.forEach(st => {
        if(!st.done || st.warmup || st.weight == null || st.reps == null) return;
        const load = setLoad(ex.variant, st.weight, s.date);
        if(load == null) return;
        const e1rm = epley1RM(load, st.reps);
        if(!perSession[key] || e1rm > perSession[key].e1rm){
          perSession[key] = { e1rm, exId: ex.id, name: ex.name, muscle: ex.muscle, label: (ex.variant || ex.name) };
        }
      });
    });
    Object.keys(perSession).forEach(k => {
      const p = perSession[k];
      if(!out[k]) out[k] = { exId: p.exId, name: p.name, muscle: p.muscle, label: p.label, points: [] };
      out[k].points.push({ date: s.date, e1rm: p.e1rm });
    });
  });
  Object.keys(out).forEach(k => out[k].points.sort((a, b) => a.date.localeCompare(b.date)));
  return out;
}
/* Erste/letzte Messung und Trend je Übung+Variante. */
function variantStats(){
  const series = variantSeries();
  const stats = {};
  Object.keys(series).forEach(k => {
    const v = series[k];
    const first = v.points[0], latest = v.points[v.points.length - 1];
    const trendPct = first.e1rm > 0 ? Math.round(((latest.e1rm - first.e1rm) / first.e1rm) * 100) : 0;
    stats[k] = { exId: v.exId, name: v.name, muscle: v.muscle, label: v.label,
                 first, latest, trendPct, sessions: v.points.length };
  });
  return stats;
}
/* Höchstes je erreichtes e1RM an genau dieser Übung und diesem Gerät —
   Basis für die Live-PB-Erkennung beim Abhaken. */
function variantBestEver(exId, variantText){
  const v = variantSeries()[variantKey(exId, variantText)];
  if(!v || v.points.length === 0) return 0;
  return Math.max(...v.points.map(p => p.e1rm));
}
/* Deload-Hinweis: e1RM an einer Übung+Variante-Kombination in den letzten
   beiden gemessenen Einheiten in Folge gesunken. */
function deloadWarnings(){
  const series = variantSeries();
  const warnings = [];
  Object.keys(series).forEach(k => {
    const pts = series[k].points;
    if(pts.length < 3) return;
    const last3 = pts.slice(-3);
    if(last3[0].e1rm > last3[1].e1rm && last3[1].e1rm > last3[2].e1rm) warnings.push(series[k].label);
  });
  return warnings;
}
/* Bewegte Tonnage pro Muskelgruppe, chronologisch je Krafteinheit — Basis für den Tonnage-Chart. */
function tonnageHistory(limit){
  const list = DATA.sessions
    .map(s => ({ date: s.date, variant: s.variant, kgByMuscle: workoutStats(s.exercises, s.date).kgByMuscle }))
    .sort((a, b) => a.date.localeCompare(b.date));
  return limit ? list.slice(-limit) : list;
}
/* Feste, unterscheidbare Farben je Muskelgruppe — gemeinsam für Tonnage- und Kraftverlauf-Chart. */
const MUSCLE_COLORS = {
  'Beine':'#E8A33D', 'Brust':'#5FA8D8', 'Rücken':'#8B7FD9', 'Schulter':'#D9738F',
  'Arme':'#5FBE7A', 'Waden':'#4FBFBF', 'Core':'#C9C15F'
};
function fmtDateShort(iso){
  const d = new Date(iso + "T12:00:00");
  return d.getDate() + '.' + (d.getMonth() + 1) + '.';
}
function renderMuscleLegend(muscles){
  return `<div class="chartlegend">${muscles.map(m => `<span class="legenditem"><span class="legenddot" style="background:${MUSCLE_COLORS[m]}"></span>${m}</span>`).join('')}</div>`;
}
function renderTonnageChart(){
  const hist = tonnageHistory(6); // weniger Einheiten, da gruppierte Balken mehr Breite je Zeitpunkt brauchen
  const musclesPresent = MUSCLES.filter(m => hist.some(h => (h.kgByMuscle[m] || 0) > 0));
  if(hist.length === 0 || musclesPresent.length === 0) return '<div class="empty">Noch keine Daten.</div>';

  // padT bewusst größer als früher: schafft Platz für die Trainingsbezeichnung über den Balken
  const W = 340, H = 190, padL = 6, padR = 6, padB = 24, padT = 24;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  // y-Skala: höchster EINZELNER Muskel-Wert (nicht die Summe, da nicht mehr gestapelt wird)
  let maxVal = 0;
  hist.forEach(h => musclesPresent.forEach(m => { maxVal = Math.max(maxVal, h.kgByMuscle[m] || 0); }));
  if(maxVal <= 0) maxVal = 1;

  const clusterGap = 10, barGap = 2;
  const clusterW = (plotW - clusterGap * (hist.length - 1)) / hist.length;
  const barW = (clusterW - barGap * (musclesPresent.length - 1)) / musclesPresent.length;

  const bars = hist.map((h, ci) => {
    const clusterX = padL + ci * (clusterW + clusterGap);
    const segs = musclesPresent.map((m, mi) => {
      const v = h.kgByMuscle[m] || 0;
      if(v <= 0) return '';
      const barH = (v / maxVal) * plotH;
      const x = clusterX + mi * (barW + barGap);
      const y = padT + plotH - barH;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(barW, 1).toFixed(1)}" height="${barH.toFixed(1)}" fill="${MUSCLE_COLORS[m]}" rx="1"></rect>`;
    }).join('');
    const cx = (clusterX + clusterW / 2).toFixed(1);
    const label = fmtDateShort(h.date);
    const title = h.variant ? esc(h.variant) : '–';
    return segs +
      `<text x="${cx}" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent)">${title}</text>` +
      `<text x="${cx}" y="${H - 8}" text-anchor="middle" font-size="9" fill="var(--text-dim)">${label}</text>`;
  }).join('');

  return `
    <svg viewBox="0 0 ${W} ${H}" style="width:100%; height:auto; display:block;">${bars}</svg>
    ${renderMuscleLegend(musclesPresent)}
  `;
}
function renderStrengthChart(){
  const series = muscleGroupSeries();
  const musclesPresent = MUSCLES.filter(m => series[m].length > 0);
  if(musclesPresent.length === 0) return '<div class="empty">Noch keine Daten.</div>';

  let minDate = null, maxVal = 0;
  const maxDate = todayISO();
  musclesPresent.forEach(m => series[m].forEach(p => {
    if(!minDate || p.date < minDate) minDate = p.date;
    if(p.e1rm > maxVal) maxVal = p.e1rm;
  }));
  const totalDays = Math.max(1, dayDiff(minDate, maxDate));

  const W = 340, H = 190, padL = 30, padR = 10, padB = 20, padT = 12;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const yMax = maxVal * 1.12;

  function xPos(date){ return padL + (dayDiff(minDate, date) / totalDays) * plotW; }
  function yPos(v){ return padT + plotH - (v / yMax) * plotH; }

  const gridLines = [0.5, 1].map(f => {
    const y = padT + plotH * (1 - f);
    const val = Math.round(yMax * f);
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="var(--line)" stroke-width="1"></line>
      <text x="${(padL - 5).toFixed(1)}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="var(--text-dim)">${val}</text>`;
  }).join('');

  const lines = musclesPresent.map(m => {
    const pts = series[m];
    const color = MUSCLE_COLORS[m];
    const dots = pts.map(p => `<circle cx="${xPos(p.date).toFixed(1)}" cy="${yPos(p.e1rm).toFixed(1)}" r="2.5" fill="${color}"></circle>`).join('');
    const line = pts.length > 1
      ? `<polyline points="${pts.map(p => `${xPos(p.date).toFixed(1)},${yPos(p.e1rm).toFixed(1)}`).join(' ')}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></polyline>`
      : '';
    return line + dots;
  }).join('');

  return `
    <svg viewBox="0 0 ${W} ${H}" style="width:100%; height:auto; display:block;">${gridLines}${lines}</svg>
    ${renderMuscleLegend(musclesPresent)}
  `;
}

/* Startwert für eine Übung ohne eigene Historie in genau dieser Variante.
   Stufe 1 — dieselbe Übung an einem anderen Gerät: die Bewegung stimmt, nur der
     Hebel unterscheidet sich, deshalb nur ein kleiner Sicherheitsabzug.
   Stufe 2 — erst wenn es die Übung noch nie gab, dient die Muskelgruppe als grobe
     Notlösung. Genau dieser Weg war früher der einzige und lieferte z. B. für die
     Beinpresse viel zu niedrige Werte, weil dort die Kniebeuge einfloss. */
const SAME_EXERCISE_FACTOR = 0.9;
/* Deutlich vorsichtiger, weil hier nur die Muskelgruppe passt und die Hebel-
   verhältnisse völlig andere sein können — ein zu niedriger Einstieg ist der
   sichere Weg. */
const MUSCLE_ESTIMATE_FACTOR = 0.5;
function estimateStartWeight(exDef, variantText){
  const targetReps = exDef.repMax || 8;
  const inc = exDef.inc > 0 ? exDef.inc : 2.5;
  const toWeight = (e1rm, factor) => {
    let est = Math.round(((e1rm / (1 + targetReps / 30)) * factor) / inc) * inc;
    if(est < inc) est = inc;
    return Math.round(est * 100) / 100;
  };

  // Stufe 1: gleiche Übungs-ID, andere Variante
  const stats = variantStats();
  const ownKey = variantKey(exDef.id, variantText);
  let bestSame = 0;
  Object.keys(stats).forEach(k => {
    if(k === ownKey) return;
    if(stats[k].exId !== exDef.id) return;
    if(stats[k].latest.e1rm > bestSame) bestSame = stats[k].latest.e1rm;
  });
  if(bestSame > 0) return { weight: toWeight(bestSame, SAME_EXERCISE_FACTOR), source: 'exercise' };

  // Stufe 2: Muskelgruppe als Notlösung
  if(!exDef.muscle) return null;
  const ms = muscleGroupStats()[exDef.muscle];
  if(!ms) return null;
  return { weight: toWeight(ms.latest.e1rm, MUSCLE_ESTIMATE_FACTOR), source: 'muscle' };
}
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

/* dateISO wird für die Körpergewichts-Zuordnung bei Klimmzügen gebraucht. */
function workoutStats(exercises, dateISO){
  const kgByMuscle = {};
  MUSCLES.forEach(m => { kgByMuscle[m] = 0; });
  let totalKg = 0, totalReps = 0, totalSets = 0;
  const refDate = dateISO || todayISO();
  exercises.forEach(ex => {
    /* Übungen mit repUnit (z. B. Plank, Farmers Carry) zählen Sekunden statt
       Wiederholungen. kg × Sekunden ist keine bewegte Last und Sekunden sind keine
       Wiederholungen — beides bliebe sonst als Fantasiezahl in den Auswertungen.
       Als SATZ zählen sie weiterhin, dafür macht man sie ja. */
    const timeBased = !!ex.repUnit;
    ex.sets.forEach(s => {
      /* Aufwärmsätze bleiben draußen — einheitlich mit Volumenzähler, Bestwerten
         und RIR-Auswertung. Sonst stiege die Tonnage allein dadurch, dass man sich
         gründlicher aufwärmt, und die Zahlen wären über die Zeit nicht vergleichbar. */
      if(!s.done || s.warmup) return;
      totalSets++;
      if(timeBased) return;
      const w = ex.type === 'weight' ? setLoad(ex.variant, s.weight, refDate) : null;
      if(w != null && s.reps != null){
        const kg = w * s.reps;
        if(kgByMuscle[ex.muscle] != null) kgByMuscle[ex.muscle] += kg;
        totalKg += kg;
        totalReps += s.reps;
      } else if(s.reps != null){
        totalReps += s.reps;
      }
    });
  });
  return { kgByMuscle, totalKg, totalReps, totalSets };
}
function fmtKg(n){
  if(n >= 1000) return (n/1000).toFixed(1).replace('.', ',') + ' t';
  return Math.round(n) + ' kg';
}
function fmtNum(n){
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/* Notifications (best effort — iOS erlaubt Web-Push nur eingeschränkt) */
function ensureNotificationPermission(){
  if(!('Notification' in window)) return Promise.resolve(false);
  if(Notification.permission === 'granted') return Promise.resolve(true);
  if(Notification.permission === 'denied') return Promise.resolve(false);
  try{
    const p = Notification.requestPermission();
    return (p && p.then) ? p.then(x => x === 'granted') : Promise.resolve(p === 'granted');
  }catch(e){ return Promise.resolve(false); }
}
function fireTimerNotification(){
  if(!('Notification' in window) || Notification.permission !== 'granted') return;
  const opts = { body:'Nächster Satz kann starten.', icon:'./icon.png', badge:'./icon.png', tag:'rest-timer', renotify:true, silent:false };
  if('serviceWorker' in navigator){
    navigator.serviceWorker.ready.then(reg => reg.showNotification('Pause vorbei', opts).catch(()=>{})).catch(()=>{});
  } else {
    try{ new Notification('Pause vorbei', opts); }catch(e){}
  }
}

/* ============ STATE / ROUTING ============ */
let VIEW = 'home';
let ACTIVE = null;
let TIMER = { endTime:0, total:0, handle:null, audio:null, url:null, beeped:false };
let EDIT_TARGET = null; // { kind:'strength'|'cardio'|'mobility', idx }
let EDIT_ITEM = null;   // Arbeitskopie des bearbeiteten Eintrags

function setView(v){ VIEW = v; render(); }

/* Öffnet einen vergangenen Eintrag zur Bearbeitung. idx bezieht sich auf die
   Position im jeweiligen Original-Array (DATA.sessions/cardioSessions/mobilitySessions) —
   bleibt korrekt, da bei jeder Änderung komplett neu gerendert wird. */
function openEdit(kind, idx){
  const src = kind === 'strength' ? DATA.sessions[idx] : kind === 'cardio' ? DATA.cardioSessions[idx] : DATA.mobilitySessions[idx];
  if(!src) return;
  EDIT_TARGET = { kind, idx };
  EDIT_ITEM = JSON.parse(JSON.stringify(src));
  setView('edit');
}
function closeEdit(){
  EDIT_TARGET = null; EDIT_ITEM = null;
  setView('history');
}
function saveEdit(){
  if(!EDIT_TARGET) return;
  const arr = EDIT_TARGET.kind === 'strength' ? DATA.sessions : EDIT_TARGET.kind === 'cardio' ? DATA.cardioSessions : DATA.mobilitySessions;
  arr[EDIT_TARGET.idx] = EDIT_ITEM;
  saveData();
  closeEdit();
  toast('Änderungen gespeichert');
}
function deleteEditEntry(){
  if(!EDIT_TARGET) return;
  if(!confirm('Diesen Eintrag wirklich löschen?')) return;
  const arr = EDIT_TARGET.kind === 'strength' ? DATA.sessions : EDIT_TARGET.kind === 'cardio' ? DATA.cardioSessions : DATA.mobilitySessions;
  arr.splice(EDIT_TARGET.idx, 1);
  saveData();
  closeEdit();
  toast('Eintrag gelöscht');
}

/* ============ WORKOUT SESSION ============ */
function startWorkout(program, variant, length){
  const wk = PROGRAMS[program] && PROGRAMS[program].workouts[variant];
  if(!wk) return;
  const lenDef = LENGTHS[length] || LENGTHS.voll;
  const filtered = wk.exercises.filter(lenDef.filter);
  const dispName = `${wk.name} · ${lenDef.label}`;
  ACTIVE = {
    program, variant, length, name: dispName, date: todayISO(), readinessLow: false,
    exercises: filtered.map(ex => {
      const initialVariant = DATA.variants[ex.id] || '';
      /* Selbst freigegebene Zusatzsätze fließen hier ein — auch in den Vorschlag,
         damit die Steigerungsregel (alle geplanten Sätze auf Ziel-Wdh.) mit der
         tatsächlich geplanten Satzzahl rechnet. */
      const plannedSets = plannedSetsFor(program, variant, ex);
      const exAdj = Object.assign({}, ex, { sets: plannedSets });
      const sugg = suggestWeight(exAdj, initialVariant);
      const hasWeightSugg = ex.type === 'weight' && sugg && sugg.weight != null;
      return {
        id: ex.id, name: ex.name, muscle: ex.muscle, unit: ex.unit, type: ex.type,
        repUnit: ex.repUnit || null,  // z. B. 'Sek.' bei Plank und Farmers Carry
        repMin: ex.repMin, repMax: ex.repMax, inc: ex.inc, plannedSets: plannedSets,
        examples: ex.examples || [],
        variant: initialVariant,
        suggestNote: sugg ? sugg.note : (ex.type === 'weight' ? 'Erster Eintrag — trag deine Variante und dein Startgewicht ein.' : 'Erster Eintrag — leg los.'),
        sets: Array.from({length: plannedSets}, () => ({
          weight: hasWeightSugg ? sugg.weight : null, reps: null, done: false,
          auto: hasWeightSugg,  // von der App vorbefüllt, noch nicht vom Nutzer angefasst
          baseWeight: hasWeightSugg ? sugg.weight : null, // unskalierte Basis für Tagesform-Anpassung
          rir: null // Reps in Reserve, optional nach dem Abhaken erfassbar
        }))
      };
    })
  };
  DATA.currentProgram = program;
  DATA.currentLength = length;
  saveData();
  setView('workout');
}

/* Wird aufgerufen, wenn sich die Variante einer Übung während des Trainings ändert
   (Textfeld verlassen oder Beispiel-Chip getippt). Berechnet den Vorschlag neu und
   überschreibt nur Sätze, die noch die automatische Vorbefüllung tragen — von Hand
   eingetragene oder bereits abgehakte Sätze bleiben unangetastet. */
function recomputeSuggestion(exi){
  const item = ACTIVE.exercises[exi];
  const fauxDef = { id: item.id, type: item.type, repMin: item.repMin, repMax: item.repMax, inc: item.inc, unit: item.unit, repUnit: item.repUnit, sets: item.plannedSets, muscle: item.muscle };
  const sugg = suggestWeight(fauxDef, item.variant);
  item.suggestNote = sugg ? sugg.note : (item.type === 'weight' ? 'Erster Eintrag — trag deine Variante und dein Startgewicht ein.' : 'Erster Eintrag — leg los.');
  if(item.type !== 'weight') return;
  const newWeight = (sugg && sugg.weight != null) ? sugg.weight : null;
  item.sets.forEach(s => {
    if(s.done) return;
    /* Auch noch komplett leere Sätze übernehmen den Vorschlag. Beim Start der Einheit
       stand die Variante oft noch nicht fest — dann gab es nichts vorzubefüllen und
       das auto-Kennzeichen fehlt. Ohne diesen Fall bliebe z. B. bei Klimmzügen das
       Feld leer, und der Satz zählte mangels Gewicht für keine Auswertung. */
    if(!s.auto && s.weight != null) return;
    s.weight = newWeight;
    s.baseWeight = newWeight;
    s.auto = newWeight != null;
  });
  if(ACTIVE.readinessLow) applyReadinessToExercise(item);
}
/* Tagesform-Dämpfer: skaliert nur automatisch vorbefüllte, noch unberührte Sätze
   ausgehend vom unskalierten baseWeight — so bleibt das Umschalten jederzeit
   wiederholbar, ohne dass sich Rundungsfehler aufsummieren. */
function applyReadinessToExercise(ex){
  if(ex.type !== 'weight') return;
  const factor = ACTIVE.readinessLow ? 0.9 : 1.0;
  const stepInc = ex.inc > 0 ? ex.inc : 2.5;
  ex.sets.forEach(s => {
    if(s.done || !s.auto || s.baseWeight == null) return;
    const w = Math.round((s.baseWeight * factor) / stepInc) * stepInc;
    s.weight = Math.round(w * 100) / 100;
  });
}
function toggleReadiness(){
  ACTIVE.readinessLow = !ACTIVE.readinessLow;
  ACTIVE.exercises.forEach(applyReadinessToExercise);
}
function startCardio(){
  ACTIVE = { cardio:true, date: todayISO(), type:'Laufen', duration:30, distance:'', rpe:5 };
  setView('cardio');
}
const MOBILITY_FOCUS = ['Ganzkörper','Hüfte','Schulter','Wirbelsäule','Knöchel/Fuß','Sonstiges'];
function startMobility(){
  ACTIVE = { mobility:true, date: todayISO(), focus:'Ganzkörper', duration: 10, rpe: 5 };
  setView('mobility');
}
let LAST_SUMMARY = null;

function finishWorkout(){
  const hasAnySet = ACTIVE.exercises.some(ex => ex.sets.some(s => s.done));
  if(!hasAnySet){ toast('Trag mindestens einen Satz ein, bevor du abschließt.'); return; }
  /* Rückfrage bewusst NACH der Leer-Prüfung: wer nichts eingetragen hat, soll den
     Hinweis sehen statt einer Ja/Nein-Frage. */
  if(!confirm('Training wirklich beenden?')) return;
  ACTIVE.exercises.forEach(ex => { if(ex.variant) DATA.variants[ex.id] = ex.variant; });
  DATA.sessions.push({ date: ACTIVE.date, program: ACTIVE.program, variant: ACTIVE.variant, length: ACTIVE.length, name: ACTIVE.name, exercises: ACTIVE.exercises });
  saveData();
  stopTimer();
  LAST_SUMMARY = { name: ACTIVE.name, date: ACTIVE.date, stats: workoutStats(ACTIVE.exercises, ACTIVE.date) };
  ACTIVE = null;
  setView('summary');
}
function finishCardio(){
  DATA.cardioSessions.push({ date: ACTIVE.date, type: ACTIVE.type, duration: ACTIVE.duration, distance: ACTIVE.distance, rpe: ACTIVE.rpe });
  saveData();
  ACTIVE = null;
  setView('home');
  toast('Ausdauereinheit gespeichert');
}
function finishMobility(){
  DATA.mobilitySessions.push({ date: ACTIVE.date, focus: ACTIVE.focus, duration: ACTIVE.duration, rpe: ACTIVE.rpe });
  saveData();
  ACTIVE = null;
  setView('home');
  toast('Mobility-Einheit gespeichert');
}
function cancelActive(){
  if(confirm('Aktuelle Einheit verwerfen?')){ ACTIVE = null; stopTimer(); setView('home'); }
}

/* ============ REST TIMER ============
   Der Timer wird über einen absoluten Endzeitpunkt (Date.now()+dauer) gesteuert,
   damit er auch dann korrekt weiterläuft, wenn iOS die Seite pausiert.
   Für den Alarm gibt es zwei Wege, umschaltbar über DATA.lockScreenBeep:
     aus (Standard) — kurzer Ton über einen wiederverwendeten AudioContext, sobald
       die Pause endet. Laufende Musik (z. B. Spotify) wird nicht unterbrochen,
       dafür gibt es bei gesperrtem Bildschirm nur die Mitteilung.
     an — eine WAV-Datei aus Stille + Beep am Ende läuft über die volle Pausendauer.
       HTMLAudio spielt auf iOS auch bei gesperrtem Screen weiter (solange der
       Silent-Mode-Schalter aus ist), belegt dafür aber die Audio-Ausgabe und
       pausiert laufende Musik. Beides gleichzeitig geht auf iOS nicht. */

function makeTimerWav(seconds){
  const sampleRate = 16000;                     // reicht für 880-Hz-Beep, hält Datei klein
  const totalSamples = Math.floor(sampleRate * (seconds + 0.6));
  const bufferSize = 44 + totalSamples * 2;
  const buffer = new ArrayBuffer(bufferSize);
  const view = new DataView(buffer);
  const w = (o,s) => { for(let i=0;i<s.length;i++) view.setUint8(o+i, s.charCodeAt(i)); };
  w(0,'RIFF'); view.setUint32(4, 36+totalSamples*2, true); w(8,'WAVE'); w(12,'fmt ');
  view.setUint32(16,16,true); view.setUint16(20,1,true); view.setUint16(22,1,true);
  view.setUint32(24,sampleRate,true); view.setUint32(28,sampleRate*2,true);
  view.setUint16(32,2,true); view.setUint16(34,16,true);
  w(36,'data'); view.setUint32(40, totalSamples*2, true);
  // Stille (Buffer ist schon Null-initialisiert). Am Ende: zwei kurze Pieptöne.
  const beepStart = Math.floor(sampleRate * seconds);
  const beepDur = 0.5;
  const beepSamples = Math.floor(sampleRate * beepDur);
  for(let i=0; i<beepSamples; i++){
    const t = i / sampleRate;
    // Hüllkurve, zwei Impulse
    let sig = 0;
    if(t < 0.16 || (t > 0.24 && t < 0.4)){
      const local = t < 0.16 ? t : t - 0.24;
      const env = Math.min(1, local*40) * Math.min(1, (0.16-local)*40);
      sig = Math.sin(2*Math.PI*880*t) * 0.55 * env;
    }
    const s = Math.max(-1, Math.min(1, sig));
    view.setInt16(44 + (beepStart+i)*2, s * 0x7FFF, true);
  }
  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }));
}

function startTimer(seconds){
  stopTimer();
  ensureNotificationPermission();
  /* Dieser Aufruf steht bewusst hier: startTimer läuft aus einem Tippen heraus,
     nur dann darf iOS später überhaupt einen Ton abspielen. */
  ensureBeepContext();

  /* Die WAV aus Stille + Beep am Ende ist der einzige Weg, auf iOS bei GESPERRTEM
     Bildschirm einen Ton zu bekommen. Sie belegt aber die Audio-Ausgabe über die
     ganze Pause und pausiert damit laufende Musik. Deshalb nur auf Wunsch. */
  let audio = null, url = null;
  if(DATA.lockScreenBeep){
    url = makeTimerWav(seconds);
    audio = new Audio(url);
    audio.preload = 'auto';
    const playPromise = audio.play();
    if(playPromise && playPromise.catch) playPromise.catch(() => {});
  }

  TIMER = {
    endTime: Date.now() + seconds * 1000,
    total: seconds,
    handle: null,
    audio, url,
    beeped: false
  };
  TIMER.handle = setInterval(() => {
    const remaining = Math.max(0, Math.ceil((TIMER.endTime - Date.now()) / 1000));
    renderTimerOnly();
    if(remaining <= 0){
      if(!TIMER.beeped){
        TIMER.beeped = true;
        // Im Musik-Modus gibt es keine WAV, die piepst -> kurzer Ton hier.
        if(!DATA.lockScreenBeep) shortBeep();
        toast('Pause vorbei!');
        fireTimerNotification();
      }
      stopTimer();
      render();
    }
  }, 250);
  render();
}

function stopTimer(){
  if(!TIMER) return;
  if(TIMER.handle) clearInterval(TIMER.handle);
  if(TIMER.audio){ try{ TIMER.audio.pause(); }catch(e){} }
  if(TIMER.url){ try{ URL.revokeObjectURL(TIMER.url); }catch(e){} }
  TIMER = { endTime:0, total:0, handle:null, audio:null, url:null, beeped:false };
}

/* Ein einziger, wiederverwendeter AudioContext.
   Wichtig: iOS erlaubt Tonausgabe nur, wenn der Context innerhalb einer Nutzer-Geste
   entstanden ist. Deshalb wird er beim Antippen des Pause-Knopfes angelegt und danach
   nur noch aufgeweckt — ein erst am Pausenende erzeugter Context bliebe stumm. */
let BEEP_CTX = null;
function ensureBeepContext(){
  try{
    if(!BEEP_CTX) BEEP_CTX = new (window.AudioContext || window.webkitAudioContext)();
    if(BEEP_CTX.state === 'suspended' && BEEP_CTX.resume) BEEP_CTX.resume();
  }catch(e){ BEEP_CTX = null; }
  return BEEP_CTX;
}
/* Kurzer Piepser über den bestehenden Context. Der Context wird bewusst NICHT
   geschlossen — sonst müsste der nächste Ton wieder aus einer Geste heraus starten. */
function shortBeep(){
  const ctx = ensureBeepContext();
  if(!ctx) return;
  try{
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880; g.gain.value = 0.15;
    o.start();
    setTimeout(() => { try{ o.stop(); }catch(e){} }, 350);
  }catch(e){}
}
/* Alter Name, weiterhin von der visibilitychange-Behandlung benutzt. */
function fallbackBeep(){ shortBeep(); }

function renderTimerOnly(){
  const el = document.getElementById('timerText');
  const ring = document.getElementById('timerRing');
  if(!el || !ring || !TIMER.total) return;
  const remaining = Math.max(0, Math.ceil((TIMER.endTime - Date.now()) / 1000));
  const mm = Math.floor(remaining/60), ss = remaining%60;
  el.textContent = `${mm}:${String(ss).padStart(2,'0')}`;
  const pct = TIMER.total > 0 ? remaining/TIMER.total : 0;
  const circ = 2*Math.PI*26;
  ring.style.strokeDashoffset = circ*(1-pct);
}

/* ============ RENDER ============ */
function render(){
  const app = document.getElementById('app');
  let body = '';
  if(ACTIVE && ACTIVE.cardio) body = renderCardioView();
  else if(ACTIVE && ACTIVE.mobility) body = renderMobilityView();
  else if(ACTIVE) body = renderWorkoutView();
  else if(VIEW === 'home') body = renderHome();
  else if(VIEW === 'summary') body = renderSummary();
  else if(VIEW === 'history') body = renderHistory();
  else if(VIEW === 'progress') body = renderProgress();
  else if(VIEW === 'data') body = renderDataView();
  else if(VIEW === 'edit') body = renderEditView();

  app.innerHTML = `
    <header class="topbar">
      <h1>Trainingsplan</h1>
      <div class="streak">${ICON_FLAME}${roundsComplete()} ${roundsComplete() === 1 ? 'Runde' : 'Runden'}</div>
    </header>
    <main>${body}</main>
    ${(ACTIVE || VIEW === 'summary' || VIEW === 'edit') ? '' : renderTabbar()}
  `;
  attachHandlers();
  if(TIMER.total > 0) renderTimerOnly();
}

function renderTabbar(){
  const tabs = [
    {id:'home', icon:ICON_TABBAR.home, label:'Heute'},
    {id:'history', icon:ICON_TABBAR.history, label:'Verlauf'},
    {id:'progress', icon:ICON_TABBAR.progress, label:'Fortschritt'},
    {id:'data', icon:ICON_TABBAR.data, label:'Daten'}
  ];
  return `<nav class="tabbar"><div class="inner">
    ${tabs.map(t => `<button data-tab="${t.id}" class="${VIEW === t.id ? 'active' : ''}">
      <span class="icon">${t.icon}</span>${t.label}
    </button>`).join('')}
  </div></nav>`;
}

function progWorkout(program, variant){ return PROGRAMS[program].workouts[variant]; }
function progExerciseCount(program, variant, length){
  return PROGRAMS[program].workouts[variant].exercises.filter(LENGTHS[length].filter).length;
}

const ICON_DUMBBELL = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2" y="7" width="3" height="10" rx="1"/><rect x="6" y="9" width="2" height="6" rx=".5"/><rect x="8" y="11" width="8" height="2"/><rect x="16" y="9" width="2" height="6" rx=".5"/><rect x="19" y="7" width="3" height="10" rx="1"/></svg>';
const ICON_HOUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3L2 12h3v8h5v-5h4v5h5v-8h3z"/></svg>';
const ICON_TABBAR = {
  home:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/></svg>',
  history:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="7" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="17" r="1" fill="currentColor"/><path d="M9 7h11M9 12h11M9 17h11"/></svg>',
  progress: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 18 9 12 13 15 21 6"/><polyline points="16 6 21 6 21 11"/></svg>',
  data:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>'
};
const ICON_FLAME = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.4 2c.2 2.5 1.8 3.9 3 5.7 1 1.6 1.6 3.4 1.6 5.3a6 6 0 11-12 0c0-1.7.8-3 1.6-3.9-.1 1 .3 1.7.9 1.7 0-2.1 1.5-4.6 2.3-5.6.4 1 .8 1.6 1.4 1.6.5-1.4.7-3 1.2-4.8z"/></svg>';

function renderProgramSwitch(){
  const p = DATA.currentProgram || 'gym';
  return `<div class="progtoggle pos-${p}" role="tablist" aria-label="Programm">
    <button class="pt-btn ${p==='split'?'active':''}" data-action="switch-program" data-to="split" role="tab" aria-selected="${p==='split'}">${ICON_DUMBBELL}<span>Split</span></button>
    <button class="pt-btn ${p==='gym'?'active':''}" data-action="switch-program" data-to="gym" role="tab" aria-selected="${p==='gym'}">${ICON_DUMBBELL}<span>GK</span></button>
    <button class="pt-btn ${p==='home'?'active':''}" data-action="switch-program" data-to="home" role="tab" aria-selected="${p==='home'}">${ICON_HOUSE}<span>Home</span></button>
  </div>`;
}

function renderLengthChoice(variant){
  const p = DATA.currentProgram || 'gym';
  const cur = DATA.currentLength || 'voll';
  return `
    <label class="microlabel">Dauer</label>
    <div class="segmented">
      ${LENGTH_ORDER.map(len => {
        const cnt = progExerciseCount(p, variant, len);
        return `<button class="seg ${cur === len ? 'active' : ''}" data-action="pick-length" data-length="${len}">${LENGTHS[len].label}<span class="segsub">${cnt} Üb. · ${LENGTHS[len].minutes}</span></button>`;
      }).join('')}
    </div>
  `;
}

function renderOnboarding(){
  const p = DATA.currentProgram || 'gym';
  const firstWk = PROGRAMS[p].workouts.A;
  const len = DATA.currentLength || 'voll';
  return `
    <div class="card">
      ${renderProgramSwitch()}
      <h2>${firstWk.name}</h2>
      <div class="sub">Nach deinem ersten Training fragt die App am Folgetag nach der Nachwirkung und leitet daraus deine Pause bis zur nächsten Einheit ab.</div>
      ${renderLengthChoice('A')}
      <button class="btn" data-action="start-workout" data-variant="A" data-length="${len}">${LENGTHS[len].label} starten (${progExerciseCount(p,'A',len)} Übungen)</button>
      <div style="height:8px"></div>
      <button class="btn secondary" data-action="start-cardio">Ausdauer loggen</button>
      <div style="height:8px"></div>
      <button class="btn secondary" data-action="start-mobility">Mobility loggen</button>
    </div>
    <div class="card">
      <h2 class="cardlabel">Die Abfolge · ${PROGRAMS[p].name}</h2>
      <div class="sub">A → B → C, dann wieder von vorn. Nach jeder Einheit fragt die App am Folgetag nach der Nachwirkung und leitet daraus 1–3 Ruhetage ab.</div>
      ${VARIANT_ORDER.map(v => `<div class="splitrow"><span class="d">${v}</span><span>${PROGRAMS[p].workouts[v].name}</span></div>`).join('')}
    </div>
  `;
}

function renderHome(){
  if(DATA.sessions.length === 0) return renderOnboarding();
  const p = DATA.currentProgram || 'gym';
  const len = DATA.currentLength || 'voll';
  const next = nextSessionInfo();
  const heute = todayISO();
  const doneTodayStrength = DATA.sessions.some(s => s.date === heute);
  const mobilityDoneToday = DATA.mobilitySessions.some(s => s.date === heute);
  const wkName = progWorkout(p, next.variant).name;

  function startBtn(variant, primary=true, label=null){
    const wk = progWorkout(p, variant);
    const cnt = progExerciseCount(p, variant, len);
    const txt = label || `${wk.name} · ${LENGTHS[len].label}`;
    return `<button class="btn ${primary ? '' : 'secondary'}" data-action="start-workout" data-variant="${variant}" data-length="${len}">${txt} (${cnt} Üb.)</button>`;
  }

  let title, sub;
  if(doneTodayStrength){
    title = 'Heute erledigt ✓';
    sub = 'Gute Arbeit. Nach der Nachwirkung fragt die App morgen — daraus ergibt sich die Pause.';
  } else if(next.due){
    title = wkName;
    sub = `Dran seit ${fmtDate(next.readyDate)}${next.provisional ? ' · vorläufig, Nachwirkung noch offen' : ''}`;
  } else {
    title = 'Erholung';
    sub = `${wkName} frühestens am ${fmtDate(next.readyDate)} · noch ${next.daysLeft} ${next.daysLeft === 1 ? 'Tag' : 'Tage'}${next.provisional ? ' (vorläufig)' : ''}`;
  }

  /* Der Startknopf ist IMMER da — die Ruhezeit ist eine Empfehlung, keine Sperre.
     Ist die Einheit noch nicht dran, tritt er nur optisch zurück. */
  let buttons = '';
  if(!doneTodayStrength){
    buttons += renderLengthChoice(next.variant) +
      startBtn(next.variant, next.due, next.due ? null : `${wkName} trotzdem starten · ${LENGTHS[len].label}`) +
      `<div style="height:8px"></div>`;
  }
  /* An Ruhetagen ist Mobility der naheliegende Hauptknopf — das ersetzt die
     früheren festen Mobility-Tage. */
  buttons += (!next.due && !doneTodayStrength && !mobilityDoneToday)
    ? `<button class="btn" data-action="start-mobility">Mobility loggen</button>`
    : `<button class="btn secondary" data-action="start-mobility">${mobilityDoneToday ? 'Weitere Mobility loggen' : 'Mobility loggen'}</button>`;
  buttons += `<div style="height:8px"></div><button class="btn secondary" data-action="start-cardio">Ausdauer loggen</button>`;

  return `
    ${renderIntensityAsk()}
    <div class="card">
      ${renderProgramSwitch()}
      <h2>${title}</h2>
      <div class="sub">${sub}</div>
      ${renderDeloadNote()}
      ${renderBackupNote()}
      ${buttons}
    </div>
    <div class="card">
      <h2 class="cardlabel">Nächste Einheit</h2>
      ${renderNextSession()}
    </div>
    <div class="card">
      <h2 class="cardlabel">Sätze pro Muskelgruppe · diese Runde</h2>
      <div class="sub">Ist / Soll (${PROGRAMS[p].name}) über eine volle Runde A + B + C</div>
      ${renderVolume(p)}
    </div>
  `;
}
/* Fragt die Nachwirkung der letzten Einheit ab — erst ab dem Folgetag.
   Aus der Antwort ergibt sich, wie lange die Pause bis zur nächsten Einheit dauert. */
function renderIntensityAsk(){
  const idx = pendingIntensityIndex();
  if(idx < 0) return '';
  const s = DATA.sessions[idx];
  return `
    <div class="card">
      <h2>Wie war die letzte Einheit?</h2>
      <div class="sub">${esc(s.name)} vom ${fmtDate(s.date)} — Muskelkater und Erschöpfung zeigen sich meist erst am Tag danach. Aus deiner Antwort ergibt sich die Pause bis zur nächsten Einheit.</div>
      <div class="chiprow">
        ${INTENSITY_ORDER.map(v => `<button class="chip" data-action="set-intensity" data-idx="${idx}" data-value="${v}">${v} · ${REST_DAYS[v]} ${REST_DAYS[v] === 1 ? 'Ruhetag' : 'Ruhetage'}</button>`).join('')}
      </div>
    </div>
  `;
}

function renderDeloadNote(){
  const warn = deloadWarnings();
  if(warn.length === 0) return '';
  /* esc(): Die Bezeichnungen stammen jetzt aus dem freien Varianten-Textfeld
     und dürfen nicht ungeprüft ins HTML. */
  return `<div class="deloadnote">${warn.map(esc).join(', ')}: e1RM zuletzt zwei Einheiten in Folge rückläufig — evtl. eine leichtere Woche einplanen.</div>`;
}

/* ============ BACKUP-ERINNERUNG ============
   Die Daten liegen nur im localStorage dieses Browsers. iOS räumt den bei
   Platzmangel auf — ohne exportierte JSON-Datei ist die Historie dann weg. */
const BACKUP_REMINDER_DAYS = 21;

/* Ältestes Datum über alle Datenarten — Ersatz-Bezugspunkt, solange noch nie
   exportiert wurde. Ohne diesen Fallback bekäme gerade der Nutzer, der noch nie
   ein Backup gemacht hat, nie eine Erinnerung. */
function firstDataDate(){
  const dates = [];
  DATA.sessions.forEach(s => dates.push(s.date));
  DATA.cardioSessions.forEach(s => dates.push(s.date));
  DATA.mobilitySessions.forEach(s => dates.push(s.date));
  DATA.bodyWeights.forEach(b => dates.push(b.date));
  if(dates.length === 0) return null;
  return dates.sort()[0];
}
/* Tage seit dem letzten Backup — oder null, wenn (noch) keine Erinnerung fällig ist. */
function backupDueDays(){
  const base = DATA.lastExport || firstDataDate();
  if(!base) return null;              // gar keine Daten -> nichts zu sichern
  const days = dayDiff(base, todayISO());
  return days >= BACKUP_REMINDER_DAYS ? days : null;
}
function renderBackupNote(){
  const days = backupDueDays();
  if(days == null) return '';
  const txt = DATA.lastExport
    ? `Dein letztes Backup ist ${days} Tage her.`
    : `Du hast noch nie ein Backup gemacht — deine Daten reichen ${days} Tage zurück.`;
  return `<div class="deloadnote">${txt} Zieh dir im Daten-Tab eine JSON-Datei, damit deine Historie einen Browser-Reset übersteht.</div>`;
}

/* Ersetzt den früheren 7-Tage-Streifen: es gibt kein festes Raster mehr, sondern
   nur noch „was kommt als Nächstes, ab wann und warum" plus einen kurzen Rückblick. */
function renderNextSession(){
  const p = DATA.currentProgram || 'gym';
  const next = nextSessionInfo();
  const letzte = sessionsByDate().slice(-3).reverse();
  const grund = !next.lastDate
    ? 'Noch keine Einheit absolviert.'
    : (next.provisional
        ? `Vorläufig ${next.restDays} Ruhetage — die Nachwirkung der letzten Einheit ist noch nicht eingetragen.`
        : `${next.restDays} ${next.restDays === 1 ? 'Ruhetag' : 'Ruhetage'} · Nachwirkung ${next.intensity}`);
  return `
    <div class="nextrow">
      <span>${esc(progWorkout(p, next.variant).name)}</span>
      <span class="when">${next.due ? 'dran' : 'ab ' + fmtDate(next.readyDate)}</span>
    </div>
    <div class="sub" style="margin:6px 0 0;">${grund}</div>
    ${letzte.length ? `<div class="lastsessions">${letzte.map(s => `
      <div class="lastrow"><span>${esc(s.name)}</span><span class="date">${fmtDate(s.date)}${s.intensity ? ' · ' + esc(s.intensity) : ''}</span></div>`).join('')}</div>` : ''}
  `;
}

/* Soll = eine volle Runde A + B + C, Ist = die laufende Runde. Beides ist damit
   unabhängig davon, über wie viele Tage sich die Runde zieht. */
function renderVolume(program){
  const targets = planTargets(program);
  const vol = roundVolume();
  return MUSCLES.map(m => {
    const v = vol[m] || 0, t = targets[m] || 0;
    const pct = t > 0 ? Math.min(100, (v/t)*100) : 0;
    return `<div class="vol-row">
      <div class="vol-label">${m}</div>
      <div class="vol-bar-bg"><div class="vol-bar-fill" style="width:${pct}%"></div></div>
      <div class="vol-count">${v}/${t}</div>
    </div>`;
  }).join('');
}

/* ============ WOCHENVOLUMEN ============
   Arbeitssätze je Muskelgruppe der letzten 7 Tage gegen einen Zielkorridor. */
const VOLUME_TARGET_DEFAULT = { min: 10, max: 20 };

/* Liest das Ziel bewusst defensiv aus: ein unvollständiges Backup oder ein
   vertippter Wert darf die Anzeige nicht unbrauchbar machen, sondern fällt
   still auf die Voreinstellung zurück.
   Hinweis: DATA.volumeTarget steht absichtlich NICHT in den Standardwerten von
   loadData() — die Konstante oben ist dort noch nicht initialisiert. */
function volumeTarget(){
  const t = DATA.volumeTarget || {};
  let min = Number(t.min), max = Number(t.max);
  if(!Number.isFinite(min) || min < 1) min = VOLUME_TARGET_DEFAULT.min;
  if(!Number.isFinite(max) || max <= min) max = Math.max(min + 1, VOLUME_TARGET_DEFAULT.max);
  return { min: Math.round(min), max: Math.round(max) };
}
/* Rollendes 7-Tage-Fenster (heute und die sechs Tage davor) — bewusst nicht der
   Trainingszyklus, damit die Zahl unabhängig vom Zyklusstart vergleichbar bleibt.
   Aufwärmsätze zählen nicht mit: sie erzeugen keinen Wachstumsreiz. */
function weeklySetCount(){
  const today = todayISO();
  const from = addDays(today, -6);
  const counts = {}; MUSCLES.forEach(m => counts[m] = 0);
  DATA.sessions.forEach(s => {
    if(s.date < from || s.date > today) return;
    s.exercises.forEach(ex => {
      if(counts[ex.muscle] == null) return;
      counts[ex.muscle] += ex.sets.filter(st => st.done && !st.warmup).length;
    });
  });
  return counts;
}

/* Minimum-RIR je Einheit für eine Muskelgruppe, chronologisch. Einheiten ohne
   jede RIR-Angabe bleiben außen vor. */
function rirHistoryForMuscle(muscle){
  const out = [];
  DATA.sessions.forEach(s => {
    let min = null;
    s.exercises.forEach(ex => {
      if(ex.muscle !== muscle) return;
      ex.sets.forEach(st => {
        if(!st.done || st.warmup || st.rir == null) return;
        if(min == null || st.rir < min) min = st.rir;
      });
    });
    if(min != null) out.push(min);
  });
  return out;
}
/* Deutet die jüngste Historie auf fehlende Erholung? Dann wird KEIN zusätzliches
   Volumen vorgeschlagen. Zwei unabhängige Signale: sinkende Leistung (bestehende
   Deload-Erkennung) oder durchgehend ausgereizte Sätze (RIR 0–1). */
function recoveryStrained(muscle){
  const series = variantSeries();
  const warned = deloadWarnings();
  const labels = Object.keys(series).filter(k => series[k].muscle === muscle).map(k => series[k].label);
  if(warned.some(w => labels.includes(w))) return true;
  const rirs = rirHistoryForMuscle(muscle);
  return rirs.length >= 2 && rirs.slice(-2).every(v => v <= 1);
}
/* Bei Gleichstand gewinnt die Isolationsübung: zusätzliches Volumen über Isolation
   belastet die Erholung am wenigsten. */
const TIER_RANK = { isolation: 0, accessory: 1, core: 2 };
/* Vorschlag für zusätzliches Volumen — bewusst auf Basis des PLANS, nicht der
   zuletzt geloggten Sätze. Eine ausgefallene Einheit ist ein Grund nachzuholen,
   kein Grund den Plan dauerhaft aufzublähen. */
function volumeSuggestions(){
  const program = DATA.currentProgram || 'gym';
  const t = volumeTarget();
  const targets = planTargets(program);
  const out = [];
  MUSCLES.forEach(m => {
    const ist = targets[m] || 0;
    if(ist >= t.min) return;
    if(recoveryStrained(m)) return;
    let best = null;
    VARIANT_ORDER.forEach(v => PROGRAMS[program].workouts[v].exercises.forEach(ex => {
      if(ex.muscle !== m) return;
      const sets = plannedSetsFor(program, v, ex);
      const rank = TIER_RANK[ex.tier] != null ? TIER_RANK[ex.tier] : 3;
      if(!best || sets < best.sets || (sets === best.sets && rank < best.rank)){
        best = { sets, rank, name: ex.name, workout: v, key: setAdjustKey(program, v, ex.id) };
      }
    }));
    if(best) out.push({ muscle: m, ist, fehlt: t.min - ist, name: best.name, workout: best.workout, key: best.key });
  });
  return out;
}
function renderVolumeSuggestions(){
  const sug = volumeSuggestions();
  const adj = DATA.setAdjust || {};
  const adjKeys = Object.keys(adj).filter(k => adj[k] > 0);
  if(sug.length === 0 && adjKeys.length === 0) return '';
  const min = volumeTarget().min;
  /* Bewusst EIN Kasten mit einer Zeile je Muskelgruppe. Ein eigener Hinweiskasten
     pro Gruppe füllte bei frischem Plan den halben Bildschirm — und wer fünf
     gleich aussehende Kästen sieht, liest keinen davon. */
  return `
    ${sug.length ? `<div class="deloadnote">
      Laut Plan unter deinem Korridor — ein Satz auf einmal, gilt ab der nächsten Einheit:
      <div class="volsug">
        ${sug.map(s => `<button class="chip" data-action="add-set" data-key="${esc(s.key)}">${s.muscle} ${s.ist}/${min} · +1 ${esc(s.name)} (${s.workout})</button>`).join('')}
      </div>
    </div>` : ''}
    ${adjKeys.length ? `<div class="wvol-legend">Von dir ergänzt: ${adjKeys.map(k => esc(setAdjustLabel(k)) + ' +' + adj[k]).join(' · ')}
      <div style="margin-top:8px;"><button class="chip" data-action="reset-setadjust">Anpassungen zurücksetzen</button></div></div>` : ''}
  `;
}

function renderWeeklyVolume(){
  const t = volumeTarget();
  const counts = weeklySetCount();
  const peak = Math.max(t.max, ...MUSCLES.map(m => counts[m]));
  const scale = Math.max(1, Math.ceil(peak * 1.15));
  const minPct = (t.min / scale) * 100;
  const maxPct = (t.max / scale) * 100;
  const rows = MUSCLES.map(m => {
    const v = counts[m];
    const color = v < t.min ? 'var(--accent)' : (v > t.max ? 'var(--danger)' : 'var(--success)');
    const pct = Math.min(100, (v / scale) * 100);
    return `<div class="wvol-row">
      <div class="wvol-label">${m}</div>
      <div class="wvol-track">
        <div class="wvol-fill" style="width:${pct}%; background:${color}"></div>
        <div class="wvol-mark" style="left:${minPct}%"></div>
        <div class="wvol-mark" style="left:${maxPct}%"></div>
      </div>
      <div class="wvol-count" style="color:${color}">${v}</div>
    </div>`;
  }).join('');
  return rows + `<div class="wvol-legend">
    <span class="wvol-dot" style="background:var(--accent)"></span>unter ${t.min} ·
    <span class="wvol-dot" style="background:var(--success)"></span>im Korridor ·
    <span class="wvol-dot" style="background:var(--danger)"></span>über ${t.max}<br>
    Die zwei senkrechten Striche markieren ${t.min} und ${t.max} Sätze. Aufwärmsätze zählen nicht mit.
  </div>`;
}

/* RIR-Abfrage: erscheint erst, wenn ein Arbeitssatz abgehakt ist, und ist
   freiwillig — ohne Eingabe bleibt die bisherige Wiederholungsregel maßgeblich.
   Nur für Gewichts-Übungen: im Home-Programm steuert die App über Wiederholungen,
   dort hätte eine RIR-Angabe keine Wirkung. */
function renderRirRow(exi, w){
  if(!w.s.done || w.s.warmup) return '';
  return `<div class="rirrow">
    <span class="rirlbl">RIR</span>
    ${[0,1,2,3,4].map(n => `<button class="rirchip ${w.s.rir === n ? 'active' : ''}" data-action="set-rir" data-exi="${exi}" data-si="${w.si}" data-rir="${n}">${n === 4 ? '4+' : n}</button>`).join('')}
  </div>`;
}

function renderWorkoutView(){
  const a = ACTIVE;
  return `
    <a href="#" class="backlink" data-action="cancel-active">✕ Abbrechen</a>
    <div class="card">
      <h2>${a.name}</h2>
      <div class="sub">${fmtDate(a.date)}</div>
      <button class="chip readinesschip ${a.readinessLow ? 'active' : ''}" data-action="toggle-readiness">${a.readinessLow ? '− Erschöpft: Vorschläge −10 %' : 'Heute erschöpft? Vorschläge −10 %'}</button>
    </div>
    ${TIMER.total > 0 ? renderTimer() : ''}
    ${a.exercises.map((ex, exi) => {
      const warmups = ex.sets.map((s, si) => ({s, si})).filter(x => x.s.warmup);
      const workSets = ex.sets.map((s, si) => ({s, si})).filter(x => !x.s.warmup);
      return `
      <div class="exwrap">
        <div class="exname">${ex.name}</div>
        <input class="variantinput" type="text" placeholder="Deine Variante (z. B. Langhantel, Maschine …)" value="${esc(ex.variant || '')}" data-variant-exi="${exi}">
        ${ex.examples && ex.examples.length ? `<div class="examples">${ex.examples.map(x => `<button class="ex-chip" data-action="pick-example" data-exi="${exi}" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div>` : ''}
        <div class="exmeta">${ex.muscle} · Ziel ${ex.repMin}–${ex.repMax} ${ex.repUnit || (ex.type === 'time' ? ex.unit : 'Wdh.')}${ex.type !== 'weight' ? '' : (isBodyweightMovement(ex.variant) ? (bodyWeightAt(a.date) != null ? ` · Zusatz zu ${bodyWeightAt(a.date)} kg Körpergewicht` : ' · Zusatzgewicht — Körpergewicht im Daten-Tab fehlt') : (isPerSide(ex.variant) ? ' · je Hantel' : ' · Gesamtlast'))}</div>
        <div class="lastnote">${ex.suggestNote}</div>
        ${ex.type === 'weight' ? `
          ${warmups.length ? `<div class="warmupblock">${warmups.map((w, wi) => `
            <div class="setrow warmuprow">
              <div class="setnum warmupnum" data-action="remove-warmup" data-exi="${exi}" data-si="${w.si}">W${wi + 1}</div>
              <input type="number" inputmode="decimal" placeholder="${isBodyweightMovement(ex.variant) ? '+kg' : (isPerSide(ex.variant) ? 'kg/H' : 'kg')}" value="${w.s.weight ?? ''}" data-set-field="weight" data-exi="${exi}" data-si="${w.si}">
              <input type="number" inputmode="numeric" placeholder="${ex.repUnit || 'Wdh'}" value="${w.s.reps ?? ''}" data-set-field="reps" data-exi="${exi}" data-si="${w.si}">
              <button class="checkbtn ${w.s.done ? 'checked' : ''}" data-action="toggle-set" data-exi="${exi}" data-si="${w.si}">${w.s.done ? '✓' : ''}</button>
            </div>
          `).join('')}</div>` : ''}
          <div class="warmuplink"><a href="#" data-action="add-warmup" data-exi="${exi}">+ Aufwärmsatz</a></div>
        ` : ''}
        ${workSets.map((w, wi) => ex.type === 'weight' ? `
          <div class="setrow">
            <div class="setnum">${wi+1}</div>
            <input type="number" inputmode="decimal" placeholder="${isBodyweightMovement(ex.variant) ? '+kg' : (isPerSide(ex.variant) ? 'kg/H' : 'kg')}" value="${w.s.weight ?? ''}" data-set-field="weight" data-exi="${exi}" data-si="${w.si}">
            <input type="number" inputmode="numeric" placeholder="${ex.repUnit || 'Wdh'}" value="${w.s.reps ?? ''}" data-set-field="reps" data-exi="${exi}" data-si="${w.si}">
            <button class="checkbtn ${w.s.done ? 'checked' : ''}" data-action="toggle-set" data-exi="${exi}" data-si="${w.si}">${w.s.done ? '✓' : ''}</button>
          </div>
          ${renderRirRow(exi, w)}
        ` : `
          <div class="setrow single">
            <div class="setnum">${wi+1}</div>
            <input type="number" inputmode="numeric" placeholder="${ex.unit}" value="${w.s.reps ?? ''}" data-set-field="reps" data-exi="${exi}" data-si="${w.si}">
            <button class="checkbtn ${w.s.done ? 'checked' : ''}" data-action="toggle-set" data-exi="${exi}" data-si="${w.si}">${w.s.done ? '✓' : ''}</button>
          </div>
        `).join('')}
        <div class="chiprow">
          <button class="chip" data-action="repeat-last" data-exi="${exi}">Letzten Satz wiederholen</button>
          <button class="chip" data-action="rest" data-secs="60">Pause 60s</button>
          <button class="chip" data-action="rest" data-secs="90">Pause 90s</button>
          <button class="chip" data-action="rest" data-secs="150">Pause 150s</button>
        </div>
        ${ex.type === 'weight' ? renderPlateHelper(ex, exi) : ''}
      </div>
    `;}).join('')}
    <button class="btn" data-action="finish-workout">Training abschließen</button>
  `;
}

function renderTimer(){
  const circ = 2*Math.PI*26;
  const remaining = Math.max(0, Math.ceil((TIMER.endTime - Date.now()) / 1000));
  const pct = TIMER.total > 0 ? remaining/TIMER.total : 0;
  const mm = Math.floor(remaining/60), ss = remaining%60;
  return `
    <div class="timerwrap">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="26" fill="none" stroke="var(--surface-2)" stroke-width="6"></circle>
        <circle id="timerRing" cx="32" cy="32" r="26" fill="none" stroke="var(--accent)" stroke-width="6"
          stroke-dasharray="${circ}" stroke-dashoffset="${circ*(1-pct)}" stroke-linecap="round"
          transform="rotate(-90 32 32)"></circle>
      </svg>
      <div>
        <div class="ttext" id="timerText">${mm}:${String(ss).padStart(2,'0')}</div>
        <div class="tlabel">Satzpause</div>
      </div>
    </div>
  `;
}

function renderCardioView(){
  const a = ACTIVE;
  return `
    <a href="#" class="backlink" data-action="cancel-active">✕ Abbrechen</a>
    <div class="card">
      <h2>Ausdauer</h2>
      <div class="sub">${fmtDate(a.date)}</div>

      <label class="field">Typ</label>
      <select data-cardio-field="type">
        ${['Laufen','Radfahren','Rudern','Crosstrainer','Schwimmen','Sonstiges'].map(t => `<option ${a.type === t ? 'selected' : ''}>${t}</option>`).join('')}
      </select>

      <label class="field">Dauer (Minuten)</label>
      <input type="number" inputmode="numeric" value="${a.duration}" data-cardio-field="duration">

      <label class="field">Distanz (km, optional)</label>
      <input type="text" inputmode="decimal" value="${esc(a.distance)}" data-cardio-field="distance" placeholder="z. B. 8.5">

      <label class="field">Belastung (RPE 1–10)</label>
      <input type="number" inputmode="numeric" min="1" max="10" value="${a.rpe}" data-cardio-field="rpe">
    </div>
    <button class="btn" data-action="finish-cardio">Einheit speichern</button>
  `;
}
function renderMobilityView(){
  const a = ACTIVE;
  return `
    <a href="#" class="backlink" data-action="cancel-active">✕ Abbrechen</a>
    <div class="card">
      <h2>Mobility</h2>
      <div class="sub">${fmtDate(a.date)}</div>

      <label class="field">Fokus</label>
      <select data-mobility-field="focus">
        ${MOBILITY_FOCUS.map(f => `<option ${a.focus === f ? 'selected' : ''}>${f}</option>`).join('')}
      </select>

      <label class="field">Dauer (Minuten)</label>
      <input type="number" inputmode="numeric" value="${a.duration}" data-mobility-field="duration">

      <label class="field">Belastung (RPE 1–10)</label>
      <input type="number" inputmode="numeric" min="1" max="10" value="${a.rpe}" data-mobility-field="rpe">
    </div>
    <button class="btn" data-action="finish-mobility">Einheit speichern</button>
  `;
}

function renderSummary(){
  if(!LAST_SUMMARY){ VIEW = 'home'; return renderHome(); }
  const {name, date, stats} = LAST_SUMMARY;
  const entries = MUSCLES
    .map(m => ({ muscle: m, kg: stats.kgByMuscle[m] || 0 }))
    .filter(e => e.kg > 0)
    .sort((a,b) => b.kg - a.kg);
  const maxKg = entries.length ? entries[0].kg : 1;

  return `
    <div class="card summary-hero">
      <div class="summary-tag">Session abgeschlossen</div>
      <h2 class="summary-title">${esc(name)}</h2>
      <div class="summary-date">${fmtDate(date)}</div>
      ${stats.totalKg > 0 ? `
        <div class="summary-big">${fmtKg(stats.totalKg)}</div>
        <div class="summary-biglabel">gesamtes Volumen bewegt</div>
      ` : ''}
      <div class="summary-metarow">
        <div><div class="metaval">${stats.totalSets}</div><div class="metalbl">Sätze</div></div>
        <div><div class="metaval">${fmtNum(stats.totalReps)}</div><div class="metalbl">Wiederholungen</div></div>
      </div>
    </div>
    ${entries.length ? `
    <div class="card">
      <h2 class="cardlabel">Volumen pro Muskelgruppe</h2>
      <div class="sub">Gewicht × Wiederholungen · gerundet</div>
      ${entries.map(e => {
        const pct = Math.round((e.kg / maxKg) * 100);
        return `<div class="vol-row">
          <div class="vol-label">${e.muscle}</div>
          <div class="vol-bar-bg"><div class="vol-bar-fill" style="width:${pct}%"></div></div>
          <div class="vol-count">${fmtKg(e.kg)}</div>
        </div>`;
      }).join('')}
    </div>` : ''}
    <button class="btn" data-action="close-summary">Fertig</button>
  `;
}

function renderHistory(){
  const items = [
    ...DATA.sessions.map((s, i) => ({...s, kind:'strength', idx:i})),
    ...DATA.cardioSessions.map((c, i) => ({...c, kind:'cardio', idx:i})),
    ...DATA.mobilitySessions.map((m, i) => ({...m, kind:'mobility', idx:i}))
  ].sort((a,b) => b.date.localeCompare(a.date));
  if(items.length === 0) return `<div class="card"><div class="empty">Noch keine Einheiten geloggt.</div></div>`;
  /* <details> statt eigener Aufklapp-Logik: der Zustand lebt im Browser, nicht in
     der App — ein erneutes Rendern kann ihn nicht versehentlich zurücksetzen. */
  return `<div class="card">
    ${items.map(it => {
      const editBtn = `<div class="histedit"><button class="chip" data-action="open-edit" data-kind="${it.kind}" data-idx="${it.idx}">Bearbeiten</button></div>`;
      let titel, koerper;
      if(it.kind === 'strength'){
        titel = esc(it.name);
        koerper = it.exercises.map(ex => {
          const done = ex.sets.filter(s => s.done);
          if(done.length === 0) return '';
          const isWeight = ex.type ? ex.type === 'weight' : true;
          const unitLbl = isPerSide(ex.variant) ? 'kg/H' : 'kg';
          const varTxt = ex.variant ? ` — ${esc(ex.variant)}` : '';
          /* Eigener Zähler für Arbeitssätze: der Index würde Aufwärmsätze mitzählen
             und die Nummerierung damit verschieben (Aufwärmen, Satz 2, Satz 3 …). */
          let satzNr = 0;
          const setItems = done.map(s => {
            const label = s.warmup ? 'Aufwärmen' : `Satz ${++satzNr}`;
            return isWeight
              ? `<li>${label}: ${s.weight} ${unitLbl} × ${s.reps}</li>`
              : `<li>${label}: ${s.reps} ${ex.unit}</li>`;
          }).join('');
          return `<div class="histex">
            <div class="histexname">${ex.name}${varTxt}</div>
            <ul class="histsets">${setItems}</ul>
          </div>`;
        }).filter(Boolean).join('');
      } else if(it.kind === 'cardio'){
        titel = `Ausdauer — ${esc(it.type)}`;
        koerper = `<div class="detail">${esc(it.duration)} Min${it.distance ? ` · ${esc(it.distance)} km` : ''} · RPE ${esc(it.rpe)}</div>`;
      } else {
        titel = `Mobility — ${esc(it.focus)}`;
        koerper = `<div class="detail">${esc(it.duration)} Min${it.rpe ? ` · RPE ${esc(it.rpe)}` : ''}</div>`;
      }
      return `<details class="histitem">
        <summary><span class="histname">${titel}</span><span class="date">(${fmtDate(it.date)})</span></summary>
        <div class="histbody">${koerper}${editBtn}</div>
      </details>`;
    }).join('')}
  </div>`;
}
function renderEditView(){
  if(!EDIT_ITEM || !EDIT_TARGET) return '';
  const it = EDIT_ITEM;
  const footer = `
    <button class="btn" data-action="save-edit">Änderungen speichern</button>
    <div style="height:8px"></div>
    <button class="btn danger" data-action="delete-edit">Eintrag löschen</button>
  `;
  if(EDIT_TARGET.kind === 'strength'){
    return `
      <a href="#" class="backlink" data-action="cancel-edit">✕ Abbrechen</a>
      <div class="card">
        <h2>${esc(it.name)}</h2>
        <div class="sub">${fmtDate(it.date)}</div>
      </div>
      ${it.exercises.map((ex, exi) => `
        <div class="exwrap">
          <div class="exname">${ex.name}${ex.variant ? ` — ${esc(ex.variant)}` : ''}</div>
          ${ex.sets.map((s, si) => {
            const isWeight = ex.type ? ex.type === 'weight' : true;
            const numLabel = s.warmup ? 'W' : (si + 1);
            /* RIR nachträglich korrigierbar. Anders als im Training auch bei noch
               nicht abgehakten Sätzen sichtbar — beim Nachtragen will man drankommen,
               ohne erst etwas abhaken zu müssen. Aufwärmsätze bleiben außen vor. */
            const rirRow = (isWeight && !s.warmup && !ex.repUnit) ? `
              <div class="rirrow">
                <span class="rirlbl">RIR</span>
                ${[0,1,2,3,4].map(n => `<button class="rirchip ${s.rir === n ? 'active' : ''}" data-action="edit-set-rir" data-exi="${exi}" data-si="${si}" data-rir="${n}">${n === 4 ? '4+' : n}</button>`).join('')}
              </div>` : '';
            return isWeight ? `
              <div class="setrow">
                <div class="setnum">${numLabel}</div>
                <input type="number" inputmode="decimal" value="${s.weight ?? ''}" data-edit-field="weight" data-exi="${exi}" data-si="${si}">
                <input type="number" inputmode="numeric" value="${s.reps ?? ''}" data-edit-field="reps" data-exi="${exi}" data-si="${si}">
                <button class="checkbtn ${s.done ? 'checked' : ''}" data-action="edit-toggle-set" data-exi="${exi}" data-si="${si}">${s.done ? '✓' : ''}</button>
              </div>
              ${rirRow}
            ` : `
              <div class="setrow single">
                <div class="setnum">${numLabel}</div>
                <input type="number" inputmode="numeric" value="${s.reps ?? ''}" data-edit-field="reps" data-exi="${exi}" data-si="${si}">
                <button class="checkbtn ${s.done ? 'checked' : ''}" data-action="edit-toggle-set" data-exi="${exi}" data-si="${si}">${s.done ? '✓' : ''}</button>
              </div>
            `;
          }).join('')}
        </div>
      `).join('')}
      ${footer}
    `;
  } else if(EDIT_TARGET.kind === 'cardio'){
    return `
      <a href="#" class="backlink" data-action="cancel-edit">✕ Abbrechen</a>
      <div class="card">
        <h2>Ausdauer bearbeiten</h2>
        <div class="sub">${fmtDate(it.date)}</div>
        <label class="field">Typ</label>
        <select data-edit-cardio="type">
          ${['Laufen','Radfahren','Rudern','Crosstrainer','Schwimmen','Sonstiges'].map(t => `<option ${it.type === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
        <label class="field">Dauer (Minuten)</label>
        <input type="number" inputmode="numeric" value="${it.duration}" data-edit-cardio="duration">
        <label class="field">Distanz (km, optional)</label>
        <input type="text" inputmode="decimal" value="${esc(it.distance || '')}" data-edit-cardio="distance">
        <label class="field">Belastung (RPE 1–10)</label>
        <input type="number" inputmode="numeric" min="1" max="10" value="${it.rpe}" data-edit-cardio="rpe">
      </div>
      ${footer}
    `;
  } else {
    return `
      <a href="#" class="backlink" data-action="cancel-edit">✕ Abbrechen</a>
      <div class="card">
        <h2>Mobility bearbeiten</h2>
        <div class="sub">${fmtDate(it.date)}</div>
        <label class="field">Fokus</label>
        <select data-edit-mobility="focus">
          ${MOBILITY_FOCUS.map(f => `<option ${it.focus === f ? 'selected' : ''}>${f}</option>`).join('')}
        </select>
        <label class="field">Dauer (Minuten)</label>
        <input type="number" inputmode="numeric" value="${it.duration}" data-edit-mobility="duration">
        <label class="field">Belastung (RPE 1–10)</label>
        <input type="number" inputmode="numeric" min="1" max="10" value="${it.rpe ?? ''}" data-edit-mobility="rpe">
      </div>
      ${footer}
    `;
  }
}

function renderRelativeStrength(){
  const bw = DATA.bodyWeights.slice().sort((a, b) => a.date.localeCompare(b.date));
  if(bw.length === 0) return '';
  const latestBw = bw[bw.length - 1].weight;
  const rows = MUSCLES.map(m => ({muscle: m, s: muscleGroupStats()[m]})).filter(r => r.s);
  if(rows.length === 0) return '';
  return `
    <div class="card">
      <h2 class="cardlabel">Relative Kraft</h2>
      <div class="sub">Referenzlast im Verhältnis zu deinem letzten Körpergewicht (${latestBw} kg)</div>
      <table class="pbtable">
        ${rows.map(r => `<tr><td>${r.muscle}</td><td>${(r.s.latest.e1rm / latestBw).toFixed(2)}×</td></tr>`).join('')}
      </table>
    </div>
  `;
}
/* Aktivitäts-Kalender (GitHub-Contribution-Stil): pro Tag die "höchste" Aktivität,
   Priorität Kraft > Ausdauer > Mobility, damit an Tagen mit mehreren Einheiten
   die wichtigste sichtbar bleibt. */
function activityMap(){
  const map = {};
  DATA.mobilitySessions.forEach(m => { if(!map[m.date]) map[m.date] = 'mobility'; });
  DATA.cardioSessions.forEach(c => { map[c.date] = 'cardio'; });
  DATA.sessions.forEach(s => { map[s.date] = 'strength'; });
  return map;
}
const HEATMAP_COLORS = { strength: 'var(--accent)', cardio: 'var(--success)', mobility: '#8B7FD9' };
function renderHeatmap(){
  const map = activityMap();
  const weeks = 18;
  const todayD = new Date(todayISO() + "T12:00:00");
  const daysFromMonday = (todayD.getDay() + 6) % 7;
  const thisMonday = new Date(todayD); thisMonday.setDate(todayD.getDate() - daysFromMonday);
  const gridStart = new Date(thisMonday); gridStart.setDate(thisMonday.getDate() - (weeks - 1) * 7);

  const cell = 14, gap = 3, col = cell + gap;
  const W = weeks * col - gap, H = 7 * col - gap;
  const today = todayISO();

  let rects = '';
  for(let w = 0; w < weeks; w++){
    for(let d = 0; d < 7; d++){
      const date = new Date(gridStart); date.setDate(gridStart.getDate() + w * 7 + d);
      const iso = localISO(date);
      if(iso > today) continue;
      const type = map[iso];
      const fill = type ? HEATMAP_COLORS[type] : 'var(--surface-2)';
      rects += `<rect x="${w * col}" y="${d * col}" width="${cell}" height="${cell}" rx="3" fill="${fill}"></rect>`;
    }
  }
  return `
    <svg viewBox="0 0 ${W} ${H}" style="width:100%; height:auto; display:block;">${rects}</svg>
    <div class="chartlegend">
      <span class="legenditem"><span class="legenddot" style="background:var(--accent)"></span>Kraft</span>
      <span class="legenditem"><span class="legenddot" style="background:var(--success)"></span>Ausdauer</span>
      <span class="legenditem"><span class="legenddot" style="background:#8B7FD9"></span>Mobility</span>
    </div>
  `;
}
function renderProgress(){
  const vstats = variantStats();
  const rows = Object.keys(vstats).map(k => vstats[k])
    .sort((a, b) => (MUSCLES.indexOf(a.muscle) - MUSCLES.indexOf(b.muscle)) || a.label.localeCompare(b.label));
  return `
    <div class="card">
      <h2 class="cardlabel">Aktivität</h2>
      <div class="sub">Letzte 18 Wochen</div>
      ${renderHeatmap()}
    </div>
    <div class="card">
      <h2 class="cardlabel">Wochenvolumen</h2>
      <div class="sub">Arbeitssätze je Muskelgruppe · letzte 7 Tage · Ziel ${volumeTarget().min}–${volumeTarget().max} Sätze</div>
      ${renderWeeklyVolume()}
      ${renderVolumeSuggestions()}
    </div>
    <div class="card">
      <h2 class="cardlabel">Tonnage pro Einheit</h2>
      <div class="sub">Bewegtes Gewicht (kg × Wdh.) je Muskelgruppe · nur Arbeitssätze · letzte ${Math.min(6, DATA.sessions.length)} Krafteinheiten</div>
      ${renderTonnageChart()}
    </div>
    <div class="card">
      <h2 class="cardlabel">Kraftverlauf</h2>
      <div class="sub">Geschätztes 1RM (e1RM) je Muskelgruppe über die Zeit</div>
      ${renderStrengthChart()}
    </div>
    <div class="card">
      <h2 class="cardlabel">Fortschritt pro Übung</h2>
      <div class="sub">Bestes e1RM der letzten Einheit — getrennt nach Übung und Gerät, damit Maschine, Kabelzug und Freihantel nicht vermischt werden</div>
      ${rows.length === 0 ? '<div class="empty">Noch keine Daten.</div>' : `
      <table class="pbtable">
        ${rows.map(r => {
          const t = r.trendPct;
          const trendTxt = t > 0 ? `+${t}%` : (t < 0 ? `${t}%` : '±0%');
          const trendColor = t > 0 ? 'var(--success)' : (t < 0 ? 'var(--danger)' : 'var(--text-dim)');
          return `<tr><td>${esc(r.label)}<br><span style="color:var(--text-dim); font-size:11px;">${r.muscle} · ${r.sessions} Einheit${r.sessions > 1 ? 'en' : ''} seit ${fmtDate(r.first.date)}</span></td><td>${Math.round(r.latest.e1rm)} kg<br><span style="font-size:11px; color:${trendColor};">${trendTxt}</span></td></tr>`;
        }).join('')}
      </table>`}
    </div>
    ${renderRelativeStrength()}
    <div class="card">
      <h2 class="cardlabel">Gesamt</h2>
      <div class="sub">${DATA.sessions.length} Krafteinheiten · ${DATA.cardioSessions.length} Ausdauereinheiten · ${roundsComplete()} volle ${roundsComplete() === 1 ? 'Runde' : 'Runden'} (A + B + C)</div>
    </div>
  `;
}

function renderDataView(){
  const bw = DATA.bodyWeights.slice().sort((a, b) => a.date.localeCompare(b.date));
  const latestBw = bw.length ? bw[bw.length - 1] : null;
  return `
    <div class="card">
      <h2>Körpergewicht</h2>
      <div class="sub">${latestBw ? `Letzter Eintrag: ${latestBw.weight} kg am ${fmtDate(latestBw.date)}` : 'Optional — ermöglicht eine relative Kraftanzeige (z. B. Kniebeuge im Verhältnis zum Körpergewicht) im Fortschritts-Tab.'}</div>
      <div class="fieldgrid">
        <div>
          <label class="field" for="bwInput">Heutiges Gewicht (kg)</label>
          <input type="number" inputmode="decimal" step="0.1" id="bwInput" placeholder="z. B. 78,5">
        </div>
      </div>
      <button class="btn secondary" data-action="log-bodyweight">Speichern</button>
    </div>
    <div class="card">
      <h2>Wochenvolumen-Ziel</h2>
      <div class="sub">Arbeitssätze pro Muskelgruppe und Woche. Üblicher Korridor: 10–20.</div>
      <div class="fieldgrid">
        <div>
          <label class="field" for="volMin">Minimum</label>
          <input type="number" inputmode="numeric" id="volMin" value="${volumeTarget().min}">
        </div>
        <div>
          <label class="field" for="volMax">Maximum</label>
          <input type="number" inputmode="numeric" id="volMax" value="${volumeTarget().max}">
        </div>
      </div>
      <button class="btn secondary" data-action="save-volume-target">Speichern</button>
    </div>
    <div class="card">
      <h2>Pausen-Ton</h2>
      <div class="sub">Ein Ton bei gesperrtem Bildschirm ist auf dem iPhone nur möglich, wenn die App die Audio-Ausgabe während der ganzen Pause belegt — laufende Musik wird dadurch pausiert. Beides gleichzeitig geht nicht.</div>
      <button class="chip readinesschip ${DATA.lockScreenBeep ? 'active' : ''}" data-action="toggle-lockscreen-beep">${DATA.lockScreenBeep ? 'Ton bei gesperrtem Bildschirm · Musik pausiert' : 'Musik läuft weiter · Ton nur bei offener App'}</button>
    </div>
    <div class="card">
      <h2>Rhythmus</h2>
      <div class="sub">Kein fester Wochenplan: Die Pause bis zur nächsten Einheit ergibt sich aus der Nachwirkung, die du am Tag nach dem Training einträgst.</div>
      <div class="metalist">
        ${INTENSITY_ORDER.map(v => `<div class="metaitem"><span>Nachwirkung ${v}</span><span class="metaval">${REST_DAYS[v]} ${REST_DAYS[v] === 1 ? 'Ruhetag' : 'Ruhetage'}</span></div>`).join('')}
        <div class="metaitem"><span>Volle Runden</span><span class="metaval">${roundsComplete()}</span></div>
      </div>
    </div>
    <div class="card">
      <h2>Deine Daten</h2>
      <div class="sub">Alles wird ausschließlich lokal in diesem Browser gespeichert (localStorage). Es gibt keine Server-Verbindung — niemand außer dir hat Zugriff.</div>
      <div class="metalist">
        <div class="metaitem"><span>Offline-Version</span><span class="metaval" id="cacheVer">wird geprüft …</span></div>
        <div class="metaitem"><span>Letztes Backup</span><span class="metaval">${DATA.lastExport ? fmtDate(DATA.lastExport) : 'noch nie'}</span></div>
      </div>
      <div class="btnstack">
        <button class="btn secondary" data-action="export">Backup exportieren (.json)</button>
        <label class="btn secondary">
          Backup importieren
          <input type="file" id="importFile" accept="application/json" style="display:none;">
        </label>
      </div>
      <div class="dangerzone">
        <button class="btn danger" data-action="reset-all">Alle Daten löschen</button>
      </div>
    </div>
  `;
}

/* ============ EVENT HANDLING ============ */
function attachHandlers(){
  document.querySelectorAll('[data-tab]').forEach(b => {
    b.onclick = () => setView(b.dataset.tab);
  });
  document.querySelectorAll('[data-action="start-workout"]').forEach(b => {
    b.onclick = () => startWorkout(DATA.currentProgram || 'gym', b.dataset.variant, b.dataset.length || DATA.currentLength || 'voll');
  });
  document.querySelectorAll('[data-action="pick-length"]').forEach(b => {
    b.onclick = () => { DATA.currentLength = b.dataset.length; saveData(); render(); };
  });
  document.querySelectorAll('[data-action="switch-program"]').forEach(a => {
    a.onclick = (e) => { e.preventDefault(); DATA.currentProgram = a.dataset.to; saveData(); render(); };
  });
  document.querySelectorAll('[data-action="start-cardio"]').forEach(b => {
    b.onclick = startCardio;
  });
  document.querySelectorAll('[data-action="start-mobility"]').forEach(b => {
    b.onclick = (e) => { e.preventDefault(); startMobility(); };
  });

  const cancelLink = document.querySelector('[data-action="cancel-active"]');
  if(cancelLink) cancelLink.onclick = (e) => {e.preventDefault(); cancelActive();};

  document.querySelectorAll('[data-variant-exi]').forEach(inp => {
    inp.oninput = () => { ACTIVE.exercises[+inp.dataset.variantExi].variant = inp.value; };
    inp.onchange = () => { recomputeSuggestion(+inp.dataset.variantExi); render(); };
  });
  document.querySelectorAll('[data-set-field]').forEach(inp => {
    inp.oninput = () => {
      const exi = +inp.dataset.exi, si = +inp.dataset.si, field = inp.dataset.setField;
      const val = inp.value === '' ? null : parseFloat(inp.value);
      ACTIVE.exercises[exi].sets[si][field] = val;
      if(field === 'weight') ACTIVE.exercises[exi].sets[si].auto = false;
    };
  });
  document.querySelectorAll('[data-action="toggle-set"]').forEach(b => {
    b.onclick = () => {
      const exi = +b.dataset.exi, si = +b.dataset.si;
      const ex = ACTIVE.exercises[exi];
      const set = ex.sets[si];
      const wasDone = set.done;
      set.done = !set.done;
      if(!wasDone && set.done && !set.warmup && ex.type === 'weight' && !ex.repUnit && set.weight != null && set.reps != null){
        const w = setLoad(ex.variant, set.weight, ACTIVE.date);
        if(w != null){
          const e1rm = epley1RM(w, set.reps);
          const prevBest = variantBestEver(ex.id, ex.variant);
          if(prevBest > 0 && e1rm > prevBest) toast(`Neuer Bestwert ${ex.variant || ex.name}: ${Math.round(e1rm)} kg e1RM`);
        }
      }
      render();
    };
  });
  document.querySelectorAll('[data-action="set-rir"]').forEach(b => {
    b.onclick = () => {
      const exi = +b.dataset.exi, si = +b.dataset.si, val = +b.dataset.rir;
      const set = ACTIVE.exercises[exi].sets[si];
      set.rir = (set.rir === val) ? null : val;  // nochmal auf denselben Wert tippen = Angabe löschen
      render();
    };
  });

  document.querySelectorAll('[data-action="rest"]').forEach(b => {
    b.onclick = () => startTimer(+b.dataset.secs);
  });
  document.querySelectorAll('[data-action="pick-example"]').forEach(b => {
    b.onclick = () => {
      const exi = +b.dataset.exi;
      ACTIVE.exercises[exi].variant = b.dataset.value;
      recomputeSuggestion(exi);
      render();
    };
  });
  document.querySelectorAll('[data-action="add-warmup"]').forEach(a => {
    a.onclick = (e) => {
      e.preventDefault();
      const exi = +a.dataset.exi;
      const ex = ACTIVE.exercises[exi];
      const firstWork = ex.sets.find(s => !s.warmup && s.weight != null);
      const suggW = firstWork ? Math.max(0, Math.round((firstWork.weight * 0.5) / 2.5) * 2.5) : null;
      /* Hinten an den Aufwärmblock anfügen, nicht davor: so folgt die Nummerierung
         der Reihenfolge des Hinzufügens (W1, W2, …) und bereits angelegte Sätze
         behalten ihre Nummer. */
      let insertAt = 0;
      while(insertAt < ex.sets.length && ex.sets[insertAt].warmup) insertAt++;
      ex.sets.splice(insertAt, 0, { weight: suggW, reps: null, done:false, warmup:true });
      render();
    };
  });
  document.querySelectorAll('[data-action="remove-warmup"]').forEach(el => {
    el.onclick = () => {
      const exi = +el.dataset.exi, si = +el.dataset.si;
      ACTIVE.exercises[exi].sets.splice(si, 1);
      render();
    };
  });
  document.querySelectorAll('[data-action="repeat-last"]').forEach(b => {
    b.onclick = () => {
      const exi = +b.dataset.exi;
      const ex = ACTIVE.exercises[exi];
      const workSets = ex.sets.filter(s => !s.warmup);
      const filled = workSets.filter(s => s.reps != null || s.weight != null);
      if(filled.length === 0){ toast('Noch kein Satz eingetragen.'); return; }
      const source = filled[filled.length - 1];
      const target = workSets.find(s => !s.done && s.reps == null && (ex.type !== 'weight' || s.weight == null));
      if(!target){ toast('Kein leerer Satz mehr übrig.'); return; }
      if(ex.type === 'weight'){ target.weight = source.weight; target.auto = false; }
      target.reps = source.reps;
      render();
    };
  });
  const readinessBtn = document.querySelector('[data-action="toggle-readiness"]');
  if(readinessBtn) readinessBtn.onclick = () => { toggleReadiness(); render(); };
  const finishBtn = document.querySelector('[data-action="finish-workout"]');
  if(finishBtn) finishBtn.onclick = finishWorkout;
  const closeSummaryBtn = document.querySelector('[data-action="close-summary"]');
  if(closeSummaryBtn) closeSummaryBtn.onclick = () => {
    LAST_SUMMARY = null;
    setView('home');
  };

  document.querySelectorAll('[data-cardio-field]').forEach(inp => {
    inp.oninput = () => { ACTIVE[inp.dataset.cardioField] = inp.value; };
  });
  const finishCardioBtn = document.querySelector('[data-action="finish-cardio"]');
  if(finishCardioBtn) finishCardioBtn.onclick = finishCardio;

  document.querySelectorAll('[data-mobility-field]').forEach(inp => {
    inp.oninput = () => { ACTIVE[inp.dataset.mobilityField] = inp.value; };
  });
  const finishMobilityBtn = document.querySelector('[data-action="finish-mobility"]');
  if(finishMobilityBtn) finishMobilityBtn.onclick = finishMobility;

  const beepBtn = document.querySelector('[data-action="toggle-lockscreen-beep"]');
  if(beepBtn) beepBtn.onclick = () => {
    DATA.lockScreenBeep = !DATA.lockScreenBeep;
    saveData();
    render();
    toast(DATA.lockScreenBeep ? 'Ton auch bei gesperrtem Bildschirm' : 'Musik läuft künftig weiter');
  };

  document.querySelectorAll('[data-action="set-intensity"]').forEach(b => {
    b.onclick = () => {
      const idx = +b.dataset.idx;
      const val = b.dataset.value;
      if(!DATA.sessions[idx] || REST_DAYS[val] == null) return;
      DATA.sessions[idx].intensity = val;
      saveData();
      render();
      const n = REST_DAYS[val];
      toast(`Notiert: ${val} — ${n} ${n === 1 ? 'Ruhetag' : 'Ruhetage'}`);
    };
  });

  document.querySelectorAll('[data-action="add-set"]').forEach(b => {
    b.onclick = () => {
      const key = b.dataset.key;
      DATA.setAdjust = DATA.setAdjust || {};
      DATA.setAdjust[key] = (DATA.setAdjust[key] || 0) + 1;
      saveData();
      render();
      toast('Satz ergänzt — gilt ab der nächsten Einheit');
    };
  });
  const resetAdjBtn = document.querySelector('[data-action="reset-setadjust"]');
  if(resetAdjBtn) resetAdjBtn.onclick = () => {
    if(!confirm('Alle selbst ergänzten Sätze zurücksetzen?')) return;
    DATA.setAdjust = {};
    saveData();
    render();
    toast('Anpassungen zurückgesetzt');
  };

  const volBtn = document.querySelector('[data-action="save-volume-target"]');
  if(volBtn) volBtn.onclick = () => {
    const min = parseInt(document.getElementById('volMin').value, 10);
    const max = parseInt(document.getElementById('volMax').value, 10);
    if(!Number.isFinite(min) || !Number.isFinite(max) || min < 1 || max <= min){
      toast('Bitte ganze Zahlen ab 1 eintragen, Maximum größer als Minimum.');
      return;
    }
    DATA.volumeTarget = { min, max };
    saveData();
    render();
    toast('Zielkorridor gespeichert');
  };

  const logBwBtn = document.querySelector('[data-action="log-bodyweight"]');
  if(logBwBtn) logBwBtn.onclick = () => {
    const inp = document.getElementById('bwInput');
    const val = parseFloat(inp.value);
    if(!val || val <= 0){ toast('Bitte ein gültiges Gewicht eingeben.'); return; }
    const today = todayISO();
    const existing = DATA.bodyWeights.find(b => b.date === today);
    if(existing) existing.weight = val; else DATA.bodyWeights.push({date: today, weight: val});
    saveData();
    render();
    toast('Körpergewicht gespeichert');
  };

  document.querySelectorAll('[data-action="open-edit"]').forEach(el => {
    el.onclick = () => openEdit(el.dataset.kind, +el.dataset.idx);
  });
  const cancelEditLink = document.querySelector('[data-action="cancel-edit"]');
  if(cancelEditLink) cancelEditLink.onclick = (e) => { e.preventDefault(); closeEdit(); };
  document.querySelectorAll('[data-edit-field]').forEach(inp => {
    inp.oninput = () => {
      const exi = +inp.dataset.exi, si = +inp.dataset.si, field = inp.dataset.editField;
      EDIT_ITEM.exercises[exi].sets[si][field] = inp.value === '' ? null : parseFloat(inp.value);
    };
  });
  document.querySelectorAll('[data-action="edit-set-rir"]').forEach(b => {
    b.onclick = () => {
      const exi = +b.dataset.exi, si = +b.dataset.si, val = +b.dataset.rir;
      const s = EDIT_ITEM.exercises[exi].sets[si];
      s.rir = (s.rir === val) ? null : val;  // nochmal auf denselben Wert tippen = löschen
      render();
    };
  });
  document.querySelectorAll('[data-action="edit-toggle-set"]').forEach(b => {
    b.onclick = () => {
      const exi = +b.dataset.exi, si = +b.dataset.si;
      const s = EDIT_ITEM.exercises[exi].sets[si];
      s.done = !s.done;
      render();
    };
  });
  document.querySelectorAll('[data-edit-cardio]').forEach(inp => {
    inp.oninput = () => { EDIT_ITEM[inp.dataset.editCardio] = inp.value; };
  });
  document.querySelectorAll('[data-edit-mobility]').forEach(inp => {
    inp.oninput = () => { EDIT_ITEM[inp.dataset.editMobility] = inp.value; };
  });
  const saveEditBtn = document.querySelector('[data-action="save-edit"]');
  if(saveEditBtn) saveEditBtn.onclick = saveEdit;
  const deleteEditBtn = document.querySelector('[data-action="delete-edit"]');
  if(deleteEditBtn) deleteEditBtn.onclick = deleteEditEntry;

  const exportBtn = document.querySelector('[data-action="export"]');
  if(exportBtn) exportBtn.onclick = () => {
    const blob = new Blob([JSON.stringify(DATA, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `training-backup-${todayISO()}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    DATA.lastExport = todayISO();
    saveData();
    render();
    toast('Backup heruntergeladen');
  };
  const importInput = document.querySelector('#importFile');
  if(importInput) importInput.onchange = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const parsed = JSON.parse(reader.result);
        if(!Array.isArray(parsed.sessions) || !Array.isArray(parsed.cardioSessions)){ toast('Ungültige Backup-Datei'); return; }
        DATA = Object.assign({ sessions:[], cardioSessions:[], mobilitySessions:[], bodyWeights:[], variants:{}, lastExport:null, setAdjust:{} }, parsed);
        /* Wer gerade eine Backup-Datei eingelesen hat, besitzt nachweislich eine —
           die Erinnerung startet deshalb neu, statt sofort wieder anzuschlagen. */
        DATA.lastExport = todayISO();
        saveData();
        toast('Backup importiert');
        render();
      }catch(err){ toast('Datei konnte nicht gelesen werden'); }
    };
    reader.readAsText(file);
  };

  /* Zeigt den tatsächlich aktiven Service-Worker-Cache an. Bewusst ausgelesen
     statt als Konstante gepflegt — so kann die Anzeige nicht mit der Realität
     auseinanderlaufen. */
  const cacheVerEl = document.getElementById('cacheVer');
  if(cacheVerEl){
    if(!('caches' in window)){
      cacheVerEl.textContent = 'nicht verfügbar';
    } else {
      caches.keys().then(keys => {
        const own = keys.filter(k => k.startsWith('training-app-'));
        cacheVerEl.textContent = own.length ? own.join(', ') : 'noch nicht angelegt';
      }).catch(() => { cacheVerEl.textContent = 'nicht lesbar'; });
    }
  }

  const resetBtn = document.querySelector('[data-action="reset-all"]');
  if(resetBtn) resetBtn.onclick = () => {
    if(confirm('Wirklich ALLE Trainingsdaten unwiderruflich löschen?')){
      localStorage.removeItem(STORAGE_KEY);
      DATA = loadData();
      render();
      toast('Daten gelöscht');
    }
  };
}

render();

/* Wenn die App aus dem Hintergrund/gesperrten Zustand zurückkehrt:
   Timer-Anzeige aktualisieren und Fallback-Beep abspielen, falls der WAV-Sound
   blockiert wurde (z. B. Silent Mode) und der Timer inzwischen abgelaufen ist. */
document.addEventListener('visibilitychange', () => {
  if(!document.hidden && TIMER.total > 0){
    const remaining = Math.max(0, Math.ceil((TIMER.endTime - Date.now()) / 1000));
    if(remaining <= 0 && !TIMER.beeped){
      TIMER.beeped = true;
      fallbackBeep();
      fireTimerNotification();
      toast('Pause vorbei!');
      stopTimer();
    }
    render();
  }
});

/* Offline-Fähigkeit: Der Service Worker (sw.js) legt die App im Browser-Cache ab,
   sodass sie nach dem ersten Öffnen auch ganz ohne Internet startet. */
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
