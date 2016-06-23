var winston = require('winston');

exports.criptify = function (nChave, nTexto){
	
	try {		
		//Criando a chave
		var chave = nChave.split("");
		
		chave = find_duplicates(chave) != "" ? find_duplicates(chave) : chave;
				
		//Criando o texto
		var texto = nTexto.split("");
		
		var lTexto = Math.ceil(texto.length / chave.length);
		
		var sobTexto = (lTexto * chave.length) - texto.length;
		
		var aTexto = [];
		
		for(var a = 0; a < lTexto; a++){
			var i = chave.length * a;
			var f = i + chave.length;
			aTexto[a] = texto.slice(i, f);
			
		}
		
		for(var a = 0; a < sobTexto; a++){
			aTexto[lTexto-1].push("お");	
		}
		
		var fTexto = [];
		
		for(var a = 0; a < chave.length; a++){
			fTexto[chave[a]] = [];
			for(var b = 0; b < lTexto; b++){
				fTexto[chave[a]][b] = aTexto[b][a];
			}	
			
		}
		
		var chaveOrdem = chave.sort();
		
		for(var a = 0; a < chaveOrdem.length; a++){	
			
		}
		
		var fTextoString = "";
		
		for(var a = 0; a < chaveOrdem.length; a++){
			for(var b = 0; b < fTexto[chaveOrdem[a]].length; b++){	
				
				if(fTexto[chaveOrdem[a]][b] == ","){
					fTexto[chaveOrdem[a]][b] = "あ";
				} else if(fTexto[chaveOrdem[a]][b] == " "){
					fTexto[chaveOrdem[a]][b] = "ぎ";
				}
				
				fTexto[chaveOrdem[a]][b] = 
					String.fromCharCode(
						fTexto[chaveOrdem[a]][b].charCodeAt(0) 
						+ 
						chaveOrdem[a].charCodeAt(0)
					);
				
			}
			fTextoString += fTexto[chaveOrdem[a]].toString();
		}
		
		fTextoString = fTextoString.replace(new RegExp(",", "g"), "")
		
		winston.log("info", "CriptoJS -> criptify() -> Ok");
		
		return fTextoString;

	} catch (ex) {
		winston.log("error", "CriptoJS -> criptify() -> Error below");
		winston.log("info", ex);
		return "err";
	}
			
};

exports.decriptify = function (nChave, nTexto){
	
	try {		
		//Criando a chave
		var uChave = nChave.split("")
		var chave = nChave.split("").sort()
		
		chave = find_duplicates(chave) != "" ? find_duplicates(chave) : chave;
		uChave = find_duplicates(uChave) != "" ? find_duplicates(uChave) : uChave; 
		
		//Criando o texto
		var texto = nTexto.split("");
		
		var lTexto = texto.length / chave.length;
		
		var aTexto = [];
		
		var a = 0;
		for(var b = 0; b < chave.length; b++){
			aTexto[chave[b]] = [];
			for(var c = 0; c < lTexto; c++){
				aTexto[chave[b]][c] = texto[a];
				
				aTexto[chave[b]][c] = 
					String.fromCharCode(
						texto[a].charCodeAt(0) 
						- 
						chave[b].charCodeAt(0)
					);
				
				a++;
			}
			
		}
		
		var dTexto = [];
		
		for(a = 0; a < uChave.length; a++){
			dTexto[uChave[a]] = aTexto[uChave[a]];
			
		}
		
		var fTextoString = "";
		
		for(a = 0; a < lTexto; a++){
			for(var b = 0; b < uChave.length; b++){
				fTextoString += dTexto[uChave[b]][a];
			}
		}
		
		fTextoString = fTextoString
			.replace(new RegExp(",", "g"), "")
			.replace(new RegExp("お", "g"), "")
			.replace(new RegExp("あ", "g"), ",")
			.replace(new RegExp("ぎ", "g"), " ");
		
		console.log("CriptoJS -> decriptify -> Ok");
		
		return fTextoString;

	} catch (ex) {
		winston.log("error", "CriptoJS -> decriptify -> Errow below:");
		winston.log("info", ex);
		return "err";
	}
			
};
		
		
//Função que remove duplicatas
function find_duplicates(arr) { 
    var len = arr.length, 
    out = [], 
    counts = {}; 
    for (var i=0;i<len;i++) { 
        var item = arr[i]; 
        var count = counts[item]; 
        counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1; 
    } 
    for (var item in counts) { 
        if(counts[item] > 1) 
        out.push(item); 
    } 
    return out; 
}

winston.log("info", "CriptoJS -> started");