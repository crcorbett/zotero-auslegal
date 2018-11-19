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
 
	if (url.indexOf("/article") != -1) {
		return "case";
	} else if (url.indexOf("/maps") != -1) {
		return "maps";
	}
}


function doWeb(doc, url) {
	
	var newItem = new Zotero.Item();
	newItem.itemType = "case";
	newItem.title = "placeholder"

	var pdfButtonXPath = ('//*[@id="gwt-debug-jade-main-tab-child-browse"]/div[4]/div[1]/div/div[1]/div[5]');
	var pdfButtonXPathClick = ZU.xpath(doc, pdfButtonXPath);
	
	pdfButtonXPathClick[0].click();
	//Z.debug(pdfButtonXPathClick[0])
	var pdf = doc.getElementsByClassName("button-grey b-pdf");
	var pdfURL = pdf[0].href;
	Z.debug(pdf[0].href);
	var pdfFile = Zotero.Attachments.importFromFile(pdf[0].href)
	//pdf[0].click()

	
	//var element = doc.getElementsByClassName("button-grey b-pdf");
	//var xpath = '//*[@id="gwt-debug-jade-main-tab-child-browse"]/div[4]/div[1]/div/div[2]/div[3]/div/div/div[2]/div[3]/a/@href'
	//var pdfURL = ZU.xpath(doc, xpath);

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
