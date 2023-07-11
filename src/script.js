var vueapp = new Vue({
    el: "#vueContainer",
    data: {
        filename: "save",
        filemodal: true,
        errorPrint: "",
        graph: false,
        pg :{
            name: "Error",
            class: "caricamento dei dati",
            level: 0,
            race: "Type: ",
            alignment: "",
            hp: 51,
            maxHP: 51,
            stats: {
                str: 7,
                dex: 12,
                con: 16,
                int: 9,
                wis: 18,
                cha: 12,
            },
            ca: 14,
            init: 1,
            vel: 9,
            dadi_vita: "6d8",
            ts_morte: {successi: 1, fallimenti: 3},
            compBonus: 3,
            languages: ["Common", "Elvish"],
            other_comps: ["Armors", "Shields"],
            inventory: ["Dagger", "Book 'la Forma delle Cose'", "Pippo", "Pippo"],
            wallet: [{label: "MR", value: 100},{label: "MA", value: 100},{label: "ME", value: 100},{label: "MO", value: 100},{label: "MP", value: 100}], 
            attack_bonus: [
                {name: "Stocco", bonus: 4, danni: "1d8+1", tipo: "perforanti"},
                {name: "Pugnale", bonus: 4, danni: "1d8+1", tipo: "perforanti"},
                {name: "Incantesimo", bonus: 7, danni: "CD: 15", tipo: "Sag"},
            ],
            priv_tratti: [
                "Incanalare divinità",
            ],
            PTL: [
                {
                    name : "Incanalare Divinità",
                    max_uses: 3,
                    current_uses: 0,
                    charges: "RL"
                }
            ], 
            ts: ["cha", "wis"],
            skills: ["Arcano", "Indagare", "Arcano"],
            spells: ["Fiamma Sacra", "Luci Danzanti", "Guida", "Salvare i Morenti", "Anatema","Comando", "Sentenza della λ Inquisizione"],
            slots: [4,3,3,0,0,0,0,0,0],
            used_slots: [2,1,0,0,0,0,0,0,0]
        },
        ts: [
            {id: "str", label: "Forza", value: 0},
            {id: "dex", label: "Destrezza", value: 0},
            {id: "con", label: "Costituzione", value: 0},
            {id: "int", label: "Intelligenza", value: 0},
            {id: "wis", label: "Saggezza", value: 0},
            {id: "cha", label: "Carisma", value: 0},
        ],
        skills:[
            {stat: "dex", label: "Acrobazia", comp: 0},
            {stat: "wis", label: "Addestrare Animali", comp: 0},
            {stat: "int", label: "Arcano", comp: 0},
            {stat: "str", label: "Atletica", comp: 0},
            {stat: "dex", label: "Furtività", comp: 0},
            {stat: "int", label: "Indagare", comp: 0},
            {stat: "cha", label: "Inganno", comp: 0},
            {stat: "cha", label: "Intimidire", comp: 0},
            {stat: "cha", label: "Intrattenere", comp: 0},
            {stat: "wis", label: "Intuizione", comp: 0},
            {stat: "wis", label: "Medicina", comp: 0},
            {stat: "int", label: "Natura", comp: 0},
            {stat: "wis", label: "Percezione", comp: 0},
            {stat: "cha", label: "Persuasione", comp: 0},
            {stat: "dex", label: "Rapidità di Mano", comp: 0},
            {stat: "int", label: "Religione", comp: 0},
            {stat: "wis", label: "Sopravivenza", comp: 0},
            {stat: "int", label: "Storia", comp: 0},
        ],
        selected_ts: "",
        selected_skill: "",
        stats:[],
        statsPrint: [],
        visible: 0,
        stats_style: "on",
        spells_style: "off",
        selected_spell: 1,
        showSpellDescription: false,
        spells_print: [],
        showPTLDescription: false,
        selected_ptl: 0,
    },
    mounted(){
    },
    methods: {
        parseStats(){
            this.statsPrint = [];
            this.statsPrint.push({label: "Forza", value: this.pg.stats.str});
            this.statsPrint.push({label: "Destrezza", value: this.pg.stats.dex});
            this.statsPrint.push({label: "Costituzione", value: this.pg.stats.con});
            this.statsPrint.push({label: "Intelligenza", value: this.pg.stats.int});
            this.statsPrint.push({label: "Saggezza", value: this.pg.stats.wis});
            this.statsPrint.push({label: "Carisma", value: this.pg.stats.cha});
            
            this.stats = [];
            this.stats.push({label: "CON", value: this.pg.stats.con*5});
            this.stats.push({label: "DEX", value: this.pg.stats.dex*5});
            this.stats.push({label: "WIS", value: this.pg.stats.wis*5});
            this.stats.push({label: "CHA", value: this.pg.stats.cha*5});
            this.stats.push({label: "INT", value: this.pg.stats.int*5});
            this.stats.push({label: "STR", value: this.pg.stats.str*5});
        },
        ToSpells(){
            this.visible = 1;
            this.stats_style="off";
            this.spells_style="on";
        },
        ToStats(){
            this.visible = 0;
            this.stats_style="on";
            this.spells_style="off";
        },
        modifier(stat){
            return Math.floor((stat-10)/2)>0?"+"+Math.floor((stat-10)/2):Math.floor((stat-10)/2);
        },
        removeFromArray(name, array){
            /*console.log(name);*/
            var arr2 = [];
            for (var i=0; i<array.length; i++){
                if (array[i]!=name){
                    arr2.push(array[i])
                }else{
                    name=null;
                }
            }
            return arr2;
        },
        select_skill(name){
            var mod = 0;
            var i=0;
            for(i=0; i<this.skills.length;i++){
                if(this.skills[i].label==name){
                    switch (this.skills[i].stat){
                        case "str":
                            mod = Math.floor((this.pg.stats.str-10)/2);
                            break;
                        case "dex":
                            mod = Math.floor((this.pg.stats.dex-10)/2);
                            break;
                        case "con":
                            mod = Math.floor((this.pg.stats.con-10)/2);
                            break;
                        case "int":
                            mod = Math.floor((this.pg.stats.int-10)/2);
                            break; 
                        case "wis":
                            mod = Math.floor((this.pg.stats.wis-10)/2);
                            break;
                        case "cha":
                            mod = Math.floor((this.pg.stats.cha-10)/2);
                            break;
                        default:
                            mod = 0;     
                            console.log("ahia");

                        }
                        
                    return {value: (this.skills[i].comp*this.pg.compBonus)+mod, image: this.skills[i].comp};
                }
            }
            return {value: "", image: -10};
        },
        select_ts(name){
            var mod = 0;
            var i=0;
            for(i=0; i<this.ts.length;i++){
                if(this.ts[i].label==name){
                    switch (this.ts[i].id){
                        case "str":
                            mod = Math.floor((this.pg.stats.str-10)/2);
                            break;
                        case "dex":
                            mod = Math.floor((this.pg.stats.dex-10)/2);
                            break;
                        case "con":
                            mod = Math.floor((this.pg.stats.con-10)/2);
                            break;
                        case "int":
                            mod = Math.floor((this.pg.stats.int-10)/2);
                            break; 
                        case "wis":
                            mod = Math.floor((this.pg.stats.wis-10)/2);
                            break;
                        case "cha":
                            mod = Math.floor((this.pg.stats.cha-10)/2);
                            break;
                        default:
                            mod = 0;     
                            /*console.log("ahia");*/

                        }
                        /*console.log((this.ts[i].value*this.pg.compBonus)+mod);*/
                    return {value: (this.ts[i].value*this.pg.compBonus)+mod, image: this.ts[i].value};
                }
            }
            return {value: "", image: -10};
        },
        showInfo(index){
            this.showSpellDescription = true;
            this.selected_spell = index;
        },
        showInfoPTL(index){
            this.showPTLDescription = true;
            this.selected_PTL = index;
        },
        buttonStyle(slot, num){
            if (num < slot){
                return "slotsButtonToggled";
            }else{
                return "slotsButton";
            }
        },
        loadTS(){
            for(var i=0; i<this.ts.length; i++){
                if(this.pg.ts.includes(this.ts[i].id)){
                    this.ts[i].value=1;
                }else{
                    this.ts[i].value=0;
                }
            }
        },
        loadSkills(){
            for(var j=0; j<this.skills.length; j++){
                this.skills[j].comp=0;
            }
            for(var i=0; i<this.pg.skills.length; i++){
                for(var j=0; j<this.skills.length; j++){
                    if(this.pg.skills[i]==this.skills[j].label){
                        this.skills[j].comp++;
                        //console.log("loads");
                        break;
                    }
                }
            }
        },
        loadSpells(){
            fetch("spells.JSON")
                .then((response) => response.json())
                    .then((json) => this.parseSpells(json));
        },
        parseSpells(json){
            vueapp.spells_print = [];
            for(var spell of json){
                if(vueapp.pg.spells.includes(spell.name)){
                    vueapp.spells_print.push(spell);
                    //console.log(spell.name)
                }
            }
        },
        loadData(){
                fetch("../saves/"+this.filename+'.json')
                    .then((response) => response.json()
                        .then((json) => this.parseData(json)))
                .catch ((error) => {
                console.log(error);
                app.errorPrint=error;
                return;
            });
        },
        parseData(json){
            vueapp.pg=json;
            this.filemodal = false;
            this.parseStats();
            this.loadTS();
            this.loadSkills();
            this.loadSpells();
        }
    }
});

// Modal Component
Vue.component("modal", {
    template: "#modal-template"
  });


// A resusable polygon graph component
Vue.component("polygraph", {
    props: ["stats"],
    template: "#polygraph-template",
    computed: {
      // a computed property for the polygon's points
      points: function() {
        var total = this.stats.length;
        return this.stats
          .map(function(stat, i) {
            var point = valueToPoint(stat.value, i, total);
            return point.x + "," + point.y;
          })
          .join(" ");
      }
    },
    components: {
      // a sub component for the labels
      "axis-label": {
        props: {
          stat: Object,
          index: Number,
          total: Number
        },
        template: "#axis-label-template",
        computed: {
          point: function() {
            return valueToPoint(
              110,
              this.index,
              this.total
            );
          }
        }
      }
    }
  });

  // math helper...
  function valueToPoint(value, index, total) {
    var x = 0;
    var y = -value * 1.6;
    var angle = ((Math.PI * 2) / total) * index;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var tx = x * cos - y * sin + 200;
    var ty = x * sin + y * cos + 200;
    return {
      x: tx,
      y: ty
    };
  }