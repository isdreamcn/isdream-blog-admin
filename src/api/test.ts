export const getTestList = (params?: any) => {
  console.log(params)
  return Promise.resolve<Service.ResultPagination>({
    code: 200,
    data: [
      {
        id: 1,
        name: 'getTestList',
        createdAt: '2023-1-29'
      }
    ],
    count: 0
  })
}

export const testAdd = (data: any) => {
  return Promise.resolve({
    code: 200,
    data
  })
}

export const testDel = (id: number) => {
  return Promise.resolve({
    code: 200,
    id
  })
}

export const testDetails = (id: number) => {
  return Promise.resolve({
    name: 'testDetails',
    id
  })
}

export const testEdit = (id: number, data: any) => {
  return Promise.resolve({
    code: 200,
    id,
    data
  })
}
