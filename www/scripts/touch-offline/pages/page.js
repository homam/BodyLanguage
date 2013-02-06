var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        (function (Offline) {
            var Page = (function (_super) {
                __extends(Page, _super);
                function Page(service) {
                                _super.call(this);
                    this.service = service;
                    console.log("Offline.Page()");
                }
                Page.prototype.destructor = function () {
                };
                return Page;
            })(MLearning.Pages.Page);
            Offline.Page = Page;            
        })(Pages.Offline || (Pages.Offline = {}));
        var Offline = Pages.Offline;
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
