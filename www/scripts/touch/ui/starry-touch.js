var MLearning;
(function (MLearning) {
    (function (UI) {
        var Starrifier = (function () {
            function Starrifier() { }
            Starrifier.Starrify = function (itemsinlist) {
                itemsinlist.each(function () {
                    var itemsinlist = $(this);
                    var rating = $("<div class='rating'></div>");
                    itemsinlist.append(rating);
                    var stars = parseInt($(this).attr("data-stars"));
                    for(var x = 0; x < 3; x++) {
                        var star = $("<span class='star'></span");
                        if(x < stars) {
                            star.addClass('awarded');
                        }
                        star.html("&#9733;");
                        rating.append(star);
                    }
                });
            };
            return Starrifier;
        })();
        UI.Starrifier = Starrifier;        
    })(MLearning.UI || (MLearning.UI = {}));
    var UI = MLearning.UI;
})(MLearning || (MLearning = {}));
