// ==UserScript==
// @name       Harvest reports improvements for harvestapp.com, see www.getharvest.com
// @namespace  http://www.prosperity247.com/
// @version    0.1
// @description  Add's addtional buttons into the DOM that allows us to navigate around harvest more easily
// @match      https://*.harvestapp.com/reports*
// @copyright  2014 Simon Jackson Prosperity 24.7
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// ==/UserScript==


String.prototype.between = function(prefix, suffix) {
    //Todo:Refactor
    var s=this;
    var start = s.indexOf(prefix) + prefix.length;
    var   len = s.indexOf(suffix,start) - start;
	return s.substr(start,len);
}

$(function() 
  {
    console.log('Harvest Reports improvements');

    function getProjectIdFromUrl(url){
		return url.between('/reports/projects/','?');
    }
    
    console.log('Add Edit Project Button');
    $(".ur-name a[href*=projects],.pb-name a[href*=projects],.td-item a[href*=projects]").each(function() {
        var t =  $(this);
        var url = t.attr('href');
        var projectid = getProjectIdFromUrl(url);
        var editProjectUrl = '/projects/'+projectid+'/edit';
        t.parent().append('&nbsp;<a href="'+editProjectUrl+'" target="_blank" class="btn-action btn-small">Edit Project</a>'); 
      }            
    );
  }
);


