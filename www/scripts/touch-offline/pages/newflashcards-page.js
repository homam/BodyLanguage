var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        (function (Offline) {
            var NewFlashCards = (function (_super) {
                __extends(NewFlashCards, _super);
                function NewFlashCards() {
                    _super.apply(this, arguments);

                }
                NewFlashCards.prototype.onReady = function (_data) {
                    var data = _data;
                    var self = this;
                    _super.prototype._onReady.call(this, data, function (courseId, levelId) {
                        return self.service.getBookmarks(courseId, levelId);
                    }, function (levelId, stepId, info) {
                        return self.service.toggleBookmakForMyCurrentCourse(stepId, levelId, info);
                    });
                    _super.prototype.onReady.call(this, data);
                };
                NewFlashCards.prototype.setService = function (service) {
                    this.service = service;
                };
                return NewFlashCards;
            })(MLearning.Pages.NewFlashCards);
            Offline.NewFlashCards = NewFlashCards;            
        })(Pages.Offline || (Pages.Offline = {}));
        var Offline = Pages.Offline;
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
