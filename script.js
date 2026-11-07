const TPL='',D=window.DATA,$=s=>document.querySelector(s),
E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
F=n=>new Intl.NumberFormat('fr-FR').format(n)+' FCFA',
byId=i=>D.p.find(p=>p.id==i),pr=p=>+p.pr2||+p.pr,
PGS={apropos:'À propos de VIAN’S STORE',contact:'Contact',faq:'Questions fréquentes',tailles:'Guide des tailles',cgv:'Conditions générales de vente',conf:'Politique de confidentialité',livraison:'Politique de livraison',retour:'Politique de retour et d’échange'},
ST=['Nouvelle commande','En attente de confirmation','Confirmée','En préparation','Expédiée','Livrée','Annulée'],
CATS={H:['T-shirts','Polos','Chemises','Jeans','Pantalons','Shorts','Ensembles','Sweats et hoodies','Vestes','Chaussures','Accessoires'],F:['Tops et crop tops','Robes','Ensembles','Jeans','Pantalons','Jupes','Chemises','Sweats','Vestes','Chaussures','Sacs et accessoires']};
let cart=[],q='',cat='',isO=false,tab='p',X={},FM={};
try{cart=JSON.parse(localStorage.getItem('c')||'[]')}catch(e){}
const sv=()=>{try{localStorage.setItem('c',JSON.stringify(cart))}catch(e){}},
waN=()=>(D.s.wa||'').replace(/\D/g,''),
ok=u=>/^https?:\/\//.test(u||'')?u:'#',
T=m=>{const t=$('#t');t.textContent=m;t.className='on';setTimeout(()=>t.className='',4000)},
M=h=>{const m=$('#M');m.innerHTML='<div class="mb"><button class="x" data-a="x" aria-label="Fermer">✕</button>'+h+'</div>';m.className='m on'},
Z=()=>{$('#M').className='m'},
vOf=p=>(p.v||[]).find(v=>v.s==X.s&&v.c==X.c),
card=p=>`<a class="c" href="#p-${p.id}"><div class="im">${p.im&&p.im[0]?`<img src="${E(p.im[0])}" alt="${E(p.n)}" loading="lazy">`:'<span class="b">VIAN’S</span>'}${+p.pr2?'<i class="tg">PROMO</i>':''}</div><b class="n">${E(p.n)}</b>${+p.pr2?`<s>${F(p.pr)}</s> `:''}<strong>${F(pr(p))}</strong></a>`;
function shell(){$('#app').innerHTML=`<header><a href="#accueil" class="lg b">VIAN’S STORE</a><input id="q" data-f="q" type="search" placeholder="Rechercher un vêtement" aria-label="Rechercher"><a href="#panier" class="ic" aria-label="Panier">🛒<sup id="cn"></sup></a>${isO?'<a href="#admin" class="ic" aria-label="Administration">⚙️</a>':''}</header>
<section class="hero"><h1>Vivre, c’est être frais !</h1><p>Streetwear homme et femme. Commande en quelques clics, confirmation sur WhatsApp.</p><a class="btn" href="#tendances">DÉCOUVRIR LES TENDANCES</a></section><main id="mm"></main><footer id="ft"></footer><a id="wa" class="wa" target="_blank" rel="noopener">WhatsApp</a>`}
function fill(){const P=D.p,s=D.s,w=waN();
$('#cn').textContent=cart.length?cart.reduce((a,l)=>a+l.q,0):'';
$('#wa').style.display=w?'':'none';if(w)$('#wa').href='https://wa.me/'+w;
const grid=l=>l.length?`<div class="g">${l.map(card).join('')}</div>`:'<p class="mu">Rien à afficher pour le moment.</p>',
sec=(id,t,l)=>`<section id="${id}"><h2>${t}</h2>${grid(l)}</section>`,
chips=`<div class="ch">${[['','Tout'],['H','Homme'],['F','Femme']].map(([k,l])=>`<button class="o${cat==k?' on':''}" data-a="ct" data-v="${k}">${l}</button>`).join('')}</div>`;
let h;
if(q||cat)h=`<section>${chips}</section>`+sec('res','Résultats',P.filter(p=>(!q||(p.n+' '+p.rf+' '+p.sc).toLowerCase().includes(q.toLowerCase()))&&(!cat||p.c==cat)));
else h=`<section>${chips}</section>`+sec('tendances','Nouveautés',P.filter(p=>p.nw))+sec('best','Meilleures ventes',P.filter(p=>p.bs))+sec('homme','Collection Homme',P.filter(p=>p.c=='H'))+sec('femme','Collection Femme',P.filter(p=>p.c=='F'))+sec('promos','Promotions',P.filter(p=>+p.pr2))
+`<section id="videos"><h2>Vidéos &amp; Tendances</h2>${D.v.length?`<div class="vs">${D.v.map(v=>`<div><a class="vp" href="${E(ok(v.u))}" target="_blank" rel="noopener"><span>▶</span><b>${E(v.t)}</b></a>${byId(v.p)?`<a class="btn" href="#p-${v.p}">VOIR LE PRODUIT</a>`:''}</div>`).join('')}</div>`:'<p class="mu">Les vidéos arrivent bientôt.</p>'}</section>`
+`<section><h2>Pourquoi VIAN’S STORE</h2><div class="av"><div><b>Commande sur WhatsApp</b>Tu envoies ton panier, on confirme avec toi.</div><div><b>Livraison</b>Le tarif est confirmé selon ta zone.</div><div><b>Homme et femme</b>Des nouveautés streetwear à suivre.</div></div></section>`;
$('#mm').innerHTML=h;
const L=(u,t)=>u?`<a href="${E(ok(u))}" target="_blank" rel="noopener">${t}</a>`:'';
$('#ft').innerHTML=`<p class="b">VIAN’S STORE</p><p class="mu">Vivre, c’est être frais ! Abidjan, Côte d’Ivoire.</p><p>${Object.keys(PGS).map(k=>`<a href="#page-${k}">${PGS[k]}</a>`).join('')}</p><p>${w?`<a href="https://wa.me/${w}" target="_blank" rel="noopener">WhatsApp</a>`:''}${L(s.tt,'TikTok')}${L(s.fb,'Facebook')}${L(s.ig,'Instagram')}</p>`}
function PM(p){if(X.id!=p.id)X={id:p.id,s:'',c:'',n:1};const vs=p.v||[],sz=[...new Set(vs.map(v=>v.s))],co=[...new Set(vs.map(v=>v.c))];
if(sz.length==1&&!X.s)X.s=sz[0];if(co.length==1&&!X.c)X.c=co[0];const v=vOf(p),av=(s,c)=>vs.some(v=>(!s||v.s==s)&&(!c||v.c==c)&&v.k>0);
const grp=(a,k,cur,f)=>a.map(z=>`<button class="o${z==cur?' on':''}" data-a="${k}" data-v="${E(z)}"${f(z)?'':' disabled'}>${E(z)}</button>`).join('');
M(`<div class="pg">${(p.im&&p.im.length?p.im:['']).map(u=>`<div class="im">${u?`<img src="${E(u)}" alt="${E(p.n)}">`:'<span class="b">VIAN’S</span>'}</div>`).join('')}</div><h2>${E(p.n)}</h2><p class="mu">Réf. ${E(p.rf||p.id)} · ${E(p.sc)} · ${p.c=='H'?'Homme':'Femme'}</p><p>${+p.pr2?`<s>${F(p.pr)}</s> `:''}<strong>${F(pr(p))}</strong></p><p>${E(p.d)}</p>
<b>Taille</b><div class="ch">${grp(sz,'ps',X.s,z=>av(z,X.c))}</div><b>Couleur</b><div class="ch">${grp(co,'pc',X.c,z=>av(X.s,z))}</div>
<b>Quantité</b><div class="ch"><button class="o" data-a="qn" data-v="-1">−</button><span class="o" style="border:0">${X.n}</span><button class="o" data-a="qn" data-v="1">+</button></div>
<p class="mu">${v?(v.k>0?'Disponible ('+v.k+' en stock)':'Indisponible'):'Choisis une taille et une couleur.'}</p>
<button class="btn" data-a="ad">Ajouter au panier</button> <button class="btn k" data-a="w1">Commander sur WhatsApp</button> <button class="o" data-a="sh">Partager</button>`)}
function lines(){return cart.filter(l=>byId(l.id))}
function sub(){return lines().reduce((a,l)=>a+pr(byId(l.id))*l.q,0)}
function fee(){const z=(D.s.zones||[]).find(z=>z.n==FM.cm);return z&&z.f!==''&&!isNaN(z.f)?+z.f:null}
function ML(it){return it.map(l=>{const p=byId(l.id);return`• ${p.n} | réf. ${p.rf||p.id} | taille ${l.s} | couleur ${l.c} | ${l.q} × ${F(pr(p))}`}).join('\n')}
function go(t){const w=waN();if(!w)return T('Le numéro WhatsApp de la boutique n’est pas encore configuré.');const a=document.createElement('a');a.href='https://wa.me/'+w+'?text='+encodeURIComponent(t);a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();T('Message prêt dans WhatsApp. La commande n’est prise en compte qu’une fois ton message envoyé.')}
function CM(){const ls=lines(),zs=D.s.zones||[],f=fee(),st=sub();
if(!ls.length)return M('<h2>Panier</h2><p>Ton panier est vide.</p><a class="btn" href="#accueil">Continuer mes achats</a>');
const fi=(k,l,t='text')=>`<label>${l}<input data-f="${k}" type="${t}" value="${E(FM[k])}"></label>`;
M(`<h2>Panier</h2>${ls.map((l,i)=>{const p=byId(l.id);return`<div class="ln"><span><b class="n">${E(p.n)}</b>${E(l.s)} · ${E(l.c)} · ${F(pr(p))}</span><span><button class="o" data-a="cq" data-i="${i}" data-v="-1">−</button> ${l.q} <button class="o" data-a="cq" data-i="${i}" data-v="1">+</button> <button class="o" data-a="cr" data-i="${i}" aria-label="Supprimer">🗑</button></span></div>`}).join('')}
<p>Sous-total : <strong>${F(st)}</strong></p><p>Livraison : ${f!==null?F(f):'à confirmer sur WhatsApp'}</p><p>Total : <strong>${F(st+(f||0))}</strong>${f===null?' (hors livraison)':''}</p>
<h3>Livraison</h3>${fi('nm','Nom et prénom')}${fi('tl','Téléphone','tel')}${zs.length?`<label>Commune ou zone<select data-f="cm" data-r="1"><option value="">Choisir</option>${zs.map(z=>`<option${FM.cm==z.n?' selected':''}>${E(z.n)}</option>`).join('')}</select></label>`:fi('cm','Commune ou ville')}${fi('qt','Quartier')}${fi('ad','Adresse ou point de livraison')}${fi('nt','Instructions (facultatif)')}
<button class="btn" data-a="co">FINALISER MA COMMANDE SUR WHATSAPP</button><p><a href="#accueil">Continuer mes achats</a></p>`)}
function PG(k){if(!PGS[k])return Z();const t=D.pg[k];M(`<h2>${PGS[k]}</h2><p>${t?E(t).replace(/\n/g,'<br>'):'Contenu à compléter par VIAN’S STORE.'}</p>`)}
const I=(id,l,v,t='text')=>`<label>${l}<input id="${id}" type="${t}" value="${E(v)}"></label>`,TA=(id,l,v)=>`<label>${l}<textarea id="${id}">${E(v)}</textarea></label>`,V=id=>$('#'+id).value.trim();
function PF(p={}){return`<div class="fm"><h3>${p.id?'Modifier':'Ajouter'} un produit</h3>${I('f_n','Nom',p.n)}${I('f_rf','Référence',p.rf)}<label>Catégorie<select id="f_c"><option value="H"${p.c=='H'?' selected':''}>Homme</option><option value="F"${p.c=='F'?' selected':''}>Femme</option></select></label>${I('f_sc','Sous-catégorie (ex : '+CATS.H[0]+')',p.sc)}${I('f_pr','Prix (FCFA)',p.pr,'number')}${I('f_p2','Prix promo (facultatif)',+p.pr2||'','number')}${TA('f_d','Description',p.d)}${TA('f_v','Variantes : Taille | Couleur | Stock (une par ligne)',(p.v||[]).map(v=>[v.s,v.c,v.k].join(' | ')).join('\n'))}<label>Photos<input type="file" accept="image/*" multiple data-up="f_im"></label>${TA('f_im','URLs des photos (une par ligne)',(p.im||[]).join('\n'))}<label><input type="checkbox" id="f_nw"${p.nw?' checked':''}> Nouveauté</label><label><input type="checkbox" id="f_bs"${p.bs?' checked':''}> Meilleure vente</label><button class="btn" data-a="sp" data-v="${p.id||''}">Enregistrer le produit</button></div>`}
const AT={
p:()=>`<button class="btn" data-a="np">Ajouter un produit</button>${D.p.map(p=>`<div class="ln"><span>${E(p.n)}<br><small class="mu">${F(pr(p))} · stock ${(p.v||[]).reduce((a,v)=>a+(+v.k||0),0)}</small></span><span><button class="o" data-a="ep" data-v="${p.id}">Modifier</button> <button class="o" data-a="dp" data-v="${p.id}">Supprimer</button></span></div>`).join('')}<div id="pf"></div>`,
v:()=>`${D.v.map((v,i)=>`<div class="ln"><span>${E(v.t)}</span><button class="o" data-a="dv" data-v="${i}">Supprimer</button></div>`).join('')}<div class="fm"><h3>Ajouter une vidéo</h3>${I('v_t','Titre')}${I('v_u','Lien de la vidéo (YouTube, TikTok…)')}<label>Produit associé<select id="v_p"><option value="">Aucun</option>${D.p.map(p=>`<option value="${p.id}">${E(p.n)}</option>`).join('')}</select></label><button class="btn" data-a="sv">Ajouter</button></div>`,
o:()=>`<p class="mu">Les commandes arrivent par WhatsApp : note-les ici pour suivre leur statut.</p>${D.o.map((o,i)=>`<div class="ln"><span>${E(o.n)} · ${E(o.t)}<br><small class="mu">${E(o.d)} · ${F(o.m||0)}</small></span><span><select data-os="${i}">${ST.map(s=>`<option${o.st==s?' selected':''}>${s}</option>`).join('')}</select> <button class="o" data-a="do" data-v="${i}">🗑</button></span></div>`).join('')}<div class="fm"><h3>Nouvelle commande</h3>${I('o_n','Client')}${I('o_t','Téléphone')}${TA('o_d','Articles et livraison','')}${I('o_m','Total (FCFA)','','number')}<button class="btn" data-a="so">Ajouter</button></div>`,
s:()=>`<div class="fm"><h3>Boutique</h3>${I('s_wa','Numéro WhatsApp avec indicatif (ex : 225XXXXXXXXXX)',D.s.wa)}${I('s_tt','Lien TikTok',D.s.tt)}${I('s_fb','Lien Facebook',D.s.fb)}${I('s_ig','Lien Instagram',D.s.ig)}${TA('s_z','Zones de livraison : Commune | frais en FCFA (laisse vide si à confirmer)',(D.s.zones||[]).map(z=>z.n+' | '+z.f).join('\n'))}${Object.keys(PGS).map(k=>TA('g_'+k,PGS[k],D.pg[k])).join('')}<button class="btn" data-a="ss">Enregistrer</button></div>`};
function AD(){M(`<h2>Administration</h2><p class="mu">Modifie, puis clique sur « Publier les changements » : c’est ce qui met la boutique à jour pour tes clients.</p><div class="tb">${[['p','Produits'],['v','Vidéos'],['o','Commandes'],['s','Boutique']].map(([k,l])=>`<button class="o${k==tab?' on':''}" data-a="tb" data-v="${k}">${l}</button>`).join('')}<button class="btn" data-a="pub">Publier les changements</button></div>${AT[tab]()}`)}
async function pub(){try{const a=window.claude&&await claude.use('artifact');if(!a)return T('Publication indisponible ici.');const j=JSON.stringify(D).replace(/</g,'\\u003c');await a.publish('<!doctype html>'+TPL.replace(/(<script id="d" type="application\/json">)[\s\S]*?(<\/script>)/,(m,x,y)=>x+j+y))}catch(e){T('Échec de la publication : '+(e.code||e.message))}}
const A={x(){location.hash='accueil'},ct(d){cat=d.v;fill()},tb(d){tab=d.v;AD()},
ps(d){X.s=X.s==d.v?'':d.v;PM(byId(X.id))},pc(d){X.c=X.c==d.v?'':d.v;PM(byId(X.id))},qn(d){X.n=Math.max(1,X.n+ +d.v);PM(byId(X.id))},
ad(){const p=byId(X.id),v=vOf(p);if(!v||v.k<1)return T('Choisis une taille et une couleur disponibles.');const l=cart.find(l=>l.id==p.id&&l.s==X.s&&l.c==X.c),n=(l?l.q:0)+X.n;if(n>v.k)return T('Stock insuffisant : '+v.k+' disponible(s).');l?l.q=n:cart.push({id:p.id,s:X.s,c:X.c,q:X.n});sv();fill();T('Article ajouté au panier.')},
w1(){const p=byId(X.id);if(!vOf(p))return T('Choisis une taille et une couleur.');go(`Bonjour VIAN’S STORE, je souhaite commander :\n${ML([{id:p.id,s:X.s,c:X.c,q:X.n}])}\nTotal articles : ${F(pr(p)*X.n)}\nPeux-tu me confirmer la disponibilité et la livraison ?`)},
sh(){const u=location.href;navigator.share?navigator.share({title:byId(X.id).n,url:u}).catch(()=>{}):navigator.clipboard.writeText(u).then(()=>T('Lien copié.'))},
cq(d){const l=lines()[+d.i];l.q=Math.max(1,l.q+ +d.v);sv();CM();fill()},cr(d){const l=lines()[+d.i];cart.splice(cart.indexOf(l),1);sv();CM();fill()},
co(){if(!FM.nm||!FM.tl||!FM.cm)return T('Renseigne ton nom, ton téléphone et ta commune.');const f=fee(),st=sub();go(`Bonjour VIAN’S STORE, je souhaite commander :\n${ML(lines())}\nSous-total : ${F(st)}\nLivraison : ${f!==null?F(f):'à confirmer'}\nTotal : ${F(st+(f||0))}${f===null?' (hors livraison)':''}\n\nNom : ${FM.nm}\nTéléphone : ${FM.tl}\nCommune : ${FM.cm}\nQuartier : ${FM.qt||''}\nAdresse : ${FM.ad||''}\nInstructions : ${FM.nt||''}`)},
np(){$('#pf').innerHTML=PF()},ep(d){$('#pf').innerHTML=PF(byId(d.v));$('#pf').scrollIntoView()},
dp(d){if(confirm('Supprimer ce produit ?')){D.p=D.p.filter(p=>p.id!=d.v);AD()}},
sp(d){const n=V('f_n'),pri=+V('f_pr');if(!n||!pri)return T('Le nom et le prix sont obligatoires.');
const v=V('f_v').split('\n').map(l=>l.split('|').map(x=>x.trim())).filter(a=>a[0]).map(a=>({s:a[0],c:a[1]||'Unique',k:+a[2]||0})),
o={id:d.v||'p'+Date.now().toString(36),n,rf:V('f_rf'),c:V('f_c'),sc:V('f_sc'),pr:pri,pr2:+V('f_p2')||0,d:V('f_d'),v:v.length?v:[{s:'Unique',c:'Unique',k:0}],im:V('f_im').split('\n').map(x=>x.trim()).filter(Boolean),nw:$('#f_nw').checked?1:0,bs:$('#f_bs').checked?1:0},i=D.p.findIndex(p=>p.id==o.id);i<0?D.p.push(o):D.p[i]=o;AD();T('Produit enregistré. Pense à publier.')},
sv(){const t=V('v_t'),u=V('v_u');if(!t||!ok(u)||ok(u)=='#')return T('Titre et lien (https://…) obligatoires.');D.v.push({t,u,p:V('v_p')});AD()},dv(d){D.v.splice(+d.v,1);AD()},
so(){if(!V('o_n'))return T('Indique le client.');D.o.unshift({n:V('o_n'),t:V('o_t'),d:V('o_d'),m:+V('o_m')||0,st:ST[0]});AD()},do(d){D.o.splice(+d.v,1);AD()},
ss(){const s=D.s;s.wa=V('s_wa');s.tt=V('s_tt');s.fb=V('s_fb');s.ig=V('s_ig');s.zones=V('s_z').split('\n').map(l=>l.split('|').map(x=>x.trim())).filter(a=>a[0]).map(a=>({n:a[0],f:a[1]||''}));Object.keys(PGS).forEach(k=>D.pg[k]=V('g_'+k));fill();T('Réglages enregistrés. Pense à publier.')},
pub};
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(t&&A[t.dataset.a])A[t.dataset.a](t.dataset)});
document.addEventListener('input',e=>{const k=e.target.dataset.f;if(!k)return;if(k=='q'){q=e.target.value;fill()}else FM[k]=e.target.value});
document.addEventListener('change',async e=>{const t=e.target;if(t.dataset.f=='cm'){FM.cm=t.value;CM()}if(t.dataset.os)D.o[+t.dataset.os].st=t.value;
if(t.dataset.up){const a=window.claude&&await claude.use('assets');if(!a)return T('Import indisponible : colle des URLs d’images.');for(const f of t.files){try{const r=await a.upload(f),b=$('#'+t.dataset.up);b.value+=(b.value?'\n':'')+r.url}catch(x){T('Échec de l’import de '+f.name)}}}});
function route(){const h=location.hash.slice(1);if(h.startsWith('p-')){const p=byId(h.slice(2));return p?PM(p):Z()}if(h=='panier')return CM();if(h=='admin')return isO?AD():(Z(),T('Espace réservé au propriétaire.'));if(h.startsWith('page-'))return PG(h.slice(5));Z()}
addEventListener('hashchange',route);
shell();fill();route();
if(window.claude)claude.use('user').then(u=>{if(u&&u.isOwner()){isO=true;shell();fill();route()}}).catch(()=>{});
