[![Build Status](https://travis-ci.org/mattdot/basehuman.svg?branch=master)](https://travis-ci.org/mattdot/basehuman)

> BaseHuman is pre-release and the vocabulary will be changed before v1, breaking compatibility with the current version.  The current version can be used to evaluate the library, but should not be used in production at this time.

# Overview
*BaseHuman* uses words instead of digits to encode large numbers in a human-readable and rememberable way.  By using words from the user's language, *BaseHuman* can use bases up to 8192 and encode very large numbers in just a couple words.

| Base-10     | Base-32       | BaseHuman-8192              |
|-------------|---------------|-----------------------------|
|824,941,551  |GEVZX3Y=       |with personnel hobby         |
|3,828,098,310|4QWCKBQ=       |their children unique        |
|3,212,781,663|X57SQXY=       |no washing tags              |

BaseHuman is perfect for use cases where users need to remember a magic number for a brief period of time and enter it on another screen or app, such as in authenticators.

# Example
This example shows how to convert a javascript number to BaseHuman

	npm install --save basehuman
.

	const BaseHuman = require("basehuman").BaseHuman;
	let bh = new BaseHuman();
	console.log(bh.encode(3212781663));  //outputs 'no washing tags'
	console.log(bh.decode('no washing tags')); //outputs 3212781663
  
# Options
## Using a different base
BaseHuman allows you to use different bases (larger or smaller vocabularies) for encoding.

	let bh = new BaseHuman({ base : 1024 });
## Using a different language
BaseHuman will allow you to use different languages
	
	let bh = new BaseHuman({ language : "es" });
