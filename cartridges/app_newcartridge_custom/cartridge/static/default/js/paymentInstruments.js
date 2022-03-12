/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/app_newcartridge_custom/cartridge/client/default/js/paymentInstruments.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/app_newcartridge_custom/cartridge/client/default/js/components/cleave.js":
/*!*********************************************************************************************!*\
  !*** ./cartridges/app_newcartridge_custom/cartridge/client/default/js/components/cleave.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cleave = __webpack_require__(/*! cleave.js */ "./node_modules/cleave.js/dist/cleave-esm.js")["default"];

module.exports = {
  handleCreditCardNumber: function handleCreditCardNumber(cardFieldSelector, cardTypeSelector) {
    var cleave = new Cleave(cardFieldSelector, {
      creditCard: true,
      onCreditCardTypeChanged: function onCreditCardTypeChanged(type) {
        var creditCardTypes = {
          visa: 'Visa',
          mastercard: 'Master Card',
          amex: 'Amex',
          discover: 'Discover',
          unknown: 'Unknown'
        };
        var cardType = creditCardTypes[Object.keys(creditCardTypes).indexOf(type) > -1 ? type : 'unknown'];
        $(cardTypeSelector).val(cardType);
        $('.card-number-wrapper').attr('data-type', type);

        if (type === 'visa' || type === 'mastercard' || type === 'discover') {
          $('#securityCode').attr('maxlength', 3);
        } else {
          $('#securityCode').attr('maxlength', 4);
        }
      }
    });
    $(cardFieldSelector).data('cleave', cleave);
  },
  serializeData: function serializeData(form) {
    var serializedArray = form.serializeArray();
    serializedArray.forEach(function (item) {
      if (item.name.indexOf('cardNumber') > -1) {
        item.value = $('#cardNumber').data('cleave').getRawValue(); // eslint-disable-line
      }
    });
    return $.param(serializedArray);
  }
};

/***/ }),

/***/ "./cartridges/app_newcartridge_custom/cartridge/client/default/js/components/formValidation.js":
/*!*****************************************************************************************************!*\
  !*** ./cartridges/app_newcartridge_custom/cartridge/client/default/js/components/formValidation.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Remove all validation. Should be called every time before revalidating form
 * @param {element} form - Form to be cleared
 * @returns {void}
 */

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function clearFormErrors(form) {
  $(form).find('.form-control.is-invalid').removeClass('is-invalid');
}

module.exports = function (formElement, payload) {
  // clear form validation first
  clearFormErrors(formElement);
  $('.alert', formElement).remove();

  if (_typeof(payload) === 'object' && payload.fields) {
    Object.keys(payload.fields).forEach(function (key) {
      if (payload.fields[key]) {
        var feedbackElement = $(formElement).find('[name="' + key + '"]').parent().children('.invalid-feedback');

        if (feedbackElement.length > 0) {
          if (Array.isArray(payload[key])) {
            feedbackElement.html(payload.fields[key].join('<br/>'));
          } else {
            feedbackElement.html(payload.fields[key]);
          }

          feedbackElement.siblings('.form-control').addClass('is-invalid');
        }
      }
    });
  }

  if (payload && payload.error) {
    var form = $(formElement).prop('tagName') === 'FORM' ? $(formElement) : $(formElement).parents('form');
    form.prepend('<div class="alert alert-danger" role="alert">' + payload.error.join('<br/>') + '</div>');
  }
};

/***/ }),

/***/ "./cartridges/app_newcartridge_custom/cartridge/client/default/js/paymentInstruments.js":
/*!**********************************************************************************************!*\
  !*** ./cartridges/app_newcartridge_custom/cartridge/client/default/js/paymentInstruments.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var processInclude = __webpack_require__(/*! ./util */ "./cartridges/app_newcartridge_custom/cartridge/client/default/js/util.js");

$(document).ready(function () {
  processInclude(__webpack_require__(/*! ./paymentInstruments/paymentInstruments */ "./cartridges/app_newcartridge_custom/cartridge/client/default/js/paymentInstruments/paymentInstruments.js"));
});

/***/ }),

/***/ "./cartridges/app_newcartridge_custom/cartridge/client/default/js/paymentInstruments/paymentInstruments.js":
/*!*****************************************************************************************************************!*\
  !*** ./cartridges/app_newcartridge_custom/cartridge/client/default/js/paymentInstruments/paymentInstruments.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var formValidation = __webpack_require__(/*! ../components/formValidation */ "./cartridges/app_newcartridge_custom/cartridge/client/default/js/components/formValidation.js");

var cleave = __webpack_require__(/*! ../components/cleave */ "./cartridges/app_newcartridge_custom/cartridge/client/default/js/components/cleave.js");

var url;
module.exports = {
  removePayment: function removePayment() {
    $('.remove-payment').on('click', function (e) {
      e.preventDefault();
      url = $(this).data('url') + '?UUID=' + $(this).data('id');
      $('.payment-to-remove').empty().append($(this).data('card'));
      $('.delete-confirmation-btn').click(function (f) {
        f.preventDefault();
        $('.remove-payment').trigger('payment:remove', f);
        $.ajax({
          url: url,
          type: 'get',
          dataType: 'json',
          success: function success(data) {
            $('#uuid-' + data.UUID).remove();

            if (data.message) {
              var toInsert = '<div><h3>' + data.message + '</h3><div>';
              $('.paymentInstruments').after(toInsert);
            }
          },
          error: function error(err) {
            if (err.responseJSON.redirectUrl) {
              window.location.href = err.responseJSON.redirectUrl;
            }

            $.spinner().stop();
          }
        });
      });
    });
  },
  submitPayment: function submitPayment() {
    $('form.payment-form').submit(function (e) {
      var $form = $(this);
      e.preventDefault();
      url = $form.attr('action');
      $form.spinner().start();
      $('form.payment-form').trigger('payment:submit', e);
      var formData = cleave.serializeData($form);
      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: formData,
        success: function success(data) {
          $form.spinner().stop();

          if (!data.success) {
            formValidation($form, data);
          } else {
            location.href = data.redirectUrl;
          }
        },
        error: function error(err) {
          if (err.responseJSON.redirectUrl) {
            window.location.href = err.responseJSON.redirectUrl;
          }

          $form.spinner().stop();
        }
      });
      return false;
    });
  },
  handleCreditCardNumber: function handleCreditCardNumber() {
    if ($('#cardNumber').length && $('#cardType').length) {
      cleave.handleCreditCardNumber('#cardNumber', '#cardType');
    }
  }
};

