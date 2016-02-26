/**
 * Created by slavic on 2/24/16.
 * A jQuery plugin to work on top of html5 browser validation.
 * Provides server validation, password confirmation validation..
 */

(function($) {
    $.fn.html5Validate = function(param, param2) {

        switch (param) {
            case "showErrors":
                showErrors.call(this,param2);
                break;
            default:
                var toValidate = param;
                var form = this;
                for (let field in toValidate) {
                    let validators = toValidate[field];

                    $(form).find("[name='" + field + "']").on("input", function(e){
                        var input = this;
                        input.setCustomValidity("");
                        $(input).removeClass("error");

                        for (var i=0; i<validators.length; i++) {
                            let validator = validators[i];
                            switch (validator.type) {
                                case "server":
                                    serverValidate(input, validator);
                                    break;
                                case "match":
                                    matchValidate(input, validator);
                                    break;
                            }
                        }
                    });
                }
                break;
        }

        function serverValidate(input, params) {
            if (input.validity.valid) {
                input.setCustomValidity("checking this...");
                $.get(
                    $(input).data("validate-url"),
                    {email: $(input).val()},
                    function(resp) {
                        if (resp.valid) {
                            input.setCustomValidity("");
                            $(input).removeClass("error");
                            console.log(input.name + " input valid");
                        } else {
                            console.log(input.name + " input invalid");
                            input.setCustomValidity(resp.message);
                            $(input).addClass("error");
                        }
                    },
                    "json"
                );
            }
        }

        function matchValidate(input, params){
            if (input.validity.valid) {
                var compareTo = $(input).parents("form").find("[name='" + params.compare + "']");
                console.log(compareTo.val(), $(input).val());
                if (compareTo.val() != $(input).val()) {
                    var message = params.message ? params.message : "These should match!";
                    compareTo[0].setCustomValidity(message);
                    $(input).addClass("error");
                } else {
                    compareTo[0].setCustomValidity("");
                    $(input).removeClass("error");
                    $(compareTo).removeClass("error");
                }
            }
        }

        function showErrors(errors) {
            for (var i in errors) {
                $(this).find("[name='" + i + "']").addClass("error")[0].setCustomValidity(errors[i][0]);
            }
            $(this).find("button[type='submit']").click();
        }
    }
}(jQuery));
