/** Class representing a Tree. */
class Tree {
  /**
   * Creates a Tree Object
   * Populates a single attribute that contains a list (array) of Node objects to be used by the other functions in this class
   * note: Node objects will have a name, parentNode, parentName, children, level, and position
   * @param {json[]} json - array of json objects with name and parent fields
   */
  constructor(json) {
    
    this.lst = [];
    for (var i = 0; i < json.length; i++) {
      var obj = json[i];
      let n = obj.name;
      let p = obj.parent;
      let element = new Node(n, p);
      this.lst.push(element);
    }
    
  }
  
  /**
   * Function that builds a tree from a list of nodes with parent refs
   */
  buildTree() {
    // note: in this function you will assign positions and levels by making calls to assignPosition() and assignLevel()
  
    // 处理数据
    for (let i = 1; i < this.lst.length; i++) {
      let search_node = this.lst.find(o => o.name === this.lst[i].parentName)
      this.lst[i].parentNode = search_node
      search_node.children.push(this.lst[i])
      if (search_node.children.length) {
        search_node.children[0].isFirstChild = true  //是否是第一个子节点
      }
    }
    // 赋值level
    this.assignLevel(this.lst[0], 0, 0)
    // 根据level排序
    this.lst = this.lst.sort( (a, b)=>(a.level - b.level) );
    for (let i = 0; i < this.lst.length; i++) {
      let search = this.lst.filter(n => n.parentNode === this.lst[i])
      this.lst[i].count = search.length // 统计子节点的个数
      if (this.lst[i+1] && this.lst[i].level === this.lst[i+1].level) {
        this.lst[i+1].pre = this.lst[i]  // 上一个兄弟节点的引用
      }
    }
    
    let index;
    for (let i = 0; i < this.lst.length; i++) {
      const node = this.lst[i]
      if (node.level === 0) {
        // 如果是根节点
        this.assignPosition(node, 0)
      } else {
        // 如果不是根节点
        if (node.isFirstChild) {
          // 如果是第一个子节点，那么跟父节点的位置一致
          index = node.parentNode.position
        } else {
          // 如果不是,那么他等于兄弟节点的位置加兄弟节点的偏移
          const count = node.pre.count === 0 ? 1 : node.pre.count
          index = node.pre.position + count
        }
        this.assignPosition(node, index)
      }
    }
    console.log(this.lst);
  }
  
  /**
   * Recursive function that assign levels to each node
   */
  assignLevel(node, level) {
    if (node === null) {
      return
    }
    
    node.level = level;
    let x = 100 * level+100
    node.p = {x, y: 0}
    
    for (var i = 0; i < node.children.length; i++) {
      this.assignLevel(node.children[i], level + 1)
    }
  }
  
  /**
   * Recursive function that assign positions to each node
   */
  assignPosition(node, position) {
    if (node === null) {
      return
    }
    
    node.position = position;
    
    node.p.y = position * 100 + 100
  }
  
  /**
   * Function that renders the tree
   */
  renderTree() {
    var svgW = 958, svgH = 900, vRad = 36, tree = {};
    const that = this;
    tree.vis = this.lst[0];
    
    tree.getVertices = function () {
      return that.lst
    }
    
    tree.getEdges = function () {
      var e = [];
      
      function getEdges(_) {
        _.children.forEach(function (d) {
          e.push({v1: _.level, l1: _.name, p1: _.p, v2: d.level, l2: d.name, p2: d.p});
          getEdges(d)
        });
      }
      
      getEdges(tree.vis);
      return e;
    }
    
    
    const initialize = function () {
      d3.select("body").append("svg").attr("width", svgW).attr("height", svgH).attr('id', 'treesvg').attr('class', 'nodeGroup');
      
      d3.select("#treesvg").append('g').attr('id', 'g_lines').selectAll('line').data(tree.getEdges()).enter().append('line')
        .attr('x1', function (d) {
          return d.p1.x;
        }).attr('y1', function (d) {
          return d.p1.y;
        })
        .attr('x2', function (d) {
          return d.p2.x;
        }).attr('y2', function (d) {
        return d.p2.y;
      });
      
      d3.select("#treesvg").append('g').attr('id', 'g_circles').selectAll('circle').data(tree.getVertices()).enter()
        .append('circle').attr('cx', function (d) {
        return d.p.x;
      }).attr('cy', function (d) {
        return d.p.y;
      }).attr('r', vRad)
      
      d3.select("#treesvg").append('g').attr('class', 'label').selectAll('text').data(tree.getVertices()).enter().append('text')
        .attr('x', function (d) {
          return d.p.x;
        }).attr('y', function (d) {
        return d.p.y + 5;
      }).text(function (d) {
          return d.name;
        })
    }
    initialize();
  }
  
}
