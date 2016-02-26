# html5Validate
A jQuery plugin that works on top of html5 constraint validation API

## how to use
```javascript
$("#register-form").html5Validate({
    email: [{type: "server"}],
    password: [{type: "match", compare: "password_confirmation"}],
    password_confirmation: [{type: "match", compare: "password"}],
});
```
