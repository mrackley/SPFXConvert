/*
 * PAITGroup.PromotedLinks - Turn a Promted Links list in SharePoint into responsive tiles with flip animation
 * Version 1.0 
 * @requires jQuery v1.7 or greater 
 * @requires unslider 
 *
 * Copyright (c) 2017 Mark Rackley / PAIT Group
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */
/**
 * @description Turn a Promted Links list in SharePoint into responsive tiles with flip animation
 * @type jQuery
 * @name PAITGroup.PromotedLinks
 * @category Plugins/PAITGroup.PromotedLinks
 * @author Mark Rackley / http://www.paitgroup.com / mrackley@paitgroup.com
 */

 $.fn.PAITGroupPromotedLinks= function (options)
{
     var opt = $.extend({}, {
		listName: 'PromotedLinks',
		tileWidth: 100,
        tileHeight: 100,
        showTitle: true
    }, options);
	
	var call = $.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('"+opt.listName+"')/items?orderby=Order",
		type: "GET",
		dataType: "json",
		headers: {
			Accept: "application/json;odata=verbose"
		}
	});
	call.done(function (data,textStatus, jqXHR){
		for(index in data.d.results)
		{
			var tile = "<div class='PAITLink-Tile' onclick='window.location=\""+data.d.results[index].LinkLocation.Url+"\";'>"+
						"<div class='front'>"+
						"<img width='"+opt.tileWidth+"' height='"+opt.tileHeight+"' src='"+data.d.results[index].BackgroundImageLocation.Url+"'>";
			if (opt.showTitle)
			{
				tile += "<div class='PAITLink-TileTitle'>"+data.d.results[index].Title+"</div>";
			}
			tile += "</div><div class='back'>" +
							data.d.results[index].Description +
						"</div>"+
						"</div>";

			$("#PAITLinks").append(tile);
		}

		$('.PAITLink-Tile,.back').css({"height":opt.tileHeight});
		$('.PAITLink-Tile,.back').css({"width":opt.tileWidth});
		
		$(".PAITLink-Tile").flip({
			axis: 'y',
			trigger: 'hover'
		});
			
		$("#PAITLinks").masonry({
			// options
			itemSelector: '.PAITLink-Tile',
			columnWidth: 25
		}); 
	});
	
	call.fail(function (jqXHR,textStatus,errorThrown){
		alert("Error retrieving Links: " + jqXHR.responseText);
	});
}

