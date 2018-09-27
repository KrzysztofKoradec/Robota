/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 Jörn Zaefferer; Licensed MIT */
! function (a) {
  "function" == typeof define && define.amd ? define(["jquery", "../jquery.validate.min"], a) : a(jQuery)
}(function (a) {
  a.extend(a.validator.messages, {
    required: "Dane wymagane.",
    remote: "Wypełnij to pole.",
    email: "Podaj prawidłowy adres email.",
    url: "Podaj prawidłowy URL.",
    date: "Podaj prawidłową datę.",
    dateISO: "Podaj prawidłową datę (ISO).",
    number: "Podaj prawidłową liczbę.",
    digits: "Podaj same cyfry.",
    creditcard: "Podaj prawidłową kartę kredytową.",
    equalTo: "Podaj tą samą wartość ponownie.",
    extension: "Podaj wartość z prawidłowym rozszerzeniem.",
    maxlength: a.validator.format("Podaj nie więcej niż {0} znaków."),
    minlength: a.validator.format("Podaj przynajmniej {0} znaków."),
    rangelength: a.validator.format("Podaj wartość o długości od {0} do {1} znaków."),
    range: a.validator.format("Podaj wartość z przedziału od {0} do {1}."),
    max: a.validator.format("Podaj wartość mniejszą bądź równą {0}."),
    min: a.validator.format("Podaj wartość większą bądź równą {0}.")
  })
});
