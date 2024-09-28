
/* Shwas
   Author: Hardik
   Author e-mail: hardiknavadiya77@gmail.com
   Version: 1.0.0
   Created:
   File Description: JS file for contact
*/


/* ------------------------------------------------------------------------------
 
 ------------------------------------------------------------------------------ */
//var $ = jQuery.noConflict(); //Relinquish jQuery's control of the $ variable. 

/* Global constants */

/*global jQuery */
jQuery(function ($) {
    'use strict';

    /**
     * Contact Form Application
     */
    var ContactFormApp = {
        $contactForm: $("#contact_form"),
        $contactFormBtn: $("#send"),
        $contactFormName: $("#name"),
        $contactFormEmail: $("#email"),
        $contactFormNumber: $("#number"),
        $contactFormMessage: $("#message"),
        $confirmMessage: $("#ajaxsuccess"),
        $errorMessages: $("#error"),
        $errorName: $("#name_error"),
        $errorEmail: $("#email_error"),
        $errorMessage: $("#message_error"),
        $errorNumber: $("#number_error"),

        //Validate Contact Us Data
        validate: function () {
            var error = false; // we will set this true if the form isn't valid

            var name = this.$contactFormName.val(); // get the value of the input field
            if(name == "" || name == " " || name == "Name") {
                this.$errorName.show(500);
                this.$errorName.delay(4000);
                this.$errorName.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                }); 
                error = true; // change the error state to true
            }

            var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
            var email = this.$contactFormEmail.val().toLowerCase(); // get the value of the input field

            if (email == "" || email == " " || email == "E-mail") { // check if the field is empty
                this.$errorEmail.show(500);
                this.$errorEmail.delay(4000);
                this.$errorEmail.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });         
                error = true;
            }
            else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
                this.$errorEmail.show(500);
                this.$errorEmail.delay(4000);
                this.$errorEmail.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });         
                error = true;
            }

            var message = this.$contactFormMessage.val(); // get the value of the input field
            
            if(message == "" || message == " " || message == "Message") {              
                this.$errorMessage.show(500);
                this.$errorMessage.delay(4000);
                this.$errorMessage.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });            
                error = true; // change the error state to true
            }

            //contact
            var number = this.$contactFormNumber.val(); // get the value of the input field
            if(number == "" || number == " ") {              
                this.$errorNumber.show(500);
                this.$errorNumber.delay(4000);
                this.$errorNumber.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });            
                error = true; // change the error state to true
            }
            return error;
        },
        //contact form submit handler
        contactFormSubmit: function (obj) {
            this.$errorMessages.fadeOut('slow'); // reset the error messages (hides them)

            if(this.validate() == false) {

                var data_string = $('#contact_form').serialize(); // Collect data from form

                var $this = this;
                $.blockUI({ css: { 
                    border: 'none', 
                    padding: '15px', 
                    backgroundColor: '#000', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: .5, 
                    color: '#fff' 
                } }); 
                $.ajax({
                    type: "POST",
                    url: $this.$contactForm.attr('action'),
                    data: data_string,
                    timeout: 6000,
                    error: function(request,error) {
                        setTimeout($.unblockUI, 200);  
                        $this.$errorMessages.show(500);
                        $this.$errorMessages.delay(4000);
                        $this.$errorMessages.animate({
                            height: 'toggle'  
                            }, 500, function() {
                        }); 
                    },
                    success: function(data) {
                        if(data == 'success') {
                            $this.$confirmMessage.show(500);
                            $this.$confirmMessage.delay(4000);
                            $this.$confirmMessage.animate({
                                height: 'toggle'  
                                }, 500, function() {
                            });    
                            
                            $this.$contactFormName.val('');
                            $this.$contactFormEmail.val('');
                            $this.$contactFormMessage.val('');
                            $this.$contactFormNumber.val('');

                            setTimeout($.unblockUI, 200); 
                        } else {
                            console.log(data);
                            $this.$errorMessages.show(500);
                            $this.$errorMessages.delay(4000);
                            $this.$errorMessages.animate({
                                height: 'toggle'  
                                }, 500, function() {
                            }); 

                            setTimeout($.unblockUI, 200);  
                        }
                    }
                });
            }
            return false;
        },
        bindEvents: function () {
            //binding submit event
            this.$contactFormBtn.on('click', this.contactFormSubmit.bind(this));
        },
        init: function () {
            //initializing the contact form
            //console.log('Contact form is initialized');
            this.bindEvents();
            return this;
        }
    };

    //Initializing the app
    ContactFormApp.init({});
});