var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        (function (Offline) {
            var NewTest = (function (_super) {
                __extends(NewTest, _super);
                function NewTest() {
                    _super.apply(this, arguments);

                }
                NewTest.prototype.onReady = function (_data) {
                    _super.prototype.onReady.call(this, _data);
                    var data = this._testInitializationData;
                    var self = this;
                    this.service.getMyLevelForMyCurrentCourse(data.levelId).done(function (level) {
                        $(".best-result .test-score .value").text(self._scoreNumberFormatter(level.bestScore || 0));
                        self._reStarrify($(".best-result .test-score .stars").attr('data-stars', level.myStars), level.myStars);
                    });
                };
                NewTest.prototype.setService = function (service) {
                    this.service = service;
                };
                return NewTest;
            })(MLearning.Pages.NewTest);
            Offline.NewTest = NewTest;            
        })(Pages.Offline || (Pages.Offline = {}));
        var Offline = Pages.Offline;
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
