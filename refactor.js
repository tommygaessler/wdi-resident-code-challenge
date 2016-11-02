// the immediately invoked function expresson is called on page load
(function() {
  'use strict';

  // checks to see if file api is supported
  if (window.File && window.FileReader && window.FileList && window.Blob) {

    // event listener function that fires when a file is selected
    $('#files').on('change', function(event) {

      // empties the previous file
      $('#output').empty();

      // grabs the uploaded file
      var file = event.target.files[0];

      // creates instances of the FileReader constructor
      var reader = new FileReader();

      // when file is loaded the file is passed in
      reader.onload = (function(theFile) {
        return function(e) {

          // grabs and parses the files content as JSON
          var fileArray = JSON.parse(e.target.result);

          // grabs the length of the array
          var fileArrayLength = fileArray.length;

          function recursion(object, stack, tags, index) {

            // loops through the keys of object
            for (var property in object) {

              // if object has property continue
              if (object.hasOwnProperty(property)) {

                // if the content is an array re call the recursion function on the object inside the array
                if (typeof object[property] === 'object' && object[property].length) {
                  object[property].forEach(function(obj) {
                    tags = [`${tags[index]}`];
                    index = 0;
                    recursion(obj, '', tags, index);
                  });
                }

                // if the object is an object recall the recursion function passing in the key and content
                else if (typeof object[property] === 'object') {
                  recursion(object[property], stack + '.' + property, tags, index);
                }

                // if the content is a string render to dom inside the current tag, use last of type to make sure content goes in right tag
                else if (typeof object[property] === 'string' && property === 'content') {
                  $(`#output ${tags[index]}:last-of-type`).append(object[property]);
                }

                // if the content is an object push the tag in the tags array to be referenced next time the function is called and append the tag to the parent tag
                else {
                  // pushes tag so we can use later as parent tag
                  tags.push(object[property]);

                  // appends child tag to parent tag
                  $(`${tags[index]}:last-of-type`).append(`<${object[property]}></${object[property]}>`);

                  // increase the index so next time it runs the child gets pushed in correct parent
                  index++;
                }
              }
            }
          }
          // runs the recursion function on each object in the array
          fileArray.forEach(function(object) {
            // defines/clears the append target
            var tags = ['#output'];
            // defines/clears the counter or index
            var index = 0;
            // passes in the each object, empty string, the tags array, and counter/index
            recursion(object, '', tags, index);
          });
        };
      })(file);

      // fires the reader.onload function, the file is passed in
      reader.readAsText(file);
    });
  } else {
    // alert user the browser is not supported
    alert('The File APIs are not fully supported in this browser.');
  }
}());
