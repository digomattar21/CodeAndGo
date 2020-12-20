window.addEventListener("keydown", (e) => {
  let key = e.key;
  if (key === "Tab") {
    //e.preventDefault();
    let srcElem = e.path[0].id;
  }
});

function toggle(id, classe) {
  $(id).click(function (e) {
    let display = $(classe).css("display");
    if (display === "none") {
      $(classe).css("display", "block");
      $(this).css("backgroundColor", "gray");
    } else {
      $(classe).css("display", "none");
      $(this).css("backgroundColor", "lightgray");
    }
  });
}

toggle("#btnJs", ".js-container");
toggle("#btnOut", ".output-container");
toggle("#btnCss", ".css-container");
toggle("#btnHtml", ".html-container");

function updateOutput(langPanel) {
  $(langPanel).on("change keyup paste", function (e) {
    $("#output")
      .contents()
      .find("html")
      .html(
        "<html> <head> <style type='text/css'>" +
          $("#css-panel").val() +
          "</style> </head> <body>" +
          $("#html-panel").val() +
          "</body> </html>"
      );
  });
}
updateOutput("#html-panel");
updateOutput("#css-panel");



// AUTOCOMPLETE FOR HTML AND CSS START
var htmlAuto = [
    {label: 'div', value: '<div></div>'},
    {label: 'span', value: '<span></span>'},
    {label: 'body', value: '<body></body>'},
    {label: '!D', value: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        
    </body>
    </html>`}
    
]

$("#html-panel").tabComplete([
    "jQuery",
    "jQueryPlugin",
    "jQueryCom",
    "jQueryScriptNet",
    ]);


var availableTags = [
  "jQuery.com",
  "jQueryUI.com",
  "jQueryMobile.com",
  "jQueryScript.net",
  "jQuery",
  "Free jQuery Plugins",
]; // array of autocomplete words
var minWordLength = 2;

function split(val) {
  return val.split(" ");
}

function extractLast(term) {
  return split(term).pop();
}
$("#html-panel") 
.bind("keydown", function (event) {
    if (
      event.keyCode === 9 
    ) {
      event.preventDefault();
    }
  })
  .autocomplete({
    minLength: minWordLength,
    source: htmlAuto
  });
