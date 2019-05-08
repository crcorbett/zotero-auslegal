{
	"translatorID": "740aa153-a271-44b3-974b-0ef99bb978f9",
	"label": "Westlaw AU",
	"creator": "Cooper Corbett",
	"target": "^https://www-westlaw-com-au",
	"minVersion": "1.0",
	"maxVersion": "",
	"priority": 1,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2018-05-07 12:58:16"
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
 
		if (url.indexOf("westlaw") != -1) {
		return "case";
	}
}


function doWeb(doc, url) {
	var retrieveYear = function(string){
		var regEx = new RegExp(/\[[0-9]+\]|\([0-9]+\)/gi);
		var matches = string.match(regEx);
		var matches = matches[0].replace(/\W/g,'');
		return matches;
	}

	var removeYear = function(string){
		var matches = string.match(/\[[0-9]+\]|\([0-9]+\)/);
		string = string.replace(matches[0], "");
		return string;
	}

	var retrieveCitation = function(element){
		// If first citation is an authorised report, return that
		if (element.children[0].getAttribute("type") == "reported"){
			var citation = element.children[0].textContent;
		}


		// If the first citation is Medium-neutral and there are many grab the "reported" citation 
		// TODO: This currently assumes that if there are more than one citations, that the second will be an authorised report 
		else if (element.children.length > 1){
			var citation = element.querySelector("[type=reported]").textContent;
		}

		// Else, use the first appearing citation
		else {
			var citation = removeYear(element.getElementsByClassName("md-reference")[0].textContent);
		}


		return citation;
	}

	var retrieveReporter = function(string){
		var regEx = new RegExp(/[A-Z][a-z]+/gi);
		var matches = string.match(regEx);
		string = matches[0];
		return string;
	}

	var newItem = new Zotero.Item();
	newItem.itemType = "case";
	newItem.title = doc.getElementsByClassName("heading")[0].textContent;

	var citation = retrieveCitation(doc.getElementById("metadata-citations"));

	// Retrieves the first attachment available
	// TODO: Preference PDF Downloads and/or Authorised Reports first
	fileURL = doc.getElementsByClassName("attachmentLinks")[0].childNodes[0].href;
	medneutCitation = doc.getElementsByClassName("md-reference")[0].textContent;
	newItem.date = retrieveYear(medneutCitation);
	newItem.reporter = retrieveReporter(citation);
	newItem.court = doc.getElementsByClassName("metadata-line1")[0].textContent.split(",")[0];

	// Medium Neutral = Page Number - Authorised Report = Journal Number + Page Number
	if (citation.match(/[0-9]+/gi).length > 1){
		newItem.volume = citation.match(/[0-9]+/g)[0];
		newItem.pages = citation.match(/[0-9]+/g)[1];
	}	

	else {
		newItem.pages = citation.match(/[0-9]+/g)[0];
	}


	Zotero.Utilities.HTTP.doGet(fileURL, function(html){
		var attachment = {
		  url: fileURL,
		  title: newItem.title
		};

		newItem.attachments.push(attachment);
	}
	)

	newItem.complete();
}