/***/ }),

/***/ "./cartridges/app_newcartridge_custom/cartridge/client/default/js/util.js":
/*!********************************************************************************!*\
  !*** ./cartridges/app_newcartridge_custom/cartridge/client/default/js/util.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

module.exports = function (include) {
  if (typeof include === 'function') {
    include();
  } else if (_typeof(include) === 'object') {
    Object.keys(include).forEach(function (key) {
      if (typeof include[key] === 'function') {
        include[key]();
      }
    });
  }
};

/***/ }),

/***/ "./node_modules/cleave.js/dist/cleave-esm.js":
/*!***************************************************!*\
  !*** ./node_modules/cleave.js/dist/cleave-esm.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var NumeralFormatter = function NumeralFormatter(numeralDecimalMark, numeralIntegerScale, numeralDecimalScale, numeralThousandsGroupStyle, numeralPositiveOnly, stripLeadingZeroes, prefix, signBeforePrefix, tailPrefix, delimiter) {
  var owner = this;
  owner.numeralDecimalMark = numeralDecimalMark || '.';
  owner.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0;
  owner.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
  owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
  owner.numeralPositiveOnly = !!numeralPositiveOnly;
  owner.stripLeadingZeroes = stripLeadingZeroes !== false;
  owner.prefix = prefix || prefix === '' ? prefix : '';
  owner.signBeforePrefix = !!signBeforePrefix;
  owner.tailPrefix = !!tailPrefix;
  owner.delimiter = delimiter || delimiter === '' ? delimiter : ',';
  owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';
};

NumeralFormatter.groupStyle = {
  thousand: 'thousand',
  lakh: 'lakh',
  wan: 'wan',
  none: 'none'
};
NumeralFormatter.prototype = {
  getRawValue: function getRawValue(value) {
    return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
  },
  format: function format(value) {
    var owner = this,
        parts,
        partSign,
        partSignAndPrefix,
        partInteger,
        partDecimal = ''; // strip alphabet letters

    value = value.replace(/[A-Za-z]/g, '') // replace the first decimal mark with reserved placeholder
    .replace(owner.numeralDecimalMark, 'M') // strip non numeric letters except minus and "M"
    // this is to ensure prefix has been stripped
    .replace(/[^\dM-]/g, '') // replace the leading minus with reserved placeholder
    .replace(/^\-/, 'N') // strip the other minus sign (if present)
    .replace(/\-/g, '') // replace the minus sign (if present)
    .replace('N', owner.numeralPositiveOnly ? '' : '-') // replace decimal mark
    .replace('M', owner.numeralDecimalMark); // strip any leading zeros

    if (owner.stripLeadingZeroes) {
      value = value.replace(/^(-)?0+(?=\d)/, '$1');
    }

    partSign = value.slice(0, 1) === '-' ? '-' : '';

    if (typeof owner.prefix != 'undefined') {
      if (owner.signBeforePrefix) {
        partSignAndPrefix = partSign + owner.prefix;
      } else {
        partSignAndPrefix = owner.prefix + partSign;
      }
    } else {
      partSignAndPrefix = partSign;
    }

    partInteger = value;

    if (value.indexOf(owner.numeralDecimalMark) >= 0) {
      parts = value.split(owner.numeralDecimalMark);
      partInteger = parts[0];
      partDecimal = owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale);
    }

    if (partSign === '-') {
      partInteger = partInteger.slice(1);
    }

    if (owner.numeralIntegerScale > 0) {
      partInteger = partInteger.slice(0, owner.numeralIntegerScale);
    }

    switch (owner.numeralThousandsGroupStyle) {
      case NumeralFormatter.groupStyle.lakh:
        partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + owner.delimiter);
        break;

      case NumeralFormatter.groupStyle.wan:
        partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, '$1' + owner.delimiter);
        break;

      case NumeralFormatter.groupStyle.thousand:
        partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + owner.delimiter);
        break;
    }

    if (owner.tailPrefix) {
      return partSign + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '') + owner.prefix;
    }

    return partSignAndPrefix + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '');
  }
};
var NumeralFormatter_1 = NumeralFormatter;

var DateFormatter = function DateFormatter(datePattern, dateMin, dateMax) {
  var owner = this;
  owner.date = [];
  owner.blocks = [];
  owner.datePattern = datePattern;
  owner.dateMin = dateMin.split('-').reverse().map(function (x) {
    return parseInt(x, 10);
  });
  if (owner.dateMin.length === 2) owner.dateMin.unshift(0);
  owner.dateMax = dateMax.split('-').reverse().map(function (x) {
    return parseInt(x, 10);
  });
  if (owner.dateMax.length === 2) owner.dateMax.unshift(0);
  owner.initBlocks();
};

DateFormatter.prototype = {
  initBlocks: function initBlocks() {
    var owner = this;
    owner.datePattern.forEach(function (value) {
      if (value === 'Y') {
        owner.blocks.push(4);
      } else {
        owner.blocks.push(2);
      }
    });
  },
  getISOFormatDate: function getISOFormatDate() {
    var owner = this,
        date = owner.date;
    return date[2] ? date[2] + '-' + owner.addLeadingZero(date[1]) + '-' + owner.addLeadingZero(date[0]) : '';
  },
  getBlocks: function getBlocks() {
    return this.blocks;
  },
  getValidatedDate: function getValidatedDate(value) {
    var owner = this,
        result = '';
    value = value.replace(/[^\d]/g, '');
    owner.blocks.forEach(function (length, index) {
      if (value.length > 0) {
        var sub = value.slice(0, length),
            sub0 = sub.slice(0, 1),
            rest = value.slice(length);

        switch (owner.datePattern[index]) {
          case 'd':
            if (sub === '00') {
              sub = '01';
            } else if (parseInt(sub0, 10) > 3) {
              sub = '0' + sub0;
            } else if (parseInt(sub, 10) > 31) {
              sub = '31';
            }

            break;

          case 'm':
            if (sub === '00') {
              sub = '01';
            } else if (parseInt(sub0, 10) > 1) {
              sub = '0' + sub0;
            } else if (parseInt(sub, 10) > 12) {
              sub = '12';
            }

            break;
        }

        result += sub; // update remaining string

        value = rest;
      }
    });
    return this.getFixedDateString(result);
  },
  getFixedDateString: function getFixedDateString(value) {
    var owner = this,
        datePattern = owner.datePattern,
        date = [],
        dayIndex = 0,
        monthIndex = 0,
        yearIndex = 0,
        dayStartIndex = 0,
        monthStartIndex = 0,
        yearStartIndex = 0,
        day,
        month,
        year,
        fullYearDone = false; // mm-dd || dd-mm

    if (value.length === 4 && datePattern[0].toLowerCase() !== 'y' && datePattern[1].toLowerCase() !== 'y') {
      dayStartIndex = datePattern[0] === 'd' ? 0 : 2;
      monthStartIndex = 2 - dayStartIndex;
      day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
      month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
      date = this.getFixedDate(day, month, 0);
    } // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd


    if (value.length === 8) {
      datePattern.forEach(function (type, index) {
        switch (type) {
          case 'd':
            dayIndex = index;
            break;

          case 'm':
            monthIndex = index;
            break;

          default:
            yearIndex = index;
            break;
        }
      });
      yearStartIndex = yearIndex * 2;
      dayStartIndex = dayIndex <= yearIndex ? dayIndex * 2 : dayIndex * 2 + 2;
      monthStartIndex = monthIndex <= yearIndex ? monthIndex * 2 : monthIndex * 2 + 2;
      day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
      month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
      year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);
      fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;
      date = this.getFixedDate(day, month, year);
    } // mm-yy || yy-mm


    if (value.length === 4 && (datePattern[0] === 'y' || datePattern[1] === 'y')) {
      monthStartIndex = datePattern[0] === 'm' ? 0 : 2;
      yearStartIndex = 2 - monthStartIndex;
      month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
      year = parseInt(value.slice(yearStartIndex, yearStartIndex + 2), 10);
      fullYearDone = value.slice(yearStartIndex, yearStartIndex + 2).length === 2;
      date = [0, month, year];
    } // mm-yyyy || yyyy-mm


    if (value.length === 6 && (datePattern[0] === 'Y' || datePattern[1] === 'Y')) {
      monthStartIndex = datePattern[0] === 'm' ? 0 : 4;
      yearStartIndex = 2 - 0.5 * monthStartIndex;
      month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
      year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);
      fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;
      date = [0, month, year];
    }

    date = owner.getRangeFixedDate(date);
    owner.date = date;
    var result = date.length === 0 ? value : datePattern.reduce(function (previous, current) {
      switch (current) {
        case 'd':
          return previous + (date[0] === 0 ? '' : owner.addLeadingZero(date[0]));

        case 'm':
          return previous + (date[1] === 0 ? '' : owner.addLeadingZero(date[1]));

        case 'y':
          return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], false) : '');

        case 'Y':
          return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], true) : '');
      }
    }, '');
    return result;
  },
  getRangeFixedDate: function getRangeFixedDate(date) {
    var owner = this,
        datePattern = owner.datePattern,
        dateMin = owner.dateMin || [],
        dateMax = owner.dateMax || [];
    if (!date.length || dateMin.length < 3 && dateMax.length < 3) return date;
    if (datePattern.find(function (x) {
      return x.toLowerCase() === 'y';
    }) && date[2] === 0) return date;
    if (dateMax.length && (dateMax[2] < date[2] || dateMax[2] === date[2] && (dateMax[1] < date[1] || dateMax[1] === date[1] && dateMax[0] < date[0]))) return dateMax;
    if (dateMin.length && (dateMin[2] > date[2] || dateMin[2] === date[2] && (dateMin[1] > date[1] || dateMin[1] === date[1] && dateMin[0] > date[0]))) return dateMin;
    return date;
  },
  getFixedDate: function getFixedDate(day, month, year) {
    day = Math.min(day, 31);
    month = Math.min(month, 12);
    year = parseInt(year || 0, 10);

    if (month < 7 && month % 2 === 0 || month > 8 && month % 2 === 1) {
      day = Math.min(day, month === 2 ? this.isLeapYear(year) ? 29 : 28 : 30);
    }

    return [day, month, year];
  },
  isLeapYear: function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  },
  addLeadingZero: function addLeadingZero(number) {
    return (number < 10 ? '0' : '') + number;
  },
  addLeadingZeroForYear: function addLeadingZeroForYear(number, fullYearMode) {
    if (fullYearMode) {
      return (number < 10 ? '000' : number < 100 ? '00' : number < 1000 ? '0' : '') + number;
    }

    return (number < 10 ? '0' : '') + number;
  }
};
var DateFormatter_1 = DateFormatter;

var TimeFormatter = function TimeFormatter(timePattern, timeFormat) {
  var owner = this;
  owner.time = [];
  owner.blocks = [];
  owner.timePattern = timePattern;
  owner.timeFormat = timeFormat;
  owner.initBlocks();
};

TimeFormatter.prototype = {
  initBlocks: function initBlocks() {
    var owner = this;
    owner.timePattern.forEach(function () {
      owner.blocks.push(2);
    });
  },
  getISOFormatTime: function getISOFormatTime() {
    var owner = this,
        time = owner.time;
    return time[2] ? owner.addLeadingZero(time[0]) + ':' + owner.addLeadingZero(time[1]) + ':' + owner.addLeadingZero(time[2]) : '';
  },
  getBlocks: function getBlocks() {
    return this.blocks;
  },
  getTimeFormatOptions: function getTimeFormatOptions() {
    var owner = this;

    if (String(owner.timeFormat) === '12') {
      return {
        maxHourFirstDigit: 1,
        maxHours: 12,
        maxMinutesFirstDigit: 5,
        maxMinutes: 60
      };
    }

    return {
      maxHourFirstDigit: 2,
      maxHours: 23,
      maxMinutesFirstDigit: 5,
      maxMinutes: 60
    };
  },
  getValidatedTime: function getValidatedTime(value) {
    var owner = this,
        result = '';
    value = value.replace(/[^\d]/g, '');
    var timeFormatOptions = owner.getTimeFormatOptions();
    owner.blocks.forEach(function (length, index) {
      if (value.length > 0) {
        var sub = value.slice(0, length),
            sub0 = sub.slice(0, 1),
            rest = value.slice(length);

        switch (owner.timePattern[index]) {
          case 'h':
            if (parseInt(sub0, 10) > timeFormatOptions.maxHourFirstDigit) {
              sub = '0' + sub0;
            } else if (parseInt(sub, 10) > timeFormatOptions.maxHours) {
              sub = timeFormatOptions.maxHours + '';
            }

            break;

          case 'm':
          case 's':
            if (parseInt(sub0, 10) > timeFormatOptions.maxMinutesFirstDigit) {
              sub = '0' + sub0;
            } else if (parseInt(sub, 10) > timeFormatOptions.maxMinutes) {
              sub = timeFormatOptions.maxMinutes + '';
            }

            break;
        }

        result += sub; // update remaining string

        value = rest;
      }
    });
    return this.getFixedTimeString(result);
  },
  getFixedTimeString: function getFixedTimeString(value) {
    var owner = this,
        timePattern = owner.timePattern,
        time = [],
        secondIndex = 0,
        minuteIndex = 0,
        hourIndex = 0,
        secondStartIndex = 0,
        minuteStartIndex = 0,
        hourStartIndex = 0,
        second,
        minute,
        hour;

    if (value.length === 6) {
      timePattern.forEach(function (type, index) {
        switch (type) {
          case 's':
            secondIndex = index * 2;
            break;

          case 'm':
            minuteIndex = index * 2;
            break;

          case 'h':
            hourIndex = index * 2;
            break;
        }
      });
      hourStartIndex = hourIndex;
      minuteStartIndex = minuteIndex;
      secondStartIndex = secondIndex;
      second = parseInt(value.slice(secondStartIndex, secondStartIndex + 2), 10);
      minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
      hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);
      time = this.getFixedTime(hour, minute, second);
    }

    if (value.length === 4 && owner.timePattern.indexOf('s') < 0) {
      timePattern.forEach(function (type, index) {
        switch (type) {
          case 'm':
            minuteIndex = index * 2;
            break;

          case 'h':
            hourIndex = index * 2;
            break;
        }
      });
      hourStartIndex = hourIndex;
      minuteStartIndex = minuteIndex;
      second = 0;
      minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
      hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);
      time = this.getFixedTime(hour, minute, second);
    }

    owner.time = time;
    return time.length === 0 ? value : timePattern.reduce(function (previous, current) {
      switch (current) {
        case 's':
          return previous + owner.addLeadingZero(time[2]);

        case 'm':
          return previous + owner.addLeadingZero(time[1]);

        case 'h':
          return previous + owner.addLeadingZero(time[0]);
      }
    }, '');
  },
  getFixedTime: function getFixedTime(hour, minute, second) {
    second = Math.min(parseInt(second || 0, 10), 60);
    minute = Math.min(minute, 60);
    hour = Math.min(hour, 60);
    return [hour, minute, second];
  },
  addLeadingZero: function addLeadingZero(number) {
    return (number < 10 ? '0' : '') + number;
  }
};
var TimeFormatter_1 = TimeFormatter;

var PhoneFormatter = function PhoneFormatter(formatter, delimiter) {
  var owner = this;
  owner.delimiter = delimiter || delimiter === '' ? delimiter : ' ';
  owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';
  owner.formatter = formatter;
};

PhoneFormatter.prototype = {
  setFormatter: function setFormatter(formatter) {
    this.formatter = formatter;
  },
  format: function format(phoneNumber) {
    var owner = this;
    owner.formatter.clear(); // only keep number and +

    phoneNumber = phoneNumber.replace(/[^\d+]/g, ''); // strip non-leading +

    phoneNumber = phoneNumber.replace(/^\+/, 'B').replace(/\+/g, '').replace('B', '+'); // strip delimiter

    phoneNumber = phoneNumber.replace(owner.delimiterRE, '');
    var result = '',
        current,
        validated = false;

    for (var i = 0, iMax = phoneNumber.length; i < iMax; i++) {
      current = owner.formatter.inputDigit(phoneNumber.charAt(i)); // has ()- or space inside

      if (/[\s()-]/g.test(current)) {
        result = current;
        validated = true;
      } else {
        if (!validated) {
          result = current;
        } // else: over length input
        // it turns to invalid number again

      }
    } // strip ()
    // e.g. US: 7161234567 returns (716) 123-4567


    result = result.replace(/[()]/g, ''); // replace library delimiter with user customized delimiter

    result = result.replace(/[\s-]/g, owner.delimiter);
    return result;
  }
};
var PhoneFormatter_1 = PhoneFormatter;
var CreditCardDetector = {
  blocks: {
    uatp: [4, 5, 6],
    amex: [4, 6, 5],
    diners: [4, 6, 4],
    discover: [4, 4, 4, 4],
    mastercard: [4, 4, 4, 4],
    dankort: [4, 4, 4, 4],
    instapayment: [4, 4, 4, 4],
    jcb15: [4, 6, 5],
    jcb: [4, 4, 4, 4],
    maestro: [4, 4, 4, 4],
    visa: [4, 4, 4, 4],
    mir: [4, 4, 4, 4],
    unionPay: [4, 4, 4, 4],
    general: [4, 4, 4, 4]
  },
  re: {
    // starts with 1; 15 digits, not starts with 1800 (jcb card)
    uatp: /^(?!1800)1\d{0,14}/,
    // starts with 34/37; 15 digits
    amex: /^3[47]\d{0,13}/,
    // starts with 6011/65/644-649; 16 digits
    discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
    // starts with 300-305/309 or 36/38/39; 14 digits
    diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
    // starts with 51-55/2221–2720; 16 digits
    mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
    // starts with 5019/4175/4571; 16 digits
    dankort: /^(5019|4175|4571)\d{0,12}/,
    // starts with 637-639; 16 digits
    instapayment: /^63[7-9]\d{0,13}/,
    // starts with 2131/1800; 15 digits
    jcb15: /^(?:2131|1800)\d{0,11}/,
    // starts with 2131/1800/35; 16 digits
    jcb: /^(?:35\d{0,2})\d{0,12}/,
    // starts with 50/56-58/6304/67; 16 digits
    maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
    // starts with 22; 16 digits
    mir: /^220[0-4]\d{0,12}/,
    // starts with 4; 16 digits
    visa: /^4\d{0,15}/,
    // starts with 62/81; 16 digits
    unionPay: /^(62|81)\d{0,14}/
  },
  getStrictBlocks: function getStrictBlocks(block) {
    var total = block.reduce(function (prev, current) {
      return prev + current;
    }, 0);
    return block.concat(19 - total);
  },
  getInfo: function getInfo(value, strictMode) {
    var blocks = CreditCardDetector.blocks,
        re = CreditCardDetector.re; // Some credit card can have up to 19 digits number.
    // Set strictMode to true will remove the 16 max-length restrain,
    // however, I never found any website validate card number like
    // this, hence probably you don't want to enable this option.

    strictMode = !!strictMode;

    for (var key in re) {
      if (re[key].test(value)) {
        var matchedBlocks = blocks[key];
        return {
          type: key,
          blocks: strictMode ? this.getStrictBlocks(matchedBlocks) : matchedBlocks
        };
      }
    }

    return {
      type: 'unknown',
      blocks: strictMode ? this.getStrictBlocks(blocks.general) : blocks.general
    };
  }
};
var CreditCardDetector_1 = CreditCardDetector;
var Util = {
  noop: function noop() {},
  strip: function strip(value, re) {
    return value.replace(re, '');
  },
  getPostDelimiter: function getPostDelimiter(value, delimiter, delimiters) {
    // single delimiter
    if (delimiters.length === 0) {
      return value.slice(-delimiter.length) === delimiter ? delimiter : '';
    } // multiple delimiters


    var matchedDelimiter = '';
    delimiters.forEach(function (current) {
      if (value.slice(-current.length) === current) {
        matchedDelimiter = current;
      }
    });
    return matchedDelimiter;
  },
  getDelimiterREByDelimiter: function getDelimiterREByDelimiter(delimiter) {
    return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
  },
  getNextCursorPosition: function getNextCursorPosition(prevPos, oldValue, newValue, delimiter, delimiters) {
    // If cursor was at the end of value, just place it back.
    // Because new value could contain additional chars.
    if (oldValue.length === prevPos) {
      return newValue.length;
    }

    return prevPos + this.getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters);
  },
  getPositionOffset: function getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters) {
    var oldRawValue, newRawValue, lengthOffset;
    oldRawValue = this.stripDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
    newRawValue = this.stripDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
    lengthOffset = oldRawValue.length - newRawValue.length;
    return lengthOffset !== 0 ? lengthOffset / Math.abs(lengthOffset) : 0;
  },
  stripDelimiters: function stripDelimiters(value, delimiter, delimiters) {
    var owner = this; // single delimiter

    if (delimiters.length === 0) {
      var delimiterRE = delimiter ? owner.getDelimiterREByDelimiter(delimiter) : '';
      return value.replace(delimiterRE, '');
    } // multiple delimiters


    delimiters.forEach(function (current) {
      current.split('').forEach(function (letter) {
        value = value.replace(owner.getDelimiterREByDelimiter(letter), '');
      });
    });
    return value;
  },
  headStr: function headStr(str, length) {
    return str.slice(0, length);
  },
  getMaxLength: function getMaxLength(blocks) {
    return blocks.reduce(function (previous, current) {
      return previous + current;
    }, 0);
  },
  // strip prefix
  // Before type  |   After type    |     Return value
  // PEFIX-...    |   PEFIX-...     |     ''
  // PREFIX-123   |   PEFIX-123     |     123
  // PREFIX-123   |   PREFIX-23     |     23
  // PREFIX-123   |   PREFIX-1234   |     1234
  getPrefixStrippedValue: function getPrefixStrippedValue(value, prefix, prefixLength, prevResult, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix) {
    // No prefix
    if (prefixLength === 0) {
      return value;
    } // Value is prefix


    if (value === prefix && value !== '') {
      return '';
    }

    if (signBeforePrefix && value.slice(0, 1) == '-') {
      var prev = prevResult.slice(0, 1) == '-' ? prevResult.slice(1) : prevResult;
      return '-' + this.getPrefixStrippedValue(value.slice(1), prefix, prefixLength, prev, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix);
    } // Pre result prefix string does not match pre-defined prefix


    if (prevResult.slice(0, prefixLength) !== prefix && !tailPrefix) {
      // Check if the first time user entered something
      if (noImmediatePrefix && !prevResult && value) return value;
      return '';
    } else if (prevResult.slice(-prefixLength) !== prefix && tailPrefix) {
      // Check if the first time user entered something
      if (noImmediatePrefix && !prevResult && value) return value;
      return '';
    }

    var prevValue = this.stripDelimiters(prevResult, delimiter, delimiters); // New value has issue, someone typed in between prefix letters
    // Revert to pre value

    if (value.slice(0, prefixLength) !== prefix && !tailPrefix) {
      return prevValue.slice(prefixLength);
    } else if (value.slice(-prefixLength) !== prefix && tailPrefix) {
      return prevValue.slice(0, -prefixLength - 1);
    } // No issue, strip prefix for new value


    return tailPrefix ? value.slice(0, -prefixLength) : value.slice(prefixLength);
  },
  getFirstDiffIndex: function getFirstDiffIndex(prev, current) {
    var index = 0;

    while (prev.charAt(index) === current.charAt(index)) {
      if (prev.charAt(index++) === '') {
        return -1;
      }
    }

    return index;
  },
  getFormattedValue: function getFormattedValue(value, blocks, blocksLength, delimiter, delimiters, delimiterLazyShow) {
    var result = '',
        multipleDelimiters = delimiters.length > 0,
        currentDelimiter = ''; // no options, normal input

    if (blocksLength === 0) {
      return value;
    }

    blocks.forEach(function (length, index) {
      if (value.length > 0) {
        var sub = value.slice(0, length),
            rest = value.slice(length);

        if (multipleDelimiters) {
          currentDelimiter = delimiters[delimiterLazyShow ? index - 1 : index] || currentDelimiter;
        } else {
          currentDelimiter = delimiter;
        }

        if (delimiterLazyShow) {
          if (index > 0) {
            result += currentDelimiter;
          }

          result += sub;
        } else {
          result += sub;

          if (sub.length === length && index < blocksLength - 1) {
            result += currentDelimiter;
          }
        } // update remaining string


        value = rest;
      }
    });
    return result;
  },
  // move cursor to the end
  // the first time user focuses on an input with prefix
  fixPrefixCursor: function fixPrefixCursor(el, prefix, delimiter, delimiters) {
    if (!el) {
      return;
    }

    var val = el.value,
        appendix = delimiter || delimiters[0] || ' ';

    if (!el.setSelectionRange || !prefix || prefix.length + appendix.length <= val.length) {
      return;
    }

    var len = val.length * 2; // set timeout to avoid blink

    setTimeout(function () {
      el.setSelectionRange(len, len);
    }, 1);
  },
  // Check if input field is fully selected
  checkFullSelection: function checkFullSelection(value) {
    try {
      var selection = window.getSelection() || document.getSelection() || {};
      return selection.toString().length === value.length;
    } catch (ex) {// Ignore
    }

    return false;
  },
  setSelection: function setSelection(element, position, doc) {
    if (element !== this.getActiveElement(doc)) {
      return;
    } // cursor is already in the end


    if (element && element.value.length <= position) {
      return;
    }

    if (element.createTextRange) {
      var range = element.createTextRange();
      range.move('character', position);
      range.select();
    } else {
      try {
        element.setSelectionRange(position, position);
      } catch (e) {
        // eslint-disable-next-line
        console.warn('The input element type does not support selection');
      }
    }
  },
  getActiveElement: function getActiveElement(parent) {
    var activeElement = parent.activeElement;

    if (activeElement && activeElement.shadowRoot) {
      return this.getActiveElement(activeElement.shadowRoot);
    }

    return activeElement;
  },
  isAndroid: function isAndroid() {
    return navigator && /android/i.test(navigator.userAgent);
  },
  // On Android chrome, the keyup and keydown events
  // always return key code 229 as a composition that
  // buffers the user’s keystrokes
  // see https://github.com/nosir/cleave.js/issues/147
  isAndroidBackspaceKeydown: function isAndroidBackspaceKeydown(lastInputValue, currentInputValue) {
    if (!this.isAndroid() || !lastInputValue || !currentInputValue) {
      return false;
    }

    return currentInputValue === lastInputValue.slice(0, -1);
  }
};
var Util_1 = Util;
/**
 * Props Assignment
 *
 * Separate this, so react module can share the usage
 */

