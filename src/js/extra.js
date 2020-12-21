htmlContainer = $('.html-container');
cssContainer = $('.css-container');
jsContainer = $('.js-container');
outputContainer = $('.output-container');

htmlContainer.css('marginLeft', '5px');
cssContainer.css('marginLeft', '5px');
jsContainer.css('marginLeft', '5px');





//MAKING THE STRIP BE THE SAME SIZE AS CODE MIRROR EDITOR

function updateStripSize() {
    let editor0 = $(`.CodeMirror:first`);
    let strip0 = $(`.settings-strip:first`);


    if (editor0.width() != null && ((editor0.width() > strip0.width()) || (editor0.width() < strip0.width()))) {
        strip0.width(editor0.width());
    }
    let editor1 = $(`.CodeMirror:eq(1)`);
    let strip1 = $(`.settings-strip:eq(1)`);


    if (editor1.width() != null && ((editor1.width() > strip1.width()) || (editor1.width() < strip1.width()))) {
        strip1.width(editor1.width());
    }
    let editor2 = $(`.CodeMirror:eq(2)`);
    let strip2 = $(`.settings-strip:eq(2)`);


    if (editor2.width() != null && ((editor2.width() > strip2.width()) || (editor2.width() < strip2.width()))) {
        strip2.width(editor2.width());
    }
}




$('.html-container').draggable({
    axis:'x',
    drag: function( event, ui ) {
        
        let cssLeft = document.getElementsByClassName('css-container')[0].offsetLeft;

        if (((ui.position.left + $(this).width()) > cssLeft) && (cssLeft != null && cssLeft >0)) {
            console.log(ui.position.left)
            console.log(cssLeft)
            ui.position.left = (cssLeft - ($(this).width()))
            console.log(ui.position.left)
            console.log($(this).width())
        }
        
    }
})

$('.css-container').draggable({
    axis:'x',
    drag: function( event, ui ) {
        
        
    }
})

$('.js-container').draggable({
    axis:'x',
    drag: function( event, ui ) {
        
        
    }
})














setInterval(updateStripSize, 10)