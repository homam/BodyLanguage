var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        var Chapters = (function (_super) {
            __extends(Chapters, _super);
            function Chapters() {
                _super.apply(this, arguments);

            }
            Chapters.prototype.onReady = function (model) {
                this._starrify($("ul.courses-thumbnails span.level"));
                _super.prototype.onReady.call(this, model);
            };
            return Chapters;
        })(MLearning.Pages.Page);
        Pages.Chapters = Chapters;        
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
