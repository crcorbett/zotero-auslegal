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
	
	var newItem = new Zotero.Item();
	newItem.itemType = "case";
	newItem.title = doc.getElementsByClassName("query")[0].textContent

	var dataID = doc.getElementsByClassName("downloadpdf injectednode btn tertiary notranslate")[0].attributes[3].textContent
	var pdfURL = "https://advance.lexis.com/r/documentprovider/5sd7k/attachment/data?attachmentid=" + dataID + "&attachmenttype=PDF&attachmentname=OriginalSourceImage&origination=&sequencenumber=&ishotdoc=false"
	var baseURL = "https://advance.lexis.com/r/documentprovider/5sd7k/attachment/data?"
	var postString = "attachmentid=" + dataID + "&attachmenttype=PDF&attachmentname=OriginalSourceImage&origination=&sequencenumber=&ishotdoc=false"

	// Z.debug("Title of Case: " + newItem.title)
	// Z.debug(dataID)

	// Z.debug(pdfURL); // Check URL


	// PDF link is a HTTP Request to the URL:
	// https://advance.lexis.com/r/documentprovider/5sd7k/attachment/data?attachmentid=V1,215,12609,5RXP-GYS1-FD4T-B0K0-00000-00-12609-350-alr-001,1&attachmenttype=PDF&attachmentname=OriginalSourceImage&origination=&sequencenumber=&ishotdoc=false
	// Where the attachmentid changes depending upon the case
	// doGet is used to enable Zotero to use the login-cookie from accessing the main page

	Zotero.Utilities.HTTP.doGet(pdfURL, function(html){
		var attachment = {
		  url: pdfURL,
		  title: "Full Text PDF",
		  mimeType: 'application/pdf'
		};

		newItem.attachments.push(attachment);
	}
	)

	newItem.complete();

}
