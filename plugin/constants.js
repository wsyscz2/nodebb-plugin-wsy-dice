module.exports = Object.freeze({
    REG_DICE_SEED:/(\n\[diceseed\])(.*)(\[\/diceseed\])/g,
    REG_DICE_DICE:/([0-9]*)d([0-9]*)/g,
    REG_DICE_CLEAN:/[^0-9d\+\-]/g,
    REG_DICE_FORMULA:/(\[dice=?(.*)\])(.*)(\[\/dice\])/g
})
