(function(Parser){
    'use strict';

    var winston = require('winston');

    var constant = require('./constants.js');

    Parser.parse = function(content, rng) {
        var diceInfo = content.replace(constant.REG_DICE_FORMULA, "<span class='wsy-dice'><b>$2:</b></span>");
        winston.info("parsed diceInfo:" + diceInfo);

        var parsedFormula = "";
        var strFormulas = content.replace(constant.REG_DICE_FORMULA, "$3");
        winston.info("strFormulas" + strFormulas);
        var formulas = strFormulas.split(";");
        for (var i = 0; i < formulas.length; ++i) {
            var formula = formulas[i];
            winston.info("parse formula:" + formula);
            var parsedHead = formula
                .replace(constant.REG_DICE_CLEAN, "")
                .replace(/([\+\-])/g, " $1 ");
            var parsedBody = parsedHead.replace(constant.REG_DICE_DICE, function(dice, number, face){
                var strRet = "(";
                for (var i = 0; i < number; ++i) {
                    if (face <= 1) {
                        strRet += face;
                    } else {
                        strRet += Math.floor(rng() * face) + 1;
                    }
                    if (i != number - 1) {
                        strRet += ", ";
                    }
                }
                return strRet + ")"
            })
            var parsedTail = eval(parsedBody.replace(',', '+'));

            parsedFormula += "<span class='wsy-dice'>" + parsedHead + " ⇒ " + parsedBody + " = " + parsedTail + "</span>";
        }

        winston.info("parsed formulas:" + parsedFormula);

        return diceInfo + parsedFormula;
    };

})(module.exports);