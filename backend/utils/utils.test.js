const utils = require('./utils')
const expect = require('expect')

it('should add two numbers',() => {
    let result = utils.add(12,13)
    expect(result).toBe(25)
     
})