var DefaultProperties = {
  // Maybe change to object-assign
  // for now just keep it as simple
  assign: function assign(target, opts) {
    target = target || {};
    opts = opts || {}; // credit card

    target.creditCard = !!opts.creditCard;
    target.creditCardStrictMode = !!opts.creditCardStrictMode;
    target.creditCardType = '';

    target.onCreditCardTypeChanged = opts.onCreditCardTypeChanged || function () {}; // phone


    target.phone = !!opts.phone;
    target.phoneRegionCode = opts.phoneRegionCode || 'AU';
    target.phoneFormatter = {}; // time

    target.time = !!opts.time;
    target.timePattern = opts.timePattern || ['h', 'm', 's'];
    target.timeFormat = opts.timeFormat || '24';
    target.timeFormatter = {}; // date

    target.date = !!opts.date;
    target.datePattern = opts.datePattern || ['d', 'm', 'Y'];
    target.dateMin = opts.dateMin || '';
    target.dateMax = opts.dateMax || '';
    target.dateFormatter = {}; // numeral

    target.numeral = !!opts.numeral;
    target.numeralIntegerScale = opts.numeralIntegerScale > 0 ? opts.numeralIntegerScale : 0;
    target.numeralDecimalScale = opts.numeralDecimalScale >= 0 ? opts.numeralDecimalScale : 2;
    target.numeralDecimalMark = opts.numeralDecimalMark || '.';
    target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || 'thousand';
    target.numeralPositiveOnly = !!opts.numeralPositiveOnly;
    target.stripLeadingZeroes = opts.stripLeadingZeroes !== false;
    target.signBeforePrefix = !!opts.signBeforePrefix;
    target.tailPrefix = !!opts.tailPrefix; // others

    target.swapHiddenInput = !!opts.swapHiddenInput;
    target.numericOnly = target.creditCard || target.date || !!opts.numericOnly;
    target.uppercase = !!opts.uppercase;
    target.lowercase = !!opts.lowercase;
    target.prefix = target.creditCard || target.date ? '' : opts.prefix || '';
    target.noImmediatePrefix = !!opts.noImmediatePrefix;
    target.prefixLength = target.prefix.length;
    target.rawValueTrimPrefix = !!opts.rawValueTrimPrefix;
    target.copyDelimiter = !!opts.copyDelimiter;
    target.initValue = opts.initValue !== undefined && opts.initValue !== null ? opts.initValue.toString() : '';
    target.delimiter = opts.delimiter || opts.delimiter === '' ? opts.delimiter : opts.date ? '/' : opts.time ? ':' : opts.numeral ? ',' : opts.phone ? ' ' : ' ';
    target.delimiterLength = target.delimiter.length;
    target.delimiterLazyShow = !!opts.delimiterLazyShow;
    target.delimiters = opts.delimiters || [];
    target.blocks = opts.blocks || [];
    target.blocksLength = target.blocks.length;
    target.root = _typeof(commonjsGlobal) === 'object' && commonjsGlobal ? commonjsGlobal : window;
    target.document = opts.document || target.root.document;
    target.maxLength = 0;
    target.backspace = false;
    target.result = '';

    target.onValueChanged = opts.onValueChanged || function () {};

    return target;
  }
};
var DefaultProperties_1 = DefaultProperties;
/**
 * Construct a new Cleave instance by passing the configuration object
 *
 * @param {String | HTMLElement} element
 * @param {Object} opts
 */

