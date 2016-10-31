(function() {
  'use strict';

  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#files').on('change', function(event) {
      var file = event.target.files[0];
      console.log(file);

      var reader = new FileReader();

      reader.onload = (function(theFile) {
        console.log(theFile);
        return function(e) {
          console.log(e.target.result);
          JSON.parse(e.target.result).forEach(function(element) {
            console.log(element);
            $('#list').append(`<${element.tag}></${element.tag}>`);
          });
        };
      })(file);

      reader.readAsText(file);

    });
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }


}());
