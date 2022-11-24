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

  describe('image', () => {
    let result
    const hash = 'abc123'
    const description = 'Image Description'
    const transactionData = {
      from: author,
    }

    before(async () => {
      imageCountBefore = await decentagram.imageCount()
      result = await decentagram.uploadImage(hash, description, transactionData)
      imageCount = await decentagram.imageCount()
    })

    it('has been created', async () => {
      // Success
      const event = result.logs[0].args
      assert.equal(
        imageCount,
        imageCountBefore.toNumber() + 1,
        'image count is not correct'
      )
      assert.equal(
        event.id.toNumber(),
        imageCount.toNumber(),
        'id is not correct'
      )
      assert.equal(event.hash, hash, 'hash is not correct')
      assert.equal(
        event.description,
        description,
        'image description is not correct'
      )
      assert.equal(event.tipAmount, 0, 'tip amount is not correct')
      assert.equal(event.author, author, 'author is not correct')

      // FAILURE: Image must have hash
      await decentagram.uploadImage('', description, transactionData).should.be
        .rejected

      // FAILURE: Image must have description
      await decentagram.uploadImage(hash, '', transactionData).should.be
        .rejected
    })

    it('can be fetched', async () => {
      const image = await decentagram.images(imageCount)
      assert.equal(
        image.id.toNumber(),
        imageCount.toNumber(),
        'id is not correct'
      )
      assert.equal(image.hash, hash, 'hash is not correct')
      assert.equal(
        image.description,
        description,
        'image description is not correct'
      )
      assert.equal(image.tipAmount, 0, 'tip amount is not correct')
      assert.equal(image.author, author, 'author is not correct')
    })

    it('can be tipped', async () => {
      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      result = await decentagram.tipImageOwner(imageCount, {
        from: tipper,
        value: web3.utils.toWei('1', 'Ether'),
      })

      // SUCCESS
      const event = result.logs[0].args
      assert.equal(
        event.id.toNumber(),
        imageCount.toNumber(),
        'id is not correct'
      )
      assert.equal(event.hash, hash, 'hash is not correct')
      assert.equal(
        event.description,
        description,
        'image description is not correct'
      )
      assert.equal(
        event.tipAmount,
        '1000000000000000000',
        'tip amount is not correct'
      )
      assert.equal(event.author, author, 'author is not correct')

      // Check that author received fund
      let newAuthorBalance
      newAuthorBalance = await web3.eth.getBalance(author)
      newAuthorBalance = new web3.utils.BN(newAuthorBalance)

      let tipAmount
      tipAmount = web3.utils.toWei('1', 'Ether')
      tipAmount = new web3.utils.BN(tipAmount)

      const expectedBalance = oldAuthorBalance.add(tipAmount)

      assert.equal(
        newAuthorBalance.toString(),
        expectedBalance.toString(),
        'tip not funded to the author'
      )

      // Failure: Tip a non exitent image
      await decentagram.tipImageOwner(BigInt(imageCount + 1), {
        from: tipper,
        value: web3.utils.toWei('1', 'Ether'),
      }).should.be.rejected
    })
  })
})
