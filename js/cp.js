// start copy-to-clipboard
(function() {
  'use strict';
  if(!document.queryCommandSupported('copy')) {
    return;
  }
  function flashCopyMessage(el, msg) {
    el.textContent = msg;
    setTimeout(function() {
      el.textContent = "Copy";
    }, 1000);
  }
  function selectText(node) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }
  function addCopyButton(containerEl) {
    var copyBtn = document.createElement("button");
    copyBtn.className = "highlight-copy-btn";
    copyBtn.textContent = "Copy";
    var codeEl = containerEl.firstElementChild;
    copyBtn.addEventListener('click', function() {
      try {
        var selection = selectText(codeEl);
        document.execCommand('copy');
        selection.removeAllRanges();
        flashCopyMessage(copyBtn, 'Copied!')
      } catch(e) {
        console && console.log(e);
        flashCopyMessage(copyBtn, 'Failed :\'(')
      }
    });
    containerEl.appendChild(copyBtn);
  }
// Add copy button to code blocks
  var highlightBlocks = document.getElementsByClassName('codeblock');
  Array.prototype.forEach.call(highlightBlocks, addCopyButton);
})();
//end copy-to-clipboard
//language-shell codeblock hljs
//language-c++ codeblock hljs language-c
//language-cpp codeblock hljs
//language-python codeblock hljs