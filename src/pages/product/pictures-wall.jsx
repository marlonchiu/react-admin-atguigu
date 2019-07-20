import React from 'react'
import { Upload, Icon, Modal, message } from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
/*
* 用于图片上传的组件
* */
class PicturesWall extends React.Component {
    state = {
        previewVisible: false, // 标识是否显示大图预览Modal
        previewImage: '', // 大图的url
        fileList: [
            {
                uid: '-1', // 每个file都有自己唯一的id  // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
                name: 'xxx.png', // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片地址
            },
        ],
    };

    // 隐藏Modal
    handleCancel = () => this.setState({ previewVisible: false });

    // 显示指定file对应的大图
    handlePreview = async file => {
        console.log('handlePreview()', file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    /*
    file: 当前操作的图片文件(上传/删除)
    fileList: 所有已上传图片文件对象的数组
     */
    handleChange = ({ file, fileList }) => {
        console.log(file, fileList);
        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if(file.status === 'done') {
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            if(result.status === 0) {
                message.success('上传图片成功!')
                const { name, url } = result.data
                // file 和 fileList 最后一个不是同一个对象
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error('上传图片失败')
            }
        }

        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/manage/img/upload" /*上传图片的接口地址*/
                    accept='image/*'  /*只接收图片格式*/
                    name='image' /*请求参数名*/
                    listType="picture-card"  /*卡片样式*/
                    fileList={fileList}  /*所有已上传图片文件对象的数组*/
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall