class NotImplementedError extends Error {
    constructor(message = 'This feature is not implemented yet.') {
        super(message);
        this.name = 'NotImplementedError';
    }
}

export function surroundTextWithTag(button) {
    this.removePlaceholder()
    if (this.activeButton === button) {
        this.surroundTextWithTag('normal_button');
        return;
    }
    const selectedText = this.getSelectedText();
    let newText = '';
    if (selectedText.length === 0) {
    newText += this.tags.get(button)[0] + '&shy;' + this.tags.get(button)[1]; // WARNING: this uses an invisible character
    } else {
    newText = this.tags.get(button)[0];
    for (let i = 0; i < selectedText.length; i++) {
        if (this.operators.has(selectedText[i])){
        newText += this.tags.get(button)[1] + selectedText[i] + this.tags.get(button)[0];
        } else {
        newText += selectedText[i];
        }
    }
    newText += this.tags.get(button)[1];
    }

    document.execCommand('insertHTML', false, newText);
    this.activeButton = button;
}

export function surroundTextWithboth() {
    let selectedText = this.removeTemplateLiterals(this.getSelectedText());
    if (selectedText.length === 0) {
    selectedText = '▯ ▯';
    } else if (!selectedText.includes(' ')) {
    selectedText += ' ' + '▯';
    }
    let newText = '<span class="stacked"><sup>';
    for (let i = 0; i < selectedText.length; i++) {
    if (selectedText[i] === ' ') {
        newText += '</sup><sub>';
    } else if (!this.operators.has(selectedText[i])){
        newText += selectedText[i];
    }
    }
    newText += '</sub></span> ' + '&shy;'; // WARNING: this uses an invisible character 
    document.execCommand('insertHTML', false, newText);
    this.activeButton = 'normal_button';
}

export function insertOperator(char_entity) {
    const selectedText = this.getSelectedText();
    let newText = '';
    newText += this.removeTemplateLiterals(char_entity);
    document.execCommand('insertHTML', false, newText);
    this.activeButton = 'normal_button';
}

export function compute(_input) {

    // used to go back to equation
    if (this.isConverted){
        this.isConverted = false;
        this.input = this.previous;
        return _input;
    }
    
    // Make copy instead of reference
    let input = _input; 

    input = unstackText(input);

    // Concatenate adjacent <sub> and <sup> strings
    input = input.replace(/<\/sub><sub>/g, '');
    input = input.replace(/<\/sup><sup>/g, '');

    // Remove ' ' and &shy; inside <sub></sub>
    input = input.replace(/­| /g, '');
    input = input.replace(/<sub>(.*?)&shy;(.*?)<\/sub>/g, '<sub>$1$2</sub>');

    if (!input.trim()) {
        return "Error: input text is empty";
    }

    if (input.slice(0, 5) === '<sub>') {
        return "Error: subscript without normal text";
    }

    let chargeResult = calculateCharge(input);
    input = chargeResult[0];
    let charge = chargeResult[1];
    
    input = input.replace(/<sup>.*?<\/sup>/g, '');
    let pairs = [];
    let subscriptText = '';
    let currentElement = '';
    let insideSub = false;

    for (let i = 0; i < input.length; i++) {
        // If there is a subscript, we need to use it in the current pair
        if (input.slice(i, i+5) === '<sub>') {
            i += 5;
            while (input.slice(i, i+6) !== '</sub>') {
                subscriptText += input[i];
                i++;
            }
            insideSub = true;
            continue;
        }
        // If there is an ending subscript tag, reset insideSub and continue
        if (input.slice(i, i+6) === '</sub>') {
            insideSub = false;
            continue;
        }
        
        // Identify currentElement
        let endIndex = i;
        while (endIndex + 1 < input.length && input[endIndex + 1] === input[endIndex + 1].toLowerCase()) {
            endIndex++;
        }
        currentElement = input.slice(i, endIndex + 1);
        i = endIndex;
        
        // If there is a subscript associated with the current element, append it
        if (insideSub) {
            currentElement += '<sub>' + subscriptText + '</sub>';
            subscriptText = ''; 
            insideSub = false;
        }

        // Split currentElement to separate the element name and subscript
        let elementName = currentElement.replace(/<sub>.*<\/sub>/, '');

        // Check if valid element
        if (!this.elements.has(elementName)) {
            return `Error: "${elementName}" not a valid element`;
        }
        
        // If we reach the end of the input or if the next character is not a subscript, add pair [elementName, subscript] to pairs array
        if (i + 1 === input.length || input.slice(i, i+5) !== '<sub>') {
            let subscript = currentElement.match(/<sub>(.*?)<\/sub>/);
            pairs.push(format_array([elementName, subscript ? subscript[1] : 1]));
        }       
    }
    if (isNaN(charge)) {
        charge = 0;
    }

    // if no errors occured, update state and store previous
    this.isConverted = true;
    this.previous = _input;

    this.$emit('compute-formula', format_array(pairs));
    this.$emit('compute-charge', charge);
    return format_array([pairs, charge]);
}

function format_array(input) {
    let output = '{' + input.join(', ') + '}'; 
    return output;
}

// Split stacked text into subscript and superscript.
//    Input: <span class="stacked"><sup>Y</sup><sub>Z</sub></span>
//    Output: <sup>Y</sup><sub>Z</sub> (could also be <sub>Z</sub><sup>Y</sup>)
export function unstackText(input) {
    let output = '';
    let j = 0;
    for (let i = 0; i < input.length; i++) {
    if (input.substring(i, i+22) === '<span class="stacked">') {
        i += 22;
        j = i;
        while (input.substring(j, j+7) !== '</span>') {
            j++;
        }
        output += input.substring(i, j);
        i = j+6;
        } else {
        output += input[i];
    }
    }
    return output;
}

