const renderPugToDOM = require('./util/renderPugToDOM.js')

test('renders single label and input with one region', () => {
  const renderedHtml = renderPugToDOM(
    './views/regions/delete_region.pug',
    {all_regions: [{name: "RegionName", _id: 1234}]}
  )

  expect(renderedHtml.querySelector('form')).toMatchSnapshot()
})

test('render multiple labels and inputs', () => {
  const all_regions = [
    {
      name: "A",
      _id: 1
    },
    {
      name: "B",
      _id: 2
    },
    {
      name: "C",
      _id: 3
    }
  ]

  const renderedHtml = renderPugToDOM(
    './views/regions/delete_region.pug',
    { all_regions }
  )

  expect(renderedHtml.querySelector('form')).toMatchSnapshot()
})
