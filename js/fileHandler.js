$(document).ready(function() {
  $('html,body').scrollTop(0);
  //remove this later 
  var dropArea = $("#dropArea");
  dropArea.bind({
    dragover: function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    },
    drop: function(evt) {
      handleFileTransfer(evt);
    }
  });
});
handleFileTransfer = function(evt){
  evt = evt.originalEvent;
  evt.stopPropagation();
  evt.preventDefault();

  var eventFiles = evt.dataTransfer.files;
  //make sure we only got one file
  if(eventFiles.length > 1){
    alert("Please drop only one file");
    return;
  }
  var droppedFile = eventFiles[0];
  readFile(droppedFile, function(fileText){
    fileText = fileText.target.result;
    $("#bgChart").remove();
    $("#part1").remove();
    $("#part3").css("visibility", "visible");
    $("body").css("overflow", "visible");

    displayData(fileText);
  });
}
function readFile(file, onLoadCallback){
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
}
