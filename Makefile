default: build

build: beta-button.js beta-button.css

beta-button.js: lib/beta-button.js
	echo "// WARNING: This file is auto generated from the Makefile, changes will be overwritten" >beta-button.js
	cat lib/beta-button.js lib/wheel/jquery.wheelmenu.min.js >>beta-button.js

beta-button.css: lib/beta-button.css
	echo "/* WARNING: This file is auto generated from the Makefile, changes will be overwritten */" >beta-button.css
	cat lib/beta-button.css >>beta-button.css
