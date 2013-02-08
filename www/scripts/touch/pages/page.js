var MLearning;
(function (MLearning) {
    (function (Pages) {
        var Page = (function () {
            function Page() {
            }
            Page.prototype.onReady = function (data) {
            };
            Page.prototype._reStarrify = function (el, stars) {
                el.children().remove();
                MLearning.UI.Starrifier.Starrify(el.attr('data-stars', stars));
            };
            Page.prototype._starrify = function (el, stars) {
                if(!!stars) {
                    el.attr('data-stars', stars);
                }
                MLearning.UI.Starrifier.Starrify(el);
            };
            Page.prototype.destructor = function () {
            };
            return Page;
        })();
        Pages.Page = Page;        
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
