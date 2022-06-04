
/**
 * 插入原文链接
 * @param {object} params
 */
function insertLink(params) {
  var linkType = params.type || 'segment';
  var eleClass = params.className || 'fix-header tc';
  var linkIndex = params.linkIndex;
  var title = params.title;
  var url = '';

  if (!linkIndex) {
    return;
  }
  switch (linkType) {
    case 'segment':
      url = 'https://github.com/XXHolic/segment/issues/' + linkIndex;
    break;
    case 'blog':
      url = 'https://github.com/XXHolic/blog/issues/' + linkIndex;
    break;

  }

  var insertEle = document.createElement('h2');
  insertEle.setAttribute('class',eleClass);
  var linkEle = document.createElement('a');
  linkEle.setAttribute('href',url);
  linkEle.setAttribute('target','_blank');
  var textNode = document.createTextNode('对应文：'+title);
  linkEle.appendChild(textNode);
  insertEle.appendChild(linkEle);
  var bodyEle = document.body;
  bodyEle.insertBefore(insertEle,bodyEle.firstElementChild);

}