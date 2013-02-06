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
            var Library = (function (_super) {
                __extends(Library, _super);
                function Library() {
                    _super.apply(this, arguments);

                }
                Library.prototype.onReady = function (data) {
                    var levelTemplate = $("#library-bookmarks li.separator").remove();
                    var stepTemplate = $("#library-bookmarks li").remove();
                    var ul = $("#library-bookmarks");
                    var queryString = $.parsequery(location.href);
                    this.service.getLibraryModelForMyCurrentCourse().done(function (levels) {
                        levels.forEach(function (level) {
                            if(!!level.steps && !!level.steps.length) {
                                var levelElement = levelTemplate.clone();
                                levelElement.find("h1").text(level.title);
                                ul.append(levelElement);
                                level.steps.forEach(function (step) {
                                    var stepElement = stepTemplate.clone();
                                    stepElement.find("a").attr("href", level.path + "?levelId=" + level.id + "&courseId=" + (+queryString.get("courseId")) + "&stepid=" + step.id);
                                    stepElement.find(".title").text(step.title);
                                    ul.append(stepElement);
                                });
                            }
                        });
                    });
                    _super.prototype.onReady.call(this, data);
                };
                Library.prototype.setService = function (service) {
                    this.service = service;
                };
                return Library;
            })(MLearning.Pages.Page);
            Offline.Library = Library;            
        })(Pages.Offline || (Pages.Offline = {}));
        var Offline = Pages.Offline;
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
