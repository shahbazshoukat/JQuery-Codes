//Step 1: function add in jQuery
//Step 2: Default Settings
//Step 3: this.each
//Step 4: Write your plugin code


//Here Creating an anonymous function and calling it on the spot (at end of code) by providing 'jQuery' as input
/*
(function ($) {

})(jQuery);
*/

(function ($) {

    //jQuery plugin is a function and we need to add to '$.fn' object.
    //Here bseditable is our plugin/function name which is taking 'options' as input parameter
    $.fn.bseditable = function (options) {

        //here we created an object 'default' which holds our default settings
        var defaults = {
            closeText: 'Cancel',
            saveText: 'Save',
            onCancel: function () {
                //alert('closing');
            },
            onSave: function () {
                //alert('saving'); 
            }
        };

        //Merge 'defaults' object with 'options' object. here matching properities of 'defaults' will be overridden by 'options' values
        var opt = $.extend(defaults, options);

        //This plugin will be called on a selector, if selector is returning multiple values, we need to iterate all those items
        //here this is reference to the selectors result

        return this.each(function () {

            //Bind click event, user will click on the element to make it editable
            $(this).bind("click", function () {

                //Get span object in a variable
                var $span = $(this);

                //Create a dummy div to wrap html controls
                var $dummydiv = $("<div>");
                //Create a textbox
                var $textBox = $("<input>").attr("type", "text");

                //Get text from our selector element/span
                var spText = $span.text(); //Get Text from Span
                //Trim the text
                spText = $.trim(spText); //Trim spaces 
                //Set value in created text box
                $textBox.val(spText); //Set span text value in Textbox

                //Append textbox in dummy div                
                $dummydiv.append($textBox);

                //Create save button which will get value from text box and will set to span
                var $save = $("<button>");
                //set text by using text available in options
                $save.text(opt.saveText);
                //Append Save button in dummy div
                $dummydiv.append($save);

                //Bind click event of Save button
                $save.bind("click", function (obj, e) {

                    //find textbox in current div
                    var $text = $(this).closest("div").find("input");
                    //Set text box value back to span
                    $span.text($text.val()); 
                    //make span visible
                    $span.show();
                    //remove dummy created div
                    $(this).closest("div").remove(); 

                    //call onSave call backs if it exists
                    if (opt.onSave != undefined)
                        opt.onSave();

                    return false;
                });

                //Create cancel button to remove input controls and show Span again
                var $cancel = $("<button>");
                //Set text from options
                $cancel.text(opt.closeText);
                //Append it to dummy div
                $dummydiv.append($cancel);

                //Bind click event on cancel button
                $cancel.bind("click", function (obj, e) {
                    //make span visible
                    $span.show();
                    //Remove dummy div
                    $(this).closest("div").remove();

                    //Raise onCancel event if it exists
                    if (opt.onCancel != undefined)
                        opt.onCancel();

                    return false;
                }); //End of Cancel event handler

                //Hide span
                $span.hide();

                //Append this newly created div in our wrapper div
                $span.closest("div.editablewrapper").append($dummydiv);

            });    // End of Span Click bind        

        }); //End of Each

    }; //End of plugin


})(jQuery);


