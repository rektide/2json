# 2json Stdin to JSON Converter

It is a set of raw, primitive brute instruments to drag the dead ancient pre-connected "on-line"/command console world into a place where [*`jq`*](https://github.com/stedolan/jq) may be used, where selection can begin to mean something.

2json converts stdin to json which it streams to stdout, in it's most basic use turning lines into single array elements. [`2json`](#2json) has a number of options to allow cutting up columnar data as well. In addition to 2json proper, there are also a number of tools:

## Parsers

* [`2json`](#2json) which converts unmarked text lines to elements of an array
* [`it`](#2json) a shortcut for 2json
* [`itenc`](#encode) which will encode individual lines of text into javascript primitives

## Encasers

* [`ita`](#a) encases whatever stdin it's passed inside an array
* [`ito`](#o) encases whatever stdin it's passed inside an object
* [`itp`](#jsonp) encases whatever stdin it's passed inside an expression evaluation (the global "callback" by default), forming a basic jsonp stanza generator

## Helpers

* [`itirc`](#irssi) calls `2json` with paramters set for reading a common irssi screen log
* [`ansit`](#ansit) is an encaser `o`, making an object, using "ansible_facts" for the slot name

# Hat Tips

This is a very small, simple work. It was made possible by:

[**`ansible`**](http://github.com/ansible/ansible), which is one of the first console programs i've slammed up into being unprepared to hand over json

[**`termkit`**](http://acko.net/blog/on-termkit/), which made a formative point that pipes might do well to adopt structure on which to lay semantics then data

**`dolor`**, of earth and air
