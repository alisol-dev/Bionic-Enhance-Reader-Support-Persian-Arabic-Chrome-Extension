function ModifyTextBasic(textNodeContent) {
    return textNodeContent.split(' ').map((word) => {

        var boldUp2 = Math.floor(0.5 * Math.floor(word.length / 2));
        let firstHalf = word.substring(0, boldUp2 + 1);
        let secondHalf = word.substring(boldUp2 + 1);

        let firstHalfSuffix = "";
        let secondHalfPreffix = "";
        let lastCharOfArabicWord = getLastCharOfArabicWord(firstHalf);
        let firstCharOfArabicWord = getFirstCharOfArabicWord(secondHalf);
        if (doesArabicCharNeedSuffixJoiner(lastCharOfArabicWord) == true && doesArabicCharNeedPreffixJoiner(firstCharOfArabicWord) == true) {
            firstHalfSuffix = "\u200D";
            secondHalfPreffix = "\u200D";
        }

        return word.replace(word, `<b>${firstHalf}${firstHalfSuffix}</b>${secondHalfPreffix}${secondHalf}`);
    });
}

function getLastCharOfArabicWord(word) {
    let len = word.length;
    let lastChar = word.charAt(len - 1);
    return lastChar;
}

function getFirstCharOfArabicWord(word) {
    let firstChar = word.charAt(0);
    return firstChar;
}

function doesArabicCharNeedSuffixJoiner(char) {
    let arabicCharsNeedingSuffixJoiner = ["ء",
        "أ",
        "ب",
        "پ",
        "ت",
        "ث",
        "ج",
        "چ",
        "ح",
        "خ",
        "س",
        "ش",
        "ص",
        "ض",
        "ط",
        "ظ",
        "ع",
        "غ",
        "ف",
        "ق",
        "ک",
        "گ",
        "ل",
        "م",
        "ن",
        "ه",
        "ی"
    ];

    if (arabicCharsNeedingSuffixJoiner.includes(char)) {
        return true;
    } else {
        return false;
    }
}

function doesArabicCharNeedPreffixJoiner(char) {
    // all arabic chars needs preffix joiner.
    var arabic = /[\u0600-\u06FF]/;
    if (arabic.test(char)) {
        return true;
    } else {
        return false;
    }
}

function ModifyWebPage() {
    const domParser = new DOMParser();
//     var allText = [...document.querySelectorAll('.bionicText > *:is(h1,h2,h3,h4,h5,h6,p), .bionicText:is(h1,h2,h3,h4,h5,h6,p)')]; // for custom using in a html page
    var allText = [... document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')]; // for browser extension
    allText.forEach(element => {
        var text = domParser.parseFromString(element.innerHTML, "text/html");
        var textNodeCollection = Array.from(text.body.childNodes).map((node) => {
            if (node.nodeType === Node.TEXT_NODE)
                return ModifyTextBasic(node.textContent).join(' ');
            else
                return node.outerHTML;
        })
        element.innerHTML = textNodeCollection.join('');
    });
}

ModifyWebPage();
