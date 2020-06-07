var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var lat = '21';
        var long = '79';
        var url = 'https://www.google.com/maps?q=21,79';
        var message = generateLocationMessage(from, lat, long);
        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
    });
});