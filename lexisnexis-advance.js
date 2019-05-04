{
	"translatorID": "46ad0d09-81e0-4776-a2de-afe80d943c66",
	"label": "LexisNexis Advance",
	"creator": "Cooper Corbett",
	"target": "^https://advance.lexis.com",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 1,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2018-11-11 12:58:16"
}

/*
	***** BEGIN LICENSE BLOCK *****
	io-portal translator
	Copyright © 2014 Sebastian Karcher
	
	This file is part of Zotero.
	
	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.
	
	You should have received a copy of the GNU Affero General Public License
	along with Zotero.  If not, see <http://www.gnu.org/licenses/>.
	
	***** END LICENSE BLOCK *****
*/

function detectWeb(doc, url) {
 
	if (url.indexOf("/document/") != -1) {
		return "case";
	}
}


function doWeb(doc, url) {

	var toTitleCase = function (str) {
		str = str.toLowerCase().split(' ');
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		}
		str = str.join(' ');
		str = str.replace('Of', 'of');
		return str
		};

	var retrieveReporter = function(string){
		var regEx = new RegExp(/[A-Z][a-z]+/gi);
		var matches = string.match(regEx);
		string = matches[0];
		return string;
	}

	var retrieveYear = function(string){
		var regEx = new RegExp(/\[[0-9]+\]|\([0-9]+\)/gi);
		var matches = string.match(regEx);
		var matches = matches[0].replace(/\W/g,'');
		return matches;
	}

	var newItem = new Zotero.Item();
	newItem.itemType = "case";
	newItem.title = doc.getElementsByClassName("SS_RollupTitle")[0].textContent;

	var caseName = doc.getElementsByClassName("SS_RollupTitle")[0].textContent;

	// Retrieve Reporter acronym
	newItem.reporter = retrieveReporter(doc.getElementsByClassName("SS_ActiveRptr")[0].textContent);

	// Retrieve Court value
	newItem.court = toTitleCase(doc.getElementsByClassName("SS_LeftAlign")[0].childNodes[3].textContent);

	// Retrieve Year value
	newItem.date = retrieveYear(doc.getElementsByClassName("SS_ActiveRptr")[0].textContent);

	// Determine if the case is reported or unreported
	var string = doc.getElementsByClassName("SS_ActiveRptr")[0].textContent;
	if (string.includes("(")){
		newItem.volume = string.match(/[0-9]+/g)[1];
		newItem.pages = string.match(/[0-9]+/g)[2];
	}
	else {
		newItem.pages = string.match(/[0-9]+/g)[1];
	}

	
	var dataID = doc.getElementsByClassName("downloadpdf injectednode btn tertiary notranslate")[0].attributes[3].textContent;
	var pdfURL = "https://advance.lexis.com/r/documentprovider/5sd7k/attachment/data?attachmentid=" + dataID + "&attachmenttype=PDF&attachmentname=OriginalSourceImage&origination=&sequencenumber=&ishotdoc=false"

	// PDF link is a HTTP Request to the URL
	// Where the attachmentid changes depending upon the case
	// doGet is used to enable Zotero to use the login-cookie necessary for authentication

	Zotero.Utilities.HTTP.doGet(pdfURL, function(html){
		var attachment = {
		  url: pdfURL,
		  title: caseName,
		  mimeType: 'application/pdf'
		};

		newItem.attachments.push(attachment);
	}
	)

	newItem.complete();

}
