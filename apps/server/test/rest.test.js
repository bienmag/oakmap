const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

describe('REST', () => {
  describe('Trees', () => {
    it('Should fetch all Trees', async () => {
      const res = await axios.get('http://localhost:8080/trees')
      expect(!!res.data.length).toBe(true)
    })

    it('Should Get Specific Tree', async () => {
      const id = '63ee09491b0e4ee01d67e33b'
      const res = await axios.get(`http://localhost:8080/trees/${id}`)
      expect(res.data._id).toBe(id)
    })

    it('Should Create Tree and Get The Tree', async () => {
      const res = await axios.post('http://localhost:8080/trees', {
        treeName: 'Hi',
        user: 'ManelAndCory',
      })
      expect(!!res.data._id).toBe(true)

      const res2 = await axios.get(
        'http://localhost:8080/trees/' + res.data._id
      )
      expect(res2.data._id).toBe(res.data._id)
    })

    it('Should Create Tree and Check Tree Exists In List Of Trees', async () => {
      const res = await axios.post('http://localhost:8080/trees', {
        treeName: 'Hi',
        user: 'ManelAndCory',
      })
      expect(!!res.data._id).toBe(true)

      const res2 = await axios.get('http://localhost:8080/trees')
      const list = res2.data
      const found = list.find((tree) => tree._id === res.data._id)
      expect(!!found).toBe(true)
      expect(found._id).toBe(res.data._id)
    })
  })
  describe('Branches', () => {
    it('Should Create A New Branch', async () => {
      const tmp = { x: 10, y: 20 }
      const id = '63ee09491b0e4ee01d67e33b'
      const res = await axios.post(
        `http://localhost:8080/trees/${id}/branches`,
        {
          branchId: uuidv4(),
          position: tmp,
        }
      )
      const pos = res.data.position
      expect(pos.x).toBe(tmp.x)
      expect(pos.y).toBe(tmp.y)
    })
    it('Should Create A New Branch & Check Branch Exists In Tree', async () => {
      const tmp = { x: 10, y: 20 }
      const id = '63ee09491b0e4ee01d67e33b'
      const branchId = uuidv4()
      const res = await axios.post(
        `http://localhost:8080/trees/${id}/branches`,
        {
          branchId: branchId,
          position: tmp,
        }
      )
      const res2 = await axios.get(`http://localhost:8080/trees/${id}`)
      const listBranch = res2.data.branches
      const found = listBranch.find((branch) => branch.branchId === branchId)
      expect(!!found).toBe(true)
      expect(found.branchId).toBe(branchId)
    })
  })
  describe('Leaves', () => {
    it('Should Create New Leaf', async () => {
      const tmp = { x: 10, y: 20 }
      const id = '63ee09491b0e4ee01d67e33b'
      const leafId = uuidv4()
      const res = await axios.post(
        `http://localhost:8080/trees/${id}/unlinkedLeaves`,
        {
          leafId: leafId,
          position: tmp,
        }
      )
      const res2 = await axios.get(`http://localhost:8080/trees/${id}`)
      const listLeaves = res2.data.unlinkedLeaves
      const found = listLeaves.find((leave) => leave.leafId === leafId)
      expect(!!found).toBe(true)
      expect(found.leafId).toBe(leafId)
    })
  })
})
