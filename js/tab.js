/**
 * 作者：孙溢周
 * 建立时间：2026-11-04
 * 使用大模型：GLM-5.3-Flash
 * 功能名称：通用 Tab 选项卡组件（可复用）
 *
 * 使用方法：在 HTML 中引入本文件后调用 syz_initTabs(config)，
 * 同一个页面可以传入不同配置多次调用，实现多个选项卡组复用。
 * config 参数说明：
 *   box         - 选项卡容器选择器，如 '#syz_tabBox'
 *   btn         - 选项卡按钮选择器，如 '.syz_tab-btn'
 *   panel       - 内容面板选择器，如 '.syz_tab-panel'
 *   activeClass - 按钮选中状态的类名
 *   showClass   - 面板显示状态的类名
 */

// 函数功能：初始化一个可复用的选项卡组件——查找容器内所有选项卡按钮和面板并建立一一对应关系，为每个按钮绑定监听事件；点击时先清除所有选项卡的选中状态，再设置当前元素的选中状态并显示对应面板
function syz_initTabs(syz_config) {
  // 变量功能：选项卡容器元素
  var syz_box = document.querySelector(syz_config.box);

  // 变量功能：容器内所有选项卡按钮，索引与面板一一对应
  var syz_tabBtns = syz_box.querySelectorAll(syz_config.btn);

  // 变量功能：容器内所有内容面板
  var syz_tabPanels = syz_box.querySelectorAll(syz_config.panel);

  // 变量功能：按钮选中类名和面板显示类名
  var syz_activeClass = syz_config.activeClass;
  var syz_showClass = syz_config.showClass;

  // 函数功能：先清除所有选项卡的选中状态——移除全部按钮的选中类名，隐藏全部面板
  function syz_clearAll() {
    for (var syz_i = 0; syz_i < syz_tabBtns.length; syz_i++) {
      syz_tabBtns[syz_i].classList.remove(syz_activeClass);
      syz_tabPanels[syz_i].classList.remove(syz_showClass);
    }
  }

  // 函数功能：为每个选项卡按钮绑定监听事件（用立即执行函数闭包保存索引）；点击时先调用 syz_clearAll 清除所有选中状态，再通过 this 设置当前元素为选中状态并显示对应面板
  for (var syz_j = 0; syz_j < syz_tabBtns.length; syz_j++) {
    (function (syz_k) {
      syz_tabBtns[syz_k].addEventListener('click', function () {
        syz_clearAll(); // 先清除所有选项卡的选中状态
        this.classList.add(syz_activeClass); // 再设置当前元素的选中状态
        syz_tabPanels[syz_k].classList.add(syz_showClass);
      });
    })(syz_j);
  }
}
