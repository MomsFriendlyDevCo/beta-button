default: build

build:
	cat lib/mfdc-beta.js lib/wheel/jquery.wheelmenu.min.js >dist/mfdc-beta.js
	cat lib/mfdc-beta.css >dist/mfdc-beta.css
