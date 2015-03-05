function trie(init){
	function find(pointer, val){
		for(var k in pointer){
			var c = "";
			for(var i in k.length>val.length?k:val){
				if(k[i] == val[i]) c += k[i];
				else break;
			}
			if(c.length) return {
				match : k,
				com : c
			}
		}
		return false;
	}
	function dump(pointer){
		var out = [];
		for(var k in pointer){
			var next = dump(pointer[k], k);
			if(!next.length) out.push(k);
			else for(var j in next) out.push(k+next[j]);
		}
		return out;
	}
	var o = {
		dat : {},
		add : function(val, pointer){
			pointer = pointer || this.dat;
			var found = find(pointer, val);
			var match = found.match;
			var com = found.com;
			if(!match) pointer[val] = {};
			else if(match.length != com.length){
				pointer[com] = {};
				pointer[com][match.substr(com.length)] = {};
				pointer[com][val.substr(com.length)] = {}
				delete pointer[match];
			}else this.add(val.substr(match.length), pointer[match]);
		},
		get : function(val, pointer, parent){
			parent = parent || "";
			pointer = pointer || this.dat;
			var found = find(pointer, val);
			if(!found){
				if(val.length) return false;
				else{
					possibles = dump(pointer).map(function(v){return parent+v});
					return possibles.length?possibles:[parent];
				}
			}else if(found.match != found.com && val.length > found.com.length) return false;
			else return this.get(val.substr(found.match.length), pointer[found.match], parent+found.match);
		}
	}
	for(var i in init) o.add(init[i]);
	return o;
}