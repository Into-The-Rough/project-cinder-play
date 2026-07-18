(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=.36,t=.38,n=2400,r=class{context;master;ambience;music;muted=!1;musicEnabled=!0;musicStarted=!1;musicStep=0;musicTimer;async unlock(){if(this.context===void 0){let t=window.AudioContext??window.webkitAudioContext;if(t===void 0)return!1;this.context=new t,this.master=this.context.createGain(),this.master.gain.value=this.muted?0:e,this.master.connect(this.context.destination),this.startAmbience()}return this.context.state!==`running`&&this.context.state!==`closed`&&await this.context.resume(),this.context.state===`running`&&!this.musicStarted&&this.startMusic(),this.context.state===`running`}setMuted(t){this.muted=t,this.master!==void 0&&this.context!==void 0&&this.master.gain.setTargetAtTime(t?0:e,this.context.currentTime,.02)}isMuted(){return this.muted}isReady(){return this.context?.state===`running`}setMusicEnabled(e){this.musicEnabled=e,this.music!==void 0&&this.context!==void 0&&(this.music.gain.setTargetAtTime(e?t:0,this.context.currentTime,.12),e&&this.context.state===`running`&&this.scheduleMusicPhrase())}isMusicEnabled(){return this.musicEnabled}playEvents(e){if(!(this.context===void 0||this.master===void 0||this.muted))for(let t of e)t.type===`shot`?(t.sourceId===`player`?this.gunshot():this.enemyShot(),t.hit&&this.hit(t.targetId===`player`)):t.type===`melee`?this.melee(t.hit):t.type===`door`?this.door():t.type===`pickup`?this.pickup():t.type===`move`&&t.entityId===`player`?this.step():t.type===`repair`?this.repair():t.type===`drop`?this.drop():t.type===`weather`&&t.kind===`rain`?this.rain(t.intensity):t.type===`condition`&&t.active?this.conditionWarning():t.type===`status`&&t.status===`won`&&this.success()}startAmbience(){let e=this.context,t=this.master;if(!(e===void 0||t===void 0)){this.ambience=e.createGain(),this.ambience.gain.value=.025,this.ambience.connect(t);for(let t of[43,58]){let n=e.createOscillator();n.type=`sine`,n.frequency.value=t,n.connect(this.ambience),n.start()}}}startMusic(){let e=this.context,r=this.master;if(!(e===void 0||r===void 0)){this.music=e.createGain(),this.music.gain.value=this.musicEnabled?t:0,this.music.connect(r);for(let[t,n]of[[110,.05],[164.81,.026],[220,.012]]){let r=e.createOscillator(),i=e.createGain();r.type=t===110?`sine`:`triangle`,r.frequency.value=t,i.gain.value=n,r.connect(i),i.connect(this.music),r.start()}this.musicStarted=!0,this.scheduleMusicPhrase(),this.musicTimer!==void 0&&window.clearInterval(this.musicTimer),this.musicTimer=window.setInterval(()=>this.scheduleMusicPhrase(),n)}}scheduleMusicPhrase(){if(this.context===void 0||this.context.state!==`running`||this.music===void 0||!this.musicEnabled)return;let e=[220,246.94,261.63,293.66,329.63,293.66,261.63,196],t=e[this.musicStep%e.length]??110;this.musicStep+=1,this.tone(t,1.9,.13,`sine`,t*.992,this.music),this.tone(t*.75,2.1,.06,`triangle`,t*.744,this.music),this.musicStep%3==0&&window.setTimeout(()=>this.tone(t*1.5,1.15,.085,`triangle`,void 0,this.music),660)}tone(e,t,n,r=`square`,i,a){let o=this.context,s=this.master;if(o===void 0||s===void 0)return;let c=o.currentTime,l=o.createOscillator(),u=o.createGain();l.type=r,l.frequency.setValueAtTime(e,c),i!==void 0&&l.frequency.exponentialRampToValueAtTime(i,c+t),u.gain.setValueAtTime(n,c),u.gain.exponentialRampToValueAtTime(.001,c+t),l.connect(u),u.connect(a??s),l.start(c),l.stop(c+t)}noise(e,t,n){let r=this.context,i=this.master;if(r===void 0||i===void 0)return;let a=Math.ceil(r.sampleRate*e),o=r.createBuffer(1,a,r.sampleRate),s=o.getChannelData(0);for(let e=0;e<s.length;e+=1)s[e]=Math.random()*2-1;let c=r.createBufferSource(),l=r.createBiquadFilter(),u=r.createGain();l.type=`lowpass`,l.frequency.value=n,u.gain.setValueAtTime(t,r.currentTime),u.gain.exponentialRampToValueAtTime(.001,r.currentTime+e),c.buffer=o,c.connect(l),l.connect(u),u.connect(i),c.start()}gunshot(){this.noise(.15,.65,1800),this.tone(105,.12,.35,`sawtooth`,44)}enemyShot(){this.tone(420,.11,.3,`square`,95)}hit(e){this.tone(e?72:126,.09,.18,`sawtooth`,48)}melee(e){this.noise(.09,e?.32:.13,e?520:260),this.tone(e?88:62,.1,e?.22:.1,`triangle`,42)}repair(){[520,690,880].forEach((e,t)=>{window.setTimeout(()=>this.tone(e,.055,.09,`square`,e*.94),t*70)})}drop(){this.tone(74,.09,.1,`triangle`,42)}door(){this.tone(68,.5,.18,`sawtooth`,28)}pickup(){this.tone(440,.08,.18,`sine`,660),window.setTimeout(()=>this.tone(660,.1,.12,`sine`,880),70)}step(){this.noise(.055,.1,240)}rain(e){this.noise(1.2,e===2?.16:.09,e===2?2600:1800)}conditionWarning(){this.tone(145,.16,.12,`sawtooth`,92),window.setTimeout(()=>this.tone(112,.2,.09,`triangle`,72),130)}success(){[330,440,554,660].forEach((e,t)=>{window.setTimeout(()=>this.tone(e,.32,.16,`sine`),t*115)})}},i=`MARA VOSS // PROSPECTOR`,a=`DR SERA HOLT // CARAVAN MEDIC`,o=`NIKO ORTEGA // ROUTE SCOUT`,s=`ABEL CROW // RED MESA MINER`,c=`TAMSIN VALE // JUNIPER TRADER`,l=`SABLE REYES // COYOTE ROAD TRADER`,u=`ORRIN PIKE // GLASSWATER WANDERER`,d=`LARK DANNER // RIDGE WALKER`,f={mara_intro:{id:`mara_intro`,speaker:i,body:`Easy, traveler. Raiders stripped our caravan and dragged the water condenser into a buried relay past Red Mesa. Without it, nobody here reaches the next settlement.`,choices:[{id:`job`,label:`What exactly was taken?`,nextNodeId:`mara_job`},{id:`pay`,label:`What is the pay?`,nextNodeId:`mara_pay`},{id:`danger`,label:`What is hunting out there?`,nextNodeId:`mara_dangers`},{id:`survival`,label:`How do I survive the night?`,nextNodeId:`mara_survival`},{id:`survivors`,label:`Who else survived the raid?`,nextNodeId:`mara_survivors`},{id:`trade`,label:`Show me what you are carrying.`,effect:`barter`,close:!0},{id:`accept`,label:`I will recover it.`,nextNodeId:`mara_accept`,effect:`accept_job`},{id:`leave`,label:`Not now.`,effect:`leave`,close:!0}]},mara_job:{id:`mara_job`,speaker:i,body:`A brass condenser cylinder with blue glass down the middle. The relay is in Ash Basin. Dry Wells service station held an access card before the raiders occupied its cellar; otherwise you will need to pick the bunker lock.`,choices:[{id:`back`,label:`Ask something else.`,nextNodeId:`mara_intro`},{id:`accept`,label:`I will bring it back.`,nextNodeId:`mara_accept`,effect:`accept_job`}]},mara_pay:{id:`mara_pay`,speaker:i,body:`Food, clean water, and ten pieces of trade scrap when the caravan is moving again. That is the honest offer.`,choices:[{id:`bargain`,label:`Make it fifteen scrap.`,nextNodeId:`mara_bargain`,effect:`bargain`},{id:`back`,label:`Ask something else.`,nextNodeId:`mara_intro`},{id:`accept`,label:`Deal.`,nextNodeId:`mara_accept`,effect:`accept_job`}]},mara_bargain:{id:`mara_bargain`,speaker:i,body:`Twelve. You get the other three if you do not put a bullet through the condenser. We both know you were going south anyway.`,choices:[{id:`accept`,label:`Twelve, then.`,nextNodeId:`mara_accept`,effect:`accept_job`},{id:`leave`,label:`I will think about it.`,effect:`leave`,close:!0}]},mara_dangers:{id:`mara_dangers`,speaker:i,body:`Blue drums draw rad roaches. Cinder ants track movement. Ash geckos hunt the open lanes, and the old Red Mesa prospect has scorpions big enough to bend sheet metal. Raiders fire straight, so break sight before reloading.`,choices:[{id:`thanks`,label:`Useful. Thank you.`,nextNodeId:`mara_intro`,effect:`gain_trust`},{id:`accept`,label:`I can handle it.`,nextNodeId:`mara_accept`,effect:`accept_job`}]},mara_survival:{id:`mara_survival`,speaker:i,body:`The cellars go black and the Mojave is worse after sundown. Carry a torch, but remember that anything hunting can see it too. Rain hides movement, soaks you cold, and can leave lung rot. Ants and scorpions carry venom. Keep antivenom, antibiotics, armour, and a Stimpak where you can reach them. Sleep at the lean-to before fatigue ruins your aim—and treat Jet and whiskey like debts, because dependence always collects.`,choices:[{id:`thanks`,label:`That may keep me alive.`,nextNodeId:`mara_intro`,effect:`gain_trust`},{id:`accept`,label:`I am ready.`,nextNodeId:`mara_accept`,effect:`accept_job`}]},mara_accept:{id:`mara_accept`,speaker:i,body:`Then we have a deal. Search the Dry Wells cellar for its relay card, cross Red Mesa, breach the Ash Basin bunker, and bring the condenser to the green caravan marker. The mine is optional, but prospectors left supplies below.`,choices:[{id:`leave`,label:`Head into the waste.`,effect:`leave`,close:!0}]},mara_survivors:{id:`mara_survivors`,speaker:i,body:`Sera Holt is keeping the caravan alive near camp. Niko Ortega scouts the broken highway around Dry Wells. Abel Crow refused to leave the Red Mesa prospect; if he still breathes, the mine will know it.`,choices:[{id:`back`,label:`Ask something else.`,nextNodeId:`mara_intro`},{id:`leave`,label:`I will find them.`,effect:`leave`,close:!0}]},mara_reminder:{id:`mara_reminder`,speaker:i,body:`Dry Wells is east along the broken highway. Its cellar should hold a relay card. Red Mesa has an optional mine, and the buried relay waits beyond it in Ash Basin. We are not leaving without that condenser.`,choices:[{id:`danger`,label:`Repeat the survival advice.`,nextNodeId:`mara_dangers`},{id:`night`,label:`Remind me about night and weather.`,nextNodeId:`mara_survival`},{id:`trade`,label:`Let us trade.`,effect:`barter`,close:!0},{id:`leave`,label:`I am moving.`,effect:`leave`,close:!0}]},mara_keycard:{id:`mara_keycard`,speaker:i,body:`That is the Dry Wells foreman card. It should release the outer bunker lock in Ash Basin. The relay terminal still controls the inner security seal.`,choices:[{id:`danger`,label:`What waits past Red Mesa?`,nextNodeId:`mara_dangers`},{id:`trade`,label:`Trade before I go.`,effect:`barter`,close:!0},{id:`leave`,label:`Head for Ash Basin.`,effect:`leave`,close:!0}]},mara_return:{id:`mara_return`,speaker:i,body:`That blue glass is still intact. Get the condenser to the green caravan marker and we can roll before the raiders regroup. Your payment is waiting.`,choices:[{id:`trade`,label:`Trade before we move.`,effect:`barter`,close:!0},{id:`leave`,label:`Finish the job.`,effect:`leave`,close:!0}]},sera_intro:{id:`sera_intro`,speaker:a,body:`Hold still. I am Sera Holt. I have more patients than clean needles, but I can give you knowledge without spending either. What is trying to kill you?`,choices:[{id:`medicine`,label:`How do I treat exposure and venom?`,nextNodeId:`sera_medicine`,effect:`learn_field_medicine`},{id:`plants`,label:`Which desert plants are useful?`,nextNodeId:`sera_plants`,effect:`learn_desert_plants`},{id:`people`,label:`Tell me about the caravan.`,nextNodeId:`sera_people`},{id:`trade`,label:`Show me your medical stock.`,effect:`barter`,close:!0},{id:`leave`,label:`That is enough for now.`,effect:`leave`,close:!0}]},sera_medicine:{id:`sera_medicine`,speaker:a,body:`Wet clothes and fatigue invite lung rot. Rad-roach bites carry waste fever; ant and scorpion venom keeps working after the fight. Antibiotics cure infection, antivenom stops poison, and a broc poultice buys time. Stimpaks close wounds, not bad decisions.`,choices:[{id:`back`,label:`Ask about something else.`,nextNodeId:`sera_intro`}]},sera_plants:{id:`sera_plants`,speaker:a,body:`Prickly pear holds water beneath the spines. Broc flower has a blue-green crown and slows venom when crushed. Harvest carefully: a practiced survivor gets more from the same plant, and a living cactus is worth more than another loose rock.`,choices:[{id:`back`,label:`Ask about something else.`,nextNodeId:`sera_intro`}]},sera_people:{id:`sera_people`,speaker:a,body:`Mara keeps the route together. Niko reads storms and raider tracks. Abel knows Red Mesa better than anyone, though the mine has been talking back to him for years. We are not heroes. We are simply not dead yet.`,choices:[{id:`back`,label:`Ask about something else.`,nextNodeId:`sera_intro`}]},niko_intro:{id:`niko_intro`,speaker:o,body:`Niko Ortega. I range ahead of Mara's caravan. The road looks open because everything dangerous learned to wait out of sight. Pick a route and I will tell you what it costs.`,choices:[{id:`wells`,label:`What happened at Dry Wells?`,nextNodeId:`niko_wells`,effect:`learn_dry_wells`},{id:`water`,label:`Where do the flooded washes lead?`,nextNodeId:`niko_water`,effect:`learn_waterways`},{id:`raiders`,label:`How do the raiders patrol?`,nextNodeId:`niko_raiders`,effect:`learn_raider_routes`},{id:`leave`,label:`Keep watching the road.`,effect:`leave`,close:!0}]},niko_wells:{id:`niko_wells`,speaker:o,body:`The service station cellar still has power and a foreman card tied to the Ash Basin relay. Raiders searched the pumps, not the locked utility room. Expect roaches below and a narrow doorway when you need to retreat.`,choices:[{id:`back`,label:`Ask about another route.`,nextNodeId:`niko_intro`}]},niko_water:{id:`niko_water`,speaker:o,body:`The washes cross the old road instead of following it. They are slow going, but gunfire and dust do not carry as far over water. Rain can deepen them fast. Enter rested, leave before the cold settles in your lungs.`,choices:[{id:`back`,label:`Ask about another route.`,nextNodeId:`niko_intro`}]},niko_raiders:{id:`niko_raiders`,speaker:o,body:`Their strongest patrols sit east of Red Mesa. They fire down long lanes, then push while you reload. Break sight behind ruins, keep a round chambered, and do not mistake an empty horizon for an empty desert.`,choices:[{id:`back`,label:`Ask about another route.`,nextNodeId:`niko_intro`}]},abel_intro:{id:`abel_intro`,speaker:s,body:`Abel Crow. Forty years under Red Mesa and the stone still has new ways to disappoint me. You came for ore, shelter, or the relay story everyone pretends not to believe?`,choices:[{id:`mine`,label:`What is still useful in this mine?`,nextNodeId:`abel_mine`,effect:`learn_red_mesa`},{id:`relay`,label:`Tell me about the buried relay.`,nextNodeId:`abel_relay`,effect:`learn_buried_relay`},{id:`old`,label:`What happened to the old prospectors?`,nextNodeId:`abel_old`,effect:`learn_old_prospectors`},{id:`leave`,label:`I will leave you to it.`,effect:`leave`,close:!0}]},abel_mine:{id:`abel_mine`,speaker:s,body:`The west gallery is picked clean. The south cut still holds a locked supply chest, but scorpions nest where the ceiling stays warm. Watch the broken supports; they point toward solid ground and back to the entrance.`,choices:[{id:`back`,label:`Ask another question.`,nextNodeId:`abel_intro`}]},abel_relay:{id:`abel_relay`,speaker:s,body:`Ash Basin is not empty. The relay sits under it, east of the mechanical lock. A foreman card opens the outer seal; a maintenance terminal controls the inner one. Blue glass behind that seal is probably your condenser.`,choices:[{id:`back`,label:`Ask another question.`,nextNodeId:`abel_intro`}]},abel_old:{id:`abel_old`,speaker:s,body:`Some joined caravans. Some fed the scorpions. I stayed because a ghoul can outwait a bad claim and because somebody should remember their names. Take supplies if you need them. Leave the helmets where they fell.`,choices:[{id:`back`,label:`Ask another question.`,nextNodeId:`abel_intro`}]},tamsin_intro:{id:`tamsin_intro`,speaker:c,body:`Welcome to Juniper Post. We are six tents, one stubborn well-cart, and enough rifles to make the name stick. Buttons carries our trade when the road is kind.`,choices:[{id:`post`,label:`How does this settlement survive?`,nextNodeId:`tamsin_post`,effect:`learn_settlements`},{id:`oasis`,label:`Where can I find clean water?`,nextNodeId:`tamsin_oasis`,effect:`learn_oasis`},{id:`brahmin`,label:`Tell me about Buttons.`,nextNodeId:`tamsin_brahmin`},{id:`trade`,label:`Show me the caravan stock.`,effect:`barter`,close:!0},{id:`leave`,label:`I will look around.`,effect:`leave`,close:!0}]},tamsin_post:{id:`tamsin_post`,speaker:c,body:`Campfires bring stories, canvas brings sleep, and traders bring what the desert will not. Coyote Rest holds the eastern road. Keep both stops alive and the route becomes a community instead of a graveyard.`,choices:[{id:`back`,label:`Ask about the road.`,nextNodeId:`tamsin_intro`}]},tamsin_oasis:{id:`tamsin_oasis`,speaker:c,body:`Glasswater lies northeast in a shallow green bowl. The spring is drinkable, the reeds hide geckos, and Orrin Pike wanders its edge. Fill every canteen before Red Cut.`,choices:[{id:`back`,label:`Ask something else.`,nextNodeId:`tamsin_intro`}]},tamsin_brahmin:{id:`tamsin_brahmin`,speaker:c,body:`Buttons has hauled three caravans through storms that killed grown men. One head loves cactus fruit. The other steals ammunition. Be polite to both.`,choices:[{id:`back`,label:`I will remember that.`,nextNodeId:`tamsin_intro`}]},sable_intro:{id:`sable_intro`,speaker:l,body:`Coyote Rest. Last honest fire before Ash Basin, depending on your definition of honest. Two-Bells and I work the bridge route whenever raiders leave us wheels.`,choices:[{id:`bridge`,label:`Is the Red Cut bridge safe?`,nextNodeId:`sable_bridge`,effect:`learn_bridge`},{id:`pass`,label:`What lies beyond the mountains?`,nextNodeId:`sable_pass`,effect:`learn_mountain_pass`},{id:`settlements`,label:`Who else trades this route?`,nextNodeId:`sable_settlements`,effect:`learn_settlements`},{id:`trade`,label:`Let us barter.`,effect:`barter`,close:!0},{id:`leave`,label:`Keep the fire burning.`,effect:`leave`,close:!0}]},sable_bridge:{id:`sable_bridge`,speaker:l,body:`Old 95 Span is patched timber over a pre-war deck. It holds Brahmin and carts, but Red Cut funnels every sound. Cross fast when the valley goes quiet; that usually means raiders are listening.`,choices:[{id:`back`,label:`Ask about another route.`,nextNodeId:`sable_intro`}]},sable_pass:{id:`sable_pass`,speaker:l,body:`The eastern teeth hide a caravan pass. From Sunbreak Overlook you can see the notch at dawn, the road through Red Cut, and every campfire foolish enough to smoke by day.`,choices:[{id:`back`,label:`Ask something else.`,nextNodeId:`sable_intro`}]},sable_settlements:{id:`sable_settlements`,speaker:l,body:`Tamsin runs Juniper Post west of here. Mara's stranded people are trying to become the next stop. Traders, wanderers and prospectors keep the gaps connected—when the creatures do not eat the connection.`,choices:[{id:`back`,label:`Back to business.`,nextNodeId:`sable_intro`}]},orrin_intro:{id:`orrin_intro`,speaker:u,body:`Orrin Pike. Do not let the face trouble you; the spring has tasted worse. I walk Glasswater because someone should notice when its level drops.`,choices:[{id:`water`,label:`Is the oasis safe to drink from?`,nextNodeId:`orrin_water`,effect:`learn_oasis`},{id:`road`,label:`Why keep wandering alone?`,nextNodeId:`orrin_road`},{id:`leave`,label:`Safe roads, Orrin.`,effect:`leave`,close:!0}]},orrin_water:{id:`orrin_water`,speaker:u,body:`Drink from the moving edge, not the green still pockets. The palms mark the deepest ground. Fill up here; the valley east has water but none you should trust without boiling.`,choices:[{id:`back`,label:`Anything else?`,nextNodeId:`orrin_intro`}]},orrin_road:{id:`orrin_road`,speaker:u,body:`Settlements remember the people who stay. Roads remember everyone. I prefer the larger archive—and ghouls have time to read it.`,choices:[{id:`back`,label:`Fair answer.`,nextNodeId:`orrin_intro`}]},lark_intro:{id:`lark_intro`,speaker:d,body:`Lark Danner. I mark ridgelines for caravans. Sunbreak is the best view in this basin, if you can spare a minute to look instead of loot.`,choices:[{id:`vista`,label:`What can I see from Sunbreak?`,nextNodeId:`lark_vista`,effect:`learn_mountain_pass`},{id:`valley`,label:`How should I cross Red Cut?`,nextNodeId:`lark_valley`,effect:`learn_bridge`},{id:`leave`,label:`Keep walking, Lark.`,effect:`leave`,close:!0}]},lark_vista:{id:`lark_vista`,speaker:d,body:`Survey at the cairn. Glasswater flashes northwest, Old 95 cuts the valley, and the far eastern range parts at a pale saddle. A good map begins with a place high enough to admit how small you are.`,choices:[{id:`back`,label:`Ask about the valley.`,nextNodeId:`lark_intro`}]},lark_valley:{id:`lark_valley`,speaker:d,body:`Use the bridge, watch both shoulders, and never chase a raider uphill. The wreck below the cut still has metal if your Repair hand is good.`,choices:[{id:`back`,label:`That is enough.`,nextNodeId:`lark_intro`}]}};function p(e,t=`mara-voss`){return t===`sera-holt`?`sera_intro`:t===`niko-ortega`?`niko_intro`:t===`abel-crow`?`abel_intro`:t===`tamsin-vale`?`tamsin_intro`:t===`sable-reyes`?`sable_intro`:t===`orrin-pike`?`orrin_intro`:t===`lark-danner`?`lark_intro`:e.player.hasCondenser?`mara_return`:e.player.hasRelayKey?`mara_keycard`:e.questAccepted?`mara_reminder`:`mara_intro`}function m(e){let t=f[e]??f.mara_intro;if(t===void 0)throw Error(`Dialogue graph is missing its opening node.`);return t}var h={id:`sunscar-waste`,rows:[`#####################`,`#P...c....X.#....L..#`,`#..###..#...#T.##...#`,`#w....a.#...K...Sf..#`,`#.#####.#...#..###..#`,`#..s..#.....#....r..#`,`###.#.#.#####.###.#.#`,`#...#..Bq...#...#...#`,`#.#######.#.#.#.#.###`,`#..n..s.#.#...#...m.#`,`#.###.#.#.#####.###.#`,`#b..s.#..........a..#`,`#####################`],interiorZones:[{id:`pump-station`,name:`SUNSCAR PUMP STATION`,minX:13,maxX:19,minZ:1,maxZ:5}],encounterZones:[{id:`sunscar-road`,name:`SUNSCAR ROAD`,level:1,minX:0,maxX:6,minZ:0,maxZ:12},{id:`dry-gulch`,name:`DRY GULCH`,level:2,minX:7,maxX:12,minZ:0,maxZ:12},{id:`pump-perimeter`,name:`PUMP PERIMETER`,level:3,minX:13,maxX:20,minZ:0,maxZ:12}],spawnPoints:[{position:{x:5,z:1},environment:`exterior`},{position:{x:2,z:5},environment:`exterior`},{position:{x:10,z:11},environment:`exterior`},{position:{x:18,z:5},environment:`interior`},{position:{x:19,z:2},environment:`interior`}]},g=class{state;constructor(e){this.state=e>>>0}next(){this.state=this.state+1831565813>>>0;let e=this.state;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}integer(e,t){return Math.floor(this.next()*(t-e+1))+e}chance(e){return this.next()<e}getState(){return this.state}},_={0:{x:0,z:-1},1:{x:1,z:0},2:{x:0,z:1},3:{x:-1,z:0}},v={roach:{hp:8,name:`rad roach`},ant:{hp:13,name:`cinder ant`},gecko:{hp:16,name:`ash gecko`},scorpion:{hp:26,name:`mesa scorpion`},raider:{hp:18,name:`dust raider`}},y={roach:4,ant:5,gecko:6,scorpion:5,raider:7},b={roach:20,ant:30,gecko:38,scorpion:60,raider:45},x={roach:2,ant:3,gecko:4,scorpion:6,raider:4},S={water:5,ration:5,ammo:7,lockpick:6,electronics:9,stimpak:18,nuka_cola:8,antivenom:14,antibiotics:16,torch:7},C={ammo:10,medkit:1,water:1,ration:1,scrap:4,lockpick:1,electronics:1,stimpak:1,nuka_cola:1,whiskey:1,jet:1,med_x:1,antivenom:1,antibiotics:1,torch:1,cactus_fruit:1,broc_flower:1,armor:1,keycard:1,condenser:1},w={b:`ammo`,m:`medkit`,w:`water`,n:`ration`,s:`scrap`,l:`lockpick`,e:`electronics`,I:`stimpak`,U:`nuka_cola`,Y:`whiskey`,J:`jet`,M:`med_x`,V:`antivenom`,H:`antibiotics`,Q:`torch`,p:`cactus_fruit`,h:`broc_flower`,A:`armor`,k:`keycard`,f:`condenser`},T={road_leathers:{name:`road leathers`,reduction:1},scrap_vest:{name:`scrap vest`,reduction:3},reinforced_raider:{name:`reinforced raider armour`,reduction:5}},E=32,D={strength:5,perception:5,endurance:5,charisma:5,intelligence:5,agility:5,luck:5},O=[`strength`,`perception`,`endurance`,`charisma`,`intelligence`,`agility`,`luck`];function ee(e){let t={...e},n=[`endurance`,`perception`,`intelligence`,`agility`,`strength`,`charisma`,`luck`],r=O.reduce((e,n)=>e+t[n],0),i=0;for(;r<40;){let e=n[i%n.length]??`endurance`;i+=1,!(t[e]>=10)&&(t[e]+=1,r+=1)}i=0;let a=[...n].reverse();for(;r>40;){let e=a[i%a.length]??`luck`;i+=1,!(t[e]<=1)&&(--t[e],--r)}return t}function k(e,t,n,r){switch(r){case`fast_learner`:return e.intelligence>=6;case`scrounger`:return e.luck>=6;case`tough_hide`:return e.endurance>=6;case`gunslinger`:return e.perception>=6&&e.agility>=6;case`bruiser`:return e.strength>=6;case`field_medic`:return e.intelligence>=6;case`night_eyes`:return e.perception>=6||t===`ghoul`;case`iron_stomach`:return e.endurance>=6||t===`ghoul`;case`storm_walker`:return e.endurance>=5;case`chem_resistant`:return e.endurance>=6;case`negotiator`:return e.charisma>=6;default:return n>=1}}function te(e){let t=Math.trunc((e.player.special.intelligence-5)/2),n=+(e.player.identity.race===`human`);return Math.max(1,3+t+n)}function ne(e){return 1+Math.floor(e.player.special.endurance/4)}var A=({x:e,z:t})=>`${e},${t}`,j=(e,t)=>e.x===t.x&&e.z===t.z,re=(e,t)=>({x:e.x+t.x,z:e.z+t.z}),M=({x:e,z:t})=>({x:e,z:t});function ie(e,t){return t.x>=e.minX&&t.x<=e.maxX&&t.z>=e.minZ&&t.z<=e.maxZ}function ae(e,t){return Math.max(1,Math.floor(e?.find(e=>ie(e,t))?.level??1))}function oe(e,t=1){return Math.min(8,Math.max(1,e,t-1))}function se(e,t){return v[e].hp+Math.max(0,t-1)*x[e]}function ce(e){return Math.round(b[e.kind]*(1+Math.max(0,e.level-1)*.35))}function le(e,t){let n=C[e];return e===`ammo`?n+Math.max(0,t-1)*2:e===`scrap`?n+Math.min(2,Math.max(0,t-1)):e===`medkit`&&t>=4?n+1:n}function ue(e,t,n,r=2){let i=[];for(let a=Math.max(0,e.z-r);a<=Math.min(n-1,e.z+r);a+=1)for(let n=Math.max(0,e.x-r);n<=Math.min(t-1,e.x+r);n+=1)Math.abs(n-e.x)+Math.abs(a-e.z)<=r&&i.push(`${n},${a}`);return i}function de(e,t){let n=new Set(e.exploredTiles);for(let r of ue(t,e.width,e.height))n.add(r);e.exploredTiles=[...n]}function fe(e){if(e.length===0||e[0]===void 0)throw Error(`A level must contain at least one row.`);let t=e[0].length;if(t===0||e.some(e=>e.length!==t))throw Error(`Level rows must be rectangular.`)}function pe(e=h,t=12702695){fe(e.rows);let n=e.rows[0]?.length??0,r=e.rows.length,i=(e.encounterZones??[{id:`open-waste`,name:e.worldName??`OPEN WASTE`,level:1,minX:0,maxX:Math.max(0,n-1),minZ:0,maxZ:Math.max(0,r-1)}]).map(e=>({...e,level:Math.max(1,Math.floor(e.level))})),a=[],o=[],s=[],c=[],l=[],u,d=0,f=0,p=0,m=(e,t,n,r,i,a=E)=>{s.push({id:e,name:t,position:M(n),homePosition:M(n),role:r,species:i,hp:a,maxHp:a,hostile:!1,unconsciousTurns:0})};e.rows.forEach((e,t)=>{let n=[];[...e].forEach((e,r)=>{let a={x:r,z:t};switch(e){case`#`:n.push(`wall`);break;case`~`:n.push(`water`);break;case`=`:n.push(`bridge`);break;case`D`:n.push(`door`);break;case`K`:n.push(`locked_door`),l.push({id:`device-${p++}`,kind:`locked_door`,position:a,locked:!0,opened:!1,hacked:!1,attemptsRemaining:3,solution:(r*3+t*5)%5});break;case`S`:n.push(`security_door`),l.push({id:`device-${p++}`,kind:`security_door`,position:a,locked:!0,opened:!1,hacked:!1,attemptsRemaining:0,solution:0});break;case`L`:n.push(`locker`),l.push({id:`device-${p++}`,kind:`locker`,position:a,locked:!0,opened:!1,hacked:!1,attemptsRemaining:3,solution:(r*3+t*5)%5});break;case`T`:n.push(`terminal`),l.push({id:`device-${p++}`,kind:`terminal`,position:a,locked:!0,opened:!1,hacked:!1,attemptsRemaining:3,solution:(r+t*3)%4});break;case`q`:n.push(`prospector`),m(`mara-voss`,`MARA VOSS`,a,`trader`,`human`);break;case`d`:n.push(`prospector`),m(`sera-holt`,`DR SERA HOLT`,a,`trader`,`human`);break;case`t`:n.push(`prospector`),m(`niko-ortega`,`NIKO ORTEGA`,a,`wanderer`,`human`);break;case`v`:n.push(`prospector`),m(`abel-crow`,`ABEL CROW`,a,`survivor`,`ghoul`);break;case`z`:n.push(`floor`),m(`tamsin-vale`,`TAMSIN VALE`,a,`trader`,`human`);break;case`i`:n.push(`floor`),m(`sable-reyes`,`SABLE REYES`,a,`trader`,`human`);break;case`u`:n.push(`floor`),m(`orrin-pike`,`ORRIN PIKE`,a,`wanderer`,`ghoul`);break;case`j`:n.push(`floor`),m(`lark-danner`,`LARK DANNER`,a,`wanderer`,`human`);break;case`G`:n.push(`floor`),m(`juniper-brahmin`,`BUTTONS`,a,`animal`,`brahmin`,48);break;case`C`:n.push(`floor`),m(`coyote-brahmin`,`TWO-BELLS`,a,`animal`,`brahmin`,48);break;case`B`:n.push(`camp`);break;case`E`:n.push(`transition`);break;case`X`:n.push(`exit`);break;default:n.push(`floor`)}if(e===`P`&&(u=a),e===`c`||e===`a`||e===`g`||e===`o`||e===`r`){let t=e===`c`?`roach`:e===`a`?`ant`:e===`g`?`gecko`:e===`o`?`scorpion`:`raider`,n=oe(ae(i,a)),r=se(t,n);o.push({id:`enemy-${d++}`,kind:t,level:n,position:a,hp:r,maxHp:r})}let s=w[e];s!==void 0&&c.push({id:`pickup-${f++}`,kind:s,position:a,collected:!1,amount:le(s,ae(i,a)),dropped:!1})}),a.push(n)});let g=u;if(g===void 0)throw Error(`Level requires one player start marker.`);let _=i.find(e=>ie(e,g)),v=l.find(e=>e.kind===`terminal`),y=l.find(e=>e.kind===`security_door`);return v!==void 0&&y!==void 0&&(v.linkedDeviceId=y.id),{version:4,characterRevision:1,worldRevision:5,balanceRevision:3,encounterRevision:2,levelId:e.id,worldSeed:t>>>0,worldCode:e.runCode??`RUN-${(t>>>0).toString(36).toUpperCase()}`,worldName:e.worldName??`SUNSCAR WASTE`,width:n,height:r,tiles:a,player:{identity:{name:`WANDERER`,gender:`male`,race:`human`},special:{...D},position:g,direction:1,hp:48,maxHp:48,magazine:6,magazineSize:6,reserveAmmo:24,weaponCondition:100,medkits:3,water:16,maxWater:16,food:16,maxFood:16,scrap:0,caps:18,hasRelayKey:!1,hasCondenser:!1,level:1,xp:0,skillPoints:3,perkPoints:1,skills:{guns:35,melee:30,survival:30,repair:25,speech:25,lockpick:30,science:25},traits:[],inventory:{water:2,ration:2,lockpick:4,electronics:1,stimpak:1,nuka_cola:1,whiskey:0,jet:0,med_x:0,antivenom:1,antibiotics:1,torch:1,cactus_fruit:0,broc_flower:0},armor:{owned:[`road_leathers`],equipped:`road_leathers`,condition:100},conditions:{fatigue:8,wetness:0,poisonTurns:0,poisonStrength:0,disease:null,intoxicatedTurns:0,stimulantTurns:0,medXTurns:0,alcoholDependence:0,chemDependence:0},addictions:[],pipLightOn:!1,torchLit:!1,torchFuel:0},enemies:o,npcs:s,landmarks:(e.landmarks??[]).map(e=>({...e,position:M(e.position),discovered:!1,used:!1})),pickups:c,devices:l,merchant:{stock:{water:4,ration:3,ammo:4,lockpick:3,electronics:2,stimpak:2,nuka_cola:3,antivenom:1,antibiotics:1,torch:2}},interiorZones:(e.interiorZones??[]).map(e=>({...e})),encounterZones:i,spawnPoints:(e.spawnPoints??[]).map(e=>({...e,position:M(e.position)})),transitions:(e.transitions??[]).map(e=>({...e,position:M(e.position),destination:M(e.destination)})),discoveredAreas:[],discoveredEncounterZones:_===void 0?[]:[_.id],exploredTiles:ue(g,n,r),clearedSites:[],nextEnemyId:d,openDoors:[],prospectorMet:!1,questAccepted:!1,prospectorTrust:0,dialogueFlags:[],campBuilt:!1,cheats:{godMode:!1,noNeeds:!1},autoMapEnabled:!0,survivalRevision:2,timeMinutes:960,weather:{kind:`clear`,turnsRemaining:60,intensity:1},turn:0,rngState:t>>>0,status:`playing`}}function N(e){return{...e,tiles:e.tiles.map(e=>[...e]),player:{...e.player,identity:{...e.player.identity},special:{...e.player.special},position:M(e.player.position),skills:{...e.player.skills},traits:[...e.player.traits],inventory:{...e.player.inventory},armor:{...e.player.armor,owned:[...e.player.armor.owned]},conditions:{...e.player.conditions},addictions:[...e.player.addictions]},enemies:e.enemies.map(e=>({...e,position:M(e.position)})),npcs:e.npcs.map(e=>({...e,position:M(e.position),homePosition:M(e.homePosition)})),landmarks:e.landmarks.map(e=>({...e,position:M(e.position)})),pickups:e.pickups.map(e=>({...e,position:M(e.position)})),devices:e.devices.map(e=>({...e,position:M(e.position)})),merchant:{stock:{...e.merchant.stock}},interiorZones:e.interiorZones.map(e=>({...e})),encounterZones:e.encounterZones.map(e=>({...e})),spawnPoints:e.spawnPoints.map(e=>({...e,position:M(e.position)})),transitions:e.transitions.map(e=>({...e,position:M(e.position),destination:M(e.destination)})),discoveredAreas:[...e.discoveredAreas],discoveredEncounterZones:[...e.discoveredEncounterZones],exploredTiles:[...e.exploredTiles],clearedSites:[...e.clearedSites],openDoors:[...e.openDoors],dialogueFlags:[...e.dialogueFlags],cheats:{...e.cheats},weather:{...e.weather}}}function me(e){let t=e.replace(/[\u0000-\u001f\u007f]/g,``).trim().replace(/\s+/g,` `).slice(0,18);return t.length>0?t:`WANDERER`}function he(e,t){if(O.reduce((e,n)=>e+t.special[n],0)!==40||O.some(e=>!Number.isInteger(t.special[e])||t.special[e]<1||t.special[e]>10))throw Error(`S.P.E.C.I.A.L. must contain exactly 40 points with attributes from 1 to 10.`);let n=[`guns`,`melee`,`survival`,`repair`,`speech`,`lockpick`,`science`];if(n.reduce((e,n)=>e+t.skills[n],0)!==200||n.some(e=>!Number.isInteger(t.skills[e])||t.skills[e]<20||t.skills[e]>80||t.skills[e]%5!=0))throw Error(`Skills must contain exactly 200 points in five-point steps from 20 to 80.`);if(!k(t.special,t.identity.race,1,t.startingPerk))throw Error(`The selected starting perk requirements are not met.`);let r=N(e);return r.characterRevision=1,r.player.identity={name:me(t.identity.name),gender:t.identity.gender,race:t.identity.race},r.player.special={...t.special},r.player.skills={...t.skills},r.player.skillPoints=0,r.player.perkPoints=0,r.player.traits=[t.startingPerk],r.player.maxHp=38+t.special.endurance*2+(t.startingPerk===`tough_hide`?6:0),r.player.hp=r.player.maxHp,r.player.maxWater=11+t.special.endurance,r.player.water=r.player.maxWater,r.player.maxFood=11+t.special.endurance,r.player.food=r.player.maxFood,t.identity.race===`human`&&(r.player.caps+=10),r}function ge(e,t){let n=N(e);return n.player.identity.name=me(t),{state:n,events:[{type:`message`,text:`Field identity changed to ${n.player.identity.name.toUpperCase()}.`,tone:`good`}],consumedTurn:!1}}function _e(e,t){return e.tiles[t.z]?.[t.x]??`wall`}function ve(e,t=e.player.position){return _e(e,t)===`water`}function ye(e,t){return e.openDoors.includes(A(t))}function be(e,t){return e.interiorZones.some(e=>t.x>=e.minX&&t.x<=e.maxX&&t.z>=e.minZ&&t.z<=e.maxZ)?`interior`:`exterior`}function xe(e,t){return e.encounterZones.find(e=>ie(e,t))??{id:`open-waste`,name:e.worldName,level:1,environment:`exterior`,minX:0,maxX:Math.max(0,e.width-1),minZ:0,maxZ:Math.max(0,e.height-1)}}function Se(e,t){return oe(xe(e,t).level,e.player.level)}function Ce(e,t){return e.interiorZones.find(e=>t.x>=e.minX&&t.x<=e.maxX&&t.z>=e.minZ&&t.z<=e.maxZ)?.name??xe(e,t).name}function P(e,t=e.player.position){let n=e.interiorZones.find(e=>ie(e,t));if(n!==void 0)return{minX:n.minX,maxX:n.maxX,minZ:n.minZ,maxZ:n.maxZ};let r=e.encounterZones.filter(e=>e.environment!==`interior`);return r.length===0?{minX:0,maxX:Math.max(0,e.width-1),minZ:0,maxZ:Math.max(0,e.height-1)}:{minX:Math.min(...r.map(e=>e.minX)),maxX:Math.max(...r.map(e=>e.maxX)),minZ:Math.min(...r.map(e=>e.minZ)),maxZ:Math.max(...r.map(e=>e.maxZ))}}function we(e){let t=new Set(e.exploredTiles),n=0,r=0;return e.tiles.forEach((e,i)=>{e.forEach((e,a)=>{e!==`wall`&&(n+=1,t.has(`${a},${i}`)&&(r+=1))})}),{explored:r,total:n,percent:n===0?0:Math.round(r/n*100)}}function Te(e,t){return e.devices.find(e=>j(e.position,t))}function Ee(e,t){return e.transitions.find(e=>j(e.position,t))}function F(e,t){return e.npcs.find(e=>j(e.position,t))}function De(e,t){return e.landmarks.find(e=>j(e.position,t))}function I(e){return Oe(e)<.18}function L(e){let t=Math.max(0,Math.min(1,e));return t*t*(3-2*t)}function Oe(e){let t=(e.timeMinutes%1440+1440)%1440,n=1050,r=1260;return t<270||t>=r?0:t<450?L((t-270)/180):t<=n?1:1-L((t-n)/(r-n))}function ke(e){let t=(e.timeMinutes%1440+1440)%1440;return`${Math.floor(t/60).toString().padStart(2,`0`)}:${Math.floor(t%60).toString().padStart(2,`0`)}`}function Ae(e,t){return e.landmarks.some(e=>e.kind===`campfire`&&Math.abs(e.position.x-t.x)+Math.abs(e.position.z-t.z)<=2)?!0:e.tiles.some((n,r)=>n.some((n,i)=>Math.abs(i-t.x)+Math.abs(r-t.z)>2?!1:n===`terminal`||n===`transition`||n===`exit`||n!==`wall`&&be(e,{x:i,z:r})===`interior`&&(i+r*2)%5==0||n===`camp`&&e.campBuilt))}function je(e,t=e.player.position){return e.player.pipLightOn||e.player.torchLit&&e.player.torchFuel>0||Ae(e,t)?!1:be(e,t)===`interior`||Oe(e)<.55}function Me(e){let t=be(e,e.player.position)===`interior`,n=t?0:Oe(e),r=t||n<.18,i=t||n<.18?4:n<.48?5:n<.8?6:7;return e.player.special.perception>=8?i+=1:e.player.special.perception<=2&&--i,r&&e.player.traits.includes(`night_eyes`)&&(i+=2),e.weather.kind===`rain`&&!t&&(i-=e.weather.intensity),Ae(e,e.player.position)&&(i=Math.max(i,6)),e.player.pipLightOn&&(i=Math.max(i,6)),e.player.torchLit&&e.player.torchFuel>0&&(i=Math.max(i,7)),e.player.conditions.fatigue>=85&&--i,Math.max(2,Math.min(7,i))}function Ne(e,t){let n=_e(e,t),r=F(e,t),i=De(e,t),a=i!==void 0&&(i.kind===`wreck`||i.kind===`teepee`||i.kind===`settlement`||i.kind===`campfire`);return n===`wall`||(r?.hp??0)>0||a||n===`camp`||n===`transition`||n===`locker`||n===`terminal`||(n===`door`||n===`locked_door`||n===`security_door`)&&!ye(e,t)}function Pe(e,t,n){return e.enemies.find(e=>e.hp>0&&e.id!==n&&j(e.position,t))}function Fe(e,t,n){if(t.x!==n.x&&t.z!==n.z)return!1;let r={x:Math.sign(n.x-t.x),z:Math.sign(n.z-t.z)},i=re(t,r);for(;!j(i,n);){if(Ne(e,i))return!1;i=re(i,r)}return!0}function Ie(e){let t=_[e.player.direction],n=M(e.player.position);for(let r=1;r<=Me(e);r+=1){n=re(n,t);let i=Pe(e,n);if(i!==void 0)return{type:`enemy`,entity:i,distance:r};let a=F(e,n);if(a!==void 0&&a.hp>0)return{type:`npc`,entity:a,distance:r};if(Ne(e,n))return}}function Le(e){return 80+e*40}function Re(e,t,n){let r=e.player.traits.includes(`fast_learner`)?Math.ceil(t*1.2):t;e.player.xp+=r,n.push({type:`xp`,amount:r}),n.push({type:`message`,text:`Gained ${r} XP.`,tone:`good`});let i=Le(e.player.level);for(;e.player.xp>=i;){e.player.xp-=i,e.player.level+=1;let t=te(e),r=ne(e);e.player.skillPoints+=t,e.player.perkPoints+=1,e.player.maxHp+=r,e.player.hp=Math.min(e.player.maxHp,e.player.hp+r),n.push({type:`level_up`,level:e.player.level}),n.push({type:`message`,text:`Level ${e.player.level} reached. ${t} skill points and one perk available.`,tone:`good`}),i=Le(e.player.level)}}function ze(e,t,n){let r=xe(e,t);r.environment!==`interior`&&be(e,t)!==`interior`||e.clearedSites.includes(r.id)||e.enemies.some(e=>e.hp>0&&ie(r,e.position))||(e.clearedSites.push(r.id),n.push({type:`site_cleared`,id:r.id,name:r.name,level:r.level}),Re(e,15+r.level*8,n))}function Be(e,t){let n=e.pickups.find(t=>!t.collected&&j(t.position,e.player.position));n!==void 0&&Ve(e,n,t)}function Ve(e,t,n){t.collected=!0,n.push({type:`pickup`,pickup:t.kind});let r=Number.isFinite(t.amount)?t.amount:C[t.kind],i=!t.dropped&&e.player.traits.includes(`scrounger`);if(t.kind===`ammo`){let t=r+(i?3:0);e.player.reserveAmmo+=t,n.push({type:`message`,text:`Scrounged ${t} pistol rounds.`,tone:`good`})}else if(t.kind===`medkit`)e.player.medkits+=r,n.push({type:`message`,text:`${r} field dressing${r===1?``:`s`} added to your kit.`,tone:`good`});else if(t.kind===`water`)e.player.inventory.water+=r,n.push({type:`message`,text:`${r} clean water added to your pack.`,tone:`good`});else if(t.kind===`ration`)e.player.inventory.ration+=r,n.push({type:`message`,text:`${r} trail ration${r===1?``:`s`} added to your pack.`,tone:`good`});else if(t.kind===`scrap`){let t=r+ +!!i;e.player.scrap+=t,n.push({type:`message`,text:`Pocketed ${t} trade scrap.`,tone:`good`})}else if(t.kind===`lockpick`)e.player.inventory.lockpick+=r,n.push({type:`message`,text:`${r} lockpick${r===1?``:`s`} recovered.`,tone:`good`});else if(t.kind===`electronics`)e.player.inventory.electronics+=r,n.push({type:`message`,text:`${r} circuit bridge${r===1?``:`s`} recovered.`,tone:`good`});else if(t.kind===`cactus_fruit`||t.kind===`broc_flower`){let i=+(!t.dropped&&e.player.skills.survival>=60),a=r+i;e.player.inventory[t.kind]+=a;let o=t.kind===`cactus_fruit`?`prickly-pear fruit`:`broc flower`;n.push({type:`message`,text:`Harvested ${a} ${o}${a===1?``:`s`}${i>0?` with a clean Survival cut`:``}.`,tone:`good`})}else t.kind===`stimpak`||t.kind===`nuka_cola`||t.kind===`whiskey`||t.kind===`jet`||t.kind===`med_x`||t.kind===`antivenom`||t.kind===`antibiotics`||t.kind===`torch`?(e.player.inventory[t.kind]+=r,n.push({type:`message`,text:`${r} ${{stimpak:`Stimpak`,nuka_cola:`Nuka-Cola`,whiskey:`whiskey`,jet:`Jet inhaler`,med_x:`Med-X dose`,antivenom:`antivenom`,antibiotics:`antibiotics`,torch:`torch`}[t.kind]}${r===1?``:`s`} added to your pack.`,tone:`good`})):t.kind===`armor`?e.player.armor.owned.includes(`reinforced_raider`)?(e.player.scrap+=5,n.push({type:`message`,text:`Stripped duplicate armour for five trade scrap.`,tone:`good`})):(e.player.armor.owned.push(`reinforced_raider`),n.push({type:`message`,text:`Reinforced raider armour recovered. Equip it from the wrist unit.`,tone:`good`})):t.kind===`keycard`?(e.player.hasRelayKey=!0,n.push({type:`message`,text:`Relay access card recovered. The Ash Basin bunker lock can now be bypassed.`,tone:`good`}),Re(e,20,n)):(e.player.hasCondenser=!0,n.push({type:`message`,text:`Water condenser recovered. Return to the caravan.`,tone:`good`}))}function He(e,t){if(!(_e(e,e.player.position)!==`exit`||e.status!==`playing`)){if(!e.player.hasCondenser){t.push({type:`message`,text:`The caravan cannot leave without its water condenser.`,tone:`warning`});return}e.status=`won`,t.push({type:`status`,status:`won`}),t.push({type:`message`,text:`Condenser secured. The caravan rolls before the raiders regroup.`,tone:`good`})}}function Ue(e,t,n,r=2){for(let i of e.landmarks){let a=Math.abs(i.position.x-t.x)+Math.abs(i.position.z-t.z);i.discovered||a>r||(i.discovered=!0,n.push({type:`landmark`,id:i.id,name:i.name,kind:i.kind,discovered:!0}),n.push({type:`message`,text:`Landmark discovered: ${i.name}.`,tone:`good`}),Re(e,i.kind===`settlement`||i.kind===`vista`?16:10,n))}}function We(e,t,n){let r=_[(e.player.direction+t)%4],i=re(e.player.position,r),a=be(e,e.player.position),o=xe(e,e.player.position),s=ve(e);if(_e(e,i)===`transition`){let t=Ee(e,i);return t===void 0?(n.push({type:`message`,text:`The passage has collapsed beyond use.`,tone:`warning`}),!1):Xe(e,t,n)}if(Ne(e,i)){let t=_e(e,i),r=F(e,i),a=De(e,i),o=be(e,i)===`exterior`&&(i.x<=0||i.x>=31||i.z<=0||i.z>=e.height-1),s=r!==void 0&&r.hp>0?r.species===`brahmin`?`${r.name} plants four hooves in the trail.`:`${r.name} is standing in the way.`:a===void 0?t===`door`?`A chained scrap gate blocks the trail. Use it to force the latch.`:t===`locked_door`?`A corroded lock holds the relay-bunker door. Inspect it to pick the lock.`:t===`security_door`?`The security door is sealed. A nearby terminal may release it.`:t===`locker`?`A locked utility locker blocks the alcove.`:t===`terminal`?`A maintenance terminal hums in the dark.`:t===`wall`&&o?`The ground breaks into impassable badlands. The Mojave continues beyond your route.`:`No passage.`:`${a.name} blocks the trail. Inspect it to interact.`;return n.push({type:`message`,text:s,tone:`neutral`}),!1}if(Pe(e,i)!==void 0)return n.push({type:`message`,text:`Something blocks the passage.`,tone:`warning`}),!1;let c=M(e.player.position);e.player.position=i;let l=ve(e);!s&&l?n.push({type:`message`,text:`You wade into a flooded desert wash. The water is deep enough to swim.`,tone:`warning`}):s&&!l&&n.push({type:`message`,text:`You pull yourself onto dry ground, soaked and breathing hard.`,tone:`neutral`}),de(e,i),Ue(e,i,n),n.push({type:`move`,entityId:`player`,from:c,to:M(i)});let u=xe(e,i);if(u.id!==o.id){let t=!e.discoveredEncounterZones.includes(u.id);t&&e.discoveredEncounterZones.push(u.id),n.push({type:`encounter_zone`,id:u.id,name:u.name,level:u.level,discovered:t}),t&&Re(e,6+u.level*4,n)}let d=be(e,i);if(d!==a){let t=Ce(e,i);if(n.push({type:`area`,name:t,environment:d}),d===`interior`){let t=e.interiorZones.find(e=>i.x>=e.minX&&i.x<=e.maxX&&i.z>=e.minZ&&i.z<=e.maxZ);t!==void 0&&!e.discoveredAreas.includes(t.id)&&(e.discoveredAreas.push(t.id),Re(e,20,n))}}return Be(e,n),He(e,n),!0}function Ge(e){let t=Math.max(0,e.player.conditions.fatigue-45)*.003,n=e.player.conditions.intoxicatedTurns>0?.12:0,r=e.player.conditions.stimulantTurns>0?.08:0,i=(e.player.addictions.includes(`alcohol`)&&e.player.conditions.intoxicatedTurns<=0?.05:0)+(e.player.addictions.includes(`chems`)&&e.player.conditions.stimulantTurns<=0&&e.player.conditions.medXTurns<=0?.06:0);return r+(e.player.special.agility-5)*.012-t-n-i}function Ke(e,t,n){t.hostile=!0,t.id===`mara-voss`&&(e.prospectorMet=!0);let r=t.id===`mara-voss`?`mara_attacked`:`npc_${t.id.replaceAll(`-`,`_`)}_attacked`;e.dialogueFlags.includes(r)||(e.dialogueFlags.push(r),n.push({type:`message`,text:t.species===`brahmin`?`${t.name} panics and turns hostile.`:`${t.name} turns hostile. Conversation is over.`,tone:`danger`}))}function qe(e,t){let n=t.id===`mara-voss`?`mara_dead`:`npc_${t.id.replaceAll(`-`,`_`)}_dead`;e.dialogueFlags.includes(n)||e.dialogueFlags.push(n)}function Je(e,t,n){let r=re(e.player.position,_[e.player.direction]),i=Pe(e,r),a=F(e,r),o=i??(a!==void 0&&a.hp>0?a:void 0);if(o===void 0)return n.push({type:`melee`,sourceId:`player`,targetId:`none`,hit:!1,damage:0,critical:!1}),n.push({type:`message`,text:`Your fist cuts through empty air.`,tone:`neutral`}),!0;let s=e.player.skills.melee??30,c=Math.max(.3,Math.min(.96,.56+s*.006+Ge(e))),l=t.chance(c),u=(e.player.special.luck-5)*.008,d=l&&t.chance(Math.max(.02,.06+s*.0012+u)),f=e.player.conditions.intoxicatedTurns>0?2:0,p=Math.trunc((e.player.special.strength-5)/2),m=e.player.traits.includes(`bruiser`)?2:0,h=l?Math.max(1,t.integer(2,4)+Math.floor(s/20)+f+p+m)*(d?2:1):0;a!==void 0&&o.id===a.id&&Ke(e,a,n);let g=a!==void 0||i?.kind===`raider`,y=l&&g&&o.hp>1&&(d||o.hp<=h+4)&&t.chance(Math.min(.9,.48+s*.004+(e.player.traits.includes(`bruiser`)?.12:0)));if(y){o.hp=Math.max(1,o.hp-Math.max(1,Math.floor(h/2)));let e=t.integer(3,6);o.unconsciousTurns=e,n.push({type:`knockout`,targetId:o.id,turns:e}),n.push({type:`message`,text:`${a===void 0?`Raider`:a.name} knocked unconscious.`,tone:`good`})}else o.hp=Math.max(0,o.hp-h);return n.push({type:`melee`,sourceId:`player`,targetId:o.id,hit:l,damage:y?Math.floor(h/2):h,critical:d}),l?o.hp<=0&&i!==void 0?(n.push({type:`message`,text:`${v[i.kind].name} beaten down at close range.`,tone:`good`}),Re(e,ce(i),n),ze(e,i.position,n)):o.hp<=0&&a!==void 0?(qe(e,a),n.push({type:`message`,text:`${a.name} is dead. ${a.species===`brahmin`?`The settlement falls silent.`:`The caravan will remember this.`}`,tone:`danger`})):y||n.push({type:`message`,text:`${d?`Brutal strike`:`Punch`}: ${h} damage.`,tone:d?`good`:`neutral`}):n.push({type:`message`,text:`The target slips past your swing.`,tone:`warning`}),!0}function Ye(e,t,n){if(e.player.magazine<=0||e.player.weaponCondition<=0)return n.push({type:`message`,text:e.player.magazine<=0?`Magazine empty — closing with your fists.`:`The damaged action will not cycle — punching instead.`,tone:`warning`}),Je(e,t,n);--e.player.magazine;let r=Math.max(1,3-Math.floor((e.player.skills.repair??25)/50));e.player.weaponCondition=Math.max(0,e.player.weaponCondition-r);let i=Ie(e);if(i===void 0)return n.push({type:`shot`,sourceId:`player`,targetId:`player`,hit:!1,damage:0,critical:!1}),n.push({type:`message`,text:`The shot cracks across the empty waste.`,tone:`neutral`}),!0;i.type===`enemy`?i.entity.alerted=!0:Ke(e,i.entity,n);let a=e.player.weaponCondition/100,o=(e.player.skills.guns-35)*.004,s=(1-a)*.2,c=(e.player.special.perception-5)*.012,l=e.player.traits.includes(`gunslinger`)?.06:0,u=Math.max(.22,Math.min(.97,.92-(i.distance-1)*.07+o+c+l-s+Ge(e))),d=t.chance(u),f=(e.player.special.luck-5)*.008,p=d&&t.chance(Math.max(.02,.08+e.player.skills.guns*.0015+f+(e.player.traits.includes(`gunslinger`)?.03:0))),m=Math.floor(e.player.skills.guns/25),h=.62+a*.38,g=d?Math.max(1,Math.floor((t.integer(5,8)+m)*h))*(p?2:1):0;return i.entity.hp=Math.max(0,i.entity.hp-g),(i.entity.unconsciousTurns??0)>0&&g>0&&(i.entity.unconsciousTurns=0),n.push({type:`shot`,sourceId:`player`,targetId:i.entity.id,hit:d,damage:g,critical:p}),d?i.entity.hp<=0&&i.type===`enemy`?(n.push({type:`message`,text:`${v[i.entity.kind].name} neutralised.`,tone:`good`}),Re(e,ce(i.entity),n),ze(e,i.entity.position,n)):i.entity.hp<=0&&i.type===`npc`?(qe(e,i.entity),n.push({type:`message`,text:`${i.entity.name} is dead. ${i.entity.species===`brahmin`?`The settlement falls silent.`:`The caravan will remember this.`}`,tone:`danger`})):n.push({type:`message`,text:`${p?`Critical strike`:`Hit`}: ${g} damage.`,tone:p?`good`:`neutral`}):n.push({type:`message`,text:`Shot wide.`,tone:`warning`}),!0}function Xe(e,t,n){if(Pe(e,t.destination)!==void 0)return n.push({type:`message`,text:`Movement blocks the far side of the passage.`,tone:`warning`}),!1;let r=M(e.player.position);e.player.position=M(t.destination),e.player.direction=t.destinationDirection,de(e,e.player.position),n.push({type:`transition`,id:t.id,name:t.name,environment:t.destinationEnvironment,from:r,to:M(e.player.position)});let i=xe(e,e.player.position),a=!e.discoveredEncounterZones.includes(i.id);if(a&&e.discoveredEncounterZones.push(i.id),n.push({type:`encounter_zone`,id:i.id,name:i.name,level:i.level,discovered:a}),a&&Re(e,6+i.level*4,n),t.destinationEnvironment===`interior`){let t=e.interiorZones.find(t=>ie(t,e.player.position));t!==void 0&&!e.discoveredAreas.includes(t.id)&&(e.discoveredAreas.push(t.id),Re(e,20,n))}return Be(e,n),He(e,n),!0}function Ze(e,t){let n=re(e.player.position,_[e.player.direction]),r=_e(e,n),i=F(e,n);if(i!==void 0)return Qe(e,i,t);let a=De(e,n);if(a!==void 0)return $e(e,a,t);if(r===`transition`){let r=Ee(e,n);return r===void 0?(t.push({type:`message`,text:`The passage has collapsed beyond use.`,tone:`warning`}),!1):Xe(e,r,t)}if(r===`door`&&!ye(e,n))return e.openDoors.push(A(n)),t.push({type:`door`,position:n}),t.push({type:`message`,text:`The rusted gate shrieks open.`,tone:`good`}),!0;if(r===`locked_door`){let r=Te(e,n);if(r===void 0)return!1;if(r.locked)return e.player.hasRelayKey?(r.locked=!1,r.opened=!0,ye(e,n)||e.openDoors.push(A(n)),t.push({type:`door`,position:M(n)}),t.push({type:`message`,text:`The service-station relay card releases the bunker lock.`,tone:`good`}),Re(e,15,t),!0):(t.push({type:`lockpick`,deviceId:r.id}),!1);if(!ye(e,n))return e.openDoors.push(A(n)),r.opened=!0,t.push({type:`door`,position:n}),t.push({type:`message`,text:`The relay-bunker door grinds open.`,tone:`good`}),!0}if(r===`security_door`){let r=Te(e,n);if(r?.locked===!0)return t.push({type:`message`,text:`ACCESS DENIED. The maintenance terminal controls this door.`,tone:`warning`}),!1;if(!ye(e,n))return e.openDoors.push(A(n)),r!==void 0&&(r.opened=!0),t.push({type:`door`,position:n}),t.push({type:`message`,text:`The security seal retracts.`,tone:`good`}),!0}if(r===`locker`){let r=Te(e,n);return r===void 0||(r.opened?t.push({type:`message`,text:`The utility locker is empty.`,tone:`neutral`}):r.locked&&t.push({type:`lockpick`,deviceId:r.id})),!1}if(r===`terminal`){let r=Te(e,n);return r!==void 0&&t.push({type:`terminal`,deviceId:r.id}),!1}return r===`prospector`?(t.push({type:`message`,text:`A weathered route marker points deeper into the Mojave.`,tone:`neutral`}),!1):r===`camp`?(t.push({type:`crafting`}),!1):(t.push({type:`message`,text:`Only wind and grit answer.`,tone:`neutral`}),!1)}function Qe(e,t,n){if(t.hp<=0)return n.push({type:`message`,text:`${t.name} lies dead in the dust.`,tone:`danger`}),!1;if(t.unconsciousTurns>0)return n.push({type:`message`,text:`${t.name} is unconscious for roughly ${t.unconsciousTurns} more turn${t.unconsciousTurns===1?``:`s`}.`,tone:`warning`}),!1;if(t.hostile)return n.push({type:`message`,text:t.species===`brahmin`?`${t.name} bellows and lowers both heads.`:`${t.name} keeps a weapon trained on you. Talking is over.`,tone:`danger`}),!1;if(t.species===`brahmin`){let r=`met_${t.id.replaceAll(`-`,`_`)}`;return e.dialogueFlags.includes(r)||e.dialogueFlags.push(r),n.push({type:`message`,text:t.id===`juniper-brahmin`?`Buttons noses your pack with one head while the other watches the fire. The settlement brand on her yoke reads JUNIPER POST.`:`Two-Bells answers with a patient double low. Packs of water and trader canvas ride across his broad back.`,tone:`good`}),!1}t.id===`mara-voss`&&(e.prospectorMet=!0);let r=`met_${t.id.replaceAll(`-`,`_`)}`;return e.dialogueFlags.includes(r)||e.dialogueFlags.push(r),n.push({type:`dialogue`,nodeId:p(e,t.id)}),!0}function $e(e,t,n){if(Ue(e,t.position,n,0),t.kind===`oasis`){let r=Math.max(0,e.player.maxWater-e.player.water);return e.player.water=e.player.maxWater,e.player.conditions.wetness=Math.max(0,e.player.conditions.wetness-1),t.used||=(e.player.inventory.water+=2,!0),n.push({type:`message`,text:`You drink and fill your canteens at Glasswater${r>0?`, restoring ${r} hydration`:``}. The spring tastes faintly of iron.`,tone:`good`}),!0}if(t.kind===`campfire`){let r=e.player.conditions.fatigue;return e.player.conditions.fatigue=Math.max(0,r-24),e.player.conditions.wetness=0,t.used=!0,n.push({type:`message`,text:`You warm and dry yourself beside the settlement fire. Fatigue eases.`,tone:`good`}),!0}if(t.kind===`teepee`)return e.player.conditions.fatigue=Math.max(0,e.player.conditions.fatigue-12),t.used=!0,n.push({type:`message`,text:`The canvas lodge cuts the wind long enough to catch your breath.`,tone:`good`}),!0;if(t.kind===`wreck`){if(t.used)return n.push({type:`message`,text:`${t.name} has already been stripped to its frame.`,tone:`neutral`}),!1;let r=3+Math.floor(e.player.skills.repair/25),i=e.player.skills.repair>=55?4:2;return e.player.scrap+=r,e.player.reserveAmmo+=i,t.used=!0,n.push({type:`message`,text:`You strip ${t.name}: +${r} scrap and +${i} pistol rounds.`,tone:`good`}),!0}if(t.kind===`vista`){if(t.used)return n.push({type:`message`,text:`From Sunbreak, the valley road and distant mountain gaps remain clear.`,tone:`neutral`}),!1;let r=new Set(e.exploredTiles);for(let n of ue(t.position,e.width,e.height,8))r.add(n);return e.exploredTiles=[...r],t.used=!0,Re(e,20,n),n.push({type:`message`,text:`You survey the Mojave from Sunbreak Overlook. Valleys, camps and the eastern pass are marked on the automap.`,tone:`good`}),!0}return t.kind===`bridge`?(n.push({type:`message`,text:`The Old 95 Span carries the broken highway over Red Cut's flooded wash. Its patched deck still holds.`,tone:`neutral`}),!1):(n.push({type:`message`,text:t.kind===`settlement`?`${t.name} is a living stop: canvas shelters, firelight, pack animals and guarded trade.`:`${t.name} stands against the Mojave wind.`,tone:`good`}),!1)}function et(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[],i=n.landmarks.find(e=>e.id===t);if(i===void 0)return{state:e,events:r,consumedTurn:!1};if(Math.abs(i.position.x-n.player.position.x)+Math.abs(i.position.z-n.player.position.z)>1)return r.push({type:`message`,text:`Move closer to inspect that landmark.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};let a=$e(n,i,r);if(a){let e=new g(n.rngState);mt(n,e,r),n.rngState=e.getState()}return{state:n,events:r,consumedTurn:a}}function tt(e,t){let n=e.player.magazineSize-e.player.magazine;if(n===0)return t.push({type:`message`,text:`Magazine already full.`,tone:`neutral`}),!1;if(e.player.reserveAmmo===0)return t.push({type:`message`,text:`No spare rounds.`,tone:`warning`}),!1;let r=Math.min(n,e.player.reserveAmmo);return e.player.magazine+=r,e.player.reserveAmmo-=r,t.push({type:`message`,text:`Loaded ${r} rounds.`,tone:`neutral`}),!0}function nt(e,t){if(e.player.medkits===0)return t.push({type:`message`,text:`No field dressings remaining.`,tone:`warning`}),!1;if(e.player.hp===e.player.maxHp)return t.push({type:`message`,text:`Vitals already stable.`,tone:`neutral`}),!1;let n=Math.min(e.player.traits.includes(`field_medic`)?27:18,e.player.maxHp-e.player.hp);return--e.player.medkits,e.player.hp+=n,t.push({type:`message`,text:`Field dressing restored ${n} health.`,tone:`good`}),!0}var rt=[{x:0,z:-1},{x:1,z:0},{x:0,z:1},{x:-1,z:0}];function it(e,t){let n=A(t.position),r=new Set([n]),i=[];for(let n of rt){let a=re(t.position,n);if(j(a,e.player.position))return a;!Ne(e,a)&&Pe(e,a,t.id)===void 0&&(i.push({position:a,first:a}),r.add(A(a)))}for(;i.length>0;){let n=i.shift();if(n===void 0)break;for(let a of rt){let o=re(n.position,a);if(j(o,e.player.position))return n.first;let s=A(o);r.has(s)||Ne(e,o)||Pe(e,o,t.id)!==void 0||(r.add(s),i.push({position:o,first:n.first}))}}}function at(e){let t=e.player.armor,n=t.equipped,r=+(e.player.identity.race===`ghoul`);if(n===null||t.condition<=0)return+!!e.player.traits.includes(`tough_hide`)+r;let i=t.condition<25?.5:t.condition<50?.75:1,a=e.player.conditions.medXTurns>0?3:0,o=+!!e.player.traits.includes(`tough_hide`);return Math.max(0,Math.floor(T[n].reduction*i)+a+o+r)}function ot(e){return T[e].name}function st(e,t){if(t<=0||e.cheats.godMode)return{damage:0,absorbed:t};let n=at(e),r=Math.max(0,t-n),i=t-r;return e.player.armor.equipped!==null&&e.player.armor.condition>0&&(e.player.armor.condition=Math.max(0,e.player.armor.condition-(t>=6?2:1))),{damage:r,absorbed:i}}function ct(e,t,n,r){t.kind===`scorpion`&&n.chance(.46)?(e.player.conditions.poisonTurns=Math.max(e.player.conditions.poisonTurns,6),e.player.conditions.poisonStrength=Math.max(e.player.conditions.poisonStrength,2),r.push({type:`condition`,condition:`poison`,active:!0}),r.push({type:`message`,text:`Scorpion venom floods the wound. Use antivenom before it spreads.`,tone:`danger`})):t.kind===`ant`&&n.chance(.24)?(e.player.conditions.poisonTurns=Math.max(e.player.conditions.poisonTurns,4),e.player.conditions.poisonStrength=Math.max(e.player.conditions.poisonStrength,1),r.push({type:`condition`,condition:`poison`,active:!0}),r.push({type:`message`,text:`Cinder-ant venom burns through the bite.`,tone:`danger`})):t.kind===`roach`&&e.player.identity.race!==`ghoul`&&e.player.conditions.disease===null&&n.chance(e.player.traits.includes(`iron_stomach`)?.05:.14)&&(e.player.conditions.disease=`waste_fever`,r.push({type:`condition`,condition:`disease`,active:!0}),r.push({type:`message`,text:`The filthy bite leaves you feverish. Antibiotics can clear it.`,tone:`danger`}))}function lt(e,t,n,r){let i=t.kind===`raider`,a=Math.floor(Math.max(0,t.level-1)/2),o=Math.min(.06,Math.max(0,t.level-1)*.015),s=i?.55:t.kind===`ant`?.72:t.kind===`gecko`?.66:t.kind===`scorpion`?.63:.68,c=(e.player.special.agility-5)*.01,l=n.chance(Math.max(.25,Math.min(.9,s+o-c))),u=l&&n.chance(.05),d=(i?n.integer(3,5):t.kind===`ant`?n.integer(2,4):t.kind===`gecko`?n.integer(2,5):t.kind===`scorpion`?n.integer(4,6):n.integer(1,3))+a,{damage:f,absorbed:p}=st(e,l?d*(u?2:1):0);e.player.hp=Math.max(0,e.player.hp-f),r.push({type:`shot`,sourceId:t.id,targetId:`player`,hit:l,damage:f,critical:u}),r.push({type:`message`,text:l?e.cheats.godMode?`God mode absorbs the level ${t.level} ${v[t.kind].name}'s hit.`:`Level ${t.level} ${v[t.kind].name} hits for ${f}${p>0?` (${p} absorbed)`:``}.`:`Level ${t.level} ${v[t.kind].name} misses.`,tone:l?e.cheats.godMode?`good`:`danger`:`neutral`}),l&&f>0&&!e.cheats.godMode&&ct(e,t,n,r)}function ut(e,t,n){for(let r of e.enemies){if(r.hp<=0||e.player.hp<=0)continue;let i=Math.abs(r.position.x-e.player.position.x)+Math.abs(r.position.z-e.player.position.z);if((r.unconsciousTurns??0)>0){r.unconsciousTurns=Math.max(0,(r.unconsciousTurns??0)-1),r.unconsciousTurns===0&&i<=7&&n.push({type:`message`,text:`The level ${r.level} ${v[r.kind].name} regains consciousness.`,tone:`warning`});continue}let a=e.player.torchLit&&e.player.torchFuel>0,o=I(e)&&!a&&!e.player.pipLightOn?2:0,s=a?2:+!!e.player.pipLightOn,c=e.weather.kind===`rain`&&be(e,e.player.position)===`exterior`?e.weather.intensity:0,l=Math.max(2,y[r.kind]-o+s-c),u=i<=2||i<=l&&Fe(e,r.position,e.player.position),d=r.alerted===!0&&i<=9;if(!u&&!d){r.alerted=!1;continue}r.alerted=!0;let f=r.kind===`raider`&&i<=6&&Fe(e,r.position,e.player.position);if(i===1||f){lt(e,r,t,n);continue}let p=it(e,r);if(p===void 0||j(p,e.player.position))continue;let m=M(r.position);r.position=p,n.push({type:`move`,entityId:r.id,from:m,to:M(p)})}for(let r of e.npcs){if(r.hp<=0||e.player.hp<=0)continue;let i=Math.abs(r.position.x-e.player.position.x)+Math.abs(r.position.z-e.player.position.z);if(r.unconsciousTurns>0){r.unconsciousTurns=Math.max(0,r.unconsciousTurns-1),r.unconsciousTurns===0&&i<=7&&n.push({type:`message`,text:r.species===`brahmin`?`${r.name} lurches back onto four hooves.`:`${r.name} comes round and reaches for a weapon.`,tone:`warning`});continue}if(r.hostile&&r.species===`brahmin`){if(i===1){let i=t.chance(.7),{damage:a,absorbed:o}=st(e,i?t.integer(4,8):0);e.player.hp=Math.max(0,e.player.hp-a),n.push({type:`shot`,sourceId:r.id,targetId:`player`,hit:i,damage:a,critical:!1}),n.push({type:`message`,text:i?`${r.name} gores for ${a}${o>0?` (${o} absorbed)`:``}.`:`${r.name}'s horns tear through empty air.`,tone:i?`danger`:`neutral`})}else if(i<=7){let t=it(e,r);if(t!==void 0&&!j(t,e.player.position)){let e=M(r.position);r.position=t,n.push({type:`move`,entityId:r.id,from:e,to:M(t)})}}continue}if(!r.hostile||i>6||!Fe(e,r.position,e.player.position))continue;let a=t.chance(i===1?.72:Math.max(.35,.68-i*.055)),{damage:o,absorbed:s}=st(e,a?t.integer(3,6):0);e.player.hp=Math.max(0,e.player.hp-o),n.push({type:`shot`,sourceId:r.id,targetId:`player`,hit:a,damage:o,critical:!1}),n.push({type:`message`,text:a?`${r.name} hits for ${o}${s>0?` (${s} absorbed)`:``}.`:`${r.name} fires wide.`,tone:a?`danger`:`neutral`})}e.npcs.forEach((r,i)=>{if(r.hp<=0||r.hostile||r.unconsciousTurns>0||r.role!==`wanderer`&&r.role!==`animal`||(e.turn+i)%3!=0)return;let a=r.role===`animal`?2:3,o=rt.map(e=>re(r.position,e)).filter(t=>{let n=_e(e,t);return Math.abs(t.x-r.homePosition.x)+Math.abs(t.z-r.homePosition.z)<=a&&(n===`floor`||n===`bridge`||n===`prospector`)&&!j(t,e.player.position)&&!Ne(e,t)&&Pe(e,t)===void 0});if(o.length===0||!t.chance(r.role===`animal`?.62:.76))return;let s=o[t.integer(0,o.length-1)];if(s===void 0)return;let c=M(r.position);r.position=M(s),n.push({type:`move`,entityId:r.id,from:c,to:M(s)})}),e.player.hp<=0&&(e.status=`lost`,n.push({type:`status`,status:`lost`}),n.push({type:`message`,text:`The wasteland takes another traveler.`,tone:`danger`}))}function dt(e,t,n){if(e.weather.turnsRemaining=Math.max(0,e.weather.turnsRemaining-1),!(e.weather.turnsRemaining>0)){if(e.weather.kind===`rain`){e.weather={kind:`clear`,turnsRemaining:t.integer(50,90),intensity:1},n.push({type:`weather`,kind:`clear`,intensity:1}),n.push({type:`message`,text:`The rain thins to dripping silence.`,tone:`neutral`});return}if(t.chance(.45)){let r=t.chance(.28)?2:1;e.weather={kind:`rain`,turnsRemaining:t.integer(24,42),intensity:r},n.push({type:`weather`,kind:`rain`,intensity:r}),n.push({type:`message`,text:r===2?`A hard Mojave storm rolls over the ridge.`:`Cold rain begins to tap against the ruins.`,tone:`warning`})}else e.weather={kind:`clear`,turnsRemaining:t.integer(30,50),intensity:1}}}function ft(e,t,n){let r=0,i=Math.floor(e.player.skills.survival/50),a=e.player.identity.race===`ghoul`?2:0,o=e.player.traits.includes(`iron_stomach`)?2:0;e.cheats.noNeeds?(e.player.water=e.player.maxWater,e.player.food=e.player.maxFood,e.player.conditions.fatigue=0):(e.turn%(4+i+a+o)===0&&(e.player.water=Math.max(0,e.player.water-1),e.player.water===3&&n.push({type:`message`,text:`Your canteen is running low.`,tone:`warning`}),e.player.water===0&&(r+=2)),e.turn%(6+i+o)===0&&(e.player.food=Math.max(0,e.player.food-1),e.player.food===3&&n.push({type:`message`,text:`Hunger is slowing you down.`,tone:`warning`}),e.player.food===0&&(r+=1)));let s=be(e,e.player.position)===`exterior`,c=ve(e);if(c){e.player.conditions.wetness=10;let r=.035*(e.player.traits.includes(`iron_stomach`)?.35:1);e.player.identity.race!==`ghoul`&&e.player.conditions.disease===null&&t.chance(r)&&(e.player.conditions.disease=`lung_rot`,n.push({type:`condition`,condition:`disease`,active:!0}),n.push({type:`message`,text:`Contaminated water settles cold in your lungs. Antibiotics are required.`,tone:`danger`}))}else if(e.weather.kind===`rain`&&s){let r=e.tiles.some((t,n)=>t.some((t,r)=>t===`camp`&&Math.abs(r-e.player.position.x)+Math.abs(n-e.player.position.z)<=1)),i=e.player.traits.includes(`storm_walker`)?Math.max(0,e.weather.intensity-1):e.weather.intensity;(!e.campBuilt||!r)&&(e.player.conditions.wetness=Math.min(10,e.player.conditions.wetness+i));let a=(.04+e.weather.intensity*.025)*(e.player.traits.includes(`iron_stomach`)?.35:1);e.player.identity.race!==`ghoul`&&e.player.conditions.wetness>=6&&e.player.conditions.disease===null&&t.chance(a)&&(e.player.conditions.disease=`lung_rot`,n.push({type:`condition`,condition:`disease`,active:!0}),n.push({type:`message`,text:`Cold exposure settles into your lungs. Antibiotics are required.`,tone:`danger`}))}else e.player.conditions.wetness=Math.max(0,e.player.conditions.wetness-2);if(e.player.torchLit){let t=e.weather.kind===`rain`&&s&&!e.player.traits.includes(`storm_walker`)?2:1;e.player.torchFuel=Math.max(0,e.player.torchFuel-t),e.player.torchFuel===0&&(e.player.torchLit=!1,n.push({type:`message`,text:`The torch gutters out.`,tone:`warning`}))}e.player.conditions.poisonTurns>0&&(r+=Math.max(1,e.player.conditions.poisonStrength),--e.player.conditions.poisonTurns,e.player.conditions.poisonTurns===0&&(e.player.conditions.poisonStrength=0,n.push({type:`condition`,condition:`poison`,active:!1}),n.push({type:`message`,text:`The venom finally clears your bloodstream.`,tone:`good`})));let l=e.player.conditions.disease;l===`waste_fever`?(e.turn%4==0&&(r+=1),!e.cheats.noNeeds&&e.turn%5==0&&(e.player.food=Math.max(0,e.player.food-1))):l===`lung_rot`&&e.turn%5==0&&(r+=1);let u=e.player.conditions.fatigue;if(!e.cheats.noNeeds){let t=1;e.weather.kind===`rain`&&s&&(t+=1),c&&(t+=e.player.traits.includes(`storm_walker`)?1:2),l!==null&&(t+=l===`lung_rot`?2:1),e.player.addictions.includes(`alcohol`)&&e.player.conditions.intoxicatedTurns<=0&&(t+=1),e.player.addictions.includes(`chems`)&&e.player.conditions.stimulantTurns<=0&&e.player.conditions.medXTurns<=0&&(t+=1),e.player.conditions.stimulantTurns>0&&(t=Math.max(0,t-2)),e.player.conditions.fatigue=Math.min(100,e.player.conditions.fatigue+t)}if(u<70&&e.player.conditions.fatigue>=70&&(n.push({type:`condition`,condition:`fatigue`,active:!0}),n.push({type:`message`,text:`Fatigue is degrading your aim. Rest at the lean-to or use a stimulant.`,tone:`warning`})),e.player.conditions.fatigue>=100&&e.turn%3==0&&(r+=2),e.player.conditions.intoxicatedTurns=Math.max(0,e.player.conditions.intoxicatedTurns-1),e.player.conditions.stimulantTurns=Math.max(0,e.player.conditions.stimulantTurns-1),e.player.conditions.medXTurns=Math.max(0,e.player.conditions.medXTurns-1),r!==0){if(e.cheats.godMode){n.push({type:`message`,text:`God mode blocks survival damage.`,tone:`good`});return}e.player.hp=Math.max(0,e.player.hp-r),n.push({type:`message`,text:`Survival conditions cost ${r} health.`,tone:`danger`}),e.player.hp===0&&(e.status=`lost`,n.push({type:`status`,status:`lost`}))}}function pt(e,t,n){if(e.turn===0||e.turn%12!=0)return;let r=be(e,e.player.position),i=xe(e,e.player.position);if(e.clearedSites.includes(i.id)||e.enemies.filter(t=>t.hp>0&&xe(e,t.position).id===i.id).length>=(r===`interior`?4:5))return;let a=e.spawnPoints.filter(t=>t.environment!==r||_e(e,t.position)!==`floor`||xe(e,t.position).id!==i.id?!1:Math.abs(t.position.x-e.player.position.x)+Math.abs(t.position.z-e.player.position.z)>=4&&!e.enemies.some(e=>j(e.position,t.position))&&Te(e,t.position)===void 0);if(a.length===0)return;let o=a[t.integer(0,a.length-1)];if(o===void 0)return;let s=Se(e,o.position),c=r===`interior`?s<=2?[`roach`,`roach`,`ant`,`raider`]:[`ant`,`gecko`,`scorpion`,`raider`]:s<=1?[`roach`,`roach`,`ant`]:s===2?[`roach`,`ant`,`ant`,`gecko`]:s===3?[`ant`,`gecko`,`raider`,`scorpion`]:[`gecko`,`raider`,`raider`,`scorpion`],l=c[t.integer(0,c.length-1)]??`roach`,u=se(l,s),d={id:`enemy-${e.nextEnemyId++}`,kind:l,level:s,position:M(o.position),hp:u,maxHp:u};e.enemies.push(d),n.push({type:`spawn`,enemyId:d.id,kind:l,level:s}),n.push({type:`message`,text:r===`interior`?`Level ${s} movement scratches inside the buried relay.`:`Level ${s} movement stirs beyond the dust.`,tone:`warning`})}function mt(e,t,n){e.turn+=1;let r=I(e);e.timeMinutes=(e.timeMinutes+5)%1440,dt(e,t,n),r!==I(e)&&n.push({type:`message`,text:I(e)?`Night closes over the Mojave. Light now controls how far you can see.`:`Dawn lifts the darkness from the waste.`,tone:I(e)?`warning`:`good`}),e.status===`playing`&&ut(e,t,n),e.status===`playing`&&ft(e,t,n),e.status===`playing`&&pt(e,t,n)}function ht(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[],i=n.pickups.find(e=>e.id===t&&!e.collected);if(i===void 0)return{state:e,events:r,consumedTurn:!1};if(Math.abs(i.position.x-n.player.position.x)+Math.abs(i.position.z-n.player.position.z)>1)return r.push({type:`message`,text:`Move closer to take it.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};Ve(n,i,r);let a=new g(n.rngState);return mt(n,a,r),n.rngState=a.getState(),{state:n,events:r,consumedTurn:!0}}function gt(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[];if(t===`lockpick`||t===`electronics`)return r.push({type:`message`,text:`That item is used contextually.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};if(t===`torch`){if(n.player.torchLit)return n.player.torchLit=!1,r.push({type:`message`,text:`Torch extinguished. Remaining fuel preserved.`,tone:`neutral`}),{state:n,events:r,consumedTurn:!1};if(n.player.torchFuel<=0){if(n.player.inventory.torch<=0)return r.push({type:`message`,text:`No torch remains in your pack.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1};--n.player.inventory.torch,n.player.torchFuel=60}return n.player.torchLit=!0,r.push({type:`message`,text:`Torch lit. Fuel: ${n.player.torchFuel} turns.`,tone:`good`}),{state:n,events:r,consumedTurn:!1}}if(n.player.inventory[t]<=0)return r.push({type:`message`,text:`No ${t.replaceAll(`_`,` `)} remaining.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1};let i=new g(n.rngState),a=(e,t,a)=>{let o=e===`chems`&&n.player.traits.includes(`chem_resistant`)?Math.ceil(a/2):a;if(n.player.conditions[t]=Math.min(100,n.player.conditions[t]+o),n.player.addictions.includes(e))return;let s=Math.max(.04,(n.player.conditions[t]-20)/100);(n.player.conditions[t]>=80||i.chance(s))&&(n.player.addictions.push(e),r.push({type:`condition`,condition:`addiction`,active:!0}),r.push({type:`message`,text:e===`alcohol`?`Alcohol dependence has taken hold.`:`Chem dependence has taken hold.`,tone:`danger`}))};if(t===`water`||t===`ration`){let i=t===`water`?`water`:`food`,a=t===`water`?n.player.maxWater:n.player.maxFood;if(n.player[i]>=a)return r.push({type:`message`,text:t===`water`?`Hydration already full.`:`You are not hungry.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};let o=Math.min(6,a-n.player[i]);--n.player.inventory[t],n.player[i]+=o,r.push({type:`message`,text:t===`water`?`Drank clean water. Hydration +${o}.`:`Ate a trail ration. Food +${o}.`,tone:`good`})}else if(t===`cactus_fruit`){if(n.player.water>=n.player.maxWater&&n.player.food>=n.player.maxFood)return r.push({type:`message`,text:`You are too full to eat the cactus fruit.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};let t=Math.floor(n.player.skills.survival/40),i=Math.min(3+t,n.player.maxWater-n.player.water),a=Math.min(2+t,n.player.maxFood-n.player.food);--n.player.inventory.cactus_fruit,n.player.water+=i,n.player.food+=a,r.push({type:`message`,text:`Ate prickly-pear fruit. Hydration +${i}, food +${a}.`,tone:`good`})}else if(t===`broc_flower`){if(n.player.hp>=n.player.maxHp&&n.player.conditions.poisonTurns<=0)return r.push({type:`message`,text:`No injury or venom needs the broc flower.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};let t=Math.min(6+Math.floor(n.player.skills.survival/12),n.player.maxHp-n.player.hp),i=n.player.conditions.poisonTurns;--n.player.inventory.broc_flower,n.player.hp+=t,n.player.conditions.poisonTurns>0&&(n.player.conditions.poisonTurns=Math.max(0,n.player.conditions.poisonTurns-2),n.player.conditions.poisonTurns===0&&(n.player.conditions.poisonStrength=0)),r.push({type:`message`,text:`Crushed broc flower into a field poultice. Health +${t}${i>0?n.player.conditions.poisonTurns>0?`; venom slowed`:`; venom cleared`:``}.`,tone:`good`})}else if(t===`stimpak`){if(n.player.hp>=n.player.maxHp)return r.push({type:`message`,text:`Vitals already stable.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};let t=Math.min(n.player.traits.includes(`field_medic`)?40:28,n.player.maxHp-n.player.hp);--n.player.inventory.stimpak,n.player.hp+=t,r.push({type:`message`,text:`Stimpak restored ${t} health.`,tone:`good`})}else if(t===`nuka_cola`)--n.player.inventory.nuka_cola,n.player.water=Math.min(n.player.maxWater,n.player.water+3),n.player.conditions.fatigue=Math.max(0,n.player.conditions.fatigue-12),n.player.conditions.stimulantTurns=Math.max(n.player.conditions.stimulantTurns,2),n.player.caps+=1,r.push({type:`message`,text:`Nuka-Cola restores hydration, cuts fatigue, and leaves one bottle cap.`,tone:`good`});else if(t===`whiskey`)--n.player.inventory.whiskey,n.player.conditions.intoxicatedTurns=Math.max(n.player.conditions.intoxicatedTurns,8),n.player.conditions.fatigue=Math.max(0,n.player.conditions.fatigue-8),a(`alcohol`,`alcoholDependence`,22),r.push({type:`message`,text:`Whiskey steadies your fists but blurs firearm aim for eight turns.`,tone:`warning`});else if(t===`jet`)--n.player.inventory.jet,n.player.conditions.stimulantTurns=Math.max(n.player.conditions.stimulantTurns,7),n.player.conditions.fatigue=Math.max(0,n.player.conditions.fatigue-32),a(`chems`,`chemDependence`,30),r.push({type:`message`,text:`Jet floods your system: aim and alertness sharpen for seven turns.`,tone:`warning`});else if(t===`med_x`)--n.player.inventory.med_x,n.player.conditions.medXTurns=Math.max(n.player.conditions.medXTurns,8),a(`chems`,`chemDependence`,26),r.push({type:`message`,text:`Med-X adds three damage resistance for eight turns.`,tone:`warning`});else if(t===`antivenom`){if(n.player.conditions.poisonTurns<=0)return r.push({type:`message`,text:`No active venom to treat.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};--n.player.inventory.antivenom,n.player.conditions.poisonTurns=0,n.player.conditions.poisonStrength=0,r.push({type:`condition`,condition:`poison`,active:!1}),r.push({type:`message`,text:`Antivenom neutralises the poison.`,tone:`good`})}else if(t===`antibiotics`){if(n.player.conditions.disease===null)return r.push({type:`message`,text:`No active disease to treat.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};--n.player.inventory.antibiotics,n.player.conditions.disease=null,n.player.conditions.wetness=0,r.push({type:`condition`,condition:`disease`,active:!1}),r.push({type:`message`,text:`The antibiotic course clears the infection.`,tone:`good`})}return mt(n,i,r),n.rngState=i.getState(),{state:n,events:r,consumedTurn:!0}}function _t(e){return Math.max(1,3-Math.floor((e.player.skills.repair??25)/40))}function vt(e){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};if((e.player.weaponCondition??100)>=100)return{state:e,events:[{type:`message`,text:`The sidearm is already fully maintained.`,tone:`neutral`}],consumedTurn:!1};let t=_t(e);if(e.player.scrap<t)return{state:e,events:[{type:`message`,text:`Need ${t} scrap to repair the sidearm.`,tone:`warning`}],consumedTurn:!1};let n=N(e),r=[],i=20+Math.floor((n.player.skills.repair??25)/4),a=Math.min(i,100-n.player.weaponCondition);n.player.scrap-=t,n.player.weaponCondition+=a,r.push({type:`repair`,amount:a}),r.push({type:`message`,text:`Sidearm repaired by ${a}% for ${t} scrap.`,tone:`good`});let o=new g(n.rngState);return mt(n,o,r),n.rngState=o.getState(),{state:n,events:r,consumedTurn:!0}}function yt(e,t){if(e.status!==`playing`||!e.player.armor.owned.includes(t))return{state:e,events:[],consumedTurn:!1};let n=N(e);return n.player.armor.equipped=t,{state:n,events:[{type:`message`,text:`${ot(t)} equipped. Damage resistance ${at(n)}.`,tone:`good`}],consumedTurn:!1}}function bt(e){return Math.max(1,4-Math.floor((e.player.skills.repair??25)/35))}function xt(e){if(e.status!==`playing`||e.player.armor.equipped===null)return{state:e,events:[],consumedTurn:!1};if(e.player.armor.condition>=100)return{state:e,events:[{type:`message`,text:`Equipped armour is already fully repaired.`,tone:`neutral`}],consumedTurn:!1};let t=bt(e);if(e.player.scrap<t)return{state:e,events:[{type:`message`,text:`Need ${t} scrap to repair armour.`,tone:`warning`}],consumedTurn:!1};let n=N(e),r=[],i=Math.min(35+Math.floor(n.player.skills.repair/4),100-n.player.armor.condition);n.player.scrap-=t,n.player.armor.condition+=i,r.push({type:`repair`,amount:i}),r.push({type:`message`,text:`Armour repaired by ${i}% for ${t} scrap.`,tone:`good`});let a=new g(n.rngState);return mt(n,a,r),n.rngState=a.getState(),{state:n,events:r,consumedTurn:!0}}function St(e){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let t=N(e);return t.player.pipLightOn=!t.player.pipLightOn,{state:t,events:[{type:`message`,text:t.player.pipLightOn?`Pip-Boy lamp on. The green glow carries farther than you think.`:`Pip-Boy lamp off.`,tone:t.player.pipLightOn?`good`:`neutral`}],consumedTurn:!1}}function Ct(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[],i=t,a=1;if(t===`ammo`){if(n.player.reserveAmmo<=0)return{state:e,events:[],consumedTurn:!1};a=Math.min(6,n.player.reserveAmmo),n.player.reserveAmmo-=a}else if(t===`medkit`){if(n.player.medkits<=0)return{state:e,events:[],consumedTurn:!1};--n.player.medkits}else if(t===`scrap`){if(n.player.scrap<=0)return{state:e,events:[],consumedTurn:!1};--n.player.scrap}else{if(n.player.inventory[t]<=0)return{state:e,events:[],consumedTurn:!1};--n.player.inventory[t]}let o=rt.map(e=>re(n.player.position,e)).find(e=>!Ne(n,e)&&Pe(n,e)===void 0&&!n.pickups.some(t=>!t.collected&&j(t.position,e)))??M(n.player.position);n.pickups.push({id:`drop-${n.turn}-${n.pickups.length}`,kind:i,position:M(o),collected:!1,amount:a,dropped:!0}),r.push({type:`drop`,pickup:i,amount:a}),r.push({type:`message`,text:`Dropped ${a} ${t}.`,tone:`neutral`});let s=new g(n.rngState);return mt(n,s,r),n.rngState=s.getState(),{state:n,events:r,consumedTurn:!0}}function wt(e,t,n){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let r=N(e),i=[],a=r.devices.find(e=>e.id===t);if(a===void 0||a.kind!==`locker`&&a.kind!==`locked_door`||!a.locked)return{state:e,events:i,consumedTurn:!1};if(r.player.inventory.lockpick<=0)return i.push({type:`message`,text:`No lockpicks left in your pack.`,tone:`warning`}),{state:e,events:i,consumedTurn:!1};let o=Math.abs(Math.max(0,Math.min(4,n))-a.solution);if(Math.min(o,5-o)<=+(r.player.skills.lockpick>=60)){if(a.locked=!1,a.opened=!0,a.kind===`locked_door`&&!ye(r,a.position))r.openDoors.push(A(a.position)),i.push({type:`door`,position:M(a.position)}),i.push({type:`message`,text:`The lock turns. The relay-bunker door opens.`,tone:`good`});else{let e=+!!r.player.traits.includes(`scrounger`);r.player.caps+=8+e*3,r.player.scrap+=3+e,r.player.reserveAmmo+=6+e*2,r.player.inventory.electronics+=1,i.push({type:`message`,text:`Locker opened: ${8+e*3} caps, ${3+e} scrap, ammunition, and circuitry.`,tone:`good`})}Re(r,25,i)}else--r.player.inventory.lockpick,i.push({type:`message`,text:`The pick snaps. Try another angle.`,tone:`warning`});let s=new g(r.rngState);return mt(r,s,i),r.rngState=s.getState(),{state:r,events:i,consumedTurn:!0}}function Tt(e,t,n){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let r=N(e),i=[],a=r.devices.find(e=>e.id===t&&e.kind===`terminal`);if(a===void 0||a.hacked)return{state:e,events:i,consumedTurn:!1};if(a.attemptsRemaining<=0)return i.push({type:`message`,text:`Terminal locked. A circuit bridge can reset it.`,tone:`warning`}),{state:e,events:i,consumedTurn:!1};if(Math.max(0,Math.min(3,n))===a.solution){a.hacked=!0,a.locked=!1;let e=r.devices.find(e=>e.id===a.linkedDeviceId);e!==void 0&&(e.locked=!1),i.push({type:`message`,text:`ROOT ACCESS GRANTED. Relay security released.`,tone:`good`}),Re(r,30,i)}else--a.attemptsRemaining,i.push({type:`message`,text:`ENTRY DENIED. ${a.attemptsRemaining} attempt${a.attemptsRemaining===1?``:`s`} remaining.`,tone:`warning`});let o=new g(r.rngState);return mt(r,o,i),r.rngState=o.getState(),{state:r,events:i,consumedTurn:!0}}function Et(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[],i=n.devices.find(e=>e.id===t&&e.kind===`terminal`);if(i===void 0||i.hacked||i.attemptsRemaining>0)return{state:e,events:r,consumedTurn:!1};if(n.player.inventory.electronics<=0)return r.push({type:`message`,text:`A circuit bridge is required to clear the lockout.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1};--n.player.inventory.electronics,i.attemptsRemaining=3,r.push({type:`message`,text:`Circuit bridge installed. Login attempts restored.`,tone:`good`});let a=new g(n.rngState);return mt(n,a,r),n.rngState=a.getState(),{state:n,events:r,consumedTurn:!0}}function Dt(e,t){let n=(e.player.special.charisma-5)*.025,r=Math.max(.58,1.12-e.player.skills.speech*.0045-n),i=e.player.traits.includes(`negotiator`)?.85:1;return Math.max(1,Math.ceil(S[t]*r*i))}function Ot(e,t){let n=t===`scrap`?2:7,r=(e.player.special.charisma-5)*.025,i=e.player.traits.includes(`negotiator`)?.15:0;return Math.max(1,Math.floor(n*(.8+e.player.skills.speech*.004+r+i)))}function kt(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[],i=Dt(n,t);return n.merchant.stock[t]<=0?(r.push({type:`message`,text:`The trader is out of that item.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1}):n.player.caps<i?(r.push({type:`message`,text:`Need ${i} caps for that trade.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1}):(n.player.caps-=i,--n.merchant.stock[t],t===`ammo`?n.player.reserveAmmo+=8:n.player.inventory[t]+=1,r.push({type:`message`,text:`Trade complete: ${t} for ${i} caps.`,tone:`good`}),{state:n,events:r,consumedTurn:!1})}function At(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[];if((t===`scrap`?n.player.scrap:n.player.medkits)<=0)return r.push({type:`message`,text:`No ${t} available to sell.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1};let i=Ot(n,t);return t===`scrap`?--n.player.scrap:--n.player.medkits,n.player.caps+=i,r.push({type:`message`,text:`Sold ${t} for ${i} caps.`,tone:`good`}),{state:n,events:r,consumedTurn:!1}}function jt(e,t){if(e.player.skillPoints<=0||e.player.skills[t]>=100)return{state:e,events:[],consumedTurn:!1};let n=N(e);return--n.player.skillPoints,n.player.skills[t]=Math.min(100,n.player.skills[t]+5),{state:n,events:[{type:`message`,text:`${t.toUpperCase()} increased to ${n.player.skills[t]}.`,tone:`good`}],consumedTurn:!1}}function Mt(e,t){if(e.player.perkPoints<=0||e.player.traits.includes(t)||!k(e.player.special,e.player.identity.race,e.player.level,t))return{state:e,events:[],consumedTurn:!1};let n=N(e);return--n.player.perkPoints,n.player.traits.push(t),t===`tough_hide`&&(n.player.maxHp+=6,n.player.hp+=6),{state:n,events:[{type:`message`,text:`Perk selected: ${t.replaceAll(`_`,` `).toUpperCase()}.`,tone:`good`}],consumedTurn:!1}}function Nt(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[],i=e=>n.dialogueFlags.includes(e)?!1:(n.dialogueFlags.push(e),!0);if(t===`accept_job`)n.questAccepted=!0,i(`accepted_condenser_job`),r.push({type:`message`,text:`Job accepted: recover the water condenser.`,tone:`good`});else if(t===`bargain`)i(`bargained_payment`),n.prospectorTrust=Math.max(-2,n.prospectorTrust-1);else if(t===`gain_trust`)i(`shared_survival_advice`),n.prospectorTrust=Math.min(2,n.prospectorTrust+1);else if(t===`barter`)r.push({type:`barter`});else{let e={learn_field_medicine:{flag:`learned_field_medicine`,title:`FIELD MEDICINE`},learn_desert_plants:{flag:`learned_desert_plants`,title:`DESERT BOTANY`},learn_dry_wells:{flag:`learned_dry_wells`,title:`DRY WELLS`},learn_waterways:{flag:`learned_waterways`,title:`FLOODED WASHES`},learn_raider_routes:{flag:`learned_raider_routes`,title:`RAIDER PATROLS`},learn_red_mesa:{flag:`learned_red_mesa`,title:`RED MESA PROSPECT`},learn_buried_relay:{flag:`learned_buried_relay`,title:`BURIED RELAY`},learn_old_prospectors:{flag:`learned_old_prospectors`,title:`OLD PROSPECTORS`},learn_oasis:{flag:`learned_oasis`,title:`GLASSWATER OASIS`},learn_bridge:{flag:`learned_bridge`,title:`OLD 95 SPAN`},learn_settlements:{flag:`learned_settlements`,title:`LIVING SETTLEMENTS`},learn_mountain_pass:{flag:`learned_mountain_pass`,title:`EASTERN MOUNTAIN PASS`}}[t];e!==void 0&&i(e.flag)&&(r.push({type:`message`,text:`Journal updated: ${e.title}.`,tone:`good`}),Re(n,8,r))}return{state:n,events:r,consumedTurn:!1}}var Pt={lean_to:6,field_dressing:3,handloads:2,water_still:4,torch:2,stimpak:4,antivenom:4,scrap_vest:8,rest:0,detox:6};function Ft(e,t){let n=Pt[t];return n===0?0:Math.max(1,n-Math.floor(e.player.skills.repair/50))}function It(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[];if(!rt.some(e=>_e(n,re(n.player.position,e))===`camp`))return r.push({type:`message`,text:`Crafting requires the marked camp site.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1};if(t!==`lean_to`&&!n.campBuilt)return r.push({type:`message`,text:`Build the lean-to before using the workbench.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1};if(t===`lean_to`&&n.campBuilt)return r.push({type:`message`,text:`The Cinder lean-to is already standing.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};if(t===`scrap_vest`&&n.player.armor.owned.includes(`scrap_vest`))return r.push({type:`message`,text:`A scrap vest is already in your kit.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};if(t===`detox`&&n.player.addictions.length===0)return r.push({type:`message`,text:`No addiction requires treatment.`,tone:`neutral`}),{state:e,events:r,consumedTurn:!1};if(t===`stimpak`&&n.player.inventory.water<=0)return r.push({type:`message`,text:`A clean-water dose is required to prepare a Stimpak.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1};let i=Ft(n,t);if(n.player.scrap<i)return r.push({type:`message`,text:`Need ${i} scrap for that recipe.`,tone:`warning`}),{state:e,events:r,consumedTurn:!1};n.player.scrap-=i,t===`lean_to`?(n.campBuilt=!0,n.player.water=Math.min(n.player.maxWater,n.player.water+2),n.player.food=Math.min(n.player.maxFood,n.player.food+2),r.push({type:`message`,text:`Lean-to raised. The camp workbench is ready.`,tone:`good`})):t===`field_dressing`?(n.player.medkits+=1,r.push({type:`message`,text:`Crafted one field dressing.`,tone:`good`})):t===`handloads`?(n.player.reserveAmmo+=5,r.push({type:`message`,text:`Handloaded five pistol rounds.`,tone:`good`})):t===`water_still`?(n.player.water=Math.min(n.player.maxWater,n.player.water+6),r.push({type:`message`,text:`The still produced six measures of clean water.`,tone:`good`})):t===`torch`?(n.player.inventory.torch+=1,r.push({type:`message`,text:`Crafted one 60-turn wasteland torch.`,tone:`good`})):t===`stimpak`?(--n.player.inventory.water,n.player.inventory.stimpak+=1,r.push({type:`message`,text:`Crafted one Stimpak from clean water and medical salvage.`,tone:`good`})):t===`antivenom`?(n.player.inventory.antivenom+=1,r.push({type:`message`,text:`Prepared one dose of broad-spectrum antivenom.`,tone:`good`})):t===`scrap_vest`?(n.player.armor.owned.push(`scrap_vest`),n.player.armor.equipped=`scrap_vest`,n.player.armor.condition=100,r.push({type:`message`,text:`Scrap vest assembled and equipped. Damage resistance increased.`,tone:`good`})):t===`rest`?(n.player.conditions.fatigue=0,n.player.hp=Math.min(n.player.maxHp,n.player.hp+8),n.player.conditions.wetness=0,n.timeMinutes=360,r.push({type:`condition`,condition:`fatigue`,active:!1}),r.push({type:`message`,text:`You sleep beneath the lean-to until dawn. Fatigue cleared; health partially restored.`,tone:`good`})):t===`detox`&&(n.player.addictions=[],n.player.conditions.alcoholDependence=Math.floor(n.player.conditions.alcoholDependence/2),n.player.conditions.chemDependence=Math.floor(n.player.conditions.chemDependence/2),r.push({type:`condition`,condition:`addiction`,active:!1}),r.push({type:`message`,text:`A rough detox treatment clears active addictions.`,tone:`good`}));let a=new g(n.rngState);return mt(n,a,r),n.rngState=a.getState(),{state:n,events:r,consumedTurn:!0}}function Lt(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[],i=new g(n.rngState),a=!1;switch(t){case`turn_left`:n.player.direction=(n.player.direction+3)%4;break;case`turn_right`:n.player.direction=(n.player.direction+1)%4;break;case`move_forward`:a=We(n,0,r);break;case`move_backward`:a=We(n,2,r);break;case`strafe_left`:a=We(n,3,r);break;case`strafe_right`:a=We(n,1,r);break;case`fire`:a=Ye(n,i,r);break;case`punch`:a=Je(n,i,r);break;case`interact`:a=Ze(n,r);break;case`reload`:a=tt(n,r);break;case`use_medkit`:a=nt(n,r);break;case`wait`:a=!0,n.player.conditions.fatigue=Math.max(0,n.player.conditions.fatigue-4),r.push({type:`message`,text:`You hold still and listen past the wind.`,tone:`neutral`});break}return a&&mt(n,i,r),n.rngState=i.getState(),{state:n,events:r,consumedTurn:a}}function Rt(e,t){if(e.status!==`playing`)return{state:e,events:[],consumedTurn:!1};let n=N(e),r=[],i=e=>{r.push({type:`message`,text:e,tone:`good`})};switch(t){case`toggle_god`:n.cheats.godMode=!n.cheats.godMode,i(`God mode ${n.cheats.godMode?`enabled`:`disabled`}.`);break;case`toggle_needs`:n.cheats.noNeeds=!n.cheats.noNeeds,n.cheats.noNeeds&&(n.player.water=n.player.maxWater,n.player.food=n.player.maxFood,n.player.conditions.fatigue=0),i(`Frozen needs ${n.cheats.noNeeds?`enabled`:`disabled`}.`);break;case`restore`:n.player.hp=n.player.maxHp,n.player.water=n.player.maxWater,n.player.food=n.player.maxFood,n.player.magazine=n.player.magazineSize,n.player.conditions.fatigue=0,n.player.conditions.wetness=0,n.player.conditions.poisonTurns=0,n.player.conditions.poisonStrength=0,n.player.conditions.disease=null,n.player.conditions.intoxicatedTurns=0,n.player.conditions.stimulantTurns=0,n.player.conditions.medXTurns=0,i(`Vitals, needs, fatigue, conditions, and magazine restored.`);break;case`repair`:n.player.weaponCondition=100,n.player.armor.condition=100,i(`Weapon and armour condition restored to 100%.`);break;case`level_up`:n.player.level+=1;{let e=te(n),t=ne(n);n.player.skillPoints+=e,n.player.perkPoints+=1,n.player.maxHp+=t,n.player.hp=Math.min(n.player.maxHp,n.player.hp+t),i(`Debug level granted. Level ${n.player.level}; ${e} skill points and one perk added.`)}break;case`reveal_map`:n.exploredTiles=n.tiles.flatMap((e,t)=>e.map((e,n)=>`${n},${t}`)),i(`The complete expedition map has been revealed.`);break;case`spawn_ammo`:n.player.reserveAmmo+=24,i(`Spawned 24 pistol rounds.`);break;case`spawn_medkits`:n.player.medkits+=3,i(`Spawned three field dressings.`);break;case`spawn_water`:n.player.inventory.water+=3,i(`Spawned three bottles of clean water.`);break;case`spawn_rations`:n.player.inventory.ration+=3,i(`Spawned three trail rations.`);break;case`spawn_scrap`:n.player.scrap+=10,i(`Spawned ten trade scrap.`);break;case`spawn_caps`:n.player.caps+=100,i(`Spawned 100 bottle caps.`);break;case`spawn_lockpicks`:n.player.inventory.lockpick+=5,i(`Spawned five lockpicks.`);break;case`spawn_electronics`:n.player.inventory.electronics+=3,i(`Spawned three circuit bridges.`);break;case`spawn_survival_aid`:n.player.inventory.stimpak+=3,n.player.inventory.nuka_cola+=3,n.player.inventory.antivenom+=2,n.player.inventory.antibiotics+=2,n.player.inventory.torch+=2,n.player.inventory.whiskey+=2,n.player.inventory.jet+=2,n.player.inventory.med_x+=2,i(`Spawned medical aid, light, drinks, and chems.`);break;case`clear_conditions`:n.player.conditions.poisonTurns=0,n.player.conditions.poisonStrength=0,n.player.conditions.disease=null,n.player.conditions.fatigue=0,n.player.conditions.wetness=0,n.player.addictions=[],n.player.conditions.alcoholDependence=0,n.player.conditions.chemDependence=0,i(`Poison, disease, fatigue, wetness, and addictions cleared.`);break;case`set_night`:n.timeMinutes=1320,i(`World clock set to 22:00.`);break;case`toggle_rain`:n.weather=n.weather.kind===`rain`?{kind:`clear`,turnsRemaining:60,intensity:1}:{kind:`rain`,turnsRemaining:36,intensity:2},i(`Rain ${n.weather.kind===`rain`?`enabled`:`disabled`}.`);break}return{state:n,events:r,consumedTurn:!1}}function zt(e){if(e.player.hasCondenser)return`Return the condenser to the caravan`;let t=e.npcs.find(e=>e.id===`mara-voss`);if(t?.hp===0)return`Mara is dead — recover the condenser for the remaining caravan`;if(t?.hostile===!0)return`Mara is hostile — search east for the stolen condenser`;if(!e.prospectorMet)return`Find the stranded prospectors`;if(!e.questAccepted)return`Ask Mara about the stolen condenser`;let n=e.devices.find(e=>e.kind===`locked_door`);if(n?.locked===!0&&!e.player.hasRelayKey)return`Search Dry Wells for a relay card — or pick the bunker lock`;if(n?.locked===!0)return`Use the relay card at the Ash Basin bunker`;if(!e.discoveredAreas.includes(`buried-relay`))return`Enter the buried relay beyond Ash Basin`;let r=e.devices.find(e=>e.kind===`terminal`);return r!==void 0&&!r.hacked?`Hack the relay-bunker terminal`:`Recover the condenser behind relay security`}function Bt(e){return Ie(e)}var Vt=30,Ht={x:2,z:11},Ut={x:1,z:11},Wt={x:10,z:7},Gt={x:20,z:5},Kt={x:28,z:11},qt={x:29,z:11},Jt={x:14,z:5},Yt={x:23,z:11},Xt={x:8,z:17},Zt={x:26,z:17},Qt={x:18,z:18},$t=[{id:`glasswater-oasis`,kind:`oasis`,name:`GLASSWATER OASIS`,position:Jt},{id:`old-95-span`,kind:`bridge`,name:`OLD 95 SPAN`,position:Yt},{id:`sunbreak-overlook`,kind:`vista`,name:`SUNBREAK OVERLOOK`,position:Qt},{id:`juniper-post`,kind:`settlement`,name:`JUNIPER POST`,position:Xt},{id:`juniper-teepee`,kind:`teepee`,name:`JUNIPER CANVAS LODGE`,position:{x:7,z:16}},{id:`juniper-fire`,kind:`campfire`,name:`JUNIPER COUNCIL FIRE`,position:{x:8,z:18}},{id:`juniper-wreck`,kind:`wreck`,name:`JUNIPER COURIER WRECK`,position:{x:10,z:17}},{id:`coyote-rest`,kind:`settlement`,name:`COYOTE REST`,position:Zt},{id:`coyote-teepee`,kind:`teepee`,name:`COYOTE TRADER LODGE`,position:{x:25,z:18}},{id:`coyote-fire`,kind:`campfire`,name:`COYOTE NIGHT FIRE`,position:{x:27,z:17}},{id:`coyote-wreck`,kind:`wreck`,name:`COYOTE ROADSTER`,position:{x:26,z:16}},{id:`mile-twelve-wreck`,kind:`wreck`,name:`MILE TWELVE SEDAN`,position:{x:12,z:10}},{id:`red-cut-wreck`,kind:`wreck`,name:`RED CUT PICKUP`,position:{x:19,z:12}}],en=[{x:0,z:-1},{x:1,z:0},{x:0,z:1},{x:-1,z:0}],tn=({x:e,z:t})=>`${e},${t}`,nn=(e,t)=>({x:e.x+t.x,z:e.z+t.z});function rn(e,t){return e[t.z]?.[t.x]??`#`}function R(e,t,n){let r=e[t.z];r!==void 0&&(r[t.x]=n)}function an(e,t){R(e,t,`.`)}function on(e){return e.x>=1&&e.x<Vt&&e.z>=1&&e.z<22}function sn(e,t){let n=[{...Ut}],r=new Set([tn(Ut)]);for(an(e,Ut);n.length>0;){let i=n[n.length-1];if(i===void 0)break;let a=en.map(e=>({x:i.x+e.x*2,z:i.z+e.z*2})).filter(e=>on(e)&&!r.has(tn(e)));if(a.length===0){n.pop();continue}let o=a[t.integer(0,a.length-1)];o!==void 0&&(an(e,{x:(i.x+o.x)/2,z:(i.z+o.z)/2}),an(e,o),r.add(tn(o)),n.push(o))}}function cn(e,t){for(let n=1;n<=Vt;n+=1)an(e,{x:n,z:11}),(n<8||n>12&&n<18||n>24||t.chance(.42))&&an(e,{x:n,z:t.chance(.5)?10:12})}function ln(e,t){let n=t.integer(10,14);for(let r=0;r<n;r+=1){let n=t.integer(4,8),r=t.integer(3,6),i=t.integer(2,Math.max(2,Vt-n-1)),a=t.integer(2,Math.max(2,23-r-2));for(let t=a;t<Math.min(22,a+r);t+=1)for(let r=i;r<Math.min(Vt,i+n);r+=1)an(e,{x:r,z:t})}}function un(e,t){return en.filter(n=>rn(e,nn(t,n))!==`#`).length}function dn(e,t){for(let n of[.7,.4,.18])for(let r=2;r<21;r+=1)for(let i=2;i<Vt;i+=1){let a={x:i,z:r};rn(e,a)!==`#`||un(e,a)===0||t.chance(n)&&an(e,a)}}function fn(e){return[Ht,Wt,Gt,Kt,qt,Jt,Yt,Xt,Zt,Qt].some(t=>Math.abs(e.x-t.x)+Math.abs(e.z-t.z)<=2)}function pn(e){gn(e,Jt,3),gn(e,Yt,2),gn(e,Xt,3),gn(e,Zt,3),gn(e,Qt,2);for(let t of[{x:13,z:5},{x:14,z:4},{x:14,z:5},{x:15,z:5},{x:13,z:6},{x:14,z:6},{x:15,z:6}])R(e,t,`~`);for(let t of[8,9,10,12,13,14])R(e,{x:Yt.x,z:t},`~`);R(e,Yt,`=`);for(let t of $t)t.kind!==`oasis`&&t.kind!==`bridge`&&R(e,t.position,`!`);R(e,{x:7,z:18},`z`),R(e,{x:9,z:17},`G`),R(e,{x:28,z:18},`i`),R(e,{x:27,z:19},`C`),R(e,{x:12,z:5},`u`),R(e,{x:18,z:17},`j`)}function mn(e,t){return t.x>=4&&t.x<=Vt-3&&t.z>=3&&t.z<=19&&Math.abs(t.z-11)>1&&rn(e,t)===`.`&&!fn(t)}function hn(e,t){for(let n=0;n<3;n+=1){let n;for(let r=0;r<80&&n===void 0;r+=1){let r={x:t.integer(5,Vt-4),z:t.integer(3,19)};mn(e,r)&&(n=r)}if(n===void 0)continue;let r=t.integer(6,10),i=[{...n}],a=0;for(;i.length>0&&a<r;){let n=t.integer(0,i.length-1),[r]=i.splice(n,1);if(!(r===void 0||!mn(e,r))){R(e,r,`~`),a+=1;for(let n of en){let a=nn(r,n);mn(e,a)&&t.chance(.8)&&i.push(a)}}}}}function gn(e,t,n=1){for(let r=t.z-n;r<=t.z+n;r+=1)for(let i=t.x-n;i<=t.x+n;i+=1)i>=1&&i<=Vt&&r>=1&&r<22&&an(e,{x:i,z:r})}function _n(e,t){let n=new Map([[tn(t),0]]),r=[{...t}];for(;r.length>0;){let t=r.shift();if(t===void 0)break;let i=n.get(tn(t))??0;for(let a of en){let o=nn(t,a);o.x>Vt||rn(e,o)===`#`||n.has(tn(o))||(n.set(tn(o),i+1),r.push(o))}}return n}function vn(e,t,n){for(;t.length>0;){let r=n.integer(0,t.length-1),[i]=t.splice(r,1);if(i!==void 0&&rn(e,i)===`.`)return i}}function yn(e,t,n,r){let i=n.filter(t=>rn(e,t)===`.`).map(e=>({...e}));for(let n of r){let r=vn(e,i,t);r!==void 0&&R(e,r,n)}}function bn(e,t){let n=[..._n(e,Ht).entries()].filter(([,e])=>e>=5).map(([e])=>{let[t=0,n=0]=e.split(`,`).map(Number);return{x:t,z:n}}).filter(t=>rn(e,t)===`.`),r=(e,t)=>n.filter(n=>n.x>=e&&n.x<=t);yn(e,t,r(3,7),[`c`,`c`,`w`,`n`,`b`,`s`,`m`,`U`,`Q`,`I`,`p`,`h`]),yn(e,t,r(8,15),[`t`,`c`,`a`,`g`,`w`,`n`,`b`,`s`,`s`,`l`,`Y`,`V`,`p`,`p`,`h`]),yn(e,t,r(16,23),[`a`,`g`,`r`,`o`,`w`,`b`,`s`,`m`,`e`,`J`,`M`,`H`,`p`,`h`,`h`]),yn(e,t,r(24,27),[`g`,`r`,`r`,`o`,`b`,`s`,`m`,`e`,`A`,`I`,`p`,`h`]);let i=[];for(let[n,a]of[[3,7],[8,15],[16,23],[24,27]]){let o=r(n,a).filter(t=>rn(e,t)===`.`);for(let n=0;n<2;n+=1){let n=vn(e,o,t);n!==void 0&&i.push({position:n,environment:`exterior`})}}return i}function xn(e,t,n,r,i){for(let a=r+1;a<i;a+=1)for(let r=t+1;r<n;r+=1)an(e,{x:r,z:a})}function Sn(e){xn(e,34,45,0,7);for(let t of[1,2,4,5,6])R(e,{x:39,z:t},`#`);return R(e,{x:39,z:3},`D`),R(e,{x:34,z:4},`E`),R(e,{x:43,z:2},`k`),R(e,{x:42,z:5},`L`),R(e,{x:41,z:3},`r`),R(e,{x:43,z:5},`c`),R(e,{x:37,z:2},`b`),R(e,{x:37,z:6},`s`),R(e,{x:36,z:2},`Q`),R(e,{x:42,z:6},`V`),[{position:{x:37,z:5},environment:`interior`},{position:{x:44,z:4},environment:`interior`}]}function Cn(e){xn(e,34,45,8,15);for(let t of[9,10,12])R(e,{x:38,z:t},`#`);for(let t of[11,12,14])R(e,{x:41,z:t},`#`);return R(e,{x:34,z:11},`E`),R(e,{x:40,z:10},`g`),R(e,{x:43,z:13},`o`),R(e,{x:40,z:14},`a`),R(e,{x:44,z:10},`m`),R(e,{x:42,z:14},`s`),R(e,{x:39,z:13},`b`),R(e,{x:44,z:12},`L`),R(e,{x:36,z:14},`J`),R(e,{x:44,z:9},`A`),R(e,{x:36,z:10},`v`),[{position:{x:37,z:13},environment:`interior`},{position:{x:43,z:9},environment:`interior`}]}function wn(e){xn(e,34,46,16,22);for(let t of[17,18,20,21])R(e,{x:40,z:t},`#`);return R(e,{x:34,z:19},`E`),R(e,{x:40,z:19},`S`),R(e,{x:37,z:17},`T`),R(e,{x:38,z:21},`L`),R(e,{x:44,z:19},`f`),R(e,{x:42,z:18},`r`),R(e,{x:43,z:20},`r`),R(e,{x:45,z:18},`o`),R(e,{x:36,z:21},`e`),R(e,{x:37,z:21},`H`),R(e,{x:45,z:21},`I`),[{position:{x:38,z:18},environment:`interior`},{position:{x:44,z:21},environment:`interior`}]}function Tn(){return[{id:`enter-service-cellar`,name:`DRY WELLS SERVICE CELLAR`,position:Wt,destination:{x:35,z:4},destinationDirection:1,destinationEnvironment:`interior`},{id:`exit-service-cellar`,name:`DRY WELLS`,position:{x:34,z:4},destination:{x:10,z:8},destinationDirection:2,destinationEnvironment:`exterior`},{id:`enter-red-mesa-mine`,name:`RED MESA PROSPECT`,position:Gt,destination:{x:35,z:11},destinationDirection:1,destinationEnvironment:`interior`},{id:`exit-red-mesa-mine`,name:`RED MESA`,position:{x:34,z:11},destination:{x:20,z:6},destinationDirection:2,destinationEnvironment:`exterior`},{id:`enter-buried-relay`,name:`BURIED RELAY BUNKER`,position:qt,destination:{x:35,z:19},destinationDirection:1,destinationEnvironment:`interior`},{id:`exit-buried-relay`,name:`ASH BASIN`,position:{x:34,z:19},destination:{x:28,z:11},destinationDirection:3,destinationEnvironment:`exterior`}]}function En(e){return`CND-${(e>>>0).toString(36).toUpperCase().padStart(7,`0`)}`}function Dn(e){let t=e.trim().toUpperCase().replace(/^CND-/,``);if(!/^[0-9A-Z]{1,7}$/.test(t))return;let n=Number.parseInt(t,36);if(!(!Number.isSafeInteger(n)||n<0||n>4294967295))return n>>>0}function On(e){let t=e>>>0,n=new g(t),r=Array.from({length:23},()=>Array.from({length:47},()=>`#`));sn(r,n),cn(r,n),ln(r,n),dn(r,n);for(let e of[Ht,{x:3,z:10},{x:4,z:12},{x:5,z:12},Wt,Gt,Kt,qt])gn(r,e);hn(r,n),pn(r),R(r,{x:1,z:11},`X`),R(r,{x:3,z:10},`q`),R(r,{x:4,z:12},`d`),R(r,{x:5,z:12},`B`),R(r,Wt,`E`),R(r,Gt,`E`),R(r,Kt,`K`),R(r,qt,`E`);let i=bn(r,n),a=[...Sn(r),...Cn(r),...wn(r)];return R(r,Ht,`P`),{id:`cinder-expedition-${t.toString(36)}`,worldName:`MOJAVE WASTELAND`,runCode:En(t),rows:r.map(e=>e.join(``)),interiorZones:[{id:`dry-wells-cellar`,name:`DRY WELLS SERVICE CELLAR`,minX:34,maxX:45,minZ:0,maxZ:7},{id:`red-mesa-mine`,name:`RED MESA PROSPECT`,minX:34,maxX:45,minZ:8,maxZ:15},{id:`buried-relay`,name:`BURIED RELAY BUNKER`,minX:34,maxX:46,minZ:16,maxZ:22}],encounterZones:[{id:`juniper-post`,name:`JUNIPER POST`,level:1,environment:`exterior`,minX:5,maxX:11,minZ:14,maxZ:21},{id:`glasswater-oasis`,name:`GLASSWATER OASIS`,level:2,environment:`exterior`,minX:11,maxX:16,minZ:2,maxZ:8},{id:`red-cut-valley`,name:`RED CUT VALLEY`,level:3,environment:`exterior`,minX:17,maxX:24,minZ:7,maxZ:15},{id:`sunbreak-overlook`,name:`SUNBREAK OVERLOOK`,level:3,environment:`exterior`,minX:16,maxX:21,minZ:16,maxZ:21},{id:`coyote-rest`,name:`COYOTE REST`,level:4,environment:`exterior`,minX:24,maxX:30,minZ:15,maxZ:21},{id:`caravan-flats`,name:`CARAVAN FLATS`,level:1,environment:`exterior`,minX:0,maxX:7,minZ:0,maxZ:22},{id:`dry-wells`,name:`DRY WELLS`,level:2,environment:`exterior`,minX:8,maxX:15,minZ:0,maxZ:22},{id:`red-mesa`,name:`RED MESA`,level:3,environment:`exterior`,minX:16,maxX:23,minZ:0,maxZ:22},{id:`ash-basin`,name:`ASH BASIN`,level:4,environment:`exterior`,minX:24,maxX:33,minZ:0,maxZ:22},{id:`dry-wells-cellar`,name:`DRY WELLS CELLAR`,level:2,environment:`interior`,minX:34,maxX:45,minZ:0,maxZ:7},{id:`red-mesa-mine`,name:`RED MESA PROSPECT`,level:4,environment:`interior`,minX:34,maxX:45,minZ:8,maxZ:15},{id:`buried-relay`,name:`BURIED RELAY`,level:5,environment:`interior`,minX:34,maxX:46,minZ:16,maxZ:22}],spawnPoints:[...i,...a],transitions:Tn(),landmarks:$t.map(e=>({...e,position:{...e.position}}))}}var kn=1e3,An=1001,jn=1002,Mn=1003,Nn=1004,Pn=1005,Fn=1006,In=1007,Ln=1008,Rn=1009,zn=1010,Bn=1011,Vn=1012,Hn=1013,Un=1014,Wn=1015,Gn=1016,Kn=1017,qn=1018,Jn=1020,Yn=35902,Xn=35899,Zn=1021,Qn=1022,$n=1023,er=1026,tr=1027,nr=1028,rr=1029,ir=1030,ar=1031,or=1033,sr=33776,cr=33777,lr=33778,ur=33779,dr=35840,fr=35841,pr=35842,mr=35843,hr=36196,gr=37492,_r=37496,vr=37488,yr=37489,br=37490,xr=37491,Sr=37808,Cr=37809,wr=37810,Tr=37811,Er=37812,Dr=37813,Or=37814,kr=37815,Ar=37816,jr=37817,Mr=37818,Nr=37819,Pr=37820,Fr=37821,Ir=36492,Lr=36494,Rr=36495,zr=36283,Br=36284,Vr=36285,Hr=36286,Ur=2300,Wr=2301,Gr=2302,Kr=2303,qr=2400,Jr=2401,Yr=2402,Xr=3200,Zr=3201,Qr=`srgb`,$r=`srgb-linear`,ei=`linear`,ti=`srgb`,ni=7680,ri=35044,ii=35048,ai=2e3;function oi(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function si(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function ci(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function li(){let e=ci(`canvas`);return e.style.display=`block`,e}var ui={};function di(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function fi(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=fi(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=fi(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function pi(...e){let t=e.join(` `);t in ui||(ui[t]=!0,z(...e))}function mi(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var hi={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},gi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},_i=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),vi=1234567,yi=Math.PI/180,bi=180/Math.PI;function xi(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(_i[e&255]+_i[e>>8&255]+_i[e>>16&255]+_i[e>>24&255]+`-`+_i[t&255]+_i[t>>8&255]+`-`+_i[t>>16&15|64]+_i[t>>24&255]+`-`+_i[n&63|128]+_i[n>>8&255]+`-`+_i[n>>16&255]+_i[n>>24&255]+_i[r&255]+_i[r>>8&255]+_i[r>>16&255]+_i[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function Si(e,t){return(e%t+t)%t}function Ci(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function wi(e,t,n){return e===t?0:(n-e)/(t-e)}function Ti(e,t,n){return(1-n)*e+n*t}function Ei(e,t,n,r){return Ti(e,t,1-Math.exp(-n*r))}function Di(e,t=1){return t-Math.abs(Si(e,t*2)-t)}function Oi(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function ki(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Ai(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ji(e,t){return e+Math.random()*(t-e)}function Mi(e){return e*(.5-Math.random())}function Ni(e){e!==void 0&&(vi=e);let t=vi+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Pi(e){return e*yi}function Fi(e){return e*bi}function Ii(e){return(e&e-1)==0&&e!==0}function Li(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Ri(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function zi(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:z(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Bi(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Vi(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Hi={DEG2RAD:yi,RAD2DEG:bi,generateUUID:xi,clamp:V,euclideanModulo:Si,mapLinear:Ci,inverseLerp:wi,lerp:Ti,damp:Ei,pingpong:Di,smoothstep:Oi,smootherstep:ki,randInt:Ai,randFloat:ji,randFloatSpread:Mi,seededRandom:Ni,degToRad:Pi,radToDeg:Fi,isPowerOfTwo:Ii,ceilPowerOfTwo:Li,floorPowerOfTwo:Ri,setQuaternionFromProperEuler:zi,normalize:Vi,denormalize:Bi},H=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ui=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gi.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gi.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wi.copy(this).projectOnVector(e),this.sub(Wi)}reflect(e){return this.sub(Wi.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Wi=new U,Gi=new Ui,W=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return pi(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Ki.makeScale(e,t)),this}rotate(e){return pi(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Ki.makeRotation(-e)),this}translate(e,t){return pi(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Ki.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ki=new W,qi=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ji=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yi(){let e={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Xi(e.r),e.g=Xi(e.g),e.b=Xi(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Zi(e.r),e.g=Zi(e.g),e.b=Zi(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ei:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return pi(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return pi(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[$r]:{primaries:t,whitePoint:r,transfer:ei,toXYZ:qi,fromXYZ:Ji,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Qr},outputColorSpaceConfig:{drawingBufferColorSpace:Qr}},[Qr]:{primaries:t,whitePoint:r,transfer:ti,toXYZ:qi,fromXYZ:Ji,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Qr}}}),e}var G=Yi();function Xi(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Zi(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Qi,$i=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Qi===void 0&&(Qi=ci(`canvas`)),Qi.width=e.width,Qi.height=e.height;let t=Qi.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Qi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=ci(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Xi(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Xi(t[e]/255)*255):t[e]=Xi(t[e]);return{data:t,width:e.width,height:e.height}}else return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},ea=0,ta=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ea++}),this.uuid=xi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(na(r[t].image)):e.push(na(r[t]))}else e=na(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function na(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?$i.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var ra=0,ia=new U,aa=class e extends gi{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=An,i=An,a=Fn,o=Ln,s=$n,c=Rn,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ra++}),this.uuid=xi(),this.name=``,this.source=new ta(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ia).x}get height(){return this.source.getSize(ia).y}get depth(){return this.source.getSize(ia).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kn:e.x-=Math.floor(e.x);break;case An:e.x=e.x<0?0:1;break;case jn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kn:e.y-=Math.floor(e.y);break;case An:e.y=e.y<0?0:1;break;case jn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};aa.DEFAULT_IMAGE=null,aa.DEFAULT_MAPPING=300,aa.DEFAULT_ANISOTROPY=1;var oa=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},sa=class extends gi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new oa(0,0,e,t),this.scissorTest=!1,this.viewport=new oa(0,0,e,t),this.textures=[];let r=new aa({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new ta(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},ca=class extends sa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},la=class extends aa{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},ua=class extends aa{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},da=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/fa.setFromMatrixColumn(e,0).length(),i=1/fa.setFromMatrixColumn(e,1).length(),a=1/fa.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ma,e,ha)}lookAt(e,t,n){let r=this.elements;return va.subVectors(e,t),va.lengthSq()===0&&(va.z=1),va.normalize(),ga.crossVectors(n,va),ga.lengthSq()===0&&(Math.abs(n.z)===1?va.x+=1e-4:va.z+=1e-4,va.normalize(),ga.crossVectors(n,va)),ga.normalize(),_a.crossVectors(va,ga),r[0]=ga.x,r[4]=_a.x,r[8]=va.x,r[1]=ga.y,r[5]=_a.y,r[9]=va.y,r[2]=ga.z,r[6]=_a.z,r[10]=va.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],ee=r[2],k=r[6],te=r[10],ne=r[14],A=r[3],j=r[7],re=r[11],M=r[15];return i[0]=a*x+o*T+s*ee+c*A,i[4]=a*S+o*E+s*k+c*j,i[8]=a*C+o*D+s*te+c*re,i[12]=a*w+o*O+s*ne+c*M,i[1]=l*x+u*T+d*ee+f*A,i[5]=l*S+u*E+d*k+f*j,i[9]=l*C+u*D+d*te+f*re,i[13]=l*w+u*O+d*ne+f*M,i[2]=p*x+m*T+h*ee+g*A,i[6]=p*S+m*E+h*k+g*j,i[10]=p*C+m*D+h*te+g*re,i[14]=p*w+m*O+h*ne+g*M,i[3]=_*x+v*T+y*ee+b*A,i[7]=_*S+v*E+y*k+b*j,i[11]=_*C+v*D+y*te+b*re,i[15]=_*w+v*O+y*ne+b*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,ee=_*O-v*D+y*E+b*T-x*w+S*C;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/ee;return e[0]=(o*O-s*D+c*E)*k,e[1]=(r*D-n*O-i*E)*k,e[2]=(m*S-h*x+g*b)*k,e[3]=(d*x-u*S-f*b)*k,e[4]=(s*T-a*O-c*w)*k,e[5]=(t*O-r*T+i*w)*k,e[6]=(h*y-p*S-g*v)*k,e[7]=(l*S-d*y+f*v)*k,e[8]=(a*D-o*T+c*C)*k,e[9]=(n*T-t*D-i*C)*k,e[10]=(p*x-m*y+g*_)*k,e[11]=(u*y-l*x-f*_)*k,e[12]=(o*w-a*E-s*C)*k,e[13]=(t*E-n*w+r*C)*k,e[14]=(m*v-p*b-h*_)*k,e[15]=(l*b-u*v+d*_)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=fa.set(r[0],r[1],r[2]).length(),o=fa.set(r[4],r[5],r[6]).length(),s=fa.set(r[8],r[9],r[10]).length();i<0&&(a=-a),pa.copy(this);let c=1/a,l=1/o,u=1/s;return pa.elements[0]*=c,pa.elements[1]*=c,pa.elements[2]*=c,pa.elements[4]*=l,pa.elements[5]*=l,pa.elements[6]*=l,pa.elements[8]*=u,pa.elements[9]*=u,pa.elements[10]*=u,t.setFromRotationMatrix(pa),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=ai,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ai,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},fa=new U,pa=new da,ma=new U(0,0,0),ha=new U(1,1,1),ga=new U,_a=new U,va=new U,ya=new da,ba=new Ui,xa=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ya.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ya,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ba.setFromEuler(this),this.setFromQuaternion(ba,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xa.DEFAULT_ORDER=`XYZ`;var Sa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},Ca=0,wa=new U,Ta=new Ui,Ea=new da,Da=new U,Oa=new U,ka=new U,Aa=new Ui,ja=new U(1,0,0),Ma=new U(0,1,0),Na=new U(0,0,1),Pa={type:`added`},Fa={type:`removed`},Ia={type:`childadded`,child:null},La={type:`childremoved`,child:null},Ra=class e extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ca++}),this.uuid=xi(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new xa,r=new Ui,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new da},normalMatrix:{value:new W}}),this.matrix=new da,this.matrixWorld=new da,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ta.setFromAxisAngle(e,t),this.quaternion.multiply(Ta),this}rotateOnWorldAxis(e,t){return Ta.setFromAxisAngle(e,t),this.quaternion.premultiply(Ta),this}rotateX(e){return this.rotateOnAxis(ja,e)}rotateY(e){return this.rotateOnAxis(Ma,e)}rotateZ(e){return this.rotateOnAxis(Na,e)}translateOnAxis(e,t){return wa.copy(e).applyQuaternion(this.quaternion),this.position.add(wa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ja,e)}translateY(e){return this.translateOnAxis(Ma,e)}translateZ(e){return this.translateOnAxis(Na,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ea.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Da.copy(e):Da.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Oa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ea.lookAt(Oa,Da,this.up):Ea.lookAt(Da,Oa,this.up),this.quaternion.setFromRotationMatrix(Ea),r&&(Ea.extractRotation(r.matrixWorld),Ta.setFromRotationMatrix(Ea),this.quaternion.premultiply(Ta.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pa),Ia.child=e,this.dispatchEvent(Ia),Ia.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fa),La.child=e,this.dispatchEvent(La),La.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ea.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ea.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ea),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pa),Ia.child=e,this.dispatchEvent(Ia),Ia.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oa,e,ka),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oa,Aa,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Ra.DEFAULT_UP=new U(0,1,0),Ra.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ra.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var za=class extends Ra{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Ba={type:`move`},Va=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new za,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new za,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new za,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ba)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new za;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ha={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ua={h:0,s:0,l:0},Wa={h:0,s:0,l:0};function Ga(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var K=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qr){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,G.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=G.workingColorSpace){return this.r=e,this.g=t,this.b=n,G.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=G.workingColorSpace){if(e=Si(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ga(i,r,e+1/3),this.g=Ga(i,r,e),this.b=Ga(i,r,e-1/3)}return G.colorSpaceToWorking(this,r),this}setStyle(e,t=Qr){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qr){let n=Ha[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}copyLinearToSRGB(e){return this.r=Zi(e.r),this.g=Zi(e.g),this.b=Zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qr){return G.workingToColorSpace(Ka.copy(this),e),Math.round(V(Ka.r*255,0,255))*65536+Math.round(V(Ka.g*255,0,255))*256+Math.round(V(Ka.b*255,0,255))}getHexString(e=Qr){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=G.workingColorSpace){G.workingToColorSpace(Ka.copy(this),t);let n=Ka.r,r=Ka.g,i=Ka.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=G.workingColorSpace){return G.workingToColorSpace(Ka.copy(this),t),e.r=Ka.r,e.g=Ka.g,e.b=Ka.b,e}getStyle(e=Qr){G.workingToColorSpace(Ka.copy(this),e);let t=Ka.r,n=Ka.g,r=Ka.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Ua),this.setHSL(Ua.h+e,Ua.s+t,Ua.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ua),e.getHSL(Wa);let n=Ti(Ua.h,Wa.h,t),r=Ti(Ua.s,Wa.s,t),i=Ti(Ua.l,Wa.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ka=new K;K.NAMES=Ha;var qa=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new K(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ja=class extends Ra{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xa,this.environmentIntensity=1,this.environmentRotation=new xa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ya=new U,Xa=new U,Za=new U,Qa=new U,$a=new U,eo=new U,to=new U,no=new U,ro=new U,io=new U,ao=new oa,oo=new oa,so=new oa,co=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ya.subVectors(e,t),r.cross(Ya);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Ya.subVectors(r,t),Xa.subVectors(n,t),Za.subVectors(e,t);let a=Ya.dot(Ya),o=Ya.dot(Xa),s=Ya.dot(Za),c=Xa.dot(Xa),l=Xa.dot(Za),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Qa)!==null&&Qa.x>=0&&Qa.y>=0&&Qa.x+Qa.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Qa)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Qa.x),s.addScaledVector(a,Qa.y),s.addScaledVector(o,Qa.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return ao.setScalar(0),oo.setScalar(0),so.setScalar(0),ao.fromBufferAttribute(e,t),oo.fromBufferAttribute(e,n),so.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ao,i.x),a.addScaledVector(oo,i.y),a.addScaledVector(so,i.z),a}static isFrontFacing(e,t,n,r){return Ya.subVectors(n,t),Xa.subVectors(e,t),Ya.cross(Xa).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ya.subVectors(this.c,this.b),Xa.subVectors(this.a,this.b),Ya.cross(Xa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;$a.subVectors(r,n),eo.subVectors(i,n),no.subVectors(e,n);let s=$a.dot(no),c=eo.dot(no);if(s<=0&&c<=0)return t.copy(n);ro.subVectors(e,r);let l=$a.dot(ro),u=eo.dot(ro);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector($a,a);io.subVectors(e,i);let f=$a.dot(io),p=eo.dot(io);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(eo,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return to.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(to,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector($a,a).addScaledVector(eo,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},lo=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fo.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fo.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=fo.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,fo):fo.fromBufferAttribute(r,t),fo.applyMatrix4(e.matrixWorld),this.expandByPoint(fo);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),po.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),po.copy(e.boundingBox)),po.applyMatrix4(e.matrixWorld),this.union(po)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fo),fo.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bo),xo.subVectors(this.max,bo),mo.subVectors(e.a,bo),ho.subVectors(e.b,bo),go.subVectors(e.c,bo),_o.subVectors(ho,mo),vo.subVectors(go,ho),yo.subVectors(mo,go);let t=[0,-_o.z,_o.y,0,-vo.z,vo.y,0,-yo.z,yo.y,_o.z,0,-_o.x,vo.z,0,-vo.x,yo.z,0,-yo.x,-_o.y,_o.x,0,-vo.y,vo.x,0,-yo.y,yo.x,0];return!wo(t,mo,ho,go,xo)||(t=[1,0,0,0,1,0,0,0,1],!wo(t,mo,ho,go,xo))?!1:(So.crossVectors(_o,vo),t=[So.x,So.y,So.z],wo(t,mo,ho,go,xo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fo).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fo).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(uo[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),uo[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),uo[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),uo[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),uo[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),uo[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),uo[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),uo[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(uo),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},uo=[new U,new U,new U,new U,new U,new U,new U,new U],fo=new U,po=new lo,mo=new U,ho=new U,go=new U,_o=new U,vo=new U,yo=new U,bo=new U,xo=new U,So=new U,Co=new U;function wo(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Co.fromArray(e,a);let o=i.x*Math.abs(Co.x)+i.y*Math.abs(Co.y)+i.z*Math.abs(Co.z),s=t.dot(Co),c=n.dot(Co),l=r.dot(Co);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var To=new U,Eo=new H,Do=0,Oo=class extends gi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Do++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=ri,this.updateRanges=[],this.gpuType=Wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Eo.fromBufferAttribute(this,t),Eo.applyMatrix3(e),this.setXY(t,Eo.x,Eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)To.fromBufferAttribute(this,t),To.applyMatrix3(e),this.setXYZ(t,To.x,To.y,To.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)To.fromBufferAttribute(this,t),To.applyMatrix4(e),this.setXYZ(t,To.x,To.y,To.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)To.fromBufferAttribute(this,t),To.applyNormalMatrix(e),this.setXYZ(t,To.x,To.y,To.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)To.fromBufferAttribute(this,t),To.transformDirection(e),this.setXYZ(t,To.x,To.y,To.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vi(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vi(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vi(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vi(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vi(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vi(t,this.array),n=Vi(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Vi(t,this.array),n=Vi(n,this.array),r=Vi(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Vi(t,this.array),n=Vi(n,this.array),r=Vi(r,this.array),i=Vi(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},ko=class extends Oo{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Ao=class extends Oo{constructor(e,t,n){super(new Uint32Array(e),t,n)}},jo=class extends Oo{constructor(e,t,n){super(new Float32Array(e),t,n)}},Mo=new lo,No=new U,Po=new U,Fo=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Mo.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;No.subVectors(e,this.center);let t=No.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(No,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(No.copy(e.center).add(Po)),this.expandByPoint(No.copy(e.center).sub(Po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Io=0,Lo=new da,Ro=new Ra,zo=new U,Bo=new lo,Vo=new lo,Ho=new U,Uo=class e extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Io++}),this.uuid=xi(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(oi(e)?Ao:ko)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new W().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Lo.makeRotationFromQuaternion(e),this.applyMatrix4(Lo),this}rotateX(e){return Lo.makeRotationX(e),this.applyMatrix4(Lo),this}rotateY(e){return Lo.makeRotationY(e),this.applyMatrix4(Lo),this}rotateZ(e){return Lo.makeRotationZ(e),this.applyMatrix4(Lo),this}translate(e,t,n){return Lo.makeTranslation(e,t,n),this.applyMatrix4(Lo),this}scale(e,t,n){return Lo.makeScale(e,t,n),this.applyMatrix4(Lo),this}lookAt(e){return Ro.lookAt(e),Ro.updateMatrix(),this.applyMatrix4(Ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zo).negate(),this.translate(zo.x,zo.y,zo.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new jo(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lo);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Bo.setFromBufferAttribute(n),this.morphTargetsRelative?(Ho.addVectors(this.boundingBox.min,Bo.min),this.boundingBox.expandByPoint(Ho),Ho.addVectors(this.boundingBox.max,Bo.max),this.boundingBox.expandByPoint(Ho)):(this.boundingBox.expandByPoint(Bo.min),this.boundingBox.expandByPoint(Bo.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fo);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(Bo.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Vo.setFromBufferAttribute(n),this.morphTargetsRelative?(Ho.addVectors(Bo.min,Vo.min),Bo.expandByPoint(Ho),Ho.addVectors(Bo.max,Vo.max),Bo.expandByPoint(Ho)):(Bo.expandByPoint(Vo.min),Bo.expandByPoint(Vo.max))}Bo.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Ho.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Ho));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Ho.fromBufferAttribute(a,t),o&&(zo.fromBufferAttribute(e,t),Ho.add(zo)),r=Math.max(r,n.distanceToSquared(Ho))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Oo(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Oo(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ho.fromBufferAttribute(e,t),Ho.normalize(),e.setXYZ(t,Ho.x,Ho.y,Ho.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Oo(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Wo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=ri,this.updateRanges=[],this.version=0,this.uuid=xi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Go=new U,Ko=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Go.fromBufferAttribute(this,t),Go.applyMatrix4(e),this.setXYZ(t,Go.x,Go.y,Go.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Go.fromBufferAttribute(this,t),Go.applyNormalMatrix(e),this.setXYZ(t,Go.x,Go.y,Go.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Go.fromBufferAttribute(this,t),Go.transformDirection(e),this.setXYZ(t,Go.x,Go.y,Go.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vi(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Vi(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Vi(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Vi(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Vi(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Vi(t,this.array),n=Vi(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Vi(t,this.array),n=Vi(n,this.array),r=Vi(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Vi(t,this.array),n=Vi(n,this.array),r=Vi(r,this.array),i=Vi(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){di(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Oo(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){di(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},qo=0,Jo=class extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qo++}),this.uuid=xi(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new K(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new K().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors==`number`?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Yo=class extends Jo{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new K(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Xo,Zo=new U,Qo=new U,$o=new U,es=new H,ts=new H,ns=new da,rs=new U,is=new U,as=new U,os=new H,ss=new H,cs=new H,ls=class extends Ra{constructor(e=new Yo){if(super(),this.isSprite=!0,this.type=`Sprite`,Xo===void 0){Xo=new Uo;let e=new Wo(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Xo.setIndex([0,1,2,0,2,3]),Xo.setAttribute(`position`,new Ko(e,3,0,!1)),Xo.setAttribute(`uv`,new Ko(e,2,3,!1))}this.geometry=Xo,this.material=e,this.center=new H(.5,.5),this.count=1}raycast(e,t){e.camera===null&&B(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Qo.setFromMatrixScale(this.matrixWorld),ns.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),$o.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qo.multiplyScalar(-$o.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;us(rs.set(-.5,-.5,0),$o,a,Qo,r,i),us(is.set(.5,-.5,0),$o,a,Qo,r,i),us(as.set(.5,.5,0),$o,a,Qo,r,i),os.set(0,0),ss.set(1,0),cs.set(1,1);let o=e.ray.intersectTriangle(rs,is,as,!1,Zo);if(o===null&&(us(is.set(-.5,.5,0),$o,a,Qo,r,i),ss.set(0,1),o=e.ray.intersectTriangle(rs,as,is,!1,Zo),o===null))return;let s=e.ray.origin.distanceTo(Zo);s<e.near||s>e.far||t.push({distance:s,point:Zo.clone(),uv:co.getInterpolation(Zo,rs,is,as,os,ss,cs,new H),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function us(e,t,n,r,i,a){es.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?ts.copy(es):(ts.x=a*es.x-i*es.y,ts.y=i*es.x+a*es.y),e.copy(t),e.x+=ts.x,e.y+=ts.y,e.applyMatrix4(ns)}var ds=new U,fs=new U,ps=new U,ms=new U,hs=new U,gs=new U,_s=new U,vs=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ds)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ds.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ds.copy(this.origin).addScaledVector(this.direction,t),ds.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){fs.copy(e).add(t).multiplyScalar(.5),ps.copy(t).sub(e).normalize(),ms.copy(this.origin).sub(fs);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ps),o=ms.dot(this.direction),s=-ms.dot(ps),c=ms.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(fs).addScaledVector(ps,d),f}intersectSphere(e,t){ds.subVectors(e.center,this.origin);let n=ds.dot(this.direction),r=ds.dot(ds)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ds)!==null}intersectTriangle(e,t,n,r,i){hs.subVectors(t,e),gs.subVectors(n,e),_s.crossVectors(hs,gs);let a=this.direction.dot(_s),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ms.subVectors(this.origin,e);let s=o*this.direction.dot(gs.crossVectors(ms,gs));if(s<0)return null;let c=o*this.direction.dot(hs.cross(ms));if(c<0||s+c>a)return null;let l=-o*ms.dot(_s);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ys=class extends Jo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new K(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xa,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},bs=new da,xs=new vs,Ss=new Fo,Cs=new U,ws=new U,Ts=new U,Es=new U,Ds=new U,Os=new U,ks=new U,As=new U,q=class extends Ra{constructor(e=new Uo,t=new ys){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Os.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ds.fromBufferAttribute(s,e),a?Os.addScaledVector(Ds,r):Os.addScaledVector(Ds.sub(t),r))}t.add(Os)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ss.copy(n.boundingSphere),Ss.applyMatrix4(i),xs.copy(e.ray).recast(e.near),!(Ss.containsPoint(xs.origin)===!1&&(xs.intersectSphere(Ss,Cs)===null||xs.origin.distanceToSquared(Cs)>(e.far-e.near)**2))&&(bs.copy(i).invert(),xs.copy(e.ray).applyMatrix4(bs),!(n.boundingBox!==null&&xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xs)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ms(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ms(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ms(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ms(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function js(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;As.copy(s),As.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(As);return l<n.near||l>n.far?null:{distance:l,point:As.clone(),object:e}}function Ms(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ws),e.getVertexPosition(c,Ts),e.getVertexPosition(l,Es);let u=js(e,t,n,r,ws,Ts,Es,ks);if(u){let e=new U;co.getBarycoord(ks,ws,Ts,Es,e),i&&(u.uv=co.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=co.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=co.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};co.getNormal(ws,Ts,Es,t.normal),u.face=t,u.barycoord=e}return u}var Ns=class extends aa{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Mn,l=Mn,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ps=new U,Fs=new U,Is=new W,Ls=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ps.subVectors(n,t).cross(Fs.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ps),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Is.getNormalMatrix(e),r=this.coplanarPoint(Ps).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Rs=new Fo,zs=new H(.5,.5),Bs=new U,Vs=class{constructor(e=new Ls,t=new Ls,n=new Ls,r=new Ls,i=new Ls,a=new Ls){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ai,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rs)}intersectsSprite(e){return Rs.center.set(0,0,0),Rs.radius=.7071067811865476+zs.distanceTo(e.center),Rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rs)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Bs.x=r.normal.x>0?e.max.x:e.min.x,Bs.y=r.normal.y>0?e.max.y:e.min.y,Bs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Hs=class extends Jo{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new K(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Us=new da,Ws=new vs,Gs=new Fo,Ks=new U,qs=class extends Ra{constructor(e=new Uo,t=new Hs){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(r),Gs.radius+=i,e.ray.intersectsSphere(Gs)===!1)return;Us.copy(r).invert(),Ws.copy(e.ray).applyMatrix4(Us);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ks.fromBufferAttribute(l,n),Js(Ks,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ks.fromBufferAttribute(l,a),Js(Ks,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Js(e,t,n,r,i,a,o){let s=Ws.distanceSqToPoint(e);if(s<n){let n=new U;Ws.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ys=class extends aa{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Xs=class extends aa{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Zs=class extends aa{constructor(e,t,n=Un,r,i,a,o=Mn,s=Mn,c,l=er,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ta(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Qs=class extends Zs{constructor(e,t=Un,n=301,r,i,a=Mn,o=Mn,s,c=er){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},$s=class extends aa{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ec=class e extends Uo{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new jo(c,3)),this.setAttribute(`normal`,new jo(l,3)),this.setAttribute(`uv`,new jo(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},tc=class e extends Uo{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new U,l=new H;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new jo(a,3)),this.setAttribute(`normal`,new jo(o,3)),this.setAttribute(`uv`,new jo(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},nc=class e extends Uo{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new jo(u,3)),this.setAttribute(`normal`,new jo(d,3)),this.setAttribute(`uv`,new jo(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},rc=class e extends nc{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ic=class e extends Uo{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new jo(i,3)),this.setAttribute(`normal`,new jo(i.slice(),3)),this.setAttribute(`uv`,new jo(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new U,r=new U,i=new U;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new U;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new U;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new U,t=new U,n=new U,r=new U,o=new H,s=new H,c=new H;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},ac=class e extends ic{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},oc=class e extends Uo{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new jo(p,3)),this.setAttribute(`normal`,new jo(m,3)),this.setAttribute(`uv`,new jo(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},sc=class e extends Uo{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new jo(p,3)),this.setAttribute(`normal`,new jo(m,3)),this.setAttribute(`uv`,new jo(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function cc(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(uc(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i))if(uc(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice();else t[n][r]=i}}return t}function lc(e){let t={};for(let n=0;n<e.length;n++){let r=cc(e[n]);for(let e in r)t[e]=r[e]}return t}function uc(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function dc(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function fc(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:G.workingColorSpace}var pc={clone:cc,merge:lc},mc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,gc=class extends Jo{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mc,this.fragmentShader=hc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cc(e.uniforms),this.uniformsGroups=dc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new K().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new oa().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new da().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},_c=class extends gc{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},vc=class extends Jo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new K(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new K(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xa,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},yc=class extends Jo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Xr,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},bc=class extends Jo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function xc(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var Sc=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Cc=class extends Sc{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qr,endingEnd:qr}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Jr:i=e,o=2*t-n;break;case Yr:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Jr:a=e,s=2*n-t;break;case Yr:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},wc=class extends Sc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Tc=class extends Sc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ec=class extends Sc{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},Dc=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=xc(t,this.TimeBufferType),this.values=xc(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xc(e.times,Array),values:xc(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Tc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new wc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Cc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ec(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ur:t=this.InterpolantFactoryMethodDiscrete;break;case Wr:t=this.InterpolantFactoryMethodLinear;break;case Gr:t=this.InterpolantFactoryMethodSmooth;break;case Kr:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ur;case this.InterpolantFactoryMethodLinear:return Wr;case this.InterpolantFactoryMethodSmooth:return Gr;case this.InterpolantFactoryMethodBezier:return Kr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&si(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Gr,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Dc.prototype.ValueTypeName=``,Dc.prototype.TimeBufferType=Float32Array,Dc.prototype.ValueBufferType=Float32Array,Dc.prototype.DefaultInterpolation=Wr;var Oc=class extends Dc{constructor(e,t,n){super(e,t,n)}};Oc.prototype.ValueTypeName=`bool`,Oc.prototype.ValueBufferType=Array,Oc.prototype.DefaultInterpolation=Ur,Oc.prototype.InterpolantFactoryMethodLinear=void 0,Oc.prototype.InterpolantFactoryMethodSmooth=void 0;var kc=class extends Dc{constructor(e,t,n,r){super(e,t,n,r)}};kc.prototype.ValueTypeName=`color`;var Ac=class extends Dc{constructor(e,t,n,r){super(e,t,n,r)}};Ac.prototype.ValueTypeName=`number`;var jc=class extends Sc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ui.slerpFlat(i,0,a,c-o,a,c,s);return i}},Mc=class extends Dc{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new jc(this.times,this.values,this.getValueSize(),e)}};Mc.prototype.ValueTypeName=`quaternion`,Mc.prototype.InterpolantFactoryMethodSmooth=void 0;var Nc=class extends Dc{constructor(e,t,n){super(e,t,n)}};Nc.prototype.ValueTypeName=`string`,Nc.prototype.ValueBufferType=Array,Nc.prototype.DefaultInterpolation=Ur,Nc.prototype.InterpolantFactoryMethodLinear=void 0,Nc.prototype.InterpolantFactoryMethodSmooth=void 0;var Pc=class extends Dc{constructor(e,t,n,r){super(e,t,n,r)}};Pc.prototype.ValueTypeName=`vector`;var Fc=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Ic=class{constructor(e){this.manager=e===void 0?Fc:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ic.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Lc=class extends Ra{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new K(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Rc=class extends Lc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Ra.DEFAULT_UP),this.updateMatrix(),this.groundColor=new K(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},zc=new da,Bc=new U,Vc=new U,Hc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new da,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vs,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new oa(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Bc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bc),Vc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vc),t.updateMatrixWorld(),zc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(zc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Uc=new U,Wc=new Ui,Gc=new U,Kc=class extends Ra{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new da,this.projectionMatrix=new da,this.projectionMatrixInverse=new da,this.coordinateSystem=ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Uc,Wc,Gc),Gc.x===1&&Gc.y===1&&Gc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uc,Wc,Gc.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Uc,Wc,Gc),Gc.x===1&&Gc.y===1&&Gc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Uc,Wc,Gc.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qc=new U,Jc=new H,Yc=new H,Xc=class extends Kc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=bi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(yi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bi*2*Math.atan(Math.tan(yi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qc.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qc.x,qc.y).multiplyScalar(-e/qc.z),qc.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qc.x,qc.y).multiplyScalar(-e/qc.z)}getViewSize(e,t){return this.getViewBounds(e,Jc,Yc),t.subVectors(Yc,Jc)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(yi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Zc=class extends Hc{constructor(){super(new Xc(90,1,.5,500)),this.isPointLightShadow=!0}},Qc=class extends Lc{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Zc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},$c=class extends Kc{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},el=class extends Hc{constructor(){super(new $c(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},tl=class extends Lc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Ra.DEFAULT_UP),this.updateMatrix(),this.target=new Ra,this.shadow=new el}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},nl=class extends Lc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},rl=-90,il=1,al=class extends Ra{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Xc(rl,il,e,t);r.layers=this.layers,this.add(r);let i=new Xc(rl,il,e,t);i.layers=this.layers,this.add(i);let a=new Xc(rl,il,e,t);a.layers=this.layers,this.add(a);let o=new Xc(rl,il,e,t);o.layers=this.layers,this.add(o);let s=new Xc(rl,il,e,t);s.layers=this.layers,this.add(s);let c=new Xc(rl,il,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ol=class extends Xc{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},sl=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=cl.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function cl(){this._document.hidden===!1&&this.reset()}var ll=`\\[\\]\\.:\\/`,ul=RegExp(`[\\[\\]\\.:\\/]`,`g`),dl=`[^\\[\\]\\.:\\/]`,fl=`[^`+ll.replace(`\\.`,``)+`]`,pl=`((?:WC+[\\/:])*)`.replace(`WC`,dl),ml=`(WCOD+)?`.replace(`WCOD`,fl),hl=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,dl),gl=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,dl),_l=RegExp(`^`+pl+ml+hl+gl+`$`),vl=[`material`,`materials`,`bones`,`map`],yl=class{constructor(e,t,n){let r=n||bl.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},bl=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(ul,``)}static parseTrackName(e){let t=_l.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);vl.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bl.Composite=yl,bl.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},bl.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},bl.prototype.GetterByBindingType=[bl.prototype._getValue_direct,bl.prototype._getValue_array,bl.prototype._getValue_arrayElement,bl.prototype._getValue_toArray],bl.prototype.SetterByBindingTypeAndVersioning=[[bl.prototype._setValue_direct,bl.prototype._setValue_direct_setNeedsUpdate,bl.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bl.prototype._setValue_array,bl.prototype._setValue_array_setNeedsUpdate,bl.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bl.prototype._setValue_arrayElement,bl.prototype._setValue_arrayElement_setNeedsUpdate,bl.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bl.prototype._setValue_fromArray,bl.prototype._setValue_fromArray_setNeedsUpdate,bl.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var xl=new da,Sl=class{constructor(e,t,n=0,r=1/0){this.ray=new vs(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Sa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):B(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return xl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xl),this}intersectObject(e,t=!0,n=[]){return wl(e,this,n,t),n.sort(Cl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)wl(e[r],this,n,t);return n.sort(Cl),n}};function Cl(e,t){return e.distance-t.distance}function wl(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)wl(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Tl(e,t,n,r){let i=El(r);switch(n){case Zn:return e*t;case nr:return e*t/i.components*i.byteLength;case rr:return e*t/i.components*i.byteLength;case ir:return e*t*2/i.components*i.byteLength;case ar:return e*t*2/i.components*i.byteLength;case Qn:return e*t*3/i.components*i.byteLength;case $n:return e*t*4/i.components*i.byteLength;case or:return e*t*4/i.components*i.byteLength;case sr:case cr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case lr:case ur:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fr:case mr:return Math.max(e,16)*Math.max(t,8)/4;case dr:case pr:return Math.max(e,8)*Math.max(t,8)/2;case hr:case gr:case vr:case yr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case _r:case br:case xr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Sr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Cr:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case wr:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Tr:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Er:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Dr:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Or:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case kr:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ar:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case jr:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Mr:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Nr:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Pr:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Fr:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ir:case Lr:case Rr:return Math.ceil(e/4)*Math.ceil(t/4)*16;case zr:case Br:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Vr:case Hr:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function El(e){switch(e){case Rn:case zn:return{byteLength:1,components:1};case Vn:case Bn:case Gn:return{byteLength:2,components:1};case Kn:case qn:return{byteLength:2,components:4};case Un:case Hn:case Wn:return{byteLength:4,components:1};case Yn:case Xn:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function Dl(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ol(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var J={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Y={common:{diffuse:{value:new K(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new K(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new K(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new K(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},kl={basic:{uniforms:lc([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.fog]),vertexShader:J.meshbasic_vert,fragmentShader:J.meshbasic_frag},lambert:{uniforms:lc([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new K(0)},envMapIntensity:{value:1}}]),vertexShader:J.meshlambert_vert,fragmentShader:J.meshlambert_frag},phong:{uniforms:lc([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new K(0)},specular:{value:new K(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:J.meshphong_vert,fragmentShader:J.meshphong_frag},standard:{uniforms:lc([Y.common,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.roughnessmap,Y.metalnessmap,Y.fog,Y.lights,{emissive:{value:new K(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag},toon:{uniforms:lc([Y.common,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.gradientmap,Y.fog,Y.lights,{emissive:{value:new K(0)}}]),vertexShader:J.meshtoon_vert,fragmentShader:J.meshtoon_frag},matcap:{uniforms:lc([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,{matcap:{value:null}}]),vertexShader:J.meshmatcap_vert,fragmentShader:J.meshmatcap_frag},points:{uniforms:lc([Y.points,Y.fog]),vertexShader:J.points_vert,fragmentShader:J.points_frag},dashed:{uniforms:lc([Y.common,Y.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:J.linedashed_vert,fragmentShader:J.linedashed_frag},depth:{uniforms:lc([Y.common,Y.displacementmap]),vertexShader:J.depth_vert,fragmentShader:J.depth_frag},normal:{uniforms:lc([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,{opacity:{value:1}}]),vertexShader:J.meshnormal_vert,fragmentShader:J.meshnormal_frag},sprite:{uniforms:lc([Y.sprite,Y.fog]),vertexShader:J.sprite_vert,fragmentShader:J.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:J.background_vert,fragmentShader:J.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:J.backgroundCube_vert,fragmentShader:J.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:J.cube_vert,fragmentShader:J.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:J.equirect_vert,fragmentShader:J.equirect_frag},distance:{uniforms:lc([Y.common,Y.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:J.distance_vert,fragmentShader:J.distance_frag},shadow:{uniforms:lc([Y.lights,Y.fog,{color:{value:new K(0)},opacity:{value:1}}]),vertexShader:J.shadow_vert,fragmentShader:J.shadow_frag}};kl.physical={uniforms:lc([kl.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new K(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new K(0)},specularColor:{value:new K(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag};var Al={r:0,b:0,g:0},jl=new da,Ml=new W;Ml.set(-1,0,0,0,1,0,0,0,1);function Nl(e,t,n,r,i,a){let o=new K(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new q(new ec(1,1,1),new gc({name:`BackgroundCubeMaterial`,uniforms:cc(kl.backgroundCube.uniforms),vertexShader:kl.backgroundCube.vertexShader,fragmentShader:kl.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(jl.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ml),l.material.toneMapped=G.getTransfer(i.colorSpace)!==ti,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new q(new oc(2,2),new gc({name:`BackgroundMaterial`,uniforms:cc(kl.background.uniforms),vertexShader:kl.background.vertexShader,fragmentShader:kl.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=G.getTransfer(i.colorSpace)!==ti,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Al,fc(e)),n.buffers.color.setClear(Al.r,Al.g,Al.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Pl(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Fl(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Il(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return!(t!==1023&&r.convert(t)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Ll(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ls,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Rl=4,zl=[.125,.215,.35,.446,.526,.582],Bl=20,Vl=256,Hl=new $c,Ul=new K,Wl=null,Gl=0,Kl=0,ql=!1,Jl=new U,Yl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Jl}=i;Wl=this._renderer.getRenderTarget(),Gl=this._renderer.getActiveCubeFace(),Kl=this._renderer.getActiveMipmapLevel(),ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wl,Gl,Kl),this._renderer.xr.enabled=ql,e.scissorTest=!1,Ql(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wl=this._renderer.getRenderTarget(),Gl=this._renderer.getActiveCubeFace(),Kl=this._renderer.getActiveMipmapLevel(),ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:Gn,format:$n,colorSpace:$r,depthBuffer:!1},r=Zl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zl(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Xl(r)),this._blurMaterial=eu(r,e,t),this._ggxMaterial=$l(r,e,t)}return r}_compileMaterial(e){let t=new q(new Uo,e);this._renderer.compile(t,Hl)}_sceneToCubeUV(e,t,n,r,i){let a=new Xc(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ul),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new q(new ec,new ys({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Ul),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Ql(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=nu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tu());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Ql(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Hl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Rl?n-d+Rl:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Ql(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Hl),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Ql(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Hl)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&B(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*Bl-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):Bl;m>Bl&&z(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bl}`);let h=[],g=0;for(let e=0;e<Bl;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Ql(t,3*v*(r>_-Rl?r-_+Rl:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Hl)}};function Xl(e){let t=[],n=[],r=[],i=e,a=e-Rl+1+zl.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Rl?s=zl[o-e+Rl-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Uo;h.setAttribute(`position`,new Oo(f,3)),h.setAttribute(`uv`,new Oo(p,2)),h.setAttribute(`faceIndex`,new Oo(m,1)),r.push(new q(h,null)),i>Rl&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function Zl(e,t,n){let r=new ca(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Ql(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function $l(e,t,n){return new gc({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Vl,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ru(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function eu(e,t,n){let r=new Float32Array(Bl),i=new U(0,1,0);return new gc({name:`SphericalGaussianBlur`,defines:{n:Bl,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function tu(){return new gc({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function nu(){return new gc({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ru(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var iu=class extends ca{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ys(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ec(5,5,5),i=new gc({name:`CubemapFromEquirect`,uniforms:cc(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new q(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Fn),new al(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function au(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304)if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}else{let r=n.image;if(r&&r.height>0){let i=new iu(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}else return null}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Yl(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Yl(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function ou(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&pi(`WebGLRenderer: `+e+` extension not supported.`),t}}}function su(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Ao:ko)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function cu(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function lu(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function uu(e,t,n){let r=new WeakMap,i=new oa;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new la(h,p,m,u);g.type=Wn,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function du(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var fu={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function pu(e,t,n,r,i,a){let o=new ca(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new Zs(t,n):void 0}),s=new ca(t,n,{type:Gn,depthBuffer:!1,stencilBuffer:!1}),c=new Uo;c.setAttribute(`position`,new jo([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new jo([0,2,0,0,2,0],2));let l=new _c({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new q(c,l),d=new $c(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},G.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=fu[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var mu=new aa,hu=new Zs(1,1),gu=new la,_u=new ua,vu=new Ys,yu=[],bu=[],xu=new Float32Array(16),Su=new Float32Array(9),Cu=new Float32Array(4);function wu(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=yu[i];if(a===void 0&&(a=new Float32Array(i),yu[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Tu(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Eu(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Du(e,t){let n=bu[t];n===void 0&&(n=new Int32Array(t),bu[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ou(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ku(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Tu(n,t))return;e.uniform2fv(this.addr,t),Eu(n,t)}}function Au(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Tu(n,t))return;e.uniform3fv(this.addr,t),Eu(n,t)}}function ju(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Tu(n,t))return;e.uniform4fv(this.addr,t),Eu(n,t)}}function Mu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Tu(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Eu(n,t)}else{if(Tu(n,r))return;Cu.set(r),e.uniformMatrix2fv(this.addr,!1,Cu),Eu(n,r)}}function Nu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Tu(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Eu(n,t)}else{if(Tu(n,r))return;Su.set(r),e.uniformMatrix3fv(this.addr,!1,Su),Eu(n,r)}}function Pu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Tu(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Eu(n,t)}else{if(Tu(n,r))return;xu.set(r),e.uniformMatrix4fv(this.addr,!1,xu),Eu(n,r)}}function Fu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Iu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Tu(n,t))return;e.uniform2iv(this.addr,t),Eu(n,t)}}function Lu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Tu(n,t))return;e.uniform3iv(this.addr,t),Eu(n,t)}}function Ru(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Tu(n,t))return;e.uniform4iv(this.addr,t),Eu(n,t)}}function zu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Bu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Tu(n,t))return;e.uniform2uiv(this.addr,t),Eu(n,t)}}function Vu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Tu(n,t))return;e.uniform3uiv(this.addr,t),Eu(n,t)}}function Hu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Tu(n,t))return;e.uniform4uiv(this.addr,t),Eu(n,t)}}function Uu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(hu.compareFunction=n.isReversedDepthBuffer()?518:515,a=hu):a=mu,n.setTexture2D(t||a,i)}function Wu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||_u,i)}function Gu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||vu,i)}function Ku(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||gu,i)}function qu(e){switch(e){case 5126:return Ou;case 35664:return ku;case 35665:return Au;case 35666:return ju;case 35674:return Mu;case 35675:return Nu;case 35676:return Pu;case 5124:case 35670:return Fu;case 35667:case 35671:return Iu;case 35668:case 35672:return Lu;case 35669:case 35673:return Ru;case 5125:return zu;case 36294:return Bu;case 36295:return Vu;case 36296:return Hu;case 35678:case 36198:case 36298:case 36306:case 35682:return Uu;case 35679:case 36299:case 36307:return Wu;case 35680:case 36300:case 36308:case 36293:return Gu;case 36289:case 36303:case 36311:case 36292:return Ku}}function Ju(e,t){e.uniform1fv(this.addr,t)}function Yu(e,t){let n=wu(t,this.size,2);e.uniform2fv(this.addr,n)}function Xu(e,t){let n=wu(t,this.size,3);e.uniform3fv(this.addr,n)}function Zu(e,t){let n=wu(t,this.size,4);e.uniform4fv(this.addr,n)}function Qu(e,t){let n=wu(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function $u(e,t){let n=wu(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ed(e,t){let n=wu(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function td(e,t){e.uniform1iv(this.addr,t)}function nd(e,t){e.uniform2iv(this.addr,t)}function rd(e,t){e.uniform3iv(this.addr,t)}function id(e,t){e.uniform4iv(this.addr,t)}function ad(e,t){e.uniform1uiv(this.addr,t)}function od(e,t){e.uniform2uiv(this.addr,t)}function sd(e,t){e.uniform3uiv(this.addr,t)}function cd(e,t){e.uniform4uiv(this.addr,t)}function ld(e,t,n){let r=this.cache,i=t.length,a=Du(n,i);Tu(r,a)||(e.uniform1iv(this.addr,a),Eu(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?hu:mu;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function ud(e,t,n){let r=this.cache,i=t.length,a=Du(n,i);Tu(r,a)||(e.uniform1iv(this.addr,a),Eu(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||_u,a[e])}function dd(e,t,n){let r=this.cache,i=t.length,a=Du(n,i);Tu(r,a)||(e.uniform1iv(this.addr,a),Eu(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||vu,a[e])}function fd(e,t,n){let r=this.cache,i=t.length,a=Du(n,i);Tu(r,a)||(e.uniform1iv(this.addr,a),Eu(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||gu,a[e])}function pd(e){switch(e){case 5126:return Ju;case 35664:return Yu;case 35665:return Xu;case 35666:return Zu;case 35674:return Qu;case 35675:return $u;case 35676:return ed;case 5124:case 35670:return td;case 35667:case 35671:return nd;case 35668:case 35672:return rd;case 35669:case 35673:return id;case 5125:return ad;case 36294:return od;case 36295:return sd;case 36296:return cd;case 35678:case 36198:case 36298:case 36306:case 35682:return ld;case 35679:case 36299:case 36307:return ud;case 35680:case 36300:case 36308:case 36293:return dd;case 36289:case 36303:case 36311:case 36292:return fd}}var md=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=qu(t.type)}},hd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pd(t.type)}},gd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},_d=/(\w+)(\])?(\[|\.)?/g;function vd(e,t){e.seq.push(t),e.map[t.id]=t}function yd(e,t,n){let r=e.name,i=r.length;for(_d.lastIndex=0;;){let a=_d.exec(r),o=_d.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){vd(n,l===void 0?new md(s,e,t):new hd(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new gd(s),vd(n,e)),n=e}}}var bd=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);yd(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function xd(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Sd=37297,Cd=0;function wd(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Td=new W;function Ed(e){G._getMatrix(Td,G.workingColorSpace,e);let t=`mat3( ${Td.elements.map(e=>e.toFixed(4))} )`;switch(G.getTransfer(e)){case ei:return[t,`LinearTransferOETF`];case ti:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Dd(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+wd(e.getShaderSource(t),r)}else return i}function Od(e,t){let n=Ed(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var kd={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Ad(e,t){let n=kd[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var jd=new U;function Md(){return G.getLuminanceCoefficients(jd),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${jd.x.toFixed(4)}, ${jd.y.toFixed(4)}, ${jd.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Nd(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Id).join(`
`)}function Pd(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Fd(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Id(e){return e!==``}function Ld(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rd(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var zd=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bd(e){return e.replace(zd,Hd)}var Vd=new Map;function Hd(e,t){let n=J[t];if(n===void 0){let e=Vd.get(t);if(e!==void 0)n=J[e],z(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Bd(n)}var Ud=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wd(e){return e.replace(Ud,Gd)}function Gd(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Kd(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var qd={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Jd(e){return qd[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Yd={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Xd(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Yd[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Zd={302:`ENVMAP_MODE_REFRACTION`};function Qd(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Zd[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var $d={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function ef(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:$d[e.combine]||`ENVMAP_BLENDING_NONE`}function tf(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function nf(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Jd(n),l=Xd(n),u=Qd(n),d=ef(n),f=tf(n),p=Nd(n),m=Pd(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Id).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Id).join(`
`),_.length>0&&(_+=`
`)):(g=[Kd(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Id).join(`
`),_=[Kd(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:J.tonemapping_pars_fragment,n.toneMapping===0?``:Ad(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,J.colorspace_pars_fragment,Od(`linearToOutputTexel`,n.outputColorSpace),Md(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Id).join(`
`)),o=Bd(o),o=Ld(o,n),o=Rd(o,n),s=Bd(s),s=Ld(s,n),s=Rd(s,n),o=Wd(o),s=Wd(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=xd(i,i.VERTEX_SHADER,y),S=xd(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Dd(i,x,`vertex`),n=Dd(i,S,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new bd(i,h),T=Fd(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Sd)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Cd++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var rf=0,af=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new of(e),t.set(e,n)),n}},of=class{constructor(e){this.id=rf++,this.code=e,this.usedTimes=0}};function sf(e){return e===1030||e===37490||e===36285}function cf(e,t,n,r,i,a){let o=new Sa,s=new af,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,ee,k;if(C){let e=kl[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),ee=e.id,k=t.id}let te=e.getRenderTarget(),ne=e.state.buffers.depth.getReversed(),A=h.isInstancedMesh===!0,j=h.isBatchedMesh===!0,re=!!i.map,M=!!i.matcap,ie=!!x,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,ce=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,de=!!i.metalnessMap,fe=!!i.roughnessMap,pe=i.anisotropy>0,N=i.clearcoat>0,me=i.dispersion>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=pe&&!!i.anisotropyMap,ye=N&&!!i.clearcoatMap,be=N&&!!i.clearcoatNormalMap,xe=N&&!!i.clearcoatRoughnessMap,Se=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,P=ge&&!!i.sheenColorMap,we=ge&&!!i.sheenRoughnessMap,Te=!!i.specularMap,Ee=!!i.specularColorMap,F=!!i.specularIntensityMap,De=_e&&!!i.transmissionMap,I=_e&&!!i.thicknessMap,L=!!i.gradientMap,Oe=!!i.alphaMap,ke=i.alphaTest>0,Ae=!!i.alphaHash,je=!!i.extensions,Me=0;i.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Me=e.toneMapping);let Ne={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:ee,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:j,batchingColor:j&&h._colorsTexture!==null,instancing:A,instancingColor:A&&h.instanceColor!==null,instancingMorph:A&&h.morphTexture!==null,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:G.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:M,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&sf(i.normalMap.format),metalnessMap:de,roughnessMap:fe,anisotropy:pe,anisotropyMap:ve,clearcoat:N,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,dispersion:me,iridescence:he,iridescenceMap:Se,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:P,sheenRoughnessMap:we,specularMap:Te,specularColorMap:Ee,specularIntensityMap:F,transmission:_e,transmissionMap:De,thicknessMap:I,gradientMap:L,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ke,alphaHash:Ae,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:ae&&m(i.aoMap.channel),lightMapUv:oe&&m(i.lightMap.channel),bumpMapUv:se&&m(i.bumpMap.channel),normalMapUv:ce&&m(i.normalMap.channel),displacementMapUv:le&&m(i.displacementMap.channel),emissiveMapUv:ue&&m(i.emissiveMap.channel),metalnessMapUv:de&&m(i.metalnessMap.channel),roughnessMapUv:fe&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:P&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:we&&m(i.sheenRoughnessMap.channel),specularMapUv:Te&&m(i.specularMap.channel),specularColorMapUv:Ee&&m(i.specularColorMap.channel),specularIntensityMapUv:F&&m(i.specularIntensityMap.channel),transmissionMapUv:De&&m(i.transmissionMap.channel),thicknessMapUv:I&&m(i.thicknessMap.channel),alphaMapUv:Oe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ce||pe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||Oe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ne,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Me,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&G.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&G.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:je&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(je&&i.extensions.multiDraw===!0||j)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=kl[t];n=pc.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new nf(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function lf(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function uf(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function df(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ff(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||uf),r.length>1&&r.sort(t||df),i.length>1&&i.sort(t||df),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function pf(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new ff,e.set(t,[i])):n>=r.length?(i=new ff,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function mf(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new U,color:new K};break;case`SpotLight`:n={position:new U,direction:new U,color:new K,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new K,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new K,groundColor:new K};break;case`RectAreaLight`:n={color:new K,position:new U,halfWidth:new U,halfHeight:new U};break}return e[t.id]=n,n}}}function hf(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var gf=0;function _f(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function vf(e){let t=new mf,n=hf(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new da,o=new da;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(_f);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Y.LTC_FLOAT_1,r.rectAreaLTC2=Y.LTC_FLOAT_2):(r.rectAreaLTC1=Y.LTC_HALF_1,r.rectAreaLTC2=Y.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=gf++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function yf(e){let t=new vf(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function bf(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new yf(e),t.set(n,[a])):r>=i.length?(a=new yf(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var xf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Cf=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],wf=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Tf=new da,Ef=new U,Df=new U;function Of(e,t,n){let r=new Vs,i=new H,a=new H,o=new oa,s=new yc,c=new bc,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new gc({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:xf,fragmentShader:Sf}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Uo;m.setAttribute(`position`,new Oo(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new q(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new ca(i.x,i.y,{format:ir,type:Gn,minFilter:Fn,magFilter:Fn,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Zs(i.x,i.y,Wn),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=er,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Mn,d.map.depthTexture.magFilter=Mn}else l.isPointLight?(d.map=new iu(i.x),d.map.depthTexture=new Qs(i.x,Un)):(d.map=new ca(i.x,i.y),d.map.depthTexture=new Zs(i.x,i.y,Un)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=er,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Fn,d.map.depthTexture.magFilter=Fn):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Mn,d.map.depthTexture.magFilter=Mn);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Ef.setFromMatrixPosition(l.matrixWorld),e.position.copy(Ef),Df.copy(e.position),Df.add(Cf[t]),e.up.copy(wf[t]),e.lookAt(Df),e.updateMatrixWorld(),n.makeTranslation(-Ef.x,-Ef.y,-Ef.z),Tf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Tf,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new ca(i.x,i.y,{format:ir,type:Gn})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function kf(e,t){function n(){let t=!1,n=new oa,r=null,i=new oa(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?de(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=hi[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?de(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new K(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,ne=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),A=!1,j=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),A=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(re)[1]),A=j>=1);let M=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new oa().fromArray(ae),ce=new oa().fromArray(oe);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),de(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),de(e.CULL_FACE),_e(0);function de(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function fe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function pe(t,n){return f[t]===n?!1:(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function N(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h===t?!1:(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(fe(e.BLEND),g=!1);return}if(g===!1&&(de(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t);break}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?fe(e.CULL_FACE):de(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?de(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?fe(e.CULL_FACE):(de(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==ee&&(A&&e.lineWidth(t),ee=t)}function Se(t,n,r){t?(de(e.POLYGON_OFFSET_FILL),(k!==n||te!==r)&&(k=n,te=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):fe(e.POLYGON_OFFSET_FILL)}function Ce(t){t?de(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function P(t){t===void 0&&(t=e.TEXTURE0+ne-1),M!==t&&(e.activeTexture(t),M=t)}function we(t,n,r){r===void 0&&(r=M===null?e.TEXTURE0+ne-1:M);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(M!==r&&(e.activeTexture(r),M=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Te(){let t=ie[M];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function F(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function De(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function I(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function L(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(t){return d[t]===void 0?e.getParameter(t):d[t]}function Pe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Fe(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Ie(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function Le(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Re(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},M=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new K(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:de,disable:fe,bindFramebuffer:pe,drawBuffers:N,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:P,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:F,texImage2D:je,texImage3D:Me,pixelStorei:Pe,getParameter:Ne,updateUBOMapping:Le,uniformBlockBinding:Re,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:De,texSubImage3D:I,compressedTexSubImage2D:L,compressedTexSubImage3D:Oe,scissor:Fe,viewport:Ie,reset:ze}}function Af(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new H,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):ci(`canvas`)}function g(e,t,n){let r=1,i=Ee(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?ei:G.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function ee(){O=0}function k(){return O}function te(e){O=e}function ne(){let e=O;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function A(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function j(t,i){let a=r.get(t);if(t.isVideoTexture&&we(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{fe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){fe(a,t,i);return}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function M(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){fe(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){pe(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ae={[kn]:e.REPEAT,[An]:e.CLAMP_TO_EDGE,[jn]:e.MIRRORED_REPEAT},oe={[Mn]:e.NEAREST,[Nn]:e.NEAREST_MIPMAP_NEAREST,[Pn]:e.NEAREST_MIPMAP_LINEAR,[Fn]:e.LINEAR,[In]:e.LINEAR_MIPMAP_NEAREST,[Ln]:e.LINEAR_MIPMAP_LINEAR},se={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ce(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ae[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ae[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ae[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,oe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,oe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,se[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function le(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=A(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ue(e,t,n){return Math.floor(Math.floor(e/n)/t)}function de(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ue(n.start,r.width,4),c=ue(t.start,r.width,4);n.start<=i+1&&a===c&&ue(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function fe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=le(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=G.getPrimaries(G.workingColorSpace),r=o.colorSpace===``?null:G.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Te(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ce(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===tr,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture)if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&de(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023)if(r!==null)if(C){if(T)if(o.layerUpdates.size>0){let t=Tl(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0);else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}else if(o.isDataArrayTexture)if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T)if(o.layerUpdates.size>0){let i=Tl(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w)if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Ee(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Ee(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function pe(t,o,s){if(o.image.length!==6)return;let c=le(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=G.getPrimaries(G.workingColorSpace),r=o.colorSpace===``?null:G.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Te(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);ce(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Ee(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function N(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ce(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function me(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;P(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);P(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function he(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else j(i.depthTexture,0);let u=l.__webglTexture,d=Ce(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ge(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer)if(a)for(let e=0;e<6;e++)he(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?he(i.__webglFramebuffer[0],t,0):he(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),me(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),me(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function _e(t,n,i){let a=r.get(t);n!==void 0&&N(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ge(t)}function ve(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&P(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ce(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),me(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)N(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else N(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ce(c,a),N(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ce(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)N(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else N(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&ge(t)}function ye(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let be=[],xe=[];function Se(t){if(t.samples>0){if(P(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(be.length=0,xe.length=0,be.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(be.push(l),xe.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,xe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,be))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ce(e){return Math.min(i.maxSamples,e.samples)}function P(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function we(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Te(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(G.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ee(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ne,this.resetTextureUnits=ee,this.getTextureUnits=k,this.setTextureUnits=te,this.setTexture2D=j,this.setTexture2DArray=re,this.setTexture3D=M,this.setTextureCube=ie,this.rebindTextures=_e,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=N,this.useMultisampledRTT=P,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function jf(e,t){function n(n,r=``){let i,a=G.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Mf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nf=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Pf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new $s(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new gc({vertexShader:Mf,fragmentShader:Nf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new q(new oc(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ff=class extends gi{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Pf,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new H,C=null,w=new Xc;w.viewport=new oa;let T=new Xc;T.viewport=new oa;let E=[w,T],D=new ol,O=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Va,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Va,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Va,b[e]=t),t.getHandSpace()};function k(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,k),r.removeEventListener(`selectstart`,k),r.removeEventListener(`selectend`,k),r.removeEventListener(`squeeze`,k),r.removeEventListener(`squeezestart`,k),r.removeEventListener(`squeezeend`,k),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,ee=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,k),r.addEventListener(`selectstart`,k),r.addEventListener(`selectend`,k),r.addEventListener(`squeeze`,k),r.addEventListener(`squeezestart`,k),r.addEventListener(`squeezeend`,k),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,ne),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?tr:er,a=_.stencil?Jn:Un);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new ca(d.textureWidth,d.textureHeight,{format:$n,type:Rn,depthTexture:new Zs(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ca(f.framebufferWidth,f.framebufferHeight,{format:$n,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let A=new U,j=new U;function re(e,t,n){A.setFromMatrixPosition(t.matrixWorld),j.setFromMatrixPosition(n.matrixWorld);let r=A.distanceTo(j),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function M(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||ee!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,ee=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;M(D,i);for(let e=0;e<a.length;e++)M(a[e],i);a.length===2?re(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),ie(e,D,i)};function ie(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=bi*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let ae=null;function oe(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new Xc,o.layers.enable(n),o.viewport=new oa,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new $s,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ae&&ae(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let se=new Dl;se.setAnimationLoop(oe),this.setAnimationLoop=function(e){ae=e},this.dispose=function(){}}},If=new da,Lf=new W;Lf.set(-1,0,0,0,1,0,0,0,1);function Rf(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,fc(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(If.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Lf),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function zf(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return B(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:ArrayBuffer.isView(i)?r[a]=i.slice():r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Bf=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Vf=null;function Hf(){return Vf===null&&(Vf=new Ns(Bf,16,16,ir,Gn),Vf.name=`DFG_LUT`,Vf.minFilter=Fn,Vf.magFilter=Fn,Vf.wrapS=An,Vf.wrapT=An,Vf.generateMipmaps=!1,Vf.needsUpdate=!0),Vf}var Uf=class{constructor(e={}){let{canvas:t=li(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Rn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([or,ar,rr]),g=new Set([Rn,Un,Vn,Jn,Kn,qn]),_=new Uint32Array(4),v=new Int32Array(4),y=new U,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,ee=null,k=null;this._outputColorSpace=Qr;let te=0,ne=0,A=null,j=-1,re=null,M=new oa,ie=new oa,ae=null,oe=new K(0),se=0,ce=t.width,le=t.height,ue=1,de=null,fe=null,pe=new oa(0,0,ce,le),N=new oa(0,0,ce,le),me=!1,he=new Vs,ge=!1,_e=!1,ve=new da,ye=new U,be=new oa,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Ce(){return A===null?ue:1}let P=n;function we(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,qe,!1),t.addEventListener(`webglcontextrestored`,Je,!1),t.addEventListener(`webglcontextcreationerror`,Ye,!1),P===null){let t=`webgl2`;if(P=we(t,e),P===null)throw we(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw B(`WebGLRenderer: `+e.message),e}let Te,Ee,F,De,I,L,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We;function Ge(){Te=new ou(P),Te.init(),He=new jf(P,Te),Ee=new Il(P,Te,e,He),F=new kf(P,Te),Ee.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),O=P.createFramebuffer(),ee=P.createFramebuffer(),k=P.createFramebuffer(),De=new lu(P),I=new lf,L=new Af(P,Te,F,I,Ee,He,De),Oe=new au(T),ke=new Ol(P),Ue=new Pl(P,ke),Ae=new su(P,ke,De,Ue),je=new du(P,Ae,ke,Ue,De),ze=new uu(P,Ee,L),Ie=new Ll(I),Me=new cf(T,Oe,Te,Ee,Ue,Ie),Ne=new Rf(T,I),Pe=new pf,Fe=new bf(Te),Re=new Nl(T,Oe,F,je,p,s),Le=new Of(T,je,Ee),We=new zf(P,De,Ee,F),Be=new Fl(P,Te,De),Ve=new cu(P,Te,De),De.programs=Me.programs,T.capabilities=Ee,T.extensions=Te,T.properties=I,T.renderLists=Pe,T.shadowMap=Le,T.state=F,T.info=De}Ge(),m!==1009&&(w=new pu(m,t.width,t.height,o,r,i));let Ke=new Ff(T,P);this.xr=Ke,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(e){e!==void 0&&(ue=e,this.setSize(ce,le,!1))},this.getSize=function(e){return e.set(ce,le)},this.setSize=function(e,n,r=!0){if(Ke.isPresenting){z(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ce=e,le=n,t.width=Math.floor(e*ue),t.height=Math.floor(n*ue),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ce*ue,le*ue).floor()},this.setDrawingBufferSize=function(e,n,r){ce=e,le=n,ue=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(M)},this.getViewport=function(e){return e.copy(pe)},this.setViewport=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),F.viewport(M.copy(pe).multiplyScalar(ue).round())},this.getScissor=function(e){return e.copy(N)},this.setScissor=function(e,t,n,r){e.isVector4?N.set(e.x,e.y,e.z,e.w):N.set(e,t,n,r),F.scissor(ie.copy(N).multiplyScalar(ue).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(e){F.setScissorTest(me=e)},this.setOpaqueSort=function(e){de=e},this.setTransparentSort=function(e){fe=e},this.getClearColor=function(e){return e.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(A!==null){let t=A.texture.format;e=h.has(t)}if(e){let e=A.texture.type,t=g.has(e),n=Re.getClearColor(),r=Re.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,P.clearBufferiv(P.COLOR,0,v))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,qe,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),Re.dispose(),Pe.dispose(),Fe.dispose(),I.dispose(),Oe.dispose(),je.dispose(),Ue.dispose(),We.dispose(),Me.dispose(),Ke.dispose(),Ke.removeEventListener(`sessionstart`,nt),Ke.removeEventListener(`sessionend`,rt),it.stop()};function qe(e){e.preventDefault(),di(`WebGLRenderer: Context Lost.`),E=!0}function Je(){di(`WebGLRenderer: Context Restored.`),E=!1;let e=De.autoReset,t=Le.enabled,n=Le.autoUpdate,r=Le.needsUpdate,i=Le.type;Ge(),De.autoReset=e,Le.enabled=t,Le.autoUpdate=n,Le.needsUpdate=r,Le.type=i}function Ye(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Xe(e){let t=e.target;t.removeEventListener(`dispose`,Xe),Ze(t)}function Ze(e){Qe(e),I.remove(e)}function Qe(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){Me.releaseProgram(e)}),e.isShaderMaterial&&Me.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=xe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=mt(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ae.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ue.setup(i,r,s,n,c);let h,g=Be;if(c!==null&&(h=ke.get(c),g=Ve,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Ce()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Ce()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh)if(Te.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ke.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function $e(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ut(e,t,n),e.side=0,e.needsUpdate=!0,ut(e,t,n),e.side=2):ut(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=Fe.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];$e(a,n,e),r.add(a)}else $e(t,n,e),r.add(t)}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){I.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Te.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let et=null;function tt(e){et&&et(e)}function nt(){it.stop()}function rt(){it.start()}let it=new Dl;it.setAnimationLoop(tt),typeof self<`u`&&it.setContext(self),this.setAnimationLoop=function(e){et=e,Ke.setAnimationLoop(e),e===null?it.stop():it.start()},Ke.addEventListener(`sessionstart`,nt),Ke.addEventListener(`sessionend`,rt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ke.enabled===!0&&Ke.isPresenting===!0,r=w!==null&&(A===null||n)&&w.begin(T,A);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ke.enabled===!0&&Ke.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ke.cameraAutoUpdate===!0&&Ke.updateCamera(t),t=Ke.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,A),x=Fe.get(e,C.length),x.init(t),x.state.textureUnits=L.getTextureUnits(),C.push(x),ve.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),he.setFromProjectionMatrix(ve,ai,t.reversedDepth),_e=this.localClippingEnabled,ge=Ie.init(this.clippingPlanes,_e),b=Pe.get(e,S.length),b.init(),S.push(b),Ke.enabled===!0&&Ke.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&at(e,t,-1/0,T.sortObjects)}at(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(de,fe,t.reversedDepth),Se=Ke.enabled===!1||Ke.isPresenting===!1||Ke.hasDepthSensing()===!1,Se&&Re.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ge===!0&&Ie.beginShadows();let i=x.state.shadowsArray;if(Le.render(i,e,t),ge===!0&&Ie.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];st(n,r,e,a)}Se&&Re.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ot(b,e,n,n.viewport)}}else r.length>0&&st(n,r,e,t),Se&&Re.render(e),ot(b,e,t)}A!==null&&ne===0&&(L.updateMultisampleRenderTarget(A),L.updateRenderTargetMipmap(A)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ue.resetDefaultState(),j=-1,re=null,C.pop(),C.length>0?(x=C[C.length-1],L.setTextureUnits(x.state.textureUnits),ge===!0&&Ie.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function at(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||he.intersectsSprite(e)){r&&be.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ve);let t=je.update(e),i=e.material;i.visible&&b.push(e,t,i,n,be.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||he.intersectsObject(e))){let t=je.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),be.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),be.copy(e.boundingSphere.center)),be.applyMatrix4(e.matrixWorld).applyMatrix4(ve)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,be.z,o)}}else i.visible&&b.push(e,t,i,n,be.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)at(i[e],t,n,r)}function ot(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ge===!0&&Ie.setGlobalState(T.clippingPlanes,n),r&&F.viewport(M.copy(r)),i.length>0&&ct(i,t,n),a.length>0&&ct(a,t,n),o.length>0&&ct(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function st(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Te.has(`EXT_color_buffer_half_float`)||Te.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new ca(1,1,{generateMipmaps:!0,type:e?Gn:Rn,minFilter:Ln,samples:Math.max(4,Ee.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:G.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||M;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(oe),se=T.getClearAlpha(),se<1&&T.setClearColor(16777215,.5),T.clear(),Se&&Re.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ge===!0&&Ie.setGlobalState(T.clippingPlanes,r),ct(e,n,r),L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a),Te.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,lt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(oe,se),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&lt(o,t,n,s,l,c)}}function lt(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ut(e,t,n){t.isScene!==!0&&(t=xe);let r=I.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Me.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Me.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Oe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Xe),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ft(e,s),d}else s.uniforms=Me.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Me.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ie.uniform),ft(e,s),r.needsLights=gt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=bd.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ft(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function pt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function mt(e,t,n,r,i){t.isScene!==!0&&(t=xe),L.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=A===null?T.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:G.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Oe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=x.state.lights;if(ge===!0&&(_e===!0||e!==re)){let t=e===re&&r.id===j;Ie.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ie.numPlanes||v.numIntersection!==Ie.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=ut(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),ee=v.uniforms;if(F.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==j&&(j=r.id,w=!0),v.needsLights){let e=pt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||re!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(P,`projectionMatrix`,e.projectionMatrix),O.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(P,ye.setFromMatrixPosition(e.matrixWorld)),Ee.logarithmicDepthBuffer&&O.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),re!==e&&(re=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,L),y.state.spotShadowMap.length>0&&O.setValue(P,`spotShadowMap`,y.state.spotShadowMap,L),y.state.pointShadowMap.length>0&&O.setValue(P,`pointShadowMap`,y.state.pointShadowMap,L)),i.isSkinnedMesh){O.setOptional(P,i,`bindMatrix`),O.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(P,`boneTexture`,e.boneTexture,L))}i.isBatchedMesh&&(O.setOptional(P,i,`batchingTexture`),O.setValue(P,`batchingTexture`,i._matricesTexture,L),O.setOptional(P,i,`batchingIdTexture`),O.setValue(P,`batchingIdTexture`,i._indirectTexture,L),O.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(P,`batchingColorTexture`,i._colorsTexture,L));let k=n.morphAttributes;if((k.position!==void 0||k.normal!==void 0||k.color!==void 0)&&ze.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(ee.envMapIntensity.value=t.environmentIntensity),ee.dfgLUT!==void 0&&(ee.dfgLUT.value=Hf()),w){if(O.setValue(P,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&ht(ee,E),a&&r.fog===!0&&Ne.refreshFogUniforms(ee,a),Ne.refreshMaterialUniforms(ee,r,ue,le,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;ee.probesSH.value=e.texture,ee.probesMin.value.copy(e.boundingBox.min),ee.probesMax.value.copy(e.boundingBox.max),ee.probesResolution.value.copy(e.resolution)}bd.upload(P,dt(v),ee,L)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(bd.upload(P,dt(v),ee,L),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(P,`center`,i.center),O.setValue(P,`modelViewMatrix`,i.modelViewMatrix),O.setValue(P,`normalMatrix`,i.normalMatrix),O.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];We.update(n,S),We.bind(n,S)}}return S}function ht(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function gt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return ne},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){A=e,te=t,ne=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),M.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest,F.viewport(M),F.scissor(ie),F.setScissorTest(ae),j=-1;return}else if(o.__webglFramebuffer===void 0)L.setupRenderTarget(e);else if(o.__hasExternalTextures)L.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);L.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&L.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,M.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest}else M.copy(pe).multiplyScalar(ue).floor(),ie.copy(N).multiplyScalar(ue).floor(),ae=me;if(n!==0&&(r=O),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(M),F.scissor(ie),F.setScissorTest(ae),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}j=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s),!Ee.textureFormatReadable(c)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Ee.textureTypeReadable(l)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,He.convert(c),He.convert(l),a)}finally{let e=A===null?null:I.get(A).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s),!Ee.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Ee.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,d),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,He.convert(l),He.convert(u),0);let f=A===null?null:I.get(A).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,f);let p=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await mi(P,p,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,d),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.deleteBuffer(d),P.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;L.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=He.convert(t.format),_=He.convert(t.type),v;t.isData3DTexture?(L.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(L.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(L.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,ee),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,k);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&L.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?L.setTextureCube(e,0):e.isData3DTexture?L.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?L.setTexture2DArray(e,0):L.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){te=0,ne=0,A=null,F.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=G._getDrawingBufferColorSpace(e),t.unpackColorSpace=G._getUnpackColorSpace()}},Wf={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Gf=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Kf=new $c(-1,1,1,-1,0,1),qf=new class extends Uo{constructor(){super(),this.setAttribute(`position`,new jo([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new jo([0,2,0,0,2,0],2))}},Jf=class{constructor(e){this._mesh=new q(qf,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Kf)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Yf=class extends Gf{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof gc?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=pc.clone(e.uniforms),this.material=new gc({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Jf(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Xf=class extends Gf{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Zf=class extends Gf{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Qf=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new H);this._width=n.width,this._height=n.height,t=new ca(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Gn}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Yf(Wf),this.copyPass.material.blending=0,this.timer=new sl}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Xf!==void 0&&(r instanceof Xf?n=!0:r instanceof Zf&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new H);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},$f={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},ep=class extends Gf{constructor(){super(),this.isOutputPass=!0,this.uniforms=pc.clone($f.uniforms),this.material=new _c({name:$f.name,uniforms:this.uniforms,vertexShader:$f.vertexShader,fragmentShader:$f.fragmentShader}),this._fsQuad=new Jf(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},G.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},tp=class extends Gf{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new K}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},np=2.5,rp=2.25,ip=1.42,ap=.84,op={name:`CinderAtmosphere`,uniforms:{tDiffuse:{value:null},uResolution:{value:new H(1,1)},uSunPosition:{value:new H(-2,-2)},uTime:{value:0},uHeat:{value:0},uGodRays:{value:0},uBloom:{value:.4},uBlur:{value:.22},uRain:{value:0},uWater:{value:0},uDaylight:{value:1}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform vec2 uSunPosition;
    uniform float uTime;
    uniform float uHeat;
    uniform float uGodRays;
    uniform float uBloom;
    uniform float uBlur;
    uniform float uRain;
    uniform float uWater;
    uniform float uDaylight;
    varying vec2 vUv;

    float luma(vec3 color) {
      return dot(color, vec3(0.2126, 0.7152, 0.0722));
    }

    float hash(vec2 value) {
      return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 texel = 1.0 / max(uResolution, vec2(1.0));
      vec2 sourceUv = vUv;
      float heatBand = smoothstep(0.06, 0.18, vUv.y) * (1.0 - smoothstep(0.54, 0.74, vUv.y));
      float heatWave =
        sin(vUv.y * 88.0 + uTime * 2.25) * 0.58 +
        sin(vUv.y * 151.0 - uTime * 1.37 + vUv.x * 17.0) * 0.28 +
        sin(vUv.x * 41.0 + uTime * 0.91) * 0.14;
      sourceUv.x += heatWave * uHeat * heatBand;
      sourceUv.y += sin(vUv.x * 33.0 + uTime * 1.6) * uHeat * 0.22 * heatBand;
      sourceUv.x += sin(vUv.y * 31.0 + uTime * 2.4) * uWater * 0.0028;
      sourceUv.y += sin(vUv.x * 24.0 - uTime * 1.8) * uWater * 0.0014;
      sourceUv = clamp(sourceUv, texel, vec2(1.0) - texel);

      vec3 center = texture2D(tDiffuse, sourceUv).rgb;
      vec3 soft = center * 0.44;
      soft += texture2D(tDiffuse, sourceUv + vec2(texel.x * 1.6, 0.0)).rgb * 0.14;
      soft += texture2D(tDiffuse, sourceUv - vec2(texel.x * 1.6, 0.0)).rgb * 0.14;
      soft += texture2D(tDiffuse, sourceUv + vec2(0.0, texel.y * 1.6)).rgb * 0.14;
      soft += texture2D(tDiffuse, sourceUv - vec2(0.0, texel.y * 1.6)).rgb * 0.14;
      float edgeSoftness = smoothstep(0.19, 0.72, distance(vUv, vec2(0.5, 0.48)));
      float softness = clamp(uBlur * (0.22 + edgeSoftness * 0.78) + uRain * 0.17, 0.0, 0.82);
      vec3 color = mix(center, soft, softness * 0.62);

      vec3 glow = vec3(0.0);
      glow += texture2D(tDiffuse, sourceUv + vec2(texel.x * 3.5, 0.0)).rgb;
      glow += texture2D(tDiffuse, sourceUv - vec2(texel.x * 3.5, 0.0)).rgb;
      glow += texture2D(tDiffuse, sourceUv + vec2(0.0, texel.y * 3.5)).rgb;
      glow += texture2D(tDiffuse, sourceUv - vec2(0.0, texel.y * 3.5)).rgb;
      glow *= 0.25;
      color += max(glow - vec3(0.68), vec3(0.0)) * uBloom * 0.72;

      vec2 rayStep = (uSunPosition - sourceUv) * 0.052;
      vec2 rayUv = sourceUv;
      vec3 rays = vec3(0.0);
      float illumination = 1.0;
      for (int index = 0; index < 10; index++) {
        rayUv = clamp(rayUv + rayStep, texel, vec2(1.0) - texel);
        vec3 raySample = texture2D(tDiffuse, rayUv).rgb;
        float brightness = smoothstep(0.62, 1.18, luma(raySample));
        rays += raySample * brightness * illumination;
        illumination *= 0.88;
      }
      float sunVisible =
        step(-0.08, uSunPosition.x) * step(uSunPosition.x, 1.08) *
        step(-0.08, uSunPosition.y) * step(uSunPosition.y, 1.08);
      float rayFalloff = 1.0 - smoothstep(0.1, 1.12, distance(sourceUv, uSunPosition));
      color += rays * uGodRays * sunVisible * (0.018 + rayFalloff * 0.025);
      float halo = 1.0 - smoothstep(0.0, 0.28, distance(sourceUv, uSunPosition));
      color += vec3(1.0, 0.62, 0.28) * halo * halo * uGodRays * sunVisible * 0.19;

      float monochrome = luma(color);
      color = mix(vec3(monochrome), color, 1.08 - uRain * 0.2);
      color = (color - 0.5) * 1.055 + 0.5;
      color *= mix(vec3(1.035, 0.985, 0.91), vec3(0.83, 0.94, 1.02), uRain * 0.42);
      color = mix(color, color * vec3(0.68, 0.94, 1.08) + vec3(0.01, 0.045, 0.055), uWater * 0.3);
      float twilight = smoothstep(0.08, 0.5, uDaylight) * (1.0 - smoothstep(0.5, 0.94, uDaylight));
      vec3 nightGrade = color * vec3(0.52, 0.60, 0.72) + vec3(0.008, 0.014, 0.028);
      color = mix(nightGrade, color, uDaylight);
      color += vec3(0.12, 0.038, 0.004) * twilight * (1.0 - vUv.y) * 0.58;
      float vignette = clamp(1.0 - dot((vUv - 0.5) * vec2(0.82, 1.08), (vUv - 0.5) * vec2(0.82, 1.08)) * 0.68, 0.68, 1.0);
      color *= vignette;
      color += (hash(vUv * uResolution + floor(uTime * 24.0)) - 0.5) * 0.012;
      gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
    }
  `};function sp(e,t=0){return new U(e.x*np,t,e.z*np)}function cp(e,t,n){let r=e>>>0,i=(r&1023)*.0137,a=(r>>>10&1023)*.0113,o=Math.sin((t+i)*.135)*.7+Math.cos((n-a)*.15)*.58,s=Math.sin((t+n+i*.6)*.072)*.44,c=Math.cos((t*.72-n+a)*.105)*.24,l=(e,r,i,a,o)=>{let s=((t-e)/i)**2+((n-r)/a)**2;return Math.exp(-s*.5)*o},u=l(20.5,11,7.2,3.2,-1.18),d=l(14,5.4,3.8,2.7,-.58),f=l(18.5,18.2,4.6,3.6,1.3),p=l(28,16,5.8,6.2,.72);return Hi.clamp(o+s+c+u+d+f+p,-2.25,2.65)}function lp(e,t){return e.x===t.x&&e.z===t.z}function up(e,t){return e.interiorZones.find(e=>t.x>=e.minX&&t.x<=e.maxX&&t.z>=e.minZ&&t.z<=e.maxZ)?.id??`exterior`}function dp(e){return e===`raider`?{width:1.45,height:2.05}:e===`scorpion`?{width:2.05,height:1.55}:e===`gecko`?{width:1.9,height:1.5}:e===`ant`?{width:1.8,height:1.55}:{width:1.55,height:1.25}}function fp(e,t){let n=document.createElement(`canvas`);n.width=e,n.height=e;let r=n.getContext(`2d`);if(r===null)throw Error(`Canvas rendering is unavailable.`);t(r,e);let i=new Xs(n);return i.colorSpace=Qr,i.magFilter=Fn,i.minFilter=Ln,i}function pp(){return fp(128,(e,t)=>{e.clearRect(0,0,t,t);let n=e.createRadialGradient(t/2,t/2,2,t/2,t/2,t/2);n.addColorStop(0,`rgba(255,255,225,1)`),n.addColorStop(.08,`rgba(255,239,176,.98)`),n.addColorStop(.24,`rgba(255,183,87,.52)`),n.addColorStop(.58,`rgba(255,129,48,.12)`),n.addColorStop(1,`rgba(255,112,35,0)`),e.fillStyle=n,e.fillRect(0,0,t,t)})}function mp(){let e=fp(128,e=>{e.fillStyle=`#9a7147`,e.fillRect(0,0,128,128),e.strokeStyle=`#5f442e`,e.lineWidth=4;for(let t=0;t<=128;t+=32)e.beginPath(),e.moveTo(0,t),e.lineTo(128,t),e.stroke();for(let t=0;t<=128;t+=64)e.beginPath(),e.moveTo(t,0),e.lineTo(t,128),e.stroke();e.fillStyle=`rgba(245,206,133,.2)`,e.fillRect(7,8,5,112);for(let t=0;t<90;t+=1){let t=88+Math.floor(Math.random()*45);e.fillStyle=`rgba(${t+34},${t+12},${t},.35)`,e.fillRect(Math.random()*128,Math.random()*128,2,2)}});return e.wrapS=kn,e.wrapT=kn,e.repeat.set(1.5,1),e}function hp(){return fp(128,e=>{e.fillStyle=`#b99a68`,e.fillRect(0,0,128,128);for(let t=0;t<70;t+=1){let t=118+Math.floor(Math.random()*55);e.fillStyle=`rgba(${t+35},${t+12},${t-15},${.12+Math.random()*.16})`,e.fillRect(Math.random()*128,Math.random()*128,2+Math.random()*7,1+Math.random()*3)}e.strokeStyle=`rgba(95,58,33,.28)`,e.lineWidth=2,e.beginPath(),e.moveTo(0,82),e.bezierCurveTo(30,72,62,96,128,77),e.stroke()})}function gp(){let e=document.createElement(`canvas`);e.width=32,e.height=256;let t=e.getContext(`2d`);if(t===null)throw Error(`Canvas rendering is unavailable.`);let n=t.createLinearGradient(0,0,0,e.height);n.addColorStop(0,`#7892a0`),n.addColorStop(.48,`#c4b184`),n.addColorStop(.67,`#e0c38a`),n.addColorStop(1,`#ae8355`),t.fillStyle=n,t.fillRect(0,0,e.width,e.height);let r=new Xs(e);return r.colorSpace=Qr,r.mapping=303,r.magFilter=Fn,r.minFilter=Fn,r}function _p(e){return fp(192,(t,n)=>{if(t.clearRect(0,0,n,n),t.imageSmoothingEnabled=!1,e===`roach`){t.strokeStyle=`#3d2418`,t.lineWidth=8;for(let e of[-1,1]){for(let n=0;n<3;n+=1)t.beginPath(),t.moveTo(96+e*(20+n*8),112+n*15),t.lineTo(96+e*(55+n*7),133+n*10),t.stroke();t.beginPath(),t.moveTo(96+e*18,78),t.quadraticCurveTo(96+e*48,41,96+e*68,27),t.stroke()}let e=t.createLinearGradient(48,65,146,154);e.addColorStop(0,`#c27a42`),e.addColorStop(.45,`#70402a`),e.addColorStop(1,`#2c1a14`),t.fillStyle=e,t.beginPath(),t.ellipse(96,116,48,61,0,0,Math.PI*2),t.fill(),t.strokeStyle=`rgba(248,186,103,.35)`,t.lineWidth=3,t.beginPath(),t.moveTo(96,61),t.lineTo(96,166),t.stroke(),t.fillStyle=`#f0b24f`,t.fillRect(70,80,8,7),t.fillRect(114,80,8,7)}else if(e===`ant`){t.strokeStyle=`#4b1f17`,t.lineWidth=8;for(let e of[-1,1])for(let n=0;n<3;n+=1)t.beginPath(),t.moveTo(96+e*18,102+n*17),t.lineTo(96+e*(54+n*5),116+n*14),t.stroke();t.fillStyle=`#59251d`,t.beginPath(),t.ellipse(96,145,45,34,0,0,Math.PI*2),t.fill(),t.fillStyle=`#8f3827`,t.beginPath(),t.ellipse(96,105,31,29,0,0,Math.PI*2),t.fill(),t.fillStyle=`#b34b2f`,t.beginPath(),t.ellipse(96,69,35,29,0,0,Math.PI*2),t.fill(),t.strokeStyle=`#59251d`,t.lineWidth=6;for(let e of[-1,1])t.beginPath(),t.moveTo(96+e*16,52),t.lineTo(96+e*46,25),t.stroke(),t.beginPath(),t.moveTo(96+e*24,74),t.quadraticCurveTo(96+e*48,75,96+e*50,92),t.stroke();t.fillStyle=`#ffd36b`,t.fillRect(76,61,7,6),t.fillRect(109,61,7,6)}else if(e===`gecko`){t.strokeStyle=`#443526`,t.lineWidth=10;for(let e of[-1,1])t.beginPath(),t.moveTo(96+e*24,118),t.lineTo(96+e*60,145),t.stroke(),t.beginPath(),t.moveTo(96+e*20,92),t.lineTo(96+e*54,106),t.stroke();t.strokeStyle=`#7d7542`,t.lineWidth=23,t.lineCap=`round`,t.beginPath(),t.moveTo(92,133),t.quadraticCurveTo(57,153,30,126),t.stroke(),t.lineCap=`butt`;let e=t.createLinearGradient(65,70,128,154);e.addColorStop(0,`#b6a45e`),e.addColorStop(.55,`#74713f`),e.addColorStop(1,`#47462d`),t.fillStyle=e,t.beginPath(),t.ellipse(96,117,45,39,0,0,Math.PI*2),t.fill(),t.fillStyle=`#a48d4f`,t.beginPath(),t.ellipse(122,79,35,29,-.12,0,Math.PI*2),t.fill(),t.fillStyle=`#382e20`,t.fillRect(127,93,31,7),t.fillStyle=`#f3cc56`,t.fillRect(111,72,7,7),t.fillRect(133,70,7,7),t.fillStyle=`rgba(70,63,34,.65)`;for(let e=0;e<9;e+=1)t.fillRect(70+e*17%63,98+e%3*14,6,4)}else if(e===`scorpion`){t.strokeStyle=`#4a2b1d`,t.lineWidth=9;for(let e of[-1,1]){for(let n=0;n<3;n+=1)t.beginPath(),t.moveTo(96+e*22,117+n*12),t.lineTo(96+e*(54+n*6),127+n*12),t.stroke();t.lineWidth=12,t.beginPath(),t.moveTo(96+e*27,96),t.lineTo(96+e*62,78),t.stroke(),t.fillStyle=`#7a4328`,t.beginPath(),t.ellipse(96+e*69,72,18,13,e*.3,0,Math.PI*2),t.fill(),t.lineWidth=9}t.fillStyle=`#6d3824`,t.beginPath(),t.ellipse(96,126,41,35,0,0,Math.PI*2),t.fill(),t.fillStyle=`#9c5530`,t.beginPath(),t.ellipse(96,91,28,25,0,0,Math.PI*2),t.fill(),t.strokeStyle=`#713a25`,t.lineWidth=18,t.lineCap=`round`,t.beginPath(),t.moveTo(96,103),t.bezierCurveTo(100,52,145,55,131,24),t.stroke(),t.lineCap=`butt`,t.fillStyle=`#d58b3d`,t.beginPath(),t.moveTo(124,30),t.lineTo(139,12),t.lineTo(138,39),t.fill(),t.fillStyle=`#f2c253`,t.fillRect(82,84,6,6),t.fillRect(105,84,6,6)}else t.fillStyle=`#5b3d2b`,t.fillRect(58,66,76,89),t.fillStyle=`#35261f`,t.fillRect(66,37,60,45),t.fillStyle=`#b18a5d`,t.fillRect(74,45,44,29),t.fillStyle=`#2a201b`,t.fillRect(68,53,56,13),t.fillStyle=`#d45e35`,t.fillRect(79,55,8,6),t.fillRect(105,55,8,6),t.strokeStyle=`#35261f`,t.lineWidth=13,t.beginPath(),t.moveTo(60,91),t.lineTo(30,128),t.moveTo(132,91),t.lineTo(158,121),t.stroke(),t.strokeStyle=`#171716`,t.lineWidth=10,t.beginPath(),t.moveTo(145,109),t.lineTo(174,84),t.stroke(),t.fillStyle=`#2b2420`,t.fillRect(61,151,25,27),t.fillRect(107,151,25,27),t.fillStyle=`#c59442`,t.fillRect(57,103,78,8)})}function vp(e){return fp(96,t=>{if(t.clearRect(0,0,96,96),e===`ammo`)t.fillStyle=`#5f633f`,t.fillRect(19,36,58,38),t.strokeStyle=`#c6aa54`,t.lineWidth=4,t.strokeRect(23,40,50,30),t.fillStyle=`#d5b95f`,t.fillRect(44,28,8,32);else if(e===`medkit`)t.fillStyle=`#d7dccd`,t.fillRect(41,24,14,52),t.fillStyle=`#c64c32`,t.fillRect(33,42,30,14),t.fillStyle=`#6f8f76`,t.fillRect(44,12,8,13);else if(e===`stimpak`)t.fillStyle=`#d9ddd1`,t.fillRect(39,18,18,58),t.fillStyle=`#b74832`,t.fillRect(31,40,34,13),t.fillStyle=`#7e9975`,t.fillRect(43,9,10,12);else if(e===`water`)t.fillStyle=`#568ba0`,t.fillRect(31,25,34,52),t.fillStyle=`rgba(194,231,232,.72)`,t.fillRect(36,38,24,32),t.fillStyle=`#394f49`,t.fillRect(38,16,20,12);else if(e===`ration`)t.fillStyle=`#8c7648`,t.fillRect(22,31,52,45),t.strokeStyle=`#d2b96b`,t.lineWidth=4,t.strokeRect(26,35,44,37),t.fillStyle=`#6f2e24`,t.fillRect(31,48,34,10);else if(e===`scrap`)t.fillStyle=`#6c706a`,t.fillRect(23,34,51,11),t.fillRect(42,22,12,56),t.strokeStyle=`#b38245`,t.lineWidth=5,t.beginPath(),t.arc(62,62,17,0,Math.PI*2),t.stroke();else if(e===`lockpick`)t.strokeStyle=`#d4c58b`,t.lineWidth=5,t.beginPath(),t.moveTo(21,72),t.lineTo(67,27),t.lineTo(77,18),t.stroke(),t.strokeStyle=`#70634b`,t.lineWidth=9,t.beginPath(),t.moveTo(18,76),t.lineTo(31,63),t.stroke();else if(e===`electronics`){t.fillStyle=`#4c624f`,t.fillRect(22,25,52,48),t.strokeStyle=`#9fbb76`,t.lineWidth=3,t.strokeRect(27,30,42,38),t.fillStyle=`#d5b95f`;for(let e=0;e<4;e+=1)t.fillRect(29+e*11,18,5,11);t.fillStyle=`#242d25`,t.fillRect(38,39,20,22)}else if(e===`nuka_cola`)t.fillStyle=`#7a2c25`,t.fillRect(32,22,32,56),t.fillStyle=`#ddd0a8`,t.fillRect(35,42,26,17),t.fillStyle=`#c9b450`,t.fillRect(40,12,16,11);else if(e===`whiskey`)t.fillStyle=`#6d4a28`,t.fillRect(31,31,34,47),t.fillStyle=`#b8803e`,t.fillRect(37,44,22,23),t.fillStyle=`#3d2b20`,t.fillRect(39,17,18,16);else if(e===`jet`||e===`med_x`)t.fillStyle=e===`jet`?`#7d6d4f`:`#d5d8cb`,t.fillRect(24,34,48,34),t.fillStyle=e===`jet`?`#c5a14c`:`#b34a3a`,t.fillRect(33,42,30,17),t.fillStyle=`#44433b`,t.fillRect(41,20,14,16);else if(e===`antivenom`||e===`antibiotics`)t.fillStyle=e===`antivenom`?`#6f9a65`:`#d8d3b9`,t.fillRect(31,25,34,51),t.fillStyle=e===`antivenom`?`#b7d264`:`#5d8c8f`,t.fillRect(37,40,22,23),t.fillStyle=`#403d34`,t.fillRect(38,15,20,12);else if(e===`torch`)t.strokeStyle=`#6b4729`,t.lineWidth=10,t.beginPath(),t.moveTo(38,78),t.lineTo(54,34),t.stroke(),t.fillStyle=`#d98b3f`,t.beginPath(),t.moveTo(53,38),t.quadraticCurveTo(69,20,57,10),t.quadraticCurveTo(42,25,53,38),t.fill();else if(e===`cactus_fruit`){t.fillStyle=`#4f7845`,t.beginPath(),t.ellipse(48,55,19,30,-.08,0,Math.PI*2),t.fill(),t.strokeStyle=`#a7bd72`,t.lineWidth=2;for(let e=38;e<=69;e+=10)t.beginPath(),t.moveTo(36,e),t.lineTo(60,e-2),t.stroke();t.fillStyle=`#bf4e68`;for(let[e,n]of[[34,31],[49,24],[63,34]])t.beginPath(),t.ellipse(e,n,8,11,0,0,Math.PI*2),t.fill()}else if(e===`broc_flower`){t.strokeStyle=`#54794a`,t.lineWidth=7,t.beginPath(),t.moveTo(47,78),t.quadraticCurveTo(41,55,49,35),t.stroke(),t.fillStyle=`#678e54`,t.beginPath(),t.ellipse(35,60,15,7,-.5,0,Math.PI*2),t.ellipse(59,55,15,7,.5,0,Math.PI*2),t.fill(),t.fillStyle=`#d8cb72`;for(let e=0;e<7;e+=1){let n=e/7*Math.PI*2;t.beginPath(),t.arc(48+Math.cos(n)*14,29+Math.sin(n)*11,7,0,Math.PI*2),t.fill()}t.fillStyle=`#7b4f2c`,t.beginPath(),t.arc(48,29,7,0,Math.PI*2),t.fill()}else if(e===`armor`)t.fillStyle=`#5a5147`,t.beginPath(),t.moveTo(29,22),t.lineTo(67,22),t.lineTo(76,70),t.lineTo(58,80),t.lineTo(48,61),t.lineTo(38,80),t.lineTo(20,70),t.fill(),t.strokeStyle=`#b18b48`,t.lineWidth=4,t.stroke();else if(e===`keycard`){t.fillStyle=`#c5b77c`,t.fillRect(17,27,62,43),t.strokeStyle=`#584a32`,t.lineWidth=4,t.strokeRect(21,31,54,35),t.fillStyle=`#6e8f72`,t.fillRect(27,38,18,18),t.fillStyle=`#7b3025`,t.fillRect(51,38,17,5),t.fillRect(51,48,12,4),t.fillStyle=`#d5b95f`;for(let e=0;e<4;e+=1)t.fillRect(26+e*13,70,7,7)}else t.shadowColor=`#d5b95f`,t.shadowBlur=16,t.fillStyle=`#9d8b62`,t.fillRect(31,18,34,62),t.fillStyle=`#557b86`,t.fillRect(38,27,20,42),t.fillStyle=`#c64c32`,t.fillRect(27,13,42,12),t.fillRect(27,69,42,12),t.shadowBlur=0})}function yp(e){let t=e===`sera-holt`?{coat:`#455f52`,skin:`#bd895f`,hat:`#d8d1b8`,band:`#8c3f32`,scarf:`#d9e0ce`,accent:`#7ea38d`}:e===`niko-ortega`?{coat:`#40586a`,skin:`#b77b50`,hat:`#b69255`,band:`#3f2c25`,scarf:`#c9aa69`,accent:`#6f91a3`}:e===`abel-crow`?{coat:`#59473a`,skin:`#7f6d55`,hat:`#6d5235`,band:`#2e2822`,scarf:`#a4a077`,accent:`#9a784a`}:e===`tamsin-vale`?{coat:`#77603a`,skin:`#c28a5f`,hat:`#b5945a`,band:`#4b3525`,scarf:`#56766d`,accent:`#d0ae62`}:e===`sable-reyes`?{coat:`#6d3e39`,skin:`#a96d4f`,hat:`#4b342d`,band:`#d1a54f`,scarf:`#c8b98e`,accent:`#9c5b45`}:e===`orrin-pike`?{coat:`#4c5843`,skin:`#81745b`,hat:`#665538`,band:`#2d2c25`,scarf:`#a89e70`,accent:`#6f8359`}:e===`lark-danner`?{coat:`#4a5e68`,skin:`#c78e67`,hat:`#8d7248`,band:`#374049`,scarf:`#d1c38e`,accent:`#7999a2`}:{coat:`#6f4b2e`,skin:`#d0a06d`,hat:`#73502d`,band:`#4b3023`,scarf:`#eee0bf`,accent:`#d6b46f`};return fp(192,e=>{e.clearRect(0,0,192,192),e.fillStyle=t.coat,e.fillRect(55,77,82,82),e.fillStyle=t.skin,e.fillRect(70,50,52,42),e.fillStyle=t.band,e.fillRect(63,58,66,12),e.fillStyle=t.accent,e.fillRect(40,42,112,12),e.fillStyle=t.hat,e.fillRect(61,25,70,24),e.fillStyle=t.scarf,e.beginPath(),e.moveTo(75,82),e.lineTo(96,120),e.lineTo(117,82),e.fill(),e.fillStyle=`#2c241e`,e.fillRect(71,156,26,24),e.fillRect(108,156,26,24),e.strokeStyle=`#41301f`,e.lineWidth=8,e.beginPath(),e.moveTo(139,70),e.lineTo(157,169),e.stroke(),e.strokeStyle=`#a9a197`,e.beginPath(),e.arc(147,69,18,Math.PI*.9,Math.PI*2.05),e.stroke()})}function bp(e){return fp(256,t=>{t.clearRect(0,0,256,256);let n=e===`juniper-brahmin`?`#8c5b3b`:`#75503b`,r=e===`juniper-brahmin`?`#b17a52`:`#98705a`;t.fillStyle=n,t.beginPath(),t.ellipse(127,143,76,47,-.03,0,Math.PI*2),t.fill(),t.fillStyle=r,t.beginPath(),t.ellipse(91,131,30,25,-.25,0,Math.PI*2),t.ellipse(159,132,33,26,.2,0,Math.PI*2),t.fill(),t.fillStyle=n;for(let[e,r]of[[82,-.12],[111,-.03],[153,.04],[181,.12]])t.save(),t.translate(e,165),t.rotate(r),t.fillRect(-8,0,16,61),t.fillStyle=`#3d3029`,t.fillRect(-10,52,20,11),t.restore(),t.fillStyle=n;for(let e of[-1,1]){let i=127+e*31;t.strokeStyle=n,t.lineWidth=28,t.lineCap=`round`,t.beginPath(),t.moveTo(127+e*20,129),t.quadraticCurveTo(i,91,127+e*45,75),t.stroke(),t.fillStyle=r,t.beginPath(),t.ellipse(127+e*53,70,31,22,e*.18,0,Math.PI*2),t.fill(),t.fillStyle=`#221c18`,t.beginPath(),t.arc(127+e*61,66,3.6,0,Math.PI*2),t.fill(),t.strokeStyle=`#d8c69a`,t.lineWidth=7,t.beginPath(),t.arc(127+e*57,48,19,e<0?Math.PI*.96:Math.PI*1.04,e<0?Math.PI*1.77:Math.PI*.23,e>0),t.stroke()}t.fillStyle=`#64543b`,t.fillRect(73,108,108,18),t.fillStyle=`#927449`,t.fillRect(61,112,43,51),t.fillRect(154,112,43,51),t.strokeStyle=`#c7a759`,t.lineWidth=5,t.beginPath(),t.arc(127,114,18,0,Math.PI),t.stroke()})}var xp=class{host;renderer;composer;atmospherePass;scene=new Ja;camera=new Xc(67,16/9,.05,190);enemySprites=new Map;npcSprites=new Map;pickupSprites=new Map;doorMeshes=new Map;campSites=new Map;waterMeshes=[];campfires=[];exteriorTerrain;silhouetteCasters=[];bloodParticles=[];decals=[];ambient=new nl(16768946,.58);hemisphere=new Rc(16770746,4861990,1);sun=new tl(16769188,3.4);sunTarget=new Ra;sunGlow=pp();sunDisc;sunDirection=new U;projectedSun=new U;wastelandSky=gp();targetCameraPosition=new U;cameraRenderTarget=new U;weapon=new za;muzzleLight=new Qc(16757844,0,3);pipLight=new Qc(11066502,0,13,1.3);torchLight=new Qc(16757082,0,18,1.18);rain;dust;raycaster=new Sl;pointer=new H;targetYaw=0;currentYaw=0;targetLookYaw=0;targetPitch=0;currentPitch=0;lastTime=performance.now();weaponKick=0;cameraShake=0;pipLightActive=!1;torchActive=!1;swimming=!1;renderScale=1;performanceFrames=0;performanceTime=0;performanceChecked=!1;animationFrame=0;resizeObserver;gameState;constructor(e,t){this.host=e,this.gameState=t,this.renderer=new Uf({antialias:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=Qr,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.08,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=2,this.renderer.setClearColor(13020534,1),this.renderer.domElement.className=`game-canvas`,this.host.append(this.renderer.domElement),this.scene.background=this.wastelandSky,this.scene.fog=new qa(13743999,22,112),this.scene.add(this.ambient),this.scene.add(this.hemisphere),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024);let n=this.sun.shadow.camera;n.left=-14,n.right=14,n.top=14,n.bottom=-14,n.near=.5,n.far=68,this.sun.shadow.bias=-7e-4,this.sun.shadow.normalBias=.035,this.sun.target=this.sunTarget,this.scene.add(this.sunTarget),this.scene.add(this.sun),this.sunDisc=new ls(new Yo({map:this.sunGlow,color:16770464,transparent:!0,depthWrite:!1,depthTest:!0,blending:2,opacity:.92,fog:!1})),this.sunDisc.scale.set(6.2,6.2,1),this.scene.add(this.sunDisc),this.camera.rotation.order=`YXZ`,this.scene.add(this.camera),this.pipLight.position.set(.32,-.2,-.28),this.camera.add(this.pipLight),this.torchLight.position.set(0,-.05,-.35),this.camera.add(this.torchLight),this.rain=this.buildRain(),this.scene.add(this.rain),this.dust=this.buildDust(),this.scene.add(this.dust),this.buildLevel(t),this.buildWeapon(),this.configureWorldShadows(),this.composer=new Qf(this.renderer),this.composer.setPixelRatio(1),this.composer.addPass(new tp(this.scene,this.camera)),this.atmospherePass=new Yf(op),this.composer.addPass(this.atmospherePass),this.composer.addPass(new ep),this.syncState(t,!1),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.host),this.resize(),this.animationFrame=requestAnimationFrame(e=>this.render(e))}lookVertical(e){this.targetPitch=Hi.clamp(this.targetPitch-e*.006,-.5,.48)}lookHorizontal(e){this.targetLookYaw=Hi.clamp(this.targetLookYaw+e*.0054,-.82,.82)}resetLook(){this.targetPitch=0,this.targetLookYaw=0}surfaceHeight(e){return be(this.gameState,e)===`interior`?0:cp(this.gameState.worldSeed,e.x,e.z)}worldPosition(e,t=0){return sp(e,this.surfaceHeight(e)+t)}terrainTileGeometry(e,t=0){let n=(e.x-.5)*np,r=(e.x+.5)*np,i=(e.z-.5)*np,a=(e.z+.5)*np,o=this.gameState.worldSeed,s=new Uo;return s.setAttribute(`position`,new jo([n,cp(o,e.x-.5,e.z-.5)+t,i,r,cp(o,e.x+.5,e.z-.5)+t,i,r,cp(o,e.x+.5,e.z+.5)+t,a,n,cp(o,e.x-.5,e.z+.5)+t,a],3)),s.setAttribute(`uv`,new jo([0,0,1,0,1,1,0,1],2)),s.setIndex([0,2,1,0,3,2]),s.computeVertexNormals(),s}exteriorTerrainGeometry(e){let t=[],n=[],r=[];for(let i=-42;i<e.height+42;i+=1)for(let a=-42;a<e.width+42;a+=1){let o=(a-.5)*np,s=(a+.5)*np,c=(i-.5)*np,l=(i+.5)*np,u=t.length/3;t.push(o,cp(e.worldSeed,a-.5,i-.5),c,s,cp(e.worldSeed,a+.5,i-.5),c,s,cp(e.worldSeed,a+.5,i+.5),l,o,cp(e.worldSeed,a-.5,i+.5),l),n.push(0,0,1,0,1,1,0,1),r.push(u,u+2,u+1,u,u+3,u+2)}let i=new Uo;return i.setAttribute(`position`,new jo(t,3)),i.setAttribute(`uv`,new jo(n,2)),i.setIndex(r),i.computeVertexNormals(),i}pick(e,t){let n=this.renderer.domElement.getBoundingClientRect();if(n.width<=0||n.height<=0)return;this.pointer.set((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);let r=this.raycaster.intersectObjects(this.scene.children,!0);for(let e of r){let t=e.object;for(;t!==null;){let e=t.userData.interaction;if(e!==void 0)return e;t=t.parent}if(e.object instanceof q)return}}syncState(e,t=!0){this.gameState=e,this.swimming=ve(e),this.targetCameraPosition.copy(this.worldPosition(e.player.position,this.swimming?ap:ip)),this.targetYaw=-e.player.direction*(Math.PI/2),t||(this.camera.position.copy(this.targetCameraPosition),this.currentYaw=this.targetYaw+this.targetLookYaw,this.camera.rotation.y=this.currentYaw);let n=be(e,e.player.position)===`interior`,r=n?1:Oe(e),i=!n&&e.weather.kind===`rain`,a=je(e);this.pipLightActive=e.player.pipLightOn,this.torchActive=e.player.torchLit&&e.player.torchFuel>0;let o=xe(e,e.player.position).level,s=o>=4?12029283:o===3?12818794:o===2?13281396:13743999,c=this.scene.fog,l=new K(i?5858154:s),u=n?new K(a?1053199:1907478):new K(1120807).lerp(l,r);this.scene.background=n||i?u:this.wastelandSky,c.color.copy(u);let d=Me(e),f=i?10:22,p=i?38-e.weather.intensity*5:112;c.near=n?3.5:Hi.lerp(3.5,f,r),c.far=n?d*np+3.5:Hi.lerp(d*np+3.5,p,r),this.ambient.intensity=n?a?.09:.23:Hi.lerp(a?.08:.15,i?.43:.62,r),this.hemisphere.intensity=n?a?.05:.13:Hi.lerp(.12,i?.48:1.05,r),this.sun.intensity=n?.02:Hi.lerp(.035,i?.72:3.8,r),this.sun.castShadow=!n&&r>.52&&!i,this.pipLight.intensity=this.pipLightActive?this.torchActive?1.2:5.8:0,this.torchLight.intensity=this.torchActive?8.2:0,this.rain.visible=i,this.exteriorTerrain!==void 0&&(this.exteriorTerrain.visible=!n),this.updateAtmosphere(e,n,r,i),this.atmospherePass.uniforms.uWater.value=+!!this.swimming,this.atmospherePass.uniforms.uDaylight.value=n?1:r;let m=up(e,e.player.position);for(let t of e.enemies){let n=this.enemySprites.get(t.id)??this.buildEnemy(t),r=this.worldPosition(t.position,t.hp>0?.94:.18);if(n.userData.target=r,n.userData.gridPosition={...t.position},n.userData.dead=t.hp<=0,n.visible=up(e,t.position)===m,t.hp<=0||(t.unconsciousTurns??0)>0){let e=t.kind===`raider`?1.45:t.kind===`scorpion`?1.95:1.7;n.scale.set(e,.32,1),n.material.opacity=t.hp<=0?.5:.76,n.material.color.setHex(t.hp<=0?9207145:11970952)}else{let{width:e,height:r}=dp(t.kind);n.scale.set(e,r,1),n.material.opacity=1,n.material.color.setHex(16777215)}}for(let n of e.npcs){let r=this.npcSprites.get(n.id)??this.buildProspector(n.position,e);if(r===void 0)continue;let i=n.species===`brahmin`?.82:1.02,a=this.worldPosition(n.position,n.hp<=0||n.unconsciousTurns>0?.18:i);r.userData.target=a,t||r.position.copy(a),r.userData.gridPosition={...n.position},r.userData.interaction={type:`prospector`,id:n.id},r.visible=up(e,n.position)===m,n.hp<=0||n.unconsciousTurns>0?(r.scale.set(n.species===`brahmin`?2.7:1.55,n.species===`brahmin`?.46:.34,1),r.material.opacity=n.hp<=0?.48:.76,r.material.color.setHex(n.hp<=0?8417123:12694417)):(r.scale.set(n.species===`brahmin`?2.85:1.55,n.species===`brahmin`?1.78:2.05,1),r.material.opacity=1,r.material.color.setHex(n.hostile?16761e3:16777215))}for(let t of e.pickups){let n=this.pickupSprites.get(t.id)??this.buildPickup(t);n.visible=!t.collected&&up(e,t.position)===m}e.tiles.forEach((t,n)=>{t.forEach((t,r)=>{if(t!==`door`&&t!==`locked_door`&&t!==`security_door`)return;let i=this.doorMeshes.get(`${r},${n}`);if(i!==void 0){let t=this.surfaceHeight({x:r,z:n});i.userData.targetY=t+(ye(e,{x:r,z:n})?-2.25:rp/2)}})});for(let t of this.campSites.values())t.marker.visible=!e.campBuilt,t.shelter.visible=e.campBuilt}playEvents(e){for(let t of e)t.type===`shot`?(t.sourceId===`player`&&(this.weaponKick=1,this.muzzleLight.intensity=8,t.hit||this.spawnImpactDecal()),t.targetId===`player`&&t.hit&&(this.cameraShake=Math.min(1.5,this.cameraShake+.75)),t.sourceId===`player`&&t.hit&&t.targetId!==`player`&&this.spawnTargetBlood(t.targetId,t.critical)):t.type===`melee`&&(this.weaponKick=.58,this.cameraShake=Math.min(.65,this.cameraShake+.24),t.hit&&t.targetId!==`none`&&this.spawnTargetBlood(t.targetId,t.critical))}destroy(){cancelAnimationFrame(this.animationFrame),this.resizeObserver.disconnect(),this.composer.dispose(),this.atmospherePass.dispose(),this.sunGlow.dispose(),this.wastelandSky.dispose(),this.rain.geometry.dispose(),this.rain.material.dispose(),this.dust.geometry.dispose(),this.dust.material.dispose();for(let e of this.silhouetteCasters)e.geometry.dispose(),e.material.dispose(),e.customDepthMaterial?.dispose();this.renderer.dispose(),this.renderer.domElement.remove()}buildRain(){let e=new Float32Array(260*3);for(let t=0;t<260;t+=1)e[t*3]=(Math.random()-.5)*22,e[t*3+1]=Math.random()*9,e[t*3+2]=(Math.random()-.5)*22;let t=new Uo,n=new Oo(e,3);n.setUsage(ii),t.setAttribute(`position`,n);let r=new qs(t,new Hs({color:12178393,size:.055,transparent:!0,opacity:.62,depthWrite:!1,sizeAttenuation:!0}));return r.visible=!1,r}buildDust(){let e=new Float32Array(450);for(let t=0;t<150;t+=1)e[t*3]=(Math.random()-.5)*34,e[t*3+1]=.28+Math.random()*5.8,e[t*3+2]=(Math.random()-.5)*34;let t=new Uo;t.setAttribute(`position`,new Oo(e,3));let n=new qs(t,new Hs({color:15779212,size:.045,transparent:!0,opacity:.2,depthWrite:!1,sizeAttenuation:!0,blending:2}));return n.visible=!1,n}configureWorldShadows(){this.scene.traverse(e=>{if(!(e instanceof q))return;if(e.userData.isTerrain===!0||e.userData.isWater===!0){e.castShadow=!1,e.receiveShadow=e.userData.isTerrain===!0;return}if(e.userData.isSilhouetteCaster===!0){e.castShadow=!0,e.receiveShadow=!1;return}let t=e.parent;for(;t!==null;){if(t===this.camera){e.castShadow=!1,e.receiveShadow=!1;return}t=t.parent}let n=(Array.isArray(e.material)?e.material:[e.material]).some(e=>!(e instanceof ys));e.castShadow=n&&!(e.geometry instanceof oc),e.receiveShadow=n})}attachSilhouetteCaster(e,t,n=.08){let r=new ys({map:t,alphaTest:n,side:2});r.colorWrite=!1,r.depthWrite=!1;let i=new q(new oc(1,1),r);i.customDepthMaterial=new yc({map:t,alphaTest:n,depthPacking:Zr,side:2}),i.castShadow=!0,i.receiveShadow=!1,i.frustumCulled=!1,i.userData.isSilhouetteCaster=!0,i.userData.source=e,i.raycast=()=>void 0,this.silhouetteCasters.push(i),this.scene.add(i)}updateAtmosphere(e,t,n,r){let i=(e.timeMinutes%1440+1440)%1440,a=Hi.clamp((i-270)/(16.5*60),0,1),o=.025+Math.sin(a*Math.PI)*.895,s=(a-.5)*Math.PI*1.08,c=Math.sqrt(Math.max(0,1-o*o));this.sunDirection.set(Math.cos(s)*c,o,Math.sin(s)*c).normalize();let l=Hi.smoothstep(o,.12,.68);this.sun.color.lerpColors(new K(16747090),new K(16769710),l),this.sunDisc.material.color.lerpColors(new K(16752719),new K(16773040),l);let u=this.worldPosition(e.player.position,.6);this.sunTarget.position.copy(u),this.sun.position.copy(u).addScaledVector(this.sunDirection,34),this.sunDisc.position.copy(u).addScaledVector(this.sunDirection,62);let d=5.4+(1-o)*2.1;this.sunDisc.scale.set(d,d,1);let f=!t&&n>.025&&!r;this.sunDisc.visible=f,this.sunDisc.material.opacity=.38+n*.54;let p=Math.max(0,xe(e,e.player.position).level-1)*12e-5;this.atmospherePass.uniforms.uHeat.value=f?(.00145+o*9e-4+p)*n:0,this.atmospherePass.uniforms.uGodRays.value=f?(.62+o*.36)*n:0,this.atmospherePass.uniforms.uBloom.value=t?.45:r?.4:Hi.lerp(.34,.68,n),this.atmospherePass.uniforms.uBlur.value=t?.24:r?.48:Hi.lerp(.3,.2,n),this.atmospherePass.uniforms.uRain.value=r?e.weather.intensity/2:0,this.dust.visible=f,this.dust.material.opacity=(.12+o*.12)*n}buildLevel(e){let t=new za,n=new ec(np,rp,np),r=new vc({map:mp(),color:15976332,roughness:.94}),i=new vc({color:4209973,roughness:.88}),a=new ac(1,0),o=new vc({color:9070664,roughness:.98,flatShading:!0}),s=new vc({color:7295288,roughness:1,flatShading:!0}),c=new oc(np,np),l=new vc({map:hp(),color:14138759,roughness:1}),u=new vc({color:5065279,roughness:.92}),d=new vc({color:2697766,roughness:1,side:2}),f=new vc({color:3767170,emissive:1060660,emissiveIntensity:.18,roughness:.28,metalness:.08,transparent:!0,opacity:.72,depthWrite:!1,side:2}),p=new ac(.26,0),m=new vc({color:7885880,roughness:1,flatShading:!0}),h=new q(this.exteriorTerrainGeometry(e),l);h.userData.isTerrain=!0,this.exteriorTerrain=h,t.add(h),this.buildDistantHorizon(e,t),e.tiles.forEach((l,h)=>{l.forEach((l,g)=>{let _={x:g,z:h},v=be(e,_)===`interior`;if(l===`wall`){if(v){let e=new q(n,i);e.position.copy(this.worldPosition(_,rp/2)),t.add(e);return}let c=Math.abs(g*37+h*61+g*h*7);if((g===0||h===0||h===e.height-1||g>=31)&&c%6!=0)return;if(c%7==0){let e=new q(n,r);e.position.copy(this.worldPosition(_,rp*.36)),e.scale.set(.9,.72,.9),e.rotation.y=(c%5-2)*.045,t.add(e);return}let l=new za;l.position.copy(this.worldPosition(_));let u=.82+c%5*.08,d=new q(a,o);if(d.position.y=u,d.scale.set(1.18+c%3*.08,u,1.16+(c+1)%3*.08),d.rotation.set(c%3*.08,c%11*.17,c%4*-.04),l.add(d),c%3==0){let e=new q(a,s);e.position.set(.78,.48,-.62),e.scale.set(.72,.48,.68),e.rotation.y=.7,l.add(e)}t.add(l);return}if(v){let e=new q(c,u);e.rotation.x=-Math.PI/2,e.position.copy(this.worldPosition(_,0)),e.userData.isTerrain=!0,t.add(e);let n=new q(c,d);if(n.rotation.x=Math.PI/2,n.position.copy(this.worldPosition(_,2.43)),t.add(n),(g+h*2)%5==0){let e=new Qc(13134654,1.2,4.2);e.position.copy(this.worldPosition(_,rp-.18)),this.scene.add(e)}}else if(l===`water`){let e=new q(this.terrainTileGeometry(_,.14),f);e.userData.isWater=!0,e.userData.phase=g*.71+h*1.13,t.add(e),this.waterMeshes.push(e)}(l===`door`||l===`locked_door`||l===`security_door`)&&this.buildDoor(_,e,l),l===`locker`&&this.buildLocker(_,e),l===`terminal`&&this.buildTerminal(_,e),l===`prospector`&&this.buildProspector(_,e),l===`camp`&&this.buildCamp(_),l===`transition`&&this.buildTransition(_,e),l===`exit`&&this.buildExit(_);let y=e.enemies.some(e=>e.position.x===g&&e.position.z===h)||e.npcs.some(e=>e.position.x===g&&e.position.z===h)||e.pickups.some(e=>!e.collected&&e.position.x===g&&e.position.z===h),b=Math.abs(g*47+h*73+e.worldSeed*1e-4);if(!v&&l===`floor`&&!y&&Math.floor(b)%31==0)this.buildCactus(_,Math.floor(b),t);else if(!v&&l===`floor`&&!y&&Math.floor(b)%53==0){let e=new q(p,m);e.position.copy(this.worldPosition(_,.18)),e.position.x+=((g+h)%2==0?1:-1)*.72,e.position.z+=(g*h%2==0?1:-1)*.7,e.scale.set(1.4,.65,1),t.add(e)}})});for(let n of e.landmarks)this.buildLandmark(n,t);this.scene.add(t);for(let t of e.enemies)this.buildEnemy(t);for(let t of e.pickups)this.buildPickup(t)}buildLandmark(e,t){let n=new za;n.position.copy(this.worldPosition(e.position)),n.userData.interaction={type:`landmark`,id:e.id,position:{...e.position}};let r=new vc({color:5979431,roughness:.98}),i=new vc({color:10121285,roughness:.94}),a=new vc({color:11111266,roughness:1,side:2}),o=new vc({color:8206632,roughness:.86,metalness:.28}),s=new vc({color:2697507,roughness:.65,metalness:.42}),c=new vc({color:7688762,roughness:1,flatShading:!0});if(e.kind===`bridge`){let e=new q(new ec(np*1.14,.2,np*.96),i);e.position.y=.28,n.add(e);for(let e=-2;e<=2;e+=1){let t=new q(new ec(.045,.025,np*.92),r);t.position.set(e*.53,.395,0),n.add(t)}for(let e of[-1.08,1.08]){let t=new q(new ec(np*1.18,.11,.1),i);t.position.set(0,.92,e),n.add(t);for(let t of[-1.15,0,1.15]){let i=new q(new ec(.11,1.05,.11),r);i.position.set(t,.62,e),n.add(i)}}}else if(e.kind===`oasis`){let e=new vc({color:7109438,roughness:1});for(let t=0;t<16;t+=1){let r=t/16*Math.PI*2,i=new q(new nc(.018,.028,.62+t%4*.12,5),e);i.position.set(Math.cos(r)*1.08,.32,Math.sin(r)*1.06),i.rotation.z=Math.sin(r)*.12,n.add(i)}for(let[t,r,a]of[[-1.02,-.7,2.75],[1.12,.48,2.35],[.72,-1.05,2.05]]){let o=new q(new nc(.09,.18,a,7),i);o.position.set(t,a/2,r),o.rotation.z=t*.04,n.add(o);let s=new za;s.position.set(t,a,r);for(let t=0;t<7;t+=1){let n=new q(new ec(1.05,.055,.19),e);n.position.x=.45,n.rotation.y=t/7*Math.PI*2,n.rotation.z=-.22,s.add(n)}n.add(s)}let t=new q(new nc(.16,.2,1.3,7),i);t.position.set(-1.28,.65,1.08),n.add(t)}else if(e.kind===`wreck`){n.rotation.y=e.id.includes(`red-cut`)?-.36:e.id.includes(`juniper`)?.22:.08;let t=new q(new ec(2.05,.42,1.1),o);t.position.y=.45,t.rotation.z=e.id.includes(`mile-twelve`)?.08:0,n.add(t);let r=new q(new ec(.9,.55,.94),s);r.position.set(.18,.82,0),r.rotation.z=-.07,n.add(r);let i=new q(new ec(.78,.12,1.02),o);i.position.set(-1.08,.68,0),i.rotation.z=-.22,n.add(i);for(let e of[-.72,.72])for(let t of[-.58,.58]){let r=new q(new nc(.29,.29,.18,10),s);r.rotation.x=Math.PI/2,r.position.set(e,.28,t),n.add(r)}let a=new q(new oc(.58,.34),new ys({color:6717833,transparent:!0,opacity:.4,side:2}));a.position.set(-.28,.93,.481),a.rotation.z=-.08,n.add(a)}else if(e.kind===`teepee`){let e=new q(new rc(1.12,2.15,10,1,!0),a);e.position.y=1.08,e.rotation.y=Math.PI/10,n.add(e);for(let e of[-.15,.15]){let t=new q(new nc(.035,.055,2.75,6),r);t.position.y=1.42,t.rotation.z=e,n.add(t)}let t=new q(new oc(.5,.82),new ys({color:2366743}));t.position.set(0,.48,.98),n.add(t)}else if(e.kind===`campfire`){for(let e=0;e<9;e+=1){let t=e/9*Math.PI*2,r=new q(new ac(.16,0),c);r.position.set(Math.cos(t)*.54,.12,Math.sin(t)*.54),n.add(r)}for(let e of[-.65,.65]){let t=new q(new nc(.09,.12,1,7),r);t.rotation.z=Math.PI/2,t.rotation.y=e,t.position.y=.2,n.add(t)}let t=new q(new rc(.25,.72,7),new ys({color:16747061,transparent:!0,opacity:.9}));t.position.y=.42,n.add(t);let i=new Qc(16751695,2.7,7.5,1.6);i.position.y=.75,n.add(i),this.campfires.push({flame:t,light:i,phase:e.position.x*.7+e.position.z})}else if(e.kind===`settlement`){let t=new q(new nc(.07,.11,3.2,7),r);t.position.y=1.6,n.add(t);let a=new q(new ec(1.75,.58,.12),i);a.position.set(.48,2.1,0),a.rotation.z=-.05,n.add(a);let o=new q(new Uo().setFromPoints([new U(0,0,0),new U(1.12,-.3,0),new U(0,-.62,0)]),new ys({color:e.id===`juniper-post`?6587242:10832952,side:2}));o.position.set(.08,3.05,0),n.add(o);for(let e of[-.9,.9]){let t=new q(new ec(2.1,.13,.12),r);t.position.set(.2,.65,e),t.rotation.y=e>0?.1:-.1,n.add(t)}}else{let e=new za;for(let t=0;t<5;t+=1){let n=new q(new ac(.42-t*.05,0),c);n.scale.y=.48,n.position.y=.18+t*.3,n.rotation.y=t*.7,e.add(n)}n.add(e);let t=new q(new ec(2.3,.12,.12),i);t.position.set(0,1.15,-.85),n.add(t);for(let e of[-1.05,1.05]){let t=new q(new ec(.13,1.2,.13),r);t.position.set(e,.6,-.85),n.add(t)}}t.add(n)}buildDistantHorizon(e,t){let n=new vc({color:7230788,roughness:1,flatShading:!0}),r=new vc({color:7753785,roughness:1,flatShading:!0}),i=new vc({color:9988933,roughness:1,flatShading:!0}),a=new rc(1,1,6),o=new ac(1,0);[[-16,-17,0],[-4,-21,1],[8,-19,2],[19,-23,4],[31,-20,3],[44,-22,1],[56,-17,2],[57,-3,1],[60,10,3],[58,24,2],[50,38,1],[36,42,3],[21,40,2],[5,42,1],[-11,37,3],[-20,25,2],[-21,11,1],[-19,-3,3]].forEach(([s,c,l],u)=>{let d=Math.abs((e.worldSeed>>>0)*13e-5+s*43+c*71+u*101),f=8.5+Math.floor(d)%5*1.45+l*1.25,p=6.2+Math.floor(d/3)%5*1.05+l*.75,m=new za;m.position.copy(sp({x:s,z:c},cp(e.worldSeed,s,c)-.6));let h=new q(a,u%3==0?n:r);h.position.y=f/2,h.scale.set(p,f,p*(.7+u%3*.08)),h.rotation.y=d*.017,m.add(h);let g=new q(o,i);g.position.set(p*.5,f*.25,p*.08),g.scale.set(p*.62,f*.34,p*.5),g.rotation.y=.35+d*.006,m.add(g);let _=new q(o,n);_.position.set(-p*.55,f*.18,-p*.12),_.scale.set(p*.75,f*.24,p*.64),m.add(_),t.add(m)})}buildCactus(e,t,n){let r=new za;r.position.copy(this.worldPosition(e)),r.position.x+=(t%2==0?1:-1)*(.48+t%4*.08),r.position.z+=(t%3==0?1:-1)*(.42+t%5*.06);let i=new vc({color:t%3==0?5602117:4746557,roughness:.92}),a=new vc({color:13065843,roughness:.8,emissive:3478297,emissiveIntensity:.16}),o=1.18+t%5*.1,s=new q(new nc(.13,.2,o,7),i);s.position.y=o/2,r.add(s);let c=new q(new sc(.145,7,5),i);c.scale.y=1.25,c.position.y=o,r.add(c);let l=t%2==0?1:-1,u=new q(new nc(.09,.11,.48,7),i);u.rotation.z=Math.PI/2,u.position.set(l*.22,o*.56,0),r.add(u);let d=new q(new nc(.08,.11,.52,7),i);d.position.set(l*.44,o*.7,0),r.add(d);let f=new q(new sc(.07,6,4),a);f.scale.y=.55,f.position.set(l*.44,o*.97,0),r.add(f);let p=.86+t%4*.07;r.scale.setScalar(p),n.add(r)}buildEnemy(e){let t=_p(e.kind),n=new ls(new Yo({map:t,transparent:!0,alphaTest:.08,depthWrite:!1}));n.position.copy(this.worldPosition(e.position,.94));let{width:r,height:i}=dp(e.kind);return n.scale.set(r,i,1),n.userData.target=n.position.clone(),n.userData.gridPosition={...e.position},n.userData.interaction={type:`enemy`,id:e.id},this.enemySprites.set(e.id,n),this.scene.add(n),this.attachSilhouetteCaster(n,t),n}buildPickup(e){let t=vp(e.kind),n=new ls(new Yo({map:t,transparent:!0,alphaTest:.04,depthWrite:!1}));return n.position.copy(this.worldPosition(e.position,.55)),n.scale.set(e.kind===`condenser`?1.05:.82,e.kind===`condenser`?1.05:.82,1),n.userData.phase=e.position.x*.7+e.position.z,n.userData.baseY=n.position.y,n.userData.gridPosition={...e.position},n.userData.interaction={type:`pickup`,id:e.id},n.visible=!e.collected,this.pickupSprites.set(e.id,n),this.scene.add(n),this.attachSilhouetteCaster(n,t,.04),n}addDecal(e){for(e.userData.isDecal=!0,this.decals.push(e),this.scene.add(e);this.decals.length>32;){let e=this.decals.shift();e!==void 0&&this.scene.remove(e)}}spawnTargetBlood(e,t){let n=this.enemySprites.get(e)??this.npcSprites.get(e);if(n===void 0)return;let r=n.position.clone();r.y+=n.scale.y*.28;let i=n.userData.gridPosition,a=i===void 0?0:this.surfaceHeight(i),o=t?11:7;for(let e=0;e<o;e+=1){let n=new q(new sc(t?.065:.045,4,3),new ys({color:e%3==0?8200472:5117716}));n.position.copy(r),n.position.x+=(Math.random()-.5)*.25,n.position.z+=(Math.random()-.5)*.25,n.userData.groundY=a,this.scene.add(n),this.bloodParticles.push({mesh:n,velocity:new U((Math.random()-.5)*2.4,.8+Math.random()*1.5,(Math.random()-.5)*2.4),life:.55+Math.random()*.35})}let s=new q(new tc(t?.36:.24,11),new ys({color:4921106,transparent:!0,opacity:t?.72:.5,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));s.rotation.x=-Math.PI/2,s.position.set(n.position.x+(Math.random()-.5)*.22,a+.018,n.position.z+(Math.random()-.5)*.22),s.scale.set(1.35,.72+Math.random()*.28,1),this.addDecal(s)}spawnImpactDecal(){this.raycaster.setFromCamera(new H(0,0),this.camera);let e=this.scene.children.filter(e=>e!==this.camera&&!e.userData.isDecal),t=this.raycaster.intersectObjects(e,!0).find(e=>e.object instanceof q&&e.face!==null&&!e.object.userData.isDecal);if(t===void 0||t.face==null)return;let n=t.face.normal.clone().transformDirection(t.object.matrixWorld),r=new q(new tc(.075,8),new ys({color:2300694,transparent:!0,opacity:.82,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3}));r.position.copy(t.point).addScaledVector(n,.012),r.quaternion.setFromUnitVectors(new U(0,0,1),n);let i=.72+Math.random()*.6;r.scale.set(i,i*(.72+Math.random()*.28),1),this.addDecal(r)}buildDoor(e,t,n){let r=t.tiles[e.z-1]?.[e.x]===`wall`&&t.tiles[e.z+1]?.[e.x]===`wall`,i=new vc({color:n===`security_door`?5005916:n===`locked_door`?6705469:6838857,metalness:n===`security_door`?.48:.26,roughness:.55}),a=new q(new ec(r?.22:np*.92,rp*.96,r?np*.92:.22),i);a.position.copy(this.worldPosition(e,rp/2)),a.userData.targetY=a.position.y;let o=t.devices.find(t=>lp(t.position,e));a.userData.interaction=n===`door`||o===void 0?{type:`gate`,position:{...e}}:{type:`device`,id:o.id,position:{...e}},this.doorMeshes.set(`${e.x},${e.z}`,a),this.scene.add(a);let s=new q(new ec(r?.24:np*.75,.13,r?np*.75:.24),new ys({color:n===`security_door`?8372388:14791502}));s.position.set(0,.12,0),a.add(s)}buildLocker(e,t){let n=t.devices.find(t=>lp(t.position,e));if(n===void 0)return;let r=new za;r.position.copy(this.worldPosition(e)),r.userData.interaction={type:`device`,id:n.id,position:{...e}};let i=new q(new ec(1.45,1.9,.72),new vc({color:5989468,metalness:.5,roughness:.48}));i.position.y=.95,r.add(i);let a=new q(new ec(.05,1.55,.76),new ys({color:2435623}));a.position.set(0,.98,.02),r.add(a);let o=new q(new ec(.19,.24,.12),new ys({color:12952396}));o.position.set(.24,1.02,.43),r.add(o),this.scene.add(r)}buildTerminal(e,t){let n=t.devices.find(t=>lp(t.position,e));if(n===void 0)return;let r=new za;r.position.copy(this.worldPosition(e)),r.userData.interaction={type:`device`,id:n.id,position:{...e}};let i=new q(new ec(1.2,1.25,.82),new vc({color:4145724,metalness:.38,roughness:.5}));i.position.y=.62,r.add(i);let a=new q(new oc(.78,.48),new ys({color:8365423}));a.position.set(0,1.06,.416),r.add(a);let o=new Qc(9619576,1.5,2.8);o.position.set(0,1.05,.65),r.add(o),this.scene.add(r)}buildProspector(e,t){let n=t.npcs.find(t=>lp(t.position,e));if(n===void 0)return;let r=n.species===`brahmin`?bp(n.id):yp(n.id),i=new ls(new Yo({map:r,transparent:!0,alphaTest:.08,depthWrite:!1}));if(i.position.copy(this.worldPosition(e,n.species===`brahmin`?.82:1.02)),i.scale.set(n.species===`brahmin`?2.85:1.55,n.species===`brahmin`?1.78:2.05,1),i.userData.target=i.position.clone(),i.userData.gridPosition={...e},i.userData.interaction={type:`prospector`,id:n.id},this.npcSprites.set(n.id,i),this.scene.add(i),this.attachSilhouetteCaster(i,r),n.species!==`brahmin`){let t=new q(new nc(.16,.21,1.7,6),new vc({color:6177840,roughness:.95}));t.position.copy(this.worldPosition(e,.85)),t.position.x+=.85,this.scene.add(t)}return i}buildCamp(e){let t=this.worldPosition(e),n=new za;n.position.copy(t),n.userData.interaction={type:`camp`,position:{...e}};let r=new vc({color:6111528,roughness:1});for(let e of[-.62,.62]){let t=new q(new nc(.06,.08,1.1,6),r);t.position.set(e,.55,0),n.add(t)}let i=new q(new ec(1.55,.42,.09),new vc({color:12884568,roughness:.92}));i.position.set(0,.82,0),n.add(i),this.scene.add(n);let a=new za;a.position.copy(t),a.userData.interaction={type:`camp`,position:{...e}};let o=new q(new rc(1.15,1.4,4),new vc({color:8939076,roughness:1,side:2}));o.rotation.y=Math.PI/4,o.position.y=.72,a.add(o);let s=new q(new ec(1.25,.18,.42),new vc({color:6111528,roughness:1}));s.position.set(.78,.38,.45),a.add(s);let c=new Qc(16757596,2.2,4.5);c.position.set(-.45,.7,.4),a.add(c),this.scene.add(a),this.campSites.set(`${e.x},${e.z}`,{marker:n,shelter:a})}buildTransition(e,t){let n=t.transitions.find(t=>lp(t.position,e));if(n===void 0)return;let r=n.destinationEnvironment===`interior`,i=new za;i.position.copy(this.worldPosition(e)),i.userData.interaction={type:`transition`,id:n.id,position:{...e}};let a=new vc({color:r?5720633:4608329,metalness:.36,roughness:.58}),o=new vc({color:r?3024929:2699821,metalness:.24,roughness:.68}),s=new ys({color:r?13670986:8566652});(t.tiles[e.z]?.[e.x-1]!==`wall`||t.tiles[e.z]?.[e.x+1]!==`wall`)&&(i.rotation.y=Math.PI/2);for(let e of[-.88,.88]){let t=new q(new ec(.18,2.12,.26),a);t.position.set(e,1.06,0),i.add(t)}let c=new q(new ec(1.94,.2,.28),a);c.position.set(0,2.02,0),i.add(c);let l=new q(new ec(1.56,1.78,.16),o);l.position.set(0,.96,0),i.add(l);let u=new q(new ec(1.08,.18,.19),s);u.position.set(0,1.62,.1),i.add(u);let d=new Qc(r?14722902:9423242,1.8,3.2);d.position.set(0,1.68,.55),i.add(d),this.scene.add(i)}buildExit(e){let t=new vc({color:7296308,roughness:.88});for(let n of[-.95,.95]){let r=new q(new ec(.18,rp,.18),t);r.position.copy(this.worldPosition(e,rp/2)),r.position.x+=n,this.scene.add(r)}let n=new Qc(9425290,3.4,7);n.position.copy(this.worldPosition(e,2.15)),this.scene.add(n);let r=new q(new oc(.8,.46),new ys({color:11946029,side:2}));r.position.copy(this.worldPosition(e,2.02)),r.position.x+=.48,this.scene.add(r)}buildWeapon(){let e=new vc({color:5327171,metalness:.72,roughness:.34}),t=new vc({color:11569733,metalness:.78,roughness:.28}),n=new q(new ec(.22,.21,.58),e);n.position.z=-.12,this.weapon.add(n);let r=new q(new ec(.13,.12,.52),t);r.position.set(0,.04,-.5),this.weapon.add(r);let i=new q(new ec(.17,.34,.2),e);i.rotation.x=-.22,i.position.set(0,-.23,.02),this.weapon.add(i),this.muzzleLight.position.set(0,.05,-.82),this.weapon.add(this.muzzleLight),this.weapon.position.set(.34,-.32,-.67),this.weapon.rotation.y=-.08,this.camera.add(this.weapon)}resize(){let e=Math.max(1,this.host.clientWidth),t=Math.max(1,this.host.clientHeight),n=Math.min(1,960/e,540/t)*this.renderScale,r=Math.max(1,Math.floor(e*n)),i=Math.max(1,Math.floor(t*n));this.renderer.setSize(r,i,!1),this.composer.setSize(r,i),this.atmospherePass.uniforms.uResolution.value.set(r,i),this.renderer.domElement.style.width=`100%`,this.renderer.domElement.style.height=`100%`,this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}render(e){let t=Math.min(.05,(e-this.lastTime)/1e3);this.lastTime=e;let n=1-Math.exp(-t*14);this.cameraRenderTarget.copy(this.targetCameraPosition),this.swimming&&(this.cameraRenderTarget.y+=Math.sin(e*.0027)*.045+Math.sin(e*.0061)*.018),this.camera.position.lerp(this.cameraRenderTarget,n);let r=this.targetYaw+this.targetLookYaw,i=Math.atan2(Math.sin(r-this.currentYaw),Math.cos(r-this.currentYaw));this.currentYaw+=i*n,this.camera.rotation.y=this.currentYaw,this.currentPitch+=(this.targetPitch-this.currentPitch)*n,this.weaponKick*=Math.exp(-t*14),this.weapon.position.z=-.67+this.weaponKick*.2,this.weapon.rotation.x=-this.weaponKick*.25,this.muzzleLight.intensity*=Math.exp(-t*28),this.torchActive&&(this.torchLight.intensity=8.2+Math.sin(e*.017)*.52+Math.sin(e*.043)*.24),this.cameraShake*=Math.exp(-t*10),this.camera.rotation.z=Math.sin(e*.11)*this.cameraShake*.012,this.camera.rotation.x=this.currentPitch+Math.cos(e*.14)*this.cameraShake*.008;for(let e of this.enemySprites.values()){let t=e.userData.target;t!==void 0&&e.position.lerp(t,n)}for(let e of this.npcSprites.values()){let t=e.userData.target;t!==void 0&&e.position.lerp(t,n)}for(let t of this.pickupSprites.values()){if(!t.visible)continue;let n=Number(t.userData.phase??0),r=Number(t.userData.baseY??.55);t.position.y=r+Math.sin(e*.003+n)*.08}for(let t of this.waterMeshes){let n=Number(t.userData.phase??0);t.position.y=Math.sin(e*.0018+n)*.012}for(let t of this.campfires){let n=Math.sin(e*.011+t.phase)*.14+Math.sin(e*.027+t.phase*1.7)*.08;t.flame.scale.y=.9+n,t.flame.position.y=.38+n*.12,t.light.intensity=2.7+n*3}for(let e of this.silhouetteCasters){let t=e.userData.source;e.position.copy(t.position),e.scale.copy(t.scale),e.rotation.y=this.currentYaw,e.visible=t.visible}for(let e of this.doorMeshes.values()){let t=Number(e.userData.targetY??rp/2);e.position.y+=(t-e.position.y)*n*.6}if(this.rain.visible){let e=this.rain.geometry.getAttribute(`position`);for(let n=0;n<e.count;n+=1){let r=e.getY(n)-t*(8.5+n%7*.45);e.setY(n,r<0?8.5+n%11*.15:r)}e.needsUpdate=!0,this.rain.position.set(this.camera.position.x,0,this.camera.position.z)}this.dust.visible&&(this.dust.position.set(this.camera.position.x,0,this.camera.position.z),this.dust.rotation.y=e*18e-6);for(let e=this.bloodParticles.length-1;e>=0;--e){let n=this.bloodParticles[e];if(n===void 0)continue;n.life-=t,n.velocity.y-=4.8*t,n.mesh.position.addScaledVector(n.velocity,t),n.mesh.scale.multiplyScalar(Math.max(.88,1-t*1.8));let r=Number(n.mesh.userData.groundY??0);(n.life<=0||n.mesh.position.y<=r+.03)&&(this.scene.remove(n.mesh),this.bloodParticles.splice(e,1))}this.atmospherePass.uniforms.uTime.value=e/1e3,this.camera.updateMatrixWorld(),this.projectedSun.copy(this.sunDisc.position).project(this.camera);let a=this.sunDisc.visible&&this.projectedSun.z>=-1&&this.projectedSun.z<=1,o=this.atmospherePass.uniforms.uSunPosition.value;if(a?o.set(this.projectedSun.x*.5+.5,this.projectedSun.y*.5+.5):o.set(-2,-2),!this.performanceChecked&&t>0&&(this.performanceFrames+=1,this.performanceTime+=t,this.performanceFrames>=180)){let e=this.performanceTime/this.performanceFrames;e>1/31&&(this.renderScale=e>1/23?.7:.84,this.resize()),this.performanceChecked=!0}this.composer.render(t),this.animationFrame=requestAnimationFrame(e=>this.render(e))}},Sp=`project-cinder-save-v4`,Cp=`project-cinder-save-v3`,wp=[`project-cinder-manual-save-v1-slot-1`,`project-cinder-manual-save-v1-slot-2`,`project-cinder-manual-save-v1-slot-3`],Tp={roach:`RAD ROACH`,ant:`CINDER ANT`,gecko:`ASH GECKO`,scorpion:`MESA SCORPION`,raider:`DUST RAIDER`},Ep={roach:`An irradiated scavenger. Fragile, fast, and dangerous at biting range.`,ant:`Armoured mandibles and a relentless scent trail. It hits harder than a roach.`,gecko:`A heat-adapted pack hunter. Fast across open ground and difficult to stagger.`,scorpion:`An armoured desert predator with a crushing tail strike. Keep it beyond biting range.`,raider:`A rifle carrier in patched armour. Break line of sight before reloading.`},Dp={ammo:{title:`PISTOL ROUNDS`,copy:`Handloaded ammunition in a weathered field box.`},medkit:{title:`FIELD DRESSING`,copy:`Sterile enough to stop bleeding. Probably.`},water:{title:`CLEAN WATER`,copy:`A sealed canteen with no visible sediment.`},ration:{title:`TRAIL RATION`,copy:`Dense calories in waxed paper.`},scrap:{title:`TRADE SCRAP`,copy:`Wire, fasteners, and workable metal for camp crafting.`},lockpick:{title:`LOCKPICK`,copy:`A flexible pick for mechanical bypass work.`},electronics:{title:`CIRCUIT BRIDGE`,copy:`A disposable bridge for clearing terminal lockouts.`},stimpak:{title:`STIMPAK`,copy:`A pre-war injector that restores serious injuries quickly.`},nuka_cola:{title:`NUKA-COLA`,copy:`Warm, caffeinated and still faintly carbonated.`},whiskey:{title:`WHISKEY`,copy:`Liquid courage with a genuine dependence risk.`},jet:{title:`JET`,copy:`A powerful inhaled stimulant. Fast, useful and addictive.`},med_x:{title:`MED-X`,copy:`An injectable painkiller that temporarily increases damage resistance.`},antivenom:{title:`ANTIVENOM`,copy:`Broad-spectrum treatment for ant and scorpion venom.`},antibiotics:{title:`ANTIBIOTICS`,copy:`A sealed course capable of clearing wasteland disease.`},torch:{title:`WASTELAND TORCH`,copy:`An oil-soaked salvage torch with 60 turns of fuel.`},cactus_fruit:{title:`PRICKLY-PEAR FRUIT`,copy:`Fresh cactus fruit. Restores hydration and food; Survival improves the benefit.`},broc_flower:{title:`BROC FLOWER`,copy:`A medicinal desert flower that can be crushed into a healing poultice.`},armor:{title:`REINFORCED RAIDER ARMOUR`,copy:`Heavy patched protection offering substantial damage resistance.`},keycard:{title:`RELAY ACCESS CARD`,copy:`A service credential stamped for the buried relay in Ash Basin.`},condenser:{title:`WATER CONDENSER`,copy:`The prospectors' stolen purifier core. Heavy, valuable, essential.`}},Op=[{id:`lean_to`,title:`LEAN-TO`,copy:`Unlock the camp workbench and shelter.`,cost:6},{id:`field_dressing`,title:`FIELD DRESSING`,copy:`+1 medkit`,cost:3},{id:`handloads`,title:`HANDLOADS`,copy:`+5 pistol rounds`,cost:2},{id:`water_still`,title:`RUN WATER STILL`,copy:`+6 water`,cost:4},{id:`torch`,title:`WASTELAND TORCH`,copy:`+1 torch · 60 turns of light`,cost:2},{id:`stimpak`,title:`STIMPAK`,copy:`+1 Stimpak · also needs 1 clean water`,cost:4},{id:`antivenom`,title:`ANTIVENOM`,copy:`+1 poison treatment`,cost:4},{id:`scrap_vest`,title:`SCRAP VEST`,copy:`Craft and equip DR 3 armour`,cost:8},{id:`rest`,title:`SLEEP UNTIL DAWN`,copy:`Clear fatigue, dry off and restore 8 health`,cost:0},{id:`detox`,title:`DETOX TREATMENT`,copy:`Clear alcohol and chem addictions`,cost:6}],kp=[{id:`guns`,title:`GUNS`,copy:`Improves firearm accuracy, damage, and critical chance.`},{id:`melee`,title:`MELEE`,copy:`Improves pistol-whip accuracy, damage, and critical chance.`},{id:`survival`,title:`SURVIVAL`,copy:`Slower hunger and thirst loss at 50+.`},{id:`repair`,title:`REPAIR`,copy:`Slows weapon wear, improves field repairs, and lowers crafting costs.`},{id:`speech`,title:`SPEECH`,copy:`Better buying and selling prices.`},{id:`lockpick`,title:`LOCKPICK`,copy:`A wider lock sweet spot at 60+.`},{id:`science`,title:`SCIENCE`,copy:`Eliminates bad terminal passwords.`}],Ap=[{id:`strength`,letter:`S`,title:`STRENGTH`,copy:`Melee damage`},{id:`perception`,letter:`P`,title:`PERCEPTION`,copy:`Gun accuracy and sight`},{id:`endurance`,letter:`E`,title:`ENDURANCE`,copy:`Health, food and water capacity`},{id:`charisma`,letter:`C`,title:`CHARISMA`,copy:`Buying and selling prices`},{id:`intelligence`,letter:`I`,title:`INTELLIGENCE`,copy:`Skill points gained per level`},{id:`agility`,letter:`A`,title:`AGILITY`,copy:`Attack accuracy and evasion`},{id:`luck`,letter:`L`,title:`LUCK`,copy:`Critical-hit chance`}],jp=[{id:`fast_learner`,title:`FAST LEARNER`,copy:`+20% XP from every discovery and encounter.`,requirement:`INT 6`},{id:`scrounger`,title:`SCROUNGER`,copy:`Find extra ammunition, scrap, caps, and locker loot.`,requirement:`LCK 6`},{id:`tough_hide`,title:`TOUGH HIDE`,copy:`+6 maximum health and +1 natural damage resistance.`,requirement:`END 6`},{id:`gunslinger`,title:`GUNSLINGER`,copy:`Better pistol accuracy and critical chance.`,requirement:`PER 6 · AGI 6`},{id:`bruiser`,title:`BRUISER`,copy:`+2 punch damage and improved knockout chance.`,requirement:`STR 6`},{id:`field_medic`,title:`FIELD MEDIC`,copy:`Field dressings and Stimpaks heal 50% more.`,requirement:`INT 6`},{id:`night_eyes`,title:`NIGHT EYES`,copy:`+2 sight range in darkness.`,requirement:`PER 6 · or Ghoul`},{id:`iron_stomach`,title:`IRON STOMACH`,copy:`Slower hunger and thirst; much lower disease risk.`,requirement:`END 6 · or Ghoul`},{id:`storm_walker`,title:`STORM WALKER`,copy:`Reduced wetness and normal torch burn in rain.`,requirement:`END 5`},{id:`chem_resistant`,title:`CHEM RESISTANT`,copy:`Chem dependence accumulates at half speed.`,requirement:`END 6`},{id:`negotiator`,title:`NEGOTIATOR`,copy:`Buy for less and sell for more.`,requirement:`CHA 6`}],Mp=[{id:`water`,title:`CLEAN WATER`,copy:`+1 bottle`},{id:`ration`,title:`TRAIL RATION`,copy:`+1 ration`},{id:`ammo`,title:`9MM ROUNDS`,copy:`+8 rounds`},{id:`lockpick`,title:`LOCKPICK`,copy:`+1 pick`},{id:`electronics`,title:`CIRCUIT BRIDGE`,copy:`+1 terminal reset`},{id:`stimpak`,title:`STIMPAK`,copy:`+1 medical injector`},{id:`nuka_cola`,title:`NUKA-COLA`,copy:`+1 caffeinated cola`},{id:`antivenom`,title:`ANTIVENOM`,copy:`+1 poison treatment`},{id:`antibiotics`,title:`ANTIBIOTICS`,copy:`+1 disease treatment`},{id:`torch`,title:`WASTELAND TORCH`,copy:`+1 light source`}],Np={locker:`UTILITY LOCKER`,locked_door:`RELAY-BUNKER ENTRY`,security_door:`SECURITY BULKHEAD`,terminal:`MAINTENANCE TERMINAL`},Pp=[`CINDER`,`FILTER`,`SHADOW`,`REACTOR`],Fp=document.querySelector(`#app`);if(Fp===null)throw Error(`Application root is missing.`);Fp.innerHTML=`
  <section class="game-shell" aria-label="Project Cinder game">
    <div class="viewport" id="viewport"></div>
    <div class="scanlines" aria-hidden="true"></div>
    <div class="rain-overlay" id="rain-overlay" aria-hidden="true"></div>
    <div class="darkness-vignette" id="darkness-vignette" aria-hidden="true"></div>
    <div class="threshold-shift" id="threshold-shift" aria-hidden="true"></div>
    <div class="damage-flash" id="damage-flash" aria-hidden="true"></div>
    <div class="player-blood" id="player-blood" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="hit-direction" id="hit-direction" aria-hidden="true"><i></i><span>HIT</span></div>

    <header class="top-hud">
      <div class="brand-lockup">
        <span class="brand-kicker">PROJECT</span>
        <strong>CINDER</strong>
        <span class="sector" id="sector-name">MOJAVE WASTE</span>
      </div>
      <div class="objective-panel">
        <span class="hud-label">SURVIVAL LEAD</span>
        <strong id="objective">Find the stranded prospectors</strong>
      </div>
      <button class="icon-button pack-button" id="pack-button" aria-label="Cinder wrist terminal">UNIT</button>
      <button class="icon-button" id="menu-button" aria-label="Pause menu">Ⅱ</button>
    </header>

    <aside class="left-hud">
      <div class="meter-block">
        <span class="hud-label">VITALS</span>
        <div class="meter"><i id="health-fill"></i></div>
        <strong id="health-text">42 / 42</strong>
      </div>
      <div class="survival-meter water-meter">
        <span>WATER</span><strong id="water-text">12</strong>
        <div class="mini-meter"><i id="water-fill"></i></div>
      </div>
      <div class="survival-meter food-meter">
        <span>FOOD</span><strong id="food-text">10</strong>
        <div class="mini-meter"><i id="food-fill"></i></div>
      </div>
      <div class="survival-meter fatigue-meter">
        <span>FATIGUE</span><strong id="fatigue-text">08</strong>
        <div class="mini-meter"><i id="fatigue-fill"></i></div>
      </div>
      <div class="stat-chip"><span>MEDKITS</span><strong id="medkit-count">02</strong></div>
      <div class="stat-chip"><span>LEVEL</span><strong id="level-count">01</strong></div>
      <div class="xp-readout"><span id="xp-text">0 / 120 XP</span><div class="mini-meter"><i id="xp-fill"></i></div></div>
    </aside>

    <aside class="right-hud">
      <div class="ammo-readout">
        <span class="hud-label">9MM SIDEARM</span>
        <div><strong id="magazine-count">6</strong><span>/</span><b id="reserve-count">18</b></div>
      </div>
      <div class="stat-chip"><span>TRADE SCRAP</span><strong id="scrap-count">00</strong></div>
      <div class="stat-chip"><span>CAPS</span><strong id="caps-count">18</strong></div>
      <div class="weapon-condition">
        <span>CONDITION</span><strong id="condition-text">100%</strong>
        <div class="mini-meter"><i id="condition-fill"></i></div>
      </div>
      <div class="weapon-condition armor-condition">
        <span>ARMOUR DR</span><strong id="armor-text">1 / 100%</strong>
        <div class="mini-meter"><i id="armor-fill"></i></div>
      </div>
      <button class="quick-light-action" id="pip-light-action" aria-label="Switch Pip-Boy light on">
        <span>PIP LIGHT</span><small>OFF</small>
      </button>
      <div class="target-card" id="target-card" aria-live="polite">
        <span class="hud-label">TARGET</span>
        <strong id="target-name">NO CONTACT</strong>
        <div class="target-meter"><i id="target-health"></i></div>
      </div>
    </aside>

    <div class="reticle" id="reticle" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    <div class="condition-strip" id="condition-strip" aria-live="polite"></div>

    <aside class="auto-map" id="auto-map" aria-label="Local auto-map">
      <span id="auto-map-zone">LOCAL SCAN</span>
      <div class="auto-map-grid" id="auto-map-grid"></div>
    </aside>

    <div class="message-stack" id="message-stack" aria-live="polite">
      <p data-tone="neutral">Cinder expedition loaded.</p>
    </div>

    <aside class="interaction-card hidden" id="interaction-card" aria-live="polite">
      <span class="hud-label" id="interaction-kind">INSPECT</span>
      <strong id="interaction-title"></strong>
      <p id="interaction-copy"></p>
      <div class="interaction-actions" id="interaction-actions"></div>
    </aside>

    <nav class="movement-controls" aria-label="Movement controls">
      <button data-action="move_forward" aria-label="Move forward">▲</button>
      <button data-action="strafe_left" class="strafe-button" aria-label="Strafe left">⇦</button>
      <button data-action="turn_left" aria-label="Turn left">↶</button>
      <button data-action="wait" class="wait-button" aria-label="Wait one turn">●</button>
      <button data-action="turn_right" aria-label="Turn right">↷</button>
      <button data-action="strafe_right" class="strafe-button" aria-label="Strafe right">⇨</button>
      <button data-action="move_backward" aria-label="Move backward">▼</button>
    </nav>

    <nav class="action-controls" aria-label="Action controls">
      <button data-action="interact" class="utility-action"><span>USE</span><small>E</small></button>
      <button data-action="reload" class="utility-action" id="reload-action"><span>RLD</span><small>R</small></button>
      <button data-action="use_medkit" class="utility-action"><span>MED</span><small>H</small></button>
      <button data-action="fire" class="fire-action" id="fire-action"><span>FIRE</span><small>SPACE</small></button>
    </nav>

    <div class="modal start-modal" id="start-modal">
      <div class="modal-card title-card">
        <div class="atom-mark" aria-hidden="true"><i></i><i></i><i></i><b></b></div>
        <span class="eyebrow">A SEEDED MOJAVE ROGUELIKE</span>
        <h1>PROJECT<br /><em>CINDER</em></h1>
        <p>EVERY DESCENT BUILDS A NEW WASTE</p>
        <div class="title-rule"><span>SEEDED WORLD</span><i></i><span>LEVELLED ZONES</span><i></i><span>ONE TURN</span></div>
        <div class="modal-actions">
          <button id="continue-button">CONTINUE</button>
          <button id="new-game-button" class="primary">NEW DESCENT</button>
        </div>
        <small class="build-label">PIP-BOY LIGHT // BUILD 0.15.1</small>
      </div>
    </div>

    <div class="modal hidden" id="creator-modal">
      <div class="terminal-card creator-card">
        <div class="terminal-header"><span>CINDER PERSONNEL REGISTRY</span><i></i><b>NEW SURVIVOR</b></div>
        <div class="creator-title-row">
          <div><span class="eyebrow">BUILD YOUR CHARACTER</span><h2>WHO WALKS OUT?</h2></div>
          <strong id="creator-budget">S.P.E.C.I.A.L. 5 · SKILLS 60 · PERK REQUIRED</strong>
        </div>
        <nav class="creator-tabs" aria-label="Character creator sections">
          <button data-creator-tab="identity" class="active">IDENTITY</button>
          <button data-creator-tab="special">S.P.E.C.I.A.L.</button>
          <button data-creator-tab="skills">SKILLS</button>
          <button data-creator-tab="perk">PERK</button>
        </nav>
        <div class="creator-content" id="creator-content"></div>
        <div class="creator-footer">
          <button id="creator-reset">RESET</button>
          <button id="creator-cancel">CANCEL</button>
          <button id="creator-begin" class="primary" disabled>BEGIN DESCENT</button>
        </div>
      </div>
    </div>

    <div class="modal hidden" id="pause-modal">
      <div class="modal-card compact-card">
        <span class="eyebrow">SYSTEM SUSPENDED</span>
        <h2>PAUSED</h2>
        <div class="modal-actions stacked">
          <button id="resume-button" class="primary">RESUME</button>
          <button id="open-pip-button">WRIST TERMINAL</button>
          <button id="save-load-button">SAVE / LOAD</button>
          <button id="cheat-button">CHEAT DECK</button>
          <button id="audio-button">AUDIO: ON</button>
          <button id="music-button">MUSIC: TAP TO START</button>
          <button id="fullscreen-button">FULL SCREEN</button>
          <button id="reset-view-button">RESET SCREEN SCALE</button>
          <button id="install-button">INSTALL TO HOME SCREEN</button>
          <button id="restart-button" class="danger-button">RESTART DESCENT</button>
        </div>
        <p class="key-help"><span id="pause-run-code">RUN UNSET</span> · Tap objects to inspect · drag to look · M opens map</p>
      </div>
    </div>

    <div class="modal hidden" id="terminal-modal">
      <div class="terminal-card">
        <div class="terminal-header"><span>WASTELAND ENCOUNTER</span><i></i></div>
        <h2 id="terminal-title"></h2>
        <p id="terminal-body"></p>
        <div class="dialogue-choices" id="dialogue-choices"></div>
      </div>
    </div>

    <div class="modal hidden" id="craft-modal">
      <div class="terminal-card craft-card">
        <div class="terminal-header"><span>MOJAVE CAMP WORKBENCH</span><i></i></div>
        <h2 id="craft-title">BUILD A LEAN-TO</h2>
        <p id="craft-copy">Raise shelter first, then turn scavenged scrap into survival supplies.</p>
        <div class="craft-list" id="craft-list"></div>
        <button id="craft-close">LEAVE CAMP</button>
      </div>
    </div>

    <div class="modal hidden" id="pip-modal">
      <div class="terminal-card pip-card">
        <div class="terminal-header"><span>CINDER WRIST TERMINAL // FIELD UNIT 7</span><i></i><b id="pip-level">LV 01</b></div>
        <div class="pip-summary">
          <span id="pip-location">SUNSCAR WASTE</span>
          <strong id="pip-xp">0 / 120 XP</strong>
          <em id="pip-points">3 SKILL POINTS</em>
        </div>
        <nav class="pip-tabs" aria-label="Character screens">
          <button data-pip-tab="map">MAP</button>
          <button data-pip-tab="journal">JOURNAL</button>
          <button data-pip-tab="inventory" class="active">ITEMS</button>
          <button data-pip-tab="skills">SKILLS</button>
          <button data-pip-tab="perks">PERKS</button>
          <button data-pip-tab="data">DATA</button>
        </nav>
        <div class="pip-content" id="pip-content"></div>
        <button id="pip-close">LOWER WRIST UNIT</button>
      </div>
    </div>

    <div class="modal hidden" id="cheat-modal">
      <div class="terminal-card cheat-card">
        <div class="terminal-header"><span>CINDER DEBUG CHANNEL</span><i></i><b id="cheat-status">ALL AIDS OFF</b></div>
        <h2>CHEAT DECK</h2>
        <p>Debug aids never consume a turn. Their state is stored with the current save.</p>
        <div class="cheat-control-grid">
          <button data-cheat-action="toggle_god" id="cheat-god">GOD MODE: OFF</button>
          <button data-cheat-action="toggle_needs" id="cheat-needs">FROZEN NEEDS: OFF</button>
          <button data-cheat-action="restore">RESTORE ALL</button>
          <button data-cheat-action="repair">REPAIR WEAPON</button>
          <button data-cheat-action="level_up">ADD LEVEL</button>
          <button data-cheat-action="reveal_map">REVEAL MAP</button>
          <button data-cheat-action="clear_conditions">CLEAR CONDITIONS</button>
          <button data-cheat-action="set_night">SET NIGHT</button>
          <button data-cheat-action="toggle_rain">TOGGLE RAIN</button>
        </div>
        <span class="cheat-section-label">ITEM SPAWNER</span>
        <div class="cheat-spawn-grid">
          <button data-cheat-action="spawn_ammo">+24 AMMO</button>
          <button data-cheat-action="spawn_medkits">+3 MEDKITS</button>
          <button data-cheat-action="spawn_water">+3 WATER</button>
          <button data-cheat-action="spawn_rations">+3 RATIONS</button>
          <button data-cheat-action="spawn_scrap">+10 SCRAP</button>
          <button data-cheat-action="spawn_caps">+100 CAPS</button>
          <button data-cheat-action="spawn_lockpicks">+5 LOCKPICKS</button>
          <button data-cheat-action="spawn_electronics">+3 BRIDGES</button>
          <button data-cheat-action="spawn_survival_aid">+SURVIVAL AID</button>
        </div>
        <button id="cheat-close">CLOSE DECK</button>
      </div>
    </div>

    <div class="modal hidden" id="lockpick-modal">
      <div class="terminal-card lockpick-card">
        <div class="terminal-header"><span>MECHANICAL BYPASS</span><i></i></div>
        <h2 id="lockpick-title">CORRODED LOCK</h2>
        <p id="lockpick-copy">Probe the cylinder for its sweet spot. A bad angle can snap the pick.</p>
        <div class="lock-cylinder" aria-hidden="true"><i></i><b></b></div>
        <div class="lock-probes" id="lock-probes"></div>
        <div class="device-status" id="lockpick-status"></div>
        <button id="lockpick-close">BACK AWAY</button>
      </div>
    </div>

    <div class="modal hidden" id="device-modal">
      <div class="terminal-card device-card">
        <div class="terminal-header"><span>CINDER RELAY INDUSTRIAL OS</span><i></i><b id="terminal-attempts">3 ATTEMPTS</b></div>
        <h2 id="device-title">MAINTENANCE TERMINAL</h2>
        <p id="device-copy"></p>
        <div class="terminal-screen" id="terminal-screen"></div>
        <div class="dialogue-choices" id="device-actions"></div>
        <button id="device-close">DISCONNECT</button>
      </div>
    </div>

    <div class="modal hidden" id="barter-modal">
      <div class="terminal-card barter-card">
        <div class="terminal-header"><span id="barter-trader">WASTELAND TRADE</span><i></i><b id="barter-caps">18 CAPS</b></div>
        <h2>CARAVAN EXCHANGE</h2>
        <p id="barter-copy">Speech affects every price. Purchases go directly to your pack.</p>
        <div class="barter-status" id="barter-status" role="status" aria-live="polite">SELECT GOODS TO TRADE.</div>
        <div class="barter-layout">
          <section><span class="hud-label" id="barter-stock-label">TRADER STOCK</span><div class="trade-list" id="barter-buy-list"></div></section>
          <section><span class="hud-label">YOUR GOODS</span><div class="trade-list" id="barter-sell-list"></div></section>
        </div>
        <button id="barter-close">END TRADE</button>
      </div>
    </div>

    <div class="modal hidden" id="end-modal">
      <div class="modal-card compact-card">
        <span class="eyebrow" id="end-eyebrow">CARAVAN SAVED</span>
        <h2 id="end-title">ROLL OUT</h2>
        <p id="end-copy"></p>
        <div class="run-summary"><span>TURNS</span><strong id="end-turns">000</strong></div>
        <button id="end-restart" class="primary">DESCEND AGAIN</button>
      </div>
    </div>

    <div class="orientation-warning">
      <div class="phone-icon" aria-hidden="true"></div>
      <strong>ROTATE DEVICE</strong>
      <span>Project Cinder is designed for landscape play.</span>
    </div>
  </section>
`;function X(e){let t=document.querySelector(e);if(t===null)throw Error(`Missing UI element: ${e}`);return t}function Ip(e,t){let n=-1/0;e.addEventListener(`pointerup`,r=>{r.pointerType!==`touch`&&r.pointerType!==`pen`||e.disabled||(r.preventDefault(),n=performance.now(),t())}),e.addEventListener(`click`,e=>{if(performance.now()-n<700){e.preventDefault();return}t()})}var Lp=`width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no`,Rp=!1;function zp(){let e=window.visualViewport,t=document.querySelector(`.game-shell`);if(e===null||t===null||e.scale<=1.01){t!==null&&(t.style.removeProperty(`transform`),t.style.removeProperty(`transform-origin`));return}let n=1/e.scale;t.style.transformOrigin=`0 0`,t.style.transform=`translate3d(${e.offsetLeft}px, ${e.offsetTop}px, 0) scale(${n})`}function Bp(){let e=document.querySelector(`meta[name="viewport"]`);e===null||Rp||(Rp=!0,e.content=Lp.replace(`maximum-scale=1`,`maximum-scale=1.01`),window.setTimeout(()=>{e.content=Lp,window.scrollTo(0,0),Rp=!1,zp()},0))}var Vp=X(`#viewport`),Hp=X(`#start-modal`),Up=X(`#creator-modal`),Wp=X(`#pause-modal`),Gp=X(`#terminal-modal`),Kp=X(`#craft-modal`),qp=X(`#pip-modal`),Jp=X(`#cheat-modal`),Yp=X(`#lockpick-modal`),Xp=X(`#device-modal`),Zp=X(`#barter-modal`),Qp=X(`#end-modal`),$p=X(`#interaction-card`),em=X(`#message-stack`),tm=X(`#damage-flash`),nm=X(`#player-blood`),rm=X(`#hit-direction`),im=X(`#pip-light-action`),am=new r;function om(e){$p.classList.toggle(`hidden`,!e),em.classList.toggle(`context-muted`,e)}function sm(){try{let e=new Uint32Array(1);return crypto.getRandomValues(e),(e[0]??1)||1}catch{return(Date.now()^Math.floor(performance.now()*1e3))>>>0||1}}function cm(e=sm()){return pe(On(e),e)}var lm=Um(),Z=lm??cm(),um=new xp(Vp,Z),dm=!1,fm=!1,pm=0,mm=`inventory`,hm={guns:20,melee:20,survival:20,repair:20,speech:20,lockpick:20,science:20};function gm(){return{identity:{name:`WANDERER`,gender:`male`,race:`human`},special:{...D},skills:{...hm}}}var Q=gm(),_m=1,vm=`identity`,ym=`start`;function bm(){return 40-Ap.reduce((e,t)=>e+Q.special[t.id],0)}function xm(){return 200-kp.reduce((e,t)=>e+Q.skills[t.id],0)}function Sm(){return Q.identity.name.trim().length>0}function Cm(){return bm()===0&&xm()===0&&Sm()&&Q.startingPerk!==void 0}function wm(){Q.startingPerk!==void 0&&!k(Q.special,Q.identity.race,1,Q.startingPerk)&&(Q.startingPerk=void 0)}function Tm(e,t){let n=document.createElement(`div`);n.className=`creator-section-heading`;let r=document.createElement(`strong`);r.textContent=e;let i=document.createElement(`span`);return i.textContent=t,n.append(r,i),n}function Em(e,t,n,r,i=!1){let a=document.createElement(`button`);a.type=`button`,a.className=`creator-choice${n?` selected`:``}`,a.disabled=i;let o=document.createElement(`strong`);o.textContent=e;let s=document.createElement(`span`);return s.textContent=t,a.append(o,s),a.addEventListener(`click`,r),a}function Dm(e){e.append(Tm(`IDENTITY`,`Your field record persists through saves and manual slots.`));let t=document.createElement(`label`);t.className=`creator-name-field`;let n=document.createElement(`span`);n.textContent=`NAME · MAXIMUM 18 CHARACTERS`;let r=document.createElement(`input`);r.type=`text`,r.maxLength=18,r.autocomplete=`off`,r.spellcheck=!1,r.value=Q.identity.name,r.addEventListener(`input`,()=>{Q.identity.name=r.value,jm()}),t.append(n,r),e.append(t);let i=document.createElement(`span`);i.className=`creator-group-label`,i.textContent=`GENDER`;let a=document.createElement(`div`);a.className=`creator-choice-grid two`;for(let e of[`male`,`female`])a.append(Em(e.toUpperCase(),`Identity choice · no hidden stat penalty`,Q.identity.gender===e,()=>{Q.identity.gender=e,Mm()}));e.append(i,a);let o=document.createElement(`span`);o.className=`creator-group-label`,o.textContent=`RACE`;let s=document.createElement(`div`);s.className=`creator-choice-grid two`;for(let e of[{id:`human`,title:`HUMAN · ADAPTIVE`,copy:`+1 skill point each level · +10 starting caps`},{id:`ghoul`,title:`GHOUL · WASTELAND BORN`,copy:`Disease immune · slower thirst · +1 natural DR`}])s.append(Em(e.title,e.copy,Q.identity.race===e.id,()=>{Q.identity.race=e.id,wm(),Mm()}));e.append(o,s)}function Om(e){e.append(Tm(`S.P.E.C.I.A.L.`,`Spend exactly 40 points. Attributes range from 1 to 10; lowering one frees points elsewhere.`));let t=bm(),n=document.createElement(`div`);n.className=`creator-stat-list`;for(let e of Ap){let r=document.createElement(`div`);r.className=`creator-stat-row`;let i=document.createElement(`b`);i.textContent=e.letter;let a=document.createElement(`div`),o=document.createElement(`strong`);o.textContent=e.title;let s=document.createElement(`span`);s.textContent=e.copy,a.append(o,s);let c=document.createElement(`div`);c.className=`creator-stepper`;let l=document.createElement(`button`);l.type=`button`,l.textContent=`−`,l.disabled=Q.special[e.id]<=1,l.addEventListener(`click`,()=>{--Q.special[e.id],wm(),Mm()});let u=document.createElement(`strong`);u.textContent=Q.special[e.id].toString();let d=document.createElement(`button`);d.type=`button`,d.textContent=`+`,d.disabled=Q.special[e.id]>=10||t<=0,d.addEventListener(`click`,()=>{Q.special[e.id]+=1,wm(),Mm()}),c.append(l,u,d),r.append(i,a,c),n.append(r)}e.append(n)}function km(e){e.append(Tm(`SKILLS`,`Allocate exactly 200 total points. Every skill begins at 20 and changes in five-point steps up to 80.`));let t=xm(),n=document.createElement(`div`);n.className=`creator-stat-list skill-list`;for(let e of kp){let r=document.createElement(`div`);r.className=`creator-stat-row skill-row`;let i=document.createElement(`div`),a=document.createElement(`strong`);a.textContent=e.title;let o=document.createElement(`span`);o.textContent=e.copy,i.append(a,o);let s=document.createElement(`div`);s.className=`creator-stepper`;let c=document.createElement(`button`);c.type=`button`,c.textContent=`−`,c.disabled=Q.skills[e.id]<=20,c.addEventListener(`click`,()=>{Q.skills[e.id]-=5,Mm()});let l=document.createElement(`strong`);l.textContent=Q.skills[e.id].toString();let u=document.createElement(`button`);u.type=`button`,u.textContent=`+`,u.disabled=Q.skills[e.id]>=80||t<5,u.addEventListener(`click`,()=>{Q.skills[e.id]+=5,Mm()}),s.append(c,l,u),r.append(i,s),n.append(r)}e.append(n)}function Am(e){e.append(Tm(`STARTING PERK`,`Choose one perk at level 1. A new perk point is awarded at every later level.`));let t=document.createElement(`div`);t.className=`creator-perk-grid`;for(let e of jp){let n=k(Q.special,Q.identity.race,1,e.id),r=Q.startingPerk===e.id;t.append(Em(`${e.title} · ${e.requirement}`,e.copy,r,()=>{Q.startingPerk=e.id,Mm()},!n))}e.append(t)}function jm(){let e=bm(),t=xm(),n=Q.startingPerk===void 0?`PERK REQUIRED`:jp.find(e=>e.id===Q.startingPerk)?.title??`PERK READY`,r=X(`#creator-budget`);r.textContent=`S.P.E.C.I.A.L. ${e} · SKILLS ${t} · ${n}`,r.classList.toggle(`complete`,Cm()),X(`#creator-begin`).disabled=!Cm()}function Mm(){for(let e of document.querySelectorAll(`[data-creator-tab]`))e.classList.toggle(`active`,e.dataset.creatorTab===vm);let e=X(`#creator-content`);e.replaceChildren(),vm===`identity`?Dm(e):vm===`special`?Om(e):vm===`skills`?km(e):Am(e),jm()}function Nm(e=sm()){ym=Hp.classList.contains(`hidden`)?Wp.classList.contains(`hidden`)?qp.classList.contains(`hidden`)?Qp.classList.contains(`hidden`)?`world`:`end`:`pip`:`pause`:`start`,_m=e,Q=gm(),vm=`identity`,Hp.classList.add(`hidden`),Wp.classList.add(`hidden`),qp.classList.add(`hidden`),Qp.classList.add(`hidden`),om(!1),Up.classList.remove(`hidden`),Mm()}function Pm(){Up.classList.add(`hidden`),ym===`start`?Hp.classList.remove(`hidden`):ym===`pause`?(fm=!0,Wp.classList.remove(`hidden`)):ym===`pip`?_h(mm):ym===`end`&&Qp.classList.remove(`hidden`)}var Fm;window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),Fm=e});function Im(e){if(typeof e!=`object`||!e)return!1;let t=e;return t.version===4&&typeof t.levelId==`string`&&t.status!==void 0&&t.player!==void 0&&t.player.skills!==void 0&&t.player.inventory!==void 0&&Array.isArray(t.enemies)&&Array.isArray(t.devices)&&Array.isArray(t.pickups)&&Array.isArray(t.tiles)}function Lm(e){if(!e.levelId.startsWith(`cinder-expedition-`))return e.worldRevision=2,e.transitions=Array.isArray(e.transitions)?e.transitions:[],e.clearedSites=Array.isArray(e.clearedSites)?e.clearedSites:[],e.player.hasRelayKey=e.player.hasRelayKey===!0,e;let t=cm(e.worldSeed),n=Math.max(t.player.maxHp,e.player.maxHp),r=Math.max(t.player.maxWater,e.player.maxWater),i=Math.max(t.player.maxFood,e.player.maxFood);return t.player={...t.player,identity:typeof e.player.identity==`object`&&e.player.identity!==null?{...e.player.identity}:{...t.player.identity},special:typeof e.player.special==`object`&&e.player.special!==null?{...e.player.special}:{...t.player.special},hp:Math.min(n,Math.max(e.player.hp,Math.ceil(n*.72))),maxHp:n,magazine:Math.min(e.player.magazineSize,e.player.magazine),magazineSize:e.player.magazineSize,reserveAmmo:Math.max(t.player.reserveAmmo,e.player.reserveAmmo),weaponCondition:e.player.weaponCondition,medkits:Math.max(t.player.medkits,e.player.medkits),water:Math.min(r,Math.max(e.player.water,12)),maxWater:r,food:Math.min(i,Math.max(e.player.food,12)),maxFood:i,scrap:e.player.scrap,caps:e.player.caps,hasRelayKey:e.player.hasRelayKey===!0,hasCondenser:e.player.hasCondenser,level:e.player.level,xp:e.player.xp,skillPoints:e.player.skillPoints,perkPoints:Number.isFinite(e.player.perkPoints)?e.player.perkPoints:Math.max(0,e.player.level-(Array.isArray(e.player.traits)?e.player.traits.length:0)),skills:{...e.player.skills},traits:Array.isArray(e.player.traits)?[...e.player.traits]:[],inventory:{...t.player.inventory,water:Math.max(t.player.inventory.water,e.player.inventory.water),ration:Math.max(t.player.inventory.ration,e.player.inventory.ration),lockpick:Math.max(t.player.inventory.lockpick,e.player.inventory.lockpick),electronics:Math.max(t.player.inventory.electronics,e.player.inventory.electronics)}},t.prospectorMet=e.prospectorMet,t.questAccepted=e.questAccepted,t.prospectorTrust=e.prospectorTrust,t.dialogueFlags=[...e.dialogueFlags.filter(e=>e!==`field_relief_062`),`expedition_09_migrated`],t.campBuilt=e.campBuilt,t.characterRevision=Number.isFinite(e.characterRevision)?e.characterRevision:0,t.cheats={...e.cheats},t.autoMapEnabled=e.autoMapEnabled,t.turn=e.turn,t.rngState=e.rngState,t.status=e.status,t.worldRevision=2,t}function Rm(e){if(!e.levelId.startsWith(`cinder-expedition-`))return e.worldRevision=3,e;let t=cm(e.worldSeed),n=e.player.inventory??t.player.inventory;t.player={...t.player,...e.player,position:{...t.player.position},direction:e.player.direction??t.player.direction,identity:{...t.player.identity,...e.player.identity??{}},special:{...t.player.special,...e.player.special??{}},skills:{...t.player.skills,...e.player.skills??{}},traits:Array.isArray(e.player.traits)?[...e.player.traits]:[],inventory:{...t.player.inventory,...n},armor:e.player.armor===void 0?{...t.player.armor,owned:[...t.player.armor.owned]}:{...e.player.armor,owned:[...e.player.armor.owned]},conditions:{...t.player.conditions,...e.player.conditions??{}},addictions:Array.isArray(e.player.addictions)?[...e.player.addictions]:[]},t.prospectorMet=e.prospectorMet,t.questAccepted=e.questAccepted,t.prospectorTrust=e.prospectorTrust,t.dialogueFlags=[...new Set([...Array.isArray(e.dialogueFlags)?e.dialogueFlags:[],`living_mojave_013_migrated`])],t.campBuilt=e.campBuilt,t.characterRevision=e.characterRevision,t.balanceRevision=e.balanceRevision,t.encounterRevision=e.encounterRevision,t.cheats={...t.cheats,...e.cheats??{}},t.autoMapEnabled=e.autoMapEnabled,t.discoveredAreas=Array.isArray(e.discoveredAreas)?[...e.discoveredAreas]:[],t.discoveredEncounterZones=Array.isArray(e.discoveredEncounterZones)?[...e.discoveredEncounterZones]:t.discoveredEncounterZones,t.exploredTiles=Array.isArray(e.exploredTiles)?[...e.exploredTiles]:t.exploredTiles,t.clearedSites=Array.isArray(e.clearedSites)?[...e.clearedSites]:[],t.timeMinutes=e.timeMinutes,t.weather=e.weather===void 0?t.weather:{...e.weather},t.turn=e.turn,t.rngState=e.rngState,t.status=e.status;let r=e.npcs?.find(e=>e.id===`mara-voss`),i=t.npcs.find(e=>e.id===`mara-voss`);if(r!==void 0&&i!==void 0&&Object.assign(i,{hp:r.hp,hostile:r.hostile,unconsciousTurns:r.unconsciousTurns}),t.player.hasRelayKey){let e=t.pickups.find(e=>e.kind===`keycard`);e!==void 0&&(e.collected=!0)}if(t.player.hasCondenser){let e=t.pickups.find(e=>e.kind===`condenser`);e!==void 0&&(e.collected=!0)}return t.worldRevision=3,t}function zm(e){if(!e.levelId.startsWith(`cinder-expedition-`))return e.worldRevision=4,e;let t=cm(e.worldSeed),n=e.player.inventory??t.player.inventory;t.player={...t.player,...e.player,position:{...t.player.position},direction:e.player.direction??t.player.direction,identity:{...t.player.identity,...e.player.identity??{}},special:{...t.player.special,...e.player.special??{}},skills:{...t.player.skills,...e.player.skills??{}},traits:Array.isArray(e.player.traits)?[...e.player.traits]:[],inventory:{...t.player.inventory,...n},armor:e.player.armor===void 0?{...t.player.armor,owned:[...t.player.armor.owned]}:{...e.player.armor,owned:[...e.player.armor.owned]},conditions:{...t.player.conditions,...e.player.conditions??{}},addictions:Array.isArray(e.player.addictions)?[...e.player.addictions]:[]},t.prospectorMet=e.prospectorMet,t.questAccepted=e.questAccepted,t.prospectorTrust=e.prospectorTrust,t.dialogueFlags=[...new Set([...Array.isArray(e.dialogueFlags)?e.dialogueFlags:[],`open_horizons_014_migrated`])],t.campBuilt=e.campBuilt,t.characterRevision=e.characterRevision,t.balanceRevision=e.balanceRevision,t.encounterRevision=e.encounterRevision,t.cheats={...t.cheats,...e.cheats??{}},t.autoMapEnabled=e.autoMapEnabled,t.discoveredAreas=Array.isArray(e.discoveredAreas)?[...e.discoveredAreas]:[],t.discoveredEncounterZones=Array.isArray(e.discoveredEncounterZones)?[...e.discoveredEncounterZones]:t.discoveredEncounterZones,t.exploredTiles=Array.isArray(e.exploredTiles)?[...e.exploredTiles]:t.exploredTiles,t.clearedSites=Array.isArray(e.clearedSites)?[...e.clearedSites]:[],t.openDoors=Array.isArray(e.openDoors)?[...e.openDoors]:[],t.merchant=e.merchant===void 0?t.merchant:{stock:{...t.merchant.stock,...e.merchant.stock}},t.timeMinutes=e.timeMinutes,t.weather=e.weather===void 0?t.weather:{...e.weather},t.turn=e.turn,t.rngState=e.rngState,t.status=e.status,t.nextEnemyId=Math.max(t.nextEnemyId,e.nextEnemyId??0);for(let n of t.npcs){let t=e.npcs?.find(e=>e.id===n.id);t!==void 0&&Object.assign(n,{hp:t.hp,maxHp:t.maxHp,hostile:t.hostile,unconsciousTurns:t.unconsciousTurns})}for(let n of t.devices){let t=e.devices?.find(e=>e.id===n.id&&e.kind===n.kind);t!==void 0&&Object.assign(n,{locked:t.locked,opened:t.opened,hacked:t.hacked,attemptsRemaining:t.attemptsRemaining})}if(t.player.hasRelayKey){let e=t.pickups.find(e=>e.kind===`keycard`);e!==void 0&&(e.collected=!0)}if(t.player.hasCondenser){let e=t.pickups.find(e=>e.kind===`condenser`);e!==void 0&&(e.collected=!0)}return t.worldRevision=4,t}function Bm(e){if(!e.levelId.startsWith(`cinder-expedition-`))return e.worldRevision=5,Array.isArray(e.landmarks)||(e.landmarks=[]),e;let t=cm(e.worldSeed),n=e.player.inventory??t.player.inventory;t.player={...t.player,...e.player,position:{...t.player.position},direction:e.player.direction??t.player.direction,identity:{...t.player.identity,...e.player.identity??{}},special:{...t.player.special,...e.player.special??{}},skills:{...t.player.skills,...e.player.skills??{}},traits:Array.isArray(e.player.traits)?[...e.player.traits]:[],inventory:{...t.player.inventory,...n},armor:e.player.armor===void 0?{...t.player.armor,owned:[...t.player.armor.owned]}:{...e.player.armor,owned:[...e.player.armor.owned]},conditions:{...t.player.conditions,...e.player.conditions??{}},addictions:Array.isArray(e.player.addictions)?[...e.player.addictions]:[]},t.prospectorMet=e.prospectorMet,t.questAccepted=e.questAccepted,t.prospectorTrust=e.prospectorTrust,t.dialogueFlags=[...new Set([...Array.isArray(e.dialogueFlags)?e.dialogueFlags:[],`living_wasteland_015_migrated`])],t.campBuilt=e.campBuilt,t.characterRevision=e.characterRevision,t.balanceRevision=e.balanceRevision,t.encounterRevision=e.encounterRevision,t.cheats={...t.cheats,...e.cheats??{}},t.autoMapEnabled=e.autoMapEnabled,t.discoveredAreas=Array.isArray(e.discoveredAreas)?[...e.discoveredAreas]:[],t.discoveredEncounterZones=Array.isArray(e.discoveredEncounterZones)?[...e.discoveredEncounterZones]:t.discoveredEncounterZones,t.exploredTiles=Array.isArray(e.exploredTiles)?[...e.exploredTiles]:t.exploredTiles,t.clearedSites=Array.isArray(e.clearedSites)?[...e.clearedSites]:[],t.openDoors=Array.isArray(e.openDoors)?[...e.openDoors]:[],t.merchant=e.merchant===void 0?t.merchant:{stock:{...t.merchant.stock,...e.merchant.stock}},t.timeMinutes=e.timeMinutes,t.weather=e.weather===void 0?t.weather:{...e.weather},t.turn=e.turn,t.rngState=e.rngState,t.status=e.status,t.nextEnemyId=Math.max(t.nextEnemyId,e.nextEnemyId??0);for(let n of t.npcs){let t=e.npcs?.find(e=>e.id===n.id);t!==void 0&&Object.assign(n,{hp:t.hp,maxHp:t.maxHp,hostile:t.hostile,unconsciousTurns:t.unconsciousTurns})}for(let n of t.devices){let t=e.devices?.find(e=>e.id===n.id&&e.kind===n.kind);t!==void 0&&Object.assign(n,{locked:t.locked,opened:t.opened,hacked:t.hacked,attemptsRemaining:t.attemptsRemaining})}for(let n of t.landmarks){let t=e.landmarks?.find(e=>e.id===n.id);t!==void 0&&(n.discovered=t.discovered,n.used=t.used)}if(t.player.hasRelayKey){let e=t.pickups.find(e=>e.kind===`keycard`);e!==void 0&&(e.collected=!0)}if(t.player.hasCondenser){let e=t.pickups.find(e=>e.kind===`condenser`);e!==void 0&&(e.collected=!0)}return t}function Vm(e){let t=e;(!Number.isFinite(t.worldRevision)||t.worldRevision<2)&&(t=Lm(t)),t.worldRevision<3&&(t=Rm(t)),t.worldRevision<4&&(t=zm(t)),t.worldRevision<5&&(t=Bm(t)),(!Number.isFinite(t.balanceRevision)||t.balanceRevision<1)&&(t.balanceRevision=1,t.status===`playing`&&(t.player.maxHp=Math.max(42,t.player.maxHp),t.player.hp=Math.min(t.player.maxHp,Math.max(t.player.hp+10,Math.ceil(t.player.maxHp*.66))),t.player.reserveAmmo+=6,t.player.medkits+=1,t.player.water=Math.max(t.player.water,8),t.player.food=Math.max(t.player.food,7),t.dialogueFlags.includes(`field_relief_062`)||t.dialogueFlags.push(`field_relief_062`))),Number.isFinite(t.worldSeed)||(t.worldSeed=(t.rngState??1)>>>0),(typeof t.worldCode!=`string`||t.worldCode.length===0)&&(t.worldCode=t.levelId.startsWith(`cinder-expedition-`)?En(t.worldSeed):`LEGACY-SUNSCAR`),(typeof t.worldName!=`string`||t.worldName.length===0)&&(t.worldName=t.levelId.startsWith(`cinder-expedition-`)?`MOJAVE WASTELAND`:`SUNSCAR WASTE`),t.worldName===`CINDER EXPANSE`&&(t.worldName=`MOJAVE WASTELAND`);let n=!Number.isFinite(t.encounterRevision)||t.encounterRevision<1;if(!Array.isArray(t.encounterZones)||t.encounterZones.length===0){let e=t.levelId.startsWith(`cinder-expedition-`)?On(t.worldSeed):void 0;t.encounterZones=(e?.encounterZones??[{id:`open-waste`,name:t.worldName,level:1,minX:0,maxX:Math.max(0,t.width-1),minZ:0,maxZ:Math.max(0,t.height-1)}]).map(e=>({...e}))}for(let e of t.enemies)(!Number.isFinite(e.level)||e.level<1)&&(e.level=xe(t,e.position).level),e.level=Math.max(1,Math.min(8,Math.floor(e.level))),n&&(e.maxHp=Math.max(e.maxHp,se(e.kind,e.level))),e.hp=Math.max(0,Math.min(e.maxHp,e.hp));t.encounterRevision=1,Array.isArray(t.discoveredEncounterZones)||(t.discoveredEncounterZones=[]);let r=xe(t,t.player.position);t.discoveredEncounterZones.includes(r.id)||t.discoveredEncounterZones.push(r.id),Array.isArray(t.exploredTiles)||(t.exploredTiles=[]);let i=new Set(t.exploredTiles.filter(e=>typeof e==`string`));for(let e=Math.max(0,t.player.position.z-2);e<=Math.min(t.height-1,t.player.position.z+2);e+=1)for(let n=Math.max(0,t.player.position.x-2);n<=Math.min(t.width-1,t.player.position.x+2);n+=1)Math.abs(n-t.player.position.x)+Math.abs(e-t.player.position.z)<=2&&i.add(`${n},${e}`);t.exploredTiles=[...i],Number.isFinite(t.player.weaponCondition)||(t.player.weaponCondition=100),typeof t.player.hasRelayKey!=`boolean`&&(t.player.hasRelayKey=!1),Number.isFinite(t.player.skills.melee)||(t.player.skills.melee=30);let a=t.player.identity,o=typeof a?.name==`string`?a.name.replace(/[\u0000-\u001f\u007f]/g,``).trim().replace(/\s+/g,` `).slice(0,18):`WANDERER`;t.player.identity={name:o.length>0?o:`WANDERER`,gender:a?.gender===`female`?`female`:`male`,race:a?.race===`ghoul`?`ghoul`:`human`};let s=t.player.special;t.player.special={...D};for(let e of Ap){let n=s?.[e.id];t.player.special[e.id]=Number.isFinite(n)?Math.max(1,Math.min(10,Math.floor(n??5))):5}let c=new Set(jp.map(e=>e.id));t.player.traits=Array.isArray(t.player.traits)?t.player.traits.filter(e=>c.has(e)):[],Number.isFinite(t.player.perkPoints)?t.player.perkPoints=Math.max(0,Math.floor(t.player.perkPoints)):t.player.perkPoints=Math.max(0,t.player.level-t.player.traits.length),(!Number.isFinite(t.characterRevision)||t.characterRevision<1)&&(t.player.special=ee(t.player.special),t.characterRevision=1,t.player.perkPoints=Math.max(t.player.perkPoints,Math.max(0,t.player.level-t.player.traits.length)),t.status===`playing`&&!t.dialogueFlags.includes(`character_011_migrated`)&&t.dialogueFlags.push(`character_011_migrated`));let l=t.player.inventory;t.player.inventory={water:Number.isFinite(l.water)?Math.max(0,l.water??0):0,ration:Number.isFinite(l.ration)?Math.max(0,l.ration??0):0,lockpick:Number.isFinite(l.lockpick)?Math.max(0,l.lockpick??0):0,electronics:Number.isFinite(l.electronics)?Math.max(0,l.electronics??0):0,stimpak:Number.isFinite(l.stimpak)?Math.max(0,l.stimpak??0):0,nuka_cola:Number.isFinite(l.nuka_cola)?Math.max(0,l.nuka_cola??0):0,whiskey:Number.isFinite(l.whiskey)?Math.max(0,l.whiskey??0):0,jet:Number.isFinite(l.jet)?Math.max(0,l.jet??0):0,med_x:Number.isFinite(l.med_x)?Math.max(0,l.med_x??0):0,antivenom:Number.isFinite(l.antivenom)?Math.max(0,l.antivenom??0):0,antibiotics:Number.isFinite(l.antibiotics)?Math.max(0,l.antibiotics??0):0,torch:Number.isFinite(l.torch)?Math.max(0,l.torch??0):0,cactus_fruit:Number.isFinite(l.cactus_fruit)?Math.max(0,l.cactus_fruit??0):0,broc_flower:Number.isFinite(l.broc_flower)?Math.max(0,l.broc_flower??0):0};let u=t.player.armor;if(typeof u!=`object`||!u)t.player.armor={owned:[`road_leathers`],equipped:`road_leathers`,condition:100};else{let e=e=>e===`road_leathers`||e===`scrap_vest`||e===`reinforced_raider`,n=Array.isArray(u.owned)?u.owned.filter(e):[];n.includes(`road_leathers`)||n.unshift(`road_leathers`),t.player.armor={owned:n,equipped:e(u.equipped)&&n.includes(u.equipped)?u.equipped:`road_leathers`,condition:Number.isFinite(u.condition)?Math.max(0,Math.min(100,u.condition)):100}}let d=t.player.conditions;t.player.conditions={fatigue:Number.isFinite(d?.fatigue)?Math.max(0,Math.min(100,d?.fatigue??0)):8,wetness:Number.isFinite(d?.wetness)?Math.max(0,Math.min(10,d?.wetness??0)):0,poisonTurns:Number.isFinite(d?.poisonTurns)?Math.max(0,d?.poisonTurns??0):0,poisonStrength:Number.isFinite(d?.poisonStrength)?Math.max(0,d?.poisonStrength??0):0,disease:d?.disease===`waste_fever`||d?.disease===`lung_rot`?d.disease:null,intoxicatedTurns:Number.isFinite(d?.intoxicatedTurns)?Math.max(0,d?.intoxicatedTurns??0):0,stimulantTurns:Number.isFinite(d?.stimulantTurns)?Math.max(0,d?.stimulantTurns??0):0,medXTurns:Number.isFinite(d?.medXTurns)?Math.max(0,d?.medXTurns??0):0,alcoholDependence:Number.isFinite(d?.alcoholDependence)?Math.max(0,Math.min(100,d?.alcoholDependence??0)):0,chemDependence:Number.isFinite(d?.chemDependence)?Math.max(0,Math.min(100,d?.chemDependence??0)):0};let f=t.player.addictions;t.player.addictions=Array.isArray(f)?f.filter(e=>e===`alcohol`||e===`chems`):[],t.player.pipLightOn=t.player.pipLightOn===!0,t.player.torchLit=t.player.torchLit===!0,t.player.torchFuel=Number.isFinite(t.player.torchFuel)?Math.max(0,t.player.torchFuel??0):0,t.player.torchFuel<=0&&(t.player.torchLit=!1);let p=t.npcs;if(Array.isArray(p))t.npcs=p.map(e=>({...e,homePosition:typeof e.homePosition==`object`&&e.homePosition!==null&&Number.isFinite(e.homePosition.x)&&Number.isFinite(e.homePosition.z)?{x:e.homePosition.x,z:e.homePosition.z}:{...e.position},species:e.species===`ghoul`||e.species===`brahmin`?e.species:`human`,role:e.role===`trader`||e.role===`wanderer`||e.role===`animal`?e.role:e.species===`brahmin`?`animal`:e.id===`mara-voss`||e.id===`sera-holt`?`trader`:`survivor`,hp:Math.max(0,Math.min(Number.isFinite(e.maxHp)?e.maxHp:32,Number.isFinite(e.hp)?e.hp:32)),maxHp:Number.isFinite(e.maxHp)?Math.max(1,e.maxHp):32,hostile:e.hostile===!0,unconsciousTurns:Number.isFinite(e.unconsciousTurns)?Math.max(0,e.unconsciousTurns):0}));else{let e=t.tiles.flatMap((e,t)=>e.map((e,n)=>({tile:e,x:n,z:t}))).find(e=>e.tile===`prospector`);t.npcs=e===void 0?[]:[{id:`mara-voss`,name:`MARA VOSS`,position:{x:e.x,z:e.z},homePosition:{x:e.x,z:e.z},role:`trader`,species:`human`,hp:32,maxHp:32,hostile:!1,unconsciousTurns:0}]}for(let e of t.pickups)Number.isFinite(e.amount)||(e.amount=e.kind===`ammo`?10:e.kind===`scrap`?4:1),typeof e.dropped!=`boolean`&&(e.dropped=!1);Array.isArray(t.transitions)||(t.transitions=[]),Array.isArray(t.clearedSites)||(t.clearedSites=[]),Array.isArray(t.landmarks)||(t.landmarks=[]),t.landmarks=t.landmarks.map(e=>({...e,position:{...e.position},discovered:e.discovered===!0,used:e.used===!0})),t.worldRevision=5;let m=t.cheats;if(typeof m!=`object`||!m)t.cheats={godMode:!1,noNeeds:!1};else{let e=m;t.cheats={godMode:e.godMode===!0,noNeeds:e.noNeeds===!0}}typeof t.autoMapEnabled!=`boolean`&&(t.autoMapEnabled=!0),Number.isFinite(t.timeMinutes)||(t.timeMinutes=(960+Math.max(0,t.turn)*5)%1440);let h=t.weather;h?.kind!==`clear`&&h?.kind!==`rain`?t.weather={kind:`clear`,turnsRemaining:60,intensity:1}:t.weather={kind:h.kind,turnsRemaining:Number.isFinite(h.turnsRemaining)?Math.max(1,h.turnsRemaining):60,intensity:h.intensity===2?2:1};let g=t.merchant.stock;if(t.merchant.stock={water:Number.isFinite(g.water)?g.water??0:4,ration:Number.isFinite(g.ration)?g.ration??0:3,ammo:Number.isFinite(g.ammo)?g.ammo??0:4,lockpick:Number.isFinite(g.lockpick)?g.lockpick??0:3,electronics:Number.isFinite(g.electronics)?g.electronics??0:2,stimpak:Number.isFinite(g.stimpak)?g.stimpak??0:2,nuka_cola:Number.isFinite(g.nuka_cola)?g.nuka_cola??0:3,antivenom:Number.isFinite(g.antivenom)?g.antivenom??0:1,antibiotics:Number.isFinite(g.antibiotics)?g.antibiotics??0:1,torch:Number.isFinite(g.torch)?g.torch??0:2},(!Number.isFinite(t.survivalRevision)||t.survivalRevision<1)&&(t.survivalRevision=1,t.balanceRevision=3,t.status===`playing`&&(t.player.inventory.stimpak+=1,t.player.inventory.nuka_cola+=1,t.player.inventory.antivenom+=1,t.player.inventory.antibiotics+=1,t.player.inventory.torch+=1,t.dialogueFlags.includes(`nightfall_010_migrated`)||t.dialogueFlags.push(`nightfall_010_migrated`))),t.survivalRevision<2&&(t.survivalRevision=2,t.weather.turnsRemaining=Math.max(t.weather.turnsRemaining,t.weather.kind===`rain`?24:60),t.status===`playing`)){t.player.inventory.torch+=1;let e=(t.timeMinutes%1440+1440)%1440;(be(t,t.player.position)===`interior`||e<360||e>=1200)&&!t.player.torchLit&&(t.player.torchFuel<=0&&(--t.player.inventory.torch,t.player.torchFuel=60),t.player.torchLit=!0),t.dialogueFlags.includes(`lighting_0101_migrated`)||t.dialogueFlags.push(`lighting_0101_migrated`)}return t.cheats.noNeeds&&(t.player.water=t.player.maxWater,t.player.food=t.player.maxFood,t.player.conditions.fatigue=0),t}function Hm(e){if(typeof e!=`object`||!e)return;let t=e;if(t.version!==3||t.levelId!==`sunscar-waste`)return;let n=pe(),r=t.player;if(typeof r==`object`&&r){let e=r,t=t=>{let r=e[t];typeof r==`number`&&Number.isFinite(r)&&(n.player[t]=r)};for(let e of[`hp`,`maxHp`,`magazine`,`magazineSize`,`reserveAmmo`,`medkits`,`water`,`maxWater`,`food`,`maxFood`,`scrap`])t(e);if(typeof e.hasCondenser==`boolean`&&(n.player.hasCondenser=e.hasCondenser),typeof e.direction==`number`&&e.direction>=0&&e.direction<=3&&(n.player.direction=e.direction),typeof e.position==`object`&&e.position!==null){let t=e.position;if(typeof t.x==`number`&&typeof t.z==`number`){let e=n.tiles[t.z]?.[t.x];e!==void 0&&e!==`wall`&&(n.player.position={x:t.x,z:t.z})}}}return typeof t.prospectorMet==`boolean`&&(n.prospectorMet=t.prospectorMet),typeof t.questAccepted==`boolean`&&(n.questAccepted=t.questAccepted),typeof t.prospectorTrust==`number`&&(n.prospectorTrust=t.prospectorTrust),typeof t.campBuilt==`boolean`&&(n.campBuilt=t.campBuilt),typeof t.turn==`number`&&(n.turn=t.turn),typeof t.rngState==`number`&&(n.rngState=t.rngState),(t.status===`playing`||t.status===`won`||t.status===`lost`)&&(n.status=t.status),Array.isArray(t.dialogueFlags)&&(n.dialogueFlags=t.dialogueFlags.filter(e=>typeof e==`string`)),n}function Um(){try{let e=localStorage.getItem(Sp)??localStorage.getItem(Cp);if(e===null)return;let t=JSON.parse(e);if(Im(t))return Vm(t);let n=Hm(t);return n!==void 0&&localStorage.setItem(Sp,JSON.stringify(Vm(n))),n===void 0?void 0:Vm(n)}catch{return}}function Wm(){try{localStorage.setItem(Sp,JSON.stringify(Z)),localStorage.removeItem(Cp)}catch{Xm(`Local save unavailable in this browser.`,`warning`)}}function Gm(e){let t=wp[e];if(t!==void 0)try{let e=localStorage.getItem(t);if(e===null)return;let n=JSON.parse(e);if(Im(n))return{format:1,savedAt:``,state:Vm(n)};if(typeof n!=`object`||!n)return;let r=n;return r.format!==1||typeof r.savedAt!=`string`||!Im(r.state)?void 0:{format:1,savedAt:r.savedAt,state:Vm(r.state)}}catch{return}}function Km(e){let t=wp[e];if(t===void 0||Gm(e)!==void 0&&!window.confirm(`Overwrite manual save slot ${e+1}?`))return!1;try{let n={format:1,savedAt:new Date().toISOString(),state:Z};return localStorage.setItem(t,JSON.stringify(n)),Xm(`Manual save slot ${e+1} written.`,`good`),!0}catch{return Xm(`Manual save unavailable in this browser.`,`warning`),!1}}function qm(e){let t=Gm(e);if(t===void 0){window.alert(`Manual save slot ${e+1} is empty.`);return}window.confirm(`Load slot ${e+1}: ${t.state.worldCode}, turn ${t.state.turn}?`)&&(lm=t.state,um.destroy(),um=new xp(Vp,t.state),Th(t.state))}function Jm(e,t){Z=he(cm(e),t),lm=void 0;try{localStorage.removeItem(Sp),localStorage.removeItem(Cp)}catch{}um.destroy(),um=new xp(Vp,Z),Ym(),Xm(`${Z.player.identity.name.toUpperCase()} // ${Z.worldCode}: new wasteland generated. Find the prospectors.`,`warning`),nh(),Hp.classList.add(`hidden`),Up.classList.add(`hidden`),Qp.classList.add(`hidden`),Wp.classList.add(`hidden`),Gp.classList.add(`hidden`),Kp.classList.add(`hidden`),qp.classList.add(`hidden`),Jp.classList.add(`hidden`),Yp.classList.add(`hidden`),Xp.classList.add(`hidden`),Zp.classList.add(`hidden`),om(!1),fm=!1,dm=!0,Wm()}function Ym(){em.replaceChildren()}function Xm(e,t){let n=document.createElement(`p`);for(n.dataset.tone=t,n.textContent=e,em.append(n);em.childElementCount>3;)em.firstElementChild?.remove()}function Zm(e){let t=Z.enemies.find(t=>t.id===e)??Z.npcs.find(t=>t.id===e);if(t===void 0)return`front`;let n=[{x:0,z:-1},{x:1,z:0},{x:0,z:1},{x:-1,z:0}][Z.player.direction]??{x:0,z:-1},r={x:-n.z,z:n.x},i={x:t.position.x-Z.player.position.x,z:t.position.z-Z.player.position.z},a=i.x*n.x+i.z*n.z,o=i.x*r.x+i.z*r.z;return Math.abs(o)>Math.abs(a)?o>=0?`right`:`left`:a>=0?`front`:`back`}function Qm(e){tm.classList.remove(`active`),nm.classList.remove(`active`),rm.classList.remove(`active`),tm.offsetWidth;let t=Zm(e);rm.dataset.direction=t,tm.classList.add(`active`),nm.classList.add(`active`),rm.classList.add(`active`)}function $m(e){um.playEvents(e),am.playEvents(e);for(let t of e)t.type===`message`&&Xm(t.text,t.tone),t.type===`shot`&&t.targetId===`player`&&t.hit&&t.damage>0&&Qm(t.sourceId),t.type===`dialogue`&&lh(t.nodeId),t.type===`crafting`&&uh(),t.type===`lockpick`&&vh(t.deviceId),t.type===`terminal`&&yh(t.deviceId),t.type===`barter`&&bh(),t.type===`area`&&Xm(`${t.environment===`interior`?`ENTERING`:`RETURNING TO`}: ${t.name}.`,`good`),t.type===`transition`&&Xm(`${t.environment===`interior`?`ENTERING`:`RETURNING TO`}: ${t.name}.`,`good`),t.type===`site_cleared`&&Xm(`${t.name} CLEARED // LEVEL ${t.level} SITE SECURED.`,`good`),t.type===`encounter_zone`&&Xm(`ENTERING ${t.name} // ENCOUNTER LEVEL ${t.level}${t.discovered?` // NEW`:``}.`,t.level>Z.player.level?`warning`:`good`),t.type===`level_up`&&window.setTimeout(()=>{Z.status===`playing`&&_h(`perks`)},260),t.type===`status`&&window.setTimeout(()=>eh(t.status),420)}function eh(e){if(e===`playing`)return;let t=e===`won`;X(`#end-eyebrow`).textContent=t?`CARAVAN SAVED`:`TRAIL ENDED`,X(`#end-title`).textContent=t?`ROLL OUT`:`DUST CLAIMED`,X(`#end-copy`).textContent=t?`The condenser rattles to life and the prospectors roll north with enough water to reach the next settlement.`:`Wind covers your tracks. By morning, the Mojave looks untouched.`,X(`#end-turns`).textContent=Z.turn.toString().padStart(3,`0`),Qp.classList.remove(`hidden`)}function th(){let e=X(`#auto-map`);if(e.classList.toggle(`disabled`,!Z.autoMapEnabled),!Z.autoMapEnabled)return;let t=X(`#auto-map-grid`);t.replaceChildren();let n=new Set(Z.exploredTiles),r=xe(Z,Z.player.position);X(`#auto-map-zone`).textContent=`${r.name} // L${r.level}`,e.setAttribute(`aria-label`,`Local auto-map for ${r.name}, encounter level ${r.level}`);for(let e=Z.player.position.z-2;e<=Z.player.position.z+2;e+=1)for(let r=Z.player.position.x-3;r<=Z.player.position.x+3;r+=1){let i=`${r},${e}`,a=document.createElement(`i`);a.className=`auto-map-cell unknown`;let o=Z.tiles[e]?.[r];if(o===void 0||!n.has(i)){t.append(a);continue}a.className=`auto-map-cell ${o===`wall`?`wall`:o===`water`?`water`:o===`bridge`?`bridge`:`floor`}`;let s=Z.player.position.x===r&&Z.player.position.z===e,c=Z.enemies.find(t=>t.hp>0&&t.position.x===r&&t.position.z===e&&Math.abs(t.position.x-Z.player.position.x)+Math.abs(t.position.z-Z.player.position.z)<=4),l=Z.pickups.find(t=>!t.collected&&t.position.x===r&&t.position.z===e),u=Z.npcs.find(t=>t.position.x===r&&t.position.z===e),d=Z.landmarks.find(t=>t.discovered&&t.position.x===r&&t.position.z===e);s?(a.className=`auto-map-cell player`,a.textContent=[`↑`,`→`,`↓`,`←`][Z.player.direction]??`•`):c===void 0?l===void 0?u===void 0?d===void 0?o===`door`||o===`locked_door`||o===`security_door`?a.className=`auto-map-cell ${Z.openDoors.includes(i)?`floor`:`door`}`:o===`camp`?a.className=`auto-map-cell camp`:o===`terminal`||o===`locker`?a.className=`auto-map-cell device`:o===`transition`&&(a.className=`auto-map-cell transition`):a.className=`auto-map-cell landmark ${d.kind}`:a.className=u.hp<=0?`auto-map-cell corpse`:u.species===`brahmin`?`auto-map-cell animal`:u.role===`trader`?`auto-map-cell trader`:`auto-map-cell survivor`:a.className=l.kind===`condenser`?`auto-map-cell objective`:`auto-map-cell loot`:a.className=`auto-map-cell hostile`,t.append(a)}}function nh(){let e=Z.player.hp/Z.player.maxHp;X(`#health-fill`).style.width=`${e*100}%`,X(`#health-fill`).classList.toggle(`critical`,e<=.3),X(`#health-text`).textContent=`${Z.player.hp} / ${Z.player.maxHp}`;let t=Z.player.water/Z.player.maxWater,n=Z.player.food/Z.player.maxFood;X(`#water-fill`).style.width=`${t*100}%`,X(`#water-fill`).classList.toggle(`critical`,t<=.25),X(`#water-text`).textContent=Z.player.water.toString().padStart(2,`0`),X(`#food-fill`).style.width=`${n*100}%`,X(`#food-fill`).classList.toggle(`critical`,n<=.25),X(`#food-text`).textContent=Z.player.food.toString().padStart(2,`0`);let r=Z.player.conditions.fatigue;X(`#fatigue-text`).textContent=r.toString().padStart(2,`0`),X(`#fatigue-fill`).style.width=`${r}%`,X(`#fatigue-fill`).classList.toggle(`critical`,r>=70),X(`#medkit-count`).textContent=Z.player.medkits.toString().padStart(2,`0`),X(`#level-count`).textContent=Z.player.level.toString().padStart(2,`0`);let i=Le(Z.player.level);X(`#xp-text`).textContent=`${Z.player.xp} / ${i} XP`,X(`#xp-fill`).style.width=`${Z.player.xp/i*100}%`,X(`#scrap-count`).textContent=Z.player.scrap.toString().padStart(2,`0`),X(`#caps-count`).textContent=Z.player.caps.toString().padStart(2,`0`),X(`#magazine-count`).textContent=Z.player.magazine.toString(),X(`#reserve-count`).textContent=Z.player.reserveAmmo.toString().padStart(2,`0`);let a=Z.player.weaponCondition??100;X(`#condition-text`).textContent=`${a}%`,X(`#condition-fill`).style.width=`${a}%`,X(`#condition-fill`).classList.toggle(`critical`,a<=25);let o=Z.player.armor.condition,s=at(Z);X(`#armor-text`).textContent=`${s} / ${o}%`,X(`#armor-fill`).style.width=`${o}%`,X(`#armor-fill`).classList.toggle(`critical`,o<=25);let c=Z.player.magazine<=0||a<=0;X(`#fire-action`).classList.toggle(`bash-mode`,c),X(`#fire-action`).querySelector(`span`).textContent=c?`PUNCH`:`FIRE`,X(`#reload-action`).classList.toggle(`reload-ready`,Z.player.magazine<Z.player.magazineSize&&Z.player.reserveAmmo>0),X(`#objective`).textContent=zt(Z).toUpperCase();let l=xe(Z,Z.player.position);X(`#sector-name`).textContent=`${l.name} // L${l.level}`,X(`#pause-run-code`).textContent=Z.worldCode;let u=be(Z,Z.player.position)===`exterior`;X(`#rain-overlay`).classList.toggle(`active`,u&&Z.weather.kind===`rain`),X(`#rain-overlay`).classList.toggle(`heavy`,Z.weather.intensity===2);let d=u?Oe(Z):0,f=u?1-d:1,p=X(`#darkness-vignette`),m=Z.player.torchLit&&Z.player.torchFuel>0;p.classList.toggle(`active`,f>.015),p.classList.toggle(`torch`,m),p.classList.toggle(`pip-light`,Z.player.pipLightOn&&!m),p.style.opacity=(f*(m?.84:Z.player.pipLightOn?.9:1)).toFixed(3),im.classList.toggle(`lit`,Z.player.pipLightOn),im.querySelector(`span`).textContent=Z.player.pipLightOn?`LIGHT OFF`:`PIP LIGHT`,im.querySelector(`small`).textContent=Z.player.pipLightOn?`WRIST LAMP ON`:`TAP TO SWITCH ON`,im.setAttribute(`aria-label`,Z.player.pipLightOn?`Switch Pip-Boy light off`:`Switch Pip-Boy light on`);let h=X(`#condition-strip`),g=[{text:`${ke(Z)} ${u?Z.weather.kind.toUpperCase():`INTERIOR`}`}];ve(Z)&&g.push({text:`SWIMMING`}),Z.player.pipLightOn&&g.push({text:`PIP LIGHT`}),Z.player.torchLit&&g.push({text:`TORCH ${Z.player.torchFuel}`}),Z.player.conditions.poisonTurns>0&&g.push({text:`POISON ${Z.player.conditions.poisonTurns}`,danger:!0}),Z.player.conditions.disease!==null&&g.push({text:Z.player.conditions.disease.replaceAll(`_`,` `).toUpperCase(),danger:!0}),Z.player.addictions.length>0&&g.push({text:`${Z.player.addictions.length} ADDICTION${Z.player.addictions.length===1?``:`S`}`,danger:!0}),Z.player.conditions.stimulantTurns>0&&g.push({text:`STIM ${Z.player.conditions.stimulantTurns}`}),Z.player.conditions.medXTurns>0&&g.push({text:`MED-X ${Z.player.conditions.medXTurns}`}),h.replaceChildren(...g.slice(0,5).map(e=>{let t=document.createElement(`span`);return t.textContent=e.text,e.danger&&t.classList.add(`danger`),t}));let _=Bt(Z),v=X(`#target-card`),y=X(`#reticle`);_===void 0||_.entity.hp<=0?(X(`#target-name`).textContent=`NO CONTACT`,X(`#target-health`).style.width=`0%`,v.classList.remove(`active`),y.classList.remove(`active`)):(X(`#target-name`).textContent=_.type===`enemy`?`L${_.entity.level} ${Tp[_.entity.kind]}`:_.entity.name,X(`#target-health`).style.width=`${_.entity.hp/_.entity.maxHp*100}%`,v.classList.add(`active`),y.classList.add(`active`)),th()}function rh(e,t=!1){Z=e.state;let n=e.events.some(e=>e.type===`transition`);if(pm=performance.now()+(n?340:e.consumedTurn?190:105),(t||n)&&um.resetLook(),um.syncState(Z,!n),n){let e=X(`#threshold-shift`);e.classList.remove(`active`),e.offsetWidth,e.classList.add(`active`)}$m(e.events),nh(),Wm()}function ih(){return dm&&!fm&&Up.classList.contains(`hidden`)&&Gp.classList.contains(`hidden`)&&Kp.classList.contains(`hidden`)&&qp.classList.contains(`hidden`)&&Jp.classList.contains(`hidden`)&&Yp.classList.contains(`hidden`)&&Xp.classList.contains(`hidden`)&&Zp.classList.contains(`hidden`)&&Qp.classList.contains(`hidden`)&&performance.now()>=pm}function ah(){X(`#audio-button`).textContent=`AUDIO: ${am.isMuted()?`OFF`:`ON`}`,X(`#music-button`).textContent=am.isMusicEnabled()?am.isReady()?`MUSIC: PLAYING`:`MUSIC: TAP TO START`:`MUSIC: OFF`}async function oh(){let e=!1;try{e=await am.unlock()}catch{}return ah(),e}async function sh(e){if(!ih())return;await oh();let t=Lt(Z,e),n=t.consumedTurn&&(e===`move_forward`||e===`move_backward`||e===`strafe_left`||e===`strafe_right`);om(!1),rh(t,n)}function ch(e){let t=m(e);X(`#terminal-title`).textContent=t.speaker,X(`#terminal-body`).textContent=t.body;let n=X(`#dialogue-choices`);n.replaceChildren();for(let e of t.choices){let t=document.createElement(`button`);t.type=`button`,t.textContent=e.label,t.addEventListener(`click`,()=>{e.effect!==void 0&&rh(Nt(Z,e.effect)),e.close===!0?Gp.classList.add(`hidden`):e.nextNodeId!==void 0&&ch(e.nextNodeId)}),n.append(t)}}function lh(e){om(!1),ch(e),Gp.classList.remove(`hidden`)}function uh(){om(!1),X(`#craft-title`).textContent=Z.campBuilt?`CINDER WORKBENCH`:`BUILD A LEAN-TO`,X(`#craft-copy`).textContent=Z.campBuilt?`Available trade scrap: ${Z.player.scrap}. Crafting advances one turn.`:`Raise shelter for 6 scrap to unlock the workbench. Available scrap: ${Z.player.scrap}.`;let e=X(`#craft-list`);e.replaceChildren();for(let t of Op){let n=document.createElement(`button`);n.type=`button`;let r=Ft(Z,t.id),i=t.id!==`lean_to`&&!Z.campBuilt,a=t.id===`lean_to`&&Z.campBuilt,o=t.id===`scrap_vest`&&Z.player.armor.owned.includes(`scrap_vest`),s=t.id===`detox`&&Z.player.addictions.length===0,c=t.id===`stimpak`&&Z.player.inventory.water<=0;n.disabled=i||a||o||s||c||Z.player.scrap<r;let l=document.createElement(`strong`);l.textContent=a?`${t.title} — BUILT`:o?`${t.title} — OWNED`:t.title;let u=document.createElement(`span`);u.textContent=i?`Requires lean-to`:s?`No active addiction`:c?`Requires one clean water`:`${t.copy} · ${r} scrap`,n.append(l,u),n.addEventListener(`click`,async()=>{await oh(),rh(It(Z,t.id)),Z.status===`playing`?uh():Kp.classList.add(`hidden`)}),e.append(n)}Kp.classList.remove(`hidden`)}function $(e,t,n,r,i){let a=document.createElement(`article`);a.className=`data-row`;let o=document.createElement(`div`),s=document.createElement(`strong`);s.textContent=t;let c=document.createElement(`span`);c.textContent=n,o.append(s,c);let l=document.createElement(`b`);if(l.textContent=r,a.append(o,l),i!==void 0){let e=document.createElement(`div`);e.className=`data-row-actions`;let t=Array.isArray(i)?i:[i];for(let n of t){let t=document.createElement(`button`);t.type=`button`,t.textContent=n.label,t.disabled=!n.enabled,n.directTap===!0?Ip(t,n.run):t.addEventListener(`click`,n.run),e.append(t)}a.append(e)}e.append(a)}function dh(){let e=Le(Z.player.level),t=we(Z),n=xe(Z,Z.player.position);X(`#pip-level`).textContent=`LV ${Z.player.level.toString().padStart(2,`0`)}`,X(`#pip-location`).textContent=`${Z.player.identity.name.toUpperCase()} // ${Ce(Z,Z.player.position)} // ENCOUNTER LV ${n.level}`,X(`#pip-xp`).textContent=`${Z.player.xp} / ${e} XP`,X(`#pip-points`).textContent=mm===`map`?`${t.percent}% CHARTED`:mm===`journal`?`${ph(Z).filter(e=>e.status===`COMPLETE`||e.status===`INTEL`).length} RECORDS UPDATED`:mm===`data`?`AUTOSAVE + 3 MANUAL SLOTS`:mm===`perks`?`${Z.player.perkPoints} PERK POINT${Z.player.perkPoints===1?``:`S`}`:`${Z.player.skillPoints} SKILL POINT${Z.player.skillPoints===1?``:`S`}`}function fh(e){let t=new Set(Z.exploredTiles),n=we(Z),r=P(Z),i=r.maxX-r.minX+1,a=r.maxZ-r.minZ+1,o=be(Z,Z.player.position),s=document.createElement(`section`);s.className=`expedition-map-panel`;let c=document.createElement(`div`);c.className=`expedition-map`,c.style.setProperty(`--map-width`,i.toString()),c.style.setProperty(`--map-ratio`,`${i} / ${a}`),c.setAttribute(`role`,`img`),c.setAttribute(`aria-label`,`${Z.worldName} exploration map, ${n.percent} percent charted`);for(let e=r.minZ;e<=r.maxZ;e+=1)for(let n=r.minX;n<=r.maxX;n+=1){let r=Z.tiles[e]?.[n]??`wall`,i=`${n},${e}`,a={x:n,z:e},s=document.createElement(`i`);if(s.className=`map-cell`,!t.has(i)){s.classList.add(`unknown`),s.title=`Uncharted`,c.append(s);continue}let l=xe(Z,a);s.classList.add(be(Z,a)===`interior`?`interior`:`exterior`),s.classList.add(`zone-level-${Math.min(4,l.level)}`),s.classList.add(r===`wall`?`wall`:r===`water`?`water`:r===`bridge`?`bridge`:`floor`),s.title=`${l.name} · Encounter level ${l.level} · ${r===`wall`?`Rubble`:r===`water`?`Flooded wash`:r===`bridge`?`Bridge deck`:`Charted ground`}`;let u=Z.player.position.x===n&&Z.player.position.z===e,d=Z.enemies.find(t=>t.hp>0&&t.position.x===n&&t.position.z===e&&Math.abs(t.position.x-Z.player.position.x)+Math.abs(t.position.z-Z.player.position.z)<=4),f=Z.pickups.find(t=>!t.collected&&t.position.x===n&&t.position.z===e),p=Z.npcs.find(t=>t.position.x===n&&t.position.z===e),m=Z.landmarks.find(t=>t.discovered&&t.position.x===n&&t.position.z===e);u?(s.className=`map-cell player`,s.textContent=[`↑`,`→`,`↓`,`←`][Z.player.direction]??`•`,s.title=`You are here`):d===void 0?f===void 0?p===void 0?m===void 0?r===`exit`?(s.className=`map-cell caravan`,s.title=`Caravan extraction`):r===`camp`?(s.className=`map-cell camp`,s.title=`Camp site`):r===`terminal`?(s.className=`map-cell terminal`,s.title=`Terminal`):r===`locker`?(s.className=`map-cell locker`,s.title=`Locked cache`):r===`transition`?(s.className=`map-cell transition`,s.title=o===`interior`?`Return to the wasteland`:`Enter location`):(r===`door`||r===`locked_door`||r===`security_door`)&&(s.className=`map-cell ${Z.openDoors.includes(i)?`open-door`:`door`}`,s.title=Z.openDoors.includes(i)?`Open passage`:`Sealed passage`):(s.className=`map-cell landmark ${m.kind}`,s.title=`${m.name} · ${m.kind}`):(s.className=p.hp<=0?`map-cell corpse`:p.species===`brahmin`?`map-cell animal`:p.role===`trader`?`map-cell trader`:`map-cell survivor`,s.title=p.hp<=0?`${p.name} · dead`:`${p.name} · ${p.role}`):(s.className=f.kind===`condenser`?`map-cell objective`:`map-cell loot`,s.title=f.kind===`condenser`?`Water condenser`:`Scavenge`):(s.className=`map-cell hostile`,s.title=`Level ${d.level} nearby hostile`),c.append(s)}let l=document.createElement(`aside`);l.className=`map-dossier`;let u=document.createElement(`strong`);u.textContent=Z.worldCode;let d=xe(Z,Z.player.position),f=document.createElement(`span`);f.className=`zone-status`,f.textContent=`${d.name} // ENCOUNTER LV ${d.level}`;let p=document.createElement(`span`);p.textContent=`${n.explored}/${n.total} WALKABLE CELLS CHARTED`;let m=document.createElement(`p`);m.textContent=zt(Z).toUpperCase();let h=document.createElement(`div`);h.className=`map-legend`;for(let[e,t]of[[`player`,`YOU`],[`hostile`,`HOSTILE`],[`loot`,`LOOT`],[`survivor`,`SURVIVOR`],[`trader`,`TRADER`],[`animal`,`BRAHMIN`],[`landmark`,`LANDMARK`],[`camp`,`CAMP`],[`terminal`,`DEVICE`],[`transition`,`ENTRANCE`]]){let n=document.createElement(`span`),r=document.createElement(`i`);r.className=`map-cell ${e}`,n.append(r,t),h.append(n)}let g=document.createElement(`small`);g.textContent=o===`interior`?`${Z.clearedSites.includes(d.id)?`SITE CLEARED. `:`HOSTILES REMAIN POSSIBLE. `}Use the marked passage to return outside; this site's loot and enemy state persist.`:`Danger rises east. Marked entrances lead to persistent cellars, mines, and bunkers; cleared sites stay cleared.`;let _=document.createElement(`button`);_.type=`button`,_.textContent=`LOAD RUN CODE`,_.addEventListener(`click`,()=>{let e=window.prompt(`Enter a Cinder run code`,Z.worldCode);if(e===null)return;let t=Dn(e);if(t===void 0){window.alert(`That run code is not valid. Use the CND-XXXXXXX format shown on the map.`);return}window.confirm(`Erase this descent and generate ${En(t)}?`)&&Nm(t)});let v=document.createElement(`button`);v.type=`button`,v.textContent=`AUTO-MAP: ${Z.autoMapEnabled?`ON`:`OFF`}`,v.addEventListener(`click`,()=>{Z={...Z,autoMapEnabled:!Z.autoMapEnabled},um.syncState(Z,!1),nh(),Wm(),mh()});let y=document.createElement(`div`);y.className=`map-dossier-actions`,y.append(v,_),l.append(u,f,p,m,h,g,y),s.append(c,l),e.append(s)}function ph(e){let t=new Set(e.dialogueFlags),n=e.npcs.find(e=>e.id===`mara-voss`),r=e.devices.find(e=>e.kind===`locked_door`),i=e.devices.find(e=>e.kind===`terminal`),a=[e.prospectorMet||n?.hp===0||n?.hostile===!0,e.questAccepted||n?.hp===0||n?.hostile===!0,e.player.hasRelayKey||r?.locked===!1,e.discoveredAreas.includes(`buried-relay`),i?.hacked===!0,e.player.hasCondenser,e.status===`won`],o=a.findIndex(e=>!e),s=e=>a[e]?`COMPLETE`:e===o?`ACTIVE`:`PENDING`,c=[{section:`CURRENT`,title:`ACTIVE LEAD`,copy:zt(e),status:`ACTIVE`},{section:`MAIN`,title:`THE STRANDED CARAVAN`,copy:`Find Mara Voss among the survivors at Caravan Flats.`,status:e.prospectorMet?`COMPLETE`:n?.hp===0?`FAILED`:s(0)},{section:`MAIN`,title:`A THIRSTY ROAD`,copy:`Learn what the raiders stole and take Mara's condenser contract.`,status:e.questAccepted?`COMPLETE`:n?.hp===0||n?.hostile?`FAILED`:s(1)},{section:`MAIN`,title:`DRY WELLS ACCESS`,copy:`Recover the service-station foreman card, or pick the Ash Basin bunker lock.`,status:s(2)},{section:`MAIN`,title:`BENEATH ASH BASIN`,copy:`Cross Red Mesa and enter the buried relay.`,status:s(3)},{section:`MAIN`,title:`MAINTENANCE OVERRIDE`,copy:`Hack the relay terminal to release the inner security bulkhead.`,status:s(4)},{section:`MAIN`,title:`THE BLUE GLASS`,copy:`Recover the caravan's water condenser from relay security.`,status:s(5)},{section:`MAIN`,title:`ROLL NORTH`,copy:`Return the condenser to the green caravan marker.`,status:s(6)}];for(let t of[{id:`dry-wells-cellar`,title:`DRY WELLS CELLAR`,copy:`A powered service cellar beneath the ruined station.`},{id:`red-mesa-mine`,title:`RED MESA PROSPECT`,copy:`An optional mine holding old supplies and fresh scorpion nests.`},{id:`buried-relay`,title:`BURIED RELAY`,copy:`A sealed pre-war installation beneath Ash Basin.`}])c.push({section:`SIDE`,title:t.title,copy:t.copy,status:e.clearedSites.includes(t.id)?`COMPLETE`:e.discoveredAreas.includes(t.id)?`OPEN`:`UNKNOWN`});c.push({section:`SIDE`,title:`A PLACE TO SLEEP`,copy:`Raise the marked lean-to to unlock safe rest and field crafting.`,status:e.campBuilt?`COMPLETE`:`OPEN`});let l={oasis:`A palm-ringed spring where canteens can be refilled.`,bridge:`A patched crossing over Red Cut's flooded wash.`,wreck:`A pre-war vehicle that may still yield salvage.`,settlement:`A living Mojave stop with shelter, trade and guarded firelight.`,campfire:`A tended fire where wet clothes and fatigue can be treated.`,teepee:`A canvas lodge offering a brief shelter from the road.`,vista:`A high survey point overlooking the valley and distant mountain pass.`};for(let t of e.landmarks)c.push({section:`SIDE`,title:t.name,copy:l[t.kind],status:t.discovered?t.used&&(t.kind===`wreck`||t.kind===`vista`||t.kind===`oasis`)?`COMPLETE`:`OPEN`:`UNKNOWN`});for(let e of[{flag:`learned_field_medicine`,title:`FIELD MEDICINE`,copy:`Sera's notes on exposure, infection, venom, and treatment.`},{flag:`learned_desert_plants`,title:`DESERT BOTANY`,copy:`Prickly pear hydrates; broc flower slows venom.`},{flag:`learned_dry_wells`,title:`DRY WELLS`,copy:`Niko says the relay card survived in the locked utility room.`},{flag:`learned_waterways`,title:`FLOODED WASHES`,copy:`Water muffles movement, but cold and wetness make the route costly.`},{flag:`learned_raider_routes`,title:`RAIDER PATROLS`,copy:`The strongest patrols hold long firing lanes east of Red Mesa.`},{flag:`learned_red_mesa`,title:`RED MESA PROSPECT`,copy:`Abel marked supplies in the south cut and scorpions near warm stone.`},{flag:`learned_buried_relay`,title:`BURIED RELAY`,copy:`A card opens the outer seal; a terminal controls the inner seal.`},{flag:`learned_old_prospectors`,title:`OLD PROSPECTORS`,copy:`Abel remains to remember the miners who never left Red Mesa.`},{flag:`learned_oasis`,title:`GLASSWATER OASIS`,copy:`A drinkable spring lies in the green bowl northeast of Juniper Post.`},{flag:`learned_bridge`,title:`OLD 95 SPAN`,copy:`The timber-patched bridge crosses Red Cut, but the valley carries every sound.`},{flag:`learned_settlements`,title:`LIVING SETTLEMENTS`,copy:`Juniper Post and Coyote Rest anchor trade, shelter and caravan life along the road.`},{flag:`learned_mountain_pass`,title:`EASTERN PASS`,copy:`Sunbreak Overlook reveals a pale saddle through the distant eastern range.`}])t.has(e.flag)&&c.push({section:`INTEL`,title:e.title,copy:e.copy,status:`INTEL`});let u={"mara-voss":`Caravan leader and condenser contractor at Caravan Flats.`,"sera-holt":`Caravan medic with survival and plant knowledge.`,"niko-ortega":`Route scout ranging around Dry Wells.`,"abel-crow":`Ghoul miner holding out beneath Red Mesa.`,"tamsin-vale":`Juniper Post trader and keeper of the western settlement route.`,"sable-reyes":`Coyote Rest trader working the Old 95 bridge road.`,"orrin-pike":`Ghoul wanderer watching the level and safety of Glasswater Oasis.`,"lark-danner":`Ridge walker mapping Red Cut and the eastern mountain pass.`,"juniper-brahmin":`Buttons, Juniper Post's veteran two-headed pack Brahmin.`,"coyote-brahmin":`Two-Bells, Sable's pack Brahmin and travelling water carrier.`};for(let n of e.npcs){let r=n.id===`mara-voss`?e.prospectorMet:t.has(`met_${n.id.replaceAll(`-`,`_`)}`);c.push({section:`CONTACT`,title:n.name,copy:u[n.id]??`A Mojave survivor with a story of their own.`,status:n.hp<=0?`DEAD`:n.hostile?`HOSTILE`:r?`CONTACT`:`UNKNOWN`})}return c}function mh(){dh();for(let e of document.querySelectorAll(`[data-pip-tab]`))e.classList.toggle(`active`,e.dataset.pipTab===mm);let e=X(`#pip-content`);if(e.replaceChildren(),e.classList.toggle(`map-mode`,mm===`map`),e.classList.toggle(`data-mode`,mm===`data`),e.classList.toggle(`journal-mode`,mm===`journal`),mm===`map`){fh(e);return}if(mm===`journal`){let t=``;for(let n of ph(Z)){if(n.section!==t){let r=document.createElement(`h3`);r.className=`journal-heading`,r.textContent=n.section,e.append(r),t=n.section}$(e,n.title,n.copy,n.status)}return}if(mm===`inventory`){let t=e=>{rh(e),Z.status===`playing`&&_h(`inventory`)},n=(e,n)=>({label:`DROP`,enabled:n,run:()=>t(Ct(Z,e))});$(e,`PIP-BOY LAMP`,`Unlimited wrist light · six-tile visibility · easier for nearby creatures to detect`,Z.player.pipLightOn?`ON`:`OFF`,{label:Z.player.pipLightOn?`SWITCH OFF`:`SWITCH ON`,enabled:!0,run:()=>t(St(Z))}),$(e,`9MM SIDEARM`,`Equipped · ${Z.player.magazine}/${Z.player.reserveAmmo} loaded · REPAIR ${Z.player.skills.repair}`,`${Z.player.weaponCondition}%`,{label:`REPAIR ${_t(Z)}S`,enabled:Z.player.weaponCondition<100&&Z.player.scrap>=_t(Z),run:()=>t(vt(Z))});for(let n of Z.player.armor.owned){let r=Z.player.armor.equipped===n,i=[{label:r?`EQUIPPED`:`EQUIP`,enabled:!r,run:()=>t(yt(Z,n))}];r&&i.push({label:`REPAIR ${bt(Z)}S`,enabled:Z.player.armor.condition<100&&Z.player.scrap>=bt(Z),run:()=>t(xt(Z))}),$(e,ot(n).toUpperCase(),`${r?`Equipped`:`Owned`} · DR ${r?at(Z):n===`road_leathers`?1:n===`scrap_vest`?3:5}`,r?`${Z.player.armor.condition}%`:`READY`,i)}$(e,`9MM ROUNDS`,`Drops up to six reserve rounds`,Z.player.reserveAmmo.toString(),n(`ammo`,Z.player.reserveAmmo>0)),$(e,`FIELD DRESSING`,`Restores up to 18 health · uses one turn`,Z.player.medkits.toString(),[{label:`USE`,enabled:Z.player.medkits>0&&Z.player.hp<Z.player.maxHp,run:()=>t(Lt(Z,`use_medkit`))},n(`medkit`,Z.player.medkits>0)]),$(e,`STIMPAK`,`Restores up to 28 health · uses one turn`,Z.player.inventory.stimpak.toString(),[{label:`INJECT`,enabled:Z.player.inventory.stimpak>0&&Z.player.hp<Z.player.maxHp,run:()=>t(gt(Z,`stimpak`))},n(`stimpak`,Z.player.inventory.stimpak>0)]),$(e,`CLEAN WATER`,`Restores six hydration · uses one turn`,Z.player.inventory.water.toString(),[{label:`DRINK`,enabled:Z.player.inventory.water>0&&Z.player.water<Z.player.maxWater,run:()=>t(gt(Z,`water`))},n(`water`,Z.player.inventory.water>0)]),$(e,`TRAIL RATION`,`Restores six food · uses one turn`,Z.player.inventory.ration.toString(),[{label:`EAT`,enabled:Z.player.inventory.ration>0&&Z.player.food<Z.player.maxFood,run:()=>t(gt(Z,`ration`))},n(`ration`,Z.player.inventory.ration>0)]),$(e,`PRICKLY-PEAR FRUIT`,`Restores hydration and food · Survival improves both`,Z.player.inventory.cactus_fruit.toString(),[{label:`EAT`,enabled:Z.player.inventory.cactus_fruit>0&&(Z.player.water<Z.player.maxWater||Z.player.food<Z.player.maxFood),run:()=>t(gt(Z,`cactus_fruit`))},n(`cactus_fruit`,Z.player.inventory.cactus_fruit>0)]),$(e,`BROC FLOWER`,`Field poultice restores health and slows venom`,Z.player.inventory.broc_flower.toString(),[{label:`CRUSH`,enabled:Z.player.inventory.broc_flower>0&&(Z.player.hp<Z.player.maxHp||Z.player.conditions.poisonTurns>0),run:()=>t(gt(Z,`broc_flower`))},n(`broc_flower`,Z.player.inventory.broc_flower>0)]),$(e,`NUKA-COLA`,`Hydration +3 · fatigue -12 · brief stimulant`,Z.player.inventory.nuka_cola.toString(),[{label:`DRINK`,enabled:Z.player.inventory.nuka_cola>0,run:()=>t(gt(Z,`nuka_cola`))},n(`nuka_cola`,Z.player.inventory.nuka_cola>0)]),$(e,`WHISKEY`,`Melee bonus, firearm penalty · addiction risk`,Z.player.inventory.whiskey.toString(),[{label:`DRINK`,enabled:Z.player.inventory.whiskey>0,run:()=>t(gt(Z,`whiskey`))},n(`whiskey`,Z.player.inventory.whiskey>0)]),$(e,`JET`,`Fatigue -32 · improved aim for seven turns · addictive`,Z.player.inventory.jet.toString(),[{label:`INHALE`,enabled:Z.player.inventory.jet>0,run:()=>t(gt(Z,`jet`))},n(`jet`,Z.player.inventory.jet>0)]),$(e,`MED-X`,`Damage resistance +3 for eight turns · addictive`,Z.player.inventory.med_x.toString(),[{label:`INJECT`,enabled:Z.player.inventory.med_x>0,run:()=>t(gt(Z,`med_x`))},n(`med_x`,Z.player.inventory.med_x>0)]),$(e,`ANTIVENOM`,`Immediately clears active poison`,Z.player.inventory.antivenom.toString(),[{label:`USE`,enabled:Z.player.inventory.antivenom>0&&Z.player.conditions.poisonTurns>0,run:()=>t(gt(Z,`antivenom`))},n(`antivenom`,Z.player.inventory.antivenom>0)]),$(e,`ANTIBIOTICS`,`Clears waste fever or lung rot`,Z.player.inventory.antibiotics.toString(),[{label:`USE`,enabled:Z.player.inventory.antibiotics>0&&Z.player.conditions.disease!==null,run:()=>t(gt(Z,`antibiotics`))},n(`antibiotics`,Z.player.inventory.antibiotics>0)]),$(e,`WASTELAND TORCH`,Z.player.torchLit?`Lit · ${Z.player.torchFuel} turns fuel remaining`:Z.player.torchFuel>0?`${Z.player.torchFuel} turns of prepared fuel remaining`:`Reveals dark interiors and night terrain`,`${Z.player.inventory.torch}${Z.player.torchLit?` + LIT`:``}`,[{label:Z.player.torchLit?`EXTINGUISH`:`LIGHT`,enabled:Z.player.torchLit||Z.player.torchFuel>0||Z.player.inventory.torch>0,run:()=>t(gt(Z,`torch`))},n(`torch`,Z.player.inventory.torch>0)]),$(e,`LOCKPICKS`,`Consumed when a lock attempt fails`,Z.player.inventory.lockpick.toString(),n(`lockpick`,Z.player.inventory.lockpick>0)),$(e,`CIRCUIT BRIDGES`,`Reset a locked maintenance terminal`,Z.player.inventory.electronics.toString(),n(`electronics`,Z.player.inventory.electronics>0)),Z.player.hasRelayKey&&$(e,`RELAY ACCESS CARD`,`Quest credential · opens the Ash Basin bunker`,`1`),$(e,`TRADE SCRAP`,`Camp crafting and weapon repair`,Z.player.scrap.toString(),n(`scrap`,Z.player.scrap>0)),$(e,`BOTTLE CAPS`,`Caravan currency`,Z.player.caps.toString()),Z.player.hasCondenser&&$(e,`WATER CONDENSER`,`Quest item · return it to the caravan`,`1`);return}if(mm===`data`){$(e,Z.player.identity.name.toUpperCase(),`${Z.player.identity.gender.toUpperCase()} · ${Z.player.identity.race.toUpperCase()} · persistent field identity`,`LEVEL ${Z.player.level}`,{label:`RENAME`,enabled:!0,run:()=>{let e=window.prompt(`Enter a new field name (maximum 18 characters)`,Z.player.identity.name);e===null||e.trim().length===0||(rh(ge(Z,e)),_h(`data`))}}),$(e,`S.P.E.C.I.A.L.`,Z.player.identity.race===`ghoul`?`Ghoul: disease immune · slower thirst · +1 natural DR`:`Human: +1 skill point each level · +10 starting caps`,Ap.map(e=>`${e.letter}${Z.player.special[e.id]}`).join(` `)),$(e,`PERKS`,Z.player.traits.length===0?`No perks selected yet`:Z.player.traits.map(e=>jp.find(t=>t.id===e)?.title??e.toUpperCase()).join(` · `),`${Z.player.perkPoints} READY`),$(e,`EXPEDITION JOURNAL`,`${Z.discoveredAreas.length}/3 interiors discovered · ${Z.clearedSites.length}/3 cleared`,Z.worldCode),$(e,`ACTIVE LEAD`,zt(Z).toUpperCase(),be(Z,Z.player.position).toUpperCase()),$(e,`WORLD CONDITIONS`,`${Z.weather.kind===`rain`?`Rain intensity ${Z.weather.intensity}`:`Clear sky`} · visibility changes with darkness and light sources`,ke(Z)),$(e,`FATIGUE`,Z.player.conditions.fatigue>=70?`Aim impaired · sleep at the lean-to or use Jet/Nuka-Cola`:`Below the impairment threshold`,`${Z.player.conditions.fatigue}/100`),$(e,`POISON`,Z.player.conditions.poisonTurns>0?`${Z.player.conditions.poisonStrength} damage per turn · antivenom cures it`:`No active venom`,Z.player.conditions.poisonTurns>0?`${Z.player.conditions.poisonTurns} TURNS`:`CLEAR`),$(e,`DISEASE`,Z.player.conditions.disease===null?`No active infection`:`Persistent until treated with antibiotics`,Z.player.conditions.disease?.replaceAll(`_`,` `).toUpperCase()??`CLEAR`),$(e,`DEPENDENCE`,`Alcohol ${Z.player.conditions.alcoholDependence}% · chems ${Z.player.conditions.chemDependence}% · withdrawal increases fatigue and hurts aim`,Z.player.addictions.length===0?`NONE`:Z.player.addictions.join(` + `).toUpperCase());let t=[Z.player.conditions.intoxicatedTurns>0?`WHISKEY ${Z.player.conditions.intoxicatedTurns}T`:``,Z.player.conditions.stimulantTurns>0?`STIMULANT ${Z.player.conditions.stimulantTurns}T`:``,Z.player.conditions.medXTurns>0?`MED-X ${Z.player.conditions.medXTurns}T`:``,Z.player.pipLightOn?`PIP LIGHT`:``,Z.player.torchLit?`TORCH ${Z.player.torchFuel}T`:``].filter(Boolean);$(e,`ACTIVE EFFECTS`,`Temporary effects count down on consumed turns`,t.length===0?`NONE`:t.join(` · `)),$(e,`AUTOMATIC SAVE`,`Updated after every action and whenever a descent is resumed`,`TURN ${Z.turn}`),wp.forEach((t,n)=>{let r=Gm(n),i=r?.savedAt===void 0||r.savedAt.length===0?`LEGACY SAVE`:new Date(r.savedAt).toLocaleString([],{dateStyle:`short`,timeStyle:`short`});$(e,`MANUAL SLOT ${n+1}`,r===void 0?`Empty slot · manual saves remain available after a new descent`:`${r.state.player.identity.name.toUpperCase()} · ${r.state.worldCode} · LV ${r.state.player.level} · ${i}`,r===void 0?`EMPTY`:`TURN ${r.state.turn}`,[{label:r===void 0?`SAVE`:`OVERWRITE`,enabled:!0,run:()=>{Km(n)&&mh()}},{label:`LOAD`,enabled:r!==void 0,run:()=>qm(n)}])});return}if(mm===`skills`){for(let t of kp)$(e,t.title,t.copy,Z.player.skills[t.id].toString(),{label:`+5`,enabled:Z.player.skillPoints>0&&Z.player.skills[t.id]<100,run:()=>{rh(jt(Z,t.id)),_h(`skills`)}});return}for(let t of jp){let n=Z.player.traits.includes(t.id),r=k(Z.player.special,Z.player.identity.race,Z.player.level,t.id);$(e,t.title,`${t.copy} · Requires ${t.requirement}`,n?`ACTIVE`:r?`AVAILABLE`:`LOCKED`,{label:n?`SELECTED`:`CHOOSE`,enabled:!n&&r&&Z.player.perkPoints>0,run:()=>{rh(Mt(Z,t.id)),_h(`perks`)}})}}function hh(){let e=[Z.cheats.godMode?`GOD`:``,Z.cheats.noNeeds?`NEEDS`:``].filter(Boolean);X(`#cheat-status`).textContent=e.length===0?`ALL AIDS OFF`:e.join(` + `);let t=X(`#cheat-god`);t.textContent=`GOD MODE: ${Z.cheats.godMode?`ON`:`OFF`}`,t.classList.toggle(`active`,Z.cheats.godMode);let n=X(`#cheat-needs`);n.textContent=`FROZEN NEEDS: ${Z.cheats.noNeeds?`ON`:`OFF`}`,n.classList.toggle(`active`,Z.cheats.noNeeds)}function gh(){!dm||Z.status!==`playing`||(Wp.classList.add(`hidden`),fm=!1,om(!1),hh(),Jp.classList.remove(`hidden`))}function _h(e=mm){!dm||Z.status!==`playing`||(mm=e,Wp.classList.add(`hidden`),fm=!1,om(!1),mh(),qp.classList.remove(`hidden`))}function vh(e){let t=Z.devices.find(t=>t.id===e);if(t===void 0||t.kind!==`locker`&&t.kind!==`locked_door`)return;om(!1),X(`#lockpick-title`).textContent=Np[t.kind],X(`#lockpick-copy`).textContent=Z.player.skills.lockpick>=60?`Your Lockpick skill widens the sweet spot. Probe the cylinder; a bad angle still snaps the pick.`:`Probe the cylinder for its exact sweet spot. A bad angle snaps the pick.`,X(`#lockpick-status`).textContent=`${Z.player.inventory.lockpick} PICKS · LOCKPICK ${Z.player.skills.lockpick}`;let n=X(`#lock-probes`);n.replaceChildren();for(let[t,r]of[`FAR LEFT`,`LEFT`,`CENTRE`,`RIGHT`,`FAR RIGHT`].entries()){let i=document.createElement(`button`);i.type=`button`,i.textContent=r,i.disabled=Z.player.inventory.lockpick<=0,i.addEventListener(`click`,()=>{rh(wt(Z,e,t)),Z.devices.find(t=>t.id===e)?.locked===!0&&Z.status===`playing`?vh(e):Yp.classList.add(`hidden`)}),n.append(i)}Yp.classList.remove(`hidden`)}function yh(e){let t=Z.devices.find(t=>t.id===e&&t.kind===`terminal`);if(t===void 0)return;om(!1),X(`#device-title`).textContent=Np.terminal,X(`#terminal-attempts`).textContent=t.hacked?`ROOT ACCESS`:`${t.attemptsRemaining} ATTEMPT${t.attemptsRemaining===1?``:`S`}`;let n=X(`#terminal-screen`),r=X(`#device-actions`);if(n.replaceChildren(),r.replaceChildren(),t.hacked){X(`#device-copy`).textContent=`CINDER TERRITORY WATER AUTHORITY // Maintenance log 88-C: pressure collapse followed fauna breach. Security bulkhead released by remote command.`,n.textContent=`> ROOT@RELAY-03
> SECURITY BULKHEAD: RELEASED
> CONDENSER CRADLE: OFFLINE
> FAUNA MOTION: ACTIVE`;let e=document.createElement(`button`);e.type=`button`,e.textContent=`SECURITY DOOR RELEASED`,e.disabled=!0,r.append(e)}else if(t.attemptsRemaining<=0){X(`#device-copy`).textContent=`TERMINAL LOCKOUT. Install one circuit bridge to clear the failed login counter.`,n.textContent=`> ACCESS SUSPENDED
> HARDWARE RESET REQUIRED`;let t=document.createElement(`button`);t.type=`button`,t.textContent=`RESET WITH CIRCUIT BRIDGE (${Z.player.inventory.electronics})`,t.disabled=Z.player.inventory.electronics<=0,t.addEventListener(`click`,()=>{rh(Et(Z,e)),Z.status===`playing`&&yh(e)}),r.append(t)}else{let i=Z.player.skills.science,a=i>=65?2:+(i>=40),o=[0,1,2,3].filter(e=>e!==t.solution).slice(0,a);X(`#device-copy`).textContent=`Select the maintenance password. SCIENCE ${i}${a>0?` has rejected ${a} false option${a===1?``:`s`}.`:`. Higher Science reveals bad candidates.`}`,n.textContent=`> LOGIN: MAINT-OVERRIDE
> PASSWORD DICTIONARY LOADED`,Pp.forEach((t,n)=>{let i=document.createElement(`button`);i.type=`button`,i.textContent=o.includes(n)?`${t} // REJECTED`:t,i.disabled=o.includes(n),i.addEventListener(`click`,()=>{rh(Tt(Z,e,n)),Z.status===`playing`&&yh(e)}),r.append(i)})}Xp.classList.remove(`hidden`)}function bh(e=`SELECT GOODS TO TRADE.`,t=`neutral`){if(!dm||Z.status!==`playing`)return;let n=Z.npcs.find(e=>e.role===`trader`&&Math.abs(e.position.x-Z.player.position.x)+Math.abs(e.position.z-Z.player.position.z)<=1);if(n===void 0||n.hp<=0||n.hostile||n.unconsciousTurns>0){Xm(n?.hp===0?`${n.name} is dead. Trade is closed.`:`No willing trader is within reach.`,`danger`);return}om(!1),X(`#barter-trader`).textContent=`${n.name} // TRADE`,X(`#barter-stock-label`).textContent=`${n.name}'S STOCK`,X(`#barter-caps`).textContent=`${Z.player.caps} CAPS`,X(`#barter-copy`).textContent=`${n.name} // SPEECH ${Z.player.skills.speech} adjusts every price. Purchases go directly to your pack.`;let r=X(`#barter-status`);r.textContent=e.toUpperCase(),r.dataset.tone=t;let i=X(`#barter-buy-list`),a=X(`#barter-sell-list`);i.replaceChildren(),a.replaceChildren();for(let e of Mp){let t=Dt(Z,e.id);$(i,e.title,`${e.copy} · stock ${Z.merchant.stock[e.id]}`,`${t} ¢`,{label:`BUY`,enabled:!0,directTap:!0,run:()=>{let t=kt(Z,e.id),n=t.events.find(e=>e.type===`message`);rh(t),bh(n?.text??`Trade unchanged.`,n?.tone??`neutral`)}})}$(a,`TRADE SCRAP`,`Sell one crafting scrap`,Z.player.scrap.toString(),{label:`SELL +${Ot(Z,`scrap`)}¢`,enabled:!0,directTap:!0,run:()=>{let e=At(Z,`scrap`),t=e.events.find(e=>e.type===`message`);rh(e),bh(t?.text??`Trade unchanged.`,t?.tone??`neutral`)}}),$(a,`FIELD DRESSING`,`Sell one medkit`,Z.player.medkits.toString(),{label:`SELL +${Ot(Z,`medkit`)}¢`,enabled:!0,directTap:!0,run:()=>{let e=At(Z,`medkit`),t=e.events.find(e=>e.type===`message`);rh(e),bh(t?.text??`Trade unchanged.`,t?.tone??`neutral`)}}),Zp.classList.remove(`hidden`)}function xh(e){let t=[{x:0,z:-1},{x:1,z:0},{x:0,z:1},{x:-1,z:0}][Z.player.direction];return Z.player.position.x+t.x===e.x&&Z.player.position.z+t.z===e.z}function Sh(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.textContent=e,r.disabled=!t,r.addEventListener(`click`,n),r}function Ch(e){if(!ih())return;let t=X(`#interaction-kind`),n=X(`#interaction-title`),r=X(`#interaction-copy`),i=X(`#interaction-actions`);if(i.replaceChildren(),i.append(Sh(`CLOSE`,!0,()=>om(!1))),e.type===`enemy`){let a=Z.enemies.find(t=>t.id===e.id);if(a===void 0)return;t.textContent=a.hp<=0?`CARCASS`:(a.unconsciousTurns??0)>0?`UNCONSCIOUS`:`HOSTILE`,n.textContent=`LEVEL ${a.level} ${Tp[a.kind]}`,r.textContent=`${Ep[a.kind]} Condition: ${a.hp}/${a.maxHp}. Reward: ${ce(a)} XP.`;let o=Math.abs(a.position.x-Z.player.position.x)+Math.abs(a.position.z-Z.player.position.z),s=a.hp>0&&Bt(Z)?.entity.id===a.id&&Z.player.magazine>0&&Z.player.weaponCondition>0,c=a.hp>0&&o===1&&xh(a.position);i.prepend(Sh(s?`SHOOT`:Z.player.magazine<=0?`EMPTY`:`NO CLEAR SHOT`,s,()=>{om(!1),sh(`fire`)}),Sh(`PUNCH`,c,()=>{om(!1),sh(`punch`)}))}else if(e.type===`pickup`){let a=Z.pickups.find(t=>t.id===e.id&&!t.collected);if(a===void 0)return;let o=Dp[a.kind],s=Math.abs(a.position.x-Z.player.position.x)+Math.abs(a.position.z-Z.player.position.z);t.textContent=`SCAVENGE`,n.textContent=o.title,r.textContent=`${o.copy}${s>1?` Move closer to take it.`:``}`,i.prepend(Sh(`TAKE`,s<=1,()=>{ih()&&(om(!1),oh().then(()=>rh(ht(Z,a.id))))}))}else{let a=e.type!==`prospector`&&xh(e.position);if(e.type===`landmark`){let a=Z.landmarks.find(t=>t.id===e.id);if(a===void 0)return;let o=Math.abs(a.position.x-Z.player.position.x)+Math.abs(a.position.z-Z.player.position.z),s={oasis:`A spring-fed pool ringed by reeds and desert palms. Its water can refill your canteens.`,bridge:`A repaired timber span carrying Old 95 over the flooded Red Cut wash.`,wreck:a.used?`A broken pre-war vehicle already stripped to its frame.`:`A broken pre-war vehicle with salvage still under the rust.`,settlement:`A guarded Mojave stop with canvas shelters, firelight, pack animals and trade.`,campfire:`A tended settlement fire. Warmth here can dry clothes and ease fatigue.`,teepee:`A hide-and-canvas lodge offering shelter from the wind.`,vista:a.used?`A surveyed overlook above the valley road.`:`A high overlook with sightlines across the route and distant passes.`},c={oasis:`DRINK / FILL`,bridge:`INSPECT`,wreck:a.used?`STRIPPED`:`SALVAGE`,settlement:`VISIT`,campfire:`WARM UP`,teepee:`SHELTER`,vista:a.used?`VIEW`:`SURVEY`};t.textContent=a.kind.toUpperCase(),n.textContent=a.name,r.textContent=`${s[a.kind]}${o>1?` Move closer to use it.`:``}`,i.prepend(Sh(c[a.kind],o<=1&&!(a.kind===`wreck`&&a.used),()=>{om(!1),rh(et(Z,a.id))}))}else if(e.type===`device`){let o=Z.devices.find(t=>t.id===e.id);if(o===void 0)return;t.textContent=o.kind===`terminal`?`COMPUTER`:o.kind.includes(`door`)?`PASSAGE`:`CONTAINER`,n.textContent=Np[o.kind],o.kind===`terminal`?(r.textContent=o.hacked?`Root access remains active. The security bulkhead has been released.`:`A municipal maintenance terminal. ${o.attemptsRemaining} login attempts remain.`,i.prepend(Sh(`ACCESS`,a,()=>{om(!1),sh(`interact`)}))):o.kind===`locker`?(r.textContent=o.opened?`The doors hang open. Nothing useful remains.`:`A pre-war utility locker with a five-position cylinder. ${Z.player.inventory.lockpick} picks available.`,i.prepend(Sh(o.opened?`EMPTY`:`PICK LOCK`,a&&!o.opened,()=>{om(!1),sh(`interact`)}))):o.kind===`locked_door`?(r.textContent=o.locked?Z.player.hasRelayKey?`The Dry Wells access card matches the relay-bunker reader.`:`A corroded entry lock bars the relay bunker. ${Z.player.inventory.lockpick} picks available.`:`The mechanical lock has released.`,i.prepend(Sh(o.locked?Z.player.hasRelayKey?`USE KEYCARD`:`PICK LOCK`:`OPEN`,a,()=>{om(!1),sh(`interact`)}))):(r.textContent=o.locked?`A powered security bulkhead. The nearby maintenance terminal controls its seal.`:`The terminal has released the security seal.`,i.prepend(Sh(o.locked?`TERMINAL REQUIRED`:`OPEN`,a&&!o.locked,()=>{om(!1),sh(`interact`)})))}else if(e.type===`prospector`){let a=Z.npcs.find(t=>t.id===e.id);if(a===void 0)return;let o=xh(a.position),s=a.hp>0,c=s&&a.unconsciousTurns<=0,l=c&&!a.hostile;t.textContent=s?c?a.hostile?`HOSTILE`:a.species===`brahmin`?`PACK BRAHMIN`:a.role.toUpperCase():`UNCONSCIOUS`:`DEAD`,n.textContent=a.name,r.textContent=s?c?a.hostile?`${a.name} has ${a.hp}/${a.maxHp} health and keeps a weapon trained on you.`:a.species===`brahmin`?o?`${a.name} watches you with two patient heads.`:`${a.name} shifts beneath a trader's pack yoke.`:o?`${a.name} watches your hands and waits for you to speak.`:`${a.name} is too far away to hear you over the wind.`:`${a.name} is unconscious for approximately ${a.unconsciousTurns} more turns.`:`${a.name} lies still. Their conversations and knowledge are gone.`;let u=s&&Bt(Z)?.entity.id===a.id,d=[Sh(a.species===`brahmin`?`APPROACH`:`TALK`,o&&l,()=>{om(!1),sh(`interact`)}),Sh(`PUNCH`,o&&s,()=>{om(!1),sh(`punch`)}),Sh(`SHOOT`,u&&Z.player.magazine>0&&Z.player.weaponCondition>0,()=>{om(!1),sh(`fire`)})];a.role===`trader`&&d.splice(1,0,Sh(`BARTER`,o&&l,()=>bh())),i.prepend(...d)}else if(e.type===`camp`)t.textContent=`BASE SITE`,n.textContent=Z.campBuilt?`CINDER LEAN-TO`:`MARKED CAMP SITE`,r.textContent=Z.campBuilt?`Shelter, a small still, and a workbench assembled from salvage.`:`Flat ground marked by the prospectors. Six scrap will raise a lean-to.`,i.prepend(Sh(Z.campBuilt?`CRAFT`:`BUILD`,a,()=>{om(!1),sh(`interact`)}));else if(e.type===`transition`){let o=Z.transitions.find(t=>t.id===e.id);if(o===void 0)return;let s=o.destinationEnvironment===`interior`;t.textContent=s?`LOCATION`:`WASTELAND EXIT`,n.textContent=o.name,r.textContent=a?s?`Walk forward through the threshold. The site remains part of this persistent expedition.`:`Walk forward through the threshold to return to the open wasteland.`:`Move directly in front of the marked threshold.`,i.prepend(Sh(s?`ENTER`:`LEAVE`,a,()=>{om(!1),sh(`interact`)}))}else t.textContent=`PASSAGE`,n.textContent=`CHAINED SCRAP GATE`,r.textContent=a?`The latch can be forced by hand.`:`Move in front of the gate to reach its latch.`,i.prepend(Sh(`OPEN`,a,()=>{om(!1),sh(`interact`)}))}om(!0)}var wh;Vp.addEventListener(`pointerdown`,e=>{!ih()||!e.isPrimary||(wh={id:e.pointerId,x:e.clientX,y:e.clientY,travel:0},Vp.setPointerCapture(e.pointerId),e.preventDefault())}),Vp.addEventListener(`pointermove`,e=>{if(wh===void 0||wh.id!==e.pointerId)return;let t=e.clientY-wh.y,n=e.clientX-wh.x;wh.travel+=Math.abs(t)+Math.abs(n),wh.x=e.clientX,wh.y=e.clientY,um.lookHorizontal(n),um.lookVertical(t),e.preventDefault()}),Vp.addEventListener(`pointerup`,e=>{if(wh===void 0||wh.id!==e.pointerId)return;let t=wh.travel<9;if(wh=void 0,Vp.hasPointerCapture(e.pointerId)&&Vp.releasePointerCapture(e.pointerId),t){let t=um.pick(e.clientX,e.clientY);t===void 0?om(!1):Ch(t)}e.preventDefault()}),Vp.addEventListener(`pointercancel`,()=>{wh=void 0});function Th(e){Z=e,um.syncState(Z,!1),Hp.classList.add(`hidden`),Up.classList.add(`hidden`),Gp.classList.add(`hidden`),Kp.classList.add(`hidden`),qp.classList.add(`hidden`),Jp.classList.add(`hidden`),Yp.classList.add(`hidden`),Xp.classList.add(`hidden`),Zp.classList.add(`hidden`),om(!1),dm=!0,fm=!1,Ym(),Xm(Z.turn===0?`${Z.player.identity.name.toUpperCase()} // ${Z.worldCode}: generated waste ready. Find the prospectors.`:`${Z.player.identity.name.toUpperCase()} // ${Z.worldCode}: trail journal restored.`,Z.turn===0?`warning`:`good`),Z.dialogueFlags.includes(`field_relief_062`)&&(Z.dialogueFlags=Z.dialogueFlags.filter(e=>e!==`field_relief_062`),Xm(`Caravan relief cache: patched wounds, extra rounds, and one field dressing.`,`good`)),Z.dialogueFlags.includes(`expedition_09_migrated`)&&(Z.dialogueFlags=Z.dialogueFlags.filter(e=>e!==`expedition_09_migrated`),Xm(`Trail journal migrated: your character and supplies now continue in the expanded wasteland.`,`good`)),Z.dialogueFlags.includes(`nightfall_010_migrated`)&&(Z.dialogueFlags=Z.dialogueFlags.filter(e=>e!==`nightfall_010_migrated`),Xm(`Nightfall kit issued: Stimpak, Nuka-Cola, antivenom, antibiotics, torch, road leathers, and full save migration.`,`good`)),Z.dialogueFlags.includes(`lighting_0101_migrated`)&&(Z.dialogueFlags=Z.dialogueFlags.filter(e=>e!==`lighting_0101_migrated`),Xm(`Visibility rebalanced: slower clock and weather, brighter darkness, and a spare torch issued. Use LIGHT on the weapon panel.`,`good`)),Z.dialogueFlags.includes(`character_011_migrated`)&&(Z.dialogueFlags=Z.dialogueFlags.filter(e=>e!==`character_011_migrated`),Xm(`Character record migrated for ${Z.player.identity.name.toUpperCase()}: balanced S.P.E.C.I.A.L. assigned and ${Z.player.perkPoints} perk point${Z.player.perkPoints===1?``:`s`} available.`,`good`)),Z.dialogueFlags.includes(`living_mojave_013_migrated`)&&(Z.dialogueFlags=Z.dialogueFlags.filter(e=>e!==`living_mojave_013_migrated`),Xm(`The Mojave trail has shifted: open desert, raised ground, flooded washes, cacti, and harvestable plants are now charted. Your character and pack were preserved.`,`good`)),Z.dialogueFlags.includes(`open_horizons_014_migrated`)&&(Z.dialogueFlags=Z.dialogueFlags.filter(e=>e!==`open_horizons_014_migrated`),Xm(`The expedition has been resurveyed: open horizons, stronger relief, seamless thresholds, new survivors, and a full quest journal are now active. Your character, pack, and quest record were preserved.`,`good`)),Z.dialogueFlags.includes(`living_wasteland_015_migrated`)&&(Z.dialogueFlags=Z.dialogueFlags.filter(e=>e!==`living_wasteland_015_migrated`),Xm(`Living Wasteland survey complete: mountain ranges, Red Cut valley, Glasswater Oasis, Old 95 Span, settlements, traders, wanderers and Brahmin are now active. Your character and supplies were preserved.`,`good`));let t=xe(Z,Z.player.position);Xm(`${t.name}: encounter level ${t.level}. Higher-risk zones carry better rewards.`,`neutral`),nh(),Wm(),oh(),Z.status!==`playing`&&window.setTimeout(()=>eh(Z.status),150)}function Eh(e){!dm||Z.status!==`playing`||(fm=e??!fm,Wp.classList.toggle(`hidden`,!fm))}im.addEventListener(`pointerdown`,e=>{e.preventDefault(),ih()&&(oh(),rh(St(Z)))});for(let e of document.querySelectorAll(`[data-action]`))e.addEventListener(`pointerdown`,t=>{t.preventDefault();let n=e.dataset.action;n!==void 0&&sh(n)});var Dh={KeyW:`move_forward`,ArrowUp:`move_forward`,KeyS:`move_backward`,ArrowDown:`move_backward`,KeyA:`turn_left`,ArrowLeft:`turn_left`,KeyD:`turn_right`,ArrowRight:`turn_right`,Space:`fire`,KeyE:`interact`,KeyR:`reload`,KeyH:`use_medkit`,KeyF:`punch`,Period:`wait`};window.addEventListener(`keydown`,e=>{if(e.code===`Backquote`){e.preventDefault(),Jp.classList.contains(`hidden`)?Up.classList.contains(`hidden`)&&Gp.classList.contains(`hidden`)&&Kp.classList.contains(`hidden`)&&qp.classList.contains(`hidden`)&&Yp.classList.contains(`hidden`)&&Xp.classList.contains(`hidden`)&&Zp.classList.contains(`hidden`)&&Qp.classList.contains(`hidden`)&&gh():Jp.classList.add(`hidden`);return}if(e.code===`KeyM`&&Up.classList.contains(`hidden`)&&qp.classList.contains(`hidden`)&&Jp.classList.contains(`hidden`)){e.preventDefault(),_h(`map`);return}if(e.code===`KeyI`&&Up.classList.contains(`hidden`)&&qp.classList.contains(`hidden`)&&Jp.classList.contains(`hidden`)){e.preventDefault(),_h(`inventory`);return}if(e.code===`Escape`){Up.classList.contains(`hidden`)?Gp.classList.contains(`hidden`)?Kp.classList.contains(`hidden`)?qp.classList.contains(`hidden`)?Jp.classList.contains(`hidden`)?Yp.classList.contains(`hidden`)?Xp.classList.contains(`hidden`)?Zp.classList.contains(`hidden`)?$p.classList.contains(`hidden`)?Eh():om(!1):Zp.classList.add(`hidden`):Xp.classList.add(`hidden`):Yp.classList.add(`hidden`):Jp.classList.add(`hidden`):qp.classList.add(`hidden`):Kp.classList.add(`hidden`):Gp.classList.add(`hidden`):Pm();return}let t=e.shiftKey&&e.code===`KeyA`?`strafe_left`:e.shiftKey&&e.code===`KeyD`?`strafe_right`:Dh[e.code];t!==void 0&&(e.preventDefault(),sh(t))}),X(`#continue-button`).disabled=lm===void 0,X(`#continue-button`).addEventListener(`click`,()=>{lm!==void 0&&Th(lm)}),X(`#new-game-button`).addEventListener(`click`,()=>Nm());for(let e of document.querySelectorAll(`[data-creator-tab]`))e.addEventListener(`click`,()=>{let t=e.dataset.creatorTab;(t===`identity`||t===`special`||t===`skills`||t===`perk`)&&(vm=t,Mm())});X(`#creator-reset`).addEventListener(`click`,()=>{Q=gm(),vm=`identity`,Mm()}),X(`#creator-cancel`).addEventListener(`click`,Pm),X(`#creator-begin`).addEventListener(`click`,()=>{if(!Cm()||Q.startingPerk===void 0)return;let e={identity:{...Q.identity},special:{...Q.special},skills:{...Q.skills},startingPerk:Q.startingPerk};Jm(_m,e)}),X(`#menu-button`).addEventListener(`click`,()=>Eh()),X(`#resume-button`).addEventListener(`click`,()=>Eh(!1)),X(`#pack-button`).addEventListener(`click`,()=>_h(`inventory`)),X(`#open-pip-button`).addEventListener(`click`,()=>_h(`inventory`)),X(`#save-load-button`).addEventListener(`click`,()=>_h(`data`)),X(`#cheat-button`).addEventListener(`click`,gh);for(let e of document.querySelectorAll(`[data-pip-tab]`))e.addEventListener(`click`,()=>{let t=e.dataset.pipTab;(t===`map`||t===`journal`||t===`inventory`||t===`skills`||t===`perks`||t===`data`)&&_h(t)});X(`#pip-close`).addEventListener(`click`,()=>qp.classList.add(`hidden`));for(let e of document.querySelectorAll(`[data-cheat-action]`))e.addEventListener(`click`,()=>{let t=e.dataset.cheatAction;t!==void 0&&(rh(Rt(Z,t)),hh())});X(`#cheat-close`).addEventListener(`click`,()=>Jp.classList.add(`hidden`)),X(`#lockpick-close`).addEventListener(`click`,()=>{Yp.classList.add(`hidden`)}),X(`#device-close`).addEventListener(`click`,()=>{Xp.classList.add(`hidden`)}),Ip(X(`#barter-close`),()=>Zp.classList.add(`hidden`)),X(`#craft-close`).addEventListener(`click`,()=>Kp.classList.add(`hidden`)),X(`#end-restart`).addEventListener(`click`,()=>Nm()),X(`#restart-button`).addEventListener(`click`,()=>{window.confirm(`Erase this descent and begin again?`)&&Nm()}),X(`#audio-button`).addEventListener(`click`,async()=>{await oh(),am.setMuted(!am.isMuted()),ah()}),X(`#music-button`).addEventListener(`click`,async()=>{let e=am.isReady();await oh(),am.setMusicEnabled(!e||!am.isMusicEnabled()),ah()}),X(`#fullscreen-button`).addEventListener(`click`,()=>{document.fullscreenElement===null?document.documentElement.requestFullscreen?.():document.exitFullscreen?.()}),X(`#reset-view-button`).addEventListener(`click`,()=>{Bp(),Eh(!1),Xm(`Screen scale restored. Pinch zoom is locked during play.`,`good`)}),X(`#install-button`).addEventListener(`click`,async()=>{Fm===void 0?(Xm(`On iPhone: Share → Add to Home Screen.`,`good`),Eh(!1)):(await Fm.prompt(),await Fm.userChoice,Fm=void 0)});function Oh(e){let t=e.target;t instanceof Element&&t.closest(`#music-button`)!==null||am.isReady()||oh()}var kh=!1;function Ah(e){let t=kh||e.touches.length>1;kh=e.touches.length>1,t&&(e.cancelable&&e.preventDefault(),e.stopPropagation(),zp(),e.touches.length<=1&&Bp())}function jh(e){e.cancelable&&e.preventDefault(),e.stopPropagation(),zp(),e.type===`gestureend`&&Bp()}document.addEventListener(`pointerdown`,Oh,{capture:!0,passive:!0}),document.addEventListener(`keydown`,Oh,{capture:!0}),document.addEventListener(`contextmenu`,e=>e.preventDefault()),window.addEventListener(`touchstart`,Ah,{capture:!0,passive:!1}),window.addEventListener(`touchmove`,Ah,{capture:!0,passive:!1}),window.addEventListener(`touchend`,Ah,{capture:!0,passive:!1}),window.addEventListener(`touchcancel`,Ah,{capture:!0,passive:!1}),window.addEventListener(`gesturestart`,jh,{capture:!0,passive:!1}),window.addEventListener(`gesturechange`,jh,{capture:!0,passive:!1}),window.addEventListener(`gestureend`,jh,{capture:!0,passive:!1}),window.visualViewport?.addEventListener(`resize`,zp),window.visualViewport?.addEventListener(`scroll`,zp),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`)}),nh();