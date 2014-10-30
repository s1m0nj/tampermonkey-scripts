// ==UserScript==
// @name       Harvest reports improvements for harvestapp.com, see www.getharvest.com
// @namespace  http://www.prosperity247.com/
// @version    0.23
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
          t.parent().parent().find('td:nth-child(2)').html('<a href="'+clientinvoiceUrl+'" target="_blank" class="btn-action btn-small" style="font-weight:normal;">Previous Invoices</a>'); 
          
      });
      
      
      $("a.btn-action[href*=invoice]").each(function() {
          $(this).attr('target','_blank');
      }); 
      
      console.log('Add Top Toolbar Buttons');
      var zeroButton = $('<span><a class="btn-action btn-small btn-chrome"><span>Hide/Show 0.00 Uninvoiced Hours</span></a></span>')
      .click(function () {
          $('.ur-unhours a')
          .filter(function() { return $(this).text() === "0.00"; })
          .each(function() {
              $(this).closest('tr').toggle();
          });
      });
      
      var lowValueButton = $('<span><a class="btn-action btn-small btn-chrome"><span>Hide/Show Low Value</span></a></span>');
      lowValueButton.click(function () {
          $('.ur-unamount')
          .slice(1) //Skip header row
          .filter(function() {
              var text = $(this).text();
              var number = Number(text.replace(/[^0-9\.]+/g,""));
              return number < 300.00;
          })
          .each(function() {
              $(this).closest('tr').toggle();
          });
      });
      
      var toolbar = $(".f-right");
      toolbar.append(zeroButton);
      toolbar.append(" ");
      toolbar.append(lowValueButton);
  }
 );

