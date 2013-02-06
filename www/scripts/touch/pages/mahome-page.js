var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        var MAHome = (function (_super) {
            __extends(MAHome, _super);
            function MAHome() {
                _super.apply(this, arguments);

                this._touchWipeResults = [];
            }
            MAHome.prototype.onReady = function (model) {
                var ulTemplate = $("#popular ul").remove().clone();
                var liTemplate = ulTemplate.find("li");
                [
                    'popular', 
                    'myCourses', 
                    'allCourses'
                ].forEach(function (category, index) {
                    var ul = ulTemplate.clone();
                    $("#" + category).append(ul);
                    for(var i = 0; i < parseInt(((index < 2 ? 1 : 2) + Math.random() * 3) + ''); i++) {
                        ul.append(liTemplate.clone());
                    }
                });
                var allCategories = $(".mahome-category-navlinks a").map(function () {
                    return $(this).attr("data-mahome-category");
                }).toArray();
                var lastCategory = allCategories[0];
                var gotoCategory = function (id) {
                    if(!!lastCategory) {
                        $(".categories").removeClass(lastCategory);
                    }
                    $(".categories").addClass(id);
                    $(".bar").removeClass(lastCategory).addClass(id);
                    lastCategory = id;
                };
                $(".mahome-category-navlinks a").click(function () {
                    gotoCategory($(this).attr("data-mahome-category"));
                });
                this._touchWipeResults.push(touchwipe({
                    wipeLeft: function () {
                        var index = allCategories.indexOf(lastCategory) + 1;
                        if(index < allCategories.length) {
                            gotoCategory(allCategories[index]);
                        }
                    },
                    wipeRight: function () {
                        var index = allCategories.indexOf(lastCategory) - 1;
                        if(index > -1) {
                            gotoCategory(allCategories[index]);
                        }
                    }
                }, $("ul.categories")[0]));
                var nav = function (direction) {
                    var current = $(".banner-container .step.current");
                    var next = direction > 0 ? current.next() : current.prev();
                    if(next.length == 0) {
                        if(direction > 0) {
                            next = $(".banner-container .step").first();
                            $(".banner-container").append(next);
                        } else {
                            next = $(".banner-container .step").last();
                            $(".banner-container").prepend(next);
                        }
                    }
                    setTimeout(function () {
                        $(".banner-container .step.current").removeClass("current");
                        next.addClass("current");
                    }, 10);
                };
                var lastUserInteraction = null;
                this._touchWipeResults.push(touchwipe({
                    wipeLeft: function () {
                        nav(1);
                        lastUserInteraction = new Date();
                    },
                    wipeRight: function () {
                        nav(-1);
                        lastUserInteraction = new Date();
                    }
                }, $(".banner-container")[0]));
                var self = this;
                var animate = function () {
                    if(!lastUserInteraction || (new Date().getTime() - lastUserInteraction.getTime()) > 6000) {
                        nav(1);
                    }
                    self._sliderAnimationTimer = setTimeout(function () {
                        return animate();
                    }, Math.random() * 3000 + 3000);
                };
                self._sliderAnimationTimer = setTimeout(function () {
                    return animate();
                }, 4000);
                _super.prototype.onReady.call(this, model);
            };
            MAHome.prototype.destructor = function () {
                console.log("mahome destructor", this);
                this._touchWipeResults.forEach(function (c) {
                    return c.destroyer();
                });
                clearTimeout(this._sliderAnimationTimer);
                _super.prototype.destructor.call(this);
            };
            return MAHome;
        })(MLearning.Pages.Page);
        Pages.MAHome = MAHome;        
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
