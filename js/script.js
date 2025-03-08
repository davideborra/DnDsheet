var debug  = false;
var vueapp = new Vue({
    el: "#vueContainer",
    data: {
        loading : true,
        filepath : "",
        filename: "save.json",
        errorPrint: "",
        hideInventory: true,
        showSpellsSettings : false,
        allSpells: [],
        spellToAdd: "",
        spellToRemove : "",
        pg: {
            name: "Loading Error",
            class: "Loading Error",
            level: 0,
            race: "",
            alignment: "",
            hp: 42,
            maxHP: 42,
            stats: {
                str: 10,
                dex: 10,
                con: 10,
                int: 10,
                wis: 10,
                cha: 10,
            },
            castingStat: "int",
            ca: 15,
            init: 0,
            vel: 9,
            dadi_vita: "6d8",
            ts_morte: {successi: 0, fallimenti: 0},
            compBonus: 2,
            ispirazione: 0,
            affaticamento : 0,
            talenti: [],
            attuned: [],
            languages: ["Common", "Elvish"],
            other_comps: ["Armors", "Shields"],
            inventory: ["Dagger", "Book 'la Forma delle Cose'", "Pippo", "Pippo"],
            wallet: [{label: "CP", value: 0},{label: "SP", value: 0},{label: "EP", value: 0},{label: "GP", value: 0},{label: "PP", value: 0}], 
            attack_bonus: [
                {name: "Stocco", bonus: 4, danni: "1d8+1", tipo: "perforanti"},
                {name: "Pugnale", bonus: 4, danni: "1d8+1", tipo: "perforanti"},
                {name: "Incantesimo", bonus: 7, danni: "CD: 15", tipo: "Sag"},
            ],
            priv_tratti: [],
            PTL: [
                {
                    name : "",
                    max_uses: 0,
                    current_uses: 0,
                    charges: [""]
                }
            ], 
            // ts: ["", ""],
            // skills: ["Arcano", "Indagare", "Arcano"],
            spells: [{name: "Fiamma Sacra", prepared : false}],
            slots: [
                { level: 0, max: 0, used: 0, known :0},
                { level: 1, max: 0, used: 0, known :0},
                { level: 2, max: 0, used: 0, known :0},
                { level: 3, max: 0, used: 0, known :0},
                { level: 4, max: 0, used: 0, known :0},
                { level: 5, max: 0, used: 0, known :0},
                { level: 5, max: 0, used: 0, known :0},
                { level: 7, max: 0, used: 0, known :0},
                { level: 8, max: 0, used: 0, known :0},
                { level: 9, max: 0, used: 0, known :0}
            ],
            ts: [
                {id: "str", value: 0},
                {id: "dex",  value: 0},
                {id: "con", value: 0},
                {id: "int", value: 0},
                {id: "wis", value: 0},
                {id: "cha", value: 0},
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
                {stat: "wis", label: "Sopravvivenza", comp: 0},
                {stat: "int", label: "Storia", comp: 0},
                {stat: "wis", label: "Orecchio", comp: 0},
            ],
        },
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
        selected_PT: 0,
        showPTDescription: false,
        selected_PTL: 0,
        deltaHP: 0,
        modifyHP: false,
    },
    mounted(){
        if(debug){
            this.loading = false;
            fetch("saves/debug.json")
                    .then((response) => response.json()
                        .then((json) => this.parseData(json)))
                .catch ((error) => {
                console.log(error);
                vueapp.errorPrint=error;
                return;
            });
        }
    },
    methods: {
        // parseStats(){
        //     this.statsPrint = [];
        //     this.statsPrint.push({label: "Forza", value: this.pg.stats.str});
        //     this.statsPrint.push({label: "Destrezza", value: this.pg.stats.dex});
        //     this.statsPrint.push({label: "Costituzione", value: this.pg.stats.con});
        //     this.statsPrint.push({label: "Intelligenza", value: this.pg.stats.int});
        //     this.statsPrint.push({label: "Saggezza", value: this.pg.stats.wis});
        //     this.statsPrint.push({label: "Carisma", value: this.pg.stats.cha});
            
        //     // this.stats = [];
        //     // this.stats.push({label: "CON", value: this.pg.stats.con*5});
        //     // this.stats.push({label: "DEX", value: this.pg.stats.dex*5});
        //     // this.stats.push({label: "WIS", value: this.pg.stats.wis*5});
        //     // this.stats.push({label: "CHA", value: this.pg.stats.cha*5});
        //     // this.stats.push({label: "INT", value: this.pg.stats.int*5});
        //     // this.stats.push({label: "STR", value: this.pg.stats.str*5});
        // },
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
        nozero(string){
            if (string == 0)
                return "";
            return string;
        },
        tsModifier(){
            return this.select_ts(this.selected_ts).value==-100?'':(this.select_ts(this.selected_ts).value>0?"+"+this.select_ts(this.selected_ts).value:this.select_ts(this.selected_ts).value);M
        },
        skillModifier(){
            return this.select_skill(this.selected_skill).value==-100?'':(this.select_skill(this.selected_skill).value>0?"+"+this.select_skill(this.selected_skill).value:this.select_skill(this.selected_skill).value);
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
            for(i=0; i<this.pg.skills.length;i++){
                if(this.pg.skills[i].label==name){
                    switch (this.pg.skills[i].stat){
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
                            console.log("ahia-modificatori");

                        }
                        
                    return {value: (this.pg.skills[i].comp*this.pg.compBonus)+mod, image: this.pg.skills[i].comp};
                }
            }
            return {value: "", image: -10};
        },
        stat_name(id){
            switch (id){
                case "str":
                    return "Strength";
                    break;
                case "dex":
                    return "Dexterity";
                    break;
                case "con":
                    return "Constitution";
                    break;
                case "int":
                    return "Intelligence";
                    break; 
                case "wis":
                    return "Wisdom";
                    break;
                case "cha":
                    return "Charisma";
                    break;
                default:
                    console.log("ahia-nomi "+id);
                }
        },
        select_ts(name){
            var mod = 0;
            var i=0;
            for(i=0; i<this.pg.ts.length;i++){
                if(this.stat_name(this.pg.ts[i].id)==name){
                    switch (this.pg.ts[i].id){
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
                        /*console.log((this.pg.ts[i].value*this.pg.compBonus)+mod);*/
                    return {value: (this.pg.ts[i].value*this.pg.compBonus)+mod, image: this.pg.ts[i].value};
                }
            }
            return {value: "", image: -100};
        },
        showInfo(index){
            this.showSpellDescription = true;
            this.selected_spell = index;
        },
        showInfoPTL(index){
            this.showPTLDescription = true;
            this.selected_PTL = index;
        },
        showInfoPT(index){
            this.showPTDescription = true;
            this.selected_PT = index;
        },
        // buttonStyle(slot, num){
        //     if (num < slot){
        //         return "slotsButtonToggled";
        //     }else{
        //         return "slotsButton";
        //     }
        // },
        // loadTS(){
        //     for(var i=0; i<this.pg.ts.length; i++){
        //         if(this.pg.ts.includes(this.pg.ts[i].id)){
        //             this.pg.ts[i].value=1;
        //         }else{
        //             this.pg.ts[i].value=0;
        //         }
        //     }
        // },
        // loadSkills(){
        //     for(var j=0; j<this.pg.skills.length; j++){
        //         this.pg.skills[j].comp=0;
        //     }
        //     for(var i=0; i<this.pg.skills.length; i++){
        //         for(var j=0; j<this.pg.skills.length; j++){
        //             if(this.pg.skills[i]==this.pg.skills[j].label){
        //                 this.pg.skills[j].comp++;
        //                 //console.log("loads");
        //                 break;
        //             }
        //         }
        //     }
        // },
        loadSpells(){
            fetch("data/spells.json")
                .then((response) => response.json())
                    .then((json) => this.parseSpells(json));
        },
        parseSpells(json){
            //console.log(json);
            this.allSpells = json;
            vueapp.spells_print = [];
            for(level in this.pg.slots){
                level.known=0;
            }
            for (var i=0; i<vueapp.pg.spells.length; i++){
                for(var spell of json){
                    if(vueapp.pg.spells[i].name == spell.name){
                        if (vueapp.pg.spells[i].prepared == "true"){
                            spell.prepared = true;
                        } else
                        {
                            spell.prepared = false;
                        }
                        const index = this.allSpells.indexOf(spell);
                        if (index > -1) { 
                            this.allSpells.splice(index, 1); // 2nd parameter means remove one item only
                        }
                        vueapp.spells_print.push(spell);
                        for(level of this.pg.slots){
                            if(spell.level == level.level){
                                level.known++;
                            }
                        }
                            
                    }
                }
            }
        },
        loadData(){
            var files = document.getElementById('selectFiles').files;
            if (files.length <= 0) {
                vueapp.errorPrint = "No files provided."
                return false;
            }
            vueapp.filename = files.item(0).name;
            
        
            var fr = new FileReader();
        
            fr.onload = function(e) { 
                json = JSON.parse(e.target.result);
                vueapp.parseData(json);
            }
            fr.readAsText(files.item(0));
            vueapp.filepath = "";
            this.loading = false;
        },
        parseData(json){
            // console.log(json);
            vueapp.pg=json;
            // this.parseStats();
            // this.loadTS();
            // this.loadSkills();
            this.loadSpells();
        },
        save(){
            for (var i = 0; i < this.spells_print.length; i++){
                for (var j = 0; j < this.pg.spells.length; j++){
                    if(this.spells_print[i].name == this.pg.spells[j].name){
                        this.pg.spells[j].prepared = ""+this.spells_print[i].prepared;
                    }
                }
            }
            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
              
                element.style.display = 'none';
                document.body.appendChild(element);
              
                element.click();
              
                document.body.removeChild(element);
              }

            // api.saveData(JSON.stringify(this.pg), this.filename);
            var savedata = JSON.stringify(this.pg);
            download(this.filename,savedata);
        },
        widthStyleHP(){
            var percentage = parseInt(this.pg.hp)/parseInt(this.pg.maxHP) *100;
            return "width: "+percentage+"%;";
        },
        addHP(n){
            this.pg.hp=parseInt(this.pg.hp)+n*parseInt(this.deltaHP);
            if (this.pg.hp<0)
                this.pg.hp =0;
            if (this.pg.hp > this.pg.maxHP)
                this.pg.hp = this.pg.maxHP;
        },
        tsMorteFail(n){
            if(this.pg.ts_morte.fallimenti >= n)
                return "bi-x-circle-fill";
            else
                return "bi-circle";
        },
        tsMorteSuccess(n){
            if(this.pg.ts_morte.successi >= n)
                return "bi-check-circle-fill";
            else
                return "bi-circle";
        },
        appendEmptyAttack(){
            this.pg.attack_bonus.push({name: "", bonus: "", danni: "", tipo: ""},)
        },
        proficiencyST(){
            var i=0;
            for(i=0; i<this.pg.ts.length;i++){
                if(this.stat_name(this.pg.ts[i].id)==this.selected_ts){
                    this.pg.ts[i].value+=1;
                    this.pg.ts[i].value%=2;
                }
            }
        },
        proficiencySkill(){
            var i=0;
            for(i=0; i<this.pg.skills.length;i++){
                if(this.pg.skills[i].label==this.selected_skill){
                    this.pg.skills[i].comp+=1;
                    this.pg.skills[i].comp%=3;
                }
            }
        },
        getFilename(){
            var array  = this.filepath.split("\\");
            this.filename = array[array.length-1];
            return this.filename;
        },
        new_pg(){
            this.loading = false;
            fetch("saves/blank.json")
                    .then((response) => response.json()
                        .then((json) => this.parseData(json)))
                .catch ((error) => {
                console.log(error);
                vueapp.errorPrint=error;
                vueapp.filename = "save.json";
                return;
            });
            
        },
        appendEmptyFeature(){
            this.pg.priv_tratti.push({name:"", description:""});
        },
        appendEmptyLimitedFeature(){
            this.pg.PTL.push(
                {
                    name: "",
                    max_uses: 0,
                    current_uses: 0,
                    charges: "",
                    description:""
                }
            );
            
        },
        addSpell(){
            if(this.spellToAdd!= ""){
                for(spell of this.allSpells){
                    if(spell.name == this.spellToAdd){
                        vueapp.pg.spells.push(
                            {
                                name: spell.name,
                                prepared: true,
                            }
                        )
                        vueapp.spells_print.push(spell);
                        for(level of this.pg.slots){
                            if(level.level == spell.level){
                                level.known ++;
                            }
                        }
                        const index = this.allSpells.indexOf(spell);
                        if (index > -1) { 
                            this.allSpells.splice(index, 1); // 2nd parameter means remove one item only
                        }
                    }
                }
            }
            this.spellToAdd= "";
        },
        removeSpell(){
            if(this.spellToRemove != ""){
                for(spell of this.spells_print){
                    if(spell.name == this.spellToRemove){
                        for(level of this.pg.slots){
                            if(level.level == spell.level){
                                level.known-=1;
                            }
                        }
                        vueapp.allSpells.push(spell);
                        const index = this.spells_print.indexOf(spell);
                        if (index > -1) { 
                            this.spells_print.splice(index, 1); // 2nd parameter means remove one item only
                        }
                    }
                }
            }
            this.spellToRemove = "";
        },
        checkSlots(level){
            if(level.max>4) level.max = 4;
            if(level.max<0) level.max = 0;
            if(level.used>level.max) level.used = level.max;
        },
        checkHP(){
            if(this.pg.hp<0) this.pg.hp = 0;
            if(this.pg.maxHP<0) this.pg.maxHP = 0;
            if(this.pg.hp>this.pg.maxHP) this.pg.hp = this.pg.maxHP;
        },
        checkPTL(){
            if(this.pg.PTL[this.selected_PT].current_uses<0) this.pg.PTL[this.selected_PT].current_uses = 0;
            if(this.pg.PTL[this.selected_PT].max_uses<0) this.pg.PTL[this.selected_PT].max_uses = 0;
            if(this.pg.PTL[this.selected_PT].current_uses>this.pg.PTL[this.selected_PT].max_uses) this.pg.PTL[this.selected_PT].current_uses = this.pg.PTL[this.selected_PT].max_uses;
        },
        spellMod(){
            var mod = 0;
            switch (this.pg.castingStat){
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
                mod += parseInt(this.pg.compBonus);
                if(mod > 0)
                    return "+" + mod ;
                else 
                    return mod;
        },
        spellTS(){
            var mod = 0;
            switch (this.pg.castingStat){
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
                return 8 + mod + parseInt(this.pg.compBonus);
        }
    }
});

// Modal Component
Vue.component("modal", {
    template: "#modal-template"
  });



  // check if leaving without saving
  window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});