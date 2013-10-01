#!/bin/sh
var optimist= require("optimist")

var argv = optimist
  .usage("Usage: $0 (slot)")
  .argv;

var slot= argv._


process.stdout.write("{'"+slot+"':")
process.stdin.pipe(process.stdout)
process.stdin.on("end",function(){
	process.stdout.write("}")
})