export function calculateCharge(input) {
    let charge = 0;
    let currentCharge = '';
    for (let i = 0; i < input.length; i++) {
    if (input.slice(i, i + 5) === '<sup>') {
        i += 5;          
        while (input.slice(i, i + 6) !== '</sup>') {
        currentCharge += input[i];
        i++;
        }
        if (currentCharge === '-') {
        charge -= 1;
        } else if (currentCharge === '+') {
        charge += 1;
        } else {
        charge += parseInt(currentCharge);
        }
        currentCharge = '';
    }
    }
    return [input, charge];
}

// TODO: make tests actually work
export function computeTestCases() {
    let tests = {
    // Expected inputs
    "HO": [[["H", "1"], ["O", "1"]], 0],
    "H<sub>2</sub>": [[["H", "2"]], 0],
    "H<sub>2</sub>O": [[["H", "2"], ["O", "1"]], 0],

    // Edgecases: Errors
    "": "Error: input text is empty",
    "<sub></sub>": "Error: input text is empty",
    "<sub>1</sub>": "Error: unclosed subscript tag",
    "H<sub>2</sub>O<sub>": "Error: unclosed subscript tag",
    "<sub>2</sub>": "Error: subscript without normal text",

    // Edgecases: adjacent subscripts
    "H<sub>2</sub><sub>2</sub>": [[["H", "22"]], 0],
    "H<sub>2</sub><sub></sub>": [[["H", "2"]], 0],

    // Edgecases: invisible characters: '&shy;'
    "H<sub>&shy;</sub>": [[["H", "1"]], 0],
    "H<sub>&shy;2</sub>": [[["H", "2"]], 0],
    "H<sub>2&shy;</sub>": [[["H", "2"]], 0],
    "H<sub>2&shy;3</sub>": [[["H", "23"]], 0],
    "H<sub>&shy;</sub>C<sub>&shy;</sub": [[["H", "1"], ["C", "1"]], 0],
    "H<sub>&shy;</sub>C<sub>2</sub": [[["H", "1"], ["C", "2"]], 0],

    // Edgecases: working with elements
    "H" : [[["H", "1"]], 0],
    "HCr" : [[["H", "1"], ["Cr", "1"]], 0],
    "H<sub>2</sub>" : [[["H", "2"]], 0],
    "HCr<sub>2</sub>" : [[["H", "1"], ["Cr", "2"]], 0],
    "BeB" : [[["Be", "1"], ["B", "1"]], 0],
    "Be<sub>2</sub>Be" : [[["Be", "2"], ["Be", "1"]], 0],
    "be" : "Error: \"be\" not a valid element",

    // superscript (base)
    "Be<sup>0</sup>": [[["Be", "1"]], 0],
    "Be<sup>1</sup>": [[["Be", "1"]], 1],
    "Be<sup>2</sup>": [[["Be", "1"]], 2],

    // superscript (calculating)
    "Be<sup>1</sup>B<sup>2</sup>": [[["Be", "1"], ["B", "2"]], 3],
    "Be<sup>1</sup>B<sup>-1</sup>": [[["Be", "1"], ["B", "2"]], 0],
    "Be<sup>1</sup>B<sup>-2</sup>": [[["Be", "1"], ["B", "2"]], -1],

    // superscript (shorthand)
    "Be<sup>+</sup>": [[["Be", "1"]], 1],
    "Be<sup>-</sup>": [[["Be", "1"]], -1],
    "Be<sup>-</sup>B<sup>+</sup>": [[["Be", "1"], ["B", "1"]], 0],
    };
    
    let passed = true;
    let testKeys = Object.keys(tests);
    let testValues = Object.values(tests);
    for (let i = 0; i < testKeys.length; i++) {
    passed = this.compute(testKeys[i]) == testValues[i];
    console.log(`Test: ${i+1} -- ${passed ? 'Passed' : 'Failed'}`);
    console.log(`Input: ${testKeys[i]}`);
    console.log(`Expected: ${testValues[i]}`);
    if (!passed) {
        console.log(`Received: ${this.compute(testKeys[i])}`);
    }
    }
}

export function getSelectedText() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    return range.toString();
    }
    return null;
}

export function updateCaretPosition() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(this.$refs.myTextBox);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    this.caretPosition = preCaretRange.toString().length;
    }
}

export function removeAdjacent(char){
    throw new NotImplementedError();
}

export function normalizeOperators(){
    for (let i; i < this.displayText.length; i++){
    if (this.operators.has(this.displayText[i])){
        this.removeTemplateLiterals(this.displayText[i]);
    }
    }
}

export function removeTemplateLiterals(str) {
    const regex = /\${(.*?)}/g;
    return str.replace(regex, '');
}

export function updateText(event) {
    this.displayText = event.target.innerHTML;
    this.normalizeOperators();
}

export function removePlaceholder(event) {
    if (this.$refs.myTextBox.textContent === this.name || this.input === this.name) {
        this.$refs.myTextBox.textContent = '';
        this.input = '';
    }
}

// TODO: does not replace if the user clicks sub/sup and then clicks out 
export function addPlaceholder(event) {
    if (this.$refs.myTextBox.textContent === '') {
        this.$refs.myTextBox.textContent = this.name;
    }
}

export function showPopup() {
    this.showingPopup = true;
}

export function hidePopup() {
    this.showingPopup = false;
}
