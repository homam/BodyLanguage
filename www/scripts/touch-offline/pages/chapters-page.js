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
            var Chapters = (function (_super) {
                __extends(Chapters, _super);
                function Chapters() {
                    _super.apply(this, arguments);

                }
                Chapters.prototype.onReady = function (data) {
                    var courseId = data.courseId;
                    if(!!courseId) {
                        this.service.courseVisited(courseId);
                    }
                    var self = this;
                    $(".courses-thumbnails li").each(function () {
                        var li = $(this);
                        self.service.getMyLevel(courseId, parseInt(PG.Utils.getQueryString(li.find("a").attr("href")).get('levelid'))).done(function (level) {
                            li.find("span.level").attr("data-stars", level.myStars);
                        });
                    });
                    _super.prototype.onReady.call(this, data);
                };
                Chapters.prototype.setService = function (service) {
                    this.service = service;
                };
                return Chapters;
            })(MLearning.Pages.Chapters);
            Offline.Chapters = Chapters;            
        })(Pages.Offline || (Pages.Offline = {}));
        var Offline = Pages.Offline;
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
