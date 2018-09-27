/*	Table OF Contents
 ==========================
 Carousel
 Ajax Tab
 List view , Grid view  and compact view
 Global Plugins
 Customs Script
 responsive cat-collapse for homepage
 */


(function () {

  /*==================================
   Carousel
   ====================================*/

  // Featured Listings  carousel || HOME PAGE
  var owlitem = $(".item-carousel");

  owlitem.owlCarousel({
    //navigation : true, // Show next and prev buttons
    navigation: false,
    pagination: true,
    items: 5,
    itemsDesktopSmall: [979, 3],
    itemsTablet: [768, 3],
    itemsTabletSmall: [660, 2],
    itemsMobile: [400, 1]

  });

  // Custom Navigation Events
  $("#nextItem").click(function () {
    owlitem.trigger('owl.next');
  });
  $("#prevItem").click(function () {
    owlitem.trigger('owl.prev');
  });


  // Featured Listings  carousel || HOME PAGE
  var featuredListSlider = $(".featured-list-slider");

  featuredListSlider.owlCarousel({
    //navigation : true, // Show next and prev buttons
    navigation: false,
    pagination: false,
    items: 5,
    itemsDesktopSmall: [979, 3],
    itemsTablet: [768, 3],
    itemsTabletSmall: [660, 2],
    itemsMobile: [400, 1]


  });

  // Custom Navigation Events
  $(".featured-list-row .next").click(function () {
    featuredListSlider.trigger('owl.next');
  });

  $(".featured-list-row .prev").click(function () {
    featuredListSlider.trigger('owl.prev');
  });


  /*==================================
   Ajax Tab || CATEGORY PAGE
   ====================================*/


  $("#ajaxTabs li > a").click(function () {

    $("#allAds").empty().append("<div id='loading text-center'> <br> <img class='center-block' src='images/loading.gif' alt='Loading' /> <br> </div>");
    $("#ajaxTabs li").removeClass('active');
    $(this).parent('li').addClass('active');
    $.ajax({
      url: this.href,
      success: function (html) {
        $("#allAds").empty().append(html);
        $('.tooltipHere').tooltip('hide');
      }
    });
    return false;
  });

  urls = $('#ajaxTabs li:first-child a').attr("href");
  //alert(urls);
  $("#allAds").empty().append("<div id='loading text-center'> <br> <img class='center-block' src='images/loading.gif' alt='Loading' /> <br>  </div>");
  $.ajax({
    url: urls,
    success: function (html) {
      $("#allAds").empty().append(html);
      $('.tooltipHere').tooltip('hide');

      // default grid view class invoke into ajax content (product item)
      $(function () {
        $('.hasGridView .item-list').addClass('make-grid');
        $('.hasGridView .item-list').matchHeight();
        $.fn.matchHeight._apply('.hasGridView .item-list');
      });
    }
  });


  /*==================================
   List view clickable || CATEGORY
   ====================================*/

  // List view , Grid view  and compact view

  //  var selector doesn't work on ajax tab category.hhml. This variables elements disable for V1.6
  //  var listItem = $('.item-list');
  //  var addDescBox = $('.item-list .add-desc-box');
  //  var addsWrapper = $('.adds-wrapper');

  $('.list-view,#ajaxTabs li a').click(function (e) { //use a class, since your ID gets mangled
    e.preventDefault();
    $('.grid-view,.compact-view').removeClass("active");
    $('.list-view').addClass("active");
    $('.item-list').addClass("make-list").removeClass("make-grid make-compact");


    if ($('.adds-wrapper').hasClass('property-list')) {
      $('.item-list .add-desc-box').removeClass("col-sm-9").addClass("col-sm-6");
    } else {
      $('.item-list .add-desc-box').removeClass("col-sm-9").addClass("col-sm-7");
    }

    $(function () {
      $('.item-list').matchHeight('remove');
    });
  });

  $('.grid-view').click(function (e) { //use a class, since your ID gets mangled
    e.preventDefault();
    $('.list-view,.compact-view').removeClass("active");
    $(this).addClass("active");
    $('.item-list').addClass("make-grid").removeClass("make-list make-compact");


    if ($('.adds-wrapper').hasClass('property-list')) {
      // keep it for future
    } else {
      //
    }

    $(function () {
      $('.item-list').matchHeight();
      $.fn.matchHeight._apply('.item-list');
    });

  });

  $(function () {
    $('.hasGridView .item-list').matchHeight();
    $.fn.matchHeight._apply('.hasGridView .item-list');
  });

  $(function () {
    $('.row-featured .f-category').matchHeight();
    $.fn.matchHeight._apply('.row-featured .f-category');
  });

  $(function () {
    $('.has-equal-div > div').matchHeight();
    $.fn.matchHeight._apply('.row-featured .f-category');
  });


  $('.compact-view').click(function (e) { //use a class, since your ID gets mangled
    e.preventDefault();
    $('.list-view,.grid-view').removeClass("active");
    $(this).addClass("active");
    $('.item-list').addClass("make-compact").removeClass("make-list make-grid");


    if ($('.adds-wrapper').hasClass('property-list')) {
      $('.item-list .add-desc-box').addClass("col-sm-9").removeClass('col-sm-6');
    } else {
      $('.item-list .add-desc-box').toggleClass("col-sm-9 col-sm-7");
    }

    $(function () {
      $('.adds-wrapper .item-list').matchHeight('remove');
    });
  });


  /*==================================
   Global Plugins ||
   ====================================*/

  $('.long-list').hideMaxListItems({
    'max': 8,
    'speed': 500,
    'moreText': 'View More ([COUNT])'
  });


  $('.long-list-user').hideMaxListItems({
    'max': 12,
    'speed': 500,
    'moreText': 'View More ([COUNT])'
  });


  $(function () {
    $('[data-toggle="tooltip"], [data-tooltip="true"]').tooltip({
      html: true
    });

    $('[data-toggle="custom-tooltip"]').tooltip({
      html: true,
      template: '<div class="tooltip custom-tooltip" role="tooltip">' +
        '<div class="tooltip-arrow"></div>' +
        '<div class="wrap">' +
        '<i class="fa fa-info-circle"></i>' +
        '<div class="tooltip-inner"></div>' +
        '</div>' +
        '</div>'
    });
  });


  $("select.selecter").niceSelect({ // custom scroll select plugin
  });


  $(".selectpicker").niceSelect({ // category list Short by
    // customClass: "select-sort-by"
  });


  // smooth scroll to the ID
  $(document).on('click', 'a.scrollto', function (event) {
    event.preventDefault();
    var top = $($.attr(this, 'href')).offset().top - $('.navbar-site').outerHeight();

    $('html, body').animate({
      scrollTop: top
    }, 500);
  });


  /*=======================================================================================
   cat-collapse Homepage Category Responsive view
   ========================================================================================*/


  $(window).bind('resize load', function () {


    if ($(this).width() < 767) {

      $('.cat-collapse').collapse('hide');

      $('.cat-collapse').on('shown.bs.collapse', function () {
        $(this).prev('.cat-title').find('.icon-down-open-big').addClass("active-panel");
        //$(this).prev('.cat-title').find('.icon-down-open-big').toggleClass('icon-down-open-big icon-up-open-big');
      });

      $('.cat-collapse').on('hidden.bs.collapse', function () {
        $(this).prev('.cat-title').find('.icon-down-open-big').removeClass("active-panel");
      })

    } else {

      $('.cat-collapse').removeClass('out').addClass('in').css('height', 'auto');

    }

  });

  // DEMO PREVIEW

  $(".tbtn").click(function () {
    $('.themeControll').toggleClass('active')
  });

  // jobs

  // $("input:radio").click(function () {
  //     if ($('input:radio#job-seeker:checked').length > 0) {
  //         $('.forJobSeeker').removeClass('hide');
  //         $('.forJobFinder').addClass('hide');
  //     } else {
  //         $('.forJobFinder').removeClass('hide');
  //         $('.forJobSeeker').addClass('hide')
  //     }

  // });

  $(".filter-toggle").click(function () {
    $('.mobile-filter-sidebar').prepend("<div class='closeFilter'>X</div>");
    $(".mobile-filter-sidebar").animate({
      "left": "0"
    }, 250, "linear", function () {});
    $('.menu-overly-mask').addClass('is-visible');
  });

  $(".menu-overly-mask").click(function () {
    $(".mobile-filter-sidebar").animate({
      "left": "-251px"
    }, 250, "linear", function () {});
    $('.menu-overly-mask').removeClass('is-visible');
  });


  $(document).on('click', '.closeFilter', function () {
    $(".mobile-filter-sidebar").animate({
      "left": "-251px"
    }, 250, "linear", function () {});
    $('.menu-overly-mask').removeClass('is-visible');
  });


  // cityName will replace with selected location/area from location modal

  $('#selectRegion').on('shown.bs.modal', function (e) {
    // alert('Modal is successfully shown!');
    $("ul.list-link li a").click(function () {
      $('ul.list-link li a').removeClass('active');
      $(this).addClass('active');
      $(".cityName").text($(this).text());
      $('#selectRegion').modal('hide');
    });
  });


  //


  $("#checkAll").click(function () {
    $('.add-img-selector input:checkbox').not(this).prop('checked', this.checked);
  });

  $(".scrollbar").niceScroll(); // let's do the magic!

})(); // end Ready




