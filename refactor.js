(function() {
  'use strict';

  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#files').on('change', function(event) {
      $('#output').empty();
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          var fileArray = JSON.parse(e.target.result);
          var fileArrayLength = fileArray.length;

          function recursion(object, stack, tags, index) {
            for (var property in object) {
              if (object.hasOwnProperty(property)) {

                // if (typeof object[property] === 'object' && object[property].length) {
                //   // for each or something here
                // }

                if (typeof object[property] === 'object') {
                  recursion(object[property], stack + '.' + property, tags, index);
                }

                else if (typeof object[property] === 'string' && property === 'content') {
                  $(`${tags[index]}:last-of-type`).append(object[property]);
                }

                else {
                  tags.push(object[property]);

                  $(`${tags[index]}:last-of-type`).append(`<${object[property]}></${object[property]}>`);

                  index++;
                }
              }
            }
          }
          fileArray.forEach(function(object) {
            var tags = ['#output'];
            var index = 0;
            recursion(object, '', tags, index);
          });
        };
      })(file);
      reader.readAsText(file);
    });
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
}());
