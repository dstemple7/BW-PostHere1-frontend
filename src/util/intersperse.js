export default function intersperse(things, withItem) {
  const ret = []
  for (let i = 0; i < things.length; ++i) {
    ret.push(things[i])

    if (i < things.length - 1) ret.push(withItem)
  }

  return ret
}
