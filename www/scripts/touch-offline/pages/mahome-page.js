var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        (function (Offline) {
            ; ;
            var MAHome = (function (_super) {
                __extends(MAHome, _super);
                function MAHome() {
                    _super.apply(this, arguments);

                }
                MAHome.prototype.onReady = function (data) {
                    _super.prototype.onReady.call(this, data);
                };
                MAHome.prototype.setService = function (service) {
                    this.service = service;
                };
                return MAHome;
            })(MLearning.Pages.MAHome);
            Offline.MAHome = MAHome;            
        })(Pages.Offline || (Pages.Offline = {}));
        var Offline = Pages.Offline;
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
