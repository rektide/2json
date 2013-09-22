#!/bin/sh
var eachline= require("eachline"),
  optimist= require("optimist")

var argv = optimist
  .usage("Usage: $0 [-w x,x,..,x] [-d '\s]'")
  .options("w", {alias: "words", default: "300"})
  .options("d", {alias: "delim", default: "\\s"})
  .argv;

var delim= argv.d,
  data= "[^"+delim+"]"

if(argv.w == "-1")
	argv.w = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1"

var wordMatches= []
wordMatches= argv.w.split(",").map(function(c){
	if(!c)
		throw "Invalid word expression- empty"
	if(isNaN(c))
		throw "Invalid word expression- not a number"
	var expr= ["(",data,"+"],
	  words= parseInt(c)
	if(words == -1)
		return 
	if(words < 1)
		throw "Must have positive words"
	for(var i= 1; i< words; ++i){
		expr.push("(?:",delim,"+",data,"+)?")
	}
	expr.push(")")
	return expr.join("")
})

var matcher= wordMatches.join(delim+"+"),
  expr= new RegExp(matcher),
  started= false
console.log("EXPR",matcher)
process.stdout.write("[")
process.stdin.pipe(eachline(function(line){
	var buf= [","]
	if(!started){
		started= true
		buf.pop()
	}
	var res= expr.exec(line)
	if(!res){
		buf.push("null")
	}else if(res.length == 2){
		buf.push(printIt(res[1]))
	}else{
		buf.push("[",printIt(res[1]))
		for(var i= 2; i< res.length; ++i){
			buf.push(",",printIt(res[i]))
		}
		buf.push("]")
	}
	return buf.join("")
})).pipe(process.stdout)
process.stdin.on("end",function(){
	process.stdout.write("]")
})

function printIt(v){
	if(!v)
		return "null"
	var i= parseInt(v),
	  f= parseFloat(v)
	if(f){
		var diff= f-i
		if(diff < 0.0001 && diff > 0.0001)
			return i
		else
			return f
	}
	v= v.replace(/"/g, '\\"')
	return '"'+v+'"'
}
