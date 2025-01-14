"use strict";

const config = require('./config');

let lastCharacter = 0;

module.exports = data => {
    // Find last used character
    data.icons.forEach(icon => {
        ['full', 'transparent'].forEach(attr => {
            if (icon.char[attr]) {
                lastCharacter = Math.max(lastCharacter, icon.char[attr]);
            }
        })
    });

    // Return function to get next available character
    return () => {
        for (let i = 0; i < config.characterRanges.length; i++) {
            if (lastCharacter < config.characterRanges[i].max) {
                return lastCharacter = Math.max(lastCharacter + 1, config.characterRanges[i].min);
            }
        }

        // TODO find unused ranges in characters list
        throw new Error('Ran out of available character ranges');
    };
};
