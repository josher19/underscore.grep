(function() {

    /** based on prototype.js RegExp.escape */
    function escapeRegExp(str) {
      return String(str).replace(/([{.(|}:)$+?=^*!\/[\]\\])/g, '\\$1');
    }

    // should this function be exported to Underscore? 
    /**
     *  If re is not a RegExp, convert to RegExp, escaping special characters
     *  such as ?,*,. and so on.
     */
    _.toRegExp = function toRegExp(re) {
        return _.isRegExp(re) ? re : RegExp(escapeRegExp(re));
    }

     // This needs to be merged into Underscore.js

    /** Behaves like grep from prototype.js */
    _.grep = function grep(obj, re, iterator, context) {
        var re = _.toRegExp(re);
        var found = _.select(obj, function (s) {
            return re.test(s);
        }, context);
      if (iterator) {
          return _.map(found, iterator, context);
      }
      return found;
    }

    function getName(f) {
       return f.name || String(f);
    }

    /** Might work across iframes */
   _.is = function is(o, c) {
      return o == null ? o === c : o.constructor === c ||
        typeof c === "function" &&
        ( (o instanceof c) || (getName(o.constructor) === getName(c)));
   }

})();
