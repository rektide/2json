#!/bin/sh
var optimist= require("optimist")

var argv = optimist
  .usage("Usage: $0 (callbackName)")
  .argv;

var slot= argv._ || "callback"


process.stdout.write(slot+"(")
process.stdin.pipe(process.stdout)
process.stdin.on("end",function(){
	process.stdout.write(")")
})
