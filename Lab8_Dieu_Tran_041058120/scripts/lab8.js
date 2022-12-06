// $(document).ready(function () {});

// #1. select the h1 element, use the .text() function to change the content of the h1 element to Lab08b

$(document).ready(function () {
  var newContent = "Lab08b";
  $("h1").text(newContent);

  // #2. select the element with id=”header”, use .html() function to add the html code to create an h3 element
  //  and set its content to “Working with jQuery”.

  $("#header").html("<h3>Working with Jquery</h3>");

  // #3. select all the elements that have the attribute type=”button”, use the jQuery .each() function
  // and the .addClass() function to change the background colour of the selected elements
  // (use class .btn-background found in the style.css file)

  $("input[type='button']").addClass("btn-background");

  // #4. select the element with id=”buttons”,
  // use .addClass() function to add a red border (use the .red-border style found in the style.css file)

  $("#buttons").addClass("red-border");

  // #5. select all the “p” elements, use .each() function and the .addClass() function to
  //  change the font color to blue (use the .blue style found in the style.css file)

  $("p").addClass("blue");

  // #6. select the element with id=”first”, use .on() method to add a “click” event to the selected element.
  // // The event will add a green border around the first paragraph
  // // using the jQuery :first filter(use the .green-border style found in the style.css file)

  $("#first").on("click", function () {
    $("#para1").addClass("green-border");
  });
  // #7. select the element with id=”last”, use .on() method to add a “click” event to theselected element. The event will add an orange border around the last paragraph
  // usingthe jQuery :last filter (use the .orange-border style found in the style.css file)

  $("#last").on("click", function () {
    $("p:last").addClass("green-border");
  });

  // #8. select the element with id=”prev”, use .on() method to add a “click” event to theselected element.
  // The event will select the element with id=”para3” and using the.prev() methodwill add a purple border
  // round the previous paragraph (use the .purple-border style found in the style.css file)

  $("#prev").on("click", function () {
    $("#para3").addClass("purple-border");
  });

  // #9. select the element with id=”next”, use .on() method to add a “click” event to theselected element.
  //  The event will select the element with id=”para2” and using the.next() method will
  //  add a yellow border around the next paragraph (use the .yellow-border style found in the style.css file)

  $("#next").on("click", function () {
    $("#para2").addClass("yellow-border");
  });

  // #10. select the element with id=”remove”, use the jQuery .on() method to
  // add a “click”event to the selected element. The event will use the jQuery .remove() function
  // toremove the element with the id=”footer”.

  $("#remove").on("click", function () {
    $("#footer").remove();
  });
});
