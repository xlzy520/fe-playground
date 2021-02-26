const btn = '<button id="lzPrint" style="position: fixed; color: #20a0ff;right: 20px;top: 20px;z-index: 99999"">打印</button>'
function printPdf() {
  // $('body').printThis({
    $('.WB_feed.WB_feed_v3.WB_feed_v4').printThis({
    importCSS: true,
    // loadCSS: "https://img.t.sinajs.cn/t6/style/css/module/list/comb_WB_feed.css?version=40c445261b223d2b",
  });
}
$('body').append(btn)

$('#lzPrint').click(() => {
  printPdf()
})
