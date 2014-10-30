// ==UserScript==
// @name       Harvest reports improvements for harvestapp.com, see www.getharvest.com
// @namespace  http://www.prosperity247.com/
// @version    0.22
// @description  Add's additional buttons into the DOM that allows us to navigate around harvest more easily
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
};

$(function() 
  {
      console.log('Harvest Reports improvements');
      
     
      
      console.log('Add Edit Project Button');
      
      function getProjectIdFromUrl(url){
          return url.between('/reports/projects/','?');
      }
      
      $(".ur-name a[href*=projects],.pb-name a[href*=projects],.td-item a[href*=projects]").each(function() {
          var t =  $(this);
          var url = t.attr('href');
          
          var projectid = getProjectIdFromUrl(url);
          
          var editProjectUrl = '/projects/'+projectid+'/edit';
          t.parent().prepend('&nbsp;<a href="'+editProjectUrl+'" target="_blank" class="btn-action btn-small">Edit Project</a>'); 
      });
      
            
      console.log('Add Client Invices Button');
      function getClientIdFromUrl(url){
          return url.between('/reports/clients/','?');
      }
      $(".ur-name a[href*=client],.pb-name a[href*=client],.td-item a[href*=client]")
        .each(function() {
          var t =  $(this);
          var url = t.attr('href');
          
          var clientid = getClientIdFromUrl(url);
          
          var clientinvoiceUrl = '/invoices/archive?invoice_report=selected&timeframe=all&client='+clientid+'&status%5B%5D=all';
		  t.parent().parent().find('td:nth-child(2)').html('<a href="'+clientinvoiceUrl+'" target="_blank" class="btn-action btn-small">Previous Invoices</a>'); 
          
      });
      
          
      $("a.btn-action[href*=invoice]").each(function() {
          $(this).attr('target','_blank');
      }); 
      
      console.log('Add Top Toolbar Buttons');
      var button = $('<a class="btn-action btn-small btn-chrome"><span>Remove Zero Items</span></a>')
      .click(function () {
          $('.ur-unhours a')
          .filter(function(index) { return $(this).text() === "0.00"; })
          .each(function() {
              $(this).closest('tr').remove();
          });
      });
      
      $(".f-right").append(button);
  }
 );

