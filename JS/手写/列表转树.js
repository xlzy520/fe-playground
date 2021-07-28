let list = [
  {
    id: '1',
    title: '节点1',
    parentId: '',
  },
  {
    id: '1-1',
    title: '节点1-1',
    parentId: '1'
  },
  {
    id: '1-2',
    title: '节点1-2',
    parentId: '1'
  },
  {
    id: '2',
    title: '节点2',
    parentId: '1'
  },
  {
    id: '2-1',
    title: '节点2-1',
    parentId: '2'
  }
]


function listToTree(list = []){
  const mapping = list.reduce((pre, cur)=> {
    pre[cur.id] = cur
    cur.children = []
    return pre
  }, {})
  const res = list.filter(v=> {
    if (v.parentId) {
      mapping[v.parentId].children.push(v)
    }
    return !v.parentId
  })
  console.log(mapping);
  console.log(res);
  return res
}


listToTree(list)

console.log(treeToList(listToTree(list)));


function treeToList (tree, result = [], level = 0) {
  tree.forEach(node=>{
    result.push(node)
    node.level = level+1
    if (node.children) {
      treeToList(node.children, result, level+1)
    }
  })
  return result
}


