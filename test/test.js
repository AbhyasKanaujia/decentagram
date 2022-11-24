const Decentagram = artifacts.require('Decentagram')

require('chai').use(require('chai-as-promised')).should()

contract('Decentagram', ([deployer, author, tipper]) => {
  let decentagram

  before(async () => {
    decentagram = await Decentagram.deployed()
  })

  describe('deployment', () => {
    it('is successful', async () => {
      const address = await decentagram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, null)
      assert.notEqual(address, '')
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const expected = 'Decentagram'
      const actual = await decentagram.name()
      assert.equal(actual, expected, "doesn't have the correct name")
    })
  })
})