var Cleave = function Cleave(element, opts) {
  var owner = this;
  var hasMultipleElements = false;

  if (typeof element === 'string') {
    owner.element = document.querySelector(element);
    hasMultipleElements = document.querySelectorAll(element).length > 1;
  } else {
    if (typeof element.length !== 'undefined' && element.length > 0) {
      owner.element = element[0];
      hasMultipleElements = element.length > 1;
    } else {
      owner.element = element;
    }
  }

  if (!owner.element) {
    throw new Error('[cleave.js] Please check the element');
  }

  if (hasMultipleElements) {
    try {
      // eslint-disable-next-line
      console.warn('[cleave.js] Multiple input fields matched, cleave.js will only take the first one.');
    } catch (e) {// Old IE
    }
  }

  opts.initValue = owner.element.value;
  owner.properties = Cleave.DefaultProperties.assign({}, opts);
  owner.init();
};

Cleave.prototype = {
  init: function init() {
    var owner = this,
        pps = owner.properties; // no need to use this lib

    if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && pps.blocksLength === 0 && !pps.prefix) {
      owner.onInput(pps.initValue);
      return;
    }

    pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
    owner.isAndroid = Cleave.Util.isAndroid();
    owner.lastInputValue = '';
    owner.isBackward = '';
    owner.onChangeListener = owner.onChange.bind(owner);
    owner.onKeyDownListener = owner.onKeyDown.bind(owner);
    owner.onFocusListener = owner.onFocus.bind(owner);
    owner.onCutListener = owner.onCut.bind(owner);
    owner.onCopyListener = owner.onCopy.bind(owner);
    owner.initSwapHiddenInput();
    owner.element.addEventListener('input', owner.onChangeListener);
    owner.element.addEventListener('keydown', owner.onKeyDownListener);
    owner.element.addEventListener('focus', owner.onFocusListener);
    owner.element.addEventListener('cut', owner.onCutListener);
    owner.element.addEventListener('copy', owner.onCopyListener);
    owner.initPhoneFormatter();
    owner.initDateFormatter();
    owner.initTimeFormatter();
    owner.initNumeralFormatter(); // avoid touch input field if value is null
    // otherwise Firefox will add red box-shadow for <input required />

    if (pps.initValue || pps.prefix && !pps.noImmediatePrefix) {
      owner.onInput(pps.initValue);
    }
  },
  initSwapHiddenInput: function initSwapHiddenInput() {
    var owner = this,
        pps = owner.properties;
    if (!pps.swapHiddenInput) return;
    var inputFormatter = owner.element.cloneNode(true);
    owner.element.parentNode.insertBefore(inputFormatter, owner.element);
    owner.elementSwapHidden = owner.element;
    owner.elementSwapHidden.type = 'hidden';
    owner.element = inputFormatter;
    owner.element.id = '';
  },
  initNumeralFormatter: function initNumeralFormatter() {
    var owner = this,
        pps = owner.properties;

    if (!pps.numeral) {
      return;
    }

    pps.numeralFormatter = new Cleave.NumeralFormatter(pps.numeralDecimalMark, pps.numeralIntegerScale, pps.numeralDecimalScale, pps.numeralThousandsGroupStyle, pps.numeralPositiveOnly, pps.stripLeadingZeroes, pps.prefix, pps.signBeforePrefix, pps.tailPrefix, pps.delimiter);
  },
  initTimeFormatter: function initTimeFormatter() {
    var owner = this,
        pps = owner.properties;

    if (!pps.time) {
      return;
    }

    pps.timeFormatter = new Cleave.TimeFormatter(pps.timePattern, pps.timeFormat);
    pps.blocks = pps.timeFormatter.getBlocks();
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
  },
  initDateFormatter: function initDateFormatter() {
    var owner = this,
        pps = owner.properties;

    if (!pps.date) {
      return;
    }

    pps.dateFormatter = new Cleave.DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax);
    pps.blocks = pps.dateFormatter.getBlocks();
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
  },
  initPhoneFormatter: function initPhoneFormatter() {
    var owner = this,
        pps = owner.properties;

    if (!pps.phone) {
      return;
    } // Cleave.AsYouTypeFormatter should be provided by
    // external google closure lib


    try {
      pps.phoneFormatter = new Cleave.PhoneFormatter(new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode), pps.delimiter);
    } catch (ex) {
      throw new Error('[cleave.js] Please include phone-type-formatter.{country}.js lib');
    }
  },
  onKeyDown: function onKeyDown(event) {
    var owner = this,
        charCode = event.which || event.keyCode;
    owner.lastInputValue = owner.element.value;
    owner.isBackward = charCode === 8;
  },
  onChange: function onChange(event) {
    var owner = this,
        pps = owner.properties,
        Util = Cleave.Util;
    owner.isBackward = owner.isBackward || event.inputType === 'deleteContentBackward';
    var postDelimiter = Util.getPostDelimiter(owner.lastInputValue, pps.delimiter, pps.delimiters);

    if (owner.isBackward && postDelimiter) {
      pps.postDelimiterBackspace = postDelimiter;
    } else {
      pps.postDelimiterBackspace = false;
    }

    this.onInput(this.element.value);
  },
  onFocus: function onFocus() {
    var owner = this,
        pps = owner.properties;
    owner.lastInputValue = owner.element.value;

    if (pps.prefix && pps.noImmediatePrefix && !owner.element.value) {
      this.onInput(pps.prefix);
    }

    Cleave.Util.fixPrefixCursor(owner.element, pps.prefix, pps.delimiter, pps.delimiters);
  },
  onCut: function onCut(e) {
    if (!Cleave.Util.checkFullSelection(this.element.value)) return;
    this.copyClipboardData(e);
    this.onInput('');
  },
  onCopy: function onCopy(e) {
    if (!Cleave.Util.checkFullSelection(this.element.value)) return;
    this.copyClipboardData(e);
  },
  copyClipboardData: function copyClipboardData(e) {
    var owner = this,
        pps = owner.properties,
        Util = Cleave.Util,
        inputValue = owner.element.value,
        textToCopy = '';

    if (!pps.copyDelimiter) {
      textToCopy = Util.stripDelimiters(inputValue, pps.delimiter, pps.delimiters);
    } else {
      textToCopy = inputValue;
    }

    try {
      if (e.clipboardData) {
        e.clipboardData.setData('Text', textToCopy);
      } else {
        window.clipboardData.setData('Text', textToCopy);
      }

      e.preventDefault();
    } catch (ex) {//  empty
    }
  },
  onInput: function onInput(value) {
    var owner = this,
        pps = owner.properties,
        Util = Cleave.Util; // case 1: delete one more character "4"
    // 1234*| -> hit backspace -> 123|
    // case 2: last character is not delimiter which is:
    // 12|34* -> hit backspace -> 1|34*
    // note: no need to apply this for numeral mode

    var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters);

    if (!pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
      value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length);
    } // phone formatter


    if (pps.phone) {
      if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
        pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length);
      } else {
        pps.result = pps.phoneFormatter.format(value);
      }

      owner.updateValueState();
      return;
    } // numeral formatter


    if (pps.numeral) {
      // Do not show prefix when noImmediatePrefix is specified
      // This mostly because we need to show user the native input placeholder
      if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
        pps.result = '';
      } else {
        pps.result = pps.numeralFormatter.format(value);
      }

      owner.updateValueState();
      return;
    } // date


    if (pps.date) {
      value = pps.dateFormatter.getValidatedDate(value);
    } // time


    if (pps.time) {
      value = pps.timeFormatter.getValidatedTime(value);
    } // strip delimiters


    value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters); // strip prefix

    value = Util.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix); // strip non-numeric characters

    value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value; // convert case

    value = pps.uppercase ? value.toUpperCase() : value;
    value = pps.lowercase ? value.toLowerCase() : value; // prevent from showing prefix when no immediate option enabled with empty input value

    if (pps.prefix) {
      if (pps.tailPrefix) {
        value = value + pps.prefix;
      } else {
        value = pps.prefix + value;
      } // no blocks specified, no need to do formatting


      if (pps.blocksLength === 0) {
        pps.result = value;
        owner.updateValueState();
        return;
      }
    } // update credit card props


    if (pps.creditCard) {
      owner.updateCreditCardPropsByValue(value);
    } // strip over length characters


    value = Util.headStr(value, pps.maxLength); // apply blocks

    pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters, pps.delimiterLazyShow);
    owner.updateValueState();
  },
  updateCreditCardPropsByValue: function updateCreditCardPropsByValue(value) {
    var owner = this,
        pps = owner.properties,
        Util = Cleave.Util,
        creditCardInfo; // At least one of the first 4 characters has changed

    if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
      return;
    }

    creditCardInfo = Cleave.CreditCardDetector.getInfo(value, pps.creditCardStrictMode);
    pps.blocks = creditCardInfo.blocks;
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Util.getMaxLength(pps.blocks); // credit card type changed

    if (pps.creditCardType !== creditCardInfo.type) {
      pps.creditCardType = creditCardInfo.type;
      pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
    }
  },
  updateValueState: function updateValueState() {
    var owner = this,
        Util = Cleave.Util,
        pps = owner.properties;

    if (!owner.element) {
      return;
    }

    var endPos = owner.element.selectionEnd;
    var oldValue = owner.element.value;
    var newValue = pps.result;
    endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters); // fix Android browser type="text" input field
    // cursor not jumping issue

    if (owner.isAndroid) {
      window.setTimeout(function () {
        owner.element.value = newValue;
        Util.setSelection(owner.element, endPos, pps.document, false);
        owner.callOnValueChanged();
      }, 1);
      return;
    }

    owner.element.value = newValue;
    if (pps.swapHiddenInput) owner.elementSwapHidden.value = owner.getRawValue();
    Util.setSelection(owner.element, endPos, pps.document, false);
    owner.callOnValueChanged();
  },
  callOnValueChanged: function callOnValueChanged() {
    var owner = this,
        pps = owner.properties;
    pps.onValueChanged.call(owner, {
      target: {
        name: owner.element.name,
        value: pps.result,
        rawValue: owner.getRawValue()
      }
    });
  },
  setPhoneRegionCode: function setPhoneRegionCode(phoneRegionCode) {
    var owner = this,
        pps = owner.properties;
    pps.phoneRegionCode = phoneRegionCode;
    owner.initPhoneFormatter();
    owner.onChange();
  },
  setRawValue: function setRawValue(value) {
    var owner = this,
        pps = owner.properties;
    value = value !== undefined && value !== null ? value.toString() : '';

    if (pps.numeral) {
      value = value.replace('.', pps.numeralDecimalMark);
    }

    pps.postDelimiterBackspace = false;
    owner.element.value = value;
    owner.onInput(value);
  },
  getRawValue: function getRawValue() {
    var owner = this,
        pps = owner.properties,
        Util = Cleave.Util,
        rawValue = owner.element.value;

    if (pps.rawValueTrimPrefix) {
      rawValue = Util.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);
    }

    if (pps.numeral) {
      rawValue = pps.numeralFormatter.getRawValue(rawValue);
    } else {
      rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
    }

    return rawValue;
  },
  getISOFormatDate: function getISOFormatDate() {
    var owner = this,
        pps = owner.properties;
    return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
  },
  getISOFormatTime: function getISOFormatTime() {
    var owner = this,
        pps = owner.properties;
    return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
  },
  getFormattedValue: function getFormattedValue() {
    return this.element.value;
  },
  destroy: function destroy() {
    var owner = this;
    owner.element.removeEventListener('input', owner.onChangeListener);
    owner.element.removeEventListener('keydown', owner.onKeyDownListener);
    owner.element.removeEventListener('focus', owner.onFocusListener);
    owner.element.removeEventListener('cut', owner.onCutListener);
    owner.element.removeEventListener('copy', owner.onCopyListener);
  },
  toString: function toString() {
    return '[Cleave Object]';
  }
};
Cleave.NumeralFormatter = NumeralFormatter_1;
Cleave.DateFormatter = DateFormatter_1;
Cleave.TimeFormatter = TimeFormatter_1;
Cleave.PhoneFormatter = PhoneFormatter_1;
Cleave.CreditCardDetector = CreditCardDetector_1;
Cleave.Util = Util_1;
Cleave.DefaultProperties = DefaultProperties_1; // for angular directive

(_typeof(commonjsGlobal) === 'object' && commonjsGlobal ? commonjsGlobal : window)['Cleave'] = Cleave; // CommonJS

var Cleave_1 = Cleave;
/* harmony default export */ __webpack_exports__["default"] = (Cleave_1);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ })

/******/ });
//# sourceMappingURL=paymentInstruments.js.map