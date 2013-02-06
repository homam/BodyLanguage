var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        (function (Offline) {
            var FlashCardsPage = (function (_super) {
                __extends(FlashCardsPage, _super);
                function FlashCardsPage() {
                    _super.apply(this, arguments);

                }
                FlashCardsPage.prototype.onReady = function (model) {
                    var self = this;
                    self.service.getMyLevelForMyCurrentCourse(parseInt(PG.Utils.getQueryString().get("levelid"))).done(function (level) {
                        self._reStarrify($(".levelStars"), level.myStars);
                        $(".score").text(self.scoreNumberFormatter(level.bestScore));
                    });
                    _super.prototype.onReady.call(this, model);
                };
                FlashCardsPage.prototype.setService = function (service) {
                    this.service = service;
                };
                FlashCardsPage.prototype.scoreNumberFormatter = function (score) {
                    return parseInt((score * 100) + "").toString();
                };
                return FlashCardsPage;
            })(MLearning.Pages.FlashCardsPage);
            Offline.FlashCardsPage = FlashCardsPage;            
        })(Pages.Offline || (Pages.Offline = {}));
        var Offline = Pages.Offline;
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
