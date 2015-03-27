// ==UserScript==
// @name       Harvest reports improvements for harvestapp.com, see www.getharvest.com
// @namespace  http://www.prosperity247.com/
// @version    0.25
// @description  Add"s addtional buttons into the DOM that allows us to navigate around harvest more easily
// @match      https://*.harvestapp.com/reports*
// @match      https://*.harvestapp.com/invoices/new*
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
      console.log("Harvest Reports Improvements");
      console.log("Add Edit Project Button");
      
      function getProjectIdFromUrl(url){
          return url.between("/reports/projects/","?");
      }
      
      $(".ur-name a[href*=projects],.pb-name a[href*=projects],.td-item a[href*=projects]").each(function() {
          var t =  $(this);
          var url = t.attr("href");
          
          var projectid = getProjectIdFromUrl(url);
          
          var editProjectUrl = "/projects/"+projectid+"/edit";
          t.parent().prepend("&nbsp;<a href='"+editProjectUrl+"' target='_blank' class='btn-action btn-small'>Edit Project</a>"); 
      });
      
      
      console.log("Add Client Buttons");
      function getClientIdFromUrl(url){
          return url.between("/reports/clients/","?");
      }
      $(".ur-name a[href*=client],.pb-name a[href*=client],.td-item a[href*=client]")
      .each(function() {
          var t =  $(this);
          var url = t.attr("href");
          
          var clientid = getClientIdFromUrl(url);
          
          var clientinvoiceUrl = "/invoices/archive?invoice_report=selected&timeframe=all&client="+clientid+"&status%5B%5D=all";
          var clientEstimatesUrl = "/estimates/archive?timeframe=all&client="+clientid+"&status%5B%5D=all";
          t.parent().parent().find("td:nth-child(2)").html("<a href='"+clientinvoiceUrl+"' target='_blank' class='btn-action btn-small' style='font-weight:normal;'> Invoices </a>&nbsp;<a href='"+clientEstimatesUrl+"' target='_blank' class='btn-action btn-small' style='font-weight:normal;'>Estimates</a>"); 
          
      });
      
      $("a.btn-action[href*=invoice]").each(function() {
          $(this).attr("target","_blank");
      }); 
      
      console.log("Add Top Toolbar Buttons");
      
      switch (window.location.pathname) {
          case "/reports/uninvoiced":
              var zeroButton = $("<span><a class='btn-action btn-small btn-chrome'><span>Hide/Show 0.00 Uninvoiced Hours</span></a></span>")
              .click(function () {
                  $(".ur-unhours a")
                  .filter(function() { 
                      return $(this).text() === "0.00"; 
                  })
                  .each(function() {
                      $(this).closest("tr").toggle();
                  });
              });
              
              var lowValueButton = $("<span><a class='btn-action btn-small btn-chrome'><span>Hide/Show Low Value</span></a></span>");
              lowValueButton.click(function () {
                  $(".ur-unamount")
                  // .slice(1) //Skip header row
                  .filter(function() {
                      var text = $(this).text();
                      var number = Number(text.replace(/[^0-9\.]+/g,""));
                      return number < 300.00;
                  })
                  .each(function() {
                      $(this).closest("tr").toggle();
                  });
              });
              
              var toolbar = $(".f-right");
              toolbar.append(zeroButton);
              toolbar.append(" ");
              toolbar.append(lowValueButton);              
              break;
          case "/invoices/new":
              
              //wait for in visible on id invoice_configure_projects
              var invoice_configure_projects = $("#invoice_configure_projects");
              
              if ($(invoice_configure_projects).is(":visible")){
                  setupNewInvoiceSettings();
              } 
              else{
                  $("#select_retainer_button").click(setupNewInvoiceSettings)
              }
              
              break;
      }
      
      
      function setupNewInvoiceSettings(){
         debugger;
         var retainerID = Form.getInputs("new_invoice_form","radio","draw_retainer_id").find(function(e){return e.checked});
          
         if( (!retainerID|| retainerID.value>0) && $(".select_project_checkbox").length > 1){
              $(".select_project_checkbox").each( function() {
                  var project = $(this);
                  project.prop("checked", false);
                  
                  var label = $(project.parent().find("label"));
                  var element = label.text(label.text().trim());
                  project.click(function() {
                      var selection = window.getSelection();        
                     var range = document.createRange();
                      range.selectNodeContents(label[0]);
                      selection.removeAllRanges();
                      selection.addRange(range);
                  });
              } );
          }
          
          //Create date string s UK format.
          debugger;
          var aYearAgo = new Date();
          aYearAgo.setDate(aYearAgo.getDate()-365);
          aYearAgo = aYearAgo.getDate() + "/" + (1+aYearAgo.getMonth()) + "/" + aYearAgo.getFullYear();
          var yesterday = new Date();
          yesterday.setDate(yesterday.getDate()- 1);
          yesterday = yesterday.getDate() + "/" +(1+yesterday.getMonth()) + "/" + yesterday.getFullYear();
          
          $("#import_hours").prop("checked", true);
          $("select#timeframe").val("Custom");
          $("select#timeframe").trigger("onchange");
          $("input#start_date").val(aYearAgo);
          $("input#end_date").val(yesterday);
          
          $("input#invoice_type_summary_detailed").prop("checked", true);
          $("input#invoice_type_summary_detailed").trigger( "click");
          $("input[name='include-0project']").prop("checked", false);
          $("input[name='include-4date']").prop("checked", true);
          $("input[name='include-1task']").prop("checked", false);
          $("input[name='include-2people']").prop("checked", true);
          $("input[name='include-3note']").prop("checked", true);
          
          $("input#import_all_expenses").prop("checked", true);
          $("input#invoice_expense_summary_detailed").prop("checked", true);
          $("input#invoice_expense_summary_detailed").trigger("click");
          $("input[name='include-1category']").prop("checked", false);
      }
  }
 );

