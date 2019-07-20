/*
用来指定商品详情的富文本编辑器组件
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class RichTextEditor extends Component {
    static propTypes = {
        detail: PropTypes.string
    }

    state = {
        editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
    }

    constructor(props) {
        super(props)
        const html = this.props.detail
        if (html) { // 如果有值, 根据html格式字符串创建一个对应的编辑对象

            // https://jpuri.github.io/react-draft-wysiwyg/#/docs  最后一个demo
            const contentBlock = htmlToDraft(html)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.state = {
                editorState,
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
            }
        }
    }

    onEditorStateChange = (editorState) => {
        // console.log(editorState);
        this.setState({
            editorState,
        })
    }

    getDetail = () => {
        // 返回输入数据对应的html格式的文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }


    render() {
        const { editorState } = this.state
        return (
            <Fragment>
                <Editor
                    editorState={editorState}
                    editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
                    onEditorStateChange={this.onEditorStateChange}
                />
                {/*<textarea*/}
                    {/*disabled*/}
                    {/*value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
                {/*/>*/}
            </Fragment>
        )
    }
}

export default RichTextEditor
