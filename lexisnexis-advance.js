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
 
	if (url.indexOf("/document/onecase/") != -1) {
		return "case";
	}
}


function doWeb(doc, url) {
	
	var newItem = new Zotero.Item();
	newItem.itemType = "case";
	newItem.title = "placeholder"

	var pdf = doc.getElementsByClassName(""); // PDF element
	var pdfURL = pdf[0].href; // URL
	Z.debug(pdf[0].href); // Check URL

	if (pdf) {
	var attachment = {
	  url: pdf[0].href,
	  mimeType: "application/pdf",
	  title: "IEEE Computer Full Text PDF",
	};
	
	newItem.attachments = attachment;
	
	}
	
	newItem.complete();

}