// CUSTOM SCRIPTS

(function () {

  // Reset all forms on refresh
  document.querySelectorAll('form').forEach(function(item) {
    item.reset();
  });

  // Prevent from closing
  $(document).on('click', '.dropdown', function (e) {
    e.stopPropagation();
  });

  // input upload img
  $(".input-upload-img").fileinput();

  // podwojne zamykanie oferty
  $("#oferta_content").on('hide.bs.collapse', function () {
    $("#oferta_edit_button").attr('data-target', '#oferta_content');
  });
  $("#oferta_content").on('shown.bs.collapse', function () {
    $("#oferta_edit_button").attr('data-target', '#oferta_edit_form');
  });


  // lokalizacja dropdown
  var lista = $("#lokalizacjaDropdown");
  var def = $('#lokalizacjaDefault');
  var miasto = $('#lokalizacjaMiasto');
  var wojew = $('#lokalizacjaWojew');

  lista.find('input').on('input', function () {
    def.hide();
    if (wojew.text().length == 0)
      wojew.text('Cała Polska: ');
    miasto.text($(this).val());
  });

  lista.find('select').on('change', function () {
    def.hide();
    wojew.text($(this).val() + ': ');
  });


  // Navbar - zamykaj pozostale collapse
  $('.navbar-collapse-together').on('show.bs.collapse', function () {
    var id = $(this).attr('id');
    $('.navbar-collapse-together:not(' + id + ')').collapse('hide');
    $('.navbar-nav .lang-menu.open').find('.dropdown-toggle').dropdown('toggle');
  });

  $('.navbar-nav .lang-menu').on('show.bs.dropdown', function () {
    $('.navbar-collapse-together').collapse('hide');
  });


  // Select show more
  function showMoreFunction () {
    var target = $(this).attr('data-target');
    $(target).removeAttr('hidden');
  }

  $('select.show-more').one('change', showMoreFunction);
  $('input.show-more').one('input', showMoreFunction);



  // Show more when valid input
  $('.show-more-when-valid').on('input', function() {
    if ($(this).valid()) {
      $($(this).attr('data-target')).removeAttr('hidden');
    }
    else {
      $($(this).attr('data-target')).attr('hidden', true);
    }
  })


  // close collapse
  $('[data-toggle="close-collapse"]').on('click', function () {
    var target = $($(this).attr('data-target'));
    if (target.hasClass('in')) target.collapse('hide');
  });

  $('[data-close-collapse]').on('click', function () {
    var target = $($(this).attr('data-close-collapse'));
    if (target.hasClass('in')) target.collapse('hide');
  });

  // open collapse
  $('[data-toggle="open-collapse"]').on('click', function () {
    var target = $($(this).attr('data-target'));
    target.collapse('show');
  });

  // data-show
  $('[data-show]').on('click', function () {
    var target = $($(this).attr('data-show'));
    target.removeAttr('hidden');
  });

  // data-hide
  $('[data-hide]').on('click', function () {
    var target = $($(this).attr('data-hide'));
    target.attr('hidden', true);
  });


  // collapse with required form inputs
  $('.collapse-form-inputs').on('show.bs.collapse', function () {
    $(this).find('.required, .make-required').attr('required', 'required').attr('aria-required', 'true');
  });
  $('.collapse-form-inputs').on('hide.bs.collapse', function () {
    $(this).find('.required, .make-required').removeAttr('required').removeAttr('aria-required');
  });


  // collapse on radio buttons
  $('.radio-collapse').on('click', function (e) {
    // e.stopPropagation();
    var target = $($(this).attr('data-target'));
    var input = $(this).find('input');

    if (target.hasClass('in')) {
      input[0].checked = true;
      return false;
    }
  });


  // toggle navbar menu trigger icon on click
  $('.toggle-icon.navbar-toggle').on('click', function () {
    $(this).find('.fa').toggleClass('active');
  });


  // radio change active state
  $(".radio-change-active").each(function () {
    var wrap = $(this);
    wrap.find('input[type="radio"]').on('change', function () {
      wrap.find('label.active').removeClass('active');
      $(this).parent().addClass('active');
    });
  });



  // CKEDITOR on mobile
  var isEditor = false;
  if (typeof CKEDITOR !== 'undefined') {
    if (window.matchMedia('(min-width: 768px)').matches) {
      CKEDITOR.replace('text_editor');
      isEditor = true;
    }

    $(window).resize(function () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        // for (const prop in CKEDITOR.instaces) {
        //     prop.destroy();
        // }
        if (CKEDITOR.instances.text_editor) {
          CKEDITOR.instances.text_editor.destroy();
          isEditor = false;
        }
      } else {
        if (!CKEDITOR.instances.text_editor) {
          CKEDITOR.replace('text_editor');
          isEditor = true;
        }
      }
    });
  }


  // form validation
  $("form").each(function (index, el) {
    var form = $(this);
    var flag = false;
    if (form.hasClass('form-validate-bottom'))
      flag = true;

    form.validate({
      ignore: "input:hidden:not(input:hidden.required)",
      focusInvalid: false,

      invalidHandler: function (form, validator) {
        if (!validator.numberOfInvalids()) return;
        var navbar = $('.navbar-site').outerHeight();

        if (isEditor && validator.errorList[0].element.id == 'text_editor') {
          $('html, body').animate({
            scrollTop: $('#cke_text_editor').offset().top - navbar
          }, 500);
        } else {
          $('html, body').animate({
            scrollTop: $(validator.errorList[0].element).offset().top - navbar
          }, 500);
        }

        validator.errorList[0].element.focus();
      },

      onfocusout: function (element) {
        if (flag == false)
          $(element).valid();
        else
          return false;
      },

      errorPlacement: function (error, element) {
        if (flag == true) {
          var alert = form.find('.alert.alert-danger');
          alert.fadeIn(300);
          // return;
        }
        if (element.attr('type') == 'checkbox' || element.attr('type') == 'radio') {
          if (element.parent().hasClass('radio-inline') || element.parent().hasClass('checkbox-inline'))
            error.appendTo(element.parent().parent());
          else if (element.hasClass('nested-collapse-input'))
            error.insertAfter(element.parent().parent().parent());
          else
            error.appendTo(element.parent().parent().parent());
          error.css({
            'display': 'block',
            'clear': 'both'
          });
          return;
        }
        if (element.hasClass('select-half')) {
          error.appendTo(element.parent());
          error.addClass('select-half');
          return;
        }
        if (element.parent().hasClass('input-group')) {
          error.insertAfter(element.parent());
          return;
        }
        // else {
        error.appendTo(element.parent());
        // }
      },

      submitHandler: function (x) {
        if (!form.hasClass('register-form')) {
          if (form.hasClass('do-schowka')) {
            form.find('.alert.alert-success').html('<strong>Sukces!</strong> Twoje ogłoszenie zostało zapisane w folderze „w przygotowaniu”.');
          }
          if (form.hasClass('modal-confirm')) {
            $(form.attr('data-modal')).modal('toggle');
            // if (form.attr('id') == 'modalCategory-accordion') {
            //   var val = form.find('input[name="modalCategory-cat"]:checked').val();
            //   var btn = $(currentCatChangeBtn).find('.cat-choose-val');
            //   var input = $(currentCatChangeBtn).next('input');         
            //   input.val(val);
            //   input.trigger('input');
            //   btn.html(val);                         
            // }
            return false;
          }
          if (flag == true) {
            form.find('.alert-danger').hide();
            form.find('.alert-success').fadeIn(300);
            return false;
          }
          form.siblings('.alert').fadeIn(300);
          form.find('.alert-success').fadeIn(300);
          return false;
        } else {
          x.submit();
        }
      },

      rules: {
        "pocztowy": {
          pattern: /^[0-9]{2}-[0-9]{3}/
        },
        "kod_pocztowy": {
          pattern: /^[0-9]{2}-[0-9]{3}/
        },
        "nip": {
          pattern: /^[0-9]{10}/
        },
        "new_pass_again": {
          equalTo: "#new_pass"
        },
        "editor1": {
          required: {
            depends: function () {
              if (isEditor) {
                CKEDITOR.instances.text_editor.updateElement();
              }
              return true;
            }
          }
        }
      }

    });
  });

  // category modal
  $('form#modalCategory-accordion').each(function() {
    var form = $(this);

    form.find('input[type="radio"]').on('change', function() {
      var val = $(this).val();
      var btn = $(currentCatChangeBtn).find('.cat-choose-val');
      var input = $(currentCatChangeBtn).next('input'); 
      input.val(val);
      input.trigger('input');
      btn.html(val); 
      form.submit();
    });
  });

  // cat change btns
  var currentCatChangeBtn = '';
  $('.cat-change-trigger').on('click', function() {
    currentCatChangeBtn = '#' + this.id;
  });


  // do schowka
  $("button#do-schowka").on('click', function (event) {
    $("input:not(.required-do-schowka), select, textarea").each(function () {
      $(this).rules('add', {
        required: false
      });
    });
    $("form#dodawanie-ogloszenia").addClass('do-schowka').submit();
  });


  // input number sanitize
  $('input.number-sanitize').on('keydown', function (e) {
    if (!(
        (e.keyCode > 95 && e.keyCode < 109) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8 ||
        e.keyCode == 9 ||
        e.keyCode == 46 ||
        (e.keyCode >= 37 && e.keyCode <= 40)
      )) {
      e.preventDefault();
    }
    var val = $(this).val();
    if (
      (val.length >= 3) ||
      (e.keyCode != 8 && e.keyCode != 9 && e.keyCode != 46 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40)
    ) {
      return false;
    }
  });


  // only numbers input
  function funOnlyNumber (e) {        
    if (!(
        (e.keyCode > 95 && e.keyCode < 109) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        (e.keyCode >= 37 && e.keyCode <= 40) ||
        e.keyCode == 8 ||
        e.keyCode == 9 ||
        e.keyCode == 187 ||
        e.keyCode == 16 ||
        e.keyCode == 46
      )) e.preventDefault();
  }
  $('input.only-number').on('keydown', funOnlyNumber);
  $('input.only-numbers').on('keydown', funOnlyNumber);

  // number input buttons
  $('.number-input-group .num-change').on('click', function () {
    var input = $(this).siblings('input')[0];
    var val = Number(input.value);
    var min = Number(input.min);
    var max = Number(input.max);


    if (val > max) {
      input.value = max;
      return;
    }

    if (val < min) {
      input.value = min;
      return;
    }

    if ($(this).hasClass('decrease') && val > min) input.value--;
    if ($(this).hasClass('increase') && val < max) input.value++;
  });


  // liczenie zapłaty
  $("form.calc-payment").each(function(){
    var form = $(this);
    var totalElem = form.find('.payment-summary');
    var total = parseFloat(totalElem.html());
    var lastPriceSelcted = 0;

    function checkSum() {
      var payBtn = form.find('.payment-buttons');
      var pubBtn = form.find('.publish-button');
      if (total) {
        payBtn.removeAttr('hidden');
        pubBtn.attr('hidden', true);
      }
      else {
        pubBtn.removeAttr('hidden');
        payBtn.attr('hidden', true);
      }
    }

    form.find('.payment-select').on('change', function () {
      var thisPrice = parseFloat($(this).val());
      var priceLabel = $($(this).attr('data-price'));

      total -= lastPriceSelcted;
      total += thisPrice;   
      lastPriceSelcted = thisPrice;
      totalElem.html(total.toFixed(2)); 
      priceLabel.html(thisPrice.toFixed(2));

      checkSum();
    });
    
    form.find('.payment-input').on('change', function () { 
      var thisPrice = parseFloat($($(this).attr('data-price')).html());
      
      if (!$(this)[0].checked) {
        total -= thisPrice;   
        totalElem.html(total.toFixed(2)); 
        $(this)[0].checked = false;
      }
      else {
        $(this)[0].checked = true;
        total += thisPrice; 
        totalElem.html(total.toFixed(2)); 
      }

      checkSum();
    });

  });
  

  // var max = form.find('#d').attr('max');
  // var min = form.find('#d').attr('min');    

  // if (form.id = 'dodawanie-ogloszenia') {
  //   if (Number(e.val()) > 0 || Number(f.val()) > 0) {
  //     form.find('[type="submit"].additional-submit').show();
  //     form.find('[type="submit"]#submit_publikuj').hide();
  //   } else {
  //     form.find('[type="submit"].additional-submit').hide();
  //     form.find('[type="submit"]#submit_publikuj').show();
  //   }
  // }

  // if (a && b && c) {
  //   g.html(a + d - b);
  //   e.attr('max', a + d - b);
  //   h.html(a + d - c);
  //   f.attr('max', a + d - c);
  // } else {
  //   g.html(d);
  //   e.attr('max', d);
  //   h.html(d);
  //   f.attr('max', d);
    // }


  // przycisk do płatności sms #form-weryfikuj
  $("#form-weryfikuj input").on('change', function () {
    if ($("#form-weryfikuj input[name='na-okres']:checked").val() == 'dni7') {
      $('#plac-sms').show();
    } else {
      $('#plac-sms').hide();
    }
  });


  // przycisk do płatności sms #form-kredyty
  $("#form-kredyty input[name='ilosc_kredytow']").on('change', function () {
    if ($(this).val() != 7) {
      $('#plac-sms').hide();
    } else {
      $('#plac-sms').show();
    }
  });


  // nie zamykaj otwatych paneli przy scrollto
  $("a[data-toggle='collapse'].scrollto").on('click', function () {
    var target = $(this).attr('data-target');
    if ($(target).attr('aria-expanded') == 'true') {
      $(target).one('hide.bs.collapse', function (event) {
        return false;
      });
    }
  });


  // input file
  var inputs = document.querySelectorAll('.custom-file-input');
  Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
      labelVal = label.innerHTML;

    input.addEventListener('change', function (e) {
      var fileName = '';
      if (this.files && this.files.length > 1)
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      else
        fileName = e.target.value.split('\\').pop();

      if (fileName)
        label.querySelector('span').innerHTML = fileName;
      else
        label.innerHTML = labelVal;
    });
  });


  // inteligent inputs
  $(".form-group.inteligent-inputs").each(function () {
    var parent = $(this);
    var decisive = parent.find('input.decisive');
    var selectorStr = '';

    if (decisive.attr('type') == 'radio') {
      selectorStr = 'input:not([type="radio"]), textarea';
      decisive = parent.find('input[type="radio"][name="' + decisive.attr('name') + '"]');
    } else {
      selectorStr = 'input:not(.decisive), textarea';
    }

    decisive.on('change', function (event) {
      if (this.checked && $(this).hasClass('decisive')) {
        parent.find(selectorStr).each(function (index, el) {
          $(this).hide();
          this.value = '';
          this.required = false;
          $(this).attr('aria-required', 'false');
          $(this).removeClass('error');
        });
        parent.find('select').each(function (index, el) {
          $(this).hide();
          this.required = false;
          $(this).attr('aria-required', 'false');
          $(this).removeClass('error');
          $(this).find('option').each(function (index, el) {
            if (this.defaultSelected) {
              this.selected = true;
              return false;
            }
          });
        });
        parent.find('label.error').hide();
      } else {
        parent.find('.form-control, input, select, textarea').each(function (index, el) {
          $(this).show();
          if ($(this).hasClass('inteligent-required')) {
            this.required = true;
            $(this).attr('aria-required', 'true');
          }
        });
      }
    });
  });


  // nested collapse inputs
  $('input.nested-collapse-trigger').on('change', function (event) {
    var target = $(this).attr('data-target');
    $(target).find('select').each(function () {
      $(this).find('option').each(function () {
        if (this.defaultSelected) {
          this.selected = true;
          return false;
        }
      });
    });
    $(target).find('input, textarea').each(function () {
      this.value = '';
      this.checked = false;
    });
  });


  // Sticky aside
  var sticker = $('.page-sidebar aside, .sticker');
  var window_width = $(window).width();
  var stickerOptions = {
    parent: '',
    offset_top: $('.navbar-site').outerHeight() + 30
  }

  if (sticker.attr('data-sticker-parent')) {
    stickerOptions.parent = sticker.attr('data-sticker-parent');
  }
  else {
    stickerOptions.parent = '.main-container';
  }

  if (window_width < 768) {
    sticker.trigger("sticky_kit:detach");
  } else {
    make_sticky();
  }

  $(window).resize(function () {

    window_width = $(window).width();

    if (window_width < 768) {
      sticker.trigger("sticky_kit:detach");
    } else {
      make_sticky();
    }

  });

  function make_sticky() {
    sticker.stick_in_parent(stickerOptions);
  }


})();