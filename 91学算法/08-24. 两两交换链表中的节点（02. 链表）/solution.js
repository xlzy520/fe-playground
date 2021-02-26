// 入选理由
// 链表常规操作就是改变指针，这次其实就是两两反转再拼接，因此比昨天的题多了操作，那么你还会么？
// 题目描述
// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
//
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
//
//
//
// 示例 1：
// image
//
// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]
// 示例 2：
//
// 输入：head = []
// 输出：[]
// 示例 3：
//
// 输入：head = [1]
// 输出：[1]
//
//
// 提示：
//
// 链表中节点的数目在范围 [0, 100] 内
// 0 <= Node.val <= 100


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  if (!head || !head.next) {
    return head
  }
  // 创建一个新的链表，指向head
  const l = {}
  l.val = -1
  l.next = head
  let pre = l;
  // 当存在head和head的下一节点时
  while (pre.next && pre.next.next){
    // a是头节点，b是下一节点
    let a = pre.next, b= pre.next.next;
    // 头结点指向原先的下一节点
    pre.next = b
    a.next = b.next     // 下一节点执行下下一节点
    b.next = a // 下下节点变成之前的头节点
    pre = pre.next.next
  }
  console.log(l.next);
  return l.next
};


swapPairs({ val: 1, next: {val: 2, next: {val:3, next: {val: 4, next: null}}} })
