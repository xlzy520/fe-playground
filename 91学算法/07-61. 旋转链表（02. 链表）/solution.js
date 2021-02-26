// 入选理由
// 难度低，适合链表开篇
// 考察频率高，不瞒您说，我在面试中就被问到过
// 题目描述
// 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
//
// 示例 1:
//
// 输入: 1->2->3->4->5->NULL, k = 2
// 输出: 4->5->1->2->3->NULL
// 解释:
//   向右旋转 1 步: 5->1->2->3->4->NULL
// 向右旋转 2 步: 4->5->1->2->3->NULL
// 示例 2:
//
// 输入: 0->1->2->NULL, k = 4
// 输出: 2->0->1->NULL
// 解释:
//   向右旋转 1 步: 2->0->1->NULL
// 向右旋转 2 步: 1->2->0->NULL
// 向右旋转 3 步: 0->1->2->NULL
// 向右旋转 4 步: 2->0->1->NULL

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

// 思路一：通过首尾相连把链表变成一个循环链表
// 然后通过循环偏移找的新的最后一个元素，因为最后一个元素指向的是头结点，所以新的头结点是newTail.next，
// 再把自己的next指向改成null变成新的尾节点
var rotateRight = function(head, k) {
  if (!head) {
    return null
  }
  if(k === null) return null;
  if(head.next === null) return head
  let p = head
  let len = 1
  while (p.next){
    len++
    p = p.next
  }
  p.next = head  // 此处p是尾结点，指向头结点变成循环链表
  
  
  let newTail = head
  for (let i = 0; i < len-k%len-1; i++) {
    newTail = newTail.next
  }
  p = newTail.next // 新的头结点
  newTail.next = null  // 设置尾结点
  console.log(p);
  return p
};


rotateRight({ val: 1, next: {val: 2, next: {val:3, next: {val: 4, next: null}}} }, 2)
