var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MLearning;
(function (MLearning) {
    (function (Pages) {
        var NewTest = (function (_super) {
            __extends(NewTest, _super);
            function NewTest() {
                _super.apply(this, arguments);

            }
            NewTest.prototype.onReady = function (_data) {
                _super.prototype.onReady.call(this, _data);
                var data = _data;
                var queryString = $.parsequery(location.href);
                if(!data) {
                    data = {
                    };
                    data.levelId = +queryString.get("levelId");
                    data.courseId = +queryString.get("courseId");
                }
                this._testInitializationData = data;
                _super.prototype._registerTouchWipe.call(this);
                var self = this;
                console.log($(".level-step .choice").length);
                $(".level-step .choice").click(function () {
                    $(this).attr("data-selected", "true");
                    $(".level-step.current").addClass("revealAnswer");
                    setTimeout(function () {
                        return self.next();
                    }, 1000);
                });
                this._scoreNumberFormatter = function (result) {
                    return parseInt((result * 100) + "") + " %";
                };
                this.goto(0);
            };
            NewTest.prototype.switchStep = function (el) {
                if(_super.prototype.switchStep.call(this, el)) {
                    var self = this;
                    var stepType = el.attr("data-steptype");
                    if(!!stepType) {
                        if("result" == stepType) {
                            var result = $(".level-step[data-steptype=question] .choice[data-selected=true][data-correct=true]").length / $(".level-step[data-steptype=question]").length;
                            var passed = result > 0.33;
                            $(".current-result .test-score .value").html(self._scoreNumberFormatter(result));
                            el.addClass(passed ? "succeed" : "failed");
                            $.post('/Course/SubmitTestResults', {
                                LevelId: self._testInitializationData.levelId,
                                Score: result,
                                Passed: passed
                            }, function (d) {
                                self._reStarrify($(".current-result .test-score .stars").attr('data-stars', d.Stars), d.Stars);
                            });
                        }
                    }
                    return true;
                }
                return false;
            };
            return NewTest;
        })(Pages.StepNavigtionPageBase);
        Pages.NewTest = NewTest;        
    })(MLearning.Pages || (MLearning.Pages = {}));
    var Pages = MLearning.Pages;
})(MLearning || (MLearning = {}));
