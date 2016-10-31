(function() {
  'use strict';

  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#files').on('change', function(event) {
      var file = event.target.files[0];
      // console.log(file);

      var reader = new FileReader();

      reader.onload = (function(theFile) {
        // console.log(theFile);
        return function(e) {
          // console.log(e.target.result);
          JSON.parse(e.target.result).forEach(function(parentElement, index) {
            // console.log(parentElement);
            $('#list').append(`<${parentElement.tag}></${parentElement.tag}>`);

            if (parentElement.content.length) {
              // another forEach because its an array
              // console.log('Array', parentElement.content);

              parentElement.content.forEach(function(childElement) {
                // console.log(typeof childElement.content);

                if (typeof childElement.content === 'string') {
                  // console.log('string', childElement.content);
                  // add 1 to nth child beacuse it is 1 based index not 0
                  $(`${parentElement.tag}:nth-child(${index+1})`).append(`<${childElement.tag}>${childElement.content}</${childElement.tag}>`);

                } else {
                  // console.log('array', childElement);

                  $(`${parentElement.tag}:nth-child(${index+1})`).append(`<${childElement.tag}></${childElement.tag}>`);

                  childElement.content.forEach(function(innerElement) {
                    $(`${childElement.tag}`).append(`<${innerElement.tag}>${innerElement.content}</${innerElement.tag}>`);
                  });
                }
              });
            } else {
              // write to dom

              if (typeof parentElement.content.content == 'object') {
                parentElement.content.content.forEach(function(childElement) {
                  // console.log(childElement);

                  $(`${parentElement.tag}:nth-child(${index+1})`)
                  .append(`<${childElement.tag}>${childElement.content}</${childElement.tag}>`);
                });
              } else {
                $(`${parentElement.tag}:nth-child(${index+1})`)
                .append(`<${parentElement.content.tag}>${parentElement.content.content}</${parentElement.content.tag}>`);
              }
            }
          });
        };
      })(file);

      reader.readAsText(file);

    });
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
}());
