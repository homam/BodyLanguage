var PG;
(function (PG) {
    var Utils = (function () {
        function Utils() { }
        Utils.getParams = function getParams(query) {
            var hashParams = {
            };
            var e, a = /\+/g, r = /([^&;=]+)=?([^&;]*)/g, d = function (s) {
return decodeURIComponent(s.replace(a, " "));            }, q = query.substring(1);
            while(e = r.exec(q)) {
                hashParams[d(e[1])] = d(e[2]);
            }
            return hashParams;
        }
        Utils.getHashParams = function getHashParams() {
            return PG.Utils.getParams(window.location.hash);
        }
        Utils.getQueryParams = function getQueryParams(url) {
            if (typeof url === "undefined") { url = window.location.search; }
            url = url.substr(url.indexOf('?'));
            return PG.Utils.getParams(url);
        }
        Utils.getQueryString = function getQueryString(url) {
            if (typeof url === "undefined") { url = window.location.search; }
            return new QueryParams(this.getQueryParams(url));
        }
        return Utils;
    })();
    PG.Utils = Utils;    
    var QueryParams = (function () {
        function QueryParams(params) {
            for(var p in params) {
                params[p.toLowerCase()] = params[p];
            }
            this.paramsObj = params;
        }
        QueryParams.prototype.get = function (key) {
            return this.paramsObj[key.toLowerCase()];
        };
        return QueryParams;
    })();
    PG.QueryParams = QueryParams;    
})(PG || (PG = {}));
