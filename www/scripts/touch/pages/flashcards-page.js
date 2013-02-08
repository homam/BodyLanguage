var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        var FlashCardsPage = (function (_super) {
            __extends(FlashCardsPage, _super);
            function FlashCardsPage() {
                _super.apply(this, arguments);

            }
            FlashCardsPage.prototype.onReady = function (data) {
                MLearning.UI.Starrifier.Starrify($(".levelStars"));
                _super.prototype.onReady.call(this, data);
            };
            return FlashCardsPage;
        })(MLearning.Pages.Page);
        Pages.FlashCardsPage = FlashCardsPage;        
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
