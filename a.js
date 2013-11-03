#!/usr/bin/env node
var optimist= require("optimist")

var argv = optimist
  .usage("Usage: $0")
  .argv;


process.stdout.write("[")
process.stdin.pipe(process.stdout)
process.stdin.on("end",function(){
	process.stdout.write("]")
})
