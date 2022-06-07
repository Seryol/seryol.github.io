import hljs from 'highlight.js'
// import hljs from 'highlight.js/lib/core'
// import javascript from 'highlight.js/lib/languages/javascript'
// import xml from 'highlight.js/lib/languages/xml'
// import less from 'highlight.js/lib/languages/less'
// import css from 'highlight.js/lib/languages/css'
// import java from 'highlight.js/lib/languages/java'
// import python from 'highlight.js/lib/languages/python'
// import objectivec from 'highlight.js/lib/languages/objectivec'
// import markdown from 'highlight.js/lib/languages/markdown'
// import bash from 'highlight.js/lib/languages/bash'
// import json from 'highlight.js/lib/languages/json'
// import http from 'highlight.js/lib/languages/http'

import linenumber from './linenumber'

// 注册代码行数
linenumber(hljs)

// 按需导入高亮语种
// hljs.registerLanguage('javascript', javascript)
// hljs.registerLanguage('xml', xml)
// hljs.registerLanguage('less', less)
// hljs.registerLanguage('css', css)
// hljs.registerLanguage('java', java)
// hljs.registerLanguage('python', python)
// hljs.registerLanguage('objectivec', objectivec)
// hljs.registerLanguage('markdown', markdown)
// hljs.registerLanguage('bash', bash)
// hljs.registerLanguage('json', json)
// hljs.registerLanguage('http', http)

hljs.highlightAll()

export default hljs;

// highlight.js  代码高亮指令
import Hljs from 'highlight.js';
import '/node_modules/highlight.js/styles/tomorrow-night-bright.css'; // 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件

let Highlight = {};
// 自定义插件
Highlight.install = function (Vue) {
    // 自定义指令 v-highlight
    Vue.directive('highlight', {
        // 被绑定元素插入父节点时调用
        inserted: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                Hljs.highlightBlock(blocks[i]);
            }
        },
        // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
        componentUpdated: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                Hljs.highlightBlock(blocks[i]);
            }
        }
    })
};

export { Highlight };