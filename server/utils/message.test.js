var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => { 
    it('should generate correct message object', () => {
        var from = 'shubham';
        var text = 'Hello world';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
    });
});