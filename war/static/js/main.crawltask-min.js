function crawlTaskFun(option){var crawlTask={fn:{init:function(){obj.v.cur_page=0;obj.v.ITEMS_COUNT=0;obj.fn.updateCount();$("#"+obj.v.tableId+" #createTask").attr("webCrawlerId",obj.v.webCrawlerId);$("#"+obj.v.tableId+" #createTask").attr("siteId","");bindEvent();$("#"+obj.v.tableId+" .statistic").click(function(){obj.fn.statistic()});$("#"+obj.v.tableId+" #create").click(function(){$("#"+obj.v.tableId+" #createTask").click()});$("#"+obj.v.tableId+" #delete").click(function(){var siteId=getRadio(obj.v.tableId,"siteId");if(siteId==null||siteId.length==0){showInfo(nc.i18n("res.select"));return false}obj.fn.remove(siteId)});$("#"+obj.v.tableId+" #unlockFromSidebar").click(function(){var siteId=getRadio(obj.v.tableId,"siteId");if(siteId==null||siteId.length==0){showInfo(nc.i18n("res.select"));return false}showLoading($("#"+obj.v.tableId));jsonrpc.siteTasksService.pin2Sidebar(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));if(exception){return}var msg=result;if(msg){removeSiteTaskNode(obj.v.webCrawlerId,siteId)}},obj.v.webCrawlerId,siteId,false)});$("#"+obj.v.tableId+" #pin2Sidebar").click(function(){var siteId=getRadio(obj.v.tableId,"siteId");if(siteId==null||siteId.length==0){showInfo(nc.i18n("res.select"));return false}var name="";var data=obj.v.jsonData;for(var i in data){if(isNaN(i)){continue}var id=data[i]["id"];if(id==siteId){name=data[i]["name"];break}}showLoading($("#"+obj.v.tableId));jsonrpc.siteTasksService.pin2Sidebar(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));if(exception){return}var msg=result;if(msg){createSiteTaskNode(obj.v.webCrawlerId,siteId,name);bindEvent()}},obj.v.webCrawlerId,siteId,true)})},statistic:function(){showLoading($("#"+obj.v.tableId));jsonrpc.siteTasksService.statistic(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));if(exception){return}var msg=result;if(msg){showInfo(nc.i18n("res.background.statistics"))}else{showInfo(nc.i18n("res.background.statistics.failure"))}},obj.v.webCrawlerId)},search:function(){obj.v.cur_page=0;obj.fn.updateCount()},query:function(cur_page){var startIndex=cur_page*obj.v.PER_PAGE_ITEMS;showLoading($("#"+obj.v.tableId));moveAllTr(obj.v.listTableId);jsonrpc.siteTasksService.query(function(result,exception,profile){if(exception){removeLoading($("#"+obj.v.tableId));return}moveAllTr(obj.v.listTableId);var data=result;data=eval(data);obj.v.jsonData=data;updateSiteJsonData(data);for(var i in data){if(isNaN(i)){continue}var id=data[i]["id"];var name=data[i]["name"];var url=data[i]["url"];var createDate=data[i]["createDate"];obj.fn.addRow(id,name,url,createDate)}removeLoading($("#"+obj.v.tableId))},obj.v.webCrawlerId,startIndex,obj.v.PER_PAGE_ITEMS)},updateCount:function(){showLoading($("#"+obj.v.tableId));jsonrpc.siteTasksService.count(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));if(exception){return}obj.v.ITEMS_COUNT=result;obj.fn.query(obj.v.cur_page);obj.fn.initPagination(obj.v.cur_page);$("#"+obj.v.tableId).find("#URL_COUNT").html(obj.v.ITEMS_COUNT)},obj.v.webCrawlerId)},initPagination:function(cur_page){$("#"+obj.v.tableId).find("#Pagination").pagination(obj.v.ITEMS_COUNT,{num_edge_entries:2,num_display_entries:8,current_page:cur_page,callback:obj.fn.pageselectCallback,items_per_page:obj.v.PER_PAGE_ITEMS,prev_text:nc.i18n("res.page.prev"),next_text:nc.i18n("res.page.next")})},pageselectCallback:function(page_index,jq){obj.v.cur_page=page_index;showLoading($("#"+obj.v.tableId));obj.fn.query(obj.v.cur_page);return false},remove:function(siteId){if(siteId==null||siteId.length==0){showInfo(nc.i18n("res.site.select"));return}if(!confirm(nc.i18n("res.remove.confirm"))){return}showLoading($("#"+obj.v.tableId));jsonrpc.siteTasksService.removeCheck(function(result,exception,profile){var msg=result;if(msg!="success"){if(!confirm(nc.i18n("res.remove.confirm2",msg))){removeLoading($("#"+obj.v.tableId));return}}jsonrpc.siteTasksService.remove(function(result,exception,profile){removeLoading($("#"+obj.v.tableId));if(exception){return}msg=result;if(msg){removeSiteTaskNode(obj.v.webCrawlerId,siteId);removeSelectForm("deployForm",siteId,"siteIdByURL");removeSelectForm("jsDependForm",siteId,"siteId");removeSelectForm("siteCreateForm",siteId,"urlOriginSiteId");removeSelectForm("urlCheckForm",siteId,"urlOriginSiteId");showInfo(nc.i18n("res.remove.success"));$("#"+obj.v.listTableId+" #siteId:checked").parent().parent().remove()}else{showInfo(nc.i18n("res.remove.failure"))}},obj.v.webCrawlerId,siteId)},obj.v.webCrawlerId,siteId)},addRow:function(id,name,url,createDate){var newTr="<tr class='simplehighlight'>";newTr+='<td nowrap>&nbsp;<input type="radio" name="siteId" id="siteId" value="'+id+'" class="siteId"/></td>';newTr+="<td nowrap>"+name+"</td>";newTr+="<td nowrap>"+url+"</td>";newTr+="<td nowrap>"+createDate+"</td>";newTr+="</tr>";$(newTr).appendTo("#"+obj.v.listTableId);$("#"+obj.v.listTableId).find("tr:odd").css("background","#FFFFFF");$("#"+obj.v.listTableId).find("tr:even").css("background","rgb(247, 247, 247)");$("#"+obj.v.listTableId).find(".simplehighlight").hover(function(){$(this).children().addClass("datahighlight")},function(){$(this).children().removeClass("datahighlight")})}}};var obj=this;obj.fn=crawlTask.fn;obj.v=option}var crawlTask=new crawlTaskFun();