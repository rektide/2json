var util= require("util"),
  stream= require("stream"),
  tran= stream.Transform

module.exports= transform
transform.transform= transform

/**
* perform a common set of normalization functions on skeleton transform
*/
function transform(fn,mod,optFn){
	var flush= fn.prototype._flush
	// inherit from Transform
	util.inherits(fn,tran)

	// insure there's a module.exports for this transform
	if(typeof mod.exports != "function"){
		mod.exports= fn
	}
	// alias the transorm by it's name
	fn[fn.name]= fn
	// insure there's an implemented transform of some sort
	fn.prototype._transform= fn.prototype._transform== stream.Transform.prototype._transform? stream.PassThrough.prototype._transform: fn.prototype._transform
	// if there was a flush method it got blown away by inherit of Transform: restore it.
	if(flush)
		fn.prototype._flush= flush

	// if this is the main module,
	if(require.main== mod){
		// run the suggested optimist configurers 
		if(optFn && optFn instanceof Function) optFn= [optFn]
		// run all opt initializers, get stdin/stdout
		var opts= optFn.reduce(function(prev,val,i){return val.call(prev)},require("optimist")).argv,
		  stdin= opts.stdin= process.stdin,
		  stdout= opts.stdout= process.stdout
		// create and pipe through
		var t= new fn(opts)
		stdin.pipe(t).pipe(stdout)
	}
}
