{
	"translatorID": "23363d97-b7f9-4bf4-8b35-6170c9dbb837",
	"label": "jade.io",
	"creator": "Cooper Corbett",
	"target": "^https://jade.io/article/",
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
 
	if (url.indexOf("https://jade.io/article") != -1) {
		return "case";
	}
}


function doWeb(doc, url) {
	

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

	var removeYear = function(string){
		var matches = string.match(/\[[0-9]+\]|\([0-9]+\)/);
		string = string.replace(matches[0], "");
		return string;
	}

	var retreiveShortTitle = function(string){
		citationIndex = string.indexOf(string.match(/\[[0-9][0-9]+\]|\([0-9][0-9]+\)/)[0]);
		return string.slice(0, citationIndex-1);
	}

	var splitCitations = function(string){
		string = string.split("; ")
		if (string.length > 1){
			return string[1]
		}
		else {
			return string[0]
		}
	}

	function contains(selector, text) {
  		var elements = document.querySelectorAll(selector);
  		return Array.prototype.filter.call(elements, function(element){
   			 return RegExp(text).test(element.textContent);
		  });
	}

	var newItem = new Zotero.Item();
	newItem.itemType = "case";

	var docLink = contains('a', 'Download original document')[0].href
	var fullCase = doc.getElementsByClassName("title no-underline-link")[0].getElementsByClassName("gwt-InlineLabel")[0].textContent;
	var citation = doc.getElementsByClassName("gloss-body")[0].getElementsByClassName("gwt-InlineLabel")[0].textContent;
	var shortCase = retreiveShortTitle(fullCase);
	var citationNoYear = removeYear(citation);
	var authCitation = splitCitations(citationNoYear);

	newItem.title = shortCase;
	newItem.reporter = retrieveReporter(authCitation);
	newItem.date = retrieveYear(citation);

	if (authCitation.match(/[0-9]+/gi).length > 1){
		newItem.volume = authCitation.match(/[0-9]+/g)[0];
		newItem.pages = authCitation.match(/[0-9]+/g)[1];
	}	

	else {
		newItem.pages = authCitation.match(/[0-9]+/g)[0];
	}

	Zotero.Utilities.HTTP.doGet(docLink, function(html){
		Z.debug(docLink)
		var attachment = {
	 		url: docLink,
	  		title: shortCase,
		};

		newItem.attachments.push(attachment);})	
	

	newItem.complete();

	}
	