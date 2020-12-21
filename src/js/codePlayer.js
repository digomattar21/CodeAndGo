function toggle(id, classe) {
  $(id).click(function (e) {
    let display = $(classe).css("display");
    if (display === "none") {
      $(classe).css("display", "block");
      $(this).css("backgroundColor", "lightgray");
    } else {
      $(classe).css("display", "none");
      $(this).css("backgroundColor", "gray");
    }
  });
}

var htmlData,cssData,jsData;

const jsPanel = new Vue({
  data: () => ({
    value: ''
  }),
  mounted: function() {
    this._editor = new CodeMirror(this.$refs.codemirror, {
      lineNumbers: true,
      tabSize: 2,
      value: this.value,
      mode: 'javascript',
      theme: 'monokai',
      gutters: ['CodeMirror-linenumbers','breakpoints','error'],
      autoRefresh: true
    });


    this._editor.on("gutterClick", function(cm, n) {
      var info = cm.lineInfo(n);
      cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
    });
    this._editor.on('changes', () => {
      this.value = this._editor.getValue();
      this._editor.refresh();

      JSHINT(this.value);
      const errors = Array.isArray(JSHINT.errors) ? JSHINT.errors : [];
      this._editor.clearGutter('error');
      for (const error of errors) {
        this._editor.setGutterMarker(error.line - 1, 'error', makeMarker(error.reason));
      }
    });
  },
  template: `
    <div>
      <div ref="codemirror"></div>
    </div>
  `
});

// Create an HTML element that CodeMirror is responsible for positioning
// properly.
function makeMarker(msg) {
  const marker = document.createElement('div');
  marker.classList.add('error-marker');
  marker.innerHTML = '&nbsp;';

  const error = document.createElement('div');
  error.innerHTML = msg;
  error.classList.add('error-message');
  marker.appendChild(error);

  return marker;
}


const cssPanel = new Vue({
  data: () => ({
    value: ''
  }),
  mounted: function() {
    this._editor = new CodeMirror(this.$refs.codemirror, {
      lineNumbers: true,
      tabSize: 4,
      value: this.value,
      mode: 'htmlmixed',
      theme: 'monokai',
      autoRefresh: true
    });

    this._editor.on('changes', () => {
      this.value = this._editor.getValue();
      this._editor.refresh();
      cssData = this.value;
      updateOutput();
    });
  },
  template: `
    <div>
      <div ref="codemirror"></div>
    </div>
  `
});



const htmlPanel = new Vue({
  data: () => ({
    value: ''
  }),
  mounted: function() {
    this._editor = new CodeMirror(this.$refs.codemirror, {
      lineNumbers: true,
      tabSize: 4,
      value: this.value,
      mode: 'htmlmixed',
      theme: 'monokai',
      scrollbarStyle:'null'
    });

    this._editor.on('changes', () => {
      this.value = this._editor.getValue();
      this._editor.refresh();
      htmlData=this.value;
      updateOutput();
      
    });
  },
  template: `
    <div>
      <div ref="codemirror"></div>
    </div>
  `
});

function updateOutput(){
  $("#output")
  .contents()
  .find("html")
  .html(
    "<html> <head> <style type='text/css'>" +
      cssData +
      "</style> </head> <body>" +
      htmlData +
      "</body> </html>"
  );
} 


htmlPanel.$mount('.html-panel');
cssPanel.$mount('.css-panel');
jsPanel.$mount('.js-panel');

toggle('#btnHtml', '.html-container');
toggle('#btnCss', '.css-container');
toggle('#btnJs', '.js-container' );
toggle('#btnOut', '.output-container')





